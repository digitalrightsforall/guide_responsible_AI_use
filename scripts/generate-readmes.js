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
  md += `Most "Responsible AI" resources are written for **model developers and enterprise compliance teams**: they discuss algorithmic fairness, model weights, red-teaming benchmarks, and corporate governance.\n\n`;
  md += `However, once AI becomes an everyday utility on your desktop, an entirely different practical challenge emerges:\n`;
  md += `**How can everyday individuals practice Responsible and Safe AI Use?**\n\n`;
  md += `In this project, we curate **existing, proven open-source skills and prompts** (we curate, not invent). The practical connotation of responsible and safe AI use is currently unpacked into two dynamic pillars:\n\n`;
  md += `1. **🛡️ Inward: Self-Defense & Boundaries (对内·自我防护与边界)**: Guard against commercial AI over-harvesting your personal and confidential data into training corpora, and guard against blind faith in confident hallucinations or sycophantic appeasement.\n`;
  md += `2. **📐 Outward: Third-Party Verifiability (对外·成果第三方可核验)**: Ensure colleagues, clients, and readers can readily audit the evidence chain and reasoning behind AI-assisted work, moving beyond hollow bureaucratic disclaimers.\n\n`;
  md += `> [!NOTE]\n> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid or dogmatic doctrine.\n\n`;

  md += `| Dimension | Traditional Responsible AI | Responsible AI Use (This Project) |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| **Core Subject** | Model developers, deployment institutions, regulators | **Everyday users, knowledge workers, professionals** |\n`;
  md += `| **Core Object** | AI system architecture & model weights | **Human–AI interaction & daily practice** |\n`;
  md += `| **Typical Questions** | Is the model fair? How to audit the company? | **What can I feed to AI? Which answers can I trust? When should I NOT listen to AI? Can output be published directly?** |\n`;
  md += `| **Governance Means** | Corporate policies, ISO standards, algorithmic audits | **Skills (\`SKILL.md\`), sensible defaults, checklists, verification prompts** |\n`;
  md += `| **Responsibility Direction** | "Do not build or deploy harmful AI" | **"Do not use AI in an irresponsible or reckless manner"** |\n`;
  md += `| **Risk Bearer** | Society at large, generic end-users | **Yourself + the people impacted by your own AI-assisted work** |\n\n`;
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
  md += `* [⚡ The 30-Second Pre-flight Checklist](#-the-30-second-pre-flight-checklist)\n`;
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

  // Checklist
  md += `## ⚡ The 30-Second Pre-flight Checklist\n\n`;
  md += `Print or pin this checklist to your workspace before interacting with any AI tool:\n\n`;
  md += `| Stage | Question to Ask Yourself | Responsible Action |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| **1. Pre-Input** | *"Would I be comfortable seeing this text published on the front page of a newspaper tomorrow?"* | If NO: Scrub names, emails, internal numbers, and confidential notes before sending. |\n`;
  md += `| **2. During Interaction** | *"Did the AI cite a specific paper, statistic, or law?"* | Verify the DOI/link in an independent tab. Never assume cited URLs or quotes are authentic. |\n`;
  md += `| **3. During Decision** | *"Am I agreeing just because the AI's tone is confident and polite?"* | Ask for counter-arguments or potential failure modes before committing. |\n`;
  md += `| **4. Before Output** | *"Can I provide a clear evidence trail for colleagues/readers to verify my AI-assisted deliverable?"* | Attach an honest AI disclosure statement, verification points, and retain prompt logs. |\n\n`;
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
  md += `目前绝大部分关于“负责任 AI”（Responsible AI）的讨论和工具库，都是写给**模型开发者、科技巨头和政策合规团队**的——讨论的是训练集偏差、模型可解释性、红蓝对抗评测和算法审计。\n\n`;
  md += `然而，**当 AI 已经成为普通人的日常桌面工具时，一个人怎样才能安全、规范且负责任地使用它？** 这实际上是一套完全不同的实务问题。\n\n`;
  md += `本项目坚持**“只精选，不生造”**，从开源生态中甄选真实存在的优秀开源工具与成熟提示词。当前我们将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：\n\n`;
  md += `1. **🛡️ 对内·自我防护与边界**：警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守人类的独立思考与决策权。\n`;
  md += `2. **📐 对外·成果第三方可核验**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者或客户能够轻松核查，而非给出一纸空洞的形式化免责声明。\n\n`;
  md += `> [!NOTE]\n> 这一拆解本身并非固化的教条，而是**保持动态演进**的实务框架，随着模型能力与应用形态的深入不断更新演化。\n\n`;

  md += `| 维度 | 传统 Responsible AI | 本项目关注的 Responsible AI Use |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| **核心主体** | 开发者、部署机构、监管机构 | **普通用户、知识工作者、专业研究者** |\n`;
  md += `| **核心对象** | AI 系统架构、模型权重与服务部署 | **人机互动与日常使用实践（Human–AI Practice）** |\n`;
  md += `| **典型问题** | 模型公平吗？是否可解释？机构如何问责？ | **我能把什么给 AI？哪些回答能信？什么时候不能听 AI？输出能不能直接发布？** |\n`;
  md += `| **主要治理手段** | 内部合规 Policy、行业标准、算法审计 | **Skills 技能（\`SKILL.md\`）、安全默认配置、实务清单、验证提示词** |\n`;
  md += `| **责任方向** | “不要制造/部署有害的 AI” | **“不要以不负责任的方式使用 AI”** |\n`;
  md += `| **典型风险承担者** | 抽象的社会公众、被自动化决策的人群 | **你自己 + 被你的 AI 使用结果直接影响到的人** |\n\n`;
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
  md += `* [⚡ 日常 AI 负责任使用 30 秒核对清单](#-日常-ai-负责任使用-30-秒核对清单)\n`;
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

  // Checklist
  md += `## ⚡ 日常 AI 负责任使用 30 秒核对清单\n\n`;
  md += `建议将此清单常驻在你的办公屏幕旁，在每次与 AI 交互时对照自检：\n\n`;
  md += `| 交互阶段 | 自问的一句话 | 负责任的实操动作 |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| **1. 发送输入前** | *“如果把这段话公开登在明天的报纸头版，我会惹上麻烦吗？”* | 如果会：立即剔除真实姓名、手机号、机密内网地址和内部未公开财务数据。 |\n`;
  md += `| **2. 阅读回答时** | *“AI 刚才引用的论文、法条或数据，真实存在吗？”* | 在独立浏览器标签页中亲自搜索验证该 DOI 或法规原文，绝不直接采纳未验引文。 |\n`;
  md += `| **3. 准备采纳时** | *“我是因为内容客观可信而采纳，还是因为 AI 态度礼貌自信而盲信？”* | 要求 AI 提供相反观点或失效边界，确认人类对结果承担最终责任。 |\n`;
  md += `| **4. 对外发布前** | *“第三方（同事、读者、雇主）能够方便地核验我使用 AI 的成果和论据吗？”* | 附带简要的 AI 使用说明与核查切入点，并妥善保存关键 Prompt 对话记录备查。 |\n\n`;
  md += `---\n\n`;

  md += `## 🤝 参与贡献\n\n`;
  md += `欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。\n\n`;
  md += `## 📄 开源许可证\n\n`;
  md += `[MIT License](LICENSE) © 2026 Responsible AI Use Contributors\n`;

  return md;
}

fs.writeFileSync(readmePath, generateReadmeEn(), 'utf-8');
console.log('✅ Generated README.md with all 26 items and 3 core dimensions.');

fs.writeFileSync(readmeCnPath, generateReadmeCn(), 'utf-8');
console.log('✅ Generated README_CN.md with all 26 items and 3 core dimensions.');
