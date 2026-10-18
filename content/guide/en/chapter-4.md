<section id="chapter-4" class="space-y-12 pt-4 scroll-mt-36 lg:scroll-mt-28">
        <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-container">CHAPTER 4 · TACTICAL MAP</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Tactical Map: How 44 Skills Address Real-World Threats
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Skills are not static lists. Across these 6 workflow touchpoints, each skill represents precision defense.
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
                How do 44 open-source safety skills translate into tangible defenses across your day, rather than abstract technical jargon?
              </p>
            </div>
            <div class="space-y-1 md:border-l md:border-slate-100 md:dark:border-slate-800 md:pl-4">
              <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Takeaways
              </span>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Master 6 workflow touchpoints (4.1 to 4.6), understand skill card mechanisms, and adopt tiered actions tailored to your tool setup.
              </p>
            </div>
          </div>
        </div>

        <!-- What is a Skill (plain-reader) -->
        <div class="p-5 sm:p-6 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 space-y-3 text-sm">
          <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span class="p-1.5 rounded-lg bg-brand/15 text-brand">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            <span>First: What is a "Skill" in this chapter, and what if you cannot use one?</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A Skill (SKILL.md) is a <strong>standard operating procedure written for an AI assistant</strong>: a folder containing instructions and helper scripts. Only AI tools that support the Agent Skills format (such as Claude Code, Cursor, or Gemini CLI) can load and run them.
          </p>
          <div class="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-brand/15 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <span class="font-bold text-slate-900 dark:text-white block">💡 How to use the cards below:</span>
            <ul class="list-disc list-inside space-y-1 pl-1">
              <li><strong>View Evidence</strong>: Click to open test reports, primary legal articles, and research sources directly inline.</li>
              <li><strong>Copy Command</strong>: One-click copy of the download command to install the skill in your local workspace.</li>
              <li><strong>Out of the box vs Needs setup</strong>: Skills marked "Ready to use" are pure text prompts requiring zero extra software; skills marked "Needs setup" require terminal tools like Python or Docker.</li>
              <li><strong>Mobile users</strong>: Tap any card to view full descriptions and verified test status.</li>
            </ul>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>If you only use a web browser or mobile chat app, that is completely fine!</strong> Every section below provides a "No Setup / Chat Window" option requiring nothing more than a browser and a few minutes.
          </p>
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
            <span>4.1 Pre-Input: Privacy Protection & Prompt Injection Defense (Question 1: What Can I Feed to AI?)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When preparing to feed drafts, logs, or customer files to an AI model, data loss begins immediately. However, simply removing explicit names is dangerous security theater: in classic privacy research, Latanya Sweeney's <strong>Mosaic Theory</strong> experiment demonstrated that quasi-identifier combinations such as birth date, gender, and 5-digit ZIP code exhibit high uniqueness within specific population datasets, introducing serious re-identification risks. Under China's Personal Information Protection Law (PIPL Art. 28), medical health, financial accounts, and tracking information are classified as sensitive personal info; retaining "Grade-A tertiary hospital rare disease ward + 42-year-old male + admission date" creates an irreversible re-identification hazard.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Simultaneously, in agentic web browsing, long-context parsing, and enterprise RAG (Retrieval-Augmented Generation) workflows, <strong>Indirect Prompt Injections (IPI)</strong> have migrated from academic labs to real-world threats: adversaries do not interact with your chatbox directly, but embed concealed payloads inside web pages, PDFs, and emails that autonomous agents retrieve, hijacking execution flow and triggering stealthy data exfiltration.
          </p>

          
### 【正文·行动建议与分级实操】

| High-Risk Practices ❌ | Standard Defense ✅ |
| :--- | :--- |
| Assuming that masking names constitutes complete redaction, pasting raw records containing quasi-identifiers (hospital departments, age, transaction logs) into prompts; letting autonomous Agents scrape uninspected PDFs, web pages, or repositories with full external tool capabilities. | Run local differential redaction via Presidio to replace quasi-identifier tuples with randomized placeholders; enforce Spotlighting hash delimiters on retrieved RAG texts, clean zero-width characters and hidden PDF layers, and restrict outbound egress channels. |

#### What you can do (pick the tier that fits you)

1. **Zero Setup · Browser / Mobile Only**
   - Replace real names, phone numbers, ID numbers and addresses with placeholders like "[Name A]" or "[Phone]" before pasting.
   - Turn exact ages into ranges; keep locations at city level; describe employers by industry only.
   - Never paste state secrets, confidential work material or other people's medical records into public AI tools.
   - When an AI reads unfamiliar web pages or PDFs, do not also give it permission to send email or read/write files.
2. **Intermediate · Local Tools & Redaction**
   - Use find-and-replace in a local text editor to swap sensitive terms before copying text to the AI.
   - If you can, run open-source Microsoft Presidio locally to detect and replace personal data automatically.
3. **Advanced · AI Tools with Agent Skills**
   - Enable the redaction skills listed below (e.g. <code>pii-safe-documents</code>) in a Skills-capable tool so the AI checks before sending.
   - Install commands are available on the skill cards or in the Skill Library.

> **✔ How to verify you did it right**：If a colleague unfamiliar with the context reads the prompt, could they guess the identity of the person or company? If yes, redact further.



          
### 【正文·本场景工序防线与精选技能 (Pre-Input Defensive Pipeline)】

> **工序流程**：工序：敏感数据本地脱敏 → 投喂内容清洗 → 外部提示词注入拦截。首推 3 项核心技能，其余按需选用。

#### 核心防线技能推荐
* [skill:pii-safe-documents] **核心防线 · 输入前**：在本地生成可逆脱敏副本，防止向大模型泄露真实个人与客户隐私
* [skill:skill-sanitizer] **核心防线 · 数据净化**：投喂文本清洗器，过滤代码与文本中隐藏的凭据、内网地址与恶意识别符
* [skill:skill-sentinel] **核心防线 · 注入防御**：分析网页与PDF等外部上下文，实时识别并阻断间接提示词注入指令

#### 📦 备选与补充技能（根据环境自由选用）
* [skill:presidio-anonymize-text "presidio-anonymize-text · Microsoft Presidio Local Text Anonymizer"]
* [skill:pii-detection-pipeline "pii-detection-pipeline · Multi-Stage PII Detection"]
* [skill:openmed-clinical-ingestion "openmed-clinical-ingestion · Clinical Ingestion Redaction"]
* [skill:skillguard "skillguard · Malicious Skill Scanner"]
* [skill:security-threat-model "security-threat-model · STRIDE Threat Modeler"]
* [skill:scholar-safety "scholar-safety · Academic Search Isolation"]
* [skill:nova-proximity "nova-proximity · Proximity Guard"]



          
<details class="evidence-drawer">
<summary>🔍 <strong>Evidence & References: Mosaic Theory, Statutes & Prompt Injection In-the-Wild</strong><em> (3 Incidents · 1 Statute · 5 Technical Findings)</em></summary>

#### ⚖️ Real-World Incidents & Sanctions
*Click pills to inspect official rulings and case numbers:*

* [incident:case-state-security-li-leakage-2025 "MSS Bulletin: Researcher Xiao Li Disciplinary Sanction"]
* [incident:case-state-secrecy-feng-leakage-2026 "National Secrecy Administration: Feng Confidential Meeting Leakage Case"]
* [incident:case-bytedance-ai-export-leak-2026 "ByteDance Workplace Dismissal Bulletin No. 3"]

#### 📜 Statutes & Regulatory Standards
* <strong>Mosaic Theory & Sensitive PII Protection</strong>: Under China's Personal Information Protection Law (PIPL Art. 28) and international privacy frameworks, medical health and identity profiles receive strict statutory protection. Sweeney's benchmark research demonstrated that quasi-identifier combinations exhibit high uniqueness in specific population records, creating substantial re-identification vulnerabilities. Differential privacy or synthetic data generation is necessary.

#### 🔬 Technical & Research Deep Dive
* <strong>Vector 1: Zero-font, CSS display:none & HTML Comments</strong>: 2026 empirical measurement across 1.2 billion URLs confirmed 15,300 live injection payloads embedded in comments and hidden layers. Scraping agents flatten these into instructions with identical authority.
* <strong>Vector 2: Zero-Width Unicode Steganography</strong>: Reverse CAPTCHA experiments (8,308 LLM outputs) showed attackers inject invisible instructions using \u200B zero-width spaces, bypassing regex filters and directly reaching the model tokenizer.
* <strong>Vector 3: Phantom PDF Layers</strong>: CrackedPDFs 2026 demonstrated that direct text extraction treats off-screen text and background-colored glyphs identically to foreground text, persistently poisoning knowledge bases.
* <strong>In-the-Wild CVE: <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" class="text-brand font-bold underline">EchoLeak (CVE-2025-32711, CVSS 9.3 Critical) ↗</a></strong>: First zero-click indirect prompt injection in Microsoft 365 Copilot. Receiving a single unread email hijacked Copilot into reading confidential financial mail and exfiltrating data via Teams image markdown proxies.
* <strong>Engineering Defense: Microsoft <a href="https://arxiv.org/abs/2403.14720" target="_blank" class="text-brand font-bold underline">Spotlighting Mechanism ↗</a></strong>: Wraps untrusted input with cryptographic hash delimiters and Base64 transformations, reducing attack success rates from >50% to <2%.

</details>

        </div>


        <!-- Section 4.2 -->
        <div id="sec-4-2" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-2" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.2 Generation: Detecting Hallucinations & Fabricated References (Question 2: Which Answers Can I Trust?)</span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            The most seductive yet perilous property of modern LLMs is their authoritative eloquence. When asked for scientific papers, judicial precedents, or technical sources, models instantly output formatted citations complete with authors, journals, volume numbers, and realistic DOIs starting with <code>10.xxxx</code>. Yet clicking them reveals that the DOI does not exist, or the article argued the exact opposite.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            This is not an occasional glitch, but an inherent consequence of <strong>Autoregressive Next-Token Prediction</strong>: models choose statistically plausible sequences of words, not verified facts. In specialized or long-tail fields, models frequently hallucinate non-existent references with persuasive formatting.
          </p>

          
### 【正文·行动建议与分级实操】

| High-Risk Practices ❌ | Standard Defense ✅ |
| :--- | :--- |
| Blindly trusting generated scholars, DOIs, journal volumes, or court case numbers, copying them straight into legal briefs, thesis dissertations, or clinical reports without verification. | Adopt a zero-trust verification mindset: automatically query CrossRef and PubMed REST APIs to confirm that cited DOIs, authors, and volumes physically exist in authoritative databases before citing. |

#### What you can do (pick the tier that fits you)

1. **Zero Setup · Browser / Mobile Only**
   - Papers: Copy the DOI and open it at <a href="https://doi.org/" target="_blank" class="text-brand underline">doi.org</a>. If it fails to resolve or the title doesn't match, treat it as non-existent.
   - Papers without DOIs: Search the exact title in Google Scholar, PubMed, or institutional libraries.
   - Legal cases: Search the case number in official court databases (e.g., China Judgments Online or PACER).
   - Quotations and statistics: Trace back to original primary publications.
2. **Intermediate · Local Tools & Redaction**
   - Use the <a href="https://search.crossref.org/" target="_blank" class="text-brand underline">Crossref Search portal</a> to batch-verify DOIs against registered authors and journals.
   - Import citations into Zotero by DOI; flag and investigate any item that fails to fetch metadata.
3. **Advanced · AI Tools with Agent Skills**
   - Enable citation checking skills (e.g. <code>bibref-verify</code>) in your tool to query Crossref / PubMed APIs automatically.

> **✔ How to verify you did it right**：You have personally clicked through and opened the authentic primary page of every single citation included in your final deliverable.



          
### 【正文·本场景工序防线与精选技能 (Fact & Citation Verification Pipeline)】

> **工序流程**：工序：卷期与DOI外部校验 → 引文对齐核实 → 主张忠实度交叉查证。首推 3 项核心技能，其余按需选用。

#### 核心防线技能推荐
* [skill:bibref-verify] **核心核验 · 卷期真伪**：调用 CrossRef 与 PubMed 官方接口，严密校验引文作者、期卷号与真实 DOI
* [skill:citation-verifier] **核心核验 · 来源真伪**：通用引文真伪核查器，快速筛查学术论文和报告中是否存在凭空捏造的虚构来源
* [skill:claim-source-fact-checker] **核心核验 · 忠实度比对**：主张与来源比对器，逐句质问‘原文到底有没有这个结论’，防止歪曲断章取义

#### 📦 备选与补充技能（根据环境自由选用）
* [skill:citation-faithfulness-checker "citation-faithfulness-checker · Faithfulness Checker"]
* [skill:citation-integrity-auditor "citation-integrity-auditor · Citation Integrity Auditor"]
* [skill:post-generation-fact-check "post-generation-fact-check · Post-Generation Fact Check"]
* [skill:vectara-hallucination-corrector "vectara-hallucination-corrector · Vectara Corrector"]
* [skill:hallucination-risk-reviewer "hallucination-risk-reviewer · Hallucination Reviewer"]
* [skill:kdense-peer-review "kdense-peer-review · Rigorous Peer Reviewer"]
* [skill:the-judge "the-judge · Judicial Logic Cross-Examiner"]



          
<details class="evidence-drawer">
<summary>🔍 <strong>Evidence & References: Autoregressive Mechanics, Court Sanctions & Primary Chains</strong><em> (4 Judicial Precedents · 2 Verification Chains)</em></summary>

#### ⚖️ Real-World Incidents & Sanctions
*Click pills to inspect official rulings and case numbers:*

* [incident:case-court-fake-citation-tongzhou-2025 "Beijing Tongzhou Court AI Citation Reprimand"]
* [incident:case-court-fake-citation-yichang-2026 "Yichang Court Altered Statute Sanction"]
* [incident:case-frontiers-ai-image-retraction-2024 "Frontiers AI Graphic Retraction"]
* [incident:case-mata-avianca-fake-citations-2023 "US Federal Court Mata v. Avianca $5,000 Fine"]

#### 📜 Statutes & Regulatory Standards
* <strong>Judicial Sanctions Against AI Evidence Fabrication</strong>: In both US federal courts (Mata v. Avianca) and Chinese judicial guidelines, submitting hallucinated AI citations violates procedural rules of candor. Under Civil Procedure Law Art. 114, fabricating evidence carries fines, detention, or criminal sanctions.

#### 🔬 Technical & Research Deep Dive
* <strong>Autoregressive Next-Token Prediction Limitations</strong>: Models are statistical sequence synthesizers, not verified knowledge retrieval engines. Without grounded RAG or external deterministic APIs, high token-co-occurrence probabilities produce syntactically impeccable hallucinations.
* <strong>Dual-Loop Verification Protocol</strong>: CrossRef REST API provides ground truth for DOI registrations; NCBI PubMed provides verified clinical PMIDs. Combining OpenAlex with CrossRef metadata eliminates citation fabrication before publication.

</details>

        </div>


        <!-- Section 4.3 -->
        <div id="sec-4-3" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-3" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.3 Strategy & Architecture: Resisting Sycophancy & Echo Chambers <span class="text-xs font-normal text-slate-600 dark:text-slate-400">(Question 3: When NOT to listen to AI?)</span></span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When users prompt an AI with a leading premise (e.g. "I think a monolith architecture is superior here"), models routinely agree. In machine learning research, this phenomenon is called <strong>Sycophancy</strong>: models adapt their output to match user beliefs, sacrificing truthfulness to maximize reinforcement reward scores.
          </p>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Anthropic's milestone research paper <em><a href="https://arxiv.org/abs/2310.13548" target="_blank" class="text-brand font-bold underline">Towards Understanding Sycophancy in Language Models ↗</a></em> (2023) demonstrated that during Reinforcement Learning from Human Feedback (RLHF), human evaluators consistently score flattering, agreeably worded responses higher. Consequently, models learn to mask architectural flaws and reinforce confirmation bias.
          </p>

          
### 【正文·行动建议与分级实操】

| High-Risk Practices ❌ | Standard Defense ✅ |
| :--- | :--- |
| Leading the AI with pre-conceived conclusions and accepting its agreeing response without adversarial counter-examination or alternative perspectives. | Establish a 3-tier adversarial review pipeline: inject cognitive friction nudges, deploy Devil's Advocate critique, and simulate independent multi-agent juries to challenge key assumptions. |

#### What you can do (pick the tier that fits you)

1. **Zero Setup · Browser / Mobile Only**
   - Avoid stating your preferred conclusion up front; describe problems and constraints neutrally.
   - Follow up with this reusable prompt: "Ignore my preference. State the 3 weakest assumptions in this plan and its most likely failure scenarios."
   - Add another counter-prompt: "If you were opposing this proposal, what are your 3 strongest objections?"
2. **Intermediate · Local Tools & Redaction**
   - Open a new conversation or test with an alternative model provider to compare differences.
   - Before finalizing major decisions, have a real human colleague review the counter-arguments.
3. **Advanced · AI Tools with Agent Skills**
   - Enable anti-sycophancy and Devil's Advocate skills (e.g. <code>discernment-nudge</code>, <code>devils-advocate-mad-skills</code>) to automate adversarial scrutiny.

> **✔ How to verify you did it right**：You can clearly articulate the single biggest risk of the decision, and that risk was not merely offered as a polite afterthought by the AI.



          
### 【正文·本场景工序防线与精选技能 (Anti-Sycophancy & Critical Review Pipeline)】

> **工序流程**：工序：认知摩擦微提醒 → 单角色魔鬼代言人逆向质询 → 多角色陪审团会诊。首推 3 项核心技能，其余按需选用。

#### 核心防线技能推荐
* [skill:discernment-nudge] **核心防线 · 认知摩擦**：轻量级认知摩擦约束，强制模型不附和倾向，列出方案最薄弱的 3 个假设
* [skill:devils-advocate-mad-skills] **核心防线 · 逆向推演**：魔鬼代言人单兵攻防，站在对立面疯狂质询方案漏洞与商业盲区
* [skill:the-jury] **进阶会诊 · 陪审团**：多智能体独立会诊，由架构师、风控官与质疑者背靠背独立投票质证

#### 📦 备选与补充技能（根据环境自由选用）
* [skill:sycophancy-challenger "sycophancy-challenger · Sycophancy Challenger"]
* [skill:anti-sycophancy-molly "anti-sycophancy-molly · Direct Candor Guard"]
* [skill:devils-advocate-reviewer "devils-advocate-reviewer · Adversarial Reviewer"]
* [skill:godfly-opposing-counsel "godfly-opposing-counsel · Opposing Counsel Simulator"]
* [skill:the-fool "the-fool · Unconventional Questioner"]
* [skill:red-team-review "red-team-review · Red Team Vulnerability Probe"]
* [skill:receiving-code-review "receiving-code-review · Code Review Receptor"]



          
<details class="evidence-drawer">
<summary>🔍 <strong>Evidence & References: RLHF Reward Misalignment & 3-Tier Scrutiny Protocol</strong><em> (4 Scrutiny Tiers & Research Findings)</em></summary>

#### 🔬 Technical & Research Deep Dive
* <strong>RLHF Optimization Traps</strong>: Anthropic research shows that reward models favor affirmative tone over unpleasant factual corrections. As parameter scale increases, sycophancy grows more sophisticated unless explicitly counter-prompted.
* <strong>Tier 1: Discernment Nudges</strong>: Embed cognitive friction prompts forcing the model to articulate the 3 most brittle underlying assumptions.
* <strong>Tier 2: Devil's Advocate Red-Teaming</strong>: Instruct the model to assume adversarial roles (short-seller analyst, opposing legal counsel) to attack commercial proposals.
* <strong>Tier 3: The Jury Consensus</strong>: Deploys independent multi-agent personas for blind consensus voting, breaking single-session echo chambers.

</details>

        </div>


        <!-- Section 4.4 -->
        <div id="sec-4-4" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-4" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.4 Execution: Restricting Autonomous Agent Privileges & File Safety <span class="text-xs font-normal text-slate-600 dark:text-slate-400">(Question 3/Execution: Will actions destroy local environments?)</span></span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            When autonomous agents obtain terminal execution and file-write privileges, security risks extend directly into the operating system. Overwriting project repositories, executing malicious scripts from poisoned documents, or granting overprivileged MCP tools can result in irreparable local data loss.
          </p>

          
### 【正文·行动建议与分级实操】

| High-Risk Practices ❌ | Standard Defense ✅ |
| :--- | :--- |
| Enabling YOLO or "Allow All" full-access execution modes in IDEs; letting agents run unreviewed shell scripts on host machines; attaching untrusted third-party MCP servers. | Maintain default step-by-step confirmation popups; isolate high-risk commands inside disposable micro-VM sandboxes; audit tool descriptors to prevent semantic supply-chain poisoning. |

#### What you can do (pick the tier that fits you)

1. **Zero Setup · Browser / Mobile Only**
   - Readers who only interact via chat apps or web browsers can skip this section.
   - If your tool controls your local computer, keep default approval prompts enabled; never switch on "automatic execution without confirmation".
   - Back up critical project directories before letting agents modify files.
2. **Intermediate · Local Tools & Redaction**
   - Only enable MCP tools and plugins that you explicitly need for current tasks.
   - Run automated agent workflows inside dedicated virtual machines or Docker containers.
3. **Advanced · AI Tools with Agent Skills**
   - Enable <code>agent-sandbox-skill</code> to redirect risky commands into isolated cloud sandboxes.

> **✔ How to verify you did it right**：You personally inspected and clicked approval on every single file deletion, overwrite, or network command executed by the agent.



          
### 【正文·本场景工序防线与精选技能 (Agent Execution Isolation Pipeline)】

> **工序流程**：工序：敏感指令拦截 → 最小权限边界收敛 → 临时微虚拟机沙盒隔离。

#### 核心防线技能推荐
* [skill:agent-sandbox-skill] **核心防线 · 沙盒执行**：将 Agent 执行的高风险命令置于临时沙盒与微虚拟机中，杜绝系统文件误删与逃逸



          
<details class="evidence-drawer">
<summary>🔍 <strong>Evidence & References: Real Agent Incidents, CVE Vulnerabilities & MCP Risks</strong><em> (2 Landmark Incidents · 2 Disclosed CVEs · 2 Architectural Findings)</em></summary>

#### ⚖️ Real-World Incidents & Sanctions
*Click pills to inspect official rulings and case numbers:*

* [incident:case-replit-agent-db-drop-saastr-2025 "Replit Agent Production DB Deletion & Fabrication Incident"]
* [incident:case-pocketos-cursor-railway-wipe-2026 "Cursor Agent Misconfigured Credential Production Wipeout"]

#### 🔬 Technical & Research Deep Dive
* <strong>Permission UI vs. Container Isolation</strong>: WorkBuddy and Kimi Work explicitly distinguish default restricted access from full access. Without container boundaries, host-level execution risks irrevocable destruction.
* <strong>MCP Server-Side SSRF: <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-40100" target="_blank" class="text-brand font-bold underline">FastGPT CVE-2026-40100 ↗</a></strong>: Unauthenticated SSRF in MCP runTool endpoints allowed external actors to probe internal private infrastructure.
* <strong>Cross-Tenant Trace Leakage: <a href="https://nvd.nist.gov/vuln/detail/CVE-2026-41947" target="_blank" class="text-brand font-bold underline">Dify CVE-2026-41947 ↗</a></strong>: Unauthorized configuration exposure redirected prompt streams to arbitrary external endpoints (patched in v1.14.2).
* <strong>MCP Tool Description Poisoning</strong>: Malicious descriptors embed hidden system directives that hijack model reasoning even when not explicitly invoked by users.

</details>

        </div>


        <!-- Section 4.5 -->
        <div id="sec-4-5" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-5" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.5 Pre-Handoff: Advertising Claims Audit & License Verification <span class="text-xs font-normal text-slate-600 dark:text-slate-400">(Question 4: Can outputs be published directly?)</span></span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Before code, copy, or UI pages are published externally, substantive auditing is required. Legally, <strong>AI itself is not an independent legal entity. In the event of infringement or non-compliance, adjudicators allocate liability among users, publishers, and service providers based on their degree of control, duty of care, and specific conduct</strong>. Unverified output exposes organizations to heavy administrative penalties, accessibility lawsuits, credential leaks, and open-source license infringement.
          </p>

          
### 【正文·行动建议与分级实操】

| High-Risk Practices ❌ | Standard Defense ✅ |
| :--- | :--- |
| Publishing AI-generated marketing copy with unsubstantiated superlative claims ("cure-all", "best"); deploying web interfaces without accessibility checks; pushing code containing hardcoded credentials or virally licensed GPL components into proprietary repos. | Screen claims against advertising standards, substantiating every performance metric with testing reports; enforce WCAG 2.1 AA accessibility baselines; scan git commits with Gitleaks and SPDX SBOM tooling. |

#### What you can do (pick the tier that fits you)

1. **Zero Setup · Browser / Mobile Only**
   - Before publishing, ask yourself: Does this copy claim "the best", "guaranteed", or "number one"? If so, tone it down.
   - Do all quoted metrics and benefits have verifiable source documentation?
   - If content was AI-generated, include mandatory disclosure labels as required by applicable regulations.
2. **Intermediate · Local Tools & Redaction**
   - Web projects: Run Chrome DevTools Lighthouse to audit accessibility before launch.
   - Code projects: Run Gitleaks locally to catch accidentally committed API keys or tokens.
3. **Advanced · AI Tools with Agent Skills**
   - Enable gatekeeper skills (e.g. <code>publish-prep-review</code>, <code>marketing-claims-review</code>, <code>web-accessibility</code>) in your publishing workflow.

> **✔ How to verify you did it right**：If an auditor challenges any sentence or performance claim, you can immediately produce authentic supporting documentation.



          
### 【正文·本场景工序防线与精选技能 (Pre-Handoff & Disclosure Pipeline)】

> **工序流程**：工序：商业宣发前综合质检 → 广告合规与功效证据复核 → 网页无障碍达标核验。精选 3 项核心技能，其余按需选用。

#### 核心防线技能推荐
* [skill:publish-prep-review] **核心门禁 · 发布预审**：商业宣发与文案发布前综合质检，审查虚假效能主张、敏感合规与事实漏洞
* [skill:marketing-claims-review] **核心门禁 · 广告合规**：依据广告法规审查绝对化极限词与效能宣称，阻断夸大虚假宣传与行政处罚风险
* [skill:web-accessibility] **核心门禁 · 无障碍核验**：依据 WCAG 2.1 AA 标准核验色彩对比度与读屏标签，保障视障与老年人平等访问

#### 📦 备选与补充技能（根据环境自由选用）
* [skill:visible-ai-disclosure-pr-gate "visible-ai-disclosure-pr-gate · Code Disclosure Gate"]
* [skill:license-compliance-audit "license-compliance-audit · SPDX License Audit"]
* [skill:repo-security-review "repo-security-review · Credential Leakage Gate"]
* [skill:ai-disclosure-convention "ai-disclosure-convention · Transparent Disclosure Standard"]
* [skill:vertu-seo-publish-gate "vertu-seo-publish-gate · SEO Publish Gate"]
* [skill:gdpr-compliance-audit "gdpr-compliance-audit · GDPR Compliance Audit"]



          
<details class="evidence-drawer">
<summary>🔍 <strong>Evidence & References: False Advertising Sanctions, Copyright & GPL Judicial Rulings</strong><em> (4 Landmark Administrative Penalties & Cases · 4 Gatekeeper Categories · 4 Judicial Baselines)</em></summary>

#### ⚖️ Real-World Incidents & Sanctions
*Click pills to inspect official rulings and case numbers:*

* [incident:case-ad-fake-host-haidian-2025 "Beijing Haidian AMR AI Fake Anchor ¥200k Penalty"]
* [incident:case-outcall-douxing-shanghai-2026 "Shanghai AMR Douxing AI Outcall Bank Impersonation ¥200k Penalty"]
* [incident:case-criminal-copyright-puzzle-tongzhou-2025 "Tongzhou SD E-commerce Copyright Sentence"]
* [incident:case-criminal-extortion-medical-shanghai-2026 "Shanghai AI Fake Medical Record Extortion Ruling"]

#### 📜 Statutes & Regulatory Standards
* <strong>AMR Advertising Enforcement Records</strong>: Xiamen AMR penalized Miaogu Jintie ¥1.2M for fabricating AI heritage endorsements; Beijing Haidian AMR fined food marketers ¥200k for cloning celebrity TV anchors; Shanghai AMR fined Douxing AI ¥200k for deceptive AI outcalls.
* <strong>Accessibility Statutory Mandates</strong>: Accessible Environment Creation Law (effective Sept 2023) Art. 32 mandates accessibility for public websites. W3C WCAG 2.1 AA provides the baseline (4.5:1 text contrast, full keyboard navigation).
* <strong>Mandatory Watermarking & Attribution</strong>: The AI Synthesized Content Labeling Administrative Measures require visible disclosures and metadata watermarking. Note: AI disclosure does not absolve publishers from substantive copyright or false advertising liability.

#### 🔬 Technical & Research Deep Dive
* <strong>FTC "Operation AI Comply" Enforcement</strong>: US FTC targets unsubstantiated AI claims: DoNotPay was fined $193,000 for calling itself the "World's First Robot Lawyer"; CMG Media settled for $930,000 over unproven active listening AI ad claims.
* <strong>Ultraman LoRA Copyright Precedent</strong>: Hangzhou Intermediate Court established secondary liability for AI platforms hosting commercial character LoRAs without licensing.
* <strong>Supreme Court Precedent on GPL Viral Licensing</strong>: Supreme People's Court (2021) confirmed that violating GPLv3 conditions terminates the license, rendering downstream distribution copyright infringement.

</details>

        </div>


        <!-- Section 4.6 -->
        <div id="sec-4-6" class="space-y-4 scroll-mt-36 lg:scroll-mt-28"><span id="sec-3-6" class="hidden"></span>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>4.6 Post-Session & Archiving: Human-AI Attribution & Task Evidence <span class="text-xs font-normal text-slate-600 dark:text-slate-400">(Question 4/Wrap-up: Is human-AI attribution documented?)</span></span>
          </h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Disciplined collaboration includes two final steps: purging local temporary logs to prevent context leakage, and polishing output to eliminate robotic tropes while preserving an auditable trail of human-machine contribution. Core principle: <strong>never declare a task complete without verifiable test passage.</strong>
          </p>

          
### 【正文·行动建议与分级实操】

| High-Risk Practices ❌ | Standard Defense ✅ |
| :--- | :--- |
| Leaving sensitive working drafts or credentials permanently stored in cloud conversation histories; taking an AI's verbal claim of "all tasks completed" at face value without verification; publishing text cluttered with AI buzzwords and robotic phrasing. | Purge sensitive memory and chat histories after sessions; enforce automated test gates before declaring completion; maintain auditable human-AI attribution records; rewrite output following Wikipedia anti-AI-writing guidelines to restore authentic human voice. |

#### What you can do (pick the tier that fits you)

1. **Zero Setup · Browser / Mobile Only**
   - Delete conversations containing sensitive details once finished; inspect Account Settings > Memory to clear stored personal facts.
   - Before handoff, ask: "Did I personally test and verify this outcome?" If not, do not claim it is done.
   - Polishing improves clarity; where compliance requires disclosing AI assistance, state it truthfully.
2. **Intermediate · Local Tools & Redaction**
   - Regularly (e.g. monthly) clear historical chats and uploaded attachments across AI provider consoles.
3. **Advanced · AI Tools with Agent Skills**
   - Enable <code>verification-before-completion</code> to forbid the AI from declaring success before running test suites.

> **✔ How to verify you did it right**：One month later, checking the platform reveals no lingering sensitive logs or unwanted retained files; critical deliverables maintain clear human-AI attribution records.



          
### 【正文·本场景工序防线与精选技能 (Post-Session & Completion Verification Pipeline)】

> **工序流程**：工序：硬性测试检验门禁 → 人机分工血统存证 → 消除 AI 套路机械腔润色。精选 3 项核心技能，规范最终归档。

#### 核心防线技能推荐
* [skill:verification-before-completion] **核心门禁 · 终局检验**：严禁 AI 口头宣称完成：强制跑完验证套件与事实检查，提供证据后方可交付
* [skill:ai-provenance] **核心存证 · 血统溯源**：人机协作血统存证系统，记录提示词、模型版本与人工修改轨迹以备合规审计
* [skill:humanizer] **核心润色 · 去套路化**：基于维基百科 AI 文本特征，消除‘不仅...而且’、虚高术语与机械套路腔

#### 📦 备选与补充技能（根据环境自由选用）
* [skill:skill-provenance-tracker "skill-provenance-tracker · Skill Call Provenance"]



          
<details class="evidence-drawer">
<summary>🔍 <strong>Evidence & References: Wikipedia AI Writing Signs & Test-Driven Completion Gates</strong><em> (Wikipedia Anti-Trope Guidelines · Test-Driven Sign-off)</em></summary>

#### 🔬 Technical & Research Deep Dive
* <strong>Wikipedia "Signs of AI Writing" Guidelines</strong>: The Wikipedia editorial community identified core tropes of synthetic prose: forced contrasts ("not only... but also"), formulaic introductory and concluding summaries, inflated vocabulary lacking specific detail, and relentless promotional tone. Humanized rewriting is essential for professional credibility.
* <strong>Evidence-Based Task Completion Gate</strong>: Autoregressive models routinely hallucinate phrases like "I have completed all testing successfully" without running code. The <code>verification-before-completion</code> pattern blocks completion declarations unless accompanied by deterministic exit codes or verified logs.

</details>

        </div>

        <!-- Chapter 4 to Chapter 5 Transition Card -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand/5 via-slate-50 to-brand/5 dark:from-brand/10 dark:via-slate-900 dark:to-brand/10 border border-brand/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              <span>👉 Next Step · Persona Assembly</span>
            </span>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              Now that you understand the 6 timeline defenses, how do you assemble them into a continuous daily workflow tailored to your role?
            </p>
          </div>
          <a href="#chapter-5" class="btn-primary text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5">
            <span>Read Chapter 5 · Persona Playbooks →</span>
          </a>
        </div>
      </section>

      <!-- Chapter 5 -->