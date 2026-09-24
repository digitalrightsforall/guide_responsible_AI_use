// Guide Page Logic & Interactive Narrative Engine
// Responsible & Safe AI Use · Digital Rights for All

let currentLang = localStorage.getItem("rai_lang") || "zh";
let itemsData = [];
let itemsById = {};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  setupEventListeners();
  await loadItems();
  updateUI();
  setupScrollTracking();
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

// Load items.json
async function loadItems() {
  try {
    const res = await fetch(`data/items.json?_t=${Date.now()}`, { cache: "no-store" });
    itemsData = await res.json();
    itemsById = {};
    itemsData.forEach(item => {
      itemsById[item.id] = item;
    });
  } catch (err) {
    console.error("Failed to load items.json:", err);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme toggle
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  // Language toggle
  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem("rai_lang", currentLang);
    updateUI();
  });

  // Modal Close
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("guide-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "guide-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Modal Copy Button
  document.getElementById("modal-copy-btn")?.addEventListener("click", () => {
    const activeSkillId = document.getElementById("guide-modal")?.getAttribute("data-active-skill");
    if (!activeSkillId || !itemsById[activeSkillId]) return;
    const item = itemsById[activeSkillId];
    const cmd = item.install?.action_content || `curl -sL ${item.url}/raw/main/SKILL.md -o .agents/skills/${item.id}/SKILL.md`;
    navigator.clipboard.writeText(cmd).then(() => {
      const copyTextEl = document.getElementById("modal-copy-text");
      const originalText = copyTextEl.textContent;
      copyTextEl.textContent = currentLang === "zh" ? "✅ 已复制命令！" : "✅ Command Copied!";
      setTimeout(() => {
        copyTextEl.textContent = originalText;
      }, 2000);
    });
  });

  // Delegate inline skill pill clicks
  document.getElementById("narrative-content")?.addEventListener("click", (e) => {
    const pill = e.target.closest(".inline-skill-pill");
    if (pill) {
      const skillId = pill.getAttribute("data-skill");
      if (skillId && itemsById[skillId]) {
        openModal(skillId);
      }
    }
  });
}

// Scrollspy and Reading Progress Tracking
function setupScrollTracking() {
  const progressBar = document.getElementById("reading-progress");
  const progressText = document.getElementById("toc-progress-text");
  const tocLinks = document.querySelectorAll(".guide-toc-link");

  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollPos / docHeight) * 100))) : 0;

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${pct}%`;

    // Highlight current active section in TOC
    const sections = Array.from(tocLinks).map(link => {
      const targetId = link.getAttribute("data-target");
      const el = document.getElementById(targetId);
      return { link, el };
    }).filter(item => item.el !== null);

    let currentSection = sections[0];
    for (const item of sections) {
      const rect = item.el.getBoundingClientRect();
      if (rect.top <= 160) {
        currentSection = item;
      }
    }

    if (currentSection) {
      tocLinks.forEach(l => l.classList.remove("active"));
      currentSection.link.classList.add("active");
    }
  }, { passive: true });
}

// Modal Logic
function openModal(skillId) {
  const item = itemsById[skillId];
  if (!item) return;

  const modal = document.getElementById("guide-modal");
  modal.setAttribute("data-active-skill", skillId);

  const isZh = currentLang === "zh";

  // Category & Timing labels
  const catNames = {
    "feed-to-ai": isZh ? "1. 我能把什么给 AI？" : "1. What can I feed to AI?",
    "answers-to-trust": isZh ? "2. 哪些回答能信？" : "2. Which answers can I trust?",
    "when-not-to-listen": isZh ? "3. 什么时候不能听 AI？" : "3. When NOT to listen to AI?",
    "can-publish-directly": isZh ? "4. 输出能不能直接发布？" : "4. Can output be published directly?"
  };
  const timeNames = {
    "pre-input": isZh ? "⏳ 输入前·防采集与隔离" : "⏳ Pre-Input: Anti-Harvesting",
    "during-chat": isZh ? "💬 对话中·求证与防盲信" : "💬 During-Chat: Fact-Checking",
    "pre-handoff": isZh ? "📤 交付前·合规与核验包" : "📤 Pre-Handoff: Audit & Gate",
    "post-session": isZh ? "🧹 归档时·隐私与日志清理" : "🧹 Post-Session: Cleanup"
  };

  document.getElementById("modal-category").textContent = catNames[item.category] || item.category;
  document.getElementById("modal-timing-badge").textContent = timeNames[item.timing] || item.timing;
  document.getElementById("modal-title").textContent = item.name;

  // Status & Evidence
  const statusStage = isZh ? (item.status?.stage || "开箱即用") : (item.status?.stage_en || "Out-of-the-Box");
  const isOutOfBox = (item.status?.stage || "").includes("开箱即用");
  const statusDot = isOutOfBox ? "🟢" : "🟡";
  const starsBadge = item.status?.stars ? `⭐ GitHub ${item.status.stars.toLocaleString()}★` : (isZh ? "⭐ 独立开源" : "⭐ Open Source");
  const trustSource = isZh ? (item.status?.trust_source || "") : (item.status?.trust_source_en || item.status?.trust_source || "");
  const verifiedBy = isZh ? (item.status?.verified_by || "") : (item.status?.verified_by_en || item.status?.verified_by || "");
  const lastVerified = item.status?.last_verified ? (isZh ? `实测通过时间：${item.status.last_verified}` : `Verified: ${item.status.last_verified}`) : "";

  // Standard Alignment
  const std = item.standard_alignment || {};
  const stdName = isZh ? (std.name_zh || std.name || "权威通用规范") : (std.name_en || std.name || "Standard Alignment");
  const stdOrg = std.organization || "International Body";
  const stdUrl = std.doc_url || item.url;
  const stdDesc = isZh ? (std.mechanism_zh || "") : (std.mechanism_en || std.mechanism_zh || "");

  // Third party reviews
  const rev = item.third_party_reviews || {};
  const hasReviews = rev.has_independent_review;
  const revDirectUrl = rev.direct_review_url || item.url;
  const revSource = isZh ? (rev.review_source_zh || "") : (rev.review_source_en || rev.review_source_zh || "");
  const revExcerpt = isZh ? (rev.excerpt_zh || "") : (rev.excerpt_en || rev.excerpt_zh || "");

  // Modal Body HTML
  const bodyEl = document.getElementById("modal-body");
  bodyEl.innerHTML = `
    <!-- Operational Status Card -->
    <div class="p-4 rounded-2xl ${isOutOfBox ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60' : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60'} space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold ${isOutOfBox ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'}">
            ${statusDot} ${statusStage}
          </span>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            ${starsBadge}
          </span>
        </div>
        <span class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">${lastVerified}</span>
      </div>
      <p class="text-xs ${isOutOfBox ? 'text-emerald-900 dark:text-emerald-200' : 'text-amber-900 dark:text-amber-200'} leading-relaxed">
        ${escapeHtml(trustSource)}
      </p>
      <div class="pt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
        <span>🔬 ${isZh ? '测试验证：' : 'Verification: '}</span>
        <span class="font-medium">${escapeHtml(verifiedBy)}</span>
      </div>
    </div>

    <!-- Core Intent & Why Care -->
    <div class="space-y-2">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">${isZh ? '💡 为什么普通人应该关心：' : '💡 Why You Should Care:'}</h4>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${isZh ? escapeHtml(item.why_care) : escapeHtml(item.why_care_en || item.why_care)}</p>
    </div>

    <!-- Technical Standard Alignment -->
    <div class="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">
          📐 ${isZh ? '技术依据与对齐标准：' : 'Standard Alignment:'} ${escapeHtml(stdOrg)}
        </span>
        <a href="${escapeHtml(stdUrl)}" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-brand hover:underline inline-flex items-center gap-0.5">
          ${isZh ? '查阅规范 ↗' : 'View Spec ↗'}
        </a>
      </div>
      <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">${escapeHtml(stdName)}</p>
      <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${escapeHtml(stdDesc)}</p>
    </div>

    <!-- Third-Party Review / Inclusion -->
    <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-800 dark:text-slate-200">
          🌐 ${isZh ? '独立第三方评测与生态收录：' : 'Third-Party Reviews & Inclusions:'}
        </span>
        ${hasReviews ? `<a href="${escapeHtml(revDirectUrl)}" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline">
          ${isZh ? '阅读原刊 ↗' : 'Read Article ↗'}
        </a>` : ''}
      </div>
      ${hasReviews ? `
        <div class="text-xs">
          <span class="font-bold text-slate-700 dark:text-slate-300">${escapeHtml(revSource)}: </span>
          <span class="text-slate-600 dark:text-slate-400 italic">“${escapeHtml(revExcerpt)}”</span>
        </div>
      ` : `
        <p class="text-xs text-slate-500 dark:text-slate-400 italic">
          🌱 ${isZh ? '开源社区独立实现，当前暂无独立第三方媒体长篇报道，由开发者在 GitHub 遵循开源规范透明维护。' : 'Community open-source implementation with standard-compliant GitHub maintenance; no dedicated independent media articles yet.'}
        </p>
      `}
    </div>

    <!-- Supported Clients & Persona -->
    <div class="text-[11px] text-slate-500 dark:text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
      <div><strong>${isZh ? '适用人群：' : 'Target: '}</strong> ${escapeHtml(item.target_persona || '通用知识工作者')}</div>
      <div><strong>${isZh ? '适用客户端：' : 'Clients: '}</strong> ${(item.clients || []).join('、')}</div>
    </div>
  `;

  // Jump to Library link
  const jumpBtn = document.getElementById("modal-library-jump");
  jumpBtn.href = `index.html#${item.id}`;
  document.getElementById("modal-library-jump-text").textContent = isZh ? "在检索库中查看并筛选" : "View in Search Library";

  // GitHub Source Link
  const ghBtn = document.getElementById("modal-github");
  ghBtn.href = item.url;
  document.getElementById("modal-source-text").textContent = isZh ? "GitHub 源码" : "GitHub Source";

  // Show modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("guide-modal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
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

// Helper to render interactive pill in text
function makePill(skillId, label) {
  return `<button type="button" class="inline-skill-pill" data-skill="${skillId}" title="点击查看 ${skillId} 的完整实测状态与标准依据">🛡️ ${label || skillId}</button>`;
}

// Bilingual Narrative Content Dictionary
const guideContent = {
  zh: {
    pageTitle: "负责任与安全使用 AI 实务指南 - 普通人的数字权利 · Practical Field Guide",
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkHome: "实务索引",
    navLinkGuide: "实务指南",
    navLinkAbout: "关于我们",
    navLinkPutongren: "普通人的数字权利 官网",
    tLangBtn: "English",

    heroBadge: "普通人的数字权利 · 实务行动指南",
    heroTitle: "负责任与安全使用 AI：",
    heroTitleHighlight: "普通人的实操指南",
    heroSubtitle: "从“盲信科技神话”到“手握实证工具”。本指南用严谨透彻的文字，解构我们为何构建这个开源库，如何把抽象伦理拆解为具体防线，以及 43 个技能如何无缝嵌入你的日常工作流。",
    metaReadTime: "建议阅读：15 分钟",
    metaSkillsCount: "覆盖 43 项开源规范技能",
    metaScenarios: "5 大核心工作流场景串联",
    heroCtaPlaybook: "直达实战技能武器库 ⬇",
    heroCtaLibrary: "打开交互检索库 ↗",

    tocTitle: "📖 章节导航 (TOC)",
    sidebarBoxDesc: "💡 行文中任何带有小盾牌 🛡️ 的技能，点击即可原地查看实测状态、标准依据与安装命令。",
    sidebarBoxLink: "前往主检索库交互筛选 ↗",

    // Chapter HTML Content
    bodyHtml: `
      <!-- Chapter 1 -->
      <section id="chapter-1" class="space-y-6 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 1 · 序幕</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            算法时代的平民处境：我们为什么要关心这件事？
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            今天，大语言模型（LLM）与生成式人工智能正以不可逆转的速度渗透进每一个人的工作与生活。无论是写一份周报、整理学术文献、编写一段业务代码，还是起草一份营销文案，我们都在被动或主动地向这些“黑盒”输入自己的思想碎片。
          </p>

          <p class="leading-relaxed font-medium text-slate-800 dark:text-slate-100">
            然而，在喧嚣的科技狂欢之下，普通人正在承担着前所未有的不对称风险：
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
              <div class="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                <span>⚠️ 隐形危机一：数据主权的静默让渡</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                商业大模型厂商普遍通过冗长晦涩的用户协议与“默认勾选”机制，将普通用户的咨询记录、未公开草稿、私有源码乃至个人病历信息，静默并入其下一代模型的训练语料池。“免费工具的背后，每一个普通人都在充当免费的训练矿工”。
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
              <div class="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-sm">
                <span>⚠️ 隐形危机二：自信幻觉与认知依附</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                大语言模型最危险的缺陷绝不是“直截了当地犯错”，而是<strong>以极具专业感、令人信服的权威语调伪造事实</strong>。从格式严谨的虚构文献 DOI，到看似合理的伪造法条与安全分析，模型迎合人性的断言正悄然瓦解使用者的批判性审查能力。
              </p>
            </div>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            我们为什么拒绝空洞的宏大伦理？
          </h3>
          <p class="leading-relaxed">
            现有的 AI 治理讨论，大多停留在学术精英的象牙塔或跨国科技巨头的合规白皮书中。“公平、向善、透明、负责”等词汇虽然高尚，但当一个普通职员面对一个正在闪烁光标的对话框时，这些宏观口号无法给他提供任何趁手的防护工具。
          </p>
          <p class="leading-relaxed">
            <strong>《负责任与安全使用 AI》开源实务库的诞生，就是为了给每一个普通人递上一把带刺的护盾与一把求证的标尺。</strong>我们不发明虚幻的概念，而是将全球开源社区经过工程实测验证的 43 项规范技能（SKILL.md）系统化收录，让每个人都能以最低的技术门槛，在自己的 IDE、客户端和会话工作流中筑起安全防御。
          </p>
        </div>
      </section>

      <!-- Chapter 2 -->
      <section id="chapter-2" class="space-y-6 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 2 · 概念解构</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            概念解构：我们如何结构「负责任与安全使用 AI」？
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-5">
          <p class="leading-relaxed">
            普通人使用 AI，究竟怎样才算“负责任”与“安全”？我们将其解构为<strong>“两大防御纵深 × 四大日常追问 × 贯穿时序闭环”</strong>的清晰操作框架：
          </p>

          <!-- Two Defensive Lines Card -->
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🛡️ 两大防御纵深 (Two Defensive Perimeters)</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-teal-200 dark:border-teal-900/60 space-y-1.5">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-400">纵深一：对内·自我防护与边界保护</span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  在信息离开你的电脑、输入到模型云端前，强制执行脱敏清洗；在与模型交互时，始终保持对抗性质疑，绝不把独立判断与最终决策权出让给算法。
                </p>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
                <span class="text-xs font-bold text-indigo-700 dark:text-indigo-400">纵深二：对外·交付成果第三方可独立核验</span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  负责任不是自说自话，而是对同事、读者和公众的职业诚信。交付由 AI 辅助生成的方案、论文或代码时，必须附带一手证据链、提示词推演日志与验证入口，让任何第三方都能够轻松复核、审计与证伪。
                </p>
              </div>
            </div>
          </div>

          <!-- Four Practical Questions Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            四大日常追问：将抽象原则转化为工作流反射
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">日常实务追问</th>
                  <th class="py-3 px-4">核心安全考量</th>
                  <th class="py-3 px-4">对齐权威标准与依据</th>
                  <th class="py-3 px-4">库内技能数</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">1. 我能把什么给 AI？</td>
                  <td class="py-3 px-4">个人隐私 PII、商业机密、第三方投毒防范</td>
                  <td class="py-3 px-4">Microsoft Presidio、NIST 隐私框架</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 项</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">2. 哪些回答能信？</td>
                  <td class="py-3 px-4">虚构文献拦截、事实证据忠实度、逻辑自洽</td>
                  <td class="py-3 px-4">CrossRef/PubMed DOI 规范、Nature 事实核查</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 项</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">3. 什么时候不能听 AI？</td>
                  <td class="py-3 px-4">破除模型顺从与谄媚、魔鬼代言人逆反审查</td>
                  <td class="py-3 px-4">Anthropic 对抗评估、IEEE 认知偏差基准</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 项</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">4. 输出能不能直接发布？</td>
                  <td class="py-3 px-4">广告法审查、无障碍标准、代码密钥与开源协议</td>
                  <td class="py-3 px-4">FTC 广告法、W3C WCAG 2.1 AA、OWASP、SPDX</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">13 项</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Chapter 3 -->
      <section id="chapter-3" class="space-y-12 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 3 · 实战图谱</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            实战图谱：43 个技能如何精准瓦解现实陷阱？
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            技能不是冰冷的清单。在以下 5 大典型场景中，每一个技能都是一把对应特定陷阱的手术刀。
          </p>
        </div>

        <!-- Section 3.1 -->
        <div id="sec-3-1" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.1 准备投喂时 · 数据防采集与技能体检 (Pre-Input)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当你准备把一份包含真实姓名、联系方式、财务数据或业务代码的文档喂给 AI 进行分析时，危险就已经悄然降临。一旦未脱敏数据传输到云端，你就彻底失去了对它的控制。与此同时，如果你安装了来源未知的第三方智能体技能，它们本身可能包含恶意的提示词注入（Prompt Injection）或越权文件读取风险。
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span>❌ 常见高危做法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                全选复制未脱敏的原始文本直接粘贴到对话框中；随意在 GitHub 或插件市场运行未审计的一行安装脚本。
              </p>
            </div>
            <div class="scenario-box bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span>✅ 规范自卫打法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                输入前先通过本地掩码技能将隐私信息替换为临时占位符；对安装的新技能先通过静态安全威胁建模审计代码权限。
              </p>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景对应技能武器库 (点击卡片查看实证)：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("pii-safe-documents", "pii-safe-documents · 文档敏感脱敏")}
              ${makePill("presidio-anonymize-text", "presidio-anonymize-text · 微软标准文本匿名化")}
              ${makePill("pii-detection-pipeline", "pii-detection-pipeline · 隐私多重检测流")}
              ${makePill("skill-sanitizer", "skill-sanitizer · 投喂数据净化")}
              ${makePill("openmed-clinical-ingestion", "openmed-clinical-ingestion · 临床病历隐私合规")}
              ${makePill("skillguard", "skillguard · 技能静态恶意检测")}
              ${makePill("skill-sentinel", "skill-sentinel · 提示词注入前哨")}
              ${makePill("security-threat-model", "security-threat-model · 威胁建模分析")}
              ${makePill("scholar-safety", "scholar-safety · 学术检索隐私隔离")}
              ${makePill("nova-proximity", "nova-proximity · 敏感数据越界预警")}
            </div>
          </div>
        </div>

        <!-- Section 3.2 -->
        <div id="sec-3-2" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.2 对话推演时 · 撕开幻觉与伪造文献的伪装 (During-Chat)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型最令人着迷也最危险的特性就是它的“自信”。当你向它询问学术背景、医学诊断或技术原理时，它能生成排版工整、带有著名学者姓名与专业期刊名的引用。但如果逐一点击这些引文，你会震惊地发现：DOI 根本打不开，或者文章内容与结论南辕北辙。这就是纯语言概率模型必然存在的“伪造文献（Paper Hallucination）”。
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400">❌ 常见高危做法</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                看到 AI 提供了刊号和文献列表就心满意足，直接复制进开题报告或投行研报的脚注中。
              </p>
            </div>
            <div class="scenario-box bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">✅ 规范自卫打法</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                强制接入引文校验技能，自动化比对 CrossRef/PubMed 官方数据库，确保每个引文具有真实学术锚点。
              </p>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景对应技能武器库 (点击卡片查看实证)：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("bibref-verify", "bibref-verify · 参考文献精准核验")}
              ${makePill("citation-verifier", "citation-verifier · 引文真伪验证器")}
              ${makePill("citation-faithfulness-checker", "citation-faithfulness-checker · 引文忠实度核对")}
              ${makePill("citation-integrity-auditor", "citation-integrity-auditor · 学术引用完整性审计")}
              ${makePill("claim-source-fact-checker", "claim-source-fact-checker · 主张来源查证")}
              ${makePill("post-generation-fact-check", "post-generation-fact-check · 生成后事实查核")}
              ${makePill("vectara-hallucination-corrector", "vectara-hallucination-corrector · 幻觉自动纠错")}
              ${makePill("hallucination-risk-reviewer", "hallucination-risk-reviewer · 幻觉风险评估")}
              ${makePill("kdense-peer-review", "kdense-peer-review · 严密同行审议")}
              ${makePill("the-judge", "the-judge · 裁判官逻辑交叉质证")}
            </div>
          </div>
        </div>

        <!-- Section 3.3 -->
        <div id="sec-3-3" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.3 方案决策时 · 打破模型的“谄媚盲从”与迎合偏差 (During-Chat)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            你是否经历过这样的场景：你在提问时暗示了一个偏颇的思路（例如“我觉得方案 A 明显比方案 B 好”），模型立即回答：“您的洞察非常深刻，方案 A 确实是最佳选择！”——在机器学习学术界，这种现象被称为<strong>“谄媚倾向（Sycophancy）”</strong>。模型为了迎合人类的好恶反馈，会故意隐瞒反面论据与缺陷，制造虚假的认知回音壁。
          </p>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景对应技能武器库 (点击卡片查看实证)：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("sycophancy-challenger", "sycophancy-challenger · 谄媚质疑挑战者")}
              ${makePill("anti-sycophancy-molly", "anti-sycophancy-molly · 防迎合直言护卫")}
              ${makePill("devils-advocate-mad-skills", "devils-advocate-mad-skills · 魔鬼代言人逆反推演")}
              ${makePill("devils-advocate-reviewer", "devils-advocate-reviewer · 批评性对抗审阅")}
              ${makePill("godfly-opposing-counsel", "godfly-opposing-counsel · 模拟对方辩友质证")}
              ${makePill("the-fool", "the-fool · 愚者反直觉质疑")}
              ${makePill("the-jury", "the-jury · 多角色陪审团会诊")}
              ${makePill("red-team-review", "red-team-review · 红队对抗漏洞挖掘")}
              ${makePill("discernment-nudge", "discernment-nudge · 批判性辨识微提醒")}
              ${makePill("receiving-code-review", "receiving-code-review · 客观代码审查受纳")}
            </div>
          </div>
        </div>

        <!-- Section 3.4 -->
        <div id="sec-3-4" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.4 交付前 · 公开发布的“四大法定门禁” (Pre-Handoff)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这是负责任 AI 工作流中最关键的关口。当一段由 AI 辅助生成的代码、一篇营销稿件、一份产品页面准备推向生产环境或公开发表时，绝不能凭主观直觉直接发布。未经门禁校验的内容可能包含致命的安全凭证泄露、违反广告法的夸大承诺、排斥残障人士的界面缺陷，甚至引发侵权诉讼。
          </p>

          <!-- 4 Statutory Gates Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <div class="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300">
                <span>📢 门禁一：商业与营销主张合规审查</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                阻断 AI 编写出“业界首创/100%零风险/最佳效果”等缺乏证据的绝对化虚假承诺。
              </p>
              <div>${makePill("marketing-claims-review", "marketing-claims-review · FTC与广告法门禁")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <div class="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300">
                <span>♿ 门禁二：数字包容与 Web 无障碍门禁</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                依据 W3C WCAG 2.1 AA 国际标准，阻断缺少 ARIA 标签、键盘不可达、对比度不足的代码上线。
              </p>
              <div>${makePill("web-accessibility", "web-accessibility · W3C WCAG 无障碍门禁")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <div class="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300">
                <span>🔑 门禁三：代码凭证与密钥泄露拦截</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                在 Git 提交前，利用 Gitleaks 与 OWASP 规则集，扫描并阻断硬编码 API Key、私钥直接推送到远端。
              </p>
              <div>${makePill("repo-security-review", "repo-security-review · Consensys 安全审查门禁")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <div class="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300">
                <span>📜 门禁四：开源协议传染与版权合规</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                基于 SPDX 规范与 Apache 基金会标准，防止 AI 照搬 GPL 传染性代码造成商业闭源项目协议污染。
              </p>
              <div>${makePill("license-compliance-audit", "license-compliance-audit · SPDX 协议合规审计")}</div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 交付透明度与披露配套技能：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("ai-disclosure-convention", "ai-disclosure-convention · 透明披露规范")}
              ${makePill("visible-ai-disclosure-pr-gate", "visible-ai-disclosure-pr-gate · PR 可视化披露门禁")}
              ${makePill("ai-provenance", "ai-provenance · AI 生产血统追溯")}
              ${makePill("skill-provenance-tracker", "skill-provenance-tracker · 技能调用溯源")}
              ${makePill("publish-prep-review", "publish-prep-review · 发布前综合预审")}
              ${makePill("vertu-seo-publish-gate", "vertu-seo-publish-gate · SEO 发布质检门禁")}
              ${makePill("gdpr-compliance-audit", "gdpr-compliance-audit · GDPR 权利合规审计")}
            </div>
          </div>
        </div>

        <!-- Section 3.5 -->
        <div id="sec-3-5" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.5 归档与守则 · 会话清理与完成铁律 (Post-Session & Meta)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            一个负责任的任务闭环，终止于严格的归档与铁律验证。在完成协同后，本地临时会话与日志需要得到安全清理，同时对文本适度润色，去除僵化套路的机械感，坚决遵循“未经硬性测试验证绝不宣称完成”的工程师道德准则。
          </p>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景对应技能武器库：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("verification-before-completion", "verification-before-completion · 完成铁律：硬性检验门禁")}
              ${makePill("humanizer", "humanizer · 人性化文本去套路润色")}
            </div>
          </div>
        </div>
      </section>

      <!-- Chapter 4 -->
      <section id="chapter-4" class="space-y-8 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 4 · 角色剧本</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            角色剧本：普通人的一日安全工作流
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            如何把这 43 个技能组装成符合你日常工作节奏的自卫链条？以下是三种典型身份的真实一日实操演练。
          </p>
        </div>

        <!-- Section 4.1 -->
        <div id="sec-4-1" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 scroll-mt-28">
          <div class="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
            <span>🎓 剧本一：高校研究生与学术研究者的一天</span>
          </div>
          <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
            <li><strong>上午 09:30 · 开题检索与文献查新：</strong>在将未发表的学术设想输入 AI 前，调用 ${makePill("scholar-safety", "scholar-safety")} 建立沙盒防护，避免实验思路被云端采集为共有语料。</li>
            <li><strong>下午 14:00 · 论文引文与事实核对：</strong>模型输出文献综述后，绝不直接采信。调用 ${makePill("bibref-verify", "bibref-verify")} 自动请求 CrossRef API 校验每个引文的 DOI 与刊发记录，用 ${makePill("the-judge", "the-judge")} 进行证据链交叉质证。</li>
            <li><strong>傍晚 17:30 · 论文交付与透明度声明：</strong>在向期刊或导师提交最终稿时，调用 ${makePill("ai-disclosure-convention", "ai-disclosure-convention")} 诚实附带符合作者贡献分类（Nature CRediT）的透明度附录，赢得同行评议的完全信任。</li>
          </ol>
        </div>

        <!-- Section 4.2 -->
        <div id="sec-4-2" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 scroll-mt-28">
          <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
            <span>💻 剧本二：软件工程师与开源开发者的一天</span>
          </div>
          <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
            <li><strong>上午 10:00 · 业务逻辑与缺陷调试：</strong>通过 ${makePill("pii-safe-documents", "pii-safe-documents")} 自动清洗内部数据库连接串与真实用户日志，将脱敏后的代码片段交由智能体分析。</li>
            <li><strong>下午 15:30 · 系统架构重构与红队评审：</strong>当模型信誓旦旦声称某种分布式方案“毫无死角”时，唤起 ${makePill("red-team-review", "red-team-review")} 与 ${makePill("sycophancy-challenger", "sycophancy-challenger")}，强制模型站在黑客攻击者的视角挖掘架构漏洞。</li>
            <li><strong>晚上 19:00 · 代码提交与发布门禁：</strong>在发起 Pull Request 前，本地触发 ${makePill("repo-security-review", "repo-security-review")} 扫描敏感密钥，并经由 ${makePill("license-compliance-audit", "license-compliance-audit")} 拦截潜在 GPL 协议污染，执行 ${makePill("verification-before-completion", "verification-before-completion")} 硬性测试全绿后再合并。</li>
          </ol>
        </div>

        <!-- Section 4.3 -->
        <div id="sec-4-3" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 scroll-mt-28">
          <div class="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-base">
            <span>✍️ 剧本三：文案策划与内容创作者的一天</span>
          </div>
          <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
            <li><strong>上午 10:30 · 营销文案生成与头脑风暴：</strong>借助模型生成十组广告标题与落地页描述，用 ${makePill("humanizer", "humanizer")} 润色消除常见的 AI 八股文结构与模板词汇。</li>
            <li><strong>下午 16:00 · 广告法与营销主张法律门禁：</strong>在交由设计和投放团队前，使用 ${makePill("marketing-claims-review", "marketing-claims-review")} 逐句扫描文案中的绝对化宣传与未证实主张，确保符合 FTC 标准与广告法规。</li>
            <li><strong>下班前 18:00 · 页面无障碍与交付核准：</strong>如果是前端推广页面，执行 ${makePill("web-accessibility", "web-accessibility")} 验证屏幕阅读器支持度，做到合规无风险上线。</li>
          </ol>
        </div>
      </section>

      <!-- Chapter 5 -->
      <section id="chapter-5" class="space-y-6 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 5 · 倡导与共建</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            倡导与共建：数字自卫从个人走向社群
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            在这个大模型与智能体以指数级速度演进的时代，没有哪一个单一组织或工具能够提供永恒的安全保护。真正的防线，建立在每一个普通人的数字素养与群体自卫意识之上。
          </p>
          <p class="leading-relaxed">
            作为 <a href="https://putongren.org" target="_blank" class="text-brand font-bold hover:underline">普通人的数字权利 (putongren.org)</a> 社区的重要组成部分，本项目始终坚持<strong>“完全开源、不造黑话、实证可查、服务大众”</strong>的底线。
          </p>

          <div class="p-6 rounded-2xl bg-gradient-to-br from-brand/10 via-purple-500/5 to-transparent border border-brand/20 space-y-4 my-6">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">🤝 如何加入并共建本指南与工具库？</h3>
            <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-2">
              <li><strong>推荐优秀的防采集 / 事实核验开源技能：</strong>如果你在日常实践中发现符合 SKILL.md 规范的高质量自卫工具，欢迎在 GitHub 提交 Issue 或 PR。</li>
              <li><strong>分享你的踩坑案例与审计经验：</strong>模型又在哪些具体专业领域“自信地胡说八道”？你是如何识别并阻断它的？你的每一次反馈都在丰富整个社区的免疫系统。</li>
              <li><strong>在你的团队与社群中推行门禁：</strong>把“不直接采信未核验的 AI 文本”、“交付成果主动附带证据锚点”作为团队的现代职业共识。</li>
            </ul>
            <div class="pt-2 flex flex-wrap gap-3">
              <a href="index.html" class="btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5">
                <span>🛡️ 立即探索 43 项开源技能</span>
              </a>
              <a href="https://putongren.org" target="_blank" class="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <span>🌐 访问 putongren.org 社区</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `
  },
  en: {
    pageTitle: "Practical Field Guide - Digital Rights for All · Responsible & Safe AI Use",
    navBrandTitle: "Responsible & Safe AI Use",
    navBrandSub: "Digital Rights for All Community Project",
    navLinkHome: "Directory",
    navLinkGuide: "Field Guide",
    navLinkAbout: "About Us",
    navLinkPutongren: "putongren.org",
    tLangBtn: "中文",

    heroBadge: "Digital Rights for All · Practical Field Guide",
    heroTitle: "Responsible & Safe AI Use: ",
    heroTitleHighlight: "A Field Guide for Everyone",
    heroSubtitle: "From blind faith in AI hype to hands-on defensive tools. This comprehensive narrative unpacks why this curated library matters, how to break abstract ethics into practical guardrails, and how 43 vetted skills solve concrete dilemmas in your daily workflow.",
    metaReadTime: "Est. Read: 15 min",
    metaSkillsCount: "Covers 43 Open-Source Skills",
    metaScenarios: "5 Core Workflow Scenarios",
    heroCtaPlaybook: "Jump to Field Playbook ⬇",
    heroCtaLibrary: "Explore Search Library ↗",

    tocTitle: "📖 TABLE OF CONTENTS",
    sidebarBoxDesc: "💡 Any skill marked with 🛡️ can be clicked to view its verified status, international standards, and install command inline.",
    sidebarBoxLink: "Go to Interactive Library ↗",

    // Chapter HTML Content (English)
    bodyHtml: `
      <!-- Chapter 1 -->
      <section id="chapter-1" class="space-y-6 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 1 · PROLOGUE</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Everyday Citizens in the Algorithmic Era: Why Care?
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            Generative AI and large language models (LLMs) are reshaping knowledge work at unprecedented velocity. Whether drafting research summaries, debugging production code, analyzing business proposals, or generating marketing content, we are constantly inputting fragments of our intellectual labor into commercial AI black boxes.
          </p>

          <p class="leading-relaxed font-medium text-slate-800 dark:text-slate-100">
            Behind the high-tech euphoria, ordinary users face alarming, asymmetric vulnerabilities:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
              <div class="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                <span>⚠️ Silent Loss of Data Sovereignty</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Commercial AI providers quietly harvest user prompts, unpublished drafts, proprietary code, and personal queries into next-generation training corpora via dense terms of service and pre-checked opt-ins. Everyday users become unpaid training miners.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
              <div class="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-sm">
                <span>⚠️ Confident Falsehoods & Cognitive Surrender</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The greatest danger of LLMs is not obvious failure, but <strong>fabricating falsehoods with authoritative, eloquent conviction</strong>. From fabricated DOIs and phantom legal statutes to sycophantic praise, models subtly coax humans into surrendering critical scrutiny.
              </p>
            </div>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            Why Reject Toothless, Abstract AI Principles?
          </h3>
          <p class="leading-relaxed">
            Existing governance dialogues often dwell in ivory towers or corporate PR whitepapers. Grand slogans like "fairness, transparency, and accountability" offer zero defense when an everyday knowledge worker sits before a blinking chat prompt.
          </p>
          <p class="leading-relaxed">
            <strong>This curated repository and field guide exist to place tactical shields and verification rulers directly into people's hands.</strong> Rather than inventing buzzwords, we curate 43 production-tested, standard-aligned open-source SKILL.md packages to provide tangible defense in your daily workflow.
          </p>
        </div>
      </section>

      <!-- Chapter 2 -->
      <section id="chapter-2" class="space-y-6 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 2 · DECONSTRUCTION</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Deconstruction: How We Structure "Responsible & Safe AI Use"
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-5">
          <p class="leading-relaxed">
            What does it practically mean to use AI safely and responsibly? We translate abstract ethics into <strong>Two Defensive Perimeters × Four Core Questions × A Closed-Loop Workflow</strong>:
          </p>

          <!-- Two Defensive Lines Card -->
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🛡️ Two Defensive Perimeters</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-teal-200 dark:border-teal-900/60 space-y-1.5">
                <span class="text-xs font-bold text-teal-700 dark:text-teal-400">1. Inward: Self-Defense & Boundary Protection</span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Scrub and sandbox sensitive data before it leaves your local machine; maintain critical adversarial skepticism during conversation and never abdicate human agency.
                </p>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
                <span class="text-xs font-bold text-indigo-700 dark:text-indigo-400">2. Outward: Third-Party Independent Verifiability</span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Responsibility is respect for colleagues and society. When delivering AI-assisted work, always attach primary evidence chains and reasoning trails so anyone can audit and falsify your results.
                </p>
              </div>
            </div>
          </div>

          <!-- Four Practical Questions Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            The 4 Core Life-Cycle Questions
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">Practical Question</th>
                  <th class="py-3 px-4">Core Vulnerability Addressed</th>
                  <th class="py-3 px-4">Authoritative Alignment</th>
                  <th class="py-3 px-4">Skills</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">1. What can I feed to AI?</td>
                  <td class="py-3 px-4">PII harvesting, trade secrets, skill poisoning</td>
                  <td class="py-3 px-4">Microsoft Presidio, NIST Privacy Framework</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 items</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">2. Which answers can I trust?</td>
                  <td class="py-3 px-4">Phantom DOIs, citation drift, hallucinated claims</td>
                  <td class="py-3 px-4">CrossRef/PubMed DOI standards, Nature fact-checking</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 items</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">3. When NOT to listen to AI?</td>
                  <td class="py-3 px-4">Breaking sycophancy, devil's advocate scrutiny</td>
                  <td class="py-3 px-4">Anthropic Adversarial Eval, IEEE Bias Benchmarks</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 items</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">4. Can output be published directly?</td>
                  <td class="py-3 px-4">FTC marketing rules, WCAG accessibility, OWASP secrets, SPDX</td>
                  <td class="py-3 px-4">FTC 16 CFR Part 255, W3C WCAG 2.1 AA, OWASP, SPDX</td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">13 items</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Chapter 3 -->
      <section id="chapter-3" class="space-y-12 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 3 · FIELD PLAYBOOK</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Field Playbook: How 43 Skills Solve Real-World Dilemmas
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Skills are not abstract list items. Across these 5 practical stages, each skill serves as a surgical instrument.
          </p>
        </div>

        <!-- Section 3.1 -->
        <div id="sec-3-1" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.1 Pre-Input · Anti-Harvesting & Skill Sanitization</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Before pasting any draft containing real names, internal IDs, or medical logs into a prompt, data leaves your boundary. Once sent, control is gone. Furthermore, untrusted third-party agent skills may harbor prompt injection or local file exfiltration risks.
          </p>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Curated Pre-Input Skills (Click to view verified evidence):</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("pii-safe-documents", "pii-safe-documents · PII Redaction")}
              ${makePill("presidio-anonymize-text", "presidio-anonymize-text · Microsoft Presidio Anonymizer")}
              ${makePill("pii-detection-pipeline", "pii-detection-pipeline · PII Detection Pipeline")}
              ${makePill("skill-sanitizer", "skill-sanitizer · Input Sanitization")}
              ${makePill("openmed-clinical-ingestion", "openmed-clinical-ingestion · Clinical Privacy Ingestion")}
              ${makePill("skillguard", "skillguard · Skill Static Security Checker")}
              ${makePill("skill-sentinel", "skill-sentinel · Prompt Injection Sentinel")}
              ${makePill("security-threat-model", "security-threat-model · Threat Modeling Gate")}
              ${makePill("scholar-safety", "scholar-safety · Academic Privacy Isolation")}
              ${makePill("nova-proximity", "nova-proximity · Boundary Leak Monitor")}
            </div>
          </div>
        </div>

        <!-- Section 3.2 -->
        <div id="sec-3-2" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.2 During-Chat · Exposing Hallucinations & Phantom Papers</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            LLMs generate structured citations with plausible titles and authors. Yet, when queried, the DOIs lead to 404s or completely unrelated topics. This is probabilistic paper hallucination.
          </p>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Verification & Fact-Checking Skills:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("bibref-verify", "bibref-verify · BibTeX Reference Verifier")}
              ${makePill("citation-verifier", "citation-verifier · Citation Cross-Checker")}
              ${makePill("citation-faithfulness-checker", "citation-faithfulness-checker · Faithfulness Verifier")}
              ${makePill("citation-integrity-auditor", "citation-integrity-auditor · Integrity Auditor")}
              ${makePill("claim-source-fact-checker", "claim-source-fact-checker · Claim Source Checker")}
              ${makePill("post-generation-fact-check", "post-generation-fact-check · Post-Gen Fact Check")}
              ${makePill("vectara-hallucination-corrector", "vectara-hallucination-corrector · Hallucination Corrector")}
              ${makePill("hallucination-risk-reviewer", "hallucination-risk-reviewer · Risk Reviewer")}
              ${makePill("kdense-peer-review", "kdense-peer-review · Rigorous Peer Review")}
              ${makePill("the-judge", "the-judge · Judicial Logic Cross-Exam")}
            </div>
          </div>
        </div>

        <!-- Section 3.3 -->
        <div id="sec-3-3" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.3 During-Chat · Breaking Sycophancy & Confirmation Bias</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Trained on human reinforcement feedback, models tend to validate whatever premise the user suggests. To escape this echo chamber, introduce deliberate devil's advocates and adversarial red teams.
          </p>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Anti-Sycophancy & Red-Teaming Skills:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("sycophancy-challenger", "sycophancy-challenger · Sycophancy Challenger")}
              ${makePill("anti-sycophancy-molly", "anti-sycophancy-molly · Uncompromising Truth Guard")}
              ${makePill("devils-advocate-mad-skills", "devils-advocate-mad-skills · Devil's Advocate Scrutiny")}
              ${makePill("devils-advocate-reviewer", "devils-advocate-reviewer · Critical Adversarial Review")}
              ${makePill("godfly-opposing-counsel", "godfly-opposing-counsel · Opposing Counsel Drill")}
              ${makePill("the-fool", "the-fool · Unfiltered Socratic Questioner")}
              ${makePill("the-jury", "the-jury · Multi-Role Jury Panel")}
              ${makePill("red-team-review", "red-team-review · Adversarial Vulnerability Probe")}
              ${makePill("discernment-nudge", "discernment-nudge · Discernment Nudge")}
              ${makePill("receiving-code-review", "receiving-code-review · Objective Review Intake")}
            </div>
          </div>
        </div>

        <!-- Section 3.4 -->
        <div id="sec-3-4" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.4 Pre-Handoff · Four Statutory Release Gates</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Before shipping code or publishing AI-assisted copy, verify four mandatory compliance gates: substantiation of claims, accessibility for disabled users, secret token leakage, and open-source license purity.
          </p>

          <!-- 4 Statutory Gates Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">📢 Gate 1: Marketing & Claim Substantiation</span>
              <p class="text-xs text-slate-600 dark:text-slate-400">Enforce FTC substantiation standards and advertising truthfulness.</p>
              <div>${makePill("marketing-claims-review", "marketing-claims-review · FTC & Ad Substantiation")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">♿ Gate 2: Digital Inclusion & Web Accessibility</span>
              <p class="text-xs text-slate-600 dark:text-slate-400">Block inaccessible code lacking ARIA labels or keyboard navigation (W3C WCAG 2.1 AA).</p>
              <div>${makePill("web-accessibility", "web-accessibility · W3C WCAG 2.1 AA")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">🔑 Gate 3: Credential & Secret Leakage Barrier</span>
              <p class="text-xs text-slate-600 dark:text-slate-400">Scan for hardcoded API keys and private tokens via Gitleaks & OWASP rules.</p>
              <div>${makePill("repo-security-review", "repo-security-review · Consensys Security Gate")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700 space-y-2">
              <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">📜 Gate 4: License & Copyright Compliance</span>
              <p class="text-xs text-slate-600 dark:text-slate-400">Audit SPDX license compatibility to prevent copyleft pollution in proprietary repos.</p>
              <div>${makePill("license-compliance-audit", "license-compliance-audit · SPDX License Audit")}</div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Delivery Provenance & Disclosure Skills:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("ai-disclosure-convention", "ai-disclosure-convention · Disclosure Standard")}
              ${makePill("visible-ai-disclosure-pr-gate", "visible-ai-disclosure-pr-gate · PR Disclosure Gate")}
              ${makePill("ai-provenance", "ai-provenance · Provenance Tracking")}
              ${makePill("skill-provenance-tracker", "skill-provenance-tracker · Skill Lineage Tracker")}
              ${makePill("publish-prep-review", "publish-prep-review · Pre-Publish Audit")}
              ${makePill("vertu-seo-publish-gate", "vertu-seo-publish-gate · SEO Publish Gate")}
              ${makePill("gdpr-compliance-audit", "gdpr-compliance-audit · GDPR Compliance Audit")}
            </div>
          </div>
        </div>

        <!-- Section 3.5 -->
        <div id="sec-3-5" class="space-y-4 scroll-mt-28">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>3.5 Post-Session & Meta · Session Hygiene & The Iron Law</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Close the loop by sanitizing local artifacts, de-templatizing repetitive AI phrasing, and honoring the Iron Law: never declare completion without rigorous test verification.
          </p>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Post-Session & Verification Skills:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("verification-before-completion", "verification-before-completion · The Iron Law")}
              ${makePill("humanizer", "humanizer · De-templatize Phrasing")}
            </div>
          </div>
        </div>
      </section>

      <!-- Chapter 4 -->
      <section id="chapter-4" class="space-y-8 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 4 · SCENARIO PLAYBOOKS</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Scenario Playbooks: A Day in the Life of a Citizen User
          </h2>
        </div>

        <div id="sec-4-1" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 scroll-mt-28">
          <span class="text-indigo-600 dark:text-indigo-400 font-bold text-base">🎓 Playbook 1: Researchers & Students</span>
          <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-1">
            <li><strong>09:30 AM · Safe Ingestion:</strong> Activate ${makePill("scholar-safety", "scholar-safety")} to ensure novel thesis premises aren't ingested into commercial training corpora.</li>
            <li><strong>02:00 PM · DOI Verification:</strong> Verify every citation against CrossRef with ${makePill("bibref-verify", "bibref-verify")}, and cross-examine evidence chains using ${makePill("the-judge", "the-judge")}.</li>
            <li><strong>05:30 PM · Honest Contribution Disclosure:</strong> Attach a Nature CRediT statement using ${makePill("ai-disclosure-convention", "ai-disclosure-convention")} before submitting to peer review.</li>
          </ol>
        </div>

        <div id="sec-4-2" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 scroll-mt-28">
          <span class="text-emerald-600 dark:text-emerald-400 font-bold text-base">💻 Playbook 2: Software Engineers & Tech Leads</span>
          <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-1">
            <li><strong>10:00 AM · Scrub Bug Traces:</strong> Strip internal IPs and keys with ${makePill("pii-safe-documents", "pii-safe-documents")} before asking LLMs for stack trace analysis.</li>
            <li><strong>03:30 PM · Adversarial Architecture Probe:</strong> Challenge confident architectural recommendations via ${makePill("red-team-review", "red-team-review")} and ${makePill("sycophancy-challenger", "sycophancy-challenger")}.</li>
            <li><strong>07:00 PM · PR Security & License Gate:</strong> Run ${makePill("repo-security-review", "repo-security-review")} and ${makePill("license-compliance-audit", "license-compliance-audit")} before merging, under ${makePill("verification-before-completion", "verification-before-completion")}.</li>
          </ol>
        </div>

        <div id="sec-4-3" class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 scroll-mt-28">
          <span class="text-amber-600 dark:text-amber-400 font-bold text-base">✍️ Playbook 3: Writers & Marketers</span>
          <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-1">
            <li><strong>10:30 AM · Drafting & Humanization:</strong> Generate headlines, then eliminate robotic tropes with ${makePill("humanizer", "humanizer")}.</li>
            <li><strong>04:00 PM · FTC & Legal Substantiation:</strong> Audit claims against FTC advertising standards using ${makePill("marketing-claims-review", "marketing-claims-review")}.</li>
            <li><strong>06:00 PM · Accessibility Check:</strong> Validate screen-reader accessibility with ${makePill("web-accessibility", "web-accessibility")} before campaign launch.</li>
          </ol>
        </div>
      </section>

      <!-- Chapter 5 -->
      <section id="chapter-5" class="space-y-6 pt-4 scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 5 · ADVOCACY</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Advocacy & Co-Creation: Digital Self-Defense as a Collective Act
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            In an era where models evolve exponentially, no single tool can guarantee immunity. Real defense stems from informed user habits and community stewardship.
          </p>
          <p class="leading-relaxed">
            As part of <a href="https://putongren.org" target="_blank" class="text-brand font-bold hover:underline">putongren.org (Digital Rights for All)</a>, this repository adheres to open-source transparency, zero buzzwords, and verifiable evidence.
          </p>

          <div class="p-6 rounded-2xl bg-gradient-to-br from-brand/10 via-purple-500/5 to-transparent border border-brand/20 space-y-4 my-6">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">🤝 How to Join & Contribute:</h3>
            <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-2">
              <li><strong>Submit Open-Source Skills:</strong> Found a robust anti-harvesting or fact-checking skill conforming to SKILL.md? Open a PR on GitHub.</li>
              <li><strong>Share Hallucination Audit Records:</strong> Share real-world prompt traps and adversarial tests to enrich community immune defense.</li>
              <li><strong>Promote Pre-Release Gates in Your Team:</strong> Establish verifiable AI evidence trails as modern professional standards.</li>
            </ul>
            <div class="pt-2 flex flex-wrap gap-3">
              <a href="index.html" class="btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5">
                <span>🛡️ Explore 43 Curated Skills</span>
              </a>
              <a href="https://putongren.org" target="_blank" class="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <span>🌐 Visit putongren.org Community</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `
  }
};

// Update UI based on language
function updateUI() {
  const t = guideContent[currentLang];
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

  document.title = t.pageTitle;
  setText("nav-brand-title", t.navBrandTitle);
  setText("nav-brand-sub", t.navBrandSub);
  setText("nav-link-home", t.navLinkHome);
  setText("nav-link-guide", t.navLinkGuide);
  setText("nav-link-about", t.navLinkAbout);
  setText("nav-link-putongren", t.navLinkPutongren);
  setText("m-nav-home", t.navLinkHome);
  setText("m-nav-guide", t.navLinkGuide);
  setText("m-nav-about", t.navLinkAbout);
  setText("m-nav-putongren", currentLang === "zh" ? "官网 ↗" : "Site ↗");
  setText("t-lang-btn", t.tLangBtn);

  // Hero
  setText("hero-badge", t.heroBadge);
  setText("hero-title", t.heroTitle);
  setText("hero-title-highlight", t.heroTitleHighlight);
  setText("hero-subtitle", t.heroSubtitle);
  setText("meta-read-time", t.metaReadTime);
  setText("meta-skills-count", t.metaSkillsCount);
  setText("meta-scenarios", t.metaScenarios);
  setText("hero-cta-playbook", t.heroCtaPlaybook);
  setText("hero-cta-library", t.heroCtaLibrary);

  // TOC
  setText("toc-title", t.tocTitle);
  setText("sidebar-box-desc", t.sidebarBoxDesc);
  setText("sidebar-box-link", t.sidebarBoxLink);

  // Body HTML
  setHtml("narrative-content", t.bodyHtml);

  // Footer links
  setText("footer-link-home", t.navLinkHome);
  setText("footer-link-guide", t.navLinkGuide);
  setText("footer-link-about", t.navLinkAbout);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
