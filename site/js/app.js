// Application Logic for Responsible AI Skills

const i18n = {
  en: {
    heroBadge: "User-Centric AI Governance",
    heroTitle: "Responsible AI Use",
    heroSubtitle: "A curated collection of SKILL.md packages and practical prompts to help everyday users, researchers, and knowledge workers interact with AI safely, factually, and accountably.",
    catAll: "All Questions",
    cat1: "1. What can I feed to AI?",
    cat2: "2. Which answers can I trust?",
    cat3: "3. When NOT to listen to AI?",
    cat4: "4. Can output be published directly?",
    typeAll: "All Formats",
    searchPlaceholder: "Search skills, tools, prompts, or clients...",
    targetPersona: "Target:",
    supportedClients: "Clients:",
    copyPrompt: "Copy Prompt",
    copied: "Copied to clipboard!",
    viewSource: "View on GitHub",
    copyCommand: "Copy Command",
    checklistTitle: "⚡ 30-Second Pre-flight Checklist",
    checklistSubtitle: "Check these 4 habits before every AI interaction:",
    check1: "Input Check: All real names, confidential credentials, and private client data scrubbed?",
    check2: "Fact Check: Cited sources, DOIs, laws, and statistics independently verified?",
    check3: "Decision Check: Verified that I am not blindly delegating non-delegable human responsibility?",
    check4: "Publication Check: Prepared to disclose AI usage honestly and retained session prompt logs?",
    checklistDone: "You're all set for a responsible session!",
    resetChecklist: "Reset",
    diffTitle: "Why Responsible AI Use ≠ Traditional Responsible AI",
    diffText: "Traditional RAI targets model builders and compliance officers (asking 'is the model fair?'). Responsible AI Use focuses on everyday practitioners (asking 'can I trust this answer, and can I publish this safely?').",
    itemsCount: "items available",
    noResults: "No matching skills or prompts found.",
    redLineTitle: "🛑 Non-Delegable Red Lines",
    redLine1: "Medical diagnosis and prescription dosing without practitioner review.",
    redLine2: "Binding legal agreements and regulatory compliance certifications.",
    redLine3: "Final personnel disciplinary, termination, or hiring rejection decisions.",
    redLine4: "Publishing single-source journalistic claims with only AI output."
  },
  zh: {
    heroBadge: "以用户为中心的负责任 AI 实践",
    heroTitle: "Responsible AI Use",
    heroSubtitle: "精选开箱即用的 SKILL.md 技能包与实务提示词。让日常知识工作者、研究者和写作者在与 AI 交互时天然做到：输入守隐私、交互辨真伪、决策不盲从、发布明披露。",
    catAll: "全部问题",
    cat1: "1. 我能把什么给 AI？",
    cat2: "2. 哪些回答能信？",
    cat3: "3. 什么时候不能听 AI？",
    cat4: "4. 输出能不能直接发布？",
    typeAll: "全部格式",
    searchPlaceholder: "搜索技能、提示词、客户端或场景...",
    targetPersona: "适用人群：",
    supportedClients: "适用客户端：",
    copyPrompt: "复制提示词",
    copied: "已复制到剪贴板！",
    viewSource: "查看 GitHub 源码",
    copyCommand: "复制安装命令",
    checklistTitle: "⚡ 日常 AI 负责任使用 30 秒核对清单",
    checklistSubtitle: "在每次与 AI 开展重要对话前，快速自检这 4 项习惯：",
    check1: "输入防泄密：已剔除真实人名、机密凭证与内部未公开数据？",
    check2: "交互辨真伪：引用的文献 DOI、法条与统计数据已亲自独立核实？",
    check3: "决策不盲从：确认未将法律/医疗/人事等不可让渡的人类责任甩锅给算法？",
    check4: "发布明披露：准备好附带真实的 AI 介入说明，并留存对话日志备查？",
    checklistDone: "自检完成！你可以安心开启负责任的 AI 协作。",
    resetChecklist: "重置清单",
    diffTitle: "为什么说 Responsible AI Use ≠ 传统的 Responsible AI？",
    diffText: "传统的负责任 AI 针对模型开发者与合规层（问的是“模型公平吗”）；而这里的 Responsible AI Use 面向日常知识工作者（问的是“我能给什么、哪些能信、输出能不能发”）。",
    itemsCount: "个精选项目",
    noResults: "没有找到符合条件的技能或提示词。",
    redLineTitle: "🛑 人类决策的不可让渡底线",
    redLine1: "未经执业医生独立复核的医疗诊断与用药处方决策。",
    redLine2: "具有法律效力的合规签字与不可撤销的商业合同签署。",
    redLine3: "针对具体个人的最终处分、解雇或招聘拒绝决定。",
    redLine4: "仅凭 AI 对话结果作为独家信源对外发布事实报道。"
  }
};

let currentLang = localStorage.getItem("rai_lang") || "zh";
let currentCategory = "all";
let currentType = "all";
let searchQuery = "";
let itemsData = [];

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  setupEventListeners();
  await loadItems();
  updateLanguageUI();
  initChecklist();
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
  
  // Category tabs
  setText("t-cat-all", t.catAll);
  setText("t-cat-1", t.cat1);
  setText("t-cat-2", t.cat2);
  setText("t-cat-3", t.cat3);
  setText("t-cat-4", t.cat4);

  // Type buttons
  setText("t-type-all", t.typeAll);
  
  // Search
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // Comparison section
  setText("t-diff-title", t.diffTitle);
  setText("t-diff-text", t.diffText);

  // Red Lines
  setText("t-redline-title", t.redLineTitle);
  setText("t-redline-1", t.redLine1);
  setText("t-redline-2", t.redLine2);
  setText("t-redline-3", t.redLine3);
  setText("t-redline-4", t.redLine4);

  // Checklist
  setText("t-check-title", t.checklistTitle);
  setText("t-check-subtitle", t.checklistSubtitle);
  setText("t-check-1-label", t.check1);
  setText("t-check-2-label", t.check2);
  setText("t-check-3-label", t.check3);
  setText("t-check-4-label", t.check4);
  setText("t-reset-checklist", t.resetChecklist);
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
    // Type filter
    if (currentType !== "all" && item.type !== currentType) return false;
    // Search query
    if (searchQuery) {
      const matchName = item.name.toLowerCase().includes(searchQuery);
      const matchSummary = (currentLang === "zh" ? item.summary_cn : item.summary_en).toLowerCase().includes(searchQuery);
      const matchClients = item.clients.some((c) => c.toLowerCase().includes(searchQuery));
      const matchPersona = item.target_persona.toLowerCase().includes(searchQuery);
      if (!matchName && !matchSummary && !matchClients && !matchPersona) return false;
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
  const summary = currentLang === "zh" ? item.summary_cn : item.summary_en;
  const categoryTitle = currentLang === "zh" ? item.category_title_cn : item.category_title_en;

  const isSkill = item.type === "SKILL.md";
  const typeBadgeClass = isSkill
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
    : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";

  const actionButton = isSkill
    ? `
      <div class="mt-4 flex flex-wrap items-center gap-2">
        ${item.url ? `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            ${t.viewSource}
          </a>
        ` : ""}
        <button data-copy="${escapeHtml(item.action_content)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          ${t.copyCommand}
        </button>
      </div>
    `
    : `
      <div class="mt-4">
        <button data-copy="${escapeHtml(item.action_content)}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
          ${t.copyPrompt}
        </button>
      </div>
    `;

  return `
    <div class="skill-card flex flex-col justify-between rounded-xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-xs px-2.5 py-0.5 rounded-full border ${typeBadgeClass} font-mono font-medium">
            ${item.type}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            ${categoryTitle}
          </span>
        </div>

        <h3 class="text-base font-semibold text-slate-900 dark:text-white mb-2">
          ${item.url ? `<a href="${item.url}" target="_blank" class="hover:underline text-teal-700 dark:text-teal-400">${item.name}</a>` : item.name}
        </h3>

        <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          ${summary}
        </p>

        <div class="space-y-1 text-xs text-slate-500 dark:text-slate-400">
          <p><span class="font-medium text-slate-700 dark:text-slate-300">${t.targetPersona}</span> ${item.target_persona}</p>
          <p><span class="font-medium text-slate-700 dark:text-slate-300">${t.supportedClients}</span> ${item.clients.join(", ")}</p>
        </div>
      </div>

      ${actionButton}
    </div>
  `;
}

// Checklist Logic
function initChecklist() {
  const checkboxes = document.querySelectorAll(".check-item");
  const resetBtn = document.getElementById("reset-checklist");
  const progressFill = document.getElementById("checklist-progress");
  const statusText = document.getElementById("checklist-status");

  function updateProgress() {
    const total = checkboxes.length;
    let checked = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) checked++;
    });
    const percent = Math.round((checked / total) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;

    const t = i18n[currentLang];
    if (statusText) {
      if (checked === total) {
        statusText.textContent = `🎉 ${t.checklistDone}`;
        statusText.classList.add("text-emerald-600", "dark:text-emerald-400", "font-bold");
      } else {
        statusText.textContent = `${checked}/${total}`;
        statusText.classList.remove("text-emerald-600", "dark:text-emerald-400", "font-bold");
      }
    }
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", updateProgress);
  });

  resetBtn?.addEventListener("click", () => {
    checkboxes.forEach((cb) => (cb.checked = false));
    updateProgress();
  });

  updateProgress();
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
