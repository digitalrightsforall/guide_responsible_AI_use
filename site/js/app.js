// Application Logic for Responsible AI Skills

const i18n = {
  en: {
    heroBadge: "Curated Practice for Everyday Users",
    heroTitle: "Responsible and Safe AI Use",
    heroSubtitle: "A curated collection of existing, production-ready SKILL.md packages and verified open protocols. We do not invent new tools—we help everyday knowledge workers, researchers, and professionals adopt proven guardrails: guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.",
    bannerTitle: "Two Core Practice Pillars of Responsible & Safe AI Use (Dynamic Framework)",
    bannerShieldTitle: "🛡️ Inward: Self-Defense & Boundaries",
    bannerShieldDesc: "Guard against commercial AI over-harvesting your private text into training corpora, and guard against blind faith in confident hallucinations.",
    bannerRulerTitle: "📐 Outward: Third-Party Verifiability",
    bannerRulerDesc: "When delivering AI-assisted work, provide clear evidence trails and verification avenues so colleagues and readers can easily audit your results.",
    catAll: "All Questions",
    cat1: "1. What can I feed to AI?",
    cat2: "2. Which answers can I trust?",
    cat3: "3. When NOT to listen to AI?",
    cat4: "4. Can output be published directly?",
    timeSectionTitle: "Workflow Timing Filter (When to use - Trial)",
    timeAll: "All Workflow Stages",
    time1: "1. Pre-Input (Anti-harvesting / Local)",
    time2: "2. During-Chat (Fact-check / Skepticism)",
    time3: "3. Pre-Handoff (Third-party Verification)",
    time4: "4. Post-Session (Cleanup & Retention)",
    typeAll: "All Formats",
    searchPlaceholder: "Search skills, clients, tools, or scenarios...",
    whyChosenLabel: "🎯 Why this was chosen:",
    whenToUseLabel: "⏰ When to use:",
    statusLabel: "📊 Maturity & Trust Signals:",
    targetPersona: "Target:",
    supportedClients: "Clients:",
    copyPrompt: "Copy Prompt",
    copied: "Copied to clipboard!",
    viewSource: "View on GitHub",
    copyCommand: "Copy Command",
    itemsCount: "skills available",
    noResults: "No matching skills found.",
    redLineTitle: "🛑 Non-Delegable Red Lines",
    redLine1: "Medical diagnosis and prescription dosing without practitioner review.",
    redLine2: "Binding legal agreements and regulatory compliance certifications.",
    redLine3: "Final personnel disciplinary, termination, or hiring rejection decisions.",
    redLine4: "Publishing single-source journalistic claims with only AI output."
  },
  zh: {
    heroBadge: "为普通人精选的负责任 AI 实务工具箱",
    heroTitle: "Responsible and Safe AI Use (负责任与安全使用 AI)",
    heroSubtitle: "精选开源社区现存成熟的 SKILL.md 技能与实务协议。我们不制造新工具，而是为普通人、学者和写作者把好关：对内防商业 AI 过度采集与盲信幻觉，对外让第三方能够更好验证自己使用 AI 的成果。",
    bannerTitle: "负责任与安全使用 AI 的两大当下实务内核（动态演进框架）",
    bannerShieldTitle: "🛡️ 对内·自我防护与边界",
    bannerShieldDesc: "警惕商业大模型将你的日常对话、未公开草稿当做免费语料过度采集；警惕 AI 极度自信的幻觉与迎合，坚守独立思考与决策权。",
    bannerRulerTitle: "📐 对外·成果第三方可核验",
    bannerRulerDesc: "当你使用 AI 辅助产出方案、报告或代码时，主动附带原始证据链、推演记录与核验切入点，不让同事、读者或客户盲信盲猜。",
    catAll: "全部问题",
    cat1: "1. 我能把什么给 AI？",
    cat2: "2. 哪些回答能信？",
    cat3: "3. 什么时候不能听 AI？",
    cat4: "4. 输出能不能直接发布？",
    timeSectionTitle: "使用时机筛选 (When to use / Workflow Timing - 试行)",
    timeAll: "全部时序阶段",
    time1: "1. 输入前 (防采集/本地隔离)",
    time2: "2. 对话中 (防盲信/求证)",
    time3: "3. 交付前 (第三方核验包)",
    time4: "4. 归档时 (清理与日志)",
    typeAll: "全部格式",
    searchPlaceholder: "搜索技能、客户端或场景...",
    whyChosenLabel: "🎯 为什么精选收录：",
    whenToUseLabel: "⏰ 什么时候使用：",
    statusLabel: "📊 成熟度与可信背书：",
    targetPersona: "适用人群：",
    supportedClients: "适用客户端：",
    copyPrompt: "复制提示词",
    copied: "已复制到剪贴板！",
    viewSource: "查看 GitHub 源码",
    copyCommand: "复制安装命令",
    itemsCount: "个精选技能",
    noResults: "没有找到符合条件的技能。",
    redLineTitle: "🛑 人类决策的不可让渡底线",
    redLine1: "未经执业医生独立复核的医疗诊断与用药处方决策。",
    redLine2: "具有法律效力的合规签字与不可撤销的商业合同签署。",
    redLine3: "针对具体个人的最终处分、解雇或招聘拒绝决定。",
    redLine4: "仅凭 AI 对话结果作为独家信源对外发布事实报道。"
  }
};

let currentLang = localStorage.getItem("rai_lang") || "zh";
let currentCategory = "all";
let currentTiming = "all";
let currentType = "all";
let searchQuery = "";
let itemsData = [];

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  setupEventListeners();
  await loadItems();
  updateLanguageUI();
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

// Load Data
async function loadItems() {
  try {
    const response = await fetch("data/items.json");
    itemsData = await response.json();
    renderCards();
  } catch (error) {
    console.error("Failed to load items.json:", error);
  }
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
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("[data-cat]").forEach((b) => b.classList.remove("active-cat"));
      btn.classList.add("active-cat");
      currentCategory = btn.getAttribute("data-cat");
      renderCards();
    });
  });

  // Timing / Workflow stage buttons (Trial feature)
  document.querySelectorAll("[data-timing]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("[data-timing]").forEach((b) => b.classList.remove("active-timing"));
      btn.classList.add("active-timing");
      currentTiming = btn.getAttribute("data-timing");
      renderCards();
    });
  });

  // Type filter buttons
  document.querySelectorAll("[data-type]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("[data-type]").forEach((b) => b.classList.remove("active-type"));
      btn.classList.add("active-type");
      currentType = btn.getAttribute("data-type");
      renderCards();
    });
  });
}

// Update UI Text Strings
function updateLanguageUI() {
  const t = i18n[currentLang];
  
  // Hero and headers
  setText("t-hero-badge", t.heroBadge);
  setText("t-hero-title", t.heroTitle);
  setText("t-hero-subtitle", t.heroSubtitle);
  setText("t-lang-btn", currentLang === "zh" ? "English" : "中文");

  // Dual-Core Banner
  setText("t-banner-title", t.bannerTitle);
  setText("t-banner-shield-title", t.bannerShieldTitle);
  setText("t-banner-shield-desc", t.bannerShieldDesc);
  setText("t-banner-ruler-title", t.bannerRulerTitle);
  setText("t-banner-ruler-desc", t.bannerRulerDesc);
  
  // Category tabs
  setText("t-cat-all", t.catAll);
  setText("t-cat-1", t.cat1);
  setText("t-cat-2", t.cat2);
  setText("t-cat-3", t.cat3);
  setText("t-cat-4", t.cat4);

  // Timing tabs
  setText("t-time-section-title", t.timeSectionTitle);
  setText("t-time-all", t.timeAll);
  setText("t-time-1", t.time1);
  setText("t-time-2", t.time2);
  setText("t-time-3", t.time3);
  setText("t-time-4", t.time4);

  // Type buttons
  setText("t-type-all", t.typeAll);
  
  // Search
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // Red Lines
  setText("t-redline-title", t.redLineTitle);
  setText("t-redline-1", t.redLine1);
  setText("t-redline-2", t.redLine2);
  setText("t-redline-3", t.redLine3);
  setText("t-redline-4", t.redLine4);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
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
    // Type filter
    if (currentType !== "all" && item.type !== currentType) return false;
    // Search query
    if (searchQuery) {
      const matchName = item.name.toLowerCase().includes(searchQuery);
      const matchSummary = (currentLang === "zh" ? item.summary_cn : item.summary_en).toLowerCase().includes(searchQuery);
      const matchWhy = (currentLang === "zh" ? item.why_chosen_cn : item.why_chosen_en).toLowerCase().includes(searchQuery);
      const matchTiming = (currentLang === "zh" ? item.timing_desc_cn : item.timing_desc_en).toLowerCase().includes(searchQuery);
      const matchClients = item.clients.some((c) => c.toLowerCase().includes(searchQuery));
      const matchPersona = item.target_persona.toLowerCase().includes(searchQuery);
      if (!matchName && !matchSummary && !matchWhy && !matchTiming && !matchClients && !matchPersona) return false;
    }
    return true;
  });

  const t = i18n[currentLang];
  if (countEl) {
    countEl.textContent = `${filtered.length} ${t.itemsCount}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500 dark:text-slate-400">
        <svg class="mx-auto h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-base font-medium">${t.noResults}</p>
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
}

function renderCard(item) {
  const t = i18n[currentLang];
  const whyChosen = currentLang === "zh" ? item.why_chosen_cn : item.why_chosen_en;
  const timingDesc = currentLang === "zh" ? item.timing_desc_cn : item.timing_desc_en;
  const categoryTitle = currentLang === "zh" ? item.category_title_cn : item.category_title_en;

  const isSkill = item.type === "SKILL.md";
  const typeBadgeClass = isSkill
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
    : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";

  // Timing Badge label
  const timingLabels = {
    "pre-input": currentLang === "zh" ? "⏳ 输入前" : "⏳ Pre-Input",
    "during-chat": currentLang === "zh" ? "💬 交互中" : "💬 During-Chat",
    "pre-handoff": currentLang === "zh" ? "📤 交付前" : "📤 Pre-Handoff",
    "post-session": currentLang === "zh" ? "🧹 归档清理" : "🧹 Cleanup"
  };
  const timingBadge = timingLabels[item.timing] || item.timing;

  const actionButton = isSkill
    ? `
      <div class="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        ${item.url ? `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            ${t.viewSource}
          </a>
        ` : ""}
        <button data-copy="${escapeHtml(item.action_content)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors ml-auto">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          ${t.copyCommand}
        </button>
      </div>
    `
    : `
      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
        <button data-copy="${escapeHtml(item.action_content)}" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
          ${t.copyPrompt}
        </button>
      </div>
    `;

  return `
    <div class="skill-card flex flex-col justify-between rounded-xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div class="space-y-3.5">
        <!-- Header Tags -->
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5">
            <span class="text-xs px-2.5 py-0.5 rounded-full border ${typeBadgeClass} font-mono font-medium">
              ${item.type}
            </span>
            <span class="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              ${timingBadge}
            </span>
          </div>
          <span class="text-xs text-slate-400 dark:text-slate-500 font-medium truncate max-w-[140px]" title="${categoryTitle}">
            ${categoryTitle}
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-base font-bold text-slate-900 dark:text-white leading-tight">
          ${item.url ? `<a href="${item.url}" target="_blank" class="hover:underline text-teal-700 dark:text-teal-400">${item.name}</a>` : item.name}
        </h3>

        <!-- Dimension 1: Why this was chosen -->
        <div class="p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 text-xs">
          <span class="font-semibold text-teal-900 dark:text-teal-300 block mb-1">${t.whyChosenLabel}</span>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${whyChosen}</p>
        </div>

        <!-- Dimension 2: When to use (Timing touchpoint) -->
        <div class="text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <span class="font-semibold text-slate-800 dark:text-slate-200 block">${t.whenToUseLabel}</span>
          <p class="text-slate-500 dark:text-slate-400 leading-normal">${timingDesc}</p>
        </div>

        <!-- Dimension 3: Trust & Maturity Signals -->
        <div class="text-xs rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-1">
          <span class="font-semibold text-slate-700 dark:text-slate-300 block">${t.statusLabel}</span>
          <div class="flex flex-wrap gap-1.5 pt-0.5">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              🟢 ${item.status?.stage || 'Stable'}
            </span>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-200/70 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              ⭐ ${item.status?.adoption || 'Verified'}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">🛡️ ${item.status?.trust_source || 'Verified Source'}</p>
        </div>

        <!-- Metadata -->
        <div class="text-[11px] text-slate-400 dark:text-slate-500 space-y-0.5 pt-1">
          <p><span class="font-medium text-slate-600 dark:text-slate-400">${t.targetPersona}</span> ${item.target_persona}</p>
          <p><span class="font-medium text-slate-600 dark:text-slate-400">${t.supportedClients}</span> ${item.clients.join(", ")}</p>
        </div>
      </div>

      ${actionButton}
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
