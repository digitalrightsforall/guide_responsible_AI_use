const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '../site/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// Verified updates map keyed by item ID
const auditData = {
  "pii-safe-documents": {
    clients: ["Claude Code", "通用 Agent (本地 Python 环境)"],
    action_content: "git clone https://github.com/danyuchn/pii-guard.git && cd pii-guard && pip install -r requirements.txt",
    how_to_use_cn: "面向 Claude Code 与本地 Python 运行环境。在终端克隆仓库并安装依赖后，将 `pii-safe-documents` 技能文件夹置于 Agent 技能目录（如 `~/.claude/skills/` 或本地项目 `.agents/skills/`）。当涉及用户文档时，在本地调用脱敏脚本，完成人名与证件号替换后再与大模型交互。",
    how_to_use_en: "Built for Claude Code and local Python runtimes. Clone the repo, install requirements, and place `pii-safe-documents` into your agent skills folder (e.g. `~/.claude/skills/` or `.agents/skills/`). The local script pseudonymizes names and IDs in memory before queries leave your machine.",
    keep_standard: true
  },
  "scholar-safety": {
    clients: ["Claude Code", "OpenAI Codex", "ZCode"],
    action_content: "git clone https://github.com/joshzyj/open-scholar-skill.git && cd open-scholar-skill && bash setup.sh",
    how_to_use_cn: "官方明确支持 Claude Code、OpenAI Codex 与 ZCode。在终端执行仓库自带的 `bash setup.sh` 安装脚本，它会自动检测你已安装的 Agent 环境，配置安全防护 Hook 并建立技能软链接。在对话中输入 `/scholar-init` 即可初始化项目并开启学术伦理与敏感数据防护。",
    how_to_use_en: "Explicitly built for Claude Code, OpenAI Codex, and ZCode. Run `bash setup.sh` in the cloned repo; the script automatically detects your agent environment, configures security hooks, and symlinks skills. Type `/scholar-init` in chat to set up research projects with IRB and privacy guardrails.",
    keep_standard: false // Upstream repo never declared US HHS OHRP alignment
  },
  "skill-sanitizer": {
    clients: ["ClawHub", "Claude Code", "通用 Agent (SKILL.md 规范)"],
    action_content: "clawhub install skill-sanitizer",
    how_to_use_cn: "支持通过 ClawHub 技能包管理器一键安装，或直接克隆至 Claude Code 技能目录（`~/.claude/skills/`）。添加后，当你在 Agent 中加载或引用第三方开源技能时，该工具会在执行前静态扫描代码与提示词，拦截潜在的提示词注入与恶意命令。",
    how_to_use_en: "Install via ClawHub (`clawhub install skill-sanitizer`) or clone directly into your Claude Code skills folder (`~/.claude/skills/`). Performs static security scans on third-party skills before execution to block prompt injection and malicious commands.",
    keep_standard: true
  },
  "pii-detection-pipeline": {
    clients: ["Claude Code", "OpenAI Codex", "ClawHub", "通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/pii-detection-pipeline ~/.claude/skills/",
    how_to_use_cn: "面向 Claude Code、OpenAI Codex 或支持 SKILL.md 的智能体环境。将技能目录复制到本地技能路径后，在处理包含客户清单、调研问卷或业务合同的任务时，要求 Agent 依据 GDPR 第 30 条与最小必要原则，自动执行敏感信息分类与字段级脱敏清洗。",
    how_to_use_en: "Designed for Claude Code, OpenAI Codex, and SKILL.md-compatible agents. Copy the skill folder to your local skills directory. Prompts the agent to classify sensitive fields and enforce data minimization in accordance with GDPR Article 30.",
    keep_standard: true
  },
  "openmed-clinical-ingestion": {
    clients: ["Claude Code", "OpenAI Codex", "通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/maziyarpanahi/openmed.git && cp -R openmed/skills/deidentifying-clinical-text ~/.claude/skills/",
    how_to_use_cn: "面向医疗健康与生物信息 Agent 工作流。将临床文本去标识化技能添加至本地环境，利用本地 NER 运行时在文本送入远端推理前剔除患者 18 类 PHI 标识符，严格遵循 HIPAA 安全港准则。",
    how_to_use_en: "Built for medical and bio-agent workflows. Deploys local clinical NER rules to strip 18 categories of patient identifiers (PHI) before text is dispatched to external LLMs, aligning with HIPAA Safe Harbor guidelines.",
    keep_standard: true
  },
  "presidio-anonymize-text": {
    clients: ["Claude Code", "OpenAI Codex", "通用 Agent (本地 Python 环境)"],
    action_content: "git clone https://github.com/VectorSpaceLab/AREX-Skill.git && cp -R AREX-Skill/skills/repositories/repo-skills/presidio/sub-skills/anonymize-text ~/.claude/skills/presidio-anonymize",
    how_to_use_cn: "面向 Claude Code、Codex 及支持 Python 工具调用的 Agent。结合微软 Presidio 开源引擎，在本地对长篇文本执行实体识别、掩码替换与假名化映射，并在输出阶段执行可逆还原。",
    how_to_use_en: "Designed for Claude Code and Codex environments with local Python tooling. Interfaces with Microsoft Presidio to detect entities, generate anonymization maps, and restore placeholders locally.",
    keep_standard: true
  },
  "skillguard": {
    clients: ["Claude Code", "通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/LLMSecurity/skillguard.git ~/.claude/skills/skillguard",
    how_to_use_cn: "面向 Claude Code 与本地终端 Agent。克隆至技能目录后，在引入未经审计的外部技能或执行外部输入脚本前，对技能文件执行 MITRE ATLAS 与 OWASP 风险特征匹配。",
    how_to_use_en: "For Claude Code and terminal agents. Clone into your skills folder to audit external skill files against MITRE ATLAS adversarial attack vectors and OWASP LLM security risks before execution.",
    keep_standard: true
  },
  "skill-sentinel": {
    clients: ["Claude Projects", "Manus", "通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/EvolutionUnleashed/skill-sentinel.git ~/.claude/skills/skill-sentinel",
    how_to_use_cn: "适用于 Claude Projects、Manus 或任何支持 SKILL.md 的智能体工作区。将 `skill-sentinel` 文件夹加入技能目录，在添加新技能或执行高危命令前请求 Agent 对技能进行静态安全审计。",
    how_to_use_en: "Drop the `skill-sentinel` folder into Claude Projects, Manus, or any SKILL.md-compatible agent workspace. Scans skills for command injection, unauthorized data access, and exfiltration attempts.",
    keep_standard: false
  },
  "nova-proximity": {
    clients: ["通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/Nova-Hunting/nova-proximity.git ~/.claude/skills/nova-proximity",
    how_to_use_cn: "面向配置了本地工具权限或 MCP 插件的 Agent 环境。克隆至本地技能目录，用于在执行涉及本地文件系统与网络调用的高危操作前检查权限边界。",
    how_to_use_en: "For agent setups with local tool access or MCP servers. Add to your local skills directory to evaluate permission boundaries before running sensitive filesystem or network actions.",
    keep_standard: false
  },
  "security-threat-model": {
    clients: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "Gemini CLI", "Trae"],
    action_content: "npx @tech-leads-club/agent-skills",
    how_to_use_cn: "官方支持 Cursor、Claude Code、Trae、Windsurf 等主流客户端。在项目根目录运行 `npx @tech-leads-club/agent-skills` 交互式命令，选择并安装 `security-threat-model`。在设计系统或重构模块时，要求 Agent 依据 STRIDE 框架生成威胁建模报告。",
    how_to_use_en: "Officially supports Cursor, Claude Code, Trae, Windsurf, Copilot, and Gemini CLI. Run `npx @tech-leads-club/agent-skills` in your project root and select this skill to run STRIDE threat modeling on architecture designs.",
    keep_standard: true
  },
  "post-generation-fact-check": {
    clients: ["通用 Agent (AgentSkills 规范)", "Claude Code"],
    action_content: "npx skills add jwynia/agent-skills",
    how_to_use_cn: "遵循 AgentSkills 开放规范。可通过 `npx skills add` 快速添加，或将 `skills/creative/fact-check` 目录复制到 Agent 技能路径。核心约束：必须在内容生成后作为独立环节启动，严禁在初次生成时同一轮次混用。",
    how_to_use_en: "Built to the open AgentSkills standard. Install via `npx skills add jwynia/agent-skills` or copy the folder into your skills path. Critical rule: must run as a distinct verification pass AFTER content generation.",
    keep_standard: false
  },
  "citation-faithfulness-checker": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex"],
    action_content: "git clone https://github.com/CanXiangCC/aminer-open-skill.git && cd aminer-open-skill",
    how_to_use_cn: "面向学术论文审校工作流（Claude Code / Cursor / Codex）。克隆仓库后，将技能添加到对应环境。向 Agent 提供论文 PDF 或草稿，要求核验文内引用与参考文献实际结论的一致性，防止张冠李戴。",
    how_to_use_en: "Designed for academic workflows in Claude Code, Cursor, and Codex. Clone and add to your agent path. Feed paper drafts or PDFs to verify whether in-text claims faithfully reflect cited source conclusions.",
    keep_standard: false
  },
  "bibref-verify": {
    clients: ["OpenAI Codex", "Claude Code"],
    action_content: "git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/",
    how_to_use_cn: "开发者针对 Codex 与 Claude Code 编写的学术配置。在投稿或定稿前，由 Agent 逐条核验 BibTeX 文件的作者、年份与 DOI，甄别合作者混入或 AI 生成的虚假引用。",
    how_to_use_en: "Authored for OpenAI Codex and Claude Code. Audit existing `.bib` files for hallucinated citations, fabricated authors, or stale metadata before conference or journal submission.",
    keep_standard: false
  },
  "citation-integrity-auditor": {
    clients: ["Claude Code"],
    action_content: "claude plugin marketplace add scdenney/open-science-skills && claude plugin install oss@open-science-skills",
    how_to_use_cn: "专为 Claude Code 设计的开放科学插件包。通过官方插件市场安装后，调用 `/oss:citation-check`，Agent 将自动调用 Crossref 与 OpenAlex 开放接口，对稿件引用的 DOI 和元数据进行逐一事实求证。",
    how_to_use_en: "Built specifically for Claude Code. Install via the Claude plugin marketplace. Run `/oss:citation-check` to verify manuscript citations and DOIs against Crossref and OpenAlex APIs in real-time.",
    keep_standard: false
  },
  "citation-verifier": {
    clients: ["Claude Code", "OpenAI Codex", "通用 Agent (本地 Python 环境)"],
    action_content: "git clone https://github.com/jkitchin/skillz.git && cd skillz && pip install -e .",
    how_to_use_cn: "由卡内基梅隆大学 John Kitchin 教授开发的科研辅助工具。在终端克隆并安装 Python 包后，在 Agent 中指定 Markdown、LaTeX 或文本文件，工具会自动抽取文内 DOI、arXiv ID 与 PMID 并联网核验真实性。",
    how_to_use_en: "Developed by CMU Professor John Kitchin. Clone and install the Python package. Extracts DOIs, arXiv IDs, and PMIDs from Markdown/LaTeX/text to check whether cited literature exists.",
    keep_standard: false
  },
  "claim-source-fact-checker": {
    clients: ["Claude Code"],
    action_content: "claude plugin marketplace add scdenney/open-science-skills && claude plugin install oss@open-science-skills",
    how_to_use_cn: "专为 Claude Code 编写的学术论证核验插件。在导入参考文献后，调用 `/oss:fact-check` 命令，由 Agent 对稿件中的事实断言、论证方向与结论边界进行逐项对账。",
    how_to_use_en: "Tailored for Claude Code. Install via the plugin marketplace and run `/oss:fact-check` to systematically compare manuscript claims against source texts in an evidence ledger.",
    keep_standard: false
  },
  "hallucination-risk-reviewer": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex"],
    action_content: "npm install -g openagentskills && openagentskills add hallucination-risk-reviewer",
    how_to_use_cn: "通过 npm 全局安装 `openagentskills` 管理器，将幻觉风险评审技能注入你的工作环境。当 Agent 输出复杂长文本后，触发该评审规则，对生成结论的置信度与潜在事实断裂点进行分级标注。",
    how_to_use_en: "Install via `npm install -g openagentskills` and add the skill. Evaluates generated LLM responses for factual risks, typical hallucination patterns, and overconfidence issues.",
    keep_standard: false
  },
  "vectara-hallucination-corrector": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex"],
    action_content: "npx skills add vectara/agent-skills",
    how_to_use_cn: "面向 Claude Code、Cursor 和 Codex。通过 `npx skills add` 安装 Vectara 官方技能包。在检索增强生成 (RAG) 场景下，借助 Vectara 幻觉评估模型 (HHEM) 指标，自动纠偏上下文与回答之间的断言不一致。",
    how_to_use_en: "For Claude Code, Cursor, and Codex. Add via `npx skills add vectara/agent-skills`. Aligns agent outputs with Vectara Hughes Hallucination Evaluation Model (HHEM) standards to correct factual divergence.",
    keep_standard: true
  },
  "kdense-peer-review": {
    clients: ["Claude Code", "OpenAI Codex", "Cursor"],
    action_content: "git clone https://github.com/K-Dense-AI/scientific-agent-skills.git && cp -R scientific-agent-skills/skills/peer-review ~/.claude/skills/",
    how_to_use_cn: "配套 arXiv:2609.00065 科研智能体研究的开源技能。克隆后添加至 Agent 技能库，在开展论文评阅时生成有证据锚定、具备学术建设性的结构化评审草案，严格规避无依据的推测性贬低或敷衍好评。",
    how_to_use_en: "Companion skill to arXiv:2609.00065. Clone and place into your skills folder. Prepares structured, evidence-bounded peer review assessments without unsupported speculation.",
    keep_standard: false
  },
  "the-judge": {
    clients: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "Gemini CLI", "Trae"],
    action_content: "npx @tech-leads-club/agent-skills",
    how_to_use_cn: "官方支持 Cursor、Claude Code、Trae 等多 Agent 环境。运行 `npx @tech-leads-club/agent-skills` 安装。在代码提交后，Agent 会优先调用本地测试与确定性检查命令，查阅官方最新文档，再输出结构化合并评审意见。",
    how_to_use_en: "Officially supports Cursor, Claude Code, Trae, Windsurf, Copilot, and Gemini CLI. Install via `npx @tech-leads-club/agent-skills`. Executes deterministic tests and official documentation checks before drafting PR reviews.",
    keep_standard: false
  },
  "the-fool": {
    clients: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "Gemini CLI", "Trae"],
    action_content: "npx @tech-leads-club/agent-skills",
    how_to_use_cn: "通过 `npx @tech-leads-club/agent-skills` 交互向导安装。当用户对某方案过度笃定或出现确认偏误时，扮演苏格拉底式提问者，通过追问边界场景与极端输入打破虚假共识。",
    how_to_use_en: "Install via `npx @tech-leads-club/agent-skills`. Serves as an unpretentious Socratic challenger that breaks consensus trance by probing edge cases, failure states, and hidden assumptions.",
    keep_standard: false
  },
  "sycophancy-challenger": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex", "Gemini CLI"],
    action_content: "git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger ~/.claude/skills/",
    how_to_use_cn: "面向产品经理与决策者 Agent。将技能复制到 `~/.claude/skills/`，在讨论方案、需求或战略时，主动阻断大模型的讨好性附和倾向，对逻辑漏洞与乐观假设提出尖锐反诘。",
    how_to_use_en: "Built for product managers and decision-makers on Claude Code, Cursor, and Codex. Places anti-flattery guardrails that proactively challenge weak premises and premature user enthusiasm.",
    keep_standard: false
  },
  "devils-advocate-mad-skills": {
    clients: ["Claude Code", "OpenAI Codex", "通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/jihlenburg/mad-skills.git && cp -R mad-skills/skills/devils-advocate ~/.claude/skills/",
    how_to_use_cn: "纯 Markdown 定义的 Agent 技能。直接将 `devils-advocate` 放入技能目录，无需任何依赖或二进制包。在做出重大架构、商务或技术选型决定前，要求 Agent 扮演反方辩手，论证“为什么坚决不该这么做”。",
    how_to_use_en: "A pure Markdown skill file. Works in Claude Code, Codex, and any tool reading SKILL.md. Prompts the agent to construct the strongest possible case against a pending decision or proposed plan.",
    keep_standard: false
  },
  "godfly-opposing-counsel": {
    clients: ["Claude Code", "OpenAI Codex"],
    action_content: "git clone https://github.com/CassioRoos/godfly-skills.git && cp -R godfly-skills/skills/devils-advocate ~/.claude/skills/",
    how_to_use_cn: "专为 Claude Code 与 Codex CLI 设计的对抗性质询技能。模拟对方辩护律师，逐条盘查方案论据、依赖假设与事实断言，在交稿或上线前迫使方案在反诘中夯实证据。",
    how_to_use_en: "Built for Claude Code and Codex CLI. Simulates rigorous opposing counsel that attacks underlying assumptions, challenges assertions, and demands proof before you commit.",
    keep_standard: false
  },
  "devils-advocate-reviewer": {
    clients: ["Claude Code", "OpenAI Codex", "GitHub Copilot"],
    action_content: "git clone https://github.com/Imbad0202/academic-research-skills.git && cp -R academic-research-skills/skills/devils-advocate ~/.claude/skills/",
    how_to_use_cn: "专为学术研究与论文写作适配的 Claude Code 技能。在论文选题、方法论设计或引言起草阶段，对核心论点进行苏格拉底式反向推敲，检验逻辑链条的抗辩强度。",
    how_to_use_en: "Designed for academic research in Claude Code and Codex. Challenges manuscript thesis statements and research methodologies through structured adversarial probing.",
    keep_standard: false
  },
  "red-team-review": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex", "Gemini CLI"],
    action_content: "git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/red-team-review ~/.claude/skills/",
    how_to_use_cn: "支持 Claude、Cursor、Codex 等多环境。在产品发布或方案推行前，调用红队技能模拟竞争对手、严苛用户与安全专家的敌对视角，开展上线前“事前尸检 (Pre-Mortem)”演练。",
    how_to_use_en: "Multi-platform skill for Claude, Cursor, and Codex. Simulates adversarial expert personas to stress-test plans, PRDs, and launches via a structured pre-mortem review.",
    keep_standard: false
  },
  "anti-sycophancy-molly": {
    clients: ["Claude Code", "Gemini CLI"],
    action_content: "git clone https://github.com/molly-diversifiedfun/claude-skills.git && cp -R claude-skills/devils-advocate ~/.claude/skills/",
    how_to_use_cn: "面向 Claude Code 的思维伙伴扩展。通过结构化的批判框架挑战用户的初始想法与决策偏好，防止 AI 顺杆爬，在对话中强制注入逆向思考环节。",
    how_to_use_en: "For Claude Code. Acts as an adversarial thinking partner that challenges ideas and decisions using structured critique frameworks, stopping the model from passive agreement.",
    keep_standard: false
  },
  "the-jury": {
    clients: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "Gemini CLI", "Trae"],
    action_content: "npx @tech-leads-club/agent-skills",
    how_to_use_cn: "官方支持 Cursor、Claude Code、Trae 等环境。运行 `npx @tech-leads-club/agent-skills` 安装。当遇到重大权衡取舍或分歧时，该技能会在本地并发派生 3 至 5 个盲评子智能体，匿名交叉审议后汇总多数派裁决。",
    how_to_use_en: "Officially supports Cursor, Claude Code, Trae, Windsurf, and Gemini CLI. Spawns 3 to 5 independent subagent jurors who deliberate anonymously before issuing a consensus verdict.",
    keep_standard: false
  },
  "discernment-nudge": {
    clients: ["Claude Code"],
    action_content: "claude plugin marketplace add anthropics/skills && claude plugin install discernment-nudge",
    how_to_use_cn: "Anthropic 官方为 Claude Code 编写的技能。通过 Claude Code 官方插件市场安装。当 Agent 给出实质性建议或起草行动草案后，自动触发轻量级的审辩式自省提示，提醒用户识别关键假设。",
    how_to_use_en: "Anthropic official Claude Code skill. Install via the Claude plugin marketplace. Automatically injects a discernment prompt after substantive recommendations to remind you to verify assumptions.",
    keep_standard: true
  },
  "receiving-code-review": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex"],
    action_content: "claude plugin install superpowers@claude-plugins-official",
    how_to_use_cn: "Jesse Vincent 官方 Superpowers 框架核心技能。通过 Claude 官方插件指令安装，或加入本地技能路径。在 Agent 接收代码评审意见时，强制要求其进行技术求证与实测验证，严禁不经思考的形式主义迎合与盲目修改。",
    how_to_use_en: "Core skill of the official Superpowers framework. Install via Claude plugins or local skills. Demands technical verification before implementing review feedback, preventing blind performative agreement.",
    keep_standard: true
  },
  "ai-provenance": {
    clients: ["Claude Code", "通用 Agent (PROV-O 规范)"],
    action_content: "npx skills add noheton/f-ai2-r",
    how_to_use_cn: "面向 Claude Code 及通用 Agent。通过 `npx skills add` 安装。基于 W3C PROV-O 本体标准，在代码提交或交付物元数据中透明记录模型版本、Token 消耗、推理温度与提示词签名，形成全链路机器可读的溯源凭证。",
    how_to_use_en: "Installs via `npx skills add noheton/f-ai2-r`. Tracks and embeds model provenance (tokens, provider, temperature, hash) into deliverable metadata using the W3C PROV-O standard.",
    keep_standard: true
  },
  "vertu-seo-publish-gate": {
    clients: ["OpenAI Codex"],
    action_content: "git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate ~/.codex/skills/",
    how_to_use_cn: "企业级英文官网内容交付工作流，明确适配 OpenAI Codex 平台。作为草稿发布前的独立质检卡口（QA Gate），输出 PASS / FIX / BLOCK 判定，严格禁止 Agent 自审自批直接公开发布。",
    how_to_use_en: "Corporate English SEO workflow explicitly targeting OpenAI Codex. Serves as an independent publishing QA gate yielding PASS/FIX/BLOCK verdicts, prohibiting agents from self-approving live publishes.",
    keep_standard: false
  },
  "visible-ai-disclosure-pr-gate": {
    clients: ["Claude Code", "OpenAI Codex"],
    action_content: "claude plugin marketplace add harlan-zw/harlan-agent-kit && claude plugin install harlan-agent-kit",
    how_to_use_cn: "由 Nuxt/TypeScript 核心贡献者 Harlan Wilton 维护的智能体套件。在 Claude Code 中通过插件市场安装。在 Agent 提交 Pull Request 时，自动审查改动内容并生成清晰透明的 AI 参与声明与代码变更摘要。",
    how_to_use_en: "Maintained by Nuxt contributor Harlan Wilton. Install via the Claude Code plugin marketplace. Automatically generates clear AI involvement disclosures and structured changelogs on Pull Requests.",
    keep_standard: false
  },
  "gdpr-compliance-audit": {
    clients: ["Claude Code", "OpenAI Codex", "Cursor", "ClawHub"],
    action_content: "git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/gdpr-compliance-audit ~/.claude/skills/",
    how_to_use_cn: "支持 Claude Code、Codex 及 ClawHub 生态。在业务系统交付或数据处理方案定稿前，由 Agent 对照 GDPR 第 5、24、25、28、30、32、35、37 条关键条款的 50+ 个控制点进行合规性穿透检查。",
    how_to_use_en: "For Claude Code, Codex, and ClawHub. Performs a structured audit covering 50+ control points across key GDPR articles (5, 24, 25, 28, 30, 32, 35, 37) before system or document sign-off.",
    keep_standard: true
  },
  "publish-prep-review": {
    clients: ["Claude Code", "OpenAI Codex", "Cursor"],
    action_content: "git clone https://github.com/45ck/content-machine.git && cp -R content-machine/skills/publish-prep-review ~/.claude/skills/",
    how_to_use_cn: "面向多媒体与短视频发布工作流。将技能加入 Agent 路径后，在发布前对脚本、渲染视频画面及元数据进行打分质检，生成质量报告并由人工确认放行。",
    how_to_use_en: "For multimedia content workflows. Evaluates video drafts, scripts, and rendered outputs to produce structured quality scores before media is approved for publication.",
    keep_standard: false
  },
  "ai-disclosure-convention": {
    clients: ["Claude Code", "通用 Agent (SKILL.md / 代码注释规范)"],
    action_content: "git clone https://github.com/ggfevans/ai-disclosure.git ~/.claude/skills/ai-disclosure",
    how_to_use_cn: "结合 W3C AI Content Disclosure 词汇表与 SPDX 标准的轻量级规范。将技能配置在 Agent 环境中，在生成源码或重构文件时，以标准化文件头注释格式声明 AI 的具体参与程度与人工复核状态。",
    how_to_use_en: "Lightweight convention combining W3C AI Content Disclosure vocabulary and SPDX. Guides coding agents to insert standard machine-readable file-header comments declaring AI involvement level.",
    keep_standard: true
  },
  "skill-provenance-tracker": {
    clients: ["通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/snapsynapse/skill-provenance.git ~/.claude/skills/skill-provenance",
    how_to_use_cn: "纯 Markdown 定义的开源技能治理规范。添加至本地工作区后，跟踪技能在本地版本迭代中的指令变动，生成变更前后对比摘要，防止外部技能更新悄然引入越权指令。",
    how_to_use_en: "Pure Markdown skill governance tool. Drop into your workspace to track local skill revisions and diff prompt instructions, ensuring updates do not introduce unauthorized tool permissions.",
    keep_standard: false
  },
  "verification-before-completion": {
    clients: ["Claude Code", "Cursor", "OpenAI Codex"],
    action_content: "claude plugin install superpowers@claude-plugins-official",
    how_to_use_cn: "Jesse Vincent 官方 Superpowers 框架核心技能。通过官方插件市场安装。核心约束：在 Agent 宣布任务完成前，必须在本地终端实际运行测试并出示测试通过的确定性输出，严禁“假装测试已通过”。",
    how_to_use_en: "Core rule of the official Superpowers framework. Mandatory gate: before declaring any task complete, the agent MUST run actual verification commands and show raw pass evidence.",
    keep_standard: true
  },
  "humanizer": {
    clients: ["Claude Code", "Cursor", "Windsurf", "GitHub Copilot", "OpenAI Codex", "Gemini CLI"],
    action_content: "claude plugin install humanizer@claude-plugins-official",
    how_to_use_cn: "官方支持 Claude Code、Cursor、Windsurf、Copilot、Codex 与 Gemini。可通过 Claude 官方插件指令 `claude plugin install humanizer@claude-plugins-official` 安装，或克隆至本地技能目录。基于维基百科《识别 AI 写作标志》指南，去除生硬排比、陈词滥调与虚浮总结，使文字回归真实自然的人类表达。",
    how_to_use_en: "Officially supports Claude Code, Cursor, Windsurf, Copilot, Codex, and Gemini. Install via official plugin or clone repo. Built on Wikipedia's 'Signs of AI writing' guide to eliminate formulaic AI patterns.",
    keep_standard: true
  },
  "marketing-claims-review": {
    clients: ["Claude Code"],
    action_content: "git clone https://github.com/anthropics/claude-for-legal.git && cp -R claude-for-legal/product-legal/skills/marketing-claims-review ~/.claude/skills/",
    how_to_use_cn: "Anthropic 官方法律工作流仓库中的法务技能。专为 Claude Code 设计。在营销文案、宣传通稿或产品发布声明定稿前，要求 Agent 依据 FTC 广告实证原则对绝对化用语、功效承诺与事实断言逐项核验依据。",
    how_to_use_en: "Anthropic official Claude for Legal skill. Built for Claude Code. Reviews marketing copy, press releases, and claims against FTC advertising substantiation standards before publication.",
    keep_standard: true
  },
  "web-accessibility": {
    clients: ["Cursor", "Claude Code", "Windsurf", "GitHub Copilot", "Gemini CLI", "Trae"],
    action_content: "npx @tech-leads-club/agent-skills",
    how_to_use_cn: "官方支持 Cursor、Claude Code、Trae 等多环境。运行 `npx @tech-leads-club/agent-skills` 安装。在前端界面或文档页面交付前，依据 W3C WCAG 2.1 Level AA 标准，核验语义化 HTML、ARIA 标签、色彩对比度与键盘无障碍访问能力。",
    how_to_use_en: "Officially supports Cursor, Claude Code, Trae, Windsurf, and Copilot. Audits UI components and web pages against W3C WCAG 2.1 Level AA standards for semantic markup and keyboard navigation.",
    keep_standard: true
  },
  "repo-security-review": {
    clients: ["Claude Code"],
    action_content: "git clone https://github.com/Consensys/repo-security-review.git ~/.claude/skills/repo-security-review",
    how_to_use_cn: "Consensys 官方开发的 Claude Code 安全审查技能。克隆至 `~/.claude/skills/` 后，在发布或交付前启动多阶段安全审查：密钥与凭证扫描 (Gitleaks)、架构威胁分析、依赖 CVE 检测与 OWASP 代码漏洞审查，最终汇编为独立审计报告。",
    how_to_use_en: "Consensys official security review skill for Claude Code. Runs multi-phase security checks—secret scanning, architecture review, dependency CVEs, and OWASP code audits—producing an audit report.",
    keep_standard: true
  },
  "license-compliance-audit": {
    clients: ["Claude Code", "OpenAI Codex", "通用 Agent (SKILL.md 规范)"],
    action_content: "git clone https://github.com/apache/magpie.git && cp -R apache/magpie/plugins/magpie-repo-health/skills/license-compliance-audit ~/.claude/skills/",
    how_to_use_cn: "Apache 软件基金会 Magpie 仓库健康套件技能。在项目开源交付或商业交付前，自动盘查所有第三方依赖项的开源许可证（基于 SPDX 标准），拦截 GPL 隐性传染与不兼容许可风险。",
    how_to_use_en: "Official skill from the Apache Magpie repository health plugin. Scans third-party dependencies against SPDX license identifiers to catch license incompatibilities or copyleft contagion.",
    keep_standard: true
  },
  "agent-sandbox-skill": {
    clients: ["Gemini CLI", "Claude Code", "OpenAI Codex"],
    action_content: "git clone https://github.com/disler/agent-sandbox-skill.git && cp -R agent-sandbox-skill/.claude/skills/agent-sandboxes ~/.claude/skills/",
    how_to_use_cn: "官方明确支持 Gemini CLI、Claude Code 与 Codex CLI。管理基于 E2B 的隔离安全沙盒环境，使智能体能够在安全的云端沙盒中安装依赖、运行不受信任的代码与执行构建任务，彻底杜绝本地宿主机受到破坏或逃逸。",
    how_to_use_en: "Officially supports Gemini CLI, Claude Code, and Codex CLI. Manages isolated E2B cloud sandboxes, allowing agents to execute arbitrary and untrusted code without risking the local host.",
    keep_standard: false
  }
};

let updatedCount = 0;
items.forEach(item => {
  const update = auditData[item.id];
  if (!update) {
    console.warn(`No audit data for ${item.id}`);
    return;
  }
  item.clients = update.clients;
  item.action_content = update.action_content;
  item.how_to_use_cn = update.how_to_use_cn;
  item.how_to_use_en = update.how_to_use_en;
  if (!update.keep_standard) {
    item.standard_alignment = null;
  }
  updatedCount++;
});

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
console.log(`Successfully audited and updated ${updatedCount}/${items.length} items in items.json.`);
