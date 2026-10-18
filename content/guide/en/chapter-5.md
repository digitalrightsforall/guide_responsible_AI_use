<section id="chapter-5" class="space-y-8 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 5 · PERSONA PLAYBOOKS</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Persona Playbooks: A Day in the Safe Workflow
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            How to assemble these 44 open-source safety skills into personal self-defense chains across five representative user personas: Academic Researchers, Software Engineers, Marketing Specialists, Enterprise &amp; Administrative Staff, and Everyday Citizens &amp; Families.
          </p>
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
                How to keep safety principles from becoming dead letters? How to assemble fragmented defenses into continuous daily habits tailored to your professional identity and timeline?
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>What You Gain
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                5 ready-to-use daily defense playbooks and baseline handoff standards for Academic Scholars, Software Engineers, Marketing Writers, Enterprise Staff, and Family Routines.
              </p>
            </div>
          </div>
        </div>

        <!-- Everyday Citizen Fast Lane Callout -->
        <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex flex-wrap items-center justify-between gap-2">
          <span>👨‍👩‍👧 <strong>Are you an everyday user or family member using AI for daily tasks (health consults, homework, scam prevention)?</strong> Jump straight to Playbook 5:</span>
          <a href="#sec-5-5" class="font-bold underline hover:text-amber-900 dark:hover:text-amber-200">Go to 5.5 Everyday Citizens & Families Playbook ➔</a>
        </div>

        <!-- Section 5.1 -->
        <div id="sec-5-1" class="scroll-mt-36 lg:scroll-mt-28">
          
## Playbook 1: Graduate Researchers & Scholars
> **Academic Research · Graduate Researchers & Scholars**  
> A daily defensive workflow for scholars drafting literature reviews, research proposals, and thesis submissions under tight deadlines.

### 1. Real Pain Point & Temptation
Facing thesis deadlines and grant proposal milestones, scholars must digest hundreds of papers in days. Under time pressure, the temptation is immense to paste unreleased hypotheses or raw experimental datasets directly into public commercial LLMs for instant review synthesis.

### 2. Chronological Daily Defense
- **09:30 Hypothesis Isolation & Anti-Training Scrape**  
  Never send unpublished experimental data to public cloud models. Deploy [skill:scholar-safety "scholar-safety · Academic Isolation"] to locally redact proprietary hypotheses, creating a one-way research sandbox that prevents commercial training harvesting.
- **14:00 CrossRef REST API Automated Verification**  
  Query CrossRef and PubMed APIs via [skill:bibref-verify "bibref-verify · BibRef Verifier"] to check DOI and author authenticity; invoke [skill:the-judge "the-judge · Judicial Cross-Examiner"] to cross-examine claims from a reviewer angle.
- **17:30 Nature CRediT Appendix & Authorship Disclosure**  
  Before submission to journals or thesis committees, invoke [skill:ai-disclosure-convention "ai-disclosure-convention · AI Disclosure Standard"] to generate a Nature CRediT-compliant transparency statement, ensuring academic integrity.

### 3. Verification Sign-off & Minimum Baseline
- **Minimum Baseline (Zero Setup)**：Every cited DOI must be personally clicked and verified on doi.org or PubMed to confirm real authors and journal titles; include a clear one-sentence AI usage disclosure.
- **Professional Standard (Advanced)**：Attach a CrossRef-verified citation report and a standardized Nature CRediT authorship appendix for blind peer review.

<details class="evidence-drawer">
<summary>⚠️ Real-World Incident Precedents</summary>

MSS Xiao Li leakage notice: a researcher uploaded core experimental data to commercial AI tools, leading to sensitive data exposure online and disciplinary action. Furthermore, citing hallucinated DOIs in peer-reviewed submissions results in academic misconduct allegations.

* [incident:case-state-security-li-leakage-2025 "MSS Xiao Li Secrecy Notice"]
* [incident:case-frontiers-ai-image-retraction-2024 "Frontiers AI Graphic Retraction"]
* [incident:case-court-fake-citation-tongzhou-2025 "Tongzhou Court Fake Citation Reprimand"]
</details>


        </div>


        <!-- Section 5.2 -->
        <div id="sec-5-2" class="scroll-mt-36 lg:scroll-mt-28">
          
## Playbook 2: Software Engineers & Open Source Maintainers
> **Engineering · Software Engineers & Maintainers**  
> Balancing rapid prototyping with defense against secret leakage, MCP exploits, and copyleft license contamination.

### 1. Real Pain Point & Temptation
Racing toward release sprint deadlines, debugging stack traces, and triaging repository issues, developers rely heavily on coding agents (Cursor, Claude Code, Trae) with direct repository and terminal access.

### 2. Chronological Daily Defense
- **10:00 Local Redaction & Micro-VM Sandboxed Execution**  
  Redact API tokens, JWTs, and private IPs with [skill:pii-safe-documents "pii-safe-documents · PII Redaction"]; run automated test refactoring scripts inside disposable E2B micro-VMs via [skill:agent-sandbox-skill "agent-sandbox-skill · Micro-VM Sandbox"].
- **15:30 Adversarial Architecture Stress Testing**  
  Counter sycophantic praise by deploying [skill:sycophancy-challenger "sycophancy-challenger · Sycophancy Challenger"] and [skill:red-team-review "red-team-review · Red Team Probe"] to simulate external hacker probing on distributed consensus and serialization.
- **19:00 Git Pre-Commit Secret Blocking & SPDX Audit**  
  Run pre-commit scans with [skill:repo-security-review "repo-security-review · Secret Leak Gate"] via Gitleaks, verify license compatibility using [skill:license-compliance-audit "license-compliance-audit · SPDX License Audit"], and enforce [skill:verification-before-completion "verification-before-completion · Completion Gate"].

### 3. Verification Sign-off & Minimum Baseline
- **Minimum Baseline (Zero Setup)**：Run git diff locally before committing to guarantee zero hardcoded API keys or passwords; manually pass all unit test suites.
- **Professional Standard (Advanced)**：Provide Gitleaks scan reports, sandboxed execution logs, and SPDX SBOM license compliance attestations with every PR.

<details class="evidence-drawer">
<summary>⚠️ Real-World Incident Precedents</summary>

Corporate engineers leaking live database credentials by feeding unredacted stack traces to cloud models; public ports of self-hosted LLMs breached without authentication; agent YOLO modes executing poisoned issues. Exfiltrating prompt templates has been subject to administrative penalties for trade secret infringement (Hangzhou AMR ¥350k penalty).

* [incident:case-trade-secret-prompt-hangzhou-2026 "Hangzhou AMR Commercial Trade Secret ¥350k Penalty"]
</details>


        </div>


        <!-- Section 5.3 -->
        <div id="sec-5-3" class="scroll-mt-36 lg:scroll-mt-28">
          
## Playbook 3: Writers & Marketing Specialists
> **Creative Marketing · Writers & Marketing Specialists**  
> High-volume social campaign creation guarded against advertising sanctions, copyright disputes, and accessibility deficits.

### 1. Real Pain Point & Temptation
Facing campaign countdowns and multi-channel publication deadlines, copywriters generate dozens of taglines and landing pages daily, tempted to accept unverified superlatives and unsubstantiated benefit claims.

### 2. Chronological Daily Defense
- **10:30 Trope Scrubbing & Humanized Style Rewriting**  
  Filter out repetitive AI cliches and buzzwords using [skill:humanizer "humanizer · Humanize Style Rewriter"] to restore natural cadence, authentic human perspective, and emotional resonance.
- **15:30 Statutory Advertising & Substantiation Audit**  
  Audit copy line-by-line with [skill:marketing-claims-review "marketing-claims-review · Ad Claims Gate"] under FTC substantiation rules, ensuring every numeric claim maps to certified test documentation.
- **18:00 Landing Page W3C WCAG 2.1 AA Screen Reader Gate**  
  Audit front-end HTML/CSS with [skill:web-accessibility "web-accessibility · WCAG Accessibility Gate"] to verify contrast (≥ 4.5:1), keyboard focus, and complete ARIA screen reader attributes.

### 3. Verification Sign-off & Minimum Baseline
- **Minimum Baseline (Zero Setup)**：Proofread copy to remove all absolute terms ("best", "guaranteed"); confirm documented proof exists for every metric; label deliverables with AI generation tags.
- **Professional Standard (Advanced)**：Generate an Ad Compliance Matrix mapping claims to test report numbers alongside a clean WCAG 2.1 AA audit report.

<details class="evidence-drawer">
<summary>⚠️ Real-World Incident Precedents</summary>

AI copy declaring "industry best" or "100% cure" directly violates advertising laws. Xiamen AMR fined Miaogu Jintie ¥1.2M for fabricated AI heritage claims; Beijing Haidian AMR fined fish-oil marketers ¥200k for cloned anchor promotions; Tongzhou courts sentenced image-to-image e-commerce infringers to 1.5 years.

* [incident:case-ad-fake-host-haidian-2025 "Beijing Haidian AMR ¥200k Fine"]
* [incident:case-criminal-copyright-puzzle-tongzhou-2025 "Tongzhou SD E-commerce Copyright Sentence"]
* [incident:case-ai-voice-bj-2023 "Beijing Internet Court Voice Infringement"]
</details>


        </div>


        <!-- Section 5.4 -->
        <div id="sec-5-4" class="scroll-mt-36 lg:scroll-mt-28">
          
## Playbook 4: Enterprise, Legal & Administrative Staff
> **Enterprise Administration · Legal & Administrative Staff**  
> Safeguarding executive meeting minutes, tender documentation, and confidential commercial agreements.

### 1. Real Pain Point & Temptation
Handling hours of internal meeting recordings, sensitive official circulars, procurement bid evaluations, and compensation reviews, staff are tempted by commercial AI tools offering one-click audio transcription and contract review.

### 2. Chronological Daily Defense
- **09:30 Local Offline Redaction (No Cloud Listening)**  
  Disable cloud transcription plugins. Redact staff names, project codenames, and unreleased financial metrics locally with [skill:presidio-anonymize-text "presidio-anonymize-text · Microsoft Presidio"] and [skill:pii-safe-documents "pii-safe-documents · PII Redaction"]. Never upload state or core trade secrets to public models.
- **14:30 Adversarial Commercial Contract Risk Scrutiny**  
  Strip corporate names and pricing floors before reviewing tender contracts; invoke [skill:godfly-opposing-counsel "godfly-opposing-counsel · Opposing Counsel Simulator"] to uncover hidden joint liability traps and ambiguous IP clauses from an aggressive auditor stance.
- **17:30 AI Usage Ledger & Audit Provenance Archiving**  
  Export structured compliance ledgers via [skill:ai-provenance "ai-provenance · AI Provenance"] recording model versions, prompt hashes, redaction timestamps, and human sign-offs to demonstrate complete regulatory compliance.

### 3. Verification Sign-off & Minimum Baseline
- **Minimum Baseline (Zero Setup)**：Never include real entity names or confidential details in prompts; strictly enforce "Confidentiality never touches the internet".
- **Professional Standard (Advanced)**：Provide local redaction logs, Godfly adversarial contract risk assessments, and signed Provenance Ledgers with human signatory approval.

<details class="evidence-drawer">
<summary>⚠️ Real-World Incident Precedents</summary>

National secrecy bureaus issued strict penalties to staff uploading confidential plans to mobile AI tools; replacing secret keywords with letter codes still triggered severe sanctions. Uploading internal security plans to cloud OCR led to executive reprimands and immediate contract terminations.

* [incident:case-state-security-li-leakage-2025 "MSS Xiao Li Secrecy Notice"]
* [incident:case-state-secrecy-feng-leakage-2026 "National Secrecy Feng AI Writing Notice"]
* [incident:case-bytedance-ai-export-leak-2026 "ByteDance Workplace Dismissal Notice"]
</details>


        </div>


        <!-- Section 5.5 -->
        <div id="sec-5-5" class="scroll-mt-36 lg:scroll-mt-28">
          
## Playbook 5: Everyday Citizens & Families
> **Family Routine · Everyday Citizens & Families**  
> Everyday scenarios for families: consulting health symptoms, helping children with homework, and preventing deepfake voice fraud.

### 1. Real Pain Point & Temptation
Everyday families frequently use AI to interpret symptom reports, generate full homework answers for children, or interact with realistic voice and video clips received on social media.

### 2. Chronological Daily Defense
- **Habit 1 Health Consults: Preparation Checklists, Not Diagnoses**  
  Use AI only to generate questions to ask your doctor; mask names and hospitals on lab reports; follow face-to-face physician prescriptions only, never AI drug dosage suggestions.
- **Habit 2 Homework: Cognitive Scaffolding, Never Ready Answers**  
  Instruct the AI: "Do not give the answer; ask 3 guiding questions so I work it out myself." Use [skill:discernment-nudge "discernment-nudge · Discernment Nudge"] to train critical thinking.
- **Habit 3 Anti-Scam: Family Passwords & Out-of-Band Calls**  
  Agree on an offline family secret code. If receiving urgent money requests via voice or video, ask for the code and immediately hang up to call back on the original phone number.
- **Habit 4 Privacy: Check Mobile App Permissions & Long-Term Memory**  
  Review chat assistant permissions on parents' devices every few months; revoke background mic access, turn off model training permissions, and clear accumulated memory lists.

### 3. Verification Sign-off & Minimum Baseline
- **Minimum Baseline (Zero Setup)**：Follow doctors for prescriptions; use AI for homework scaffolding only; verify urgent transfers with offline family codes; revoke unnecessary app permissions.
- **Professional Standard (Advanced)**：Audit family device privacy settings regularly, establish anti-fraud verification protocols, and foster foundational AI literacy across all generations.

<details class="evidence-drawer">
<summary>⚠️ Real-World Incident Precedents</summary>

Feeding abnormal lab metrics to models prompts alarming disease hypotheses and unwarranted medication advice, risking health; students copying entire essays forfeit problem-solving skills; scammers cloning family voices via social media audio deceive elderly relatives into emergency transfers.

* [incident:case-chatgpt-medical-advice-delay-winters-2026 "ChatGPT Misleading Medical Advice Delayed Treatment Lawsuit"]
* [incident:case-deepfake-videocall-baotou-2024 "Baotou AI Face-Swap Video Call ¥4.3M Fraud"]
* [incident:case-faceswap-auth-bypass-changsha-2026 "Changsha AI Face-Swap Facial Recognition Criminal Sentence"]
</details>


        </div>

        <!-- Chapter 5 to Chapter 6 Transition Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand/5 via-slate-50 to-brand/5 dark:from-brand/10 dark:via-slate-900 dark:to-brand/10 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <span>👉 Next Step · Open Advocacy</span>
            </span>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Digital self-defense is not a solo pursuit. How do we turn these defenses into open, community-driven collective action?
            </p>
          </div>
          <a href="#chapter-6" class="btn-primary text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5">
            <span>Read Chapter 6 · Advocacy & Co-Creation →</span>
          </a>
        </div>
      </section>

      <!-- Chapter 6 -->