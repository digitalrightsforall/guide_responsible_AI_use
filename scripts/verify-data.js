#!/usr/bin/env node
/**
 * Data integrity and schema verification script for items.json
 * Validates the 3 core dimensions:
 * 1. Why chosen (why_chosen_en, why_chosen_cn)
 * 2. When to use / timing (timing, timing_desc_en, timing_desc_cn)
 * 3. Status & Trust signals (status: stage, adoption, trust_source)
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../site/data/items.json');

console.log('🔍 Validating site/data/items.json against Enhanced Item Schema...');

if (!fs.existsSync(dataPath)) {
  console.error('❌ Error: site/data/items.json not found!');
  process.exit(1);
}

let items;
try {
  const content = fs.readFileSync(dataPath, 'utf-8');
  items = JSON.parse(content);
} catch (e) {
  console.error('❌ Error parsing items.json:', e.message);
  process.exit(1);
}

if (!Array.isArray(items)) {
  console.error('❌ Error: items.json must be an array of items!');
  process.exit(1);
}

const allowedCategories = [
  'feed-to-ai',
  'answers-to-trust',
  'when-not-to-listen',
  'can-publish-directly'
];

const allowedTimings = [
  'pre-input',
  'during-chat',
  'pre-handoff',
  'post-session'
];

const allowedTypes = ['SKILL.md'];
const allowedActionTypes = ['install_code'];

const seenIds = new Set();
let errors = 0;

items.forEach((item, index) => {
  const prefix = `[Item #${index + 1} (${item.id || 'unnamed'})]`;

  // Check required base fields
  const requiredFields = [
    'id',
    'name',
    'category',
    'category_title_en',
    'category_title_cn',
    'type',
    'clients',
    'target_persona',
    'summary_en',
    'summary_cn',
    'timing',
    'timing_desc_en',
    'timing_desc_cn',
    'why_chosen_en',
    'why_chosen_cn',
    'why_care_cn',
    'why_care_en',
    'how_to_use_cn',
    'how_to_use_en',
    'status',
    'action_type',
    'action_content'
  ];

  requiredFields.forEach((field) => {
    if (item[field] === undefined || item[field] === null || (typeof item[field] === 'string' && item[field].trim() === '')) {
      console.error(`❌ ${prefix} Missing or empty required field: ${field}`);
      errors++;
    }
  });

  // Check ID uniqueness and format
  if (item.id) {
    if (!/^[a-z0-9-]+$/.test(item.id)) {
      console.error(`❌ ${prefix} ID '${item.id}' must be lowercase kebab-case`);
      errors++;
    }
    if (seenIds.has(item.id)) {
      console.error(`❌ ${prefix} Duplicate ID '${item.id}'`);
      errors++;
    }
    seenIds.add(item.id);
  }

  // Check category
  if (item.category && !allowedCategories.includes(item.category)) {
    console.error(`❌ ${prefix} Invalid category '${item.category}'. Allowed: ${allowedCategories.join(', ')}`);
    errors++;
  }

  // Check timing
  if (item.timing && !allowedTimings.includes(item.timing)) {
    console.error(`❌ ${prefix} Invalid timing '${item.timing}'. Allowed: ${allowedTimings.join(', ')}`);
    errors++;
  }

  // Check status object
  if (item.status) {
    if (typeof item.status !== 'object') {
      console.error(`❌ ${prefix} 'status' must be an object`);
      errors++;
    } else {
      ['stage', 'adoption', 'trust_source'].forEach((statusField) => {
        if (!item.status[statusField] || item.status[statusField].trim() === '') {
          console.error(`❌ ${prefix} Missing status.${statusField}`);
          errors++;
        }
      });
    }
  }

  // Check type
  if (item.type && !allowedTypes.includes(item.type)) {
    console.error(`❌ ${prefix} Invalid type '${item.type}'. Allowed: ${allowedTypes.join(', ')}`);
    errors++;
  }

  // Check action_type
  if (item.action_type && !allowedActionTypes.includes(item.action_type)) {
    console.error(`❌ ${prefix} Invalid action_type '${item.action_type}'. Allowed: ${allowedActionTypes.join(', ')}`);
    errors++;
  }

  // Check clients is array
  if (!Array.isArray(item.clients) || item.clients.length === 0) {
    console.error(`❌ ${prefix} 'clients' must be a non-empty array of strings`);
    errors++;
  }

  // Check URL is a genuine public GitHub repository (no raw gists or synthetic placeholders)
  if (!item.url || !item.url.startsWith('https://github.com/')) {
    console.error(`❌ ${prefix} URL must start with 'https://github.com/': ${item.url}`);
    errors++;
  }
  if (item.url && item.url.includes('gist.github.com')) {
    console.error(`❌ ${prefix} Gist URLs are forbidden in production catalog: ${item.url}`);
    errors++;
  }

  // Enforce zero prompts rule
  if (/prompt/i.test(item.name) || /prompt/i.test(item.type)) {
    console.error(`❌ ${prefix} Prompt items are forbidden. Only authentic SKILL.md entries allowed.`);
    errors++;
  }

  // Validate third-party references and supporting materials
  if (!Array.isArray(item.references) || item.references.length === 0) {
    console.error(`❌ ${prefix} 'references' must be a non-empty array of third-party evidence items`);
    errors++;
  } else {
    const allowedRefTypes = ['blog', 'report', 'catalog_inclusion', 'community_review'];
    item.references.forEach((ref, refIdx) => {
      const refPrefix = `${prefix} Reference #${refIdx + 1}`;
      if (!allowedRefTypes.includes(ref.type)) {
        console.error(`❌ ${refPrefix} Invalid reference type '${ref.type}'. Allowed: ${allowedRefTypes.join(', ')}`);
        errors++;
      }
      if (!ref.url || !ref.url.startsWith('http')) {
        console.error(`❌ ${refPrefix} Invalid reference url: ${ref.url}`);
        errors++;
      }
      ['source', 'title_zh', 'title_en', 'takeaway_zh', 'takeaway_en'].forEach((k) => {
        if (!ref[k] || ref[k].trim() === '') {
          console.error(`❌ ${refPrefix} Missing or empty field: ${k}`);
          errors++;
        }
      });
    });
  }
});

if (errors > 0) {
  console.error(`\n❌ Validation failed with ${errors} error(s)!`);
  process.exit(1);
} else {
  console.log(`\n✅ Success! All ${items.length} items strictly conform to the Enhanced Item Schema with 3 core dimensions.`);
  process.exit(0);
}
