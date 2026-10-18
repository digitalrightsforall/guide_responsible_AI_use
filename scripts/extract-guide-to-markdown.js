#!/usr/bin/env node
/**
 * Automated Extractor: Deconstructs site/js/guide.js into modular Markdown files.
 * Generates:
 * - content/guide/metadata.json
 * - content/guide/zh/chapter-1.md ... chapter-6.md
 * - content/guide/en/chapter-1.md ... chapter-6.md
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const guideJsPath = path.join(__dirname, '../site/js/guide.js');
const guideJsContent = fs.readFileSync(guideJsPath, 'utf-8');
const lines = guideJsContent.split('\n');

// 1. Extract the guideContent object via vm sandbox
const guideContentText = lines.slice(1003, 4647).join('\n');

function makePill(skillId, label) {
  if (label && label.trim() !== skillId) {
    return `[skill:${skillId} "${label.trim()}"]`;
  }
  return `[skill:${skillId}]`;
}

function makeIncidentPill(incidentId, label) {
  if (label && label.trim() !== incidentId) {
    const cleanLabel = label.trim().replace(/\s*[↗➔→]\s*$/, '');
    return `[incident:${incidentId} "${cleanLabel}"]`;
  }
  return `[incident:${incidentId}]`;
}

function renderEvidenceDrawer(opts) {
  const isZh = opts.lang !== 'en';
  const title = opts.title || (isZh ? '实证与延伸：真实判例、法规条款与技术原理' : 'Evidence & References: Cases, Statutes & Mechanisms');
  const countStr = opts.count ? ` (${opts.count})` : '';
  
  let md = `\n<details class="evidence-drawer">\n`;
  md += `<summary>🔍 <strong>${title}</strong><em>${countStr}</em></summary>\n\n`;

  if (opts.cases && opts.cases.length > 0) {
    md += `#### ⚖️ ${isZh ? '真实案例与权威通报 (Real-World Incidents)' : 'Real-World Incidents & Sanctions'}\n`;
    if (opts.caseSummary) {
      md += `${opts.caseSummary}\n\n`;
    } else {
      md += `*${isZh ? '点击案卷标签可原地查阅案号、行政罚单与第一手裁判文书：' : 'Click pills to inspect official rulings and case numbers:'}*\n\n`;
    }
    opts.cases.forEach(c => {
      md += `* ${c}\n`;
    });
    md += '\n';
  }

  if (opts.statutes && opts.statutes.length > 0) {
    md += `#### 📜 ${isZh ? '法规条款与标准对齐 (Statutes & Standards)' : 'Statutes & Regulatory Standards'}\n`;
    opts.statutes.forEach(s => {
      md += `* ${s}\n`;
    });
    md += '\n';
  }

  if (opts.technical && opts.technical.length > 0) {
    md += `#### 🔬 ${isZh ? '学术文献与技术机理解析 (Technical & Research Deep Dive)' : 'Technical & Research Deep Dive'}\n`;
    opts.technical.forEach(t => {
      md += `* ${t}\n`;
    });
    md += '\n';
  }

  md += `</details>\n`;
  return md;
}

function renderActionPanel(opts) {
  const isZh = opts.lang !== 'en';
  const header = isZh ? '行动建议与分级实操' : 'Action Guidance & Tiered Practices';
  const dontTitle = isZh ? '常见高危做法 ❌' : 'High-Risk Practices ❌';
  const doTitle = isZh ? '规范自卫打法 ✅' : 'Standard Defense ✅';
  const tiersHeading = isZh ? '你可以这样做（按自己的情况选一档）' : 'What you can do (pick the tier that fits you)';
  const t1 = isZh ? '零门槛 · 只用浏览器或手机' : 'Zero Setup · Browser / Mobile Only';
  const t2 = isZh ? '进阶 · 愿意装个软件或在本地操作' : 'Intermediate · Local Tools & Redaction';
  const t3 = isZh ? '专业 · 使用支持技能的 AI 客户端' : 'Advanced · AI Tools with Agent Skills';
  const verify = isZh ? '✔ 怎么确认做对了' : '✔ How to verify you did it right';

  let md = `\n### 【正文·行动建议与分级实操】\n\n`;
  md += `| ${dontTitle} | ${doTitle} |\n`;
  md += `| :--- | :--- |\n`;
  md += `| ${opts.dontText.replace(/\n/g, ' ')} | ${opts.doText.replace(/\n/g, ' ')} |\n\n`;

  md += `#### ${tiersHeading}\n\n`;
  md += `1. **${t1}**\n`;
  (opts.tierBrowser || []).forEach(item => {
    md += `   - ${item}\n`;
  });
  md += `2. **${t2}**\n`;
  (opts.tierSoftware || []).forEach(item => {
    md += `   - ${item}\n`;
  });
  md += `3. **${t3}**\n`;
  (opts.tierSkills || []).forEach(item => {
    md += `   - ${item}\n`;
  });
  md += `\n> **${verify}**：${opts.verifyText}\n\n`;

  return md;
}

function renderSkillPipelineSection(options) {
  const isZh = !!options.titleZh;
  const title = isZh ? options.titleZh : options.titleEn;
  const subtitle = isZh ? options.subtitleZh : options.subtitleEn;

  let md = `\n### 【正文·${title}】\n\n`;
  md += `> **工序流程**：${subtitle}\n\n`;
  md += `#### ${isZh ? '核心防线技能推荐' : 'Core Curated Skills'}\n`;
  (options.primary || []).forEach(p => {
    const tier = isZh ? p.tierZh : p.tierEn;
    const role = isZh ? p.roleZh : p.roleEn;
    md += `* [skill:${p.id}] **${tier}**：${role}\n`;
  });
  md += '\n';

  if (options.alternates && options.alternates.length > 0) {
    md += `#### 📦 ${isZh ? '备选与补充技能（根据环境自由选用）' : 'Alternative & Supplementary Skills'}\n`;
    options.alternates.forEach(a => {
      md += `* [skill:${a.id} "${a.label}"]\n`;
    });
    md += '\n';
  }

  return md;
}

function renderPersonaPlaybook(opts) {
  const isZh = opts.lang !== 'en';
  const role = isZh ? opts.roleZh : opts.roleEn;
  const title = isZh ? opts.titleZh : opts.titleEn;
  const intro = isZh ? opts.introZh : opts.introEn;
  const painTitle = isZh ? '1. 现实痛点与诱惑 (Temptation & Pain Point)' : '1. Real Pain Point & Temptation';
  const painText = isZh ? opts.painZh : opts.painEn;
  const timelineTitle = isZh ? '2. 一日自卫战术时刻表 (Chronological Playbook)' : '2. Chronological Daily Defense';
  const minStdTitle = isZh ? '3. 最低完成标准与交付核对 (Verification Sign-off)' : '3. Verification Sign-off & Minimum Baseline';
  const minZero = isZh ? opts.minZeroZh : opts.minZeroEn;
  const minPro = isZh ? opts.minProZh : opts.minProEn;

  let md = `\n## ${title}\n`;
  md += `> **${role}**  \n> ${intro}\n\n`;
  md += `### ${painTitle}\n${painText}\n\n`;
  md += `### ${timelineTitle}\n`;
  (opts.steps || []).forEach(step => {
    const sTitle = isZh ? step.titleZh : step.titleEn;
    const sDesc = isZh ? step.descZh : step.descEn;
    md += `- **${step.time} ${sTitle}**  \n  ${sDesc}\n`;
  });
  md += `\n### ${minStdTitle}\n`;
  md += `- **${isZh ? '最低要求 (零门槛)' : 'Minimum Baseline (Zero Setup)'}**：${minZero}\n`;
  md += `- **${isZh ? '进阶交付 (专业级)' : 'Professional Standard (Advanced)'}**：${minPro}\n\n`;

  if (opts.cases && opts.cases.length > 0) {
    md += `<details class="evidence-drawer">\n`;
    md += `<summary>⚠️ ${isZh ? '本角色真实前车之鉴与合规警示' : 'Real-World Incident Precedents'}</summary>\n\n`;
    md += `${isZh ? opts.nearMissZh : opts.nearMissEn}\n\n`;
    opts.cases.forEach(c => {
      md += `* ${c}\n`;
    });
    md += `</details>\n\n`;
  }

  return md;
}

const sandbox = {
  makePill,
  makeIncidentPill,
  renderEvidenceDrawer,
  renderActionPanel,
  renderSkillPipelineSection,
  renderPersonaPlaybook
};

const script = new vm.Script(guideContentText + '; this.guideContent = guideContent;');
const context = vm.createContext(sandbox);
script.runInContext(context);

const gc = sandbox.guideContent;

// 2. Extract metadata
const metadata = {
  zh: {},
  en: {}
};

const metaKeys = [
  'pageTitle', 'navBrandTitle', 'navBrandSub', 'navLinkGuide',
  'navLinkLibrary', 'navLinkIncidents', 'navLinkPutongren', 'footerLinkIncidents',
  'tLangBtn', 'heroBadge', 'heroTitle', 'heroTitleHighlight', 'heroSubtitle',
  'metaReadTime', 'metaSkillsCount', 'metaScenarios', 'heroCtaPlaybook',
  'heroCtaStart', 'heroCtaLibrary', 'tocTitle', 'sidebarBoxDesc', 'sidebarBoxLink'
];

metaKeys.forEach(k => {
  metadata.zh[k] = gc.zh[k];
  metadata.en[k] = gc.en[k];
});

const contentDir = path.join(__dirname, '../content/guide');
const zhDir = path.join(contentDir, 'zh');
const enDir = path.join(contentDir, 'en');

fs.mkdirSync(zhDir, { recursive: true });
fs.mkdirSync(enDir, { recursive: true });

fs.writeFileSync(path.join(contentDir, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf-8');
console.log('✅ Wrote content/guide/metadata.json');

// 3. Slice chapters
function extractChapters(bodyHtml) {
  const chapters = {};
  for (let i = 1; i <= 6; i++) {
    const startTag = `<section id="chapter-${i}"`;
    const startIdx = bodyHtml.indexOf(startTag);
    if (startIdx === -1) continue;

    // Find end tag: either next chapter start or end of string
    let endIdx = -1;
    if (i < 6) {
      endIdx = bodyHtml.indexOf(`<section id="chapter-${i + 1}"`);
    } else {
      endIdx = bodyHtml.lastIndexOf('</section>');
      if (endIdx !== -1) endIdx += '</section>'.length;
    }

    if (endIdx === -1) endIdx = bodyHtml.length;
    chapters[`chapter-${i}`] = bodyHtml.slice(startIdx, endIdx).trim();
  }
  return chapters;
}

const zhChapters = extractChapters(gc.zh.bodyHtml);
const enChapters = extractChapters(gc.en.bodyHtml);

// Save markdown files
Object.entries(zhChapters).forEach(([chId, content]) => {
  const filename = `${chId}.md`;
  const filePath = path.join(zhDir, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Extracted ZH ${filename} (${content.length} bytes)`);
});

Object.entries(enChapters).forEach(([chId, content]) => {
  const filename = `${chId}.md`;
  const filePath = path.join(enDir, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Extracted EN ${filename} (${content.length} bytes)`);
});

console.log('\n🎉 Extraction complete! All 12 chapter Markdown files created in content/guide/.');
