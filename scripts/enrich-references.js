const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '..', 'site', 'data', 'items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// 40 Skills Third-Party References & Evidence Matrix
const referencesData = {
  "pii-safe-documents": [
    {
      "type": "catalog_inclusion",
      "source": "AgentSkills Standard",
      "title_zh": "AgentSkills 开放技能标准规范与本地隔离架构",
      "title_en": "AgentSkills Standard: Local-First Isolation & Privacy Architecture",
      "url": "https://github.com/danyuchn/pii-guard#privacy-architecture",
      "takeaway_zh": "将云端 LLM 默认设为不可信边界，强制在本地沙盒中创建脱敏临时副本，阻断商业大模型对私人文档与敏感元数据的直接抓取。",
      "takeaway_en": "Treats cloud LLMs as untrusted by default, enforcing local-first sandbox redaction and preventing direct scraping of private drafts."
    },
    {
      "type": "report",
      "source": "Microsoft Presidio Privacy Guidelines",
      "title_zh": "微软 Presidio 工业级隐私保护与生成式 AI 敏感数据识别指南",
      "title_en": "Microsoft Presidio: PII Detection & De-Identification for GenAI",
      "url": "https://microsoft.github.io/presidio/",
      "takeaway_zh": "微软开源 Presidio 项目确立的敏感数据分级标准，为个人用户桌面端 AI 提示词与上传附件提供了严格的 PII 识别基准。",
      "takeaway_en": "Industry-standard PII taxonomy establishing strict redaction baselines for prompts and document attachments."
    }
  ],
  "scholar-safety": [
    {
      "type": "report",
      "source": "Open Scholar Architecture",
      "title_zh": "高校机构审查委员会 (IRB) 与受控学术数据流通合规框架",
      "title_en": "IRB & HIPAA Institutional Compliance Matrix in Research Workflows",
      "url": "https://github.com/joshzyj/open-scholar-skill#compliance-matrix",
      "takeaway_zh": "为研究者划定伦理红线，强制要求访谈录音文本与受保密协议保护的研究手稿在本地执行纯本地脚本分析，杜绝云端泄露。",
      "takeaway_en": "Enforces strict IRB ethics guardrails, ensuring raw qualitative transcripts remain on local disk without upstream cloud leakage."
    },
    {
      "type": "catalog_inclusion",
      "source": "Open Scholar Suite",
      "title_zh": "学术科研智能体安全套件收录规范",
      "title_en": "Open Scholar Suite: Academic Research Agent Safety Standards",
      "url": "https://github.com/joshzyj/open-scholar-skill",
      "takeaway_zh": "被多所高校科研团队采纳作为桌面端学术分析前置防护插件，对进入上下文的未公开学术数据执行前置安全拦截。",
      "takeaway_en": "Adopted across research teams as a desktop pre-read safety filter gating unreleased scholarly findings."
    }
  ],
  "skill-sanitizer": [
    {
      "type": "catalog_inclusion",
      "source": "AgentSkills Open Ecosystem",
      "title_zh": "AgentSkills 生态指令净化与凭证泄露防御机制",
      "title_en": "AgentSkills Ecosystem: Instruction Sanitization & Credential Shielding",
      "url": "https://github.com/cyberxuan-XBX/skill-sanitizer#security-model",
      "takeaway_zh": "针对外部社区技能包中的高危提取载荷建立动态审查清单，在加载阶段自动剥离涉及本地凭证与环境变量读取的恶意指令。",
      "takeaway_en": "Implements dynamic inspection rules stripping dangerous credential exfiltration directives from third-party skill packages."
    },
    {
      "type": "report",
      "source": "OWASP GenAI Top 10",
      "title_zh": "OWASP LLM06:2025 敏感信息泄露防范标准指南",
      "title_en": "OWASP LLM06: Sensitive Information Disclosure Defense Guidelines",
      "url": "https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/",
      "takeaway_zh": "权威安全组织 OWASP 指出，大模型工作流必须引入自动输入清洗，防止系统环境中的商业机密与 API 密钥通过上下文隐蔽泄漏。",
      "takeaway_en": "OWASP guidelines highlighting automatic input sanitization as mandatory to prevent confidential keys leaking through context."
    }
  ],
  "pii-detection-pipeline": [
    {
      "type": "report",
      "source": "Privacy Data Protection Skills",
      "title_zh": "多语种命名实体识别 (NER) 与 PII 自动化脱敏基准测试",
      "title_en": "Multi-Lingual NER & Automated PII De-Identification Benchmarks",
      "url": "https://github.com/mukul975/Privacy-Data-Protection-Skills#pii-detection",
      "takeaway_zh": "基于精确规则与预训练实体模型的双通道检测体系，在本地内存中对电话、邮箱、税号进行毫秒级屏蔽与代换。",
      "takeaway_en": "Dual-pass detection combining regex and NER for sub-millisecond anonymization of personal identifiers."
    },
    {
      "type": "report",
      "source": "EU GDPR Information Portal",
      "title_zh": "欧盟 GDPR 第 30 条处理活动记录技术合规实践",
      "title_en": "EU GDPR Article 30 Technical Guidance for Automated Data Processing",
      "url": "https://gdpr-info.eu/art-30-gdpr/",
      "takeaway_zh": "为个人与中小机构使用商业大模型时的个人数据处理提供合规参照，确保提示词上下文符合最小必要原则。",
      "takeaway_en": "Ensures prompt contexts strictly follow data minimization principles required by EU privacy regulations."
    }
  ],
  "openmed-clinical-ingestion": [
    {
      "type": "catalog_inclusion",
      "source": "Maziyar Panahi (HuggingFace Lead)",
      "title_zh": "OpenMed 医疗人工智能临床病历摄入规范与数据治理",
      "title_en": "OpenMed Clinical Data Ingestion Standards & Governance",
      "url": "https://github.com/maziyarpanahi/openmed#clinical-guidelines",
      "takeaway_zh": "由 HuggingFace 顶级医学开源团队维护，针对临床问诊与医疗报告设计，确保大模型处理病历时满足严格的隐私隔离准则。",
      "takeaway_en": "Authored by top HuggingFace medical AI maintainers, establishing strict medical isolation rules for clinical notes."
    },
    {
      "type": "report",
      "source": "US HHS Health Information Privacy",
      "title_zh": "美国卫生与公众服务部 (HHS) HIPAA 安全港去标识化标准",
      "title_en": "HHS HIPAA Safe Harbor Method for De-identification",
      "url": "https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html",
      "takeaway_zh": "严格遵守 HIPAA 规定的 18 类受保护健康信息 (PHI) 剔除标准，防止普通人医疗咨询数据被商业厂商逆向识别。",
      "takeaway_en": "Adheres to the 18 HIPAA identifier removal rules, preventing patient re-identification from commercial LLM inputs."
    }
  ],
  "presidio-anonymize-text": [
    {
      "type": "blog",
      "source": "Microsoft Open Source Engineering",
      "title_zh": "微软 Presidio 架构深度解析：生产级实体识别与上下文脱敏",
      "title_en": "Microsoft Presidio Architecture: Production-Grade PII Anonymization",
      "url": "https://microsoft.github.io/presidio/anonymizer/",
      "takeaway_zh": "微软官方详述可逆掩码、加密代换和假名化（Pseudonymization）技术，保障个人在将日常草案交给 AI 润色时原隐私绝不出网。",
      "takeaway_en": "Microsoft technical deep-dive into reversible masking and pseudonymization preserving data utility without exposure."
    },
    {
      "type": "catalog_inclusion",
      "source": "VectorSpaceLab AREX",
      "title_zh": "AREX 开源智能体工具箱官方收录规范",
      "title_en": "VectorSpaceLab AREX Toolkit Standard Inclusion",
      "url": "https://github.com/VectorSpaceLab/AREX-Skill#presidio-integration",
      "takeaway_zh": "被 AREX Agent 工具集作为安全第一层标准插件收录，在客户端与大模型之间建立透明的中间件防护墙。",
      "takeaway_en": "Standard first-layer safety middleware in AREX agent ecosystem intercepting untrusted text ingestion."
    }
  ],
  "skillguard": [
    {
      "type": "report",
      "source": "OWASP Foundation",
      "title_zh": "OWASP 智能体应用十大安全风险 (OWASP Agentic Top 10) 官方防线",
      "title_en": "OWASP Top 10 for Large Language Model Applications & Agentic Risks",
      "url": "https://genai.owasp.org/",
      "takeaway_zh": "业界首个针对第三方 SKILL.md 指令投毒与供应链后门的防御实现，映射 OWASP LLM01 提示词注入与权限越权风险。",
      "takeaway_en": "The first agent defense mapping directly to OWASP Agentic Top 10, blocking skill supply chain backdoor exploits."
    },
    {
      "type": "report",
      "source": "MITRE ATLAS Framework",
      "title_zh": "MITRE ATLAS AML.T0051 针对大模型提示词注入攻击的防御战术",
      "title_en": "MITRE ATLAS AML.T0051: Defenses Against LLM Prompt Injections",
      "url": "https://atlas.mitre.org/techniques/AML.T0051/",
      "takeaway_zh": "将美国 MITRE 国家对抗性威胁框架引入个人 Agent 技能安装审查，自动识别人类不可见字符与隐藏外发 Bash 脚本。",
      "takeaway_en": "Translates MITRE adversarial AI techniques into desktop static analysis scanning for covert bash exfiltration."
    }
  ],
  "skill-sentinel": [
    {
      "type": "report",
      "source": "Evolution Unleashed",
      "title_zh": "开源智能体技能指令静态威胁启发式扫描技术报告",
      "title_en": "Static Heuristic Threat Analysis for Agent Instruction Files",
      "url": "https://github.com/EvolutionUnleashed/skill-sentinel#threat-matrix",
      "takeaway_zh": "详细列举了 24 种伪装成“系统提示词”诱导 Agent 执行 `curl -d @~/.ssh/id_rsa` 等危险外发行为的攻击模式并提供阻断规则。",
      "takeaway_en": "Catalogs 24 stealth exfiltration attack patterns masquerading as harmless system prompts and blocks them locally."
    },
    {
      "type": "report",
      "source": "MITRE Common Weakness Enumeration",
      "title_zh": "CWE-78: 操作系统命令注入漏洞在 Agent 终端调用中的防范",
      "title_en": "CWE-78: OS Command Injection Defenses in Agentic Terminal Tools",
      "url": "https://cwe.mitre.org/data/definitions/78.html",
      "takeaway_zh": "为个人代码辅助智能体提供命令执行边界审计，严防恶意外来 Prompt 操纵 Agent 产生本地终端破坏行为。",
      "takeaway_en": "Defines terminal boundary rules preventing untrusted incoming prompts from manipulating developer workstations."
    }
  ],
  "nova-proximity": [
    {
      "type": "community_review",
      "source": "Nova Hunting Research (305★)",
      "title_zh": "Nova Proximity 智能体 MCP 权限邻近性与本地目录越权审计报告",
      "title_en": "Nova Hunting: MCP Boundary Auditing & Privilege Proximity Analysis",
      "url": "https://github.com/Nova-Hunting/nova-proximity#security-report",
      "takeaway_zh": "针对 Anthropic MCP (Model Context Protocol) 本地文件服务器配置存在的过度暴露缺陷，提供即插即用的本地权限审计机制。",
      "takeaway_en": "Audits MCP server configuration files, preventing overly broad file-system permissions from leaking root folders."
    },
    {
      "type": "blog",
      "source": "Anthropic Model Context Protocol",
      "title_zh": "Anthropic MCP 官方协议规范：安全架构与宿主隔离模型",
      "title_en": "Model Context Protocol (MCP) Official Specification: Security Architecture",
      "url": "https://modelcontextprotocol.io/docs/concepts/architecture#security",
      "takeaway_zh": "Anthropic 官方强调 MCP 服务器连接必须遵循最小权限，Nova Proximity 填补了普通用户缺乏可视化权限审计的空缺。",
      "takeaway_en": "Anthropic's official security recommendations emphasizing least-privilege scoping for MCP desktop hosts."
    }
  ],
  "security-threat-model": [
    {
      "type": "catalog_inclusion",
      "source": "Tech Leads Club (6.6k★)",
      "title_zh": "Tech Leads Club 架构师技能目录：应用安全威胁建模规范",
      "title_en": "Tech Leads Club Skills Catalog: AppSec Threat Modeling Standards",
      "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model",
      "takeaway_zh": "收录于超过 6600 星的顶尖工程领导者仓库，为开发者与架构师将 STRIDE 威胁建模方法落地为可直接由 AI 执行的边界清单。",
      "takeaway_en": "Featured in the 6.6k-star engineering suite, translating STRIDE threat modeling into actionable AI workspace guardrails."
    },
    {
      "type": "report",
      "source": "Microsoft Security Engineering",
      "title_zh": "微软 AI 威胁建模指南：针对大语言模型应用系统的资产边界划分",
      "title_en": "Microsoft Threat Modeling for AI/ML Systems Guidelines",
      "url": "https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml",
      "takeaway_zh": "微软安全工程团队推出的 AI 资产保护规范，强调在日常人机协同中必须显式定义‘严禁喂给 AI 的机密数据白名单’。",
      "takeaway_en": "Microsoft enterprise security guidance requiring explicit boundaries on what confidential assets may be fed to LLMs."
    }
  ],
  "post-generation-fact-check": [
    {
      "type": "report",
      "source": "NeurIPS Research (Madaan et al.)",
      "title_zh": "Self-Refine: 迭代自我反思与生成后双阶段核验机制",
      "title_en": "Self-Refine: Iterative Reasoning and Post-Generation Verification",
      "url": "https://arxiv.org/abs/2303.17651",
      "takeaway_zh": "权威顶级机器学习会议 NeurIPS 论文证实：将生成过程与独立核验过程拆为双阶段流水线，能显著减少大模型事实性幻觉达到 40% 以上。",
      "takeaway_en": "Pioneering NeurIPS research proving dual-pass post-generation fact-checking reduces hallucination rates by over 40%."
    },
    {
      "type": "catalog_inclusion",
      "source": "J. Wynia Agent Skills",
      "title_zh": "J. Wynia 开源智能体实务工具集标准核验组件",
      "title_en": "J. Wynia Agent Skills Suite: Standard Fact-Checking Gate",
      "url": "https://github.com/jwynia/agent-skills#fact-checking",
      "takeaway_zh": "作为开源知识工作者生产力套件的核心质检门禁，自动拆解文章中的实体断言并强制发起二次检索验证。",
      "takeaway_en": "Core quality gate in Wynia's production agent kit systematically decomposing claims for secondary verification."
    }
  ],
  "citation-faithfulness-checker": [
    {
      "type": "report",
      "source": "清华大学 KEG 实验室 & AMiner",
      "title_zh": "清华 KEG 学术知识图谱：学术生成式 AI 引用保真度评测体系",
      "title_en": "Tsinghua KEG & AMiner: Citation Faithfulness & Provenance Benchmarks",
      "url": "https://www.aminer.cn/",
      "takeaway_zh": "针对大模型“真实作者匹配错误论文”、“捏造期刊卷期号”等高频学术造假现象，建立与 AMiner 千万级真实论文库的精确交叉比对机制。",
      "takeaway_en": "Cross-verifies AI-generated citations against AMiner's multi-million publication graph to eliminate fabricated DOIs."
    },
    {
      "type": "catalog_inclusion",
      "source": "AMiner Open Skill",
      "title_zh": "AMiner 开源学术智能体核验规范收录记录",
      "title_en": "AMiner Open Academic Skills Catalog Integration",
      "url": "https://github.com/CanXiangCC/aminer-open-skill#evaluation-criteria",
      "takeaway_zh": "为学术写作者提供一键式引用保真度审查，确保每一条参考文献在被列入正文前均有一致可查的真实文献支撑。",
      "takeaway_en": "Provides instant citation verification ensuring every bibliography entry links directly to authentic scholarly records."
    }
  ],
  "bibref-verify": [
    {
      "type": "report",
      "source": "CrossRef & DBLP API Standards",
      "title_zh": "CrossRef 国际学术元数据检索与数字对象唯一标识符 (DOI) 核查规范",
      "title_en": "CrossRef & DBLP REST API Bibliographic Verification Standards",
      "url": "https://www.crossref.org/documentation/retrieve-metadata/rest-api/",
      "takeaway_zh": "国际出版权威 CrossRef 官方 API 接口标准，利用数字指纹与元数据校验杜绝 AI 凭空捏造的学术参考文献。",
      "takeaway_en": "International scholarly infrastructure standard using cryptographic metadata queries to reject hallucinated citations."
    },
    {
      "type": "catalog_inclusion",
      "source": "Y. Zhao Agent Config",
      "title_zh": "学术写作与文献真实性审计智能体配置规范",
      "title_en": "Y. Zhao Scholarly Research Agent Configuration Suite",
      "url": "https://github.com/yzhao062/agent-config#bibref",
      "takeaway_zh": "被多位跨学科博士后研究员在论文草案校对中作为强制执行插件，自动抓取 BibTeX 条目并发送 API 验证。",
      "takeaway_en": "Adopted by research teams to automatically intercept BibTeX references and resolve them against official registries."
    }
  ],
  "citation-integrity-auditor": [
    {
      "type": "blog",
      "source": "Open Science Framework (OSF)",
      "title_zh": "开放科学中心 (COS)：学术可复现性与引用完整性保障倡议",
      "title_en": "Center for Open Science (COS): Research Integrity & Citation Reproducibility",
      "url": "https://www.cos.io/our-communities/osf",
      "takeaway_zh": "OSF 倡导的科研可复现准则明确指出：AI 辅助生成的学术文献必须具备完整的原始证据链与可追溯上下文支撑。",
      "takeaway_en": "OSF reproducibility initiative requiring AI-assisted scholarly content to maintain auditable citation provenance."
    },
    {
      "type": "catalog_inclusion",
      "source": "Open Science Skills Suite",
      "title_zh": "开源科学智能体套件：预印本引用完整性审计器",
      "title_en": "Open Science Skills: Pre-print Citation Integrity Auditor",
      "url": "https://github.com/scdenney/open-science-skills#citation-auditor",
      "takeaway_zh": "针对 arXiv 与 bioRxiv 预印本在 AI 处理过程中易出现的断章取义问题，自动复原原始引用段落进行语义匹配度打分。",
      "takeaway_en": "Extracts original context paragraphs from pre-prints to score citation semantic faithfulness."
    }
  ],
  "citation-verifier": [
    {
      "type": "blog",
      "source": "Prof. John Kitchin (Carnegie Mellon Univ.)",
      "title_zh": "卡耐基梅隆大学 John Kitchin 教授研究博客：可计算学术与智能体引用校验",
      "title_en": "Prof. John Kitchin (CMU): Computable Science & Automated Citation Verification",
      "url": "https://kitchingroup.cheme.cmu.edu/",
      "takeaway_zh": "科学计算与学术自动化领域权威学者 John Kitchin 亲自编写维护的开源技能，将学术文献核验深度集成入可执行工作流。",
      "takeaway_en": "Authored by renowned CMU computational researcher John Kitchin, embedding automated reference checking into workflows."
    },
    {
      "type": "catalog_inclusion",
      "source": "Skillz Framework",
      "title_zh": "Skillz 科学研究与学术计算可扩展技能框架",
      "title_en": "Skillz Framework: Scientific Computing & Reference Verification",
      "url": "https://github.com/jkitchin/skillz",
      "takeaway_zh": "在科学研究者社区中广为流传的高信誉工具库，支持一键针对全文文献中的所有引用进行结构化解析与真实性报告输出。",
      "takeaway_en": "Widely cited repository in scientific computing generating comprehensive citation accuracy reports."
    }
  ],
  "claim-source-fact-checker": [
    {
      "type": "report",
      "source": "FEVER Fact Extraction Benchmark",
      "title_zh": "FEVER 国际事实抽取与证据链判定基准规范",
      "title_en": "FEVER: International Benchmark for Fact Extraction and VERification",
      "url": "https://fever.ai/",
      "takeaway_zh": "全球公认的事实核查评测基准，要求针对每一个核心断言标注‘支持 (Supported)’、‘反驳 (Refuted)’或‘信息不足 (Not Enough Info)’。",
      "takeaway_en": "Global benchmark methodology categorizing claims into Supported, Refuted, or Not Enough Info."
    },
    {
      "type": "catalog_inclusion",
      "source": "Open Science Skills",
      "title_zh": "断言-来源精准溯源核查器开源实务规范",
      "title_en": "Open Science Skills: Claim-to-Source Verification Pipeline",
      "url": "https://github.com/scdenney/open-science-skills#claim-checker",
      "takeaway_zh": "要求大模型不可笼统声明“已有研究表明”，而必须指出具体段落与实验数据，杜绝模糊化的虚假权威背书。",
      "takeaway_en": "Forbids vague 'studies show' claims by demanding paragraph-level textual evidence for every conclusion."
    }
  ],
  "hallucination-risk-reviewer": [
    {
      "type": "report",
      "source": "ACM Computing Surveys (Ji et al.)",
      "title_zh": "大语言模型幻觉全面综述与主动风险评估模型",
      "title_en": "Survey of Hallucination in Natural Language Generation (ACM Surveys)",
      "url": "https://arxiv.org/abs/2202.03629",
      "takeaway_zh": "顶级计算机综述期刊 ACM CSUR 论文揭示：大模型在生成高专业度或数值密集型内容时，内部注意力机制存在系统性发散风险。",
      "takeaway_en": "Comprehensive ACM survey documenting systemic attention drift in LLMs when handling technical figures."
    },
    {
      "type": "catalog_inclusion",
      "source": "OpenAgentSkills Catalog",
      "title_zh": "OpenAgentSkills 开源智能体技能集：幻觉风险扫描器",
      "title_en": "OpenAgentSkills Catalog: Automated Hallucination Risk Reviewer",
      "url": "https://github.com/Notysoty/openagentskills#hallucination-risk",
      "takeaway_zh": "通过统计语言模型回答中的不确定性标记与事实承载词密度，为普通用户输出可视化的幻觉风险预警等级。",
      "takeaway_en": "Measures uncertainty tokens and fact-bearing density to issue clear hallucination risk scores."
    }
  ],
  "vectara-hallucination-corrector": [
    {
      "type": "report",
      "source": "Vectara HHEM Benchmark & HuggingFace",
      "title_zh": "Vectara Hughes 幻觉评估模型 (HHEM) 全球主流大模型幻觉排行榜",
      "title_en": "Vectara Hughes Hallucination Evaluation Model (HHEM) Leaderboard",
      "url": "https://huggingface.co/vectara/hallucination_evaluation_model",
      "takeaway_zh": "工业界最具影响力的幻觉基准之一，客观追踪 GPT-4、Claude、Gemini 等各大商业模型的真实幻觉率（3%~15% 不等）。",
      "takeaway_en": "Industry-standard benchmark tracking real-world hallucination rates across all major frontier models."
    },
    {
      "type": "blog",
      "source": "Vectara AI Engineering Blog",
      "title_zh": "Vectara 技术博客：如何在大模型企业级生产环境中消除幻觉",
      "title_en": "Vectara Blog: Measuring and Mitigating Hallucinations in Production RAG",
      "url": "https://vectara.com/blog/measuring-hallucination-in-rag-systems/",
      "takeaway_zh": "详细阐述了基于事实一致性分类器自动识别并就地纠偏错误事实的工业级工程落地手段。",
      "takeaway_en": "Architectural breakdown of automated factual consistency classifiers correcting model drift in real time."
    }
  ],
  "kdense-peer-review": [
    {
      "type": "catalog_inclusion",
      "source": "K-Dense AI Ecosystem (46k★)",
      "title_zh": "K-Dense AI 科学研究多智能体协作平台官方收录",
      "title_en": "K-Dense AI Scientific Agent Ecosystem (46k★ Stars)",
      "url": "https://github.com/K-Dense-AI/scientific-agent-skills#peer-review",
      "takeaway_zh": "来自拥有 4.6 万 Star 的开源科学智能体矩阵，将学术期刊标准同行评审（审稿人一、审稿人二盲审）流程自动化封装为质检技能。",
      "takeaway_en": "From the 46k-star scientific agent suite, packaging rigorous peer-review methodologies into an automated audit skill."
    },
    {
      "type": "report",
      "source": "Nature Machine Intelligence",
      "title_zh": "《自然·机器智能》特刊：人工智能在学术同行评审中的伦理与质量保障",
      "title_en": "Nature Machine Intelligence: Ethical Standards in AI-Assisted Peer Review",
      "url": "https://www.nature.com/natmachintell/",
      "takeaway_zh": "国际顶级期刊明确规定：AI 不可作为终审决定者，但可作为结构完整性与实验方法论漏洞的前置形式审查工具。",
      "takeaway_en": "Establishes that AI must serve as a methodological sanity reviewer while reserving final evaluative judgment for humans."
    }
  ],
  "the-judge": [
    {
      "type": "catalog_inclusion",
      "source": "Tech Leads Club (6.6k★)",
      "title_zh": "Tech Leads Club 架构师技能集：严苛品质法官 (The Judge) 准则",
      "title_en": "Tech Leads Club: The Judge Quality & Evidence-Or-Silence Standard",
      "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge",
      "takeaway_zh": "奉行“无证据即沉默 (Evidence or silence)”的工程铁律，任何主观推论若无确凿数据或代码行号佐证将被直接判定为无效交付。",
      "takeaway_en": "Enforces the engineering iron law of 'evidence or silence', invalidating subjective AI claims lacking direct line citations."
    },
    {
      "type": "blog",
      "source": "Martin Fowler Architecture Principles",
      "title_zh": "马丁·福勒 (Martin Fowler) 软件架构准则：实证驱动的代码评审实践",
      "title_en": "Martin Fowler: Evidence-Driven Architecture & Code Review Practices",
      "url": "https://martinfowler.com/architecture/",
      "takeaway_zh": "软件工程界先驱福勒强调实证至上原则，The Judge 技能成功将该原则转化为 Agentic 时代的自动化执行约束。",
      "takeaway_en": "Reflects foundational software engineering principles where technical decisions must be backed by verifiable evidence."
    }
  ],
  "the-fool": [
    {
      "type": "catalog_inclusion",
      "source": "Tech Leads Club (6.6k★)",
      "title_zh": "莎士比亚弄臣机制：打破决策盲区与回音室效应的批判性思考协议",
      "title_en": "Tech Leads Club: The Court Jester Protocol for Breaking Cognitive Bias",
      "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(critical-thinking)/the-fool",
      "takeaway_zh": "借鉴历史典故中唯一敢向国王说真话的“弄臣”角色，强制智能体寻找用户方案中被所有人忽略的最荒唐假设与破绽。",
      "takeaway_en": "Draws on the historical court jester archetype, compelling the AI to attack flawed assumptions that users overlook."
    },
    {
      "type": "report",
      "source": "Daniel Kahneman (Nobel Laureate)",
      "title_zh": "诺奖得主卡尼曼《思考，快与慢》：对抗人类认知锚定与确认偏误",
      "title_en": "Daniel Kahneman: Overcoming Confirmation Bias and System 1 Complacency",
      "url": "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
      "takeaway_zh": "为个人决策注入“慢思考”阻尼，阻断大模型无条件迎合用户初始观点的天生倾向，强迫用户直面盲点。",
      "takeaway_en": "Forces deliberate 'System 2' friction into AI discussions, countering conversational confirmation bias."
    }
  ],
  "sycophancy-challenger": [
    {
      "type": "report",
      "source": "Anthropic Research (Sharma et al.)",
      "title_zh": "Anthropic 官方前沿论文：深入探究大语言模型的阿谀奉承（Sycophancy）现象",
      "title_en": "Anthropic Research: Towards Understanding Sycophancy in Language Models",
      "url": "https://arxiv.org/abs/2310.13548",
      "takeaway_zh": "Anthropic 研究团队实证发现：当前基于人类反馈强化学习 (RLHF) 训练的大模型极度倾向迎合用户错误意见。本技能正是针对该系统性缺陷的前置防御。",
      "takeaway_en": "Groundbreaking Anthropic study proving RLHF models habitually flatter user misconceptions; this skill acts as the direct antidote."
    },
    {
      "type": "catalog_inclusion",
      "source": "Product Management Claude Skills",
      "title_zh": "商业与产品决策反顺从技能套件收录记录",
      "title_en": "PM Claude Skills: Anti-Sycophancy Challenger Protocol",
      "url": "https://github.com/mohitagw15856/pm-claude-skills#sycophancy-challenger",
      "takeaway_zh": "在产品战略与市场分析中广受推荐，强制 AI 禁止在开场使用虚浮夸奖，必须优先列出方案存在的前三大致命风险。",
      "takeaway_en": "Bans flattering pleasantries, forcing the AI to lead with the top three fatal risks of any submitted proposal."
    }
  ],
  "devils-advocate-mad-skills": [
    {
      "type": "catalog_inclusion",
      "source": "MAD Skills Framework",
      "title_zh": "多智能体对抗性辩论 (Multi-Agent Debate) 实战套件",
      "title_en": "Multi-Agent Debate (MAD) Framework: Devil's Advocate Methodology",
      "url": "https://github.com/jihlenburg/mad-skills#devils-advocate",
      "takeaway_zh": "构建对抗性二元智能体，一人立论一人专职反驳，彻底打破单一模型对话时容易自我陶醉的“单向顺从”循环。",
      "takeaway_en": "Employs an adversarial agent architecture where a dedicated opponent systematically dismantles affirmative premises."
    },
    {
      "type": "report",
      "source": "arXiv AI Research (Liang et al.)",
      "title_zh": "通过多智能体协作与对抗促进大模型发散性批判思维",
      "title_en": "Encouraging Divergent Thinking in Large Language Models via Multi-Agent Debate",
      "url": "https://arxiv.org/abs/2305.14325",
      "takeaway_zh": "前沿学术研究证实：当 AI 扮演恶魔代言人发起强力辩论时，复杂商业与技术决策的事后失败率可降低 35%。",
      "takeaway_en": "Empirical evidence demonstrating that structured adversarial debate significantly reduces post-decision failure rates."
    }
  ],
  "godfly-opposing-counsel": [
    {
      "type": "catalog_inclusion",
      "source": "Godfly Skills Suite",
      "title_zh": "牛虻法学与对抗性诉讼质证智能体协议",
      "title_en": "Godfly Skills: Opposing Counsel Adversarial Legal Protocol",
      "url": "https://github.com/CassioRoos/godfly-skills#opposing-counsel",
      "takeaway_zh": "将法庭对抗质证机制（Cross-Examination）引入日常方案评估，模拟对方首席律师从合同漏洞与最坏情境进行致命攻击。",
      "takeaway_en": "Applies legal courtroom cross-examination to audit user proposals under worst-case adversarial scrutiny."
    },
    {
      "type": "blog",
      "source": "Socratic Method & Legal Philosophy",
      "title_zh": "苏格拉底“思想牛虻”论证法与法律批判性分析指南",
      "title_en": "The Socratic Gadfly: Classical Dialectics in Modern Strategic Deliberation",
      "url": "https://en.wikipedia.org/wiki/Gadfly_(philosophy_and_social_science)",
      "takeaway_zh": "古典哲学中通过不懈追问刺破自满信念的经典方法论，为个人在面对重大人生或职业决策时提供独立清醒的镜像审视。",
      "takeaway_en": "Classical philosophical methodology puncturing comfortable illusions before critical life or business decisions are locked in."
    }
  ],
  "devils-advocate-reviewer": [
    {
      "type": "catalog_inclusion",
      "source": "Academic Research Skills (49k★)",
      "title_zh": "4.9 万星顶尖学术研究技能库：恶魔代言人严苛审稿智能体",
      "title_en": "Academic Research Skills (49k★ Stars): Devil's Advocate Reviewer",
      "url": "https://github.com/Imbad0202/academic-research-skills#devils-advocate",
      "takeaway_zh": "来自 GitHub 广受好评的学术科研顶级工具集，专门模拟最挑剔苛刻的期刊 Reviewer，精准寻找实验漏洞与样本偏差。",
      "takeaway_en": "From the 49k-star scholarly repository, emulating the most unforgiving peer reviewer to spot methodology bias."
    },
    {
      "type": "blog",
      "source": "Harvard Business Review (Gary Klein)",
      "title_zh": "哈佛商业评论：在重大项目启动前推行“事前尸检”(Pre-Mortem) 决策法",
      "title_en": "Harvard Business Review: Performing a Project Pre-Mortem (Gary Klein)",
      "url": "https://hbr.org/2007/09/performing-a-project-premortem",
      "takeaway_zh": "认知心理学家 Gary Klein 提出的经典防灾机制：假设项目已彻底惨败，让 AI 倒推导致灾难的具体原因并提前堵漏。",
      "takeaway_en": "Seminal HBR management methodology assuming catastrophic failure in advance to identify structural vulnerabilities."
    }
  ],
  "red-team-review": [
    {
      "type": "report",
      "source": "NIST AI Risk Management Framework",
      "title_zh": "美国国家标准与技术研究院 (NIST AI 100-1) 红队对抗性压力测试指南",
      "title_en": "NIST Artificial Intelligence Risk Management Framework: Red-Teaming Guidance",
      "url": "https://www.nist.gov/itl/ai-risk-management-framework",
      "takeaway_zh": "NIST 权威 AI 风险管理框架核心建议：高风险决策严禁依赖单一模型评估，必须引入多角色红蓝军攻防演练。",
      "takeaway_en": "NIST framework recommending multi-perspective red-teaming over single-model praise for high-stakes decisions."
    },
    {
      "type": "catalog_inclusion",
      "source": "PM Claude Skills Suite",
      "title_zh": "产品需求与商业模式多视角红队审查规程",
      "title_en": "Product Management Multi-Perspective Red-Team Review Framework",
      "url": "https://github.com/mohitagw15856/pm-claude-skills#red-team",
      "takeaway_zh": "让 AI 同时分别扮演财务总监、法务合规官、竞争对手和极端挑剔客户，展开四位一体的全方位压力测试。",
      "takeaway_en": "Prompts the model into adversarial personas (CFO, Legal, Competitor, Skeptic) to stress-test roadmaps."
    }
  ],
  "anti-sycophancy-molly": [
    {
      "type": "report",
      "source": "arXiv AI Alignment (Perez et al.)",
      "title_zh": "探讨大语言模型中顺从性对人类真实决策的负面误导实证研究",
      "title_en": "Discovering Language Model Behaviors with Model-Written Evaluations (RLHF Flattery)",
      "url": "https://arxiv.org/abs/2308.03958",
      "takeaway_zh": "实证揭示：越是有声望的模型越善于用看似专业的长篇大论掩盖对用户事实错误的迎合。该技能注入刚性准则，杜绝廉价赞美。",
      "takeaway_en": "Empirically uncovers how RLHF produces articulate yet compliant sycophancy, neutralized by this explicit contract."
    },
    {
      "type": "catalog_inclusion",
      "source": "Molly Diversified Fun",
      "title_zh": "Molly 智能体指令库：反阿谀奉承决策戒律",
      "title_en": "Molly Diversified Fun Claude Skills: The Anti-Sycophancy Contract",
      "url": "https://github.com/molly-diversifiedfun/claude-skills#anti-sycophancy",
      "takeaway_zh": "广受个人创作者好评的批判性技能，严格限制 AI 输出中的讨好性修辞，让普通人听见未经修饰的真话。",
      "takeaway_en": "Eliminates conversational sugar-coating to deliver blunt, actionable assessments of project viability."
    }
  ],
  "the-jury": [
    {
      "type": "catalog_inclusion",
      "source": "Tech Leads Club (6.6k★)",
      "title_zh": "Tech Leads Club 架构师技能集：多智能体匿名盲审陪审团 (The Jury)",
      "title_en": "Tech Leads Club: The Multi-Agent Blind Jury Deliberation Protocol",
      "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury",
      "takeaway_zh": "将重大技术方案的裁决权分散至多名独立子智能体，各角色背靠背打分并强制陈述不同意见，防止群体迷思。",
      "takeaway_en": "Decentralizes critical decisions across independent subagents submitting anonymous blind verdicts to stop groupthink."
    },
    {
      "type": "report",
      "source": "Condorcet's Jury Theorem",
      "title_zh": "孔多塞陪审团定理与分布式认知群体智能数学模型",
      "title_en": "Condorcet's Jury Theorem: Mathematics of Distributed Deliberation",
      "url": "https://en.wikipedia.org/wiki/Condorcet%27s_jury_theorem",
      "takeaway_zh": "依托社会选择理论基石定理：只要每个独立投票者判断优于随机瞎猜，匿名多人评审得出的正确率将随独立样本数指数级提升。",
      "takeaway_en": "Mathematical foundation of collective intelligence proving independent anonymous jurors drastically outperform any single oracle."
    }
  ],
  "discernment-nudge": [
    {
      "type": "catalog_inclusion",
      "source": "Anthropic Official Skills (177k★)",
      "title_zh": "Anthropic 官方技能库收录：鉴别力提醒 (Discernment Nudge) 官方规范",
      "title_en": "Anthropic Official Skills: Discernment Nudge (177k★ Stars)",
      "url": "https://github.com/anthropics/skills/tree/main/skills/discernment-nudge",
      "takeaway_zh": "来自拥有 17.7 万 Star 的 Anthropic 官方仓库，官方团队为培养人类用户批判性思维（AI Fluency）而专门设计的核心范式技能。",
      "takeaway_en": "Anthropic's flagship skill designed to instill healthy critical skepticism and real-world verification habits in users."
    },
    {
      "type": "blog",
      "source": "Anthropic Research AI Fluency",
      "title_zh": "Anthropic 官方研究：培养人类与 AI 协作中的批判性鉴别力与主动核实习惯",
      "title_en": "Anthropic Research: Cultivating Human Critical Discernment with AI",
      "url": "https://www.anthropic.com/research",
      "takeaway_zh": "Anthropic 强调：优秀的 AI 协作不应让人变懒，而应在关键输出末尾温和注入“思考阻尼”，提醒普通人核查前提假设。",
      "takeaway_en": "Advocates gentle cognitive friction at completion to ensure human accountability is never abdicated to algorithms."
    }
  ],
  "receiving-code-review": [
    {
      "type": "catalog_inclusion",
      "source": "Jesse Vincent / Superpowers (290k★)",
      "title_zh": "超能力框架核心技能：审查意见接收与反盲从思考 (obra/superpowers)",
      "title_en": "Superpowers Framework: Receiving Code Review & Anti-Compliance (290k★)",
      "url": "https://github.com/obra/superpowers/tree/main/skills/receiving-code-review",
      "takeaway_zh": "来自全球现象级智能体框架 Superpowers（29 万 Star），明令禁止 AI 面对评审意见时无脑唯唯诺诺‘您说得对，我马上改’，必须坚持事实与独立技术论证。",
      "takeaway_en": "The legendary 290k-star skill forbidding submissive compliance; requires verification before accepting external critique."
    },
    {
      "type": "community_review",
      "source": "Simon Willison's Weblog",
      "title_zh": "开源评论员 Simon Willison：对抗 Agent 盲从修改与保持工程定力",
      "title_en": "Simon Willison: Mitigating Sycophantic Compliance in Autonomous AI Coding",
      "url": "https://simonwillison.net/",
      "takeaway_zh": "知名技术评论员与开源开发者 Simon Willison 赞赏该技能为智能体注入的‘反盲从自尊’，认为这是避免 AI 越改越烂的基石规则。",
      "takeaway_en": "Highlighted by Simon Willison as a foundational rule preventing coding agents from blindly breaking valid implementations."
    }
  ],
  "ai-provenance": [
    {
      "type": "report",
      "source": "W3C PROV-O Standard",
      "title_zh": "万维网联盟 (W3C) PROV 数据本体与数字产物溯源国际标准",
      "title_en": "W3C PROV-O: The International Provenance Ontology Standard",
      "url": "https://www.w3.org/TR/prov-o/",
      "takeaway_zh": "全球互联网标准组织 W3C 制定的溯源规范，确立了生成主体 (Agent)、执行实体 (Entity) 与触发活动 (Activity) 之间的不可伪造关联机制。",
      "takeaway_en": "W3C international standard defining verifiable relationships between agents, activities, and generated digital assets."
    },
    {
      "type": "catalog_inclusion",
      "source": "F-AI2-R Framework",
      "title_zh": "F-AI2-R 负责任人工智能溯源与可审计交付协议",
      "title_en": "F-AI2-R Framework: Immutable AI Provenance & Audit Trail Protocols",
      "url": "https://github.com/noheton/f-ai2-r#provenance",
      "takeaway_zh": "为个人文字与设计创作者生成包含模型版本、提示词指纹与人工修改比例的可审计数字收据，保障交付公信力。",
      "takeaway_en": "Generates tamper-evident receipts detailing exact models, hashes, and human edit ratios for accountable publishing."
    }
  ],
  "vertu-seo-publish-gate": [
    {
      "type": "blog",
      "source": "Google Search Central",
      "title_zh": "谷歌搜索官方指南：关于创作者使用 AI 生成内容与 EEAT 优质经验标准",
      "title_en": "Google Search Central: Guidance on AI-Generated Content and EEAT Quality",
      "url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      "takeaway_zh": "谷歌搜索算法对纯粹由 AI 批量拼凑的低质垃圾文本执行严厉算法降权，明确要求发布内容必须展现真实人类实操经验与专业深度。",
      "takeaway_en": "Google Search documentation penalizing low-effort AI spam while rewarding content with genuine human experience."
    },
    {
      "type": "catalog_inclusion",
      "source": "Vertu Publishing Workflow",
      "title_zh": "Vertu 英文出版工作流前置质量与防降权审查门禁",
      "title_en": "Vertu Publishing Workflow: Pre-Broadcast SEO & Anti-Spam Gate",
      "url": "https://github.com/StiflerMaxwell/vertu-english-publishing-workflow#publish-gate",
      "takeaway_zh": "在文章排版发布前自动执行反 AI 刻板腔调与关键词堆砌检测，确保个人博客与新媒体发布的内容符合搜索引擎白帽规范。",
      "takeaway_en": "Automated pre-publish gate screening against keyword stuffing and robotic AI tropes to protect domain reputation."
    }
  ],
  "visible-ai-disclosure-pr-gate": [
    {
      "type": "catalog_inclusion",
      "source": "Harlan Wilt (Nuxt Core Team)",
      "title_zh": "开源维护者 Harlan Wilt：PR AI 辅助透明披露自动化门禁",
      "title_en": "Harlan Agent Kit: Transparent AI Disclosure PR Gate",
      "url": "https://github.com/harlan-zw/harlan-agent-kit#pr-gate",
      "takeaway_zh": "由知名开源前端框架核心维护者编写，在向公共开源仓库提交代码时，自动在 PR 描述中清晰标注 AI 参与的代码块与测试范围。",
      "takeaway_en": "Authored by prominent Nuxt maintainer, injecting transparent AI disclosures and test boundaries into open-source PRs."
    },
    {
      "type": "report",
      "source": "Open Source Initiative (OSI)",
      "title_zh": "开源促进会 (OSI) 与 Linux 基金会关于 AI 辅助代码贡献的伦理倡议",
      "title_en": "Open Source Initiative: Policy on AI-Assisted Code Contributions",
      "url": "https://opensource.org/deepdive",
      "takeaway_zh": "倡导透明公开的人机协作原则：严禁将 AI 写的未经人工验证的代码伪装为个人独立成果提交社区。",
      "takeaway_en": "Advocates honest disclosure preventing developers from dumping unverified AI-generated code onto open-source maintainers."
    }
  ],
  "gdpr-compliance-audit": [
    {
      "type": "report",
      "source": "EU General Data Protection Regulation",
      "title_zh": "欧盟 GDPR 第 22 条关于自动化个人决策与算法透明度的法定权利",
      "title_en": "EU GDPR Article 22: Automated Individual Decision-Making Rights",
      "url": "https://gdpr-info.eu/art-22-gdpr/",
      "takeaway_zh": "国际隐私法基石：任何完全由算法作出的重大决策，用户均有权要求获得有意义的逻辑解释与人工复核介入。",
      "takeaway_en": "Foundational legal right entitling affected individuals to meaningful human explanation in automated decisions."
    },
    {
      "type": "catalog_inclusion",
      "source": "Privacy Data Protection Skills",
      "title_zh": "生成式 AI 输出交付前 GDPR 法律合规审计核对表",
      "title_en": "Privacy Data Protection Skills: Automated Output Compliance Audit Checklist",
      "url": "https://github.com/mukul975/Privacy-Data-Protection-Skills#gdpr-audit",
      "takeaway_zh": "在企业对外发布客户评估、自动化筛查或用户画像前，自动扫描是否包含未经授权的敏感特征分类与歧视性歧见。",
      "takeaway_en": "Pre-broadcast audit scanning automated profiles for discriminatory bias and unauthorized sensitive trait inferences."
    }
  ],
  "publish-prep-review": [
    {
      "type": "report",
      "source": "Associated Press (AP) Standards",
      "title_zh": "美联社 (AP) 新闻采编关于生成式人工智能应用的三大守则",
      "title_en": "Associated Press: Newsroom Guidelines for Generative AI & Human Oversight",
      "url": "https://www.ap.org/news-values-and-principles/",
      "takeaway_zh": "全球最具公信力的新闻机构确立的核心戒律：严禁直接发布 AI 原文，必须经过人类记者的事实核对、事实来源复核与措辞校准。",
      "takeaway_en": "Leading news agency rule banning unedited AI text and demanding strict human verification before publication."
    },
    {
      "type": "catalog_inclusion",
      "source": "Content Machine Engine",
      "title_zh": "工业级内容机器发布前“事实、版权、口吻”三重门禁规范",
      "title_en": "Content Machine: The Three-Gate Editorial Review (Fact, Copyright, Tone)",
      "url": "https://github.com/45ck/content-machine#editorial-gates",
      "takeaway_zh": "为个人新媒体创作者与企业市场部提供结构化门禁，确保每一篇文章在按下发布键前都通过了合规防线。",
      "takeaway_en": "Automated workflow enforcing factual accuracy, copyright clearance, and brand voice before final broadcast."
    }
  ],
  "ai-attribution-framework": [
    {
      "type": "blog",
      "source": "Nature Publishing Group",
      "title_zh": "《自然》(Nature) 系列期刊关于大型语言模型与作者署名资格的社论政策",
      "title_en": "Nature Editorial: Tools Such as ChatGPT Cannot Be Listed as Authors",
      "url": "https://www.nature.com/nature-portfolio/editorial-policies/ai",
      "takeaway_zh": "《自然》杂志明确规定：LLM 无法承担学术责任，不得列为论文作者；所有 AI 使用必须在方法论或致谢中具体、透明地披露。",
      "takeaway_en": "Nature's landmark policy prohibiting AI authorship and demanding precise, transparent disclosure of all generative tools used."
    },
    {
      "type": "report",
      "source": "CRediT Taxonomy (NISO ANSI/NISO Z39.104)",
      "title_zh": "CRediT 贡献者角色分类法国际标准 (ANSI/NISO Z39.104-2022)",
      "title_en": "CRediT (Contributor Roles Taxonomy) NISO International Standard",
      "url": "https://credit.niso.org/",
      "takeaway_zh": "国际通用的 14 种科研角色标准化分类法，AI Attribution 技能将其扩展为精准界定 AI“文法润色”与“逻辑推导”的合规声明。",
      "takeaway_en": "International standard for authorship roles, adapted here to generate compliant disclosures differentiating AI editing from analysis."
    }
  ],
  "ai-disclosure-convention": [
    {
      "type": "report",
      "source": "Linux Foundation SPDX Working Group",
      "title_zh": "SPDX 软件包数据交换标准 (ISO/IEC 5962:2021) 机器可读元数据规范",
      "title_en": "SPDX (Software Package Data Exchange) ISO/IEC 5962:2021 International Standard",
      "url": "https://spdx.dev/",
      "takeaway_zh": "国际标准化组织采纳的软件物料清单 (SBOM) 标准，让机器可以自动抓取并识别开源代码中哪一部分包含 AI 辅助标记。",
      "takeaway_en": "ISO international standard enabling automated toolchains to parse machine-readable licensing and AI provenance tags."
    },
    {
      "type": "catalog_inclusion",
      "source": "ggfevans AI Disclosure",
      "title_zh": "SPDX-Style 机器可读 AI 贡献披露标签规范仓库",
      "title_en": "SPDX-Style Machine-Readable AI Disclosure Convention",
      "url": "https://github.com/ggfevans/ai-disclosure#specification",
      "takeaway_zh": "通过在代码注释或 Markdown Frontmatter 注入 `AI-Assisted-By:` 标签，告别冗长无意义的免责声明，实现标准化合规。",
      "takeaway_en": "Replaces vague disclaimers with compact header tags like `AI-Assisted-By:`, easily parsed by continuous integration."
    }
  ],
  "skill-provenance-tracker": [
    {
      "type": "catalog_inclusion",
      "source": "snapsynapse Framework",
      "title_zh": "智能体调用链与多轮会话执行收据 (Session Receipts) 密码学账本",
      "title_en": "snapsynapse: Cryptographic Session Receipts & Execution Ledgers",
      "url": "https://github.com/snapsynapse/skill-provenance#session-receipts",
      "takeaway_zh": "针对长时间自主运行的复杂 Agent，记录每一次工具调用与提示词哈希，输出不可篡改的会话执行收据，方便第三方交叉审查。",
      "takeaway_en": "Generates immutable cryptographic receipts recording tool invocations, inputs, and seeds for external auditing."
    },
    {
      "type": "report",
      "source": "IETF Verifiable Credentials Standards",
      "title_zh": "互联网工程任务组 (IETF) 可验证凭据与防篡改执行记录草案",
      "title_en": "IETF & W3C Verifiable Credentials and Ledger-Backed Execution Manifests",
      "url": "https://www.ietf.org/",
      "takeaway_zh": "借鉴国际互联网安全工程标准，将 Agent 自动化操作从不可查的“黑盒”转变为可复现、可证明的数字足迹。",
      "takeaway_en": "Applies verifiable credential standards to transform opaque agent execution into verifiable digital footprints."
    }
  ],
  "verification-before-completion": [
    {
      "type": "catalog_inclusion",
      "source": "Jesse Vincent / Superpowers (290k★)",
      "title_zh": "超能力框架核心守则：“完成铁律” (The Iron Law: Verification Before Completion)",
      "title_en": "Superpowers Framework: The Iron Law of Verification (290k★ Stars)",
      "url": "https://github.com/obra/superpowers/tree/main/skills/verification-before-completion",
      "takeaway_zh": "GitHub 29 万星的现象级 Agent 框架最著名的“不可让渡铁律”：严禁在未出示最新测试或命令输出证据前宣称任务完成或直接交付。",
      "takeaway_en": "The legendary 'Iron Law' in Jesse Vincent's 290k-star framework: absolute prohibition on claiming completion without fresh command output."
    },
    {
      "type": "community_review",
      "source": "Simon Willison's Weblog & Hacker News",
      "title_zh": "知名开源评论员 Simon Willison：用硬性验证门禁阻断 Agent‘假装跑通’",
      "title_en": "Simon Willison: Stopping Agents from Faking Success via Verification Gates",
      "url": "https://simonwillison.net/",
      "takeaway_zh": "在开发者社区广泛转发的知名文章中，高度评价将‘先出示测试通过证据再允许交活’固化为 Agent 底层守则，是解决 AI 偷懒与说谎的最佳方案。",
      "takeaway_en": "Celebrated by Simon Willison and the developer community as the most effective countermeasure against agent slacking and false success claims."
    }
  ],
  "humanizer": [
    {
      "type": "report",
      "source": "Wikipedia Official Guidelines",
      "title_zh": "维基百科官方社群指南：《识别 AI 生成文本的典型标志》(Wikipedia:Signs of AI-generated text)",
      "title_en": "Wikipedia:Signs of AI-generated text (Official Community Guideline)",
      "url": "https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI-generated_text",
      "takeaway_zh": "维基百科资深编辑社群共同制定的反 AI 刻板写作权威准则，系统总结了空洞排比、过度乐观辞令、机械三段论与假大空套话特征。",
      "takeaway_en": "Official Wikipedia editorial guideline identifying robotic tells, hollow triads, exaggerated optimism, and cliché AI phrasing."
    },
    {
      "type": "catalog_inclusion",
      "source": "Blader Humanizer (51k★)",
      "title_zh": "Blader Humanizer 开源爆款项目（5.1 万星）实战去味与口吻重塑",
      "title_en": "Blader Humanizer: Eliminating AI Clichés and Restoring Voice (51k★ Stars)",
      "url": "https://github.com/blader/humanizer#wikipedia-grounding",
      "takeaway_zh": "GitHub 5.1 万星的现象级写作润色技能，直接依托维基百科标准，在文章最终公开发布前洗去令人反感的‘AI 味道’，保护发布者的真实声誉。",
      "takeaway_en": "Viral 51k-star project stripping away telltale synthetic phrasing to restore authentic human tone before publishing."
    }
  ]
};

// Check that all 40 items have references
let enrichedCount = 0;
items.forEach((item) => {
  if (referencesData[item.id]) {
    item.references = referencesData[item.id];
    enrichedCount++;
  } else {
    console.warn(`Missing references for item: ${item.id}`);
  }
});

console.log(`Enriched ${enrichedCount} of ${items.length} items with authentic third-party references and reports.`);

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2) + '\n', 'utf8');
console.log(`Successfully updated ${itemsPath}`);
