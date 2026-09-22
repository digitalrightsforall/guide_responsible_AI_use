// About Page Logic & Bilingual Internationalization

const aboutI18n = {
  zh: {
    pageTitle: "关于我们 - 普通人的数字权利 · Responsible & Safe AI Use",
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkHome: "首页",
    navLinkAbout: "关于我们",
    navLinkPutongren: "普通人的数字权利 官网",
    tLangBtn: "English",

    heroBadge: "普通人的数字权利 (putongren.org) · 负责任 AI 实务计划",
    heroTitlePrefix: "帮助每一个人",
    heroTitleHighlight: "在算法时代保护自己的权利",
    heroDesc: "我们是一个共创社区。在机器与大模型日益渗透生活的今天，我们致力于通过知识普及、实务工具与社会倡导，让每一个普通人都能有尊严、有底线地使用数字工具，重获个人的自主权。",
    ctaExplore: "浏览 38 项开源技能",
    ctaPutongren: "访问 putongren.org 社区官网",

    whyExistTitle: "我们为什么存在？",
    whyExistP1: "在当前的数字技术发展中，数字权利与治理议题长期由政府政策、科技巨头和学术机构驱动。现有的讨论往往自上而下，关注合规与大局，但普通公众和基层社区的声音却难以被听见。",
    whyExistP2: "普通人每天都在使用各类商业应用与算法服务，但在面对冗长的用户协议、隐蔽的数据爬取与不透明的推荐算法时，往往处于完全被动的“裸奔”状态，缺乏趁手有效的自卫手段。",
    whyExistP3: "专门立足于普通人日常维权与数字素养赋能的民间社群极其匮乏。我们希望搭建一个桥梁：不是去讲晦涩的技术理论或法律术语，而是把实实在在的权利保护工具与方法，送到普通人的指尖。",
    whyExistP4: "无论你是知识工作者、高校学生、写作者还是退休老人，在数字与算法时代，你都拥有不被过度索取、不被虚假算法欺骗、保留独立决策尊严的权利。",

    aiPillarsTitle: "AI 时代的权利挑战与本项目定位",
    aiPillarsSubtitle: "传统数字权利关注 Cookie、隐私政策与个人信息保护；而在生成式 AI 时代，人与机器的交互发生了深刻裂变。我们提炼出两大当下实务内核：",
    inwardCardTitle: "对内·自我防护与边界",
    inwardCardDesc: "商业大模型厂商普遍通过默认勾选、静默采集将用户的日常提问、代码片段、私人未发布文稿纳入下一代模型的训练语料池。同时，大模型极具说服力的自信幻觉极易诱导盲信。<br/><br/><strong>实务对策：</strong>在输入前通过脱敏工具与本地隔离防御过采；在对话中引入交叉比对技能，守住个人判断力，严防向商业 AI 出让自主权。",
    outwardCardTitle: "对外·成果第三方可核验",
    outwardCardDesc: "负责任不仅关乎自保，更关乎对社会和他人的尊重。当你将 AI 辅助生成的报告、论文、方案交付给同事、公众或客户时，不能只留下不可信的“黑盒”结论让对方猜疑。<br/><br/><strong>实务对策：</strong>主动附带原始提示词演进、事实证据链锚点与验证切入路径，让任何第三方都能够轻松复核、审计与证伪，建立经得起推敲的职业诚信。",

    whySkillTitle: "为什么只收录开源成熟的规范技能，绝不凭空造词？",
    whySkillContent: `
      <p>市面上充斥着大量虚妄的“AI 提示词秘籍”和自造概念。我们坚持开源与透明原则：</p>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li><strong>真实可信：</strong>所有收录项均来自全球活跃开发者维护的开源仓库（如 Cursor Directory、Anthropic Skills、Cline、Community Verified Tools），均有公开的 GitHub 源码链接。</li>
        <li><strong>规范结构：</strong>采用现代化 Agent 技能规范（SKILL.md），包含清晰的触发条件、执行流程与输入输出标准，可直接导入日常 IDE 与对话客户端。</li>
        <li><strong>维度透明：</strong>明确呈现收录理由、适用时机（输入前、交互中、交付前、归档后）、以及开源活跃度与成熟度背书。</li>
      </ul>
    `,

    visionTitle: "社区三大长远愿景",
    vision1Title: "赋能个人",
    vision1Desc: "加强普通人的数字能力，确保每个人拥有必要的实操技能来捍卫数据权利与隐私，积极参与塑造技术与生活规则。",
    vision2Title: "完善制度",
    vision2Desc: "从民间视角反馈技术落地中的侵害案例，推动更可靠、透明、以人为本的治理框架与公众权益保障机制。",
    vision3Title: "改变社会",
    vision3Desc: "培养一个公民不仅是被动的数据提供者与消费者，更是自身数字权益的知情者与参与者的包容性社会景观。",

    putongrenPillarsTitle: "探索「普通人的数字权利」社区核心板块",
    pRoundtableTitle: "圆桌派",
    pRoundtableDesc: "专家与公众的深度思想碰撞，跨学科探讨算法伦理与法律维权。",
    pCocreationTitle: "共创营",
    pCocreationDesc: "黑客松与公益共创计划，动手孵化属于普通人的开源数字自卫工具。",
    pGuideTitle: "指北",
    pGuideDesc: "面向大众的实用工作坊与指南，让复杂的数据保护变得简单易行。",
    pOpinionTitle: "观点",
    pOpinionDesc: "双周刊与月度盘点，紧跟全球与本土数字权利的最新前沿观察。",
    pPlayTitle: "Play 互动体验",
    pPlayDesc: "趣味交互游戏与算法体验，通过直观互动感受数据追踪与权力不对等。",
    pJoinTitle: "参与本实务工具箱贡献",
    pJoinDesc: "欢迎在 GitHub 提交符合规范的开源 SKILL.md，共建公民级负责任 AI 实务。",

    joinCardTitle: "每一个权利的进步，都离不开你的关注",
    joinCardDesc: "无论你是推荐一款优秀的开源防采集工具，还是分享一次与 AI 协作时的求证与核验经验，你的每一次实践都在帮助更多普通人。",
    joinBtnExplore: "立即探索技能索引",
    joinBtnGithub: "前往 GitHub 提交技能",
    footerLinkHome: "实务索引",
    footerLinkAbout: "关于我们"
  },
  en: {
    pageTitle: "About Us - Digital Rights for All · Responsible & Safe AI Use",
    navBrandTitle: "Responsible & Safe AI Use",
    navBrandSub: "Digital Rights for All Community Project",
    navLinkHome: "Home",
    navLinkAbout: "About Us",
    navLinkPutongren: "putongren.org",
    tLangBtn: "中文",

    heroBadge: "putongren.org · Responsible AI Practical Initiative",
    heroTitlePrefix: "Helping Everyone",
    heroTitleHighlight: "Defend Their Rights in the Algorithmic Era",
    heroDesc: "We are a co-creation community. As AI and machine learning permeate our daily lives, we empower everyday people with practical knowledge, open tools, and community advocacy to use AI with dignity, boundary protection, and agency.",
    ctaExplore: "Browse 38 Curated Skills",
    ctaPutongren: "Visit putongren.org Community",

    whyExistTitle: "Why Do We Exist?",
    whyExistP1: "Digital rights and AI governance have long been dominated by government policies, big tech conglomerates, and academic elites. Existing structures are top-down, leaving grassroots communities and everyday users with little voice or agency.",
    whyExistP2: "People interact with algorithms daily, yet face endless terms of service, silent data scraping, and black-box recommendations completely vulnerable and unprotected, lacking practical self-defense mechanisms.",
    whyExistP3: "Civil society initiatives focusing on everyday digital self-defense are scarce. We bridge this gap—not with legal jargon or abstract theories, but by putting tangible defensive tools and practices directly into people's hands.",
    whyExistP4: "Whether you are a knowledge worker, student, writer, or retiree, you have the fundamental right to not be exploited by data collectors, not be misled by hallucinations, and retain sovereign decision-making power.",

    aiPillarsTitle: "Rights Challenges in the AI Era & Our Mission",
    aiPillarsSubtitle: "Traditional digital rights addressed cookies and data policies; generative AI transforms human-machine collaboration entirely. We distill two practical pillars for today:",
    inwardCardTitle: "Inward: Self-Defense & Boundaries",
    inwardCardDesc: "Commercial AI providers quietly scrape everyday chat queries, proprietary draft code, and unpublished writings into their next training datasets. Confident hallucinations also risk passive blind trust.<br/><br/><strong>Practical Guardrail:</strong> Use pre-input sanitization and local sandboxing to prevent over-harvesting; adopt multi-source verification skills to preserve critical human judgment.",
    outwardCardTitle: "Outward: Third-Party Verifiability",
    outwardCardDesc: "Responsible use is not just self-defense—it is respect for colleagues, readers, and society. When delivering AI-assisted reports, code, or decisions, you must not hand over an unverifiable black box.<br/><br/><strong>Practical Guardrail:</strong> Proactively attach prompt histories, verification anchor points, and reproducible evidence chains so third parties can independently audit and verify your work.",

    whySkillTitle: "Why Curated Open-Source SKILL.md Only?",
    whySkillContent: `
      <p>The web is flooded with dubious prompt recipes and marketing buzzwords. We insist on open source and radical transparency:</p>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li><strong>Authentic & Verifiable:</strong> Every skill comes from actively maintained open-source repositories (Cursor Directory, Anthropic Skills, Cline, Community repos) with public GitHub sources.</li>
        <li><strong>Standardized Format:</strong> Written in standard SKILL.md specs with clear trigger criteria, step-by-step logic, and input/output contracts.</li>
        <li><strong>Multi-Dimensional Transparency:</strong> We document why each skill was chosen, its workflow timing (pre-input, during-chat, pre-handoff, post-session), and its maturity/trust signals.</li>
      </ul>
    `,

    visionTitle: "Three Long-Term Community Visions",
    vision1Title: "Empower Individuals",
    vision1Desc: "Strengthen personal capabilities so everyone possesses the practical skills to defend their data privacy and shape digital rules.",
    vision2Title: "Improve Systems",
    vision2Desc: "Elevate grassroots feedback on algorithmic harms to foster accountable, transparent, and human-centered governance frameworks.",
    vision3Title: "Transform Society",
    vision3Desc: "Nurture a public sphere where citizens are active stewards of their digital rights rather than passive data suppliers.",

    putongrenPillarsTitle: "Explore Core Sections of putongren.org",
    pRoundtableTitle: "Roundtables (圆桌派)",
    pRoundtableDesc: "Cross-disciplinary dialogues between experts and the public on algorithmic ethics and digital rights.",
    pCocreationTitle: "Cocreation Camp (共创营)",
    pCocreationDesc: "Hackathons and community co-creation incubating open-source digital defense tools for citizens.",
    pGuideTitle: "Guides (指北)",
    pGuideDesc: "Practical workshops and field manuals demystifying complex data protection into everyday habits.",
    pOpinionTitle: "Opinions (观点)",
    pOpinionDesc: "Bi-weekly briefings and monthly retrospectives tracking the frontiers of digital rights.",
    pPlayTitle: "Play Experiences (Play)",
    pPlayDesc: "Interactive web experiments and games revealing algorithmic manipulation and power asymmetries.",
    pJoinTitle: "Contribute to This Curated Index",
    pJoinDesc: "Submit verified open-source SKILL.md packages via GitHub PR to build public-interest AI practices.",

    joinCardTitle: "Every Advancement in Rights Depends on You",
    joinCardDesc: "Whether you recommend a robust open-source privacy skill or share an audit protocol, your contribution safeguards everyday people.",
    joinBtnExplore: "Explore Skill Directory",
    joinBtnGithub: "Submit Skills on GitHub",
    footerLinkHome: "Directory",
    footerLinkAbout: "About Us"
  }
};

let currentLang = localStorage.getItem("rai_lang") || "zh";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  updateUI();
});

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function setupEventListeners() {
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem("rai_lang", currentLang);
    updateUI();
  });
}

function updateUI() {
  const t = aboutI18n[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  document.title = t.pageTitle;
  setText("nav-brand-title", t.navBrandTitle);
  setText("nav-brand-sub", t.navBrandSub);
  setText("nav-link-home", t.navLinkHome);
  setText("nav-link-about", t.navLinkAbout);
  setText("nav-link-putongren", t.navLinkPutongren);
  setText("t-lang-btn", t.tLangBtn);

  setText("hero-badge", t.heroBadge);
  setText("hero-title-prefix", t.heroTitlePrefix);
  setText("hero-title-highlight", t.heroTitleHighlight);
  setText("hero-desc", t.heroDesc);
  setText("cta-explore", t.ctaExplore);
  setText("cta-putongren", t.ctaPutongren);

  setText("why-exist-title", t.whyExistTitle);
  setText("why-exist-p1", t.whyExistP1);
  setText("why-exist-p2", t.whyExistP2);
  setText("why-exist-p3", t.whyExistP3);
  setText("why-exist-p4", t.whyExistP4);

  setText("ai-pillars-title", t.aiPillarsTitle);
  setText("ai-pillars-subtitle", t.aiPillarsSubtitle);
  setText("inward-card-title", t.inwardCardTitle);
  setHtml("inward-card-desc", t.inwardCardDesc);
  setText("outward-card-title", t.outwardCardTitle);
  setHtml("outward-card-desc", t.outwardCardDesc);

  setText("why-skill-title", t.whySkillTitle);
  setHtml("why-skill-content", t.whySkillContent);

  setText("vision-title", t.visionTitle);
  setText("vision-1-title", t.vision1Title);
  setText("vision-1-desc", t.vision1Desc);
  setText("vision-2-title", t.vision2Title);
  setText("vision-2-desc", t.vision2Desc);
  setText("vision-3-title", t.vision3Title);
  setText("vision-3-desc", t.vision3Desc);

  setText("putongren-pillars-title", t.putongrenPillarsTitle);
  setText("p-roundtable-title", t.pRoundtableTitle);
  setText("p-roundtable-desc", t.pRoundtableDesc);
  setText("p-cocreation-title", t.pCocreationTitle);
  setText("p-cocreation-desc", t.pCocreationDesc);
  setText("p-guide-title", t.pGuideTitle);
  setText("p-guide-desc", t.pGuideDesc);
  setText("p-opinion-title", t.pOpinionTitle);
  setText("p-opinion-desc", t.pOpinionDesc);
  setText("p-play-title", t.pPlayTitle);
  setText("p-play-desc", t.pPlayDesc);
  setText("p-join-title", t.pJoinTitle);
  setText("p-join-desc", t.pJoinDesc);

  setText("join-card-title", t.joinCardTitle);
  setText("join-card-desc", t.joinCardDesc);
  setText("join-btn-explore", t.joinBtnExplore);
  setText("join-btn-github", t.joinBtnGithub);
  setText("footer-link-home", t.footerLinkHome);
  setText("footer-link-about", t.footerLinkAbout);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
