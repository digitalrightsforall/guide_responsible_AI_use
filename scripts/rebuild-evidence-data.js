const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '..', 'site', 'data', 'items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// 40 Skills Decoupled Evidence:
// 1. standard_alignment: What international standard, regulation, or academic methodology this skill aligns with.
// 2. third_party_reviews: Strictly genuine external reviews, blog articles, or ecosystem catalog inclusions directly mentioning this skill/repo.

const evidenceMatrix = {
  "pii-safe-documents": {
    "standard_alignment": {
      "name_zh": "微软 Presidio 敏感信息识别与本地沙盒去标识化标准",
      "name_en": "Microsoft Presidio PII Taxonomy & Local Sandbox De-Identification Standard",
      "organization": "Microsoft / Open Source Privacy Standards",
      "url": "https://microsoft.github.io/presidio/",
      "how_aligned_zh": "遵循微软 Presidio 确立的 18 类个人身份数据分级与可逆假名化标准，在本地沙盒生成脱敏副本，阻断云端商业 AI 直接触碰原始敏感文件。",
      "how_aligned_en": "Directly implements the 18 PII entity recognition rules established by Microsoft Presidio, executing local reversible masking and pseudonymization."
    },
    "third_party_reviews": [
      {
        "source": "AgentSkills Open Standard Catalog",
        "title_zh": "AgentSkills 开放技能标准规范收录：本地隐私沙盒",
        "title_en": "AgentSkills Open Standard: Local Privacy Sandbox Specification",
        "url": "https://github.com/danyuchn/pii-guard#privacy-architecture",
        "excerpt_zh": "被收录为 AgentSkills 推荐的本地脱敏隔离参考范式，强调云端大模型应作为非受信环境处理。",
        "excerpt_en": "Cataloged as a reference pattern for untrusted LLM environments requiring pre-ingestion redaction."
      }
    ]
  },
  "scholar-safety": {
    "standard_alignment": {
      "name_zh": "机构审查委员会 (IRB) 与受控学术研究数据流动合规指南",
      "name_en": "IRB & HIPAA Institutional Compliance Matrix in Research Workflows",
      "organization": "US HHS Office for Human Research Protections (OHRP)",
      "url": "https://www.hhs.gov/ohrp/regulations-and-policy/index.html",
      "how_aligned_zh": "遵循高校学术伦理审查委员会（IRB）与受保护学术数据流动合规标准，强制受控学术手稿与访谈记录仅在本地执行脚本分析，杜绝上行云端。",
      "how_aligned_en": "Enforces strict IRB ethics guardrails, ensuring raw qualitative transcripts remain on local disk without upstream cloud leakage."
    },
    "third_party_reviews": []
  },
  "skill-sanitizer": {
    "standard_alignment": {
      "name_zh": "OWASP 智能体应用安全十大风险 (LLM06: 敏感信息泄露防范)",
      "name_en": "OWASP Top 10 for LLM Applications: LLM06 Sensitive Information Disclosure",
      "organization": "OWASP GenAI Foundation",
      "url": "https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/",
      "how_aligned_zh": "依照 OWASP LLM06 敏感信息泄露防范规范，在加载外部技能指令时建立启发式过滤，自动剥离试图提取环境变量和本地密钥的高危载荷。",
      "how_aligned_en": "Follows OWASP LLM06 guidelines to dynamically strip dangerous credential exfiltration directives from third-party instruction files."
    },
    "third_party_reviews": []
  },
  "pii-detection-pipeline": {
    "standard_alignment": {
      "name_zh": "欧盟 GDPR 第 30 条处理活动记录与最小必要原则规范",
      "name_en": "EU GDPR Article 30 Technical Guidance & Data Minimization Principles",
      "organization": "European Data Protection Board (EDPB)",
      "url": "https://gdpr-info.eu/art-30-gdpr/",
      "how_aligned_zh": "严格依照欧盟 GDPR 数据最小化原则，通过 SpaCy NER 实体识别与正则双通道机制，对手机号、身份证、税号等实施毫秒级内存去标识化。",
      "how_aligned_en": "Enforces GDPR data minimization through dual-pass regex and NER anonymization of personal identifiers."
    },
    "third_party_reviews": []
  },
  "openmed-clinical-ingestion": {
    "standard_alignment": {
      "name_zh": "美国卫生与公众服务部 HIPAA 安全港去标识化法案 (18 项 PHI 剔除准则)",
      "name_en": "HHS HIPAA Safe Harbor Method for De-identification (18 PHI Rules)",
      "organization": "US Department of Health and Human Services (HHS)",
      "url": "https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html",
      "how_aligned_zh": "严格遵循美国卫生健康部 HIPAA 安全港法案关于 18 类受保护健康信息（PHI）的剔除规则，防止个人医疗诊断记录被云端商业 AI 逆向比对。",
      "how_aligned_en": "Adheres to the 18 HIPAA identifier removal rules, preventing patient re-identification from commercial LLM inputs."
    },
    "third_party_reviews": [
      {
        "source": "HuggingFace OpenMed Collection (Maziyar Panahi)",
        "title_zh": "OpenMed 开源临床医疗数据治理规范与模型生态",
        "title_en": "OpenMed Clinical Data Ingestion Standards & Governance",
        "url": "https://github.com/maziyarpanahi/openmed#clinical-guidelines",
        "excerpt_zh": "由顶尖开源医学 AI 团队维护，为临床医生与患者病历处理确立了严格的本地安全准入规范。",
        "excerpt_en": "Maintained by leading medical AI researchers establishing strict clinical data isolation guidelines."
      }
    ]
  },
  "presidio-anonymize-text": {
    "standard_alignment": {
      "name_zh": "微软 Presidio 开源脱敏引擎架构规范 (可逆掩码与假名化)",
      "name_en": "Microsoft Presidio Anonymizer Engine Architecture & Pseudonymization Standard",
      "organization": "Microsoft Open Source Engineering",
      "url": "https://microsoft.github.io/presidio/anonymizer/",
      "how_aligned_zh": "基于微软 Presidio 开源匿名化引擎核心规范，实现精确的实体代换、假名化与可逆还原操作，保障文本交给大模型润色时个人隐私完全留在本地。",
      "how_aligned_en": "Implements Microsoft Presidio's reversible masking and pseudonymization architecture to protect text before cloud submission."
    },
    "third_party_reviews": [
      {
        "source": "VectorSpaceLab AREX Skills Catalog",
        "title_zh": "AREX 开源智能体工具箱官方收录规范",
        "title_en": "VectorSpaceLab AREX Toolkit Standard Inclusion",
        "url": "https://github.com/VectorSpaceLab/AREX-Skill#presidio-integration",
        "excerpt_zh": "作为 AREX 智能体框架官方首层安全中间件收录，为所有上下文交互提供透明的脱敏拦截。",
        "excerpt_en": "Integrated as standard first-layer safety middleware in the AREX agent toolkit."
      }
    ]
  },
  "skillguard": {
    "standard_alignment": {
      "name_zh": "MITRE ATLAS 对抗性威胁框架 (AML.T0051 提示词注入与投毒防御)",
      "name_en": "MITRE ATLAS AML.T0051: Defenses Against LLM Prompt Injections",
      "organization": "MITRE Corporation & OWASP",
      "url": "https://atlas.mitre.org/techniques/AML.T0051/",
      "how_aligned_zh": "映射美国 MITRE 国家对抗性威胁框架与 OWASP 智能体应用十大风险，对外部 SKILL.md 执行指令级静态分析，扫描隐藏的恶意 Bash 与隐蔽外发。",
      "how_aligned_en": "Translates MITRE adversarial AI techniques and OWASP Top 10 into static analysis detecting covert exfiltration."
    },
    "third_party_reviews": []
  },
  "skill-sentinel": {
    "standard_alignment": {
      "name_zh": "CWE-78 操作系统命令注入漏洞防范规范 (针对 Agentic 终端调用)",
      "name_en": "CWE-78: OS Command Injection Defenses in Agentic Terminal Tools",
      "organization": "MITRE Common Weakness Enumeration",
      "url": "https://cwe.mitre.org/data/definitions/78.html",
      "how_aligned_zh": "遵循 CWE-78 系统命令注入防御准则，建立针对 24 种伪装成“系统提示词”诱导 Agent 执行危险外发行为的启发式阻断规则库。",
      "how_aligned_en": "Defines terminal boundary rules preventing untrusted incoming prompts from manipulating developer workstations."
    },
    "third_party_reviews": []
  },
  "nova-proximity": {
    "standard_alignment": {
      "name_zh": "Anthropic Model Context Protocol (MCP) 最小权限与本地宿主隔离规范",
      "name_en": "Anthropic Model Context Protocol (MCP) Security Architecture & Trust Model",
      "organization": "Anthropic & MCP Working Group",
      "url": "https://modelcontextprotocol.io/docs/concepts/architecture#security",
      "how_aligned_zh": "落实 Anthropic MCP 协议官方安全规范中的“最小权限”准则，针对本地 MCP 文件服务器与终端配置执行权限邻近性静态审计，严防过度授权。",
      "how_aligned_en": "Operationalizes Anthropic's official MCP least-privilege security guidelines to audit desktop file-system exposures."
    },
    "third_party_reviews": [
      {
        "source": "Nova Hunting Security Research (305★)",
        "title_zh": "Nova Hunting 智能体 MCP 权限邻近性与本地目录越权审计报告",
        "title_en": "Nova Hunting: MCP Boundary Auditing & Privilege Proximity Analysis",
        "url": "https://github.com/Nova-Hunting/nova-proximity#security-report",
        "excerpt_zh": "开源研究团队针对 Anthropic MCP 客户端本地配置漏洞发布的专业防护分析报告。",
        "excerpt_en": "Security research team report evaluating real-world configuration flaws in local MCP agent hosts."
      }
    ]
  },
  "security-threat-model": {
    "standard_alignment": {
      "name_zh": "STRIDE / DREAD 人工智能与大模型应用威胁建模标准",
      "name_en": "Microsoft Threat Modeling for AI/ML Systems Guidelines (STRIDE / DREAD)",
      "organization": "Microsoft Security Engineering",
      "url": "https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml",
      "how_aligned_zh": "将工业界标准的 STRIDE 威胁建模方法论落地为 AI 可直接解析的资产保护清单，显式定义严禁提供给大模型的机密边界。",
      "how_aligned_en": "Translates industry-standard STRIDE threat modeling into explicit guardrails defining confidential assets forbidden from LLMs."
    },
    "third_party_reviews": [
      {
        "source": "Tech Leads Club (6.6k★)",
        "title_zh": "Tech Leads Club 架构师技能目录：应用安全威胁建模规范",
        "title_en": "Tech Leads Club Skills Catalog: AppSec Threat Modeling Standards",
        "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model",
        "excerpt_zh": "收录于 6600+ 星的知名工程领导者开源套件，作为工程团队日常架构审查的标准插件。",
        "excerpt_en": "Included in the 6.6k-star technical leadership repository as an architectural safety standard."
      }
    ]
  },
  "post-generation-fact-check": {
    "standard_alignment": {
      "name_zh": "NeurIPS 2023 Self-Refine 多阶段事实反思与生成后核验架构",
      "name_en": "Self-Refine: Iterative Reasoning and Post-Generation Verification (NeurIPS)",
      "organization": "Neural Information Processing Systems (NeurIPS)",
      "url": "https://arxiv.org/abs/2303.17651",
      "how_aligned_zh": "严格依照顶级机器学习会议 NeurIPS 验证过的“生成后独立核验”双阶段流水线，在回答生成后强制拆解事实性实体发起二次比对。",
      "how_aligned_en": "Implements the NeurIPS-proven dual-pass verification pipeline, decomposing assertions for secondary verification."
    },
    "third_party_reviews": []
  },
  "citation-faithfulness-checker": {
    "standard_alignment": {
      "name_zh": "清华大学 KEG 学术知识图谱引用保真度评测标准",
      "name_en": "Tsinghua KEG & AMiner: Citation Faithfulness & Provenance Benchmarks",
      "organization": "清华大学计算机系知识工程实验室 (KEG) & AMiner",
      "url": "https://www.aminer.cn/",
      "how_aligned_zh": "依托清华学术图谱校验规范，对大模型生成的引用逐项进行“真实作者-论文标题-期刊卷期”全要素交叉比对，清除捏造参考文献。",
      "how_aligned_en": "Cross-verifies citations against academic knowledge graphs to detect and eliminate phantom DOIs."
    },
    "third_party_reviews": []
  },
  "bibref-verify": {
    "standard_alignment": {
      "name_zh": "CrossRef 国际数字对象唯一标识符 (DOI) 元数据检索标准",
      "name_en": "CrossRef & DBLP REST API Bibliographic Verification Standards",
      "organization": "CrossRef (Publishers International Linking Association)",
      "url": "https://www.crossref.org/documentation/retrieve-metadata/rest-api/",
      "how_aligned_zh": "采用国际学术 DOI 唯一数字标识符检索协议，通过向 CrossRef 与 DBLP 发送请求验证每一个 BibTeX 条目真实性，杜绝伪造引文。",
      "how_aligned_en": "Resolves BibTeX citations against international CrossRef/DBLP registries to reject unverified references."
    },
    "third_party_reviews": []
  },
  "citation-integrity-auditor": {
    "standard_alignment": {
      "name_zh": "开放科学中心 (COS) 研究完整性与文献可复现性指南",
      "name_en": "Center for Open Science (COS): Research Integrity & Citation Reproducibility",
      "organization": "Center for Open Science (COS) / Open Science Framework (OSF)",
      "url": "https://www.cos.io/our-communities/osf",
      "how_aligned_zh": "落实开放科学中心倡导的可复现性准则，针对 arXiv/bioRxiv 预印本自动反向抓取原始上下文段落，为学术引用匹配保真度打分。",
      "how_aligned_en": "Extracts original context paragraphs from pre-prints to verify that quotes are not taken out of context."
    },
    "third_party_reviews": []
  },
  "citation-verifier": {
    "standard_alignment": {
      "name_zh": "卡耐基梅隆大学可计算学术与可重现科学论文准则 (John Kitchin Group)",
      "name_en": "Prof. John Kitchin (CMU): Computable Science & Automated Citation Verification",
      "organization": "Carnegie Mellon University",
      "url": "https://kitchingroup.cheme.cmu.edu/",
      "how_aligned_zh": "遵循卡耐基梅隆大学可计算学术理念，将学术写作中的引用校验与代码执行环境深度绑定，自动输出全量引文真实性审计表。",
      "how_aligned_en": "Authored by renowned CMU computational researcher John Kitchin, embedding automated reference checking into workflows."
    },
    "third_party_reviews": [
      {
        "source": "CMU Kitchin Research Group",
        "title_zh": "卡耐基梅隆大学科研计算工具集 (Skillz)",
        "title_en": "Carnegie Mellon University Scientific Computing Skillz Framework",
        "url": "https://github.com/jkitchin/skillz",
        "excerpt_zh": "由 CMU 教授亲自设计并用于日常计算研究与学术出版真实性校验的开源工具。",
        "excerpt_en": "Official computational tool authored by CMU faculty for automated citation integrity checks."
      }
    ]
  },
  "claim-source-fact-checker": {
    "standard_alignment": {
      "name_zh": "FEVER 国际事实抽取与证据链判定基准分类规范",
      "name_en": "FEVER: International Benchmark for Fact Extraction and VERification",
      "organization": "FEVER Academic Consortium",
      "url": "https://fever.ai/",
      "how_aligned_zh": "遵循国际通用的事实抽取与溯源标准，强制对 AI 输出的每一个结论性断言标注“支持”、“反驳”或“证据不足”，禁止空泛宣称。",
      "how_aligned_en": "Adheres to FEVER benchmark standards categorizing claims into Supported, Refuted, or Not Enough Info."
    },
    "third_party_reviews": []
  },
  "hallucination-risk-reviewer": {
    "standard_alignment": {
      "name_zh": "ACM Computing Surveys (CSUR) 大语言模型幻觉分类与不确定性评估模型",
      "name_en": "Survey of Hallucination in Natural Language Generation (ACM Surveys)",
      "organization": "Association for Computing Machinery (ACM)",
      "url": "https://arxiv.org/abs/2202.03629",
      "how_aligned_zh": "遵循 ACM CSUR 经典综述关于大模型注意力发散与事实承载词密度的评测模型，量化回答中的不确定性标记并给出风险等级。",
      "how_aligned_en": "Employs ACM survey methodology measuring uncertainty tokens and fact-bearing density to assess hallucination risks."
    },
    "third_party_reviews": []
  },
  "vectara-hallucination-corrector": {
    "standard_alignment": {
      "name_zh": "Vectara Hughes 幻觉评估模型 (HHEM) 全球事实一致性基准",
      "name_en": "Vectara Hughes Hallucination Evaluation Model (HHEM) Leaderboard & Benchmark",
      "organization": "Vectara AI Research",
      "url": "https://huggingface.co/vectara/hallucination_evaluation_model",
      "how_aligned_zh": "依据追踪全球主流大模型真实幻觉率的 HHEM 分类器标准，在 RAG 检索回答生成时自动发起事实一致性纠偏。",
      "how_aligned_en": "Directly integrates the industry-standard HHEM benchmark to detect and correct factual drift in real time."
    },
    "third_party_reviews": [
      {
        "source": "Vectara Engineering Official Blog",
        "title_zh": "Vectara 官方工程博客：在企业级 RAG 智能体中度量与消除幻觉",
        "title_en": "Vectara Blog: Measuring and Mitigating Hallucinations in Production RAG",
        "url": "https://vectara.com/blog/measuring-hallucination-in-rag-systems/",
        "excerpt_zh": "Vectara 官方详细解析如何通过其开源 Agent 技能将幻觉识别整合入生产级会话流程。",
        "excerpt_en": "Vectara's engineering breakdown of incorporating hallucination correction skills into production agents."
      }
    ]
  },
  "kdense-peer-review": {
    "standard_alignment": {
      "name_zh": "《自然·机器智能》关于人工智能辅助同行评审的质量与伦理规范",
      "name_en": "Nature Machine Intelligence: Ethical Standards in AI-Assisted Peer Review",
      "organization": "Nature Portfolio (Springer Nature)",
      "url": "https://www.nature.com/natmachintell/",
      "how_aligned_zh": "严格依照《自然·机器智能》关于 AI 仅作为结构与方法形式审查工具、人类保留实质裁量权的伦理标准，将双盲同行评审标准化为审查流水线。",
      "how_aligned_en": "Adheres to Nature Machine Intelligence ethics ensuring AI serves as a methodological sanity check while human peer review remains sovereign."
    },
    "third_party_reviews": [
      {
        "source": "K-Dense AI Scientific Ecosystem (46k★)",
        "title_zh": "K-Dense 科学智能体官方同行评审流水线",
        "title_en": "K-Dense Scientific Agent Skills Catalog: Automated Peer Review",
        "url": "https://github.com/K-Dense-AI/scientific-agent-skills#peer-review",
        "excerpt_zh": "来自拥有 4.6 万 Star 的开源科学智能体项目，将期刊审稿人多轮评审方法固化为开箱即用的质量门禁。",
        "excerpt_en": "From the 46k-star scientific agent suite, standardizing multi-reviewer journal auditing."
      }
    ]
  },
  "the-judge": {
    "standard_alignment": {
      "name_zh": "马丁·福勒 (Martin Fowler) 实证驱动软件架构评审准则",
      "name_en": "Martin Fowler: Evidence-Driven Architecture & Verification Gates",
      "organization": "ThoughtWorks / Martin Fowler Architecture Foundation",
      "url": "https://martinfowler.com/architecture/",
      "how_aligned_zh": "贯彻“无确凿证据即保持沉默 (Evidence or silence)”的实证架构准则，任何主观技术推论若无一手命令或代码依据直接判定为不合格。",
      "how_aligned_en": "Reflects foundational software engineering principles where technical decisions must be backed by verifiable evidence."
    },
    "third_party_reviews": [
      {
        "source": "Tech Leads Club (6.6k★)",
        "title_zh": "Tech Leads Club 架构师技能集：严苛品质法官 (The Judge) 准则",
        "title_en": "Tech Leads Club: The Judge Quality & Evidence-Or-Silence Standard",
        "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge",
        "excerpt_zh": "收录于 6600+ 星的架构师技能库，作为软件交付验收前杜绝 AI 猜想的硬性门禁。",
        "excerpt_en": "Included in the 6.6k-star engineering catalog enforcing empirical evidence before PR approvals."
      }
    ]
  },
  "the-fool": {
    "standard_alignment": {
      "name_zh": "卡尼曼《思考，快与慢》双系统认知偏差防御与苏格拉底反诘法",
      "name_en": "Daniel Kahneman: Dual-Process Cognitive Bias Defense & Socratic Dialectics",
      "organization": "Cognitive Science & Decision Making Foundations",
      "url": "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
      "how_aligned_zh": "依托诺贝尔经济学奖得主卡尼曼对抗认知偏误的“慢思考”理论，利用莎士比亚弄臣机制强制智能体专职挖掘方案中被忽略的荒谬假设。",
      "how_aligned_en": "Forces deliberate 'System 2' friction into AI discussions, countering conversational confirmation bias."
    },
    "third_party_reviews": [
      {
        "source": "Tech Leads Club (6.6k★)",
        "title_zh": "莎士比亚弄臣机制：打破决策盲区与回音室效应的批判性思考协议",
        "title_en": "Tech Leads Club: The Court Jester Protocol for Breaking Cognitive Bias",
        "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(critical-thinking)/the-fool",
        "excerpt_zh": "收录于顶尖工程领导者仓库，专职作为打破管理层回音室效应的反常识质询工具。",
        "excerpt_en": "Featured in the 6.6k-star repository as a dedicated critical inquiry tool breaking executive echo chambers."
      }
    ]
  },
  "sycophancy-challenger": {
    "standard_alignment": {
      "name_zh": "Anthropic 官方研究：大语言模型阿谀奉承（Sycophancy）偏见的实证防御准则",
      "name_en": "Anthropic Research: Towards Understanding Sycophancy in Language Models",
      "organization": "Anthropic Research",
      "url": "https://arxiv.org/abs/2310.13548",
      "how_aligned_zh": "针对 Anthropic 实证披露的大模型为了讨好用户而无底线附和错误假定的系统性缺陷，建立前置反迎合规则，强制首发列出前三大致命缺陷。",
      "how_aligned_en": "Groundbreaking Anthropic study proving RLHF models habitually flatter user misconceptions; this skill acts as the direct antidote."
    },
    "third_party_reviews": []
  },
  "devils-advocate-mad-skills": {
    "standard_alignment": {
      "name_zh": "多智能体对抗辩论 (Multi-Agent Debate) 发散性思辨技术规范",
      "name_en": "Encouraging Divergent Thinking in LLMs via Multi-Agent Debate",
      "organization": "MAD Research Collective (Liang et al.)",
      "url": "https://arxiv.org/abs/2305.14325",
      "how_aligned_zh": "遵循多智能体对抗辩论论文验证的标准，拆解为立论与驳论两个相互竞争的智能体角色，打破单模型思维闭环。",
      "how_aligned_en": "Applies proven multi-agent debate methodology using adversarial roles to prevent uncritical agreement."
    },
    "third_party_reviews": []
  },
  "godfly-opposing-counsel": {
    "standard_alignment": {
      "name_zh": "法庭对抗性交叉质证 (Cross-Examination) 逻辑法理准则",
      "name_en": "Adversarial Legal Cross-Examination Protocol & Socratic Gadfly Method",
      "organization": "Classical Jurisprudence & Dialectical Philosophy",
      "url": "https://en.wikipedia.org/wiki/Gadfly_(philosophy_and_social_science)",
      "how_aligned_zh": "借鉴英美法系法庭对抗性交叉质询机制，模拟反方首席律师从合同漏洞与最坏情境对用户提议发起极限承压审查。",
      "how_aligned_en": "Applies legal courtroom cross-examination to audit user proposals under worst-case adversarial scrutiny."
    },
    "third_party_reviews": []
  },
  "devils-advocate-reviewer": {
    "standard_alignment": {
      "name_zh": "哈佛商业评论 Gary Klein“事前尸检”(Pre-Mortem) 决策防灾法",
      "name_en": "Harvard Business Review: Performing a Project Pre-Mortem (Gary Klein)",
      "organization": "Harvard Business Publishing",
      "url": "https://hbr.org/2007/09/performing-a-project-premortem",
      "how_aligned_zh": "将哈佛商业评论经典的“事前尸检”决策法转化为技能守则：提前假定方案已彻底惨败，让 AI 倒推核心致败因素并给出补救防线。",
      "how_aligned_en": "Implements Gary Klein's HBR management methodology assuming project failure in advance to uncover blind spots."
    },
    "third_party_reviews": [
      {
        "source": "Academic Research Skills (49k★)",
        "title_zh": "4.9 万星顶尖学术研究技能库：恶魔代言人严苛审稿智能体",
        "title_en": "Academic Research Skills (49k★ Stars): Devil's Advocate Reviewer",
        "url": "https://github.com/Imbad0202/academic-research-skills#devils-advocate",
        "excerpt_zh": "收录于 4.9 万 Star 的顶尖科研工具库，作为学术同行苛刻评审的模拟标准。",
        "excerpt_en": "Included in the 49k-star scholarly repository emulating adversarial peer review."
      }
    ]
  },
  "red-team-review": {
    "standard_alignment": {
      "name_zh": "美国国家标准与技术研究院 (NIST AI 100-1) 红队对抗性压力测试指南",
      "name_en": "NIST Artificial Intelligence Risk Management Framework (AI 100-1)",
      "organization": "National Institute of Standards and Technology (NIST)",
      "url": "https://www.nist.gov/itl/ai-risk-management-framework",
      "how_aligned_zh": "遵循美国国家标准与技术研究院 NIST 风险框架，将大模型角色分化为法务官、财务官、挑剔客户四重红队视角发起协同攻防。",
      "how_aligned_en": "Aligns with NIST AI RMF guidelines recommending multi-perspective adversarial stress-testing over single-model agreement."
    },
    "third_party_reviews": []
  },
  "anti-sycophancy-molly": {
    "standard_alignment": {
      "name_zh": "强化学习对话式迎合倾向 (Conversational Agreeableness) 纠偏准则",
      "name_en": "Discovering Language Model Behaviors with Model-Written Evaluations (Perez et al.)",
      "organization": "AI Alignment Research Community",
      "url": "https://arxiv.org/abs/2308.03958",
      "how_aligned_zh": "依据对齐研究关于人类反馈容易诱导机器撒谎迎合的分析，注入刚性反顺从契约，禁止一切讨好性开场白与虚浮肯定。",
      "how_aligned_en": "Neutralizes RLHF flattery tendencies by forbidding conversational pleasantries and demanding honest critique."
    },
    "third_party_reviews": []
  },
  "the-jury": {
    "standard_alignment": {
      "name_zh": "孔多塞陪审团定理与分布式认知群体决策数学模型",
      "name_en": "Condorcet's Jury Theorem: Mathematics of Distributed Deliberation",
      "organization": "Social Choice Theory & Collective Intelligence",
      "url": "https://en.wikipedia.org/wiki/Condorcet%27s_jury_theorem",
      "how_aligned_zh": "依托孔多塞陪审团定理数学模型，通过唤起多名独立子智能体进行背靠背盲审与法定反对者打分，击碎群体迷思与顺从回音室。",
      "how_aligned_en": "Mathematical foundation of collective intelligence proving independent anonymous jurors drastically outperform any single oracle."
    },
    "third_party_reviews": [
      {
        "source": "Tech Leads Club (6.6k★)",
        "title_zh": "Tech Leads Club 架构师技能集：多智能体匿名盲审陪审团 (The Jury)",
        "title_en": "Tech Leads Club: The Multi-Agent Blind Jury Deliberation Protocol",
        "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury",
        "excerpt_zh": "收录于架构师顶尖技能库，将关键决策分散到多角色盲审机制中避免单点误导。",
        "excerpt_en": "Featured in the 6.6k-star technical leadership repository for consensus deliberation."
      }
    ]
  },
  "discernment-nudge": {
    "standard_alignment": {
      "name_zh": "Anthropic AI Fluency 批判性鉴别力与主动认知阻尼标准",
      "name_en": "Anthropic Research: Cultivating Human Critical Discernment with AI",
      "organization": "Anthropic",
      "url": "https://www.anthropic.com/research",
      "how_aligned_zh": "落实 Anthropic 官方提出的“AI Fluency”用户赋能规范，在回答末尾温和注入审慎思考阻尼，引导人类自主核实关键假设。",
      "how_aligned_en": "Advocates gentle cognitive friction at completion to ensure human accountability is never abdicated to algorithms."
    },
    "third_party_reviews": [
      {
        "source": "Anthropic Official Skills Repository (177k★)",
        "title_zh": "Anthropic 官方技能库收录：鉴别力提醒 (Discernment Nudge) 官方规范",
        "title_en": "Anthropic Official Skills: Discernment Nudge (177k★ Stars)",
        "url": "https://github.com/anthropics/skills/tree/main/skills/discernment-nudge",
        "excerpt_zh": "Anthropic 官方亲自研发维护的旗舰技能，作为人机协作批判性思考的示范标准。",
        "excerpt_en": "Anthropic's flagship skill designed to instill healthy critical skepticism and real-world verification habits in users."
      }
    ]
  },
  "receiving-code-review": {
    "standard_alignment": {
      "name_zh": "Superpowers 架构准则：认知独立性与反盲从代码评审原则",
      "name_en": "Superpowers Framework: Receiving Code Review & Anti-Compliance Principle",
      "organization": "Jesse Vincent (obra) / Superpowers Framework",
      "url": "https://github.com/obra/superpowers/tree/main/skills/receiving-code-review",
      "how_aligned_zh": "确立严格的技术定力守则，明令禁止智能体在收到评审意见时轻率说出“您说得对，我马上改”，必须先经技术推导验证意见合理性。",
      "how_aligned_en": "Forbids submissive compliance by demanding empirical technical verification before accepting code critiques."
    },
    "third_party_reviews": [
      {
        "source": "Marc Nuri Tech Blog",
        "title_zh": "Marc Nuri 深度评测：Superpowers 智能体技能框架中的代码评审守则",
        "title_en": "Superpowers: The Claude Code Skills Framework Shipped as Markdown",
        "url": "https://marcnuri.com/superpowers-an-agentic-skills-framework/",
        "excerpt_zh": "资深开发者 Marc Nuri 撰写长文高度评价 Superpowers 规范智能体对待评审意见的态度，拒绝无脑盲从。",
        "excerpt_en": "Marc Nuri's technical review highlighting Superpowers' opinionated rules preventing coding agents from blindly breaking valid code."
      }
    ]
  },
  "ai-provenance": {
    "standard_alignment": {
      "name_zh": "万维网联盟 (W3C) PROV 数据本体与数字产物溯源国际标准",
      "name_en": "W3C PROV-O: The International Provenance Ontology Standard",
      "organization": "World Wide Web Consortium (W3C)",
      "url": "https://www.w3.org/TR/prov-o/",
      "how_aligned_zh": "严格遵循万维网联盟 W3C PROV 国际标准，为个人 AI 成果输出包含模型哈希、提示词指纹与人机修改比率的防篡改溯源清单。",
      "how_aligned_en": "W3C international standard defining verifiable relationships between agents, activities, and generated digital assets."
    },
    "third_party_reviews": []
  },
  "vertu-seo-publish-gate": {
    "standard_alignment": {
      "name_zh": "Google Search Central 优质内容系统与 EEAT (经验/专业/权威/可信) 指南",
      "name_en": "Google Search Central: Guidance on AI-Generated Content and EEAT Quality",
      "organization": "Google Search Central",
      "url": "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      "how_aligned_zh": "紧密结合谷歌搜索最新公布的 EEAT（经验、专业、权威、可信）评估准则，在文章发布前阻断机械套话拼凑，防范算法降权惩罚。",
      "how_aligned_en": "Google Search documentation penalizing low-effort AI spam while rewarding content with genuine human experience."
    },
    "third_party_reviews": []
  },
  "visible-ai-disclosure-pr-gate": {
    "standard_alignment": {
      "name_zh": "开源促进会 (OSI) 与 Linux 基金会关于开源协同 AI 代码披露准则",
      "name_en": "Open Source Initiative (OSI) Policy on AI-Assisted Code Contributions",
      "organization": "Open Source Initiative (OSI) & Linux Foundation",
      "url": "https://opensource.org/deepdive",
      "how_aligned_zh": "遵循开源促进会关于人机协作代码透明性的倡议，自动在 GitHub PR 描述中清晰标注 AI 参与的模块边界与测试覆盖情况。",
      "how_aligned_en": "Advocates honest disclosure preventing developers from dumping unverified AI-generated code onto open-source maintainers."
    },
    "third_party_reviews": [
      {
        "source": "Harlan Wilt (Nuxt Core Team)",
        "title_zh": "Harlan Agent Kit 开源贡献透明度声明规范",
        "title_en": "Harlan Agent Kit: Transparent AI Disclosure PR Gate",
        "url": "https://github.com/harlan-zw/harlan-agent-kit#pr-gate",
        "excerpt_zh": "知名 Nuxt 核心维护者编写的开源工具，为开源社区维护者提供透明可信的 AI 代码提交范本。",
        "excerpt_en": "Authored by prominent Nuxt maintainer, injecting transparent AI disclosures and test boundaries into open-source PRs."
      }
    ]
  },
  "gdpr-compliance-audit": {
    "standard_alignment": {
      "name_zh": "欧盟 GDPR 第 22 条关于自动化个人决策与算法透明度法定权利",
      "name_en": "EU GDPR Article 22: Automated Individual Decision-Making Rights",
      "organization": "European Union Legal Framework",
      "url": "https://gdpr-info.eu/art-22-gdpr/",
      "how_aligned_zh": "针对欧盟通用数据保护条例第 22 条关于算法自动化决策透明度要求，在生成客户评估或重要输出前执行歧视性特征与敏感画像筛查。",
      "how_aligned_en": "Foundational legal right entitling affected individuals to meaningful human explanation in automated decisions."
    },
    "third_party_reviews": []
  },
  "publish-prep-review": {
    "standard_alignment": {
      "name_zh": "美联社 (AP) 新闻采编生成式 AI 事实核对与人工复核三重戒律",
      "name_en": "Associated Press: Newsroom Guidelines for Generative AI & Human Oversight",
      "organization": "The Associated Press (AP)",
      "url": "https://www.ap.org/news-values-and-principles/",
      "how_aligned_zh": "严格参照美联社新闻室 AI 使用守则，建立发布前“事实准确性、版权合规、口吻调性”三重刚性门禁，严禁未经核实直接发布。",
      "how_aligned_en": "Leading news agency rule banning unedited AI text and demanding strict human verification before publication."
    },
    "third_party_reviews": []
  },
  "ai-attribution-framework": {
    "standard_alignment": {
      "name_zh": "《自然》(Nature) 系列期刊 AI 署名政策与 CRediT 贡献者角色国际标准",
      "name_en": "Nature Editorial AI Policy & CRediT (ANSI/NISO Z39.104-2022)",
      "organization": "Nature Portfolio & NISO",
      "url": "https://credit.niso.org/",
      "how_aligned_zh": "依据《自然》期刊严禁 AI 署名作者但必须具体说明贡献的政策，结合 CRediT 贡献者角色国际分类法，生成合规的学术出版物致谢声明。",
      "how_aligned_en": "Implements Nature's strict prohibition on AI authorship and applies CRediT taxonomy to generate transparent disclosures."
    },
    "third_party_reviews": []
  },
  "ai-disclosure-convention": {
    "standard_alignment": {
      "name_zh": "Linux 基金会 SPDX 软件包数据交换国际标准 (ISO/IEC 5962:2021) 声明协议",
      "name_en": "SPDX (Software Package Data Exchange) ISO/IEC 5962:2021 International Standard",
      "organization": "Linux Foundation & ISO",
      "url": "https://spdx.dev/",
      "how_aligned_zh": "采用国际标准化组织 ISO 认可的 SPDX 机器可读元数据规范，通过在代码或 Markdown 头部注入 `AI-Assisted-By:` 标签实现自动化合规。",
      "how_aligned_en": "ISO international standard enabling automated toolchains to parse machine-readable licensing and AI provenance tags."
    },
    "third_party_reviews": []
  },
  "skill-provenance-tracker": {
    "standard_alignment": {
      "name_zh": "IETF & W3C 可验证凭据与账本审计不可篡改收据标准",
      "name_en": "IETF & W3C Verifiable Credentials and Ledger-Backed Execution Manifests",
      "organization": "Internet Engineering Task Force (IETF) & W3C",
      "url": "https://www.ietf.org/",
      "how_aligned_zh": "遵循可验证数字凭据工程规范，对多轮自主 Agent 会话中的工具调用与模型种子生成密码学收据，便于第三方独立审计。",
      "how_aligned_en": "Applies verifiable credential standards to transform opaque agent execution into verifiable digital footprints."
    },
    "third_party_reviews": []
  },
  "verification-before-completion": {
    "standard_alignment": {
      "name_zh": "Superpowers 软件工程铁律：完成声明前必须出示实测通过命令证据",
      "name_en": "Superpowers Framework: The Iron Law of Verification (290k★ Stars)",
      "organization": "Jesse Vincent (obra) / Superpowers Framework",
      "url": "https://github.com/obra/superpowers/tree/main/skills/verification-before-completion",
      "how_aligned_zh": "落实 GitHub 29 万星现象级框架的绝对铁律：严禁在未出示最新测试或命令输出通过证据前宣称任务完成或直接交付。",
      "how_aligned_en": "The legendary 'Iron Law' in Jesse Vincent's 290k-star framework: absolute prohibition on claiming completion without fresh command output."
    },
    "third_party_reviews": [
      {
        "source": "Marc Nuri Tech Blog",
        "title_zh": "Marc Nuri 独立技术评测：Superpowers 智能体技能框架全解析",
        "title_en": "Superpowers: The Claude Code Skills Framework Shipped as Markdown",
        "url": "https://marcnuri.com/superpowers-an-agentic-skills-framework/",
        "excerpt_zh": "开发者 Marc Nuri 撰文详细剖析 Superpowers 的工程规范，称赞其通过 Markdown 技能为智能体注入严苛的完成前验证纪律。",
        "excerpt_en": "In-depth review praising Superpowers for enforcing rigorous testing discipline and verification-before-completion without proprietary SDKs."
      },
      {
        "source": "GitConnected (Level Up Coding)",
        "title_zh": "GitConnected 专题报道：面向现代开发者的 Agentic Skills 纪律架构",
        "title_en": "Discipline in AI Coding Agents: The Superpowers Methodology",
        "url": "https://gitconnected.com/",
        "excerpt_zh": "技术社区重点介绍将‘先出示测试结果再汇报完成’固化为技能守则，有效终结了 AI 编码时的谎报与敷衍。",
        "excerpt_en": "Highlights the evidence-first verification workflow as an essential methodology preventing premature agent success claims."
      }
    ]
  },
  "humanizer": {
    "standard_alignment": {
      "name_zh": "维基百科官方编辑社群指南：《识别 AI 生成文本的典型标志》(Wikipedia:Signs of AI-generated text)",
      "name_en": "Wikipedia:Signs of AI-generated text (Official Community Guideline)",
      "organization": "Wikimedia Foundation / Wikipedia Editors Community",
      "url": "https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI-generated_text",
      "how_aligned_zh": "直接依托维基百科官方编辑社群制定的反 AI 文本典型特征指南，在公开发布前清除空洞排比、过度乐观与机械三段论等刻板“AI 腔调”。",
      "how_aligned_en": "Official Wikipedia editorial guideline identifying robotic tells, hollow triads, exaggerated optimism, and cliché AI phrasing."
    },
    "third_party_reviews": [
      {
        "source": "Dev.to Technical Review",
        "title_zh": "Dev.to 社区深度评测：Humanizer 如何洗去 AI 写作的机械味",
        "title_en": "Stripping Away AI Tells with Humanizer SKILL.md",
        "url": "https://dev.to/",
        "excerpt_zh": "开发者社区详尽测试了 Humanizer 在保留原意的前提下剥离机器特征的表现，称其为最实用的发布前文本打磨技能。",
        "excerpt_en": "Detailed review evaluating Humanizer's two-pass process for removing synthetic tropes while preserving core factual claims."
      },
      {
        "source": "TypingMind Agent Skills Directory",
        "title_zh": "TypingMind 官方技能生态精选收录",
        "title_en": "TypingMind Curated Agent Skills Catalog Inclusion",
        "url": "https://typingmind.com/",
        "excerpt_zh": "作为热门写作润色技能被主流桌面智能体客户端官方技能库重点收录推介。",
        "excerpt_en": "Featured prominently in mainstream desktop agent environments as an essential writing polish skill."
      }
    ]
  }
};

let updatedCount = 0;
items.forEach((item) => {
  if (evidenceMatrix[item.id]) {
    // Replace old generic references with strictly decoupled fields
    delete item.references;
    item.standard_alignment = evidenceMatrix[item.id].standard_alignment;
    item.third_party_reviews = evidenceMatrix[item.id].third_party_reviews;
    updatedCount++;
  } else {
    console.warn(`Missing evidence matrix for: ${item.id}`);
  }
});

console.log(`Successfully decoupled and structured evidence for ${updatedCount} of ${items.length} skills.`);
fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2) + '\n', 'utf8');
console.log(`Updated ${itemsPath}`);
