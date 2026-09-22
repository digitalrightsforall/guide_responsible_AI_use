#!/usr/bin/env node
/**
 * Automatically regenerates README.md and README_CN.md from site/data/items.json
 * Ensures 100% data consistency, 3 mandatory presentation dimensions, and
 * reflects the refined dynamic framework of Responsible and Safe AI Use.
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../site/data/items.json');
const readmePath = path.join(__dirname, '../README.md');
const readmeCnPath = path.join(__dirname, '../README_CN.md');

const items = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Timing labels
const timingLabelsEn = {
  'pre-input': '⏳ Pre-Input',
  'during-chat': '💬 During-Chat',
  'pre-handoff': '📤 Pre-Handoff',
  'post-session': '🧹 Post-Session'
};

const timingLabelsCn = {
  'pre-input': '⏳ 输入前',
  'during-chat': '💬 交互中',
  'pre-handoff': '📤 交付前',
  'post-session': '🧹 归档清理'
};

const categoryMetaEn = {
  'feed-to-ai': {
    title: '1. What can I feed to AI?',
    subtitle: 'Guarding against commercial AI over-harvesting personal identity (PII), confidential client data, and proprietary drafts.'
  },
  'answers-to-trust': {
    title: '2. Which answers can I trust?',
    subtitle: 'Guarding against blind faith in hallucinated citations, fabricated data points, and unverified factual assertions.'
  },
  'when-not-to-listen': {
    title: '3. When should I NOT listen to AI?',
    subtitle: 'Guarding against automation bias, sycophancy, and delegating non-delegable ethical or professional judgments.'
  },
  'can-publish-directly': {
    title: '4. Can the output be published directly?',
    subtitle: 'Ensuring third-party verifiability, provenance tracking, and explicit publication gates.'
  }
};

const categoryMetaCn = {
  'feed-to-ai': {
    title: '1. 我能把什么给 AI？',
    subtitle: '防止将个人身份信息（PII）、商业机密草案或受保护的访谈记录无意泄露给商业大模型作为训练语料。'
  },
  'answers-to-trust': {
    title: '2. 哪些回答能信？',
    subtitle: '防止被 AI 极度自信的幻觉引用文献（Phantom Citations）、捏造的数据统计和伪造断言所误导。'
  },
  'when-not-to-listen': {
    title: '3. 什么时候不能听 AI？',
    subtitle: '破除“自动化偏见”（Automation Bias）与盲目赞同，划定人类决策的不可让渡底线。'
  },
  'can-publish-directly': {
    title: '4. 输出能不能直接发布？',
    subtitle: '让第三方（同事、读者、客户、监管）能够方便地核查验证成果证据链，拒绝空洞的形式化免责。'
  }
};

const categories = ['feed-to-ai', 'answers-to-trust', 'when-not-to-listen', 'can-publish-directly'];

// Generate English README
function generateReadmeEn() {
  let md = `# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)\n\n`;
  md += `> A curated collection of ${items.length} production-ready \`SKILL.md\` packages and verified prompt protocols designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.\n\n`;
  md += `**English** | [中文版](README_CN.md)\n\n---\n\n`;

  md += `## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)\n\n`;
  md += `This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyone protect their rights and agency in the algorithmic era.\n\n`;
  md += `In this project, we curate **existing, proven open-source skills** (we strictly curate, not invent). The practical connotation of responsible and safe AI use is unpacked into two dynamic pillars:\n\n`;

  md += `1. **🛡️ Inward: Self-Defense & Boundaries (对内·自我防护与边界)**: Guard against commercial AI over-harvesting your personal and confidential data into training corpora, and guard against blind faith in confident hallucinations or sycophantic appeasement.\n`;
  md += `2. **📐 Outward: Third-Party Verifiability (对外·成果第三方可核验)**: Ensure colleagues, clients, and readers can readily audit the evidence chain and reasoning behind AI-assisted work, moving beyond hollow bureaucratic disclaimers.\n\n`;
  md += `> [!NOTE]\n> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid or dogmatic doctrine.\n\n`;
  md += `---\n\n`;

  md += `## 📦 Client Installation Standard (Where do Skills live?)\n\n`;
  md += `According to the open Agent Skills specification:\n`;
  md += `* **Cursor / Google Antigravity:** \`.agents/skills/<skill-name>/SKILL.md\`\n`;
  md += `* **Claude Code:** \`.claude/skills/<skill-name>/SKILL.md\`\n\n`;
  md += `Always copy the **entire skill directory** (including bundled scripts and references) rather than merely copying \`SKILL.md\`.\n\n`;
  md += `---\n\n`;

  md += `## 🧭 The Four Practical Questions\n\n`;
  categories.forEach((cat) => {
    const meta = categoryMetaEn[cat];
    const anchor = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    md += `* [${meta.title}](#${anchor})\n`;
  });
  md += `* [🛑 Non-Delegable Red Lines](#-non-delegable-red-lines)\n\n`;
  md += `---\n\n`;

  // Categories and items
  categories.forEach((cat) => {
    const meta = categoryMetaEn[cat];
    const catItems = items.filter((it) => it.category === cat);

    md += `### ${meta.title}\n`;
    md += `*${meta.subtitle}*\n\n`;

    catItems.forEach((item) => {
      const timingBadge = timingLabelsEn[item.timing] || item.timing;
      const titleLink = item.url ? `[\`${item.name}\`](${item.url})` : `\`${item.name}\``;

      md += `#### ${titleLink}\n`;
      md += `* **Type:** \`${item.type}\`\n`;
      md += `* **Workflow Timing:** ${timingBadge} — *${item.timing_desc_en}*\n`;
      md += `* **🎯 Why Chosen:** ${item.why_chosen_en}\n`;
      md += `* **📊 Maturity & Trust:** \`${item.status.stage}\` | ⭐ ${item.status.adoption} | 🛡️ *${item.status.trust_source}*\n`;
      md += `* **Clients:** ${item.clients.join(', ')}\n`;
      md += `* **Target Persona:** ${item.target_persona}\n`;
      md += `* **Problem Solved:** ${item.summary_en}\n`;

      if (item.type === 'SKILL.md' && item.action_content) {
        md += `* **Install / Setup:**\n`;
        md += `  \`\`\`bash\n  ${item.action_content}\n  \`\`\`\n\n`;
      } else if (item.type === 'Prompt' && item.action_content) {
        md += `* **Prompt Template:**\n`;
        md += `  \`\`\`text\n${item.action_content.split('\n').map(l => '  ' + l).join('\n')}\n  \`\`\`\n\n`;
      } else {
        md += `\n`;
      }
    });

    md += `---\n\n`;
  });

  // Red Lines
  md += `## 🛑 Non-Delegable Red Lines\n\n`;
  md += `Under no circumstances should the following decisions be blindly delegated to AI:\n`;
  md += `* **Medical diagnosis & prescription decisions** without qualified practitioner review.\n`;
  md += `* **Legal compliance sign-offs** and binding contractual agreements.\n`;
  md += `* **Final personnel evaluations**, hiring rejections, and disciplinary actions.\n`;
  md += `* **Sole-source reporting**: Publishing journalistic claims based solely on an LLM response without primary source verification.\n\n`;
  md += `---\n\n`;



  md += `## 🤝 Contributing\n\n`;
  md += `Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.\n\n`;
  md += `## 📄 License\n\n`;
  md += `[MIT](LICENSE) © 2026 Responsible AI Use Contributors\n`;

  return md;
}

// Generate Chinese README
function generateReadmeCn() {
  let md = `# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)\n\n`;
  md += `> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 ${items.length} 个成熟 \`SKILL.md\` 规范技能与高质量结构化提示词。我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。\n\n`;
  md += `[English Version](README.md) | **中文版**\n\n---\n\n`;

  md += `## 💡 核心理念：负责任与安全使用 AI 的当下实务内核（动态演进框架）\n\n`;
  md += `本项目由[**「普通人的数字权利」共创社区 (putongren.org)**](https://putongren.org)发起，致力于帮助每一个人在机器与算法时代守护个人数字权利与尊严。\n\n`;
  md += `本项目坚持**“只精选，不生造”**，从开源生态中甄选真实存在的优秀开源工具。当前我们将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：\n\n`;

  md += `1. **🛡️ 对内·自我防护与边界**：警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守人类的独立思考与决策权。\n`;
  md += `2. **📐 对外·成果第三方可核验**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者或客户能够轻松核查，而非给出一纸空洞的形式化免责声明。\n\n`;
  md += `> [!NOTE]\n> 这一拆解本身并非固化的教条，而是**保持动态演进**的实务框架，随着模型能力与应用形态的深入不断更新演化。\n\n`;
  md += `---\n\n`;

  md += `## 📦 客户端技能安装规范（目录指南）\n\n`;
  md += `根据 Agent Skills 开源标准，不同客户端加载本地技能的路径如下：\n`;
  md += `* **Cursor / Google Antigravity:** \`.agents/skills/<skill-name>/SKILL.md\`\n`;
  md += `* **Claude Code:** \`.claude/skills/<skill-name>/SKILL.md\`\n\n`;
  md += `安装时请**完整复制整个技能文件夹**（包含自带的脚本和引用文件），而不要仅复制单份 \`SKILL.md\`。\n\n`;
  md += `---\n\n`;

  md += `## 🧭 四大核心实务问题导航\n\n`;
  categories.forEach((cat) => {
    const meta = categoryMetaCn[cat];
    const anchor = meta.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
    md += `* [${meta.title}](#${anchor})\n`;
  });
  md += `* [🛑 人类决策的不可让渡底线](#-人类决策的不可让渡底线)\n\n`;
  md += `---\n\n`;

  // Categories and items
  categories.forEach((cat) => {
    const meta = categoryMetaCn[cat];
    const catItems = items.filter((it) => it.category === cat);

    md += `### ${meta.title}\n`;
    md += `*${meta.subtitle}*\n\n`;

    catItems.forEach((item) => {
      const timingBadge = timingLabelsCn[item.timing] || item.timing;
      const titleLink = item.url ? `[\`${item.name}\`](${item.url})` : `\`${item.name}\``;

      md += `#### ${titleLink}\n`;
      md += `* **类型：** \`${item.type}\`\n`;
      md += `* **使用时机：** ${timingBadge} — *${item.timing_desc_cn}*\n`;
      md += `* **🎯 为什么精选：** ${item.why_chosen_cn}\n`;
      md += `* **📊 成熟度与可信背书：** \`${item.status.stage}\` | ⭐ ${item.status.adoption} | 🛡️ *${item.status.trust_source}*\n`;
      md += `* **适用客户端：** ${item.clients.join('、')}\n`;
      md += `* **适用人群：** ${item.target_persona}\n`;
      md += `* **核心价值：** ${item.summary_cn}\n`;

      if (item.type === 'SKILL.md' && item.action_content) {
        md += `* **安装命令：**\n`;
        md += `  \`\`\`bash\n  ${item.action_content}\n  \`\`\`\n\n`;
      } else if (item.type === 'Prompt' && item.action_content) {
        md += `* **提示词模板：**\n`;
        md += `  \`\`\`text\n${item.action_content.split('\n').map(l => '  ' + l).join('\n')}\n  \`\`\`\n\n`;
      } else {
        md += `\n`;
      }
    });

    md += `---\n\n`;
  });

  // Red Lines
  md += `## 🛑 人类决策的不可让渡底线\n\n`;
  md += `在任何情况下，以下决策与行为均不可盲目让渡给 AI：\n`;
  md += `* **未经执业医生独立复核**的医疗诊断与用药处方决策。\n`;
  md += `* **具有法律效力**的合规签字与不可撤销的商业合同签署。\n`;
  md += `* **针对具体个人**的最终处分、解雇或招聘拒绝决定。\n`;
  md += `* **仅凭 AI 对话结果**作为独家信源对外发布事实报道。\n\n`;
  md += `---\n\n`;



  md += `## 🤝 参与贡献\n\n`;
  md += `欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。\n\n`;
  md += `## 📄 开源许可证\n\n`;
  md += `[MIT License](LICENSE) © 2026 Responsible AI Use Contributors\n`;

  return md;
}

fs.writeFileSync(readmePath, generateReadmeEn(), 'utf-8');
console.log(`✅ Generated README.md with all ${items.length} items and 3 core dimensions.`);

fs.writeFileSync(readmeCnPath, generateReadmeCn(), 'utf-8');
console.log(`✅ Generated README_CN.md with all ${items.length} items and 3 core dimensions.`);
