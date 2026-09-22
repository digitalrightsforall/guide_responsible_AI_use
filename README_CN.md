# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 38 个成熟开源 `SKILL.md` 规范技能。我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。

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

---

### 1. 我能把什么给 AI？
*防止将个人身份信息（PII）、商业机密草案或受保护的访谈记录无意泄露给商业大模型作为训练语料。*

#### [`PII Safe Documents (danyuchn/pii-guard)`](https://github.com/danyuchn/pii-guard)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *输入前运行：在把任何涉及隐私的本地文档、访谈实录或草稿提供给智能体之前执行。*
* **💡 为何普通人应该关心：** 普通人在让 AI 帮写自述、改简历或整理客户草案时，姓名、住址、私人细节会被直接发往云端大模型并可能变成公共训练语料。这个技能在本地把敏感词打上安全马赛克，任务完成后在本地还原，保护隐私不外泄。
* **🎯 为什么精选收录：** 直接针对商业 AI 过度采集数据的风险。它不像一般工具仅做文字提示，而是默认视云端为不可信环境，在本地强制生成脱敏临时副本，主 Agent 物理上无法接触原始文件。
* **🛠️ 如何使用：** 一键复制命令将技能放入 Cursor 的 `.agents/skills/` 或 Claude Code 目录，AI 在读取指定文档前会自动先在本地生成脱敏副本。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ AgentSkills Standard | 🛡️ *Audited local-first isolation pipeline with automatic purge*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** General Knowledge Workers, Researchers, Journalists
* **安装命令：**
  ```bash
  git clone https://github.com/danyuchn/pii-guard.git && cp -R pii-guard/.agents/skills/pii-safe-documents .agents/skills/
  ```

#### [`Scholar Safety (joshzyj/open-scholar-skill)`](https://github.com/joshzyj/open-scholar-skill)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *文件读取前：在智能体对研究文件执行 Read 操作前自动拦截并执行本地扫描。*
* **💡 为何普通人应该关心：** 学者或学生使用 AI 辅助统计未发表的调查问卷、实验数据时，若不慎将受伦理保护的原始数据上传至公共大模型，可能违反学术伦理甚至吃官司。该技能确保敏感数据只在本地跑代码计算，绝不上传云端。
* **🎯 为什么精选收录：** 将学术机构的合规与伦理防护带到日常桌面端。对敏感学术文件设置本地门禁，支持仅在本地跑脚本完成统计分析，正文绝不上传云端。
* **🛠️ 如何使用：** 安装到 Claude Code 或 Antigravity 中，在向智能体下达数据分析指令前自动拦截未授权文件的联网读取。
* **📊 成熟度与可信背书：** `Active Release` | ⭐ Open Scholar Suite | 🛡️ *Designed for university & clinical research data custodians*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Academic Researchers, Qualitative Analysts, IRB Custodians
* **安装命令：**
  ```bash
  git clone https://github.com/joshzyj/open-scholar-skill.git && cp -R open-scholar-skill/.claude/skills/scholar-safety ~/.claude/skills/
  ```

#### [`Skill Sanitizer (cyberxuan-XBX/skill-sanitizer)`](https://github.com/cyberxuan-XBX/skill-sanitizer)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *安装前检查：在将任何第三方的 SKILL.md 载入工作区或智能体之前运行。*
* **💡 为何普通人应该关心：** 许多人喜欢在网上下载别人的“AI 提示词插件”或“快捷技能”，但其中可能夹带了恶意木马或偷偷把你的电脑文件传给黑客的代码。这个技能就像防病毒软件，在加载任何新技能前先进行安全排毒。
* **🎯 为什么精选收录：** 保护智能体供应链安全。社区技能鱼龙混杂，该工具在技能载入内存前深度扫描是否含有隐蔽的越权 Bash 命令、注入攻击或凭证外泄后门。
* **🛠️ 如何使用：** 安装后，当你想从外部引入新的技能包时，运行此技能自动扫描目标文件夹中的安全漏洞与恶意提权指令。
* **📊 成熟度与可信背书：** `Production v2.1` | ⭐ Open Source Community | 🛡️ *Zero cloud dependencies, 7-layer semantic detection*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Developers, Power Users, Knowledge Workers
* **安装命令：**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII-Shield (gregmos/PII-Shield)`](https://github.com/gregmos/PII-Shield)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *文档批量处理时：在让智能体批量处理 PDF、Word 或 Markdown 文档前执行。*
* **💡 为何普通人应该关心：** 日常跟 AI 聊天时，人们经常顺手粘贴了工作邮箱、手机号或内网地址。该技能利用轻量级本地模型在发送前拦截个人标识，避免商业大模型“记住”你的私人联系方式。
* **🎯 为什么精选收录：** 零门槛且经过实测的文档脱敏工具，支持跨常见办公文件格式（Word、PDF）自动探测并替换个人身份信息，无需复杂运维。
* **🛠️ 如何使用：** 作为本地代理或钩子安装，对话发送前自动匹配手机号、邮箱、身份证号并替换为无害占位符。
* **📊 成熟度与可信背书：** `Production Ready` | ⭐ Open Agent Community | 🛡️ *Document-level token replacement tested on legal/financial docs*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** General Knowledge Workers, Legal & Financial Analysts
* **安装命令：**
  ```bash
  git clone https://github.com/gregmos/PII-Shield.git .agents/skills/pii-shield
  ```

#### [`PII Detection Pipeline (mukul975/Privacy-Data-Protection-Skills)`](https://github.com/mukul975/Privacy-Data-Protection-Skills)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *输入前门禁：在向大模型发送对话正文与附件前，在本地运行正则与命名实体识别，拦截电话、住址与身份证号。*
* **💡 为何普通人应该关心：** 当使用 AI 整理长篇会议记录或访谈录音时，人工挑选敏感信息极其耗时。此工具基于国际规范自动分类和批量脱敏 20 类隐私数据，为普通人提供企业级的隐私防火墙。
* **🎯 为什么精选收录：** 遵循 agentskills.io 开源标准，在本地针对 20 类隐私数据提供自动化识别与掩码处理，杜绝私密数据外流至模型供应商。
* **🛠️ 如何使用：** 克隆技能目录至客户端，处理长文档时指令呼叫该技能，自动完成批量脱敏并生成脱敏映射表。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ agentskills.io Verified | 🛡️ *Audited open-source privacy framework with 282+ skills*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Support Teams, Account Managers, Operations
* **安装命令：**
  ```bash
  git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/pii-detection-pipeline ~/.claude/skills/
  ```

#### [`Anonymize Documents with Presidio (schneidermichael)`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *预处理流水线：在把田野调查、定性访谈录音文本发给大模型前本地批处理运行。*
* **💡 为何普通人应该关心：** 微软官方开源的成熟脱敏引擎（Presidio），经受过全球众多专业机构检验。普通人无需高深技术，也能借此在本地安全处理 PDF、Word 文档，避免商业公司窥探个人文档。
* **🎯 为什么精选收录：** 将微软成熟的 Presidio 命名实体识别引擎引入桌面端，依靠高精度的确定性模型过滤敏感实体，而非依赖不可靠的 LLM 自觉脱敏。
* **🛠️ 如何使用：** 执行安装命令并在本地准备好 Python 环境，处理文档前调用即可在本地生成脱敏后的清洁文档。
* **📊 成熟度与可信背书：** `Active Open Source` | ⭐ Microsoft Presidio Ecosystem | 🛡️ *Backed by Microsoft Presidio NLP open-source engine*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Qualitative Researchers, Sociologists, Analysts
* **安装命令：**
  ```bash
  git clone https://github.com/schneidermichael/anonymize-documents-with-presidio.git .agents/skills/presidio-anonymizer
  ```

#### [`TrustBoost PII Sanitizer (teodorofodocrispin-cmyk)`](https://github.com/teodorofodocrispin-cmyk/TrustBoost-PII-Sanitizer)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *上流拦截门禁：在文本或文件内容上传至云端 LLM 接口之前进行多语言强行脱敏。*
* **💡 为何普通人应该关心：** 普通人通常无法分辨哪些商业大模型厂商签署了“不拿用户数据做训练”的协议。这个工具采用“默认全部不可信”策略，在本地就抹除痕迹，不管云端怎么换厂商都高枕无忧。
* **🎯 为什么精选收录：** 支持跨 8 种主流语言的上下文 PII 强脱敏，严格遵循 GDPR、LGPD 和 HIPAA 等国际隐私标准，特别适合跨国协作与金融法律团队。
* **🛠️ 如何使用：** 放置于客户端技能目录，在处理涉及商业报价或用户名单的表格前激活，自动生成匿名占位符。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Multi-client Ecosystem | 🛡️ *Tested across 8 languages with compliance mapping*
* **适用客户端：** Claude Code、Cursor、Windsurf
* **适用人群：** Enterprise Knowledge Workers, Financial Analysts, Legal Professionals
* **安装命令：**
  ```bash
  git clone https://github.com/teodorofodocrispin-cmyk/TrustBoost-PII-Sanitizer.git .agents/skills/trustboost-pii-sanitizer
  ```

#### [`OpenMed Clinical Document Ingestion (maziyarpanahi)`](https://github.com/maziyarpanahi/openmed)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *临床数据录入门禁：在将病历记录、临床随访笔记或患者数据交由 AI 分析前执行。*
* **💡 为何普通人应该关心：** 许多患者或家属习惯把医院检查报告、病历拍照发给大模型询问病情。病历属于最敏感的特种个人隐私，这个技能在本地隔离临床记录，剔除患者姓名与住院号后再向 AI 求证医疗常识。
* **🎯 为什么精选收录：** 针对极高敏感度的医疗健康数据（PHI），在智能体接触病历和患者记录前强制执行医学实体脱敏，严守医疗伦理红线。
* **🛠️ 如何使用：** 导入客户端后，在输入任何化验单或病历文本时激活，它会自动过滤姓名、就诊卡号和医院床位信息。
* **📊 成熟度与可信背书：** `Active Research Release` | ⭐ OpenMed Suite | 🛡️ *Clinical NLP benchmarked for HIPAA PHI safety*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Clinical Researchers, Healthcare Analysts, Medical Writers
* **安装命令：**
  ```bash
  git clone https://github.com/maziyarpanahi/openmed.git && cp -R openmed/skills/deidentifying-clinical-text .agents/skills/
  ```

#### [`Claude Code Hook Redaction Strategy (ruvnet)`](https://gist.github.com/ruvnet/332336ad5e0516daa810d98f8f0ddca9)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *工具调用拦截：在智能体执行 Bash 或文件读取前，利用 PreToolUse 钩子在操作系统层拦截。*
* **💡 为何普通人应该关心：** 针对 Claude Code 桌面端工作流的底层门禁。普通人哪怕不小心在终端按了回车，底层的钩子也会在网络请求发出的前一毫秒强行拦截脱敏，避免“手滑”泄密。
* **🎯 为什么精选收录：** 真正的客户端系统级硬防护。不依赖大模型自我约束，而是通过系统级 PreToolUse 钩子自动用占位符置换环境变量与 API Key，保证秘钥物理上不离开本地。
* **🛠️ 如何使用：** 将 Gist 中的配置脚本添加到本地 `.claude/config`，终端会自动在每次提示词发出前执行脱敏过滤。
* **📊 成熟度与可信背书：** `Verified Architecture` | ⭐ Claude Code Community Gist | 🛡️ *Client-side execution lifecycle hook verified on macOS/Linux*
* **适用客户端：** Claude Code
* **适用人群：** Developers, System Administrators, DevOps Engineers
* **安装命令：**
  ```bash
  curl -sL https://gist.githubusercontent.com/ruvnet/332336ad5e0516daa810d98f8f0ddca9/raw -o .claude/hooks/pre-tool-redact.sh && chmod +x .claude/hooks/pre-tool-redact.sh
  ```

#### [`AREX Presidio Anonymize Text (VectorSpaceLab)`](https://github.com/VectorSpaceLab/AREX-Skill)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *文档读取前过滤：在智能体读取包含企业机密的文本文件或会话记录前介入。*
* **💡 为何普通人应该关心：** 专注短文本与日常聊天提示词脱敏。普通人复制微信聊天、邮件往来给 AI 做摘要时，几秒钟内就能在本地把人名和公司名换成“张某某”、“某企业”，彻底斩断数据溯源链。
* **🎯 为什么精选收录：** 遵循 AgentSkills 标准封装的 Presidio 命名实体识别技能，开箱即用支持 Cursor、Antigravity 和 Claude Code，无缝集成到日常桌面工作流。
* **🛠️ 如何使用：** 通过提供的安装命令配置到 Cursor 或 Claude，在日常分析邮件或对话记录时自动调用。
* **📊 成熟度与可信背书：** `Production Standard` | ⭐ AREX-Skill Repo | 🛡️ *Enterprise repository standard with deterministic NER masking*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Knowledge Workers, Enterprise Staff, Developers
* **安装命令：**
  ```bash
  git clone https://github.com/VectorSpaceLab/AREX-Skill.git && cp -R AREX-Skill/skills/repositories/repo-skills/presidio/sub-skills/anonymize-text .agents/skills/presidio-anonymize
  ```

---

### 2. 哪些回答能信？
*防止被 AI 极度自信的幻觉引用文献（Phantom Citations）、捏造的数据统计和伪造断言所误导。*

#### [`Post-Generation Fact-Check (jwynia/agent-skills)`](https://github.com/jwynia/agent-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *生成后独立执行：在初步草稿或回答生成后立即触发，在采纳任何结论前完成独立求证。*
* **💡 为何普通人应该关心：** 大模型非常擅长用极其自信和权威的口吻胡说八道。普通人如果直接拿去发朋友圈、做决策或写作业，很容易闹笑话。这个技能在 AI 输出后启动“侦探模式”，逐句拆解断言并寻找反证。
* **🎯 为什么精选收录：** 解决大模型自我复读、自我印证幻觉的致命缺陷。强制设立独立的第二轮事实核查轮次，通过外部可信检索求证，严禁以大模型内部记忆为核验证据。
* **🛠️ 如何使用：** 在 AI 生成长篇文章或报告后呼叫该技能，它会提取文中的事实性判断并生成真伪核查报告。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Agent Skills Library | 🛡️ *Verified multi-step claim extraction and external evidence retrieval*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Writers, Journalists, Researchers
* **安装命令：**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git && cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)`](https://github.com/CanXiangCC/aminer-open-skill)
* **使用时机：** 💬 交互中·求证与防盲信 — *信源审计时：在审阅包含参考文献的文献综述、行业白皮书或论文初稿时运行。*
* **💡 为何普通人应该关心：** AI 经常会给出看似高大上的学术引文，但里面的刊期、卷号、作者往往错漏百出。该技能连接专业学术文献库，确认论文不仅存在，而且页码和发表年份完全真实。
* **🎯 为什么精选收录：** 针对高阶学术幻觉痛点。普通工具仅检查文献是否存在，而该技能进一步获取论文正文，逐句比对文献是否真正支撑 AI 所声称的结论，防范张冠李戴。
* **🛠️ 如何使用：** 在生成学术性段落后触发，技能会自动抽取文中所有括号引文并在学术库中做匹配校验。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ Aminer Open Skill Ecosystem | 🛡️ *Deep claim-to-passage alignment evaluation*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Academic Researchers, Peer Reviewers, Fact-Checkers
* **安装命令：**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git && cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`BibRef Verify (yzhao062/agent-config)`](https://github.com/yzhao062/agent-config)
* **使用时机：** 💬 交互中·求证与防盲信 — *论文定稿前审计：在论文或技术报告最终定稿前，对现有 .bib 文件进行一键批量排查。*
* **💡 为何普通人应该关心：** 写论文时最头疼的就是文末参考文献列表。该工具自动比对每篇文献的真实 DOI，杜绝因为 AI 捏造文献而导致整篇毕业设计或期刊投稿被直接拒稿。
* **🎯 为什么精选收录：** 捍卫学术声誉。批量核对 .bib 文件中的文献条目，在不修改原文件的前提下排查虚构作者与幽灵 DOI，并输出清晰的审计报告。
* **🛠️ 如何使用：** 把导出的参考文献文件或正文交给技能，它会自动返回哪些文献真实可查，哪些文献属于疑似幻觉。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Academic AgentConfig | 🛡️ *Batch Crossref & Semantic Scholar verification harness*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Academic Researchers, Grant Writers, Authors
* **安装命令：**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`Citation Integrity Auditor (scdenney/open-science-skills)`](https://github.com/scdenney/open-science-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *草稿求证阶段：在生成学术或科普草稿后，对照 Crossref、OpenAlex 等真实学术数据库逐条核验，揪出凭空捏造的假文献。*
* **💡 为何普通人应该关心：** 普通学生或写作者很容易被 AI 生成的“虚构文献”坑害，导致职业声誉受损。该技能逐条核对全球学术数据库，查不到就明确标红“无法核实”，绝不自欺欺人。
* **🎯 为什么精选收录：** 直击大模型最致命的“虚构文献”问题：AI 经常会一本正经地捏造看似真实的论文标题、假 DOI 和虚假期刊名。
* **🛠️ 如何使用：** 在起草学术或科普文稿后呼叫，它会输出清晰的引文核验清单，标明每一条引文的真实 DOI 与收录库。
* **📊 成熟度与可信背书：** `Active Release` | ⭐ Open Science Skills Suite | 🛡️ *Empirical research workflow maintained by scdenney*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Researchers, Policy Analysts, Fact-Checkers
* **安装命令：**
  ```bash
  git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/citation-check ~/.claude/skills/
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **使用时机：** 💬 交互中·求证与防盲信 — *文稿编撰时：在利用 LaTeX、Markdown 或 Emacs 撰写学术手稿时实时校验。*
* **💡 为何普通人应该关心：** 大学教授团队开源的经典文献核验工具。不仅核查文献有没有，还会把每一篇文献的真实摘要调出来给你比对，让你心里有底。
* **🎯 为什么精选收录：** 由知名计算化学学者 John Kitchin 教授打造，针对学术写作痛点，自动交叉比对 Crossref 与 PubMed，排查被撤稿论文与捏造条目。
* **🛠️ 如何使用：** 安装到 Emacs/Cursor/Claude 中，一键验证整篇 Markdown 或 LaTeX 的引文真实性。
* **📊 成熟度与可信背书：** `Mature Academic Tool` | ⭐ Scientific Research Community | 🛡️ *Built by academic faculty for LaTeX/Markdown scientific publishing*
* **适用客户端：** Claude Code、Emacs、Antigravity
* **适用人群：** Scientists, Academic Writers, LaTeX/Markdown Users
* **安装命令：**
  ```bash
  git clone https://github.com/jkitchin/skillz.git && cp -R skillz/skills/citation-verifier .agents/skills/
  ```

#### [`Claim–Source Fact Checker (scdenney/open-science-skills)`](https://github.com/scdenney/open-science-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *观点求证阶段：检查 AI 附带的参考文献是否真的支持它所说的结论，防止“挂羊头卖狗肉”式的张冠李戴。*
* **💡 为何普通人应该关心：** AI 极具欺骗性的一点在于：给了一个真实存在的知名论文，但论文结论明明说“无效果”，AI 却断言“非常有效”。这个技能比对句子与真实原文，防止张冠李戴。
* **🎯 为什么精选收录：** 解决更隐蔽的“断章取义”缺陷：即使 AI 给出的文献真实存在，它也经常歪曲、夸大甚至颠倒原作者的实际研究结论。
* **🛠️ 如何使用：** 在让 AI 产出研究综述时运行该技能，它会检查关键断言是否真正得到了参考文献的直接支撑。
* **📊 成熟度与可信背书：** `Active Release` | ⭐ Open Science Skills Suite | 🛡️ *Claim-source consistency auditor for empirical science*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Journalists, Long-form Writers, Editors
* **安装命令：**
  ```bash
  git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/fact-check ~/.claude/skills/
  ```

#### [`Editorial Fact-Check & Quote Drift Protocol (anotherpanacea)`](https://gist.github.com/anotherpanacea-eng/30f9a6ca309923877f7e70b61e88fd24)
* **使用时机：** 💬 交互中·求证与防盲信 — *深度编辑审校：在审校关键引语、统计数据或政策断言时运行两阶段核查。*
* **💡 为何普通人应该关心：** 资深编辑团队沉淀的事实核查流程。普通写作者拿它来审查商业软文或科普文章，能够有效避免把谣言和过时数据当做新闻传播。
* **🎯 为什么精选收录：** 来自调查新闻业真实实务。针对自动化工具易漏掉的高阶伪造：排查引语漂移（微调原话改变倾向）和权威掩饰（用头衔声望代替真实证据）。
* **🛠️ 如何使用：** 将 Gist 中的协议加载至客户端，AI 生成文章后会自动按新闻级事实标准执行多方交叉验证。
* **📊 成熟度与可信背书：** `Battle-Tested Gist` | ⭐ Investigative Journalism Protocol | 🛡️ *Sourced from public GitHub Gist by verified investigative editor*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Journalists, Editors, Fact-Checkers, Analysts
* **安装命令：**
  ```bash
  curl -sL https://gist.githubusercontent.com/anotherpanacea-eng/30f9a6ca309923877f7e70b61e88fd24/raw -o .agents/skills/editorial-fact-check/SKILL.md
  ```

#### [`Hallucination Risk Reviewer (Notysoty/openagentskills)`](https://github.com/Notysoty/openagentskills)
* **使用时机：** 💬 交互中·求证与防盲信 — *风险分级排查：在采纳或发布 AI 生成文本前，针对高危断言进行逐段分级排查。*
* **💡 为何普通人应该关心：** 在普通人看来，AI 说的每一句话都“看起来很有道理”。这个技能专门挑刺：给输出文字做“幻觉风险评级”，把缺乏可靠证据的猜测句一一标记出来提醒你。
* **🎯 为什么精选收录：** 提供严谨的断言级幻觉风险分级量表，针对易错的特定版本号、生僻时间线及 URL 进行精准排雷，评估错误传播的严重后果。
* **🛠️ 如何使用：** 文章写完后呼叫该技能，AI 会扮演挑剔的审核员，将文中存疑、绝对化但无依据的措辞逐一圈出。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ Open Agent Skills Catalog | 🛡️ *Commit-pinned risk rubric with structured output contract*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Editors, Content Teams, Researchers
* **安装命令：**
  ```bash
  git clone https://github.com/Notysoty/openagentskills.git && cp -R openagentskills/skills/hallucination-risk-reviewer .agents/skills/
  ```

#### [`Vectara Hallucination Corrector HHEM (vectara)`](https://github.com/vectara/agent-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *检索后一致性校正：根据检索源文档评估生成内容的事实一致性，算法级剔除无根据断言。*
* **💡 为何普通人应该关心：** 基于权威的幻觉评估模型（HHEM），通过严谨的数学算法比对 AI 的回答与原始参考资料。普通人不用自己肉眼苦找，机器自动标出哪里偏离了事实。
* **🎯 为什么精选收录：** 依托业界广泛认可的 Vectara HHEM 幻觉评测基准。它绝不尝试凭空补全缺失事实，而是严格删除或对冲无证据支撑的断言。
* **🛠️ 如何使用：** 安装后，当智能体基于你上传的资料回答问题时，技能自动计算两者间的一致性得分并纠偏。
* **📊 成熟度与可信背书：** `Production API Integration` | ⭐ Vectara Agent Skills | 🛡️ *Backed by Vectara Hughes Hallucination Evaluation Model*
* **适用客户端：** Claude Code、Antigravity、Python Agents
* **适用人群：** Enterprise Analysts, RAG Operators, Researchers
* **安装命令：**
  ```bash
  git clone https://github.com/vectara/agent-skills.git && cp -R agent-skills/skills/hallucination-corrector .agents/skills/
  ```

#### [`K-Dense Scientific Peer Review (K-Dense-AI)`](https://github.com/K-Dense-AI/scientific-agent-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *推演论证审计：在审校科学实验方案、统计推断或复杂推论链条时介入。*
* **💡 为何普通人应该关心：** 把严肃科学期刊的“同行评审”标准搬到日常生活中。无论是分析健康饮食指南还是商业方案，它都能以极高标准检验逻辑漏洞，防止被伪科学忽悠。
* **🎯 为什么精选收录：** 将学术同行评审的严苛标准带入复杂分析，交叉检查数学推导与实验推论链是否具备逻辑自洽性，拒绝凭感觉轻信。
* **🛠️ 如何使用：** 在产出研究提案或分析报告后调用，技能会模仿顶刊评审专家提出尖锐质疑与补证要求。
* **📊 成熟度与可信背书：** `Active Research Release` | ⭐ Scientific Agent Skills | 🛡️ *Multi-perspective derivation and statistical validation harness*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Scientists, Peer Reviewers, Quantitative Analysts
* **安装命令：**
  ```bash
  git clone https://github.com/K-Dense-AI/scientific-agent-skills.git && cp -R scientific-agent-skills/skills/peer-review .agents/skills/
  ```

---

### 3. 什么时候不能听 AI？
*破除“自动化偏见”（Automation Bias）与盲目赞同，划定人类决策的独立思考防线。*

#### [`The Fool (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *方案反思时：在用户倾向于快速采纳 AI 规划或策略时主动召唤，以打破思维盲区。*
* **💡 为何普通人应该关心：** 大模型有极其严重的“讨好型人格”（Sycophancy）：你提出一个错误的荒谬想法，它也会顺着你夸赞。这个技能扮演“皇帝新衣里的诚实小丑”，专挑你方案里的致命盲点开火。
* **🎯 为什么精选收录：** 核心设计原则是“不替人类做决定，只负责拆台”。通过事前尸检、隐性假设勘探与认知偏差扫描，有力打破虚假共识与盲从。
* **🛠️ 如何使用：** 在做重要商业决定或设计方案时激活，强迫 AI 放弃谄媚迎合，专门挑错和反问。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ tech-leads-club Catalog | 🛡️ *Dialectical counterargument and pre-mortem methodology*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Managers, Founders, Strategists, Analysts
* **安装命令：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`Sycophancy Challenger (mohitagw15856/pm-claude-skills)`](https://github.com/mohitagw15856/pm-claude-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *方案推敲时：当你感觉 AI 态度过于奉承赞同、缺乏锋芒时开启对抗模式。*
* **💡 为何普通人应该关心：** 很多人误以为 AI 赞同自己的观点就代表自己是对的。这个工具主动阻断 AI 的赞同模式，强制要求 AI 寻找反例和反驳证据，帮普通人守住独立批判思考。
* **🎯 为什么精选收录：** 针对大模型普遍存在的“谄媚迎合”痼疾。强制设定不可退让的反迎合规则：除非用户提供真实确凿的新证据，否则严禁为了礼貌而放弃批评立场。
* **🛠️ 如何使用：** 安装到 Claude Code 或 Cursor 中，向 AI 阐述观点后要求其展开“反身性质疑”。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ pm-claude-skills Suite | 🛡️ *Procedural anti-appeasement rules verified in iterative workflows*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Decision Makers, Product Managers, Founders
* **安装命令：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`Council Review (ngmeyer/council-review)`](https://github.com/ngmeyer/council-review)
* **使用时机：** 💬 交互中·求证与防盲信 — *重大方案评审：在做重大技术选型、战略制定或架构变更前调动多智能体辩论。*
* **💡 为何普通人应该关心：** 一个人向同一个 AI 提问很容易陷入思维定势。该技能模拟一个“多方专家陪审团”：保守派、激进派、风控官同时发难，防止你只听信单一大模型的偏听偏信。
* **🎯 为什么精选收录：** 打破单一大模型的盲目自洽。通过多样化多智能体辩论协议（DMAD），综合运用反演法、类比反思与强制魔鬼代言人轮次，消除思维狭隘。
* **🛠️ 如何使用：** 输入方案后呼叫技能，系统会拆解为多个对立视角轮番质询，最后汇总风险清单。
* **📊 成熟度与可信背书：** `Production Release` | ⭐ Council Review Project | 🛡️ *Diverse Multi-Agent Debate convergence detection*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Product Managers, Software Architects, Strategists
* **安装命令：**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **使用时机：** 💬 交互中·求证与防盲信 — *事前演练：在需要严苛对练伙伴挑刺、找出方案隐蔽盲区时执行。*
* **💡 为何普通人应该关心：** 在买房、择业、投资等重大生活决策前，不要只让 AI 帮你找优点。魔鬼代言人技能会专门列出最坏情况和可能踩坑的隐形陷阱，帮你冷静踩刹车。
* **🎯 为什么精选收录：** 强制将 AI 切换为“不留情面的反方辩友”，挑出用户方案中的逻辑漏洞、未明言假设与过度乐观倾向。
* **🛠️ 如何使用：** 在方案敲定前调用，技能会强制输出三条最可能导致项目彻底失败的致命隐患。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ orange2ai Catalog | 🛡️ *Adversarial assumption testing protocol*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Decision Makers, Product Managers, Policy Analysts
* **安装命令：**
  ```bash
  git clone https://github.com/orange2ai/devils-advocate-skill.git .agents/skills/devils-advocate
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *压力测试：生成对抗性子智能体，在方案定稿前从 8 个不同失败维度进行压力测试。*
* **💡 为何普通人应该关心：** 专门用于打破代码架构和日常执行中的“自动化偏见”。普通人容易盲信 AI 写出来的代码很完美，该技能逼迫 AI 假设代码已经在生产环境中崩溃并反推原因。
* **🎯 为什么精选收录：** 提供涵盖 8 个维度的系统化失败模式压力测试，防止用户陷入思维定势，主动预警潜在执行危机。
* **🛠️ 如何使用：** 在采纳 AI 提供的技术路线前运行，智能体将进行事前尸检（Pre-mortem）分析。
* **📊 成熟度与可信背书：** `Active Framework` | ⭐ mad-skills Ecosystem | 🛡️ *8-dimensional operational failure mode analysis*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Strategists, Writers, System Architects
* **安装命令：**
  ```bash
  git clone https://github.com/jihlenburg/mad-skills.git && cp -R mad-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Godfly Opposing Counsel (CassioRoos/godfly-skills)`](https://github.com/CassioRoos/godfly-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *不可逆决策关口：针对重大商业合同或战略定稿，生成正式的“反对方辩护状”。*
* **💡 为何普通人应该关心：** 普通人在写申诉信、物业维权或商务谈判草稿时，很容易视角单一。这个技能模拟“对方律师”，专门从对方利益出发找你文书里的漏洞，大幅提升你的维权胜算。
* **🎯 为什么精选收录：** 杜绝表面化的抬杠，输出高度严肃的“反对方辩护状”：精准测算选择当前路径的不可逆代价，明确界定在何种条件下竞争对手或备选方案将彻底胜出。
* **🛠️ 如何使用：** 起草完诉求书后运行，AI 会以最刻薄的控方律师口吻列出你的证据软肋。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ Godfly Skills Standard | 🛡️ *Structured adversarial brief protocol for high-stakes decisions*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Executives, Team Leads, System Planners, Legal Counsel
* **安装命令：**
  ```bash
  git clone https://github.com/CassioRoos/godfly-skills.git && cp -R godfly-skills/skills/devils-advocate .agents/skills/godfly-counsel
  ```

#### [`Devil's Advocate Reviewer Agent (Imbad0202)`](https://github.com/Imbad0202/academic-research-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *学术方案答辩前：在论文投稿或答辩前，对研究方法和理论根基执行压力测试。*
* **💡 为何普通人应该关心：** 学术或职场汇报前最好的自测帮手。它假想你的导师或苛刻老板在找茬，提前指出哪些论述缺乏说服力，避免你在正式答辩时被问倒。
* **🎯 为什么精选收录：** 设立严格的程序化门禁阶梯，杜绝 AI 因为用户的反复辩解而轻易软化批评，专门探测学术论证中的根基性漏洞。
* **🛠️ 如何使用：** 在汇报 PPT 或草稿完成后激活，AI 会逐条给出“答辩攻防问答集”。
* **📊 成熟度与可信背书：** `Research Release` | ⭐ Academic Research Skills | 🛡️ *Rigorous anti-accommodation ladders for peer critique*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Researchers, PhD Candidates, Academic Authors
* **安装命令：**
  ```bash
  git clone https://github.com/Imbad0202/academic-research-skills.git && cp -R academic-research-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Multi-Perspective Red-Team Review (mohitagw15856)`](https://github.com/mohitagw15856/pm-claude-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *方案敲定前红队演练：从财务苛刻视角、法务合规视角及竞争对手视角全面发起攻击。*
* **💡 为何普通人应该关心：** 红蓝对抗（Red Teaming）原本是网络安全特种技术，该技能将其简化为普通人可用的红队审查。让你在做重要决策前先经受一次极限压力测试。
* **🎯 为什么精选收录：** 将方案同时置于相互冲突的敌意视角下（严苛财务、法务合规、竞品攻防），以“发生概率 × 危害程度”对盲区排序，防止草率拍板。
* **🛠️ 如何使用：** 将技能作为审核节点，它会假设黑客或竞争对手如何利用你的方案缺陷进行攻击。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ pm-claude-skills Suite | 🛡️ *Multi-persona critique with ranked blind spot scoring matrix*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Product Managers, Editors, Team Leads, Strategists
* **安装命令：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/red-team-review .agents/skills/red-team-review
  ```

#### [`Devil's Advocate Anti-Sycophancy (molly-diversifiedfun)`](https://github.com/molly-diversifiedfun/claude-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *深度方案构思：在撰写高管简报、战略企划或核心论文论证时调动反向思考。*
* **💡 为何普通人应该关心：** 直面大模型为了讨好用户而牺牲事实真相的顽疾。该技能为 AI 注入“实话实说”的底层戒律，即使现实很残酷也绝不给普通人灌迷魂汤。
* **🎯 为什么精选收录：** 写入了零妥协的反迎合协议：严禁以客套夸奖开场，严禁为迎合用户而软化批判，强制在输出中排查出至少一项潜在致命缺陷（Fatal Flaw）。
* **🛠️ 如何使用：** 配置到系统指令中，所有对话在得出乐观结论前必须先经过严格可行性审查。
* **📊 成熟度与可信背书：** `Commit Pinned` | ⭐ Claude Skills Catalog | 🛡️ *Zero-appeasement anti-sycophancy contract with fatal-flaw requirements*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Executives, Strategists, Authors, Researchers
* **安装命令：**
  ```bash
  git clone https://github.com/molly-diversifiedfun/claude-skills.git && cp -R claude-skills/devils-advocate .agents/skills/devils-advocate
  ```

---

### 4. 输出能不能直接发布？
*让第三方（同事、读者、客户、监管）能够方便地核查验证成果证据链，拒绝空洞的形式化免责。*

#### [`AI Provenance (noheton/f-ai2-r)`](https://github.com/noheton/f-ai2-r)
* **使用时机：** 📤 交付前·合规与核验包 — *成果交付前：在向同事、导师或客户提交最终报告、文章或代码 PR 之前生成可核验证明。*
* **💡 为何普通人应该关心：** 别人问你“这篇文章到底是不是 AI 写的”时，空洞的辩解毫无意义。该技能为你生成完整的证据链时间戳，证明哪些文字是你的原创思考，哪些仅由 AI 润色，保障个人原创声誉。
* **🎯 为什么精选收录：** 将模糊的口头说明转为可验证的实证凭据。自动留存模型版本、提示词哈希与工具调用流水，并将最终核验权强制保留在人类手中。
* **🛠️ 如何使用：** 写作过程中开启，在完成时一键导出包含版本演进与人机分工说明的防篡改证明文件。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ f-ai2-r Provenance Framework | 🛡️ *Cryptographic hash tracking and human-confirmed verification ladder*
* **适用客户端：** Antigravity、Cursor、Claude Code
* **适用人群：** Researchers, Journalists, Authors, Developers
* **安装命令：**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **使用时机：** 📤 交付前·合规与核验包 — *发布授权关卡：在任何文案、文章或营销活动正式对外公开前的硬性拦截门禁。*
* **💡 为何普通人应该关心：** 如今各大搜索引擎和内容平台严厉打击粗制滥造的纯 AI 垃圾内容。这个技能在公开发布前设置质检把关，过滤掉典型的 AI 八股文套话，防止你的网站被降权封禁。
* **🎯 为什么精选收录：** 从物理层面切断大模型直接对外的发布链路。写作智能体被明确剥夺发布权限，必须依赖外部独立的人类审阅授权回执（PASS/FIX/BLOCK）方可放行。
* **🛠️ 如何使用：** 文章发布前运行质检命令，技能会自动扫描段落空泛度并给出修改建议。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ Newsroom & Publishing Teams | 🛡️ *Strict fail-closed gate with human sign-off requirement*
* **适用客户端：** Antigravity、Cursor、Claude Code
* **适用人群：** Editors, Content Teams, Media Creators
* **安装命令：**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)`](https://github.com/harlan-zw/harlan-agent-kit)
* **使用时机：** 📤 交付前·合规与核验包 — *代码提交阶段：在推送 GitHub Pull Request 或生成版本发布说明（Release Notes）前拦截。*
* **💡 为何普通人应该关心：** 在 GitHub 提交代码或向团队提 PR 时，偷偷用 AI 写出有 bug 的代码会被同行视为不负责任。该技能自动规范地生成披露标签，清晰告知协作者“哪些部分使用了 AI 辅助并已人工验证”。
* **🎯 为什么精选收录：** 将诚信披露做成代码提交流程的硬性门禁。在撰写 PR 时自动嵌入不可擅自删改的透明说明，防止滥用 AI 产生无意义的垃圾代码或隐瞒辅助事实。
* **🛠️ 如何使用：** 作为 Git 提交流程的一部分，自动在 PR 描述中附加规范的 AI 使用声明与测试记录。
* **📊 成熟度与可信背书：** `Production Standard` | ⭐ harlan-agent-kit Ecosystem | 🛡️ *Machine-gated PR generation with mandatory transparency clauses*
* **适用客户端：** Claude Code、Antigravity、Cursor
* **适用人群：** Open Source Maintainers, Software Engineers, Technical Writers
* **安装命令：**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git && cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`GDPR Compliance Audit (mukul975/Privacy-Data-Protection-Skills)`](https://github.com/mukul975/Privacy-Data-Protection-Skills)
* **使用时机：** 🧹 归档时·隐私与日志清理 — *发布前门禁：在对外交付方案或产品前，依据通用数据保护条例对内容、数据采集点与用户知情权执行审计。*
* **💡 为何普通人应该关心：** 你在网上发布的小程序、问卷或商业分析报告，如果不小心包含了收集他人隐私的缺陷，可能会带来侵权风险。这个技能在交付前帮你扫描内容，确认没有违规采集行为。
* **🎯 为什么精选收录：** 为即将公开发布的方案、内容或小工具提供合规审查底线，避免无意间侵犯他人个人信息权益而面临法律纠纷。
* **🛠️ 如何使用：** 在项目完成交付前，运行该技能对代码或发布方案进行全项审计，生成合规评估与修正清单。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ agentskills.io Standard | 🛡️ *Comprehensive open-source privacy audit procedures*
* **适用客户端：** GitHub Copilot、Claude Code
* **适用人群：** Software Engineers, Compliance Officers, Legal Auditors
* **安装命令：**
  ```bash
  git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/gdpr-compliance-audit ~/.claude/skills/
  ```

#### [`Publish Prep Review (45ck/content-machine)`](https://github.com/45ck/content-machine)
* **使用时机：** 📤 交付前·合规与核验包 — *公开上传门禁：在最终成稿或视频对外发布前介入，校验信源版权、模型版本哈希与可核验证据。*
* **💡 为何普通人应该关心：** 给内容创作者的最后一道防火墙。检查文中的图片版权、外部链接有效性以及敏感话题词汇，确保发到知乎、微信公众号或博客上的内容合规且安全。
* **🎯 为什么精选收录：** 采用硬性的“闭门拦截（Fail-closed）”机制。只要缺少信源版权证据，或生成的素材缺少明确的模型版本、工作流与哈希溯源信息，系统物理禁止放行。
* **🛠️ 如何使用：** 文章完稿后一键审查，输出排版瑕疵、失效链接与敏感词预警列表。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ content-machine Harness | 🛡️ *Fail-closed public readiness check with asset-level provenance ledger*
* **适用客户端：** Claude Code、Antigravity、Codex CLI
* **适用人群：** Content Creators, Editors, Media Production Teams
* **安装命令：**
  ```bash
  git clone https://github.com/45ck/content-machine.git && cp -R content-machine/skills/publish-prep-review .agents/skills/
  ```

#### [`AI Attribution Framework (ismet55555)`](https://github.com/ismet55555/ai-attribution)
* **使用时机：** 📤 交付前·合规与核验包 — *贡献度归属：在智能体产出核心方案、逻辑或架构时，实时更新本地 AI_ATTRIBUTION.md 文件。*
* **💡 为何普通人应该关心：** 符合学术出版（如 Nature、Elsevier 等）与国际标准的 AI 贡献度声明生成器。按国际通用的 CRediT 标准准确标注 AI 到底参与了“文法润色”还是“代码推导”，合规透明。
* **🎯 为什么精选收录：** 替代粗糙的形式化免责声明。通过标准的 6 级人机协作贡献阶梯，在本地维护 `AI_ATTRIBUTION.md`，让同事或审查者精准识别每一处逻辑的人机权责归属。
* **🛠️ 如何使用：** 输入你在研究各阶段对 AI 的使用情况，技能自动生成符合期刊要求的双语披露声明段落。
* **📊 成熟度与可信背书：** `Active Open Specification` | ⭐ AI Attribution Standard | 🛡️ *Standardized 6-level human-AI contribution spectrum ledger*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Software Engineers, Authors, Technical Writers
* **安装命令：**
  ```bash
  curl -sL https://raw.githubusercontent.com/ismet55555/ai-attribution/main/AI_ATTRIBUTION.md -o AI_ATTRIBUTION.md
  ```

#### [`AI Disclosure Convention SPDX-style (ggfevans)`](https://github.com/ggfevans/ai-disclosure)
* **使用时机：** 📤 交付前·合规与核验包 — *文件头标记：在代码文件头或 Markdown 前置元数据中注入机器可读的 SPDX 规范声明标签。*
* **💡 为何普通人应该关心：** 像开源许可证（如 MIT、Apache）一样标准化的机器可读声明规范。为你的项目打上透明徽章，让任何第三方工具都能自动解析你对 AI 的使用边界。
* **🎯 为什么精选收录：** 能够抵抗 Git Rebase 和文件重构的侵蚀。直接在代码或文件头注入轻量级机器可读 W3C/SPDX 标签，保证成果无论如何流转，第三方工具都能一键检测人机界限。
* **🛠️ 如何使用：** 在代码库或文档根目录生成 `AI-DISCLOSURE.md` 标准文件，供第三方自动化审计工具抓取。
* **📊 成熟度与可信背书：** `Active Specification` | ⭐ W3C-aligned Convention | 🛡️ *Language-agnostic file-level attribution convention based on W3C vocabularies*
* **适用客户端：** Cursor、Antigravity、Claude Code、Copilot
* **适用人群：** Developers, Authors, Compliance Officers
* **安装命令：**
  ```bash
  git clone https://github.com/ggfevans/ai-disclosure.git .agents/skills/ai-disclosure
  ```

#### [`Skill Provenance Tracker (snapsynapse)`](https://github.com/snapsynapse/skill-provenance)
* **使用时机：** 🧹 归档时·隐私与日志清理 — *执行审计记录：跨多轮会话精准追踪所调用的技能版本、参数、工具链与模型种子号。*
* **💡 为何普通人应该关心：** 跟踪整个对话过程中 AI 到底调用了哪些外部技能和脚本。避免某些隐藏技能在后台静默修改了你的本地文件，让每一步操作都清晰有账可查。
* **🎯 为什么精选收录：** 为复杂的智能体任务提供密码学级可溯源账本，生成具备可校验性的执行收据，证实具体哪个技能在何时接触了何种数据。
* **🛠️ 如何使用：** 智能体工作时常驻后台，任务结束后生成一份完整的技能调用清单与变更记录。
* **📊 成熟度与可信背书：** `Production Active` | ⭐ snapsynapse Framework | 🛡️ *Cryptographic execution and invocation ledger*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Auditors, Enterprise Researchers, System Architects
* **安装命令：**
  ```bash
  git clone https://github.com/snapsynapse/skill-provenance.git .agents/skills/skill-provenance
  ```

#### [`Claude Code Session Audit Protocol (lghupan)`](https://gist.github.com/lghupan/46d65f4035481ef6058d0e895bdeb73a)
* **使用时机：** 🧹 归档时·隐私与日志清理 — *会话归档与导出：在与 AI 会话结束后，自动提取结构化交互轨迹并输出可核查凭据。*
* **💡 为何普通人应该关心：** 当你需要把 AI 辅助完成的工作向上级领导、客户或审计员汇报时，把冗长嘈杂的完整会话浓缩为精炼易读的“合规审计凭据”，既保护商业机密，又让成果 100% 可被复核。
* **🎯 为什么精选收录：** 帮助普通知识工作者轻松提取可信的交互全过程纪要，无需保存冗长的原始 Token 日志，一键输出便于同行复核的紧凑审计摘要。
* **🛠️ 如何使用：** 完成重要项目后，调用技能从会话中提取关键提示词、推理节点与证据链，导出 PDF/Markdown 交付包。
* **📊 成熟度与可信背书：** `Verified Protocol Gist` | ⭐ Claude Code Community | 🛡️ *Public GitHub Gist tested on macOS/Linux session transcript extraction*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Researchers, Knowledge Workers, Professional Writers
* **安装命令：**
  ```bash
  curl -sL https://gist.githubusercontent.com/lghupan/46d65f4035481ef6058d0e895bdeb73a/raw -o .agents/skills/session-audit/SKILL.md
  ```

---

## 🤝 参与贡献

欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 普通人的数字权利 (putongren.org) & Responsible AI Use Contributors
