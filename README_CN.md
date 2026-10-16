# Awesome Responsible AI Skills (负责任与安全使用 AI 技能精选与实务指南) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![精选技能数](https://img.shields.io/badge/精选技能-44%20项-8a2be2.svg)](https://rai.putongren.org/library.html) [![真实司法判例](https://img.shields.io/badge/司法与监管案例-31%20起-rose.svg)](https://rai.putongren.org/incidents.html) [![规范标准](https://img.shields.io/badge/规范格式-SKILL.md-success.svg)](https://agentskills.io) [![链接健康度](https://img.shields.io/badge/开源可达性-44%2F44%20全部存活-brightgreen.svg)](#-运行状态与实证指标评定说明) [![社区共建](https://img.shields.io/badge/共建社区-普通人的数字权利-orange.svg)](https://putongren.org)

> 一个面向日常知识工作者、高校师生、软件开发者、文案创作者与企业行政人员的实战安全指南与开源工具箱。收录 **44 个成熟开源 `SKILL.md` 规范技能** 与 **31 起中外权威司法与监管实案**。本项目致力于帮助每位普通使用者在日常使用 AI 时做好关键把关：**对内防范敏感数据隐蔽采集、提示词注入与盲信依附，对外构建可溯源核验的合规证据链**。

[English Version](README.md) | **中文版** | 📖 [阅读实务长篇指南 (Field Guide)](https://rai.putongren.org/) | 🛡️ [在线实务技能库 (Library)](https://rai.putongren.org/library.html) | ⚖️ [真实判例与案例库 (Incidents)](https://rai.putongren.org/incidents.html)

---

## 🌟 项目生态：三位一体实操架构

本项目拒绝停留在抽象空泛的道德倡议层面，而是为广大日常使用大语言模型与智能体 IDE 的普通人提供了一套**可落地、可检索、有法可依的三位一体实战平台**：

* 📖 **[实务长篇指南 (Field Guide)](https://rai.putongren.org/)**（*网站首页 / `site/index.html`*）：
  深度叙事长篇指南。系统解构算法时代的平民处境（数据主权剥夺、自信幻觉与认知依附），建立平台防留存基线，提供 30 秒安全速查，并通过 **6 大核心工作流场景**（涵盖平台防静默留存、Agent 执行沙盒隔离、法定发布门禁等）串联全量 44 项技能，行文内嵌交互式技能药丸与 5 大角色的一日安全工作流。

* 🛡️ **[实务技能库 (Skill Library)](https://rai.putongren.org/library.html)**（*交互技能库 / `site/library.html`*）：
  开箱即用的交互式技能筛选与搜索平台。收录 **44 项严格审核的成熟开源规范技能**，按 4 大实务追问与 4 大时序分类，去除了未经验证的“通用兼容”宣传，真实标注客户端依赖与原生安装指令，支持一键复制代码。

* ⚖️ **[真实判例与案例库 (Incident Database)](https://rai.putongren.org/incidents.html)**（*案例平台 / `site/incidents.html`*）：
  收录 **31 起真实发生的中外司法判例、行政监管处罚与官方安全通报**（包含北京互联网法院 AI 声音权侵权案、最高法指导案例、通州法院 AI 捏造假案号当庭训诫、厦门/济南市监局 AI 虚假广告顶格行政处罚、企事业单位涉密文件违规投喂模型处分通报等）。每个案例均严格核对权威案号、当事人抗辩、裁判依据与防御对策，打破“AI 翻车离我很远”的侥幸心态。

* 💻 **[GitHub 开源主仓库](https://github.com/digitalrightsforall/guide_responsible_AI_use)**（*本仓库*）：
  严谨的数据中心与工程源泉。托管规范化的技能数据集（`site/data/items.json`）、案例数据集（`site/data/incidents.json`）、严格的自动化测试质检门禁（`scripts/`）以及双语文档生成引擎。

---

## 💡 核心理念：负责任与安全使用 AI 的当下实务内核（动态演进框架）

本项目由[**「普通人的数字权利」共创社区 (putongren.org)**](https://putongren.org)发起，致力于帮助每一个人在机器与算法时代守护个人数字权利与尊严。

宏观层面的 AI 伦理倡议（如“以人为本”、“公平透明”）往往无法解决普通人在输入框或命令行面前的具体困惑：“这篇未公开底稿能不能喂？”、“这个判例和引文是不是 AI 编造的？”、“这段文案直接发会不会触犯广告法被罚款？”。本项目精选开源生态中经过验证的实用工具，将负责任与安全使用 AI 的实务内涵拆解为两大核心维度：

1. **🛡️ 对内·自我防护与边界**：
   - **防范数据隐蔽采集与马赛克拼图**：警惕商业大模型通过晦涩协议，将你的日常对话、未公开草稿、私有源码或敏感个案当做免费语料静默采集，坚决在本地筑牢数据边界，阻断准标识符拼凑画像。
   - **打破自信幻觉与谄媚**：警惕 AI 极度自信地伪造事实或为了取悦人类而放弃客观性，通过多方比对与交叉质询，坚守人类的独立审校本能与终审决策权。
   - **Agent 越权与破坏性操作隔离**：通过沙盒隔离与命令门禁，限制自主智能体越权读写本地文件系统或执行不可逆删除。

2. **📐 对外·成果第三方可核验**：
   - **主动附带实证链条**：当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，让同事、读者、雇主或法庭能够轻松核查，而非给出一纸空洞的形式化免责声明。
   - **硬性发布门禁**：通过广告法绝对化用语核查、SPDX 开源协议合规、代码密钥扫描、Web 无障碍审计等法定与行业标准门禁，阻断违规成果流出。

> [!NOTE]
> 这一实务框架将随着模型能力与应用形态的演进保持持续更新。

---

## 🧭 四大核心实务问题导航

我们将负责任与安全使用 AI 归结为日常最直接的**四大实务追问**。全量 44 项开源规范技能已系统收录在我们的在线交互平台中：

| 实务问题 | 核心自卫威胁与实务内涵 | 包含技能 | 在线交互入口 |
| :--- | :--- | :---: | :--- |
| **1. 我能把什么给 AI？** | 防范商业模型对未公开草案、敏感信息与个人身份数据的过度采集；阻断间接提示词注入 | **11 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#feed-to-ai) |
| **2. 哪些回答能信？** | 核查虚构引文（DOI 查真伪）、捏造数据与高度自信的事实性幻觉 | **10 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#answers-to-trust) |
| **3. 什么时候不能听 AI？** | 防范模型的谄媚迎合（Sycophancy）与盲目顺从，打破自动化偏见，保持批判性求证 | **10 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#when-not-to-listen) |
| **4. 输出能不能直接发布？** | 执行广告合规核查、开源协议审计、硬编码凭证扫描与数字无障碍检查 | **13 项** | [👉 前往技能库检索筛选](https://rai.putongren.org/library.html#can-publish-directly) |

> 🌟 **欢迎体验完整的在线三位一体平台**：
> - 📖 **[阅读《实务指南》 (Field Guide)](https://rai.putongren.org/)**：6 大真实工作流场景深度推演，行文内嵌微卡片原地交互。
> - 🛡️ **[探索《实务技能库》 (Skill Library)](https://rai.putongren.org/library.html)**：实时搜索、分类过滤、查阅各技能的真实客户端适配标签，一键复制终端安装命令。
> - ⚖️ **[查阅《真实判例与案例库》 (Incidents)](https://rai.putongren.org/incidents.html)**：31 起权威司法判例与行政监管处罚决定，案卷案号与事实一查便知。

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

* **支持 `.agents/skills/` 规范的 Agent IDE (Cursor / Google Antigravity / Trae):**
  ```bash
  # 项目根目录自动识别
  mkdir -p .agents/skills/<skill-name>/
  ```

* **网页版 / 通用对话大模型 (ChatGPT / Claude Web / Kimi / 豆包):**
  无需安装复杂环境，读者可直接复制技能包内的核心核验规则（Prompt / Markdown 模板）作为系统指令、自定义指令（Custom Instructions）或前置约束使用。

> [!IMPORTANT]
> **必须完整拉取整个技能文件夹**：许多高质量技能内置了独立的 Python/Bash 校验脚本、正则威胁库与参考模板。绝不要只单份复制 `SKILL.md`，请始终按 [实务技能库](https://rai.putongren.org/library.html) 中各条目的安装命令完整拉取整个目录。

---

## 🔬 运行状态与实证指标评定说明

为了让每位使用者清晰了解工具的可用程度，本库废除模糊表述，将技能评定建立在透明分级指标之上：

* **🟢 开箱即用 (实测通过)**：纯提示词/规则工程规范，无外部二进制依赖，放入技能目录即可被客户端识别。核心交互流程经本地静态规则核验。
* **🟡 需配置依赖 (环境就绪)**：需在本地预装指定环境（如 Python 3.10+、SpaCy 实体库、Gitleaks 密钥扫描器等）或配置专用 API Token，具备明确的前置条件。
* **🌐 开源链接健康度**：全量 44 项技能通过自动化巡检（HTTP 2xx/3xx 可达）。
* **⚠️ 标准对齐说明**：各技能标注的 ISO/IEC、SPDX、PIPL 等标准与法规对齐，系**项目维护团队基于机制与最佳实践的技术合规映射，非官方认证机构之授权认证**。

> [!TIP]
> **初次接触？新手必看「5项免配起步清单」**：
> 1. `pii-safe-documents`（隐私与脱敏检查）
> 2. `citation-verifier`（引文真实性与DOI查伪）
> 3. `devils-advocate`（打破模型谄媚与盲从）
> 4. `visible-ai-disclosure-pr-gate`（生成内容标注与合规门禁）
> 5. `repo-security-review`（敏感凭据与代码泄漏防范）

---

## 🗂️ 代码仓库组织目录

```text
.
├── site/                       # 静态网页应用 (线上地址: https://rai.putongren.org)
│   ├── index.html              # 📖 实务长篇指南 (Field Guide)
│   ├── library.html            # 🛡️ 交互式技能库 (Skill Library)
│   ├── incidents.html          # ⚖️ 真实判例与案例库 (Incident Database)
│   ├── css/
│   │   ├── style.css           # 全站样式、排版与深色模式支持
│   │   └── tailwind.css        # Tailwind 编译打包产物
│   ├── js/
│   │   ├── layout.js           # 统一页眉导航、移动端快捷栏与页脚组件
│   │   ├── guide.js            # 指南页面逻辑、目录随动高亮与行文微弹窗
│   │   ├── library.js          # 技能库检索、过滤与详情弹窗交互
│   │   └── incidents.js        # 案例库分类检索与案卷事实弹窗交互
│   ├── data/
│   │   ├── items.json          # 全量 44 项技能核心主数据库
│   │   └── incidents.json      # 全量 31 起中外司法与监管实案数据库
│   └── sitemap.xml             # 搜索引擎索引地图
├── scripts/                    # 自动化与质检工具
│   ├── verify-data.js          # 技能 Schema 格式与数据门禁测试 (npm test)
│   ├── validate-incidents.js   # 案例数据完整性与案号合规校验门禁
│   ├── verify-remote.js        # 44 个 GitHub 链接实时存活巡检 (npm run test:remote)
│   ├── generate-readmes.js     # 自动生成中英双语 README (npm run build)
│   ├── sync-layout.js          # 全站统一 Header/Footer 模版编译同步
│   └── serve.js                # 双端口本地开发静态服务器 (npm run serve)
├── ref/                        # 深度法医学调研报告与企事业单位安全实证文献
├── CONTRIBUTING.md             # 贡献准则、Schema 规范与提交模板
├── README.md                   # 英文主文档
├── README_CN.md                # 中文主文档
└── package.json
```

---

## 🧪 本地开发与质检指令

本项目拥有严苛的自动化工程与质量守卫标准：

```bash
# 1. 执行技能 Schema 格式规范与本地规则测试
npm test

# 2. 执行真实案例库数据与案号合规校验
node scripts/validate-incidents.js

# 3. 批量并发探测 44 项技能的 GitHub 真实在线状态 (HTTP 200 巡检)
npm run test:remote

# 4. 从 items.json 与 incidents.json 全自动重新生成中英双语 README 并同步模版
npm run build

# 5. 编译打包 Tailwind CSS 样式文件
npm run build:css

# 6. 启动本地双端口热重载静态服务器
npm run serve
# 访问 http://localhost:3000 (实务指南), /library.html (技能库), 或 /incidents.html (案例库)
```

---

## 🤝 参与贡献

欢迎提交新的优质技能与真实案例！提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，严格遵循我们的**条目最小字段规范（Item Schema）**。

## 📄 开源许可证

[MIT License](LICENSE) © 2026 普通人的数字权利 (putongren.org) & Responsible AI Use Contributors
