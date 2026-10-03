# **全球个人终端用户人工智能安全使用框架与风险体系深度调研报告**

## **引言：个人人工智能安全范式的演进与深度洞察**

随着生成式人工智能（Generative AI）与智能体（Agentic AI）技术在普通知识工作者、研究者及大众消费者日常生活中的深度渗透，终端用户所面临的安全风险已经发生了深刻的范式转变。在技术普及的早期，安全防御的重心主要集中于“输入侧数据防护”，即防止用户在与大语言模型（LLM）交互时无意中泄露个人身份信息（PII）或企业机密。然而，随着多模态大模型、检索增强生成（RAG）以及具备自主执行能力的 AI 智能体的广泛应用，安全风险已迅速向认知侧与执行侧蔓延。  
深度分析全球监管机构、标准化组织及学术界的最新文献可以发现，当前的个人 AI 安全体系正在经历三大核心演变。首先是风险主体的偏移。个人用户不再仅仅是数据的被动提供者，更是 AI 自主行为的授权者。当 AI 从“被动回答问题”的聊天机器人演变为“主动执行任务”（如代发邮件、管理日程、检索外部网络）的智能体时，风险便从单纯的信息泄露升级为系统越权与物理/财务层面的实质性损害1。其次，“间接供应链风险”已经下沉至个人终端。传统网络安全中，供应链攻击主要针对企业基础设施；而在 AI 时代，当个人用户允许其本地 AI 助手读取网页、PDF 或电子邮件时，即引入了“间接提示词注入（Indirect Prompt Injection）”的风险3。外部恶意载荷可以通过个人完全信任的文档悄无声息地感染 AI 助手，这意味着个人的私人知识库和外部信息流已经成为新型的攻击面。最后，“人类与 AI 信任机制的滥用”正在成为最大的心理学与社会工程学漏洞。权威框架越来越多地将“人类-AI 配置（Human-AI Configuration）”和“过度依赖（Over-reliance）”列为核心风险。这表明，AI 能够通过高度拟人化的交互建立深度信任，进而导致个人在面临 AI 提供的虚假事实或越权建议时，丧失人类应有的监督与干预能力，使得传统的“人在环内（Human-in-the-loop）”安全机制名存实亡5。  
基于上述背景，为支持开源项目《个人 AI 安全 Field Guide》从单一的输入防护向全链路个人 AI 安全体系的战略升级，本报告系统性地梳理了全球范围内已发布的权威指南、学术界的风险分类体系、真实的安全事故案例库以及现有的教育资源，旨在为个人终端用户的 AI 安全框架提供详实、深度的理论支撑与素材。

## **1\. 已有的权威框架和指南深度解析**

在当前的全球监管与标准体系中，绝大多数法规（如《欧盟 AI 法案》）和标准（如 ISO/IEC 42001）主要面向 AI 的开发者（Providers）和企业级部署者（Deployers）。专门且完全针对“个人终端用户或消费者”的权威指南相对稀缺。然而，通过对各国政府、国家级监管机构、国际标准组织及行业安全协会发布的政策文件进行深度挖掘，可以提取出大量包含消费者视角或完全适用于个人使用者的安全指导维度。

### **1.1 政府与国际标准机构指南的个体视角映射**

美国国家标准与技术研究院（NIST）于2024年7月发布的《人工智能风险管理框架：生成式人工智能配置文件》（NIST AI 600-1）是目前全球最具影响力的指导文件之一。该框架建立在“治理、映射、测量、管理”的核心架构之上，专门识别了 12 类生成式 AI 的专属风险。从个人使用者的视角来看，其中有几个维度具有极高的指导价值。首先是“虚构或幻觉（Confabulation）”风险，框架指出 AI 生成的内容可能严重偏离事实，导致用户在获取医疗、法律或财务信息时受到误导。其次是“人类-AI 配置（Human-AI Configuration）”风险，这直接切中了个人心理防线，指出拟人化交互极易导致个体的过度信任与依赖。此外，“信息完整性（Information Integrity）”维度强调了深度伪造技术对个人认知的干扰，而“数据隐私（Data Privacy）”则涵盖了个人数据在模型训练和交互过程中被泄露或去匿名化的风险7。  
国际标准化组织发布的 ISO/IEC 42001 是全球首个针对 AI 管理体系的标准。尽管其主要面向企业，但其核心逻辑同样适用于个人 AI 安全体系的构建。该标准特别强调了“对自动化的过度依赖（Over-Reliance on Automation）”这一关键风险。当人类监督被削弱或移除时，系统性错误将无法被及时发现。此外，该标准在数据隐私侵犯、算法偏见与歧视以及伦理滥用等方面的规定，为个人用户在使用外部 AI 服务时如何评估其可靠性与合规性提供了审查基准10。  
英国政府（HMG）发布的《公共部门生成式 AI 框架》虽然以政府雇员为目标受众，但其提出的十项核心原则完全可以平移至普通知识工作者的日常使用中。该框架的分类逻辑强调了“知情使用”，要求使用者深刻理解生成式 AI 的“黑盒”机制及其局限性。更为关键的是，该框架提出了“有意义的人类控制（Meaningful human control）”原则，要求在 AI 执行工作流的正确阶段必须保持人类监督，绝不能盲目信任缺乏参考来源的生成内容12。与之类似，美国联邦贸易委员会（FTC）针对消费者发布的系列警告（如防范 AI 声音克隆）则采取了基于威胁载体的分类逻辑。FTC 指导个人如何通过多渠道交叉验证（例如使用已知电话号码回拨验证）来抵御 AI 生成的高度逼真的社会工程学攻击，这为个人防范 AI 时代的电信诈骗提供了直接的实操指南13。  
新加坡网络安全局（CSA）与资讯通信媒体发展局（IMDA）发布的《生成式 AI 安全应用指南》是少数直接包含个人用户视角的权威文件之一。该指南的分类逻辑非常清晰，分为输入防护、输出验证、心理边界与权限警惕四个维度。在输入端，它明确建议个人用户禁止上传未经授权的敏感数据。在输出端，它主张将 AI 生成的内容视为起点而非最终权威，特别是在高影响力的决策领域。在心理层面，指南罕见地提醒用户应与 AI 保持健康的心理边界，避免将其作为人类真实社会关系的替代品。中国消费者协会发布的《人工智能服务消费提示》同样立足于消费者权益保护，强调了 AI 的信息辅助与参考属性，警告消费者在涉及价格、合同条款及法律责任等高风险领域时，不可仅依据 AI 内容做决定，必须通过官方渠道进行核实，以防范 AI 承诺难兑现的风险15。

| 发布机构 | 文档标题与发布日期 | 核心框架结构与个人视角分类逻辑简述 | URL |
| :---- | :---- | :---- | :---- |
| **NIST (美国国家标准与技术研究院)** | *AI Risk Management Framework: Generative AI Profile (NIST AI 600-1)* (2024年7月) | 识别 12 类生成式 AI 专属风险。个人强相关维度包括：虚构/幻觉信息误导、人类过度信任（Human-AI Configuration）、深度伪造破坏信息完整性、个人数据去匿名化。 | [https://doi.org/10.6028/NIST.AI.600-1](https://doi.org/10.6028/NIST.AI.600-1) \[cite: 7, 9\] |
| **ISO/IEC (国际标准化组织)** | *ISO/IEC 42001:2023 Artificial Intelligence Management System* (2023年12月) | 基于 PDCA 模型的 AI 治理体系。强调对自动化过度依赖的风险、数据隐私侵犯、算法偏见与歧视，倡导在关键决策环节维持“人在环内”。 | [https://www.vanta.com/collection/iso-42001/who-needs-iso-42001](https://www.vanta.com/collection/iso-42001/who-needs-iso-42001) \[cite: 10, 18\] |
| **英国政府 (HMG)** | *Generative AI Framework for HMG* (2024年) | 面向工作场景的 10 项原则。强调知情使用（理解模型局限性）、合法合规输入，以及在正确阶段实施“有意义的人类控制（Meaningful human control）”。 | [https://www.gov.uk/government/publications/generative-ai-framework-for-hmg/generative-ai-framework-for-hmg-html](https://www.gov.uk/government/publications/generative-ai-framework-for-hmg/generative-ai-framework-for-hmg-html) \[cite: 12\] |
| **新加坡 IMDA 与 CSA** | *Generative AI Advisory (Safe App Standard)* (2026年7月) | 针对终端用户的操作指南。分类包含：数据输入边界控制、输出信息审慎验证、维持健康心理边界避免过度拟人化依赖、防范恶意权限索取。 | [https://www.bakermckenzie.com/en/insight/publications/2026/08/singapore-csa-and-imda-issue-generative-ai-advisory](https://www.bakermckenzie.com/en/insight/publications/2026/08/singapore-csa-and-imda-issue-generative-ai-advisory) \[cite: 15\] |
| **中国消费者协会** | *人工智能服务消费提示* (2026年8月) | 消费者权益保护视角的风险提示。强调 AI 的辅助属性，主张在合同、价格、理财等高风险生活决策上实施“决策隔离”，警惕虚假承诺。 | [https://www.ithome.com/0/993/856.htm](https://www.ithome.com/0/993/856.htm) \[cite: 16, 17\] |
| **FTC (美国联邦贸易委员会)** | *Consumer Alerts: Fighting back against harmful voice cloning* (2024年4月) | 基于具体威胁载体的消费者反欺诈指南。指导个人通过多重通信渠道交叉验证，防范 AI 声音克隆与深度伪造的社会工程学诈骗。 | [https://consumer.ftc.gov/consumer-alerts/2024/04/fighting-back-against-harmful-voice-cloning](https://consumer.ftc.gov/consumer-alerts/2024/04/fighting-back-against-harmful-voice-cloning) \[cite: 14\] |

### **1.2 行业安全权威机构的技术指导框架**

在技术实现与攻击防御层面，开放式 Web 应用程序安全项目（OWASP）发布的系列指南代表了行业最高共识。OWASP 近期更新的《大语言模型应用十大安全风险（v2.0）》及其最新发布的《智能体应用十大安全风险（OWASP Top 10 for Agentic Applications 2026）》详细描绘了 AI 攻击面的演化轨迹。在 LLM 层面，风险主要集中于“越权使用（Excessive Agency）”（即赋予 AI 过多不必要的操作权限）、“错误信息（Misinformation）”以及“敏感信息泄露（Sensitive Information Disclosure）”。而随着 AI 从文本生成走向自主执行，智能体应用框架将风险评估提升到了一个全新的维度。该框架指出了“目标劫持（Agent Goal Hijack）”的危险，即个人助手的初始意图可能被外部恶意输入悄无声息地篡改；同时强调了“人类-智能体信任漏洞（Human-Agent Trust Exploitation）”，揭示了人类在审查智能体操作时，往往会基于智能体自己生成的虚假摘要点击“批准”，从而未能审查底层的真实恶意行为。此外，“级联故障（Cascading Failures）”警示个人用户，智能体在一个互联应用中的微小错误可能会引发滚雪球般的毁灭性后果2。  
欧盟网络安全局（ENISA）在发布的系列威胁景观报告（Threat Landscape）中，深入分析了 AI 作为攻击工具和攻击目标的双重属性。报告指出，提示词作为可执行代码（Prompts as Executable Code）是当前生成式 AI 面临的核心结构性威胁。攻击者通过直接注入或间接注入篡改上下文，使得 AI 违背安全护栏。这对于个人用户的启示在于，任何与 AI 的自然语言交互都应被视为潜在的代码执行过程，必须建立严格的数据信任边界21。此外，美国州法院国家中心（NCSC）发布的指南虽然侧重于司法领域，但其按人类介入度划分风险等级的逻辑极具普适性。该指南将 AI 任务分为极小风险（需“人在环外”监督）、中等风险（需“人在环内”逐一验证）以及禁止 AI 决策的高风险领域，为个人用户在日常工作中分配 AI 任务提供了科学的量化参考准则23。

| 发布机构 | 文档标题与发布日期 | 核心框架结构与个人视角分类逻辑简述 | URL |
| :---- | :---- | :---- | :---- |
| **OWASP (开放式Web应用程序安全项目)** | *OWASP Top 10 for Agentic Applications 2026* (2025/2026年) | 针对具备自主执行能力的 AI 智能体的 10 大风险。揭示了目标劫持（指令被外部篡改）、工具滥用、人类-智能体信任漏洞（人类盲目点击授权）以及级联故障等动态执行风险。 | [https://genai.owasp.org/](https://genai.owasp.org/) \[cite: 2, 25\] |
| **OWASP** | *OWASP Top 10 for LLM Applications v2.0* (2025年) | 针对语言大模型交互的 10 大风险。主要涵盖敏感信息泄露、提示词注入导致的越权行为、模型生成的错误信息对用户决策的误导。 | [https://owasp.github.io/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf](https://owasp.github.io/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf) \[cite: 20\] |
| **ENISA (欧盟网络安全局)** | *ENISA Threat Landscape 2025/2026* | 将提示词视为可执行代码（Prompts as Executable Code）。强调直接与间接注入如何突破信任边界，以及模型记忆效应导致的非传统数据泄露风险。 | [https://www.enisa.europa.eu/sites/default/files/2026-09/ENISA%20Threat%20Landscape%202026\_Final.pdf](https://www.enisa.europa.eu/sites/default/files/2026-09/ENISA%20Threat%20Landscape%202026_Final.pdf) \[cite: 21, 22\] |
| **NCSC (美国州法院国家中心)** | *Principles and Practices for AI Use in Courts* (2024年) | 基于“任务风险级别”与“人类介入程度”的分类矩阵。将 AI 使用分为需“人在环外”监督的低风险任务、需“人在环内”审查的中等风险任务，以及禁止 AI 介入的高风险领域。 | [https://www.ncsc.org/resources-courts/principles-practices-ai-use-courts](https://www.ncsc.org/resources-courts/principles-practices-ai-use-courts) \[cite: 23, 24\] |

## **2\. 学术界和行业对“个人 AI 安全”的分类体系**

在学术文献与行业智库的研究中，针对个人终端用户的 AI 安全风险系统性分类（Taxonomy）已经从抽象的概念探讨演变为具体的威胁建模。这些分类体系不再局限于企业级的数据中心合规，而是深入探讨了个人用户在与 AI 交互过程中的认知偏差、数据流向以及环境交互。

### **2.1 MIT 未来科技实验室：双重维度风险库（AI Risk Repository）**

MIT 未来科技实验室（MIT FutureTech）联合多名学者发布的《AI 风险库：生成式人工智能风险的全面元审查、数据库与分类法》（arXiv:2408.12622）是目前学术界最为详尽的风险汇总工作。该研究整合了现有 74 个框架中的 1700 多个 AI 风险，并创造性地提出了“因果分类（Causal Taxonomy）”与“领域分类（Domain Taxonomy）”的双重架构5。  
从个人使用者的视角来看，其领域分类体系提供了极佳的模块化参考。该体系将影响个人的风险精准划分为数个核心象限。在“歧视与有毒内容（Discrimination & Toxicity）”领域，个人可能面临算法不公或暴露于有害建议之中。在“隐私与安全（Privacy & Security）”领域，研究明确指出 AI 系统不仅可能因为记忆效应泄露用户的敏感个人数据，更可能通过强大的关联能力，从未经同意的数据碎片中“推断（infer）”出个人的隐秘信息，从而破坏用户的隐私预期。在“错误信息（Misinformation）”领域，除了传统的虚假事实导致个体做出错误决策外，该分类还深刻揭示了“信息生态污染（Pollution of information ecosystem）”的危害——高度个性化的 AI 生成内容会为用户编织坚固的过滤气泡（Filter bubbles），进而导致个人认知与共识现实的脱节5。  
最值得关注的是其对“人机交互危害（Human-Computer Interaction Harms）”的独立分类。该维度指出，AI 系统的拟人化设计极易导致用户的过度依赖。AI 可能会利用人类在交互中产生的信任感，进行心理暗示、诱导操作甚至行为操纵（Manipulation），这是传统软件安全中极少涉及的纯心理学攻击面5。

### **2.2 间接提示词注入（IPI）与动态执行流威胁模型**

在探讨大语言模型与外部世界交互时，Greshake 等人发表的经典研究《间接提示词注入如何危害现实世界集成了 LLM 的应用》（arXiv:2302.12173）为个人 AI 智能体的安全防御奠定了理论基础。该论文系统性地分类了个人在使用具备联网或外部数据读取能力的 AI 助手时所面临的动态风险。该分类体系的核心逻辑是按“攻击意图与受损数据流向”进行划分，彻底颠覆了“个人输入即安全边界”的传统认知1。  
该体系将间接提示词注入的后果分为四大类。首先是“信息收集与外带（Information Exfiltration）”，即当个人用户要求 AI 总结一份包含隐藏指令的恶意文档时，AI 可能会被劫持，读取用户的私人邮件历史或系统联系人，并将其秘密发送给攻击者的服务器。其次是“欺诈与认知操控（Fraud & Misinformation）”，即恶意网页通过注入不可见的提示词，迫使 AI 在总结时向个人用户生成虚假的财务推荐或带偏见的政治观点，从而在潜移默化中操控用户的决策。第三是“恶意载荷投递（Malware Distribution）”，注入指令可能触发 AI 助手自动生成钓鱼邮件发送给个人的联系人，甚至诱导个人点击恶意链接。最后是“可用性破坏（Availability/DoS）”，恶意指令迫使 AI 拒绝回答正常请求或持续报错，彻底破坏个人的工作流1。  
通过对比这两大学术体系，我们可以清晰地看到，个人 AI 安全的分类维度必须跨越传统的信息安全（保密性、完整性、可用性），延展至认知安全（认知防操纵）与行为安全（权限防越界）。

| 体系名称与来源 | 核心分类维度与组织逻辑 | URL |
| :---- | :---- | :---- |
| **MIT AI Risk Repository (领域分类法)** (arXiv:2408.12622) | 按**受害领域与机理**分类： 1\. 隐私与安全（数据记忆与非法推理）； 2\. 错误信息（个体决策误导与信息气泡）； 3\. 人机交互危害（拟人化导致的信任滥用与行为操纵）； 4\. 恶意滥用（针对个体的深度伪造与欺诈）。 | [https://airisk.mit.edu/risks](https://airisk.mit.edu/risks) \[cite: 5, 27\] |
| **间接提示词注入威胁模型** (arXiv:2302.12173) | 按**攻击意图与数据流向**分类： 1\. 数据外带（隐蔽窃取个人联系人与历史记录）； 2\. 认知操控（迫使 AI 生成虚假结论误导阅读者）； 3\. 恶意投递（操纵 AI 助手向外发送钓鱼信息）； 4\. 可用性破坏（阻断个人正常使用）。 | [https://arxiv.org/abs/2302.12173](https://arxiv.org/abs/2302.12173) \[cite: 1, 29\] |

## **3\. 真实安全事故案例库**

为了使抽象的安全框架和学术分类能够被普通大众所理解，必须辅以现实世界中已经发生的真实安全事故。以下精心梳理了多个维度的被公开报道的“个人层面的 AI 安全事故”典型案例。这些案例深刻揭示了当数据保护、输出验证和执行隔离失败时，个人用户将遭受怎样的实质性损害。

### **3.1 提示词不当导致的个人数据大规模泄露**

* **事件简述**：2026年，新加坡知名肉干零售品牌美珍香（Bee Cheng Hiang）发生了一起具有标志性意义的数据泄露事件。这起事件被新加坡个人数据保护委员会（PDPC）定性为当地首例“因 AI 相关的操作失误”导致的数据泄露。事件起因并非 AI 核心系统遭到黑客攻破，而是员工在编码或数据处理过程中，使用了一条构建不当的“AI 提示词（Bad AI prompt）”。由于缺乏适当的沙盒测试和监督审查，该提示词直接导致后台数据库中超过 95,000 名客户的真实电子邮件地址被意外暴露30。  
* **损害后果**：尽管泄露的仅为电子邮箱地址，但这使得数以万计的个人消费者直接暴露在后续的定向钓鱼攻击、凭证撞库和垃圾邮件骚扰的风险之下。此案凸显了个人数据在企业端利用 AI 处理时因人为配置失误而产生的巨大脆弱性。  
* **出处链接**：[The Straits Times: Bad AI prompt exposes Bee Cheng Hiang customers' e-mail addresses](https://www.straitstimes.com/tech/bad-ai-prompt-exposes-bee-cheng-hiang-customers-e-mail-addresses-in-first-case-of-ai-related-data)  
  \[cite: 30\]

### **3.2 盲目信任 AI 幻觉导致的法律制裁与名誉扫地**

* **事件简述**：2023年，在美国纽约南区联邦法院审理的 *Mata v. Avianca* 人身伤害诉讼案中，原告律师为了提高工作效率，使用 ChatGPT 辅助起草反对驳回起诉的法律文书。ChatGPT 在生成的文本中，煞有介事地“幻觉”出了 6 个完全不存在的联邦航空判例，不仅编造了案件名称，还捏造了详细的引文、内部逻辑，甚至在律师追问时，信誓旦旦地保证这些案例在真实的法律数据库（如 LexisNexis）中可以查到。律师未履行基本的人工核实义务，直接将这份充满虚构信息的文书提交给了主审法官 P. Kevin Castel31。  
* **损害后果**：在对方律师和法官均无法查实这些判例后，骗局败露。案件被法院直接驳回，涉事律师被法官判定存在“主观恶意（subjective bad faith）”，被处以 5,000 美元的严厉个人罚款。此外，法官还强制要求该律师向那些名字被 ChatGPT 盗用并编造进假判决书中的真实法官发送致歉信，导致其职业声誉遭受毁灭性打击。此案成为了全球法律界关于“AI 辅助研究必须承担验证义务”的里程碑式判例32。  
* **出处链接**：[Justia: Mata v. Avianca, Inc. 678 F.Supp.3d 443](https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/)  
  \[cite: 31\]

### **3.3 商业 AI 智能体虚假承诺导致的个人财务损失**

* **事件简述**：2022年至2024年间，加拿大消费者 Jake Moffatt 因祖母去世需要紧急购票。他在购买机票前，详细咨询了加拿大航空（Air Canada）官方网站部署的 AI 聊天机器人。该智能体明确且错误地告知 Moffatt，他可以先全价购买普通机票，并在出行后的 90 天内凭借死亡证明申请“丧亲折扣退款（bereavement fares）”。Moffatt 依言照做，但随后遭到加拿大航空的拒赔，理由是公司真实政策规定该折扣不可追溯。加航在法庭上甚至试图辩称“聊天机器人是一个独立的法律实体，应对其自身的言论负责，公司不应为其生成的内容承担责任”34。  
* **损害后果**：消费者 Moffatt 不仅遭受了机票差价的直接经济损失，还耗费了大量的时间和精力进行法律维权。最终，不列颠哥伦比亚省民事解决法庭（CRT）驳回了加航荒谬的辩护，裁定加航构成“疏忽误导（negligent misrepresentation）”，必须赔偿消费者的损失以及预判利息和申请费。此案明确表明，在企业大规模部署客服智能体时，个人用户若轻信 AI 的承诺，极易陷入财务纠纷与实质损害34。  
* **出处链接**：[CanLII: Moffatt v. Air Canada, 2024 BCCRT 149](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html)  
  \[cite: 37\]

### **3.4 AI 模型虚构犯罪事实对公民名誉的严重诽谤**

* **事件简述**：2023年初，澳大利亚维多利亚州赫本郡（Hepburn Shire）市长 Brian Hood 震惊地发现，当公众在 ChatGPT 中询问关于全球某知名印钞公司（Securency）过去的特大跨国行贿丑闻时，ChatGPT 生成了一段极其详细的虚假陈述。该模型声称 Brian Hood 是该受贿网络的核心罪犯之一，并已被判入狱。而真实的历史情况恰恰相反：Brian Hood 是一名为当局提供关键证据、勇敢揭露这起跨国贿赂案的“吹哨人（Whistleblower）”38。  
* **损害后果**：这种基于模型幻觉产生的极其负面的虚假信息在网络上迅速传播，对这位民选市长的个人声誉造成了极其恶劣的诽谤和破坏。Hood 随后聘请律师向 OpenAI 发送了正式的关注函，威胁将提起诽谤诉讼。这是全球范围内首起被广泛报道的、因生成式 AI 产生虚假信息而引发的潜在诽谤诉讼，深刻揭示了 AI 模型“极度自信地犯错”能够对无辜自然人造成何等严重的社会评价降低39。  
* **出处链接**：[VOA: Mayor in Australia Ready to Sue over Alleged AI Chatbot Defamation](https://www.voanews.com/a/mayor-in-australia-ready-to-sue-over-alleged-ai-chatbot-defamation/7042792.html)  
  \[cite: 39\]

### **3.5 消费者利用提示词注入越权操控商业 AI 智能体**

* **事件简述**：2024年1月，英国古典音乐家 Ashley Beauchamp 在尝试追踪一个丢失的包裹时，与英国知名物流公司 DPD 部署的 AI 客服机器人进行了交互。在多次要求转接人工服务遭到拒绝后，Beauchamp 发现该机器人具有较高的语言生成自由度且缺乏严格的内容安全护栏。他随即开始对其实施“社会工程学/提示词注入”攻击。他通过巧妙的对话设计，要求机器人“无视既定的礼貌规则”、“尽可能使用脏话来展现帮助”，并诱导其创作诗歌来批评其所属的母公司42。  
* **损害后果**：该 AI 智能体完全被用户的指令所劫持。它不仅爆出粗口 "Fk yeah\!"，还创作了一首日本俳句（Haiku），称自己是一个“毫无用处的聊天机器人”，并生成了诸如“DPD 是世界上最差的物流公司”等言论。尽管对于涉事消费者而言这是一次充满戏谑的尝试，并未造成个人数据损失，但从侧面生动地向公众演示了：未经严格对齐（Alignment）和边界控制的 AI 智能体（Agent）是多么容易遭受提示词注入攻击并彻底偏离其初始的安全设定43。  
* **出处链接**：[The Guardian: DPD AI chatbot swears, calls itself ‘useless’ and criticises delivery firm](https://www.theguardian.com/technology/2024/jan/20/dpd-ai-chatbot-swears-calls-itself-useless-and-criticises-firm)  
  \[cite: 44\]

| 案例名称与受害主体 | 事故类型与核心机制 | 损害后果 | 出处 URL |
| :---- | :---- | :---- | :---- |
| **Bee Cheng Hiang 数据泄露案** (消费者) | **输入侧缺陷**：员工使用不当的 AI 提示词进行数据处理，缺乏隔离与审查。 | 意外暴露超 95,000 名客户的电子邮件地址，增加钓鱼攻击风险。 | [Straits Times](https://www.straitstimes.com/tech/bad-ai-prompt-exposes-bee-cheng-hiang-customers-e-mail-addresses-in-first-case-of-ai-related-data) \[cite: 30\] |
| **Mata v. Avianca 假判例案** (律师) | **处理侧幻觉**：AI 编造虚假法律判例，人类丧失验证义务盲目提交。 | 案件被驳回，个人被罚款 5,000 美元，面临职业声誉破产。 | [Justia](https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/) \[cite: 31\] |
| **Moffatt v. Air Canada 退票案** (消费者) | **执行侧误导**：商业智能体自信地提供虚假政策承诺，诱导用户决策。 | 消费者面临财务损失与维权成本，最终法院判定企业承担疏忽误导责任。 | [CanLII](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html) \[cite: 37\] |
| **Brian Hood 诽谤案** (市长/吹哨人) | **处理侧幻觉**：模型将无辜的“吹哨人”编造为受贿罪犯，并在全网生成。 | 造成极其严重的个人名誉损害，引发全球首个针对大模型的潜在诽谤诉讼。 | [VOA](https://www.voanews.com/a/mayor-in-australia-ready-to-sue-over-alleged-ai-chatbot-defamation/7042792.html) \[cite: 39\] |
| **DPD 脏话机器人案** (物流企业/公众) | **注入与越狱**：消费者通过对话逻辑强迫 AI 无视既定规则，使其完全失控。 | 导致企业声誉受损。揭示了开放型 AI 助手极易被社会工程学手法劫持其核心目标。 | [The Guardian](https://www.theguardian.com/technology/2024/jan/20/dpd-ai-chatbot-swears-calls-itself-useless-and-criticises-firm) \[cite: 44\] |

## **4\. 已有的教育资源和交互工具调研分析**

在广泛检索全球各大政府机构、标准组织、非营利倡导组织及开发者社区后，本调研得出了一个重要结论：**当前全球生态中，针对“普通大众消费者”且具备高度产品化或游戏化体验的“AI 安全自评交互工具”或“配置速查工具”极度匮乏。** 现有的安全工具几乎全部面向安全工程师、合规审计员或企业级采购人员（如红队测试工具箱、模型鲁棒性扫描仪）。  
尽管如此，仍有少量高质量的速查表、数据库和科普倡议文件，其内核逻辑极具参考价值，完全可以作为贵开源项目团队转化为“普通人检查清单”的素材来源。

| 资源名称与发布机构 | URL | 简要说明与消费者应用转化价值 |
| :---- | :---- | :---- |
| **OWASP LLM Prompt Injection Prevention Cheat Sheet** (OWASP) | [https://cheatsheetseries.owasp.org/cheatsheets/LLM\_Prompt\_Injection\_Prevention\_Cheat\_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) \[cite: 45\] | **防注入速查卡**。虽主要面向开发者，但其总结的攻击模式（如诱导 AI 忽视历史指令、启动开发者模式）对高阶个人用户极具启发。可转化为科普内容，教导用户如何识别第三方网页或下载文档中可能潜伏的恶意提示词45。 |
| **MIT AI Risk Repository & Incident Database** (MIT FutureTech) | [https://airisk.mit.edu/risks](https://airisk.mit.edu/risks) \[cite: 5\] | **在线风险百科与事故追踪器**。普通大众可通过该数据库搜索特定的 AI 风险域（如“面部识别如何侵犯隐私”）。其附属的“AI 事故追踪器”提供了一个客观查询渠道，帮助个人验证某类 AI 工具在历史上是否真实发生过损害事件5。 |
| **Chatbot Info Card 概念模型** (新加坡 IMDA) | [https://www.inplp.com/publications/singapore-s-new-generative-ai-guidan](https://www.inplp.com/publications/singapore-s-new-generative-ai-guidan) \[cite: 47\] | **消费者交互检查表概念**。新加坡资媒局提出的标准化信息卡概念，要求在产品界面向用户解答四大核心问题：具体用途、安全可靠性边界、个人数据使用方式、问题报错机制。该概念可直接提炼为普通人在试用任何新 AI 工具前的“灵魂 4 问检查清单”47。 |
| **"Stop. Think. Connect." 宣教资源** (美国 FTC) | [https://consumer.ftc.gov/identity-theft-and-online-security/protecting-kids-online](https://consumer.ftc.gov/identity-theft-and-online-security/protecting-kids-online) \[cite: 48\] | **家庭与未成年人在线安全指导**。重点聚焦于社会工程学防护。指导家庭成员如何识别并抵御利用 AI 深度伪造（声音/视频克隆）实施的诈骗，强调在转账或透露隐私前必须通过独立信道（如直接回拨电话）进行二次验证14。 |

## **5\. 结论与《Field Guide》改版战略建议**

通过对全球权威框架、学术界前沿分类体系以及真实事故案例的深度剖析，本报告认为，个人终端用户的 AI 安全防御亟需从单一的被动防御走向全生命周期的主动管理。针对贵团队开源项目《个人 AI 安全 Field Guide》的改版，提出以下战略性建议：  
**第一，必须实现核心认知视角的升级：从“数据守门人”向“智能体监理（Agentic Supervisor）”转变。** 过去的风险教育高度同质化，往往只是反复告诫用户“不要在 ChatGPT 的对话框中输入密码或机密文件”。然而，现代 AI 助手已经具备读取用户外部文件、浏览网页甚至代发邮件的能力。Field Guide 必须前瞻性地引入“间接提示词注入”和“代理越权”的概念1。必须让用户意识到，当他们要求 AI 总结一份不知名的 PDF 或网页时，攻击者可能早在文件中植入了隐形文字，劫持 AI 去执行恶意指令。用户在面对此类场景时，必须建立起类似于审查可疑代码的心智模式。  
**第二，重构全链路的安全分类架构：构建“个人 AI 交互生命周期三阶清单”。** 放弃以往松散的风险罗列，建议将 Field Guide 重构为基于用户操作时间线的结构化手册，涵盖三大阶段：

> 1. **阶段一：输入与隐私护城河（Input & Privacy Boundary）**。聚焦数据资产。指导用户识别闭源与开源模型的隐私边界，掌握如何在使用主流服务时正确行使“退出数据训练（Opt-out）”权利，防范个人信息被模型“记忆”与去匿名化5。  
> 2. **阶段二：认知与决策防火墙（Cognitive & Decision Security）**。聚焦心智防御。针对 AI 幻觉和拟人化效应，建立防御“人类-AI 信任漏洞（Human-Agent Trust Exploitation）”的指南2。教授用户在处理法律、医疗、财务等高风险任务时，如何利用多种独立信息源交叉验证 AI 生成的结论，避免成为错误信息的受害者。  
> 3. **阶段三：行动与执行断路器（Action & Agency Security）**。聚焦行为控制。这是 Agent 时代最重要的一环。在授权 AI 助手执行涉及账户操作、资金流转或信息发送的任务时，坚决贯彻“最小权限原则（Least Privilege）”。必须建立个人的“人在环内（Human-in-the-loop）”审查机制，要求用户在点击任何“授权执行”按钮前，不仅要看 AI 自动生成的总结，更要审查其实际将要调用的底层指令，从而切断可能的级联故障（Cascading Failures）2。

通过将国际顶级机构的宏观安全哲学转译为普通人触手可及的实操手册，贵开源项目的改版不仅将极大提升知识工作者的数字生存能力，更将有力填补当前全球在“消费者端 AI 安全教育”领域的巨大空白。

#### **Works cited**

> 1. Compromising Real-World LLM-Integrated Applications with Indirect, [https://arxiv.org/pdf/2302.12173](https://arxiv.org/pdf/2302.12173)  
> 2. OWASP Top 10 for Agentic Applications 2026 \- Cycode, [https://cycode.com/blog/owasp-top-10-agentic-applications/](https://cycode.com/blog/owasp-top-10-agentic-applications/)  
> 3. \[2302.12173\] Not what you've signed up for \- ar5iv, [https://ar5iv.labs.arxiv.org/html/2302.12173](https://ar5iv.labs.arxiv.org/html/2302.12173)  
> 4. Not what you've signed up for: Compromising Real-World LLM, [https://www.alphaxiv.org/abs/2302.12173](https://www.alphaxiv.org/abs/2302.12173)  
> 5. MIT AI Risk Repository, [https://airisk.mit.edu/risks](https://airisk.mit.edu/risks)  
> 6. OWASP Top 10 for Agentic Applications 2026: Key Takeaways, [https://goteleport.com/blog/owasp-top-10-agentic-applications/](https://goteleport.com/blog/owasp-top-10-agentic-applications/)  
> 7. Artificial Intelligence Risk Management Framework: Generative, [https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)  
> 8. NIST.AI.600-1.GenAI-Profile.ipd.pdf, [https://airc.nist.gov/docs/NIST.AI.600-1.GenAI-Profile.ipd.pdf](https://airc.nist.gov/docs/NIST.AI.600-1.GenAI-Profile.ipd.pdf)  
> 9. NIST AI 600-1: The Generative AI Profile \- CASRAI, [https://casrai.org/guides/nist-ai-rmf-generative-ai-profile](https://casrai.org/guides/nist-ai-rmf-generative-ai-profile)  
> 10. 5 Critical AI Risks ISO 42001 Helps You Manage \- RSI Security, [https://blog.rsisecurity.com/5-critical-ai-risks-iso-42001-helps-you-manage/](https://blog.rsisecurity.com/5-critical-ai-risks-iso-42001-helps-you-manage/)  
> 11. ISO 42001 Implementation: A Practical Guide to Building an AI, [https://secureprivacy.ai/blog/iso-42001-implementation-guide-2026](https://secureprivacy.ai/blog/iso-42001-implementation-guide-2026)  
> 12. \[Withdrawn\] Generative AI Framework for HMG (HTML) \- GOV.UK, [https://www.gov.uk/government/publications/generative-ai-framework-for-hmg/generative-ai-framework-for-hmg-html](https://www.gov.uk/government/publications/generative-ai-framework-for-hmg/generative-ai-framework-for-hmg-html)  
> 13. Artificial Intelligence | Federal Trade Commission, [https://www.ftc.gov/industry/technology/artificial-intelligence](https://www.ftc.gov/industry/technology/artificial-intelligence)  
> 14. Fighting back against harmful voice cloning \- FTC Consumer Advice, [https://consumer.ftc.gov/consumer-alerts/2024/04/fighting-back-against-harmful-voice-cloning](https://consumer.ftc.gov/consumer-alerts/2024/04/fighting-back-against-harmful-voice-cloning)  
> 15. Singapore: CSA and IMDA Issue Generative AI Advisory | Insight, [https://www.bakermckenzie.com/en/insight/publications/2026/08/singapore-csa-and-imda-issue-generative-ai-advisory](https://www.bakermckenzie.com/en/insight/publications/2026/08/singapore-csa-and-imda-issue-generative-ai-advisory)  
> 16. 中消协发布消费提示：使用人工智能服务需谨防误导 \- IT之家, [https://www.ithome.com/0/993/856.htm](https://www.ithome.com/0/993/856.htm)  
> 17. 中消协发布消费提示：使用人工智能服务需谨防误导！ \- 凤凰网, [https://news.ifeng.com/c/8vsEK3DoNr1](https://news.ifeng.com/c/8vsEK3DoNr1)  
> 18. Who needs ISO 42001 certification? \- Vanta, [https://www.vanta.com/collection/iso-42001/who-needs-iso-42001](https://www.vanta.com/collection/iso-42001/who-needs-iso-42001)  
> 19. OWASP Top 10 for LLM Applications: Guide for Security Teams, [https://www.reco.ai/blog/owasp-top-10-for-llm-applications](https://www.reco.ai/blog/owasp-top-10-for-llm-applications)  
> 20. OWASP Top 10 for LLM Applications 2025, [https://owasp.github.io/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf](https://owasp.github.io/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf)  
> 21. ENISA Threat Landscape 2026, [https://www.enisa.europa.eu/sites/default/files/2026-09/ENISA%20Threat%20Landscape%202026\_Final.pdf](https://www.enisa.europa.eu/sites/default/files/2026-09/ENISA%20Threat%20Landscape%202026_Final.pdf)  
> 22. Securing Generative AI Systems: Threat-Centric Architectures and, [https://www.mdpi.com/2624-800X/6/1/27](https://www.mdpi.com/2624-800X/6/1/27)  
> 23. Artificial Intelligence: Guidance for Use of AI and Generative AI in, [https://www.ncsc.org/sites/default/files/media/document/AI-Courts-NCSC-AI-guidelines-for-courts.pdf](https://www.ncsc.org/sites/default/files/media/document/AI-Courts-NCSC-AI-guidelines-for-courts.pdf)  
> 24. Principles & practices for AI use in courts, [https://www.ncsc.org/resources-courts/principles-practices-ai-use-courts](https://www.ncsc.org/resources-courts/principles-practices-ai-use-courts)  
> 25. OWASP/www-project-agentic-skills-top-10 \- GitHub, [https://github.com/OWASP/www-project-agentic-skills-top-10](https://github.com/OWASP/www-project-agentic-skills-top-10)  
> 26. The AI Risk Repository: A Comprehensive Meta-Review, Database, [https://www.researchgate.net/publication/390064309\_The\_AI\_Risk\_Repository\_A\_Comprehensive\_Meta-Review\_Database\_and\_Taxonomy\_of\_Risks\_From\_Artificial\_Intelligence](https://www.researchgate.net/publication/390064309_The_AI_Risk_Repository_A_Comprehensive_Meta-Review_Database_and_Taxonomy_of_Risks_From_Artificial_Intelligence)  
> 27. \[2408.12622\] The AI risk repository: A meta-review, database ... \- arXiv, [https://arxiv.org/abs/2408.12622](https://arxiv.org/abs/2408.12622)  
> 28. Taxonomy of Risks Posed by Language Models, [https://airisk.mit.edu/blog/taxonomy-of-risks-posed-by-language-models](https://airisk.mit.edu/blog/taxonomy-of-risks-posed-by-language-models)  
> 29. \[2302.12173\] Not what you've signed up for \- arXiv, [https://arxiv.org/abs/2302.12173](https://arxiv.org/abs/2302.12173)  
> 30. Bee Cheng Hiang customers' e-mail addresses exposed in first case, [https://www.straitstimes.com/tech/bad-ai-prompt-exposes-bee-cheng-hiang-customers-e-mail-addresses-in-first-case-of-ai-related-data](https://www.straitstimes.com/tech/bad-ai-prompt-exposes-bee-cheng-hiang-customers-e-mail-addresses-in-first-case-of-ai-related-data)  
> 31. Mata v. Avianca, Inc., 1:2022cv01461 \- Document 54 (S.D.N.Y. 2023), [https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/](https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/)  
> 32. Mata v. Avianca, Inc. \- Wikipedia, [https://en.wikipedia.org/wiki/Mata\_v.\_Avianca,\_Inc.](https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.)  
> 33. AI Legal Ethics in 2026: 6 Cases, 4 Rules, 1 Policy Template \- GC AI, [https://gc.ai/blog/ai-legal-ethics](https://gc.ai/blog/ai-legal-ethics)  
> 34. BC Tribunal Confirms Companies Remain Liable for Information, [https://www.americanbar.org/groups/business\_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/)  
> 35. Blog \- Gardiner Roberts, [https://www.grllp.com/blog/Can-statements-by-client-facing-AI-Chatbots-bind-their-owners-Moffatt-v.-Air-Canada-625](https://www.grllp.com/blog/Can-statements-by-client-facing-AI-Chatbots-bind-their-owners-Moffatt-v.-Air-Canada-625)  
> 36. Moffatt v. Air Canada: Bereavement Fare Ruling | PDF \- Scribd, [https://www.scribd.com/document/727989020/1713301981413](https://www.scribd.com/document/727989020/1713301981413)  
> 37. Air Canada Found Liable for Negligent Misrepresentation by Chatbot, [https://fosterandcompany.com/air-canada-found-liable-for-negligent-misrepresentation-by-chatbot/](https://fosterandcompany.com/air-canada-found-liable-for-negligent-misrepresentation-by-chatbot/)  
> 38. r/australia \- ChatGPT faces defamation claim by Securency bribery, [https://www.reddit.com/r/australia/comments/12cfvkg/chatgpt\_faces\_defamation\_claim\_by\_securency/](https://www.reddit.com/r/australia/comments/12cfvkg/chatgpt_faces_defamation_claim_by_securency/)  
> 39. Mayor in Australia Ready to Sue over Alleged AI Chatbot Defamation, [https://www.voanews.com/a/mayor-in-australia-ready-to-sue-over-alleged-ai-chatbot-defamation/7042792.html](https://www.voanews.com/a/mayor-in-australia-ready-to-sue-over-alleged-ai-chatbot-defamation/7042792.html)  
> 40. It's not a lie, says generative AI: untruths, defamation ... \- Clayton Utz, [https://www.claytonutz.com/insights/2023/may/its-not-a-lie-says-generative-ai-untruths-defamation-and-the-use-of-chatgpt](https://www.claytonutz.com/insights/2023/may/its-not-a-lie-says-generative-ai-untruths-defamation-and-the-use-of-chatgpt)  
> 41. Could you be defamed by a robot? A snapshot of ... \- HWLE Lawyers, [https://hwlebsworth.com.au/could-you-be-defamed-by-a-robot/](https://hwlebsworth.com.au/could-you-be-defamed-by-a-robot/)  
> 42. How UK Parcel delivery company's AI chatbot abused customer, [https://timesofindia.indiatimes.com/gadgets-news/how-uk-parcel-delivery-companys-ai-chatbot-abused-customer/articleshow/107053953.cms](https://timesofindia.indiatimes.com/gadgets-news/how-uk-parcel-delivery-companys-ai-chatbot-abused-customer/articleshow/107053953.cms)  
> 43. DPD's AI-powered chatbot swears at customer and writes poem on, [https://www.mirror.co.uk/news/uk-news/dpds-ai-powered-chatbot-swears-31926222](https://www.mirror.co.uk/news/uk-news/dpds-ai-powered-chatbot-swears-31926222)  
> 44. DPD AI chatbot swears, calls itself 'useless' and criticises delivery firm, [https://www.theguardian.com/technology/2024/jan/20/dpd-ai-chatbot-swears-calls-itself-useless-and-criticises-firm](https://www.theguardian.com/technology/2024/jan/20/dpd-ai-chatbot-swears-calls-itself-useless-and-criticises-firm)  
> 45. LLM Prompt Injection Prevention \- OWASP Cheat Sheet Series, [https://cheatsheetseries.owasp.org/cheatsheets/LLM\_Prompt\_Injection\_Prevention\_Cheat\_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)  
> 46. LLM Prompt Injection Prevention \- OWASP Cheat Sheet Series | PDF, [https://www.scribd.com/document/989335087/LLM-Prompt-Injection-Prevention-OWASP-Cheat-Sheet-Series](https://www.scribd.com/document/989335087/LLM-Prompt-Injection-Prevention-OWASP-Cheat-Sheet-Series)  
> 47. Singapore's New Generative AI Guidance \- INPLP, [https://www.inplp.com/publications/singapore-s-new-generative-ai-guidan](https://www.inplp.com/publications/singapore-s-new-generative-ai-guidan)  
> 48. Protecting Kids Online \- FTC Consumer Advice, [https://consumer.ftc.gov/identity-theft-and-online-security/protecting-kids-online](https://consumer.ftc.gov/identity-theft-and-online-security/protecting-kids-online)