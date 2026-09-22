# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 38 个成熟 `SKILL.md` 规范技能与高质量结构化提示词。我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。

[English Version](README.md) | **中文版**

---

## 💡 核心理念：负责任与安全使用 AI 的当下实务内核（动态演进框架）

本项目由[**「普通人的数字权利」共创社区 (putongren.org)**](https://putongren.org)发起，致力于帮助每一个人在机器与算法时代守护个人数字权利与尊严。

本项目坚持**“只精选，不生造”**，从开源生态中甄选真实存在的优秀开源工具。当前我们将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：

1. **🛡️ 对内·自我防护与边界**：警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守人类的独立思考与决策权。
2. **📐 对外·成果第三方可核验**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者或客户能够轻松核查，而非给出一纸空洞的形式化免责声明。

> [!NOTE]
> 这一拆解本身并非固化的教条，而是**保持动态演进**的实务框架，随着模型能力与应用形态的深入不断更新演化。

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
* **📊 成熟度与可信背书：** `Production Ready` | ⭐ Open Agent Community | 🛡️ *Document-level token replacement tested on legal/financial docs*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** General Knowledge Workers, Legal & Financial Analysts
* **核心价值：** 在智能体读取文档前自动识别个人身份信息，并替换为占位标记，任务完成后在本地进行安全还原。
* **安装命令：**
  ```bash
  git clone https://github.com/gregmos/PII-Shield.git .agents/skills/pii-shield
  ```

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *上下文交互时：在向对话中粘贴包含客户信息或内部日志的文本时实时混淆。*
* **🎯 为什么精选：** 专为常接触客户信息的岗位设计。在会话中自动识别客户凭证与隐私，并在本地维护混淆映射，防止商业大模型获取真实数据。
* **📊 成熟度与可信背书：** `Production` | ⭐ mode-io Agent Skills | 🛡️ *Enterprise customer service data protection pattern*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Support Teams, Account Managers, Operations
* **核心价值：** 识别上下文中的敏感凭证和联系信息，维护本地临时混淆映射表，防止外部大模型获取真实数据。
* **安装命令：**
  ```bash
  git clone https://github.com/mode-io/mode-io-skills.git && cp -R mode-io-skills/skills/privacy-protector .agents/skills/
  ```

#### [`Anonymize Documents with Presidio (schneidermichael)`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *预处理流水线：在把田野调查、定性访谈录音文本发给大模型前本地批处理运行。*
* **🎯 为什么精选：** 将微软成熟的 Presidio 命名实体识别引擎引入桌面端，依靠高精度的确定性模型过滤敏感实体，而非依赖不可靠的 LLM 自觉脱敏。
* **📊 成熟度与可信背书：** `Active Open Source` | ⭐ Microsoft Presidio Ecosystem | 🛡️ *Backed by Microsoft Presidio NLP open-source engine*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Qualitative Researchers, Sociologists, Analysts
* **核心价值：** 在本地通过微软 Presidio 引擎洗掉访谈对象姓名和机构，杜绝敏感学术调研数据外泄。
* **安装命令：**
  ```bash
  git clone https://github.com/schneidermichael/anonymize-documents-with-presidio.git .agents/skills/presidio-anonymizer
  ```

#### [`TrustBoost PII Sanitizer (teodorofodocrispin-cmyk)`](https://github.com/teodorofodocrispin-cmyk/TrustBoost-PII-Sanitizer)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *上流拦截门禁：在文本或文件内容上传至云端 LLM 接口之前进行多语言强行脱敏。*
* **🎯 为什么精选：** 支持跨 8 种主流语言的上下文 PII 强脱敏，严格遵循 GDPR、LGPD 和 HIPAA 等国际隐私标准，特别适合跨国协作与金融法律团队。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Multi-client Ecosystem | 🛡️ *Tested across 8 languages with compliance mapping*
* **适用客户端：** Claude Code、Cursor、Windsurf
* **适用人群：** Enterprise Knowledge Workers, Financial Analysts, Legal Professionals
* **核心价值：** 在文本传输至云端模型前执行 PII 脱敏，支持 8 种语言上下文，严格遵循 GDPR 和 HIPAA 隐私合规体系。
* **安装命令：**
  ```bash
  git clone https://github.com/teodorofodocrispin-cmyk/TrustBoost-PII-Sanitizer.git .agents/skills/trustboost-pii-sanitizer
  ```

#### [`OpenMed Clinical Document Ingestion (maziyarpanahi)`](https://github.com/maziyarpanahi/openmed)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *临床数据录入门禁：在将病历记录、临床随访笔记或患者数据交由 AI 分析前执行。*
* **🎯 为什么精选：** 针对极高敏感度的医疗健康数据（PHI），在智能体接触病历和患者记录前强制执行医学实体脱敏，严守医疗伦理红线。
* **📊 成熟度与可信背书：** `Active Research Release` | ⭐ OpenMed Suite | 🛡️ *Clinical NLP benchmarked for HIPAA PHI safety*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Clinical Researchers, Healthcare Analysts, Medical Writers
* **核心价值：** 专为医学临床文本设计的脱敏技能，在智能体处理医疗记录前识别并屏蔽受保护健康信息（PHI）与患者标识。
* **安装命令：**
  ```bash
  git clone https://github.com/maziyarpanahi/openmed.git && cp -R openmed/skills/deidentifying-clinical-text .agents/skills/
  ```

#### [`Claude Code Hook Redaction Strategy (ruvnet)`](https://gist.github.com/ruvnet/332336ad5e0516daa810d98f8f0ddca9)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *工具调用拦截：在智能体执行 Bash 或文件读取前，利用 PreToolUse 钩子在操作系统层拦截。*
* **🎯 为什么精选：** 真正的客户端系统级硬防护。不依赖大模型自我约束，而是通过系统级 PreToolUse 钩子自动用占位符置换环境变量与 API Key，保证秘钥物理上不离开本地。
* **📊 成熟度与可信背书：** `Verified Architecture` | ⭐ Claude Code Community Gist | 🛡️ *Client-side execution lifecycle hook verified on macOS/Linux*
* **适用客户端：** Claude Code
* **适用人群：** Developers, System Administrators, DevOps Engineers
* **核心价值：** 利用客户端 PreToolUse 钩子在工具执行前拦截环境变量与敏感秘钥，确保真实凭据绝不泄露至对话记录与云端大模型。
* **安装命令：**
  ```bash
  curl -sL https://gist.githubusercontent.com/ruvnet/332336ad5e0516daa810d98f8f0ddca9/raw -o .claude/hooks/pre-tool-redact.sh && chmod +x .claude/hooks/pre-tool-redact.sh
  ```

#### [`AREX Presidio Anonymize Text (VectorSpaceLab)`](https://github.com/VectorSpaceLab/AREX-Skill)
* **类型：** `SKILL.md`
* **使用时机：** ⏳ 输入前 — *文档读取前过滤：在智能体读取包含企业机密的文本文件或会话记录前介入。*
* **🎯 为什么精选：** 遵循 AgentSkills 标准封装的 Presidio 命名实体识别技能，开箱即用支持 Cursor、Antigravity 和 Claude Code，无缝集成到日常桌面工作流。
* **📊 成熟度与可信背书：** `Production Standard` | ⭐ AREX-Skill Repo | 🛡️ *Enterprise repository standard with deterministic NER masking*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Knowledge Workers, Enterprise Staff, Developers
* **核心价值：** 符合 AgentSkills 规范的文本脱敏技能包，利用 Presidio 扫描敏感实体并生成脱敏标记，保护企业机密资产。
* **安装命令：**
  ```bash
  git clone https://github.com/VectorSpaceLab/AREX-Skill.git && cp -R AREX-Skill/skills/repositories/repo-skills/presidio/sub-skills/anonymize-text .agents/skills/presidio-anonymize
  ```

---

### 2. 哪些回答能信？
*防止被 AI 极度自信的幻觉引用文献（Phantom Citations）、捏造的数据统计和伪造断言所误导。*

#### [`Post-Generation Fact-Check (jwynia/agent-skills)`](https://github.com/jwynia/agent-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *生成后独立执行：在初步草稿或回答生成后立即触发，在采纳任何结论前完成独立求证。*
* **🎯 为什么精选：** 解决大模型自我复读、自我印证幻觉的致命缺陷。强制设立独立的第二轮事实核查轮次，通过外部可信检索求证，严禁以大模型内部记忆为核验证据。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Agent Skills Library | 🛡️ *Verified multi-step claim extraction and external evidence retrieval*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Writers, Journalists, Researchers
* **核心价值：** 在内容生成后强制发起独立事实核查：提取所有事实断言，调用外部检索验证，明确拒绝以大模型自身记忆作为可信凭据。
* **安装命令：**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git && cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)`](https://github.com/CanXiangCC/aminer-open-skill)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *信源审计时：在审阅包含参考文献的文献综述、行业白皮书或论文初稿时运行。*
* **🎯 为什么精选：** 针对高阶学术幻觉痛点。普通工具仅检查文献是否存在，而该技能进一步获取论文正文，逐句比对文献是否真正支撑 AI 所声称的结论，防范张冠李戴。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ Aminer Open Skill Ecosystem | 🛡️ *Deep claim-to-passage alignment evaluation*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Academic Researchers, Peer Reviewers, Fact-Checkers
* **核心价值：** 深入拉取引文原文，逐条检验正文是否真实支撑对应论点，输出结构化判定结论（SUPPORTED、NOT_IN_SOURCE 等）。
* **安装命令：**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git && cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`BibRef Verify (yzhao062/agent-config)`](https://github.com/yzhao062/agent-config)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *论文定稿前审计：在论文或技术报告最终定稿前，对现有 .bib 文件进行一键批量排查。*
* **🎯 为什么精选：** 捍卫学术声誉。批量核对 .bib 文件中的文献条目，在不修改原文件的前提下排查虚构作者与幽灵 DOI，并输出清晰的审计报告。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Academic AgentConfig | 🛡️ *Batch Crossref & Semantic Scholar verification harness*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Academic Researchers, Grant Writers, Authors
* **核心价值：** 对学术论文的 .bib 参考文献进行批量查伪与信息核对，识别虚构作者和失效 DOI，输出结构化审计报告。
* **安装命令：**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`Citation-Check-Skill (open-agent-skills)`](https://github.com/open-agent-skills/citation-check-skill)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *草稿自检时：在智能体输出包含外部链接、DOI 或论文出处的技术草稿时自动触发。*
* **🎯 为什么精选：** 直击大模型最常见的“幽灵引文”幻觉。自动调用真实学术数据库 API 校验 DOI 与作者是否存在，把虚假文献直接标红剔除。
* **📊 成熟度与可信背书：** `Active Open Source` | ⭐ Open Agent Skills Standard | 🛡️ *Live API checks against Crossref & OpenAlex*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Researchers, Policy Analysts, Fact-Checkers
* **核心价值：** 自动提取生成文本中的引文与文献，调用学术接口实地检验 DOI 和作者是否真实存在，标红虚构引文。
* **安装命令：**
  ```bash
  git clone https://github.com/open-agent-skills/citation-check-skill.git .agents/skills/citation-check-skill
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *文稿编撰时：在利用 LaTeX、Markdown 或 Emacs 撰写学术手稿时实时校验。*
* **🎯 为什么精选：** 由知名计算化学学者 John Kitchin 教授打造，针对学术写作痛点，自动交叉比对 Crossref 与 PubMed，排查被撤稿论文与捏造条目。
* **📊 成熟度与可信背书：** `Mature Academic Tool` | ⭐ Scientific Research Community | 🛡️ *Built by academic faculty for LaTeX/Markdown scientific publishing*
* **适用客户端：** Claude Code、Emacs、Antigravity
* **适用人群：** Scientists, Academic Writers, LaTeX/Markdown Users
* **核心价值：** 批量校验论文参考文献条目，排查被撤稿论文和虚假引文，确保文献实证依据坚实可靠。
* **安装命令：**
  ```bash
  git clone https://github.com/jkitchin/skillz.git && cp -R skillz/skills/citation-verifier .agents/skills/
  ```

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *文章定稿推敲：在长篇深度报告或新闻特稿最终定稿前进行精细化命题审校。*
* **🎯 为什么精选：** 新闻调查级的审慎实务。将文章拆解为原子化的事实命题逐一求证，对证据不足的论述强制进行认识论对冲重写，杜绝过满断言。
* **📊 成熟度与可信背书：** `Active Framework` | ⭐ aidd-refine Workflow Suite | 🛡️ *Deconstructive claim-by-claim editorial verification protocol*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Journalists, Long-form Writers, Editors
* **核心价值：** 将文本拆解为独立的事实断言，强制调用搜索求证，并对缺少确切依据的句子施加审慎对冲修饰。
* **安装命令：**
  ```bash
  git clone https://github.com/aidd-refine/aidd-refine.git && cp -R aidd-refine/skills/05-fact-check .agents/skills/
  ```

#### [`Editorial Fact-Check & Quote Drift Protocol (anotherpanacea)`](https://gist.github.com/anotherpanacea-eng/30f9a6ca309923877f7e70b61e88fd24)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *深度编辑审校：在审校关键引语、统计数据或政策断言时运行两阶段核查。*
* **🎯 为什么精选：** 来自调查新闻业真实实务。针对自动化工具易漏掉的高阶伪造：排查引语漂移（微调原话改变倾向）和权威掩饰（用头衔声望代替真实证据）。
* **📊 成熟度与可信背书：** `Battle-Tested Gist` | ⭐ Investigative Journalism Protocol | 🛡️ *Sourced from public GitHub Gist by verified investigative editor*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Journalists, Editors, Fact-Checkers, Analysts
* **核心价值：** 两阶段新闻编辑级核查法，专门排查引语漂移（篡改原话）和权威掩饰（用权威声望代替事实证据）。
* **安装命令：**
  ```bash
  curl -sL https://gist.githubusercontent.com/anotherpanacea-eng/30f9a6ca309923877f7e70b61e88fd24/raw -o .agents/skills/editorial-fact-check/SKILL.md
  ```

#### [`Hallucination Risk Reviewer (Notysoty/openagentskills)`](https://github.com/Notysoty/openagentskills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *风险分级排查：在采纳或发布 AI 生成文本前，针对高危断言进行逐段分级排查。*
* **🎯 为什么精选：** 提供严谨的断言级幻觉风险分级量表，针对易错的特定版本号、生僻时间线及 URL 进行精准排雷，评估错误传播的严重后果。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ Open Agent Skills Catalog | 🛡️ *Commit-pinned risk rubric with structured output contract*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Editors, Content Teams, Researchers
* **核心价值：** 执行断言级幻觉风险分级排查，针对具体引文、URL、原话及高危行业断言进行严格审查与危害评估。
* **安装命令：**
  ```bash
  git clone https://github.com/Notysoty/openagentskills.git && cp -R openagentskills/skills/hallucination-risk-reviewer .agents/skills/
  ```

#### [`Vectara Hallucination Corrector HHEM (vectara)`](https://github.com/vectara/agent-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *检索后一致性校正：根据检索源文档评估生成内容的事实一致性，算法级剔除无根据断言。*
* **🎯 为什么精选：** 依托业界广泛认可的 Vectara HHEM 幻觉评测基准。它绝不尝试凭空补全缺失事实，而是严格删除或对冲无证据支撑的断言。
* **📊 成熟度与可信背书：** `Production API Integration` | ⭐ Vectara Agent Skills | 🛡️ *Backed by Vectara Hughes Hallucination Evaluation Model*
* **适用客户端：** Claude Code、Antigravity、Python Agents
* **适用人群：** Enterprise Analysts, RAG Operators, Researchers
* **核心价值：** 通过 Vectara HHEM 事实一致性模型比对生成文本与源文档，算法级剔除缺乏实证依据的幻觉断言。
* **安装命令：**
  ```bash
  git clone https://github.com/vectara/agent-skills.git && cp -R agent-skills/skills/hallucination-corrector .agents/skills/
  ```

#### [`K-Dense Scientific Peer Review (K-Dense-AI)`](https://github.com/K-Dense-AI/scientific-agent-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *推演论证审计：在审校科学实验方案、统计推断或复杂推论链条时介入。*
* **🎯 为什么精选：** 将学术同行评审的严苛标准带入复杂分析，交叉检查数学推导与实验推论链是否具备逻辑自洽性，拒绝凭感觉轻信。
* **📊 成熟度与可信背书：** `Active Research Release` | ⭐ Scientific Agent Skills | 🛡️ *Multi-perspective derivation and statistical validation harness*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Scientists, Peer Reviewers, Quantitative Analysts
* **核心价值：** 对学术与科学草稿执行严谨的同行评审级核验，交叉验证逻辑推导步骤与实证推断的有效性。
* **安装命令：**
  ```bash
  git clone https://github.com/K-Dense-AI/scientific-agent-skills.git && cp -R scientific-agent-skills/skills/peer-review .agents/skills/
  ```

---

### 3. 什么时候不能听 AI？
*破除“自动化偏见”（Automation Bias）与盲目赞同，划定人类决策的不可让渡底线。*

#### [`The Fool (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *方案反思时：在用户倾向于快速采纳 AI 规划或策略时主动召唤，以打破思维盲区。*
* **🎯 为什么精选：** 核心设计原则是“不替人类做决定，只负责拆台”。通过事前尸检、隐性假设勘探与认知偏差扫描，有力打破虚假共识与盲从。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ tech-leads-club Catalog | 🛡️ *Dialectical counterargument and pre-mortem methodology*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Managers, Founders, Strategists, Analysts
* **核心价值：** 充当专业反思者角色，执行隐性假设探测、辩证反驳、事前尸检与认知偏差扫描，粉碎盲从与虚假共识。
* **安装命令：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`Sycophancy Challenger (mohitagw15856/pm-claude-skills)`](https://github.com/mohitagw15856/pm-claude-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *方案推敲时：当你感觉 AI 态度过于奉承赞同、缺乏锋芒时开启对抗模式。*
* **🎯 为什么精选：** 针对大模型普遍存在的“谄媚迎合”痼疾。强制设定不可退让的反迎合规则：除非用户提供真实确凿的新证据，否则严禁为了礼貌而放弃批评立场。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ pm-claude-skills Suite | 🛡️ *Procedural anti-appeasement rules verified in iterative workflows*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Decision Makers, Product Managers, Founders
* **核心价值：** 强行将助手切换为对抗批判模式，严禁因用户施压而轻易妥协，坚决反抗大模型的谄媚偏见。
* **安装命令：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`Council Review (ngmeyer/council-review)`](https://github.com/ngmeyer/council-review)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *重大方案评审：在做重大技术选型、战略制定或架构变更前调动多智能体辩论。*
* **🎯 为什么精选：** 打破单一大模型的盲目自洽。通过多样化多智能体辩论协议（DMAD），综合运用反演法、类比反思与强制魔鬼代言人轮次，消除思维狭隘。
* **📊 成熟度与可信背书：** `Production Release` | ⭐ Council Review Project | 🛡️ *Diverse Multi-Agent Debate convergence detection*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Product Managers, Software Architects, Strategists
* **核心价值：** 多样化多智能体辩论（DMAD）协议，综合运用反演法、任务分解与强制魔鬼代言人轮次，打破单一大模型的盲目自洽。
* **安装命令：**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *事前演练：在需要严苛对练伙伴挑刺、找出方案隐蔽盲区时执行。*
* **🎯 为什么精选：** 强制将 AI 切换为“不留情面的反方辩友”，挑出用户方案中的逻辑漏洞、未明言假设与过度乐观倾向。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ orange2ai Catalog | 🛡️ *Adversarial assumption testing protocol*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Decision Makers, Product Managers, Policy Analysts
* **核心价值：** 强制将 AI 切换为反方对练伙伴，专门挑出方案中的逻辑漏洞、盲点与过度乐观假设。
* **安装命令：**
  ```bash
  git clone https://github.com/orange2ai/devils-advocate-skill.git .agents/skills/devils-advocate
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *压力测试：生成对抗性子智能体，在方案定稿前从 8 个不同失败维度进行压力测试。*
* **🎯 为什么精选：** 提供涵盖 8 个维度的系统化失败模式压力测试，防止用户陷入思维定势，主动预警潜在执行危机。
* **📊 成熟度与可信背书：** `Active Framework` | ⭐ mad-skills Ecosystem | 🛡️ *8-dimensional operational failure mode analysis*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Strategists, Writers, System Architects
* **核心价值：** 启动对抗性子智能体，在方案定稿前从 8 个不同失败维度进行系统化压力测试与风险评级。
* **安装命令：**
  ```bash
  git clone https://github.com/jihlenburg/mad-skills.git && cp -R mad-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Godfly Opposing Counsel (CassioRoos/godfly-skills)`](https://github.com/CassioRoos/godfly-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *不可逆决策关口：针对重大商业合同或战略定稿，生成正式的“反对方辩护状”。*
* **🎯 为什么精选：** 杜绝表面化的抬杠，输出高度严肃的“反对方辩护状”：精准测算选择当前路径的不可逆代价，明确界定在何种条件下竞争对手或备选方案将彻底胜出。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ Godfly Skills Standard | 🛡️ *Structured adversarial brief protocol for high-stakes decisions*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Executives, Team Leads, System Planners, Legal Counsel
* **核心价值：** 为重大决策起草正式的对抗性辩护状，攻击核心承重假设，量化不可逆成本，清晰指出失败临界点。
* **安装命令：**
  ```bash
  git clone https://github.com/CassioRoos/godfly-skills.git && cp -R godfly-skills/skills/devils-advocate .agents/skills/godfly-counsel
  ```

#### [`Devil's Advocate Reviewer Agent (Imbad0202)`](https://github.com/Imbad0202/academic-research-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *学术方案答辩前：在论文投稿或答辩前，对研究方法和理论根基执行压力测试。*
* **🎯 为什么精选：** 设立严格的程序化门禁阶梯，杜绝 AI 因为用户的反复辩解而轻易软化批评，专门探测学术论证中的根基性漏洞。
* **📊 成熟度与可信背书：** `Research Release` | ⭐ Academic Research Skills | 🛡️ *Rigorous anti-accommodation ladders for peer critique*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Researchers, PhD Candidates, Academic Authors
* **核心价值：** 采取对抗性评审立场探测学术论文的逻辑漏洞，设定严格防退让规则，绝不因用户施压而撤回关键学术质疑。
* **安装命令：**
  ```bash
  git clone https://github.com/Imbad0202/academic-research-skills.git && cp -R academic-research-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Multi-Perspective Red-Team Review (mohitagw15856)`](https://github.com/mohitagw15856/pm-claude-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *方案敲定前红队演练：从财务苛刻视角、法务合规视角及竞争对手视角全面发起攻击。*
* **🎯 为什么精选：** 将方案同时置于相互冲突的敌意视角下（严苛财务、法务合规、竞品攻防），以“发生概率 × 危害程度”对盲区排序，防止草率拍板。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ pm-claude-skills Suite | 🛡️ *Multi-persona critique with ranked blind spot scoring matrix*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Product Managers, Editors, Team Leads, Strategists
* **核心价值：** 通过多维度对抗性视角对规划执行压力测试，以发生概率与破坏力为盲区评级，实施严谨的事前尸检。
* **安装命令：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/red-team-review .agents/skills/red-team-review
  ```

#### [`Devil's Advocate Anti-Sycophancy (molly-diversifiedfun)`](https://github.com/molly-diversifiedfun/claude-skills)
* **类型：** `SKILL.md`
* **使用时机：** 💬 交互中 — *深度方案构思：在撰写高管简报、战略企划或核心论文论证时调动反向思考。*
* **🎯 为什么精选：** 写入了零妥协的反迎合协议：严禁以客套夸奖开场，严禁为迎合用户而软化批判，强制在输出中排查出至少一项潜在致命缺陷（Fatal Flaw）。
* **📊 成熟度与可信背书：** `Commit Pinned` | ⭐ Claude Skills Catalog | 🛡️ *Zero-appeasement anti-sycophancy contract with fatal-flaw requirements*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Executives, Strategists, Authors, Researchers
* **核心价值：** 基于事前尸检与苏格拉底诘问构建的反思伙伴，执行严格的反迎合准则，禁止以赞美开场或为取悦用户而妥协批评。
* **安装命令：**
  ```bash
  git clone https://github.com/molly-diversifiedfun/claude-skills.git && cp -R claude-skills/devils-advocate .agents/skills/devils-advocate
  ```

---

### 4. 输出能不能直接发布？
*让第三方（同事、读者、客户、监管）能够方便地核查验证成果证据链，拒绝空洞的形式化免责。*

#### [`AI Provenance (noheton/f-ai2-r)`](https://github.com/noheton/f-ai2-r)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *成果交付前：在向同事、导师或客户提交最终报告、文章或代码 PR 之前生成可核验证明。*
* **🎯 为什么精选：** 将模糊的口头说明转为可验证的实证凭据。自动留存模型版本、提示词哈希与工具调用流水，并将最终核验权强制保留在人类手中。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ f-ai2-r Provenance Framework | 🛡️ *Cryptographic hash tracking and human-confirmed verification ladder*
* **适用客户端：** Antigravity、Cursor、Claude Code
* **适用人群：** Researchers, Journalists, Authors, Developers
* **核心价值：** 自动记录人机协作轨迹（模型版本、提示词哈希、工具调用与验证状态），并推导出可信的人类可读 AI 使用披露说明。
* **安装命令：**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *发布授权关卡：在任何文案、文章或营销活动正式对外公开前的硬性拦截门禁。*
* **🎯 为什么精选：** 从物理层面切断大模型直接对外的发布链路。写作智能体被明确剥夺发布权限，必须依赖外部独立的人类审阅授权回执（PASS/FIX/BLOCK）方可放行。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Newsroom & Publishing Teams | 🛡️ *Strict fail-closed gate with human sign-off requirement*
* **适用客户端：** Antigravity、Cursor、Claude Code
* **适用人群：** Editors, Content Teams, Media Creators
* **核心价值：** 对 AI 草稿执行 PASS/FIX/BLOCK 硬性发布门禁。编写与审校智能体被物理剥夺直接发布权限，必须依赖外部人类授权回执。
* **安装命令：**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)`](https://github.com/harlan-zw/harlan-agent-kit)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *代码提交阶段：在推送 GitHub Pull Request 或生成版本发布说明（Release Notes）前拦截。*
* **🎯 为什么精选：** 将诚信披露做成代码提交流程的硬性门禁。在撰写 PR 时自动嵌入不可擅自删改的透明说明，防止滥用 AI 产生无意义的垃圾代码或隐瞒辅助事实。
* **📊 成熟度与可信背书：** `Production Standard` | ⭐ harlan-agent-kit Ecosystem | 🛡️ *Machine-gated PR generation with mandatory transparency clauses*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Open Source Maintainers, Software Engineers, Technical Writers
* **核心价值：** 将 AI 披露做成代码提交与 PR 的机器强制门禁。强制嵌入透明声明，声明若被删改则直接拒绝执行发布命令。
* **安装命令：**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git && cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`awesome-copilot/gdpr-compliant`](https://github.com/awesome-copilot/skills)
* **类型：** `SKILL.md`
* **使用时机：** 🧹 归档清理 — *会话归档归宗：在项目结算时留存代码与文本的人机协作痕迹，以备知识产权与合规审计。*
* **🎯 为什么精选：** 提供清晰的知识产权与数据溯源凭据。确保团队在面对商业版权争议、开源授权协议及 GDPR 审计时，能出具有说服力的人机贡献明细。
* **📊 成熟度与可信背书：** `Active Production` | ⭐ awesome-copilot Standard | 🛡️ *Audit-ready logging conforming to European data protection standards*
* **适用客户端：** GitHub Copilot、Claude Code
* **适用人群：** Software Engineers, Compliance Officers, Legal Auditors
* **核心价值：** 记录代码与文本的生成轨迹与数据来源，为机构出具可信审计日志，明确人机贡献界限。
* **安装命令：**
  ```bash
  git clone https://github.com/awesome-copilot/skills.git && cp -R skills/skills/gdpr-compliant .agents/skills/
  ```

#### [`Publish Prep Review (45ck/content-machine)`](https://github.com/45ck/content-machine)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *公开上传门禁：在最终成稿或视频对外发布前介入，校验信源版权、模型版本哈希与可核验证据。*
* **🎯 为什么精选：** 采用硬性的“闭门拦截（Fail-closed）”机制。只要缺少信源版权证据，或生成的素材缺少明确的模型版本、工作流与哈希溯源信息，系统物理禁止放行。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ content-machine Harness | 🛡️ *Fail-closed public readiness check with asset-level provenance ledger*
* **适用客户端：** Claude Code、Antigravity、Codex CLI
* **适用人群：** Content Creators, Editors, Media Production Teams
* **核心价值：** 在成果最终上传前进行闭环校验，核验最终成稿、引文版权、工作流模型哈希，缺少可核验证据时强制阻止发布。
* **安装命令：**
  ```bash
  git clone https://github.com/45ck/content-machine.git && cp -R content-machine/skills/publish-prep-review .agents/skills/
  ```

#### [`AI Attribution Framework (ismet55555)`](https://github.com/ismet55555/ai-attribution)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *贡献度归属：在智能体产出核心方案、逻辑或架构时，实时更新本地 AI_ATTRIBUTION.md 文件。*
* **🎯 为什么精选：** 替代粗糙的形式化免责声明。通过标准的 6 级人机协作贡献阶梯，在本地维护 `AI_ATTRIBUTION.md`，让同事或审查者精准识别每一处逻辑的人机权责归属。
* **📊 成熟度与可信背书：** `Active Open Specification` | ⭐ AI Attribution Standard | 🛡️ *Standardized 6-level human-AI contribution spectrum ledger*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Software Engineers, Authors, Technical Writers
* **核心价值：** 通过本地 AI_ATTRIBUTION.md 文件建立 6 级人机贡献度阶梯，精确记录 AI 究竟是主导了架构还是仅充当辅助参谋。
* **安装命令：**
  ```bash
  curl -sL https://raw.githubusercontent.com/ismet55555/ai-attribution/main/AI_ATTRIBUTION.md -o AI_ATTRIBUTION.md
  ```

#### [`AI Disclosure Convention SPDX-style (ggfevans)`](https://github.com/ggfevans/ai-disclosure)
* **类型：** `SKILL.md`
* **使用时机：** 📤 交付前 — *文件头标记：在代码文件头或 Markdown 前置元数据中注入机器可读的 SPDX 规范声明标签。*
* **🎯 为什么精选：** 能够抵抗 Git Rebase 和文件重构的侵蚀。直接在代码或文件头注入轻量级机器可读 W3C/SPDX 标签，保证成果无论如何流转，第三方工具都能一键检测人机界限。
* **📊 成熟度与可信背书：** `Active Specification` | ⭐ W3C-aligned Convention | 🛡️ *Language-agnostic file-level attribution convention based on W3C vocabularies*
* **适用客户端：** Cursor、Antigravity、Claude Code、Copilot
* **适用人群：** Developers, Authors, Compliance Officers
* **核心价值：** 在文件头注释中嵌入轻量级、机器可读的 AI 披露标签（SPDX 风格），确保归属与审计信息在跨仓库流转中持久保留。
* **安装命令：**
  ```bash
  git clone https://github.com/ggfevans/ai-disclosure.git .agents/skills/ai-disclosure
  ```

#### [`Skill Provenance Tracker (snapsynapse)`](https://github.com/snapsynapse/skill-provenance)
* **类型：** `SKILL.md`
* **使用时机：** 🧹 归档清理 — *执行审计记录：跨多轮会话精准追踪所调用的技能版本、参数、工具链与模型种子号。*
* **🎯 为什么精选：** 为复杂的智能体任务提供密码学级可溯源账本，生成具备可校验性的执行收据，证实具体哪个技能在何时接触了何种数据。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ snapsynapse Framework | 🛡️ *Cryptographic execution and invocation ledger*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Auditors, Enterprise Researchers, System Architects
* **核心价值：** 跨会话追踪智能体技能版本、调用上下文及数据流转，生成具备防篡改特性的执行收据以供合规审计。
* **安装命令：**
  ```bash
  git clone https://github.com/snapsynapse/skill-provenance.git .agents/skills/skill-provenance
  ```

#### [`Claude Code Session Audit Protocol (lghupan)`](https://gist.github.com/lghupan/46d65f4035481ef6058d0e895bdeb73a)
* **类型：** `SKILL.md`
* **使用时机：** 🧹 归档清理 — *会话归档与导出：在与 AI 会话结束后，自动提取结构化交互轨迹并输出可核查凭据。*
* **🎯 为什么精选：** 帮助普通知识工作者轻松提取可信的交互全过程纪要，无需保存冗长的原始 Token 日志，一键输出便于同行复核的紧凑审计摘要。
* **📊 成熟度与可信背书：** `Verified Protocol Gist` | ⭐ Claude Code Community | 🛡️ *Public GitHub Gist tested on macOS/Linux session transcript extraction*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Researchers, Knowledge Workers, Professional Writers
* **核心价值：** 从智能体存储中提取结构化会话记录与提示词流转日志，生成人类可审计的会话收据以备第三方核验。
* **安装命令：**
  ```bash
  curl -sL https://gist.githubusercontent.com/lghupan/46d65f4035481ef6058d0e895bdeb73a/raw -o .agents/skills/session-audit/SKILL.md
  ```

---

## 🛑 人类决策的不可让渡底线

在任何情况下，以下决策与行为均不可盲目让渡给 AI：
* **未经执业医生独立复核**的医疗诊断与用药处方决策。
* **具有法律效力**的合规签字与不可撤销的商业合同签署。
* **针对具体个人**的最终处分、解雇或招聘拒绝决定。
* **仅凭 AI 对话结果**作为独家信源对外发布事实报道。

---

## 🤝 参与贡献

欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 Responsible AI Use Contributors
