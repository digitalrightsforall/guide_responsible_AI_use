// Application Logic for Responsible AI Skills
// Aligned with DESIGN.md & putongren.org

const i18n = {
  zh: {
    pageTitle: "Responsible and Safe AI Use - 负责任与安全使用 AI 技能库 | 普通人的数字权利",
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkGuide: "实务指南",
    navLinkLibrary: "技能库",
    navLinkIncidents: "真实案例库",
    navLinkPutongren: "普通人的数字权利 官网",
    tLangBtn: "English",

    heroBadge: "普通人的数字权利 · 实务技能库",
    heroTitle: "负责任与安全使用 AI 技能库",
    heroHighlight: "对内防采集与盲信，对外让第三方好核查",
    heroSubtitle: "精选开源社区现存成熟的 44 项 SKILL.md 规范技能。我们不制造新工具，而是为普通人、学者和写作者把好关：对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好验证自己使用 AI 的成果。",
    heroGuideLink: "了解完整设计理念与 6 大实战场景：阅读《实务指南》 →",

    bannerShieldTitle: "对内·自我防护与边界",
    bannerShieldDesc: "警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守独立思考与决策权。",
    bannerRulerTitle: "对外·成果第三方可核验",
    bannerRulerDesc: "当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，不让同事、读者或客户盲信盲猜。",

    clientSectionTitle: "客户端生态快速筛选 (Client Ecosystem)",
    clientAll: "全部客户端",
    clientTrae: "Trae IDE",
    clientWorkbuddy: "WorkBuddy",
    clientCursor: "Cursor",
    clientClaude: "Claude Code",
    clientWeb: "纯规则/通用",

    catSectionTitle: "实务问题导航 (Practical Questions)",
    catAll: "全部问题",
    cat1: "1. 我能把什么给 AI？",
    cat2: "2. 哪些回答能信？",
    cat3: "3. 什么时候不能听 AI？",
    cat4: "4. 输出能不能直接发布？",

    timeSectionTitle: "工作流时机检索 (Workflow Timing)",
    timeAll: "全部时序",
    time1: "输入前·防采集与隔离",
    time2: "对话中·求证与防盲信",
    time3: "交付前·合规与核验包",
    time4: "归档时·隐私与日志清理",

    searchPlaceholder: "搜索技能、使用场景或客户端...",
    whyCareLabel: "为何普通人应该关心：",
    whyChosenLabel: "为什么精选收录：",
    whenToUseLabel: "准确使用时机：",
    howToUseLabel: "如何使用：",
    clientGuideTitle: "适用客户端安装命令与路径指引：",
    clientDirLabel: "安装路径：",
    copyClientCmd: "复制命令",
    regulatoryBadgesLabel: "法理依据与权威标准对齐：",
    standardLabel: "技术依据与对齐标准：",
    reviewsLabel: "独立第三方评测与生态收录：",
    noReviewsNote: "开源社区独立实现，当前暂无独立第三方媒体长篇报道，由开发者在 GitHub 遵循开源规范透明维护。",
    reviewBadge: "独立评测 / 收录",
    statusLabel: "运行状态与实证指标：",
    statusGuideBtn: "评定说明",
    statusGuideTitle: "运行状态与实证指标评定说明",
    statusGuideClose: "我明白了",
    verifiedEvidenceTitle: "实证依据与测试事实：",
    targetPersona: "适用人群：",
    supportedClients: "适用客户端：",
    copied: "安装命令已复制到剪贴板！",
    viewSource: "查看 GitHub 源码 ↗",
    copyCommand: "复制安装命令",
    viewDetails: "查看详情",
    shareLink: "复制卡片链接",
    linkCopied: "卡片直达链接已复制到剪贴板！",
    closeModal: "关闭详情",
    itemsCountPrefix: "共收录",
    itemsCountSuffix: "个精选开源技能",
    noResults: "没有找到符合条件的技能。",

    footerLinkGuide: "实务指南",
    footerLinkLibrary: "技能库",
    footerLinkIncidents: "真实案例库"
  },
  en: {
    pageTitle: "Responsible and Safe AI Use - Curated Skill Library | Digital Rights for All",
    navBrandTitle: "Responsible & Safe AI Use",
    navBrandSub: "Digital Rights for All Community Project",
    navLinkGuide: "Field Guide",
    navLinkLibrary: "Skill Library",
    navLinkIncidents: "Incident Casebook",
    navLinkPutongren: "putongren.org",
    tLangBtn: "中文",

    heroBadge: "Digital Rights for All · Skill Library",
    heroTitle: "Responsible and Safe AI Skill Library",
    heroHighlight: "Inward: Guard against harvesting & blind trust; Outward: Enable third-party verifiability",
    heroSubtitle: "A curated collection of 44 production-ready SKILL.md packages. We do not invent new tools—we help everyday knowledge workers, researchers, and professionals adopt proven guardrails: guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.",
    heroGuideLink: "Read the Practical Field Guide for scenarios & principles →",

    bannerShieldTitle: "Inward: Self-Defense & Boundaries",
    bannerShieldDesc: "Guard against commercial AI over-harvesting your private text into training corpora, and guard against blind faith in confident hallucinations.",
    bannerRulerTitle: "Outward: Third-Party Verifiability",
    bannerRulerDesc: "When delivering AI-assisted work, provide clear evidence trails and verification avenues so colleagues and readers can easily audit your results.",

    clientSectionTitle: "CLIENT ECOSYSTEM",
    clientAll: "All Clients",
    clientTrae: "Trae IDE",
    clientWorkbuddy: "WorkBuddy",
    clientCursor: "Cursor",
    clientClaude: "Claude Code",
    clientWeb: "Prompt / Universal",

    catSectionTitle: "PRACTICAL QUESTIONS",
    catAll: "All Questions",
    cat1: "1. What can I feed to AI?",
    cat2: "2. Which answers can I trust?",
    cat3: "3. When NOT to listen to AI?",
    cat4: "4. Can output be published directly?",

    timeSectionTitle: "WORKFLOW TIMING",
    timeAll: "All Stages",
    time1: "Pre-Input: Anti-Harvesting",
    time2: "During-Chat: Fact-Checking",
    time3: "Pre-Handoff: Audit & Gate",
    time4: "Post-Session: Cleanup",

    searchPlaceholder: "Search skills, scenarios, or clients...",
    whyCareLabel: "Why Everyday People Should Care:",
    whyChosenLabel: "Why This Was Chosen:",
    whenToUseLabel: "When to Use:",
    howToUseLabel: "How to Use:",
    clientGuideTitle: "Client Installation Commands & Directory Guide:",
    clientDirLabel: "Directory:",
    copyClientCmd: "Copy",
    regulatoryBadgesLabel: "Statutory & Standard Alignment Badges:",
    standardLabel: "Technical & Methodological Alignment:",
    reviewsLabel: "Direct Third-Party Reviews & Inclusions:",
    noReviewsNote: "Community open-source implementation with standard-compliant GitHub maintenance; no dedicated independent media articles yet.",
    reviewBadge: "Review / Inclusion",
    statusLabel: "Operational Status & Verified Evidence:",
    statusGuideBtn: "How We Evaluate",
    statusGuideTitle: "Operational Status & Verified Evidence Standards",
    statusGuideClose: "Got it",
    verifiedEvidenceTitle: "Verified Evidence & Test Record:",
    targetPersona: "Target:",
    supportedClients: "Clients:",
    copied: "Install command copied to clipboard!",
    viewSource: "View on GitHub ↗",
    copyCommand: "Copy Command",
    viewDetails: "Details",
    shareLink: "Share Link",
    linkCopied: "Direct skill link copied to clipboard!",
    closeModal: "Close",
    itemsCountPrefix: "",
    itemsCountSuffix: "curated open-source skills",
    noResults: "No matching skills found.",

    footerLinkGuide: "Field Guide",
    footerLinkLibrary: "Skill Library",
    footerLinkIncidents: "Incident Casebook"
  }
};

let currentLang = localStorage.getItem("rai_lang") || "zh";
let currentClient = "all";
let currentCategory = "all";
let currentTiming = "all";
let searchQuery = "";
let itemsData = [];

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  setupEventListeners();
  await loadItems();
  updateLanguageUI();
  checkHashAndOpenModal();
});

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

// Load Data with cache-busting
async function loadItems() {
  try {
    const response = await fetch("data/items.json");
    itemsData = await response.json();
    updateFilterCounts();
    renderCards();
  } catch (error) {
    console.error("Failed to load items.json:", error);
  }
}

function updateFilterCounts() {
  const catCounts = {
    all: itemsData.length,
    "feed-to-ai": itemsData.filter((i) => i.category === "feed-to-ai").length,
    "answers-to-trust": itemsData.filter((i) => i.category === "answers-to-trust").length,
    "when-not-to-listen": itemsData.filter((i) => i.category === "when-not-to-listen").length,
    "can-publish-directly": itemsData.filter((i) => i.category === "can-publish-directly").length
  };
  Object.entries(catCounts).forEach(([cat, count]) => {
    const el = document.querySelector(`[data-cat="${cat}"] .filter-count`);
    if (el) el.textContent = count;
  });

  const timeCounts = {
    all: itemsData.length,
    "pre-input": itemsData.filter((i) => i.timing === "pre-input").length,
    "during-chat": itemsData.filter((i) => i.timing === "during-chat").length,
    "pre-handoff": itemsData.filter((i) => i.timing === "pre-handoff").length,
    "post-session": itemsData.filter((i) => i.timing === "post-session").length
  };
  Object.entries(timeCounts).forEach(([timing, count]) => {
    const el = document.querySelector(`[data-timing="${timing}"] .filter-count`);
    if (el) el.textContent = count;
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Listen to unified language toggle from layout.js
  window.addEventListener("site-language-change", (e) => {
    currentLang = e.detail.lang;
    updateLanguageUI();
    renderCards();
  });

  // Search input
  const searchInput = document.getElementById("search-input");
  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCards();
  });

  // Category buttons
  document.querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-cat]").forEach((b) => b.classList.remove("active-cat"));
      btn.classList.add("active-cat");
      currentCategory = btn.getAttribute("data-cat");

      // Reset timing filter to all to prevent zero-match deadlock
      currentTiming = "all";
      document.querySelectorAll("[data-timing]").forEach((b) => b.classList.remove("active-timing"));
      document.querySelector('[data-timing="all"]')?.classList.add("active-timing");

      renderCards();
    });
  });

  // Timing / Workflow stage buttons
  document.querySelectorAll("[data-timing]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-timing]").forEach((b) => b.classList.remove("active-timing"));
      btn.classList.add("active-timing");
      currentTiming = btn.getAttribute("data-timing");

      // Reset category filter to all to prevent zero-match deadlock
      currentCategory = "all";
      document.querySelectorAll("[data-cat]").forEach((b) => b.classList.remove("active-cat"));
      document.querySelector('[data-cat="all"]')?.classList.add("active-cat");

      renderCards();
    });
  });

  // Modal event listeners
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("detail-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "detail-modal") closeModal();
  });

  // Status guide modal event listeners
  document.getElementById("status-guide-close")?.addEventListener("click", closeStatusGuide);
  document.getElementById("status-guide-confirm")?.addEventListener("click", closeStatusGuide);
  document.getElementById("status-guide-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "status-guide-modal") closeStatusGuide();
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest(".status-guide-trigger")) {
      openStatusGuide();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const guideModal = document.getElementById("status-guide-modal");
      if (guideModal && guideModal.style.display === "flex") {
        closeStatusGuide();
      } else {
        closeModal();
      }
    }
  });
  window.addEventListener("hashchange", checkHashAndOpenModal);
}

// Update UI Text Strings
function updateLanguageUI() {
  const t = i18n[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  // Document & Navigation (3 items: Guide, Library, putongren.org)
  document.title = t.pageTitle;
  setText("nav-brand-title", t.navBrandTitle);
  setText("nav-brand-sub", t.navBrandSub);
  setText("nav-link-guide", t.navLinkGuide);
  setText("nav-link-library", t.navLinkLibrary);
  setText("nav-link-incidents", t.navLinkIncidents);
  setText("nav-link-putongren", t.navLinkPutongren);
  setText("m-nav-guide", t.navLinkGuide);
  setText("m-nav-library", t.navLinkLibrary);
  setText("m-nav-incidents", t.navLinkIncidents);
  setText("m-nav-putongren", currentLang === "zh" ? "官网 ↗" : "Site ↗");
  setText("t-lang-btn", t.tLangBtn);

  // Hero
  setText("t-hero-badge", t.heroBadge);
  setText("t-hero-title", t.heroTitle);
  setText("t-hero-highlight", t.heroHighlight);
  setText("t-hero-subtitle", t.heroSubtitle);
  setText("t-hero-guide-link", t.heroGuideLink);

  // Dual-Core Banner
  setText("t-banner-shield-title", t.bannerShieldTitle);
  setText("t-banner-shield-desc", t.bannerShieldDesc);
  setText("t-banner-ruler-title", t.bannerRulerTitle);
  setText("t-banner-ruler-desc", t.bannerRulerDesc);

  // Client Ecosystem labels
  setText("t-client-section-title", t.clientSectionTitle);
  setBtnLabel("t-client-all", t.clientAll);
  setBtnLabel("t-client-trae", t.clientTrae);
  setBtnLabel("t-client-workbuddy", t.clientWorkbuddy);
  setBtnLabel("t-client-cursor", t.clientCursor);
  setBtnLabel("t-client-claude", t.clientClaude);
  setBtnLabel("t-client-web", t.clientWeb);

  // Category labels
  setText("t-cat-section-title", t.catSectionTitle);
  setBtnLabel("t-cat-all", t.catAll);
  setBtnLabel("t-cat-1", t.cat1);
  setBtnLabel("t-cat-2", t.cat2);
  setBtnLabel("t-cat-3", t.cat3);
  setBtnLabel("t-cat-4", t.cat4);

  // Timing labels
  setText("t-time-section-title", t.timeSectionTitle);
  setBtnLabel("t-time-all", t.timeAll);
  setBtnLabel("t-time-1", t.time1);
  setBtnLabel("t-time-2", t.time2);
  setBtnLabel("t-time-3", t.time3);
  setBtnLabel("t-time-4", t.time4);

  // Search
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // Footer links
  setText("footer-link-guide", t.footerLinkGuide);
  setText("footer-link-library", t.footerLinkLibrary);
  setText("footer-link-incidents", t.footerLinkIncidents);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setBtnLabel(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  const labelEl = el.querySelector(".btn-label");
  if (labelEl) labelEl.textContent = text;
}

// Utility: Clean title & namespace helpers
function getCleanTitle(rawName) {
  const name = (rawName || "").trim();
  if (name === "jkitchin/skillz (citation-verifier)") return "Citation Verifier";
  if (name === "jihlenburg/mad-skills (devils-advocate)") return "Devil's Advocate";
  const m = name.match(/^(.*?)\s*\([^)]+\)$/);
  return m ? m[1].trim() : name;
}

function getRepoSlug(rawName, url) {
  const name = (rawName || "").trim();
  const m = name.match(/\(([^)]+)\)$/);
  if (m) return m[1].trim();
  if (url && url.includes("github.com/")) {
    const parts = url.split("github.com/")[1].split("/");
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  }
  return "";
}

// Render Item Cards
function renderCards() {
  const container = document.getElementById("cards-container") || document.getElementById("items-grid");
  const countEl = document.getElementById("items-count");
  if (!container) return;

  const filtered = itemsData.filter((item) => {
    // Category filter
    if (currentCategory !== "all" && item.category !== currentCategory) return false;
    // Timing filter
    if (currentTiming !== "all" && item.timing !== currentTiming) return false;
    // Search query
    if (searchQuery) {
      const matchName = item.name.toLowerCase().includes(searchQuery);
      const matchCleanName = getCleanTitle(item.name).toLowerCase().includes(searchQuery);
      const matchSummary = (currentLang === "zh" ? item.summary_cn : item.summary_en).toLowerCase().includes(searchQuery);
      const matchWhy = (currentLang === "zh" ? item.why_chosen_cn : item.why_chosen_en).toLowerCase().includes(searchQuery);
      const matchCare = (currentLang === "zh" ? item.why_care_cn : item.why_care_en).toLowerCase().includes(searchQuery);
      const matchHow = (currentLang === "zh" ? item.how_to_use_cn : item.how_to_use_en).toLowerCase().includes(searchQuery);
      const matchTiming = (currentLang === "zh" ? item.timing_desc_cn : item.timing_desc_en).toLowerCase().includes(searchQuery);
      const matchPersona = item.target_persona.toLowerCase().includes(searchQuery);
      const matchBadges = (item.regulatory_badges || []).some((b) => b.toLowerCase().includes(searchQuery)) ||
                          (item.regulatory_badges_en || []).some((b) => b.toLowerCase().includes(searchQuery));
      if (!matchName && !matchCleanName && !matchSummary && !matchWhy && !matchCare && !matchHow && !matchTiming && !matchPersona && !matchBadges) return false;
    }
    return true;
  });

  const t = i18n[currentLang];
  if (countEl) {
    countEl.textContent = `${t.itemsCountPrefix} ${filtered.length} ${t.itemsCountSuffix}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
        <svg class="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">${t.noResults}</p>
        <p class="text-xs text-slate-400">请尝试更换搜索关键词或重置筛选维度</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item) => renderCard(item)).join("");

  // Attach details modal listeners
  container.querySelectorAll("[data-details]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.getAttribute("data-details"));
    });
  });
}

function renderCard(item) {
  const t = i18n[currentLang];
  const isZh = currentLang === "zh";
  const cleanTitle = getCleanTitle(item.name);
  const repoSlug = getRepoSlug(item.name, item.url);
  const whyCare = isZh ? item.why_care_cn : item.why_care_en;
  const whyChosen = isZh ? item.why_chosen_cn : item.why_chosen_en;
  const timingDesc = isZh ? item.timing_desc_cn : item.timing_desc_en;
  const categoryTitle = isZh ? item.category_title_cn : item.category_title_en;

  // Timing Badge label and color scheme
  const timingConfig = {
    "pre-input": {
      label: isZh ? "输入前·防采集与隔离" : "Pre-Input: Privacy",
      color: "bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800"
    },
    "during-chat": {
      label: isZh ? "交互中·求证与防盲信" : "During-Chat: Fact-Check",
      color: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
    },
    "pre-handoff": {
      label: isZh ? "交付前·合规与核验包" : "Pre-Handoff: Audit",
      color: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    },
    "post-session": {
      label: isZh ? "归档时·隐私与日志清理" : "Post-Session: Cleanup",
      color: "bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800"
    }
  };

  const timingMeta = timingConfig[item.timing] || {
    label: item.timing,
    color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
  };

  const isReady = (item.status?.stage || "").includes("开箱即用") || (item.status?.stage || "").includes("Ready");
  const readyClass = isReady ? "card-ready" : "";

  return `
    <div class="skill-card ${readyClass} flex flex-col justify-between p-6 sm:p-7 space-y-6">
      <div class="space-y-4">
        <!-- 1. Clean Skill Title (No Repo Jargon) & Subtle Byline -->
        <div>
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-[10px] font-bold text-brand uppercase tracking-wider block">
              ${categoryTitle}
            </span>
            ${repoSlug ? `<span class="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate" title="代码源自: ${escapeHtml(repoSlug)}">by ${escapeHtml(repoSlug.split('/')[0])}</span>` : ''}
          </div>
          <h3 class="text-lg font-black text-slate-900 dark:text-white leading-tight">
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:text-brand transition-colors inline-flex items-center gap-1.5 group">
              <span>${escapeHtml(cleanTitle)}</span>
              <svg class="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </h3>
        </div>

        <!-- 2. Co-equal Content Sections (平级排版，三者均取消补丁色块，均带彩色提示圆点) -->
        <div class="space-y-4 pt-1 text-xs">
          <!-- 平级维度 1: 为何普通人应该关心 -->
          <div>
            <span class="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5 text-xs sm:text-[13px]">
              <span class="w-1.5 h-1.5 rounded-full dot-amber shrink-0"></span>
              ${t.whyCareLabel}
            </span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed pl-3">${whyCare}</p>
          </div>

          <!-- 平级维度 2: 为什么精选收录 -->
          <div>
            <span class="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5 text-xs sm:text-[13px]">
              <span class="w-1.5 h-1.5 rounded-full dot-brand shrink-0"></span>
              ${t.whyChosenLabel}
            </span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed pl-3">${whyChosen}</p>
          </div>

          <!-- 平级维度 3: 准确使用时机 (完全平级排版，带清晰彩色提示圆点) -->
          <div>
            <span class="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5 text-xs sm:text-[13px]">
              <span class="w-1.5 h-1.5 rounded-full dot-timing shrink-0"></span>
              ${t.whenToUseLabel}
            </span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed pl-3">${timingDesc}</p>
          </div>
        </div>
      </div>

      <!-- 4. Card Action Footer -->
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>

        <button data-details="${item.id}" class="btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer" title="${t.viewDetails}">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          ${t.viewDetails}
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  `;
}

// Toast notification helper
let _toastTimer = null;
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  clearTimeout(_toastTimer);
  toast.classList.add("show");
  _toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Status & Evidence Guide Modal Logic
function getStatusGuideHtml(lang) {
  if (lang === "zh") {
    return `
      <div class="space-y-3.5">
        <div class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> 1. 运行状态与分级验证 (Verification Tiers)
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            本项目对收录技能实施分级检验：<strong>① 仓库链接存活巡检</strong>（自动 HTTP 探测可达）；<strong>② 技能规范结构校验</strong>（符合 SKILL.md 格式与字段规范）；<strong>③ 本地静态语法检验</strong>。对于“开箱即用”条目，指放入支持 Agent Skills 的客户端即可被识别；“需配置依赖”指具备明确前置环境要求。<strong>未做功能基准评测的条目如实标注，不宣称绝对安全或完全阻断。</strong>
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 dark:border-brand/30 space-y-1">
          <h4 class="font-bold text-brand dark:text-brand-container flex items-center gap-1.5 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-brand inline-block"></span> 2. 开源热度与事实依据 (Community Adoption & Empirical Evidence)
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            基于真实公开 GitHub Stars 数据（如 Superpowers 290k★、Anthropic 官方研究库 177k★/9.5k★、Tech Leads Club 6.6k★）。对独立开发者维护的聚焦工具，如实标注为<strong>「独立开源 (项目收录)」</strong>，客观呈现社区采纳现状。
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
          <h4 class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-slate-500 inline-block"></span> 3. 标准对齐说明 (Standards Alignment Disclaimer)
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            各条目展示的 ISO/IEC、OWASP、GDPR、PIPL 等标准与法规对齐，系**项目维护团队基于机制与最佳实践的技术合规映射，非官方标准制定机构或第三方认证机构之授权认证**。
          </p>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="space-y-3.5">
        <div class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1">
          <h4 class="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> 1. Usability & Tiered Verification
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            Skills undergo tiered verification: <strong>① Repo Reachability</strong> (HTTP 2xx/3xx health checks); <strong>② Schema Conformance</strong> (strict SKILL.md structure); <strong>③ Local Syntax Validation</strong>. "Ready to Use" indicates client discovery without binary prerequisites. Unbenchmarked skills are presented transparently without claiming absolute immunity.
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 dark:border-brand/30 space-y-1">
          <h4 class="font-bold text-brand dark:text-brand-container flex items-center gap-1.5 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-brand inline-block"></span> 2. Community Adoption
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            Stars and adoption metrics reflect public GitHub data. Focused independent packages are labeled as "Independent Open Source (Cataloged)" to present genuine adoption states without hyperbole.
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
          <h4 class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-xs sm:text-sm">
            <span class="w-2 h-2 rounded-full bg-slate-500 inline-block"></span> 3. Standards Alignment Disclaimer
          </h4>
          <p class="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            Mappings to ISO/IEC, OWASP, GDPR, and PIPL represent the **curators' technical compliance analysis, not official certifications granted by governing standards bodies**.
          </p>
        </div>
      </div>
    `;
  }
}

function openStatusGuide() {
  const modal = document.getElementById("status-guide-modal");
  const title = document.getElementById("status-guide-title");
  const body = document.getElementById("status-guide-body");
  const confirmBtn = document.getElementById("status-guide-confirm");
  const t = i18n[currentLang];
  if (!modal || !body) return;

  if (title) title.textContent = t.statusGuideTitle;
  if (confirmBtn) confirmBtn.textContent = t.statusGuideClose;

  body.innerHTML = getStatusGuideHtml(currentLang);
  modal.style.display = "flex";
  requestAnimationFrame(() => modal.classList.add("active"));
  document.body.classList.add("overflow-hidden");
}

function closeStatusGuide() {
  const modal = document.getElementById("status-guide-modal");
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    const detailModal = document.getElementById("detail-modal");
    if (!detailModal || detailModal.style.display === "none") {
      document.body.classList.remove("overflow-hidden");
    }
  }, 150);
}

// Modal Controllers
function checkHashAndOpenModal() {
  const hash = window.location.hash;
  if (hash.startsWith("#skill=")) {
    const skillId = hash.replace("#skill=", "");
    openModal(skillId);
  }
}

function openModal(id) {
  const item = itemsData.find((it) => it.id === id);
  if (!item) return;

  const modal = document.getElementById("detail-modal");
  if (!modal) return;

  const t = i18n[currentLang];
  const whyCare = currentLang === "zh" ? item.why_care_cn : item.why_care_en;
  const whyChosen = currentLang === "zh" ? item.why_chosen_cn : item.why_chosen_en;
  const howToUse = currentLang === "zh" ? item.how_to_use_cn : item.how_to_use_en;
  const timingDesc = currentLang === "zh" ? item.timing_desc_cn : item.timing_desc_en;
  const categoryTitle = currentLang === "zh" ? item.category_title_cn : item.category_title_en;

  const timingConfig = {
    "pre-input": {
      label: currentLang === "zh" ? "输入前·防采集与隔离" : "Pre-Input: Privacy",
      color: "bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800"
    },
    "during-chat": {
      label: currentLang === "zh" ? "交互中·求证与防盲信" : "During-Chat: Fact-Check",
      color: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
    },
    "pre-handoff": {
      label: currentLang === "zh" ? "交付前·合规与核验包" : "Pre-Handoff: Audit",
      color: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    },
    "post-session": {
      label: currentLang === "zh" ? "归档时·隐私与日志清理" : "Post-Session: Cleanup",
      color: "bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800"
    }
  };

  const timingMeta = timingConfig[item.timing] || {
    label: item.timing,
    color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
  };

  const tagsEl = document.getElementById("modal-tags");
  if (tagsEl) {
    tagsEl.innerHTML = `
      <span class="text-xs font-bold px-3 py-1 rounded-full border ${timingMeta.color}">${timingMeta.label}</span>
      <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">SKILL.md</span>
    `;
  }

  const catEl = document.getElementById("modal-category");
  if (catEl) catEl.textContent = categoryTitle;

  const titleEl = document.getElementById("modal-title");
  const cleanTitle = getCleanTitle(item.name);
  const repoSlug = getRepoSlug(item.name, item.url);
  if (titleEl) {
    titleEl.innerHTML = `
      <div class="space-y-1">
        <span class="block text-2xl font-black text-slate-900 dark:text-white">${escapeHtml(cleanTitle)}</span>
        ${repoSlug ? `
          <div class="flex items-center gap-2 pt-0.5">
            <span class="text-xs font-mono text-slate-500 dark:text-slate-400">所属开源项目:</span>
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono font-bold text-brand hover:underline inline-flex items-center gap-1">
              <span>${escapeHtml(repoSlug)}</span>
              <span class="text-[10px]">↗</span>
            </a>
          </div>
        ` : ""}
      </div>
    `;
  }

  const bodyEl = document.getElementById("modal-body");
  if (bodyEl) {
    bodyEl.innerHTML = `
      ${(() => {
        const badges = (currentLang === "zh" || !item.regulatory_badges_en) ? item.regulatory_badges : item.regulatory_badges_en;
        if (!badges || badges.length === 0) return '';
        return `
          <div class="flex flex-wrap items-center gap-2 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs">
            <span class="font-extrabold text-indigo-950 dark:text-indigo-200 shrink-0">
              ${t.regulatoryBadgesLabel}
            </span>
            <div class="flex flex-wrap gap-1.5">
              ${badges.map(b => `
                <span class="inline-flex items-center font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                  ${escapeHtml(b)}
                </span>
              `).join('')}
            </div>
          </div>
        `;
      })()}

      <div class="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5">
        <h4 class="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 text-xs sm:text-sm">
          ${t.whyCareLabel}
        </h4>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">${whyCare}</p>
      </div>

      <div class="p-4 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/15 dark:border-brand/25 space-y-1.5">
        <h4 class="font-bold text-brand dark:text-brand-container flex items-center gap-1.5 text-xs sm:text-sm">
          ${t.whyChosenLabel}
        </h4>
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">${whyChosen}</p>
      </div>

      <div class="space-y-1.5 text-xs sm:text-sm">
        <h4 class="font-bold text-slate-900 dark:text-slate-100">${t.whenToUseLabel}</h4>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${timingDesc}</p>
      </div>

      ${(() => {
        // For pre-input privacy skills, add explicit plain-language Q&A answering why skills don't leak data
        const isPreInputPrivacy = item.timing === "pre-input" && (item.category === "feed-to-ai" || item.id.includes("pii") || item.id.includes("anonymize") || item.id.includes("scholar") || item.id.includes("clinical"));
        if (!isPreInputPrivacy) return "";

        if (currentLang === "zh") {
          return `
            <div class="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/50 space-y-2.5 text-xs">
              <span class="font-extrabold text-sky-950 dark:text-sky-200 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>💡 为什么“让 AI 脱敏”不会反而把隐私泄露给 AI？</span>
              </span>
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>问：既然要防泄密，为什么还要把文件交给这个技能？这不矛盾吗？</strong><br>
                这个疑问很自然。如果你把身份证号直接粘贴到网页对话框里让 AI“帮我脱敏后再回答”，信息在发送瞬间就已经上传到服务商服务器了，确实防不住泄密。这个技能的使用前提是：在本地电脑的终端或编辑器里指定文件路径，而不是在聊天框里粘贴文本。
              </p>
              <div class="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-sky-200/60 dark:border-sky-900/60 space-y-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                <span class="font-bold text-slate-800 dark:text-slate-200 block text-xs">什么是“本地脚本”？它从哪里来，和模型直接读有什么区别？</span>
                <p>
                  <strong>1. 脚本是哪里来的？</strong> 当你把这个开源技能添加到电脑时，你其实是从 GitHub 下载了一个公开的小工具包。里面除了给 AI 看的说明书，还带有一段离线代码（通常是 Python）。代码完全公开透明，没有任何向外部发数据的联网动作。
                </p>
                <p>
                  <strong>2. 和模型直接读的区别：</strong> 模型运行在远端机房，原件发过去就脱离了你的控制。而本地脚本就像是放在你自己办公桌上的离线涂黑机。在你电脑发出文件前，脚本在本地内存中把人名、电话替换成 <code>[代号A]</code>、<code>[代号B]</code>，把真实密码本留在你的私有文件夹里。
                </p>
                <p>
                  <strong>3. 模型最终看到了什么：</strong> 远端模型全程只看到了被涂黑的复印件。任务完成后，本地脚本再根据你电脑里的密码本还原真实名字。原始文件自始至终都没有离开你的电脑。
                </p>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/50 space-y-2.5 text-xs">
              <span class="font-extrabold text-sky-950 dark:text-sky-200 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>💡 Why Asking AI to Redact Doesn't Leak Data Upstream</span>
              </span>
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Q: If I must prevent leaks, isn't feeding files to this skill contradictory?</strong><br>
                If you paste personal details directly into a cloud chatbox asking AI to "redact before answering," data leaves your device the instant you click send. This skill works differently: it accepts file paths in a local editor, rather than raw text pasted into chat.
              </p>
              <div class="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-sky-200/60 dark:border-sky-900/60 space-y-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                <span class="font-bold text-slate-800 dark:text-slate-200 block text-xs">What is a "local script", where does it come from, and how is it different?</span>
                <p>
                  <strong>1. Where does the script come from?</strong> When adding this open-source skill, you download a public package from GitHub containing instructions and an offline helper script (typically Python). The code is completely transparent with zero external network calls.
                </p>
                <p>
                  <strong>2. How does it differ from the model reading directly?</strong> The cloud model runs on remote servers. A local script functions like an offline marker on your own desk: before files leave your machine, the script swaps names and IDs with placeholders like <code>[PERSON_A]</code>, keeping the real mapping key locked in your local private directory.
                </p>
                <p>
                  <strong>3. What does the model actually see?</strong> The remote model only inspects the pseudonymized copy. Once processing finishes, the local script restores real values using your local key. Raw data never leaves your hard drive.
                </p>
              </div>
            </div>
          `;
        }
      })()}

      <div class="space-y-2 text-xs sm:text-sm">
        <h4 class="font-bold text-slate-900 dark:text-slate-100">${t.howToUseLabel}</h4>
        <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${howToUse}</p>
        <div class="mt-2 p-3 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto flex items-center justify-between gap-3 border border-slate-800">
          <code class="break-all">${escapeHtml(item.action_content)}</code>
          <button data-modal-copy="${escapeHtml(item.action_content)}" class="shrink-0 px-3 py-1.5 rounded-xl bg-brand hover:bg-brand-dim text-white font-sans text-xs font-bold transition-colors cursor-pointer">
            ${t.copyCommand}
          </button>
        </div>
      </div>

      <!-- Multi-Client Installation Commands & Paths -->
      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
        <h4 class="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          ${t.clientGuideTitle}
        </h4>
        <div class="space-y-2">
          ${item.clients.map(client => {
            let dirPath = '';
            let cmd = '';
            if (client === 'Trae IDE' || client === 'WorkBuddy' || client === 'Cursor') {
              dirPath = `.agents/skills/${item.id}/`;
              cmd = `mkdir -p .agents/skills/${item.id} && git clone --depth=1 ${item.url} .agents/skills/${item.id}`;
            } else if (client === 'Claude Code') {
              dirPath = `.claude/skills/${item.id}/`;
              cmd = `mkdir -p .claude/skills/${item.id} && git clone --depth=1 ${item.url} .claude/skills/${item.id}`;
            } else {
              dirPath = currentLang === 'zh' ? '系统提示词 / 自定义规则' : 'System Prompt / Custom Instructions';
              cmd = item.action_content;
            }
            return `
              <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <div class="space-y-0.5 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">${escapeHtml(client)}</span>
                    <span class="font-mono text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">${escapeHtml(dirPath)}</span>
                  </div>
                  <div class="font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-xl">
                    ${escapeHtml(cmd)}
                  </div>
                </div>
                <button data-modal-copy="${escapeHtml(cmd)}" class="shrink-0 px-3 py-1.5 rounded-xl bg-brand/10 hover:bg-brand text-brand hover:text-white dark:bg-brand/20 dark:hover:bg-brand dark:text-brand-container dark:hover:text-white font-sans text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  <span>${t.copyClientCmd}</span>
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${(() => {
        if (!item.standard_alignment) return "";
        const std = item.standard_alignment;
        const name = currentLang === "zh" ? std.name_zh : std.name_en;
        const howAligned = currentLang === "zh" ? std.how_aligned_zh : std.how_aligned_en;

        return `
          <div class="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/50 space-y-2 text-xs sm:text-sm">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <h4 class="font-extrabold text-sky-950 dark:text-sky-200 flex items-center gap-1.5 text-xs sm:text-sm">
                ${t.standardLabel}
              </h4>
              <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">
                ${escapeHtml(std.organization)}
              </span>
            </div>
            <div>
              <a href="${escapeHtml(std.url)}" target="_blank" rel="noopener noreferrer" class="font-bold text-sky-900 dark:text-sky-300 hover:underline inline-flex items-center gap-1 group">
                <span>${escapeHtml(name)}</span>
                <span class="text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs">↗</span>
              </a>
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs mt-1.5">${escapeHtml(howAligned)}</p>
            </div>
          </div>
        `;
      })()}

      ${(() => {
        const hasReviews = item.third_party_reviews && item.third_party_reviews.length > 0;
        if (!hasReviews) return "";

        const revCards = item.third_party_reviews.map((rev) => {
          const title = currentLang === "zh" ? rev.title_zh : rev.title_en;
          const excerpt = currentLang === "zh" ? rev.excerpt_zh : rev.excerpt_en;
          return `
            <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 space-y-1.5 shadow-xs hover:border-brand/40 dark:hover:border-brand/40 transition-colors">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                  ${t.reviewBadge}
                </span>
                <span class="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  ${escapeHtml(rev.source)}
                </span>
              </div>
              <div>
                <a href="${escapeHtml(rev.url)}" target="_blank" rel="noopener noreferrer" class="font-bold text-slate-900 dark:text-slate-100 hover:text-brand dark:hover:text-brand-container text-xs sm:text-sm inline-flex items-center gap-1 group">
                  <span>${escapeHtml(title)}</span>
                  <span class="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs">↗</span>
                </a>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-xs mt-1">${escapeHtml(excerpt)}</p>
              </div>
            </div>
          `;
        }).join("");

        return `
          <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-800 space-y-2.5">
            <h4 class="font-extrabold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5 text-xs sm:text-sm">
              ${t.reviewsLabel}
            </h4>
            <div class="space-y-2">${revCards}</div>
          </div>
        `;
      })()}

      ${(() => {
        const isZh = currentLang === "zh";
        const stageText = isZh ? (item.status?.stage_cn || item.status?.stage || "开箱即用") : (item.status?.stage_en || item.status?.stage || "Ready to Use");
        const isSetup = (item.status?.stage || "").includes("需配置") || (item.status?.stage || "").includes("Requires");
        const stageColor = isSetup
          ? "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
        const stageTooltip = isZh
          ? "已通过本地环境安装测试与技能规范语法校验，逻辑规则完整闭环。"
          : "Verified via local installation tests and skill specification validation.";
        
        const adoptionText = isZh ? (item.status?.adoption_cn || item.status?.adoption || "已实测") : (item.status?.adoption_en || item.status?.adoption || "Verified");
        const adoptionTooltip = isZh
          ? "基于真实 GitHub 开源星数与权威机构维护记录，代码完全公开透明。"
          : "Based on real GitHub stars and verified maintainer records, 100% public code.";
        
        const trustText = isZh ? (item.status?.trust_source_cn || item.status?.trust_source || "") : (item.status?.trust_source_en || item.status?.trust_source || "");

        return `
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
            <div class="flex items-center justify-between gap-2">
              <h4 class="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">${t.statusLabel}</h4>
              <button type="button" class="status-guide-trigger px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand/10 hover:bg-brand/20 text-brand dark:text-brand-container transition-colors cursor-pointer flex items-center gap-1">
                ${t.statusGuideBtn}
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${stageColor}" title="${stageTooltip}">
                ${stageText}
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300" title="${adoptionTooltip}">
                ${adoptionText}
              </span>
            </div>
            <div class="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 space-y-1">
              <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">${t.verifiedEvidenceTitle}</span>
              <p class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">${trustText}</p>
            </div>
            <div class="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
              <p><span class="font-semibold text-slate-700 dark:text-slate-300">${t.targetPersona}</span> ${item.target_persona}</p>
              <p><span class="font-semibold text-slate-700 dark:text-slate-300">${t.supportedClients}</span> ${item.clients.join("、")}</p>
            </div>
          </div>
        `;
      })()}
    `;
  }

  const githubLink = document.getElementById("modal-github-link") || document.getElementById("modal-github");
  if (githubLink) {
    githubLink.href = item.url;
  }

  const guideLinkMaps = {
    "pre-input": "index.html#sec-4-1",
    "during-chat": "index.html#sec-4-2",
    "pre-handoff": "index.html#sec-4-5",
    "post-session": "index.html#sec-4-6"
  };
  let guideLink = document.getElementById("modal-guide-link");
  if (!guideLink && githubLink) {
    guideLink = document.createElement("a");
    guideLink.id = "modal-guide-link";
    guideLink.className = "px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2";
    guideLink.innerHTML = "📖 在指南中查看场景";
    
    // Create a container if not exists to group github and guide links
    if (githubLink.parentNode.classList.contains("justify-between")) {
      const container = document.createElement("div");
      container.className = "flex flex-col sm:flex-row items-stretch sm:items-center gap-2";
      githubLink.parentNode.insertBefore(container, githubLink);
      container.appendChild(githubLink);
      container.appendChild(guideLink);
    } else {
      githubLink.parentNode.insertBefore(guideLink, githubLink.nextSibling);
    }
  }
  if (guideLink) {
    if (guideLinkMaps[item.timing]) {
      guideLink.href = guideLinkMaps[item.timing];
      guideLink.style.display = "flex";
    } else {
      guideLink.style.display = "none";
    }
  }

  const copyBtn = document.getElementById("modal-copy") || document.getElementById("modal-copy-btn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.action_content).then(() => {
        showToast(t.copied);
      });
    };
  }

  const shareBtn = document.getElementById("modal-share") || document.getElementById("modal-share-btn");
  if (shareBtn) {
    shareBtn.onclick = () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#skill=${item.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast(t.linkCopied || "链接已复制！");
      });
    };
  }

  bodyEl?.querySelectorAll("[data-modal-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.getAttribute("data-modal-copy")).then(() => {
        showToast(t.copied);
      });
    });
  });

  modal.style.display = "flex";
  requestAnimationFrame(() => modal.classList.add("active"));
  document.body.classList.add("overflow-hidden");
  if (window.location.hash !== `#skill=${item.id}`) {
    history.replaceState(null, null, `#skill=${item.id}`);
  }
}

function closeModal() {
  const modal = document.getElementById("detail-modal");
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("overflow-hidden");
  }, 150);
  if (window.location.hash.startsWith("#skill=")) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
}
