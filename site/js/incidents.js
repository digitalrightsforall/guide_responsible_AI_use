// Application Logic for Responsible AI Incidents Repository
// Aligned with DESIGN.md & putongren.org

const i18n = {
  zh: {
    pageTitle: "生成式 AI 使用者真实案件与责任事件库 - 普通人的数字权利 · Real-World AI Incidents",
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkGuide: "实务指南",
    navLinkLibrary: "技能库",
    navLinkIncidents: "真实案例库",
    navLinkPutongren: "普通人的数字权利 官网",
    tLangBtn: "English",

    heroBadge: "普通人的数字权利 · 真实事件与判例库",
    heroTitle: "生成式 AI 使用者真实案件与责任事件库",
    heroHighlight: "警惕滥用致责，捍卫使用者合法权益",
    heroSubtitle: "收录 31 起已定位公开来源的 AI 使用风险事件，涵盖生效裁判、行政处罚、官方通报、在审诉讼、厂商披露与媒体调查。提供案号文号、事实研判与开源自卫防范技能。",
    heroGuideLink: "阅读《实务指南》深入系统性防范流水线 →",
    heroLibraryLink: "探索 44 项开源防范技能包 →",

    statTotalValue: "{total} 起",
    statTotalLabel: "案例收录",
    statTotalSub: "司法裁判/行政监管/官方通报",
    statVerifiedValue: "{primary}/{total}",
    statVerifiedLabel: "一手公报与裁判",
    statVerifiedSub: "{secondary} 起权威媒体与在审调查",
    statDualLabel: "双向责任立场",
    statDualSub: "权益受损 {infringed} 起 · 违规致责 {sanctioned} 起",
    statLifecycleLabel: "全生命周期覆盖",
    statLifecycleSub: "输入泄密 · 输出幻觉 · 执行失控",

    bannerShieldTitle: "🛡️ 使用者权益受损事件 (User Rights Infringed)",
    bannerShieldDesc: "声音肖像未经许可被克隆商用、商业 AI 侵权倒卖数据、AI 客服虚假承诺致财产损失。教你如何取证维权、构筑个人数字防护线。",
    bannerRulerTitle: "🚨 使用者违规致责事件 (Irresponsible Use Penalized)",
    bannerRulerDesc: "未脱敏机密直传公网被辞退处分、本地开源模型端口暴露遭境外渗透、采信 AI 编造假判例当庭受训诫、AI 伪造带货文案罚款 120 万。告诫我们“工具不可推责”。",

    filterStanceTitle: "责任立场维度 (Accountability Stance)",
    stanceAll: "全部立场",
    stanceInfringed: "🛡️ 使用者权益受损",
    stanceSanctioned: "🚨 违规使用被追责",

    filterRegionTitle: "法域与地域 (Jurisdiction & Region)",
    regionAll: "全部法域",
    regionDomestic: "🇨🇳 国内判例与行政监管",
    regionInternational: "🌐 国际前沿先例",

    filterCategoryTitle: "风险类型分类 (Risk Taxonomy)",
    catAll: "全部类型",
    catConfidentiality: "🔒 保密协议与公网截留",
    catHallucination: "📚 司法文献与事实幻觉",
    catIp: "🎙️ 声音/肖像/版权越界",
    catFraud: "📢 商业虚假宣传与欺诈",

    filterLifecycleTitle: "生命周期环节 (Lifecycle Stage)",
    lifeAll: "全部环节",
    lifeInput: "📥 输入端风险 (数据/Prompt/隐私)",
    lifeOutput: "📤 输出端风险 (幻觉/引用/虚假声明)",
    lifeExecution: "⚙️ 执行端风险 (Agent权限/沙箱/承诺)",

    searchPlaceholder: "搜索案由、案号、当事人、法院、处罚结果或应对技能...",
    resultsPrefix: "共筛选出",
    resultsSuffix: "个真实责任事件",
    btnResetFilters: "重置所有筛选",
    btnViewDetails: "查看案件详情与防范 →",
    btnCopyLink: "🔗 复制直链",
    linkCopied: "案例直达链接已复制到剪贴板！",
    noResults: "未找到符合筛选条件的案件事件，请尝试清空或放宽搜索关键词。",

    modalTitle: "案件深度研判与防范详情",
    modalCaseNoLabel: "权威文号 / 案号：",
    modalWarningNoLabel: "反面警示：AI 捏造并错配的虚假案号",
    modalAuthorityLabel: "审理 / 核发机构：",
    modalSummaryLabel: "案件基本事实与经过：",
    modalConsequenceLabel: "实质后果与法律 / 纪律惩处：",
    modalTakeawayLabel: "写给普通使用者的实操防范铁律：",
    modalSkillsLabel: "🛡️ 推荐自卫技能（点击可直达技能详情）：",
    modalSourcesLabel: "来源与相关材料 (Sources & Case Records)：",
    modalCloseBtn: "关闭窗口",
    modalGuideBtn: "在指南中查看对应章节 ➔",

    mNavGuide: "实务指南",
    mNavLibrary: "技能库",
    mNavIncidents: "案例库",
    footerLinkGuide: "实务指南",
    footerLinkLibrary: "技能库",
    footerLinkIncidents: "真实案例库"
  },
  en: {
    pageTitle: "Real-World AI Incidents & Accountability Casebook - Digital Rights for All",
    navBrandTitle: "Responsible & Safe AI Use",
    navBrandSub: "Digital Rights for All Community Project",
    navLinkGuide: "Field Guide",
    navLinkLibrary: "Skill Library",
    navLinkIncidents: "Incident Casebook",
    navLinkPutongren: "putongren.org",
    tLangBtn: "中文",

    heroBadge: "Digital Rights for All · Real-World AI Incidents",
    heroTitle: "Real-World AI Incidents & Accountability Casebook",
    heroHighlight: "Guarding User Rights & Preventing Accountability Failures",
    heroSubtitle: "Curating 31 public-record AI risk incidents across finalized judgments, regulatory enforcement, state security notices, active lawsuits, vendor incidents, and investigative reports. Complete with case citations and open-source defenses.",
    heroGuideLink: "Read the Practical Field Guide for defensive pipelines →",
    heroLibraryLink: "Explore 44 Curated Open-Source Skills →",

    statTotalValue: "{total} Cases",
    statTotalLabel: "Incidents Curated",
    statTotalSub: "Judicial / Regulatory / Official Notices",
    statVerifiedValue: "{primary}/{total}",
    statVerifiedLabel: "Primary Docket & Gazette",
    statVerifiedSub: "{secondary} Authoritative Media / In-Litigation",
    statDualLabel: "Dual Accountability Axis",
    statDualSub: "{infringed} Rights Harmed · {sanctioned} Penalized",
    statLifecycleLabel: "Full Lifecycle Coverage",
    statLifecycleSub: "Input Leaks · Output Hallucinations · Agent Action",

    bannerShieldTitle: "🛡️ User Rights Infringed Incidents",
    bannerShieldDesc: "Unauthorized voice/face cloning, commercial scraping of private data, misleading customer service agent commitments causing financial losses.",
    bannerRulerTitle: "🚨 Irresponsible User Sanctioned Incidents",
    bannerRulerDesc: "Workplace secret leaks via web prompts, exposed unauthenticated local LLM ports infiltrated by foreign APTs, hallucinated case citations reprimanded in court, ¥1.2M fines for AI fake brand history.",

    filterStanceTitle: "Accountability Stance",
    stanceAll: "All Stances",
    stanceInfringed: "🛡️ User Rights Harmed",
    stanceSanctioned: "🚨 Irresponsible Use Penalized",

    filterRegionTitle: "Jurisdiction & Region",
    regionAll: "All Jurisdictions",
    regionDomestic: "🇨🇳 Domestic China",
    regionInternational: "🌐 International Precedents",

    filterCategoryTitle: "Risk Taxonomy",
    catAll: "All Types",
    catConfidentiality: "🔒 Confidentiality & Exfiltration",
    catHallucination: "📚 Judicial Citation & Fact Hallucination",
    catIp: "🎙️ Voice, Portrait & Copyright Infringement",
    catFraud: "📢 Commercial False Advertising & Fraud",

    filterLifecycleTitle: "Lifecycle Stage",
    lifeAll: "All Stages",
    lifeInput: "📥 Input Risk (PII, Secrets, Prompts)",
    lifeOutput: "📤 Output Risk (Hallucination, Fake Claims)",
    lifeExecution: "⚙️ Execution Risk (Agent Overreach, Sandboxes)",

    searchPlaceholder: "Search by case title, case number, court, penalty, or countermeasure skill...",
    resultsPrefix: "Showing",
    resultsSuffix: "verified incidents",
    btnResetFilters: "Reset All Filters",
    btnViewDetails: "View Details & Defenses →",
    btnCopyLink: "🔗 Copy Link",
    linkCopied: "Incident deep link copied to clipboard!",
    noResults: "No incidents matched your selected filters. Try broadening your keywords.",

    modalTitle: "Incident Analysis & Defense Details",
    modalCaseNoLabel: "Authority / Case Docket No:",
    modalWarningNoLabel: "Negative Warning: Fictitious AI-generated case number",
    modalAuthorityLabel: "Adjudicating / Issuing Authority:",
    modalSummaryLabel: "Case Summary & Facts:",
    modalConsequenceLabel: "Substantial Consequences & Legal Sanctions:",
    modalTakeawayLabel: "Key Takeaway for Everyday Users:",
    modalSkillsLabel: "🛡️ Recommended Countermeasures (Click to view skill):",
    modalSourcesLabel: "Sources & Case Documentation:",
    modalCloseBtn: "Close",
    modalGuideBtn: "View in Field Guide ➔",

    mNavGuide: "Field Guide",
    mNavLibrary: "Skills",
    mNavIncidents: "Cases",
    footerLinkGuide: "Field Guide",
    footerLinkLibrary: "Skill Library",
    footerLinkIncidents: "Incident Casebook"
  }
};

let currentLang = localStorage.getItem("lang") || "zh";
let incidentsData = [];
let itemsById = {};

const currentFilters = {
  stance: "all",
  region: "all",
  category: "all",
  lifecycle: "all",
  search: ""
};

// Theme Management
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

// Language Management
function toggleLanguage() {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem("lang", currentLang);
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  updateStaticTexts();
  updateFilterCounts();
  filterAndRender();
}

function updateStaticTexts() {
  const t = i18n[currentLang];
  document.title = t.pageTitle;

  const textIds = [
    "nav-brand-title", "nav-brand-sub", "nav-link-guide", "nav-link-library",
    "nav-link-incidents", "nav-link-putongren", "t-lang-btn", "hero-badge",
    "hero-title", "hero-highlight", "hero-subtitle", "hero-guide-link",
    "hero-library-link", "stat-total-label", "stat-total-sub", "stat-verified-label",
    "stat-verified-sub", "stat-dual-label", "stat-dual-sub", "stat-lifecycle-label",
    "stat-lifecycle-sub", "banner-shield-title", "banner-shield-desc",
    "banner-ruler-title", "banner-ruler-desc", "filter-stance-title",
    "filter-region-title", "filter-category-title", "filter-lifecycle-title",
    "btn-reset-filters", "footer-link-guide", "footer-link-library", "footer-link-incidents",
    "m-nav-guide", "m-nav-library", "m-nav-incidents"
  ];

  textIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const key = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (t[key]) el.textContent = t[key];
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.placeholder = t.searchPlaceholder;
  }

  // Update filter button labels
  const filterMappings = {
    "btn-stance-all": t.stanceAll,
    "btn-stance-infringed": t.stanceInfringed,
    "btn-stance-sanctioned": t.stanceSanctioned,
    "btn-region-all": t.regionAll,
    "btn-region-domestic": t.regionDomestic,
    "btn-region-international": t.regionInternational,
    "btn-cat-all": t.catAll,
    "btn-cat-confidentiality": t.catConfidentiality,
    "btn-cat-hallucination": t.catHallucination,
    "btn-cat-ip": t.catIp,
    "btn-cat-fraud": t.catFraud,
    "btn-life-all": t.lifeAll,
    "btn-life-input": t.lifeInput,
    "btn-life-output": t.lifeOutput,
    "btn-life-execution": t.lifeExecution
  };

  Object.entries(filterMappings).forEach(([btnId, text]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const labelSpan = btn.querySelector(".btn-label");
    if (labelSpan) {
      labelSpan.textContent = text;
    }
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Data Fetching
async function loadData() {
  try {
    const [incRes, itemsRes] = await Promise.all([
      fetch("data/incidents.json"),
      fetch("data/items.json")
    ]);
    incidentsData = await incRes.json();
    const items = await itemsRes.json();
    itemsById = {};
    items.forEach(it => {
      itemsById[it.id] = it;
    });

    updateFilterCounts();
    filterAndRender();
    checkDeepLink();
  } catch (err) {
    console.error("Failed to load incident data:", err);
  }
}

// Update Counts on Filter Buttons
function updateFilterCounts() {
  const counts = {
    stance: { all: incidentsData.length, user_rights_infringed: 0, irresponsible_user_sanctioned: 0 },
    region: { all: incidentsData.length, Domestic: 0, International: 0 },
    category: {
      all: incidentsData.length,
      confidential_data_leakage: 0,
      hallucination_false_citation: 0,
      copyright_ip_infringement: 0,
      commercial_fraud_deception: 0
    },
    lifecycle: { all: incidentsData.length, input_risk: 0, output_risk: 0, execution_risk: 0 }
  };

  incidentsData.forEach(inc => {
    if (counts.stance[inc.user_stance] !== undefined) {
      counts.stance[inc.user_stance]++;
    }
    if (counts.region[inc.region] !== undefined) {
      counts.region[inc.region]++;
    }
    const cat = inc.risk_category;
    if (cat === "confidential_data_leakage") counts.category.confidential_data_leakage++;
    else if (cat === "hallucination_false_citation") counts.category.hallucination_false_citation++;
    else if (cat === "copyright_ip_infringement") counts.category.copyright_ip_infringement++;
    else if (cat === "commercial_fraud_deception" || cat === "consumer_fraud_bias") counts.category.commercial_fraud_deception++;

    (inc.lifecycle_risk_type || []).forEach(lr => {
      if (counts.lifecycle[lr] !== undefined) counts.lifecycle[lr]++;
    });
  });

  const updateCountBadge = (selector, count) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = count;
  };

  updateCountBadge("#btn-stance-all .filter-count", counts.stance.all);
  updateCountBadge("#btn-stance-infringed .filter-count", counts.stance.user_rights_infringed);
  updateCountBadge("#btn-stance-sanctioned .filter-count", counts.stance.irresponsible_user_sanctioned);

  updateCountBadge("#btn-region-all .filter-count", counts.region.all);
  updateCountBadge("#btn-region-domestic .filter-count", counts.region.Domestic);
  updateCountBadge("#btn-region-international .filter-count", counts.region.International);

  updateCountBadge("#btn-cat-all .filter-count", counts.category.all);
  updateCountBadge("#btn-cat-confidentiality .filter-count", counts.category.confidential_data_leakage);
  updateCountBadge("#btn-cat-hallucination .filter-count", counts.category.hallucination_false_citation);
  updateCountBadge("#btn-cat-ip .filter-count", counts.category.copyright_ip_infringement);
  updateCountBadge("#btn-cat-fraud .filter-count", counts.category.commercial_fraud_deception);

  updateCountBadge("#btn-life-all .filter-count", counts.lifecycle.all);
  updateCountBadge("#btn-life-input .filter-count", counts.lifecycle.input_risk);
  updateCountBadge("#btn-life-output .filter-count", counts.lifecycle.output_risk);
  updateCountBadge("#btn-life-execution .filter-count", counts.lifecycle.execution_risk);

  // Synchronize Top Metric Badges
  const primaryCount = incidentsData.filter(i => i.source_status === "primary_source").length;
  const secondaryCount = incidentsData.filter(i => i.source_status === "secondary_media").length;
  const t = i18n[currentLang];
  const setEl = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

  setEl("stat-total-value", t.statTotalValue.replace("{total}", incidentsData.length));
  setEl("stat-verified-value", t.statVerifiedValue.replace("{primary}", primaryCount).replace("{total}", incidentsData.length));
  setEl("stat-verified-sub", t.statVerifiedSub.replace("{secondary}", secondaryCount));
  setEl("stat-dual-sub", t.statDualSub
    .replace("{infringed}", counts.stance.user_rights_infringed)
    .replace("{sanctioned}", counts.stance.irresponsible_user_sanctioned));
}

// Filter and Render
function filterAndRender() {
  const isZh = currentLang === "zh";
  const query = (currentFilters.search || "").toLowerCase().trim();

  const filtered = incidentsData.filter(inc => {
    // Stance filter
    if (currentFilters.stance !== "all" && inc.user_stance !== currentFilters.stance) {
      return false;
    }
    // Region filter
    if (currentFilters.region !== "all" && inc.region !== currentFilters.region) {
      return false;
    }
    // Category filter
    if (currentFilters.category !== "all") {
      if (currentFilters.category === "commercial_fraud_deception") {
        if (inc.risk_category !== "commercial_fraud_deception" && inc.risk_category !== "consumer_fraud_bias") return false;
      } else if (inc.risk_category !== currentFilters.category) {
        return false;
      }
    }
    // Lifecycle filter
    if (currentFilters.lifecycle !== "all") {
      if (!inc.lifecycle_risk_type || !inc.lifecycle_risk_type.includes(currentFilters.lifecycle)) {
        return false;
      }
    }
    // Text search
    if (query) {
      const matchText = [
        inc.title_zh, inc.title_en,
        inc.summary_zh, inc.summary_en,
        inc.consequence_zh, inc.consequence_en,
        inc.key_takeaway_zh, inc.key_takeaway_en,
        inc.case_number_status?.actual_case_no,
        inc.case_number_status?.authority,
        inc.jurisdiction,
        ...(inc.links?.countermeasure_skills || [])
      ].filter(Boolean).join(" ").toLowerCase();

      if (!matchText.includes(query)) return false;
    }
    return true;
  });

  renderIncidents(filtered);
}

// Render Incident Cards Grid
function renderIncidents(list) {
  const container = document.getElementById("incidents-container");
  const countEl = document.getElementById("results-count-text");
  const t = i18n[currentLang];
  const isZh = currentLang === "zh";

  if (countEl) {
    countEl.textContent = `${t.resultsPrefix} ${list.length} ${t.resultsSuffix}`;
  }

  if (!list || list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
        <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xl">🔍</div>
        <div class="text-base font-bold text-slate-800 dark:text-slate-200">${t.noResults}</div>
        <div>
          <button onclick="resetAllFilters()" class="px-4 py-2 rounded-xl bg-brand/10 hover:bg-brand/20 text-brand text-xs font-bold transition-colors">
            ${t.btnResetFilters}
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(inc => {
    const title = isZh ? inc.title_zh : inc.title_en;
    const summary = isZh ? inc.summary_zh : inc.summary_en;
    const consequence = isZh ? inc.consequence_zh : inc.consequence_en;
    const takeaway = isZh ? inc.key_takeaway_zh : inc.key_takeaway_en;
    const category = isZh ? inc.risk_category_zh : inc.risk_category_en;
    const verification = isZh ? inc.verification_level_zh : inc.verification_level_en;
    const regionFlag = inc.region === "Domestic" ? "🇨🇳" : "🌐";

    const stanceBadge = inc.user_stance === "user_rights_infringed"
      ? (isZh ? "🛡️ 权益受侵害" : "🛡️ Rights Harmed")
      : (isZh ? "🚨 违规被追责" : "🚨 Penalized");
    const stanceClass = inc.user_stance === "user_rights_infringed"
      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";

    const lifecycleLabels = {
      input_risk: isZh ? "输入端" : "Input",
      output_risk: isZh ? "输出端" : "Output",
      execution_risk: isZh ? "执行端" : "Execution"
    };
    const lifecycleBadgesHtml = (inc.lifecycle_risk_type || []).map(lr => `
      <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${lifecycleLabels[lr] || lr}</span>
    `).join("");

    const skillPills = (inc.links?.countermeasure_skills || []).map(sId => {
      const sk = itemsById[sId];
      const skTitle = sk ? (isZh ? (sk.title_zh || sk.id) : (sk.title_en || sk.id)) : sId;
      return `
        <a href="library.html?skill=${sId}" target="_blank" rel="noopener noreferrer" class="inline-skill-pill text-[11px]" title="${isZh ? '在技能库中查看详情' : 'View in Skill Library'}">
          <span>🛡️ ${escapeHtml(skTitle)}</span>
        </a>
      `;
    }).join("");

    const caseDocket = inc.case_number_status?.actual_case_no || "";

    let verificationBadgeClass = "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
    if (inc.verification_level === "IN_LITIGATION") {
      verificationBadgeClass = "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    } else if (inc.verification_level === "VENDOR_DISCLOSURE") {
      verificationBadgeClass = "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800";
    } else if (inc.verification_level === "SETTLED") {
      verificationBadgeClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    }

    return `
      <article id="${inc.id}" class="incident-card bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-brand/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4 scroll-mt-28">
        <!-- Top Badges Row -->
        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${stanceClass}">${stanceBadge}</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${regionFlag} ${escapeHtml(inc.jurisdiction)}</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">${escapeHtml(category)}</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${verificationBadgeClass}">${escapeHtml(verification)}</span>
          </div>

          <!-- Title -->
          <h3 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug cursor-pointer hover:text-brand transition-colors" onclick="openIncidentModal('${inc.id}', true)">
            ${escapeHtml(title)}
          </h3>

          <!-- Authority & Case Docket Line -->
          ${caseDocket ? `
            <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1.5">
              <span class="font-bold text-slate-700 dark:text-slate-300">${isZh ? '案号/文号:' : 'Docket:'}</span>
              <span class="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">${escapeHtml(caseDocket)}</span>
            </div>
          ` : ""}

          <!-- Summary -->
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            ${escapeHtml(summary)}
          </p>

          <!-- Consequence Alert Box -->
          <div class="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 space-y-1">
            <span class="text-[11px] font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1">
              <span>⚠️</span>
              <span>${isZh ? '实质后果与处分：' : 'Consequence / Penalty:'}</span>
            </span>
            <p class="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
              ${escapeHtml(consequence)}
            </p>
          </div>

          <!-- Key Takeaway Box -->
          <div class="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 space-y-1">
            <span class="text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
              <span>💡</span>
              <span>${isZh ? '使用者实操防范铁律：' : 'Practical Rule of Thumb:'}</span>
            </span>
            <p class="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
              ${escapeHtml(takeaway)}
            </p>
          </div>
        </div>

        <!-- Footer Actions & Skills -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          ${skillPills ? `
            <div class="flex flex-wrap items-center gap-1">
              <span class="text-[10px] text-slate-400 font-bold mr-1">${isZh ? '配套自卫技能:' : 'Skills:'}</span>
              ${skillPills}
            </div>
          ` : ""}

          <div class="flex items-center gap-2 pt-2">
            <button type="button" onclick="openIncidentModal('${inc.id}', true)" class="flex-1 btn-primary text-xs py-2 px-3.5 inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs">
              <span>${t.btnViewDetails}</span>
            </button>
            <button type="button" onclick="copyIncidentLink('${inc.id}')" class="shrink-0 p-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors inline-flex items-center justify-center cursor-pointer" title="${t.btnCopyLink}" aria-label="${t.btnCopyLink}">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Copy Deep Link
function copyIncidentLink(id) {
  const url = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(id)}`;
  navigator.clipboard.writeText(url).then(() => {
    alert(i18n[currentLang].linkCopied);
  }).catch(() => {
    prompt("直达链接 (Deep Link):", url);
  });
}

// Open Detail Modal
function openIncidentModal(incidentId, updateHistory = true) {
  const inc = incidentsData.find(i => i.id === incidentId);
  if (!inc) return;

  const modal = document.getElementById("incident-modal");
  if (!modal) return;

  const isZh = currentLang === "zh";
  const t = i18n[currentLang];

  if (updateHistory) {
    history.replaceState(null, "", `?id=${encodeURIComponent(incidentId)}`);
  }

  // Badges
  const regionFlag = inc.region === "Domestic" ? "🇨🇳" : "🌐";
  const stanceBadge = inc.user_stance === "user_rights_infringed"
    ? (isZh ? "🛡️ 使用者权益受损" : "🛡️ User Rights Harmed")
    : (isZh ? "🚨 违规使用被追责" : "🚨 Irresponsible Use Penalized");
  const stanceClass = inc.user_stance === "user_rights_infringed"
    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";

  const lifecycleLabels = {
    input_risk: isZh ? "输入端风险" : "Input Risk",
    output_risk: isZh ? "输出端风险" : "Output Risk",
    execution_risk: isZh ? "执行端风险" : "Execution Risk"
  };
  const lifecycleBadgesHtml = (inc.lifecycle_risk_type || []).map(r => `
    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${lifecycleLabels[r] || r}</span>
  `).join("");

    let verificationBadgeClassModal = "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
    if (inc.verification_level === "IN_LITIGATION") {
      verificationBadgeClassModal = "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    } else if (inc.verification_level === "VENDOR_DISCLOSURE") {
      verificationBadgeClassModal = "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800";
    } else if (inc.verification_level === "SETTLED") {
      verificationBadgeClassModal = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    }

    document.getElementById("incident-modal-badges").innerHTML = `
    <span class="px-2 py-0.5 rounded-full text-xs font-bold border ${stanceClass}">${stanceBadge}</span>
    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${regionFlag} ${escapeHtml(inc.jurisdiction)}</span>
    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">${escapeHtml(isZh ? inc.risk_category_zh : inc.risk_category_en)}</span>
    <span class="px-2 py-0.5 rounded-full text-xs font-bold border ${verificationBadgeClassModal}">${escapeHtml(isZh ? inc.verification_level_zh : inc.verification_level_en)}</span>
    ${lifecycleBadgesHtml}
  `;

  document.getElementById("incident-modal-title").textContent = isZh ? inc.title_zh : inc.title_en;

  // Case Number Status Box
  let caseNoHtml = "";
  if (inc.case_number_status) {
    const c = inc.case_number_status;
    caseNoHtml = `
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="font-bold text-slate-700 dark:text-slate-200">${t.modalCaseNoLabel}</span>
          <span class="font-mono text-slate-900 dark:text-white font-bold bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700">${escapeHtml(c.actual_case_no || "")}</span>
        </div>
        ${c.fictitious_ai_case_no ? `
          <div class="text-rose-600 dark:text-rose-400 font-mono text-xs bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/60 flex items-start gap-2">
            <span class="shrink-0 font-bold">⚠️</span>
            <span><strong>${t.modalWarningNoLabel}: </strong>${escapeHtml(c.fictitious_ai_case_no)}</span>
          </div>
        ` : ''}
        ${c.authority ? `<div class="text-[11px] text-slate-500 dark:text-slate-400">${t.modalAuthorityLabel} ${escapeHtml(c.authority)}</div>` : ''}
      </div>
    `;
  }

  // Countermeasure Skills
  const skillButtonsHtml = (inc.links?.countermeasure_skills || []).map(sId => {
    const sk = itemsById[sId];
    const label = sk ? (isZh ? (sk.title_zh || sk.id) : (sk.title_en || sk.id)) : sId;
    return `
      <a href="library.html?skill=${sId}" target="_blank" rel="noopener noreferrer" class="inline-skill-pill text-xs">
        <span>🛡️ ${escapeHtml(label)} ↗</span>
      </a>
    `;
  }).join("");

  // Primary Sources
  const tierLabels = {
    tier1_legal: isZh ? "官方文书/司法通报" : "Official Legal/Judicial",
    tier2_regulatory: isZh ? "监管部门披露" : "Regulatory Authority",
    tier2_media: isZh ? "权威媒体报道" : "Authoritative Media",
    tier3_selfmedia: isZh ? "行业媒体/自媒体" : "Industry/Self-Media",
    tier4_individual: isZh ? "个人申诉/博客" : "Individual Claim/Blog"
  };

  const sourcesHtml = (inc.sources || []).map(s => {
    const tierName = tierLabels[s.tier] || s.tier || "";
    const isHp = s.url_scope === "homepage";
    const linkText = isHp
      ? (isZh ? "访问机构门户（原文待补）" : "Portal (Source Link Pending)")
      : (isZh ? "查看原始文书" : "View Source");
    return `
      <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
        <div class="min-w-0 pr-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">${escapeHtml(s.title)}</span>
            ${tierName ? `<span class="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${escapeHtml(tierName)}</span>` : ""}
          </div>
          <span class="text-[10px] text-slate-400 block">${escapeHtml(s.publisher || "")}</span>
        </div>
        ${s.url ? `
          <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="shrink-0 text-brand font-bold text-xs hover:underline flex items-center gap-1">
            <span>${linkText} ↗</span>
          </a>
        ` : `
          <span class="shrink-0 text-slate-400 text-[11px]">${isZh ? '来源待复核补全' : 'Source pending'}</span>
        `}
      </div>
    `;
  }).join("");

  // Modal Body Content
  document.getElementById("incident-modal-body").innerHTML = `
    ${caseNoHtml}

    <!-- Summary -->
    <div class="space-y-1.5">
      <h4 class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">${t.modalSummaryLabel}</h4>
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        ${escapeHtml(isZh ? inc.summary_zh : inc.summary_en)}
      </p>
    </div>

    <!-- Legal Consequence / Penalty -->
    <div class="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 space-y-1.5">
      <h4 class="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
        <svg class="w-4 h-4 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        ${t.modalConsequenceLabel}
      </h4>
      <p class="text-xs sm:text-sm text-rose-950 dark:text-rose-100 font-semibold leading-relaxed">
        ${escapeHtml(isZh ? inc.consequence_zh : inc.consequence_en)}
      </p>
    </div>

    <!-- Key Takeaway for Everyday Users -->
    <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5">
      <h4 class="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
        <span>💡</span>
        ${t.modalTakeawayLabel}
      </h4>
      <p class="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
        ${escapeHtml(isZh ? inc.key_takeaway_zh : inc.key_takeaway_en)}
      </p>
    </div>

    <!-- Countermeasure Skills -->
    <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
      <h4 class="text-xs font-bold text-indigo-900 dark:text-indigo-300">
        ${t.modalSkillsLabel}
      </h4>
      <div class="flex flex-wrap gap-2 pt-0.5">
        ${skillButtonsHtml || '<span class="text-xs text-slate-400">通用规范防御</span>'}
      </div>
    </div>

    <!-- Primary Source Links -->
    <div class="pt-1 text-xs space-y-1.5">
      <span class="font-bold text-slate-600 dark:text-slate-400">${t.modalSourcesLabel}</span>
      <div class="space-y-1.5 pt-1">${sourcesHtml}</div>
    </div>
  `;

  // Modal Footer
  const firstChapter = inc.links?.guide_chapters?.[0] || "chapter-1";
  document.getElementById("incident-modal-footer").innerHTML = `
    <div class="flex flex-wrap items-center gap-3">
      <a href="index.html#${firstChapter}" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
        <span>${t.modalGuideBtn}</span>
      </a>
      <button type="button" onclick="copyIncidentLink('${inc.id}')" class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        ${t.btnCopyLink}
      </button>
    </div>
    <div>
      <button onclick="closeIncidentModal()" class="btn-primary px-6 py-2 text-xs">
        <span>${t.modalCloseBtn}</span>
      </button>
    </div>
  `;

  // Show modal
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add("modal-open");
    });
  });
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.getElementById("incident-modal-close")?.focus();
  }, 50);
}

function closeIncidentModal() {
  const modal = document.getElementById("incident-modal");
  if (!modal) return;
  modal.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
  setTimeout(() => {
    modal.style.display = "none";
  }, 220);
  document.body.style.overflow = "";
  history.replaceState(null, "", window.location.pathname);
}

// Deep Linking Check
function checkDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get("id");
  const hashId = window.location.hash.slice(1);
  const targetId = paramId || hashId;

  if (targetId) {
    const inc = incidentsData.find(i => i.id === targetId);
    if (inc) {
      setTimeout(() => {
        const cardEl = document.getElementById(targetId);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        openIncidentModal(targetId, false);
      }, 150);
    }
  }
}

// Reset All Filters
function resetAllFilters() {
  currentFilters.stance = "all";
  currentFilters.region = "all";
  currentFilters.category = "all";
  currentFilters.lifecycle = "all";
  currentFilters.search = "";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  // Reset active classes
  const resetBtnGroup = (groupId, activeBtnId) => {
    document.querySelectorAll(`#${groupId} .filter-btn`).forEach(btn => {
      btn.classList.remove("active");
    });
    document.getElementById(activeBtnId)?.classList.add("active");
  };

  resetBtnGroup("stance-filter-group", "btn-stance-all");
  resetBtnGroup("region-filter-group", "btn-region-all");
  resetBtnGroup("cat-filter-group", "btn-cat-all");
  resetBtnGroup("life-filter-group", "btn-life-all");

  filterAndRender();
}

// Event Listeners setup
function setupEventListeners() {
  // Listen to unified language toggle from layout.js
  window.addEventListener("site-language-change", (e) => {
    currentLang = e.detail.lang;
    updateLanguageUI();
    filterAndRender();
  });

  // Search Input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentFilters.search = e.target.value;
        filterAndRender();
      }, 180);
    });
  }

  // Filter Button Clicks
  const wireFilterGroup = (groupId, filterKey, dataAttr) => {
    const container = document.getElementById(groupId);
    if (!container) return;
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters[filterKey] = btn.getAttribute(dataAttr) || "all";
      filterAndRender();
    });
  };

  wireFilterGroup("stance-filter-group", "stance", "data-stance");
  wireFilterGroup("region-filter-group", "region", "data-region");
  wireFilterGroup("cat-filter-group", "category", "data-category");
  wireFilterGroup("life-filter-group", "lifecycle", "data-lifecycle");

  // Reset Filters Button
  document.getElementById("btn-reset-filters")?.addEventListener("click", resetAllFilters);

  // Modal Close
  document.getElementById("incident-modal-close")?.addEventListener("click", closeIncidentModal);
  document.getElementById("incident-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "incident-modal") closeIncidentModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeIncidentModal();
    }
  });
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateStaticTexts();
  setupEventListeners();
  loadData();
});
