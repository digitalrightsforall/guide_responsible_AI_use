# Awesome Responsible AI Skills (负责任 AI 使用技能精选) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 一个面向日常知识工作者、研究人员、写作者和专业人士的精选技能清单。收录开箱即用的 `SKILL.md` 规范技能与高质量结构化提示词，帮助你在日常使用 AI 时天然做到：**输入守隐私、交互辨真伪、决策不盲从、发布明披露**。

[English Version](README.md) | **中文版**

---

## 💡 为什么说“Responsible AI Use”不同于传统的“Responsible AI”？

目前绝大部分关于“负责任 AI”（Responsible AI）的讨论和工具库，都是写给**模型开发者、科技巨头和政策合规团队**的——讨论的是训练集偏差、模型可解释性、红蓝对抗评测和算法审计。

然而，**当 AI 已经成为普通人的日常桌面工具时，一个人怎样才能安全、规范且负责任地使用它？** 这实际上是一套完全不同的实务问题：

| 维度 | 传统 Responsible AI | 你这里的 Responsible AI Use（本项目） |
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

* [1. 我能把什么给 AI？（输入端隐私与边界保护）](#1-我能把什么给-ai)
* [2. 哪些回答能信？（交互端事实核验与防幻觉）](#2-哪些回答能信)
* [3. 什么时候不能听 AI？（决策端防盲从与人机边界）](#3-什么时候不能听-ai)
* [4. 输出能不能直接发布？（输出端使用举证与合规披露）](#4-输出能不能直接发布)
* [⚡ 日常 AI 负责任使用 30 秒核对清单](#-日常-ai-负责任使用-30-秒核对清单)

---

### 1. 我能把什么给 AI？
*防止将个人身份信息（PII）、商业机密草案或受保护的访谈记录无意泄露给云端模型。*

#### [`pii-safe-documents`](https://github.com/danyuchn/pii-guard)
* **类型：** `SKILL.md`
* **适用客户端：** Cursor, Antigravity, Claude Code
* **适用人群：** 通用知识工作者、研究人员、调查记者、数据分析师
* **解决的问题：** 默认将云端大模型视作不可信环境。在本地为文档生成可逆的脱敏工作副本，主 Agent 物理上被禁止打开、检索或上传原始私有文件；任务结束后在本地还原并清理。
* **安装与使用：**
  ```bash
  git clone https://github.com/danyuchn/pii-guard.git
  cp -R pii-guard/.agents/skills/pii-safe-documents .agents/skills/
  ```

#### [`scholar-safety`](https://github.com/joshzyj/open-scholar-skill)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 高校与智库学者、受伦理委员会（IRB/HIPAA）约束的科研团队
* **解决的问题：** 在智能体读取文件前先执行本地敏感性扫描，对受控学术数据设置门禁，支持仅在本地跑 Bash 脚本统计分析，而不把正文回传给云端模型。
* **安装与使用：**
  ```bash
  git clone https://github.com/joshzyj/open-scholar-skill.git
  cp -R open-scholar-skill/.claude/skills/scholar-safety ~/.claude/skills/
  ```

#### [`skill-sanitizer`](https://github.com/cyberxuan-XBX/skill-sanitizer)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity, Cursor
* **适用人群：** 开发者、系统管理员、重度 Agent 技能使用者
* **解决的问题：** 本地元安全拦截工具。在安装或加载第三方 `SKILL.md` 之前，扫描该技能文件内是否隐藏了提示词注入、恶意 Bash 命令、凭证偷取或隐私回传代码。
* **安装与使用：**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII-Shield`](https://github.com/gregmos/PII-Shield)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity, Open Agent 标准
* **适用人群：** 通用知识工作者、法务与财务分析人员
* **解决的问题：** 在智能体读取文件（.txt, .md, .pdf, .docx）时自动进行 PII 识别，将真实姓名、邮箱、电话等替换为合成占位符，任务完成后在本地还原。

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Cursor, Antigravity
* **适用人群：** 处理客户服务记录或用户反馈的职场人士
* **解决的问题：** 识别上下文中的敏感凭证和联系信息，维护本地临时混淆映射表，防止外部大模型获取真实数据。

#### [`anonymize-documents-with-presidio`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **类型：** `SKILL.md`（带本地脚本）
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 处理田野调查访谈、定性调研文本的研究人员
* **解决的问题：** 在本地通过微软 Presidio 引擎洗掉访谈对象姓名和机构，杜绝敏感学术调研数据外泄。

#### `[Prompt 备选] 输入前敏感情报脱敏提示词`
* **类型：** `Prompt`
* **适用客户端：** 网页端对话助手（ChatGPT, Claude.ai, Gemini, Open WebUI）
* **适用人群：** 暂未安装桌面 Agent 的通用网页端用户
* **解决的问题：** 引导大模型在第一步先产出脱敏版文本，避免在后续深挖分析时暴露真实主体。
* **提示词：**
  ```text
  你是一名专业的数据合规与脱敏助手。
  稍后我将提供一段原始草稿或会议记录。
  你当前唯一的任务是输出一份脱敏后的版本：
  1. 将所有真实人名替换为 [人员A]、[人员B] 等代号。
  2. 将所有具体企业名称、机构名称、邮箱、电话和详细住址替换为 [机构X]、[邮箱已脱敏]、[地点Y]。
  3. 将具体财务金额、银行账号替换为 [金额A]、[账号Z]。
  
  请不要做任何总结、续写或评价。只返回脱敏后的文本以及一份私有代号对应表供我确认。
  ```

---

### 2. 哪些回答能信？
*防止被 AI 虚构的引用文献（Phantom Citations）、捏造的数据统计和伪造的事实断言所误导。*

#### [`post-generation-fact-check`](https://github.com/jwynia/agent-skills)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Cursor, Antigravity
* **适用人群：** 知识工作者、调查记者、学术研究者
* **解决的问题：** 强制将核验作为生成后的**独立独立 Pass**：逐条提取可核对的事实断言，检索外部权威信源，标明已证实、有矛盾或未证实。明确规定：大模型自身的记忆不计为核验依据。
* **安装与使用：**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git
  cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`citation-faithfulness`](https://github.com/CanXiangCC/aminer-open-skill)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity, Cursor
* **适用人群：** 学术研究者、同行审稿人、严肃事实核查员
* **解决的问题：** 超越了“文献是否存在”，更进一步调取文献原文，检验论文正文是否真的支撑 AI 声称的那个论据，输出标准的一致性判定（`SUPPORTED`, `NOT_IN_SOURCE` 等）。
* **安装与使用：**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git
  cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`bibref-verify`](https://github.com/yzhao062/agent-config)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 论文写作者、科研基金申报人
* **解决的问题：** 对学术论文现有的 `.bib` 参考文献进行批量查伪与信息核对，识别虚构作者和失效 DOI，输出结构化的 `REFERENCE-CHECK.md` 审计报告。
* **安装与使用：**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git
  cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`citation-check-skill`](https://github.com/open-agent-skills/citation-check-skill)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity, Open Agent 标准
* **适用人群：** 学术研究者、智库分析员、政策研究人员
* **解决的问题：** 自动提取生成内容中的引文与文献，调用 Crossref、Semantic Scholar 等接口实地检验 DOI 和作者是否真实存在，标红虚构引文。

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Emacs, Antigravity
* **适用人群：** 使用 Markdown、LaTeX 撰写论文的学者
* **解决的问题：** 批量校验论文参考文献条目，排查被撤稿论文和虚假引文。

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 调查记者、自媒体创作者、事实核查员
* **解决的问题：** 将文本拆解为一个个独立的事实断言（Claims），强制调用搜索工具求证，并对缺少确切依据的句子施加审慎对冲修饰。

#### `[Prompt 备选] 新闻编辑级事实核查与引语防漂移提示词`
* **类型：** `Prompt`
* **适用客户端：** 通用网页端（ChatGPT, Claude, Gemini）
* **适用人群：** 调查记者、特稿编辑、文案创作者
* **解决的问题：** 两阶段新闻编辑级核查法，专门排查引语漂移（Quote Drift，微妙篡改原话）和权威掩饰（用权威声望代替事实证据）。
* **提示词：**
  ```text
  对提供的文本执行两阶段编辑级事实核查：
  阶段 A：断言核验
  对文本中出现的每一处引语、统计数据或事实陈述，输出核验表：包含位置、断言类型、原话陈述、状态（严重错误、已证实、通过）。
  阶段 B：编辑红线排查（仅在阶段 A 完成后执行）
  排查文本是否存在以下高阶伪造风险：
  * 幽灵引用：信源查无此人/此书。
  * 引文身份漂移：信源真实存在，但标识符或作者名字张冠李戴。
  * 引语漂移：引用的原话被微妙改动，导致原意发生偏移。
  * 转述通胀：草稿得出的结论明显强于原信源支持的强度。
  * 权威掩饰：仅靠引用知名机构/权威头衔撑门面，但引用内容并未提供任何实证证据。
  ```

#### `[Prompt 备选] 认识论谦逊与事实断言分级标记提示词`
* **类型：** `Prompt`
* **适用客户端：** 通用网页端对话助手
* **适用人群：** 案头研究人员与日常知识检索者
* **解决的问题：** 破除 AI 过度自信的作答模式，强行对输出中的每一句话进行证据置信度标注。

---

### 3. 什么时候不能听 AI？
*警惕“自动化偏见”（Automation Bias）与盲目服从，划定人机协作的不可逾越边界。*

#### [`the-fool`](https://github.com/tech-leads-club/agent-skills)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity, Cursor
* **适用人群：** 管理者、决策制定者、架构师、项目发起人
* **解决的问题：** 愚者决策挑战者。核心原则是“不替用户做决定，只负责拆台”，执行隐性假设探测、辩证反驳、事前尸检（Pre-mortem）与认知偏差扫描，粉碎虚假共识。
* **安装与使用：**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git
  cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`sycophancy-challenger`](https://github.com/mohitagw15856/pm-claude-skills)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Cursor, Antigravity
* **适用人群：** 决策制定者、产品经理、独立创始人
* **解决的问题：** 反迎合专精技能。强行将助手从吹捧赞同切换为对立批判模式，且明确规定“除非用户提供实质性新证据，否则禁止因用户反复辩解而妥协退让”。
* **安装与使用：**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git
  cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`council-review-dmad`](https://github.com/ngmeyer/council-review)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 产品经理、系统架构师、战略规划师
* **解决的问题：** 多样化多智能体辩论（DMAD）协议，综合运用反演法、任务分解、类比反思与强制魔鬼代言人轮次，打破单一大模型的盲目自洽。
* **安装与使用：**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 决策制定者、产品经理、战略分析师
* **解决的问题：** 强制将 AI 切换为“不留情面的反方辩友”，专门挑出用户方案中的逻辑漏洞、未明言假设与迎合（Sycophancy）倾向。

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity
* **适用人群：** 方案策划人与严肃写作者
* **解决的问题：** 启动对抗性子智能体，在方案定稿前从 8 个不同失败维度进行压力测试。

#### `[Prompt 备选] 防盲从反审问提示词`
* **类型：** `Prompt`
* **适用客户端：** 通用网页端
* **适用人群：** 准备采纳 AI 建议去执行严肃决策的用户
* **解决的问题：** 让 AI 亲手拆穿自己方案的软肋，指出人类绝不能甩锅的责任。

#### 🛑 人类决策的“不可让渡底线”
* **医疗诊断与用药处方**：严禁在没有执业医师独立复核的情况下直接按 AI 指导采取行动。
* **具有法律效力的合同签署与合规背书**：AI 不能作为法定合规责任人。
* **人员考核、解雇与直接奖惩决定**：不可将针对具体个人的负面决定完全交由算法处理。
* **单信源新闻发布**：严禁仅依据 AI 对话结果便作为独家信源对外发布事实报道。

---

### 4. 输出能不能直接发布？
*拒绝隐瞒 AI 介入痕迹，避免学术不端与诚信缺失，保留合规审计凭证。*

#### [`ai-provenance`](https://github.com/noheton/f-ai2-r)
* **类型：** `SKILL.md`
* **适用客户端：** Antigravity, Cursor, Claude Code
* **适用人群：** 科研学者、调查记者、开源维护者、写作者
* **解决的问题：** 自动记录人机协作轨迹（模型版本、提示词哈希、工具调用与验证状态），并从中推导出可信的人类可读 AI 使用披露说明。
* **安装与使用：**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`vertu-seo-publish-gate`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **类型：** `SKILL.md`
* **适用客户端：** Antigravity, Cursor, Claude Code
* **适用人群：** 编辑部、品牌出版团队、内容审核组
* **解决的问题：** 对 AI 草稿执行 PASS/FIX/BLOCK 硬性发布门禁。编写与审校智能体被物理剥夺直接发布权限，必须依赖外部独立的人类授权回执。
* **安装与使用：**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git
  cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`visible-ai-disclosure-pr-gate`](https://github.com/harlan-zw/harlan-agent-kit)
* **类型：** `SKILL.md`
* **适用客户端：** Claude Code, Antigravity, Cursor
* **适用人群：** 开源项目维护者、技术写作者、日常提交 PR 的开发者
* **解决的问题：** 将 AI 披露做成代码提交与 PR 的机器强制门禁。在撰写说明时强制嵌入透明声明，声明若被删改则直接拒绝执行发布命令。
* **安装与使用：**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git
  cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`awesome-copilot/gdpr-compliant`](https://github.com/awesome-copilot/skills)
* **类型：** `SKILL.md`
* **适用客户端：** GitHub Copilot, Claude Code
* **适用人群：** 开发者、合规审计员
* **解决的问题：** 记录代码与文本的生成轨迹与数据来源，为机构出具可信审计日志，明确人机贡献界限。

#### `[Prompt 备选] AID/CRediT 标准 AI 使用披露声明生成器`
* **类型：** `Prompt`
* **适用客户端：** 通用网页端
* **适用人群：** 论文写作者、报告起草人、媒体从业者、学生
* **解决的问题：** 依照学术界与专业出版规范，生成透明合规的 AI 使用声明（AI Disclosure Statement）。

---

## ⚡ 日常 AI 负责任使用 30 秒核对清单

建议将此清单常驻在你的办公屏幕旁，在每次与 AI 交互时对照自检：

| 交互阶段 | 自问的一句话 | 负责任的实操动作 |
| :--- | :--- | :--- |
| **发送输入前** | *“如果把这段话公开登在明天的报纸头版，我会惹上麻烦吗？”* | 如果会：立即剔除真实姓名、手机号、机密内网地址和内部未公开财务数据。 |
| **阅读回答时** | *“AI 刚才引用的论文、法条或数据，真实存在吗？”* | 在独立浏览器标签页中亲自搜索验证该 DOI 或法规原文，绝不直接采纳未验引文。 |
| **准备采纳时** | *“我是因为内容客观可信而采纳，还是因为 AI 态度礼貌自信而盲信？”* | 要求 AI 提供相反观点或失效边界，确认人类对结果承担最终责任。 |
| **对外发布前** | *“我能坦荡地向下级、读者或雇主说明 AI 在其中的参与程度吗？”* | 附带简要的 AI 使用说明，并妥善保存关键 Prompt 对话记录备查。 |

---

## 🤝 参与贡献

欢迎提交新的优质技能！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 Responsible AI Use Contributors
