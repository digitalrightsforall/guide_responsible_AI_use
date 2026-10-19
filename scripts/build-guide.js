#!/usr/bin/env node
/**
 * Production Compiler: Compiles Decoupled Markdown Guides into High-Fidelity Content Payloads.
 * 
 * Pipeline:
 * content/guide/metadata.json + content/guide/{zh,en}/chapter-*.md
 *   -> Evaluated with component renderers (action panel, skill cards grid, evidence drawer, persona playbooks)
 *   -> Generates site/data/guide-content.json (Fetchable JSON API)
 *   -> Generates site/js/guide-content-cache.js (Zero-CORS file:// offline fallback)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const itemsPath = path.join(rootDir, 'site/data/items.json');
const incidentsPath = path.join(rootDir, 'site/data/incidents.json');
const metadataPath = path.join(rootDir, 'content/guide/metadata.json');

const items = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));
const incidents = JSON.parse(fs.readFileSync(incidentsPath, 'utf-8'));
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

const itemsById = {};
items.forEach(it => { itemsById[it.id] = it; });

const incidentsById = {};
incidents.forEach(inc => { incidentsById[inc.id] = inc; });

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function makePill(skillId, label) {
  return `<button type="button" class="inline-skill-pill" data-skill="${skillId}" title="点击查看 ${skillId} 的完整实测状态与标准依据"><svg width="13" height="13" style="width:13px;height:13px;min-width:13px;max-width:13px;display:inline-block;flex-shrink:0;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span>${escapeHtml(label || skillId)}</span></button>`;
}

function makeIncidentPill(incidentId, label) {
  const cleanLabel = (label || incidentId).replace(/\s*[↗➔→]\s*$/, '');
  return `<button type="button" class="inline-incident-pill" data-incident="${incidentId}" title="点击原地查阅案卷事实与裁判依据"><svg width="12" height="12" style="width:12px;height:12px;min-width:12px;max-width:12px;display:inline-block;flex-shrink:0;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>${escapeHtml(cleanLabel)}</span></button>`;
}

function renderSkillCard(skillId, tierLabelZh, tierLabelEn, roleDescZh, roleDescEn, isAdvanced = false, currentLang = 'zh') {
  const item = itemsById[skillId];
  const isZh = currentLang === 'zh';
  const tier = isZh ? tierLabelZh : tierLabelEn;
  const role = isZh ? roleDescZh : roleDescEn;
  const name = item ? item.name : skillId;
  const isOutOfBox = (item?.status?.stage || '').includes('开箱即用');
  const statusLabel = isZh 
    ? (isOutOfBox ? '开箱即用' : '需装依赖')
    : (isOutOfBox ? 'Ready' : 'Deps Req');
  const statusDotColor = isOutOfBox ? 'bg-emerald-500' : 'bg-amber-500';
  const tierClass = isAdvanced ? 'tier-advanced' : 'tier-required';
  
  const rawClients = item?.clients || [];
  const isUniversal = rawClients.length === 0 || rawClients.includes('通用') || rawClients.includes('Universal') || rawClients.length >= 4;
  const clientTagHtml = (!isUniversal && rawClients.length > 0)
    ? `<div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between truncate">
         <span>${isZh ? '适用' : 'Requires'}: ${escapeHtml(rawClients.slice(0, 2).join(' / '))}</span>
       </div>`
    : '';

  return `
    <div class="skill-compact-card">
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-1.5 flex-wrap">
          <span class="skill-card-tag ${tierClass}">
            ${escapeHtml(tier)}
          </span>
          <span class="skill-status-text">
            <span class="w-2 h-2 rounded-full ${statusDotColor} inline-block shrink-0"></span>
            <span>${escapeHtml(statusLabel)}</span>
          </span>
        </div>
        <div>
          <h5 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
            ${escapeHtml(name)}
          </h5>
          <p class="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            ${escapeHtml(role)}
          </p>
        </div>
      </div>
      <div class="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
        ${clientTagHtml}
        <div class="grid grid-cols-2 gap-1.5 pt-0.5">
          <button type="button" class="skill-action-inspect skill-inspect-btn text-center truncate" data-skill="${skillId}">
            <span>${isZh ? '查看依据' : 'Evidence'}</span>
          </button>
          <button type="button" class="skill-action-copy skill-copy-btn text-center truncate" data-skill="${skillId}">
            <span>${isZh ? '复制命令' : 'Copy Cmd'}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderSkillPipelineSection(options, currentLang = 'zh') {
  const isZh = currentLang === 'zh';
  const title = isZh ? options.titleZh : options.titleEn;
  const subtitle = isZh ? options.subtitleZh : options.subtitleEn;
  const primaryCardsHtml = options.primary.map(p => 
    renderSkillCard(p.id, p.tierZh, p.tierEn, p.roleZh, p.roleEn, p.isAdvanced, currentLang)
  ).join('');
  
  let moreHtml = '';
  if (options.alternates && options.alternates.length > 0) {
    const pillsHtml = options.alternates.map(a => makePill(a.id, a.label)).join('');
    const moreTitle = isZh 
      ? `查看另外 ${options.alternates.length} 个备选/补充技能（根据环境自由选用）`
      : `View ${options.alternates.length} alternative & supplementary skills`;
    moreHtml = `
      <details class="skill-alternates-row group">
        <summary>
          <span>📦 ${moreTitle}</span>
          <span class="text-[10px] text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="pt-2 flex flex-wrap gap-1.5">
          ${pillsHtml}
        </div>
      </details>
    `;
  }

  return `
    <div class="skill-pipeline-wrapper space-y-3 my-5">
      <div class="space-y-1">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-brand"></span>
          <span>${escapeHtml(title)}</span>
        </h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          ${escapeHtml(subtitle)}
        </p>
      </div>
      <div class="skill-card-grid ${options.primary.length >= 3 ? 'cols-3' : ''}">
        ${primaryCardsHtml}
      </div>
      ${moreHtml}
    </div>
  `;
}

function renderActionPanel(opts, currentLang = 'zh') {
  const isZh = opts.lang !== 'en';
  const headerTitle = isZh ? '行动建议与分级实操 (Action Guidance)' : 'Action Guidance & Tiered Practices';
  const dontTitle = isZh ? '❌ 常见高危做法' : '❌ High-Risk Practices';
  const doTitle = isZh ? '✅ 规范自卫打法' : '✅ Standard Defense';
  const tiersHeading = isZh ? '你可以这样做（按自己的情况选一档）' : 'What you can do (pick the tier that fits you)';
  const t1Title = isZh ? '零门槛 · 只用浏览器或手机' : 'Zero Setup · Browser / Mobile Only';
  const t2Title = isZh ? '进阶 · 愿意装个软件或在本地操作' : 'Intermediate · Local Tools & Redaction';
  const t3Title = isZh ? '专业 · 使用支持技能的 AI 客户端' : 'Advanced · AI Tools with Agent Skills';
  const verifyLabel = isZh ? '✔ 怎么确认做对了：' : '✔ How to verify you did it right: ';

  const t1List = (opts.tierBrowser || []).map(item => '<li>' + item + '</li>').join('');
  const t2List = (opts.tierSoftware || []).map(item => '<li>' + item + '</li>').join('');
  const t3List = (opts.tierSkills || []).map(item => '<li>' + item + '</li>').join('');

  return `
    <div class="action-panel">
      <div class="action-panel-header">
        <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        <span>${headerTitle}</span>
      </div>
      <!-- Layer 1: Contrast Principles -->
      <div class="action-contrast-grid">
        <div class="action-contrast-col-dont">
          <h4>${dontTitle}</h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${opts.dontText}</p>
        </div>
        <div class="action-contrast-col-do">
          <h4>${doTitle}</h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${opts.doText}</p>
        </div>
      </div>
      <!-- Layer 2: Tiered Action Guidance -->
      <div class="pt-3">
        <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">${tiersHeading}</div>
        <div class="action-tiers-grid">
          <div class="action-tier-col space-y-1.5">
            <h5>${t1Title}</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${t1List}</ol>
          </div>
          <div class="action-tier-col space-y-1.5">
            <h5>${t2Title}</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${t2List}</ol>
          </div>
          <div class="action-tier-col space-y-1.5">
            <h5>${t3Title}</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${t3List}</ol>
          </div>
        </div>
      </div>
      <!-- Layer 3: Independent Verification Bar -->
      <div class="action-verification-bar">
        <strong>${verifyLabel}</strong><span>${opts.verifyText}</span>
      </div>
    </div>
  `;
}

function renderEvidenceDrawer(opts, currentLang = 'zh') {
  const isZh = opts.lang !== 'en';
  const drawerTitle = opts.title || (isZh ? '实证与延伸：真实判例、法规条款与技术原理' : 'Evidence & References: Cases, Statutes & Mechanisms');

  let countStr = opts.count;
  if (!countStr) {
    const parts = [];
    if (opts.cases && opts.cases.length > 0) parts.push(isZh ? `${opts.cases.length} 起案例` : `${opts.cases.length} Cases`);
    if (opts.statutes && opts.statutes.length > 0) parts.push(isZh ? `${opts.statutes.length} 条法规` : `${opts.statutes.length} Statutes`);
    if (opts.technical && opts.technical.length > 0) parts.push(isZh ? `${opts.technical.length} 项实证` : `${opts.technical.length} Findings`);
    countStr = parts.join(' · ');
  }
  const countBadge = countStr ? ` <span class="text-[11px] font-normal text-slate-400 dark:text-slate-500">(${countStr})</span>` : '';

  const toggleHint = isZh
    ? '<span class="group-open:hidden">展开证据 ⬇</span><span class="hidden group-open:inline">收起证据 ⬆</span>'
    : '<span class="group-open:hidden">Expand ⬇</span><span class="hidden group-open:inline">Collapse ⬆</span>';

  let sectionsHtml = '';

  if (opts.cases && opts.cases.length > 0) {
    const caseItems = opts.cases.map(c => '<div class="flex flex-wrap gap-1.5 pt-1">' + c + '</div>').join('');
    sectionsHtml += `
      <div class="evidence-drawer-section">
        <div class="evidence-drawer-section-title flex items-center gap-1.5 text-rose-800 dark:text-rose-300">
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>${isZh ? '真实案例与权威通报 (Real-World Incidents)' : 'Real-World Incidents & Sanctions'}</span>
        </div>
        <div class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${opts.caseSummary || (isZh ? '点击案卷标签可原地查阅案号、行政罚单与第一手裁判文书：' : 'Click pills to inspect official rulings and case numbers:')}</div>
        <div class="space-y-1.5 pt-1">${caseItems}</div>
      </div>
    `;
  }

  if (opts.statutes && opts.statutes.length > 0) {
    const statuteLis = opts.statutes.map(s => '<li>' + s + '</li>').join('');
    sectionsHtml += `
      <div class="evidence-drawer-section">
        <div class="evidence-drawer-section-title flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
          <svg class="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>${isZh ? '法规条款与标准对齐 (Statutes & Standards)' : 'Statutes & Regulatory Standards'}</span>
        </div>
        <ul class="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">${statuteLis}</ul>
      </div>
    `;
  }

  if (opts.technical && opts.technical.length > 0) {
    const techLis = opts.technical.map(t => '<li>' + t + '</li>').join('');
    sectionsHtml += `
      <div class="evidence-drawer-section">
        <div class="evidence-drawer-section-title flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
          <svg class="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          <span>${isZh ? '学术文献与技术机理解析 (Technical & Research Deep Dive)' : 'Technical & Research Deep Dive'}</span>
        </div>
        <ul class="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">${techLis}</ul>
      </div>
    `;
  }

  return `
    <details class="evidence-drawer group">
      <summary class="evidence-drawer-summary">
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
          <span>${drawerTitle}${countBadge}</span>
        </span>
        <span class="text-[11px] font-semibold text-brand">${toggleHint}</span>
      </summary>
      <div class="evidence-drawer-content">
        ${sectionsHtml}
      </div>
    </details>
  `;
}

function renderPersonaPlaybook(opts, currentLang = 'zh') {
  const isZh = opts.lang !== 'en';
  const roleBadge = isZh ? opts.roleZh : opts.roleEn;
  const title = isZh ? opts.titleZh : opts.titleEn;
  const intro = isZh ? opts.introZh : opts.introEn;
  const painTitle = isZh ? '1. 现实痛点与诱惑 (Temptation & Pain Point)' : '1. Real Pain Point & Temptation';
  const painText = isZh ? opts.painZh : opts.painEn;
  const timelineTitle = isZh ? '2. 一日自卫战术时刻表 (Chronological Playbook)' : '2. Chronological Daily Defense';
  const minStdTitle = isZh ? '3. 最低完成标准与交付核对 (Verification Sign-off)' : '3. Verification Sign-off & Minimum Baseline';
  const minZero = isZh ? opts.minZeroZh : opts.minZeroEn;
  const minPro = isZh ? opts.minProZh : opts.minProEn;

  const stepsHtml = (opts.steps || []).map(step => {
    const time = step.time;
    const sTitle = isZh ? step.titleZh : step.titleEn;
    const sDesc = isZh ? step.descZh : step.descEn;
    return `
      <div class="persona-step">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[11px] font-mono font-bold text-brand bg-brand/10 dark:bg-brand/20 px-2 py-0.5 rounded">${time}</span>
          <span class="text-sm font-bold text-slate-900 dark:text-white">${sTitle}</span>
        </div>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${sDesc}</p>
      </div>
    `;
  }).join('');

  let casesHtml = '';
  if (opts.cases && opts.cases.length > 0) {
    const caseItems = opts.cases.join(' ');
    const toggleHint = isZh
      ? '<span class="group-open:hidden">展开参考案例 ⬇</span><span class="hidden group-open:inline">收起参考案例 ⬆</span>'
      : '<span class="group-open:hidden">Expand Cases ⬇</span><span class="hidden group-open:inline">Collapse Cases ⬆</span>';
    casesHtml = `
      <details class="evidence-drawer group mt-3">
        <summary class="evidence-drawer-summary">
          <span class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>${isZh ? '本角色真实前车之鉴与合规警示' : 'Real-World Incident Precedents'}</span>
          </span>
          <span class="text-[11px] font-semibold text-brand">${toggleHint}</span>
        </summary>
        <div class="evidence-drawer-content">
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">${isZh ? opts.nearMissZh : opts.nearMissEn}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">${caseItems}</div>
        </div>
      </details>
    `;
  }

  return `
    <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
          <span class="w-2 h-2 rounded-full bg-brand"></span>
          <span>${title}</span>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${roleBadge}</span>
      </div>
      <div class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${intro}</div>
      <div class="space-y-1.5 pt-1">
        <div class="text-xs font-bold text-slate-800 dark:text-slate-200">${painTitle}</div>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${painText}</p>
      </div>
      <div class="pt-2">
        <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">${timelineTitle}</div>
        <div class="persona-timeline space-y-2">${stepsHtml}</div>
      </div>
      <!-- Component: Clean Standalone Verification Panel -->
      <div class="verification-panel space-y-1.5">
        <div class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>${minStdTitle}</span>
        </div>
        <div class="text-sm text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed pl-1">
          <p>• <strong>${isZh ? '最低要求 (零门槛)' : 'Minimum Baseline (Zero Setup)'}：</strong>${minZero}</p>
          <p>• <strong>${isZh ? '进阶交付 (专业级)' : 'Professional Standard (Advanced)'}：</strong>${minPro}</p>
        </div>
      </div>
      ${casesHtml}
    </div>
  `;
}

function buildGuide() {
  console.log('🚀 Compiling Modular Markdown Guide to High-Fidelity Payloads...');

  const result = {
    zh: { ...metadata.zh, bodyHtml: '' },
    en: { ...metadata.en, bodyHtml: '' }
  };

  ['zh', 'en'].forEach(lang => {
    const isZh = lang === 'zh';
    const langDir = path.join(rootDir, 'content/guide', lang);
    const chapterHtmls = [];

    // Sandbox with full high-fidelity component functions
    const sandbox = {
      escapeHtml,
      makePill,
      makeIncidentPill,
      renderSkillCard: (id, tZh, tEn, rZh, rEn, adv) => renderSkillCard(id, tZh, tEn, rZh, rEn, adv, lang),
      renderSkillPipelineSection: (opts) => renderSkillPipelineSection(opts, lang),
      renderActionPanel: (opts) => renderActionPanel(opts, lang),
      renderEvidenceDrawer: (opts) => renderEvidenceDrawer(opts, lang),
      renderPersonaPlaybook: (opts) => renderPersonaPlaybook(opts, lang),
      currentLang: lang,
      itemsById,
      incidentsById,
      console: console
    };

    const context = vm.createContext(sandbox);

    for (let i = 1; i <= 6; i++) {
      const filename = `chapter-${i}.md`;
      const filePath = path.join(langDir, filename);

      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing file: ${filePath}`);
        process.exit(1);
      }

      const raw = fs.readFileSync(filePath, 'utf-8');

      // Evaluate chapter content as template literal inside sandbox
      const script = new vm.Script("`" + raw + "`");
      const compiled = script.runInContext(context);
      chapterHtmls.push(compiled);
    }

    result[lang].bodyHtml = chapterHtmls.join('\n\n      ');
    console.log(`✅ [${lang.toUpperCase()}] Compiled 6 chapters (${result[lang].bodyHtml.length} chars)`);
  });

  // Write site/data/guide-content.json
  const jsonDest = path.join(rootDir, 'site/data/guide-content.json');
  fs.writeFileSync(jsonDest, JSON.stringify(result), 'utf-8');
  console.log(`📦 Generated ${path.relative(rootDir, jsonDest)} (${fs.statSync(jsonDest).size} bytes)`);

  // Write site/js/guide-content-cache.js
  const jsDest = path.join(rootDir, 'site/js/guide-content-cache.js');
  const cacheCode = `// Auto-generated Guide Content Cache (offline & file:// compatibility)\nwindow.__GUIDE_CONTENT__ = ${JSON.stringify(result)};\n`;
  fs.writeFileSync(jsDest, cacheCode, 'utf-8');
  console.log(`📦 Generated ${path.relative(rootDir, jsDest)} (${fs.statSync(jsDest).size} bytes)`);

  console.log('🎉 Guide build complete successfully!\n');
}

buildGuide();
