// Application Logic for Responsible AI Skills
// Aligned with DESIGN.md & putongren.org

const i18n = {
  zh: {
    pageTitle: "Responsible and Safe AI Use - 负责任与安全使用 AI | 普通人的数字权利",
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkHome: "首页",
    navLinkAbout: "关于我们",
    navLinkPutongren: "普通人的数字权利 官网",
    tLangBtn: "English",

    heroBadge: "✨ 普通人的数字权利 · 实务工具箱",
    heroTitle: "负责任与安全使用 AI",
    heroHighlight: "对内防采集与盲信，对外让第三方好核查",
    heroSubtitle: "精选开源社区现存成熟的 SKILL.md 规范技能。我们不制造新工具，而是为普通人、学者和写作者把好关：对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好验证自己使用 AI 的成果。",
    heroAboutLink: "了解关于我们与「普通人的数字权利」社区愿景 →",

    bannerShieldTitle: "对内·自我防护与边界",
    bannerShieldDesc: "警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守独立思考与决策权。",
    bannerRulerTitle: "对外·成果第三方可核验",
    bannerRulerDesc: "当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，不让同事、读者或客户盲信盲猜。",

    catSectionTitle: "实务问题导航 (Practical Questions)",
    catAll: "全部问题",
    cat1: "1. 我能把什么给 AI？",
    cat2: "2. 哪些回答能信？",
    cat3: "3. 什么时候不能听 AI？",
    cat4: "4. 输出能不能直接发布？",

    timeSectionTitle: "工作流时机检索 (Workflow Timing)",
    timeAll: "全部时序",
    time1: "⏳ 输入前·防采集与隔离",
    time2: "💬 对话中·求证与防盲信",
    time3: "📤 交付前·合规与核验包",
    time4: "🧹 归档时·隐私与日志清理",

    searchPlaceholder: "搜索技能、使用场景或客户端...",
    whyCareLabel: "💡 为何普通人应该关心：",
    whyChosenLabel: "🎯 为什么精选收录：",
    whenToUseLabel: "⏰ 准确使用时机：",
    howToUseLabel: "🛠️ 如何使用：",
    statusLabel: "📊 成熟度与可信背书：",
    targetPersona: "适用人群：",
    supportedClients: "适用客户端：",
    copied: "安装命令已复制到剪贴板！",
    viewSource: "查看 GitHub 源码 ↗",
    copyCommand: "复制安装命令",
    viewDetails: "查看详情",
    shareLink: "🔗 复制卡片链接",
    linkCopied: "卡片直达链接已复制到剪贴板！",
    closeModal: "关闭详情",
    itemsCountPrefix: "共收录",
    itemsCountSuffix: "个精选开源技能",
    noResults: "没有找到符合条件的技能。",

    footerLinkHome: "实务索引",
    footerLinkAbout: "关于我们"
  },
  en: {
    pageTitle: "Responsible and Safe AI Use - Curated Skills for Everyday Users | Digital Rights for All",
    navBrandTitle: "Responsible & Safe AI Use",
    navBrandSub: "Digital Rights for All Community Project",
    navLinkHome: "Home",
    navLinkAbout: "About Us",
    navLinkPutongren: "putongren.org",
    tLangBtn: "中文",

    heroBadge: "✨ Digital Rights for All · Practical Toolkit",
    heroTitle: "Responsible and Safe AI Use",
    heroHighlight: "Inward: Guard against harvesting & blind trust; Outward: Enable third-party verifiability",
    heroSubtitle: "A curated collection of production-ready SKILL.md packages. We do not invent new tools—we help everyday knowledge workers, researchers, and professionals adopt proven guardrails: guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.",
    heroAboutLink: "Learn more About Us & Community Visions →",

    bannerShieldTitle: "Inward: Self-Defense & Boundaries",
    bannerShieldDesc: "Guard against commercial AI over-harvesting your private text into training corpora, and guard against blind faith in confident hallucinations.",
    bannerRulerTitle: "Outward: Third-Party Verifiability",
    bannerRulerDesc: "When delivering AI-assisted work, provide clear evidence trails and verification avenues so colleagues and readers can easily audit your results.",

    catSectionTitle: "PRACTICAL QUESTIONS",
    catAll: "All Questions",
    cat1: "1. What can I feed to AI?",
    cat2: "2. Which answers can I trust?",
    cat3: "3. When NOT to listen to AI?",
    cat4: "4. Can output be published directly?",

    timeSectionTitle: "WORKFLOW TIMING",
    timeAll: "All Stages",
    time1: "⏳ Pre-Input: Anti-Harvesting",
    time2: "💬 During-Chat: Fact-Checking",
    time3: "📤 Pre-Handoff: Audit & Gate",
    time4: "🧹 Post-Session: Cleanup",

    searchPlaceholder: "Search skills, scenarios, or clients...",
    whyCareLabel: "💡 Why Everyday People Should Care:",
    whyChosenLabel: "🎯 Why This Was Chosen:",
    whenToUseLabel: "⏰ When to Use:",
    howToUseLabel: "🛠️ How to Use:",
    statusLabel: "📊 Maturity & Trust Signals:",
    targetPersona: "Target:",
    supportedClients: "Clients:",
    copied: "Install command copied to clipboard!",
    viewSource: "View on GitHub ↗",
    copyCommand: "Copy Command",
    viewDetails: "Details",
    shareLink: "🔗 Share Link",
    linkCopied: "Direct skill link copied to clipboard!",
    closeModal: "Close",
    itemsCountPrefix: "",
    itemsCountSuffix: "curated open-source skills",
    noResults: "No matching skills found.",

    footerLinkHome: "Directory",
    footerLinkAbout: "About Us"
  }
};

let currentLang = localStorage.getItem("rai_lang") || "zh";
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
    const response = await fetch(`data/items.json?_t=${Date.now()}`, { cache: "no-store" });
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
  // Theme button
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  // Language button
  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem("rai_lang", currentLang);
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  window.addEventListener("hashchange", checkHashAndOpenModal);
}

// Update UI Text Strings
function updateLanguageUI() {
  const t = i18n[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  // Document & Navigation
  document.title = t.pageTitle;
  setText("nav-brand-title", t.navBrandTitle);
  setText("nav-brand-sub", t.navBrandSub);
  setText("nav-link-home", t.navLinkHome);
  setText("nav-link-about", t.navLinkAbout);
  setText("nav-link-putongren", t.navLinkPutongren);
  setText("t-lang-btn", t.tLangBtn);

  // Hero
  setText("t-hero-badge", t.heroBadge);
  setText("t-hero-title", t.heroTitle);
  setText("t-hero-highlight", t.heroHighlight);
  setText("t-hero-subtitle", t.heroSubtitle);
  setText("t-hero-about-link", t.heroAboutLink);

  // Dual-Core Banner
  setText("t-banner-shield-title", t.bannerShieldTitle);
  setText("t-banner-shield-desc", t.bannerShieldDesc);
  setText("t-banner-ruler-title", t.bannerRulerTitle);
  setText("t-banner-ruler-desc", t.bannerRulerDesc);

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
  setText("footer-link-home", t.footerLinkHome);
  setText("footer-link-about", t.footerLinkAbout);
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

// Render Item Cards
function renderCards() {
  const container = document.getElementById("cards-container");
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
      const matchSummary = (currentLang === "zh" ? item.summary_cn : item.summary_en).toLowerCase().includes(searchQuery);
      const matchWhy = (currentLang === "zh" ? item.why_chosen_cn : item.why_chosen_en).toLowerCase().includes(searchQuery);
      const matchCare = (currentLang === "zh" ? item.why_care_cn : item.why_care_en).toLowerCase().includes(searchQuery);
      const matchHow = (currentLang === "zh" ? item.how_to_use_cn : item.how_to_use_en).toLowerCase().includes(searchQuery);
      const matchTiming = (currentLang === "zh" ? item.timing_desc_cn : item.timing_desc_en).toLowerCase().includes(searchQuery);
      const matchClients = item.clients.some((c) => c.toLowerCase().includes(searchQuery));
      const matchPersona = item.target_persona.toLowerCase().includes(searchQuery);
      if (!matchName && !matchSummary && !matchWhy && !matchCare && !matchHow && !matchTiming && !matchClients && !matchPersona) return false;
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

  // Attach copy listeners
  container.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(content).then(() => {
        showToast(t.copied);
      });
    });
  });

  // Attach details modal listeners
  container.querySelectorAll("[data-details]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.getAttribute("data-details"));
    });
  });
}

function renderCard(item) {
  const t = i18n[currentLang];
  const whyCare = currentLang === "zh" ? item.why_care_cn : item.why_care_en;
  const whyChosen = currentLang === "zh" ? item.why_chosen_cn : item.why_chosen_en;
  const howToUse = currentLang === "zh" ? item.how_to_use_cn : item.how_to_use_en;
  const timingDesc = currentLang === "zh" ? item.timing_desc_cn : item.timing_desc_en;
  const categoryTitle = currentLang === "zh" ? item.category_title_cn : item.category_title_en;

  // Timing Badge label and color scheme
  const timingConfig = {
    "pre-input": {
      label: currentLang === "zh" ? "⏳ 输入前·防采集与隔离" : "⏳ Pre-Input: Privacy",
      color: "bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800"
    },
    "during-chat": {
      label: currentLang === "zh" ? "💬 交互中·求证与防盲信" : "💬 During-Chat: Fact-Check",
      color: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
    },
    "pre-handoff": {
      label: currentLang === "zh" ? "📤 交付前·合规与核验包" : "📤 Pre-Handoff: Audit",
      color: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    },
    "post-session": {
      label: currentLang === "zh" ? "🧹 归档时·隐私与日志清理" : "🧹 Post-Session: Cleanup",
      color: "bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800"
    }
  };

  const timingMeta = timingConfig[item.timing] || {
    label: item.timing,
    color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
  };

  return `
    <div class="skill-card flex flex-col justify-between p-6 sm:p-7 space-y-6">
      <div class="space-y-4">
        <!-- 1. Header Badges & Category -->
        <div class="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-bold px-3 py-1 rounded-full border ${timingMeta.color}">
              ${timingMeta.label}
            </span>
            <span class="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              SKILL.md
            </span>
          </div>
          <span class="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
            ${categoryTitle}
          </span>
        </div>

        <!-- 2. Skill Name + GitHub Link -->
        <div>
          <h3 class="text-lg font-black text-slate-900 dark:text-white leading-tight">
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:text-brand transition-colors inline-flex items-center gap-1.5 group">
              <span>${item.name}</span>
              <svg class="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </h3>
        </div>

        <!-- 3. Dimension: 为何普通人应该关心 (Why Everyday People Should Care) -->
        <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/70 dark:border-amber-900/40 text-xs">
          <span class="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-1.5">
            ${t.whyCareLabel}
          </span>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${whyCare}</p>
        </div>

        <!-- 4. Dimension: 为什么精选使用 (Why Chosen / Core Purpose) -->
        <div class="p-3.5 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/15 dark:border-brand/25 text-xs">
          <span class="font-bold text-brand dark:text-brand-container flex items-center gap-1.5 mb-1">
            ${t.whyChosenLabel}
          </span>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${whyChosen}</p>
        </div>

        <!-- 5. Dimension: 准确使用时机 (When to Use in Workflow) -->
        <div class="text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">${t.whenToUseLabel}</span>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed">${timingDesc}</p>
        </div>

        <!-- 6. Dimension: 如何使用 (How to Use & Command) -->
        <div class="space-y-1.5 text-xs">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">${t.howToUseLabel}</span>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${howToUse}</p>
          <div class="relative mt-2 p-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto flex items-center justify-between gap-3 border border-slate-800">
            <span class="truncate">${escapeHtml(item.action_content)}</span>
            <button data-copy="${escapeHtml(item.action_content)}" class="shrink-0 px-2.5 py-1 rounded-lg bg-brand hover:bg-brand-dim text-white font-sans text-[11px] font-bold transition-colors cursor-pointer" title="点击复制命令">
              复制
            </button>
          </div>
        </div>

        <!-- 7. Dimension: 可信度与成熟度背书 (Maturity & Trust Signals) -->
        <div class="text-xs rounded-2xl p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
          <span class="font-bold text-slate-700 dark:text-slate-300 block">${t.statusLabel}</span>
          <div class="flex flex-wrap gap-1.5 pt-0.5">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
              🟢 ${item.status?.stage || 'Stable'}
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200/80 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              ⭐ ${item.status?.adoption || 'Verified'}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">🛡️ ${item.status?.trust_source || 'Verified Source'}</p>
        </div>

        <!-- Metadata -->
        <div class="text-[11px] text-slate-400 dark:text-slate-500 space-y-0.5 pt-1">
          <p><span class="font-semibold text-slate-600 dark:text-slate-400">${t.targetPersona}</span> ${item.target_persona}</p>
          <p><span class="font-semibold text-slate-600 dark:text-slate-400">${t.supportedClients}</span> ${item.clients.join("、")}</p>
        </div>
      </div>

      <!-- Card Action Footer -->
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <button data-details="${item.id}" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-brand/10 hover:bg-brand/20 text-brand dark:text-brand-container transition-colors cursor-pointer" title="${t.viewDetails}">
            🔍 ${t.viewDetails}
          </button>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
        <button data-copy="${escapeHtml(item.action_content)}" class="btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          ${t.copyCommand}
        </button>
      </div>
    </div>
  `;
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
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
      label: currentLang === "zh" ? "⏳ 输入前·防采集与隔离" : "⏳ Pre-Input: Privacy",
      color: "bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800"
    },
    "during-chat": {
      label: currentLang === "zh" ? "💬 交互中·求证与防盲信" : "💬 During-Chat: Fact-Check",
      color: "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
    },
    "pre-handoff": {
      label: currentLang === "zh" ? "📤 交付前·合规与核验包" : "📤 Pre-Handoff: Audit",
      color: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    },
    "post-session": {
      label: currentLang === "zh" ? "🧹 归档时·隐私与日志清理" : "🧹 Post-Session: Cleanup",
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

  const titleEl = document.getElementById("modal-title");
  if (titleEl) titleEl.textContent = item.name;

  const catEl = document.getElementById("modal-category");
  if (catEl) catEl.textContent = categoryTitle;

  const bodyEl = document.getElementById("modal-body");
  if (bodyEl) {
    bodyEl.innerHTML = `
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

      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
        <h4 class="font-bold text-slate-800 dark:text-slate-200">${t.statusLabel}</h4>
        <div class="flex flex-wrap gap-2">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            🟢 ${item.status?.stage || 'Stable'}
          </span>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
            ⭐ ${item.status?.adoption || 'Verified'}
          </span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 pt-1 text-xs">🛡️ ${item.status?.trust_source || 'Verified Source'}</p>
        <div class="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p><span class="font-semibold text-slate-700 dark:text-slate-300">${t.targetPersona}</span> ${item.target_persona}</p>
          <p><span class="font-semibold text-slate-700 dark:text-slate-300">${t.supportedClients}</span> ${item.clients.join("、")}</p>
        </div>
      </div>
    `;
  }

  const githubLink = document.getElementById("modal-github-link");
  if (githubLink) {
    githubLink.href = item.url;
  }

  const copyBtn = document.getElementById("modal-copy-btn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.action_content).then(() => {
        showToast(t.copied);
      });
    };
  }

  const shareBtn = document.getElementById("modal-share-btn");
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
