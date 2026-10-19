// Guide Page Logic & Interactive Narrative Engine
// Responsible & Safe AI Use · Digital Rights for All

let currentLang = localStorage.getItem("rai_lang") || "zh";
let itemsData = [];
let itemsById = {};
let incidentsData = [];
let incidentsById = {};
let guideContent = window.__GUIDE_CONTENT__ || null;

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  setupEventListeners();
  await Promise.all([loadItems(), loadIncidents(), loadGuideContent()]);
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

// Load guide content (data/guide-content.json with fallback to window.__GUIDE_CONTENT__)
async function loadGuideContent() {
  if (guideContent) return;
  try {
    const res = await fetch("data/guide-content.json");
    guideContent = await res.json();
  } catch (err) {
    console.warn("Failed to fetch data/guide-content.json, using window.__GUIDE_CONTENT__:", err);
    if (window.__GUIDE_CONTENT__) {
      guideContent = window.__GUIDE_CONTENT__;
    }
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
    ${item.standard_alignment && item.standard_alignment.organization ? `
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
    ` : ''}

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
      <div><strong>${isZh ? '面向智能体：' : 'Target Agents: '}</strong> ${(item.clients || []).join('、')}</div>
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


// Guide content is decoupled and loaded from data/guide-content.json or window.__GUIDE_CONTENT__

// Update UI based on language
function updateUI() {
  if (!guideContent) return;
  const t = guideContent[currentLang];
  if (!t) return;
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
  setText("hero-cta-start", t.heroCtaStart);
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
      "sec-4-1": "4.1 输入前·个人隐私保护与提示词注入防范",
      "sec-4-2": "4.2 生成回答时·识别虚假文献与事实性幻觉",
      "sec-4-3": "4.3 制定方案时·防范迎合讨好与盲目顺从",
      "sec-4-4": "4.4 执行命令时·限制智能体越权与文件误删",
      "sec-4-5": "4.5 交付成果前·广告虚假宣传审查与许可证核对",
      "sec-4-6": "4.6 长期归档时·记录人机分工说明与生成凭据",
      "chapter-5": "5. 角色剧本 · 普通人的一日安全工作流",
      "sec-5-1": "5.1 学者与高校师生",
      "sec-5-2": "5.2 软件工程师与技术负责人",
      "sec-5-3": "5.3 内容创作者与营销团队",
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
      "sec-4-2": "4.2 Generation: Exposing Hallucinations & Citations",
      "sec-4-3": "4.3 Strategy: Resisting Sycophancy & Echo Chambers",
      "sec-4-4": "4.4 Execution: Agent Privilege & Sandbox Defense",
      "sec-4-5": "4.5 Pre-Handoff: Advertising Audit & License Gates",
      "sec-4-6": "4.6 Archiving: Human-AI Attribution & Verification Gate",
      "chapter-5": "5. Persona Playbooks: Daily Safe Workflows",
      "sec-5-1": "5.1 Graduate Researchers & Scholars",
      "sec-5-2": "5.2 Software Engineers & Maintainers",
      "sec-5-3": "5.3 Writers & Marketing Specialists",
      "sec-5-4": "5.4 Enterprise & Administrative Staff",
      "sec-5-5": "5.5 Everyday Citizens & Families",
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

