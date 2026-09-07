#!/usr/bin/env node
/**
 * Data integrity and schema verification script for items.json
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../site/data/items.json');

console.log('🔍 Validating site/data/items.json against Item Schema...');

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

const allowedTypes = ['SKILL.md', 'Prompt'];
const allowedActionTypes = ['install_code', 'copy_prompt'];

const seenIds = new Set();
let errors = 0;

items.forEach((item, index) => {
  const prefix = `[Item #${index + 1} (${item.id || 'unnamed'})]`;

  // Check required fields
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
    'action_type',
    'action_content'
  ];

  requiredFields.forEach((field) => {
    if (!item[field] || (typeof item[field] === 'string' && item[field].trim() === '')) {
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
});

if (errors > 0) {
  console.error(`\n❌ Validation failed with ${errors} error(s)!`);
  process.exit(1);
} else {
  console.log(`\n✅ Success! All ${items.length} items strictly conform to the Item Schema.`);
  process.exit(0);
}
