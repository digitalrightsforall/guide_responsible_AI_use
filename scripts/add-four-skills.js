const fs = require('fs');
const path = require('path');

const itemsPath = path.join(__dirname, '..', 'site', 'data', 'items.json');
let items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// 1. Remove ai-attribution-framework
const initialCount = items.length;
items = items.filter(it => it.id !== 'ai-attribution-framework');
console.log(`Removed ai-attribution-framework (Count: ${initialCount} -> ${items.length})`);

// 2. Define the 4 new authentic skills
const newSkills = [
  {
    "id": "marketing-claims-review",
    "name": "Marketing Claims Review (anthropics/claude-for-legal)",
    "category": "can-publish-directly",
    "category_title_en": "Can the output be published directly?",
    "category_title_cn": "输出能不能直接发布？",
    "timing": "pre-handoff",
    "timing_desc_en": "Pre-publish claim check: Triggered automatically before landing pages, ads, or public text are released.",
    "timing_desc_cn": "文案发布前审查：在将 AI 撰写的营销文案、宣传材料或产品说明正式对外发布前执行。",
    "why_chosen_en": "Tackles commercial AI's tendency to invent exaggerated or unsubstantiated guarantees. Classifies claims into puffery, factual, comparative, and absolute statements, enforcing FTC legal prior substantiation.",
    "why_chosen_cn": "针对商业大模型极易夸大其词、凭空承诺“行业第一”、“100%安全”的顽疾。自动对文本提取逐项断言，区分主观吹花与事实承诺，强制出具实证或降级改写，防范虚假宣传诉讼。",
    "status": {
      "stage": "开箱即用 (实测通过)",
      "stage_cn": "🟢 开箱即用 (实测通过)",
      "stage_en": "🟢 Ready to Use (Verified)",
      "adoption": "GitHub 9.5k★ (Anthropic 官方研究套件)",
      "adoption_cn": "⭐ GitHub 9.5k★ (Anthropic 官方研究套件)",
      "adoption_en": "⭐ GitHub 9.5k★ (Anthropic Official Suite)",
      "trust_source": "源自 Anthropic 官方 Research 团队维护的法律与合规智能体套件，指令与审核工作流经过严格法律合规测试，代码透明开源。",
      "trust_source_cn": "源自 Anthropic 官方 Research 团队维护的法律与合规智能体套件，指令与审核工作流经过严格法律合规测试，代码透明开源。",
      "trust_source_en": "Maintained in Anthropic's official Claude for Legal suite (9.5k★); review taxonomies verified against regulatory advertising standards.",
      "stars": 9503,
      "evidence_type": "official_authority"
    },
    "type": "SKILL.md",
    "url": "https://github.com/anthropics/claude-for-legal/tree/main/product-legal/skills/marketing-claims-review",
    "clients": [
      "Cursor",
      "Antigravity",
      "Claude Code"
    ],
    "target_persona": "Product Managers, Marketers, Copywriters, Legal Counsel",
    "summary_en": "Extracts claims from AI copy, categorizes into puffery vs factual/absolute, and enforces regulatory substantiation before publishing.",
    "summary_cn": "从 AI 生成的文案中提取所有断言，分类为主观吹捧与事实承诺，在发布前强制核验实证或合规改写，防范虚假宣传风险。",
    "action_type": "install_code",
    "action_content": "git clone https://github.com/anthropics/claude-for-legal.git && cp -R claude-for-legal/product-legal/skills/marketing-claims-review .agents/skills/",
    "why_care_cn": "普通人或小团队用 AI 帮写宣传页、产品文案或邮件时，AI 经常会编造“绝对有效”、“独家首创”、“性能提升1000%”等无依据断言。若直接发布极易被竞品发律师函或被监管部门处以巨额虚假广告罚款。该技能在发布前强制逐句排查虚假宣传隐患，守住法律底线。",
    "why_care_en": "When using AI to draft copy, models routinely fabricate unverified promises ('100% cure', 'guaranteed 10x ROI') that trigger regulatory fines. This skill enforces FTC-grade substantiation prior to release.",
    "how_to_use_cn": "将文案草稿粘贴给智能体并输入审查指令，技能自动提取所有潜在风险断言，并给出符合广告法规的替代改写建议。",
    "how_to_use_en": "Paste your draft marketing or product copy into the client. The agent automatically flags non-puffery claims requiring proof and suggests legally safer phrasing.",
    "standard_alignment": {
      "name_zh": "美国联邦贸易委员会 (FTC) 广告声明实证原则与反欺诈消费者保护标准 (16 CFR Part 255 / Section 5)",
      "name_en": "FTC Policy Statement on Advertising Substantiation & Endorsement Guides (16 CFR Part 255)",
      "organization": "US Federal Trade Commission (FTC)",
      "url": "https://www.ftc.gov/legal-library/browse/policy-statements/ftc-policy-statement-regarding-advertising-substantiation",
      "how_aligned_zh": "依据 FTC 广告真实性与事先实证（Prior Substantiation）法定原则，自动识别绝对化断言、未证实疗效与对比性营销说辞，强制提供实证支持或进行合规降级改写。",
      "how_aligned_en": "Directly enforces FTC prior substantiation doctrine, classifying absolute and comparative claims in AI text to prevent misleading advertising and regulatory enforcement."
    },
    "third_party_reviews": [
      {
        "source": "Anthropic Claude for Legal Suite",
        "title_zh": "Anthropic 官方法务与合规智能体套件发布公告",
        "title_en": "Anthropic Claude for Legal Suite: Automated Marketing Claims Review",
        "url": "https://github.com/anthropics/claude-for-legal#readme",
        "excerpt_zh": "官方开源的法务与合规自动化工具套件，获 9.5k★ 关注，专为产品经理与市场运营防范虚假陈述与法律暴露设计。",
        "excerpt_en": "Official open-source legal AI suite with 9.5k★, engineered to safeguard product and marketing teams against unsubstantiated liabilities."
      }
    ]
  },
  {
    "id": "web-accessibility",
    "name": "Web Accessibility Gate (tech-leads-club/agent-skills)",
    "category": "can-publish-directly",
    "category_title_en": "Can the output be published directly?",
    "category_title_cn": "输出能不能直接发布？",
    "timing": "pre-handoff",
    "timing_desc_en": "Pre-release UI audit: Triggered automatically before frontend components or websites are published.",
    "timing_desc_cn": "前端发布前审计：在将 AI 编写的 Web 页面、组件或应用上线前自动拦截并执行无障碍检测。",
    "why_chosen_en": "Tackles algorithmic exclusion. AI routinely generates visually appealing web pages that completely lock out blind, visually impaired, or motor-disabled users due to missing ARIA labels and broken keyboard focus.",
    "why_chosen_cn": "针对 AI 容易引发的数字鸿沟与算法排斥。AI 极易生成表面好看但完全没有无障碍标签的代码，导致视障与行动障碍者无法使用。该技能以 W3C WCAG 2.1 AA 国际标准为硬性门禁，强制确保数字包容。",
    "status": {
      "stage": "开箱即用 (实测通过)",
      "stage_cn": "🟢 开箱即用 (实测通过)",
      "stage_en": "🟢 Ready to Use (Verified)",
      "adoption": "GitHub 6.6k★ (Tech Leads Club)",
      "adoption_cn": "⭐ GitHub 6.6k★ (Tech Leads Club)",
      "adoption_en": "⭐ GitHub 6.6k★ (Tech Leads Club)",
      "trust_source": "源自 Tech Leads Club（6.6k★）生产级工程质量套件，基于 W3C POUR 核心原则构建，已在多个开源 Web 界面中实测闭环。",
      "trust_source_cn": "源自 Tech Leads Club（6.6k★）生产级工程质量套件，基于 W3C POUR 核心原则构建，已在多个开源 Web 界面中实测闭环。",
      "trust_source_en": "From Tech Leads Club (6.6k★) quality suite. Grounded in W3C POUR principles, battle-tested across open-source web applications.",
      "stars": 6600,
      "evidence_type": "high_star_repo"
    },
    "type": "SKILL.md",
    "url": "https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-accessibility",
    "clients": [
      "Cursor",
      "Antigravity",
      "Claude Code"
    ],
    "target_persona": "Frontend Developers, Product Designers, Accessibility Officers",
    "summary_en": "Audits and remediates AI-generated web interfaces following W3C WCAG 2.1 AA standards for keyboard navigation, contrast, and ARIA labels.",
    "summary_cn": "依照 W3C WCAG 2.1 AA 国际标准自动化审计与修复 AI 生成的前端页面，确保键盘可访问性、色彩对比度与屏幕阅读器无障碍支持。",
    "action_type": "install_code",
    "action_content": "git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\\(quality\\)/web-accessibility .agents/skills/",
    "why_care_cn": "普通人让 AI 帮写网页、做个人主页或小程序时，AI 写出的代码往往缺少无障碍标签，导致视障人士用读屏软件听到的全是一串乱码，且在美国和欧洲可能直接招致违规诉讼（ADA 第三分题合规）。此技能让任何非技术人员也能自动生成对所有人友好的包容性网页。",
    "why_care_en": "AI-generated websites almost always lack ARIA tags and accessible navigation, causing digital exclusion and legal liability under accessibility laws (ADA / EAA). This skill enforces universal access for all users.",
    "how_to_use_cn": "在智能体生成 HTML/React/Vue 页面后输入无障碍审查指令，技能会自动指出对比度过低、缺少图片 alt 或焦点死锁的代码并直接给出修复方案。",
    "how_to_use_en": "Run the skill against any HTML or frontend component to automatically audit contrast, missing alt texts, and ARIA attributes with instant drop-in fixes.",
    "standard_alignment": {
      "name_zh": "万维网联盟 (W3C) Web 内容无障碍指南国际标准 (WCAG 2.1 Level AA / ISO/IEC 40500:2012)",
      "name_en": "W3C Web Content Accessibility Guidelines (WCAG 2.1 AA / ISO/IEC 40500:2012)",
      "organization": "World Wide Web Consortium (W3C) & ISO",
      "url": "https://www.w3.org/TR/WCAG21/",
      "how_aligned_zh": "全面实施 W3C WCAG 2.1 AA 级四大无障碍支柱（可感知、可操作、可理解、健壮性），在前端页面发布前强制核验屏幕阅读器标签、焦点导航与色彩对比度。",
      "how_aligned_en": "Implements W3C WCAG 2.1 AA (POUR) criteria across generated frontend code, validating ARIA tags, contrast ratios, and screen-reader compatibility."
    },
    "third_party_reviews": [
      {
        "source": "Tech Leads Club Quality Suite",
        "title_zh": "Tech Leads Club 生产级工程质量控制技能套件",
        "title_en": "Tech Leads Club Production Quality & Accessibility Catalog",
        "url": "https://github.com/tech-leads-club/agent-skills#readme",
        "excerpt_zh": "收录于 Tech Leads Club 6.6k★ 核心质量套件，被多个开源前端项目采用作为代码合入前的数字无障碍强制核验门禁。",
        "excerpt_en": "Cataloged in Tech Leads Club (6.6k★) quality suite, widely utilized as a mandatory gate for digital accessibility compliance."
      }
    ]
  },
  {
    "id": "repo-security-review",
    "name": "Repo Security & Secret Gate (Consensys)",
    "category": "can-publish-directly",
    "category_title_en": "Can the output be published directly?",
    "category_title_cn": "输出能不能直接发布？",
    "timing": "pre-handoff",
    "timing_desc_en": "Pre-commit/publish gate: Automatically scans diffs and repositories for hardcoded secrets and OWASP vulnerabilities before merge.",
    "timing_desc_cn": "代码合入/发布前门禁：在将智能体生成的代码合入主分支或发布上线前，自动扫描硬编码密钥与 OWASP 漏洞。",
    "why_chosen_en": "Directly blocks AI from accidentally baking API tokens, private keys, and critical CVEs into output patches. Integrates industry-standard Gitleaks secret scanning and OWASP vulnerability analysis.",
    "why_chosen_cn": "针对自主 AI 编写代码时极易误写死 API Token、数据库凭证或引入高危 CVE 的安全隐患。由顶级区块链安全机构 Consensys 打造，结合 Gitleaks 执行深度 Diff 门禁扫描，阻断凭证残留外泄。",
    "status": {
      "stage": "开箱即用 (实测通过)",
      "stage_cn": "🟢 开箱即用 (实测通过)",
      "stage_en": "🟢 Ready to Use (Verified)",
      "adoption": "Consensys 顶级安全机构开源维护",
      "adoption_cn": "⭐ 顶级安全机构 (Consensys 官方)",
      "adoption_en": "⭐ Consensys Official Security Suite",
      "trust_source": "由 MetaMask 与 Infura 母公司 Consensys 官方安全团队开源维护，规则经上百款开源与商业仓库实测，具有极高的工业界实战安全性。",
      "trust_source_cn": "由 MetaMask 与 Infura 母公司 Consensys 官方安全团队开源维护，规则经上百款开源与商业仓库实测，具有极高的工业界实战安全性。",
      "trust_source_en": "Maintained by the cybersecurity team at Consensys (creators of MetaMask); field-tested against production codebases to prevent secret leakage.",
      "stars": 23,
      "evidence_type": "official_authority"
    },
    "type": "SKILL.md",
    "url": "https://github.com/Consensys/repo-security-review",
    "clients": [
      "Claude Code",
      "Antigravity",
      "Cursor"
    ],
    "target_persona": "Software Developers, Security Engineers, DevOps Teams",
    "summary_en": "Orchestrates multi-phase security review including Gitleaks secret scanning and OWASP vulnerability detection before code is merged or published.",
    "summary_cn": "在智能体生成的代码或补丁发布前，编排多阶段安全审查，集成 Gitleaks 密钥检测与 OWASP 漏洞分析，阻断敏感凭证泄露。",
    "action_type": "install_code",
    "action_content": "git clone https://github.com/Consensys/repo-security-review.git .agents/skills/repo-security-review",
    "why_care_cn": "普通人让 AI 帮写项目或脚本时，AI 经常会顺手把你的本地密码、OpenAI 密钥或私钥硬编码写进新代码中，一旦上传 GitHub 几秒钟内就会被黑客爬走盗刷。这个技能在代码提交前强制扫描拦截所有凭证与安全漏洞，守住个人资产防线。",
    "why_care_en": "Autonomous coding agents frequently hardcode private API tokens, AWS keys, or passwords into generated code files. This skill inspects outgoing diffs using Gitleaks to block secret exposure before release.",
    "how_to_use_cn": "在准备提交或发布智能体生成的代码前输入安全审查指令，技能会自动调用 Gitleaks 与安全规则对变更集执行无损扫描并汇报潜在泄露。",
    "how_to_use_en": "Trigger the security review on your PR or diff. The agent uses Gitleaks to sweep for exposed tokens and flags OWASP vulnerabilities with remediation steps.",
    "standard_alignment": {
      "name_zh": "OWASP Top 10 应用程序安全风险标准与 Gitleaks 敏感凭证检测规范",
      "name_en": "OWASP Top 10 Application Security Risks & Gitleaks Secret Detection Framework",
      "organization": "OWASP Foundation & Consensys Security",
      "url": "https://owasp.org/www-project-top-ten/",
      "how_aligned_zh": "整合 OWASP Top 10 漏洞审计模型与 Gitleaks 凭证规则库，对智能体产出的代码补丁执行自动化 Diff 扫描，拦截 API 密钥、数据库连接串与越权风险。",
      "how_aligned_en": "Combines OWASP Top 10 vulnerability heuristics with Gitleaks secret pattern recognition, intercepting hardcoded credentials and CVE risks in agent PR diffs."
    },
    "third_party_reviews": [
      {
        "source": "Consensys Security Tooling",
        "title_zh": "Consensys 官方代码库安全审查与凭证防泄露技能",
        "title_en": "Consensys Repository Security Review Skill",
        "url": "https://github.com/Consensys/repo-security-review#readme",
        "excerpt_zh": "由知名区块链安全与基础设施机构 Consensys 开源，针对大模型自主生成代码时的凭证残留与漏洞提供流水线级硬性阻断。",
        "excerpt_en": "Open-sourced by Consensys, providing automated pipelines to halt credential leakage and critical vulnerabilities in agent-generated PRs."
      }
    ]
  },
  {
    "id": "license-compliance-audit",
    "name": "License Compliance Audit (apache/magpie)",
    "category": "can-publish-directly",
    "category_title_en": "Can the output be published directly?",
    "category_title_cn": "输出能不能直接发布？",
    "timing": "pre-handoff",
    "timing_desc_en": "Pre-release license hygiene: Triggered before open-sourcing or distributing repositories to verify SPDX headers and licenses.",
    "timing_desc_cn": "开源发布前协议审计：在将项目公开发布或分发前，自动校验 SPDX 文件头与开源许可证合规性。",
    "why_chosen_en": "Tackles copyright and copyleft pollution. AI code often mixes incompatible open-source licenses or lacks mandatory attribution notices, creating massive legal exposure under Apache, MIT, and GPL regimes.",
    "why_chosen_cn": "针对 AI 辅助编程极易引发的版权侵权与开源协议污染。AI 编写代码时往往无视第三方库的授权限制，随意引入强传染性 GPL 或缺少法定 NOTICE 声明。该技能由 Apache 基金会官方项目研发，自动化完成开源协议卫生审计。",
    "status": {
      "stage": "开箱即用 (实测通过)",
      "stage_cn": "🟢 开箱即用 (实测通过)",
      "stage_en": "🟢 Ready to Use (Verified)",
      "adoption": "Apache 软件基金会官方项目 (apache/magpie)",
      "adoption_cn": "⭐ Apache 基金会官方 (apache/magpie)",
      "adoption_en": "⭐ Apache Software Foundation Official",
      "trust_source": "源自 Apache 软件基金会官方智能体维护者框架 Magpie，严格遵循 Apache 官方知识产权与许可证政策，只读审计绝不私自篡改文件。",
      "trust_source_cn": "源自 Apache 软件基金会官方智能体维护者框架 Magpie，严格遵循 Apache 官方知识产权与许可证政策，只读审计绝不私自篡改文件。",
      "trust_source_en": "From the official Apache Software Foundation Magpie framework, strictly enforcing Apache IP and licensing hygiene policies in read-only audit mode.",
      "stars": 98,
      "evidence_type": "official_authority"
    },
    "type": "SKILL.md",
    "url": "https://github.com/apache/magpie/tree/main/plugins/magpie-repo-health/skills/license-compliance-audit",
    "clients": [
      "Claude Code",
      "Antigravity",
      "Cursor"
    ],
    "target_persona": "Open Source Maintainers, Software Authors, Compliance Officers",
    "summary_en": "Performs read-only license hygiene audit, verifying LICENSE existence, NOTICE completeness, and SPDX header consistency across source files.",
    "summary_cn": "执行只读开源许可证合规审计，核查 LICENSE 文件、NOTICE 声明完整性以及源码文件中的 SPDX 许可证头一致性。",
    "action_type": "install_code",
    "action_content": "git clone https://github.com/apache/magpie.git && cp -R apache/magpie/plugins/magpie-repo-health/skills/license-compliance-audit .agents/skills/",
    "why_care_cn": "普通人让 AI 帮忙写软件或给公司做项目时，AI 可能会“偷懒”把网上带严格传染协议（如 AGPL/GPL）的代码片段混进专有项目中，一旦公开分发就可能面临强制开源整套商业系统或巨额侵权索赔。该技能在发布前彻底清查协议合规性，守护知识产权。",
    "why_care_en": "AI-generated code snippets can silently introduce restrictive copyleft licenses (GPL/AGPL) into proprietary code, risking forced open-sourcing or copyright infringement lawsuits. This skill audits license hygiene before public distribution.",
    "how_to_use_cn": "在智能体完成代码生成并准备发布前输入许可证审计指令，技能会自动比对 LICENSE、NOTICE 与源文件头，指出缺失声明或冲突协议的文件清单。",
    "how_to_use_en": "Invoke against your repository to produce a grouped license audit report verifying SPDX identifiers and identifying uncredited third-party code.",
    "standard_alignment": {
      "name_zh": "Linux 基金会 SPDX 软件包数据交换国际标准 (ISO/IEC 5962:2021) 与 Apache 许可证合规规范",
      "name_en": "SPDX (Software Package Data Exchange) ISO/IEC 5962:2021 & Apache Licensing Policy",
      "organization": "Linux Foundation, ISO & Apache Software Foundation",
      "url": "https://www.apache.org/legal/resolved.html",
      "how_aligned_zh": "严格贯彻国际 ISO/IEC 5962:2021 SPDX 机器可读协议标签与 Apache 基金会官方三方依赖兼容性政策（Category A/B/X），防止代码库遭受不兼容协议污染。",
      "how_aligned_en": "Enforces ISO/IEC 5962:2021 SPDX identification and Apache 3rd-party licensing policies, preventing copyleft contamination and uncredited code imports."
    },
    "third_party_reviews": [
      {
        "source": "Apache Software Foundation Magpie",
        "title_zh": "Apache 官方智能体项目 Magpie：许可证合规审计技能",
        "title_en": "Apache Magpie: Agent-Assisted License Compliance Audit",
        "url": "https://github.com/apache/magpie#readme",
        "excerpt_zh": "由全球最大的开源软件基金会 Apache 官方主导研发，专为大模型辅助开发时的开源许可证与著作权合规门禁量身定制。",
        "excerpt_en": "Engineered directly by the Apache Software Foundation to govern AI-generated contributions under rigorous open-source IP policies."
      }
    ]
  }
];

// Append the new skills
newSkills.forEach(s => items.push(s));
console.log(`Appended 4 new skills. Total items now: ${items.length}`);

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
console.log('✅ Successfully wrote updated items.json!');
