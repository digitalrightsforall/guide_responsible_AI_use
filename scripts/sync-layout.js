const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const siteDir = path.join(rootDir, 'site');

// Templates definitions (derived from layout.js single source of truth)
const layoutI18n = {
  zh: {
    navBrandTitle: "负责任与安全使用 AI",
    navBrandSub: "普通人的数字权利 社区共建",
    navLinkGuide: "实务指南",
    navLinkLibrary: "技能库",
    navLinkIncidents: "真实案例库",
    navLinkPutongren: "普通人的数字权利 官网",
    mNavGuide: "实务指南",
    mNavLibrary: "技能库",
    mNavIncidents: "案例库",
    mNavPutongren: "官网 ↗",
    tLangBtn: "English",
    footerBrandTitle: "普通人的数字权利 · Responsible & Safe AI Use",
    footerBrandMission: "帮助每一个普通人在机器与算法时代保护自己的权利",
    footerLinkGuide: "实务指南",
    footerLinkLibrary: "技能库",
    footerLinkIncidents: "真实案例库",
    footerLinkPutongren: "putongren.org 官网 ↗",
    footerLinkLicense: "MIT 开源许可",
    footerLinkGithub: "GitHub 仓库 ↗",
    footerCopyright: "© 2026 普通人的数字权利 (Digital Rights for All). 本项目为非营利开源社区项目，精选现有开源工具，不提供任何商业收费服务。"
  }
};

function getHeaderHTML(activePage) {
  const t = layoutI18n.zh;
  const isGuide = activePage === 'guide';
  const isLibrary = activePage === 'library';
  const isIncidents = activePage === 'incidents';

  return `<header id="site-header" class="sticky top-0 z-50 w-full nav-glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
      <!-- Logo & Title -->
      <a href="index.html" class="flex items-center gap-3 group">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand/10 dark:bg-brand/20 flex items-center justify-center transition-transform group-hover:scale-105 text-brand shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <div>
          <div class="font-extrabold text-sm sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none mb-1">
            <span id="nav-brand-title">${t.navBrandTitle}</span>
          </div>
          <div class="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span id="nav-brand-sub">${t.navBrandSub}</span>
          </div>
        </div>
      </a>

      <!-- Desktop Nav Items -->
      <nav class="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <a href="index.html" class="nav-link-animated ${isGuide ? 'active text-brand font-bold' : 'hover:text-brand dark:hover:text-white'}" id="nav-link-guide" data-page="guide">${t.navLinkGuide}</a>
        <a href="library.html" class="nav-link-animated ${isLibrary ? 'active text-brand font-bold' : 'hover:text-brand dark:hover:text-white'}" id="nav-link-library" data-page="library">${t.navLinkLibrary}</a>
        <a href="incidents.html" class="nav-link-animated ${isIncidents ? 'active text-brand font-bold' : 'hover:text-brand dark:hover:text-white'}" id="nav-link-incidents" data-page="incidents">${t.navLinkIncidents}</a>
        <a href="https://putongren.org" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 hover:text-brand transition-colors text-slate-500 dark:text-slate-400">
          <span id="nav-link-putongren">${t.navLinkPutongren}</span>
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </nav>

      <!-- Action Utilities -->
      <div class="flex items-center gap-1.5 sm:gap-3">
        <!-- Language Switcher -->
        <button id="lang-toggle" class="min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer" aria-label="切换中英语言">
          <svg class="w-3.5 h-3.5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
          <span id="t-lang-btn">${t.tLangBtn}</span>
        </button>

        <!-- Dark Mode Toggle -->
        <button id="theme-toggle" aria-label="Toggle theme" class="min-h-[44px] min-w-[44px] p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center justify-center">
          <svg class="w-4 h-4 hidden dark:block" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
          <svg class="w-4 h-4 block dark:hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
        </button>

        <!-- GitHub -->
        <a href="https://github.com/digitalrightsforall/guide_responsible_AI_use" target="_blank" rel="noopener noreferrer" class="min-h-[44px] min-w-[44px] p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center" title="GitHub Repository">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </div>
    </div>
  </header>`;
}

function getMobileNavHTML(activePage) {
  const t = layoutI18n.zh;
  const isGuide = activePage === 'guide';
  const isLibrary = activePage === 'library';
  const isIncidents = activePage === 'incidents';

  return `  <nav id="site-mobile-nav" class="md:hidden flex items-center justify-around py-2 px-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs font-bold shadow-xs sticky top-16 z-40" aria-label="移动端快捷导航">
    <a href="index.html" class="${isGuide ? 'text-brand font-extrabold' : 'text-slate-600 dark:text-slate-400 hover:text-brand'} flex items-center gap-1" id="m-nav-guide-link" data-page="guide">
      <span id="m-nav-guide">${t.mNavGuide}</span>
    </a>
    <span class="text-slate-300 dark:text-slate-700">|</span>
    <a href="library.html" class="${isLibrary ? 'text-brand font-extrabold' : 'text-slate-600 dark:text-slate-400 hover:text-brand'} flex items-center gap-1" id="m-nav-library-link" data-page="library">
      <span id="m-nav-library">${t.mNavLibrary}</span>
    </a>
    <span class="text-slate-300 dark:text-slate-700">|</span>
    <a href="incidents.html" class="${isIncidents ? 'text-brand font-extrabold' : 'text-slate-600 dark:text-slate-400 hover:text-brand'} flex items-center gap-1" id="m-nav-incidents-link" data-page="incidents">
      <span id="m-nav-incidents">${t.mNavIncidents}</span>
    </a>
    <span class="text-slate-300 dark:text-slate-700">|</span>
    <a href="https://putongren.org" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 hover:text-brand flex items-center gap-1">
      <span id="m-nav-putongren">${t.mNavPutongren}</span>
    </a>
  </nav>`;
}

function getFooterHTML(activePage) {
  const t = layoutI18n.zh;
  const isGuide = activePage === 'guide';
  const isLibrary = activePage === 'library';
  const isIncidents = activePage === 'incidents';

  return `  <footer id="site-footer" class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-xs text-slate-500 dark:text-slate-400 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-brand/10 dark:bg-brand/20 flex items-center justify-center text-brand shrink-0">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <div>
            <div class="font-bold text-slate-800 dark:text-slate-200 text-sm" id="footer-brand-title">${t.footerBrandTitle}</div>
            <div class="text-[11px] text-slate-400" id="footer-brand-mission">${t.footerBrandMission}</div>
          </div>
        </div>
        <div class="flex flex-wrap gap-6 text-slate-600 dark:text-slate-300 font-medium">
          <a href="index.html" class="${isGuide ? 'text-brand font-bold' : 'hover:text-brand'}" id="footer-link-guide" data-page="guide">${t.footerLinkGuide}</a>
          <a href="library.html" class="${isLibrary ? 'text-brand font-bold' : 'hover:text-brand'}" id="footer-link-library" data-page="library">${t.footerLinkLibrary}</a>
          <a href="incidents.html" class="${isIncidents ? 'text-brand font-bold' : 'hover:text-brand'}" id="footer-link-incidents" data-page="incidents">${t.footerLinkIncidents}</a>
          <a href="https://putongren.org" target="_blank" rel="noopener noreferrer" class="hover:text-brand" id="footer-link-putongren">${t.footerLinkPutongren}</a>
          <a href="LICENSE" class="hover:text-brand" id="footer-link-license">${t.footerLinkLicense}</a>
          <a href="https://github.com/digitalrightsforall/guide_responsible_AI_use" target="_blank" rel="noopener noreferrer" class="hover:text-brand" id="footer-link-github">${t.footerLinkGithub}</a>
        </div>
      </div>
      <div class="pt-6 border-t border-slate-100 dark:border-slate-900 text-center text-slate-400 text-[11px]" id="footer-copyright">
        ${t.footerCopyright}
      </div>
    </div>
  </footer>`;
}

const pages = [
  { file: 'index.html', key: 'guide' },
  { file: 'library.html', key: 'library' },
  { file: 'incidents.html', key: 'incidents' }
];

pages.forEach(({ file, key }) => {
  const filePath = path.join(siteDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Replace <header>...</header>
  const newHeader = getHeaderHTML(key);
  const headerRegex = /\s*<header id="site-header"[\s\S]*?<\/header>/i;
  if (headerRegex.test(html)) {
    html = html.replace(headerRegex, `\n  ${newHeader}`);
  } else {
    html = html.replace(/\s*<!--\s*(?:Top Navigation Bar|Header \/ Navigation|Unified Header)[\s\S]*?<\/header>/i, `\n  ${newHeader}`);
  }

  // 2. Replace <nav ... (mobile sub nav)>...</nav>
  const newMobileNav = getMobileNavHTML(key);
  const mobileNavRegex = /\s*<nav id="site-mobile-nav"[\s\S]*?<\/nav>/i;
  if (mobileNavRegex.test(html)) {
    html = html.replace(mobileNavRegex, `\n${newMobileNav}`);
  } else {
    html = html.replace(/\s*<!--\s*Mobile Sub-Navigation Bar[\s\S]*?<\/nav>/i, `\n${newMobileNav}`);
  }

  // 3. Ensure <script src="js/layout.js"></script> is included
  if (!html.includes('js/layout.js')) {
    html = html.replace(/<script src="js\/(?:guide|library|incidents)\.js"><\/script>/,
      `<script src="js/layout.js"></script>\n  $&`);
  }

  // 4. Replace footer in place if it exists; otherwise insert before layout.js
  const newFooter = getFooterHTML(key);
  const footerRegex = /\s*<footer id="site-footer"[\s\S]*?<\/footer>/i;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, `\n${newFooter}`);
  } else {
    const legacyFooter = /\s*(?:<!--\s*Footer[\s\S]*?<\/footer>|<footer\s+(?:id="site-footer"|class="[^"]*border-t[^"]*")[\s\S]*?<\/footer>)/i;
    if (legacyFooter.test(html)) {
      html = html.replace(legacyFooter, `\n${newFooter}`);
    } else if (html.includes('<script src="js/layout.js">')) {
      html = html.replace('<script src="js/layout.js">', `${newFooter}\n\n  <script src="js/layout.js">`);
    } else {
      const insertPoint = html.lastIndexOf('</body>');
      html = html.substring(0, insertPoint) + newFooter + '\n\n' + html.substring(insertPoint);
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Synced unified Header & Footer into ${file}`);
});
