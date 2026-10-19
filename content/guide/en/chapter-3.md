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
          <!-- Plain-English Definition Box -->
          <div class="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            <strong>What is "Responsible & Safe AI Use"?</strong> In one sentence: <strong>Internally</strong>, control your personal data boundaries and system execution privileges (prevent unauthorized training ingestion, resist hallucinated blind faith, and restrict autonomous agent execution); <strong>Externally</strong>, take personal verification responsibility for deliverables handed over to clients, courts, or the public (never manufacture fictitious citations, avoid misleading marketing claims, and maintain transparent audit trails).
          </div>

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

        <!-- Chapter 3 to Chapter 4 Transition Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand/5 via-slate-50 to-brand/5 dark:from-brand/10 dark:via-slate-900 dark:to-brand/10 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <span>👉 Next Step · Tactical Arsenal</span>
            </span>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Now that you understand the 3 pillars and 4 daily questions, how do we turn them into practical defenses across daily touchpoints?
            </p>
          </div>
          <a href="#chapter-4" class="btn-primary text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5">
            <span>Explore Chapter 4 · 44 Skills →</span>
          </a>
        </div>
      </section>

      <!-- Chapter 4 -->