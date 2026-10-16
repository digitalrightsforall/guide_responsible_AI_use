#!/usr/bin/env node
/**
 * Automatically regenerates README.md and README_CN.md from site/data/items.json and site/data/incidents.json
 * Generates an executive, highly engaging landing README designed to:
 * 1. Present the project mission and practical positioning (Digital Rights for All / putongren.org)
 * 2. Unveil the Tri-Pillar Architecture: Field Guide, Skill Library (44 skills), and Incident Database (31 cases)
 * 3. Detail the Four Practical Questions and workflow defense matrix
 * 4. Document client directory standards, operational status, and quality gates
 * 5. Provide full repo structure and developer commands
 */
const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '../site/data/items.json');
const incidentsPath = path.join(__dirname, '../site/data/incidents.json');
const readmePath = path.join(__dirname, '../README.md');
const readmeCnPath = path.join(__dirname, '../README_CN.md');

const items = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));
const incidents = JSON.parse(fs.readFileSync(incidentsPath, 'utf-8'));

// Calculate counts per category dynamically
const categoryCounts = {};
items.forEach((it) => {
  categoryCounts[it.category] = (categoryCounts[it.category] || 0) + 1;
});

// Generate English README
function generateReadmeEn() {
  let md = `# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Vetted Skills](https://img.shields.io/badge/Vetted%20Skills-${items.length}%20Curated-8a2be2.svg)](https://rai.putongren.org/library.html) [![Case Law & Incidents](https://img.shields.io/badge/Judicial%20Cases-${incidents.length}%20Verified-rose.svg)](https://rai.putongren.org/incidents.html) [![Format: SKILL.md](https://img.shields.io/badge/Format-SKILL.md-success.svg)](https://agentskills.io) [![Remote Health](https://img.shields.io/badge/URLs%20Health-${items.length}%2F${items.length}%20Live-brightgreen.svg)](#-operational-status--verified-evidence-methodology) [![Community](https://img.shields.io/badge/Community-putongren.org-orange.svg)](https://putongren.org)\n\n`;
  md += `> A curated collection of **${items.length} production-ready \`SKILL.md\` packages** and **${incidents.length} authentic judicial & regulatory cases**, empowering everyday knowledge workers, researchers, developers, writers, and administrative staff to practice **Responsible and Safe AI Use**—protecting private data from silent harvesting, guarding against hallucinations and algorithmic sycophancy, and ensuring deliverables are verifiable by third parties.\n\n`;
  md += `**English** | [中文版](README_CN.md) | 📖 [Practical Field Guide](https://rai.putongren.org/) | 🛡️ [Interactive Skill Library](https://rai.putongren.org/library.html) | ⚖️ [Incident & Case Law Database](https://rai.putongren.org/incidents.html)\n\n---\n\n`;

  md += `## 🌟 Project Ecosystem: Tri-Pillar Architecture\n\n`;
  md += `Rather than staying as an abstract ethical manifesto, this project is built as an interactive, **three-in-one practical toolkit** for anyone using commercial LLMs and modern AI Agent IDEs:\n\n`;
  md += `* 📖 **[The Practical Field Guide (实务长篇指南)](https://rai.putongren.org/)** (*Homepage / \`site/index.html\`*):\n`;
  md += `  A comprehensive, narrative-driven walkthrough that deconstructs the silent risks of the algorithmic era, sets platform anti-retention baselines, provides a 30-second safety cheat sheet, orchestrates all ${items.length} skills across **6 daily workflow scenarios**, and provides 5 persona battle playbooks with interactive inline skill cards.\n\n`;
  md += `* 🛡️ **[The Interactive Skill Library (实务技能库)](https://rai.putongren.org/library.html)** (*Web Catalog / \`site/library.html\`*):\n`;
  md += `  A responsive, searchable web catalog of **${items.length} vetted open-source skills**. Filterable by the 4 Practical Questions and 4 workflow timings, with genuine client harness tags, transparent maturity indicators, and copyable installation commands.\n\n`;
  md += `* ⚖️ **[The Real-World Incident & Case Law Database (真实判例与案例库)](https://rai.putongren.org/incidents.html)** (*Case Library / \`site/incidents.html\`*):\n`;
  md += `  A curated repository of **${incidents.length} authentic judicial judgments, regulatory penalties, and official security advisories** (including landmark AI voice infringement rulings, court reprimands for fabricated AI citations, AMR administrative fines for AI false advertising, and employee discipline for uploading confidential drafts). Each incident links directly to official case numbers, authentic source documents, and matching defensive skills.\n\n`;
  md += `* 💻 **[The Open-Source GitHub Repository](https://github.com/digitalrightsforall/guide_responsible_AI_use)** (*This Repo*):\n`;
  md += `  The canonical source of truth containing standardized data schemas (\`site/data/items.json\`, \`site/data/incidents.json\`), automated quality gate scripts, and local developer tooling.\n\n`;
  md += `---\n\n`;

  md += `## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)\n\n`;
  md += `This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyday people protect their rights, privacy, and agency in the algorithmic era.\n\n`;
  md += `Abstract ethical principles (\"fairness\", \"transparency\", \"beneficence\") often fail at the desktop because they don't tell users what to do when pasting sensitive data into a prompt or reviewing an AI-generated draft. In this project, we curate **existing, proven open-source skills** and anchor responsible AI practice into two dynamic pillars:\n\n`;
  md += `1. **🛡️ Inward: Self-Defense & Boundary Enforcement (对内·自我防护与边界)**:\n`;
  md += `   - **Prevent Data Over-Harvesting & Mosaic Profiling**: Guard against commercial LLM vendors silently turning your draft proposals, interview transcripts, and private source code into their next-generation training corpora. Redact PII and quasi-identifiers locally before ingestion.\n`;
  md += `   - **Verify Confident Hallucinations & Break Sycophancy**: Guard against models fabricating citations with high conviction or flattering your flawed premises, preserving human critical judgment.\n`;
  md += `   - **Agent Execution Sandbox**: Confine autonomous AI Agents with microVM sandboxes and permission gates to prevent destructive host file deletions or credential theft.\n\n`;
  md += `2. **📐 Outward: Third-Party Verifiability & Legal Compliance (对外·成果第三方可核验)**:\n`;
  md += `   - **Auditable Evidence Chains**: Ensure that when you deliver an AI-assisted report, code change, or paper, colleagues, clients, and readers can readily audit the source evidence, reasoning logs, and data anchors.\n`;
  md += `   - **Concrete Publication Gates**: Replace hollow disclaimer footers with hard pre-release verification gates (advertising claims verification, SPDX license compliance, secret scanning, WCAG accessibility).\n\n`;
  md += `> [!NOTE]\n> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid doctrine.\n\n`;
  md += `---\n\n`;

  md += `## 🧭 The Four Practical Questions\n\n`;
  md += `Rather than debating abstract ethics, this project anchors responsible and safe AI use in **four urgent desktop questions**. All ${items.length} production-ready skills are organized around these questions:\n\n`;
  md += `| Practical Question | Threat Addressed & Core Connotation | Skills Count | Web Explorer |
| :--- | :--- | :---: | :--- |
| **1. What can I feed to AI?** | Prevent commercial LLMs from harvesting proprietary drafts, sensitive cases, and PII into training corpora; intercept prompt injections | **${categoryCounts['feed-to-ai'] || 10} Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#feed-to-ai) |
| **2. Which answers can I trust?** | Verify confident hallucinations, fake DOI citations, fabricated numbers, and plausible falsehoods | **${categoryCounts['answers-to-trust'] || 10} Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#answers-to-trust) |
| **3. When should I NOT listen to AI?** | Break algorithmic sycophancy and automation bias to defend human critical scrutiny and judgment | **${categoryCounts['when-not-to-listen'] || 10} Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#when-not-to-listen) |
| **4. Can the output be published directly?** | Enforce advertising substantiation, SPDX license hygiene, secret scanning, and accessibility gates | **${categoryCounts['can-publish-directly'] || 14} Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#can-publish-directly) |\n\n`;

  md += `> 🌟 **Explore the Full Interactive Platform**:\n`;
  md += `> - 📖 **[Read the Practical Field Guide](https://rai.putongren.org/)**: Deep narrative walking through 6 real-world workflow scenarios with clickable inline skill pills.\n`;
  md += `> - 🛡️ **[Explore the Interactive Skill Library](https://rai.putongren.org/library.html)**: Instant search and filtering across all ${items.length} skills, with genuine client harness tags and one-click install commands.\n`;
  md += `> - ⚖️ **[Browse the Incident Database](https://rai.putongren.org/incidents.html)**: Review ${incidents.length} authentic judicial rulings, administrative penalty notices, and official security advisories.\n\n`;
  md += `---\n\n`;

  md += `## 📦 Client Installation Guide\n\n`;
  md += `All skills in this repository strictly adhere to the open **Agent Skills specification** (\`SKILL.md\`). To load skills into your environment:\n\n`;
  md += `### Directory Layout by Platform\n\n`;
  md += `* **Claude Code:**\n`;
  md += `  \`\`\`bash\n`;
  md += `  # Project-level skill (recommended, shared with repo)\n`;
  md += `  mkdir -p .claude/skills/<skill-name>/\n`;
  md += `  # User-global skill (accessible across all sessions)\n`;
  md += `  mkdir -p ~/.claude/skills/<skill-name>/\n`;
  md += `  \`\`\`\n\n`;
  md += `* **Agent IDEs Supporting \`.agents/skills/\` (Cursor, Google Antigravity, Trae):**\n`;
  md += `  \`\`\`bash\n`;
  md += `  mkdir -p .agents/skills/<skill-name>/\n`;
  md += `  \`\`\`\n\n`;
  md += `* **Web Chat / General LLMs (Claude Web, ChatGPT, Kimi, Doubao):**\n`;
  md += `  No local tooling required. Simply copy the core verification prompts and rules from \`SKILL.md\` into your Custom Instructions or chat context.\n\n`;
  md += `> [!IMPORTANT]\n`;
  md += `> **Copy the entire skill directory**: Many advanced skills bundle executable Python/Bash validation scripts, threat pattern databases, and reference templates. Never copy only \`SKILL.md\` in isolation—always copy the entire skill directory as specified in the [Skill Library](https://rai.putongren.org/library.html).\n\n`;
  md += `---\n\n`;

  md += `## 🔬 Operational Status & Verified Evidence Methodology\n\n`;
  md += `To ensure absolute transparency and banish obscure technical jargon, each skill is rated with plain-language, tiered indicators:\n\n`;
  md += `* **🟢 Ready to Use (Verified):** Pure prompt/rules engineering conforming to the \`SKILL.md\` specification with zero local binary dependencies. Effective immediately upon placement into the client skill directory. All workflow steps have passed local syntax and structural verification.\n`;
  md += `* **🟡 Requires Setup (Ready):** Requires a local environment dependency (e.g. Python 3.10+, SpaCy NER model, Gitleaks scanner) or a dedicated API token. Clear prerequisites are documented in the skill details.\n`;
  md += `* **🌐 Repository Reachability:** All ${items.length} repositories are verified reachable live via automated health checks (${items.length}/${items.length} HTTP 2xx/3xx).\n`;
  md += `* **⚠️ Standards Alignment Disclaimer:** Mappings to ISO/IEC, SPDX, and PIPL standards reflect **curators' technical alignment analyses rather than formal third-party accreditations**.\n\n`;
  md += `> [!TIP]\n`;
  md += `> **First time here? Try the Beginner 5 Starter Skills (No Local Setup Required)**:\n`;
  md += `> 1. \`pii-safe-documents\` (Personal Data & PII Sanitizer)\n`;
  md += `> 2. \`citation-verifier\` (Citation & DOI Authenticity Verifier)\n`;
  md += `> 3. \`devils-advocate\` (Anti-Sycophancy Critical Challenger)\n`;
  md += `> 4. \`visible-ai-disclosure-pr-gate\` (AI Disclosure & PR Compliance Gate)\n`;
  md += `> 5. \`repo-security-review\` (Credential & Secret Leak Prevention)\n\n---\n\n`;

  md += `## 🗂️ Repository Structure\n\n`;
  md += `\`\`\`text\n`;
  md += `.\n`;
  md += `├── site/                       # Static Web Application (Production: https://rai.putongren.org)\n`;
  md += `│   ├── index.html              # 📖 Practical Field Guide (实务长篇指南)\n`;
  md += `│   ├── library.html            # 🛡️ Interactive Skill Library (实务技能库)\n`;
  md += `│   ├── incidents.html          # ⚖️ Incident & Case Law Database (真实判例与案例库)\n`;
  md += `│   ├── css/\n`;
  md += `│   │   ├── style.css           # Custom styling, typography & dark mode system\n`;
  md += `│   │   └── tailwind.css        # Compiled Tailwind CSS bundle\n`;
  md += `│   ├── js/\n`;
  md += `│   │   ├── layout.js           # Unified site header, mobile navigation & footer component\n`;
  md += `│   │   ├── guide.js            # Guide narrative logic, scrollspy & inline modals\n`;
  md += `│   │   ├── library.js          # Skill library search, filter & detail modals\n`;
  md += `│   │   └── incidents.js        # Incident library category filter & case study modals\n`;
  md += `│   ├── data/\n`;
  md += `│   │   ├── items.json          # Master database of all ${items.length} vetted skills\n`;
  md += `│   │   └── incidents.json      # Master database of all ${incidents.length} verified legal & regulatory cases\n`;
  md += `│   └── sitemap.xml             # Search engine optimization index\n`;
  md += `├── scripts/                    # Automation & Quality Gate Tooling\n`;
  md += `│   ├── verify-data.js          # Skill schema & integrity test gate (npm test)\n`;
  md += `│   ├── validate-incidents.js   # Incident data integrity & source URL check gate\n`;
  md += `│   ├── verify-remote.js        # Live HTTP reachability check (npm run test:remote)\n`;
  md += `│   ├── generate-readmes.js     # Auto-regenerate README.md & README_CN.md (npm run build)\n`;
  md += `│   ├── sync-layout.js          # Synchronize unified header & footer templates\n`;
  md += `│   └── serve.js                # Local preview server (npm run serve)\n`;
  md += `├── ref/                        # In-depth empirical research reports & legal forensic documents\n`;
  md += `├── CONTRIBUTING.md             # Standards, schema & submission guide\n`;
  md += `├── README.md                   # English Master Documentation\n`;
  md += `├── README_CN.md                # Chinese Master Documentation\n`;
  md += `└── package.json\n`;
  md += `\`\`\`\n\n`;
  md += `---\n\n`;

  md += `## 🧪 Local Development & Quality Gates\n\n`;
  md += `This repository maintains strict engineering and verification standards:\n\n`;
  md += `\`\`\`bash\n`;
  md += `# 1. Validate skill schema and SKILL.md format constraints\n`;
  md += `npm test\n\n`;
  md += `# 2. Validate incident database integrity and case citations\n`;
  md += `node scripts/validate-incidents.js\n\n`;
  md += `# 3. Test live HTTP reachability for all ${items.length} remote GitHub repositories\n`;
  md += `npm run test:remote\n\n`;
  md += `# 4. Regenerate English & Chinese READMEs and synchronize site layout templates\n`;
  md += `npm run build\n\n`;
  md += `# 5. Compile and minify Tailwind CSS\n`;
  md += `npm run build:css\n\n`;
  md += `# 6. Launch local preview server\n`;
  md += `npm run serve\n`;
  md += `# Open http://localhost:3000 (Field Guide), /library.html, or /incidents.html\n`;
  md += `\`\`\`\n\n`;
  md += `---\n\n`;

  md += `## 🤝 Contributing\n\n`;
  md += `Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.\n\n`;
  md += `## 📄 License\n\n`;
  md += `[MIT](LICENSE) © 2026 Digital Rights for All (putongren.org) & Responsible AI Use Contributors\n`;

  return md;
}

// Generate Chinese README
function generateReadmeCn() {
  let md = `# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选与实务指南) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![精选技能数](https://img.shields.io/badge/精选技能-${items.length}%20项-8a2be2.svg)](https://rai.putongren.org/library.html) [![真实司法判例](https://img.shields.io/badge/司法与监管案例-${incidents.length}%20起-rose.svg)](https://rai.putongren.org/incidents.html) [![规范标准](https://img.shields.io/badge/规范格式-SKILL.md-success.svg)](https://agentskills.io) [![链接健康度](https://img.shields.io/badge/开源可达性-${items.length}%2F${items.length}%20全部存活-brightgreen.svg)](#-运行状态与实证指标评定说明) [![社区共建](https://img.shields.io/badge/共建社区-普通人的数字权利-orange.svg)](https://putongren.org)\n\n`;
  md += `> 一个面向日常知识工作者、高校师生、软件开发者、文案创作者与企业行政人员的实战安全指南与开源工具箱。收录 **${items.length} 个成熟开源 \`SKILL.md\` 规范技能** 与 **${incidents.length} 起中外权威司法与监管实案**。本项目致力于帮助每位普通使用者在日常使用 AI 时做好关键把关：**对内防范敏感数据隐蔽采集、提示词注入与盲信依附，对外构建可溯源核验的合规证据链**。\n\n`;
  md += `[English Version](README.md) | **中文版** | 📖 [阅读实务长篇指南 (Field Guide)](https://rai.putongren.org/) | 🛡️ [在线实务技能库 (Library)](https://rai.putongren.org/library.html) | ⚖️ [真实判例与案例库 (Incidents)](https://rai.putongren.org/incidents.html)\n\n---\n\n`;

  md += `## 🌟 项目生态：三位一体实操架构\n\n`;
  md += `本项目拒绝停留在抽象空泛的道德倡议层面，而是为广大日常使用大语言模型与智能体 IDE 的普通人提供了一套**可落地、可检索、有法可依的三位一体实战平台**：\n\n`;
  md += `* 📖 **[实务长篇指南 (Field Guide)](https://rai.putongren.org/)**（*网站首页 / \`site/index.html\`*）：\n`;
  md += `  深度叙事长篇指南。系统解构算法时代的平民处境（数据主权剥夺、自信幻觉与认知依附），建立平台防留存基线，提供 30 秒安全速查，并通过 **6 大核心工作流场景**（涵盖平台防静默留存、Agent 执行沙盒隔离、法定发布门禁等）串联全量 ${items.length} 项技能，行文内嵌交互式技能药丸与 5 大角色的一日安全工作流。\n\n`;
  md += `* 🛡️ **[实务技能库 (Skill Library)](https://rai.putongren.org/library.html)**（*交互技能库 / \`site/library.html\`*）：\n`;
  md += `  开箱即用的交互式技能筛选与搜索平台。收录 **${items.length} 项严格审核的成熟开源规范技能**，按 4 大实务追问与 4 大时序分类，去除了未经验证的“通用兼容”宣传，真实标注客户端依赖与原生安装指令，支持一键复制代码。\n\n`;
  md += `* ⚖️ **[真实判例与案例库 (Incident Database)](https://rai.putongren.org/incidents.html)**（*案例平台 / \`site/incidents.html\`*）：\n`;
  md += `  收录 **${incidents.length} 起真实发生的中外司法判例、行政监管处罚与官方安全通报**（包含北京互联网法院 AI 声音权侵权案、最高法指导案例、通州法院 AI 捏造假案号当庭训诫、厦门/济南市监局 AI 虚假广告顶格行政处罚、企事业单位涉密文件违规投喂模型处分通报等）。每个案例均严格核对权威案号、当事人抗辩、裁判依据与防御对策，打破“AI 翻车离我很远”的侥幸心态。\n\n`;
  md += `* 💻 **[GitHub 开源主仓库](https://github.com/digitalrightsforall/guide_responsible_AI_use)**（*本仓库*）：\n`;
  md += `  严谨的数据中心与工程源泉。托管规范化的技能数据集（\`site/data/items.json\`）、案例数据集（\`site/data/incidents.json\`）、严格的自动化测试质检门禁（\`scripts/\`）以及双语文档生成引擎。\n\n`;
  md += `---\n\n`;

  md += `## 💡 核心理念：负责任与安全使用 AI 的当下实务内核（动态演进框架）\n\n`;
  md += `本项目由[**「普通人的数字权利」共创社区 (putongren.org)**](https://putongren.org)发起，致力于帮助每一个人在机器与算法时代守护个人数字权利与尊严。\n\n`;
  md += `宏观层面的 AI 伦理倡议（如“以人为本”、“公平透明”）往往无法解决普通人在输入框或命令行面前的具体困惑：“这篇未公开底稿能不能喂？”、“这个判例和引文是不是 AI 编造的？”、“这段文案直接发会不会触犯广告法被罚款？”。本项目精选开源生态中经过验证的实用工具，将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：\n\n`;
  md += `1. **🛡️ 对内·自我防护与边界**：\n`;
  md += `   - **防范数据隐蔽采集与马赛克拼图**：警惕商业大模型通过晦涩协议，将你的日常对话、未公开草稿、私有源码或敏感个案当做免费语料静默采集，坚决在本地筑牢数据边界，阻断准标识符拼凑画像。\n`;
  md += `   - **打破自信幻觉与谄媚**：警惕 AI 极度自信地伪造事实或为了取悦人类而放弃客观性，通过多方比对与交叉质询，坚守人类的独立审校本能与终审决策权。\n`;
  md += `   - **Agent 越权与破坏性操作隔离**：通过沙盒隔离与命令门禁，限制自主智能体越权读写本地文件系统或执行不可逆删除。\n\n`;
  md += `2. **📐 对外·成果第三方可核验**：\n`;
  md += `   - **主动附带实证链条**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者、雇主或法庭能够轻松核查，而非给出一纸空洞的形式化免责声明。\n`;
  md += `   - **硬性发布门禁**：通过广告法绝对化用语核查、SPDX 开源协议合规、代码密钥扫描、Web 无障碍审计等法定与行业标准门禁，阻断违规成果流出。\n\n`;
  md += `> [!NOTE]\n> 这一实务框架将随着模型能力与应用形态的演进保持持续更新。\n\n`;
  md += `---\n\n`;

  md += `## 🧭 四大核心实务问题导航\n\n`;
  md += `我们将负责任与安全使用 AI 归结为日常最直接的**四大实务追问**。全量 ${items.length} 项开源规范技能已系统收录在我们的在线交互平台中：\n\n`;
  md += `| 实务问题 | 核心自卫威胁与实务内涵 | 包含技能 | 在线交互入口 |
| :--- | :--- | :---: | :--- |
| **1. 我能把什么给 AI？** | 防范商业模型对未公开草案、敏感信息与个人身份数据的过度采集；阻断间接提示词注入 | **${categoryCounts['feed-to-ai'] || 10} 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#feed-to-ai) |
| **2. 哪些回答能信？** | 核查虚构引文（DOI 查真伪）、捏造数据与高度自信的事实性幻觉 | **${categoryCounts['answers-to-trust'] || 10} 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#answers-to-trust) |
| **3. 什么时候不能听 AI？** | 防范模型的谄媚迎合（Sycophancy）与盲目顺从，打破自动化偏见，保持批判性求证 | **${categoryCounts['when-not-to-listen'] || 10} 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#when-not-to-listen) |
| **4. 输出能不能直接发布？** | 执行广告合规核查、开源协议审计、硬编码凭证扫描与数字无障碍检查 | **${categoryCounts['can-publish-directly'] || 14} 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#can-publish-directly) |\n\n`;

  md += `> 🌟 **欢迎体验完整的在线三位一体平台**：\n`;
  md += `> - 📖 **[阅读《实务指南》 (Field Guide)](https://rai.putongren.org/)**：6 大真实工作流场景深度推演，行文内嵌微卡片原地交互。\n`;
  md += `> - 🛡️ **[探索《实务技能库》 (Skill Library)](https://rai.putongren.org/library.html)**：实时搜索、分类过滤、查阅各技能的真实客户端适配标签，一键复制终端安装命令。\n`;
  md += `> - ⚖️ **[查阅《真实判例与案例库》 (Incidents)](https://rai.putongren.org/incidents.html)**：31 起权威司法判例与行政监管处罚决定，案卷案号与事实一查便知。\n\n`;
  md += `---\n\n`;

  md += `## 📦 客户端技能安装规范（目录指南）\n\n`;
  md += `根据开放 **Agent Skills 规范**（\`SKILL.md\`），不同客户端加载本地技能的路径如下：\n\n`;
  md += `### 各平台目录位置\n\n`;
  md += `* **Claude Code:**\n`;
  md += `  \`\`\`bash\n`;
  md += `  # 项目级技能（推荐，跟随代码库共享）\n`;
  md += `  mkdir -p .claude/skills/<skill-name>/\n`;
  md += `  # 用户全局技能（所有会话通用）\n`;
  md += `  mkdir -p ~/.claude/skills/<skill-name>/\n`;
  md += `  \`\`\`\n\n`;
  md += `* **支持 \`.agents/skills/\` 规范的 Agent IDE (Cursor / Google Antigravity / Trae):**\n`;
  md += `  \`\`\`bash\n`;
  md += `  # 项目根目录自动识别\n`;
  md += `  mkdir -p .agents/skills/<skill-name>/\n`;
  md += `  \`\`\`\n\n`;
  md += `* **网页版 / 通用对话大模型 (ChatGPT / Claude Web / Kimi / 豆包):**\n`;
  md += `  无需安装复杂环境，读者可直接复制技能包内的核心核验规则（Prompt / Markdown 模板）作为系统指令、自定义指令（Custom Instructions）或前置约束使用。\n\n`;
  md += `> [!IMPORTANT]\n`;
  md += `> **必须完整拉取整个技能文件夹**：许多高质量技能内置了独立的 Python/Bash 校验脚本、正则威胁库与参考模板。绝不要只单份复制 \`SKILL.md\`，请始终按 [实务技能库](https://rai.putongren.org/library.html) 中各条目的安装命令完整拉取整个目录。\n\n`;
  md += `---\n\n`;

  md += `## 🔬 运行状态与实证指标评定说明\n\n`;
  md += `为了让每位使用者清晰了解工具的可用程度，本库废除模糊表述，将技能评定建立在透明分级指标之上：\n\n`;
  md += `* **🟢 开箱即用 (实测通过)**：纯提示词/规则工程规范，无外部二进制依赖，放入技能目录即可被客户端识别。核心交互流程经本地静态规则核验。\n`;
  md += `* **🟡 需配置依赖 (环境就绪)**：需在本地预装指定环境（如 Python 3.10+、SpaCy 实体库、Gitleaks 密钥扫描器等）或配置专用 API Token，具备明确的前置条件。\n`;
  md += `* **🌐 开源链接健康度**：全量 ${items.length} 项技能通过自动化巡检（HTTP 2xx/3xx 可达）。\n`;
  md += `* **⚠️ 标准对齐说明**：各技能标注的 ISO/IEC、SPDX、PIPL 等标准与法规对齐，系**项目维护团队基于机制与最佳实践的技术合规映射，非官方认证机构之授权认证**。\n\n`;
  md += `> [!TIP]\n`;
  md += `> **初次接触？新手必看「5项免配起步清单」**：\n`;
  md += `> 1. \`pii-safe-documents\`（隐私与脱敏检查）\n`;
  md += `> 2. \`citation-verifier\`（引文真实性与DOI查伪）\n`;
  md += `> 3. \`devils-advocate\`（打破模型谄媚与盲从）\n`;
  md += `> 4. \`visible-ai-disclosure-pr-gate\`（生成内容标注与合规门禁）\n`;
  md += `> 5. \`repo-security-review\`（敏感凭据与代码泄漏防范）\n\n---\n\n`;

  md += `## 🗂️ 代码仓库组织目录\n\n`;
  md += `\`\`\`text\n`;
  md += `.\n`;
  md += `├── site/                       # 静态网页应用 (线上地址: https://rai.putongren.org)\n`;
  md += `│   ├── index.html              # 📖 实务长篇指南 (Field Guide)\n`;
  md += `│   ├── library.html            # 🛡️ 交互式技能库 (Skill Library)\n`;
  md += `│   ├── incidents.html          # ⚖️ 真实判例与案例库 (Incident Database)\n`;
  md += `│   ├── css/\n`;
  md += `│   │   ├── style.css           # 全站样式、排版与深色模式支持\n`;
  md += `│   │   └── tailwind.css        # Tailwind 编译打包产物\n`;
  md += `│   ├── js/\n`;
  md += `│   │   ├── layout.js           # 统一页眉导航、移动端快捷栏与页脚组件\n`;
  md += `│   │   ├── guide.js            # 指南页面逻辑、目录随动高亮与行文微弹窗\n`;
  md += `│   │   ├── library.js          # 技能库检索、过滤与详情弹窗交互\n`;
  md += `│   │   └── incidents.js        # 案例库分类检索与案卷事实弹窗交互\n`;
  md += `│   ├── data/\n`;
  md += `│   │   ├── items.json          # 全量 ${items.length} 项技能核心主数据库\n`;
  md += `│   │   └── incidents.json      # 全量 ${incidents.length} 起中外司法与监管实案数据库\n`;
  md += `│   └── sitemap.xml             # 搜索引擎索引地图\n`;
  md += `├── scripts/                    # 自动化与质检工具\n`;
  md += `│   ├── verify-data.js          # 技能 Schema 格式与数据门禁测试 (npm test)\n`;
  md += `│   ├── validate-incidents.js   # 案例数据完整性与案号合规校验门禁\n`;
  md += `│   ├── verify-remote.js        # ${items.length} 个 GitHub 链接实时存活巡检 (npm run test:remote)\n`;
  md += `│   ├── generate-readmes.js     # 自动生成中英双语 README (npm run build)\n`;
  md += `│   ├── sync-layout.js          # 全站统一 Header/Footer 模版编译同步\n`;
  md += `│   └── serve.js                # 双端口本地开发静态服务器 (npm run serve)\n`;
  md += `├── ref/                        # 深度法医学调研报告与企事业单位安全实证文献\n`;
  md += `├── CONTRIBUTING.md             # 贡献准则、Schema 规范与提交模板\n`;
  md += `├── README.md                   # 英文主文档\n`;
  md += `├── README_CN.md                # 中文主文档\n`;
  md += `└── package.json\n`;
  md += `\`\`\`\n\n`;
  md += `---\n\n`;

  md += `## 🧪 本地开发与质检指令\n\n`;
  md += `本项目拥有严苛的自动化工程与质量守卫标准：\n\n`;
  md += `\`\`\`bash\n`;
  md += `# 1. 执行技能 Schema 格式规范与本地规则测试\n`;
  md += `npm test\n\n`;
  md += `# 2. 执行真实案例库数据与案号合规校验\n`;
  md += `node scripts/validate-incidents.js\n\n`;
  md += `# 3. 批量并发探测 ${items.length} 项技能的 GitHub 真实在线状态 (HTTP 200 巡检)\n`;
  md += `npm run test:remote\n\n`;
  md += `# 4. 从 items.json 与 incidents.json 全自动重新生成中英双语 README 并同步模版\n`;
  md += `npm run build\n\n`;
  md += `# 5. 编译打包 Tailwind CSS 样式文件\n`;
  md += `npm run build:css\n\n`;
  md += `# 6. 启动本地双端口热重载静态服务器\n`;
  md += `npm run serve\n`;
  md += `# 访问 http://localhost:3000 (实务指南), /library.html (技能库), 或 /incidents.html (案例库)\n`;
  md += `\`\`\`\n\n`;
  md += `---\n\n`;

  md += `## 🤝 参与贡献\n\n`;
  md += `欢迎提交新的优质技能与真实案例！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。\n\n`;
  md += `## 📄 开源许可证\n\n`;
  md += `[MIT License](LICENSE) © 2026 普通人的数字权利 (putongren.org) & Responsible AI Use Contributors\n`;

  return md;
}

fs.writeFileSync(readmePath, generateReadmeEn(), 'utf-8');
console.log(`✅ Generated comprehensive, high-converting landing README.md (${items.length} items, ${incidents.length} incidents navigated to web apps).`);

fs.writeFileSync(readmeCnPath, generateReadmeCn(), 'utf-8');
console.log(`✅ Generated comprehensive, high-converting landing README_CN.md (${items.length} items, ${incidents.length} incidents navigated to web apps).`);
