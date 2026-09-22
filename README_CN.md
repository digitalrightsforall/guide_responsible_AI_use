# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 26 个成熟 `SKILL.md` 规范技能与高质量结构化提示词。我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。

[English Version](README.md) | **中文版**

---

## 💡 核心理念：负责任与安全使用 AI 的当下实务内核（动态演进框架）

目前绝大部分关于“负责任 AI”（Responsible AI）的讨论和工具库，都是写给**模型开发者、科技巨头和政策合规团队**的——讨论的是训练集偏差、模型可解释性、红蓝对抗评测和算法审计。

然而，**当 AI 已经成为普通人的日常桌面工具时，一个人怎样才能安全、规范且负责任地使用它？** 这实际上是一套完全不同的实务问题。

本项目坚持**“只精选，不生造”**，从开源生态中甄选真实存在的优秀开源工具与成熟提示词。当前我们将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：

1. **🛡️ 对内·自我防护与边界**：警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守人类的独立思考与决策权。
2. **📐 对外·成果第三方可核验**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者或客户能够轻松核查，而非给出一纸空洞的形式化免责声明。

> [!NOTE]
> 这一拆解本身并非固化的教条，而是**保持动态演进**的实务框架，随着模型能力与应用形态的深入不断更新演化。

| 维度 | 传统 Responsible AI | 本项目关注的 Responsible AI Use |
| :--- | :--- | :--- |
| **核心主体** | 开发者、部署机构、监管机构 | **普通用户、知识工作者、专业研究者** |
| **核心对象** | AI 系统架构、模型权重与服务部署 | **人机互动与日常使用实践（Human–AI Practice）** |
| **典型问题** | 模型公平吗？是否可解释？机构如何问责？ | **我能把什么给 AI？哪些回答能信？什么时候不能听 AI？输出能不能直接发布？** |
| **主要治理手段** | 内部合规 Policy、行业标准、算法审计 | **Skills 技能（`SKILL.md`）、安全默认配置、实务清单、验证提示词** |
| **责任方向** | “不要制造/部署有害的 AI” | **“不要以不负责任的方式使用 AI”** |
| **典型风险承担者** | 抽象的社会公众、被自动化决策的人群 | **你自己 + 被你的 AI 使用结果直接影响到的人** |

---

## 📦 客户端技能安装规范（目录指南）

根据 Agent Skills 开源标准，不同客户端加载本地技能的路径如下：
* **Cursor / Google Antigravity:** `.agents/skills/<skill-name>/SKILL.md`
* **Claude Code:** `.claude/skills/<skill-name>/SKILL.md`

安装时请**完整复制整个技能文件夹**（包含自带的脚本和引用文件），而不要仅复制单份 `SKILL.md`。

---

## 🧭 四大核心实务问题导航

* [1. 我能把什么给 AI？](#1-我能把什么给-ai)
* [2. 哪些回答能信？](#2-哪些回答能信)
* [3. 什么时候不能听 AI？](#3-什么时候不能听-ai)
* [4. 输出能不能直接发布？](#4-输出能不能直接发布)
* [⚡ 日常 AI 负责任使用 30 秒核对清单](#-日常-ai-负责任使用-30-秒核对清单)
* [🛑 人类决策的不可让渡底线](#-人类决策的不可让渡底线)

---

### 1. 我能把什么给 AI？
*防止将个人身份信息（PII）、商业机密草案或受保护的访谈记录无意泄露给商业大模型作为训练语料。*

#### [`PII Safe Documents (danyuchn/pii-guard)`](https://github.com/danyuchn/pii-guard)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *输入前运行：在把任何涉及隐私的本地文档、访谈实录或草稿提供给智能体之前执行。*
* **🎯 为什么精选：** 直接针对商业 AI 过度采集数据的风险。它不像一般工具仅做文字提示，而是默认视云端为不可信环境，在本地强制生成脱敏临时副本，主 Agent 物理上无法接触原始文件。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ AgentSkills Standard | 🛡️ *Audited local-first isolation pipeline with automatic purge*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** General Knowledge Workers, Researchers, Journalists
* **核心价值：** 默认视云端大模型为不可信环境，在本地生成可逆的脱敏工作副本，主 Agent 严禁接触原始文件，任务完成后在本地还原并清理。
* **安装命令：**
  ```bash
  git clone https://github.com/danyuchn/pii-guard.git && cp -R pii-guard/.agents/skills/pii-safe-documents .agents/skills/
  ```

#### [`Scholar Safety (joshzyj/open-scholar-skill)`](https://github.com/joshzyj/open-scholar-skill)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *文件读取前：在智能体对研究文件执行 Read 操作前自动拦截并执行本地扫描。*
* **🎯 为什么精选：** 将学术机构的合规与伦理防护带到日常桌面端。对敏感学术文件设置本地门禁，支持仅在本地跑脚本完成统计分析，正文绝不上传云端。
* **📊 成熟度与可信背书：** `Active Release` | ⭐ Open Scholar Suite | 🛡️ *Designed for university & clinical research data custodians*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Academic Researchers, Qualitative Analysts, IRB Custodians
* **核心价值：** 在智能体读取文件前先执行本地敏感性扫描，对 IRB/HIPAA/受控学术数据设置门禁，支持仅在本地跑脚本分析而不把正文回传云端。
* **安装命令：**
  ```bash
  git clone https://github.com/joshzyj/open-scholar-skill.git && cp -R open-scholar-skill/.claude/skills/scholar-safety ~/.claude/skills/
  ```

#### [`Skill Sanitizer (cyberxuan-XBX/skill-sanitizer)`](https://github.com/cyberxuan-XBX/skill-sanitizer)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *安装前检查：在将任何第三方的 SKILL.md 载入工作区或智能体之前运行。*
* **🎯 为什么精选：** 保护智能体供应链安全。社区技能鱼龙混杂，该工具在技能载入内存前深度扫描是否含有隐蔽的越权 Bash 命令、注入攻击或凭证外泄后门。
* **📊 成熟度与可信背书：** `Production v2.1` | ⭐ Open Source Community | 🛡️ *Zero cloud dependencies, 7-layer semantic detection*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Developers, Power Users, Knowledge Workers
* **核心价值：** 在智能体加载第三方 SKILL.md 之前，扫描该技能文件内是否藏有提示词注入、恶意 Bash 命令或秘密回传外联代码。
* **安装命令：**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII-Shield (gregmos/PII-Shield)`](https://github.com/gregmos/PII-Shield)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *文档批量处理时：在让智能体批量处理 PDF、Word 或 Markdown 文档前执行。*
* **🎯 为什么精选：** 零门槛且经过实测的文档脱敏工具，支持跨常见办公文件格式（Word、PDF）自动探测并替换个人身份信息，无需复杂运维。
* **📊 成熟度与可信背书：** `Active Open Source` | ⭐ GitHub Community | 🛡️ *Verified cross-platform document parsing logic*
* **适用客户端：** Claude Code、Antigravity、Open Agent standard
* **适用人群：** Legal & Financial Analysts, Knowledge Workers
* **核心价值：** 在智能体读取文件（.txt, .md, .pdf, .docx）时自动进行 PII 识别，将真实姓名、邮箱、电话等替换为合成占位符，任务完成后在本地还原。
* **安装命令：**
  ```bash
  git clone https://github.com/gregmos/PII-Shield .claude/skills/pii-shield
  ```

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *日常对话起草时：在提示词中涉及客服对话、用户反馈或联系人清单时即时过滤。*
* **🎯 为什么精选：** 在本地维护轻量级的临时映射表，确保真实用户联系方式和敏感凭据永远不会流入外部大模型的训练数据池。
* **📊 成熟度与可信背书：** `Stable Module` | ⭐ Mode.io Skill Registry | 🛡️ *Standardized AgentSkills metadata structure*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Customer Support Teams, Product Operations
* **核心价值：** 识别上下文中的敏感凭证和联系信息，维护本地临时混淆映射表，防止外部大模型获取真实数据。
* **安装命令：**
  ```bash
  # Place privacy-protector/SKILL.md inside your agent skills directory
  ```

#### [`Anonymize Documents with Presidio`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *上传云端前处理：在处理定性访谈、口述实录或案例库之前做本地化预处理。*
* **🎯 为什么精选：** 基于微软开源的 Presidio 工业级脱敏引擎封装，无需依赖外部云服务，在本地就能高精度识别几十种国际敏感实体。
* **📊 成熟度与可信背书：** `Production Tooling` | ⭐ 100+ GitHub Stars | 🛡️ *Backed by Microsoft Presidio NLP core*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Qualitative Researchers, Medical Administrators, HR
* **核心价值：** 在本地调用微软 Presidio 引擎洗掉访谈对象姓名和机构，杜绝敏感学术调研数据外泄。
* **安装命令：**
  ```bash
  git clone https://github.com/schneidermichael/anonymize-documents-with-presidio .agents/skills/presidio
  ```

#### `Pre-Input PII Sanitizer Prompt`
* **类型：** `Prompt`
* **使用时机：** ⏳ 输入前 — *网页端输入前：在将未公开草稿直接复制粘贴进网页版 ChatGPT 或 Claude 之前使用。*
* **🎯 为什么精选：** 专为普通网页端用户设计。通过严谨的两阶段提示词协议，强迫模型先输出假名化版本，确保后续对话历史中不残留真实商业与人名实体。
* **📊 成熟度与可信背书：** `Battle-tested Template` | ⭐ Universal Web UI | 🛡️ *Practitioner community consensus prompt*
* **适用客户端：** Universal Web Chat、ChatGPT、Claude.ai、Gemini、Open WebUI
* **适用人群：** Everyday Web Chat Users, Non-technical Professionals
* **核心价值：** 两阶段脱敏提示词，强制模型在进行实质性分析前先将输入文本中的人名、机构、联系方式和金额假名化。
* **提示词模板：**
  ```text
  You are an expert privacy officer and data sanitization assistant.
  I am going to provide a raw draft text.
  Your ONLY task is to return a sanitized version of the text where:
  1. All human names are replaced with brackets like [Person A], [Person B].
  2. All specific organizational names, emails, phone numbers, and physical addresses are replaced with [Organization X], [Email redacted], [Location Y].
  3. All monetary figures and specific account numbers are replaced with [Amount A], [Account Z].
  
  Do NOT summarize, analyze, or interpret the text yet. Return ONLY the sanitized version and a private mapping table so I can verify.
  ```

---

### 2. 哪些回答能信？
*防止被 AI 极度自信的幻觉引用文献（Phantom Citations）、捏造的数据统计和伪造断言所误导。*

#### [`Post-Generation Fact-Check (jwynia/agent-skills)`](https://github.com/jwynia/agent-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *内容生成完毕后立即运行：作为独立的第二轮核验通道，严禁与生成混在同一轮中。*
* **🎯 为什么精选：** 直击“对 AI 盲信”的弊病。它确立了生成与核实分离的硬规则，提取事实断言并强制调用搜索求证，绝不允许 AI 用自身记忆自证清白。
* **📊 成熟度与可信背书：** `Stable Skill` | ⭐ AgentSkills Standard | 🛡️ *Peer-reviewed procedural verification methodology*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Journalists, Researchers
* **核心价值：** 在文本生成后启动独立的核查流程：逐条提取可核对的事实断言，检索外部权威信源，标明已证实、有矛盾或未证实（严禁用模型记忆自圆其说）。
* **安装命令：**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git && cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)`](https://github.com/CanXiangCC/aminer-open-skill)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *引文生成后核查：在 AI 输出包含参考文献、引文来源以支持其观点时立即调用。*
* **🎯 为什么精选：** 解决最隐蔽的“伪造论据”问题——很多时候论文真实存在，但正文根本不支持 AI 所说的结论。该工具调取原文进行深层一致性比对。
* **📊 成熟度与可信背书：** `Production v1.1` | ⭐ AMiner Academic Suite | 🛡️ *Maintained by AMiner open academic ecosystem*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Academic Researchers, Peer Reviewers, Journalists
* **核心价值：** 超越了“文献是否存在”，进一步调取文献原文，检验论文正文是否真的支撑 AI 声称的那个论据，标明引据一致性评级。
* **安装命令：**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git && cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`BibRef Verify (yzhao062/agent-config)`](https://github.com/yzhao062/agent-config)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *文献定稿前审计：在正式定稿前对论文引用的 .bib 或参考书目执行查伪排查。*
* **🎯 为什么精选：** 防止灾难性的学术失信风险。利用 CrossRef 与 Semantic Scholar 批量筛查虚假 DOI、捏造作者和拼接出的幻觉文献，生成核验报告。
* **📊 成熟度与可信背书：** `Active Release` | ⭐ Research Lab Utility | 🛡️ *Directly integrated with Semantic Scholar & CrossRef APIs*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Academic Researchers, Grant Writers, Paper Authors
* **核心价值：** 对论文现有的 .bib 参考文献进行批量查伪与信息核对，识别虚构作者和失效 DOI，输出结构化的 REFERENCE-CHECK.md 审计报告。
* **安装命令：**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`Citation-Check-Skill (open-agent-skills)`](https://github.com/open-agent-skills/citation-check-skill)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *案头研究核验时：在生成需要引用外部书籍或论文的研究备忘录时使用。*
* **🎯 为什么精选：** 遵循通用 Agent Skills 标准的轻量级引文核查技能，确保写入最终研究备忘录的每一个引文都具备真实的数字对象唯一标识符（DOI）。
* **📊 成熟度与可信背书：** `Community Standard` | ⭐ Open Agent Skills Org | 🛡️ *Standardized cross-client skill layout*
* **适用客户端：** Claude Code、Antigravity、Open Agent standard
* **适用人群：** Researchers, Academics, Policy Analysts
* **核心价值：** 自动提取生成文本中的参考文献与引文，调用 Crossref、Semantic Scholar 检验 DOI 和作者是否真实存在，标红虚构引文。
* **安装命令：**
  ```bash
  cp -r citation-check-skill ~/.claude/skills/
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *科学手稿起草时：在 LaTeX、Org-mode 或 Markdown 论文写作流中校验引用。*
* **🎯 为什么精选：** 由计算科学家与大学教授亲自编写并应用于真实科研写作流，兼顾排查被撤稿论文与失效引用，真实度高。
* **📊 成熟度与可信背书：** `Active Tooling` | ⭐ jkitchin Scientific Ecosystem | 🛡️ *Developed by university faculty for reproducible research*
* **适用客户端：** Claude Code、Emacs、Antigravity
* **适用人群：** Scientists, Academic Writers (LaTeX, Markdown)
* **核心价值：** 批量校验学术论文参考文献条目，排查被撤稿论文和虚假引文，确保引用学术严谨性。
* **安装命令：**
  ```bash
  # Place citation-verifier inside .claude/skills/ or run via skillz
  ```

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *文章精修阶段：将生成的大段分析解构为可独立验证的事实断言单元。*
* **🎯 为什么精选：** 杜绝 AI 假借流利文笔掩盖事实漏洞。对核验不到确切信源的断言，强制执行审慎对冲改写，降低虚假陈述风险。
* **📊 成熟度与可信背书：** `Production Pipeline` | ⭐ AIDD Refine System | 🛡️ *Designed specifically for professional publishing workflows*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Journalists, Fact-Checkers, Content Creators
* **核心价值：** 将文本拆解为独立的事实断言（Claims），强制调用搜索工具求证，并对缺少确切依据的句子施加审慎对冲修饰。
* **安装命令：**
  ```bash
  # Install via aidd-refine skill bundle
  ```

#### `Editorial Fact-Check & Quote Drift Protocol`
* **类型：** `Prompt`
* **使用时机：** 💬 交互中 — *特稿校对阶段：在生成深度特稿、专栏或调查报道后进行逐字校对。*
* **🎯 为什么精选：** 揭露最容易让人受骗的高阶幻觉（微调名言原句的引语漂移，以及用大牌机构撑场面的权威掩饰），为人类提供敏锐的审读透镜。
* **📊 成熟度与可信背书：** `Editorial Gist Standard` | ⭐ Newsroom Practice | 🛡️ *Sourced from investigative journalistic editing standards*
* **适用客户端：** Universal Web Chat、ChatGPT、Claude.ai、Gemini
* **适用人群：** Journalists, Editors, Copywriters
* **核心价值：** 两阶段新闻编辑级核查提示词，专门排查引语漂移（Quote Drift，微妙篡改原话）和权威掩饰（用权威声望代替事实证据）。
* **提示词模板：**
  ```text
  Perform a two-pass editorial fact-check on the provided text.
  Pass A: Claim Verification
  For every quote, statistic, or cited fact, output a structured table with: Location (line/paragraph), Claim Type, The Exact Claim, and a Status (CRITICAL, SUPPORTED, or PASSING).
  Pass B: Editorial Flags (Apply only after Pass A)
  Analyze the text for the following advanced errors:
  * Ghost Citation: The source cannot be found.
  * Citation Identity Drift: The underlying source exists, but the identifiers are mismatched.
  * Quote Drift: The quoted language does not match the source exactly, altering meaning.
  * Paraphrase Inflation: The draft makes a stronger claim than the original source supports.
  * Authority Mask: The prestige of the cited source is doing the rhetorical work, but the citation adds no empirical evidence.
  ```

#### `Epistemic Humility & Evidence Tagging Prompt`
* **类型：** `Prompt`
* **使用时机：** 💬 交互中 — *提问前缀：在普通网页版对话中发起严肃知识咨询时作为前置约束添加。*
* **🎯 为什么精选：** 零工具依赖的认知干预提示词。强迫大模型在每一句断言后附上置信度标签，彻底消除其用笃定口吻胡说八道的空间。
* **📊 成熟度与可信背书：** `Universal Method` | ⭐ Widely Cited Community Pattern | 🛡️ *Philosophical & epistemic prompting standard*
* **适用客户端：** Universal Web Chat、ChatGPT、Claude.ai、Gemini
* **适用人群：** Desktop Researchers, Students, Knowledge Workers
* **核心价值：** 破除 AI 过度自信的作答模式，强行对输出中的每一句话进行证据置信度标注（[已证实]、[逻辑推论]、[未证实/假说]）。
* **提示词模板：**
  ```text
  Please answer my inquiry with strict epistemic humility and evidentiary tagging.
  Adhere to these rules:
  1. For every assertion, append one of three tags:
     - [VERIFIED: Source name / link] - If you have high confidence based on established consensus or verifiable documentation.
     - [INFERENCE] - If the statement is a logical deduction rather than an empirical fact.
     - [UNVERIFIED / HYPOTHESIS] - If the assertion lacks authoritative grounding or is subject to ongoing debate.
  2. If any piece of information cannot be verified, state "I do not have verified evidence for this point" rather than guessing.
  ```

---

### 3. 什么时候不能听 AI？
*破除“自动化偏见”（Automation Bias）与盲目赞同，划定人类决策的不可让渡底线。*

#### [`The Fool (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *决策拍板前：在准备采纳 AI 给出的策略、产品方案或战略建议前强制调用。*
* **🎯 为什么精选：** 明确界定人机责任。该技能明文规定“拒绝替用户做决定”，只专注拆穿方案里的隐性假设与盲区，通过事前尸检防止人机共谋犯错。
* **📊 成熟度与可信背书：** `Production v2.0` | ⭐ Tech Leads Club Catalog | 🛡️ *Comprehensive behavioral rules with cognitive-bias scan*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Managers, Researchers, Founders, Strategic Planners
* **核心价值：** 愚者决策挑战者。原则是“不替用户做决定，只负责拆台与质疑”，通过隐性假设探测、辩证反驳、事前尸检与认知偏差扫描粉碎虚假共识。
* **安装命令：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`Sycophancy Challenger (mohitagw15856/pm-claude-skills)`](https://github.com/mohitagw15856/pm-claude-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *方案推演中：当你感觉 AI 对你的思路过度吹捧、一路顺着你说的时候立即启动。*
* **🎯 为什么精选：** 专门破解 AI 谄媚与阿谀奉承。内置防妥协机制，明确规定“无论用户如何辩解，只要未提供新的客观事实反证，坚决禁止撤销批评”。
* **📊 成熟度与可信背书：** `Active Stable` | ⭐ PM Skills Repository | 🛡️ *Verified anti-accommodation procedural ladders*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Decision Makers, Product Managers, Founders
* **核心价值：** 反迎合专精技能。强行将助手从吹捧赞同切换为对立批判模式，且明确规定“除非用户提供实质性新证据，否则禁止因用户反复辩解而妥协退让”。
* **安装命令：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`Council Review (ngmeyer/council-review)`](https://github.com/ngmeyer/council-review)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *重大方案评估时：在方案定稿前，通过模拟多方对立视角的辩论来排查盲区。*
* **🎯 为什么精选：** 基于 ArXiv 论文实证的多智能体辩论机制（DMAD），通过反向推演与跨领域类比，让 AI 自行组织红蓝对抗，消除单一大模型的盲信盲从。
* **📊 成熟度与可信背书：** `Open Source Release` | ⭐ Council Review Org | 🛡️ *Based on empirical multi-agent debate research*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Product Managers, Strategists, Software Architects
* **核心价值：** 多样化多智能体辩论（DMAD）协议，综合运用反演法、任务分解、类比反思与强制魔鬼代言人轮次，打破单一大模型的盲目自洽。
* **安装命令：**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *方案草拟完成后：一键激活反方审读，让 AI 全力寻找你思路中的致命缺陷。*
* **🎯 为什么精选：** 不带任何客套与吹捧的对抗性对练技能，专注检验底层前提是否牢靠，避免陷入过度自信。
* **📊 成熟度与可信背书：** `Community Skill` | ⭐ orange2ai Collection | 🛡️ *Clean unsparing critic behavioral contract*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Decision Makers, Policy Analysts, Product Leads
* **核心价值：** 强制将 AI 切换为“不留情面的反方辩友”，专门挑出用户方案中的逻辑漏洞、未明言假设与迎合（Sycophancy）倾向。
* **安装命令：**
  ```bash
  git clone https://github.com/orange2ai/devils-advocate-skill .claude/skills/devils-advocate
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *对外承诺前压力测试：拉起独立的子智能体，从 8 个不同失败维度进行严苛质询。*
* **🎯 为什么精选：** 将魔鬼代言人逻辑隔离在专属子智能体中运行，既提供了深度压力测试，又避免污染主对话的工作流上下文。
* **📊 成熟度与可信背书：** `Active Repository` | ⭐ mad-skills Toolkit | 🛡️ *Subagent isolation architecture*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Strategists, Writers, Project Leads
* **核心价值：** 启动对抗性子智能体，在方案定稿前从 8 个不同失败维度进行极限压力测试。
* **安装命令：**
  ```bash
  # Place devils-advocate inside .claude/skills/ from mad-skills
  ```

#### `The Over-Reliance Interrogator Prompt`
* **类型：** `Prompt`
* **使用时机：** 💬 交互中 — *警惕盲信自检：在收到看似完美无缺的 AI 建议后，立即以此提示词反问它。*
* **🎯 为什么精选：** 强迫 AI 跳出赞同者人设，亲手指出自身方案在极端情境下的失效边界，并标明人类绝不能甩锅给算法的法定与伦理责任。
* **📊 成熟度与可信背书：** `Universal Pattern` | ⭐ Widely Used Prompt Template | 🛡️ *Derived from cognitive automation-bias mitigation research*
* **适用客户端：** Universal Web Chat、ChatGPT、Claude.ai、Gemini
* **适用人群：** Professionals evaluating high-stakes advice
* **核心价值：** 让 AI 亲手拆穿自己方案的软肋，指出在极端边界下为何会失效，以及人类绝不能甩锅给算法的责任。
* **提示词模板：**
  ```text
  You just provided the recommendation above. Now, step out of the advisor role and act as an independent, skeptical auditor.
  Answer these three questions honestly:
  1. Under what specific conditions or edge cases will this advice completely fail?
  2. What hidden assumptions have you made that I, as the human, must personally verify before acting?
  3. What ethical, legal, or contextual responsibilities cannot be delegated to an AI in this decision?
  ```

---

### 4. 输出能不能直接发布？
*让第三方（同事、读者、客户、监管）能够方便地核查验证成果证据链，拒绝空洞的形式化免责。*

#### [`AI Provenance (noheton/f-ai2-r)`](https://github.com/noheton/f-ai2-r)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *成果交付与核验打包时：在把 AI 辅助的成果交由第三方前，生成可审计的证据轨迹。*
* **🎯 为什么精选：** 真正服务于“让第三方好核查”。它自动记录模型哈希、关键 Prompt 和工具调用轨迹，交付成果时附带可信证据链，不让接收方盲信盲猜。
* **📊 成熟度与可信背书：** `Production Core` | ⭐ f-ai2-r Project | 🛡️ *Deterministic cryptographic hashing & local provenance logging*
* **适用客户端：** Antigravity、Cursor、Claude Code
* **适用人群：** Researchers, Journalists, Authors, Developers
* **核心价值：** 自动记录人机协作轨迹（模型版本、提示词哈希、工具调用与验证状态），并从中推导出可信的人类可读 AI 使用披露说明。
* **安装命令：**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *对外发布前检查：在任何 AI 参与的内容正式向外部平台发布之前执行硬阻断。*
* **🎯 为什么精选：** 杜绝“智能体失控直接发布”。编写与审校智能体在权限上被物理剥夺直接发布能力，必须出具外部独立的人类核验签名回执方可放行。
* **📊 成熟度与可信背书：** `Production Workflow v0.7.1` | ⭐ Editorial Team Standard | 🛡️ *Strict separation of drafting vs. publishing authorization*
* **适用客户端：** Antigravity、Cursor、Claude Code
* **适用人群：** Editors, Publishing Teams, Newsrooms
* **核心价值：** 对 AI 草稿执行 PASS/FIX/BLOCK 硬性发布门禁。编写与审校智能体被物理剥夺直接发布权限，必须依赖外部独立的人类授权回执。
* **安装命令：**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)`](https://github.com/harlan-zw/harlan-agent-kit)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *提交代码与文档 PR 时：确保向开源或团队仓库发起提交时公开透明。*
* **🎯 为什么精选：** 将披露从道德倡议转为刚性门禁：智能体在提交 PR 时强制嵌入透明声明，如果声明被篡改或隐瞒，工具直接拒绝提交，防隐蔽代写。
* **📊 成熟度与可信背书：** `Production Kit` | ⭐ harlan-agent-kit Suite | 🛡️ *Enforced via GitHub CLI / git pre-push contracts*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Open Source Maintainers, Technical Writers, Developers
* **核心价值：** 将 AI 披露做成代码提交与 PR 的机器强制门禁。在撰写说明时强制嵌入透明声明，声明若被删改则直接拒绝执行发布命令。
* **安装命令：**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git && cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`awesome-copilot/gdpr-compliant`](https://github.com/awesome-copilot/skills)
* **类型：** `SKILL.md`
* **使用时机：** 🧹 归档清理 — *会话结束与归档时：在项目阶段性完结时导出对话痕迹并校验数据留存政策。*
* **🎯 为什么精选：** 持久化保存代码与文字生成轨迹，在面对外部版权审查或机构审计时，能出具有效证据证明作品的独立性与辅助边界。
* **📊 成熟度与可信背书：** `Community Collection` | ⭐ Awesome Copilot Skills | 🛡️ *Verified data retention & attribution audit templates*
* **适用客户端：** GitHub Copilot、Claude Code
* **适用人群：** Software Developers, Compliance Officers
* **核心价值：** 记录代码与文本的生成轨迹与数据来源，为机构出具可信审计日志，明确人机贡献界限。
* **安装命令：**
  ```bash
  # Install via awesome-copilot skills collection
  ```

#### `Third-Party Verifiability & Disclosure Generator`
* **类型：** `Prompt`
* **使用时机：** 📤 交付前 — *交付成果前打包：在将 AI 辅助完成的分析报告、文案或论文交给他人前运行。*
* **🎯 为什么精选：** 告别形式主义的免责声明，实现真正的“成果可查证”。自动生成一份结构化说明，清晰告知对方哪些数据是人类亲测核验的、原始出处何在、从哪里切入验证。
* **📊 成熟度与可信背书：** `Production Prompt Standard` | ⭐ Universal Practice | 🛡️ *Synthesizes third-party verifiability and human attestation best practices*
* **适用客户端：** Universal Web Chat、ChatGPT、Claude.ai、Gemini
* **适用人群：** Academics, Researchers, Corporate Writers, Students
* **核心价值：** 依照严谨可查证的交付规范，通过交互式问答自动生成一份向第三方清晰举证的 AI 使用说明与核验指引。
* **提示词模板：**
  ```text
  I have used AI assistance while preparing my document. Generate an honest, professional AI Disclosure Statement suitable for inclusion in an academic appendix, corporate report, or article footnote.
  
  Please ask me the following questions one by one, then formulate the statement:
  1. Which AI tool and model version were used? (e.g., Claude 3.7 Sonnet, ChatGPT-4o)
  2. For which specific tasks was AI employed? (e.g., brainstorming, proofreading, code generation, translation, literature scanning)
  3. What substantive portions were written entirely by humans?
  4. What human verification steps were performed on the AI output?
  ```

---

## 🛑 人类决策的不可让渡底线

在任何情况下，以下决策与行为均不可盲目让渡给 AI：
* **未经执业医生独立复核**的医疗诊断与用药处方决策。
* **具有法律效力**的合规签字与不可撤销的商业合同签署。
* **针对具体个人**的最终处分、解雇或招聘拒绝决定。
* **仅凭 AI 对话结果**作为独家信源对外发布事实报道。

---

## ⚡ 日常 AI 负责任使用 30 秒核对清单

建议将此清单常驻在你的办公屏幕旁，在每次与 AI 交互时对照自检：

| 交互阶段 | 自问的一句话 | 负责任的实操动作 |
| :--- | :--- | :--- |
| **1. 发送输入前** | *“如果把这段话公开登在明天的报纸头版，我会惹上麻烦吗？”* | 如果会：立即剔除真实姓名、手机号、机密内网地址和内部未公开财务数据。 |
| **2. 阅读回答时** | *“AI 刚才引用的论文、法条或数据，真实存在吗？”* | 在独立浏览器标签页中亲自搜索验证该 DOI 或法规原文，绝不直接采纳未验引文。 |
| **3. 准备采纳时** | *“我是因为内容客观可信而采纳，还是因为 AI 态度礼貌自信而盲信？”* | 要求 AI 提供相反观点或失效边界，确认人类对结果承担最终责任。 |
| **4. 对外发布前** | *“第三方（同事、读者、雇主）能够方便地核验我使用 AI 的成果和论据吗？”* | 附带简要的 AI 使用说明与核查切入点，并妥善保存关键 Prompt 对话记录备查。 |

---

## 🤝 参与贡献

欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 Responsible AI Use Contributors
