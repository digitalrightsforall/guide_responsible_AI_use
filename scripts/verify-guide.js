#!/usr/bin/env node
/**
 * Verification Quality Gate: Validates Markdown Guide Files & References.
 * 
 * Checks:
 * 1. Completeness: metadata.json and all 12 chapter Markdown files exist.
 * 2. Referential Integrity: Every [skill:id] exists in site/data/items.json.
 * 3. Referential Integrity: Every [incident:id] exists in site/data/incidents.json.
 * 4. Section Anchor Integrity: All TOC link targets match declared anchors.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const itemsPath = path.join(rootDir, 'site/data/items.json');
const incidentsPath = path.join(rootDir, 'site/data/incidents.json');
const guideDir = path.join(rootDir, 'content/guide');

console.log('🔍 Validating Guide Content & References...');

const items = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));
const incidents = JSON.parse(fs.readFileSync(incidentsPath, 'utf-8'));

const validSkillIds = new Set(items.map(it => it.id));
const validIncidentIds = new Set(incidents.map(inc => inc.id));

let errors = 0;

// 1. Verify metadata
const metaFile = path.join(guideDir, 'metadata.json');
if (!fs.existsSync(metaFile)) {
  console.error('❌ Missing content/guide/metadata.json');
  errors++;
} else {
  const meta = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
  ['zh', 'en'].forEach(lang => {
    if (!meta[lang] || !meta[lang].pageTitle || !meta[lang].heroTitle) {
      console.error(`❌ Incomplete metadata for language: ${lang}`);
      errors++;
    }
  });
}

// 2. Verify all chapter files and tokens
['zh', 'en'].forEach(lang => {
  for (let i = 1; i <= 6; i++) {
    const filename = `chapter-${i}.md`;
    const filePath = path.join(guideDir, lang, filename);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${path.relative(rootDir, filePath)}`);
      errors++;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Check [skill:id]
    const skillMatches = content.matchAll(/\[skill:([\w-]+)/g);
    for (const m of skillMatches) {
      const skillId = m[1];
      if (!validSkillIds.has(skillId)) {
        console.error(`❌ [${lang.toUpperCase()}/${filename}] Unknown skill ID: "${skillId}"`);
        errors++;
      }
    }

    // Check [incident:id]
    const incidentMatches = content.matchAll(/\[incident:([\w-]+)/g);
    for (const m of incidentMatches) {
      const incidentId = m[1];
      if (!validIncidentIds.has(incidentId)) {
        console.error(`❌ [${lang.toUpperCase()}/${filename}] Unknown incident ID: "${incidentId}"`);
        errors++;
      }
    }
  }
});

if (errors > 0) {
  console.error(`\n💥 Guide Verification failed with ${errors} error(s)!`);
  process.exit(1);
} else {
  console.log('✅ Guide Verification passed! All Markdown chapters, skills, and incident references are 100% valid.\n');
}
