#!/usr/bin/env node
/**
 * Production Compiler: Compiles Markdown Guides into Production JSON & Cache Payload.
 * 
 * Pipeline:
 * content/guide/metadata.json + content/guide/{zh,en}/*.md
 *   -> Parsed & Injected with items.json and incidents.json
 *   -> site/data/guide-content.json (Fetchable JSON API)
 *   -> site/js/guide-content-cache.js (Offline / file:// fallback)
 */

const fs = require('fs');
const path = require('path');

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

function makeSkillPill(skillId, customLabel, isZh = true) {
  const item = itemsById[skillId];
  let label = customLabel;
  if (!label) {
    label = item ? (isZh ? item.name : (item.name_en || item.name)) : skillId;
  }
  const titleHint = isZh
    ? `点击查看 ${skillId} 的完整实测状态与标准依据`
    : `Click to inspect ${skillId} verification details`;

  return `<button type="button" class="inline-skill-pill" data-skill="${escapeHtml(skillId)}" title="${escapeHtml(titleHint)}"><svg width="13" height="13" style="width:13px;height:13px;min-width:13px;max-width:13px;display:inline-block;flex-shrink:0;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span>${escapeHtml(label)}</span></button>`;
}

function makeIncidentPill(incidentId, customLabel, isZh = true) {
  const inc = incidentsById[incidentId];
  let label = customLabel;
  if (!label) {
    label = inc ? (isZh ? inc.title_zh : inc.title_en) : incidentId;
  }
  const cleanLabel = (label || incidentId).replace(/\s*[↗➔→]\s*$/, '');
  const titleHint = isZh
    ? '点击原地查阅案卷事实与裁判依据'
    : 'Click to inspect judicial ruling and evidence';

  return `<button type="button" class="inline-incident-pill" data-incident="${escapeHtml(incidentId)}" title="${escapeHtml(titleHint)}"><svg width="12" height="12" style="width:12px;height:12px;min-width:12px;max-width:12px;display:inline-block;flex-shrink:0;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>${escapeHtml(cleanLabel)}</span></button>`;
}

function parseMarkdownTables(text) {
  // Matches markdown tables: lines starting with |
  const tableRegex = /((?:^[ \t]*\|[^\n]+\|[ \t]*\n)+)/gm;
  return text.replace(tableRegex, (match) => {
    const rawLines = match.trim().split('\n').map(l => l.trim());
    if (rawLines.length < 2) return match;

    // Check if second line is a delimiter |:---|:---|
    const delimiter = rawLines[1];
    if (!/^[ \t]*\|(?:\s*:?-+:?\s*\|)+[ \t]*$/.test(delimiter)) {
      return match;
    }

    const parseRow = (line) => {
      return line.slice(1, line.length - 1).split('|').map(c => c.trim());
    };

    const headers = parseRow(rawLines[0]);
    const rows = rawLines.slice(2).map(parseRow);

    let html = `<div class="overflow-x-auto my-4"><table class="w-full text-xs sm:text-sm text-left border-collapse border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden">\n`;
    html += `  <thead class="bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">\n    <tr>\n`;
    headers.forEach(h => {
      html += `      <th scope="col" class="px-3.5 py-2.5">${h}</th>\n`;
    });
    html += `    </tr>\n  </thead>\n  <tbody class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300">\n`;

    rows.forEach(r => {
      html += `    <tr>\n`;
      r.forEach(cell => {
        html += `      <td class="px-3.5 py-3 align-top leading-relaxed">${cell}</td>\n`;
      });
      html += `    </tr>\n`;
    });
    html += `  </tbody>\n</table></div>\n`;

    return html;
  });
}

function parseEvidenceDrawers(text, isZh) {
  return text.replace(/<details class="evidence-drawer">([\s\S]*?)<\/details>/g, (match, inner) => {
    const sumMatch = inner.match(/<summary>([\s\S]*?)<\/summary>/);
    let summaryContent = '';
    let bodyContent = inner;
    if (sumMatch) {
      summaryContent = sumMatch[1].trim();
      bodyContent = inner.replace(sumMatch[0], '').trim();
    }

    const toggleHint = isZh
      ? '<span class="group-open:hidden">展开证据 ⬇</span><span class="hidden group-open:inline">收起证据 ⬆</span>'
      : '<span class="group-open:hidden">Expand ⬇</span><span class="hidden group-open:inline">Collapse ⬆</span>';

    return `
<details class="evidence-drawer group">
  <summary class="evidence-drawer-summary">
    <span class="flex items-center gap-2">
      <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
      <span>${summaryContent}</span>
    </span>
    <span class="text-[11px] font-semibold text-brand">${toggleHint}</span>
  </summary>
  <div class="evidence-drawer-content prose max-w-none dark:prose-invert text-xs sm:text-sm">
    ${bodyContent}
  </div>
</details>`;
  });
}

function compileChapter(rawMarkdown, isZh) {
  let content = rawMarkdown;

  // 1. Remove YAML frontmatter if present
  if (content.startsWith('---')) {
    const endIdx = content.indexOf('---', 3);
    if (endIdx !== -1) {
      content = content.slice(endIdx + 3).trim();
    }
  }

  // 2. Token Replacement: [skill:id "custom label"] or [skill:id]
  content = content.replace(/\[skill:([\w-]+)(?:\s+"([^"]+)")?\]/g, (match, id, label) => {
    return makeSkillPill(id, label, isZh);
  });

  // 3. Token Replacement: [incident:id "custom label"] or [incident:id]
  content = content.replace(/\[incident:([\w-]+)(?:\s+"([^"]+)")?\]/g, (match, id, label) => {
    return makeIncidentPill(id, label, isZh);
  });

  // 4. Markdown Tables
  content = parseMarkdownTables(content);

  // 5. Evidence Drawers
  content = parseEvidenceDrawers(content, isZh);

  // 6. Section Markdown Headings & Lists (when outside of raw HTML)
  // Convert lines starting with ## to <h3> or <h4> if needed
  content = content.replace(/^## (?!【)(.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 my-4"><span>$1</span></h3>');
  content = content.replace(/^### 【正文·([^】]+)】/gm, '<h4 class="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 my-3"><span class="w-2 h-2 rounded-full bg-brand"></span><span>$1</span></h4>');
  content = content.replace(/^#### (.+)$/gm, '<h5 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 my-2">$1</h5>');

  // Convert list items * ... to <li>
  // Note: Most of the complex cards are structured HTML with markdown elements inside
  return content;
}

function buildGuide() {
  console.log('🚀 Starting Guide Compilation from Markdown...');

  const result = {
    zh: { ...metadata.zh, bodyHtml: '' },
    en: { ...metadata.en, bodyHtml: '' }
  };

  ['zh', 'en'].forEach(lang => {
    const isZh = lang === 'zh';
    const langDir = path.join(rootDir, 'content/guide', lang);
    const chapterHtmls = [];

    let totalTokensSkills = 0;
    let totalTokensIncidents = 0;

    for (let i = 1; i <= 6; i++) {
      const filename = `chapter-${i}.md`;
      const filePath = path.join(langDir, filename);

      if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing file: ${filePath}`);
        process.exit(1);
      }

      const raw = fs.readFileSync(filePath, 'utf-8');
      totalTokensSkills += (raw.match(/\[skill:/g) || []).length;
      totalTokensIncidents += (raw.match(/\[incident:/g) || []).length;

      const compiled = compileChapter(raw, isZh);
      chapterHtmls.push(compiled);
    }

    result[lang].bodyHtml = chapterHtmls.join('\n\n      ');
    console.log(`✅ [${lang.toUpperCase()}] Compiled 6 chapters (${result[lang].bodyHtml.length} chars, ${totalTokensSkills} skills, ${totalTokensIncidents} incidents)`);
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
