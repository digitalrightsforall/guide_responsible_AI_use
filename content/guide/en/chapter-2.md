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

          <!-- Lookup Prompt Box -->
          <div class="p-3 sm:p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium flex items-center gap-2 my-3">
            <span>👉 <strong>Find your daily AI tool</strong>: Expand the configuration tables below to turn off model training, purge long-term memories, or restrict autonomous agent execution directly in your software settings.</span>
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