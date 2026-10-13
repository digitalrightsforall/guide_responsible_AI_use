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

  // Delegate inline skill & incident pill & compact card clicks
  document.getElementById("narrative-content")?.addEventListener("click", (e) => {
    // Copy Command button on compact card
    const copyBtn = e.target.closest(".skill-copy-btn");
    if (copyBtn) {
      e.stopPropagation();
      const skillId = copyBtn.getAttribute("data-skill");
      if (skillId && itemsById[skillId]) {
        const item = itemsById[skillId];
        const cmd = item.action_content || item.install?.action_content || `curl -sL ${item.url}/raw/main/SKILL.md -o .agents/skills/${item.id}/SKILL.md`;
        navigator.clipboard.writeText(cmd).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = currentLang === "zh" ? "<span>✅ 已复制</span>" : "<span>✅ Copied</span>";
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        });
      }
      return;
    }

    // Inspect Evidence button on compact card
    const inspectBtn = e.target.closest(".skill-inspect-btn");
    if (inspectBtn) {
      const skillId = inspectBtn.getAttribute("data-skill");
      if (skillId && itemsById[skillId]) {
        openModal(skillId);
        return;
      }
    }

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

    ${(() => {
      const isPreInputPrivacy = item.timing === "pre-input" && (item.category === "feed-to-ai" || item.id.includes("pii") || item.id.includes("anonymize") || item.id.includes("scholar") || item.id.includes("clinical"));
      if (!isPreInputPrivacy) return "";

      if (isZh) {
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
        ${isZh ? '写给普通使用者的实操防范要点：' : 'Practical Takeaway for Everyday Users:'}
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

// Helper to render compact skill cards
function renderSkillCard(skillId, tierLabelZh, tierLabelEn, roleDescZh, roleDescEn, isAdvanced = false) {
  const item = itemsById[skillId];
  const isZh = currentLang === "zh";
  const tier = isZh ? tierLabelZh : tierLabelEn;
  const role = isZh ? roleDescZh : roleDescEn;
  const name = item ? item.name : skillId;
  const isOutOfBox = (item?.status?.stage || "").includes("开箱即用");
  const statusLabel = isZh 
    ? (isOutOfBox ? "开箱即用" : "需装依赖")
    : (isOutOfBox ? "Ready" : "Deps Req");
  const statusDotColor = isOutOfBox ? "bg-emerald-500" : "bg-amber-500";
  const tierClass = isAdvanced ? "tier-advanced" : "tier-required";
  
  // Only display clients note when there is a specific restriction (not universal)
  const rawClients = item?.clients || [];
  const isUniversal = rawClients.length === 0 || rawClients.includes("通用") || rawClients.includes("Universal") || rawClients.length >= 4;
  const clientTagHtml = (!isUniversal && rawClients.length > 0)
    ? `<div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between truncate">
         <span>${isZh ? '适用' : 'Requires'}: ${escapeHtml(rawClients.slice(0, 2).join(' / '))}</span>
       </div>`
    : "";

  return `
    <div class="skill-compact-card">
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-1.5 flex-wrap">
          <span class="skill-card-tag ${tierClass}">
            ${escapeHtml(tier)}
          </span>
          <span class="skill-status-text">
            <span class="w-2 h-2 rounded-full ${statusDotColor} inline-block shrink-0"></span>
            <span>${escapeHtml(statusLabel)}</span>
          </span>
        </div>
        <div>
          <h5 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
            ${escapeHtml(name)}
          </h5>
          <p class="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            ${escapeHtml(role)}
          </p>
        </div>
      </div>
      <div class="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
        ${clientTagHtml}
        <div class="grid grid-cols-2 gap-1.5 pt-0.5">
          <button type="button" class="skill-action-inspect skill-inspect-btn text-center truncate" data-skill="${skillId}">
            <span>${isZh ? '查看依据' : 'Evidence'}</span>
          </button>
          <button type="button" class="skill-action-copy skill-copy-btn text-center truncate" data-skill="${skillId}">
            <span>${isZh ? '复制命令' : 'Copy Cmd'}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Helper to render an entire defensive pipeline block with primary cards & expandable alternates (Borderless)
function renderSkillPipelineSection(options) {
  const isZh = currentLang === "zh";
  const title = isZh ? options.titleZh : options.titleEn;
  const subtitle = isZh ? options.subtitleZh : options.subtitleEn;
  const primaryCardsHtml = options.primary.map(p => 
    renderSkillCard(p.id, p.tierZh, p.tierEn, p.roleZh, p.roleEn, p.isAdvanced)
  ).join("");
  
  let moreHtml = "";
  if (options.alternates && options.alternates.length > 0) {
    const pillsHtml = options.alternates.map(a => makePill(a.id, a.label)).join("");
    const moreTitle = isZh 
      ? `查看另外 ${options.alternates.length} 个备选/补充技能（根据环境自由选用）`
      : `View ${options.alternates.length} alternative & supplementary skills`;
    moreHtml = `
      <details class="skill-alternates-row group">
        <summary>
          <span>📦 ${moreTitle}</span>
          <span class="text-[10px] text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="pt-2 flex flex-wrap gap-1.5">
          ${pillsHtml}
        </div>
      </details>
    `;
  }

  return `
    <div class="skill-pipeline-wrapper space-y-3 my-5">
      <div class="space-y-1">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-brand"></span>
          <span>${escapeHtml(title)}</span>
        </h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          ${escapeHtml(subtitle)}
        </p>
      </div>
      <div class="skill-card-grid ${options.primary.length >= 3 ? 'cols-3' : ''}">
        ${primaryCardsHtml}
      </div>
      ${moreHtml}
    </div>
  `;
}

// Component 2: Action Panel Helper (Strict accessible headings: h4 for contrast, h5 for tiers)
function renderActionPanel(opts) {
  const isZh = opts.lang !== "en";
  const headerTitle = isZh ? "行动建议与分级实操 (Action Guidance)" : "Action Guidance & Tiered Practices";
  const dontTitle = isZh ? "❌ 常见高危做法" : "❌ High-Risk Practices";
  const doTitle = isZh ? "✅ 规范自卫打法" : "✅ Standard Defense";
  const tiersHeading = isZh ? "你可以这样做（按自己的情况选一档）" : "What you can do (pick the tier that fits you)";
  const t1Title = isZh ? "零门槛 · 只用浏览器或手机" : "Zero Setup · Browser / Mobile Only";
  const t2Title = isZh ? "进阶 · 愿意装个软件或在本地操作" : "Intermediate · Local Tools & Redaction";
  const t3Title = isZh ? "专业 · 使用支持技能的 AI 客户端" : "Advanced · AI Tools with Agent Skills";
  const verifyLabel = isZh ? "✔ 怎么确认做对了：" : "✔ How to verify you did it right: ";

  const t1List = (opts.tierBrowser || []).map(item => "<li>" + item + "</li>").join("");
  const t2List = (opts.tierSoftware || []).map(item => "<li>" + item + "</li>").join("");
  const t3List = (opts.tierSkills || []).map(item => "<li>" + item + "</li>").join("");

  return `
    <div class="action-panel">
      <div class="action-panel-header">
        <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        <span>${headerTitle}</span>
      </div>
      <!-- Layer 1: Contrast Principles -->
      <div class="action-contrast-grid">
        <div class="action-contrast-col-dont">
          <h4>${dontTitle}</h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${opts.dontText}</p>
        </div>
        <div class="action-contrast-col-do">
          <h4>${doTitle}</h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${opts.doText}</p>
        </div>
      </div>
      <!-- Layer 2: Tiered Action Guidance -->
      <div class="pt-3">
        <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">${tiersHeading}</div>
        <div class="action-tiers-grid">
          <div class="action-tier-col space-y-1.5">
            <h5>${t1Title}</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${t1List}</ol>
          </div>
          <div class="action-tier-col space-y-1.5">
            <h5>${t2Title}</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${t2List}</ol>
          </div>
          <div class="action-tier-col space-y-1.5">
            <h5>${t3Title}</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${t3List}</ol>
          </div>
        </div>
      </div>
      <!-- Layer 3: Independent Verification Bar -->
      <div class="action-verification-bar">
        <strong>${verifyLabel}</strong><span>${opts.verifyText}</span>
      </div>
    </div>
  `;
}

// Component 4: Evidence Drawer Helper (Auto-calculates item counts)
function renderEvidenceDrawer(opts) {
  const isZh = opts.lang !== "en";
  const drawerTitle = opts.title || (isZh ? "实证与延伸：真实判例、法规条款与技术原理" : "Evidence & References: Cases, Statutes & Mechanisms");

  // Calculate dynamic count badge if not explicitly provided
  let countStr = opts.count;
  if (!countStr) {
    const parts = [];
    if (opts.cases && opts.cases.length > 0) parts.push(isZh ? `${opts.cases.length} 起案例` : `${opts.cases.length} Cases`);
    if (opts.statutes && opts.statutes.length > 0) parts.push(isZh ? `${opts.statutes.length} 条法规` : `${opts.statutes.length} Statutes`);
    if (opts.technical && opts.technical.length > 0) parts.push(isZh ? `${opts.technical.length} 项实证` : `${opts.technical.length} Findings`);
    countStr = parts.join(" · ");
  }
  const countBadge = countStr ? ` <span class="text-[11px] font-normal text-slate-400 dark:text-slate-500">(${countStr})</span>` : "";

  const toggleHint = isZh
    ? '<span class="group-open:hidden">展开证据 ⬇</span><span class="hidden group-open:inline">收起证据 ⬆</span>'
    : '<span class="group-open:hidden">Expand ⬇</span><span class="hidden group-open:inline">Collapse ⬆</span>';

  let sectionsHtml = "";

  if (opts.cases && opts.cases.length > 0) {
    const caseItems = opts.cases.map(c => '<div class="flex flex-wrap gap-1.5 pt-1">' + c + '</div>').join("");
    sectionsHtml += `
      <div class="evidence-drawer-section">
        <div class="evidence-drawer-section-title flex items-center gap-1.5 text-rose-800 dark:text-rose-300">
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>${isZh ? '真实案例与权威通报 (Real-World Incidents)' : 'Real-World Incidents & Sanctions'}</span>
        </div>
        <div class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${opts.caseSummary || (isZh ? '点击案卷标签可原地查阅案号、行政罚单与第一手裁判文书：' : 'Click pills to inspect official rulings and case numbers:')}</div>
        <div class="space-y-1.5 pt-1">${caseItems}</div>
      </div>
    `;
  }

  if (opts.statutes && opts.statutes.length > 0) {
    const statuteLis = opts.statutes.map(s => '<li>' + s + '</li>').join("");
    sectionsHtml += `
      <div class="evidence-drawer-section">
        <div class="evidence-drawer-section-title flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
          <svg class="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>${isZh ? '法规条款与标准对齐 (Statutes & Standards)' : 'Statutes & Regulatory Standards'}</span>
        </div>
        <ul class="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">${statuteLis}</ul>
      </div>
    `;
  }

  if (opts.technical && opts.technical.length > 0) {
    const techLis = opts.technical.map(t => '<li>' + t + '</li>').join("");
    sectionsHtml += `
      <div class="evidence-drawer-section">
        <div class="evidence-drawer-section-title flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
          <svg class="w-3.5 h-3.5 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          <span>${isZh ? '学术文献与技术机理解析 (Technical & Research Deep Dive)' : 'Technical & Research Deep Dive'}</span>
        </div>
        <ul class="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">${techLis}</ul>
      </div>
    `;
  }

  return `
    <details class="evidence-drawer group">
      <summary class="evidence-drawer-summary">
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
          <span>${drawerTitle}${countBadge}</span>
        </span>
        <span class="text-[11px] font-semibold text-brand">${toggleHint}</span>
      </summary>
      <div class="evidence-drawer-content">
        ${sectionsHtml}
      </div>
    </details>
  `;
}

// Component 5: Persona Playbook Fast-Track Helper (uses clean verification-panel)
function renderPersonaPlaybook(opts) {
  const isZh = opts.lang !== "en";
  const roleBadge = isZh ? opts.roleZh : opts.roleEn;
  const title = isZh ? opts.titleZh : opts.titleEn;
  const intro = isZh ? opts.introZh : opts.introEn;
  const painTitle = isZh ? "1. 现实痛点与诱惑 (Temptation & Pain Point)" : "1. Real Pain Point & Temptation";
  const painText = isZh ? opts.painZh : opts.painEn;
  const timelineTitle = isZh ? "2. 一日自卫战术时刻表 (Chronological Playbook)" : "2. Chronological Daily Defense";
  const minStdTitle = isZh ? "3. 最低完成标准与交付核对 (Verification Sign-off)" : "3. Verification Sign-off & Minimum Baseline";
  const minZero = isZh ? opts.minZeroZh : opts.minZeroEn;
  const minPro = isZh ? opts.minProZh : opts.minProEn;

  const stepsHtml = (opts.steps || []).map(step => {
    const time = step.time;
    const sTitle = isZh ? step.titleZh : step.titleEn;
    const sDesc = isZh ? step.descZh : step.descEn;
    return `
      <div class="persona-step">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[11px] font-mono font-bold text-brand bg-brand/10 dark:bg-brand/20 px-2 py-0.5 rounded">${time}</span>
          <span class="text-sm font-bold text-slate-900 dark:text-white">${sTitle}</span>
        </div>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${sDesc}</p>
      </div>
    `;
  }).join("");

  let casesHtml = "";
  if (opts.cases && opts.cases.length > 0) {
    const caseItems = opts.cases.join(" ");
    const toggleHint = isZh
      ? '<span class="group-open:hidden">展开参考案例 ⬇</span><span class="hidden group-open:inline">收起参考案例 ⬆</span>'
      : '<span class="group-open:hidden">Expand Cases ⬇</span><span class="hidden group-open:inline">Collapse Cases ⬆</span>';
    casesHtml = `
      <details class="evidence-drawer group mt-3">
        <summary class="evidence-drawer-summary">
          <span class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>${isZh ? '本角色真实前车之鉴与合规警示' : 'Real-World Incident Precedents'}</span>
          </span>
          <span class="text-[11px] font-semibold text-brand">${toggleHint}</span>
        </summary>
        <div class="evidence-drawer-content">
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">${isZh ? opts.nearMissZh : opts.nearMissEn}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">${caseItems}</div>
        </div>
      </details>
    `;
  }

  return `
    <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div class="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base sm:text-lg">
          <span class="w-2 h-2 rounded-full bg-brand"></span>
          <span>${title}</span>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">${roleBadge}</span>
      </div>
      <div class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${intro}</div>
      <div class="space-y-1.5 pt-1">
        <div class="text-xs font-bold text-slate-800 dark:text-slate-200">${painTitle}</div>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${painText}</p>
      </div>
      <div class="pt-2">
        <div class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">${timelineTitle}</div>
        <div class="persona-timeline space-y-2">${stepsHtml}</div>
      </div>
      <!-- Component: Clean Standalone Verification Panel -->
      <div class="verification-panel space-y-1.5">
        <div class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>${minStdTitle}</span>
        </div>
        <div class="text-sm text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed pl-1">
          <p>• <strong>${isZh ? '最低要求 (零门槛)' : 'Minimum Baseline (Zero Setup)'}：</strong>${minZero}</p>
          <p>• <strong>${isZh ? '进阶交付 (专业级)' : 'Professional Standard (Advanced)'}：</strong>${minPro}</p>
        </div>
      </div>
      ${casesHtml}
    </div>
  `;
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

        <!-- Chapter Objectives Box (Flat Two-Column Layout) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>本章阅读导航</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
            <div class="space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>本章解决什么问题
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                为什么日常用 AI 不能“想到什么就贴什么、AI 说什么就信什么”？盲信与滥用在现实司法中会带来哪些直接后果？
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>读完你能获得什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                建立“个人数据主权”与“零信任求证”的基础认知，理解“AI 生成不是免责金牌”，为后续动手配置与实战建立心理防线。
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            今天，大语言模型（LLM）与生成式人工智能正在被广泛应用于日常办公与专业研究中。无论是写一份周报、整理学术文献、编写一段业务代码，还是起草一份营销文案，我们都在被动或主动地向这些“黑盒”输入自己的工作内容、私人数据与未公开构想。
          </p>

          <p class="leading-relaxed font-medium text-slate-800 dark:text-slate-100">
            然而，在日常使用大语言模型和智能体时，用户面临着切实的数据与合规风险，这些风险在现实中已有对应的司法判例与公开通报：
          </p>

          <!-- Flat Editorial Text: Invisible Crises (No nested cards) -->
          <div class="space-y-4 my-6 pl-1">
            <div class="space-y-1.5">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>隐形危机一：数据主权与准标识符马赛克拼图</span>
              </h4>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                即使你在单次对话中没有说出自己的名字，长期使用同一账户输入的年龄、城市、职业困惑、技术选型等“准标识符”（Quasi-identifiers），在向量数据库中也能轻松拼接出完整的个人数字画像。免费工具的背后，每一个普通人都在充当不领薪水的训练矿工。
              </p>
            </div>

            <div class="space-y-1.5 pt-2">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>隐形危机二：自信幻觉与认知依附 (MIT/Stanford 实证)</span>
              </h4>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                认知神经科学与人机交互研究（如 MIT Media Lab 2025 年预印本《Your Brain on ChatGPT》及 Anthropic 谄媚性研究）提示：当过度把推理完全委托给 AI 代写时，可能产生即时记忆与注意力留存不足等“认知负担”（实验中深度依赖模型的测试组参与者多达 15/18 人难以准确引用刚生成的关键要点）。加之模型的<strong>谄媚倾向（Sycophancy，顺从讨好用户偏好）</strong>，若缺乏主动核查与批判反思，个人的独立审校与求证本能可能受到干扰。
              </p>
            </div>
          </div>

          <!-- Structured Summary of Legal Realities (Vertical Divided List, No nested cards) -->
          <div class="my-6 space-y-3">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span>现实司法前车之鉴：盲信 AI 的全球与本土法律代价</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">3 大核心警示</span>
            </div>

            <div class="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div class="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                <span class="font-mono font-bold text-rose-600 dark:text-rose-400 text-xs shrink-0">01</span>
                <div>
                  <strong class="text-slate-900 dark:text-white font-bold">AI 生成不是免责牌：</strong>
                  <span class="text-slate-600 dark:text-slate-400 leading-relaxed">AI 生成不能成为免责理由。将内容提交给法庭、客户或公众的人，仍需依法承担核验义务及相应责任。全球法院与仲裁机构（中美法院及加拿大民事审裁机构已有相关裁判或决定）对 AI 虚构判例与虚假陈述已开出罚款、通报与全额赔偿。</span>
                </div>
              </div>

              <div class="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs shrink-0">02</span>
                <div>
                  <strong class="text-slate-900 dark:text-white font-bold">输入材料授权范围有限：</strong>
                  <span class="text-slate-600 dark:text-slate-400 leading-relaxed">获得录音制品或文档权限，并不等于获得投喂 AI 模型的许可。自然人人格权独立受保护，将他人敏感素材喂给商业大模型存在直接侵权风险。</span>
                </div>
              </div>

              <div class="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                <span class="font-mono font-bold text-brand dark:text-brand-container text-xs shrink-0">03</span>
                <div>
                  <strong class="text-slate-900 dark:text-white font-bold">涉密与商密红线：</strong>
                  <span class="text-slate-600 dark:text-slate-400 leading-relaxed">“涉密不上网，上网不涉密”。私自带走 Prompt 商业模板已被市监局处以 35 万元行政处罚，核心数据与公文喂 AI 已致科研人员受党政处分及实名辞退。</span>
                </div>
              </div>
            </div>

            <!-- Evidence Drawer: Detailed Case Precedents Folded for On-Demand Review -->
            ${renderEvidenceDrawer({
              lang: 'zh',
              title: '实证与延伸：盲信 AI 的全球与本土司法裁判案卷与通报',
              count: '5 起司法判例 · 3 起涉密通报 · 最高法裁判指引',
              cases: [
                makeIncidentPill('case-ai-voice-bj-2023', '北京互联网法院：全国首例AI声音侵权案判赔25万 (2023)京0491民初12142号 ↗'),
                makeIncidentPill('case-court-fake-citation-tongzhou-2025', '北京通州法院：律师盲信AI生成假案号被司法通报批评 ↗'),
                makeIncidentPill('case-court-fake-citation-yichang-2026', '湖北宜昌法院：引用AI捏造虚假法条予以司法训诫案 ↗'),
                makeIncidentPill('case-mata-avianca-fake-citations-2023', '纽约南区联邦法院：Mata v. Avianca 虚假先例制裁案罚款5000美元 ↗'),
                makeIncidentPill('case-air-canada-chatbot-refund-2024', '加拿大审裁处：加航AI客服虚构退款规则案裁定全额赔偿 ↗'),
                makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', '杭州市监局：擅自带走大模型Prompt模板微调被罚35万元 ↗'),
                makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密受处分 ↗'),
                makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退 ↗')
              ],
              statutes: [
                '<strong>最高人民法院《关于依法审理涉人工智能纠纷案件的意见》(法发〔2026〕10号)</strong>：诉讼参与人使用 AI 辅助撰写文书必须严格核实内容真实性并如实说明；严禁伪造证据、虚构判例与法条，违者依据《民事诉讼法》第 114 条予以严肃制裁。',
                '<strong>《中华人民共和国个人信息保护法》第 23 条</strong>：向第三方提供个人信息的，应当向个人告知接收方的名称或者姓名、联系方式、处理目的、处理方式和个人信息的种类，并取得个人的单独同意。',
                '<strong>新修订《中华人民共和国保守国家秘密法》</strong>：确立“涉密不上网，上网不涉密”法定红线，禁止在连接互联网或者其他公共信息网络的计算机和信息设备中存储、处理、传输国家秘密。'
              ],
              technical: [
                '<strong>实证负结果澄清</strong>：截至 2026 年 10 月，中国公开司法判例中，尚未出现“员工把商业秘密贴进公共 ChatGPT 类产品，直接被法院判决侵犯商业秘密罪”的生效裁判。日常最明确的商业秘密执法案例是杭州市市场监管局对擅自带走 Prompt 模板用于大模型微调开出的 35 万元行政处罚。',
                '<strong>生成虚构与自动化偏见</strong>：LLM 基于统计概率自回归预测生成词元，无内在真伪校验机制。在专业、冷门或长尾知识领域，极易生成看似专业但完全捏造的案号与文献。'
              ]
            })}
          </div>

          <!-- Chapter 1 Transition to Everyday Action -->
          <div class="p-4 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-2 mt-4">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>💡 应对这些风险，空洞的口号帮不上忙</span>
            </h4>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              宏观的治理口号并不能在日常对话框前保护普通人。我们需要的是第 2 章的基础安全设置、第 3 章的三大安全支柱与四大日常追问，以及第 4 章的分级实操方案。
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

        <!-- Chapter Objectives Box (Flat Two-Column Layout) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>本章阅读导航</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
            <div class="space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>本章解决什么问题
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                为什么在客户端“清空聊天记录”不能真正删掉数据？各主流工具（Trae、豆包、Kimi、Cursor、ChatGPT 等）究竟有哪些隐形的数据留存机制？
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>读完你能获得什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                尽可能关闭主力 AI 客户端中的模型训练授权，并检查、清理长期记忆与已上传文件。
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <!-- 30s Quick Action Card for Everyday Citizens (Flat Divided Layout) -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>普通人自卫第一步：30 秒极简安全行动（先做这三件事）</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand/15 pt-1 text-xs">
              <div class="py-2 sm:py-0 sm:px-3 first:pl-0 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. 关掉“训练授权”</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">在常用 AI 客户端的【设置】中，关闭“允许使用我的数据改进/训练模型”，防止未公开草稿被吞入公共语料。</p>
              </div>
              <div class="py-2 sm:py-0 sm:px-3 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. 清理“长期记忆”</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">在【设置 &gt; 记忆/Memory】定期清理。单次删除对话不会同步删记忆，必须进记忆库单独注销。</p>
              </div>
              <div class="py-2 sm:py-0 sm:px-3 last:pr-0 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. 留个心眼“查一查”</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">AI 给的论文期刊、法律案号、名人金句，凡是要对外交差的，务必手动在权威平台核查（论文查知网/doi.org，案号查裁判文书网）。</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            在你在光标闪烁的对话框中敲下第一行字之前，安全博弈其实早已开始。无论你使用的是国内主流的<strong>Trae、WorkBuddy、豆包、Kimi</strong>，还是国际前沿的<strong>Cursor、Claude、ChatGPT、Gemini</strong>，许多人以为“点一下删除对话”或“关掉聊天记录”就万事大吉。然而底层架构的设计却隐藏着<strong>“控制的错觉”（Illusion of Control）</strong>：前端隐藏历史记录并不等同于服务端数据已经删除。
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
              <li><strong>《网络安全法》第21条留存 6 个月 ≠ 所有聊天正文必须保存 6 个月</strong>：法律强制留存的法定对象是<strong>“相关网络运行与安全日志”</strong>，而非用户输入的完整提示词与私有正文；合规日志要求并不包含完整保存用户输入正文的许可。</li>
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
        <span>💡 完成基础配置后，在日常对话与交互中还需要注意哪些事项？</span>
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

        <!-- Chapter Objectives Box -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>本章阅读导航</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>本章解决什么问题
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                除了“防泄漏隐私”，安全使用 AI 还需要关注什么？面对 AI 顺从讨好的回答，如何识破心理陷阱并保持主观审慎？
              </p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>读完你能获得什么
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                掌握“三大安全支柱”（知道什么/相信什么/能做什么）与贯穿全指南的“四大日常实操追问”，建立清晰的心理防线模型。
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-5">
          <p class="leading-relaxed">
            综合中国全国网安标委（TC260-005）、美国国家标准（NIST AI 600-1）、香港私隐专员公署（PCPD）及 OWASP 智能体应用安全框架，个人视角下的负责任与安全 AI 使用，必须跳出“只防输入隐私”的狭隘认知，升级为<strong>“三大核心安全追问 × 两大防御纵深 × 四大日常习惯”</strong>的完整立体架构：
          </p>

          <!-- 3 Security Pillars (Clean Vertical 3-Section Layout) -->
          <div class="my-6 space-y-4">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span>三大安全支柱 · 平民心智防线</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">3 Core Pillars</span>
            </div>

            <div class="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div class="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span class="font-mono font-bold text-brand dark:text-brand-container text-xs shrink-0">01</span>
                <div class="space-y-1">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>支柱一：AI 知道什么？</span>
                    <span class="text-[11px] font-normal text-slate-500">(数据保密与边界控制 · Confidentiality & Boundary)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>通俗结论：不仅看输入框敲了什么，还要看后台存了什么。</strong>单次对话即使不提名字，零散的职业、城市与业务细节也会拼成个人画像；知识库、插件和长期记忆随时可能扩大数据暴露面。
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    法定与标准对齐：《个人信息保护法》(PIPL) 第6条最小必要、第13条授权同意与第23条单独同意；NIST AI 600-1 与 OWASP LLM02 敏感信息泄露防范。
                  </p>
                </div>
              </div>

              <div class="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs shrink-0">02</span>
                <div class="space-y-1">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>支柱二：AI 相信什么？</span>
                    <span class="text-[11px] font-normal text-slate-500">(认知完整与防投毒 · Cognitive Integrity & Anti-Poisoning)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>通俗结论：AI 读取的外部网页、长文档和评论本身可能“带毒”，且模型天然倾向迎合用户。</strong>未经核验的内容均应视为不可信输入；AI 越顺从自信，越要主动核查原始出处。
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    法定与标准对齐：《生成式人工智能服务管理暂行办法》第4条禁止生成虚假有害信息；最高法 2026 年《意见》要求诉讼参与人对 AI 辅助生成的诉讼材料履行核实、说明义务并依法对真实性、准确性承担责任；防范 OWASP LLM01 间接提示词注入与 LLM05 供应链污染。
                  </p>
                </div>
              </div>

              <div class="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs shrink-0">03</span>
                <div class="space-y-1">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>支柱三：AI 能做什么？</span>
                    <span class="text-[11px] font-normal text-slate-500">(权限隔离与行动可逆性 · Privilege & Agency Isolation)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>通俗结论：对话机器人答错只耗电费，智能体干错动作直接删本地文件或越权转账。</strong>凡涉及写文件、执行脚本或调用外部接口的操作，必须坚持“默认只读、人工确认、高危沙盒”。
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    法定与标准对齐：《互联网信息服务算法推荐管理规定》人工干预机制；全国网安标委 TC260-005《伦理安全指引 1.0》与《智能体部署使用安全指引》；防范 OWASP ASI01/ASI03 与 LLM06 过度代理风险。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 3 Pillars Deep Mapping Table (Folded for Everyday Users) -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">法规与行业标准对照表</span>
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
                      • <strong>《生成式人工智能服务管理暂行办法》</strong>第4条：禁止生成虚假有害信息<br>
                      • <strong>最高法 2026 年《意见》</strong>：诉讼参与人对 AI 辅助生成材料履行核实与说明义务，依法对真实性、准确性承担责任
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
                      • <strong>全国网安标委</strong>：TC260-005《伦理安全指引 1.0》及《智能体部署使用安全指引》自主权分级
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      • <strong>OWASP for Agentic AI</strong>：<br>
                      &nbsp;&nbsp;- <strong>ASI01</strong> (Excessive Agency 过度自主权)<br>
                      &nbsp;&nbsp;- <strong>ASI03</strong> (Lack of Guardrails 缺乏防护围栏)<br>
                      • <strong>OWASP Top 10 for LLM</strong>：<strong>LLM06</strong>
                    </td>
                    <td class="py-3.5 px-4 leading-relaxed">
                      对话型 AI 答错只消耗电费，智能体 Agent 动作错误直接抹除文件或转账。必须落实最小权限原则，关键系统操作需经过人工确认。
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
                  在信息离开你的电脑、输入到模型云端前，强制执行本地脱敏与沙盒隔离；与模型交互时应保持独立审视，由人做出最终判断与决策。
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
                <p class="text-slate-600 dark:text-slate-400 mt-1">“读完这个，替我下结论并写好”。AI 接管判断，人类审核流于形式，增加决策风险。</p>
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
                建立“人类在环（Human-in-the-Loop）”的测试门禁：通过规范技能实现文献 DOI 查证、代码密钥扫描与敏感信息脱敏核对，由人类承担最终签署（Sign-off）责任。
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

        <!-- Cloud vs Local Modes & Workspace Risks (Fundamental Distinction) -->
        <div id="sec-cloud-vs-local" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4 text-sm shadow-xs scroll-mt-36 lg:scroll-mt-28">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="text-[11px] font-bold text-brand uppercase tracking-wider block mb-1">基本概念辨析</span>
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              云端模式与本地模式的区别：数据在何处流转，以及接入工作空间的风险
            </h3>
          </div>

          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
            很多读者在初次使用 AI 时，容易把所有工具当成同一种东西。但一个 AI 工具是在云端运行还是在你的电脑本地运行，直接决定了你的数据会流经哪里。
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                第一种：云端模式（网页对话框、手机端与云端助手）
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                在这种模式下，你的设备只负责显示画面。无论你在对话框里粘贴了一段文字，还是上传了一份文件，这些内容都必须先通过网络完整发送到服务商的机房。模型在远端服务器上读取这些文字并生成回答，再传回你的屏幕。这也意味着，只要你按下了发送键，原始文字就已经离开了你的设备。
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                第二种：本地模式（桌面编辑器与终端智能体）
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                这常见于 Cursor、Claude Code 等安装在个人电脑上的工具。这里的区别在于：虽然大模型本身的推理计算可能依然调用云端接口，但控制程序和你的文件都留在你的电脑硬盘里。当你要求它处理一个文件时，你在对话框里输入的通常只是文件的存放路径，而不是文件本身。本地程序可以先在你的电脑上运行一段过滤小程序，把人名和电话换成代号，然后再把处理后的副本提供给模型。
              </p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2 text-xs sm:text-sm">
            <span class="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span>⚠️ 接入工作空间（Google Drive、OneDrive、飞书或 Notion）的现实风险</span>
            </span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              随着功能更新，不少云端产品开始提供“一键连接云盘或协同知识库”的功能。很多人为了省事会直接授权。这种授权带来两个容易被忽略的细节：
            </p>
            <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
              <li><strong>读取范围往往超出预期：</strong>多数授权协议是一次性针对整个文件夹甚至整个账号生效的。为了建立搜索索引，远端服务通常会在后台遍历并同步你账号里的历史文档、会议纪要与草稿，而不是只读取你当前正在讨论的那一篇。</li>
              <li><strong>共享文档可能夹带不可控指令：</strong>当工作空间里有多人协作时，只要其中一份共享文档、网页剪藏或外部邮件中包含恶意的隐藏提示词，远端负责检索的智能体在读取该文档时就可能受到干扰，误将其他文档的内容汇总或发送出去。</li>
            </ol>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
              如果处理的是日常公开资料，云端连接确实更方便。但如果涉及未经公开的业务底稿、人事档案或客户隐私，让远端服务保持对整个工作空间的常驻读取权限，会让个人很难把控信息的实际扩散边界。
            </p>
          </div>
        </div>

        <!-- Section 4.1 -->
        <!-- Section 4.1 -->
        <div id="sec-4-1" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-1" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.1 输入前 · 个人隐私保护与提示词注入防范 (Pre-Input)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当你准备把一份包含真实姓名、联系方式、财务数据或业务源码的文档提交给 AI 时，数据便存在泄露风险。仅抹去人名并不等同于完成脱敏。按照隐私研究中的<strong>马赛克拼图理论（Mosaic Theory）</strong>，即使隐去姓名，只要保留“某三甲医院罕见病科室 + 42岁男性 + 某日入院”等属性组合，依然能高概率推断出当事人身份。著名的 <a href="https://dataprivacylab.org/projects/identifiability/paper1.pdf" target="_blank" class="text-brand underline">Sweeney 经典实验 ↗</a> 表明，“出生日期 + 性别 + 5位邮编”这类属性组合在特定人口数据中具有高度唯一性，因此存在再识别风险。虽然单一出生日期与邮编属于一般个人信息，但依照《个人信息保护法》第28条，一旦与医疗健康、金融账户或行踪轨迹结合，极易还原出当事人身份，构成法律严格保护的敏感个人信息。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            与此同时，在让 AI 联网搜索、分析长文档或企业知识库时，还存在<strong>“外部隐形投毒”（间接提示词注入，IPI）</strong>的威胁：攻击者在公开网页、文档或邮件中嵌入难以直接察觉的提示词注入指令。当 AI 抓取并解析这些内容时，可能误执行该指令，导致本地上下文或密钥信息被发送至外部服务器。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '以为抹去真实姓名就是“已脱敏”，直接将包含病历科室、年龄、交易流水或业务代码的准标识符全选输入对话框；直接把未审计的外部网页、公开仓库或 PDF 发给联网 Agent 全自动抓取并赋予其外部网络通信与工具执行权限。',
            doText: '基于 Presidio 等工具实施本地沙盒差分脱敏，用抽象占位符全局置换准标识符组合；对所有外部抓取与 RAG 文本实施 Spotlighting 标签定界与不可信数据隔离，清洗白底白字、零宽字符与 PDF 隐藏层，封锁非法出站通道。',
            tierBrowser: [
              '把真实姓名、电话、身份证号、住址替换成“[姓名A]”“[电话]”这类占位符再粘贴。',
              '年龄改成年龄段，地址只写到城市，单位只写行业。',
              '涉及国家秘密、工作秘密或他人病历的内容，不要输入任何公共 AI。',
              '让 AI 阅读陌生网页或 PDF 时，不要同时授予它收发邮件、读写文件的权限。'
            ],
            tierSoftware: [
              '先在本地文本编辑器里用“查找替换”批量替换敏感词，再复制给 AI。',
              '有条件可在本机运行开源的 Microsoft Presidio 自动识别并替换个人信息。'
            ],
            tierSkills: [
              '在支持技能的工具中启用下方的脱敏类技能（如 <code>pii-safe-documents</code>），由 AI 在发送前自动检查。',
              '安装命令见卡片详情或技能库。'
            ],
            verifyText: '把准备发送的文字转给不了解背景的同事阅读；若对方能推断出当事人身份，说明脱敏尚不充分。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Pre-Input Defensive Pipeline)",
            titleEn: "Pre-Input Defensive Pipeline & Curated Skills",
            subtitleZh: "工序：敏感数据本地脱敏 → 投喂内容清洗 → 外部提示词注入拦截。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Local PII redaction → data sanitization → prompt injection defense.",
            primary: [
              {
                id: "pii-safe-documents",
                tierZh: "核心防线 · 输入前",
                tierEn: "Core Defense · Pre-Input",
                roleZh: "在本地生成可逆脱敏副本，防止向大模型泄露真实个人与客户隐私",
                roleEn: "Creates local redacted working copy to protect private PII from cloud upload",
                isAdvanced: false
              },
              {
                id: "skill-sanitizer",
                tierZh: "核心防线 · 数据净化",
                tierEn: "Core Defense · Sanitization",
                roleZh: "投喂文本清洗器，过滤代码与文本中隐藏的凭据、内网地址与恶意识别符",
                roleEn: "Sanitizes sensitive tokens, private IPs and internal credentials before ingestion",
                isAdvanced: false
              },
              {
                id: "skill-sentinel",
                tierZh: "核心防线 · 注入防御",
                tierEn: "Core Defense · Anti-Injection",
                roleZh: "分析网页与PDF等外部上下文，实时识别并阻断间接提示词注入指令",
                roleEn: "Inspects external context (PDF/web) to block indirect prompt injection payloads",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "presidio-anonymize-text", label: "presidio-anonymize-text · 微软标准文本匿名化" },
              { id: "pii-detection-pipeline", label: "pii-detection-pipeline · 隐私多重检测流" },
              { id: "openmed-clinical-ingestion", label: "openmed-clinical-ingestion · 临床病历隐私合规" },
              { id: "skillguard", label: "skillguard · 技能静态恶意检测" },
              { id: "security-threat-model", label: "security-threat-model · 威胁建模分析" },
              { id: "scholar-safety", label: "scholar-safety · 学术检索隐私隔离" },
              { id: "nova-proximity", label: "nova-proximity · 敏感数据越界预警" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：隐私拼图效应、法条依据与间接注入机理',
            count: '3 起案例 · 1 条法规 · 5 项技术实证',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密受处分 ↗'),
              makeIncidentPill('case-state-secrecy-feng-leakage-2026', '保密观通报：冯某起草重大会议材料输入AI写作泄密 ↗'),
              makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退 ↗')
            ],
            statutes: [
              '<strong>马赛克理论与 PIPL 敏感个人信息防线</strong>：依照《个人信息保护法》第28条，医疗健康、金融账户与特定身份信息一旦泄露极易导致人格尊严受侵害。单纯掩盖姓名无法阻断准标识符组合还原，必须对年龄区间、地理位置、就诊科室等属性实施 K-匿名化扰动或生成合成数据。'
            ],
            technical: [
              '<strong>载体一：白底白字、CSS 隐藏与 HTML 注释</strong>：2026 年大规模网络测量（分析 12 亿 URL、2480 万 host，确认 1.53 万个真实注入实例分布于 1.17 万个网页）证实，大量网页在 <code>&lt;!-- 注释 --&gt;</code>、<code>font-size: 0</code>、<code>display: none</code> 中隐蔽嵌入面向 AI 的劫持指令。Agent 扁平化抓取文本时会将其与用户指令无差别混淆。',
              '<strong>载体二：零宽字符隐写 (Zero-width Unicode)</strong>：Reverse CAPTCHA 实验通过 8,308 次模型输出证实，攻击者利用 <code>\u200B</code>（零宽空格）及 Unicode Tags 可在人眼完全不可见的情况下将恶意指令喂给模型分词器（Tokenizer），轻易穿透传统 WAF 正则与关键词拦截。工程上须强制采用 NFKC 规范化与语言感知 allowlist 进行过滤。',
              '<strong>载体三：PDF 隐藏文本层 (Off-Screen / Phantom Layers)</strong>：CrackedPDFs 2026 研究（近 3 万份实验 PDF 样本）揭示，解析器直接抽取 PDF 纯文本构建向量索引时破坏了版面视觉逻辑，隐藏文本、同色文字在模型上下文中获得与正文相同的权重，持久污染知识库。安全防御必须结合 OCR 视觉比对实施语义与渲染层差分。',
              '<strong>在野 CVE 实证：<a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" class="text-brand font-bold underline">EchoLeak (CVE-2025-32711, CVSS 9.3 严重性) ↗</a></strong>：业界首个针对企业级大模型（Microsoft 365 Copilot）的“零点击（Zero-Click）”间接注入漏洞。受害者仅收到一封隐藏恶意提示词的普通邮件，不知情下对 Copilot 发出“总结今日邮件”指令，Copilot 即被劫持读取账户内机密财务邮件，并通过 Teams 代理域名 (<code>asyncgw.teams.microsoft.com</code>) 伪造 Markdown 图片标签将敏感数据外发，穿透企业 CSP 策略。',
              '<strong>工程防御：微软 <a href="https://arxiv.org/abs/2403.14720" target="_blank" class="text-brand font-bold underline">Spotlighting 防御机制 ↗</a> 与权限收敛</strong>：抛弃单薄的 system prompt 拦截，改用随机 Hash 标签定界不可信数据，结合 Base64 编码使注入成功率从 &gt;50% 降至 &lt;2%，并严格实施出站网络流量过滤与带外人工二次确认。'
            ]
          })}
        </div>


        <!-- Section 4.2 -->
        <div id="sec-4-2" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-2" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.2 生成回答时 · 识别虚假文献与事实性幻觉 (During-Chat)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型最令人着迷也最危险的特性就是它的“自信”。当你向它询问学术背景、法律先例或技术溯源时，它能瞬间生成排版严谨、带有著名学者姓名、权威期刊卷期乃至以 <code>10.xxxx</code> 开头的标准 DOI 引文。然而逐一检索这些引文往往令人震惊：DOI 根本不存在，或者文章结论与模型论述南辕北辙。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这种现象绝非系统偶发故障，而是根植于大模型的<strong>自回归运作机制（Autoregressive Next-Token Prediction）</strong>。语言模型基于前文概率预测后续词元，其机制是挑选统计上合理的词序列，而非核实客观事实。在生僻的学术论文或法律条文等领域，模型往往会生成格式逼真但实际不存在的引文。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '看到 AI 提供了详尽的学者、刊号、DOI 或判决书案号就直接信以为真，未经多源核验就整段复制进诉讼状、开题报告、临床研究或投研研报中。',
            doText: '确立“默认虚构”的零信任核验原则；调用 CrossRef/PubMed 官方 API 与国内知网/中国裁判文书网开展双环交叉审计，确保每一项论断与引文在权威数据库中具有不可篡改的真实验证锚点。',
            tierBrowser: [
              '论文：复制 DOI，粘贴到 <a href="https://doi.org/" target="_blank" class="text-brand underline">doi.org</a> 打开；打不开或文章对不上，就当它不存在。',
              '没有 DOI 的论文：用标题去知网、百度学术或谷歌学术搜索原文。',
              '法律案号：到 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网</a> 或人民法院案例库检索。',
              '名人名言、统计数字：找到原始出处再用。'
            ],
            tierSoftware: [
              '用 <a href="https://search.crossref.org/" target="_blank" class="text-brand underline">Crossref 检索页</a> 批量核对 DOI 与作者、期刊是否一致。',
              '用 Zotero 等文献管理软件按 DOI 导入，导入失败的条目重点复查。'
            ],
            tierSkills: [
              '在支持技能的工具中启用下方的引文核验类技能（如 <code>bibref-verify</code>），自动调用 Crossref / PubMed 逐条比对。'
            ],
            verifyText: '你交出去的每一条引用，都至少亲手打开过一次原文页面。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Fact & Citation Verification Pipeline)",
            titleEn: "Fact & Citation Verification Pipeline",
            subtitleZh: "工序：卷期与DOI外部校验 → 引文对齐核实 → 主张忠实度交叉查证。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: DOI & Volume verification → Citation alignment → Claim source cross-check.",
            primary: [
              {
                id: "bibref-verify",
                tierZh: "核心核验 · 卷期真伪",
                tierEn: "Core Verification · BibRef",
                roleZh: "调用 CrossRef 与 PubMed 官方接口，严密校验引文作者、期卷号与真实 DOI",
                roleEn: "Queries CrossRef & PubMed REST APIs to verify authentic authors, volume and DOI",
                isAdvanced: false
              },
              {
                id: "citation-verifier",
                tierZh: "核心核验 · 来源真伪",
                tierEn: "Core Verification · Sources",
                roleZh: "通用引文真伪核查器，快速筛查学术论文和报告中是否存在凭空捏造的虚构来源",
                roleEn: "Fast universal citation checker to uncover hallucinated or fabricated citations",
                isAdvanced: false
              },
              {
                id: "claim-source-fact-checker",
                tierZh: "核心核验 · 忠实度比对",
                tierEn: "Core Verification · Faithfulness",
                roleZh: "主张与来源比对器，逐句质问‘原文到底有没有这个结论’，防止歪曲断章取义",
                roleEn: "Verifies whether source texts actually substantiate the specific claims made by AI",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "citation-faithfulness-checker", label: "citation-faithfulness-checker · 引文忠实度核对" },
              { id: "citation-integrity-auditor", label: "citation-integrity-auditor · 学术引用完整性审计" },
              { id: "post-generation-fact-check", label: "post-generation-fact-check · 生成后事实查核" },
              { id: "vectara-hallucination-corrector", label: "vectara-hallucination-corrector · 幻觉纠错 (需依赖)" },
              { id: "hallucination-risk-reviewer", label: "hallucination-risk-reviewer · 幻觉风险评估" },
              { id: "kdense-peer-review", label: "kdense-peer-review · 严密同行审议" },
              { id: "the-judge", label: "the-judge · 裁判官逻辑交叉质证" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：自回归概率缺陷、法庭制裁判例与权威核验链条',
            count: '4 起案例 · 2 套权威核查链条',
            cases: [
              makeIncidentPill('case-court-fake-citation-tongzhou-2025', '北京通州法院：AI虚构(2022)沪01民终12345号案号批评 ↗'),
              makeIncidentPill('case-court-fake-citation-yichang-2026', '湖北宜昌法院：AI篡改法条当庭训诫警告 ↗'),
              makeIncidentPill('case-frontiers-ai-image-retraction-2024', '国际顶刊Frontiers：AI生成荒诞插图撤稿通报 ↗'),
              makeIncidentPill('case-mata-avianca-fake-citations-2023', '美国联邦法院：Mata案虚构判例制裁5000美元 ↗')
            ],
            statutes: [
              '<strong>中国司法机关严惩 AI 虚假证据与案号造假</strong>：最高人民法院司法通报与各省高院明确强调，民事诉讼中当事人及代理律师不得使用生成式 AI 伪造虚假案例或法律文书。依据《中华人民共和国民事诉讼法》第一百一十四条，伪造重要证据妨碍人民法院审理案件的，法院将依法采取罚款、拘留直至追究刑事责任的严厉司法制裁。'
            ],
            technical: [
              '<strong>自回归预测的结构性缺陷</strong>：大模型是“语言概率连接器”而非“数据库引擎”。遇到缺乏充分预训练语料的长尾知识点时，自注意力机制会顺应提示词语法偏好，拼凑出词嵌入向量高度共现的名词、数字与期刊名，创造出看似权威实则凭空捏造的幻觉引文。',
              '<strong>国际司法引证灾难案 (Mata v. Avianca)</strong>：美国纽约南区联邦法院审理的标志性案件中，执业律师向法庭提交由 ChatGPT 协助起草的法律简报。主审法官核验后震惊发现，简报中引用的 6 起判例（包括判决案号、引用文段及法官意见）完全是 AI 凭空编造的虚构作品。最终法官对涉事律师及律所处以 5,000 美元司法罚款并向同行公开发布通报。',
              '<strong>学术与司法双环权威事实核验链条</strong>：国际学术双验环：强制通过 <a href="https://api.crossref.org" target="_blank" class="text-brand underline">CrossRef 官方 REST API ↗</a> 校验 DOI 元数据真实性，调用 <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" class="text-brand underline">NCBI PubMed ↗</a> 核实医学论文，结合 OpenAlex 校验学者学术图谱；中国本土法学与学术核验环：中文学术引文建议在知网或万方核实篇名、作者与期刊卷期；涉案司法先例必须在 <a href="https://wenshu.court.gov.cn/" target="_blank" class="text-brand underline">中国裁判文书网 ↗</a> 及最高人民法院案例库按统一案号核验裁判事实。'
            ]
          })}
        </div>


        <!-- Section 4.3 -->
        <div id="sec-4-3" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-3" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.3 制定方案时 · 防范 AI 的迎合讨好与盲目顺从 (During-Chat)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当用户在提问中带有明显倾向时（例如“我觉得单体架构更适合当前业务”），模型常会顺应提问者给出赞同答复。在机器学习领域，这种现象被称为<strong>“谄媚倾向（Sycophancy）”</strong>。模型为获取更高的人类偏好评分，倾向于顺应提问者的预期，从而忽略反面论据和潜在缺陷。
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            大模型为什么天然热衷于讨好用户？Anthropic 2023 年里程碑研究《<a href="https://arxiv.org/abs/2310.13548" target="_blank" class="text-brand font-bold underline">Towards Understanding Sycophancy in Language Models ↗</a>》揭示了其根本成因：在训练大模型的“人类反馈强化学习”（RLHF）阶段，人类测试员更喜欢给那些顺从自己观点、措辞客气顺从或迎合的回答。研究表明，在存在分歧的技术或决策问题中，模型倾向于附和用户的预设立场，掩盖潜在的架构缺陷。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '提问时预设立场、暗示倾向，在模型顺应作答后未做交叉检验与对立视角测试，便直接采纳结论。',
            doText: '建立“三级对抗审阅管道（3-Tier Adversarial Scrutiny Pipeline）”，从轻量认知微提醒到魔鬼代言人逆反推演，直至引入独立多角色陪审团，层层剥离谄媚滤镜，让方案在激进质疑中淬炼。',
            tierBrowser: [
              '提问时不要先说自己的倾向，只描述问题和约束条件。',
              '拿到方案后追加一句（可直接复制）：<code>请忽略我的偏好，指出这个方案最脆弱的 3 个假设，以及它最可能失败的场景。</code>',
              '再问一句：<code>如果你是反对这个方案的人，你最有力的 3 条理由是什么？</code>'
            ],
            tierSoftware: [
              '开一个新会话或换一个不同厂商的模型，问同一个问题，对比结论是否一致。',
              '重大决定前，至少找一位真人同事看过反方意见。'
            ],
            tierSkills: [
              '启用下方的反谄媚 / 魔鬼代言人类技能（如 <code>sycophancy-challenger</code>），让 AI 固定执行对抗审阅流程。'
            ],
            verifyText: '你能说出这个决定“最大的风险是什么”，而且这条风险不是 AI 主动夸你时顺带提的。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Anti-Sycophancy & Critical Review Pipeline)",
            titleEn: "Anti-Sycophancy & Critical Review Pipeline",
            subtitleZh: "工序：认知摩擦微提醒 → 单角色魔鬼代言人逆向质询 → 多角色陪审团会诊。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Cognitive friction nudge → Devil's Advocate scrutiny → Multi-agent Jury review.",
            primary: [
              {
                id: "discernment-nudge",
                tierZh: "核心防线 · 认知摩擦",
                tierEn: "Core Defense · Cognitive Nudge",
                roleZh: "轻量级认知摩擦约束，强制模型不附和倾向，列出方案最薄弱的 3 个假设",
                roleEn: "Lightweight cognitive friction nudge forcing models to highlight hidden weak assumptions",
                isAdvanced: false
              },
              {
                id: "devils-advocate-mad-skills",
                tierZh: "核心防线 · 逆向推演",
                tierEn: "Core Defense · Adversarial",
                roleZh: "魔鬼代言人单兵攻防，站在对立面疯狂质询方案漏洞与商业盲区",
                roleEn: "Adversarial devil's advocate role questioning your plan from a harsh opposing angle",
                isAdvanced: false
              },
              {
                id: "the-jury",
                tierZh: "进阶会诊 · 陪审团",
                tierEn: "Advanced Defense · Multi-Agent Jury",
                roleZh: "多智能体独立会诊，由架构师、风控官与质疑者背靠背独立投票质证",
                roleEn: "Simulates a cross-disciplinary jury for blind, independent review and consensus voting",
                isAdvanced: true
              }
            ],
            alternates: [
              { id: "sycophancy-challenger", label: "sycophancy-challenger · 谄媚质疑挑战者" },
              { id: "anti-sycophancy-molly", label: "anti-sycophancy-molly · 防迎合直言护卫" },
              { id: "devils-advocate-reviewer", label: "devils-advocate-reviewer · 批评性对抗审阅" },
              { id: "godfly-opposing-counsel", label: "godfly-opposing-counsel · 模拟对方辩友质证" },
              { id: "the-fool", label: "the-fool · 愚者反直觉质疑" },
              { id: "red-team-review", label: "red-team-review · 红队对抗漏洞挖掘" },
              { id: "receiving-code-review", label: "receiving-code-review · 客观代码审查受纳" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：为什么 AI 总爱顺着你说？模型迎合倾向与反向质询',
            count: '4 级对抗流程解析',
            cases: [],
            statutes: [],
            technical: [
              '<strong>RLHF 奖励模型机制局限</strong>：模型在 RLHF 微调阶段学习到“附和用户的观点能获取更高的 Reward 分数”，随着模型参数规模扩大，这种谄媚行为非但没有消除，反而演变得更加圆滑和极具说服力。未经专门对抗纠偏的大模型绝非合格的中立决策顾问。',
              '<strong>Tier 1: 认知摩擦微提醒 (Discernment Nudge)</strong>：在 Prompt 中强制植入认知摩擦约束，例如：“请完全忽略我的偏好与倾向，直接指出当前技术方案中最脆弱的 3 个底层假设和潜在失效场景。” 对应技能：<code>discernment-nudge</code>, <code>sycophancy-challenger</code>。',
              '<strong>Tier 2: 魔鬼代言人逆向攻防 (Devil\'s Advocate & Adversarial Review)</strong>：赋予模型极端敌对的对立角色（如“做空机构分析师”、“苛刻合规官”或“诉讼反方首席律师”），专门对技术架构与商业主张发起进攻性质询与破绽深挖。对应技能：<code>devils-advocate-mad-skills</code>, <code>devils-advocate-reviewer</code>, <code>godfly-opposing-counsel</code>, <code>anti-sycophancy-molly</code>。',
              '<strong>Tier 3: 独立多角色陪审团会诊 (The Jury & Red Team)</strong>：多智能体架构模拟，拆解为架构师、安全官、财务官与反直觉质疑者组成的多维陪审团，实行背靠背独立投票质证，减少单一会话中的同质化偏见。对应技能：<code>the-jury</code>, <code>the-fool</code>, <code>red-team-review</code>, <code>receiving-code-review</code>。'
            ]
          })}
        </div>


        <!-- Section 4.4 -->
        <div id="sec-4-4" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-4" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.4 执行命令时 · 限制智能体越权操作与文件误删 (Pre-Action)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            当智能体获得终端执行与文件改写权限时，安全风险也从生成内容延伸到了系统操作层面。例如误执行删除命令、解析了包含恶意指令的外部文档，或者配置了权限过宽的外部工具，都可能导致项目文件被误删或本地数据被意外修改。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '在 IDE 或终端开启无感全自动执行模式（如 YOLO 或“允许完全访问”），对不可信仓库允许智能体在宿主机裸机执行未审视的 Shell 脚本与文件批量覆盖；随意挂载不受信任的第三方 MCP 服务。',
            doText: '严格保持“默认权限”与审批弹窗；将高危脚本和测试任务重定向到 E2B 临时微型虚拟机中物理隔绝运行；对 MCP 工具按需单项授权，审查工具 descriptor 防止供应链语义投毒。',
            tierBrowser: [
              '<strong>只在网页或手机 App 上聊天的读者，可以跳过本节。</strong>',
              '如果你用的工具能操作电脑（读写文件、运行命令），保持“默认权限 / 每步确认”，不要开启“完全访问”“自动执行全部”。',
              '让 AI 动手前，先备份重要文件夹。'
            ],
            tierSoftware: [
              '不要安装来源不明的插件或 MCP 工具；只开启当前任务真正需要的那几个。',
              '在单独的系统账户、虚拟机或容器里运行 AI 自动执行的任务。'
            ],
            tierSkills: [
              '启用 <code>agent-sandbox-skill</code>，把高风险脚本放进一次性的隔离环境中执行。'
            ],
            verifyText: 'AI 执行的每一个删除、覆盖、联网操作，你都在弹窗里亲眼看过并点了确认。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Agent Execution Isolation Pipeline)",
            titleEn: "Agent Execution Isolation Pipeline",
            subtitleZh: "工序：敏感指令拦截 → 最小权限边界收敛 → 临时微虚拟机沙盒隔离。",
            subtitleEn: "Pipeline: Command interception → Privilege boundary → Micro-VM sandbox isolation.",
            primary: [
              {
                id: "agent-sandbox-skill",
                tierZh: "核心防线 · 沙盒执行",
                tierEn: "Core Defense · Micro-VM Sandbox",
                roleZh: "将 Agent 执行的高风险命令置于临时沙盒与微虚拟机中，杜绝系统文件误删与逃逸",
                roleEn: "Executes agent CLI commands within disposable micro-VM sandboxes to prevent system destruction",
                isAdvanced: false
              }
            ],
            alternates: []
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：智能体与 MCP 工具真实越权漏洞案例',
            count: '1 起处罚通报 · 2 个已公开 CVE · 2 项架构实证',
            cases: [
              makeIncidentPill('case-outcall-douxing-shanghai-2026', '国家市监总局典型案例：斗星智能AI批量外呼虚假宣传罚款20万元 ↗')
            ],
            statutes: [],
            technical: [
              '<strong>权限门禁 ≠ 物理容器</strong>：WorkBuddy 将权限严谨分为“默认权限”（限制工作空间、弹窗确认）与“完全访问”；Kimi Work 官方明确提示完全权限存在文件覆盖和系统改动风险。没有容器沙箱前，严禁开启无确认全自动执行。',
              '<strong>MCP 服务端 SSRF 风险（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-40100" target="_blank" class="text-brand font-bold underline">FastGPT CVE-2026-40100 ↗</a>）</strong>：公开安全漏洞分析显示，MCP <code>runTool</code> 接口曾存在未认证 SSRF，外部请求可被诱导向内部私有地址发起探测，需及时升级防护补丁并建立网络隔离。',
              '<strong>跨租户配置泄露（<a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand font-bold underline">Dify CVE-2026-41947 ↗</a>）</strong>：Dify 曾曝出 Trace 配置未授权访问，攻击者可将受害者的提示词和响应流重定向至外部监听端点（已在 v1.14.2 修复）。',
              '<strong>MCP 语义供应链投毒 (Tool Poisoning)</strong>：学术界与 PoC 证实，恶意 MCP 工具可在描述元数据中隐蔽嵌入系统指令，即使用户未主动调用该工具，也会劫持模型对上下文的任务推演。'
            ]
          })}
        </div>


        <!-- Section 4.5 -->
        <div id="sec-4-5" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-5" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.5 交付成果前 · 广告虚假宣传审查与许可证核对 (Pre-Handoff)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            这是内容发布前的合规核验环节。当一段由 AI 辅助生成的代码、文案或产品页面准备对外发布时，需要经过实质性核对。在法律层面上，<strong>AI 本身不是独立责任主体。发生侵权或违法后，法院将结合使用者、发布者和服务提供者各自的控制能力、注意义务与具体行为依法划分责任</strong>。未经核对的内容可能面临行政处罚、无障碍合规纠纷、密钥泄漏或开源许可证违规等风险。
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '直接将 AI 生成的带绝对化宣传词（“国家级/最高级/根治”）的文案投入商业广告；未跑无障碍检测直接上线页面；将带有硬编码密钥或带有 GPL/AGPL 传染协议的代码未经审查推向公共或商业闭源项目。',
            doText: '严格阻断广告法绝对化用语，为每一项功效声称绑定客观检测依据；按照 W3C WCAG 2.1 AA 标准校验可访问性；利用 Gitleaks 与 SPDX SBOM 工具严密扫描密钥泄露与开源协议传染风险。',
            tierBrowser: [
              '发布前自问三句：有没有“最、第一、国家级、根治”这类词？',
              '文中的数字和功效，有没有可以出示的来源？',
              '这是 AI 生成或合成的内容吗？如果是，按《人工智能生成合成内容标识办法》（2025 年 9 月 1 日起施行）添加标识。'
            ],
            tierSoftware: [
              '网页类成果：用 Chrome 开发者工具中的 Lighthouse 跑一次无障碍检测。',
              '代码类成果：提交前用 Gitleaks 等工具扫描是否夹带密钥。'
            ],
            tierSkills: [
              '启用下方门禁技能（如 <code>marketing-claims-review</code>、<code>web-accessibility</code>、<code>license-compliance-audit</code>），在发布流程中自动拦截。'
            ],
            verifyText: '假如有人逐句追问“这句话的依据是什么”，你都能拿出来。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Pre-Handoff & Disclosure Pipeline)",
            titleEn: "Pre-Handoff & Disclosure Pipeline",
            subtitleZh: "工序：代码与发布物自动披露 → 人机贡献血统存证 → 商业发布前全面质检。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Code/PR disclosure gate → AI provenance tracking → Pre-publish compliance audit.",
            primary: [
              {
                id: "visible-ai-disclosure-pr-gate",
                tierZh: "核心门禁 · 代码披露",
                tierEn: "Core Gate · Code Disclosure",
                roleZh: "在 GitHub PR 中自动检测并生成可视化 AI 贡献披露报告，满足团队审查透明度",
                roleEn: "Automated PR gate that generates visible disclosures of AI contributions in code",
                isAdvanced: false
              },
              {
                id: "publish-prep-review",
                tierZh: "核心门禁 · 发布预审",
                tierEn: "Core Gate · Pre-Publish Audit",
                roleZh: "商业宣发与文案发布前综合质检，审查虚假效能主张、敏感合规与事实漏洞",
                roleEn: "Comprehensive review prior to publishing content, guarding against unsubstantiated claims",
                isAdvanced: false
              },
              {
                id: "ai-provenance",
                tierZh: "核心存证 · 血统溯源",
                tierEn: "Core Audit · Provenance",
                roleZh: "人机协作血统存证系统，记录提示词、模型版本与人工修改轨迹以备合规审计",
                roleEn: "Auditable record keeping prompt traces, model hashes and human editing history",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "marketing-claims-review", label: "marketing-claims-review · 广告法与 FTC 审查门禁" },
              { id: "web-accessibility", label: "web-accessibility · 法定 WCAG 无障碍门禁" },
              { id: "repo-security-review", label: "repo-security-review · 凭证泄露审查门禁" },
              { id: "license-compliance-audit", label: "license-compliance-audit · SPDX 协议合规审计" },
              { id: "ai-disclosure-convention", label: "ai-disclosure-convention · 透明披露规范" },
              { id: "skill-provenance-tracker", label: "skill-provenance-tracker · 技能调用溯源" },
              { id: "vertu-seo-publish-gate", label: "vertu-seo-publish-gate · SEO 发布质检门禁" },
              { id: "gdpr-compliance-audit", label: "gdpr-compliance-audit · GDPR 权利合规审计" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：市监处罚案例、法定门禁、版权判例与开源协议传染',
            count: '3 起典型判例 · 4 类行政门禁 · 4 项司法准则',
            cases: [
              makeIncidentPill('case-ad-fake-host-haidian-2025', '北京海淀市监局：AI仿冒主持人推销食品虚假广告罚款20万 ↗'),
              makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', '北京通州首例刑案：Stable Diffusion图生图电商拼图判刑1年半 ↗'),
              makeIncidentPill('case-criminal-extortion-medical-shanghai-2026', '上海杨浦法院刑案：男子用AI制造假病历敲诈勒索拘役判决 ↗')
            ],
            statutes: [
              '<strong>市场监管部门 (AMR) 真实行政处罚案例</strong>：厦门市集美区市监局重罚“苗古金贴” 120 万元人民币（捏造传承人虚假宣传）；北京市海淀区市监局查处 AI 仿冒央视主持人虚假推销鱼油罚款 20 万元；昌平区市监局查处虚拟人直播违规；总局 2025 通报前三季度查办互联网违法广告 22,185 件，罚没 1.11 亿元。',
              '<strong>无障碍标准与法定指引</strong>：中国《无障碍环境建设法》（2023年9月1日施行）第三十二条规定利用财政资金设立的网站逐步符合无障碍标准，并鼓励公共服务网站提升无障碍水平。W3C WCAG 2.1 AA 国际准则是工程设计的重要基线（如色彩对比度通常不低于 4.5:1，交互控件支持纯键盘导航与语义回退）。',
              '<strong>法定生成标识与水印义务</strong>：依据《互联网信息服务深度合成管理规定》第16/17条以及 2025 年 9 月 1 日实施的《人工智能生成合成内容标识办法》，发布 AI 生成合成内容必须添加显著显式标识与元数据隐式水印。注意：“本内容由 AI 生成”仅属于来源披露义务，并不免除发布者的法律侵权或广告违法责任。'
            ],
            technical: [
              '<strong>FTC "Operation AI Comply" 国际执法对比</strong>：美国 FTC 严厉打击缺乏实证支持的 AI 吹嘘（AI Washing）：DoNotPay 宣称“世界首个机器人律师”被罚款 19.3 万美元；CMG Media 等三家公司因虚假宣称 AI 监听语音定向广告支付 93 万美元和解金。核心在于 Substantiation（每一项效能声称必须具备严密证据支撑）。',
              '<strong>奥特曼 LoRA 终审版权案 (2024)浙0192民初1587号 / (2024)浙01民终10332号</strong>：杭州互联网法院审理、杭州市中院终审裁判。认定平台提供奥特曼 LoRA 模型训练与分发构成帮助侵权，确立了高知名 IP + 稳定复现 LoRA + 商业获利的平台注意义务边界。',
              '<strong>开源协议传染司法判例与 AI 代码补全</strong>：最高人民法院 <code>(2021)最高法知民终2063号</code> 终审裁判（维持深圳中院 VirtualApp 案 <code>(2019)粤03民初3928号</code>）确认，违反 GPLv3 条件导致许可依法终止，继续使用代码构成著作权侵权；同时最高法在 <code>(2019)最高法知民终663号</code> 确立独立程序通过标准接口交互不当然被 GPL 传染。AI 生成的代码同样受上游开源许可证约束，在持续集成中应引入依赖检查与 SBOM 审计；SaaS 云服务尤其严防 GNU AGPLv3 第 13 条因网络交互触发强制开源。'
            ]
          })}
        </div>


        <!-- Section 4.6 -->
        <div id="sec-4-6" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-6" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.6 长期归档时 · 记录人机分工说明与生成凭据 (Post-Session)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            一个规范的协作流程包括两个环节：其一，清理本地临时会话记录与日志，避免敏感上下文残留；其二，对最终文本进行去套路润色，消除机械腔调。核心原则是：<strong>未经测试验证通过，不应宣称任务完成。</strong>
          </p>

          ${renderActionPanel({
            lang: 'zh',
            dontText: '直接把包含项目凭据、未公开设想或内部人名的历史会话长久留在云端账户；在没有通过本地测试和事实复核的情况下，轻信 AI 的“已全部搞定”并直接交付；为了图快直接发布充满“画卷徐徐铺展/不仅如此而且”的生硬套话。',
            doText: '会话结束后主动清理涉及敏感材料的上下文与记忆；设立严格的完成前测试门禁，跑通自动化测试套件后方可打标完成；依照维基百科去 AI 化规范深度润色，保留真实的思考肌理。',
            tierBrowser: [
              '含敏感内容的对话用完即删；再到【设置 › 记忆】里把相关记忆单独删除。',
              '交付前问自己：“这件事我自己检查过了吗？”没检查过，就不要说“已完成”。',
              '润色旨在提高表达的清晰度，合规要求披露 AI 辅助的场景仍应如实说明。'
            ],
            tierSoftware: [
              '定期（如每月）清理一次各 AI 平台的历史对话和上传文件。'
            ],
            tierSkills: [
              '启用 <code>verification-before-completion</code>，要求 AI 在宣称完成前先跑完检查。'
            ],
            verifyText: '一个月后回看，平台上没有残留你不想留下的对话和文件。'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Post-Session & Completion Verification Pipeline)",
            titleEn: "Post-Session & Completion Verification Pipeline",
            subtitleZh: "工序：硬性测试检验门禁 → 消除 AI 套路机械腔润色。作为发布前的验证与文字润色环节。",
            subtitleEn: "Pipeline: Mandatory verification before completion → Humanized style rewriting.",
            primary: [
              {
                id: "verification-before-completion",
                tierZh: "核心门禁 · 终局检验",
                tierEn: "Core Gate · Verification",
                roleZh: "严禁 AI 口头宣称完成：强制跑完验证套件与事实检查，提供证据后方可交付",
                roleEn: "Enforces evidence-based task completion: forbids LLM declaring done without tests",
                isAdvanced: false
              },
              {
                id: "humanizer",
                tierZh: "核心润色 · 去套路化",
                tierEn: "Core Polish · Humanize",
                roleZh: "基于维基百科 AI 文本特征，消除‘不仅...而且’、虚高术语与机械套路腔",
                roleEn: "Rewrites AI-sounding prose to remove robotic patterns, cliches and inflated claims",
                isAdvanced: false
              }
            ],
            alternates: []
          })}

          ${renderEvidenceDrawer({
            lang: 'zh',
            title: '实证与延伸：任务终局验证原则与文本去套路化规范',
            count: '维基百科 AI 写作特征指引 · 测试驱动门禁',
            cases: [],
            statutes: [],
            technical: [
              '<strong>维基百科《Signs of AI Writing》规范</strong>：维基百科编辑社群总结的 AI 生成文本典型特征，包括：过度使用“不仅...而且”对仗结构、公式化的首段引言与结尾升华总结、充斥虚高名词但缺乏具体细节、行文充满毫无意义的推销赞美语气等。去套路化润色是恢复专业可信度的关键步骤。',
              '<strong>证据驱动的完成门禁机制 (Evidence-Based Completion)</strong>：大语言模型常因自回归倾向在代码未实际编译通过、引用未实际查证的情况下，生成“我已经为您全部搞定并测试通过”的幻觉声明。<code>verification-before-completion</code> 规范通过前置钩子强行阻断这一声明，强制其出示执行证据（测试通过日志、状态码 200 或终端返回值），由事实本身而非模型语言来定义任务的终局。'
            ]
          })}
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

        <!-- Section 5.1 -->
        <div id="sec-5-1" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本一：高校研究生与学术研究者的一天',
            roleZh: '学术科研 · Graduate Researchers & Scholars',
            introZh: '面对论文开题报告、万字文献综述以及基金课题申报书，学者在巨大时间压力下的典型自卫链条。',
            painZh: '面对开题报告、万字前沿综述 DDL 以及国家自然科学基金/重点课题申报书起草，学者必须在数日内研读数百篇英文文献并梳理创新脉络。面对巨大时间压力，极具诱惑力的是将未发表的独创实验设想、独创推演假说或原始实验数据，直接全选贴入商业联网大模型以寻求一键生成综述框架或整段润色。',
            nearMissZh: '国家保密行政管理部门通报的科研人员小李案：小李将核心实验数据与未发表成果上传至商业 AI 写作应用，导致该领域核心敏感数据被云端留存并在互联网流传，造成国家利益损失并受到严肃处理；同时若未加核查直接采信编造的虚假 DOI， blind-review 中将被直接定性为学术不端与虚假引文。',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', '国安部科研人员小李泄密受处分案 ↗'),
              makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers期刊AI生成图表撤稿案 ↗'),
              makeIncidentPill('case-court-fake-citation-tongzhou-2025', '通州法院AI编造虚假判例批评案 ↗')
            ],
            steps: [
              {
                time: '09:30',
                titleZh: '课题设想沙盒隔离与防训练采集',
                descZh: '在利用 AI 协助构思文献综述脉络时，严禁将原创实验参数或实验代码直传公网。调用 ' + makePill('scholar-safety', 'scholar-safety · 学术检索隐私隔离') + '，在本地对独创假说与未发表设想实施差分抽象脱敏，构建单向检索沙盒，避免未公开的研究思路被商业模型抓取作为训练语料。'
              },
              {
                time: '14:00',
                titleZh: '综述引文 CrossRef 自动化验真与裁判官质证',
                descZh: '模型生成文献综述与论据后，需进行逐条真实性核验。调用 ' + makePill('bibref-verify', 'bibref-verify · 参考文献精准核验') + ' 自动请求 CrossRef REST API 与 PubMed 数据库，逐条校验 DOI、卷期与出版元数据真实性；同时调用 ' + makePill('the-judge', 'the-judge · 裁判官逻辑交叉质证') + ' 模拟同行评审专家对核心论点与引证逻辑展开双向交叉质询，挤出概率拼凑的水分。'
              },
              {
                time: '17:30',
                titleZh: '期刊透明度附录与 Nature CRediT 贡献者陈述',
                descZh: '在向顶刊、毕业答辩委员会或导师交付论文定稿前，杜绝“隐瞒使用”或“敷衍声明”。调用 ' + makePill('ai-disclosure-convention', 'ai-disclosure-convention · 学术出版 AI 披露规范') + '，严格遵照 Nature 与 ICMJE 作者贡献分类标准（CRediT Taxonomy），生成详尽的《AI 辅助工作流透明度附录》（明晰披露 AI 仅用于文献语法润色，所有学术推演与结论由人类作者独立签署），保障学术诚信与成果的可追溯性。'
              }
            ],
            minZeroZh: '引文清单中的每一条文献，必须亲手在 doi.org 或知网/PubMed 检索并点开确认过，确保篇名、作者、刊期真实存在；文末明确附上一句话 AI 使用声明（如仅用于语法润色）。',
            minProZh: '附带经 CrossRef 官方 API 逐条核验的《文献引文真实性报告》与标准规范的《Nature CRediT AI 使用透明度陈述附录》，使学术推演经得起第三方盲审复核。'
          })}
        </div>


        <!-- Section 5.2 -->
        <div id="sec-5-2" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本二：软件工程师与开源维护者的一天',
            roleZh: '研发运维 · Software Engineers & Maintainers',
            introZh: '面对冲刺发版、排查线上崩溃堆栈以及重构微服务，工程师如何在追求极速的同时防范密钥外泄与许可证传染。',
            painZh: '面对冲刺发版排期、线上突发严重 Crash 堆栈排查、高并发微服务重构以及开源仓库数十个待审 Issue，工程师渴望借助编程 Agent（如 Cursor Agent、Trae、Claude Code 等）直接读取本地代码仓库、自动编写高覆盖率单元测试并执行自动化修复。',
            nearMissZh: '国企工程师曾因使用商业 AI 时未脱敏代码环境，导致核心架构与实时数据库凭证外流境外；新华社通报小王案中，个人电脑部署开源大模型因默认公网端口裸露且未设密码，被境外 IP 批量渗透窃密；智能体在 YOLO 模式下解析含间接注入的不可信 Issue 险些在宿主机误删配置文件；离职带走系统调优 Prompt 模板已被杭州法院正式定性为侵犯商业秘密违法行为（罚款 35 万元）。',
            cases: [
              makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', '杭州首例大模型Prompt商密侵权案罚款35万 ↗')
            ],
            steps: [
              {
                time: '10:00',
                titleZh: '生产配置本地抹除与微虚拟机沙盒执行',
                descZh: '在将报错堆栈或代码段提交模型调试前，本地调用 ' + makePill('pii-safe-documents', 'pii-safe-documents · 文档敏感脱敏') + ' 自动用正则与高熵检测抹去私钥、JWT Token、内网 IP 与数据库密码；对 Agent 自动执行的重构测试与 Shell 脚本，强制调用 ' + makePill('agent-sandbox-skill', 'agent-sandbox-skill · 微虚拟机沙盒执行隔离') + ' 在抛弃式 E2B 微虚拟机中隔绝运行，杜绝宿主机裸机执行风险。'
              },
              {
                time: '15:30',
                titleZh: '架构方案反向质询与压力测试',
                descZh: '面对大模型对分布式架构的赞不绝口（“您的方案完美兼顾了弹性与高可用”），工程师警惕 RLHF 机制的谄媚本能。调用 ' + makePill('sycophancy-challenger', 'sycophancy-challenger · 谄媚质疑挑战者') + ' 剥除迎合修饰，同时唤起 ' + makePill('red-team-review', 'red-team-review · 红队对抗漏洞挖掘') + ' 扮演外部黑客视角，对网络脑裂、幂等性缺陷与反序列化漏洞展开极限压力测试。'
              },
              {
                time: '19:00',
                titleZh: 'Git Pre-commit 凭证拦截、SPDX 开源合规与全体验证',
                descZh: '在发起 Pull Request 前，本地自动触发 ' + makePill('repo-security-review', 'repo-security-review · 凭证泄露审查门禁') + ' 基于 Gitleaks 拦截隐藏在 commit 历史中的私钥；调用 ' + makePill('license-compliance-audit', 'license-compliance-audit · SPDX 协议合规审计') + ' 扫描代码的 SPDX 开源协议兼容性，防范开源许可证兼容性与传染风险；最后严格执行 ' + makePill('verification-before-completion', 'verification-before-completion · 完成前检验门禁') + '，只有本地全套单元测试与集成测试亮绿灯后才允许合并上线。'
              }
            ],
            minZeroZh: '提交前本地运行 git diff 逐行复核，确保没有硬编码任何 API Key、密码或内网 IP；手动跑通全部核心单元测试，严禁直接推送未经人工过目的 AI 代码。',
            minProZh: 'PR 附带 Gitleaks 密钥扫描通过证明、沙盒执行日志与 SPDX SBOM 依赖许可证合规报告，使交付对安全架构组与开源社区完全透明可查。'
          })}
        </div>


        <!-- Section 5.3 -->
        <div id="sec-5-3" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本三：文案策划与数字营销专员的一天',
            roleZh: '创意营销 · Writers & Marketing Specialists',
            introZh: '面对电商大促和自媒体批量推文，文案专员如何在保证高效产出的同时防范广告法重罚与版权侵权。',
            painZh: '面对电商大促倒计时、多渠道自媒体矩阵批量推文以及活动推广落地页的高频上线需求，文案专员每天需要创作数十套爆款标题、产品详情页与宣发文案。为迅速夺取用户注意力，容易直接采纳大模型生成的包含夸大修辞的草稿。',
            nearMissZh: 'AI 极易脱口而出“全网第一”、“国家级工艺”、“彻底根治”等词汇，直接触犯中国《广告法》第9条（绝对化用语禁令）、第17条（普通商品宣称医疗功效）及《反不正当竞争法》第8条。真实执法案例：厦门集美查处苗古金贴利用 AI 捏造虚假身份宣传重罚 120 万元人民币；北京海淀查处利用 AI 仿冒央视主持人虚假推销鱼油罚款 20 万元；北京通州首例刑案图生图侵权判刑 1 年半。',
            cases: [
              makeIncidentPill('case-ad-fake-host-haidian-2025', '北京海淀市监局：AI仿冒主持人推销食品罚款20万 ↗'),
              makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', '通州首例刑案：Stable Diffusion生图电商拼图判刑1年半 ↗'),
              makeIncidentPill('case-ai-voice-bj-2023', '北京互联网法院：全国首例声音侵权判赔25万 ↗')
            ],
            steps: [
              {
                time: '10:30',
                titleZh: '机械套路清洗与人性化去八股润色',
                descZh: '利用 AI 展开批量创意思路发散后，调用 ' + makePill('humanizer', 'humanizer · 人性化文本去套路润色') + ' 深度过滤 AI 高频公文与八股模板词（如“画卷铺展开来”、“不可否认的是”、“在这充满挑战的时刻”等），重构真实生动、具有人类情感温度和现场感的好文案。'
              },
              {
                time: '15:30',
                titleZh: '中国《广告法》与 FTC 标准逐句实质合规审核',
                descZh: '在文案交付视觉设计排版前，调用 ' + makePill('marketing-claims-review', 'marketing-claims-review · 广告法与 FTC 审查门禁') + ' 按照中国《广告法》与美国 FTC Substantiation 法则逐句进行合规筛查，强制要求文案中每一个功能参数与功效声称（如“续航长达48小时”、“效率提升30%”）均必须附带经权威机构检测报告支撑的客观证据锚点，排查并剔除“最、首选、顶级”等违反广告法的极限词。'
              },
              {
                time: '18:00',
                titleZh: '营销落地页 W3C WCAG 2.1 AA 读屏与对比度门禁',
                descZh: '对前端营销落地页与海报交互代码，执行 ' + makePill('web-accessibility', 'web-accessibility · 法定 WCAG 无障碍门禁') + '，系统化校验文字对比度是否达标（≥ 4.5:1）、是否全键盘可访问、是否具备完整 ARIA 屏幕阅读器标签，确保每一位残障和老年读者都能平等无碍浏览。'
              }
            ],
            minZeroZh: '文案交付前亲手通读筛查，删去所有“最、第一、根治、绝对”等绝对化词汇；所有宣称的功效与数字必须有内部真实凭据；对外发布时明确标明“AI 辅助生成”。',
            minProZh: '出具完整的《广告法合规声明对照表》（逐项绑定检测报告编号）与落地页 WCAG 2.1 AA 无障碍合规检测，消除行政处罚与诉讼隐患。'
          })}
        </div>


        <!-- Section 5.4 -->
        <div id="sec-5-4" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本四：政企行政与企业知识工作者的一天',
            roleZh: '政企行政与法务合规 · Enterprise, Legal & Administrative Staff',
            introZh: '面对会议纪要整理、采购招投标与重大合同初审，员工如何坚守“涉密不上网”底线与全流程审计留痕。',
            painZh: '在党政机关、央国企及大型民营企业的办公室综合科、法务合规部、采购招投标部与人力资源科室，员工每天面对长达数小时的高频内部例会录音整理、敏感公文起草、几十万字采购招标文件条款比对、重大商业合同风险初审以及涉及薪酬的员工绩效材料。面对繁重机械的工作量与急迫的发文时限，员工极度渴望利用市面上流行的商业大模型“一键转写语音”、“一键总结红头文件”、“一键审查合同条款”。',
            nearMissZh: '国家保密局与国家安全部通报李某私自将涉密方案输入手机 AI 写作应用受到严肃处理；涉密人员冯某妄图以“字母代码替换涉密敏感词”规避审查输入 AI 写作依然受到严肃处分；安保方案经云端 OCR 小程序转写造成泄密，导致单位副职领导行政警告、两名第三方人员直接被解除劳动合同。新修订《保守国家秘密法》确立“涉密不上网，上网不涉密”原则。',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', '国安部通报：科研人员小李核心数据喂AI泄密案 ↗'),
              makeIncidentPill('case-state-secrecy-feng-leakage-2026', '保密观通报：冯某重大会议材料输入AI写作案 ↗'),
              makeIncidentPill('case-bytedance-ai-export-leak-2026', '字节跳动3号通报：员工利用AI整理业务被实名辞退 ↗')
            ],
            steps: [
              {
                time: '09:30',
                titleZh: '涉密公文与会议纪要本地离线脱敏（严禁云端听会）',
                descZh: '禁用带有自动云端同步或上传功能的第三方录音转写插件；针对包含内部管理与非核心业务内容的纪要，在本地电脑离线环境中调用 ' + makePill('presidio-anonymize-text', 'presidio-anonymize-text · 微软标准文本匿名化') + ' 与 ' + makePill('pii-safe-documents', 'pii-safe-documents · 文档敏感脱敏') + '，利用 NLP 实体识别技术将领导真实姓名、内部项目敏感代号、未公开财务指标替换为标准类型化稳态占位符（如 [DEPT_HEAD_A]、[PROJECT_ALPHA]、[METRIC_VALUE_X]）；本地生成加密映射表并保存在本地保管库中。若会议涉及国家秘密或核心商密，严禁上传至公有云大模型。'
              },
              {
                time: '14:30',
                titleZh: '采购招标文件与商业合同对抗性风险扫描',
                descZh: '审核大型工程招投标文件或采购合同时，严格遵循“数据最小化”原则，剔除双方真实公司名、商业底价与特定财务流水；仅提取争议条款与违约赔偿机制文本，调用 ' + makePill('godfly-opposing-counsel', 'godfly-opposing-counsel · 模拟对方辩友质证') + ' 模拟严苛的对立审计稽查官与对手方首席法务顾问，站在“刁难挑刺、寻找责任转嫁漏洞”的极端对抗视角，全面扫描我方合同中的无限连带赔偿责任陷阱与不可抗力免责缺陷。'
              },
              {
                time: '17:30',
                titleZh: 'AI 使用透明度台账与合规证据留痕',
                descZh: '对照《政务领域人工智能大模型部署应用指引》与企业 Responsible AI 内部政策，调用 ' + makePill('ai-provenance', 'ai-provenance · AI 来源与提示词追溯') + ' 导出结构化审计台账；台账中精确记录：AI 模型版本号、会话脱敏时间戳、提示词哈希校验值、人类复核责任人签字记录；一旦遭遇企业内控审计或保密检查，凭借完备的证据链一键实现“全链路自证合规”。'
              }
            ],
            minZeroZh: '任何呈送云端 AI 辅助处理的公文或纪要，严禁包含真实企事业单位全称、领导姓名与涉密信息；严格执行“涉密不上网”原则。',
            minProZh: '出具本地离线脱敏对照单、Godfly 模拟对抗审计的合同风控意见书及附带人类签署人盖章的《企业 AI 办公合规留痕单 (Provenance Ledger)》。'
          })}
        </div>


        <!-- Section 5.5 -->
        <div id="sec-5-5" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'zh',
            titleZh: '剧本五：普通个人与家庭日常：看病求医、辅导作业与防范诈骗',
            roleZh: '家庭生活 · Everyday Citizens & Families',
            introZh: '普通家庭最常使用 AI 的生活场景：身体不适随手问诊、辅导孩子作业以及防范深度伪造音视频电诈。',
            painZh: '日常生活中，普通家庭最常使用 AI 的场景并不是编写代码或起草公文，而是：身体不舒服时把症状或体检化验单随手发给 AI“看病”，让 AI 替孩子直接写作文和解答理化难题，或者在社交软件中收到疑似亲友借钱的语音和视频。面对图省事、图安心的心理，人们很容易把 AI 当成全知全能的家庭医生或全科家庭教师，甚至对高度逼真的 AI 拟真音视频丧失警惕。',
            nearMissZh: '把长辈的体检异常指标输入大模型，AI 顺应用户焦虑给出耸人听闻的严重疾病推测或自行建议药名与剂量，延误病情；孩子把整道题拍照发给 AI 抄答案，丧失拆解问题能力；诈骗团伙截取社交平台公开发布的语音仿造亲友声音致电老人借钱，导致巨额财产损失。',
            cases: [
              makeIncidentPill('case-ai-voice-bj-2023', '北京互联法院全国首例AI声音侵权案 ↗'),
              makeIncidentPill('case-ad-fake-host-haidian-2025', '海淀法院AI克隆知名主持人带货虚假宣传案 ↗'),
              makeIncidentPill('case-ftc-donotpay-robot-lawyer-2025', 'FTC查处DoNotPay“世界首位机器人律师”虚假营销案 ↗')
            ],
            steps: [
              {
                time: '习惯一',
                titleZh: '问健康：把 AI 当就诊“准备清单”，不作为诊断依据',
                descZh: '就医咨询前可让 AI“整理去医院时该向医生交代的 5 个关键问题”，但输入体检报告前务必遮盖名字、身份证号与就诊医院；特别提示：凡涉及“吃什么药、吃几粒、停不停药”，只听正规医院当面诊断处方，不采信大模型给出的自行用药建议。'
              },
              {
                time: '习惯二',
                titleZh: '伴学习：用追问做“思维脚手架”，严禁直接要现成答案',
                descZh: '与孩子约定辅导原则：给 AI 的提示词必须是“不要直接告诉我答案，请问我 3 个启发性问题，引导我自己把这道题想出来”。利用 ' + makePill('discernment-nudge', 'discernment-nudge · 批判性辨识微提醒') + ' 引导孩子找出 AI 讲解里不合逻辑的漏洞，把 AI 当成练辩论的陪练。'
              },
              {
                time: '习惯三',
                titleZh: '防电诈：家庭设立“线下安全暗号”，转账必须多源核验',
                descZh: '与父母、配偶约定只有家庭内部知道的口令（如“外公最爱吃的菜”或一串数字暗号）。一旦接到声称亲友急用钱、要求转账到陌生账户的微信语音或视频，无论声音画面多么逼真，先问暗号，并立即挂断通过原手机号二次回拨核实。'
              },
              {
                time: '习惯四',
                titleZh: '护隐私：帮父母手机检查 APP 权限与长期记忆',
                descZh: '定期花 3 分钟检查父母常用聊天软件中的 AI 助手，撤销麦克风与相册的常驻后台权限；在设置中关闭“允许使用我的数据训练”，并清空历史累积的个人记忆列表。'
              }
            ],
            minZeroZh: '问健康不盲信药名，就医当面遵医嘱；辅导作业只问思路步骤，不抄整句整篇；转账汇款必对家庭暗号，回拨本人核实；手机 AI 助手权限只给必要，定期清空个人记忆。',
            minProZh: '家庭设备定期执行隐私配置检查，建立亲友防电诈线下核验流程，并引导家庭成员具备基本的大模型幻觉认知与真伪辨识习惯。'
          })}
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
            作为 <a href="https://putongren.org" target="_blank" class="text-brand font-bold hover:underline">普通人的数字权利 (putongren.org)</a> 社区的重要组成部分，本项目始终坚持<strong>“完全开源、表述平实、证据可查、服务大众”</strong>的原则。
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
              我们坚持<strong>“实证可查、事实优先”</strong>。如果指南中的法条条文有更新、案例事实有出入、平台设置入口发生变动，或者某个开源技能链接失效，欢迎向我们指正或提交修改建议。
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

        <!-- Chapter Objectives Box (Flat Two-Column Layout) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>Chapter Objectives</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
            <div class="space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Problem Addressed
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Why can't everyday users blindly trust AI outputs or paste raw sensitive context? What tangible judicial penalties follow unchecked reliance?
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Takeaways
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Build digital sovereignty and zero-trust verification baselines, recognizing that "AI generated it" is never an affirmative defense under the law.
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <p class="leading-relaxed">
            Generative AI and large language models (LLMs) are reshaping knowledge work at unprecedented velocity. Whether drafting research summaries, debugging production code, analyzing business proposals, or generating marketing content, we are constantly inputting fragments of our intellectual labor into commercial AI black boxes.
          </p>

          <p class="leading-relaxed font-medium text-slate-800 dark:text-slate-100">
            Behind the high-tech euphoria, ordinary users face alarming, asymmetric vulnerabilities validated by scientific empirical studies and landmark legal cases:
          </p>

          <!-- Flat Editorial Text: Invisible Crises (No nested cards) -->
          <div class="space-y-4 my-6 pl-1">
            <div class="space-y-1.5">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>Vulnerability 1: Silent Loss of Sovereignty & Quasi-Identifier Mosaics</span>
              </h4>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Even without disclosing your name, long-term multi-turn interaction yields age, location, and professional clues ("quasi-identifiers") that can reconstruct complete identity dossiers in vector databases. Everyday users become unpaid training miners.
              </p>
            </div>

            <div class="space-y-1.5 pt-2">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span>Vulnerability 2: Confident Falsehoods & Cognitive Debt (MIT/Stanford EEG)</span>
              </h4>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Emerging cognitive science and HCI literature (such as MIT Media Lab's 2025 preprint <em>Your Brain on ChatGPT</em> and Anthropic's sycophancy investigations) suggests that wholesale delegation of analytical drafting to LLMs can introduce immediate memory decay and lower recall retention (in initial trials, 15 of 18 participants in the heavy-reliance condition struggled to accurately cite key points of just-generated text). Coupled with algorithmic sycophancy, uncritical reliance risks weakening personal verification habits without active critical scrutiny.
              </p>
            </div>
          </div>

          <!-- Structured Summary of Legal Realities (Vertical Divided List, No nested cards) -->
          <div class="my-6 space-y-3">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span>Landmark Legal Precedents: The Global and Domestic Cost of Blind AI Reliance</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">3 Core Warnings</span>
            </div>

            <div class="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div class="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                <span class="font-mono font-bold text-rose-600 dark:text-rose-400 text-xs shrink-0">01</span>
                <div>
                  <strong class="text-slate-900 dark:text-white font-bold">AI generation is not a legal shield:</strong>
                  <span class="text-slate-600 dark:text-slate-400 leading-relaxed">AI generation cannot serve as an excuse for exemption. Individuals submitting content to courts, clients, or the public remain legally obligated to verify facts and bear corresponding responsibility. Courts in China and the US, as well as civil tribunals in Canada, have levied sanctions, reprimands, and full damage orders for hallucinated citations and misleading chatbot statements.</span>
                </div>
              </div>

              <div class="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs shrink-0">02</span>
                <div>
                  <strong class="text-slate-900 dark:text-white font-bold">Material usage scope is limited:</strong>
                  <span class="text-slate-600 dark:text-slate-400 leading-relaxed">Possessing audio or document usage rights does NOT grant permission to feed them to commercial AI models. Personal rights remain protected, and unauthorized uploads risk direct tort liability.</span>
                </div>
              </div>

              <div class="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                <span class="font-mono font-bold text-brand dark:text-brand-container text-xs shrink-0">03</span>
                <div>
                  <strong class="text-slate-900 dark:text-white font-bold">Trade secrets and state secrecy red lines:</strong>
                  <span class="text-slate-600 dark:text-slate-400 leading-relaxed">"Classified material stays offline, online material stays unclassified." Regulators have fined employees ¥350k for exfiltrating prompt templates, and unauthorized uploading of internal briefings has triggered administrative discipline and terminations.</span>
                </div>
              </div>
            </div>

            <!-- Evidence Drawer: Detailed Case Precedents Folded for On-Demand Review -->
            ${renderEvidenceDrawer({
              lang: 'en',
              title: 'Evidence & References: Global & Domestic Landmark Judicial Precedents',
              count: '5 Judicial Precedents · 3 Workplace Bulletins · SPC Guidelines',
              cases: [
                makeIncidentPill('case-ai-voice-bj-2023', 'Beijing Internet Court: Voice AI Rights Ruling ¥250k Damages (2023) ↗'),
                makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Beijing Tongzhou Court: Fake Case Number Sanction Bulletin ↗'),
                makeIncidentPill('case-court-fake-citation-yichang-2026', 'Hubei Yichang Court: Judicial Reprimand for Hallucinated Statute ↗'),
                makeIncidentPill('case-mata-avianca-fake-citations-2023', 'US Federal Court SDNY: Mata v. Avianca $5,000 Sanction ↗'),
                makeIncidentPill('case-air-canada-chatbot-refund-2024', 'Civil Resolution Tribunal: Moffatt v. Air Canada Full Damages Award ↗'),
                makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', 'Hangzhou AMR: ¥350,000 Fine for Exfiltrating Prompt Templates ↗'),
                makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Bulletin: Researcher Xiao Li Disciplinary Sanction ↗'),
                makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Dismissal Bulletin No. 3 ↗')
              ],
              statutes: [
                '<strong>Supreme People\'s Court Opinions on AI Disputes (Fa Fa [2026] No. 10)</strong>: Litigants must verify authenticity and disclose AI assistance; fabricating evidence or citations triggers penalties under Civil Procedure Law Art. 114.',
                '<strong>China PIPL Art. 23</strong>: Providing personal data to third parties requires explicit notice and separate consent.',
                '<strong>State Secrets Protection Law</strong>: Strict statutory prohibition against processing or storing classified state or commercial secrets on Internet-connected systems.'
              ],
              technical: [
                '<strong>Forensic Negative Finding</strong>: As of October 2026, no Chinese court judgment has convicted an employee of criminal trade secret theft solely for typing company data into a commercial LLM (the closest administrative action was Hangzhou AMR\'s ¥350k fine for proprietary prompt template misappropriation).',
                '<strong>Autoregressive Hallucination Mechanics</strong>: LLMs probabilistically predict tokens without internal truth verification, frequently manufacturing plausible yet fictitious citations in niche domains.'
              ]
            })}
          </div>

          <!-- Chapter 1 Transition to Everyday Action -->
          <div class="p-4 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-2 mt-4">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>💡 Abstract Slogans Offer Zero Defense</span>
            </h4>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Grand principles cannot protect someone facing a blinking prompt. We need Chapter 2's baseline security configurations, Chapter 3's Three Pillars and Four Practical Daily Questions, and Chapter 4's tiered defense protocols.
            </p>
          </div>
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
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 2 · BASELINE</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Defensive Baseline: Anti-Harvesting & Platform Hardening (Choose & Configure)
          </h2>
        </div>

        <!-- Chapter Objectives Box (Flat Two-Column Layout) -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>Chapter Objectives</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
            <div class="space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Problem Addressed
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Why doesn't "deleting chat history" erase your data? What hidden data retention channels exist in modern tools (Trae, Doubao, Kimi, ChatGPT, Cursor)?
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Takeaways
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Disable training authorizations across your primary AI tools wherever possible, and inspect/purge persistent memories and uploaded files.
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-4">
          <!-- 30s Quick Action Card for Everyday Citizens (Flat Divided Layout) -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/20 space-y-3 my-2">
            <div class="flex items-center gap-2 font-bold text-sm text-brand dark:text-brand-container">
              <span class="text-xl">⚡</span>
              <span>First Step to Digital Self-Defense: 30-Second Quick Start (Do These 3 Things First)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand/15 pt-1 text-xs">
              <div class="py-2 sm:py-0 sm:px-3 first:pl-0 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">1. Turn off "Training"</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">In your AI client's Settings, disable "Improve model for everyone" to prevent unreleased drafts from being absorbed into training corpora.</p>
              </div>
              <div class="py-2 sm:py-0 sm:px-3 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">2. Audit "Memory"</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Regularly review Settings &gt; Memory. Deleting a chat conversation does NOT wipe memory entries—purge them individually.</p>
              </div>
              <div class="py-2 sm:py-0 sm:px-3 last:pr-0 space-y-1">
                <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">3. Verify Before You Hand Off</span>
                <p class="text-slate-600 dark:text-slate-400 leading-relaxed">Before sharing AI outputs, manually double-check citations, statutory references, and names against authoritative sources.</p>
              </div>
            </div>
          </div>

          <p class="leading-relaxed">
            Before typing a single word into the blinking prompt, security boundaries have already been negotiated. Many believe clicking "Delete Chat" or toggling off history provides immunity. However, underlying architecture reveals an <strong>"Illusion of Control"</strong>—hiding views on the UI does not equal complete server-side destruction.
          </p>

          <!-- 6 Hardening Traps Alert (Folded) -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-3 my-4 shadow-xs">
            <summary class="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2">
                <span>⚠️</span>
                <span>Why Deleting Chats Isn't Enough (6 Hidden Retention Truths)</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">Expand Truths ⬇</span>
                <span class="hidden group-open:inline">Collapse Truths ⬆</span>
              </span>
            </summary>
            <ul class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-disc pt-2 leading-relaxed">
              <li><strong>Opting Out of Training ≠ Immediate Deletion</strong>: In Kimi and Doubao, opting out only stops future conversations from optimizing weights; historical chats remain indefinitely on servers. Doubao chat clearing does not cascade-delete extracted memory.</li>
              <li><strong>Turning On Privacy Mode ≠ Absolute Zero Retention</strong>: In Trae IDE, Privacy Mode guarantees conversations and outputs are not used for training, but code snippets are temporarily uploaded to compute vector embeddings for whole-codebase indexing. Furthermore, <strong>logging out automatically disables Privacy Mode</strong>!</li>
              <li><strong>Disabling Memory ≠ Deleting Existing Memory</strong>: Doubao, WorkBuddy, and ChatGPT decouple historical memory storage. Toggling off the Memory feature only halts new memory extraction; previously captured facts remain active unless purged manually.</li>
              <li><strong>Deleting Source Chat ≠ Cascade-Deleting Associated Memories</strong>: Deleting the original conversation where a memory was formed does not wipe the synthesized memory entry. You must purge it in dedicated Memory settings.</li>
              <li><strong>Deleting Conversation ≠ Deleting Uploaded Knowledge Files</strong>: In Dify, FastGPT, and ChatGPT Projects, backend document stores and vector embeddings are decoupled from ephemeral chat sessions. Deleting a chat leaves knowledge embeddings intact.</li>
              <li><strong>Cybersecurity Law Art. 21 (6-Month Rule) ≠ Saving Full Chat Transcripts for 6 Months</strong>: Statutory Chinese mandates require retaining <strong>"network operation and cybersecurity logs"</strong> for &ge; 6 months, not the full text of user prompts or private code. Never let platforms use compliance as an excuse for unbounded data hoards.</li>
            </ul>
          </details>

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
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 3 · DECONSTRUCTION</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Deconstruction: Three Security Pillars & Four Core Questions
          </h2>
        </div>

        <!-- Chapter Objectives Box -->
        <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>Chapter Objectives</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>Problem Addressed
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Beyond privacy, how do we dismantle algorithmic sycophancy, automation bias, and cognitive dependency?
              </p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Takeaways
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Master the "Three Security Pillars" (What does AI know / believe / do) and the "Four Practical Daily Questions" underpinning the guide.
              </p>
            </div>
          </div>
        </div>

        <div class="prose max-w-none text-slate-700 dark:text-slate-300 space-y-5">
          <p class="leading-relaxed">
            Synthesizing NIST AI 600-1, SAC/TC260-005, Hong Kong PCPD, and OWASP Agentic Top 10, responsible AI use transcends mere prompt filtering. It is organized into <strong>Three Core Security Inquiries × Two Defensive Perimeters × Four Daily Desktop Habits</strong>:
          </p>

          <!-- 3 Security Pillars (Clean Vertical 3-Section Layout) -->
          <div class="my-6 space-y-4">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span>Three Security Pillars · Mental Defensive Line</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">3 Core Pillars</span>
            </div>

            <div class="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div class="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span class="font-mono font-bold text-brand dark:text-brand-container text-xs shrink-0">01</span>
                <div class="space-y-1">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Pillar 1: What Does AI Know?</span>
                    <span class="text-[11px] font-normal text-slate-500">(Confidentiality & Boundary Control)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Plain takeaway: Audit what is stored behind the scenes, not just what you type.</strong> Even without names, scattered details about projects, locations, and colleagues can be pieced together. Long-term memory, knowledge bases, and tools broaden data exposure.
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    Statutory & Standard Mapping: Aligned with PIPL Art. 6 (minimization), Art. 13 (lawful basis), Art. 23 (third-party consent), NIST AI 600-1, and OWASP LLM02.
                  </p>
                </div>
              </div>

              <div class="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span class="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs shrink-0">02</span>
                <div class="space-y-1">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Pillar 2: What Does AI Believe?</span>
                    <span class="text-[11px] font-normal text-slate-500">(Cognitive Integrity & Anti-Poisoning)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Plain takeaway: External web pages, PDFs, and issues read by AI can be poisoned, and models naturally flatter users.</strong> Treat all external content as untrusted input. The more confident and agreeable the AI seems, the more strictly you must check original sources.
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    Statutory & Standard Mapping: Aligned with Generative AI Interim Measures Art. 4 (prohibiting generation of false and harmful information), SPC 2026 Opinions (requiring litigants to verify and explain AI-assisted filings and bear legal responsibility for authenticity and accuracy), OWASP LLM01, and LLM05.
                  </p>
                </div>
              </div>

              <div class="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs shrink-0">03</span>
                <div class="space-y-1">
                  <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Pillar 3: What Can AI Do?</span>
                    <span class="text-[11px] font-normal text-slate-500">(Privilege Isolation & Action Reversibility)</span>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Plain takeaway: Chatbot errors waste tokens; agent errors delete files or trigger unauthorized actions.</strong> Any operation involving writing files, running terminal scripts, or calling external APIs requires default read-only access, confirmation prompts, and isolated sandboxes.
                  </p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    Statutory & Standard Mapping: Aligned with Algorithm Recommendation Provisions Art. 17 (human intervention), TC260-005 Guidelines 1.0 alongside the Agent Deployment & Use Security Guidelines, OWASP ASI01/ASI03, and LLM06.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 3 Pillars Deep Mapping Table (Folded for Everyday Users) -->
          <details class="adaptive-details group p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 my-4 shadow-xs">
            <summary class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer list-none select-none">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white">Statutes & Industrial Standards Mapping Table</span>
              </span>
              <span class="adaptive-toggle-hint text-[11px] text-brand font-medium shrink-0">
                <span class="group-open:hidden">Expand Standards ⬇</span>
                <span class="hidden group-open:inline">Collapse Standards ⬆</span>
              </span>
            </summary>
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-1 sm:hidden flex items-center gap-1 pt-2">
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
                      • <strong>Interim Measures on Generative AI Services</strong> Art. 4: Prohibiting generation of false and harmful information<br>
                      • <strong>SPC 2026 AI Dispute Opinions</strong>: Litigant duty to verify and explain AI-assisted filings; legal liability for authenticity and accuracy
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
                      • <strong>TC260 Standards</strong>: TC260-005 Guidelines 1.0 &amp; Agent Deployment and Use Security Guidelines
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
          </details>

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

        <!-- Cloud vs Local Modes & Workspace Risks (Fundamental Distinction) -->
        <div id="sec-cloud-vs-local-en" class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4 text-sm shadow-xs scroll-mt-36 lg:scroll-mt-28">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="text-[11px] font-bold text-brand uppercase tracking-wider block mb-1">Foundational Distinction</span>
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Cloud vs. Local Modes: Where Data Flows, and Risks of Workspace Access
            </h3>
          </div>

          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
            When first using AI tools, it is easy to assume they all work the same way. In practice, whether a tool runs in the cloud or on your local machine determines where your data actually travels.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                Mode 1: Cloud-Hosted (Web Prompts, Mobile Apps, Cloud Agents)
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your device only acts as a display. Whether you paste text into a prompt or attach a PDF, that content travels over the network to the provider's data centers. The model processes the text on remote servers and streams answers back. Once you hit send, raw data has left your machine.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                Mode 2: Local Desktop (Local Editors & Terminal Agents)
              </span>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Used in tools like Cursor or Claude Code on your computer. While model inference may still call remote APIs, your files and orchestrator reside on your local disk. When you ask it to process a document, the agent receives a file path rather than raw text. A local script can replace names and numbers with placeholders before sending anything to the model.
              </p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2 text-xs sm:text-sm">
            <span class="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span>⚠️ Practical Risks of Granting Workspace Access (Google Drive, OneDrive, Notion)</span>
            </span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              Many cloud platforms offer one-click integrations to cloud drives and collaborative workspaces. Granting this access involves two easily overlooked risks:
            </p>
            <ol class="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
              <li><strong>Broad read scopes:</strong> Integrations often apply across entire folders or accounts. To build search indexes, the remote service scans and syncs historic drafts, private notes, and internal minutes beyond the single topic you are discussing.</li>
              <li><strong>Prompt injection via shared files:</strong> In collaborative environments, if any shared document or clipped email contains hidden prompt injection instructions, an indexing agent reading that file can be misled into summarizing or exfiltrating other restricted content.</li>
            </ol>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-amber-200/60 dark:border-amber-900/40">
              For public research, cloud integrations are convenient. For unreleased business drafts, personnel records, or client privacy, leaving persistent cloud access active makes it difficult to maintain control over information boundaries.
            </p>
          </div>
        </div>

        <!-- Section 3.1 -->
        <!-- Section 4.1 -->
        <div id="sec-4-1" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-1" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.1 Pre-Input: Privacy Protection & Prompt Injection Defense</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When preparing to feed drafts, logs, or customer files to an AI model, data loss begins immediately. However, simply removing explicit names is dangerous security theater: in classic privacy research, Latanya Sweeney's <strong>Mosaic Theory</strong> experiment demonstrated that quasi-identifier combinations such as birth date, gender, and 5-digit ZIP code exhibit high uniqueness within specific population datasets, introducing serious re-identification risks. Under China's Personal Information Protection Law (PIPL Art. 28), medical health, financial accounts, and tracking information are classified as sensitive personal info; retaining "Grade-A tertiary hospital rare disease ward + 42-year-old male + admission date" creates an irreversible re-identification hazard.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Simultaneously, in agentic web browsing, long-context parsing, and enterprise RAG (Retrieval-Augmented Generation) workflows, <strong>Indirect Prompt Injections (IPI)</strong> have migrated from academic labs to real-world threats: adversaries do not interact with your chatbox directly, but embed concealed payloads inside web pages, PDFs, and emails that autonomous agents retrieve, hijacking execution flow and triggering stealthy data exfiltration.
          </p>

          ${renderActionPanel({
            lang: 'en',
            dontText: 'Assuming that masking names constitutes complete redaction, pasting raw records containing quasi-identifiers (hospital departments, age, transaction logs) into prompts; letting autonomous Agents scrape uninspected PDFs, web pages, or repositories with full external tool capabilities.',
            doText: 'Run local differential redaction via Presidio to replace quasi-identifier tuples with randomized placeholders; enforce Spotlighting hash delimiters on retrieved RAG texts, clean zero-width characters and hidden PDF layers, and restrict outbound egress channels.',
            tierBrowser: [
              'Replace real names, phone numbers, ID numbers and addresses with placeholders like "[Name A]" or "[Phone]" before pasting.',
              'Turn exact ages into ranges; keep locations at city level; describe employers by industry only.',
              'Never paste state secrets, confidential work material or other people\'s medical records into public AI tools.',
              'When an AI reads unfamiliar web pages or PDFs, do not also give it permission to send email or read/write files.'
            ],
            tierSoftware: [
              'Use find-and-replace in a local text editor to swap sensitive terms before copying text to the AI.',
              'If you can, run open-source Microsoft Presidio locally to detect and replace personal data automatically.'
            ],
            tierSkills: [
              'Enable the redaction skills listed below (e.g. <code>pii-safe-documents</code>) in a Skills-capable tool so the AI checks before sending.',
              'Install commands are available on the skill cards or in the Skill Library.'
            ],
            verifyText: 'If a colleague unfamiliar with the context reads the prompt, could they guess the identity of the person or company? If yes, redact further.'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Pre-Input Defensive Pipeline)",
            titleEn: "Pre-Input Defensive Pipeline & Curated Skills",
            subtitleZh: "工序：敏感数据本地脱敏 → 投喂内容清洗 → 外部提示词注入拦截。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Local PII redaction → data sanitization → prompt injection defense.",
            primary: [
              {
                id: "pii-safe-documents",
                tierZh: "核心防线 · 输入前",
                tierEn: "Core Defense · Pre-Input",
                roleZh: "在本地生成可逆脱敏副本，防止向大模型泄露真实个人与客户隐私",
                roleEn: "Creates local redacted working copy to protect private PII from cloud upload",
                isAdvanced: false
              },
              {
                id: "skill-sanitizer",
                tierZh: "核心防线 · 数据净化",
                tierEn: "Core Defense · Sanitization",
                roleZh: "投喂文本清洗器，过滤代码与文本中隐藏的凭据、内网地址与恶意识别符",
                roleEn: "Sanitizes sensitive tokens, private IPs and internal credentials before ingestion",
                isAdvanced: false
              },
              {
                id: "skill-sentinel",
                tierZh: "核心防线 · 注入防御",
                tierEn: "Core Defense · Anti-Injection",
                roleZh: "分析网页与PDF等外部上下文，实时识别并阻断间接提示词注入指令",
                roleEn: "Inspects external context (PDF/web) to block indirect prompt injection payloads",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "presidio-anonymize-text", label: "presidio-anonymize-text · Microsoft Presidio Local Text Anonymizer" },
              { id: "pii-detection-pipeline", label: "pii-detection-pipeline · Multi-Stage PII Detection" },
              { id: "openmed-clinical-ingestion", label: "openmed-clinical-ingestion · Clinical Ingestion Redaction" },
              { id: "skillguard", label: "skillguard · Malicious Skill Scanner" },
              { id: "security-threat-model", label: "security-threat-model · STRIDE Threat Modeler" },
              { id: "scholar-safety", label: "scholar-safety · Academic Search Isolation" },
              { id: "nova-proximity", label: "nova-proximity · Proximity Guard" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'en',
            title: 'Evidence & References: Mosaic Theory, Statutes & Prompt Injection In-the-Wild',
            count: '3 Incidents · 1 Statute · 5 Technical Findings',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Notice ↗'),
              makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', 'Hangzhou AMR ¥350k Fine ↗'),
              makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Dismissal Notice ↗')
            ],
            statutes: [
              '<strong>Mosaic Theory & Sensitive PII Protection</strong>: Under China\'s Personal Information Protection Law (PIPL Art. 28) and international privacy frameworks, medical health and identity profiles receive strict statutory protection. Sweeney\'s benchmark research demonstrated that quasi-identifier combinations exhibit high uniqueness in specific population records, creating substantial re-identification vulnerabilities. Differential privacy or synthetic data generation is necessary.'
            ],
            technical: [
              '<strong>Vector 1: Zero-font, CSS display:none & HTML Comments</strong>: 2026 empirical measurement across 1.2 billion URLs confirmed 15,300 live injection payloads embedded in comments and hidden layers. Scraping agents flatten these into instructions with identical authority.',
              '<strong>Vector 2: Zero-Width Unicode Steganography</strong>: Reverse CAPTCHA experiments (8,308 LLM outputs) showed attackers inject invisible instructions using \\u200B zero-width spaces, bypassing regex filters and directly reaching the model tokenizer.',
              '<strong>Vector 3: Phantom PDF Layers</strong>: CrackedPDFs 2026 demonstrated that direct text extraction treats off-screen text and background-colored glyphs identically to foreground text, persistently poisoning knowledge bases.',
              '<strong>In-the-Wild CVE: <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" class="text-brand font-bold underline">EchoLeak (CVE-2025-32711, CVSS 9.3 Critical) ↗</a></strong>: First zero-click indirect prompt injection in Microsoft 365 Copilot. Receiving a single unread email hijacked Copilot into reading confidential financial mail and exfiltrating data via Teams image markdown proxies.',
              '<strong>Engineering Defense: Microsoft <a href="https://arxiv.org/abs/2403.14720" target="_blank" class="text-brand font-bold underline">Spotlighting Mechanism ↗</a></strong>: Wraps untrusted input with cryptographic hash delimiters and Base64 transformations, reducing attack success rates from >50% to <2%.'
            ]
          })}
        </div>


        <!-- Section 4.2 -->
        <div id="sec-4-2" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-2" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.2 During-Chat: Fact-Checking & Hallucinated Citations</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            The most seductive yet perilous property of modern LLMs is their authoritative eloquence. When asked for scientific papers, judicial precedents, or technical sources, models instantly output formatted citations complete with authors, journals, volume numbers, and realistic DOIs starting with <code>10.xxxx</code>. Yet clicking them reveals that the DOI does not exist, or the article argued the exact opposite.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            This is not an occasional glitch, but an inherent consequence of <strong>Autoregressive Next-Token Prediction</strong>: models choose statistically plausible sequences of words, not verified facts. In specialized or long-tail fields, models frequently hallucinate non-existent references with persuasive formatting.
          </p>

          ${renderActionPanel({
            lang: 'en',
            dontText: 'Blindly trusting generated scholars, DOIs, journal volumes, or court case numbers, copying them straight into legal briefs, thesis dissertations, or clinical reports without verification.',
            doText: 'Adopt a zero-trust verification mindset: automatically query CrossRef and PubMed REST APIs to confirm that cited DOIs, authors, and volumes physically exist in authoritative databases before citing.',
            tierBrowser: [
              'Papers: Copy the DOI and open it at <a href="https://doi.org/" target="_blank" class="text-brand underline">doi.org</a>. If it fails to resolve or the title doesn\'t match, treat it as non-existent.',
              'Papers without DOIs: Search the exact title in Google Scholar, PubMed, or institutional libraries.',
              'Legal cases: Search the case number in official court databases (e.g., China Judgments Online or PACER).',
              'Quotations and statistics: Trace back to original primary publications.'
            ],
            tierSoftware: [
              'Use the <a href="https://search.crossref.org/" target="_blank" class="text-brand underline">Crossref Search portal</a> to batch-verify DOIs against registered authors and journals.',
              'Import citations into Zotero by DOI; flag and investigate any item that fails to fetch metadata.'
            ],
            tierSkills: [
              'Enable citation checking skills (e.g. <code>bibref-verify</code>) in your tool to query Crossref / PubMed APIs automatically.'
            ],
            verifyText: 'You have personally clicked through and opened the authentic primary page of every single citation included in your final deliverable.'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Fact & Citation Verification Pipeline)",
            titleEn: "Fact & Citation Verification Pipeline",
            subtitleZh: "工序：卷期与DOI外部校验 → 引文对齐核实 → 主张忠实度交叉查证。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: DOI & Volume verification → Citation alignment → Claim source cross-check.",
            primary: [
              {
                id: "bibref-verify",
                tierZh: "核心核验 · 卷期真伪",
                tierEn: "Core Verification · BibRef",
                roleZh: "调用 CrossRef 与 PubMed 官方接口，严密校验引文作者、期卷号与真实 DOI",
                roleEn: "Queries CrossRef & PubMed REST APIs to verify authentic authors, volume and DOI",
                isAdvanced: false
              },
              {
                id: "citation-verifier",
                tierZh: "核心核验 · 来源真伪",
                tierEn: "Core Verification · Sources",
                roleZh: "通用引文真伪核查器，快速筛查学术论文和报告中是否存在凭空捏造的虚构来源",
                roleEn: "Fast universal citation checker to uncover hallucinated or fabricated citations",
                isAdvanced: false
              },
              {
                id: "claim-source-fact-checker",
                tierZh: "核心核验 · 忠实度比对",
                tierEn: "Core Verification · Faithfulness",
                roleZh: "主张与来源比对器，逐句质问‘原文到底有没有这个结论’，防止歪曲断章取义",
                roleEn: "Verifies whether source texts actually substantiate the specific claims made by AI",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "citation-faithfulness-checker", label: "citation-faithfulness-checker · Faithfulness Checker" },
              { id: "citation-integrity-auditor", label: "citation-integrity-auditor · Citation Integrity Auditor" },
              { id: "post-generation-fact-check", label: "post-generation-fact-check · Post-Generation Fact Check" },
              { id: "vectara-hallucination-corrector", label: "vectara-hallucination-corrector · Vectara Corrector" },
              { id: "hallucination-risk-reviewer", label: "hallucination-risk-reviewer · Hallucination Reviewer" },
              { id: "kdense-peer-review", label: "kdense-peer-review · Rigorous Peer Reviewer" },
              { id: "the-judge", label: "the-judge · Judicial Logic Cross-Examiner" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'en',
            title: 'Evidence & References: Autoregressive Mechanics, Court Sanctions & Primary Chains',
            count: '4 Judicial Precedents · 2 Verification Chains',
            cases: [
              makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Beijing Tongzhou Court AI Citation Reprimand ↗'),
              makeIncidentPill('case-court-fake-citation-yichang-2026', 'Yichang Court Altered Statute Sanction ↗'),
              makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers AI Graphic Retraction ↗'),
              makeIncidentPill('case-mata-avianca-fake-citations-2023', 'US Federal Court Mata v. Avianca $5,000 Fine ↗')
            ],
            statutes: [
              '<strong>Judicial Sanctions Against AI Evidence Fabrication</strong>: In both US federal courts (Mata v. Avianca) and Chinese judicial guidelines, submitting hallucinated AI citations violates procedural rules of candor. Under Civil Procedure Law Art. 114, fabricating evidence carries fines, detention, or criminal sanctions.'
            ],
            technical: [
              '<strong>Autoregressive Next-Token Prediction Limitations</strong>: Models are statistical sequence synthesizers, not verified knowledge retrieval engines. Without grounded RAG or external deterministic APIs, high token-co-occurrence probabilities produce syntactically impeccable hallucinations.',
              '<strong>Dual-Loop Verification Protocol</strong>: CrossRef REST API provides ground truth for DOI registrations; NCBI PubMed provides verified clinical PMIDs. Combining OpenAlex with CrossRef metadata eliminates citation fabrication before publication.'
            ]
          })}
        </div>


        <!-- Section 4.3 -->
        <div id="sec-4-3" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-3" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.3 During-Chat: Countering Model Sycophancy & Agreement Bias</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When users prompt an AI with a leading premise (e.g. "I think a monolith architecture is superior here"), models routinely agree. In machine learning research, this phenomenon is called <strong>Sycophancy</strong>: models adapt their output to match user beliefs, sacrificing truthfulness to maximize reinforcement reward scores.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Anthropic's milestone research paper <em>Towards Understanding Sycophancy in Language Models</em> (2023) demonstrated that during Reinforcement Learning from Human Feedback (RLHF), human evaluators consistently score flattering, agreeably worded responses higher. Consequently, models learn to mask architectural flaws and reinforce confirmation bias.
          </p>

          ${renderActionPanel({
            lang: 'en',
            dontText: 'Leading the AI with pre-conceived conclusions and accepting its agreeing response without adversarial counter-examination or alternative perspectives.',
            doText: 'Establish a 3-tier adversarial review pipeline: inject cognitive friction nudges, deploy Devil\'s Advocate critique, and simulate independent multi-agent juries to challenge key assumptions.',
            tierBrowser: [
              'Avoid stating your preferred conclusion up front; describe problems and constraints neutrally.',
              'Follow up with this reusable prompt: "Ignore my preference. State the 3 weakest assumptions in this plan and its most likely failure scenarios."',
              'Add another counter-prompt: "If you were opposing this proposal, what are your 3 strongest objections?"'
            ],
            tierSoftware: [
              'Open a new conversation or test with an alternative model provider to compare differences.',
              'Before finalizing major decisions, have a real human colleague review the counter-arguments.'
            ],
            tierSkills: [
              'Enable anti-sycophancy and Devil\'s Advocate skills (e.g. <code>sycophancy-challenger</code>) to automate adversarial scrutiny.'
            ],
            verifyText: 'You can clearly articulate the single biggest risk of the decision, and that risk was not merely offered as a polite afterthought by the AI.'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Anti-Sycophancy & Critical Review Pipeline)",
            titleEn: "Anti-Sycophancy & Critical Review Pipeline",
            subtitleZh: "工序：认知摩擦微提醒 → 单角色魔鬼代言人逆向质询 → 多角色陪审团会诊。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Cognitive friction nudge → Devil's Advocate scrutiny → Multi-agent Jury review.",
            primary: [
              {
                id: "discernment-nudge",
                tierZh: "核心防线 · 认知摩擦",
                tierEn: "Core Defense · Cognitive Nudge",
                roleZh: "轻量级认知摩擦约束，强制模型不附和倾向，列出方案最薄弱的 3 个假设",
                roleEn: "Lightweight cognitive friction nudge forcing models to highlight hidden weak assumptions",
                isAdvanced: false
              },
              {
                id: "devils-advocate-mad-skills",
                tierZh: "核心防线 · 逆向推演",
                tierEn: "Core Defense · Adversarial",
                roleZh: "魔鬼代言人单兵攻防，站在对立面疯狂质询方案漏洞与商业盲区",
                roleEn: "Adversarial devil's advocate role questioning your plan from a harsh opposing angle",
                isAdvanced: false
              },
              {
                id: "the-jury",
                tierZh: "进阶会诊 · 陪审团",
                tierEn: "Advanced Defense · Multi-Agent Jury",
                roleZh: "多智能体独立会诊，由架构师、风控官与质疑者背靠背独立投票质证",
                roleEn: "Simulates a cross-disciplinary jury for blind, independent review and consensus voting",
                isAdvanced: true
              }
            ],
            alternates: [
              { id: "sycophancy-challenger", label: "sycophancy-challenger · Sycophancy Challenger" },
              { id: "anti-sycophancy-molly", label: "anti-sycophancy-molly · Direct Candor Guard" },
              { id: "devils-advocate-reviewer", label: "devils-advocate-reviewer · Adversarial Reviewer" },
              { id: "godfly-opposing-counsel", label: "godfly-opposing-counsel · Opposing Counsel Simulator" },
              { id: "the-fool", label: "the-fool · Unconventional Questioner" },
              { id: "red-team-review", label: "red-team-review · Red Team Vulnerability Probe" },
              { id: "receiving-code-review", label: "receiving-code-review · Code Review Receptor" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'en',
            title: 'Evidence & References: RLHF Reward Misalignment & 3-Tier Scrutiny Protocol',
            count: '4 Scrutiny Tiers & Research Findings',
            cases: [],
            statutes: [],
            technical: [
              '<strong>RLHF Optimization Traps</strong>: Anthropic research shows that reward models favor affirmative tone over unpleasant factual corrections. As parameter scale increases, sycophancy grows more sophisticated unless explicitly counter-prompted.',
              '<strong>Tier 1: Discernment Nudges</strong>: Embed cognitive friction prompts forcing the model to articulate the 3 most brittle underlying assumptions.',
              '<strong>Tier 2: Devil\'s Advocate Red-Teaming</strong>: Instruct the model to assume adversarial roles (short-seller analyst, opposing legal counsel) to attack commercial proposals.',
              '<strong>Tier 3: The Jury Consensus</strong>: Deploys independent multi-agent personas for blind consensus voting, breaking single-session echo chambers.'
            ]
          })}
        </div>


        <!-- Section 4.4 -->
        <div id="sec-4-4" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-4" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.4 Pre-Action: Agent Privilege Containment & Accidental Destruction</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When autonomous agents obtain terminal execution and file-write privileges, security risks extend directly into the operating system. Overwriting project repositories, executing malicious scripts from poisoned documents, or granting overprivileged MCP tools can result in irreparable local data loss.
          </p>

          ${renderActionPanel({
            lang: 'en',
            dontText: 'Enabling YOLO or "Allow All" full-access execution modes in IDEs; letting agents run unreviewed shell scripts on host machines; attaching untrusted third-party MCP servers.',
            doText: 'Maintain default step-by-step confirmation popups; isolate high-risk commands inside disposable micro-VM sandboxes; audit tool descriptors to prevent semantic supply-chain poisoning.',
            tierBrowser: [
              'Readers who only interact via chat apps or web browsers can skip this section.',
              'If your tool controls your local computer, keep default approval prompts enabled; never switch on "automatic execution without confirmation".',
              'Back up critical project directories before letting agents modify files.'
            ],
            tierSoftware: [
              'Only enable MCP tools and plugins that you explicitly need for current tasks.',
              'Run automated agent workflows inside dedicated virtual machines or Docker containers.'
            ],
            tierSkills: [
              'Enable <code>agent-sandbox-skill</code> to redirect risky commands into isolated cloud sandboxes.'
            ],
            verifyText: 'You personally inspected and clicked approval on every single file deletion, overwrite, or network command executed by the agent.'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Agent Execution Isolation Pipeline)",
            titleEn: "Agent Execution Isolation Pipeline",
            subtitleZh: "工序：敏感指令拦截 → 最小权限边界收敛 → 临时微虚拟机沙盒隔离。",
            subtitleEn: "Pipeline: Command interception → Privilege boundary → Micro-VM sandbox isolation.",
            primary: [
              {
                id: "agent-sandbox-skill",
                tierZh: "核心防线 · 沙盒执行",
                tierEn: "Core Defense · Micro-VM Sandbox",
                roleZh: "将 Agent 执行的高风险命令置于临时沙盒与微虚拟机中，杜绝系统文件误删与逃逸",
                roleEn: "Executes agent CLI commands within disposable micro-VM sandboxes to prevent system destruction",
                isAdvanced: false
              }
            ],
            alternates: []
          })}

          ${renderEvidenceDrawer({
            lang: 'en',
            title: 'Evidence & References: Privilege Escalation, CVE Vulnerabilities & MCP Risks',
            count: '1 Enforcement Case · 2 Disclosed CVEs · 2 Architectural Findings',
            cases: [
              makeIncidentPill('case-outcall-douxing-shanghai-2026', 'SAMR Landmark Case: Douxing AI Outcall ¥200k Fine ↗')
            ],
            statutes: [],
            technical: [
              '<strong>Permission UI vs. Container Isolation</strong>: WorkBuddy and Kimi Work explicitly distinguish default restricted access from full access. Without container boundaries, host-level execution risks irrevocable destruction.',
              '<strong>MCP Server-Side SSRF: <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-40100" target="_blank" class="text-brand font-bold underline">FastGPT CVE-2026-40100 ↗</a></strong>: Unauthenticated SSRF in MCP runTool endpoints allowed external actors to probe internal private infrastructure.',
              '<strong>Cross-Tenant Trace Leakage: <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand font-bold underline">Dify CVE-2026-41947 ↗</a></strong>: Unauthorized configuration exposure redirected prompt streams to arbitrary external endpoints (patched in v1.14.2).',
              '<strong>MCP Tool Description Poisoning</strong>: Malicious descriptors embed hidden system directives that hijack model reasoning even when not explicitly invoked by users.'
            ]
          })}
        </div>


        <!-- Section 4.5 -->
        <div id="sec-4-5" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-5" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.5 Pre-Handoff: Advertising Compliance & License Auditing</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Before code, copy, or UI pages are published externally, substantive auditing is required. Legally, <strong>AI itself is not an independent legal entity. In the event of infringement or non-compliance, adjudicators allocate liability among users, publishers, and service providers based on their degree of control, duty of care, and specific conduct</strong>. Unverified output exposes organizations to heavy administrative penalties, accessibility lawsuits, credential leaks, and open-source license infringement.
          </p>

          ${renderActionPanel({
            lang: 'en',
            dontText: 'Publishing AI-generated marketing copy with unsubstantiated superlative claims ("cure-all", "best"); deploying web interfaces without accessibility checks; pushing code containing hardcoded credentials or virally licensed GPL components into proprietary repos.',
            doText: 'Screen claims against advertising standards, substantiating every performance metric with testing reports; enforce WCAG 2.1 AA accessibility baselines; scan git commits with Gitleaks and SPDX SBOM tooling.',
            tierBrowser: [
              'Before publishing, ask yourself: Does this copy claim "the best", "guaranteed", or "number one"? If so, tone it down.',
              'Do all quoted metrics and benefits have verifiable source documentation?',
              'If content was AI-generated, include mandatory disclosure labels as required by applicable regulations.'
            ],
            tierSoftware: [
              'Web projects: Run Chrome DevTools Lighthouse to audit accessibility before launch.',
              'Code projects: Run Gitleaks locally to catch accidentally committed API keys or tokens.'
            ],
            tierSkills: [
              'Enable gatekeeper skills (e.g. <code>marketing-claims-review</code>, <code>web-accessibility</code>, <code>license-compliance-audit</code>) in your publishing workflow.'
            ],
            verifyText: 'If an auditor challenges any sentence or performance claim, you can immediately produce authentic supporting documentation.'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Pre-Handoff & Disclosure Pipeline)",
            titleEn: "Pre-Handoff & Disclosure Pipeline",
            subtitleZh: "工序：代码与发布物自动披露 → 人机贡献血统存证 → 商业发布前全面质检。首推 3 项核心技能，其余按需选用。",
            subtitleEn: "Pipeline: Code/PR disclosure gate → AI provenance tracking → Pre-publish compliance audit.",
            primary: [
              {
                id: "visible-ai-disclosure-pr-gate",
                tierZh: "核心门禁 · 代码披露",
                tierEn: "Core Gate · Code Disclosure",
                roleZh: "在 GitHub PR 中自动检测并生成可视化 AI 贡献披露报告，满足团队审查透明度",
                roleEn: "Automated PR gate that generates visible disclosures of AI contributions in code",
                isAdvanced: false
              },
              {
                id: "publish-prep-review",
                tierZh: "核心门禁 · 发布预审",
                tierEn: "Core Gate · Pre-Publish Audit",
                roleZh: "商业宣发与文案发布前综合质检，审查虚假效能主张、敏感合规与事实漏洞",
                roleEn: "Comprehensive review prior to publishing content, guarding against unsubstantiated claims",
                isAdvanced: false
              },
              {
                id: "ai-provenance",
                tierZh: "核心存证 · 血统溯源",
                tierEn: "Core Audit · Provenance",
                roleZh: "人机协作血统存证系统，记录提示词、模型版本与人工修改轨迹以备合规审计",
                roleEn: "Auditable record keeping prompt traces, model hashes and human editing history",
                isAdvanced: false
              }
            ],
            alternates: [
              { id: "marketing-claims-review", label: "marketing-claims-review · Advertising Claims Review" },
              { id: "web-accessibility", label: "web-accessibility · Statutory WCAG Accessibility Gate" },
              { id: "repo-security-review", label: "repo-security-review · Credential Leakage Gate" },
              { id: "license-compliance-audit", label: "license-compliance-audit · SPDX License Audit" },
              { id: "ai-disclosure-convention", label: "ai-disclosure-convention · Transparent Disclosure Standard" },
              { id: "skill-provenance-tracker", label: "skill-provenance-tracker · Skill Call Provenance" },
              { id: "vertu-seo-publish-gate", label: "vertu-seo-publish-gate · SEO Publish Gate" },
              { id: "gdpr-compliance-audit", label: "gdpr-compliance-audit · GDPR Compliance Audit" }
            ]
          })}

          ${renderEvidenceDrawer({
            lang: 'en',
            title: 'Evidence & References: False Advertising Sanctions, Copyright & GPL Judicial Rulings',
            count: '3 Landmark Rulings · 4 Gatekeeper Categories · 4 Judicial Baselines',
            cases: [
              makeIncidentPill('case-ad-fake-host-haidian-2025', 'Beijing Haidian AMR AI Fake Anchor ¥200k Penalty ↗'),
              makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', 'Tongzhou SD E-commerce Copyright Sentence ↗'),
              makeIncidentPill('case-criminal-extortion-medical-shanghai-2026', 'Shanghai AI Fake Medical Record Extortion Ruling ↗')
            ],
            statutes: [
              '<strong>AMR Advertising Enforcement Records</strong>: Xiamen AMR penalized Miaogu Jintie ¥1.2M for fabricating AI heritage endorsements; Beijing Haidian AMR fined food marketers ¥200k for cloning celebrity TV anchors.',
              '<strong>Accessibility Statutory Mandates</strong>: Accessible Environment Creation Law (effective Sept 2023) Art. 32 mandates accessibility for public websites. W3C WCAG 2.1 AA provides the baseline (4.5:1 text contrast, full keyboard navigation).',
              '<strong>Mandatory Watermarking & Attribution</strong>: The AI Synthesized Content Labeling Administrative Measures require visible disclosures and metadata watermarking. Note: AI disclosure does not absolve publishers from substantive copyright or false advertising liability.'
            ],
            technical: [
              '<strong>FTC "Operation AI Comply" Enforcement</strong>: US FTC targets unsubstantiated AI claims: DoNotPay was fined $193,000 for calling itself the "World\'s First Robot Lawyer"; CMG Media settled for $930,000 over unproven active listening AI ad claims.',
              '<strong>Ultraman LoRA Copyright Precedent</strong>: Hangzhou Intermediate Court established secondary liability for AI platforms hosting commercial character LoRAs without licensing.',
              '<strong>Supreme Court Precedent on GPL Viral Licensing</strong>: Supreme People\'s Court (2021) confirmed that violating GPLv3 conditions terminates the license, rendering downstream distribution copyright infringement.'
            ]
          })}
        </div>


        <!-- Section 4.6 -->
        <div id="sec-4-6" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-6" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.6 Post-Session: Human-Machine Attribution & Evidence Archiving</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Disciplined collaboration includes two final steps: purging local temporary logs to prevent context leakage, and polishing output to eliminate robotic tropes. Core principle: <strong>never declare a task complete without verifiable test passage.</strong>
          </p>

          ${renderActionPanel({
            lang: 'en',
            dontText: 'Leaving sensitive working drafts or credentials permanently stored in cloud conversation histories; taking an AI\'s verbal claim of "all tasks completed" at face value without verification; publishing text cluttered with AI buzzwords and robotic phrasing.',
            doText: 'Purge sensitive memory and chat histories after sessions; enforce automated test gates before declaring completion; rewrite output following Wikipedia anti-AI-writing guidelines to restore authentic human voice.',
            tierBrowser: [
              'Delete conversations containing sensitive details once finished; inspect Account Settings > Memory to clear stored personal facts.',
              'Before handoff, ask: "Did I personally test and verify this outcome?" If not, do not claim it is done.',
              'Polishing improves clarity; where compliance requires disclosing AI assistance, state it truthfully.'
            ],
            tierSoftware: [
              'Regularly (e.g. monthly) clear historical chats and uploaded attachments across AI provider consoles.'
            ],
            tierSkills: [
              'Enable <code>verification-before-completion</code> to forbid the AI from declaring success before running test suites.'
            ],
            verifyText: 'One month later, checking the platform reveals no lingering sensitive logs or unwanted retained files.'
          })}

          ${renderSkillPipelineSection({
            titleZh: "本场景工序防线与精选技能 (Post-Session & Completion Verification Pipeline)",
            titleEn: "Post-Session & Completion Verification Pipeline",
            subtitleZh: "工序：硬性测试检验门禁 → 消除 AI 套路机械腔润色。作为发布前的验证与文字润色环节。",
            subtitleEn: "Pipeline: Mandatory verification before completion → Humanized style rewriting.",
            primary: [
              {
                id: "verification-before-completion",
                tierZh: "核心门禁 · 终局检验",
                tierEn: "Core Gate · Verification",
                roleZh: "严禁 AI 口头宣称完成：强制跑完验证套件与事实检查，提供证据后方可交付",
                roleEn: "Enforces evidence-based task completion: forbids LLM declaring done without tests",
                isAdvanced: false
              },
              {
                id: "humanizer",
                tierZh: "核心润色 · 去套路化",
                tierEn: "Core Polish · Humanize",
                roleZh: "基于维基百科 AI 文本特征，消除‘不仅...而且’、虚高术语与机械套路腔",
                roleEn: "Rewrites AI-sounding prose to remove robotic patterns, cliches and inflated claims",
                isAdvanced: false
              }
            ],
            alternates: []
          })}

          ${renderEvidenceDrawer({
            lang: 'en',
            title: 'Evidence & References: Wikipedia AI Writing Signs & Test-Driven Completion Gates',
            count: 'Wikipedia Anti-Trope Guidelines · Test-Driven Sign-off',
            cases: [],
            statutes: [],
            technical: [
              '<strong>Wikipedia "Signs of AI Writing" Guidelines</strong>: The Wikipedia editorial community identified core tropes of synthetic prose: forced contrasts ("not only... but also"), formulaic introductory and concluding summaries, inflated vocabulary lacking specific detail, and relentless promotional tone. Humanized rewriting is essential for professional credibility.',
              '<strong>Evidence-Based Task Completion Gate</strong>: Autoregressive models routinely hallucinate phrases like "I have completed all testing successfully" without running code. The <code>verification-before-completion</code> pattern blocks completion declarations unless accompanied by deterministic exit codes or verified logs.'
            ]
          })}
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

        <!-- Section 5.1 -->
        <div id="sec-5-1" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'en',
            titleEn: 'Playbook 1: Graduate Researchers & Scholars',
            roleEn: 'Academic Research · Graduate Researchers & Scholars',
            introEn: 'A daily defensive workflow for scholars drafting literature reviews, research proposals, and thesis submissions under tight deadlines.',
            painEn: 'Facing thesis deadlines and grant proposal milestones, scholars must digest hundreds of papers in days. Under time pressure, the temptation is immense to paste unreleased hypotheses or raw experimental datasets directly into public commercial LLMs for instant review synthesis.',
            nearMissEn: 'MSS Xiao Li leakage notice: a researcher uploaded core experimental data to commercial AI tools, leading to sensitive data exposure online and disciplinary action. Furthermore, citing hallucinated DOIs in peer-reviewed submissions results in academic misconduct allegations.',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Notice ↗'),
              makeIncidentPill('case-frontiers-ai-image-retraction-2024', 'Frontiers AI Graphic Retraction ↗'),
              makeIncidentPill('case-court-fake-citation-tongzhou-2025', 'Tongzhou Court Fake Citation Reprimand ↗')
            ],
            steps: [
              {
                time: '09:30',
                titleEn: 'Hypothesis Isolation & Anti-Training Scrape',
                descEn: 'Never send unpublished experimental data to public cloud models. Deploy ' + makePill('scholar-safety', 'scholar-safety · Academic Isolation') + ' to locally redact proprietary hypotheses, creating a one-way research sandbox that prevents commercial training harvesting.'
              },
              {
                time: '14:00',
                titleEn: 'CrossRef REST API Automated Verification',
                descEn: 'Query CrossRef and PubMed APIs via ' + makePill('bibref-verify', 'bibref-verify · BibRef Verifier') + ' to check DOI and author authenticity; invoke ' + makePill('the-judge', 'the-judge · Judicial Cross-Examiner') + ' to cross-examine claims from a reviewer angle.'
              },
              {
                time: '17:30',
                titleEn: 'Nature CRediT Appendix & Authorship Disclosure',
                descEn: 'Before submission to journals or thesis committees, invoke ' + makePill('ai-disclosure-convention', 'ai-disclosure-convention · AI Disclosure Standard') + ' to generate a Nature CRediT-compliant transparency statement, ensuring academic integrity.'
              }
            ],
            minZeroEn: 'Every cited DOI must be personally clicked and verified on doi.org or PubMed to confirm real authors and journal titles; include a clear one-sentence AI usage disclosure.',
            minProEn: 'Attach a CrossRef-verified citation report and a standardized Nature CRediT authorship appendix for blind peer review.'
          })}
        </div>


        <!-- Section 5.2 -->
        <div id="sec-5-2" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'en',
            titleEn: 'Playbook 2: Software Engineers & Open Source Maintainers',
            roleEn: 'Engineering · Software Engineers & Maintainers',
            introEn: 'Balancing rapid prototyping with defense against secret leakage, MCP exploits, and copyleft license contamination.',
            painEn: 'Racing toward release sprint deadlines, debugging stack traces, and triaging repository issues, developers rely heavily on coding agents (Cursor, Claude Code, Trae) with direct repository and terminal access.',
            nearMissEn: 'Corporate engineers leaking live database credentials by feeding unredacted stack traces to cloud models; public ports of self-hosted LLMs breached without authentication; agent YOLO modes executing poisoned issues. Exfiltrating prompt templates has been judicially ruled commercial trade secret theft (¥350k penalty).',
            cases: [
              makeIncidentPill('case-trade-secret-prompt-hangzhou-2026', 'Hangzhou AMR ¥350k Fine ↗')
            ],
            steps: [
              {
                time: '10:00',
                titleEn: 'Local Redaction & Micro-VM Sandboxed Execution',
                descEn: 'Redact API tokens, JWTs, and private IPs with ' + makePill('pii-safe-documents', 'pii-safe-documents · PII Redaction') + '; run automated test refactoring scripts inside disposable E2B micro-VMs via ' + makePill('agent-sandbox-skill', 'agent-sandbox-skill · Micro-VM Sandbox') + '.'
              },
              {
                time: '15:30',
                titleEn: 'Adversarial Architecture Stress Testing',
                descEn: 'Counter sycophantic praise by deploying ' + makePill('sycophancy-challenger', 'sycophancy-challenger · Sycophancy Challenger') + ' and ' + makePill('red-team-review', 'red-team-review · Red Team Probe') + ' to simulate external hacker probing on distributed consensus and serialization.'
              },
              {
                time: '19:00',
                titleEn: 'Git Pre-Commit Secret Blocking & SPDX Audit',
                descEn: 'Run pre-commit scans with ' + makePill('repo-security-review', 'repo-security-review · Secret Leak Gate') + ' via Gitleaks, verify license compatibility using ' + makePill('license-compliance-audit', 'license-compliance-audit · SPDX License Audit') + ', and enforce ' + makePill('verification-before-completion', 'verification-before-completion · Completion Gate') + '.'
              }
            ],
            minZeroEn: 'Run git diff locally before committing to guarantee zero hardcoded API keys or passwords; manually pass all unit test suites.',
            minProEn: 'Provide Gitleaks scan reports, sandboxed execution logs, and SPDX SBOM license compliance attestations with every PR.'
          })}
        </div>


        <!-- Section 5.3 -->
        <div id="sec-5-3" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'en',
            titleEn: 'Playbook 3: Writers & Marketing Specialists',
            roleEn: 'Creative Marketing · Writers & Marketing Specialists',
            introEn: 'High-volume social campaign creation guarded against advertising sanctions, copyright disputes, and accessibility deficits.',
            painEn: 'Facing campaign countdowns and multi-channel publication deadlines, copywriters generate dozens of taglines and landing pages daily, tempted to accept unverified superlatives and unsubstantiated benefit claims.',
            nearMissEn: 'AI copy declaring "industry best" or "100% cure" directly violates advertising laws. Xiamen AMR fined Miaogu Jintie ¥1.2M for fabricated AI heritage claims; Beijing Haidian AMR fined fish-oil marketers ¥200k for cloned anchor promotions; Tongzhou courts sentenced image-to-image e-commerce infringers to 1.5 years.',
            cases: [
              makeIncidentPill('case-ad-fake-host-haidian-2025', 'Beijing Haidian AMR ¥200k Fine ↗'),
              makeIncidentPill('case-criminal-copyright-puzzle-tongzhou-2025', 'Tongzhou SD E-commerce Copyright Sentence ↗'),
              makeIncidentPill('case-ai-voice-bj-2023', 'Beijing Internet Court Voice Infringement ↗')
            ],
            steps: [
              {
                time: '10:30',
                titleEn: 'Trope Scrubbing & Humanized Style Rewriting',
                descEn: 'Filter out repetitive AI cliches and buzzwords using ' + makePill('humanizer', 'humanizer · Humanize Style Rewriter') + ' to restore natural cadence, authentic human perspective, and emotional resonance.'
              },
              {
                time: '15:30',
                titleEn: 'Statutory Advertising & Substantiation Audit',
                descEn: 'Audit copy line-by-line with ' + makePill('marketing-claims-review', 'marketing-claims-review · Ad Claims Gate') + ' under FTC substantiation rules, ensuring every numeric claim maps to certified test documentation.'
              },
              {
                time: '18:00',
                titleEn: 'Landing Page W3C WCAG 2.1 AA Screen Reader Gate',
                descEn: 'Audit front-end HTML/CSS with ' + makePill('web-accessibility', 'web-accessibility · WCAG Accessibility Gate') + ' to verify contrast (≥ 4.5:1), keyboard focus, and complete ARIA screen reader attributes.'
              }
            ],
            minZeroEn: 'Proofread copy to remove all absolute terms ("best", "guaranteed"); confirm documented proof exists for every metric; label deliverables with AI generation tags.',
            minProEn: 'Generate an Ad Compliance Matrix mapping claims to test report numbers alongside a clean WCAG 2.1 AA audit report.'
          })}
        </div>


        <!-- Section 5.4 -->
        <div id="sec-5-4" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'en',
            titleEn: 'Playbook 4: Enterprise, Legal & Administrative Staff',
            roleEn: 'Enterprise Administration · Legal & Administrative Staff',
            introEn: 'Safeguarding executive meeting minutes, tender documentation, and confidential commercial agreements.',
            painEn: 'Handling hours of internal meeting recordings, sensitive official circulars, procurement bid evaluations, and compensation reviews, staff are tempted by commercial AI tools offering one-click audio transcription and contract review.',
            nearMissEn: 'National secrecy bureaus issued strict penalties to staff uploading confidential plans to mobile AI tools; replacing secret keywords with letter codes still triggered severe sanctions. Uploading internal security plans to cloud OCR led to executive reprimands and immediate contract terminations.',
            cases: [
              makeIncidentPill('case-state-security-li-leakage-2025', 'MSS Xiao Li Secrecy Notice ↗'),
              makeIncidentPill('case-state-secrecy-feng-leakage-2026', 'National Secrecy Feng AI Writing Notice ↗'),
              makeIncidentPill('case-bytedance-ai-export-leak-2026', 'ByteDance Workplace Dismissal Notice ↗')
            ],
            steps: [
              {
                time: '09:30',
                titleEn: 'Local Offline Redaction (No Cloud Listening)',
                descEn: 'Disable cloud transcription plugins. Redact staff names, project codenames, and unreleased financial metrics locally with ' + makePill('presidio-anonymize-text', 'presidio-anonymize-text · Microsoft Presidio') + ' and ' + makePill('pii-safe-documents', 'pii-safe-documents · PII Redaction') + '. Never upload state or core trade secrets to public models.'
              },
              {
                time: '14:30',
                titleEn: 'Adversarial Commercial Contract Risk Scrutiny',
                descEn: 'Strip corporate names and pricing floors before reviewing tender contracts; invoke ' + makePill('godfly-opposing-counsel', 'godfly-opposing-counsel · Opposing Counsel Simulator') + ' to uncover hidden joint liability traps and ambiguous IP clauses from an aggressive auditor stance.'
              },
              {
                time: '17:30',
                titleEn: 'AI Usage Ledger & Audit Provenance Archiving',
                descEn: 'Export structured compliance ledgers via ' + makePill('ai-provenance', 'ai-provenance · AI Provenance') + ' recording model versions, prompt hashes, redaction timestamps, and human sign-offs to demonstrate complete regulatory compliance.'
              }
            ],
            minZeroEn: 'Never include real entity names or confidential details in prompts; strictly enforce "Confidentiality never touches the internet".',
            minProEn: 'Provide local redaction logs, Godfly adversarial contract risk assessments, and signed Provenance Ledgers with human signatory approval.'
          })}
        </div>


        <!-- Section 5.5 -->
        <div id="sec-5-5" class="scroll-mt-36 lg:scroll-mt-28">
          ${renderPersonaPlaybook({
            lang: 'en',
            titleEn: 'Playbook 5: Everyday Citizens & Families',
            roleEn: 'Family Routine · Everyday Citizens & Families',
            introEn: 'Everyday scenarios for families: consulting health symptoms, helping children with homework, and preventing deepfake voice fraud.',
            painEn: 'Everyday families frequently use AI to interpret symptom reports, generate full homework answers for children, or interact with realistic voice and video clips received on social media.',
            nearMissEn: 'Feeding abnormal lab metrics to models prompts alarming disease hypotheses and unwarranted medication advice, risking health; students copying entire essays forfeit problem-solving skills; scammers cloning family voices via social media audio deceive elderly relatives into emergency transfers.',
            cases: [
              makeIncidentPill('case-ai-voice-bj-2023', 'Beijing Internet Court Voice Infringement ↗'),
              makeIncidentPill('case-ad-fake-host-haidian-2025', 'Beijing Haidian AI Anchor Fraud ↗'),
              makeIncidentPill('case-ftc-donotpay-robot-lawyer-2025', 'FTC Robot Lawyer False Marketing Action ↗')
            ],
            steps: [
              {
                time: 'Habit 1',
                titleEn: 'Health Consults: Preparation Checklists, Not Diagnoses',
                descEn: 'Use AI only to generate questions to ask your doctor; mask names and hospitals on lab reports; follow face-to-face physician prescriptions only, never AI drug dosage suggestions.'
              },
              {
                time: 'Habit 2',
                titleEn: 'Homework: Cognitive Scaffolding, Never Ready Answers',
                descEn: 'Instruct the AI: "Do not give the answer; ask 3 guiding questions so I work it out myself." Use ' + makePill('discernment-nudge', 'discernment-nudge · Discernment Nudge') + ' to train critical thinking.'
              },
              {
                time: 'Habit 3',
                titleEn: 'Anti-Scam: Family Passwords & Out-of-Band Calls',
                descEn: 'Agree on an offline family secret code. If receiving urgent money requests via voice or video, ask for the code and immediately hang up to call back on the original phone number.'
              },
              {
                time: 'Habit 4',
                titleEn: 'Privacy: Check Mobile App Permissions & Long-Term Memory',
                descEn: 'Review chat assistant permissions on parents\' devices every few months; revoke background mic access, turn off model training permissions, and clear accumulated memory lists.'
              }
            ],
            minZeroEn: 'Follow doctors for prescriptions; use AI for homework scaffolding only; verify urgent transfers with offline family codes; revoke unnecessary app permissions.',
            minProEn: 'Audit family device privacy settings regularly, establish anti-fraud verification protocols, and foster foundational AI literacy across all generations.'
          })}
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

  // Details remain collapsed by default on both desktop and mobile
  syncAdaptiveDetails(true);
}

function syncAdaptiveDetails() {
  // Details remain collapsed by default for a clean, stable reading line
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

