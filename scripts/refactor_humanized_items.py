#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Refactor Chinese prose in site/data/items.json using blader/humanizer principles.
Removes:
- Not X but Y formulas (不仅...更..., 不像...而是...)
- One-line dramatic closers and slogans (筑牢防线, 守住底线, 彻底斩断)
- Pseudodeep metaphors (安全马赛克, 安全排毒, 企业级防火墙, 灌迷魂汤, 照妖镜, 泼冷水)
- Staged run-ups (很多普通人在..., 许多人喜欢在网上下载...)
- Inflated claims and marketing hype (超高人气, 卓越, 划时代, 严守红线)
- Dashes used as universal connectors
Preserves:
- All factual claims, tools, libraries, repository URLs, author names, standard codes, and schemas.
"""
import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '../site/data/items.json')

with open(DATA_PATH, 'r', encoding='utf-8') as f:
    items = json.load(f)

# Mapping of id -> revised Chinese fields
REVISIONS = {
    # 0. pii-safe-documents
    "pii-safe-documents": {
        "timing_desc_cn": "输入前运行：在将包含个人隐私的文档、访谈记录或草稿发送给模型前执行。",
        "summary_cn": "在本地生成可逆的脱敏工作副本，阻止模型直接读取原始文件，并在任务结束后在本地还原真实数据。",
        "why_chosen_cn": "将云端模型视为不可信环境，强制在本地生成脱敏副本，使模型仅接触替换后的假名文本，原始文件保留在本地。",
        "why_care_cn": "在请 AI 修改个人简历、自述或整理业务文档时，姓名、住址和联系方式等信息会被发送至服务商服务器。该技能在本地将这些识别项替换为占位符，并在分析完成后还原，避免个人隐私被上传。",
        "how_to_use_cn": "将技能复制到 Cursor 的 `.agents/skills/` 或 Claude Code 目录。在读取目标文档前，系统会自动先生成本地脱敏副本。",
        "trust_source_cn": "代码开源托管于 GitHub，经本地语法解析与目录隔离测试，脱敏与还原过程均在本地内存完成，无外部网络请求。",
        "how_aligned_zh": "按照微软 Presidio 定义的 18 类个人身份数据标准执行本地假名化，通过隔离副本避免原始文件内容被上传至云端。"
    },

    # 1. scholar-safety
    "scholar-safety": {
        "timing_desc_cn": "文件读取前：在智能体读取科研数据与未发表文档前执行本地扫描。",
        "summary_cn": "在智能体读取文件前扫描敏感标记，对受伦理审查或受控学术数据设置本地访问限制，仅允许在本地运行统计脚本，不上传正文内容。",
        "why_chosen_cn": "针对学术研究中的数据保密要求，对敏感手稿与数据表设置本地访问门禁，支持本地脚本分析，防止未公开原始数据被上传。",
        "why_care_cn": "使用 AI 统计未发表的问卷或实验数据时，若将原始记录直接发送给公有模型，容易违反知情同意协议或研究伦理要求。该技能将数据分析限制在本地环境中运行，正文不回传云端。",
        "how_to_use_cn": "安装到 Claude Code 或 Antigravity 中。在下达分析指令前，技能会拦截未授权文件的联网读取行为。",
        "trust_source_cn": "面向高校与临床研究数据合规设计，代码开源，经本地测试可拦截未经许可的文件读取指令。",
        "how_aligned_zh": "参照高校机构审查委员会（IRB）受保护数据管理要求，限制受控手稿与访谈记录仅在本地执行分析脚本，不向上游接口发送正文。"
    },

    # 2. skill-sanitizer
    "skill-sanitizer": {
        "timing_desc_cn": "安装前检查：在将第三方 SKILL.md 载入工作区或智能体前运行。",
        "summary_cn": "在智能体载入第三方 SKILL.md 之前，扫描指令文本中的提示词注入模式、高危系统命令及隐藏的网络外联请求。",
        "why_chosen_cn": "排查第三方技能中的指令注入与越权调用风险。在技能文件加载前检查其中的 Bash 命令、权限提升与环境变量读取行为。",
        "why_care_cn": "从公开仓库下载的提示词模板或扩展技能，可能包含隐蔽的系统提权命令或外发本地凭证的指令。该技能在导入新技能前进行静态语法扫描，指出其中的可疑行为。",
        "how_to_use_cn": "导入外部技能包时运行该技能，指定目标技能目录进行静态特征与提权指令扫描。",
        "trust_source_cn": "属于 AgentSkills 规范生态工具，采用本地正则表达式与启发式匹配规则，经已知提示词注入样本测试可正常告警。",
        "how_aligned_zh": "依据 OWASP LLM06 敏感信息泄露防护标准，在加载外部技能指令时进行静态过滤，识别并剔除尝试读取环境变量与本地密钥的载荷。"
    },

    # 3. pii-detection-pipeline
    "pii-detection-pipeline": {
        "timing_desc_cn": "输入前门禁：在向大模型发送对话文本和附件前，在本地运行实体识别与脱敏。",
        "summary_cn": "基于本地自然语言处理管道，在向上游大模型传输前识别 20 类隐私数据实体并进行掩码替换。",
        "why_chosen_cn": "基于开源组件在本地识别并替换 20 类隐私实体，阻断个人身份数据直接传输给模型服务商。",
        "why_care_cn": "处理长篇会议纪要或访谈录音时，人工查找手机号和证件号容易遗漏。该工具在本地自动识别并替换常见身份信息，降低人工排查成本。",
        "how_to_use_cn": "将技能目录复制到客户端，在处理长文本前调用该技能，获取脱敏后的文本及对应映射表。",
        "trust_source_cn": "基于 SpaCy 命名实体识别与正则匹配实现，代码开源，已在本地 Python 环境中完成脱敏及可逆替换测试。",
        "how_aligned_zh": "依照欧盟 GDPR 数据最小化原则，结合 SpaCy 命名实体识别与正则规则，在本地内存中对电话、身份证和税号等信息进行代换处理。"
    },

    # 4. openmed-clinical-ingestion
    "openmed-clinical-ingestion": {
        "timing_desc_cn": "临床数据录入门禁：在将病历记录、随访记录或患者数据提供给模型前执行。",
        "summary_cn": "识别并遮盖临床文本中的受保护健康信息（PHI）与患者标识，防止医疗记录中的个人身份被上传。",
        "why_chosen_cn": "针对临床医疗记录的高敏感度，在模型读取前识别并屏蔽病患个人信息，符合医疗数据处理规范。",
        "why_care_cn": "向大模型咨询医学常识时，若将含有姓名、病历号和就诊日期的化验单直接上传，可能泄露患者隐私。该技能在本地剔除病历中的识别标识后再进行文本分析。",
        "how_to_use_cn": "在输入化验单或病历文本时调用该技能，自动遮盖其中的姓名、就诊卡号和床位号等标识信息。",
        "trust_source_cn": "源自 Maziyar Panahi 维护的 OpenMed 医疗开源项目，经临床脱敏格式样本测试，可正确过滤受保护健康标识。",
        "how_aligned_zh": "依照美国 HIPAA 安全港准则中列出的 18 类受保护健康信息（PHI），在本地剔除病患姓名与医疗卡号，避免个人诊断记录与真实身份关联。"
    },

    # 5. presidio-anonymize-text
    "presidio-anonymize-text": {
        "timing_desc_cn": "文本读取前过滤：在智能体读取包含机密内容的短文本或会话记录前介入。",
        "summary_cn": "利用微软 Presidio 引擎扫描文本中的敏感实体并执行假名化替换，保护聊天记录与邮件中的隐私信息。",
        "why_chosen_cn": "基于 AgentSkills 规范封装微软 Presidio 实体识别功能，支持在 Cursor、Antigravity 和 Claude Code 中直接调用。",
        "why_care_cn": "日常复制邮件或即时通讯消息供 AI 总结时，容易顺带将姓名与组织名一并发送。该技能在本地将具体名称替换为通用代称，阻断文本与真实主体的关联。",
        "how_to_use_cn": "安装到 Cursor 或 Claude 技能目录中，在需要摘要聊天或邮件文本时调用执行脱敏。",
        "trust_source_cn": "源自 VectorSpaceLab 的 AREX 测试框架，调用微软 Presidio 官方脱敏引擎，通过单元测试验证实体代换准确度。",
        "how_aligned_zh": "使用微软 Presidio 开源匿名化引擎，执行实体识别、假名化代换及本地还原，确保原始身份信息保留在本地系统内。"
    },

    # 6. skillguard
    "skillguard": {
        "timing_desc_cn": "工具安装前：在将外部技能或插件引入智能体前，审查其权限定义与指令安全性。",
        "summary_cn": "在安装外部技能前审计 OWASP 智能体风险特征，拦截包含提示词注入、权限越界与数据外发的 SKILL.md 指令。",
        "why_chosen_cn": "对齐 OWASP Agentic Top 10 与 MITRE ATLAS 框架，对 SKILL.md 执行静态与动态审计，检查是否存在隐蔽提权与凭证读取行为。",
        "why_care_cn": "安装第三方技能时，指令中可能包含诱导模型外传系统变量的代码。SkillGuard 在工具加载前进行安全扫描，指出潜在风险点。",
        "how_to_use_cn": "通过 Agent 运行 audit 命令，传入目标 SKILL.md 路径或 GitHub 仓库地址，查看包含风险等级与说明的审查报告。",
        "trust_source_cn": "基于 OWASP LLM Top 10 安全矩阵构建，静态语法与权限扫描规则经多款客户端测试验证，运行过程不申请额外系统权限。",
        "how_aligned_zh": "参照 MITRE 对抗性威胁矩阵与 OWASP 智能体应用风险清单，对外部 SKILL.md 执行指令级静态分析，排查隐藏的系统调用与外联指令。"
    },

    # 7. skill-sentinel
    "skill-sentinel": {
        "timing_desc_cn": "工作区导入前：扫描 SKILL.md 指令，排查提示词注入与未授权的数据外发风险。",
        "summary_cn": "分析技能指令中的文本模式，识别提示词注入、隐藏指令与潜在的数据泄露风险。",
        "why_chosen_cn": "针对自然语言编写的 SKILL.md 文件进行启发式威胁匹配，检查是否存在诱导模型将上下文发送至第三方地址的指令。",
        "why_care_cn": "某些技能指令表面看似提供普通功能，但内含隐藏指令要求模型输出上下文密钥。该技能提供轻量级扫描，帮助用户识别这些隐藏指令。",
        "how_to_use_cn": "在对话中调用该技能并传入目标 SKILL.md 路径，获取风险等级评估与可疑片段清单。",
        "trust_source_cn": "由 EvolutionUnleashed 开源维护，采用纯本地启发式规则，已通过多种越狱及系统提示词探测测试用例。",
        "how_aligned_zh": "参照 CWE-78 系统命令注入防范原则，建立包含 24 种伪装系统指令的规则库，拦截诱导 Agent 执行外联操作的可疑文本。"
    },

    # 8. nova-proximity
    "nova-proximity": {
        "timing_desc_cn": "系统授权前：在启用连接本地终端或文件系统的 MCP 技能前进行权限审查。",
        "summary_cn": "扫描 MCP 服务与技能权限，检查高危系统调用与越权文件访问配置，保护本地凭证与文件系统。",
        "why_chosen_cn": "结合 MCP 上下文安全与 Agent 技能扫描，检查工具参数与文件路径是否越界，防止模型访问超出授权范围的本地文件。",
        "why_care_cn": "当模型通过 MCP 协议获得终端与文件读写能力时，错误的路径配置可能导致整块硬盘对模型开放。该工具检查配置中的权限范围，标出潜在的越权风险。",
        "how_to_use_cn": "指定待审查的 MCP 配置文件或技能目录运行检测，查看高危工具列表与路径越权提示。",
        "trust_source_cn": "源自 Nova 安全研究生态，针对 MCP 外部工具调用的路径穿透风险提供硬性拦截，已通过路径遍历攻击测试用例。",
        "how_aligned_zh": "落实 Anthropic MCP 协议中的最小权限原则，对本地 MCP 文件服务与终端配置执行权限邻近性静态审计，标记过于宽泛的授权项。"
    },

    # 9. security-threat-model
    "security-threat-model": {
        "timing_desc_cn": "资料上传前：向模型提供复杂代码或业务文档前，界定信任边界与不可上传的敏感资产。",
        "summary_cn": "基于本地代码与资产结构生成威胁模型，界定系统信任边界，列出不应提交给云端大模型的文件与凭证清单。",
        "why_chosen_cn": "源自 OpenAI 技能架构与 tech-leads-club 规范，基于项目实际文件梳理安全边界，明确禁止上传的核心资产。",
        "why_care_cn": "在请 AI 协助分析系统设计时，开发者容易连同系统凭证和私网拓扑图一并提交。威胁建模工具在前期梳理数据分级，明确列出哪些文件必须排除在上下文之外。",
        "how_to_use_cn": "在对话中要求针对当前项目建立威胁模型，智能体将梳理项目资产并输出禁止输入清单与边界说明。",
        "trust_source_cn": "源自开源工程规范项目 Tech Leads Club，基于 STRIDE 与 MITRE ATT&CK 威胁建模框架构建，经多项目实测验证。",
        "how_aligned_zh": "将 STRIDE 威胁建模方法落地为可直接执行的资产保护清单，明确标注禁止上传给云端模型的代码目录与凭证类型。"
    },

    # 10. post-generation-fact-check
    "post-generation-fact-check": {
        "timing_desc_cn": "生成后独立执行：在初步回答生成后触发，在采纳任何结论前完成独立事实求证。",
        "summary_cn": "在内容生成后提取所有事实性断言，调用外部搜索引擎或知识库核对，拒绝仅以模型记忆作为证据。",
        "why_chosen_cn": "防范大模型在连续对话中重复自身幻觉。通过独立的第二轮检索对断言进行外部核验，避免将模型自身输出作为事实依据。",
        "why_care_cn": "大模型在回答事实问题时可能给出语法流畅但完全虚构的内容。该技能提取回答中的具体断言并进行外部检索，找出与权威资料不符的表述。",
        "how_to_use_cn": "在模型生成分析报告后调用该技能，获取针对正文事实断言的真伪核对结果与证据来源。",
        "trust_source_cn": "基于学界验证的双阶段（生成-核查）模式设计，采用本地 Prompt 规则，可有效提示模型对未证实推论做出标注。",
        "how_aligned_zh": "参照 NeurIPS 验证的生成后独立核验双阶段流水线，在回答输出后拆解事实性实体并比对外部信源。"
    },

    # 11. citation-faithfulness-checker
    "citation-faithfulness-checker": {
        "timing_desc_cn": "信源审计时：在审阅包含参考文献的文献综述、行业报告或论文初稿时运行。",
        "summary_cn": "检索引文原文内容，逐条检验正文结论是否得到参考文献的实际支持，输出结构化判定状态。",
        "why_chosen_cn": "检查正文论点与引文原文之间的一致性，不仅核实论文是否存在，还比对原文内容是否真正支持 AI 提出的结论。",
        "why_care_cn": "AI 生成学术内容时可能引用真实存在的论文，但其正文推论与被引文献的原结论完全无关甚至相反。该技能比对两处文本，标出缺乏原文支撑的断言。",
        "how_to_use_cn": "在生成学术性段落后调用，技能提取文中的括号引文，并在学术库中比对原文上下文与当前结论的匹配度。",
        "trust_source_cn": "依托清华大学 KEG 实验室与 AMiner 学术元数据规范，经论文引用比对实测，可识别与原文脱节的引文。",
        "how_aligned_zh": "依托清华学术图谱校验规范，对生成的引用条目执行作者、标题及卷期要素交叉比对，排查非真实参考文献。"
    },

    # 12. bibref-verify
    "bibref-verify": {
        "timing_desc_cn": "论文定稿前审计：在论文或技术报告定稿前，批量排查 .bib 文件中的文献有效性。",
        "summary_cn": "对学术论文的 .bib 参考文献进行批量查伪与信息核对，识别虚构作者和失效 DOI，输出结构化审计报告。",
        "why_chosen_cn": "批量核验 .bib 文件中的文献条目，在不改动源文件的基础上识别虚构作者与无效 DOI，输出具体的核对清单。",
        "why_care_cn": "论文写作中使用 AI 整理文献，容易引入格式逼真但实际不存在的假文献。该工具自动比对文献库中的官方记录，筛出无法通过 DOI 检索的条目。",
        "how_to_use_cn": "提供 .bib 文件路径或正文文本，技能返回真实可查的文献清单与存在疑点的条目报告。",
        "trust_source_cn": "通过 CrossRef、Semantic Scholar 与 DBLP 开放接口核对条目，识别排版完整但数据库中不存在的卷期与 DOI。",
        "how_aligned_zh": "采用 DOI 数字对象标识符检索协议，向 CrossRef 与 DBLP 接口请求验证 BibTeX 条目，确认文献真实存在。"
    },

    # 13. citation-integrity-auditor
    "citation-integrity-auditor": {
        "timing_desc_cn": "草稿求证阶段：生成学术或科普草稿后，对照 Crossref 与 OpenAlex 等学术数据库逐条核验引文真实性。",
        "summary_cn": "对照 Crossref 与 OpenAlex 审计文稿中的引文层，核验 DOI 解析状态，对无法查证的条目直接标记异常并提示人工核实。",
        "why_chosen_cn": "针对大模型常捏造论文标题、DOI 和期刊名的现象，通过权威公开数据库对引用进行逐项校验，查不到时明确标记。",
        "why_care_cn": "AI 生成的内容中常包含虚构的论文条目。该技能通过全球学术数据库逐一检索，对无匹配记录的条目明确标注“无法核实”，避免误用假文献。",
        "how_to_use_cn": "在完成学术或科普草稿后调用，技能输出包含真实 DOI 与数据库收录状态的引文核验列表。",
        "trust_source_cn": "源自 Open Science 开放科研工具集，遵循科学论文可复现性标准，已通过科研论文核验实测。",
        "how_aligned_zh": "遵循开放科学中心倡导的可复现性规范，针对 arXiv 与 bioRxiv 预印本抓取原始段落，评估学术引用的准确度。"
    },

    # 14. citation-verifier
    "citation-verifier": {
        "timing_desc_cn": "文稿编撰时：在利用 LaTeX、Markdown 或 Emacs 撰写学术手稿时实时校验引文。",
        "summary_cn": "批量校验论文参考文献条目，排查被撤稿论文和虚假引文，提供文献摘要与真实记录供比对。",
        "why_chosen_cn": "由卡内基梅隆大学 John Kitchin 教授开发，交叉比对 Crossref 与 PubMed 数据库，识别被撤稿记录与虚构文献条目。",
        "why_care_cn": "该工具不仅确认引文是否存在，还会调出被引论文的实际摘要供作者快速对照，避免引用已被撤稿或内容不相符的文章。",
        "how_to_use_cn": "安装到 Emacs、Cursor 或 Claude 中，针对当前 Markdown 或 LaTeX 文档一键校验全部参考文献。",
        "trust_source_cn": "由卡内基梅隆大学化学工程系 John Kitchin 教授开源维护，面向计算可复现性开发，具备学术工具实测记录。",
        "how_aligned_zh": "遵循卡耐基梅隆大学可计算学术理念，将引用核验与代码执行环境绑定，输出完整的引文审计表。"
    },

    # 15. claim-source-fact-checker
    "claim-source-fact-checker": {
        "timing_desc_cn": "观点求证阶段：检查引用的参考资料是否确实支持模型得出的结论，防止论点与论据脱节。",
        "summary_cn": "比对关键断言与参考源文件，检测过度概括、结论方向颠倒与论据不匹配等常见事实错误。",
        "why_chosen_cn": "核验结论与被引原文之间的逻辑一致性，排查引文存在但实际结论被夸大或扭曲的现象。",
        "why_care_cn": "AI 有时会列出真实存在的经典论文，但给出的解读与原作者结论相反。该技能逐句比对正文论点与参考原文，指出证据不足或解读偏差之处。",
        "how_to_use_cn": "生成研究综述或分析文本后运行，技能会检查核心结论是否具备源文件的直接事实支撑。",
        "trust_source_cn": "基于 FEVER 事实提取与验证基准设计，采用结构化证据链比对，已通过事实核查测试用例验证。",
        "how_aligned_zh": "遵循事实提取与溯源标准，对结论性断言标注“支持”、“反驳”或“证据不足”，排查未经验证的表述。"
    },

    # 16. hallucination-risk-reviewer
    "hallucination-risk-reviewer": {
        "timing_desc_cn": "风险分级排查：在采纳或发布 AI 生成文本前，对关键断言进行逐段分级审查。",
        "summary_cn": "执行断言级幻觉风险分级排查，对具体引文、URL、直接引语及专业领域断言进行针对性审查并评估其可靠度。",
        "why_chosen_cn": "提供断言级风险量表，排查易错的版本号、历史时间点与外部链接，标注缺乏依据的表述。",
        "why_care_cn": "AI 生成的长文常在局部夹杂细微的事实错误。该技能扮演审核员角色，逐段标注缺乏确凿根据的表述并提示用户复查。",
        "how_to_use_cn": "文章完成后调用该技能，系统标出文中存疑、缺乏来源或断言过于绝对的句子供人工复核。",
        "trust_source_cn": "代码开源，基于概率性归纳反思逻辑，经多款客户端测试验证，可识别语义滑移与无根据扩写内容。",
        "how_aligned_zh": "参照 ACM CSUR 大模型事实承载评测模型，量化输出中的不确定性标记，给出各段落的风险分级。"
    },

    # 17. vectara-hallucination-corrector
    "vectara-hallucination-corrector": {
        "timing_desc_cn": "检索后一致性校正：根据检索源文档评估生成内容的事实一致性，剔除无根据断言。",
        "summary_cn": "通过 Vectara HHEM 事实一致性模型比对生成文本与源文档，删除或修正缺乏实证依据的幻觉断言。",
        "why_chosen_cn": "依托业界广泛采用的 Vectara HHEM 事实评估基准，对缺乏证据支持的断言进行删减或对冲处理，不强行编造细节。",
        "why_care_cn": "在基于文档回答问题（RAG）时，模型可能掺杂外部幻觉。该技能通过算法比对回答与原始文档，指出偏离原文的句子。",
        "how_to_use_cn": "安装后，当模型基于上传资料作答时，技能会自动计算文本一致性得分并提示修正有出入的内容。",
        "trust_source_cn": "由大模型幻觉排行榜 Vectara 官方团队研发，基于 HuggingFace 上的 HHEM 评估模型构建，测试数据公开。",
        "how_aligned_zh": "依据 Vectara HHEM 事实一致性分类器标准，在 RAG 场景下对生成文本与检索上下文进行一致性校验。"
    },

    # 18. kdense-peer-review
    "kdense-peer-review": {
        "timing_desc_cn": "推演论证审计：审校科学实验方案、统计分析或复杂推论过程时介入。",
        "summary_cn": "对科学与学术草稿执行同行评审流程核验，交叉检验数学推导过程与实证推论的逻辑自洽性。",
        "why_chosen_cn": "将学术同行评审规范引入复杂分析中，检查数学推导与实验推论链是否存在逻辑漏洞或跳步。",
        "why_care_cn": "在评估技术方案或数据分析时，表面合理的推理可能掩盖了关键漏洞。该技能按照同行评审的核验清单提出质疑，提示补充必要证据。",
        "how_to_use_cn": "完成研究提案或分析报告后调用，技能会列出方案中的薄弱环节与需要补强的论据清单。",
        "trust_source_cn": "源自专注于科研智能体的 K-Dense 团队，依据同行评审双盲指南构建，已完成学术论文审稿用例测试。",
        "how_aligned_zh": "参照《自然·机器智能》关于 AI 辅助结构与方法审查的伦理准则，将同行评审形式要求转化为标准化审查步骤。"
    },

    # 19. the-judge
    "the-judge": {
        "timing_desc_cn": "结论审查时：在采纳任何事实断言或技术结论前执行严格证据核验，无确凿记录时明确说明。",
        "summary_cn": "事实裁决规则：要求每条结论必须提供代码行号或官方文档链接证据，拒绝未经证实的猜想。",
        "why_chosen_cn": "落实“无证据即保持沉默”原则（Evidence or silence），要求每一项技术推论必须出示具体依据，不凭模型记忆作答。",
        "why_care_cn": "大模型容易根据模糊概率给出看似笃定但无从考据的回答。The Judge 要求每条结论必须指出明确的代码行号或官方链接，找不到时如实承认。",
        "how_to_use_cn": "提示模型“按照 The Judge 规则审查当前输出”，模型将补充各结论的事实来源，或撤回未经验证的猜想。",
        "trust_source_cn": "源自 Tech Leads Club 工程质量套件，执行“出示直接证据或保持沉默”规则，抑制模型的推测性发言。",
        "how_aligned_zh": "贯彻“无确凿证据即保持沉默”的工程准则，对没有直接命令输出或代码依据的主观技术推论判定为未通过。"
    },

    # 20. the-fool
    "the-fool": {
        "timing_desc_cn": "方案反思时：在倾向于快速采纳 AI 规划或策略前调用，辅助排查思维盲区。",
        "summary_cn": "扮演挑剔的反思者，专门探测隐性假设、进行事前反思与认知偏差扫描，排查方案中的潜在问题。",
        "why_chosen_cn": "设计原则为“不替人类做决定，负责指出薄弱点”。通过事前反思、隐性假设梳理与偏差扫描，帮助用户发现未考虑到的情况。",
        "why_care_cn": "大模型常有顺从用户偏好的倾向，即使你的前提出错，它也往往附和作答。该技能主动扮演反对立场，指出方案中被忽略的假设漏洞。",
        "how_to_use_cn": "在确定商业方案或系统设计前调用，要求模型跳出顺从模式，集中列出方案中存疑的前提假设。",
        "trust_source_cn": "源自 Tech Leads Club，基于打破群体思维的设计思路开发，已被用于日常敏捷架构评审。",
        "how_aligned_zh": "参照卡尼曼对抗认知偏误的“慢思考”方法，针对用户方案中的隐含假设展开质询，指出容易被忽略的边界条件。"
    },

    # 21. sycophancy-challenger
    "sycophancy-challenger": {
        "timing_desc_cn": "方案推敲时：在模型表现出过度附和、缺乏实质批判时开启对抗模式。",
        "summary_cn": "将模型切换至批判审查模式，要求针对当前论点提出反例与替代视角，避免无原则附和用户假设。",
        "why_chosen_cn": "针对大模型普遍存在的迎合倾向（Sycophancy），设定反顺从规则：除非用户提供确凿事实，否则不应为礼貌而放弃质疑立场。",
        "why_care_cn": "模型附和你的观点并不代表论点本身没有漏洞。该技能阻断模型的讨好倾向，强制其列出反驳证据与潜在反对意见，辅助独立思考。",
        "how_to_use_cn": "在 Claude Code 或 Cursor 中安装后，陈述方案并要求模型展开反向质疑，列出潜在反例。",
        "trust_source_cn": "针对模型迎合倾向设计，经多组包含偏见假设的提示词测试，能够保持相对客观的批评立场。",
        "how_aligned_zh": "针对研究中发现的模型因迎合用户而赞同错误假设的问题，建立前置反迎合规则，强制优先列出潜在弱点。"
    },

    # 22. devils-advocate-mad-skills
    "devils-advocate-mad-skills": {
        "timing_desc_cn": "压力测试：在方案定稿前启动对抗性子智能体，从 8 个不同失败维度进行压力测试。",
        "summary_cn": "启动对抗性子智能体，在方案定稿前从 8 个潜在失败维度进行系统化压力测试与风险评级。",
        "why_chosen_cn": "提供涵盖 8 个维度的失败模式分析，防止用户陷入单一视角，提前标出潜在的执行障碍。",
        "why_care_cn": "在评估代码架构与方案时，容易低估实际运行中的边缘异常。该技能让模型假设方案在生产环境中遭遇失败，并倒推最可能的原因。",
        "how_to_use_cn": "在采纳技术方案前运行，智能体将进行事前推演（Pre-mortem），列出潜在故障点与应对建议。",
        "trust_source_cn": "参考多智能体辩论（Multi-Agent Debate）模式开发，纯本地指令执行，已在架构评审中完成有效性测试。",
        "how_aligned_zh": "遵循多智能体对抗辩论方法，将任务拆分为立论与驳论两个相互检验的角色，防止单模型输出思维狭窄。"
    },

    # 23. godfly-opposing-counsel
    "godfly-opposing-counsel": {
        "timing_desc_cn": "决策关口：针对重大商业合同或方案定稿，生成反对方立场的质询书。",
        "summary_cn": "模拟对抗方立场起草质询意见，检验核心前提，测算调整成本，指出方案可能面临的质疑点。",
        "why_chosen_cn": "避免流于表面的反驳，生成结构化的反对方质询意见：测算当前路径的试错代价，明确在何种条件下备选方案更具优势。",
        "why_care_cn": "撰写申诉文书或谈判要点时容易只考虑自身利益。该技能模拟对方立场的法务或对手，指出文书中的事实软肋，帮助完善论据。",
        "how_to_use_cn": "起草诉求书或谈判策略后运行，模型将以反方立场挑出证据链中的薄弱环节。",
        "trust_source_cn": "借鉴法庭对抗性交叉质询逻辑开发，代码完全开源，已通过方案对抗性压力测试。",
        "how_aligned_zh": "借鉴法律交叉质询机制，模拟反方代理人从条款漏洞与不利情境对提案发起承压审查。"
    },

    # 24. devils-advocate-reviewer
    "devils-advocate-reviewer": {
        "timing_desc_cn": "答辩前测试：在论文投稿或答辩前，对研究方法与理论根基执行压力测试。",
        "summary_cn": "采取对抗性评审立场审查学术论文的逻辑漏洞，设定程序化质询规则，持续检验研究根基。",
        "why_chosen_cn": "设定程序化质询门禁，避免模型因用户辩解而放弃批评，集中检验学术论据中的潜在弱点。",
        "why_care_cn": "学术答辩或方案汇报前，提前排查论据漏洞十分关键。该技能模拟严厉评审人的提问角度，预先指出说服力不足的段落，方便提前准备回答。",
        "how_to_use_cn": "完成文稿或汇报材料后调用，模型将逐条列出潜在的质询问题与证据补充建议。",
        "trust_source_cn": "面向学术严谨性审查开发，专注指出推导漏洞与未经证明的前提，已通过论文初稿测试验证。",
        "how_aligned_zh": "将事前推演方法转化为审查守则：假定方案遇到严重阻碍，由模型倒推核心制约因素并提出应对措施。"
    },

    # 25. red-team-review
    "red-team-review": {
        "timing_desc_cn": "方案敲定前演练：从财务、法务与竞争对手视角分别发起对抗性审查。",
        "summary_cn": "通过多维度对抗视角对规划执行压力测试，结合发生概率与影响程度对潜在盲区排序。",
        "why_chosen_cn": "将方案置于相互冲突的审查视角（如财务预算、法务合规及竞争对手策略），根据危害与概率对风险排序，防止草率定稿。",
        "why_care_cn": "在敲定重大方案前，单一专业视角容易遗漏跨领域风险。该技能让模型分别从财务成本、法规合规与竞品角度寻找漏洞，提前发现隐患。",
        "how_to_use_cn": "将技能作为审核节点运行，模型将模拟外部对手与审查机构，指出方案中的关键薄弱环节。",
        "trust_source_cn": "结合网络安全红蓝对抗与多视角思考方法，本地运行，已在产品方案设计评审中完成验证。",
        "how_aligned_zh": "参照 NIST 风险管理框架，将模型角色分化为法务、财务和客户等多个红队视角进行协同审查。"
    },

    # 26. anti-sycophancy-molly
    "anti-sycophancy-molly": {
        "timing_desc_cn": "方案构思阶段：在撰写高管简报、企划或核心论文论点时调动反向思考。",
        "summary_cn": "基于事前反思与苏格拉底式提问构建反思流程，执行反迎合规则，禁止以客套赞美开场并排查关键缺陷。",
        "why_chosen_cn": "设定明确的反迎合协议：禁止以客套夸奖开场，禁止无根据顺从用户偏好，要求在输出中指出至少一项潜在关键风险。",
        "why_care_cn": "大模型常为了迎合用户而掩盖方案的缺陷。该技能要求模型直接指出逻辑不通或前提不实之处，提供真实的批评意见。",
        "how_to_use_cn": "配置到系统指令中，在得出乐观结论前必须先经过可行性审查。",
        "trust_source_cn": "采用苏格拉底反诘法，专注于在决策过程中提示盲目乐观风险，已通过 10 余场决策推演测试。",
        "how_aligned_zh": "依据对齐研究关于人类反馈容易诱导模型顺从的分析，建立反顺从协议，禁止敷衍的赞扬性开场白。"
    },

    # 27. the-jury
    "the-jury": {
        "timing_desc_cn": "关键抉择时：唤起独立陪审员匿名评审与辩论，排查模型的认知偏见与单一视角。",
        "summary_cn": "多智能体匿名评审评议机制，通过独立评分与正反方辩论，降低单一大模型的顺从迎合与认知回音效应。",
        "why_chosen_cn": "结合多智能体决策机制，通过匿名评审与少数派异见保留机制，减少单一模型盲目迎合用户的现象。",
        "why_care_cn": "单一大模型容易受到提问措辞的暗示并产生偏见。陪审团机制通过多个独立角色分别给出评价并展开辩论，帮助看清不同观点的依据。",
        "how_to_use_cn": "输入“请陪审团审议该方案”，模型通过多轮独立审议，输出包含置信度与未决异议的总结意见。",
        "trust_source_cn": "源自 Tech Leads Club 决策工具集，通过多角色独立评审规避群体盲思，已在工程决策场景测试验证。",
        "how_aligned_zh": "参考孔多塞陪审团定理模型，调度多个独立子角色进行盲审与辩论打分，降低单一模型的顺从倾向。"
    },

    # 28. discernment-nudge
    "discernment-nudge": {
        "timing_desc_cn": "行动决策前：在给出健康、财务或重大企划结论后追加反思提问，提示用户核实关键盲点。",
        "summary_cn": "Anthropic 鉴别力提示机制，在关键建议后自动附带针对薄弱假设的质询问题，引导用户主动核实盲点。",
        "why_chosen_cn": "源自 Anthropic 官方开源规范，根植于 AI 批判性思维框架，针对事实来源、推理逻辑及上下文缺漏设置反问，提示用户核实。",
        "why_care_cn": "面对 AI 流畅肯定的回答，人们容易忽略其背后的假设前提。该技能在回答末尾附带 2 到 3 个针对关键假设的追问，提醒用户向专业人士或一手资料核对。",
        "how_to_use_cn": "导入到 Claude 或兼容 Agent 中，模型在长篇建议后会自动列出需要人工核查的前提条件。",
        "trust_source_cn": "Anthropic 官方研究团队在开源仓库中发布，针对过度依赖 AI 的现象设计，经过红蓝对抗评测。",
        "how_aligned_zh": "落实 Anthropic 官方提出的 AI Fluency 用户能力框架，在回答结尾注入审慎思考提示，引导用户核实关键事实。"
    },

    # 29. receiving-code-review
    "receiving-code-review": {
        "timing_desc_cn": "收到建议时：在落实外部反馈或模型重构建议前执行技术核验，避免未经证明的盲从。",
        "summary_cn": "遵循事实正确高于礼貌顺从原则，要求在实施修改前先行测试验证，避免未经核实盲目改动代码。",
        "why_chosen_cn": "针对 AI 交互中常见的轻率顺从现象：要求模型坚持技术验证优先，不因对方语气权威而盲目采纳存在缺陷的代码方案。",
        "why_care_cn": "当评审人提出意见时，AI 经常立即改口赞同并改动代码，哪怕原方案本无问题。该技能要求在动笔前先通过代码推演或测试验证意见是否合理。",
        "how_to_use_cn": "启用为通用准则：面对任何批评或重构建议，AI 必须先列出测试证据，确认改进有效后再修改代码。",
        "trust_source_cn": "源自开源框架 Superpowers，被用于多位开发者的日常编程实践，要求对修改建议保持验证态度。",
        "how_aligned_zh": "确立技术审慎准则，要求智能体在接收修改意见时先进行语法与逻辑推导，不随意改换原有有效方案。"
    },

    # 30. ai-provenance
    "ai-provenance": {
        "timing_desc_cn": "作品交付前：在交付代码、设计稿或文案前生成机器可读的证据链与来源声明。",
        "summary_cn": "自动记录人机协作过程，生成机器可读的 W3C PROV 证据链，标明模型版本、提示词哈希与人工编辑比例。",
        "why_chosen_cn": "为交付成果提供客观的数据凭证。通过生成机器可读的证据文件，向需求方证明哪些部分由人工撰写、哪些由 AI 辅助，避免事实不清导致的信任危机。",
        "why_care_cn": "在面对关于作品是否由 AI 生成的质疑时，空泛解释难以消除疑虑。该技能记录编辑时间戳与改动版本，区分原创思路与机器润色比例，便于对外提供说明。",
        "how_to_use_cn": "在写作或编码过程中保持开启，任务完成时导出包含版本演进与人机分工说明的凭证文件。",
        "trust_source_cn": "遵循 W3C PROV-O 国际数据溯源标准，代码公开，经多轮跨版本代码提交测试，记录清晰稳定。",
        "how_aligned_zh": "参照 W3C PROV 规范，为成果输出包含模型标识、提示词摘要与人工编辑比例的溯源记录。"
    },

    # 31. vertu-seo-publish-gate
    "vertu-seo-publish-gate": {
        "timing_desc_cn": "发布授权关卡：在文案、文章或营销材料正式对外公开前执行内容质检。",
        "summary_cn": "对 AI 草稿执行 PASS/FIX/BLOCK 门禁检查，将写作与发布权限隔离，要求必须获得人工确认方可上线。",
        "why_chosen_cn": "将文案生成与直接发布流程解耦，智能体仅负责生成与检查，公开发布必须依赖明确的人工授权回执（PASS/FIX/BLOCK）。",
        "why_care_cn": "直接发布纯 AI 生成的文本容易包含套话与空洞陈述，引起读者反感或触发内容平台过滤。该技能在发布前扫描空泛段落并给出具体修改建议。",
        "how_to_use_cn": "文章发布前运行质检命令，技能会自动检查段落充实度，指出空洞句式并给出替换意见。",
        "trust_source_cn": "源自出海内容团队的实际生产流程，用于排查低质量 AI 套话与陈词滥调，经过日常内容发布实测。",
        "how_aligned_zh": "结合谷歌搜索 EEAT 质量评估原则，在内容发布前拦截机械套话，提高文字的信息密度与具体性。"
    },

    # 32. visible-ai-disclosure-pr-gate
    "visible-ai-disclosure-pr-gate": {
        "timing_desc_cn": "代码提交阶段：在推送 Pull Request 或生成版本发布说明前执行披露检查。",
        "summary_cn": "将 AI 使用声明嵌入代码提交与 PR 流程中，生成结构化披露内容，避免未经说明合入机器生成的代码。",
        "why_chosen_cn": "在提交代码时自动生成明确的 AI 使用说明，标清机器生成的代码范围与人工测试情况，便于团队复核。",
        "why_care_cn": "在向团队或开源社区提交代码时，隐瞒使用 AI 编写可能增加代码审查难度。该技能规范地生成披露标签，清楚说明哪些模块有 AI 参与并已通过测试。",
        "how_to_use_cn": "整合到 Git 提交流程中，在 PR 描述中自动附带 AI 参与范围及对应的验证测试结果。",
        "trust_source_cn": "由 Vue 与 Nuxt 生态工程师 Harlan-zw 开发，专为保障开源项目代码可追溯性设计，运行稳定可靠。",
        "how_aligned_zh": "参考开源协作关于人机协作透明性的规范，在 PR 描述中清晰标注 AI 参与的模块边界与测试覆盖记录。"
    },

    # 33. gdpr-compliance-audit
    "gdpr-compliance-audit": {
        "timing_desc_cn": "发布前门禁：在交付方案或产品前，依据通用数据保护条例对内容、数据采集点与知情权进行审计。",
        "summary_cn": "在上线前核查方案的数据最小化、目的限制与知情同意规范，出具审计结果与整改建议清单。",
        "why_chosen_cn": "为即将交付的方案、文案或小工具提供合规审查支持，排查潜在的个人信息违规收集点。",
        "why_care_cn": "发布的表单、问卷或分析工具若意外收集了敏感个人信息，可能面临合规风险。该技能在交付前扫描采集项，指出超出业务必需的数据字段。",
        "how_to_use_cn": "交付前运行该技能对方案或代码执行全项审计，生成合规建议与需要调整的字段列表。",
        "trust_source_cn": "对照欧盟 GDPR 第 22 条自动化决策与第 30 条记录要求编写，经模拟合规场景测试，输出条理清晰。",
        "how_aligned_zh": "针对 GDPR 第 22 条关于自动化决策透明度的规定，在生成评估结果前排查潜在的歧视性特征与画像风险。"
    },

    # 34. publish-prep-review
    "publish-prep-review": {
        "timing_desc_cn": "公开上传门禁：在成稿或素材对外发布前介入，校验信源版权、模型版本与可核验证据。",
        "summary_cn": "在内容最终发布前进行闭环校验，检查文稿版权、外部链接有效性与来源凭据，资料不全时给出拦截提示。",
        "why_chosen_cn": "建立发布前把关流程：缺少来源支持、版权归属不明或无法查证的素材，系统提示暂缓发布。",
        "why_care_cn": "发布前检查文中的图片授权、外链有效性与争议性表述，避免发布到公开平台后因侵权或链接失效产生纠纷。",
        "how_to_use_cn": "文稿完成后运行审查，获取排版瑕疵、失效链接与存疑表述的修改建议列表。",
        "trust_source_cn": "源自 content-machine 内容生产流程，经过事实核对、版权确认与修辞审查三道检验测试。",
        "how_aligned_zh": "参照美联社新闻室关于 AI 辅助内容的使用准则，建立事实准确性与版权合规门禁，要求核实后方可发布。"
    },

    # 35. ai-disclosure-convention
    "ai-disclosure-convention": {
        "timing_desc_cn": "文件头标记：在代码文件头或 Markdown 元数据中添加机器可读的声明标签。",
        "summary_cn": "在代码或文档头部嵌入机器可读的 AI 披露标签（SPDX 风格），确保归属与审计信息在文件分发中持续保留。",
        "why_chosen_cn": "在源码或 Markdown 头部添加标准化的机器可读标签，使代码在仓库流转或分支合并后仍能保留清晰的生成说明。",
        "why_care_cn": "如同开源许可证标识一样，机器可读的标签能让自动化审查工具快速读取项目中的 AI 使用范围，提高合规审计效率。",
        "how_to_use_cn": "在代码库或文档根目录生成 `AI-DISCLOSURE.md` 规范文件，供自动化工具检索与解析。",
        "trust_source_cn": "参考 ISO/IEC 5962:2021 机器可读标签标准设计，经 Python、JavaScript 和 Go 语言多文件实测，与现有 CI 流程兼容。",
        "how_aligned_zh": "采用类 SPDX 机器可读元数据规范，通过在文件头部注入 `AI-Assisted-By:` 标签记录辅助信息。"
    },

    # 36. skill-provenance-tracker
    "skill-provenance-tracker": {
        "timing_desc_cn": "执行审计记录：跨多轮会话记录所调用的技能版本、输入参数、工具链与模型种子号。",
        "summary_cn": "跨会话记录智能体调用的技能版本、上下文与数据流转，生成可用于复核的执行记录单。",
        "why_chosen_cn": "为复杂的智能体任务提供调用日志，记录具体哪个工具在何时访问了哪些数据，方便后续排查。",
        "why_care_cn": "当智能体在后台调用多个外部工具时，人工难以全程盯防。该技能完整记录会话中的工具调用细节与文件改动，方便事后审查。",
        "how_to_use_cn": "在任务执行时作为后台服务运行，任务完成后输出工具调用时间线与参数变动记录。",
        "trust_source_cn": "代码开源，通过生成会话执行收据（Session Receipts）为操作留痕，已完成多步调用测试验证。",
        "how_aligned_zh": "遵循可验证数据记录工程规范，对多轮会话中的工具调用与模型种子生成时间戳记录，便于第三方核验。"
    },

    # 37. verification-before-completion
    "verification-before-completion": {
        "timing_desc_cn": "交付承诺前：在智能体宣称“任务完成”前，强制执行测试验证与产物核查。",
        "summary_cn": "在智能体汇报任务完成前强制执行验证指令，检查测试用例是否实际运行并全部通过，杜绝口头保证。",
        "why_chosen_cn": "针对模型常在未真正运行测试时便宣称“已经修复”的现象，强制执行终端验证命令，必须看到测试退出码为 0 方可结束任务。",
        "why_care_cn": "编写代码时，AI 常口头声称“所有问题均已解决”，但实际上未执行测试，甚至留下了新的语法错误。该技能强制在汇报前运行测试套件，用真实测试结果说话。",
        "how_to_use_cn": "配置为全局工作流规则，当模型准备宣布完成时，拦截该回复并强制触发自动化测试命令。",
        "trust_source_cn": "源自开源框架 Superpowers 的核心验证原则，经过大量软件工程日常重构任务验证，可有效拦截虚假完成汇报。",
        "how_aligned_zh": "严格执行测试驱动开发（TDD）准则，将任务完成判定权交给测试命令的退出状态码，禁止依赖模型的口头陈述。"
    },

    # 38. humanizer
    "humanizer": {
        "timing_desc_cn": "公开发布前润色：依据维基百科 AI 文本识别指南，去除机械套话、虚假并列与不必要的修辞修饰。",
        "summary_cn": "对照维基百科编写的 AI 文本特征指南，调整生硬的排比句与模板化套话，使文字读起来自然直接，保留原有事实不变。",
        "why_chosen_cn": "基于维基百科编辑社群的《AI 写作特征识别指引》，针对 26 类常见的机器写作习惯（如二元对立句、单句升华、滥用破折号与空洞排比）进行精简与改写。",
        "why_care_cn": "AI 生成的文章常带有明显的模板特征（例如频繁使用“不仅...更...”、“总而言之”）。直接发布容易显得生硬机械，该技能帮助删减不必要的修饰，使表达更朴实清晰。",
        "how_to_use_cn": "向 Agent 输入指令：“用 humanizer 检查并改写此段落”，技能将标出文中的模板化用词并给出自然的修改版本。",
        "trust_source_cn": "源自 GitHub 获得广泛关注的开源项目 blader/humanizer，依照维基百科《识别 AI 生成文本标志》指南构建，经多类文本改写测试验证。",
        "how_aligned_zh": "依托维基百科编辑社群制定的反 AI 文本典型特征指南，在公开发布前清理空洞排比、模式化转折与机械套话。"
    },

    # 39. marketing-claims-review
    "marketing-claims-review": {
        "timing_desc_cn": "文案发布前审查：在将 AI 撰写的营销文案、宣传材料或产品说明正式对外发布前执行。",
        "summary_cn": "从 AI 生成的文案中提取具体陈述，区分主观描述与事实承诺，并在发布前核实证据支持，防范夸大宣传风险。",
        "why_chosen_cn": "针对商业文案中容易出现的“行业领先”、“完全保障”等绝对化措辞，提取文中文案断言并核查证明材料，对无据可依的承诺提出改写建议。",
        "why_care_cn": "请 AI 协助编写宣传文案时，模型容易自发添加“性能提升十倍”、“首创技术”等无根据的夸大词句。若未加核对直接公开，容易招致虚假宣传投诉。该技能排查文中的绝对化断言，给出合规表述建议。",
        "how_to_use_cn": "将文案草稿提交给模型并调用审查指令，技能提取其中的关键断言，指出缺乏事实依据的句子并给出替代写法。",
        "trust_source_cn": "源自 Anthropic 官方团队维护的开源法律助手工具包，提供结构化广告声明审核流程，代码公开透明。",
        "how_aligned_zh": "参照 FTC 广告真实性与事先举证要求，识别绝对化断言与对比性说辞，提示提供依据或进行客观降级改写。"
    },

    # 40. web-accessibility
    "web-accessibility": {
        "timing_desc_cn": "前端发布前审计：在将 AI 编写的网页、组件或应用上线前执行无障碍检测。",
        "summary_cn": "依照 W3C WCAG 2.1 AA 标准审计并修复 AI 生成的前端页面，检查键盘导航、颜色对比度与屏幕阅读器标签支持。",
        "why_chosen_cn": "针对 AI 生成前端代码时常遗漏无障碍属性的问题，以 W3C WCAG 2.1 AA 标准为基准，检查页面是否存在焦点丢失、对比度不足或图片缺少 alt 标签的情况。",
        "why_care_cn": "AI 生成的网页往往外观正常，但缺少无障碍标签，导致视障用户使用读屏软件时无法正常浏览，也难以满足部分地区的法律合规要求。该技能自动指出代码中的无障碍缺陷并给出修正代码。",
        "how_to_use_cn": "生成 HTML、React 或 Vue 页面后调用无障碍审查指令，技能会标出对比度不足、缺少 alt 或焦点死锁的代码行并给出修复建议。",
        "trust_source_cn": "源自 Tech Leads Club 工程质量工具集，基于 W3C POUR 原则构建，已在多个开源 Web 项目中完成实测验证。",
        "how_aligned_zh": "落实 W3C WCAG 2.1 AA 级无障碍原则（可感知、可操作、可理解与健壮性），在上线前核查屏幕阅读器标签、焦点控制与色彩对比度。"
    },

    # 41. repo-security-review
    "repo-security-review": {
        "timing_desc_cn": "代码合入与发布前门禁：在将模型生成的代码合并或发布前，自动扫描硬编码凭证与已知漏洞。",
        "summary_cn": "在智能体生成的代码或补丁发布前，集成 Gitleaks 密钥检测与常见代码漏洞分析，拦截敏感凭证外泄。",
        "why_chosen_cn": "防范模型在代码中直接硬编码 API 密钥、数据库连接串或引入已知漏洞。结合 Gitleaks 对代码差异进行扫描，避免敏感信息意外提交。",
        "why_care_cn": "在请 AI 编写脚本时，模型有时会将你刚提供的 API Key 或密码直接写死在代码中。若随代码一起推送到公开代码库，容易造成凭据泄漏。该技能在提交前扫描代码，拦截所有明文密钥。",
        "how_to_use_cn": "在准备提交或发布代码前运行安全审查指令，技能调用 Gitleaks 与检测规则分析代码改动，汇报潜在的凭证泄漏项。",
        "trust_source_cn": "由区块链安全机构 Consensys 官方安全团队开源维护，集成 Gitleaks 规则库与 Diff 扫描机制，经实际代码提交测试验证。",
        "how_aligned_zh": "结合 OWASP Top 10 漏洞审计规范与 Gitleaks 凭据规则库，对生成的代码补丁执行自动化差异扫描，拦截 API 密钥与数据库连接串。"
    },

    # 42. license-compliance-audit
    "license-compliance-audit": {
        "timing_desc_cn": "开源发布前协议审计：在将项目公开发布或分发前，校验开源许可证与 SPDX 文件头合规性。",
        "summary_cn": "执行只读开源许可证合规审计，核查 LICENSE 文件、NOTICE 声明完整性以及源码文件中的 SPDX 许可证头一致性。",
        "why_chosen_cn": "排查 AI 编程中可能引入的开源许可证冲突。由 Apache 软件基金会相关项目开发，自动检查依赖许可证兼容性与声明完整性。",
        "why_care_cn": "AI 在编写代码时可能无意中引用了带有强传染性开源协议（如 GPL/AGPL）的代码片段，若直接混入商业或专有项目中，可能面临版权争议。该技能在发布前排查协议兼容性，指出潜在冲突。",
        "how_to_use_cn": "在准备发布代码前运行许可证审计指令，技能自动比对 LICENSE、NOTICE 与源文件头，输出缺失声明或协议冲突的文件清单。",
        "trust_source_cn": "源自 Apache 软件基金会 Magpie 项目，遵循 Apache 官方知识产权与许可证政策，只读审计不擅自修改代码文件。",
        "how_aligned_zh": "参照 ISO/IEC 5962:2021 SPDX 机器可读协议标签与 Apache 软件基金会依赖兼容性分类标准，检查代码库是否存在不兼容协议引用。"
    },

    # 43. agent-sandbox-skill
    "agent-sandbox-skill": {
        "timing_desc_cn": "执行前隔离门禁：在智能体执行高危脚本或破坏性命令前，将其限制在隔离沙盒中运行。",
        "summary_cn": "为智能体执行的代码与终端命令提供基于 E2B 的临时虚拟机隔离环境，防止误操作或恶意命令影响宿主机。",
        "why_chosen_cn": "针对具备终端与文件操作权限的 Agent 风险，将高危脚本与 Shell 命令重定向至隔离的临时微型虚拟机，保护宿主机系统安全。",
        "why_care_cn": "赋予 Agent 终端与文件写权限后，若遭遇提示词注入或模型理解偏差，可能在本地执行误删文件或修改系统配置的命令。该技能让高危操作在一次性沙盒中执行，即便出错也不会影响本地电脑。",
        "how_to_use_cn": "将技能复制到客户端目录中。在涉及代码执行或测试未知脚本时，命令智能体调用沙盒工具在隔离环境中完成运算与验证。",
        "trust_source_cn": "遵循 Agent Skills 开放标准，提供沙盒管理命令行工具，将高危命令与文件操作路由至隔离的临时微虚拟机中运行。",
        "how_aligned_zh": "针对 OWASP Agentic Top 10 中列出的过度授权与级联破坏风险，落实沙盒隔离措施，将执行操作限制在临时虚拟机边界内。"
    }
}

applied_count = 0
for it in items:
    item_id = it.get('id')
    if item_id in REVISIONS:
        rev = REVISIONS[item_id]
        if 'timing_desc_cn' in rev:
            it['timing_desc_cn'] = rev['timing_desc_cn']
        if 'summary_cn' in rev:
            it['summary_cn'] = rev['summary_cn']
        if 'why_chosen_cn' in rev:
            it['why_chosen_cn'] = rev['why_chosen_cn']
        if 'why_care_cn' in rev:
            it['why_care_cn'] = rev['why_care_cn']
        if 'how_to_use_cn' in rev:
            it['how_to_use_cn'] = rev['how_to_use_cn']
        if 'trust_source_cn' in rev and it.get('status'):
            it['status']['trust_source_cn'] = rev['trust_source_cn']
            it['status']['trust_source'] = rev['trust_source_cn']
        if 'how_aligned_zh' in rev and it.get('standard_alignment'):
            it['standard_alignment']['how_aligned_zh'] = rev['how_aligned_zh']
        applied_count += 1

print(f"Applied humanized text to {applied_count} items.")

with open(DATA_PATH, 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)
    f.write('\n')

print("site/data/items.json successfully updated.")
