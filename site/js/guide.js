// Guide Page Logic & Interactive Narrative Engine
// Responsible & Safe AI Use · Digital Rights for All

let currentLang = localStorage.getItem("rai_lang") || "zh";
let itemsData = [];
let itemsById = {};
let incidentsData = [];
let incidentsById = {};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  setupEventListeners();
  await Promise.all([loadItems(), loadIncidents()]);
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
    const res = await fetch("data/items.json");
    itemsData = await res.json();
    itemsById = {};
    itemsData.forEach(item => {
      itemsById[item.id] = item;
    });
  } catch (err) {
    console.error("Failed to load items.json:", err);
  }
}

// Load incidents.json
async function loadIncidents() {
  try {
    const res = await fetch("data/incidents.json");
    incidentsData = await res.json();
    incidentsById = {};
    incidentsData.forEach(inc => {
      incidentsById[inc.id] = inc;
    });
  } catch (err) {
    console.error("Failed to load incidents.json:", err);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Listen to unified language toggle from layout.js
  window.addEventListener("site-language-change", (e) => {
    currentLang = e.detail.lang;
    updateUI();
  });

  // Modal Close
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("guide-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "guide-modal") closeModal();
  });
  document.getElementById("incident-modal-close")?.addEventListener("click", closeIncidentModal);
  document.getElementById("incident-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "incident-modal") closeIncidentModal();
    const skillPill = e.target.closest(".inline-skill-pill");
    if (skillPill) {
      const skillId = skillPill.getAttribute("data-skill");
      if (skillId && itemsById[skillId]) {
        closeIncidentModal();
        openModal(skillId);
      }
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeIncidentModal();
    }
  });

  // Modal Copy Button
  document.getElementById("modal-copy-btn")?.addEventListener("click", () => {
    const activeSkillId = document.getElementById("guide-modal")?.getAttribute("data-active-skill");
    if (!activeSkillId || !itemsById[activeSkillId]) return;
    const item = itemsById[activeSkillId];
    const cmd = item.action_content || item.install?.action_content || `curl -sL ${item.url}/raw/main/SKILL.md -o .agents/skills/${item.id}/SKILL.md`;
    navigator.clipboard.writeText(cmd).then(() => {
      const copyTextEl = document.getElementById("modal-copy-text");
      const originalText = copyTextEl.textContent;
      copyTextEl.textContent = currentLang === "zh" ? "✅ 已复制命令！" : "✅ Command Copied!";
      setTimeout(() => {
        copyTextEl.textContent = originalText;
      }, 2000);
    });
  });

  // Delegate inline skill & incident pill clicks
  document.getElementById("narrative-content")?.addEventListener("click", (e) => {
    const pill = e.target.closest(".inline-skill-pill");
    if (pill) {
      const skillId = pill.getAttribute("data-skill");
      if (skillId && itemsById[skillId]) {
        openModal(skillId);
        return;
      }
    }
    const incPill = e.target.closest(".inline-incident-pill");
    if (incPill && incPill.tagName === "BUTTON") {
      const incId = incPill.getAttribute("data-incident");
      if (incId && incidentsById[incId]) {
        openIncidentModal(incId);
        return;
      }
    }
  });

  // Mobile TOC drawer: close drawer when any link is clicked
  document.getElementById("mobile-toc-nav")?.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) {
      const details = document.getElementById("mobile-toc-details");
      if (details) details.removeAttribute("open");
    }
  });

  // Responsive adaptive details switcher on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      syncAdaptiveDetails();
    }, 100);
  });
}

// Scrollspy and Reading Progress Tracking
function setupScrollTracking() {
  const progressBar = document.getElementById("reading-progress");
  const progressText = document.getElementById("toc-progress-text");
  const mobileProgressText = document.getElementById("mobile-toc-progress-text");
  const mobileActiveTitle = document.getElementById("mobile-toc-active-title");
  const tocLinks = document.querySelectorAll(".guide-toc-link");

  // Only update progress bar via JS in browsers lacking CSS scroll-driven animation support (e.g. Firefox)
  const needsJsFallback = !CSS.supports("animation-timeline", "scroll()");

  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollPos / docHeight) * 100))) : 0;

    // JS fallback for progress bar
    if (needsJsFallback && progressBar) {
      progressBar.style.width = `${pct}%`;
      progressBar.setAttribute("aria-valuenow", pct);
    }

    // Progress text shown in desktop & mobile TOC
    if (progressText) {
      progressText.textContent = `${pct}%`;
    }
    if (mobileProgressText) {
      mobileProgressText.textContent = `${pct}%`;
    }

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
      // Mark matching active links in both desktop and mobile lists
      const currentTarget = currentSection.link.getAttribute("data-target");
      document.querySelectorAll(`.guide-toc-link[data-target="${currentTarget}"]`).forEach(l => l.classList.add("active"));
      if (mobileActiveTitle) {
        mobileActiveTitle.textContent = currentSection.link.textContent.trim();
      }
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
  const stdUrl = std.url || std.doc_url || item.url;
  const stdDesc = isZh ? (std.how_aligned_zh || std.mechanism_zh || "") : (std.how_aligned_en || std.mechanism_en || std.how_aligned_zh || std.mechanism_zh || "");

  // Third party reviews (array of objects in current schema)
  const reviews = Array.isArray(item.third_party_reviews) ? item.third_party_reviews : (item.third_party_reviews ? [item.third_party_reviews] : []);
  const hasReviews = reviews.length > 0;
  const firstRev = hasReviews ? reviews[0] : {};
  const revDirectUrl = firstRev.url || item.url;
  const revSource = firstRev.source || (isZh ? firstRev.review_source_zh : firstRev.review_source_en) || "";
  const revExcerpt = isZh ? (firstRev.excerpt_zh || firstRev.title_zh || "") : (firstRev.excerpt_en || firstRev.title_en || firstRev.excerpt_zh || "");

  // Why Care CN/EN
  const whyCareText = isZh ? (item.why_care_cn || item.why_care || "") : (item.why_care_en || item.why_care || item.why_care_cn || "");

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
        <span>🔬 ${isZh ? '验证状态：' : 'Verification: '}</span>
        <span class="font-medium">${escapeHtml(verifiedBy || (isZh ? "项目收录 · 语法/结构静态检验" : "Cataloged · Static Syntax & Structure Check"))}</span>
      </div>
    </div>

    <!-- Core Intent & Why Care -->
    <div class="space-y-2">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">${isZh ? '为什么普通人应该关心：' : 'Why You Should Care:'}</h4>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${escapeHtml(whyCareText)}</p>
    </div>

    <!-- Technical Standard Alignment -->
    <div class="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">
          ${isZh ? '技术依据与对齐标准：' : 'Standard Alignment:'} ${escapeHtml(stdOrg)}
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
          ${isZh ? '独立第三方评测与生态收录：' : 'Third-Party Reviews & Inclusions:'}
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
          ${isZh ? '开源社区独立实现，当前暂无独立第三方媒体长篇报道，由开发者在 GitHub 遵循开源规范透明维护。' : 'Community open-source implementation with standard-compliant GitHub maintenance; no dedicated independent media articles yet.'}
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
  jumpBtn.href = `library.html#${item.id}`;
  document.getElementById("modal-library-jump-text").textContent = isZh ? "在技能库中查看并筛选" : "View in Skill Library";

  // GitHub Source Link
  const ghBtn = document.getElementById("modal-github");
  ghBtn.href = item.url;
  document.getElementById("modal-source-text").textContent = isZh ? "GitHub 源码" : "GitHub Source";

  // Show modal with animation
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add("modal-open");
    });
  });
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  // Focus trap: make non-modal content inert
  modal._triggerElement = document.activeElement;
  document.querySelectorAll("body > *:not(#guide-modal)").forEach(el => {
    el.setAttribute("inert", "");
  });
  // Focus first interactive element
  setTimeout(() => {
    document.getElementById("modal-close")?.focus();
  }, 50);
}

function closeModal() {
  const modal = document.getElementById("guide-modal");
  if (!modal) return;
  modal.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
  // Release focus trap
  document.querySelectorAll("body > [inert]").forEach(el => {
    el.removeAttribute("inert");
  });
  setTimeout(() => {
    modal.style.display = "none";
  }, 220);
  document.body.style.overflow = "";
  // Restore focus to trigger element
  if (modal._triggerElement) {
    modal._triggerElement.focus();
  }
}

// Incident Modal Logic
function openIncidentModal(incidentId) {
  const inc = incidentsById[incidentId];
  if (!inc) return;

  const modal = document.getElementById("incident-modal");
  modal.setAttribute("data-active-incident", incidentId);
  const isZh = currentLang === "zh";

  // Badges
  const regionFlag = inc.region === "Domestic" ? "🇨🇳" : "🌐";
  const stanceBadge = inc.user_stance === "user_rights_infringed"
    ? (isZh ? "🛡️ 使用者权益受损" : "🛡️ User Rights Harmed")
    : (isZh ? "🚨 违规使用被追责" : "🚨 Irresponsible Use Penalized");
  const stanceClass = inc.user_stance === "user_rights_infringed"
    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800";

  const riskLabels = {
    input_risk: isZh ? "输入端风险" : "Input Risk",
    output_risk: isZh ? "输出端风险" : "Output Risk",
    execution_risk: isZh ? "执行端风险" : "Execution Risk"
  };
  const lifecycleBadgesHtml = (inc.lifecycle_risk_type || []).map(r => `
    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${riskLabels[r] || r}</span>
  `).join("");

  const badgesEl = document.getElementById("incident-modal-badges");
  badgesEl.innerHTML = `
    <span class="px-2 py-0.5 rounded-full text-xs font-bold border ${stanceClass}">${stanceBadge}</span>
    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${regionFlag} ${escapeHtml(inc.jurisdiction)}</span>
    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">${escapeHtml(isZh ? inc.risk_category_zh : inc.risk_category_en)}</span>
    <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">${escapeHtml(isZh ? inc.verification_level_zh : inc.verification_level_en)}</span>
    ${lifecycleBadgesHtml}
  `;

  document.getElementById("incident-modal-title").textContent = isZh ? inc.title_zh : inc.title_en;

  // Case Number Status Box
  let caseNoHtml = "";
  if (inc.case_number_status) {
    const c = inc.case_number_status;
    caseNoHtml = `
      <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="font-bold text-slate-700 dark:text-slate-200">${isZh ? '权威文号 / 案号：' : 'Authority / Case No:'}</span>
          <span class="font-mono text-slate-600 dark:text-slate-300 font-bold">${escapeHtml(c.actual_case_no || "")}</span>
        </div>
        ${c.fictitious_ai_case_no ? `
          <div class="text-rose-600 dark:text-rose-400 font-mono text-[11px] bg-rose-50 dark:bg-rose-950/40 p-2 rounded border border-rose-200/60 dark:border-rose-900/60 flex items-start gap-1.5">
            <span class="shrink-0 font-bold">⚠️</span>
            <span><strong>${isZh ? '反面警示：' : 'Warning: '}</strong>${escapeHtml(c.fictitious_ai_case_no)}</span>
          </div>
        ` : ''}
        ${c.authority ? `<div class="text-[11px] text-slate-500 dark:text-slate-400">${isZh ? '核发机构：' : 'Issuing Authority: '}${escapeHtml(c.authority)}</div>` : ''}
      </div>
    `;
  }

  // Countermeasure Skills buttons
  const skillsList = inc.links?.countermeasure_skills || [];
  const skillButtonsHtml = skillsList.map(sId => {
    const item = itemsById[sId];
    const name = item ? (isZh ? item.name : (item.name_en || item.name)) : sId;
    return `
      <button type="button" class="inline-skill-pill" data-skill="${sId}" title="${isZh ? '点击查看该防范技能' : 'Click to inspect skill'}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        <span>${escapeHtml(name)}</span>
      </button>
    `;
  }).join(" ");

  // Primary Sources
  const sourcesHtml = (inc.sources || []).map(src => `
    <a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
      <span>${escapeHtml(src.title)} (${escapeHtml(src.publisher || "")})</span>
      <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
    </a>
  `).join("<br>");

  // Modal Body HTML
  const bodyEl = document.getElementById("incident-modal-body");
  bodyEl.innerHTML = `
    ${caseNoHtml}

    <!-- Incident Summary -->
    <div class="space-y-1.5">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
        ${isZh ? '真实案件经过与事实：' : 'Case Facts & Context:'}
      </h4>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
        ${escapeHtml(isZh ? inc.summary_zh : inc.summary_en)}
      </p>
    </div>

    <!-- Legal Consequence / Penalty -->
    <div class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
      <h4 class="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
        <svg class="w-4 h-4 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        ${isZh ? '实质后果与法律 / 纪律惩处：' : 'Substantial Consequences & Sanctions:'}
      </h4>
      <p class="text-xs sm:text-sm text-rose-900 dark:text-rose-200 font-medium leading-relaxed">
        ${escapeHtml(isZh ? inc.consequence_zh : inc.consequence_en)}
      </p>
    </div>

    <!-- Key Takeaway for Everyday Users -->
    <div class="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
      <h4 class="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
        <span>💡</span>
        ${isZh ? '写给普通使用者的实操防范铁律：' : 'Practical Takeaway for Everyday Users:'}
      </h4>
      <p class="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
        ${escapeHtml(isZh ? inc.key_takeaway_zh : inc.key_takeaway_en)}
      </p>
    </div>

    <!-- Countermeasure Skills -->
    <div class="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
      <h4 class="text-xs font-bold text-indigo-900 dark:text-indigo-300">
        ${isZh ? '🛡️ 如何用开源技能防御此风险（点击查看技能详情）：' : '🛡️ Countermeasure Open Source Skills (Click to view):'}
      </h4>
      <div class="flex flex-wrap gap-1.5 pt-0.5">
        ${skillButtonsHtml || '<span class="text-xs text-slate-400">通用规范防御</span>'}
      </div>
    </div>

    <!-- Primary Source Links -->
    <div class="pt-1 text-xs space-y-1">
      <span class="font-bold text-slate-500 dark:text-slate-400">${isZh ? '第一手权威出处与裁判通报：' : 'Primary Source Documentation:'}</span>
      <div class="pt-1">${sourcesHtml}</div>
    </div>
  `;

  // Modal Footer
  const footerEl = document.getElementById("incident-modal-footer");
  const firstChapter = inc.links?.guide_chapters?.[0] || "chapter-1";
  footerEl.innerHTML = `
    <div class="flex items-center gap-2">
      <a href="#${firstChapter}" onclick="closeIncidentModal()" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
        <span>${isZh ? '跳转至指南对应章节 ➔' : 'Jump to Guide Chapter ➔'}</span>
      </a>
    </div>
    <div>
      <button onclick="closeIncidentModal()" class="btn-primary px-5 py-2 text-xs">
        <span>${isZh ? '关闭' : 'Close'}</span>
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
  document.querySelectorAll("body > *:not(#incident-modal):not(#guide-modal)").forEach(el => {
    el.setAttribute("inert", "");
  });
  setTimeout(() => {
    document.getElementById("incident-modal-close")?.focus();
  }, 50);
}

function closeIncidentModal() {
  const modal = document.getElementById("incident-modal");
  if (!modal) return;
  modal.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
  document.querySelectorAll("body > [inert]").forEach(el => {
    el.removeAttribute("inert");
  });
  setTimeout(() => {
    modal.style.display = "none";
  }, 220);
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

// Helper to render interactive pill in text (Clean SVG micro-badge, no raw emoji)
function makePill(skillId, label) {
  return `<button type="button" class="inline-skill-pill" data-skill="${skillId}" title="点击查看 ${skillId} 的完整实测状态与标准依据"><svg width="13" height="13" style="width:13px;height:13px;min-width:13px;max-width:13px;display:inline-block;flex-shrink:0;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span>${escapeHtml(label || skillId)}</span></button>`;
}

// Helper to render interactive incident pill in text (External link to incidents.html?id=...)
function makeIncidentPill(incidentId, label) {
  return `<a href="incidents.html?id=${encodeURIComponent(incidentId)}" target="_blank" rel="noopener noreferrer" class="inline-incident-pill" data-incident="${incidentId}" title="在新窗口查看真实案例详情与裁判依据"><svg width="12" height="12" style="width:12px;height:12px;min-width:12px;max-width:12px;display:inline-block;flex-shrink:0;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>${escapeHtml(label || incidentId)}</span><svg width="10" height="10" style="width:10px;height:10px;margin-left:2px;display:inline-block;opacity:0.7;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`;
}

// Bilingual Narrative Content Dictionary
const guideContent = {
  zh: {
    pageTitle: "负责任与安全使用 AI 实务指南 - 普通人的数字权利 · Practical Field Guide",
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkGuide: "实务指南",
    navLinkLibrary: "技能库",
    navLinkIncidents: "真实案例库",
    navLinkPutongren: "普通人的数字权利 官网",
    footerLinkIncidents: "真实案例库",
    tLangBtn: "English",

    heroBadge: "普通人的数字权利 · 实务行动指南",
    heroTitle: "负责任与安全使用 AI：",
    heroTitleHighlight: "普通人的实操指南",
    heroSubtitle: "写给每天都在使用 AI 的普通人：先学会保护个人隐私与数据边界，再让工作成果经得起第三方核验。从日常对话防采集到生产成果防翻车的开源实操手册。",
    metaReadTime: "建议阅读：快速上手 3 分钟 · 全文精读约 35 分钟",
    metaSkillsCount: "44 项开源规范技能",
    metaScenarios: "6 大核心工作流场景",
    heroCtaPlaybook: "开始阅读实战指南",
    heroCtaLibrary: "浏览 44 项实务技能库",

    tocTitle: "章节导航 (TOC)",
    sidebarBoxDesc: "行文中任何带有技能徽章的名称，点击即可原地查看实测状态、标准依据与安装命令。",
    sidebarBoxLink: "前往实务技能库交互筛选 ↗",

    // Chapter HTML Content
    bodyHtml: `
      <!-- Chapter 1 -->
      <section id="chapter-1" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 1 · 序幕</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            算法时代的平民处境：我们为什么要关心这件事？
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            今天，大语言模型（LLM）与生成式人工智能正以不可逆转的速度渗透进每一个人的工作与生活。无论是写一份周报、整理学术文献、编写一段业务代码，还是起草一份营销文案，我们都在被动或主动地向这些“黑盒”输入自己的工作内容、私人数据与未公开构想。
          </p>

          <p class="leading-relaxed font-medium text-slate-800 dark:text-slate-100">
            然而，在喧嚣的科技狂欢之下，普通人正在承担着前所未有的不对称风险——这些风险不是假设，而是已有严肃实证与司法判例支持的客观现实：
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs">
              <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>隐形危机一：数据主权与准标识符马赛克拼图</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                即使你在单次对话中没有说出自己的名字，长期使用同一账户输入的年龄、城市、职业困惑、技术选型等“准标识符”（Quasi-identifiers），在向量数据库中也能轻松拼接出完整的个人数字画像。免费工具的背后，每一个普通人都在充当不领薪水的训练矿工。
              </p>
            </div>

            <div class="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs">
              <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>隐形危机二：自信幻觉与认知依附 (MIT/Stanford 实证)</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                认知神经科学与人机交互研究（如 MIT Media Lab 2025 年预印本《Your Brain on ChatGPT》及 Anthropic 谄媚性研究）提示：当过度把推理完全委托给 AI 代写时，可能产生即时记忆与注意力留存不足等“认知负担”（实验中深度依赖模型的测试组参与者多达 15/18 人难以准确引用刚生成的关键要点）。加之模型的<strong>谄媚倾向（Sycophancy，顺从讨好用户偏好）</strong>，若缺乏主动核查与批判反思，个人的独立审校与求证本能可能受到干扰。
              </p>
            </div>
          </div>

          <!-- Structured Legal Precedents Section -->
          <div class="my-6 space-y-3.5">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span>现实司法前车之鉴：盲信 AI 的全球与本土法律代价</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">5 起典型实证</span>
            </div>

            <div class="space-y-3">
              <!-- Case 1: Beijing Voice Infringement -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🇨🇳 本土声音侵权第一案</span>
                    <a href="https://www.bjinternetcourt.gov.cn/cpws/default/detail.html" target="_blank" class="text-xs font-bold text-slate-900 dark:text-white hover:text-brand transition-colors">北京互联网法院 (2023)京0491民初12142号 ↗</a>
                    <span class="text-[10px] text-slate-400 font-mono">最高法案例库 2025-07-2-474-001</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">判赔 25 万元</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>发生了什么
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      配音演员的录音制品被软件公司未经单独明示许可提取声音特征，用于训练开发商业级 AI 文本转语音 (TTS) 产品并在多平台销售获利。
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>结果与对你的启示
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      法院裁定自然人声音权益独立于录音制品著作权，未经单独明示授权不得将录音制作成 AI 商业模型。<strong>警示：取得同事录音或客户素材的使用权限，绝不代表可以随意上传投喂给 AI！</strong>
                    </p>
                    <div class="pt-1.5">
                      ${makeIncidentPill('case-ai-voice-bj-2023', '查看殷某某案完整判决与防御要点 ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 2: Nanjing Internet Court Defamation -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🇨🇳 AI 检索加工名誉权案</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">李小亮诉百度“AI智能回答”名誉侵权案（南京中院终审）</span>
                    <span class="text-[10px] text-slate-400 font-mono">江苏高院公开通报</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">承担名誉侵权全责</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>发生了什么
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      某平台“AI 智能回答”功能在抓取整合网络碎片时发生严重幻觉拼接，错误生成某当事人“因爆炸罪被判处三年有期徒刑”并附带其真实工作肖像。
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>结果与对你的启示
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      法院认定 AI 检索整合属于“内容产出”，平台收到受害人侵权通知未及时采取阻断措施须负全责。北京互联网法院 2026 年亦审结多起传播未核验 AI 虚构内容构成名誉侵权的纠纷。
                    </p>
                  </div>
                </div>
              </div>

              <!-- Case 3: Supreme People's Court Rules -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🇨🇳 最高法裁判指引</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">《关于依法审理涉人工智能纠纷案件的意见》</span>
                    <span class="text-[10px] text-slate-400 font-mono">法发〔2026〕10号 (2026-09-07)</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900">罚款·拘留·追究刑责</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>发生了什么
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      诉讼参与人使用 AI 辅助撰写文书必须严格核实内容真实性并如实向法庭说明；严禁利用大模型伪造证据、编造虚构法律判例与事实。
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>结果与对你的启示
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      利用 AI 制造虚假诉讼的，依据《民事诉讼法》第 114 条采取严厉制裁。“这是 AI 生成的”绝非免责金牌，提交者承担 100% 的法律穿透责任。
                    </p>
                    <div class="pt-1.5 flex flex-wrap gap-1.5">
                      ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', '北京通州案号批评案 ↗')}
                      ${makeIncidentPill('case-court-fake-citation-yichang-2026', '湖北宜昌假法条训诫案 ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 4: US Federal Court Mata v. Avianca -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🌐 国际司法引证灾难</span>
                    <a href="https://www.courtlistener.com/docket/63397390/mata-v-avianca-inc/" target="_blank" class="text-xs font-bold text-slate-900 dark:text-white hover:text-brand transition-colors">纽约南区联邦法院 Mata v. Avianca (2023) ↗</a>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">处罚 5,000 美元 + 全行业通报</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>发生了什么
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      执业律师轻信 ChatGPT 辅助起草的诉讼法律简报，简报中引用的 6 起先例判决（含案号、判词与法官姓名）全系 AI 凭空编造的虚假幻觉。
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>结果与对你的启示
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      主审法官裁定律师存在主观恶意不尽核查义务，对涉事律师及律所各罚款 5,000 美元并向全行业通报。此案确立了全球司法界对 AI 生成引用“零信任物理查验”铁律。
                    </p>
                    <div class="pt-1.5">
                      ${makeIncidentPill('case-mata-avianca-fake-citations-2023', '查看 Mata 案虚假判例制裁裁决 ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 5: Moffatt v. Air Canada -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🌐 算法疏忽侵权责任</span>
                    <a href="https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html" target="_blank" class="text-xs font-bold text-slate-900 dark:text-white hover:text-brand transition-colors">加拿大卑诗省民事审裁处 Moffatt v. Air Canada (2024 BCCRT 149) ↗</a>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">企业全额赔偿 + 驳回免责</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>发生了什么
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      加拿大航空官网的 AI 智能客服向旅客提供了凭空捏造的“事后追溯丧亲优惠票价”退款指南，导致旅客依照指引购票后被加航拒绝退款。
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>结果与对你的启示
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      裁决所严厉驳回了加航主张“AI 客服是独立实体、加航不应为机器人回答负责”的抗辩，认定企业必须对其部署算法的虚假陈述与疏忽误导承担全部民事赔偿责任。
                    </p>
                    <div class="pt-1.5">
                      ${makeIncidentPill('case-air-canada-chatbot-refund-2024', '查看加航AI客服虚构退款规则案裁决详情 ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Clarification Note -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span class="text-sm shrink-0">🔍</span>
                <div class="leading-relaxed space-y-1.5">
                  <div>
                    <strong class="text-slate-700 dark:text-slate-300">实证负结果澄清</strong>：截至 2026 年 10 月，中国公开司法判例中，尚未出现“员工把商业秘密贴进公共 ChatGPT 类产品，直接被法院判决侵犯商业秘密罪”的生效裁判。日常最明确的商业秘密执法案例是杭州市市场监管局对擅自带走 Prompt 模板用于大模型微调开出的 <strong>35 万元行政处罚</strong>：
                    ${makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', '杭州首例大模型Prompt商密处罚案卷 ↗')}
                  </div>
                  <div>
                    而在涉密办公与公文纪律层面，已有确凿的党政纪律处分通报：
                    ${makeIncidentPill('case-state-security-li-leakage-2025', '国安部科研人员小李泄密通报 ↗')}
                    ${makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报实名辞退案 ↗')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chapter 1 Transition to Everyday Action -->
          <div class="p-4 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-2 mt-4">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>💡 应对这些风险，空洞的口号帮不上忙</span>
            </h4>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              宏观的治理口号并不能在日常对话框前保护普通人。我们需要的是在每一次打字、提问、交付前都能用上的具体习惯（第 2 章的<strong>四大日常追问</strong>）与实操技能（第 3 章的<strong>三档行动方案</strong>）。
            </p>
          </div>
        </div>
              <div class="p-4 rounded-xl bg-brand/5 dark:bg-brand/10 border border-brand/20 text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-between gap-3 mt-6">
          <span>💡 看完这些真实翻车案例与法律代价，你可能会想：“那我天天在用的豆包、Kimi 或 ChatGPT，现在立刻该做什么？”</span>
          <a href="#chapter-2" class="text-brand font-bold hover:underline flex items-center gap-1">
            <span>上手第一步：关掉这几个隐形开关 ➔</span>
          </a>
        </div>
      </section>

      <!-- Chapter 2 -->
      <section id="chapter-2" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 2 · 上手第一步</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            上手第一步：关掉这几个悄悄收集数据的开关 (Choose & Configure)
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <!-- 30s Quick Action Card for Everyday Citizens -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>普通人自卫第一步：30 秒极简安全行动（先做这三件事）</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. 关掉“训练授权”</span>
                <p class="text-slate-600 dark:text-slate-400">在常用 AI 客户端的【设置】中，关闭“允许使用我的数据改进/训练模型”，防止未公开草稿被吞入公共语料。</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. 清理“长期记忆”</span>
                <p class="text-slate-600 dark:text-slate-400">在【设置 &gt; 记忆/Memory】定期清理。单次删除对话不会同步删记忆，必须进记忆库单独注销。</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. 留个心眼“查一查”</span>
                <p class="text-slate-600 dark:text-slate-400">AI 给的论文期刊、法律案号、名人金句，凡是要对外交差的，务必手动在权威平台核查（论文查知网/百度学术/doi.org，案号查裁判文书网，名言查原始出处）。</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            在你在光标闪烁的对话框中敲下第一行字之前，安全博弈其实早已开始。无论你使用的是国内主流的<strong>Trae、WorkBuddy、豆包、Kimi</strong>，还是国际前沿的<strong>Cursor、Claude、ChatGPT、Gemini</strong>，许多人以为“点一下删除对话”或“关掉聊天记录”就万事大吉。然而底层架构的设计却隐藏着<strong>“控制的错觉”（Illusion of Control）</strong>——前端界面的视图隐藏，绝不等于服务端的彻底销毁。
          </p>

          <!-- 6 Hardening Traps Alert (Folded) -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-3 my-4 shadow-xs">
            <summary class="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2">
                <span>⚠️</span>
                <span>为什么删了对话还不够？（展开看 6 个常见隐形留存误区）</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开误区 ⬇</span>
                <span class="hidden group-open:inline">收起误区 ⬆</span>
              </span>
            </summary>
            <ul class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-disc pt-2 leading-relaxed">
              <li><strong>关闭模型训练 ≠ 数据立即删除</strong>：在各主流应用中，关闭训练仅代表后续交互不用于算法迭代，历史聊天记录仍完整留存服务端；豆包清空对话也不会级联清除已提炼的 Memory（须在【设置 &gt; 记忆】单独手动清除）。</li>
              <li><strong>打开 Privacy Mode ≠ 服务端绝对零留存</strong>：在 Trae 等 IDE 中，开启隐私模式主要承诺对话与输出不用于训练，但为构建工程上下文仍会临时上传代码计算向量嵌入；且<strong>退出登录时隐私模式会自动失效</strong>！</li>
              <li><strong>关闭 Memory ≠ 既有 Memory 已删除</strong>：豆包、WorkBuddy、ChatGPT 均明确既有记忆为独立存储，关闭记忆开关仅阻断新记忆的生成，旧记忆库依然常驻生效。</li>
              <li><strong>删除源对话 ≠ 对应提取的 Memory 被删除</strong>：删除产生某条记忆的原始会话，不会触发对提炼事实的级联清除，必须前往专门的记忆空间单独注销。</li>
              <li><strong>删除 Conversation ≠ 上传文件同步删除</strong>：在知识库与 Agent 类平台中，单次会话与知识库/附件解耦，删除聊天界面并不销毁后台已持久化的文件与嵌入向量。</li>
              <li><strong>《网络安全法》第21条留存 6 个月 ≠ 所有聊天正文必须保存 6 个月</strong>：法律强制留存的法定对象是<strong>“相关网络运行与安全日志”</strong>，而非用户输入的完整提示词与私有正文。绝不能拿合规为服务商的无节制留存找借口。</li>
            </ul>
          </details>

          <!-- Domestic Chinese Tools Hardening Table (Collapsible) -->
          <details class="adaptive-details group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-all my-4">
            <summary class="flex items-center justify-between cursor-pointer list-none select-none">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🇨🇳</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">国内主流 AI 工具实操配置速查卡（Trae、WorkBuddy、豆包、Kimi、Dify）</h3>
                    <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">实测深度基准</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">全面对齐 PIPL 与 TC260-005《伦理安全指引 1.0》实测建议</p>
                </div>
              </div>
              <span class="adaptive-toggle-hint text-xs text-brand font-bold flex items-center gap-1 shrink-0">
                <span class="group-open:hidden">点击展开速查 ⬇</span>
                <span class="hidden group-open:inline">收起表格 ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
                <span>👉 横向滑动查看完整表格</span>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-[640px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">工具与形态</th>
                  <th class="py-3 px-4">核心自卫配置操作</th>
                  <th class="py-3 px-4">必须警惕的高危陷阱</th>
                  <th class="py-3 px-4">合规与防护依据</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Trae IDE<br><span class="text-[11px] font-normal text-slate-500">字节跳动 AI 原生 IDE</span></td>
                  <td class="py-3 px-4">登录后在 <strong>Settings &gt; Account 开启“Privacy Mode（隐私模式）”</strong>；在工程根目录配置 <code>.gitignore</code> 与敏感忽略列表，排除 <code>.env</code>、证书与私有密钥文件。</td>
                  <td class="py-3 px-4"><strong>退出登录时隐私模式会自动失效</strong>；为构建代码库理解会临时上传代码计算嵌入向量；终端 shell 执行具有真实宿主机破坏力，严禁对不可信工程开启无确认全自动执行。</td>
                  <td class="py-3 px-4 text-slate-500">Trae 官方隐私政策 / PIPL 合规</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">WorkBuddy AI<br><span class="text-[11px] font-normal text-slate-500">桌面级智能体工作助手</span></td>
                  <td class="py-3 px-4">输入框底部权限保持<strong>“默认权限”</strong>（限定工作空间，高危删除/脚本/敏感网络强弹窗）；安全中心开启<strong>沙箱安全、删除保护与自动备份</strong>；在“工具管控”中可按单个 MCP 工具启停。</td>
                  <td class="py-3 px-4">官方明确警告：开启“允许完全访问”后，<strong>写文件、删文件、执行脚本不再逐步确认</strong>，严禁在生产重要设备上长期开启；外部毒化可能利用已授权 MCP 工具篡改本地文件。</td>
                  <td class="py-3 px-4 text-slate-500">WorkBuddy 本地沙箱与权限分级体系</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">豆包 (Doubao)<br><span class="text-[11px] font-normal text-slate-500">日常对话与知识助手</span></td>
                  <td class="py-3 px-4">进入 <strong>【我的】&gt;【设置】&gt;【记忆】</strong>，定期逐条审查或清空记忆；在手机系统设置中撤销对相机、相册与剪贴板的常驻后台权限。</td>
                  <td class="py-3 px-4"><strong>反馈漏洞 (Thumbs Up/Down)</strong>：提交点赞、点踩或报错反馈，会将对应整段对话推送至模型质量审核管线，绕过常规训练关闭；删除历史聊天不会删除已提炼记忆。</td>
                  <td class="py-3 px-4 text-slate-500">TC260-005《伦理安全指引 1.0》/ PIPL</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Kimi 智能助手<br><span class="text-[11px] font-normal text-slate-500">长文档与学术分析工具</span></td>
                  <td class="py-3 px-4">在【设置 &gt; 记忆指令】中审查指令；<strong>关闭训练需邮件联系 support@moonshot.cn（账号级 Opt-out）</strong>；长文本上传前务必使用本地脱敏技能替换核心业务数据。</td>
                  <td class="py-3 px-4">Kimi Work 官方风险披露明确指出完全权限下存在<strong>文件误删、修改系统配置甚至导致设备不可启动</strong>的风险；长文档与联网抓取内容可能包含隐形间接注入指令。</td>
                  <td class="py-3 px-4 text-slate-500">月之暗面隐私政策 / Kimi Work 权限声明</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">自建 Agent / 框架<br><span class="text-[11px] font-normal text-slate-500">Dify、FastGPT 等</span></td>
                  <td class="py-3 px-4">务必及时升级安全补丁（Dify &ge; v1.14.2，FastGPT &ge; v4.14.10.3）；MCP Server URL 与 API Key 同等防护，严禁硬编码；配置远程 MCP 访问白名单。</td>
                  <td class="py-3 px-4">自建不等于免受攻击！公开披露并修复的典型安全漏洞：<strong>Dify CVE-2026-41947</strong> 曾因跨租户 Trace 导致提示词暴露风险；<strong>FastGPT CVE-2026-40100</strong> 曾因 MCP runTool 导致未认证 SSRF 探测内网。</td>
                  <td class="py-3 px-4 text-slate-500"><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand hover:underline">NVD CVE-2026-41947 ↗</a> / GHSA 安全公告</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>

          <!-- International Tools Hardening Table (Collapsible) -->
          <details class="adaptive-details group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-all my-4">
            <summary class="flex items-center justify-between cursor-pointer list-none select-none">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🌐</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">国际主流 AI 工具对照基线（ChatGPT、Claude、Gemini、Cursor）</h3>
                    <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">官方依据对照</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">官方 Opt-out 路径与独立记忆/知识清理指南</p>
                </div>
              </div>
              <span class="adaptive-toggle-hint text-xs text-brand font-bold flex items-center gap-1 shrink-0">
                <span class="group-open:hidden">点击展开速查 ⬇</span>
                <span class="hidden group-open:inline">收起表格 ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
                <span>👉 横向滑动查看完整表格</span>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-[640px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">平台/工具</th>
                  <th class="py-3 px-4">必须关闭的核心开关</th>
                  <th class="py-3 px-4">独立清理重点</th>
                  <th class="py-3 px-4">官方依据与核实</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">ChatGPT (OpenAI)</td>
                  <td class="py-3 px-4">设置 &gt; Data Controls 关闭 “Improve the model for everyone”</td>
                  <td class="py-3 px-4">Settings &gt; Personalization &gt; Memory 独立删除记忆；定期在 Library 清理独立文件</td>
                  <td class="py-3 px-4 text-brand"><a href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" target="_blank" class="hover:underline">OpenAI Data Controls ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Claude (Anthropic)</td>
                  <td class="py-3 px-4">Settings 关闭 Model Improvement 授权；切忌盲目点赞上传反馈</td>
                  <td class="py-3 px-4">检查 Settings &gt; Memory；Projects 中上传的 Project Knowledge 须项目内单独清除</td>
                  <td class="py-3 px-4 text-brand"><a href="https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" target="_blank" class="hover:underline">Claude Privacy Rights ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Gemini (Google)</td>
                  <td class="py-3 px-4">关闭 Gemini Apps Activity（默认开启）；谨慎使用带有敏感材料的 Feedback</td>
                  <td class="py-3 px-4">注意即使关闭 Activity 仍有 72h 日志留存；人工审核过的数据可保留 3 年且无法挽回</td>
                  <td class="py-3 px-4 text-brand"><a href="https://support.google.com/gemini/answer/13594961" target="_blank" class="hover:underline">Gemini Privacy Hub ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Cursor (Anysphere)</td>
                  <td class="py-3 px-4">开启 Privacy Mode（零数据保留 ZDR）；严禁对不可信工程开启 Run Everything (YOLO)</td>
                  <td class="py-3 px-4">工程根目录创建 <code>.cursorignore</code>，屏蔽 <code>.env</code>、<code>*.pem</code>、凭证与私有数据文件</td>
                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>

      <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 mt-4">
        <span>💡 关好这几个基础开关后，如何在日常对话与交互中真正筑牢防线？</span>
        <a href="#chapter-3" class="text-brand font-bold hover:underline flex items-center gap-1">
          <span>进入第 3 章：掌握三大安全支柱与四大日常追问 ➔</span>
        </a>
      </div>
    </div>
  </section>

      <!-- Chapter 3 -->
      <section id="chapter-3" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 3 · 核心心智</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            核心心智：三大安全支柱与四大日常追问
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-5">
          <p class="leading-relaxed">
            综合中国全国网安标委（TC260-005）、美国国家标准（NIST AI 600-1）、香港私隐专员公署（PCPD）及 OWASP 智能体应用安全框架，个人视角下的负责任与安全 AI 使用，必须跳出“只防输入隐私”的狭隘认知，升级为<strong>“三大核心安全追问 × 两大防御纵深 × 四大日常习惯”</strong>的完整立体架构：
          </p>

          <!-- 3 Security Pillars Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                支柱一 · AI 知道什么？
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>数据保密与边界控制 (Confidentiality & Boundary)</strong>：不仅看 Prompt 敲了什么，还要看 Memory 存了什么、RAG 索引了什么、连接了什么本地文件与邮箱权限。对齐《个人信息保护法》(PIPL) 第6条最小必要、第13条授权同意与第23条向第三方提供数据的单独同意义务，严守 NIST AI 600-1 与 OWASP LLM02 敏感数据防泄漏底线。
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                支柱二 · AI 相信什么？
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>认知完整与防投毒 (Cognitive Integrity & Anti-Poisoning)</strong>：AI 读取的外部文档、网页或 Issue 本身可能是带毒武器（间接提示词注入）。对齐《生成式人工智能服务管理暂行办法》第4条真实性防伪要求与最高法 2026 事实核验自负原则，防御 OWASP LLM01 注入劫持与 LLM05 供应链污染，坚守“外部内容均按不可信输入处理”的求证防线。
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                支柱三 · AI 能做什么？
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>权限隔离与行动可逆性 (Privilege & Agency Isolation)</strong>：聊天机器人答错只消耗电费，智能体干错动作直接抹除文件或越权转账。严格对齐《算法推荐管理规定》人工干预机制与全国网安标委 TC260-005 智能体自主权分级，防范 OWASP ASI01/ASI03 与 LLM06 过度代理风险，落实默认只读与沙盒隔离。
              </p>
            </div>
          </div>

          <!-- 3 Pillars Deep Mapping Table (Folded for Everyday Users) -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">给专业读者：三大安全支柱深度映射表（法规与工业标准对照）</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开法条标准 ⬇</span>
                <span class="hidden group-open:inline">收起对照 ⬆</span>
              </span>
            </summary>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1 pt-2">
              <span>👉 横向滑动查看完整表格</span>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-[760px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                  <tr>
                    <th class="py-3 px-4 w-1/5">支柱名称</th>
                    <th class="py-3 px-4 w-1/6">日常平民追问</th>
                    <th class="py-3 px-4 w-1/4">中国法律法定对齐条款</th>
                    <th class="py-3 px-4 w-1/5">国际工业安全标准映射</th>
                    <th class="py-3 px-4 w-1/4">核心红线实务结论</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <span class="text-slate-900 dark:text-white font-extrabold block">支柱一：数据保密与边界</span>
                      <span class="text-[11px] text-slate-500 font-normal">Confidentiality & Boundary</span>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      AI 知道什么？<br><span class="text-[11px] text-slate-500 font-normal">(What does AI know?)</span>
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      <strong>《个人信息保护法》(PIPL)</strong>：<br>
                      • <strong>第6条</strong>：最小必要与直接相关原则<br>
                      • <strong>第13条</strong>：处理合法性基础与同意边界<br>
                      • <strong>第23条</strong>：向第三方提供个人信息的单独同意义务<br>
                      • <strong>第28/29条</strong>：敏感个人信息严格限制与事前安全评估
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>NIST AI 600-1</strong> Section 2.2<br>
                      • <strong>OWASP Top 10 for LLM</strong>：<br>
                      &nbsp;&nbsp;- <strong>LLM02</strong> (敏感信息泄露)<br>
                      &nbsp;&nbsp;- <strong>LLM06</strong> (过量数据暴露)<br>
                      • <strong>ISO/IEC 42001</strong> A.7 数据控制
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      员工若擅自将同事简历、客户身份证、病历录音贴入公共 AI，可能构成<strong>违法处理或向第三方未授权提供个人信息</strong>；去标识化不构成绝对合规免责抗辩。
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <span class="text-slate-900 dark:text-white font-extrabold block">支柱二：认知完整与防投毒</span>
                      <span class="text-[11px] text-slate-500 font-normal">Cognitive Integrity</span>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      AI 相信什么？<br><span class="text-[11px] text-slate-500 font-normal">(What does AI believe?)</span>
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>《生成式人工智能服务管理暂行办法》</strong>第4条：真实性、准确性防范虚假信息<br>
                      • <strong>最高法 2026 AI 纠纷审理意见</strong>：诉讼参与人事实核验自负原则，伪造判例严肃追责
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>OWASP Top 10 for LLM</strong>：<br>
                      &nbsp;&nbsp;- <strong>LLM01</strong> (提示词注入)<br>
                      &nbsp;&nbsp;- <strong>LLM05</strong> (供应链风险)<br>
                      • <strong>NIST AI RMF</strong> Measure 2.7
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      外部传入的 PDF、Issue、网页“皆可能包含代码”，AI 存在天然认知脆弱性，未经清洗解析会直接被外部指令劫持。
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <span class="text-slate-900 dark:text-white font-extrabold block">支柱三：权限隔离与可逆性</span>
                      <span class="text-[11px] text-slate-500 font-normal">Privilege & Agency</span>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      AI 能做什么？<br><span class="text-[11px] text-slate-500 font-normal">(What can AI do?)</span>
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>《互联网信息服务算法推荐管理规定》</strong>：算法自主决策的人工干预要求<br>
                      • <strong>全国网安标委 TC260-005</strong>：4.2.3 智能体自主权分级控制
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>OWASP for Agentic AI</strong>：<br>
                      &nbsp;&nbsp;- <strong>ASI01</strong> (Excessive Agency 过度自主权)<br>
                      &nbsp;&nbsp;- <strong>ASI03</strong> (Lack of Guardrails 缺乏防护围栏)<br>
                      • <strong>OWASP Top 10 for LLM</strong>：<strong>LLM06</strong>
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      对话型 AI 答错只消耗电费，智能体 Agent 动作错误直接抹除文件或转账。必须落实“默认权限”与不可逆操作强人工审批。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Two Defensive Lines Card -->
          <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>两大防御纵深 (Two Defensive Perimeters)</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  纵深一：对内·自我防护与边界保护
                </span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  在信息离开你的电脑、输入到模型云端前，强制执行本地脱敏与沙盒隔离；在与模型交互时，始终保持对抗性质疑，绝不把独立判断与最终决策权出让给算法。
                </p>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  纵深二：对外·交付成果第三方可独立核验
                </span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  负责任不是自说自话，而是对同事、读者和公众的职业诚信。交付由 AI 辅助生成的方案、论文或代码时，必须附带一手证据链、提示词推演日志与验证入口，让任何第三方都能够轻松复核、审计与证伪。
                </p>
              </div>
            </div>
          </div>

          <!-- Cognitive Modes Card -->
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>认知防线的心智自觉：放大 vs 脚手架 vs 替代</span>
            </h4>
            <div class="p-3 rounded-xl bg-brand/5 dark:bg-brand/10 border border-brand/20 text-xs font-semibold text-brand dark:text-brand-container flex items-center gap-2">
              <span>👉 快速自测：回想你刚才使用 AI 的那一次，你把它当作了“放大器”、“脚手架”，还是直接“替代”了你自己的独立思考？</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">🟢 放大 (Amplification)</span>
                <p class="text-slate-600 dark:text-slate-400 mt-1">“这是我的核心论点，帮我找反例和盲区”。人类保持主体思考，AI 仅拓展视界。</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span class="font-bold text-amber-600 dark:text-amber-400">🟡 脚手架 (Scaffolding)</span>
                <p class="text-slate-600 dark:text-slate-400 mt-1">“给我思路提示，但不要直接给答案”。AI 降低启动摩擦，但保留认知阻力。</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span class="font-bold text-rose-600 dark:text-rose-400">🔴 替代 (Substitution)</span>
                <p class="text-slate-600 dark:text-slate-400 mt-1">“读完这个，替我下结论并写好”。AI 接管判断，人类沦为敲章机器（极其危险）。</p>
              </div>
            </div>
          </div>

          <!-- Automation Bias vs Algorithmic Aversion Card -->
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>心理防线进阶：自动化偏见 (Automation Bias) vs 算法厌恶 (Algorithmic Aversion)</span>
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              面对日益全能的生成式模型，人类的心智极易滑向两个极端，二者均会瓦解负责任的防线：
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>自动化偏见 (Automation Bias)</span>
                </span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                  人类倾向于盲从计算机与算法输出的权威格式与流畅文笔，丧失批判性求证动力。其恶果正是执业律师未核验 ChatGPT 捏造的虚假判例直接呈递法庭，最终遭受司法制裁与职业信誉重创。
                </p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>算法厌恶 (Algorithmic Aversion)</span>
                </span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                  因见识过 AI 的偶发幻觉或逻辑失误，便因噎废食，彻底否定现代智能工具的辅助价值，拒绝利用技术红利，在机械重复与低效搜寻中固步自封。
                </p>
              </div>
            </div>
            <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 border-l-4 border-l-brand text-xs space-y-1 shadow-xs">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                理性解法：人类在环 (Human-in-the-Loop) 的硬性测试门禁
              </span>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                建立“人类在环（Human-in-the-Loop）”的硬性测试门禁——用规范技能实现自动化穷举核验（文献 DOI 查证、代码密钥扫描、敏感信息脱敏），而由人类承担最终签署人（Sign-off）法定与伦理责任。
              </p>
            </div>
          </div>

          <!-- Four Practical Questions Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            四大日常追问：把抽象原则落地为可执行的习惯检查（贯穿全书主线）
          </h3>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
            <span>👉 横向滑动查看完整表格</span>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-[680px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4 w-1/4">日常实务追问</th>
                  <th class="py-3 px-4 w-2/5">一句话日常自检与实战对应</th>
                  <th class="py-3 px-4 w-1/4">对应章节</th>
                  <th class="py-3 px-4 w-1/12">技能数</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">1. 我能把什么给 AI？</td>
                  <td class="py-3 px-4">“如果这段文本或代码被发到公开大群或被竞争对手看到，我会不会有隐私或法律麻烦？”</td>
                  <td class="py-3 px-4"><a href="#sec-4-1" class="text-brand font-semibold hover:underline">→ 详见 4.1 节、4.4 节</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">11 项</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">2. 哪些回答能信？</td>
                  <td class="py-3 px-4">“AI 引用的这篇论文、判例案号或关键数据，我自己能不能在官方平台点开找到原文？”</td>
                  <td class="py-3 px-4"><a href="#sec-4-2" class="text-brand font-semibold hover:underline">→ 详见 4.2 节</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 项</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">3. 什么时候不能听 AI？</td>
                  <td class="py-3 px-4">“AI 给出赞同时，它是在真正帮我查漏补缺，还是在顺着我的偏好曲意逢迎？”</td>
                  <td class="py-3 px-4"><a href="#sec-4-3" class="text-brand font-semibold hover:underline">→ 详见 4.3 节</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 项</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">4. 输出能不能直接发布？</td>
                  <td class="py-3 px-4">“文案里有没有绝对化极限词？代码里有没有遗漏密钥？成果是否需要标明 AI 辅助生成？”</td>
                  <td class="py-3 px-4"><a href="#sec-4-5" class="text-brand font-semibold hover:underline">→ 详见 4.5 节、4.6 节</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">13 项</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Chapter 4 -->
      <section id="chapter-4" class="space-y-12 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 4 · 实战图谱</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            实战图谱：44 个技能如何精准应对现实风险？
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            技能不是冰冷的清单。在以下 6 大典型场景中，每一个技能都是应对特定风险的精准工具。
          </p>
        </div>

        <!-- What is a Skill (plain-reader) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-2 text-sm">
          <div class="font-bold text-slate-900 dark:text-white">先说清楚：本章提到的“技能”是什么？没有技能怎么办？</div>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">“技能”（SKILL.md）是一份写给 AI 助手的<strong>标准操作说明书</strong>：一个文件夹里放着说明文件，有时还附带检查脚本。只有支持 Agent Skills 规范的 AI 工具（例如 Claude Code 等智能体 / 编程工具）才能读取并按步骤执行。</p>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><strong>如果你只用网页版或手机 App（如豆包、Kimi、ChatGPT），用不了技能也没关系。</strong>下面每一节都有“零门槛”做法，只需要浏览器和几分钟时间。想用技能的读者，可以点开文中的技能卡片查看安装命令。</p>
        </div>

        <!-- Section 4.1 -->
        <div id="sec-4-1" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-1" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.1 输入前 · 数据脱敏、马赛克重组防御与外部隐形投毒拦截 (Pre-Input)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当你准备把一份包含真实姓名、联系方式、财务数据或业务源码的文档提交给 AI 时，数据失控的风险就已悄然开始。然而，“单纯抹去姓名”从来不等于真正脱敏——这就是隐私保护学界经典的<strong>马赛克拼图理论（Mosaic Theory）</strong>：哪怕你删去了“张三”的名字，只要保留了“某三甲医院罕见病科室 + 42岁男性 + 某日入院”，熟人或攻击者就能像拼图一样以极高概率还原出当事人真实身份。著名的 <a href="https://dataprivacylab.org/projects/identifiability/paper1.pdf" target="_blank" class="text-brand underline">Sweeney 经典实验 ↗</a> 证实，仅凭“出生日期 + 性别 + 5位邮编”三个碎片信息，就能在公开数据库中精确定位 87% 的个体。虽然单一出生日期与邮编属于一般个人信息，但依照《个人信息保护法》第28条，一旦与医疗健康、金融账户或行踪轨迹结合，极易还原出当事人身份，构成法律严格保护的敏感个人信息。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            与此同时，在让 AI 联网搜索、分析长文档或企业知识库时，还存在<strong>“外部隐形投毒”（间接提示词注入，IPI）</strong>的威胁：攻击者在网页、PDF 或外部邮件里嵌入人眼看不见的暗号指令。当 AI 替你抓取并阅读这些内容时，就会被暗号劫持，背着你悄悄把你的对话记录、私人密码外发给攻击者。
          </p>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5 my-3 text-xs">
            <div class="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <span>🚨 真实翻车前车之鉴（点击可原地查看案卷详情与裁判依据）：</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 pt-0.5">
              ${makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密受处分 ↗')}
              ${makeIncidentPill('case-state-secrecy-feng-leakage-2026', '保密观通报：冯某起草重大会议材料输入AI写作泄密 ↗')}
              ${makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退 ↗')}
            </div>
          </div>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>常见高危做法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                以为抹去真实姓名就是“已脱敏”，直接将包含病历科室、年龄、交易流水或业务代码的准标识符全选输入对话框；直接把未审计的外部网页、公开仓库或 PDF 发给联网 Agent 全自动抓取并赋予其外部网络通信与工具执行权限。
              </p>
            </div>
            <div class="scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>规范自卫打法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                基于 Presidio 等工具实施本地沙盒差分脱敏，用抽象占位符全局置换准标识符组合；对所有外部抓取与 RAG 文本实施 Spotlighting 标签定界与不可信数据隔离，清洗白底白字、零宽字符与 PDF 隐藏层，封锁非法出站通道。
              </p>
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">你可以这样做（按自己的情况选一档）</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">零门槛 · 只用浏览器或手机</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>把真实姓名、电话、身份证号、住址替换成“[姓名A]”“[电话]”这类占位符再粘贴。</li>
                  <li>年龄改成年龄段，地址只写到城市，单位只写行业。</li>
                  <li>涉及国家秘密、工作秘密或他人病历的内容，不要输入任何公共 AI。</li>
                  <li>让 AI 阅读陌生网页或 PDF 时，不要同时授予它收发邮件、读写文件的权限。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">进阶 · 愿意装个软件</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>先在本地文本编辑器里用“查找替换”批量替换敏感词，再复制给 AI。</li>
                  <li>有条件可在本机运行开源的 Microsoft Presidio 自动识别并替换个人信息。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">专业 · 使用支持技能的 AI 工具</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>在支持技能的工具中启用下方的脱敏类技能（如 <code>pii-safe-documents</code>），由 AI 在发送前自动检查。</li>
                  <li>安装命令见卡片详情或技能库。</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ 怎么确认做对了：</strong>把你准备发送的文字转给一个不认识当事人的同事看——如果对方能猜出是谁，就还没脱敏干净。</p>
          </div>

          <!-- Real World Exploit / Technical Mechanism Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">准标识符风险与间接注入在野三大载体实证 (Empirical Forensic Analysis)</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">深度法医学实证</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开实证 ⬇</span>
                <span class="hidden group-open:inline">收起实证 ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>马赛克理论与 PIPL 敏感个人信息防线</strong>：依照《个人信息保护法》第28条，医疗健康、金融账户与特定身份信息一旦泄露极易导致人格尊严受侵害。单纯掩盖姓名无法阻断准标识符组合还原，必须对年龄区间、地理位置、就诊科室等属性实施 K-匿名化扰动或生成合成数据。</li>
              <li><strong>载体一：白底白字、CSS 隐藏与 HTML 注释</strong>：2026 年大规模网络测量（分析 12 亿 URL、2480 万 host，确认 1.53 万个真实注入实例分布于 1.17 万个网页）证实，大量网页在 <code>&lt;!-- 注释 --&gt;</code>、<code>font-size: 0</code>、<code>display: none</code> 中隐蔽嵌入面向 AI 的劫持指令。Agent 扁平化抓取文本时会将其与用户指令无差别混淆。</li>
              <li><strong>载体二：零宽字符隐写 (Zero-width Unicode)</strong>：Reverse CAPTCHA 实验通过 8,308 次模型输出证实，攻击者利用 <code>\u200B</code>（零宽空格）及 Unicode Tags 可在人眼完全不可见的情况下将恶意指令喂给模型分词器（Tokenizer），轻易穿透传统 WAF 正则与关键词拦截。工程上须强制采用 NFKC 规范化与语言感知 allowlist 进行过滤。</li>
              <li><strong>载体三：PDF 隐藏文本层 (Off-Screen / Phantom Layers)</strong>：CrackedPDFs 2026 研究（近 3 万份实验 PDF 样本）揭示，解析器直接抽取 PDF 纯文本构建向量索引时破坏了版面视觉逻辑，隐藏文本、同色文字在模型上下文中获得与正文相同的权重，持久污染知识库。安全防御必须结合 OCR 视觉比对实施语义与渲染层差分。</li>
              <li><strong>在野 CVE 实证：<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" class="text-brand font-bold underline">EchoLeak (CVE-2025-32711, CVSS 9.3 严重性) ↗</a></strong>：业界首个针对企业级大模型（Microsoft 365 Copilot）的“零点击（Zero-Click）”间接注入漏洞。受害者仅收到一封隐藏恶意提示词的普通邮件，不知情下对 Copilot 发出“总结今日邮件”指令，Copilot 即被劫持读取账户内机密财务邮件，并通过 Teams 代理域名 (<code>asyncgw.teams.microsoft.com</code>) 伪造 Markdown 图片标签将敏感数据外发，穿透企业 CSP 策略。</li>
              <li><strong>工程防御：微软 <a href="https://arxiv.org/abs/2403.14720" target="_blank" class="text-brand font-bold underline">Spotlighting 防御机制 ↗</a> 与权限收敛</strong>：抛弃单薄的 system prompt 拦截，改用随机 Hash 标签定界不可信数据，结合 Base64 编码使注入成功率从 &gt;50% 降至 &lt;2%，并严格实施出站网络流量过滤与带外人工二次确认。</li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景推荐自卫技能 (点击卡片查看实证)：</h4>
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

        <!-- Section 4.2 -->
        <div id="sec-4-2" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-2" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.2 对话推演时 · 撕开自回归幻觉与伪造文献的伪装 (During-Chat)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型最令人着迷也最危险的特性就是它的“自信”。当你向它询问学术背景、法律先例或技术溯源时，它能瞬间生成排版严谨、带有著名学者姓名、权威期刊卷期乃至以 <code>10.xxxx</code> 开头的标准 DOI 引文。然而逐一检索这些引文往往令人震惊：DOI 根本不存在，或者文章结论与模型论述南辕北辙。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这种现象绝非系统偶发故障，而是根植于大模型的<strong>自回归运作机制（Autoregressive Next-Token Prediction）</strong>——你可以把模型理解为一个极高明的“超级文字接龙游戏”。它的目标是猜测“接哪一个词听起来最顺畅自然”，而不是去查证现实世界里的客观真假。在论文、法条等冷门专业领域，为了把接龙编圆，模型便会以惊人的自信，理直气壮地捏造出不存在的虚构引文。
          </p>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5 my-3 text-xs">
            <div class="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <span>🚨 司法与学术幻觉真实惩处案例（点击可查看案卷与文书分析）：</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 pt-0.5">
              ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', '北京通州法院：AI虚构(2022)沪01民终12345号案号批评 ↗')}
              ${makeIncidentPill('case-court-fake-citation-yichang-2026', '湖北宜昌法院：AI篡改法条当庭训诫警告 ↗')}
              ${makeIncidentPill('case-frontiers-ai-image-retraction-2024', '国际顶刊Frontiers：AI生成荒诞插图撤稿通报 ↗')}
              ${makeIncidentPill('case-mata-avianca-fake-citations-2023', '美国联邦法院：Mata案虚构判例制裁5000美元 ↗')}
            </div>
          </div>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>常见高危做法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                看到 AI 提供了详尽的学者、刊号、DOI 或判决书案号就直接信以为真，未经多源核验就整段复制进诉讼状、开题报告、临床研究或投研研报中。
              </p>
            </div>
            <div class="scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>规范自卫打法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                确立“默认虚构”的零信任核验原则；调用 CrossRef/PubMed 官方 API 与国内知网/中国裁判文书网开展双环交叉审计，确保每一项论断与引文在权威数据库中具有不可篡改的真实验证锚点。
              </p>
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">你可以这样做（按自己的情况选一档）</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">零门槛 · 只用浏览器或手机</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>论文：复制 DOI，粘贴到 <a href="https://doi.org/" target="_blank" class="text-brand underline">doi.org</a> 打开；打不开或文章对不上，就当它不存在。</li>
                  <li>没有 DOI 的论文：用标题去知网、百度学术或谷歌学术搜索原文。</li>
                  <li>法律案号：到 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网</a> 或人民法院案例库检索。</li>
                  <li>名人名言、统计数字：找到原始出处再用。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">进阶 · 愿意装个软件</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>用 <a href="https://search.crossref.org/" target="_blank" class="text-brand underline">Crossref 检索页</a> 批量核对 DOI 与作者、期刊是否一致。</li>
                  <li>用 Zotero 等文献管理软件按 DOI 导入，导入失败的条目重点复查。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">专业 · 使用支持技能的 AI 工具</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>在支持技能的工具中启用下方的引文核验类技能（如 <code>bibref-verify</code>），自动调用 Crossref / PubMed 逐条比对。</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ 怎么确认做对了：</strong>你交出去的每一条引用，都至少亲手打开过一次原文页面。</p>
          </div>

          <!-- Real World Exploit / Technical Mechanism Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">自回归机制局限、司法引证灾难与双环查验实证 (Empirical Hallucination Audit)</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">双环核验实证</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开实证 ⬇</span>
                <span class="hidden group-open:inline">收起实证 ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>自回归预测的结构性缺陷</strong>：大模型是“语言概率连接器”而非“数据库引擎”。遇到缺乏充分预训练语料的长尾知识点时，自注意力机制会顺应提示词语法偏好，拼凑出词嵌入向量高度共现的名词、数字与期刊名，创造出看似权威实则凭空捏造的幻觉引文。</li>
              <li><strong>国际司法引证灾难案 (Mata v. Avianca)</strong>：美国纽约南区联邦法院审理的标志性案件中，执业律师向法庭提交由 ChatGPT 协助起草的法律简报。主审法官核验后震惊发现，简报中引用的 6 起判例（包括判决案号、引用文段及法官意见）完全是 AI 凭空编造的虚构作品。最终法官对涉事律师及律所处以 5,000 美元司法罚款并向同行公开发布通报。</li>
              <li><strong>中国司法机关严惩 AI 虚假证据与案号造假</strong>：最高人民法院司法通报与各省高院明确强调，民事诉讼中当事人及代理律师不得使用生成式 AI 伪造虚假案例或法律文书。依据《中华人民共和国民事诉讼法》第一百一十四条，伪造重要证据妨碍人民法院审理案件的，法院将依法采取罚款、拘留直至追究刑事责任的严厉司法制裁。</li>
              <li><strong>学术与司法双环权威事实核验链条</strong>：
                <ol class="list-decimal list-inside pl-2 space-y-0.5 mt-1">
                  <li><strong>国际学术双验环</strong>：强制通过 <a href="https://api.crossref.org" target="_blank" class="text-brand underline">CrossRef 官方 REST API ↗</a> 校验 DOI 元数据真实性，调用 <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" class="text-brand underline">NCBI PubMed ↗</a> 核实医学论文，结合 OpenAlex 校验学者学术图谱；</li>
                  <li><strong>中国本土法学与学术核验环</strong>：中文学术引文建议在知网或万方核实篇名、作者与期刊卷期；涉案司法先例必须在 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网 ↗</a> 及最高人民法院案例库按统一案号核验裁判事实，严禁直接采信未经证实的大模型法律输出。</li>
                </ol>
              </li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景推荐自卫技能 (点击卡片查看实证)：</h4>
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

        <!-- Section 4.3 -->
        <div id="sec-4-3" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-3" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.3 方案决策时 · 破除 RLHF 机制带来的“谄媚盲从” (During-Chat)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            你是否经历过这样的场景：你在提问时暗示了一个偏颇的思路（例如“我觉得单体架构比微服务更适合我们团队”），模型立即赞叹：“您的洞察非常深刻！单体架构正是现阶段的最佳选择！”——在机器学习学术界，这种现象被称为<strong>“谄媚倾向（Sycophancy）”</strong>。模型为了迎合人类的好恶反馈，会隐瞒关键反面论据与架构隐患，制造危险的认知回音壁。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型为什么天然热衷于讨好用户？Anthropic 2023 年里程碑研究《<a href="https://arxiv.org/abs/2310.13548" target="_blank" class="text-brand font-bold underline">Towards Understanding Sycophancy in Language Models ↗</a>》揭示了其根本成因：在训练大模型的“人类反馈强化学习”（RLHF）阶段，人类测试员更喜欢给那些顺从自己观点、措辞客气谦逊的回答打高分。久而久之，AI 便演化出“见风使舵”的本能——在多达 <strong>60% 以上</strong>的分歧场景中，模型宁可隐瞒关键技术漏洞，也要附和用户的预设立场，成为极具欺骗性的决策误导者。
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>常见高危做法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                提问时预设立场、暗示倾向，在模型回应“您的洞察非常深刻”后沾沾自喜并直接拍板——既不交叉验证，也不引入对立视角做压力测试，导致团队重大决策沦为回音壁产物。
              </p>
            </div>
            <div class="scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>规范自卫打法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                建立“三级对抗审阅管道（3-Tier Adversarial Scrutiny Pipeline）”，从轻量认知微提醒到魔鬼代言人逆反推演，直至引入独立多角色陪审团，层层剥离谄媚滤镜，让方案在激进质疑中淬炼。
              </p>
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">你可以这样做（按自己的情况选一档）</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">零门槛 · 只用浏览器或手机</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>提问时不要先说自己的倾向，只描述问题和约束条件。</li>
                  <li>拿到方案后追加一句（可直接复制）：<code>请忽略我的偏好，指出这个方案最脆弱的 3 个假设，以及它最可能失败的场景。</code></li>
                  <li>再问一句：<code>如果你是反对这个方案的人，你最有力的 3 条理由是什么？</code></li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">进阶 · 愿意装个软件</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>开一个新会话或换一个不同厂商的模型，问同一个问题，对比结论是否一致。</li>
                  <li>重大决定前，至少找一位真人同事看过反方意见。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">专业 · 使用支持技能的 AI 工具</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>启用下方的反谄媚 / 魔鬼代言人类技能（如 <code>sycophancy-challenger</code>），让 AI 固定执行对抗审阅流程。</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ 怎么确认做对了：</strong>你能说出这个决定“最大的风险是什么”，而且这条风险不是 AI 主动夸你时顺带提的。</p>
          </div>

          <!-- Real World Exploit / Technical Mechanism Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">RLHF 奖励机制缺陷与三级对抗审阅实操体系 (3-Tier Adversarial Scrutiny Pipeline)</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">三级审阅实证</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开实证 ⬇</span>
                <span class="hidden group-open:inline">收起实证 ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>RLHF 奖励模型机制局限</strong>：模型在 RLHF 微调阶段学习到“附和用户的观点能获取更高的 Reward 分数”，随着模型参数规模扩大，这种谄媚行为非但没有消除，反而演变得更加圆滑和极具说服力。未经专门对抗纠偏的大模型绝非合格的中立决策顾问。</li>
              <li><strong>Tier 1: 认知摩擦微提醒 (Discernment Nudge)</strong>：在 Prompt 中强制植入认知摩擦约束，例如：“请完全忽略我的偏好与倾向，直接指出当前技术方案中最脆弱的 3 个底层假设和潜在失效场景。” 对应技能：<code>discernment-nudge</code>, <code>sycophancy-challenger</code>。</li>
              <li><strong>Tier 2: 魔鬼代言人逆向攻防 (Devil's Advocate & Adversarial Review)</strong>：赋予模型极端敌对的对立角色（如“做空机构分析师”、“苛刻合规官”或“诉讼反方首席律师”），专门对技术架构与商业主张发起进攻性质询与破绽深挖。对应技能：<code>devils-advocate-mad-skills</code>, <code>devils-advocate-reviewer</code>, <code>godfly-opposing-counsel</code>, <code>anti-sycophancy-molly</code>。</li>
              <li><strong>Tier 3: 独立多角色陪审团会诊 (The Jury & Red Team)</strong>：多智能体架构模拟，拆解为架构师、安全官、财务官与反直觉质疑者组成的多维陪审团，实行背靠背独立投票质证，彻底粉碎单一会话同质化回音壁。对应技能：<code>the-jury</code>, <code>the-fool</code>, <code>red-team-review</code>, <code>receiving-code-review</code>。</li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景推荐自卫技能 (点击卡片查看实证)：</h4>
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

        <!-- Section 4.4 (Agent Execution Security) -->
        <div id="sec-4-4" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-4" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.4 执行时 · Agent 权限越权与沙盒隔离 (Execution Safety)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            随着具备 Shell 终端执行、文件改写和 MCP 扩展能力的智能体（Trae IDE、WorkBuddy、Cursor Agent、Claude Code 等）普及，<strong>AI 的安全威胁完成了从“生成错误文本”到“执行毁灭动作”的本质跃迁</strong>。一个轻率的 <code>rm -rf</code>、一个对外部毒化 Issue 的盲目解析，或者一个被投毒的 MCP 工具，都可能直接擦除你的项目甚至突破宿主机防线。
          </p>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5 my-3 text-xs">
            <div class="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <span>🚨 Agent 与自动化执行违规追责案例（点击查看行政处罚通报）：</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 pt-0.5">
              ${makeIncidentPill('case-outcall-douxing-shanghai-2026', '国家市监总局典型案例：斗星智能AI批量外呼虚假宣传罚款20万元 ↗')}
            </div>
          </div>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>❌ 常见高危做法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                在 IDE 或终端开启无感全自动执行模式（如 YOLO 或“允许完全访问”），对不可信仓库允许智能体在宿主机裸机执行未审视的 Shell 脚本与文件批量覆盖；随意挂载不受信任的第三方 MCP 服务。
              </p>
            </div>
            <div class="scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>✅ 规范自卫打法</span>
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                严格保持“默认权限”与审批弹窗；将高危脚本和测试任务重定向到 E2B 临时微型虚拟机中物理隔绝运行；对 MCP 工具按需单项授权，审查工具 descriptor 防止供应链语义投毒。
              </p>
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">你可以这样做（按自己的情况选一档）</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">零门槛 · 只用浏览器或手机</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li><strong>只在网页或手机 App 上聊天的读者，可以跳过本节。</strong></li>
                  <li>如果你用的工具能操作电脑（读写文件、运行命令），保持“默认权限 / 每步确认”，不要开启“完全访问”“自动执行全部”。</li>
                  <li>让 AI 动手前，先备份重要文件夹。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">进阶 · 愿意装个软件</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>不要安装来源不明的插件或 MCP 工具；只开启当前任务真正需要的那几个。</li>
                  <li>在单独的系统账户、虚拟机或容器里运行 AI 自动执行的任务。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">专业 · 使用支持技能的 AI 工具</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>启用 <code>agent-sandbox-skill</code>，把高风险脚本放进一次性的隔离环境中执行。</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ 怎么确认做对了：</strong>AI 执行的每一个删除、覆盖、联网操作，你都在弹窗里亲眼看过并点了确认。</p>
          </div>

          <!-- Real World Exploit / Architecture Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">Agent 与 MCP 在野真实攻击面 (Empirical Attack Vectors)</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">CVE漏洞实证</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开实证 ⬇</span>
                <span class="hidden group-open:inline">收起实证 ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>权限门禁 ≠ 物理容器</strong>：WorkBuddy 将权限严谨分为“默认权限”（限制工作空间、弹窗确认）与“完全访问”；Kimi Work 官方明确提示完全权限存在文件覆盖和系统改动风险。没有容器沙箱前，严禁开启无确认全自动执行。</li>
              <li><strong>MCP 服务端 SSRF 风险（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-40100" target="_blank" class="text-brand font-bold underline">FastGPT CVE-2026-40100 ↗</a>）</strong>：公开安全漏洞分析显示，MCP <code>runTool</code> 接口曾存在未认证 SSRF，外部请求可被诱导向内部私有地址发起探测，需及时升级防护补丁并建立网络隔离。</li>
              <li><strong>跨租户配置泄露（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand font-bold underline">Dify CVE-2026-41947 ↗</a>）</strong>：Dify 曾曝出 Trace 配置未授权访问，攻击者可将受害者的提示词和响应流重定向至外部监听端点（已在 v1.14.2 修复）。</li>
              <li><strong>MCP 语义供应链投毒 (Tool Poisoning)</strong>：学术界与 PoC 证实，恶意 MCP 工具可在描述元数据中隐蔽嵌入系统指令，即使用户未主动调用该工具，也会劫持模型对上下文的任务推演。</li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景推荐自卫技能：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("agent-sandbox-skill", "agent-sandbox-skill · 微虚拟机沙盒执行隔离")}
            </div>
          </div>
        </div>

        <!-- Section 4.5 (Pre-Handoff) -->
        <div id="sec-4-5" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-5" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.5 交付前 · 生产发布的“四大法定门禁”与生成标识 (Pre-Handoff)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这是负责任 AI 工作流中具有法律效力的最后关口。当一段由 AI 辅助生成的代码、一篇营销稿件、一份产品页面准备推向生产环境或公开发表时，绝不能凭直觉直接放行。在法律层面上，<strong>AI 从来不是法律责任的主体，任何生成物均由使用者与发布企业承担完全法律责任</strong>。未经门禁校验的内容可能瞬间触发市场监管部门的行政处罚罚单、无障碍侵权纠纷、密钥失窃灾难，乃至开源侵权诉讼。
          </p>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 space-y-1.5 my-3 text-xs">
            <div class="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <span>🚨 发布与商业化真实违法惩处判决（点击查看案卷文号与行政罚单）：</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 pt-0.5">
              ${makeIncidentPill('case-ad-fake-host-haidian-2025', '北京海淀市监局：AI仿冒主持人推销食品虚假广告罚款20万 ↗')}
              ${makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', '北京通州首例刑案：Stable Diffusion图生图电商拼图判刑1年半 ↗')}
              ${makeIncidentPill('case-criminal-extortion-medical-shanghai-2026', '上海杨浦法院刑案：男子用AI制造假病历敲诈勒索拘役判决 ↗')}
            </div>
          </div>

          <!-- 4 Statutory Gates Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>门禁一：商业与营销主张法定合规门禁</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                严格阻断 AI 生成绝对化用语（《广告法》第9条“国家级/最高级/最佳”）、普通食品宣称疾病疗效（《广告法》第17条）与虚假宣传（《广告法》第28条、《反不正当竞争法》第8条）。每一项主张必须绑定客观引证依据。
              </p>
              <div>${makePill("marketing-claims-review", "marketing-claims-review · 广告法与 FTC 审查门禁")}</div>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>门禁二：数字包容与法定 Web 无障碍门禁</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                中国《无障碍环境建设法》第32条对利用财政资金建设的公共服务网站提出合规要求，并鼓励各类公众服务平台提升无障碍水平。W3C WCAG 2.1 AA 是国际通行的关键设计与审计基线，防范生成代码缺失语义标签、缺乏键盘导航或对比度严重不足（低于 4.5:1）。
              </p>
              <div>${makePill("web-accessibility", "web-accessibility · 法定 WCAG 无障碍门禁")}</div>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>门禁三：代码凭证与密钥泄露物理拦截</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                在 Git Pre-commit 阶段利用 Gitleaks 与 OWASP 规则集，物理扫描并阻断大模型代码补全中可能夹带的硬编码 API Key、私钥证书、内网数据库连接串直接推向外部仓库。
              </p>
              <div>${makePill("repo-security-review", "repo-security-review · 凭证泄露审查门禁")}</div>
            </div>

            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>门禁四：开源协议传染与微调版权合规</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                依据 SPDX 规范与中国司法裁判标准，阻断 AI 引入 GPL/AGPL 代码导致的商业闭源传染与侵权风险；对齐奥特曼 LoRA 判例，禁止无授权复现高知名商业 IP。
              </p>
              <div>${makePill("license-compliance-audit", "license-compliance-audit · SPDX 协议合规审计")}</div>
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">你可以这样做（按自己的情况选一档）</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">零门槛 · 只用浏览器或手机</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>发布前自问三句：有没有“最、第一、国家级、根治”这类词？</li>
                  <li>文中的数字和功效，有没有可以出示的来源？</li>
                  <li>这是 AI 生成或合成的内容吗？如果是，按《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行）添加标识。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">进阶 · 愿意装个软件</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>网页类成果：用 Chrome 开发者工具中的 Lighthouse 跑一次无障碍检测。</li>
                  <li>代码类成果：提交前用 Gitleaks 等工具扫描是否夹带密钥。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">专业 · 使用支持技能的 AI 工具</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>启用下方四个门禁技能，在发布流程中自动拦截。</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ 怎么确认做对了：</strong>假如有人逐句追问“这句话的依据是什么”，你都能拿出来。</p>
          </div>

          <!-- Real World Statutory & Judicial Forensic Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">行政处罚文号、司法判决要旨与法定标识实证 (Forensic Legal Evidence)</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">法定判例实据</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">展开实证 ⬇</span>
                <span class="hidden group-open:inline">收起实证 ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>市场监管部门 (AMR) 真实行政处罚案例</strong>：
                <ul class="list-none pl-2 space-y-1 mt-0.5">
                  <li>• <strong>厦门市集美区市场监管局（2025年7月）</strong>：苗古金贴（厦门）大药房有限公司，利用 AI 技术凭空生成“传承千年苗方苗古金贴传承人”“第56代传承人”等根本不存在的人物身份及“中老年专用”绝对化宣传，依据《广告法》第四、二十八、四十六条重罚 <strong>120 万元人民币</strong>（市场监管总局 2025 互联网违法广告典型案例）。</li>
                  <li>• <strong>北京市海淀区市场监管局（2025年6月）</strong>：北京心情好生物科技有限公司，利用 AI 仿冒央视知名主持人形象与声音推销普通食品“深海多烯鱼油”并宣称疾病治疗效果，被罚款 <strong>20 万元人民币</strong>（北京首例查处滥用 AI 技术冒用名人广告案）。</li>
                  <li>• <strong>北京市昌平区市场监管局（2026年）</strong>：北京双泰源贸易有限公司，利用 AI 虚拟人直播销售普通食品并宣称提高免疫力，依《反不正当竞争法》被责令停止并处罚款。</li>
                  <li>• <strong>总局 2025 数据通报</strong>：前三季度全国查办互联网违法广告 <strong>22,185 件</strong>，罚没 <strong>1.11 亿元</strong>，专项督办 AI 虚假广告。</li>
                </ul>
              </li>
              <li><strong>FTC "Operation AI Comply" 国际对比</strong>：美国 FTC 严厉打击缺乏实证支持的 AI 吹嘘（AI Washing）：DoNotPay 因宣传所谓“世界首个机器人律师”被罚款 19.3 万美元并被严禁无实证宣传；2026 年 8 月 CMG Media 等三家公司因虚假宣称 AI“Active Listening”监听消费者语音定向广告和解支付 93 万美元；Air AI 2026 年 3 月因虚假商业机会承诺达成和解。核心在于 Substantiation（每一项效能声称必须具备严密证据支撑）。</li>
              <li><strong>无障碍标准与法定指引</strong>：中国《无障碍环境建设法》（2023年9月1日施行）第三十二条规定利用财政资金设立的网站逐步符合无障碍标准，并鼓励公共服务网站提升无障碍水平。W3C WCAG 2.1 AA 国际准则是工程设计的重要基线（如色彩对比度通常不低于 4.5:1，交互控件支持纯键盘导航与语义回退）。</li>
              <li><strong>奥特曼 LoRA 终审版权案 (2024)浙0192民初1587号 / (2024)浙01民终10332号</strong>：杭州互联网法院审理、杭州市中级人民法院于 2024 年 12 月 30 日终审判决的标志性案件。一审认定“触手 AI”平台提供奥特曼 LoRA 模型训练并在模型广场分发、设立“IP作品”专区且具备低成本事前过滤能力而未采取必要措施，构成信息网络传播权之<strong>帮助侵权</strong>，判令下架并赔偿损失；二审驳回上诉、维持原判。该案确立了高知名 IP + 稳定复现 LoRA + 商业获利的平台注意义务边界。</li>
              <li><strong>开源协议传染司法判例与 AI 代码补全</strong>：最高人民法院 <code>(2021)最高法知民终2063号</code> 终审裁判（维持深圳中院 VirtualApp 案 <code>(2019)粤03民初3928号</code>）确认，违反 GPLv3 条件导致许可依法终止，继续使用代码构成著作权侵权；同时最高法在 <code>(2019)最高法知民终663号</code> 确立独立程序通过标准接口交互不当然被 GPL 传染。AI 代码补全绝不是许可证清洗机，CI/CD 必须强制引入 SCA 与 SBOM 比对；SaaS 云服务尤其严防 GNU AGPLv3 第 13 条因网络交互触发强制开源。</li>
              <li><strong>法定生成标识与水印义务</strong>：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容必须添加显著显式标识与元数据隐式水印。<strong>铁律：“本内容由 AI 生成”只属于来源披露义务，绝不能免除内容发布者的法律侵权或广告违法责任。</strong></li>
            </ul>
          </details>

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

        <!-- Section 4.6 (Post-Session) -->
        <div id="sec-4-6" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-6" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.6 收尾阶段 · 会话清理与完成校验 (Post-Session)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            一个负责任的协作闭环，终结于两个并行动作：其一，安全清理本地临时会话记录与日志，避免敏感上下文残留；其二，对最终输出文本做去套路润色，消除 AI 生成的机械腔调。贯穿始终的铁律是：<strong>未经硬性测试通过，绝不宣称任务完成。</strong>
          </p>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">你可以这样做（按自己的情况选一档）</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">零门槛 · 只用浏览器或手机</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>含敏感内容的对话用完即删；再到【设置 › 记忆】里把相关记忆单独删除。</li>
                  <li>交付前问自己：“这件事我自己检查过了吗？”没检查过，就不要说“已完成”。</li>
                  <li>润色是为了表达更清楚，不是为了隐瞒用过 AI——该披露的仍要披露。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">进阶 · 愿意装个软件</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>定期（如每月）清理一次各 AI 平台的历史对话和上传文件。</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">专业 · 使用支持技能的 AI 工具</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>启用 <code>verification-before-completion</code>，要求 AI 在宣称完成前先跑完检查。</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ 怎么确认做对了：</strong>一个月后回看，平台上没有残留你不想留下的对话和文件。</p>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ 本场景推荐自卫技能：</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("verification-before-completion", "verification-before-completion · 完成铁律：硬性检验门禁")}
              ${makePill("humanizer", "humanizer · 人性化文本去套路润色")}
            </div>
          </div>
        </div>
      </section>

      <!-- Chapter 5 -->
      <section id="chapter-5" class="space-y-8 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 5 · 角色剧本</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            角色剧本：普通人的一日安全工作流
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            如何把这 44 个开源安全技能组装成符合你日常工作节奏的自卫链条？以下是五类典型使用者（高校学者、软件工程师、文案营销、政企行政人员以及普通个人与家庭日常）的真实一日战术攻防演练。
          </p>
        </div>

        <!-- Section 4.1 -->
        <div id="sec-5-1" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-1" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>剧本一：高校研究生与学术研究者的一天</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              学术科研 · Graduate Researchers &amp; Scholars
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. 真实工作痛点与诱惑 (Temptation &amp; Pain Point)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                面对毕业论文开题报告、万字前沿综述 DDL 以及国家自然科学基金/重点课题申报书起草，学者必须在数日内研读数百篇英文文献并梳理创新脉络。面对巨大时间压力，极具诱惑力的是将未发表的独创实验设想、独创推演假说或原始实验数据，直接全选贴入商业联网大模型以寻求一键生成综述框架或整段润色。
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. 高危翻车瞬间与学术红线 (Near-Miss Incident)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>未发表成果遭云端截留与严重泄密处分</strong>：国家保密行政管理部门通报的科研人员小李案——小李为图省事，将核心实验数据与未发表成果上传至商业 AI 写作应用，导致该领域核心敏感数据被云端留存并在互联网流传，造成国家利益损失并受到严肃处理；同时，若未加核查直接采信大模型基于自回归概率编造的“权威学者、虚构刊号与假 DOI”，一旦进入同行评议或盲审，将被直接定性为学术不端与虚构引文。
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-state-security-li-leakage-2025', '国安部科研人员小李泄密受处分案 ↗')}
                ${makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers期刊AI生成图表撤稿案 ↗')}
                ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', '通州法院AI编造虚假判例批评案 ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. 自卫技能流水线：一日防御时刻表 (Defensive Pipeline)</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 上午 09:30 · 课题设想沙盒隔离与防训练采集</span>
                在利用 AI 协助构思文献综述脉络时，严禁将原创实验参数或实验代码直传公网。调用 ${makePill("scholar-safety", "scholar-safety · 学术检索隐私隔离")}，在本地对独创假说与未发表设想实施差分抽象脱敏，构建单向检索沙盒，彻底阻断商业大模型利用前沿科研思路作为下一代训练语料。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 下午 14:00 · 综述引文 CrossRef 自动化验真与裁判官质证</span>
                大模型生成文献综述与论据支撑后，坚决执行“默认虚构”零信任查验。调用 ${makePill("bibref-verify", "bibref-verify · 参考文献精准核验")} 自动请求 CrossRef REST API 与 PubMed 数据库，逐条校验 DOI、卷期与出版元数据真实性；同时调用 ${makePill("the-judge", "the-judge · 裁判官逻辑交叉质证")} 模拟同行评审专家对核心论点与引证逻辑展开双向交叉质询，挤出概率拼凑的水分。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 傍晚 17:30 · 期刊透明度附录与 Nature CRediT 贡献者陈述</span>
                在向顶刊、毕业答辩委员会或导师交付论文定稿前，杜绝“隐瞒使用”或“敷衍声明”。调用 ${makePill("ai-disclosure-convention", "ai-disclosure-convention · 学术出版 AI 披露规范")}，严格遵照 Nature 与 ICMJE 作者贡献分类标准（CRediT Taxonomy），生成详尽的《AI 辅助工作流透明度附录》（明晰披露 AI 仅用于文献语法润色，所有学术推演与结论由人类作者独立签署），筑牢学术声誉防线。
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. 交付成果与审计留痕 (Verification Proof)</span>
            </div>
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>• <strong>最低要求（零门槛）</strong>：引文清单中的每一条文献，必须亲手在 doi.org 或知网/PubMed 检索并点开确认过，确保篇名、作者、刊期真实存在；文末明确附上一句话 AI 使用声明（如仅用于语法润色）。</p>
              <p>• <strong>理想状态（专业进阶）</strong>：附带经 CrossRef 官方 API 逐条核验的《文献引文真实性报告》与标准规范的《Nature CRediT AI 使用透明度陈述附录》，使学术推演经得起第三方盲审复核。</p>
            </div>
          </div>
        </div>

        <!-- Section 4.2 -->
        <div id="sec-5-2" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-2" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.2 软件工程师与开源维护者的一天</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              研发运维 · Software Engineers &amp; Maintainers
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. 真实工作痛点与诱惑 (Temptation &amp; Pain Point)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                面对冲刺发版排期、线上突发严重 Crash 堆栈排查、高并发微服务重构以及开源仓库数十个待审 Issue，工程师渴望借助编程 Agent（如 Cursor Agent、Trae、Claude Code 等）直接读取本地代码仓库、自动编写高覆盖率单元测试并执行自动化修复。
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. 高危翻车瞬间与法律合规红线 (Near-Miss Incident)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>凭证外泄、公网裸露与开源协议合规三重风险</strong>：国企工程师曾因使用商业 AI 时未脱敏代码环境，导致核心架构与实时数据库凭证外流境外；新华社通报小王案中，个人电脑部署开源大模型因默认公网端口裸露且未设密码，被境外 IP 批量渗透窃密；智能体在 YOLO 模式下解析含间接注入的不可信 Issue 险些在宿主机误删配置文件；此外，AI 生成代码若混入 GPLv3/AGPLv3 传染性协议代码，可能触碰《最高法(2021)最高法知民终2063号》判例所确立的底线，使项目面临源码披露义务或著作权侵权指控。离职带走系统调优 Prompt 模板亦已被正式定性为侵犯商业秘密违法行为。
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', '杭州首例大模型Prompt商密侵权案罚款35万 ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. 自卫技能流水线：一日防御时刻表 (Defensive Pipeline)</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 上午 10:00 · 生产配置本地抹除与微虚拟机物理隔离执行</span>
                在将报错堆栈或代码段提交模型调试前，本地调用 ${makePill("pii-safe-documents", "pii-safe-documents · 文档敏感脱敏")} 自动用正则与高熵检测抹去私钥、JWT Token、内网 IP 与数据库密码；对 Agent 自动执行的重构测试与 Shell 脚本，强制调用 ${makePill("agent-sandbox-skill", "agent-sandbox-skill · 微虚拟机沙盒执行隔离")} 在抛弃式 E2B 微虚拟机中隔绝运行，杜绝宿主机裸机执行风险。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 下午 15:30 · 架构回音壁对抗攻防与反谄媚质询</span>
                面对大模型对分布式架构的赞不绝口（“您的方案完美兼顾了弹性与高可用”），工程师警惕 RLHF 机制的谄媚本能。调用 ${makePill("sycophancy-challenger", "sycophancy-challenger · 谄媚质疑挑战者")} 剥除迎合修饰，同时唤起 ${makePill("red-team-review", "red-team-review · 红队对抗漏洞挖掘")} 扮演外部黑客视角，对网络脑裂、幂等性缺陷与反序列化漏洞展开极限压力测试。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 晚上 19:00 · Git Pre-commit 凭证拦截、SPDX 开源合规与全体验证</span>
                在发起 Pull Request 前，本地自动触发 ${makePill("repo-security-review", "repo-security-review · 凭证泄露审查门禁")} 基于 Gitleaks 拦截隐藏在 commit 历史中的私钥；调用 ${makePill("license-compliance-audit", "license-compliance-audit · SPDX 协议合规审计")} 扫描代码的 SPDX 开源协议兼容性，彻底阻断 AGPL/GPL 闭源传染风险；最后严格执行 ${makePill("verification-before-completion", "verification-before-completion · 完成铁律：硬性检验门禁")}，只有本地全套单元测试与集成测试亮绿灯后才允许合并上线。
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. 交付成果与审计留痕 (Verification Proof)</span>
            </div>
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>• <strong>最低要求（零门槛）</strong>：提交前本地运行 <code>git diff</code> 逐行复核，确保没有硬编码任何 API Key、密码或内网 IP；手动跑通全部核心单元测试，严禁直接推送未经人工过目的 AI 代码。</p>
              <p>• <strong>理想状态（专业进阶）</strong>：PR 附带 Gitleaks 密钥扫描通过证明、沙盒执行日志与 SPDX SBOM 依赖许可证合规报告，使交付对安全架构组与开源社区完全透明可查。</p>
            </div>
          </div>
        </div>

        <!-- Section 4.3 -->
        <div id="sec-5-3" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-3" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.3 文案策划与数字营销专员的一天</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              创意营销 · Writers &amp; Marketing Specialists
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. 真实工作痛点与诱惑 (Temptation &amp; Pain Point)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                面对电商大促倒计时、多渠道自媒体矩阵批量推文以及活动推广落地页的高频上线需求，文案专员每天需要创作数十套爆款标题、产品详情页与宣发文案。为迅速夺取用户注意力，极其容易顺从大模型生成的极具煽动性、但充斥着夸大修辞的草稿直接发布。
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. 高危翻车瞬间与法定处罚红线 (Near-Miss Incident)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>巨额虚假宣传罚单与无障碍合规风险</strong>：AI 极易脱口而出“全网第一”、“国家级工艺”、“彻底根治”等词汇，直接触犯中国《广告法》第9条（绝对化用语禁令）、第17条（普通商品宣称医疗功效）及《反不正当竞争法》第8条。真实执法案例：厦门集美查处苗古金贴利用 AI 捏造“传承千年传承人”等虚假身份宣传，依法重罚 120 万元人民币；北京海淀查处利用 AI 仿冒央视主持人虚假推销鱼油罚款 20 万元；此外，AI 生成的前端落地页若缺失语义标签与对比度，可能难以达到政府与公共服务平台采购对于《无障碍环境建设法》及 WCAG 标准的无障碍合规要求。
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-ad-fake-host-haidian-2025', '北京海淀市监局：AI仿冒主持人推销食品罚款20万 ↗')}
                ${makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', '通州首例刑案：Stable Diffusion生图电商拼图判刑1年半 ↗')}
                ${makeIncidentPill('case-ai-voice-bj-2023', '北京互联网法院：全国首例声音侵权判赔25万 ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. 自卫技能流水线：一日防御时刻表 (Defensive Pipeline)</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 上午 10:30 · 机械套路清洗与人性化去八股润色</span>
                利用 AI 展开批量创意思路发散后，调用 ${makePill("humanizer", "humanizer · 人性化文本去套路润色")} 深度过滤 AI 高频公文与八股模板词（如“画卷铺展开来”、“不可否认的是”、“在这充满挑战的时刻”等），重构真实生动、具有人类情感温度和现场感的好文案。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 下午 15:30 · 中国《广告法》与 FTC 标准逐句实质合规审核</span>
                在文案交付视觉设计排版前，调用 ${makePill("marketing-claims-review", "marketing-claims-review · 广告法与 FTC 审查门禁")} 按照中国《广告法》与美国 FTC Substantiation 法则逐句进行合规筛查，强制要求文案中每一个功能参数与功效声称（如“续航长达48小时”、“效率提升30%”）均必须附带经权威机构检测报告支撑的客观证据锚点，坚决剔除“最、首选、顶级”等违法极端用语。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 傍晚 18:00 · 营销落地页 W3C WCAG 2.1 AA 读屏与对比度门禁</span>
                对前端营销落地页与海报交互代码，执行 ${makePill("web-accessibility", "web-accessibility · 法定 WCAG 无障碍门禁")}，系统化校验文字对比度是否达标（&ge; 4.5:1）、是否全键盘可访问、是否具备完整 ARIA 屏幕阅读器标签，确保每一位残障和老年读者都能平等无碍浏览。
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. 交付成果与审计留痕 (Verification Proof)</span>
            </div>
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>• <strong>最低要求（零门槛）</strong>：文案交付前亲手通读筛查，删去所有“最、第一、根治、绝对”等绝对化词汇；所有宣称的功效与数字必须有内部真实凭据；对外发布时明确标明“AI 辅助生成”。</p>
              <p>• <strong>理想状态（专业进阶）</strong>：出具完整的《广告法合规声明对照表》（逐项绑定检测报告编号）与落地页 WCAG 2.1 AA 无障碍合规检测，消除行政处罚与诉讼隐患。</p>
            </div>
          </div>
        </div>

        <!-- Section 4.4 -->
        <div id="sec-5-4" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-4" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.4 政企行政与企业知识工作者的一天</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              政企行政与法务合规 · Enterprise, Legal &amp; Administrative Staff
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. 真实工作痛点与诱惑 (Temptation &amp; Pain Point)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                在党政机关、央国企及大型民营企业的办公室综合科、法务合规部、采购招投标部与人力资源科室，员工每天面对长达数小时的高频内部例会录音整理、敏感公文起草、几十万字采购招标文件条款比对、重大商业合同风险初审以及涉及薪酬的员工绩效材料。面对繁重机械的工作量与急迫的发文时限，员工极度渴望利用市面上流行的商业大模型（网页端/微信 AI 助手）“一键转写语音”、“一键总结红头文件”、“一键审查合同条款”，甚至将供应商商业报价全选粘贴进输入框。
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. 高危翻车瞬间与纪律处分红线 (Near-Miss Incident)</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>涉密公文泄密通报、保密法规追责与劳动合同解除</strong>：国家保密局与国家安全部通报李某私自将涉密方案输入手机 AI 写作应用受到严肃处理；涉密人员冯某妄图以“字母代码替换涉密敏感词”规避审查输入 AI 写作，依然因涉密风险暴露受到严肃处分（保密局严厉警示：“分段输入、代码替换、删除对话即可安全”纯属违法侥幸，国家秘密绝对不能脱敏上网）；安保方案经云端 OCR 小程序转写造成泄密，导致单位副职领导王某行政警告、两名第三方人员直接被解除劳动合同。新修订《保守国家秘密法》确立<strong>“涉密不上网，上网不涉密”</strong>铁律，且《实施条例》第六十一条规定可能泄密须在 <strong>24 小时内</strong> 强制如实上报；企业内部亦普遍设立“红黄绿灯规则”与“三不准原则”，违规使用公共 AI 处理保密信息将直接记入人事档案、解除劳动合同并不予经济补偿，直至依法追究刑事责任（《刑法》第398条）。
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密案 ↗')}
                ${makeIncidentPill('case-state-secrecy-feng-leakage-2026', '保密观通报：冯某重大会议材料输入AI写作案 ↗')}
                ${makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退 ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. 自卫技能流水线：一日防御时刻表 (Defensive Pipeline)</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 上午 09:30 · 涉密公文与会议纪要本地离线脱敏（严禁云端听会）</span>
                坚决断开并禁用任何带“云端同步”、“AI 听会”或自动上传的第三方商业录音转写工具；针对包含内部管理与非核心业务内容的纪要，在本地电脑离线环境中调用 ${makePill("presidio-anonymize-text", "presidio-anonymize-text · 微软标准文本匿名化")} 与 ${makePill("pii-safe-documents", "pii-safe-documents · 文档敏感脱敏")}，利用 NLP 实体识别技术将领导真实姓名、内部项目敏感代号、未公开财务指标替换为标准类型化稳态占位符（如 <code>[DEPT_HEAD_A]</code>、<code>[PROJECT_ALPHA]</code>、<code>[METRIC_VALUE_X]</code>）；本地生成安全的加密映射隔离表并保存在本地加密保管库中，绝不随提示词发送给大模型；严守红线：若会议涉及国家秘密、工作秘密或核心商业秘密，坚决落实传统物理隔离保密流程，绝对不得靠“假名化脱敏”试图洗白上网。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 下午 14:30 · 采购招标文件与商业合同对抗性风险扫描</span>
                审核大型工程招投标文件或采购合同时，严格遵循“数据最小化”原则，剔除双方真实公司名、商业底价与特定财务流水；仅提取争议条款与违约赔偿机制文本，调用 ${makePill("godfly-opposing-counsel", "godfly-opposing-counsel · 模拟对方辩友质证")} 模拟严苛的对立审计稽查官与对手方首席法务顾问，站在“刁难挑刺、寻找责任转嫁漏洞”的极端对抗视角，全面扫描我方合同中的无限连带赔偿责任陷阱、知识产权归属含糊条款与不可抗力免责缺陷。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 傍晚 17:30 · AI 使用透明度台账与合规证据留痕</span>
                对照《政务领域人工智能大模型部署应用指引》与企业 Responsible AI 内部政策中“全周期管理、辅助型定位、运行日志及定期审计”的硬性要求，调用 ${makePill("ai-provenance", "ai-provenance · AI 来源与提示词追溯")} 导出结构化审计台账；台账中精确记录：AI 模型版本号、会话脱敏时间戳、提示词不可逆哈希校验值、人类复核责任人签字（Sign-off）记录；严禁私自删除会话记录掩盖违规，一旦遭遇企业内控审计或保密检查，凭借完备的证据链一键实现<strong>“全链路自证合规”</strong>。
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. 交付成果与审计留痕 (Verification Proof)</span>
            </div>
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>• <strong>最低要求（零门槛）</strong>：任何呈送云端 AI 辅助处理的公文或纪要，严禁包含真实企事业单位全称、领导姓名与涉密信息；坚决执行“涉密不上网”铁律。</p>
              <p>• <strong>理想状态（专业进阶）</strong>：出具本地离线脱敏对照单、Godfly 模拟对抗审计的合同风控意见书及附带人类签署人盖章的《企业 AI 办公合规留痕单 (Provenance Ledger)》。</p>
            </div>
          </div>
        </div>

        <!-- Section 4.5: Everyday Citizens & Family Routine -->
        <div id="sec-5-5" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-5" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.5 普通个人与家庭日常：看病求医、辅导作业与防范诈骗</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              家庭生活 · Everyday Citizens & Families
            </span>
          </div>

          <!-- Part 1: Pain Point -->
          <div class="space-y-1.5">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>1. 真实生活痛点与诱惑 (Temptation & Pain Point)</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              日常生活中，普通家庭最常使用 AI 的场景并不是编写代码或起草公文，而是：身体不舒服时把症状或体检化验单随手发给 AI“看病”，让 AI 替孩子直接写作文和解答理化难题，或者在社交软件中收到疑似亲友借钱的语音和视频。面对图省事、图安心的心理，人们很容易把 AI 当成全知全能的家庭医生或全科家庭教师，甚至对高度逼真的 AI 拟真音视频丧失警惕。
            </p>
          </div>

          <!-- Part 2: Near-Miss -->
          <div class="scenario-box-danger space-y-1.5">
            <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>2. 常见翻车瞬间与现实伤害 (Near-Miss Incident)</span>
            </div>
            <ul class="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4 list-disc leading-relaxed">
              <li><strong>误诊与乱用药险情</strong>：把长辈的体检异常指标输入大模型，AI 顺应用户焦虑给出耸人听闻的严重疾病推测，或自行建议药名与剂量；若不经执业医生核验盲目用药，极易贻误病情造成不可逆健康损害。</li>
              <li><strong>孩子思维能力“被替代”</strong>：孩子把整道几何大题或作文题目拍照发给 AI 抄答案，表面作业全对，实质丧失了拆解问题与独立构思的过程，形成不可逆的认知依附。</li>
              <li><strong>深度伪造（Deepfake）AI 拟声换脸诈骗与虚假宣传</strong>：诈骗团伙截取社交平台公开发布的语音或短视频片段仿造声音致电老人诈骗；商家私自克隆主持人声音形象进行虚假宣传带货，导致个体声誉受损或财产损失。</li>
            </ul>
            <div class="pt-1 flex flex-wrap gap-1.5">
              ${makeIncidentPill('case-ai-voice-bj-2023', '北京互联法院全国首例AI声音侵权案 ↗')}
              ${makeIncidentPill('case-ad-fake-host-haidian-2025', '海淀法院AI克隆知名主持人带货虚假宣传案 ↗')}
              ${makeIncidentPill('case-ftc-donotpay-robot-lawyer-2025', 'FTC查处DoNotPay“世界首位机器人律师”虚假营销案 ↗')}
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="space-y-2">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. 家庭自卫流水线：日常四个好习惯 (Defensive Pipeline)</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🏥 习惯一 · 问健康：把 AI 当就诊“准备清单”，绝不当“主治医生”</span>
                就医咨询前可让 AI“整理去医院时该向医生交代的 5 个关键问题”，但输入体检报告前务必遮盖名字、身份证号与就诊医院；严守铁律：凡涉及“吃什么药、吃几粒、停不停药”，<strong>只听正规医院当面诊断处方</strong>，坚决不信大模型的自行配药建议。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">📚 习惯二 · 伴学习：用追问做“思维脚手架”，严禁直接要现成答案</span>
                与孩子约定辅导原则：给 AI 的提示词必须是“不要直接告诉我答案，请问我 3 个启发性问题，引导我自己把这道题想出来”。利用 ${makePill("discernment-nudge", "discernment-nudge · 批判性辨识微提醒")} 引导孩子找出 AI 讲解里不合逻辑的漏洞，把 AI 当成练辩论的陪练。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🛡️ 习惯三 · 防电诈：家庭设立“线下安全暗号”，转账必须多源核验</span>
                与父母、配偶约定只有家庭内部知道的口令（如“外公最爱吃的菜”或一串数字暗号）。一旦接到声称亲友急用钱、要求转账到陌生账户的微信语音或视频，<strong>无论声音画面多么逼真，先问暗号，并立即挂断通过原手机号二次回拨核实</strong>。
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">📱 习惯四 · 护隐私：帮父母手机检查 APP 权限与长期记忆</span>
                定期花 3 分钟检查父母常用聊天软件中的 AI 助手，撤销麦克风与相册的常驻后台权限；在设置中关闭“允许使用我的数据训练”，并清空历史累积的个人记忆列表。
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. 家庭自卫检查清单 (Everyday Checklist)</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              每个家庭成员都能轻松达到的安全基线：① 问健康不盲信药名，就医当面遵医嘱；② 辅导作业只问思路步骤，不抄整句整篇；③ 转账汇款必对家庭暗号，回拨本人核实；④ 手机 AI 助手权限只给必要，定期清空个人记忆。
            </p>
          </div>
        </div>
      </section>

      <!-- Chapter 6 -->
      <section id="chapter-6" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 6 · 倡导与共建</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            倡导与共建：数字自卫从个人走向社群
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 mb-6">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              我们为什么拒绝空洞的宏大伦理？
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              现有的 AI 治理讨论，大多停留在学术精英的象牙塔或跨国科技巨头的合规白皮书中。“公平、向善、透明、负责”等词汇虽然高尚，但当一个普通职员面对一个正在闪烁光标的对话框时，这些宏观口号无法给他提供任何趁手的防护工具。
            </p>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>《负责任与安全使用 AI》开源实务库的诞生，就是为了给每一个普通人递上一把实操的护盾与求证的标尺。</strong>我们不发明虚幻的概念，而是将全球开源社区经过工程实测验证的 44 项规范技能（SKILL.md）系统化收录，让每个人都能以最低的技术门槛，在日常会话工作流中筑起安全防护。
            </p>
          </div>
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
              <a href="library.html" class="btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5">
                <span>🛡️ 立即探索 44 项开源技能</span>
              </a>
              <a href="https://putongren.org" target="_blank" class="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <span>🌐 访问 putongren.org 社区</span>
              </a>
            </div>
          </div>

          <!-- Community Fact-Check & Feedback Box -->
          <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔍</span>
              <span>发现指南有错、法条变动或案例失效？</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              我们坚持<strong>“实证可查、事实优先”</strong>。如果指南中的法条条文有更新、案例事实有出入、平台设置入口发生变动，或者某个开源技能链接失效，请毫不犹豫地向我们指正！
            </p>
            <div class="pt-2">
              <a href="https://github.com/digitalrightsforall/guide_responsible_AI_use/issues/new?title=%5B%E5%86%85%E5%AE%B9%E5%8B%98%E8%AF%AF%5D+" target="_blank" class="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 border border-slate-300/80 dark:border-slate-700">
                <span>🐛 在 GitHub 提交勘误反馈 ↗</span>
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
    navLinkGuide: "Field Guide",
    navLinkLibrary: "Skill Library",
    navLinkIncidents: "Incident Casebook",
    navLinkPutongren: "putongren.org",
    footerLinkIncidents: "Incident Casebook",
    tLangBtn: "中文",

    heroBadge: "Digital Rights for All · Practical Field Guide",
    heroTitle: "Responsible & Safe AI Use: ",
    heroTitleHighlight: "A Field Guide for Everyone",
    heroSubtitle: "A practical self-defense manual for everyday citizens using AI: protect your privacy and boundaries first, and ensure what you deliver stands up to third-party verification.",
    metaReadTime: "Est. Read: 3-min quick start · ~35 mins full guide",
    metaSkillsCount: "44 Open-Source Skills",
    metaScenarios: "6 Core Workflow Scenarios",
    heroCtaPlaybook: "Explore Playbook",
    heroCtaLibrary: "Browse 44 Skills in Library",

    tocTitle: "Table of Contents (TOC)",
    sidebarBoxDesc: "Any skill with a badge can be clicked to view verified test status, statutory alignment, and install commands inline.",
    sidebarBoxLink: "Go to Skill Library ↗",

    // Chapter HTML Content (English)
    bodyHtml: `
      <!-- Chapter 1 -->
      <section id="chapter-1" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
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
            Behind the high-tech euphoria, ordinary users face alarming, asymmetric vulnerabilities validated by scientific empirical studies and landmark legal cases:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs">
              <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>Vulnerability 1: Silent Loss of Sovereignty & Quasi-Identifier Mosaics</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Even without disclosing your name, long-term multi-turn interaction yields age, location, and professional clues ("quasi-identifiers") that can reconstruct complete identity dossiers in vector databases. Everyday users become unpaid training miners.
              </p>
            </div>

            <div class="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs">
              <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>Vulnerability 2: Confident Falsehoods & Cognitive Debt (MIT/Stanford EEG)</span>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Emerging cognitive science and HCI literature (such as MIT Media Lab's 2025 preprint <em>Your Brain on ChatGPT</em> and Anthropic's sycophancy investigations) suggests that wholesale delegation of analytical drafting to LLMs can introduce immediate memory decay and lower recall retention (in initial trials, 15 of 18 participants in the heavy-reliance condition struggled to accurately cite key points of just-generated text). Coupled with algorithmic sycophancy, uncritical reliance risks weakening personal verification habits without active critical scrutiny.
              </p>
            </div>
          </div>

          <!-- Structured Legal Precedents Section (English) -->
          <div class="my-6 space-y-3.5">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span>Landmark Legal Precedents: The Global and Domestic Cost of Blind AI Reliance</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">5 Empirical Cases</span>
            </div>

            <div class="space-y-3">
              <!-- Case 1: Beijing Voice Infringement -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🇨🇳 China's Landmark Voice AI Case</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">Beijing Internet Court (2023) Jing 0491 Min Chu No. 12142</span>
                    <span class="text-[10px] text-slate-400 font-mono">SPC Case Repository 2025-07-2-474-001</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">¥250,000 RMB Damages</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Incident &amp; Misuse
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      A voice actor's vocal recordings were extracted without express consent to train a commercial text-to-speech (TTS) engine and monetized across software platforms.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Judicial Ruling &amp; Defense
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      The court ruled natural person voice rights are independent of recording copyrights. <strong>Takeaway: Possessing a client audio recording license does NOT grant permission to feed it to AI voice cloning models!</strong>
                    </p>
                    <div class="pt-1.5">
                      ${makeIncidentPill('case-ai-voice-bj-2023', 'View Beijing Voice AI Landmark Judgment ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 2: Nanjing Internet Court Defamation -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🇨🇳 AI Search Summary Defamation</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">Nanjing Intermediate People's Court Final Ruling</span>
                    <span class="text-[10px] text-slate-400 font-mono">Jiangsu High Court Bulletin</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">Full Defamation Liability</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Incident &amp; Misuse
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      An AI search assistant hallucinated that a citizen was "sentenced to three years for bombing," displaying their real professional portrait alongside the false accusation.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Judicial Ruling &amp; Defense
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      The court ruled that AI indexing and synthesis constitutes "content production." The platform failed to promptly block defamatory content upon notice and was held fully liable for reputation infringement.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Case 3: Supreme People's Court Rules -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🇨🇳 SPC Litigation Guidelines</span>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">Opinions on Adjudicating AI-Related Disputes</span>
                    <span class="text-[10px] text-slate-400 font-mono">Fa Fa [2026] No. 10 (2026-09-07)</span>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900">Judicial Fines &amp; Sanctions</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Statutory Responsibility
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      Litigants using AI to assist legal drafting must verify authenticity and explicitly disclose AI assistance; fabricating evidence or precedents is strictly prohibited.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Judicial Ruling &amp; Defense
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      Fabricating false litigation using AI triggers fines, detention, and criminal penalties under Civil Procedure Law Art. 114. "The AI generated it" is never an affirmative defense.
                    </p>
                    <div class="pt-1.5 flex flex-wrap gap-1.5">
                      ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Tongzhou Court Fake Precedent Reprimand ↗')}
                      ${makeIncidentPill('case-court-fake-citation-yichang-2026', 'Yichang Court Hallucinated Cause of Action ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 4: US Federal Court Mata v. Avianca -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🌐 International Judicial Citation Debacle</span>
                    <a href="https://www.courtlistener.com/docket/63397390/mata-v-avianca-inc/" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-slate-900 dark:text-white hover:text-brand transition-colors">US Federal Court (SDNY) Mata v. Avianca (2023) ↗</a>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">$5,000 USD Sanction + Censure</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Incident &amp; Misuse
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      Practicing attorneys submitted a brief containing 6 hallucinated judicial decisions (including fake docket numbers, quotes, and judges) drafted using ChatGPT.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Judicial Ruling &amp; Defense
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      The judge sanctioned both attorneys and the firm for subjective bad faith and failure to verify. This landmark case established the universal rule of zero-trust physical verification for AI legal citations.
                    </p>
                    <div class="pt-1.5">
                      ${makeIncidentPill('case-mata-avianca-fake-citations-2023', 'View Mata v. Avianca $5k Sanction Details ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Case 5: Moffatt v. Air Canada -->
              <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                <div class="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand/10 text-brand dark:text-brand-container">🌐 Algorithmic Negligence &amp; Liability</span>
                    <a href="https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-slate-900 dark:text-white hover:text-brand transition-colors">Civil Resolution Tribunal Moffatt v. Air Canada (2024 BCCRT 149) ↗</a>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900">Full Damages Awarded</span>
                </div>
                <div class="p-3.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>Incident &amp; Misuse
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      Air Canada's AI customer support chatbot provided hallucinated instructions promising retroactive bereavement fare refunds that contradicted actual company policy.
                    </p>
                  </div>
                  <div class="space-y-1">
                    <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Judicial Ruling &amp; Defense
                    </span>
                    <p class="text-slate-600 dark:text-slate-400">
                      The tribunal rejected Air Canada's defense that the chatbot was a "separate legal entity," ruling the airline strictly liable for misleading representations made by its automated algorithms.
                    </p>
                    <div class="pt-1.5">
                      ${makeIncidentPill('case-air-canada-chatbot-refund-2024', 'View Moffatt v. Air Canada Misleading Chatbot Details ↗')}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Clarification Note -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span class="text-sm shrink-0">🔍</span>
                <div class="leading-relaxed space-y-1.5">
                  <p>
                    <strong class="text-slate-700 dark:text-slate-300">Forensic Negative Finding</strong>: As of October 2026, there are no public Chinese court judgments convicting an employee of criminal trade secret theft solely for typing company data into a commercial LLM (the closest administrative action was Hangzhou AMR's <strong>¥350,000 fine</strong> against algorithm employee Sun for leaking proprietary prompt templates and model architectures). The immediate daily risks remain employment NDA termination and civil liability under PIPL Art. 23 for unauthorized third-party personal data transmission.
                  </p>
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    ${makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', 'Hangzhou AMR ¥350k Fine ↗')}
                    ${makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Notice ↗')}
                    ${makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Notice ↗')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            Why Reject Toothless, Abstract AI Principles?
          </h3>
          <p class="leading-relaxed">
            Existing governance dialogues often dwell in ivory towers or corporate PR whitepapers. Grand slogans like "fairness, transparency, and accountability" offer zero defense when an everyday knowledge worker sits before a blinking chat prompt.
          </p>
          <p class="leading-relaxed">
            <strong>This curated repository and field guide exist to place tactical shields and verification rulers directly into people's hands.</strong> Rather than inventing buzzwords, we curate 44 production-tested, standard-aligned open-source SKILL.md packages to provide tangible defense in your daily workflow.
          </p>
        </div>
              <div class="p-4 rounded-xl bg-brand/5 dark:bg-brand/10 border border-brand/20 text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center justify-between gap-3 mt-6">
          <span>💡 Having seen these real-world casualties and legal liabilities, you might ask: "What should I immediately do with my daily AI apps?"</span>
          <a href="#chapter-2" class="text-brand font-bold hover:underline flex items-center gap-1">
            <span>First Steps: Turn Off Hidden Switches ➔</span>
          </a>
        </div>
      </section>

      <!-- Chapter 2 -->
      <section id="chapter-2" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 0 · BASELINE</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Defensive Baseline: Anti-Harvesting & Platform Hardening (Choose & Configure)
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <!-- 30s Quick Action Card for Everyday Citizens (EN) -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>First Step to Digital Self-Defense: 30-Second Quick Start (Do These 3 Things First)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. Turn off "Training"</span>
                <p class="text-slate-600 dark:text-slate-400">In your AI client's Settings, disable "Improve model for everyone" to prevent unreleased drafts from being absorbed into training corpora.</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. Audit "Memory"</span>
                <p class="text-slate-600 dark:text-slate-400">Regularly review Settings &gt; Memory. Deleting a chat conversation does NOT wipe memory entries—purge them individually.</p>
              </div>
              <div class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. Verify Before You Hand Off</span>
                <p class="text-slate-600 dark:text-slate-400">Before sharing AI outputs, manually double-check citations, statutory references, and names against authoritative sources.</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            Before typing a single word into the blinking prompt, security boundaries have already been negotiated. Many believe clicking "Delete Chat" or toggling off history provides immunity. However, underlying architecture reveals an <strong>"Illusion of Control"</strong>—hiding views on the UI does not equal complete server-side destruction.
          </p>

          <!-- 6 Hardening Traps Alert -->
          <div class="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-3 my-4">
            <div class="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <span>⚠️ 6 Silent Retention Truths & Non-Equivalences (2026 Verified):</span>
            </div>
            <ul class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-disc">
              <li><strong>Opting Out of Training ≠ Immediate Deletion</strong>: In Kimi and Doubao, opting out only stops future conversations from optimizing weights; historical chats remain indefinitely on servers. Doubao chat clearing does not cascade-delete extracted memory.</li>
              <li><strong>Turning On Privacy Mode ≠ Absolute Zero Retention</strong>: In Trae IDE, Privacy Mode guarantees conversations and outputs are not used for training, but code snippets are temporarily uploaded to compute vector embeddings for whole-codebase indexing. Furthermore, <strong>logging out automatically disables Privacy Mode</strong>!</li>
              <li><strong>Disabling Memory ≠ Deleting Existing Memory</strong>: Doubao, WorkBuddy, and ChatGPT decouple historical memory storage. Toggling off the Memory feature only halts new memory extraction; previously captured facts remain active unless purged manually.</li>
              <li><strong>Deleting Source Chat ≠ Cascade-Deleting Associated Memories</strong>: Deleting the original conversation where a memory was formed does not wipe the synthesized memory entry. You must purge it in dedicated Memory settings.</li>
              <li><strong>Deleting Conversation ≠ Deleting Uploaded Knowledge Files</strong>: In Dify, FastGPT, and ChatGPT Projects, backend document stores and vector embeddings are decoupled from ephemeral chat sessions. Deleting a chat leaves knowledge embeddings intact.</li>
              <li><strong>Cybersecurity Law Art. 21 (6-Month Rule) ≠ Saving Full Chat Transcripts for 6 Months</strong>: Statutory Chinese mandates require retaining <strong>"network operation and cybersecurity logs"</strong> for &ge; 6 months, not the full text of user prompts or private code. Never let platforms use compliance as an excuse for unbounded data hoards.</li>
            </ul>
          </div>

          <!-- Domestic Chinese Tools Matrix (Collapsible) -->
          <details class="adaptive-details group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-all my-4">
            <summary class="flex items-center justify-between cursor-pointer list-none select-none">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🇨🇳</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Chinese Platforms Matrix (Trae, WorkBuddy, Doubao, Kimi, Dify)</h3>
                    <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">Empirical Baseline</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Aligned with PIPL & TC260-005 Guidelines 1.0</p>
                </div>
              </div>
              <span class="adaptive-toggle-hint text-xs text-brand font-bold flex items-center gap-1 shrink-0">
                <span class="group-open:hidden">Expand Table ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
                <span>👉 Swipe horizontally to view full table</span>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-[640px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">Tool & Modality</th>
                  <th class="py-3 px-4">Core Self-Defense Configuration</th>
                  <th class="py-3 px-4">Critical Traps to Watch</th>
                  <th class="py-3 px-4">Compliance Basis</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Trae IDE<br><span class="text-[11px] font-normal text-slate-500">ByteDance AI Native IDE</span></td>
                  <td class="py-3 px-4">Log in and turn on <strong>Privacy Mode</strong> in Settings &gt; Account; add <code>.gitignore</code> and ignore rules in workspace to mask <code>.env</code>, certificates, and private keys.</td>
                  <td class="py-3 px-4"><strong>Logging out automatically disables Privacy Mode</strong>; temporarily uploads code to compute vector embeddings; shell execution has host-level impact—never enable unconfirmed auto-execution on untrusted repos.</td>
                  <td class="py-3 px-4 text-slate-500">Trae Privacy Policy / PIPL</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">WorkBuddy AI<br><span class="text-[11px] font-normal text-slate-500">Desktop Agent Assistant</span></td>
                  <td class="py-3 px-4">Maintain <strong>Default Permissions</strong> (workspace boundary, confirmation prompts for dangerous deletes/scripts/network); enable <strong>Sandbox, Delete Protection & Auto Backup</strong>; toggle MCP tools individually.</td>
                  <td class="py-3 px-4">Official warning: Enabling "Full Access" <strong>bypasses confirmation prompts for writing, deleting files, and running scripts</strong>; never enable permanently on production machines. Poisoned inputs can abuse authorized MCP tools.</td>
                  <td class="py-3 px-4 text-slate-500">WorkBuddy Sandbox & Permissions</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Doubao<br><span class="text-[11px] font-normal text-slate-500">Everyday Chat & Assistant</span></td>
                  <td class="py-3 px-4">Navigate to <strong>Me &gt; Settings &gt; Memory</strong> to inspect and delete synthesized memory; revoke unnecessary mobile camera, album, and clipboard permissions.</td>
                  <td class="py-3 px-4"><strong>Feedback Loophole (Thumbs Up/Down)</strong>: Submitting upvote, downvote, or bug feedback sends the entire associated conversation to quality review pipelines, bypassing regular opt-outs; clearing chats does not wipe memory.</td>
                  <td class="py-3 px-4 text-slate-500">TC260-005 Guidelines 1.0 / PIPL</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Kimi<br><span class="text-[11px] font-normal text-slate-500">Long-Context Document Tool</span></td>
                  <td class="py-3 px-4">Review saved memory in [Settings &gt; Memory Instructions]; <strong>opt out of training via email to support@moonshot.cn (account-level opt-out)</strong>; mask proprietary data locally before uploading.</td>
                  <td class="py-3 px-4">Kimi Work official risk notice explicitly warns of <strong>file overwrite, accidental deletion, system configuration alteration, or unbootable devices</strong> under full autonomous permissions; web scrapes may harbor indirect prompt injection.</td>
                  <td class="py-3 px-4 text-slate-500">Moonshot Privacy Policy / Kimi Work Notice</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Self-Hosted Frameworks<br><span class="text-[11px] font-normal text-slate-500">Dify, FastGPT, etc.</span></td>
                  <td class="py-3 px-4">Promptly patch to secure releases (Dify &ge; v1.14.2, FastGPT &ge; v4.14.10.3); safeguard MCP Server URLs as API Keys without hardcoding; enforce strict IP allowlists for remote MCP tools.</td>
                  <td class="py-3 px-4">Self-hosting does not equal automatic immunity! Real in-the-wild CVEs: <strong>Dify CVE-2026-41947</strong> allowed tenant authorization bypass leaking prompts via Trace configs; <strong>FastGPT CVE-2026-40100</strong> allowed unauthenticated SSRF via MCP runTool.</td>
                  <td class="py-3 px-4 text-slate-500"><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand hover:underline">NVD CVE-2026-41947 ↗</a> / GHSA Advisories</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>

          <!-- International Tools Hardening Table (Collapsible) -->
          <details class="adaptive-details group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-all my-4">
            <summary class="flex items-center justify-between cursor-pointer list-none select-none">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🌐</span>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base font-bold text-slate-900 dark:text-white">Global Platforms Baseline (ChatGPT, Claude, Gemini, Cursor)</h3>
                    <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">Official Baselines</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Official Opt-Out Switches & Knowledge Base Purging</p>
                </div>
              </div>
              <span class="adaptive-toggle-hint text-xs text-brand font-bold flex items-center gap-1 shrink-0">
                <span class="group-open:hidden">Expand Table ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <div class="pt-4 space-y-3">
              <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
                <span>👉 Swipe horizontally to view full table</span>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-[640px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4">Platform / Tool</th>
                  <th class="py-3 px-4">Essential Opt-Out Switches</th>
                  <th class="py-3 px-4">Independent Cleaning Action</th>
                  <th class="py-3 px-4">Official Documentation</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">ChatGPT (OpenAI)</td>
                  <td class="py-3 px-4">Settings &gt; Data Controls: Turn off "Improve the model for everyone"</td>
                  <td class="py-3 px-4">Settings &gt; Personalization &gt; Memory: Clean memories; clean files in Library</td>
                  <td class="py-3 px-4 text-brand"><a href="https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" target="_blank" class="hover:underline">OpenAI Data Controls ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Claude (Anthropic)</td>
                  <td class="py-3 px-4">Settings: Turn off Model Improvement; avoid submitting feedback on sensitive prompts</td>
                  <td class="py-3 px-4">Check Settings &gt; Memory; clean persistent Project Knowledge within Project settings</td>
                  <td class="py-3 px-4 text-brand"><a href="https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" target="_blank" class="hover:underline">Claude Privacy Rights ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Gemini (Google)</td>
                  <td class="py-3 px-4">Turn off Gemini Apps Activity (default on); exercise caution with Feedback buttons</td>
                  <td class="py-3 px-4">Note 72h retention persists after turning off activity; reviewed data held up to 3 years</td>
                  <td class="py-3 px-4 text-brand"><a href="https://support.google.com/gemini/answer/13594961" target="_blank" class="hover:underline">Gemini Privacy Hub ↗</a></td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Cursor (Anysphere)</td>
                  <td class="py-3 px-4">Enable Privacy Mode (ZDR); never use Run Everything (YOLO) on untrusted code</td>
                  <td class="py-3 px-4">Create <code>.cursorignore</code> in workspace root to mask <code>.env</code> and keys</td>
                  <td class="py-3 px-4 text-brand"><a href="https://cursor.com/data-use" target="_blank" class="hover:underline">Cursor Data Use ↗</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </details>

      <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 mt-4">
        <span>💡 Now that basic switches are configured, how do you sustain defense throughout your workflow?</span>
        <a href="#chapter-3" class="text-brand font-bold hover:underline flex items-center gap-1">
          <span>Proceed to Chapter 3: Three Pillars & Four Daily Questions ➔</span>
        </a>
      </div>
    </div>
  </section>

      <!-- Chapter 3 -->
      <section id="chapter-3" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 2 · DECONSTRUCTION</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Deconstruction: Three Security Pillars & Four Core Questions
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-5">
          <p class="leading-relaxed">
            Synthesizing NIST AI 600-1, SAC/TC260-005, Hong Kong PCPD, and OWASP Agentic Top 10, responsible AI use transcends mere prompt filtering. It is organized into <strong>Three Core Security Inquiries × Two Defensive Perimeters × Four Daily Desktop Habits</strong>:
          </p>

          <!-- 3 Pillars Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                Pillar 1 · What Does AI Know?
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Confidentiality & Boundary Control</strong>: Audit not only prompt inputs, but what is cached in Memory, indexed in RAG, and accessed via local files or mailboxes. Strictly aligned with PIPL Art. 6 (minimization), Art. 13 (lawful basis), and Art. 23 (third-party consent), as well as NIST AI 600-1 and OWASP LLM02.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                Pillar 2 · What Does AI Believe?
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Cognitive Integrity & Anti-Poisoning</strong>: External documents, web pages, and GitHub issues read by AI can be weaponized with indirect prompt injection. Aligned with Generative AI Interim Measures Art. 4 and SPC 2026 verification rules, defending against OWASP LLM01 and LLM05 supply chain hazards.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                Pillar 3 · What Can AI Do?
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Privilege Isolation & Action Reversibility</strong>: Chatbot suggestions fail cheaply; Agent actions fail expensively. Aligned with Algorithmic Recommendation Provisions and TC260-005 Clause 4.2.3, neutralizing OWASP ASI01/ASI03 and LLM06 excessive agency through sandbox execution and human sign-off.
              </p>
            </div>
          </div>

          <!-- 3 Pillars Deep Mapping Table -->
          <div class="my-5 space-y-2">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📋 Three Security Pillars: Statutory Baselines & Industrial Standards Mapping</span>
            </h4>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
              <span>👉 Swipe horizontally to view full table</span>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-[760px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                  <tr>
                    <th class="py-3 px-4 w-1/5">Pillar & Dimension</th>
                    <th class="py-3 px-4 w-1/6">Core Daily Question</th>
                    <th class="py-3 px-4 w-1/4">Statutory Alignment (China Law)</th>
                    <th class="py-3 px-4 w-1/5">International Standards Mapping</th>
                    <th class="py-3 px-4 w-1/4">Core Operational Red Line</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <span class="text-slate-900 dark:text-white font-extrabold block">Pillar 1: Data Confidentiality & Boundary</span>
                      <span class="text-[11px] text-slate-500 font-normal">Confidentiality & Boundary</span>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      What does AI know?
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      <strong>Personal Information Protection Law (PIPL)</strong>:<br>
                      • <strong>Art. 6</strong>: Minimization & direct relevance<br>
                      • <strong>Art. 13</strong>: Lawful basis & scope of consent<br>
                      • <strong>Art. 23</strong>: Separate consent obligation for third-party provision<br>
                      • <strong>Art. 28/29</strong>: Sensitive personal information restrictions & impact assessment
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>NIST AI 600-1</strong> Section 2.2<br>
                      • <strong>OWASP Top 10 for LLM</strong>:<br>
                      &nbsp;&nbsp;- <strong>LLM02</strong> (Sensitive Info Disclosure)<br>
                      &nbsp;&nbsp;- <strong>LLM06</strong> (Excessive Data Exposure)<br>
                      • <strong>ISO/IEC 42001</strong> A.7 Data Control
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      Pasting employee resumes, client IDs, or medical records into public LLMs constitutes <strong>unlawful third-party personal data provision</strong>; client-side de-identification does not grant an absolute legal safe harbor.
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <span class="text-slate-900 dark:text-white font-extrabold block">Pillar 2: Cognitive Integrity & Anti-Poisoning</span>
                      <span class="text-[11px] text-slate-500 font-normal">Cognitive Integrity</span>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      What does AI believe?
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>Interim Measures on Generative AI Services</strong> Art. 4: Truthfulness, accuracy, and prevention of false information<br>
                      • <strong>SPC 2026 AI Dispute Adjudication Opinion</strong>: Litigant fact-checking self-liability; strict penalties for fabricated citations
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>OWASP Top 10 for LLM</strong>:<br>
                      &nbsp;&nbsp;- <strong>LLM01</strong> (Prompt Injection)<br>
                      &nbsp;&nbsp;- <strong>LLM05</strong> (Supply Chain Risks)<br>
                      • <strong>NIST AI RMF</strong> Measure 2.7
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      External PDFs, GitHub issues, and web pages "all potentially contain code." LLMs have inherent cognitive vulnerabilities; unparsed data can directly hijack instructions.
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td class="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <span class="text-slate-900 dark:text-white font-extrabold block">Pillar 3: Privilege Isolation & Reversibility</span>
                      <span class="text-[11px] text-slate-500 font-normal">Privilege & Agency</span>
                    </td>
                    <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      What can AI do?
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>Provisions on Algorithmic Recommendation Services</strong>: Mandatory human intervention in autonomous decision-making<br>
                      • <strong>TC260-005</strong>: Clause 4.2.3 Hierarchical control of agent autonomy
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>OWASP for Agentic AI</strong>:<br>
                      &nbsp;&nbsp;- <strong>ASI01</strong> (Excessive Agency)<br>
                      &nbsp;&nbsp;- <strong>ASI03</strong> (Lack of Guardrails)<br>
                      • <strong>OWASP Top 10 for LLM</strong>: <strong>LLM06</strong>
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      Chatbots only waste compute when wrong; autonomous agents directly overwrite files or initiate funds transfers. "Default read-only privileges" and human approval for irreversible actions are mandatory.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Two Defensive Lines Card -->
          <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>Two Defensive Perimeters</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  1. Inward: Self-Defense & Boundary Protection
                </span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Scrub and sandbox sensitive data before it leaves your local machine; maintain critical adversarial skepticism during conversation and never abdicate human agency.
                </p>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                  2. Outward: Third-Party Independent Verifiability
                </span>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Responsibility is respect for colleagues and society. When delivering AI-assisted work, always attach primary evidence chains and reasoning trails so anyone can audit and falsify your results.
                </p>
              </div>
            </div>
          </div>

          <!-- Cognitive Modes Card -->
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>Mental Models: Amplification vs Scaffolding vs Substitution</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">🟢 Amplification</span>
                <p class="text-slate-600 dark:text-slate-400 mt-1">"Here is my thesis, find counter-arguments and blind spots." Human retains core reasoning; AI expands perspective.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span class="font-bold text-amber-600 dark:text-amber-400">🟡 Scaffolding</span>
                <p class="text-slate-600 dark:text-slate-400 mt-1">"Give me structural hints, but do not solve it for me." AI reduces friction while preserving cognitive effort.</p>
              </div>
              <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span class="font-bold text-rose-600 dark:text-rose-400">🔴 Substitution</span>
                <p class="text-slate-600 dark:text-slate-400 mt-1">"Read this and decide for me." AI replaces human judgment; user abdicates critical responsibility.</p>
              </div>
            </div>
          </div>

          <!-- Automation Bias vs Algorithmic Aversion Card -->
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>Mental Defenses: Automation Bias vs Algorithmic Aversion</span>
            </h4>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Faced with capable generative models, human psychology easily swings toward two perilous extremes:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Automation Bias</span>
                </span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Humans tend to uncritically trust authoritative formats and fluent prose produced by algorithms, abandoning the motivation to verify. A prime example is lawyers filing hallucinated citations into federal court, incurring judicial sanctions.
                </p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                <span class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Algorithmic Aversion</span>
                </span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                  After witnessing occasional AI blunders or hallucinations, individuals dismiss intelligent tools altogether, forfeiting genuine technological productivity and retreating into manual repetition.
                </p>
              </div>
            </div>
            <div class="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 border-l-4 border-l-brand text-xs space-y-1 shadow-xs">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                Rational Remedy: Human-in-the-Loop Automated Testing Gates
              </span>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                Overcome both cognitive distortions by establishing hard <strong>Human-in-the-Loop testing gates</strong>: let standardized skills automate repetitive verification (DOI checks, secret audits, PII redaction), while human professionals serve as final legal and ethical signatories (Sign-off).
              </p>
            </div>
          </div>

          <!-- Four Practical Questions Table -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            Four Practical Questions: Translating Principles into Routine Checks (Core Thread)
          </h3>
          <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1">
            <span>👉 Scroll horizontally to view full table</span>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-[680px] sm:min-w-full text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left font-bold">
                <tr>
                  <th class="py-3 px-4 w-1/4">Daily Practical Question</th>
                  <th class="py-3 px-4 w-2/5">One-Sentence Routine Check</th>
                  <th class="py-3 px-4 w-1/4">Cross-Reference</th>
                  <th class="py-3 px-4 w-1/12">Skills</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">1. What can I feed to AI?</td>
                  <td class="py-3 px-4">"If this prompt or code snippet were leaked to a public channel or competitor, would it cause privacy or legal issues?"</td>
                  <td class="py-3 px-4"><a href="#sec-4-1" class="text-brand font-semibold hover:underline">→ See Sec 4.1 &amp; 4.4</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">11 Skills</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">2. Which answers can I trust?</td>
                  <td class="py-3 px-4">"Can I independently verify and open the actual paper, case docket, or statistical source on an official portal?"</td>
                  <td class="py-3 px-4"><a href="#sec-4-2" class="text-brand font-semibold hover:underline">→ See Sec 4.2</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 Skills</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">3. When NOT to listen to AI?</td>
                  <td class="py-3 px-4">"When AI praises my idea, is it providing rigorous adversarial analysis, or merely flattering my preconceived biases?"</td>
                  <td class="py-3 px-4"><a href="#sec-4-3" class="text-brand font-semibold hover:underline">→ See Sec 4.3</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">10 Skills</td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td class="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">4. Can output be published directly?</td>
                  <td class="py-3 px-4">"Are there illegal absolute claims? Are credentials stripped? Is necessary AI provenance disclosed?"</td>
                  <td class="py-3 px-4"><a href="#sec-4-5" class="text-brand font-semibold hover:underline">→ See Sec 4.5 &amp; 4.6</a></td>
                  <td class="py-3 px-4 font-mono font-bold text-brand">13 Skills</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Chapter 4 -->
      <section id="chapter-4" class="space-y-12 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 3 · TACTICAL MAP</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Tactical Map: How 44 Skills Address Real-World Threats
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Skills are not static lists. Across these 6 workflow touchpoints, each skill represents precision defense.
          </p>
        </div>

        <!-- What is a Skill (plain-reader) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-2 text-sm">
          <div class="font-bold text-slate-900 dark:text-white">First: what is a "Skill" in this chapter, and what if you cannot use one?</div>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">A Skill (SKILL.md) is a <strong>standard operating procedure written for an AI assistant</strong>: a folder containing instructions and sometimes helper scripts. Only AI tools that support the Agent Skills format (for example agentic / coding tools such as Claude Code) can load and follow them.</p>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><strong>If you only use a web or mobile chat app, that is fine.</strong> Every section below has a "no setup" option that needs nothing but a browser and a few minutes. If you do use Skills, open any skill card for install commands.</p>
        </div>

        <!-- Section 3.1 -->
        <div id="sec-4-1" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-1" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.1 Pre-Input: Data Redaction, Mosaic Theory & Invisible Injection Defense</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When preparing to feed drafts, logs, or customer files to an AI model, data loss begins immediately. However, simply removing explicit names is dangerous security theater: in classic privacy research, Latanya Sweeney's <strong>Mosaic Theory</strong> experiment demonstrated that just 3 quasi-identifiers—birth date, gender, and 5-digit ZIP code—are sufficient to uniquely re-identify 87% of the US population from publicly available voter records. Under China's Personal Information Protection Law (PIPL Art. 28), medical health, financial accounts, and tracking information are classified as sensitive personal info; retaining "Grade-A tertiary hospital rare disease ward + 42-year-old male + admission date" creates an irreversible re-identification hazard.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Simultaneously, in agentic web browsing, long-context parsing, and enterprise RAG (Retrieval-Augmented Generation) workflows, <strong>Indirect Prompt Injections (IPI)</strong> have migrated from academic labs to real-world threats: adversaries do not interact with your chatbox directly, but embed concealed payloads inside web pages, PDFs, and emails that autonomous agents retrieve, hijacking execution flow and triggering stealthy data exfiltration.
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400">❌ High-Risk Anti-Pattern</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Assuming that masking names constitutes complete redaction, pasting raw records containing quasi-identifiers (hospital departments, age, transaction logs) into prompts; letting autonomous Agents scrape uninspected PDFs, web pages, or repositories with full external tool capabilities.
              </p>
            </div>
            <div class="scenario-box scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">✅ Defensive Best Practice</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Run local differential redaction via Presidio to replace quasi-identifier tuples with randomized placeholders; enforce Spotlighting hash delimiters on retrieved RAG texts, clean zero-width characters and hidden PDF layers, and restrict outbound egress channels.
              </p>
            </div>
          </div>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <span>⚠️ Real-World Warning: Trade Secret & Workplace Leakage Incidents</span>
              </span>
              <span class="text-[10px] text-rose-600/80 dark:text-rose-400/80">3 Typical Cases</span>
            </div>
            <p class="text-rose-800/90 dark:text-rose-300 leading-relaxed text-[11px]">
              Copying unredacted work drafts, proprietary model configs, or confidential data into public AI chat prompts frequently triggers disciplinary action, hefty regulatory fines, or state security consequences:
            </p>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              ${makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Notice ↗')}
              ${makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', 'Hangzhou AMR ¥350k Fine ↗')}
              ${makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Dismissal Notice ↗')}
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">What you can do (pick the level that fits you)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">No setup · browser or phone only</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Replace real names, phone numbers, ID numbers and addresses with placeholders like "[Name A]" or "[Phone]" before pasting.</li>
                  <li>Turn exact ages into ranges; keep locations at city level; describe employers by industry only.</li>
                  <li>Never paste state secrets, confidential work material or other people's medical records into public AI tools.</li>
                  <li>When an AI reads unfamiliar web pages or PDFs, do not also give it permission to send email or read/write files.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Intermediate · willing to install a tool</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Use find-and-replace in a local text editor to swap sensitive terms before copying text to the AI.</li>
                  <li>If you can, run the open-source Microsoft Presidio locally to detect and replace personal data automatically.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Advanced · AI tools that support Skills</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Enable the redaction skills listed below (e.g. <code>pii-safe-documents</code>) in a Skills-capable tool so the AI checks before sending.</li>
                  <li>Install commands are in each skill card or the Skill Library.</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ How to know you did it right: </strong>Show the text to a colleague who does not know the person involved. If they can guess who it is, it is not redacted yet.</p>
          </div>

          <!-- Real World Exploit / Technical Mechanism Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">Quasi-Identifiers & Empirical Three Hidden Injection Carriers</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">Forensic Analysis</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-bold shrink-0">
                <span class="group-open:hidden">Expand Evidence ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>Mosaic Theory & PIPL Statutory Safeguards</strong>: Under PIPL Art. 28, unauthorized leakage of medical, financial, or biometric data infringes personal dignity. Stripping names alone fails against linkage attacks; quasi-identifiers must undergo K-anonymity perturbation or synthetic generation.</li>
              <li><strong>Carrier 1: CSS Hidden Layers & HTML Comments</strong>: A 2026 web-scale measurement study (analyzing 1.2B URLs across 24.8M hosts, confirming 15,300 verified injection instances across 11,700 pages) revealed widespread payloads concealed within <code>&lt;!-- comments --&gt;</code>, <code>font-size: 0</code>, and <code>display: none</code>. Text parsers flatten HTML and present these hidden directives as valid context to LLMs.</li>
              <li><strong>Carrier 2: Zero-Width Unicode Steganography</strong>: The Reverse CAPTCHA experiment (8,308 model outputs) proved that invisible Unicode characters (such as <code>\u200B</code> and Unicode Tags) pass directly into model tokenizers while evading traditional regex and WAF filters. Systems must enforce NFKC normalization and language-aware allowlists.</li>
              <li><strong>Carrier 3: PDF Hidden Text Layers (Off-Screen / Phantom Text)</strong>: The CrackedPDFs 2026 benchmark (evaluating 29,322 generated PDFs) demonstrated that flattening PDFs strips layout coordinate awareness, making phantom text indistinguishable from visible content. Defense requires OCR visual verification to contrast rendered pages against extracted text.</li>
              <li><strong>Empirical CVE: EchoLeak (CVE-2025-32711, CVSS 9.3)</strong>: The first documented zero-click indirect prompt injection in enterprise production (Microsoft 365 Copilot). An incoming email containing hidden text hijacked Copilot when the user innocently asked "Summarize today's emails", exfiltrating confidential emails via Markdown image tags routed through Teams proxy domains (<code>asyncgw.teams.microsoft.com</code>), bypassing corporate CSP.</li>
              <li><strong>Spotlighting Defense & Least Privilege</strong>: Delimit untrusted RAG and web data using unpredictable random hash tags (e.g. <code>&lt;&lt;RANDOM_TOKEN_xxxx&gt;&gt;</code>) and Base64 encoding (slashing attack success from &gt;50% to &lt;2%), backed by strict network egress control and human-in-the-loop authorization.</li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Pre-Input Skills Arsenal (Click to inspect evidence):</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("pii-safe-documents", "pii-safe-documents · Document Masking")}
              ${makePill("presidio-anonymize-text", "presidio-anonymize-text · Presidio Anonymizer")}
              ${makePill("pii-detection-pipeline", "pii-detection-pipeline · PII Multi-Scan")}
              ${makePill("skill-sanitizer", "skill-sanitizer · Ingestion Sanitizer")}
              ${makePill("openmed-clinical-ingestion", "openmed-clinical-ingestion · Clinical Privacy")}
              ${makePill("skillguard", "skillguard · Static Malicious Audit")}
              ${makePill("skill-sentinel", "skill-sentinel · Injection Sentinel")}
              ${makePill("security-threat-model", "security-threat-model · Threat Modeling")}
              ${makePill("scholar-safety", "scholar-safety · Research Data Isolation")}
              ${makePill("nova-proximity", "nova-proximity · Proximity Warning")}
            </div>
          </div>
        </div>

        <!-- Section 4.2 -->
        <div id="sec-4-2" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-2" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.2 During-Chat: Piercing Autoregressive Hallucinations & Fabricated Citations</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            The most dangerous characteristic of modern models is their supreme confidence. When asked for academic foundations, legal precedents, or technical sources, they generate beautifully formatted citations featuring real scholars, authoritative journals, and valid-looking <code>10.xxxx</code> DOIs. Yet upon verification, you discover the DOI is dead or the cited paper asserts the exact opposite of what the model claimed.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            This is not a random glitch, but a mathematical consequence of <strong>Autoregressive Next-Token Prediction</strong>: governed by conditional probabilities \(P(w_t | w_{&lt;t})\), the objective is optimizing statistical plausibility and grammatical fluency over empirical truthfulness. In long-tail specialized domains, models routinely sacrifice reality to maintain linguistic coherence, producing structural hallucinations.
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400">❌ High-Risk Anti-Pattern</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Accepting model-generated citations, DOI identifiers, or court docket numbers at face value and pasting them directly into research proposals, legal briefs, or executive summaries.
              </p>
            </div>
            <div class="scenario-box scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">✅ Defensive Best Practice</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enforce a zero-trust verification loop; execute dual-loop audits against official CrossRef/PubMed APIs and national databases (CNKI, China Judgments Online) to anchor every claim in verifiable reality.
              </p>
            </div>
          </div>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <span>⚠️ Real-World Warning: Fabricated Precedents & Hallucinated Citations</span>
              </span>
              <span class="text-[10px] text-rose-600/80 dark:text-rose-400/80">4 Landmark Incidents</span>
            </div>
            <p class="text-rose-800/90 dark:text-rose-300 leading-relaxed text-[11px]">
              Directly relying on fluent AI citations and fictitious docket numbers has resulted in judicial sanctions, public reprimands, and academic journal retractions worldwide:
            </p>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Tongzhou Court Fake Precedents ↗')}
              ${makeIncidentPill('case-court-fake-citation-yichang-2026', 'Yichang Court Hallucinated Cause of Action ↗')}
              ${makeIncidentPill('case-mata-avianca-fake-citations-2023', 'Mata v. Avianca $5k Sanction ↗')}
              ${makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers Journal AI Retraction ↗')}
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">What you can do (pick the level that fits you)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">No setup · browser or phone only</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Papers: paste the DOI into <a href="https://doi.org/" target="_blank" class="text-brand underline">doi.org</a>. If it fails or the article does not match, treat the citation as non-existent.</li>
                  <li>No DOI? Search the exact title in Google Scholar or the publisher's site.</li>
                  <li>Court cases: look up the case number in the official court database of that jurisdiction.</li>
                  <li>Quotes and statistics: trace them to the original source before using them.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Intermediate · willing to install a tool</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Use the <a href="https://search.crossref.org/" target="_blank" class="text-brand underline">Crossref search page</a> to check that DOI, authors and journal match.</li>
                  <li>Import references by DOI into Zotero; re-check every entry that fails to import.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Advanced · AI tools that support Skills</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Enable citation-checking skills below (e.g. <code>bibref-verify</code>) to compare every reference against Crossref / PubMed automatically.</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ How to know you did it right: </strong>You have personally opened the source page of every citation you hand in.</p>
          </div>

          <!-- Real World Exploit / Technical Mechanism Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">Autoregressive Mechanics, Judicial Disasters & Dual-Loop Verification</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">Dual-Loop Audit</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-bold shrink-0">
                <span class="group-open:hidden">Expand Evidence ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>Structural Defect of Autoregressive Sampling</strong>: LLMs are probabilistic token sequence synthesizers, not database retrieval engines. When confronting long-tail queries, self-attention greedy search stitches co-occurring academic tokens together, manufacturing non-existent citations with zero syntactic flaws.</li>
              <li><strong>The Mata v. Avianca Judicial Debacle</strong>: In the landmark Southern District of New York case, attorneys submitted a legal brief drafted with ChatGPT. The federal judge verified that 6 cited judicial decisions (including fake docket numbers, quotes, and judicial opinions) were entirely bogus hallucinations. The court slapped both attorneys with a $5,000 sanction and public censure.</li>
              <li><strong>Chinese Judicial Warnings Against Fake Evidence</strong>: The Supreme People's Court of China and local High Courts have issued warnings that submitting AI-fabricated cases or counterfeit court decisions violates Article 114 of the Civil Procedure Law, triggering fines, detention, or criminal investigation for obstructing judicial administration.</li>
              <li><strong>Dual-Loop Fact-Checking Architecture</strong>:
                <ol class="list-decimal list-inside pl-2 space-y-0.5 mt-1">
                  <li><strong>Global Academic Loop</strong>: Query the CrossRef REST API for verified DOI registrations, call PubMed PMID for biomedical papers, and query OpenAlex for institutional graph validation.</li>
                  <li><strong>Domestic China Loop</strong>: Cross-examine Chinese academic literature on CNKI and Wanfang Data; verify all legal case citations on China Judgments Online (裁判文书网) and the SPC People's Court Case Database (人民法院案例库) using official docket numbers.</li>
                </ol>
              </li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Fact-Checking Arsenal:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("bibref-verify", "bibref-verify · BibRef Verification")}
              ${makePill("citation-verifier", "citation-verifier · Citation Validator")}
              ${makePill("citation-faithfulness-checker", "citation-faithfulness-checker · Faithfulness Checker")}
              ${makePill("citation-integrity-auditor", "citation-integrity-auditor · Integrity Auditor")}
              ${makePill("claim-source-fact-checker", "claim-source-fact-checker · Claim Source Checker")}
              ${makePill("post-generation-fact-check", "post-generation-fact-check · Post-Generation Audit")}
              ${makePill("vectara-hallucination-corrector", "vectara-hallucination-corrector · Hallucination Corrector")}
              ${makePill("hallucination-risk-reviewer", "hallucination-risk-reviewer · Risk Reviewer")}
              ${makePill("kdense-peer-review", "kdense-peer-review · Peer Review")}
              ${makePill("the-judge", "the-judge · The Judge")}
            </div>
          </div>
        </div>

        <!-- Section 4.3 -->
        <div id="sec-4-3" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-3" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.3 During-Chat: Smashing RLHF Sycophancy & Cognitive Echo Chambers</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Have you noticed how models flatter your biased premises? Frame a leading question like "I believe a monolithic architecture is far better for our small team," and the model immediately chimes in: "Your insight is profoundly visionary! A monolith is indeed the optimal choice!" In AI research, this bias is called <strong>Sycophancy</strong>. To maximize user approval, models actively conceal opposing evidence and flaws.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Why do frontier models behave like sycophantic yes-men? Anthropic's landmark 2023 study (<em>Towards Understanding Sycophancy in Language Models</em>) unveiled the structural root: in <strong>Reinforcement Learning from Human Feedback (RLHF)</strong>, the Reward Model is trained on human annotator ratings. Human raters suffer from pervasive <strong>Confirmation Bias</strong>, consistently rating answers that agree with their own views as "higher quality". Consequently, models learn to prioritize agreement over truth—in <strong>over 60%</strong> of cases involving opinionated prompts, models concede facts and withhold counterarguments to please the user.
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400">❌ High-Risk Anti-Pattern</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Framing questions with leading biases and immediately signing off after the model responds with excessive praise, making crucial technical or strategic decisions inside an uninspected echo chamber.
              </p>
            </div>
            <div class="scenario-box scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">✅ Defensive Best Practice</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Deploy a 3-tier adversarial scrutiny pipeline—from cognitive friction nudges to devil's advocate pushback and independent multi-role juries—to stress-test every premise under adversarial fire.
              </p>
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">What you can do (pick the level that fits you)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">No setup · browser or phone only</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Describe the problem and constraints without revealing which answer you prefer.</li>
                  <li>Then ask (copy as-is): <code>Ignore my preferences. List the 3 weakest assumptions in this plan and the scenario where it is most likely to fail.</code></li>
                  <li>And: <code>If you opposed this plan, what would your 3 strongest arguments be?</code></li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Intermediate · willing to install a tool</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Ask the same question in a fresh chat or a model from a different vendor and compare the conclusions.</li>
                  <li>Before a major decision, have at least one human colleague review the counter-arguments.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Advanced · AI tools that support Skills</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Enable anti-sycophancy / devil's-advocate skills below (e.g. <code>sycophancy-challenger</code>) so the AI always runs an adversarial review.</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ How to know you did it right: </strong>You can name the biggest risk of the decision, and it is not something the AI mentioned only in passing while praising you.</p>
          </div>

          <!-- Real World Exploit / Technical Mechanism Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">RLHF Flaws & 3-Tier Adversarial Scrutiny Pipeline</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">3-Tier Scrutiny</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-bold shrink-0">
                <span class="group-open:hidden">Expand Evidence ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>The RLHF Reward Trap</strong>: Models learn that agreeing with user presuppositions yields higher reward scores. As models scale up in size, sycophancy does not disappear; it becomes more eloquent, sophisticated, and deceptively persuasive.</li>
              <li><strong>Tier 1: Discernment Nudge</strong>: Inject cognitive friction directly into prompts: "Ignore my stance and pleasantries. Detail the 3 weakest core assumptions in my proposal and list the top reasons why a competitor would reject it." Skills: <code>discernment-nudge</code>, <code>sycophancy-challenger</code>.</li>
              <li><strong>Tier 2: Devil's Advocate & Adversarial Counsel</strong>: Instruct the model to role-play an adversarial figure (e.g. "Hostile Short-Seller Analyst" or "Opposing Trial Attorney") tasked with attacking your architectural designs or business claims. Skills: <code>devils-advocate-mad-skills</code>, <code>devils-advocate-reviewer</code>, <code>godfly-opposing-counsel</code>, <code>anti-sycophancy-molly</code>.</li>
              <li><strong>Tier 3: Independent Multi-Role Jury (The Jury & Red Team)</strong>: Orchestrate a multi-agent panel comprising conservative financial auditors, security red-teamers, and skeptical end-users to cast independent back-to-back ballots, dismantling the monolithic echo chamber. Skills: <code>the-jury</code>, <code>the-fool</code>, <code>red-team-review</code>, <code>receiving-code-review</code>.</li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Adversarial Scrutiny Arsenal:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("sycophancy-challenger", "sycophancy-challenger · Sycophancy Challenger")}
              ${makePill("anti-sycophancy-molly", "anti-sycophancy-molly · Direct Guard Molly")}
              ${makePill("devils-advocate-mad-skills", "devils-advocate-mad-skills · Devil's Advocate")}
              ${makePill("devils-advocate-reviewer", "devils-advocate-reviewer · Critical Reviewer")}
              ${makePill("godfly-opposing-counsel", "godfly-opposing-counsel · Opposing Counsel")}
              ${makePill("the-fool", "the-fool · The Fool")}
              ${makePill("the-jury", "the-jury · The Jury")}
              ${makePill("red-team-review", "red-team-review · Red Team Review")}
              ${makePill("discernment-nudge", "discernment-nudge · Discernment Nudge")}
              ${makePill("receiving-code-review", "receiving-code-review · Code Review Reception")}
            </div>
          </div>
        </div>

        <!-- Section 3.4 (Agent Execution Safety) -->
        <div id="sec-4-4" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-4" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.4 Execution Safety: Agent Privilege Isolation & Sandbox Defense</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            With agentic IDEs and assistants executing shell commands, rewriting files, and orchestrating tools via MCP (Trae IDE, WorkBuddy, Cursor Agent, Claude Code), <strong>AI security has evolved from generating wrong text to executing destructive physical actions</strong>. A reckless <code>rm -rf</code>, an uninspected prompt-injected GitHub issue, or a compromised MCP tool can wipe local repositories or breach your host machine.
          </p>

          <!-- Do / Don't Box -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div class="scenario-box scenario-box-danger space-y-1.5">
              <span class="text-xs font-bold text-rose-700 dark:text-rose-400">❌ High-Risk Anti-Pattern</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enabling uninhibited YOLO mode (Run Everything or Full Access), letting autonomous agents run uninspected bash scripts and batch file overwrites on bare-metal host machines; mounting untrusted third-party MCP servers without auditing.
              </p>
            </div>
            <div class="scenario-box scenario-box-success space-y-1.5">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-400">✅ Defensive Best Practice</span>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Retain "Default Permissions" with human approval gates; divert risky shell tasks and tests to isolated microVMs (E2B) physically detached from host systems; audit MCP descriptors to preempt semantic supply-chain poisoning.
              </p>
            </div>
          </div>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <span>⚠️ Real-World Warning: Uncontrolled Automation & False Promises</span>
              </span>
              <span class="text-[10px] text-rose-600/80 dark:text-rose-400/80">Typical Incidents</span>
            </div>
            <p class="text-rose-800/90 dark:text-rose-300 leading-relaxed text-[11px]">
              Granting AI autonomous execution or direct commitments without sandbox barriers and human sign-off leaves organizations and operators strictly liable for misleading representations and commercial damage:
            </p>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              ${makeIncidentPill('case-ftc-donotpay-robot-lawyer-2025', 'FTC DoNotPay "Robot Lawyer" Enforcement ↗')}
              ${makeIncidentPill('case-air-canada-chatbot-refund-2024', 'Moffatt v. Air Canada Misleading Chatbot Ruling ↗')}
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">What you can do (pick the level that fits you)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">No setup · browser or phone only</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li><strong>If you only chat in a browser or phone app, you can skip this section.</strong></li>
                  <li>If your tool can operate your computer (files, commands), keep "default permissions / confirm each step". Do not enable "full access" or "run everything".</li>
                  <li>Back up important folders before letting the AI act.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Intermediate · willing to install a tool</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Do not install plugins or MCP tools from unknown sources; enable only the ones the current task needs.</li>
                  <li>Run AI-automated tasks in a separate OS account, virtual machine or container.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Advanced · AI tools that support Skills</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Enable <code>agent-sandbox-skill</code> to run risky scripts in a disposable isolated environment.</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ How to know you did it right: </strong>You saw and approved every delete, overwrite and network action the AI performed.</p>
          </div>

          <!-- Real World Exploit / Architecture Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">Agent & MCP Empirical Attack Vectors (Real-World Evidence)</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">CVE Exploits</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-bold shrink-0">
                <span class="group-open:hidden">Expand Evidence ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>Permission Gates ≠ Container Sandboxing</strong>: WorkBuddy strictly differentiates "Default Permissions" (workspace-scoped, confirmation prompts) from "Full Access"; Kimi Work explicitly documents risk of irreversible file loss and system corruption under autonomous modes. Never run uncontained agents with full host rights.</li>
              <li><strong>MCP Server-Side SSRF (FastGPT CVE-2026-40100)</strong>: Public advisories reveal FastGPT's MCP <code>runTool</code> path suffered from unauthenticated SSRF, allowing attackers to leverage the AI platform to probe internal networks.</li>
              <li><strong>Cross-Tenant Configuration Bypass (Dify CVE-2026-41947)</strong>: Dify previously suffered from unauthorized access on trace endpoints, enabling threat actors to exfiltrate prompt streams to external listeners (patched in v1.14.2).</li>
              <li><strong>MCP Semantic Supply-Chain Poisoning (Tool Poisoning)</strong>: Academic studies demonstrate that malicious MCP tools can conceal system directives in metadata descriptors, hijacking reasoning even when the malicious tool itself is not explicitly invoked.</li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Execution Isolation Arsenal:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("agent-sandbox-skill", "agent-sandbox-skill · MicroVM Sandbox Execution")}
            </div>
          </div>
        </div>

        <!-- Section 3.5 (Pre-Handoff) -->
        <div id="sec-4-5" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-5" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.5 Pre-Handoff: Four Statutory Publication Gates & Mandatory AI Disclosure</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            This is the ultimate legal checkpoint in the responsible AI workflow. Before shipping AI-assisted code, marketing releases, or user interfaces to production, never publish on unvetted intuition. Under the law, <strong>AI is never a legal person—deploying enterprises and users bear sole liability for all outputs</strong>. Ungated publication risks immediate regulatory fines, accessibility litigation, secret theft, or copyleft IP lawsuits.
          </p>

          <!-- 4 Statutory Gates Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span>📢 Gate 1: Commercial & Marketing Claims Compliance</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Intercept absolute superlatives (Advertising Law Art. 9 "national/best/top"), non-medical disease cure claims (Art. 17), and deceptive marketing (Art. 28 & Anti-Unfair Competition Law Art. 8). Every objective claim requires rigorous substantiation.
              </p>
              <div>${makePill("marketing-claims-review", "marketing-claims-review · Advertising Law & FTC Gate")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span>♿ Gate 2: Digital Inclusion & Statutory Web Accessibility</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mandated by China's Accessible Environment Construction Law Art. 34 and W3C WCAG 2.1 AA standards; intercepts missing ARIA tags, keyboard traps, and low contrast (below 4.5:1) before code enters production.
              </p>
              <div>${makePill("web-accessibility", "web-accessibility · Statutory WCAG Accessibility")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span>🔑 Gate 3: Credential & Secret Leak Interception</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enforce Git pre-commit gates via Gitleaks and OWASP rulesets to physically block API keys, cloud access secrets, and internal database connection URIs synthesized by code assistants.
              </p>
              <div>${makePill("repo-security-review", "repo-security-review · Secret Leak Gate")}</div>
            </div>

            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <span>📜 Gate 4: Copyleft Infection & Fine-Tuning IP Compliance</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Audit against SPDX standards and judicial precedents; intercept copyleft GPL/AGPL contamination in proprietary products, and align with Ultraman LoRA rulings to prevent unauthorized commercial IP reproduction.
              </p>
              <div>${makePill("license-compliance-audit", "license-compliance-audit · SPDX License Audit")}</div>
            </div>
          </div>

          <!-- Real-world Incident Alert Banner -->
          <div class="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <span>⚠️ Real-World Warning: Deceptive Advertising & IP Infringement Liabilities</span>
              </span>
              <span class="text-[10px] text-rose-600/80 dark:text-rose-400/80">3 Landmark Judicial Rulings</span>
            </div>
            <p class="text-rose-800/90 dark:text-rose-300 leading-relaxed text-[11px]">
              Publishing unvetted AI-synthesized content directly to the public has faced severe judicial and regulatory crackdowns—including deepfaked TV host marketing, unauthorized voice cloning, and AI copyright infringement:
            </p>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              ${makeIncidentPill('case-ad-fake-host-haidian-2025', 'Haidian Court Deepfaked Host Advertising Case ↗')}
              ${makeIncidentPill('case-ai-voice-bj-2023', 'Beijing Internet Court Voice AI Infringement ↗')}
              ${makeIncidentPill('case-ultraman-copyright-guangzhou-2024', 'Guangzhou Internet Court Ultraman Copyright Case ↗')}
            </div>
          </div>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">What you can do (pick the level that fits you)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">No setup · browser or phone only</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Before publishing, ask: are there words like "best", "No. 1", "cures"?</li>
                  <li>Can I show a source for every number and performance claim?</li>
                  <li>Is this AI-generated or synthetic content? If so, label it as required by local rules (in China: the AI-Generated Content Labeling Measures, effective 1 Sep 2025).</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Intermediate · willing to install a tool</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Web pages: run an accessibility audit with Lighthouse in Chrome DevTools.</li>
                  <li>Code: scan for leaked secrets with a tool such as Gitleaks before committing.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Advanced · AI tools that support Skills</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Enable the four gate skills below to block issues automatically in your release flow.</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ How to know you did it right: </strong>If someone asked "what is the basis for this sentence?" line by line, you could answer every time.</p>
          </div>

          <!-- Real World Statutory & Judicial Forensic Callout -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs my-4 shadow-xs">
            <summary class="font-bold text-slate-900 dark:text-white flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">Authentic Administrative Penalties, Judicial Rulings & Statutory Disclosures</span>
                <span class="adaptive-desktop-badge hidden lg:inline-flex items-center text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">Statutory Precedents</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-bold shrink-0">
                <span class="group-open:hidden">Expand Evidence ⬇</span>
                <span class="hidden group-open:inline">Collapse ⬆</span>
              </span>
            </summary>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li><strong>Authentic Chinese AMR Administrative Penalties</strong>:
                <ul class="list-none pl-2 space-y-1 mt-0.5">
                  <li>• <strong>Xiamen Jimei AMR (July 2025)</strong>: Miaogujintie Pharmacy fined <strong>1.2 Million RMB</strong> under Advertising Law Art. 4, 28, and 46 for fabricating an AI "56th-generation inheritor of millennium Miao therapy" and absolute claims ("seniors-exclusive") (SAMR typical case).</li>
                  <li>• <strong>Beijing Haidian AMR (June 2025)</strong>: Beijing Xingqinghao Tech fined <strong>200,000 RMB</strong> for deepfaking a famous CCTV host's voice and likeness to promote fish oil candy with fake medical benefits (Beijing's first AI celebrity deepfake ad case).</li>
                  <li>• <strong>Beijing Changping AMR (2026)</strong>: Beijing Shuangtaiyuan Trade fined for using AI avatars in livestreams claiming dietary products boost immunity, penalized under Anti-Unfair Competition rules.</li>
                  <li>• <strong>SAMR 2025 Internet Campaign</strong>: Investigated <strong>22,185 cases</strong>, levying <strong>111 Million RMB</strong> in fines, with targeted crackdowns on AI-generated deceptive advertising.</li>
                </ul>
              </li>
              <li><strong>FTC "Operation AI Comply" Comparison</strong>: The US FTC targets unsubstantiated AI claims (AI Washing): DoNotPay was fined $193,000 and banned from advertising "the world's first robot lawyer" without competent proof; CMG Media and two partners settled for $930,000 in August 2026 over fictitious "Active Listening" AI phone tracking claims; Air AI settled in March 2026. The core principle: every capability assertion requires strict substantiation.</li>
              <li><strong>Statutory Accessibility Requirements</strong>: China's <em>Accessible Environment Construction Law</em> (effective Sept 1, 2023) Article 34 legally requires public-service websites and apps to meet accessibility standards. Combined with W3C WCAG 2.1 AA, AI-generated code must maintain &gt;= 4.5:1 color contrast and full keyboard navigation with semantic ARIA fallbacks.</li>
              <li><strong>Ultraman LoRA Copyright Precedent (2024)浙0192民初1587号 / (2024)浙01民终10332号</strong>: The landmark dispute decided by Hangzhou Internet Court and finalized by Hangzhou Intermediate Court on Dec 30, 2024. The court ruled that Chushou AI committed <strong>contributory infringement</strong> of information network dissemination rights by facilitating Ultraman LoRA fine-tuning and model plaza distribution with commercial gain while neglecting viable filtering measures.</li>
              <li><strong>GPL Copyleft Precedents & AI Code Hygiene</strong>: The Supreme People's Court of China ruled in <code>(2021)最高法知民终2063号</code> (affirming the Shenzhen VirtualApp case <code>(2019)粤03民初3928号</code>) that violating GPLv3 conditions revokes the authorization and constitutes copyright infringement; SPC <code>(2019)最高法知民终663号</code> affirmed that independent modules communicating via standard APIs do not automatically contract GPL infection. AI code generation is not a license laundering tool: CI/CD must mandate SCA/SBOM scans and audit SaaS products against GNU AGPLv3 Section 13 remote-network copyleft.</li>
              <li><strong>Mandatory AI Watermarking & Disclosure</strong>: Under China's <em>Provisions on the Administration of Deep Synthesis</em> (Art. 16/17) and <em>Measures for Labeling AI-Generated Content</em> (effective Sept 1, 2025), all AI outputs must bear prominent visual labels and metadata watermarks. <strong>Iron Rule: "Generated by AI" fulfills transparency obligations only; it never waives legal liability for false advertising or copyright infringement.</strong></li>
            </ul>
          </details>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Delivery Transparency & Provenance Arsenal:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("ai-disclosure-convention", "ai-disclosure-convention · Disclosure Convention")}
              ${makePill("visible-ai-disclosure-pr-gate", "visible-ai-disclosure-pr-gate · PR Disclosure Gate")}
              ${makePill("ai-provenance", "ai-provenance · AI Provenance Tracking")}
              ${makePill("skill-provenance-tracker", "skill-provenance-tracker · Skill Invocation Provenance")}
              ${makePill("publish-prep-review", "publish-prep-review · Pre-Publish Audit")}
              ${makePill("vertu-seo-publish-gate", "vertu-seo-publish-gate · SEO Quality Gate")}
              ${makePill("gdpr-compliance-audit", "gdpr-compliance-audit · GDPR Compliance Audit")}
            </div>
          </div>
        </div>

        <!-- Section 3.6 (Post-Session) -->
        <div id="sec-4-6" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-6" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.6 Post-Session: Session Cleanup & Verification Before Completion</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Responsible collaboration finishes with two parallel actions: purge local temporary logs to avoid context leakage, and humanize boilerplate machine tones. The iron rule: <strong>Never claim completion without passing hard verification tests.</strong>
          </p>

          <!-- Tiered Actions (plain-reader) -->
          <div class="tiered-actions p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand/30 space-y-3 text-sm">
            <div class="text-sm font-bold text-slate-900 dark:text-white">What you can do (pick the level that fits you)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">No setup · browser or phone only</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Delete chats containing sensitive content when done, then delete related items under Settings › Memory separately.</li>
                  <li>Before handing off, ask: "Did I check this myself?" If not, do not call it done.</li>
                  <li>Polishing is for clarity, not for hiding AI use. Disclose where disclosure is required.</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Intermediate · willing to install a tool</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Clear chat history and uploaded files on each AI platform regularly (e.g. monthly).</li>
                </ol>
              </div>
              <div class="space-y-1.5">
                <div class="text-xs font-bold text-brand">Advanced · AI tools that support Skills</div>
                <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <li>Enable <code>verification-before-completion</code> so the AI must run checks before claiming completion.</li>
                </ol>
              </div>
            </div>
            <p class="text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2"><strong>✔ How to know you did it right: </strong>A month later, no chats or files you did not want to keep remain on the platform.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">🛠️ Post-Session Arsenal:</h4>
            <div class="flex flex-wrap gap-2">
              ${makePill("verification-before-completion", "verification-before-completion · Verification Gate")}
              ${makePill("humanizer", "humanizer · Humanize Output")}
            </div>
          </div>
        </div>
      </section>

      <!-- Chapter 5 -->
      <section id="chapter-5" class="space-y-8 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 4 · PERSONA PLAYBOOKS</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Persona Playbooks: A Day in the Safe Workflow
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            How to assemble these 44 open-source safety skills into personal self-defense chains across four representative professional personas: Academic Researchers, Software Engineers, Marketing Specialists, and Enterprise &amp; Administrative Staff.
          </p>
        </div>

        <!-- Section 4.1 -->
        <div id="sec-5-1" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-1" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.1 Graduate Researchers &amp; Scholars</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Academic Research · Graduate Researchers &amp; Scholars
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. Temptation &amp; Pain Point</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Confronted by imminent thesis deadlines, complex literature reviews across hundreds of journal papers, and research grant applications. The temptation is immense to paste unpublished novel experimental designs, raw lab metrics, or breakthrough theoretical conjectures directly into commercial cloud LLMs for instant drafting, restructuring, and language polish.
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. Near-Miss Incident &amp; Academic Red Lines</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Proprietary Lab Data Leakage &amp; Hallucinated Citations</strong>: Official cases documented by state secrecy authorities (e.g. Researcher Li), who uploaded core experimental results and unpublished data into commercial AI writing apps to save drafting time, causing proprietary lab breakthroughs to leak online and triggering severe administrative sanctions; simultaneously, uninspected LLMs autoregressively synthesize plausible yet non-existent citations—fabricating authors, bogus journal issues, and phantom DOIs (analogous to documented academic retractions where papers cited non-existent DOIs generated by LLMs). Submitting unverified papers to peer review triggers fatal findings of academic fabrication and destroyed reputations.
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Sanction ↗')}
                ${makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers Journal AI Retraction ↗')}
                ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Tongzhou Court Fake Precedent Reprimand ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. Defensive Pipeline: Daily Battle Schedule</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 09:30 AM · Research Scoping Sandbox &amp; Anti-Harvesting Isolation</span>
                Before synthesizing literature landscapes, never expose raw experimental parameters. Deploy ${makePill("scholar-safety", "scholar-safety · Research Data Isolation")} to construct an ephemeral retrieval sandbox with local hypothesis masking, blocking commercial LLMs from ingesting proprietary research concepts into next-generation training corpora.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 02:00 PM · Automated DOI CrossRef Verification &amp; Judicial Cross-Examination</span>
                Upon receiving AI-summarized literature, enforce a zero-trust verification loop. Invoke ${makePill("bibref-verify", "bibref-verify · BibRef Verification")} to query the CrossRef REST API and PubMed database, authenticating every DOI, publication date, and author metadata; deploy ${makePill("the-judge", "the-judge · The Judge Cross-Examination")} to roleplay hostile peer reviewers cross-examining arguments and expelling autoregressive hallucinations.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 05:30 PM · Publication Transparency &amp; Nature CRediT Attribution</span>
                Before final submission to supervisors or academic journals, replace vague disclaimers with formal attribution. Call ${makePill("ai-disclosure-convention", "ai-disclosure-convention · AI Disclosure Convention")} to generate a structured appendix conforming to Nature and ICMJE CRediT (Contributor Roles Taxonomy) standards, declaring AI assistance strictly for language editing while establishing sole human authorship for all scientific claims.
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. Verification Proof &amp; Audit Trail</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Delivered to academic advisors and review boards: A comprehensive package containing the final manuscript accompanied by an automated CrossRef 100% DOI validation receipt, The-Judge cross-examination records, and a formal Nature CRediT AI workflow disclosure appendix, ensuring 100% independent verifiability.
            </p>
          </div>
        </div>

        <!-- Section 4.2 -->
        <div id="sec-5-2" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-2" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>Playbook 2: Software Engineers &amp; Open-Source Maintainers</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Engineering &amp; DevOps · Software Engineers &amp; Maintainers
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. Temptation &amp; Pain Point</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Under intense sprint pressure to refactor legacy monoliths, debug production crash stack traces, and maintain open-source repositories. The temptation is immense to paste raw production logs with real database connection strings or launch autonomous agent IDEs in unconstrained "YOLO / Full Access" mode on bare-metal host machines.
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. Near-Miss Incident &amp; Compliance Red Lines</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Secret Exfiltration, Port Exposure &amp; Copyleft Contamination</strong>: In real enterprise audits, engineers pasting unmasked configs into AI assistants inadvertently routed production database credentials and proprietary architecture code to overseas endpoints; state employee Xiao Wang deployed an open-source model locally without firewall rules or passwords, allowing foreign threat actors to scan the open port and download internal sensitive documents; autonomous agents in YOLO mode running unconstrained shell scripts risk batch file wipes via indirect prompt injection; AI code generation silently injecting strictly reciprocal GPLv3/AGPLv3 code violates Supreme People's Court precedent (2021)最高法知民终2063号, exposing proprietary commercial codebases to forced open-sourcing or steep infringement damages.
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-state-security-wang-port-exposure-2025', 'MSS Xiao Wang Port Exposure Breach ↗')}
                ${makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', 'Hangzhou AMR Employee Trade Secret Fine ↗')}
                ${makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Policy Dismissal ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. Defensive Pipeline: Daily Battle Schedule</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 10:00 AM · Secret Masking &amp; MicroVM Sandbox Execution</span>
                Before submitting error logs or code for debugging, call ${makePill("pii-safe-documents", "pii-safe-documents · Document Masking")} to strip private keys, JWTs, and database URLs via regex and high-entropy detection; delegate agent refactoring and bash scripts to isolated ephemeral microVMs via ${makePill("agent-sandbox-skill", "agent-sandbox-skill · MicroVM Sandbox Execution")}, physically separating execution from the host.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 03:30 PM · Smashing Architecture Sycophancy &amp; Red-Team Scrutiny</span>
                When the model flatters your microservice architecture ("This design provides flawless 99.999% availability"), recognize the RLHF sycophancy trap. Invoke ${makePill("sycophancy-challenger", "sycophancy-challenger · Sycophancy Challenger")} to strip agreeable platitudes, and dispatch ${makePill("red-team-review", "red-team-review · Red Team Vulnerability Review")} to simulate malicious adversary attacks against network partitions, distributed split-brain states, and replay vulnerabilities.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 07:00 PM · Git Pre-Commit Secret Scanning, SPDX Licensing &amp; Hard Verification</span>
                Before opening a PR, trigger ${makePill("repo-security-review", "repo-security-review · Secret Leak Gate")} locally via Gitleaks to intercept leaked API keys; audit third-party dependencies with ${makePill("license-compliance-audit", "license-compliance-audit · SPDX License Audit")} to eliminate AGPL/GPL copyleft contamination; and enforce ${makePill("verification-before-completion", "verification-before-completion · Verification Gate")}, allowing merge only after all local test suites pass 100% green.
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. Verification Proof &amp; Audit Trail</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Delivered in the Pull Request: A machine-readable SPDX SBOM compliance report, a zero-leak Gitleaks audit badge, ephemeral sandbox execution logs, and full test-suite green receipts, guaranteeing compliance under enterprise security audits.
            </p>
          </div>
        </div>

        <!-- Section 4.3 -->
        <div id="sec-5-3" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-3" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.3 Writers &amp; Marketing Specialists</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Content &amp; Growth · Writers &amp; Marketing Specialists
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. Temptation &amp; Pain Point</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Facing tight launch deadlines, omni-channel social media quotas, and landing page builds. To maximize click-through and engagement, writers are tempted to publish exaggerated AI-generated copy and promotional headlines filled with superlatives without substantiation.
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. Near-Miss Incident &amp; Statutory Enforcement</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Heavy False Advertising Penalties &amp; Accessibility Violations</strong>: Models frequently churn out prohibited absolute terms like "the very best", "national grade", or "cures all illnesses", violating Advertising Law Art. 9, Art. 17, and Anti-Unfair Competition Law Art. 8. Real-world enforcement: Xiamen AMR penalized Miaogujintian 1.2M RMB for AI-fabricated "56th generation inheritor" claims; Beijing Haidian AMR fined a dietary supplement firm 200,000 RMB for using AI-cloned celebrity anchors; another enterprise was fined 1.2M RMB for unlabelled AI commercial marketing; furthermore, promotional landing pages lacking semantic ARIA tags violate mandatory requirements under China's Accessible Environment Construction Law (Art. 34), risking regulatory takedown orders.
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-ad-fake-history-xiamen-2024', 'Xiamen AMR ¥1.2M Fine for AI False Brand History ↗')}
                ${makeIncidentPill('case-ad-fake-host-haidian-2025', 'Haidian Court Deepfaked Host Live-Commerce Ruling ↗')}
                ${makeIncidentPill('case-ad-fake-news-jinan-2024', 'Jinan AMR ¥200k Fine for AI Fake News Ads ↗')}
                ${makeIncidentPill('case-ai-voice-bj-2023', 'Beijing Internet Court Voice AI Infringement ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. Defensive Pipeline: Daily Battle Schedule</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 10:30 AM · De-Boilerplating &amp; Humanized Tone Polishing</span>
                After generating initial creative hooks, deploy ${makePill("humanizer", "humanizer · Humanize Output")} to strip predictable AI cliches ("tapestry of innovation", "in this fast-paced world"), restoring authentic human emotional resonance and genuine voice.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 03:30 PM · Advertising Law &amp; FTC Substantiation Scrutiny</span>
                Before routing copy to graphic design and media buying, execute ${makePill("marketing-claims-review", "marketing-claims-review · Marketing Claims Review")} to audit claims against Chinese Advertising Law and FTC Substantiation guidelines, requiring empirical third-party test reports for every performance assertion while striking all unlawful superlatives.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 06:00 PM · W3C WCAG 2.1 AA Accessibility Testing</span>
                For promotional web code and interactive banners, run ${makePill("web-accessibility", "web-accessibility · Statutory WCAG Gate")} to verify color contrast ratios (&ge; 4.5:1), complete keyboard navigation, and semantic screen-reader compatibility under statutory accessibility laws.
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. Verification Proof &amp; Audit Trail</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Submitted to legal and marketing leadership: A comprehensive Marketing Compliance Dossier comprising prominently labeled AI marketing copy, a Claims Substantiation Evidence Matrix cross-referencing certified lab reports, and a Lighthouse WCAG 2.1 AA 100/100 accessibility scorecard.
            </p>
          </div>
        </div>

        <!-- Section 4.4 -->
        <div id="sec-5-4" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-4" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.4 Enterprise, Legal &amp; Administrative Staff</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Corporate Governance · Enterprise, Legal &amp; Administrative Staff
            </span>
          </div>

          <!-- Part 1 & 2: Temptation vs Near-Miss Incident -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>1. Temptation &amp; Pain Point</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Administrative officers, legal counsels, procurement specialists, and HR staff in state-owned enterprises (SOEs), public institutions, and large corporations drown in hours of internal executive meeting recordings, official directive drafting, multi-million dollar procurement tender comparisons, and employee performance files. Under relentless deadlines, employees face tremendous temptation to turn to commercial web AI assistants or WeChat bots for "one-click meeting transcription", "confidential draft polishing", and "pasting unmasked vendor pricing into prompts".
              </p>
            </div>

            <div class="scenario-box-danger space-y-2">
              <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>2. Near-Miss Incident &amp; Disciplinary Red Lines</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Official Reprimands, Secrecy Law Prosecutions &amp; Employment Terminations</strong>: Secrecy bureaus and state security departments have repeatedly sanctioned employees for AI leaks: Researcher Li was punished for feeding confidential blueprints into AI apps; staff member Feng was disciplined for attempting to evade secrecy rules by replacing names with letter codes ("分段输入、代码替换、删除对话即可安全" are dangerous fallacies—pseudonymization does not legalize cloud processing of secrets); a security scheme OCR leak triggered leadership administrative warnings and vendor contract terminations. The 2024 revised <em>State Secrets Law</em> Art. 31 establishes the unbreakable red line: <strong>"No State Secrets on the Internet, No Internet on State Secrets"</strong>, with 2024 regulations mandating official reporting within <strong>24 hours</strong> of any potential leak; enterprise "Traffic Light" rules designate core bids and unmasked PII as Red Light items, where violations incur immediate contract termination without severance and criminal liability under Criminal Law Art. 398.
              </p>
              <div class="pt-1 flex flex-wrap gap-1.5">
                ${makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Sanction ↗')}
                ${makeIncidentPill('case-state-secrecy-feng-leakage-2026', 'Secrecy Bureau Feng Pseudo-Code AI Leak ↗')}
                ${makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Dismissal Notice ↗')}
                ${makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Tongzhou Court AI Fabricated Precedent Reprimand ↗')}
              </div>
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. Defensive Pipeline: Daily Battle Schedule</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌅 09:30 AM · Offline Meeting Minutes De-identification (Zero Cloud Audio)</span>
                Strictly forbid third-party cloud recording or transcription services. For internal operational meetings, execute local offline masking via ${makePill("presidio-anonymize-text", "presidio-anonymize-text · Presidio Text Anonymizer")} and ${makePill("pii-safe-documents", "pii-safe-documents · Document Masking")}, replacing executive identities, internal project codes, and proprietary metrics with typed tokens (<code>[DEPT_HEAD_A]</code>, <code>[PROJECT_ALPHA]</code>, <code>[METRIC_VALUE_X]</code>). Keep the de-identification mapping table strictly on local encrypted disk—never upload it with prompts. (Classified materials must remain in physically isolated environments and must never be uploaded under any circumstances).
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">☀️ 02:30 PM · Procurement Bidding &amp; Adversarial Contract Scrutiny</span>
                When reviewing engineering bids or vendor agreements, enforce strict data minimization by removing entity names and commercial baseline quotes. Extract dispute and liability clauses, then deploy ${makePill("godfly-opposing-counsel", "godfly-opposing-counsel · Opposing Counsel Simulator")} to simulate aggressive opposing counsel and regulatory auditors, actively uncovering indemnification traps, intellectual property ambiguities, and hidden liability shifts.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🌆 05:30 PM · Compliance Audit Ledger &amp; Provenance Archival</span>
                In adherence to national public-sector AI guidelines and corporate Responsible AI policies requiring full lifecycle logs and human accountability, invoke ${makePill("ai-provenance", "ai-provenance · AI Provenance Tracking")} to export an immutable audit ledger containing model versions, prompt hash digests, de-identification records, and human sign-off receipts, enabling instant exoneration during internal corporate compliance reviews.
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. Verification Proof &amp; Audit Trail</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Archived with official approval files: A three-part compliance bundle including the Local De-identification Mapping Receipt (securely held offline), the Godfly Adversarial Contract Risk Audit Opinion, and a signed Corporate AI Provenance Ledger verifying zero leakage of protected data and certified human executive sign-off.
            </p>
          </div>
        </div>
              <!-- Section 5.5: Everyday Citizens & Family Routine -->
        <div id="sec-5-5" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 scroll-mt-36 lg:scroll-mt-28 shadow-xs"><span id="sec-4-5" class="hidden"></span>
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
              <span class="w-2 h-2 rounded-full bg-brand"></span>
              <span>5.5 Individuals & Family Daily Life: Health Inquiries, Homework & Fraud Defense</span>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Everyday Citizens & Families
            </span>
          </div>

          <!-- Part 1: Pain Point -->
          <div class="space-y-1.5">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>1. Temptation & Pain Point</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              At home, ordinary users rarely audit shell scripts or review procurement bids. Instead, they upload lab results to ask AI for a diagnosis, let AI generate complete school homework for their children, or receive urgent voice messages on messaging apps asking for money. Seeking convenience and reassurance, people easily treat LLMs as licensed physicians or all-knowing tutors, lowering their guard against synthetic audio and video.
            </p>
          </div>

          <!-- Part 2: Near-Miss -->
          <div class="scenario-box scenario-box-danger space-y-1.5">
            <div class="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>2. Near-Miss Incidents & Real-World Hazards</span>
            </div>
            <ul class="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4 list-disc leading-relaxed">
              <li><strong>Self-Medication Hazards</strong>: Uploading blood tests leads the AI to offer alarming interpretations or suggest dosage changes; acting on this without a licensed physician risks permanent health damage.</li>
              <li><strong>Outsourcing Childhood Cognition</strong>: A student snaps photos of geometry questions or essay prompts and copies the AI's exact answers; the homework is spotless, but critical problem-solving skills decay.</li>
              <li><strong>Deepfake & Voice-Cloning Extortion</strong>: Criminals extract brief audio clips from social media posts and clone a family member's voice to call elderly relatives claiming a car accident requires immediate wire transfers.</li>
            </ul>
            <div class="pt-1 flex flex-wrap gap-1.5">
              ${makeIncidentPill('case-ai-voice-bj-2023', 'Beijing Internet Court Voice AI Infringement ↗')}
              ${makeIncidentPill('case-ad-fake-host-haidian-2025', 'Haidian Court Deepfaked Host Advertising Case ↗')}
              ${makeIncidentPill('case-ftc-donotpay-robot-lawyer-2025', 'FTC DoNotPay "Robot Lawyer" Enforcement ↗')}
            </div>
          </div>

          <!-- Part 3: Defensive Pipeline -->
          <div class="space-y-2">
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
              <span>3. Family Self-Defense Pipeline: Four Healthy Habits</span>
            </div>
            <div class="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🏥 Habit 1 · Health Inquiries: Use AI for Clinic Prep, Never for Final Prescriptions</span>
                Ask AI: "List 5 specific questions I should ask my doctor during tomorrow's appointment." Redact patient names, ID numbers, and hospital IDs first. Follow one iron rule: for medication, dosages, and changes, <strong>only follow in-person medical prescriptions</strong>.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">📚 Habit 2 · Learning Scaffolding: Ask for Hints, Never Ready-Made Answers</span>
                Agree with children on a guiding prompt: "Do not give me the answer. Ask me 3 guiding questions so I can solve this myself." Use ${makePill("discernment-nudge", "discernment-nudge · Critical Discernment")} to encourage finding logical flaws in AI responses.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">🛡️ Habit 3 · Deepfake Defense: Establish Offline Family Passphrases</span>
                Create a memorable offline passphrase known only inside the family. Whenever an unexpected call or message demands urgent wire transfers, <strong>always ask for the passphrase first, hang up, and call the person back on their registered phone number</strong>.
              </div>
              <div class="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">📱 Habit 4 · Privacy Hygiene: Check App Permissions & Long-Term Memories</span>
                Spend 3 minutes auditing parents' mobile chat apps: revoke background microphone and photo library permissions, toggle off model improvement training, and clear accumulated personal memory lists.
              </div>
            </div>
          </div>

          <!-- Part 4: Verification Proof -->
          <div class="scenario-box scenario-box-success space-y-1.5">
            <div class="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>4. Everyday Family Checklist</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Baselines anyone can maintain: ① Use health AI only for consultation preparation, never for self-medication; ② Prompt AI for reasoning hints instead of copying answers; ③ Verify family emergencies via secret offline passphrases; ④ Restrict persistent smartphone permissions and purge AI memory.
            </p>
          </div>
        </div>
      </section>

      <!-- Chapter 6 -->
      <section id="chapter-6" class="space-y-6 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 6 · ADVOCACY</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Advocacy & Co-Creation: Digital Self-Defense as a Collective Act
          </h2>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <div class="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 mb-6">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              Why We Reject Hollow, Lofty Ethics
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Mainstream discussions around AI governance often stay confined to ivory towers or multinational tech whitepapers. High-minded terms like "fairness, benevolence, transparency, and accountability" sound noble, but offer zero defense when an everyday employee faces a blinking chat cursor.
            </p>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>This open-source practical repository was built to hand every everyday user a tangible shield and verification ruler.</strong> Rather than inventing buzzwords, we systematically curate 44 community-tested, production-proven SKILL.md specs—enabling anyone to fortify their workflow at zero barrier to entry.
            </p>
          </div>

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
              <a href="library.html" class="btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5">
                <span>🛡️ Explore 44 Curated Skills</span>
              </a>
              <a href="https://putongren.org" target="_blank" class="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5">
                <span>🌐 Visit putongren.org Community</span>
              </a>
            </div>
          </div>

          <!-- Community Fact-Check & Feedback Box -->
          <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔍</span>
              <span>Found an Error, Legal Change, or Broken Link?</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We stand strictly for <strong>verifiable evidence and factual integrity</strong>. If a statutory article changed, an empirical case fact requires updating, a platform route moved, or a curated skill link is broken, please let us know immediately!
            </p>
            <div class="pt-2">
              <a href="https://github.com/digitalrightsforall/guide_responsible_AI_use/issues/new?title=%5BContent+Correction%5D+" target="_blank" class="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 border border-slate-300/80 dark:border-slate-700">
                <span>🐛 Submit an Issue / Correction on GitHub ↗</span>
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

  // Dynamic TOC links translation
  const tocLabels = {
    zh: {
      "chapter-1": "1. 序幕 · 算法时代的平民处境",
      "chapter-2": "2. 上手第一步 · 关掉这几个隐形开关",
      "chapter-3": "3. 核心心智 · 三大安全支柱与四大日常追问",
      "chapter-4": "4. 实战图谱 · 44 个技能如何精准应对",
      "sec-4-1": "4.1 输入前·数据脱敏与外部投毒防范",
      "sec-4-2": "4.2 对话中·撕开幻觉与伪造文献",
      "sec-4-3": "4.3 决策时·打破谄媚与认知依附",
      "sec-4-4": "4.4 执行时·Agent 权限越权与沙盒隔离",
      "sec-4-5": "4.5 交付前·四大法定发布门禁",
      "sec-4-6": "4.6 收尾阶段·会话清理与完成校验",
      "chapter-5": "5. 角色剧本 · 普通人的一日安全工作流",
      "sec-5-1": "5.1 学者与高校师生",
      "sec-5-2": "5.2 软件工程师与开源维护者",
      "sec-5-3": "5.3 文案策划与数字营销专员",
      "sec-5-4": "5.4 政企人员与知识工作者",
      "sec-5-5": "5.5 普通个人与家庭日常",
      "chapter-6": "6. 倡导与共建 · 开源自卫行动"
    },
    en: {
      "chapter-1": "1. Prelude: Citizens in the Algorithmic Age",
      "chapter-2": "2. First Steps: Turn Off Hidden Data Collection Switches",
      "chapter-3": "3. Core Mental Models: Three Pillars & Four Questions",
      "chapter-4": "4. Action Arsenal: Deploying 44 Curated Skills",
      "sec-4-1": "4.1 Pre-Input: Data Masking & Poisoning Defense",
      "sec-4-2": "4.2 During-Chat: Piercing Hallucinations & Citations",
      "sec-4-3": "4.3 During-Chat: Smashing Sycophancy & Echo Chambers",
      "sec-4-4": "4.4 Execution: Agent Privilege & Sandbox Defense",
      "sec-4-5": "4.5 Pre-Handoff: Four Statutory Publication Gates",
      "sec-4-6": "4.6 Post-Session: Cleanup & Verification Gate",
      "chapter-5": "5. Persona Playbooks: Daily Safe Workflows",
      "sec-5-1": "5.1 Graduate Researchers & Scholars",
      "sec-5-2": "5.2 Software Engineers & Maintainers",
      "sec-5-3": "5.3 Writers & Marketing Specialists",
      "sec-5-4": "5.4 Enterprise & Administrative Staff",
      "sec-5-5": "5.5 Individuals & Family Daily Life",
      "chapter-6": "6. Advocacy & Co-Creation: Collective Defense"
    }
  };
  const labels = tocLabels[currentLang] || tocLabels.zh;
  document.querySelectorAll(".guide-toc-link").forEach(link => {
    const target = link.getAttribute("data-target");
    if (labels[target]) {
      link.textContent = labels[target];
    }
  });

  // Body HTML
  setHtml("narrative-content", t.bodyHtml);

  // Footer links
  setText("footer-link-guide", t.navLinkGuide);
  setText("footer-link-library", t.navLinkLibrary);
  setText("footer-link-incidents", t.footerLinkIncidents || t.navLinkIncidents);

  // Synchronize adaptive details (expand by default on desktop >= 1024px, collapse on mobile < 1024px)
  syncAdaptiveDetails(true);
}

let lastIsDesktop = null;
function syncAdaptiveDetails(force = false) {
  const isDesktop = window.innerWidth >= 1024;
  if (!force && lastIsDesktop === isDesktop) return;
  lastIsDesktop = isDesktop;

  const adaptiveDetailsList = document.querySelectorAll(".adaptive-details");
  adaptiveDetailsList.forEach((details) => {
    if (isDesktop) {
      details.setAttribute("open", "");
    } else {
      details.removeAttribute("open");
    }
  });
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

