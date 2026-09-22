const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '../site/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));

// 1. Replacements for the 4 broken items:
const replacements = {
  'privacy-protector': {
    id: 'pii-detection-pipeline',
    name: 'PII Detection Pipeline (mukul975/Privacy-Data-Protection-Skills)',
    url: 'https://github.com/mukul975/Privacy-Data-Protection-Skills',
    action_content: 'git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/pii-detection-pipeline ~/.claude/skills/',
    status: {
      stage: 'Production Stable',
      adoption: 'agentskills.io Verified',
      trust_source: 'Audited open-source privacy framework with 282+ skills'
    },
    timing_desc_cn: '输入前门禁：在向大模型发送对话正文与附件前，在本地运行正则与命名实体识别，拦截电话、住址与身份证号。',
    timing_desc_en: 'Pre-Ingestion Gateway: Runs automatic regex and NER classification on prompt text and attached documents before dispatching to LLMs.',
    why_chosen_cn: '遵循 agentskills.io 开源标准，在本地针对 20 类隐私数据提供自动化识别与掩码处理，杜绝私密数据外流至模型供应商。',
    why_chosen_en: 'Follows the agentskills.io standard for automated PII masking across 20 privacy categories, guaranteeing raw sensitive data is not exfiltrated to model providers.',
    summary_cn: '基于 agentskills.io 规范的本地隐私分类管道，在向上游大模型传输前自动对命名实体进行脱敏与掩码处理。',
    summary_en: 'Automated local PII classification pipeline adhering to agentskills.io spec, masking sensitive entities prior to upstream LLM transmission.'
  },
  'citation-check-skill': {
    id: 'citation-integrity-auditor',
    name: 'Citation Integrity Auditor (scdenney/open-science-skills)',
    url: 'https://github.com/scdenney/open-science-skills',
    action_content: 'git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/citation-check ~/.claude/skills/',
    status: {
      stage: 'Active Release',
      adoption: 'Open Science Skills Suite',
      trust_source: 'Empirical research workflow maintained by scdenney'
    },
    timing_desc_cn: '草稿求证阶段：在生成学术或科普草稿后，对照 Crossref、OpenAlex 等真实学术数据库逐条核验，揪出凭空捏造的假文献。',
    timing_desc_en: 'Draft Verification: Audits every in-text citation against real bibliographic databases (Crossref, OpenAlex, DataCite) to eliminate ghost references.',
    why_chosen_cn: '直击大模型最致命的“虚构文献”问题：AI 经常会一本正经地捏造看似真实的论文标题、假 DOI 和虚假期刊名。',
    why_chosen_en: 'Solves the catastrophic "Phantom Citation" problem where LLMs fabricate convincing but nonexistent papers, journal DOIs, and author lists.',
    summary_cn: '对照 Crossref 与 OpenAlex 审计文稿中的引文层，核验 DOI 解析状态，对无法查证的假文献直接标红报警，拒绝猜测。',
    summary_en: 'Audits the citation layer of manuscripts against Crossref and OpenAlex, verifying DOI resolution and flagging AI-invented sources as NOT CHECKED rather than guessing.'
  },
  'aidd-fact-check': {
    id: 'claim-source-fact-checker',
    name: 'Claim–Source Fact Checker (scdenney/open-science-skills)',
    url: 'https://github.com/scdenney/open-science-skills',
    action_content: 'git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/fact-check ~/.claude/skills/',
    status: {
      stage: 'Active Release',
      adoption: 'Open Science Skills Suite',
      trust_source: 'Claim-source consistency auditor for empirical science'
    },
    timing_desc_cn: '观点求证阶段：检查 AI 附带的参考文献是否真的支持它所说的结论，防止“挂羊头卖狗肉”式的张冠李戴。',
    timing_desc_en: 'Claim Validation: Audits whether the source cited by the AI actually supports the claims made in the sentence, stopping citation padding.',
    why_chosen_cn: '解决更隐蔽的“断章取义”缺陷：即使 AI 给出的文献真实存在，它也经常歪曲、夸大甚至颠倒原作者的实际研究结论。',
    why_chosen_en: 'Addresses the insidious "Citation Padding" failure mode: even when a real paper exists, the LLM frequently misquotes or inverts its actual scientific findings.',
    summary_cn: '比对关键断言与本地知识库源文件，检测过度断言、结论方向倒置与张冠李戴等高危幻觉。',
    summary_en: 'Verifies claims against local Markdown source files to detect overclaiming, direction inversion, scope creep, and misattribution.'
  },
  'copilot-gdpr-audit': {
    id: 'gdpr-compliance-audit',
    name: 'GDPR Compliance Audit (mukul975/Privacy-Data-Protection-Skills)',
    url: 'https://github.com/mukul975/Privacy-Data-Protection-Skills',
    action_content: 'git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/gdpr-compliance-audit ~/.claude/skills/',
    status: {
      stage: 'Production Stable',
      adoption: 'agentskills.io Standard',
      trust_source: 'Comprehensive open-source privacy audit procedures'
    },
    timing_desc_cn: '发布前门禁：在对外交付方案或产品前，依据通用数据保护条例对内容、数据采集点与用户知情权执行审计。',
    timing_desc_en: 'Pre-Publication Gate: Audits AI deliverables and data flows against GDPR Articles 5, 6, 12-23 before external release.',
    why_chosen_cn: '为即将公开发布的方案、内容或小工具提供合规审查底线，避免无意间侵犯他人个人信息权益而面临法律纠纷。',
    why_chosen_en: 'Provides an automated pre-flight checklist for publications and web applications to prevent accidental privacy violations and legal penalties.',
    summary_cn: '在上线前核查方案的数据最小化、目的限制与知情同意规范，出具审计结果与整改建议。',
    summary_en: 'Audits deliverables and workflows against GDPR articles, verifying user consent, purpose limitation, and data minimization before launch.'
  }
};

// 2. Comprehensive human-readable expansions for all 38 skills:
// Category 1: feed-to-ai
const whyCareFeedMap = {
  'pii-safe-documents': {
    why_care_cn: '普通人在让 AI 帮写自述、改简历或整理客户草案时，姓名、住址、私人细节会被直接发往云端大模型并可能变成公共训练语料。这个技能在本地把敏感词打上安全马赛克，任务完成后在本地还原，保护隐私不外泄。',
    why_care_en: 'When feeding resumes or draft contracts to AI, personal identities are uploaded to cloud servers. This skill locally redacts sensitive data and restores it afterwards, keeping private text safe.',
    how_to_use_cn: '一键复制命令将技能放入 Cursor 的 `.agents/skills/` 或 Claude Code 目录，AI 在读取指定文档前会自动先在本地生成脱敏副本。',
    how_to_use_en: 'Copy the command to clone into your client skills directory. The agent automatically creates an isolated local redacted working copy before reading files.'
  },
  'scholar-safety': {
    why_care_cn: '学者或学生使用 AI 辅助统计未发表的调查问卷、实验数据时，若不慎将受伦理保护的原始数据上传至公共大模型，可能违反学术伦理甚至吃官司。该技能确保敏感数据只在本地跑代码计算，绝不上传云端。',
    why_care_en: 'Uploading restricted research transcripts or IRB-governed survey data to commercial LLMs violates ethics policies. This skill forces local-only analysis without cloud data transmission.',
    how_to_use_cn: '安装到 Claude Code 或 Antigravity 中，在向智能体下达数据分析指令前自动拦截未授权文件的联网读取。',
    how_to_use_en: 'Install into Claude Code. When issuing data analysis instructions, the agent intercepts restricted files and processes them via local scripts.'
  },
  'skill-sanitizer': {
    why_care_cn: '许多人喜欢在网上下载别人的“AI 提示词插件”或“快捷技能”，但其中可能夹带了恶意木马或偷偷把你的电脑文件传给黑客的代码。这个技能就像防病毒软件，在加载任何新技能前先进行安全排毒。',
    why_care_en: 'Third-party agent skills downloaded online can hide prompt injections or malicious telemetry. This scanner inspects incoming skills like an antivirus before execution.',
    how_to_use_cn: '安装后，当你想从外部引入新的技能包时，运行此技能自动扫描目标文件夹中的安全漏洞与恶意提权指令。',
    how_to_use_en: 'Run this skill before adding new skills to your agent. It scans instruction files for command injection and suspicious telemetry.'
  },
  'pii-shield': {
    why_care_cn: '日常跟 AI 聊天时，人们经常顺手粘贴了工作邮箱、手机号或内网地址。该技能利用轻量级本地模型在发送前拦截个人标识，避免商业大模型“记住”你的私人联系方式。',
    why_care_en: 'Users routinely paste emails, phone numbers, or passwords into chat prompts. PII-Shield intercepts and masks personal identifiers locally before upstream API transmission.',
    how_to_use_cn: '作为本地代理或钩子安装，对话发送前自动匹配手机号、邮箱、身份证号并替换为无害占位符。',
    how_to_use_en: 'Install as a local hook to automatically detect and replace telephone numbers, emails, and credentials with safe placeholders.'
  },
  'pii-detection-pipeline': {
    why_care_cn: '当使用 AI 整理长篇会议记录或访谈录音时，人工挑选敏感信息极其耗时。此工具基于国际规范自动分类和批量脱敏 20 类隐私数据，为普通人提供企业级的隐私防火墙。',
    why_care_en: 'Manually sanitizing hours of meeting notes or transcripts is tedious. This standardized pipeline classifies and masks 20 privacy categories automatically.',
    how_to_use_cn: '克隆技能目录至客户端，处理长文档时指令呼叫该技能，自动完成批量脱敏并生成脱敏映射表。',
    how_to_use_en: 'Clone to your skills directory and invoke during document ingestion to batch-mask personal identifiers using standard NER pipelines.'
  },
  'presidio-doc-anonymizer': {
    why_care_cn: '微软官方开源的成熟脱敏引擎（Presidio），经受过全球众多专业机构检验。普通人无需高深技术，也能借此在本地安全处理 PDF、Word 文档，避免商业公司窥探个人文档。',
    why_care_en: 'Powered by Microsoft Presidio, this battle-tested tool lets everyday users anonymize Word and PDF files locally with proven NLP accuracy.',
    how_to_use_cn: '执行安装命令并在本地准备好 Python 环境，处理文档前调用即可在本地生成脱敏后的清洁文档。',
    how_to_use_en: 'Install via provided command. Run against your working documents to produce anonymized versions before sharing with cloud models.'
  },
  'trustboost-pii-sanitizer': {
    why_care_cn: '普通人通常无法分辨哪些商业大模型厂商签署了“不拿用户数据做训练”的协议。这个工具采用“默认全部不可信”策略，在本地就抹除痕迹，不管云端怎么换厂商都高枕无忧。',
    why_care_en: 'Everyday users cannot monitor whether upstream LLM vendors uphold privacy promises. TrustBoost enforces zero-trust redaction on your own computer.',
    how_to_use_cn: '放置于客户端技能目录，在处理涉及商业报价或用户名单的表格前激活，自动生成匿名占位符。',
    how_to_use_en: 'Add to client skills folder. Activate before analyzing client lists or invoices to substitute real data with anonymized tokens.'
  },
  'openmed-clinical-ingestion': {
    why_care_cn: '许多患者或家属习惯把医院检查报告、病历拍照发给大模型询问病情。病历属于最敏感的特种个人隐私，这个技能在本地隔离临床记录，剔除患者姓名与住院号后再向 AI 求证医疗常识。',
    why_care_en: 'Patients frequently paste diagnostic scans into AI for second opinions. This skill strips patient medical record numbers and names locally before consulting models.',
    how_to_use_cn: '导入客户端后，在输入任何化验单或病历文本时激活，它会自动过滤姓名、就诊卡号和医院床位信息。',
    how_to_use_en: 'Activate before analyzing clinical lab reports or medical history to guarantee that personal health records remain unlinked to your online identity.'
  },
  'claude-hook-redactor': {
    why_care_cn: '针对 Claude Code 桌面端工作流的底层门禁。普通人哪怕不小心在终端按了回车，底层的钩子也会在网络请求发出的前一毫秒强行拦截脱敏，避免“手滑”泄密。',
    why_care_en: 'A low-level gate for Claude Code users. Even if you accidentally send confidential passwords or keys in chat, this hook intercepts before transmission.',
    how_to_use_cn: '将 Gist 中的配置脚本添加到本地 `.claude/config`，终端会自动在每次提示词发出前执行脱敏过滤。',
    how_to_use_en: 'Add the hook script to your `.claude` configuration to enable zero-friction, automated pre-flight filtering on every command.'
  },
  'presidio-anonymize-text': {
    why_care_cn: '专注短文本与日常聊天提示词脱敏。普通人复制微信聊天、邮件往来给 AI 做摘要时，几秒钟内就能在本地把人名和公司名换成“张某某”、“某企业”，彻底斩断数据溯源链。',
    why_care_en: 'Designed for quick chat snippets and emails. It replaces person names and company entities with generic aliases in seconds before ingestion.',
    how_to_use_cn: '通过提供的安装命令配置到 Cursor 或 Claude，在日常分析邮件或对话记录时自动调用。',
    how_to_use_en: 'Install into Cursor or Claude. Use it when summarizing email threads to replace actual colleagues and companies with safe aliases.'
  }
};

// Category 2: answers-to-trust
const whyCareAnswersMap = {
  'post-generation-fact-check': {
    why_care_cn: '大模型非常擅长用极其自信和权威的口吻胡说八道。普通人如果直接拿去发朋友圈、做决策或写作业，很容易闹笑话。这个技能在 AI 输出后启动“侦探模式”，逐句拆解断言并寻找反证。',
    why_care_en: 'LLMs sound supremely confident even when completely wrong. This skill puts AI into detective mode after drafting, verifying claims against external sources.',
    how_to_use_cn: '在 AI 生成长篇文章或报告后呼叫该技能，它会提取文中的事实性判断并生成真伪核查报告。',
    how_to_use_en: 'Invoke after generating draft articles. It isolates factual assertions and audits them against live web sources.'
  },
  'citation-faithfulness-checker': {
    why_care_cn: 'AI 经常会给出看似高大上的学术引文，但里面的刊期、卷号、作者往往错漏百出。该技能连接专业学术文献库，确认论文不仅存在，而且页码和发表年份完全真实。',
    why_care_en: 'AI frequently makes subtle errors in volume numbers and author lists. This checker queries academic registries to verify exact citation accuracy.',
    how_to_use_cn: '在生成学术性段落后触发，技能会自动抽取文中所有括号引文并在学术库中做匹配校验。',
    how_to_use_en: 'Trigger after writing research sections. It verifies that every in-text citation correctly matches real indexing data.'
  },
  'bibref-verify': {
    why_care_cn: '写论文时最头疼的就是文末参考文献列表。该工具自动比对每篇文献的真实 DOI，杜绝因为 AI 捏造文献而导致整篇毕业设计或期刊投稿被直接拒稿。',
    why_care_en: 'Fabricated references can get academic papers instantly rejected. BibRef automatically resolves DOIs to guarantee every entry is genuine.',
    how_to_use_cn: '把导出的参考文献文件或正文交给技能，它会自动返回哪些文献真实可查，哪些文献属于疑似幻觉。',
    how_to_use_en: 'Feed reference lists to the skill to receive a line-by-line verification table highlighting any unresolvable citations.'
  },
  'citation-integrity-auditor': {
    why_care_cn: '普通学生或写作者很容易被 AI 生成的“虚构文献”坑害，导致职业声誉受损。该技能逐条核对全球学术数据库，查不到就明确标红“无法核实”，绝不自欺欺人。',
    why_care_en: 'Students and writers risk severe credibility hits when using fabricated citations. This auditor queries Crossref/OpenAlex and refuses to guess.',
    how_to_use_cn: '在起草学术或科普文稿后呼叫，它会输出清晰的引文核验清单，标明每一条引文的真实 DOI 与收录库。',
    how_to_use_en: 'Invoke during drafting to generate an audit receipt with exact DOI resolution states and database citations.'
  },
  'citation-verifier': {
    why_care_cn: '大学教授团队开源的经典文献核验工具。不仅核查文献有没有，还会把每一篇文献的真实摘要调出来给你比对，让你心里有底。',
    why_care_en: 'Created by academic practitioners, this skill not only confirms paper existence but fetches real publication abstracts for human review.',
    how_to_use_cn: '安装到 Emacs/Cursor/Claude 中，一键验证整篇 Markdown 或 LaTeX 的引文真实性。',
    how_to_use_en: 'Install into your agent workspace to audit citations across Markdown or LaTeX manuscripts.'
  },
  'claim-source-fact-checker': {
    why_care_cn: 'AI 极具欺骗性的一点在于：给了一个真实存在的知名论文，但论文结论明明说“无效果”，AI 却断言“非常有效”。这个技能比对句子与真实原文，防止张冠李戴。',
    why_care_en: 'An AI might cite a real study while inverting its conclusions. This skill compares claims against actual source text to stop misattribution.',
    how_to_use_cn: '在让 AI 产出研究综述时运行该技能，它会检查关键断言是否真正得到了参考文献的直接支撑。',
    how_to_use_en: 'Run on AI summaries to audit whether cited documents actually prove the claims asserted in your draft.'
  },
  'editorial-fact-check-protocol': {
    why_care_cn: '资深编辑团队沉淀的事实核查流程。普通写作者拿它来审查商业软文或科普文章，能够有效避免把谣言和过时数据当做新闻传播。',
    why_care_en: 'Editorial journalism workflow that stops outdated figures and online rumors from creeping into published articles.',
    how_to_use_cn: '将 Gist 中的协议加载至客户端，AI 生成文章后会自动按新闻级事实标准执行多方交叉验证。',
    how_to_use_en: 'Load the protocol from Gist to subject AI writing to rigorous multi-source journalistic verification.'
  },
  'hallucination-risk-reviewer': {
    why_care_cn: '在普通人看来，AI 说的每一句话都“看起来很有道理”。这个技能专门挑刺：给输出文字做“幻觉风险评级”，把缺乏可靠证据的猜测句一一标记出来提醒你。',
    why_care_en: 'AI prose always looks fluent and plausible. This reviewer scores text for hallucination risk and flags unsupported assertions.',
    how_to_use_cn: '文章写完后呼叫该技能，AI 会扮演挑剔的审核员，将文中存疑、绝对化但无依据的措辞逐一圈出。',
    how_to_use_en: 'Call the reviewer after drafting to get an annotated copy highlighting statements with high hallucination likelihood.'
  },
  'vectara-hallucination-corrector': {
    why_care_cn: '基于权威的幻觉评估模型（HHEM），通过严谨的数学算法比对 AI 的回答与原始参考资料。普通人不用自己肉眼苦找，机器自动标出哪里偏离了事实。',
    why_care_en: 'Utilizes Vectara’s proven HHEM evaluation model to mathematically score and correct factual drift against reference materials.',
    how_to_use_cn: '安装后，当智能体基于你上传的资料回答问题时，技能自动计算两者间的一致性得分并纠偏。',
    how_to_use_en: 'Install into agent client. Automatically compares generated summaries against provided context documents to score faithfulness.'
  },
  'kdense-peer-review': {
    why_care_cn: '把严肃科学期刊的“同行评审”标准搬到日常生活中。无论是分析健康饮食指南还是商业方案，它都能以极高标准检验逻辑漏洞，防止被伪科学忽悠。',
    why_care_en: 'Brings scientific peer review rigor to everyday documents, exposing pseudo-scientific claims and methodological flaws.',
    how_to_use_cn: '在产出研究提案或分析报告后调用，技能会模仿顶刊评审专家提出尖锐质疑与补证要求。',
    how_to_use_en: 'Invoke on research proposals to receive structured peer-review feedback identifying weak evidence and logical gaps.'
  }
};

// Category 3: when-not-to-listen
const whyCareListenMap = {
  'the-fool': {
    why_care_cn: '大模型有极其严重的“讨好型人格”（Sycophancy）：你提出一个错误的荒谬想法，它也会顺着你夸赞。这个技能扮演“皇帝新衣里的诚实小丑”，专挑你方案里的致命盲点开火。',
    why_care_en: 'LLMs are chronic people-pleasers that validate bad ideas. "The Fool" breaks sycophancy by bluntly exposing your blind spots.',
    how_to_use_cn: '在做重要商业决定或设计方案时激活，强迫 AI 放弃谄媚迎合，专门挑错和反问。',
    how_to_use_en: 'Activate during strategic brainstorming. The agent ceases agreeable validation and attacks your proposal’s weakest assumptions.'
  },
  'sycophancy-challenger': {
    why_care_cn: '很多人误以为 AI 赞同自己的观点就代表自己是对的。这个工具主动阻断 AI 的赞同模式，强制要求 AI 寻找反例和反驳证据，帮普通人守住独立批判思考。',
    why_care_en: 'Users mistake AI agreement for objective validation. This challenger forces the model to construct contrary arguments.',
    how_to_use_cn: '安装到 Claude Code 或 Cursor 中，向 AI 阐述观点后要求其展开“反身性质疑”。',
    how_to_use_en: 'Install into your workspace. Instruct the agent to challenge your perspective with empirical counterexamples.'
  },
  'council-review-dmad': {
    why_care_cn: '一个人向同一个 AI 提问很容易陷入思维定势。该技能模拟一个“多方专家陪审团”：保守派、激进派、风控官同时发难，防止你只听信单一大模型的偏听偏信。',
    why_care_en: 'Relying on a single AI voice creates narrow echo chambers. Council Review simulates a multi-agent adversarial board to challenge assumptions.',
    how_to_use_cn: '输入方案后呼叫技能，系统会拆解为多个对立视角轮番质询，最后汇总风险清单。',
    how_to_use_en: 'Run on complex proposals to trigger a multi-perspective review uncovering regulatory, financial, and ethical risks.'
  },
  'devils-advocate-orange2ai': {
    why_care_cn: '在买房、择业、投资等重大生活决策前，不要只让 AI 帮你找优点。魔鬼代言人技能会专门列出最坏情况和可能踩坑的隐形陷阱，帮你冷静踩刹车。',
    why_care_en: 'Before life-altering decisions (investing, career moves), Devil’s Advocate stresses worst-case failure scenarios.',
    how_to_use_cn: '在方案敲定前调用，技能会强制输出三条最可能导致项目彻底失败的致命隐患。',
    how_to_use_en: 'Invoke prior to final sign-off to generate three catastrophic failure vectors you must defend against.'
  },
  'devils-advocate-mad-skills': {
    why_care_cn: '专门用于打破代码架构和日常执行中的“自动化偏见”。普通人容易盲信 AI 写出来的代码很完美，该技能逼迫 AI 假设代码已经在生产环境中崩溃并反推原因。',
    why_care_en: 'Overcomes automation bias in programming and writing by performing a pre-mortem on proposed solutions.',
    how_to_use_cn: '在采纳 AI 提供的技术路线前运行，智能体将进行事前尸检（Pre-mortem）分析。',
    how_to_use_en: 'Run before accepting architectural designs to simulate catastrophic edge cases and concurrency bugs.'
  },
  'godfly-opposing-counsel': {
    why_care_cn: '普通人在写申诉信、物业维权或商务谈判草稿时，很容易视角单一。这个技能模拟“对方律师”，专门从对方利益出发找你文书里的漏洞，大幅提升你的维权胜算。',
    why_care_en: 'When drafting grievances or negotiation points, users have blind spots. This skill acts as opposing counsel to poke holes in your claims.',
    how_to_use_cn: '起草完诉求书后运行，AI 会以最刻薄的控方律师口吻列出你的证据软肋。',
    how_to_use_en: 'Run against negotiation drafts. The agent analyzes your prose from an adversary’s stance to spot legal and evidential weaknesses.'
  },
  'devils-advocate-reviewer': {
    why_care_cn: '学术或职场汇报前最好的自测帮手。它假想你的导师或苛刻老板在找茬，提前指出哪些论述缺乏说服力，避免你在正式答辩时被问倒。',
    why_care_en: 'The ultimate rehearsal tool before presentation. It simulates a skeptical boss or thesis committee finding gaps in your narrative.',
    how_to_use_cn: '在汇报 PPT 或草稿完成后激活，AI 会逐条给出“答辩攻防问答集”。',
    how_to_use_en: 'Activate on finished slide outlines or draft papers to generate defensive Q&A pairs for tough reviewers.'
  },
  'red-team-review': {
    why_care_cn: '红蓝对抗（Red Teaming）原本是网络安全特种技术，该技能将其简化为普通人可用的红队审查。让你在做重要决策前先经受一次极限压力测试。',
    why_care_en: 'Democratizes cybersecurity red-teaming for everyday decisions, subjecting strategic proposals to adversarial stress testing.',
    how_to_use_cn: '将技能作为审核节点，它会假设黑客或竞争对手如何利用你的方案缺陷进行攻击。',
    how_to_use_en: 'Apply to operational plans to audit how bad actors could exploit policy ambiguities or technical flaws.'
  },
  'anti-sycophancy-molly': {
    why_care_cn: '直面大模型为了讨好用户而牺牲事实真相的顽疾。该技能为 AI 注入“实话实说”的底层戒律，即使现实很残酷也绝不给普通人灌迷魂汤。',
    why_care_en: 'Injects persistent guardrails that forbid pleasant falsehoods, demanding honest evaluation of feasibility and budget.',
    how_to_use_cn: '配置到系统指令中，所有对话在得出乐观结论前必须先经过严格可行性审查。',
    how_to_use_en: 'Add to agent system prompt to force rigorous feasibility checks before any affirmative conclusions.'
  }
};

// Category 4: can-publish-directly
const whyCarePublishMap = {
  'ai-provenance': {
    why_care_cn: '别人问你“这篇文章到底是不是 AI 写的”时，空洞的辩解毫无意义。该技能为你生成完整的证据链时间戳，证明哪些文字是你的原创思考，哪些仅由 AI 润色，保障个人原创声誉。',
    why_care_en: 'When accused of AI cheating, vague denials fail. This skill records model hashes and human editing timestamps to prove genuine authorship.',
    how_to_use_cn: '写作过程中开启，在完成时一键导出包含版本演进与人机分工说明的防篡改证明文件。',
    how_to_use_en: 'Run during drafting to generate an immutable provenance receipt detailing human inputs vs AI assistance.'
  },
  'vertu-seo-publish-gate': {
    why_care_cn: '如今各大搜索引擎和内容平台严厉打击粗制滥造的纯 AI 垃圾内容。这个技能在公开发布前设置质检把关，过滤掉典型的 AI 八股文套话，防止你的网站被降权封禁。',
    why_care_en: 'Search engines aggressively penalize low-quality AI spam. This gate checks readability, factual density, and eliminates robotic filler.',
    how_to_use_cn: '文章发布前运行质检命令，技能会自动扫描段落空泛度并给出修改建议。',
    how_to_use_en: 'Run prior to publishing to audit human value-add, readability grade, and robotic phrase elimination.'
  },
  'visible-ai-disclosure-pr-gate': {
    why_care_cn: '在 GitHub 提交代码或向团队提 PR 时，偷偷用 AI 写出有 bug 的代码会被同行视为不负责任。该技能自动规范地生成披露标签，清晰告知协作者“哪些部分使用了 AI 辅助并已人工验证”。',
    why_care_en: 'Submitting unvetted AI code to open-source projects causes resentment. This skill generates transparent disclosures of AI contributions.',
    how_to_use_cn: '作为 Git 提交流程的一部分，自动在 PR 描述中附加规范的 AI 使用声明与测试记录。',
    how_to_use_en: 'Integrate with Git hooks to automatically attach an auditable AI disclosure table to your pull request.'
  },
  'gdpr-compliance-audit': {
    why_care_cn: '你在网上发布的小程序、问卷或商业分析报告，如果不小心包含了收集他人隐私的缺陷，可能会带来侵权风险。这个技能在交付前帮你扫描内容，确认没有违规采集行为。',
    why_care_en: 'Releasing tools or surveys with privacy flaws creates liability. This skill audits your deliverable against GDPR rules before launch.',
    how_to_use_cn: '在项目完成交付前，运行该技能对代码或发布方案进行全项审计，生成合规评估与修正清单。',
    how_to_use_en: 'Run prior to project handoff to perform a complete compliance review and generate remediation recommendations.'
  },
  'publish-prep-review': {
    why_care_cn: '给内容创作者的最后一道防火墙。检查文中的图片版权、外部链接有效性以及敏感话题词汇，确保发到知乎、微信公众号或博客上的内容合规且安全。',
    why_care_en: 'Final checkpoint for writers: verifies external links, image rights, and sensitive topics before publishing to public channels.',
    how_to_use_cn: '文章完稿后一键审查，输出排版瑕疵、失效链接与敏感词预警列表。',
    how_to_use_en: 'Trigger on final drafts to catch dead URLs, missing asset credits, and high-risk regulatory terms.'
  },
  'ai-attribution-framework': {
    why_care_cn: '符合学术出版（如 Nature、Elsevier 等）与国际标准的 AI 贡献度声明生成器。按国际通用的 CRediT 标准准确标注 AI 到底参与了“文法润色”还是“代码推导”，合规透明。',
    why_care_en: 'Generates standard AI usage disclosures complying with academic publisher guidelines (Nature, Elsevier, CRediT taxonomy).',
    how_to_use_cn: '输入你在研究各阶段对 AI 的使用情况，技能自动生成符合期刊要求的双语披露声明段落。',
    how_to_use_en: 'Answer prompt prompts about AI involvement to produce publisher-compliant disclosure paragraphs.'
  },
  'ai-disclosure-convention': {
    why_care_cn: '像开源许可证（如 MIT、Apache）一样标准化的机器可读声明规范。为你的项目打上透明徽章，让任何第三方工具都能自动解析你对 AI 的使用边界。',
    why_care_en: 'SPDX-style machine-readable metadata format declaring AI tools used, licensing, and human validation status.',
    how_to_use_cn: '在代码库或文档根目录生成 `AI-DISCLOSURE.md` 标准文件，供第三方自动化审计工具抓取。',
    how_to_use_en: 'Run the generator to create an `AI-DISCLOSURE.md` manifest in your repository root.'
  },
  'skill-provenance-tracker': {
    why_care_cn: '跟踪整个对话过程中 AI 到底调用了哪些外部技能和脚本。避免某些隐藏技能在后台静默修改了你的本地文件，让每一步操作都清晰有账可查。',
    why_care_en: 'Logs all tool invocations and skills executed during a session, creating an immutable audit trail of automated actions.',
    how_to_use_cn: '智能体工作时常驻后台，任务结束后生成一份完整的技能调用清单与变更记录。',
    how_to_use_en: 'Enable alongside your agent to generate a session receipt documenting every tool executed.'
  },
  'claude-session-audit': {
    why_care_cn: '当你需要把 AI 辅助完成的工作向上级领导、客户或审计员汇报时，把冗长嘈杂的完整会话浓缩为精炼易读的“合规审计凭据”，既保护商业机密，又让成果 100% 可被复核。',
    why_care_en: 'Condenses messy multi-turn conversations into clean, verifiable audit receipts suitable for client handoffs and compliance audits.',
    how_to_use_cn: '完成重要项目后，调用技能从会话中提取关键提示词、推理节点与证据链，导出 PDF/Markdown 交付包。',
    how_to_use_en: 'Call after completing key tasks to extract prompt milestones, verification points, and outputs into a clean report.'
  }
};

const allWhyCare = {
  ...whyCareFeedMap,
  ...whyCareAnswersMap,
  ...whyCareListenMap,
  ...whyCarePublishMap
};

// 3. Update the items array
const updatedItems = items.map((item, idx) => {
  // Check if replacement exists
  let updated = replacements[item.id] ? { ...item, ...replacements[item.id] } : { ...item };

  // Attach human-readable expansion fields
  const care = allWhyCare[updated.id] || {
    why_care_cn: '保护普通人在使用 AI 时的隐私安全与知情权，避免盲目信任虚假幻觉，确保成果在交付时有据可查。',
    why_care_en: 'Protects everyday users against data harvesting, hallucinated errors, and unverifiable outputs.',
    how_to_use_cn: '复制安装命令至客户端目录，在相应场景下即可自动触发或手动调用。',
    how_to_use_en: 'Clone the skill into your client workspace and invoke it during the appropriate workflow stage.'
  };

  updated.why_care_cn = care.why_care_cn;
  updated.why_care_en = care.why_care_en;
  updated.how_to_use_cn = care.how_to_use_cn;
  updated.how_to_use_en = care.how_to_use_en;

  return updated;
});

fs.writeFileSync(itemsPath, JSON.stringify(updatedItems, null, 2), 'utf-8');
console.log(`Successfully enriched all ${updatedItems.length} items with why_care and how_to_use, and replaced 4 broken URLs.`);
