# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![精选技能数](https://img.shields.io/badge/精选技能-43%20项-8a2be2.svg)](#-四大核心实务问题技能全景目录) [![规范标准](https://img.shields.io/badge/规范格式-SKILL.md-success.svg)](https://agentskills.io) [![链接健康度](https://img.shields.io/badge/开源可达性-43%2F43%20全部存活-brightgreen.svg)](#-运行状态与实证指标评定说明) [![社区共建](https://img.shields.io/badge/共建社区-普通人的数字权利-orange.svg)](https://putongren.org)

> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 43 个成熟开源 `SKILL.md` 规范技能。我们不制造新工具，而是帮助普通人在日常使用 AI 时把好关：**对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好核查验证成果**。

[English Version](README.md) | **中文版** | 📖 [阅读实务长篇指南 (Field Guide)](https://putongren.org/ai-skills/) | 🛡️ [在线实务技能库 (Library)](https://putongren.org/ai-skills/library.html)

---

## 🌟 项目生态：双轮驱动实操架构

本项目为广大日常使用大语言模型与智能体 IDE 的普通工作者构建了“认知 + 武器”的双轮驱动实操生态：

1. 📖 **[实务长篇指南 (Field Guide)](https://putongren.org/ai-skills/)**（*网站首页 / `site/index.html`*）：
   深度叙事长篇指南。系统解构算法时代的平民处境（数据主权剥夺、自信幻觉与认知依附），解析为何宏大伦理必须落地为桌面防线，并通过 **5 大核心工作流场景** 穿针引线串联全量 43 项技能，提供 112 处微卡片原地交互与 3 大角色一日安全工作流。

2. 🛡️ **[实务技能库 (Skill Library)](https://putongren.org/ai-skills/library.html)**（*交互技能库 / `site/library.html`*）：
   开箱即用的交互式技能筛选与搜索平台。支持按 4 大实务分类、4 大工作流时序进行即时组合过滤，提供实时关键词搜索、运行状态与实证弹窗、技术标准溯源与一键复制安装命令。

3. 💻 **[GitHub 开源主仓库](https://github.com)**（*本仓库*）：
   严谨的数据中心与代码源泉。托管规范化的技能数据集（`site/data/items.json`）、严格的自动化测试质检门禁（`scripts/`）以及双语文档生成引擎。

---

## 💡 核心理念：负责任与安全使用 AI 的当下实务内核（动态演进框架）

本项目由[**「普通人的数字权利」共创社区 (putongren.org)**](https://putongren.org)发起，致力于帮助每一个人在机器与算法时代守护个人数字权利与尊严。

本项目坚持**“只精选，不生造”**，从开源生态中甄选真实存在的优秀开源工具。当前我们将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：

1. **🛡️ 对内·自我防护与边界**：
   - **防范数据过度采集**：警惕商业大模型通过晦涩协议，将你的日常对话、未公开草稿、私有源码或敏感个案当做免费语料静默采集，坚决在本地筑牢数据边界。
   - **打破自信幻觉与谄媚**：警惕 AI 极度自信地伪造事实或为了取悦人类而放弃客观性，坚守人类的批判性思考与终审决策权。

2. **📐 对外·成果第三方可核验**：
   - **主动附带实证链条**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者或客户能够轻松核查，而非给出一纸空洞的形式化免责声明。
   - **硬性发布门禁**：通过广告主张核查、SPDX 开源协议合规、代码密钥扫描、Web 无障碍审计等法定与行业标准门禁，阻断违规内容流出。

> [!NOTE]
> 这一拆解本身并非固化的教条，而是**保持动态演进**的实务框架，随着模型能力与应用形态的深入不断更新演化。

---

## 🧭 目录导航

* [🌟 项目生态：双轮驱动实操架构](#-项目生态双轮驱动实操架构)
* [💡 核心理念](#-核心理念负责任与安全使用-ai-的当下实务内核动态演进框架)
* [📦 客户端技能安装规范（目录指南）](#-客户端技能安装规范目录指南)
* [🔬 运行状态与实证指标评定说明](#-运行状态与实证指标评定说明)
* [📂 四大核心实务问题（技能全景目录）](#-四大核心实务问题技能全景目录)
  * [1. 我能把什么给 AI？](#1-我能把什么给-ai)
  * [2. 哪些回答能信？](#2-哪些回答能信)
  * [3. 什么时候不能听 AI？](#3-什么时候不能听-ai)
  * [4. 输出能不能直接发布？](#4-输出能不能直接发布)
* [🗂️ 代码仓库组织目录](#️-代码仓库组织目录)
* [🧪 本地开发与质检指令](#-本地开发与质检指令)
* [🤝 参与贡献](#-参与贡献)
* [📄 开源许可证](#-开源许可证)

---

## 📦 客户端技能安装规范（目录指南）

根据开放 **Agent Skills 规范**（`SKILL.md`），不同客户端加载本地技能的路径如下：

### 各平台目录位置

* **Claude Code:**
  ```bash
  # 项目级技能（推荐，跟随代码库共享）
  mkdir -p .claude/skills/<skill-name>/
  # 用户全局技能（所有会话通用）
  mkdir -p ~/.claude/skills/<skill-name>/
  ```

* **Cursor / Google Antigravity:**
  ```bash
  mkdir -p .agents/skills/<skill-name>/
  ```

> [!IMPORTANT]
> **必须完整复制整个技能文件夹**：许多高质量技能内置了独立的 Python/Bash 校验脚本、威胁规则库与参考模板。绝不要只单份复制 `SKILL.md`，请始终按各条目的安装命令完整拉取整个目录。

---

## 🔬 运行状态与实证指标评定说明

为了让每位使用者清晰了解工具的可用程度，本库彻底废弃生涩难懂的技术黑话，将技能评定建立在**客观真实数据与本地实测证据**之上：

* **🟢 开箱即用 (实测通过)**：纯提示词/规则工程规范，无外部二进制依赖，直接导入客户端即可生效。所有工作流逻辑已通过完整语法与调用校验。
* **🟡 需配置依赖 (环境就绪)**：需在本地预装指定环境（如 Python 3.10+、SpaCy NER 实体识别库、Gitleaks 密钥扫描器等）或配置专用 API Token，具备明确的前提条件。
* **100% 真实开源存活**：全量 43 项技能通过 `npm run test:remote` 自动化实时校验（43/43 全部 HTTP 200）。零合成提示词，零失效死链。

---

## 📂 四大核心实务问题（技能全景目录）

### 1. 我能把什么给 AI？
*防止将个人身份信息（PII）、商业机密草案或受保护的访谈记录无意泄露给商业大模型作为训练语料。*

| 序号 | 技能名称 | 时机 | 运行状态 | 对齐技术标准 | 核心自卫防线 / 功能概要 |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**PII Safe Documents (danyuchn/pii-guard)**](https://github.com/danyuchn/pii-guard) | ⏳ 输入前 | 🟢 开箱即用 | 微软 Presidio 敏感信息识别与本地沙盒去标识化标准 (Microsoft / Open Source Privacy Standards) | 默认视云端大模型为不可信环境，在本地生成可逆的脱敏工作副本，主 Agent 严禁接触原始文件，任务完成后在本地还原并清理。 |
| 2 | [**Scholar Safety (joshzyj/open-scholar-skill)**](https://github.com/joshzyj/open-scholar-skill) | ⏳ 输入前 | 🟢 开箱即用 | 机构审查委员会 (IRB) 与受控学术研究数据流动合规指南 (US HHS Office for Human Research Protections (OHRP)) | 在智能体读取文件前先执行本地敏感性扫描，对 IRB/HIPAA/受控学术数据设置门禁，支持仅在本地跑脚本分析而不把正文回传云端。 |
| 3 | [**Skill Sanitizer (cyberxuan-XBX/skill-sanitizer)**](https://github.com/cyberxuan-XBX/skill-sanitizer) | ⏳ 输入前 | 🟢 开箱即用 | OWASP 智能体应用安全十大风险 (LLM06: 敏感信息泄露防范) (OWASP GenAI Foundation) | 在智能体加载第三方 SKILL.md 之前，扫描该技能文件内是否藏有提示词注入、恶意 Bash 命令或秘密回传外联代码。 |
| 4 | [**PII Detection Pipeline (mukul975/Privacy-Data-Protection-Skills)**](https://github.com/mukul975/Privacy-Data-Protection-Skills) | ⏳ 输入前 | 🟡 需依赖 | 欧盟 GDPR 第 30 条处理活动记录与最小必要原则规范 (European Data Protection Board (EDPB)) | 基于 agentskills.io 规范的本地隐私分类管道，在向上游大模型传输前自动对命名实体进行脱敏与掩码处理。 |
| 5 | [**OpenMed Clinical Document Ingestion (maziyarpanahi)**](https://github.com/maziyarpanahi/openmed) | ⏳ 输入前 | 🟢 开箱即用 | 美国卫生与公众服务部 HIPAA 安全港去标识化法案 (18 项 PHI 剔除准则) (US Department of Health and Human Services (HHS)) | 专为医学临床文本设计的脱敏技能，在智能体处理医疗记录前识别并屏蔽受保护健康信息（PHI）与患者标识。 |
| 6 | [**AREX Presidio Anonymize Text (VectorSpaceLab)**](https://github.com/VectorSpaceLab/AREX-Skill) | ⏳ 输入前 | 🟡 需依赖 | 微软 Presidio 开源脱敏引擎架构规范 (可逆掩码与假名化) (Microsoft Open Source Engineering) | 符合 AgentSkills 规范的文本脱敏技能包，利用 Presidio 扫描敏感实体并生成脱敏标记，保护企业机密资产。 |
| 7 | [**SkillGuard (LLMSecurity/skillguard)**](https://github.com/LLMSecurity/skillguard) | ⏳ 输入前 | 🟢 开箱即用 | MITRE ATLAS 对抗性威胁框架 (AML.T0051 提示词注入与投毒防御) (MITRE Corporation & OWASP) | 在安装外部技能前审计 OWASP Top 10 风险与恶意特征，拦截提示词注入、权限越界与隐蔽数据外发。 |
| 8 | [**Skill Sentinel (EvolutionUnleashed/skill-sentinel)**](https://github.com/EvolutionUnleashed/skill-sentinel) | ⏳ 输入前 | 🟢 开箱即用 | CWE-78 操作系统命令注入漏洞防范规范 (针对 Agentic 终端调用) (MITRE Common Weakness Enumeration) | 扫描并排查技能指令中的恶意后门、提示词注入与数据窃取指令，保护本地会话隐私。 |
| 9 | [**Nova Proximity (Nova-Hunting/nova-proximity)**](https://github.com/Nova-Hunting/nova-proximity) | ⏳ 输入前 | 🟢 开箱即用 | Anthropic Model Context Protocol (MCP) 最小权限与本地宿主隔离规范 (Anthropic & MCP Working Group) | 扫描 MCP 服务与技能权限，拦截高危系统调用与越权文件访问，保护本地核心凭证。 |
| 10 | [**Security Threat Model (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model) | ⏳ 输入前 | 🟢 开箱即用 | STRIDE / DREAD 人工智能与大模型应用威胁建模标准 (Microsoft Security Engineering) | 基于实际资产生成威胁模型，界定系统信任边界，划定哪些机密内容严禁喂给云端大模型。 |

> 💡 **需要查看 7 维深度评测与一键安装命令？**
> 欢迎前往 **[在线实务技能库 (putongren.org/ai-skills/library.html)](https://putongren.org/ai-skills/library.html#feed-to-ai)** 或 **[实务长篇指南 (putongren.org/ai-skills/)](https://putongren.org/ai-skills/)**，点击任意技能卡片即可原地查看详细使用时机、为何普通人应关心、独立第三方媒体长篇报道、标准原文以及直接复制终端安装命令。

---

### 2. 哪些回答能信？
*防止被 AI 极度自信的幻觉引用文献（Phantom Citations）、捏造的数据统计和伪造断言所误导。*

| 序号 | 技能名称 | 时机 | 运行状态 | 对齐技术标准 | 核心自卫防线 / 功能概要 |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**Post-Generation Fact-Check (jwynia/agent-skills)**](https://github.com/jwynia/agent-skills) | 💬 交互中 | 🟢 开箱即用 | NeurIPS 2023 Self-Refine 多阶段事实反思与生成后核验架构 (Neural Information Processing Systems (NeurIPS)) | 在内容生成后强制发起独立事实核查：提取所有事实断言，调用外部检索验证，明确拒绝以大模型自身记忆作为可信凭据。 |
| 2 | [**Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)**](https://github.com/CanXiangCC/aminer-open-skill) | 💬 交互中 | 🟢 开箱即用 | 清华大学 KEG 学术知识图谱引用保真度评测标准 (清华大学计算机系知识工程实验室 (KEG) & AMiner) | 深入拉取引文原文，逐条检验正文是否真实支撑对应论点，输出结构化判定结论（SUPPORTED、NOT_IN_SOURCE 等）。 |
| 3 | [**BibRef Verify (yzhao062/agent-config)**](https://github.com/yzhao062/agent-config) | 💬 交互中 | 🟡 需依赖 | CrossRef 国际数字对象唯一标识符 (DOI) 元数据检索标准 (CrossRef (Publishers International Linking Association)) | 对学术论文的 .bib 参考文献进行批量查伪与信息核对，识别虚构作者和失效 DOI，输出结构化审计报告。 |
| 4 | [**Citation Integrity Auditor (scdenney/open-science-skills)**](https://github.com/scdenney/open-science-skills) | 💬 交互中 | 🟢 开箱即用 | 开放科学中心 (COS) 研究完整性与文献可复现性指南 (Center for Open Science (COS) / Open Science Framework (OSF)) | 对照 Crossref 与 OpenAlex 审计文稿中的引文层，核验 DOI 解析状态，对无法查证的假文献直接标红报警，拒绝猜测。 |
| 5 | [**jkitchin/skillz (citation-verifier)**](https://github.com/jkitchin/skillz) | 💬 交互中 | 🟢 开箱即用 | 卡耐基梅隆大学可计算学术与可重现科学论文准则 (John Kitchin Group) (Carnegie Mellon University) | 批量校验论文参考文献条目，排查被撤稿论文和虚假引文，确保文献实证依据坚实可靠。 |
| 6 | [**Claim–Source Fact Checker (scdenney/open-science-skills)**](https://github.com/scdenney/open-science-skills) | 💬 交互中 | 🟢 开箱即用 | FEVER 国际事实抽取与证据链判定基准分类规范 (FEVER Academic Consortium) | 比对关键断言与本地知识库源文件，检测过度断言、结论方向倒置与张冠李戴等高危幻觉。 |
| 7 | [**Hallucination Risk Reviewer (Notysoty/openagentskills)**](https://github.com/Notysoty/openagentskills) | 💬 交互中 | 🟢 开箱即用 | ACM Computing Surveys (CSUR) 大语言模型幻觉分类与不确定性评估模型 (Association for Computing Machinery (ACM)) | 执行断言级幻觉风险分级排查，针对具体引文、URL、原话及高危行业断言进行严格审查与危害评估。 |
| 8 | [**Vectara Hallucination Corrector HHEM (vectara)**](https://github.com/vectara/agent-skills) | 💬 交互中 | 🟡 需依赖 | Vectara Hughes 幻觉评估模型 (HHEM) 全球事实一致性基准 (Vectara AI Research) | 通过 Vectara HHEM 事实一致性模型比对生成文本与源文档，算法级剔除缺乏实证依据的幻觉断言。 |
| 9 | [**K-Dense Scientific Peer Review (K-Dense-AI)**](https://github.com/K-Dense-AI/scientific-agent-skills) | 💬 交互中 | 🟢 开箱即用 | 《自然·机器智能》关于人工智能辅助同行评审的质量与伦理规范 (Nature Portfolio (Springer Nature)) | 对学术与科学草稿执行严谨的同行评审级核验，交叉验证逻辑推导步骤与实证推断的有效性。 |
| 10 | [**The Judge (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge) | 💬 交互中 | 🟢 开箱即用 | 马丁·福勒 (Martin Fowler) 实证驱动软件架构评审准则 (ThoughtWorks / Martin Fowler Architecture Foundation) | 严苛事实裁决协议，要求每一条结论必须提供一手行号或官方链接证据，杜绝凭空推演与幻觉。 |

> 💡 **需要查看 7 维深度评测与一键安装命令？**
> 欢迎前往 **[在线实务技能库 (putongren.org/ai-skills/library.html)](https://putongren.org/ai-skills/library.html#answers-to-trust)** 或 **[实务长篇指南 (putongren.org/ai-skills/)](https://putongren.org/ai-skills/)**，点击任意技能卡片即可原地查看详细使用时机、为何普通人应关心、独立第三方媒体长篇报道、标准原文以及直接复制终端安装命令。

---

### 3. 什么时候不能听 AI？
*破除“自动化偏见”（Automation Bias）与盲目赞同，划定人类决策的独立思考防线。*

| 序号 | 技能名称 | 时机 | 运行状态 | 对齐技术标准 | 核心自卫防线 / 功能概要 |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**The Fool (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills) | 💬 交互中 | 🟢 开箱即用 | 卡尼曼《思考，快与慢》双系统认知偏差防御与苏格拉底反诘法 (Cognitive Science & Decision Making Foundations) | 充当专业反思者角色，执行隐性假设探测、辩证反驳、事前尸检与认知偏差扫描，粉碎盲从与虚假共识。 |
| 2 | [**Sycophancy Challenger (mohitagw15856/pm-claude-skills)**](https://github.com/mohitagw15856/pm-claude-skills) | 💬 交互中 | 🟢 开箱即用 | Anthropic 官方研究：大语言模型阿谀奉承（Sycophancy）偏见的实证防御准则 (Anthropic Research) | 强行将助手切换为对抗批判模式，严禁因用户施压而轻易妥协，坚决反抗大模型的谄媚偏见。 |
| 3 | [**jihlenburg/mad-skills (devils-advocate)**](https://github.com/jihlenburg/mad-skills) | 💬 交互中 | 🟢 开箱即用 | 多智能体对抗辩论 (Multi-Agent Debate) 发散性思辨技术规范 (MAD Research Collective (Liang et al.)) | 启动对抗性子智能体，在方案定稿前从 8 个不同失败维度进行系统化压力测试与风险评级。 |
| 4 | [**Godfly Opposing Counsel (CassioRoos/godfly-skills)**](https://github.com/CassioRoos/godfly-skills) | 💬 交互中 | 🟢 开箱即用 | 法庭对抗性交叉质证 (Cross-Examination) 逻辑法理准则 (Classical Jurisprudence & Dialectical Philosophy) | 为重大决策起草正式的对抗性辩护状，攻击核心承重假设，量化不可逆成本，清晰指出失败临界点。 |
| 5 | [**Devil's Advocate Reviewer Agent (Imbad0202)**](https://github.com/Imbad0202/academic-research-skills) | 💬 交互中 | 🟢 开箱即用 | 哈佛商业评论 Gary Klein“事前尸检”(Pre-Mortem) 决策防灾法 (Harvard Business Publishing) | 采取对抗性评审立场探测学术论文的逻辑漏洞，设定严格防退让规则，绝不因用户施压而撤回关键学术质疑。 |
| 6 | [**Multi-Perspective Red-Team Review (mohitagw15856)**](https://github.com/mohitagw15856/pm-claude-skills) | 💬 交互中 | 🟢 开箱即用 | 美国国家标准与技术研究院 (NIST AI 100-1) 红队对抗性压力测试指南 (National Institute of Standards and Technology (NIST)) | 通过多维度对抗性视角对规划执行压力测试，以发生概率与破坏力为盲区评级，实施严谨的事前尸检。 |
| 7 | [**Devil's Advocate Anti-Sycophancy (molly-diversifiedfun)**](https://github.com/molly-diversifiedfun/claude-skills) | 💬 交互中 | 🟢 开箱即用 | 强化学习对话式迎合倾向 (Conversational Agreeableness) 纠偏准则 (AI Alignment Research Community) | 基于事前尸检与苏格拉底诘问构建的反思伙伴，执行严格的反迎合准则，禁止以赞美开场或为取悦用户而妥协批评。 |
| 8 | [**The Jury (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury) | 💬 交互中 | 🟢 开箱即用 | 孔多塞陪审团定理与分布式认知群体决策数学模型 (Social Choice Theory & Collective Intelligence) | 多智能体匿名盲审评议团，通过背靠背独立评分与法定反方辩论，打破 AI 的顺从迎合与认知回音室。 |
| 9 | [**Discernment Nudge (anthropics/skills)**](https://github.com/anthropics/skills/tree/main/skills/discernment-nudge) | 💬 交互中 | 🟢 开箱即用 | Anthropic AI Fluency 批判性鉴别力与主动认知阻尼标准 (Anthropic) | Anthropic 官方鉴别力提醒，在关键建议后自动附带针对薄弱假设的灵魂反问，引导用户主动核实盲点。 |
| 10 | [**Review Reception & Anti-Compliance (obra/superpowers)**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | 💬 交互中 | 🟢 开箱即用 | Superpowers 架构准则：认知独立性与反盲从代码评审原则 (Jesse Vincent (obra) / Superpowers Framework) | 确立“事实正确高于礼貌顺从”原则，要求在实施任何反馈前先行实测验证，坚决拒绝表演式赞同与无脑盲从。 |

> 💡 **需要查看 7 维深度评测与一键安装命令？**
> 欢迎前往 **[在线实务技能库 (putongren.org/ai-skills/library.html)](https://putongren.org/ai-skills/library.html#when-not-to-listen)** 或 **[实务长篇指南 (putongren.org/ai-skills/)](https://putongren.org/ai-skills/)**，点击任意技能卡片即可原地查看详细使用时机、为何普通人应关心、独立第三方媒体长篇报道、标准原文以及直接复制终端安装命令。

---

### 4. 输出能不能直接发布？
*让第三方（同事、读者、客户、监管）能够方便地核查验证成果证据链，拒绝空洞的形式化免责。*

| 序号 | 技能名称 | 时机 | 运行状态 | 对齐技术标准 | 核心自卫防线 / 功能概要 |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**AI Provenance (noheton/f-ai2-r)**](https://github.com/noheton/f-ai2-r) | 📤 交付前 | 🟢 开箱即用 | 万维网联盟 (W3C) PROV 数据本体与数字产物溯源国际标准 (World Wide Web Consortium (W3C)) | 自动记录人机协作轨迹（模型版本、提示词哈希、工具调用与验证状态），并推导出可信的人类可读 AI 使用披露说明。 |
| 2 | [**Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)**](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow) | 📤 交付前 | 🟢 开箱即用 | Google Search Central 优质内容系统与 EEAT (经验/专业/权威/可信) 指南 (Google Search Central) | 对 AI 草稿执行 PASS/FIX/BLOCK 硬性发布门禁。编写与审校智能体被物理剥夺直接发布权限，必须依赖外部人类授权回执。 |
| 3 | [**PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)**](https://github.com/harlan-zw/harlan-agent-kit) | 📤 交付前 | 🟢 开箱即用 | 开源促进会 (OSI) 与 Linux 基金会关于开源协同 AI 代码披露准则 (Open Source Initiative (OSI) & Linux Foundation) | 将 AI 披露做成代码提交与 PR 的机器强制门禁。强制嵌入透明声明，声明若被删改则直接拒绝执行发布命令。 |
| 4 | [**GDPR Compliance Audit (mukul975/Privacy-Data-Protection-Skills)**](https://github.com/mukul975/Privacy-Data-Protection-Skills) | 🧹 归档时 | 🟢 开箱即用 | 欧盟 GDPR 第 22 条关于自动化个人决策与算法透明度法定权利 (European Union Legal Framework) | 在上线前核查方案的数据最小化、目的限制与知情同意规范，出具审计结果与整改建议。 |
| 5 | [**Publish Prep Review (45ck/content-machine)**](https://github.com/45ck/content-machine) | 📤 交付前 | 🟢 开箱即用 | 美联社 (AP) 新闻采编生成式 AI 事实核对与人工复核三重戒律 (The Associated Press (AP)) | 在成果最终上传前进行闭环校验，核验最终成稿、引文版权、工作流模型哈希，缺少可核验证据时强制阻止发布。 |
| 6 | [**AI Disclosure Convention SPDX-style (ggfevans)**](https://github.com/ggfevans/ai-disclosure) | 📤 交付前 | 🟢 开箱即用 | Linux 基金会 SPDX 软件包数据交换国际标准 (ISO/IEC 5962:2021) 声明协议 (Linux Foundation & ISO) | 在文件头注释中嵌入轻量级、机器可读的 AI 披露标签（SPDX 风格），确保归属与审计信息在跨仓库流转中持久保留。 |
| 7 | [**Skill Provenance Tracker (snapsynapse)**](https://github.com/snapsynapse/skill-provenance) | 🧹 归档时 | 🟢 开箱即用 | IETF & W3C 可验证凭据与账本审计不可篡改收据标准 (Internet Engineering Task Force (IETF) & W3C) | 跨会话追踪智能体技能版本、调用上下文及数据流转，生成具备防篡改特性的执行收据以供合规审计。 |
| 8 | [**Verification Before Completion (obra/superpowers)**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | 📤 交付前 | 🟢 开箱即用 | Superpowers 软件工程铁律：完成声明前必须出示实测通过命令证据 (Jesse Vincent (obra) / Superpowers Framework) | 交付与发布前的核验铁律，严禁在未出示最新测试运行命令输出前向用户宣称完成或直接发布。 |
| 9 | [**Humanizer (blader/humanizer)**](https://github.com/blader/humanizer) | 📤 交付前 | 🟢 开箱即用 | 维基百科官方编辑社群指南：《识别 AI 生成文本的典型标志》(Wikipedia:Signs of AI-generated text) (Wikimedia Foundation / Wikipedia Editors Community) | 依据维基百科规范去除 AI 文本刻板痕迹与浮夸套话，在公开发布前还原作者真实自然的叙述口吻。 |
| 10 | [**Marketing Claims Review (anthropics/claude-for-legal)**](https://github.com/anthropics/claude-for-legal/tree/main/product-legal/skills/marketing-claims-review) | 📤 交付前 | 🟢 开箱即用 | 美国联邦贸易委员会 (FTC) 广告声明实证原则与反欺诈消费者保护标准 (16 CFR Part 255 / Section 5) (US Federal Trade Commission (FTC)) | 从 AI 生成的文案中提取所有断言，分类为主观吹捧与事实承诺，在发布前强制核验实证或合规改写，防范虚假宣传风险。 |
| 11 | [**Web Accessibility Gate (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-accessibility) | 📤 交付前 | 🟢 开箱即用 | 万维网联盟 (W3C) Web 内容无障碍指南国际标准 (WCAG 2.1 Level AA / ISO/IEC 40500:2012) (World Wide Web Consortium (W3C) & ISO) | 依照 W3C WCAG 2.1 AA 国际标准自动化审计与修复 AI 生成的前端页面，确保键盘可访问性、色彩对比度与屏幕阅读器无障碍支持。 |
| 12 | [**Repo Security & Secret Gate (Consensys)**](https://github.com/Consensys/repo-security-review) | 📤 交付前 | 🟢 开箱即用 | OWASP Top 10 应用程序安全风险标准与 Gitleaks 敏感凭证检测规范 (OWASP Foundation & Consensys Security) | 在智能体生成的代码或补丁发布前，编排多阶段安全审查，集成 Gitleaks 密钥检测与 OWASP 漏洞分析，阻断敏感凭证泄露。 |
| 13 | [**License Compliance Audit (apache/magpie)**](https://github.com/apache/magpie/tree/main/plugins/magpie-repo-health/skills/license-compliance-audit) | 📤 交付前 | 🟢 开箱即用 | Linux 基金会 SPDX 软件包数据交换国际标准 (ISO/IEC 5962:2021) 与 Apache 许可证合规规范 (Linux Foundation, ISO & Apache Software Foundation) | 执行只读开源许可证合规审计，核查 LICENSE 文件、NOTICE 声明完整性以及源码文件中的 SPDX 许可证头一致性。 |

> 💡 **需要查看 7 维深度评测与一键安装命令？**
> 欢迎前往 **[在线实务技能库 (putongren.org/ai-skills/library.html)](https://putongren.org/ai-skills/library.html#can-publish-directly)** 或 **[实务长篇指南 (putongren.org/ai-skills/)](https://putongren.org/ai-skills/)**，点击任意技能卡片即可原地查看详细使用时机、为何普通人应关心、独立第三方媒体长篇报道、标准原文以及直接复制终端安装命令。

---

## 🗂️ 代码仓库组织目录

```text
.
├── site/                       # 静态网页应用
│   ├── index.html              # 📖 实务长篇指南 (Field Guide)
│   ├── library.html            # 🛡️ 交互式技能库 (Skill Library)
│   ├── css/style.css           # 全站样式、排版与深色模式支持
│   ├── js/
│   │   ├── guide.js            # 指南页面逻辑、目录随动高亮与行文微弹窗
│   │   └── library.js          # 技能库检索、过滤与详情弹窗交互
│   ├── data/
│   │   └── items.json          # 全量 43 项技能核心主数据库
│   └── sitemap.xml             # 搜索引擎索引地图
├── scripts/                    # 自动化与质检工具
│   ├── verify-data.js          # Schema 格式与数据门禁测试 (npm test)
│   ├── verify-remote.js        # 43 个 GitHub 链接实时存活巡检 (npm run test:remote)
│   ├── generate-readmes.js     # 自动生成中英双语 README (npm run build)
│   └── serve.js                # 双端口本地开发静态服务器 (npm run serve)
├── CONTRIBUTING.md             # 贡献准则、Schema 规范与提交模板
├── README.md                   # 英文主文档
├── README_CN.md                # 中文主文档
└── package.json
```

---

## 🧪 本地开发与质检指令

本项目拥有严苛的自动化工程与质量守卫标准：

```bash
# 1. 执行 Schema 格式规范与本地规则测试
npm test

# 2. 批量并发探测 43 项技能的 GitHub 真实在线状态 (HTTP 200 巡检)
npm run test:remote

# 3. 从 site/data/items.json 全自动重新生成中英双语 README
npm run build

# 4. 启动本地双端口热重载静态服务器
npm run serve
# 访问 http://localhost:3000 (实务指南) 或 http://localhost:3000/library.html (技能库)
```

---

## 🤝 参与贡献

欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 普通人的数字权利 (putongren.org) & Responsible AI Use Contributors
