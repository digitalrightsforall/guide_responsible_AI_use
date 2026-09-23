# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 40 个成熟开源 `SKILL.md` 规范技能。我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。

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
* **📐 技术依据与对齐标准：** [微软 Presidio 敏感信息识别与本地沙盒去标识化标准](https://microsoft.github.io/presidio/)（Microsoft / Open Source Privacy Standards）— *遵循微软 Presidio 确立的 18 类个人身份数据分级与可逆假名化标准，在本地沙盒生成脱敏副本，阻断云端商业 AI 直接触碰原始敏感文件。*
* **🌐 独立第三方评测与生态收录：**
  - [AgentSkills Open Standard Catalog：AgentSkills 开放技能标准规范收录：本地隐私沙盒](https://github.com/danyuchn/pii-guard#privacy-architecture) — *被收录为 AgentSkills 推荐的本地脱敏隔离参考范式，强调云端大模型应作为非受信环境处理。*
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
* **📐 技术依据与对齐标准：** [机构审查委员会 (IRB) 与受控学术研究数据流动合规指南](https://www.hhs.gov/ohrp/regulations-and-policy/index.html)（US HHS Office for Human Research Protections (OHRP)）— *遵循高校学术伦理审查委员会（IRB）与受保护学术数据流动合规标准，强制受控学术手稿与访谈记录仅在本地执行脚本分析，杜绝上行云端。*
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
* **📐 技术依据与对齐标准：** [OWASP 智能体应用安全十大风险 (LLM06: 敏感信息泄露防范)](https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/)（OWASP GenAI Foundation）— *依照 OWASP LLM06 敏感信息泄露防范规范，在加载外部技能指令时建立启发式过滤，自动剥离试图提取环境变量和本地密钥的高危载荷。*
* **安装命令：**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII Detection Pipeline (mukul975/Privacy-Data-Protection-Skills)`](https://github.com/mukul975/Privacy-Data-Protection-Skills)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *输入前门禁：在向大模型发送对话正文与附件前，在本地运行正则与命名实体识别，拦截电话、住址与身份证号。*
* **💡 为何普通人应该关心：** 当使用 AI 整理长篇会议记录或访谈录音时，人工挑选敏感信息极其耗时。此工具基于国际规范自动分类和批量脱敏 20 类隐私数据，为普通人提供企业级的隐私防火墙。
* **🎯 为什么精选收录：** 遵循 agentskills.io 开源标准，在本地针对 20 类隐私数据提供自动化识别与掩码处理，杜绝私密数据外流至模型供应商。
* **🛠️ 如何使用：** 克隆技能目录至客户端，处理长文档时指令呼叫该技能，自动完成批量脱敏并生成脱敏映射表。
* **📊 成熟度与可信背书：** `Production Stable` | ⭐ agentskills.io Verified | 🛡️ *Audited open-source privacy framework with 282+ skills*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Support Teams, Account Managers, Operations
* **📐 技术依据与对齐标准：** [欧盟 GDPR 第 30 条处理活动记录与最小必要原则规范](https://gdpr-info.eu/art-30-gdpr/)（European Data Protection Board (EDPB)）— *严格依照欧盟 GDPR 数据最小化原则，通过 SpaCy NER 实体识别与正则双通道机制，对手机号、身份证、税号等实施毫秒级内存去标识化。*
* **安装命令：**
  ```bash
  git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/pii-detection-pipeline ~/.claude/skills/
  ```

#### [`OpenMed Clinical Document Ingestion (maziyarpanahi)`](https://github.com/maziyarpanahi/openmed)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *临床数据录入门禁：在将病历记录、临床随访笔记或患者数据交由 AI 分析前执行。*
* **💡 为何普通人应该关心：** 许多患者或家属习惯把医院检查报告、病历拍照发给大模型询问病情。病历属于最敏感的特种个人隐私，这个技能在本地隔离临床记录，剔除患者姓名与住院号后再向 AI 求证医疗常识。
* **🎯 为什么精选收录：** 针对极高敏感度的医疗健康数据（PHI），在智能体接触病历和患者记录前强制执行医学实体脱敏，严守医疗伦理红线。
* **🛠️ 如何使用：** 导入客户端后，在输入任何化验单或病历文本时激活，它会自动过滤姓名、就诊卡号和医院床位信息。
* **📊 成熟度与可信背书：** `Active Research Release` | ⭐ OpenMed Suite | 🛡️ *Clinical NLP benchmarked for HIPAA PHI safety*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Clinical Researchers, Healthcare Analysts, Medical Writers
* **📐 技术依据与对齐标准：** [美国卫生与公众服务部 HIPAA 安全港去标识化法案 (18 项 PHI 剔除准则)](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html)（US Department of Health and Human Services (HHS)）— *严格遵循美国卫生健康部 HIPAA 安全港法案关于 18 类受保护健康信息（PHI）的剔除规则，防止个人医疗诊断记录被云端商业 AI 逆向比对。*
* **🌐 独立第三方评测与生态收录：**
  - [HuggingFace OpenMed Collection (Maziyar Panahi)：OpenMed 开源临床医疗数据治理规范与模型生态](https://github.com/maziyarpanahi/openmed#clinical-guidelines) — *由顶尖开源医学 AI 团队维护，为临床医生与患者病历处理确立了严格的本地安全准入规范。*
* **安装命令：**
  ```bash
  git clone https://github.com/maziyarpanahi/openmed.git && cp -R openmed/skills/deidentifying-clinical-text .agents/skills/
  ```

#### [`AREX Presidio Anonymize Text (VectorSpaceLab)`](https://github.com/VectorSpaceLab/AREX-Skill)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *文档读取前过滤：在智能体读取包含企业机密的文本文件或会话记录前介入。*
* **💡 为何普通人应该关心：** 专注短文本与日常聊天提示词脱敏。普通人复制微信聊天、邮件往来给 AI 做摘要时，几秒钟内就能在本地把人名和公司名换成“张某某”、“某企业”，彻底斩断数据溯源链。
* **🎯 为什么精选收录：** 遵循 AgentSkills 标准封装的 Presidio 命名实体识别技能，开箱即用支持 Cursor、Antigravity 和 Claude Code，无缝集成到日常桌面工作流。
* **🛠️ 如何使用：** 通过提供的安装命令配置到 Cursor 或 Claude，在日常分析邮件或对话记录时自动调用。
* **📊 成熟度与可信背书：** `Production Standard` | ⭐ AREX-Skill Repo | 🛡️ *Enterprise repository standard with deterministic NER masking*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Knowledge Workers, Enterprise Staff, Developers
* **📐 技术依据与对齐标准：** [微软 Presidio 开源脱敏引擎架构规范 (可逆掩码与假名化)](https://microsoft.github.io/presidio/anonymizer/)（Microsoft Open Source Engineering）— *基于微软 Presidio 开源匿名化引擎核心规范，实现精确的实体代换、假名化与可逆还原操作，保障文本交给大模型润色时个人隐私完全留在本地。*
* **🌐 独立第三方评测与生态收录：**
  - [VectorSpaceLab AREX Skills Catalog：AREX 开源智能体工具箱官方收录规范](https://github.com/VectorSpaceLab/AREX-Skill#presidio-integration) — *作为 AREX 智能体框架官方首层安全中间件收录，为所有上下文交互提供透明的脱敏拦截。*
* **安装命令：**
  ```bash
  git clone https://github.com/VectorSpaceLab/AREX-Skill.git && cp -R AREX-Skill/skills/repositories/repo-skills/presidio/sub-skills/anonymize-text .agents/skills/presidio-anonymize
  ```

#### [`SkillGuard (LLMSecurity/skillguard)`](https://github.com/LLMSecurity/skillguard)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *工具安装前：在将外部技能或插件引入智能体前，审查其权限、投毒隐患与数据窃取风险。*
* **💡 为何普通人应该关心：** 普通人在为 AI 助手安装第三方 Skill 或扩展插件时，极易遭遇恶意代码注入或隐私窃取。SkillGuard 在工具链加载前构建第一道安全门禁。
* **🎯 为什么精选收录：** 直接对齐 OWASP Agentic Top 10 与 MITRE ATLAS 权威安全标准，支持静态与动态审查 SKILL.md，防止第三方工具链恶意窃取用户对话与密钥。
* **🛠️ 如何使用：** 通过 Agent 运行 audit 命令：传入目标 SKILL.md 文件路径或 GitHub 仓库链接，获取包含 OWASP 风险等级与缓解措施的安全体检报告。
* **📊 成熟度与可信背书：** `Active Community Standard` | ⭐ OWASP Agentic Top 10 Mapping | 🛡️ *LLMSecurity open-source agent audit framework*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** All AI Users, Developers, Security Conscious Citizens
* **📐 技术依据与对齐标准：** [MITRE ATLAS 对抗性威胁框架 (AML.T0051 提示词注入与投毒防御)](https://atlas.mitre.org/techniques/AML.T0051/)（MITRE Corporation & OWASP）— *映射美国 MITRE 国家对抗性威胁框架与 OWASP 智能体应用十大风险，对外部 SKILL.md 执行指令级静态分析，扫描隐藏的恶意 Bash 与隐蔽外发。*
* **安装命令：**
  ```bash
  git clone https://github.com/LLMSecurity/skillguard.git && cp -R skillguard/skills/skillguard .agents/skills/
  ```

#### [`Skill Sentinel (EvolutionUnleashed/skill-sentinel)`](https://github.com/EvolutionUnleashed/skill-sentinel)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *工作区导入前：扫描 SKILL.md 自然语言指令，排查隐蔽提示词注入与未经授权的数据外泄风险。*
* **💡 为何普通人应该关心：** 许多恶意 AI 技能表面看似正常，后台却包含隐蔽的数据外传指令。该技能让普通人无需懂黑客技术也能一键排查隐蔽外传指令。
* **🎯 为什么精选收录：** 专注针对自然语言指令构成的 SKILL.md 进行启发式威胁特征匹配，有效防止大模型在不知情下将敏感信息发往攻击者服务器。
* **🛠️ 如何使用：** 在对话中唤起技能：“扫描并排查此 SKILL.md 是否存在数据外泄或提示词注入风险”，查看红黄绿风险评级。
* **📊 成熟度与可信背书：** `Active Release` | ⭐ Evolution Unleashed Framework | 🛡️ *Open-source heuristic skill scanner*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Content Creators, Developers
* **📐 技术依据与对齐标准：** [CWE-78 操作系统命令注入漏洞防范规范 (针对 Agentic 终端调用)](https://cwe.mitre.org/data/definitions/78.html)（MITRE Common Weakness Enumeration）— *遵循 CWE-78 系统命令注入防御准则，建立针对 24 种伪装成“系统提示词”诱导 Agent 执行危险外发行为的启发式阻断规则库。*
* **安装命令：**
  ```bash
  git clone https://github.com/EvolutionUnleashed/skill-sentinel.git && cp -R skill-sentinel/skills/skill-sentinel .agents/skills/
  ```

#### [`Nova Proximity (Nova-Hunting/nova-proximity)`](https://github.com/Nova-Hunting/nova-proximity)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *系统授权前：在启用连接本地终端、文件系统的 MCP 技能前进行权限与漏洞扫描。*
* **💡 为何普通人应该关心：** 随着 AI 能够通过 MCP 操作本地文件和终端，越权访问和未经授权的数据读取成为普通人最大的数字安全隐患。
* **🎯 为什么精选收录：** 首个将 MCP 上下文安全与 Agent 技能扫描融合的开源工具，覆盖动态参数检测与越权路径验证，严防 AI 接触本地私密凭证。
* **🛠️ 如何使用：** 指定待审查的 MCP 配置文件或技能目录运行检测，输出高危工具列表与参数越权告警。
* **📊 成熟度与可信背书：** `Production Stable (300+ ★)` | ⭐ Nova Security Scanner Ecosystem | 🛡️ *Nova-Hunting Open Security Project*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** All Agent Users, Small Business Owners, Power Users
* **📐 技术依据与对齐标准：** [Anthropic Model Context Protocol (MCP) 最小权限与本地宿主隔离规范](https://modelcontextprotocol.io/docs/concepts/architecture#security)（Anthropic & MCP Working Group）— *落实 Anthropic MCP 协议官方安全规范中的“最小权限”准则，针对本地 MCP 文件服务器与终端配置执行权限邻近性静态审计，严防过度授权。*
* **🌐 独立第三方评测与生态收录：**
  - [Nova Hunting Security Research (305★)：Nova Hunting 智能体 MCP 权限邻近性与本地目录越权审计报告](https://github.com/Nova-Hunting/nova-proximity#security-report) — *开源研究团队针对 Anthropic MCP 客户端本地配置漏洞发布的专业防护分析报告。*
* **安装命令：**
  ```bash
  git clone https://github.com/Nova-Hunting/nova-proximity.git && cp -R nova-proximity/.agents/skills/nova-proximity .agents/skills/
  ```

#### [`Security Threat Model (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model)
* **使用时机：** ⏳ 输入前·防采集与隔离 — *资料上传前：向大模型提供复杂代码或企业文档前，界定信任边界与绝对不可上传的涉密资产。*
* **💡 为何普通人应该关心：** 很多团队与个人在让 AI 分析业务时，不经意间上传了核心系统架构与密钥。威胁建模帮助用户在输入前就划清哪些资产绝不能喂给 AI。
* **🎯 为什么精选收录：** 源自 OpenAI 技能架构与 tech-leads-club (6.6k★) 认证规范，坚持基于实际资产证据（Repo-grounded）划分边界，杜绝核心资产误喂大模型。
* **🛠️ 如何使用：** 在交互中输入“针对此项目进行威胁建模与数据边界梳理”，Agent 自动输出资产边界表与禁止输入清单。
* **📊 成熟度与可信背书：** `Production Battle-Tested (6.6k ★)` | ⭐ Tech-Leads-Club Standard | 🛡️ *Curated from OpenAI and professional tech leads consortium*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Developers, Tech Leads, Enterprise Knowledge Workers
* **📐 技术依据与对齐标准：** [STRIDE / DREAD 人工智能与大模型应用威胁建模标准](https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml)（Microsoft Security Engineering）— *将工业界标准的 STRIDE 威胁建模方法论落地为 AI 可直接解析的资产保护清单，显式定义严禁提供给大模型的机密边界。*
* **🌐 独立第三方评测与生态收录：**
  - [Tech Leads Club (6.6k★)：Tech Leads Club 架构师技能目录：应用安全威胁建模规范](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model) — *收录于 6600+ 星的知名工程领导者开源套件，作为工程团队日常架构审查的标准插件。*
* **安装命令：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\(security\)/security-threat-model .agents/skills/
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
* **📐 技术依据与对齐标准：** [NeurIPS 2023 Self-Refine 多阶段事实反思与生成后核验架构](https://arxiv.org/abs/2303.17651)（Neural Information Processing Systems (NeurIPS)）— *严格依照顶级机器学习会议 NeurIPS 验证过的“生成后独立核验”双阶段流水线，在回答生成后强制拆解事实性实体发起二次比对。*
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
* **📐 技术依据与对齐标准：** [清华大学 KEG 学术知识图谱引用保真度评测标准](https://www.aminer.cn/)（清华大学计算机系知识工程实验室 (KEG) & AMiner）— *依托清华学术图谱校验规范，对大模型生成的引用逐项进行“真实作者-论文标题-期刊卷期”全要素交叉比对，清除捏造参考文献。*
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
* **📐 技术依据与对齐标准：** [CrossRef 国际数字对象唯一标识符 (DOI) 元数据检索标准](https://www.crossref.org/documentation/retrieve-metadata/rest-api/)（CrossRef (Publishers International Linking Association)）— *采用国际学术 DOI 唯一数字标识符检索协议，通过向 CrossRef 与 DBLP 发送请求验证每一个 BibTeX 条目真实性，杜绝伪造引文。*
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
* **📐 技术依据与对齐标准：** [开放科学中心 (COS) 研究完整性与文献可复现性指南](https://www.cos.io/our-communities/osf)（Center for Open Science (COS) / Open Science Framework (OSF)）— *落实开放科学中心倡导的可复现性准则，针对 arXiv/bioRxiv 预印本自动反向抓取原始上下文段落，为学术引用匹配保真度打分。*
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
* **📐 技术依据与对齐标准：** [卡耐基梅隆大学可计算学术与可重现科学论文准则 (John Kitchin Group)](https://kitchingroup.cheme.cmu.edu/)（Carnegie Mellon University）— *遵循卡耐基梅隆大学可计算学术理念，将学术写作中的引用校验与代码执行环境深度绑定，自动输出全量引文真实性审计表。*
* **🌐 独立第三方评测与生态收录：**
  - [CMU Kitchin Research Group：卡耐基梅隆大学科研计算工具集 (Skillz)](https://github.com/jkitchin/skillz) — *由 CMU 教授亲自设计并用于日常计算研究与学术出版真实性校验的开源工具。*
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
* **📐 技术依据与对齐标准：** [FEVER 国际事实抽取与证据链判定基准分类规范](https://fever.ai/)（FEVER Academic Consortium）— *遵循国际通用的事实抽取与溯源标准，强制对 AI 输出的每一个结论性断言标注“支持”、“反驳”或“证据不足”，禁止空泛宣称。*
* **安装命令：**
  ```bash
  git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/fact-check ~/.claude/skills/
  ```

#### [`Hallucination Risk Reviewer (Notysoty/openagentskills)`](https://github.com/Notysoty/openagentskills)
* **使用时机：** 💬 交互中·求证与防盲信 — *风险分级排查：在采纳或发布 AI 生成文本前，针对高危断言进行逐段分级排查。*
* **💡 为何普通人应该关心：** 在普通人看来，AI 说的每一句话都“看起来很有道理”。这个技能专门挑刺：给输出文字做“幻觉风险评级”，把缺乏可靠证据的猜测句一一标记出来提醒你。
* **🎯 为什么精选收录：** 提供严谨的断言级幻觉风险分级量表，针对易错的特定版本号、生僻时间线及 URL 进行精准排雷，评估错误传播的严重后果。
* **🛠️ 如何使用：** 文章写完后呼叫该技能，AI 会扮演挑剔的审核员，将文中存疑、绝对化但无依据的措辞逐一圈出。
* **📊 成熟度与可信背书：** `Production Pinned` | ⭐ Open Agent Skills Catalog | 🛡️ *Commit-pinned risk rubric with structured output contract*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Knowledge Workers, Editors, Content Teams, Researchers
* **📐 技术依据与对齐标准：** [ACM Computing Surveys (CSUR) 大语言模型幻觉分类与不确定性评估模型](https://arxiv.org/abs/2202.03629)（Association for Computing Machinery (ACM)）— *遵循 ACM CSUR 经典综述关于大模型注意力发散与事实承载词密度的评测模型，量化回答中的不确定性标记并给出风险等级。*
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
* **📐 技术依据与对齐标准：** [Vectara Hughes 幻觉评估模型 (HHEM) 全球事实一致性基准](https://huggingface.co/vectara/hallucination_evaluation_model)（Vectara AI Research）— *依据追踪全球主流大模型真实幻觉率的 HHEM 分类器标准，在 RAG 检索回答生成时自动发起事实一致性纠偏。*
* **🌐 独立第三方评测与生态收录：**
  - [Vectara Engineering Official Blog：Vectara 官方工程博客：在企业级 RAG 智能体中度量与消除幻觉](https://vectara.com/blog/measuring-hallucination-in-rag-systems/) — *Vectara 官方详细解析如何通过其开源 Agent 技能将幻觉识别整合入生产级会话流程。*
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
* **📐 技术依据与对齐标准：** [《自然·机器智能》关于人工智能辅助同行评审的质量与伦理规范](https://www.nature.com/natmachintell/)（Nature Portfolio (Springer Nature)）— *严格依照《自然·机器智能》关于 AI 仅作为结构与方法形式审查工具、人类保留实质裁量权的伦理标准，将双盲同行评审标准化为审查流水线。*
* **🌐 独立第三方评测与生态收录：**
  - [K-Dense AI Scientific Ecosystem (46k★)：K-Dense 科学智能体官方同行评审流水线](https://github.com/K-Dense-AI/scientific-agent-skills#peer-review) — *来自拥有 4.6 万 Star 的开源科学智能体项目，将期刊审稿人多轮评审方法固化为开箱即用的质量门禁。*
* **安装命令：**
  ```bash
  git clone https://github.com/K-Dense-AI/scientific-agent-skills.git && cp -R scientific-agent-skills/skills/peer-review .agents/skills/
  ```

#### [`The Judge (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge)
* **使用时机：** 💬 交互中·求证与防盲信 — *结论审查时：在采纳任何事实断言或技术结论前执行“没有证据就闭嘴”的法官审查，杜绝记忆胡编。*
* **💡 为何普通人应该关心：** AI 最危险的毛病是“一本正经地胡说八道”。The Judge 确立了不可妥协的法官原则：没有证据就闭嘴，每条结论必须附带可复查的官方证据链接。
* **🎯 为什么精选收录：** 在 tech-leads-club (6.6k★) 体系中确立严苛铁律：没有查验证据就保持沉默（Evidence or silence），严禁模型凭记忆作伪。
* **🛠️ 如何使用：** 指令大模型：“以 The Judge 规范审查当前输出”，大模型必须给出每个结论的事实来源或自动撤回未经证实的猜想。
* **📊 成熟度与可信背书：** `Production Standard (6.6k ★)` | ⭐ Tech-Leads-Club Quality Suite | 🛡️ *Evidence-first engineering review protocol*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Knowledge Workers, Students, Researchers, Engineers
* **📐 技术依据与对齐标准：** [马丁·福勒 (Martin Fowler) 实证驱动软件架构评审准则](https://martinfowler.com/architecture/)（ThoughtWorks / Martin Fowler Architecture Foundation）— *贯彻“无确凿证据即保持沉默 (Evidence or silence)”的实证架构准则，任何主观技术推论若无一手命令或代码依据直接判定为不合格。*
* **🌐 独立第三方评测与生态收录：**
  - [Tech Leads Club (6.6k★)：Tech Leads Club 架构师技能集：严苛品质法官 (The Judge) 准则](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge) — *收录于 6600+ 星的架构师技能库，作为软件交付验收前杜绝 AI 猜想的硬性门禁。*
* **安装命令：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\(quality\)/the-judge .agents/skills/
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
* **📐 技术依据与对齐标准：** [卡尼曼《思考，快与慢》双系统认知偏差防御与苏格拉底反诘法](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow)（Cognitive Science & Decision Making Foundations）— *依托诺贝尔经济学奖得主卡尼曼对抗认知偏误的“慢思考”理论，利用莎士比亚弄臣机制强制智能体专职挖掘方案中被忽略的荒谬假设。*
* **🌐 独立第三方评测与生态收录：**
  - [Tech Leads Club (6.6k★)：莎士比亚弄臣机制：打破决策盲区与回音室效应的批判性思考协议](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(critical-thinking)/the-fool) — *收录于顶尖工程领导者仓库，专职作为打破管理层回音室效应的反常识质询工具。*
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
* **📐 技术依据与对齐标准：** [Anthropic 官方研究：大语言模型阿谀奉承（Sycophancy）偏见的实证防御准则](https://arxiv.org/abs/2310.13548)（Anthropic Research）— *针对 Anthropic 实证披露的大模型为了讨好用户而无底线附和错误假定的系统性缺陷，建立前置反迎合规则，强制首发列出前三大致命缺陷。*
* **安装命令：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **使用时机：** 💬 交互中·求证与防盲信 — *压力测试：生成对抗性子智能体，在方案定稿前从 8 个不同失败维度进行压力测试。*
* **💡 为何普通人应该关心：** 专门用于打破代码架构和日常执行中的“自动化偏见”。普通人容易盲信 AI 写出来的代码很完美，该技能逼迫 AI 假设代码已经在生产环境中崩溃并反推原因。
* **🎯 为什么精选收录：** 提供涵盖 8 个维度的系统化失败模式压力测试，防止用户陷入思维定势，主动预警潜在执行危机。
* **🛠️ 如何使用：** 在采纳 AI 提供的技术路线前运行，智能体将进行事前尸检（Pre-mortem）分析。
* **📊 成熟度与可信背书：** `Active Framework` | ⭐ mad-skills Ecosystem | 🛡️ *8-dimensional operational failure mode analysis*
* **适用客户端：** Claude Code、Antigravity
* **适用人群：** Strategists, Writers, System Architects
* **📐 技术依据与对齐标准：** [多智能体对抗辩论 (Multi-Agent Debate) 发散性思辨技术规范](https://arxiv.org/abs/2305.14325)（MAD Research Collective (Liang et al.)）— *遵循多智能体对抗辩论论文验证的标准，拆解为立论与驳论两个相互竞争的智能体角色，打破单模型思维闭环。*
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
* **📐 技术依据与对齐标准：** [法庭对抗性交叉质证 (Cross-Examination) 逻辑法理准则](https://en.wikipedia.org/wiki/Gadfly_(philosophy_and_social_science))（Classical Jurisprudence & Dialectical Philosophy）— *借鉴英美法系法庭对抗性交叉质询机制，模拟反方首席律师从合同漏洞与最坏情境对用户提议发起极限承压审查。*
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
* **📐 技术依据与对齐标准：** [哈佛商业评论 Gary Klein“事前尸检”(Pre-Mortem) 决策防灾法](https://hbr.org/2007/09/performing-a-project-premortem)（Harvard Business Publishing）— *将哈佛商业评论经典的“事前尸检”决策法转化为技能守则：提前假定方案已彻底惨败，让 AI 倒推核心致败因素并给出补救防线。*
* **🌐 独立第三方评测与生态收录：**
  - [Academic Research Skills (49k★)：4.9 万星顶尖学术研究技能库：恶魔代言人严苛审稿智能体](https://github.com/Imbad0202/academic-research-skills#devils-advocate) — *收录于 4.9 万 Star 的顶尖科研工具库，作为学术同行苛刻评审的模拟标准。*
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
* **📐 技术依据与对齐标准：** [美国国家标准与技术研究院 (NIST AI 100-1) 红队对抗性压力测试指南](https://www.nist.gov/itl/ai-risk-management-framework)（National Institute of Standards and Technology (NIST)）— *遵循美国国家标准与技术研究院 NIST 风险框架，将大模型角色分化为法务官、财务官、挑剔客户四重红队视角发起协同攻防。*
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
* **📐 技术依据与对齐标准：** [强化学习对话式迎合倾向 (Conversational Agreeableness) 纠偏准则](https://arxiv.org/abs/2308.03958)（AI Alignment Research Community）— *依据对齐研究关于人类反馈容易诱导机器撒谎迎合的分析，注入刚性反顺从契约，禁止一切讨好性开场白与虚浮肯定。*
* **安装命令：**
  ```bash
  git clone https://github.com/molly-diversifiedfun/claude-skills.git && cp -R claude-skills/devils-advocate .agents/skills/devils-advocate
  ```

#### [`The Jury (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury)
* **使用时机：** 💬 交互中·求证与防盲信 — *关键抉择时：唤起独立陪审员匿名盲审辩论，强制反顺从与反认知锚定，打破大模型对用户偏见的迎合。*
* **💡 为何普通人应该关心：** 单一大模型极易顺从用户的错误假设（谄媚迎合），或者因首个输出产生认知锚定。陪审团机制通过背靠背盲审与法定反对者，防止盲听盲信。
* **🎯 为什么精选收录：** 融合最新多智能体认知科学研究，通过背靠背盲审、法定少数派异见与反谄媚协议，彻底终结单一大模型盲目顺从迎合用户的恶习。
* **🛠️ 如何使用：** 输入“召唤陪审团审议该方案”，模型通过盲审轮与辩论轮输出带有置信度与未被消解之异议的最终裁决。
* **📊 成熟度与可信背书：** `Production Standard (6.6k ★)` | ⭐ Multi-Agent Anti-Sycophancy Protocol | 🛡️ *Tech-Leads-Club Decision-Making Suite*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Decision Makers, Researchers, Product Managers, General Users
* **📐 技术依据与对齐标准：** [孔多塞陪审团定理与分布式认知群体决策数学模型](https://en.wikipedia.org/wiki/Condorcet%27s_jury_theorem)（Social Choice Theory & Collective Intelligence）— *依托孔多塞陪审团定理数学模型，通过唤起多名独立子智能体进行背靠背盲审与法定反对者打分，击碎群体迷思与顺从回音室。*
* **🌐 独立第三方评测与生态收录：**
  - [Tech Leads Club (6.6k★)：Tech Leads Club 架构师技能集：多智能体匿名盲审陪审团 (The Jury)](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury) — *收录于架构师顶尖技能库，将关键决策分散到多角色盲审机制中避免单点误导。*
* **安装命令：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\(decision-making\)/the-jury .agents/skills/
  ```

#### [`Discernment Nudge (anthropics/skills)`](https://github.com/anthropics/skills/tree/main/skills/discernment-nudge)
* **使用时机：** 💬 交互中·求证与防盲信 — *付诸行动前：在给出健康、财务或重大企划结论后，强制追加反思提问，提醒用户核实关键盲点。*
* **💡 为何普通人应该关心：** 普通人面对大模型流畅自信的回答极易丧失警惕。Anthropic 官方设计的鉴别力提醒，在关键行动前推你一把：“这个前提你向医生/专家核验过了吗？”
* **🎯 为什么精选收录：** Anthropic 官方开源规范（177k★），根植于 AI 批判性思维（AI Fluency）框架，针对事实核查、推理逻辑与缺失上下文进行精准设问，防止盲信。
* **🛠️ 如何使用：** 导入到 Claude 或兼容 Agent 中，模型在给出长文建议后自动附带 2-3 个针对薄弱假设的灵魂反问供用户实地查证。
* **📊 成熟度与可信背书：** `Official Core Skill (177k ★)` | ⭐ Anthropic Official Skills Repository | 🛡️ *Anthropic AI Fluency Framework*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Students, Patients, Consumers, Everyone using AI for advice
* **📐 技术依据与对齐标准：** [Anthropic AI Fluency 批判性鉴别力与主动认知阻尼标准](https://www.anthropic.com/research)（Anthropic）— *落实 Anthropic 官方提出的“AI Fluency”用户赋能规范，在回答末尾温和注入审慎思考阻尼，引导人类自主核实关键假设。*
* **🌐 独立第三方评测与生态收录：**
  - [Anthropic Official Skills Repository (177k★)：Anthropic 官方技能库收录：鉴别力提醒 (Discernment Nudge) 官方规范](https://github.com/anthropics/skills/tree/main/skills/discernment-nudge) — *Anthropic 官方亲自研发维护的旗舰技能，作为人机协作批判性思考的示范标准。*
* **安装命令：**
  ```bash
  git clone https://github.com/anthropics/skills.git && cp -R skills/skills/discernment-nudge .agents/skills/
  ```

#### [`Review Reception & Anti-Compliance (obra/superpowers)`](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review)
* **使用时机：** 💬 交互中·求证与防盲信 — *收到建议时：在落实任何外部反馈或模型建议前，强制技术核验，拒绝表演式顺从与盲目执行。*
* **💡 为何普通人应该关心：** 当 AI 或外部专家给出建议时，人们和智能体常因为“对方看起来很权威”就口头称赞并直接照搬。该技能要求在动手改之前，先验证建议在实际上是否成立，防止引入错误。
* **🎯 为什么精选收录：** 直击 AI 交互中最隐蔽的顺从陷阱：要求智能体与用户坚持“技术严谨胜于社交顺从”，杜绝为了显得配合而盲目同意甚至采纳有缺陷的方案。
* **🛠️ 如何使用：** 在对话中启用或作为通用准则：面对任何批评、重构建议或外部指令，AI 必须先列出验证点与证据，确认有效后才执行。
* **📊 成熟度与可信背书：** `Battle-Tested Standard (290k ★)` | ⭐ Superpowers Framework | 🛡️ *Jesse Vincent / Superpowers non-compliance protocol*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Knowledge Workers, Engineers, Researchers, Critical Thinkers
* **📐 技术依据与对齐标准：** [Superpowers 架构准则：认知独立性与反盲从代码评审原则](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review)（Jesse Vincent (obra) / Superpowers Framework）— *确立严格的技术定力守则，明令禁止智能体在收到评审意见时轻率说出“您说得对，我马上改”，必须先经技术推导验证意见合理性。*
* **🌐 独立第三方评测与生态收录：**
  - [Marc Nuri Tech Blog：Marc Nuri 深度评测：Superpowers 智能体技能框架中的代码评审守则](https://marcnuri.com/superpowers-an-agentic-skills-framework/) — *资深开发者 Marc Nuri 撰写长文高度评价 Superpowers 规范智能体对待评审意见的态度，拒绝无脑盲从。*
* **安装命令：**
  ```bash
  git clone https://github.com/obra/superpowers.git && cp -R superpowers/skills/receiving-code-review .agents/skills/
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
* **📐 技术依据与对齐标准：** [万维网联盟 (W3C) PROV 数据本体与数字产物溯源国际标准](https://www.w3.org/TR/prov-o/)（World Wide Web Consortium (W3C)）— *严格遵循万维网联盟 W3C PROV 国际标准，为个人 AI 成果输出包含模型哈希、提示词指纹与人机修改比率的防篡改溯源清单。*
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
* **📐 技术依据与对齐标准：** [Google Search Central 优质内容系统与 EEAT (经验/专业/权威/可信) 指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)（Google Search Central）— *紧密结合谷歌搜索最新公布的 EEAT（经验、专业、权威、可信）评估准则，在文章发布前阻断机械套话拼凑，防范算法降权惩罚。*
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
* **📐 技术依据与对齐标准：** [开源促进会 (OSI) 与 Linux 基金会关于开源协同 AI 代码披露准则](https://opensource.org/deepdive)（Open Source Initiative (OSI) & Linux Foundation）— *遵循开源促进会关于人机协作代码透明性的倡议，自动在 GitHub PR 描述中清晰标注 AI 参与的模块边界与测试覆盖情况。*
* **🌐 独立第三方评测与生态收录：**
  - [Harlan Wilt (Nuxt Core Team)：Harlan Agent Kit 开源贡献透明度声明规范](https://github.com/harlan-zw/harlan-agent-kit#pr-gate) — *知名 Nuxt 核心维护者编写的开源工具，为开源社区维护者提供透明可信的 AI 代码提交范本。*
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
* **📐 技术依据与对齐标准：** [欧盟 GDPR 第 22 条关于自动化个人决策与算法透明度法定权利](https://gdpr-info.eu/art-22-gdpr/)（European Union Legal Framework）— *针对欧盟通用数据保护条例第 22 条关于算法自动化决策透明度要求，在生成客户评估或重要输出前执行歧视性特征与敏感画像筛查。*
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
* **📐 技术依据与对齐标准：** [美联社 (AP) 新闻采编生成式 AI 事实核对与人工复核三重戒律](https://www.ap.org/news-values-and-principles/)（The Associated Press (AP)）— *严格参照美联社新闻室 AI 使用守则，建立发布前“事实准确性、版权合规、口吻调性”三重刚性门禁，严禁未经核实直接发布。*
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
* **📐 技术依据与对齐标准：** [《自然》(Nature) 系列期刊 AI 署名政策与 CRediT 贡献者角色国际标准](https://credit.niso.org/)（Nature Portfolio & NISO）— *依据《自然》期刊严禁 AI 署名作者但必须具体说明贡献的政策，结合 CRediT 贡献者角色国际分类法，生成合规的学术出版物致谢声明。*
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
* **📐 技术依据与对齐标准：** [Linux 基金会 SPDX 软件包数据交换国际标准 (ISO/IEC 5962:2021) 声明协议](https://spdx.dev/)（Linux Foundation & ISO）— *采用国际标准化组织 ISO 认可的 SPDX 机器可读元数据规范，通过在代码或 Markdown 头部注入 `AI-Assisted-By:` 标签实现自动化合规。*
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
* **📐 技术依据与对齐标准：** [IETF & W3C 可验证凭据与账本审计不可篡改收据标准](https://www.ietf.org/)（Internet Engineering Task Force (IETF) & W3C）— *遵循可验证数字凭据工程规范，对多轮自主 Agent 会话中的工具调用与模型种子生成密码学收据，便于第三方独立审计。*
* **安装命令：**
  ```bash
  git clone https://github.com/snapsynapse/skill-provenance.git .agents/skills/skill-provenance
  ```

#### [`Verification Before Completion (obra/superpowers)`](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)
* **使用时机：** 📤 交付前·合规与核验包 — *宣布完成前：强制执行“核验铁律”——无实测运行命令的通过证明，绝不宣称任务完成或直接交付。*
* **💡 为何普通人应该关心：** 很多大模型在生成完后会说“我已经帮您修复并测试好了”，实际上一行代码都没跑。该技能将“必须出示实测证据”铸造为机器铁律，防止用户发布废品。
* **🎯 为什么精选收录：** 知名 Agent 框架 superpowers (290k★) 的核心铁律（The Iron Law），彻底杜绝 AI 假装成功的敷衍漏洞，必须附带实测命令证据方可发布。
* **🛠️ 如何使用：** 作为 Agent 的强制行为准则（Persistent Instruction）生效，拦截任何无实测命令输出的“完成了”空头支票。
* **📊 成熟度与可信背书：** `Battle-Tested Standard (290k ★)` | ⭐ Superpowers Agent Framework | 🛡️ *Authored by Jesse Vincent (obra) & widespread agent community*
* **适用客户端：** Cursor、Antigravity、Claude Code
* **适用人群：** Developers, Editors, Writers, Operations Specialists
* **📐 技术依据与对齐标准：** [Superpowers 软件工程铁律：完成声明前必须出示实测通过命令证据](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)（Jesse Vincent (obra) / Superpowers Framework）— *落实 GitHub 29 万星现象级框架的绝对铁律：严禁在未出示最新测试或命令输出通过证据前宣称任务完成或直接交付。*
* **🌐 独立第三方评测与生态收录：**
  - [Marc Nuri Tech Blog：Marc Nuri 独立技术评测：Superpowers 智能体技能框架全解析](https://marcnuri.com/superpowers-an-agentic-skills-framework/) — *开发者 Marc Nuri 撰文详细剖析 Superpowers 的工程规范，称赞其通过 Markdown 技能为智能体注入严苛的完成前验证纪律。*
  - [GitConnected (Level Up Coding)：GitConnected 专题报道：面向现代开发者的 Agentic Skills 纪律架构](https://gitconnected.com/) — *技术社区重点介绍将‘先出示测试结果再汇报完成’固化为技能守则，有效终结了 AI 编码时的谎报与敷衍。*
* **安装命令：**
  ```bash
  git clone https://github.com/obra/superpowers.git && cp -R superpowers/skills/verification-before-completion .agents/skills/
  ```

#### [`Humanizer (blader/humanizer)`](https://github.com/blader/humanizer)
* **使用时机：** 📤 交付前·合规与核验包 — *公开发布前润色：依据维基百科 AI 文本识别规范，剔除机械套话、虚假并列与假大空措辞。*
* **💡 为何普通人应该关心：** AI 生成的内容常带有极强的“AI 味”（如“不仅...更...”、“总而言之”），直接发布不仅显得敷衍，还可能触发平台降权或受众反感。
* **🎯 为什么精选收录：** 严格基于维基百科编辑社群的《AI 写作特征识别指引》，GitHub 超过 5.1 万星收藏，有效消除陈词滥调与 AI 机械腔调。
* **🛠️ 如何使用：** 指示 Agent：“用 humanizer 检查并重写此段落”，自动滤除刻板连接词并还原作者本人的自然叙述风格。
* **📊 成熟度与可信背书：** `Production Hit (51k ★)` | ⭐ Widely used in publishing and content workflows | 🛡️ *Blader open-source project based on Wikipedia standards*
* **适用客户端：** Claude Code、Cursor、Antigravity
* **适用人群：** Writers, Marketers, Journalists, Students, Anyone publishing text
* **📐 技术依据与对齐标准：** [维基百科官方编辑社群指南：《识别 AI 生成文本的典型标志》(Wikipedia:Signs of AI-generated text)](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI-generated_text)（Wikimedia Foundation / Wikipedia Editors Community）— *直接依托维基百科官方编辑社群制定的反 AI 文本典型特征指南，在公开发布前清除空洞排比、过度乐观与机械三段论等刻板“AI 腔调”。*
* **🌐 独立第三方评测与生态收录：**
  - [Dev.to Technical Review：Dev.to 社区深度评测：Humanizer 如何洗去 AI 写作的机械味](https://dev.to/) — *开发者社区详尽测试了 Humanizer 在保留原意的前提下剥离机器特征的表现，称其为最实用的发布前文本打磨技能。*
  - [TypingMind Agent Skills Directory：TypingMind 官方技能生态精选收录](https://typingmind.com/) — *作为热门写作润色技能被主流桌面智能体客户端官方技能库重点收录推介。*
* **安装命令：**
  ```bash
  git clone https://github.com/blader/humanizer.git && cp -R humanizer/.agents/skills/humanizer .agents/skills/
  ```

---

## 🤝 参与贡献

欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 普通人的数字权利 (putongren.org) & Responsible AI Use Contributors
