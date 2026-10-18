#!/usr/bin/env node
/**
 * Automated Extractor: Deconstructs guide narrative content into modular Markdown files.
 * Extracts:
 * - content/guide/metadata.json
 * - content/guide/zh/chapter-1.md ... chapter-6.md
 * - content/guide/en/chapter-1.md ... chapter-6.md
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const guideJsPath = path.join(__dirname, '../site/js/guide.js.bak') || path.join(__dirname, '/tmp/online_guide.js');
let guideJsContent = '';

if (fs.existsSync(path.join(__dirname, '../site/js/guide.js.bak'))) {
  guideJsContent = fs.readFileSync(path.join(__dirname, '../site/js/guide.js.bak'), 'utf-8');
} else if (fs.existsSync('/tmp/online_guide.js')) {
  guideJsContent = fs.readFileSync('/tmp/online_guide.js', 'utf-8');
} else {
  console.error('❌ Cannot find source guide.js with original content!');
  process.exit(1);
}

const lines = guideJsContent.split('\n');

// 1. Extract metadata
const updateUIIdx = lines.findIndex(l => l.startsWith('function updateUI'));
const evalCode = lines.slice(0, updateUIIdx).join('\n') + '\nthis.extracted = { guideContent };';

const sandbox = {
  window: {}, document: { addEventListener: () => {}, documentElement: { classList: { add: () => {}, remove: () => {} } } },
  localStorage: { getItem: () => 'zh', setItem: () => {} },
  fetch: () => Promise.resolve({ json: () => Promise.resolve([]) }), console: console, currentLang: 'zh'
};

const script = new vm.Script(evalCode);
const context = vm.createContext(sandbox);
script.runInContext(context);

const gc = sandbox.extracted.guideContent;

const metadata = { zh: {}, en: {} };
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

// 2. Slice raw chapters from template literal
function sliceChapters(rawText) {
  const chs = {};
  for (let i = 1; i <= 6; i++) {
    const startStr = `<section id="chapter-${i}"`;
    const startIdx = rawText.indexOf(startStr);
    let endIdx = -1;
    if (i < 6) {
      endIdx = rawText.indexOf(`<section id="chapter-${i + 1}"`);
    } else {
      endIdx = rawText.lastIndexOf('</section>') + '</section>'.length;
    }
    chs[`chapter-${i}`] = rawText.slice(startIdx, endIdx).trim();
  }
  return chs;
}

const zhRaw = lines.slice(1032, 2821).join('\n');
const enRaw = lines.slice(2849, 4647).join('\n');

const zhChapters = sliceChapters(zhRaw);
const enChapters = sliceChapters(enRaw);

Object.entries(zhChapters).forEach(([chId, content]) => {
  const filename = `${chId}.md`;
  fs.writeFileSync(path.join(zhDir, filename), content, 'utf-8');
  console.log(`✅ Extracted ZH ${filename} (${content.length} bytes)`);
});

Object.entries(enChapters).forEach(([chId, content]) => {
  const filename = `${chId}.md`;
  fs.writeFileSync(path.join(enDir, filename), content, 'utf-8');
  console.log(`✅ Extracted EN ${filename} (${content.length} bytes)`);
});

console.log('\n🎉 Extraction complete! All 12 chapter Markdown files created in content/guide/.');
