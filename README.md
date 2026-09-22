# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated collection of 38 production-ready `SKILL.md` packages and verified prompt protocols designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.

**English** | [中文版](README_CN.md)

---

## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)

This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyone protect their rights and agency in the algorithmic era.

In this project, we curate **existing, proven open-source skills** (we strictly curate, not invent). The practical connotation of responsible and safe AI use is unpacked into two dynamic pillars:

1. **🛡️ Inward: Self-Defense & Boundaries (对内·自我防护与边界)**: Guard against commercial AI over-harvesting your personal and confidential data into training corpora, and guard against blind faith in confident hallucinations or sycophantic appeasement.
2. **📐 Outward: Third-Party Verifiability (对外·成果第三方可核验)**: Ensure colleagues, clients, and readers can readily audit the evidence chain and reasoning behind AI-assisted work, moving beyond hollow bureaucratic disclaimers.

> [!NOTE]
> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid or dogmatic doctrine.

---

## 📦 Client Installation Standard (Where do Skills live?)

According to the open Agent Skills specification:
* **Cursor / Google Antigravity:** `.agents/skills/<skill-name>/SKILL.md`
* **Claude Code:** `.claude/skills/<skill-name>/SKILL.md`

Always copy the **entire skill directory** (including bundled scripts and references) rather than merely copying `SKILL.md`.

---

## 🧭 The Four Practical Questions

* [1. What can I feed to AI?](#1-what-can-i-feed-to-ai)
* [2. Which answers can I trust?](#2-which-answers-can-i-trust)
* [3. When should I NOT listen to AI?](#3-when-should-i-not-listen-to-ai)
* [4. Can the output be published directly?](#4-can-the-output-be-published-directly)
* [🛑 Non-Delegable Red Lines](#-non-delegable-red-lines)

---

### 1. What can I feed to AI?
*Guarding against commercial AI over-harvesting personal identity (PII), confidential client data, and proprietary drafts.*

#### [`PII Safe Documents (danyuchn/pii-guard)`](https://github.com/danyuchn/pii-guard)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Before ingestion: Run before passing any private document, interview transcript, or draft to the agent.*
* **🎯 Why Chosen:** Directly tackles commercial AI data harvesting. Unlike passive warnings, it treats the cloud LLM as untrusted by default, creating an isolated local redacted working copy and prohibiting raw access.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ AgentSkills Standard | 🛡️ *Audited local-first isolation pipeline with automatic purge*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** General Knowledge Workers, Researchers, Journalists
* **Problem Solved:** Creates a reversible, locally redacted working copy while treating the cloud LLM as untrusted. Prohibits the agent from opening, searching, or uploading the raw original.
* **Install / Setup:**
  ```bash
  git clone https://github.com/danyuchn/pii-guard.git && cp -R pii-guard/.agents/skills/pii-safe-documents .agents/skills/
  ```

#### [`Scholar Safety (joshzyj/open-scholar-skill)`](https://github.com/joshzyj/open-scholar-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Pre-read scan: Triggered automatically before Claude or an agent executes a file Read command.*
* **🎯 Why Chosen:** Brings institutional research ethics (IRB, HIPAA, NDAs) down to everyday desktop use, allowing users to run local Bash statistics without streaming restricted texts upstream.
* **📊 Maturity & Trust:** `Active Release` | ⭐ Open Scholar Suite | 🛡️ *Designed for university & clinical research data custodians*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Qualitative Analysts, IRB Custodians
* **Problem Solved:** Executes a pre-ingestion sensitivity scan before files are read into context. Gates IRB/HIPAA/restricted research data and offers local-only Bash analysis without raw-data transmission.
* **Install / Setup:**
  ```bash
  git clone https://github.com/joshzyj/open-scholar-skill.git && cp -R open-scholar-skill/.claude/skills/scholar-safety ~/.claude/skills/
  ```

#### [`Skill Sanitizer (cyberxuan-XBX/skill-sanitizer)`](https://github.com/cyberxuan-XBX/skill-sanitizer)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Installation checkpoint: Use before loading or approving any third-party SKILL.md into your workspace.*
* **🎯 Why Chosen:** Provides supply-chain defense for AI users. Over 99% of community skills contain unvetted instructions; this tool scans for hidden prompt injections and malicious bash telemetry.
* **📊 Maturity & Trust:** `Production v2.1` | ⭐ Open Source Community | 🛡️ *Zero cloud dependencies, 7-layer semantic detection*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Developers, Power Users, Knowledge Workers
* **Problem Solved:** A local meta-security scanner that intercepts incoming SKILL.md files and checks for hidden prompt injections, suspicious bash operations, and exfiltration payloads before loading.
* **Install / Setup:**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII-Shield (gregmos/PII-Shield)`](https://github.com/gregmos/PII-Shield)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Batch document intake: Triggered when feeding office files (.pdf, .docx, .txt) into an agent task.*
* **🎯 Why Chosen:** Zero-infrastructure, battle-tested document redaction. Scans multiple common office formats and replaces personal identifiers with synthetic tokens locally.
* **📊 Maturity & Trust:** `Production Ready` | ⭐ Open Agent Community | 🛡️ *Document-level token replacement tested on legal/financial docs*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** General Knowledge Workers, Legal & Financial Analysts
* **Problem Solved:** Scans office documents (.txt, .md, .pdf, .docx) before agent processing, replaces personal identifiers with synthetic tokens, and restores them locally.
* **Install / Setup:**
  ```bash
  git clone https://github.com/gregmos/PII-Shield.git .agents/skills/pii-shield
  ```

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Context streaming: Active during chat when pasting customer communications or confidential logs.*
* **🎯 Why Chosen:** Tailored for support and sales professionals who frequently copy-paste customer text into AI chats, maintaining an ephemeral de-identification lookup table on local disk.
* **📊 Maturity & Trust:** `Production` | ⭐ mode-io Agent Skills | 🛡️ *Enterprise customer service data protection pattern*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Support Teams, Account Managers, Operations
* **Problem Solved:** Identifies business credentials and contact details in prompt context, maintaining an ephemeral de-identification lookup table on local storage.
* **Install / Setup:**
  ```bash
  git clone https://github.com/mode-io/mode-io-skills.git && cp -R mode-io-skills/skills/privacy-protector .agents/skills/
  ```

#### [`Anonymize Documents with Presidio (schneidermichael)`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Pre-processing pipeline: Execute locally on interview recordings or qualitative survey datasets.*
* **🎯 Why Chosen:** Brings Microsoft's battle-tested Presidio NER engine into everyday agent workflows, guaranteeing deterministic entity extraction without relying on probabilistic LLM masking.
* **📊 Maturity & Trust:** `Active Open Source` | ⭐ Microsoft Presidio Ecosystem | 🛡️ *Backed by Microsoft Presidio NLP open-source engine*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Qualitative Researchers, Sociologists, Analysts
* **Problem Solved:** Leverages Microsoft Presidio locally to scrub participant names, locations, and organizations before feeding transcripts to cloud LLMs.
* **Install / Setup:**
  ```bash
  git clone https://github.com/schneidermichael/anonymize-documents-with-presidio.git .agents/skills/presidio-anonymizer
  ```

#### [`TrustBoost PII Sanitizer (teodorofodocrispin-cmyk)`](https://github.com/teodorofodocrispin-cmyk/TrustBoost-PII-Sanitizer)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Pre-flight gateway: Intercepts raw prompts and file contents before streaming to upstream LLM providers.*
* **🎯 Why Chosen:** Provides multilingual contextual PII sanitization across 8 languages, strictly complying with GDPR, LGPD, and HIPAA frameworks for global teams.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Multi-client Ecosystem | 🛡️ *Tested across 8 languages with compliance mapping*
* **Clients:** Claude Code, Cursor, Windsurf
* **Target Persona:** Enterprise Knowledge Workers, Financial Analysts, Legal Professionals
* **Problem Solved:** Sanitizes PII from text before it reaches upstream LLM providers, supporting contextual sanitization across eight languages while adhering to global privacy frameworks.
* **Install / Setup:**
  ```bash
  git clone https://github.com/teodorofodocrispin-cmyk/TrustBoost-PII-Sanitizer.git .agents/skills/trustboost-pii-sanitizer
  ```

#### [`OpenMed Clinical Document Ingestion (maziyarpanahi)`](https://github.com/maziyarpanahi/openmed)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Intake gate: Triggered before analyzing clinical case notes, patient reports, or medical research data.*
* **🎯 Why Chosen:** Addresses high-consequence medical data risks by detecting protected health information (PHI) and clinical terminology, preventing HIPAA/ethics breaches on the desktop.
* **📊 Maturity & Trust:** `Active Research Release` | ⭐ OpenMed Suite | 🛡️ *Clinical NLP benchmarked for HIPAA PHI safety*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Clinical Researchers, Healthcare Analysts, Medical Writers
* **Problem Solved:** Specialized clinical ingestion skill that detects and redacts Protected Health Information (PHI) and patient identifiers from medical texts before agent processing.
* **Install / Setup:**
  ```bash
  git clone https://github.com/maziyarpanahi/openmed.git && cp -R openmed/skills/deidentifying-clinical-text .agents/skills/
  ```

#### [`Claude Code Hook Redaction Strategy (ruvnet)`](https://gist.github.com/ruvnet/332336ad5e0516daa810d98f8f0ddca9)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Pre-execution hook: Runs automatically on the PreToolUse lifecycle event before bash or file commands execute.*
* **🎯 Why Chosen:** Zero-token client-side defense. Rather than asking an AI to be careful, it uses an OS-level regex sed hook to guarantee API keys and secret tokens never enter conversation logs.
* **📊 Maturity & Trust:** `Verified Architecture` | ⭐ Claude Code Community Gist | 🛡️ *Client-side execution lifecycle hook verified on macOS/Linux*
* **Clients:** Claude Code
* **Target Persona:** Developers, System Administrators, DevOps Engineers
* **Problem Solved:** Utilizes client-side execution hooks to swap out environmental secrets with safe placeholders before tool execution, ensuring raw keys never enter model context.
* **Install / Setup:**
  ```bash
  curl -sL https://gist.githubusercontent.com/ruvnet/332336ad5e0516daa810d98f8f0ddca9/raw -o .claude/hooks/pre-tool-redact.sh && chmod +x .claude/hooks/pre-tool-redact.sh
  ```

#### [`AREX Presidio Anonymize Text (VectorSpaceLab)`](https://github.com/VectorSpaceLab/AREX-Skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Pre-read filter: Invoked before agent ingests enterprise documents or user communications.*
* **🎯 Why Chosen:** Standardized AgentSkills packaging of Presidio NER engine for autonomous agent repositories, with zero-effort integration into Cursor and Antigravity.
* **📊 Maturity & Trust:** `Production Standard` | ⭐ AREX-Skill Repo | 🛡️ *Enterprise repository standard with deterministic NER masking*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Knowledge Workers, Enterprise Staff, Developers
* **Problem Solved:** AgentSkills-compliant anonymization package that scans text buffers for sensitive entities using Microsoft Presidio and replaces them with anonymized tokens.
* **Install / Setup:**
  ```bash
  git clone https://github.com/VectorSpaceLab/AREX-Skill.git && cp -R AREX-Skill/skills/repositories/repo-skills/presidio/sub-skills/anonymize-text .agents/skills/presidio-anonymize
  ```

---

### 2. Which answers can I trust?
*Guarding against blind faith in hallucinated citations, fabricated data points, and unverified factual assertions.*

#### [`Post-Generation Fact-Check (jwynia/agent-skills)`](https://github.com/jwynia/agent-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Post-generation pass: Runs immediately after an initial draft is produced, before any claims are acted on.*
* **🎯 Why Chosen:** Solves the fundamental flaw of models confirming their own hallucinations. Enforces an independent verification pass that queries external ground truth and strictly forbids model memory as evidence.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Agent Skills Library | 🛡️ *Verified multi-step claim extraction and external evidence retrieval*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Writers, Journalists, Researchers
* **Problem Solved:** Forces verification into an independent pass after generation: extracts checkable claims, queries external sources, and rejects model memory as evidence.
* **Install / Setup:**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git && cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)`](https://github.com/CanXiangCC/aminer-open-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Source auditing: Run when reviewing literature reviews, whitepapers, or academic drafts.*
* **🎯 Why Chosen:** Tackles paper-level hallucination. While normal checkers only verify if a paper exists, this skill downloads the actual body and proves whether the paper actually supports the attributed claim.
* **📊 Maturity & Trust:** `Production Active` | ⭐ Aminer Open Skill Ecosystem | 🛡️ *Deep claim-to-passage alignment evaluation*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Academic Researchers, Peer Reviewers, Fact-Checkers
* **Problem Solved:** Fetches cited literature and verifies whether the cited source body actually supports the claim attributed to it, assigning structured verdicts.
* **Install / Setup:**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git && cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`BibRef Verify (yzhao062/agent-config)`](https://github.com/yzhao062/agent-config)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Pre-submission audit: Run on existing .bib files before finalizing academic publications.*
* **🎯 Why Chosen:** Protects academic reputation. Batch checks .bib bibliography files for phantom citations and fabricated DOIs without modifying the original source file, generating a clean audit report.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Academic AgentConfig | 🛡️ *Batch Crossref & Semantic Scholar verification harness*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Grant Writers, Authors
* **Problem Solved:** Audits an existing .bib bibliography for hallucinated references and stale metadata without modifying original files, generating an actionable audit report.
* **Install / Setup:**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`Citation-Check-Skill (open-agent-skills)`](https://github.com/open-agent-skills/citation-check-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Draft review: Triggered on drafts containing web links, DOIs, and cited references.*
* **🎯 Why Chosen:** Directly solves 'phantom citations'—a prevalent flaw where LLMs invent plausible-sounding papers. Queries real bibliographic APIs to verify DOIs and authors.
* **📊 Maturity & Trust:** `Active Open Source` | ⭐ Open Agent Skills Standard | 🛡️ *Live API checks against Crossref & OpenAlex*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Researchers, Policy Analysts, Fact-Checkers
* **Problem Solved:** Extracts citations in generated text, queries cross-reference APIs to verify existence, and flags non-existent DOIs and ghost authors.
* **Install / Setup:**
  ```bash
  git clone https://github.com/open-agent-skills/citation-check-skill.git .agents/skills/citation-check-skill
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Manuscript writing: Active during LaTeX and Markdown drafting sessions.*
* **🎯 Why Chosen:** Created by an active academic scientist (Prof. John Kitchin), specifically catching retracted papers and hallucinated DOIs in scientific literature.
* **📊 Maturity & Trust:** `Mature Academic Tool` | ⭐ Scientific Research Community | 🛡️ *Built by academic faculty for LaTeX/Markdown scientific publishing*
* **Clients:** Claude Code, Emacs, Antigravity
* **Target Persona:** Scientists, Academic Writers, LaTeX/Markdown Users
* **Problem Solved:** Validates bibliography items against Crossref and PubMed records, alerting users to phantom papers or retracted literature.
* **Install / Setup:**
  ```bash
  git clone https://github.com/jkitchin/skillz.git && cp -R skillz/skills/citation-verifier .agents/skills/
  ```

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Article refinement: Triggered during editorial passes of long-form reports or articles.*
* **🎯 Why Chosen:** Editorial-grade rigor. Deconstructs an article draft into atomic factual claims, forces external grounding, and rewrites unsupported statements with epistemic hedging.
* **📊 Maturity & Trust:** `Active Framework` | ⭐ aidd-refine Workflow Suite | 🛡️ *Deconstructive claim-by-claim editorial verification protocol*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Journalists, Long-form Writers, Editors
* **Problem Solved:** Decomposes draft articles into atomic verifiable propositions, forces search grounding, and rewrites unverified statements with epistemic hedging.
* **Install / Setup:**
  ```bash
  git clone https://github.com/aidd-refine/aidd-refine.git && cp -R aidd-refine/skills/05-fact-check .agents/skills/
  ```

#### [`Editorial Fact-Check & Quote Drift Protocol (anotherpanacea)`](https://gist.github.com/anotherpanacea-eng/30f9a6ca309923877f7e70b61e88fd24)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Editorial review: Run on quotes, statistics, and high-stakes factual paragraphs.*
* **🎯 Why Chosen:** Directly targets high-order hallucination vectors that automated scripts miss: Quote Drift (altering quoted language) and Authority Masks (substituting prestige for evidence).
* **📊 Maturity & Trust:** `Battle-Tested Gist` | ⭐ Investigative Journalism Protocol | 🛡️ *Sourced from public GitHub Gist by verified investigative editor*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Journalists, Editors, Fact-Checkers, Analysts
* **Problem Solved:** Implements an intensive two-pass editorial review that flags subtle hallucinations like Quote Drift and Authority Masks.
* **Install / Setup:**
  ```bash
  curl -sL https://gist.githubusercontent.com/anotherpanacea-eng/30f9a6ca309923877f7e70b61e88fd24/raw -o .agents/skills/editorial-fact-check/SKILL.md
  ```

#### [`Hallucination Risk Reviewer (Notysoty/openagentskills)`](https://github.com/Notysoty/openagentskills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Risk triage: Executes a structured claim-level triage before users act on or publish AI output.*
* **🎯 Why Chosen:** Provides an explicit risk-scoring rubric that targets version-specific claims, obscure dates, and exact URLs, preventing propagation of confident falsehoods.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ Open Agent Skills Catalog | 🛡️ *Commit-pinned risk rubric with structured output contract*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Editors, Content Teams, Researchers
* **Problem Solved:** Performs claim-level hallucination-risk triage, scrutinizing citations, URLs, quotes, and version-specific assertions against an explicit consequence rubric.
* **Install / Setup:**
  ```bash
  git clone https://github.com/Notysoty/openagentskills.git && cp -R openagentskills/skills/hallucination-risk-reviewer .agents/skills/
  ```

#### [`Vectara Hallucination Corrector HHEM (vectara)`](https://github.com/vectara/agent-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Automated verification: Evaluates factual consistency against source documents and algorithmically strips ungrounded claims.*
* **🎯 Why Chosen:** Utilizes Vectara's industry-standard HHEM (Hughes Hallucination Evaluation Model). It never invents missing facts—it strictly removes or hedges unsupported claims.
* **📊 Maturity & Trust:** `Production API Integration` | ⭐ Vectara Agent Skills | 🛡️ *Backed by Vectara Hughes Hallucination Evaluation Model*
* **Clients:** Claude Code, Antigravity, Python Agents
* **Target Persona:** Enterprise Analysts, RAG Operators, Researchers
* **Problem Solved:** Evaluates factual consistency of generated text against source documents using HHEM, stripping ungrounded claims rather than guessing.
* **Install / Setup:**
  ```bash
  git clone https://github.com/vectara/agent-skills.git && cp -R agent-skills/skills/hallucination-corrector .agents/skills/
  ```

#### [`K-Dense Scientific Peer Review (K-Dense-AI)`](https://github.com/K-Dense-AI/scientific-agent-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Reasoning audit: Run on scientific proposals, experimental methodology, and statistical inferences.*
* **🎯 Why Chosen:** Brings academic peer-review scrutiny to complex analytical reasoning, testing whether mathematical derivations and empirical conclusions legitimately follow from stated premises.
* **📊 Maturity & Trust:** `Active Research Release` | ⭐ Scientific Agent Skills | 🛡️ *Multi-perspective derivation and statistical validation harness*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Scientists, Peer Reviewers, Quantitative Analysts
* **Problem Solved:** Performs rigorous academic peer-review verification on scientific drafts, validating logical derivation steps and empirical conclusions.
* **Install / Setup:**
  ```bash
  git clone https://github.com/K-Dense-AI/scientific-agent-skills.git && cp -R scientific-agent-skills/skills/peer-review .agents/skills/
  ```

---

### 3. When should I NOT listen to AI?
*Guarding against automation bias, sycophancy, and delegating non-delegable ethical or professional judgments.*

#### [`The Fool (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Decision challenge: Triggered whenever the user is tempted to quickly adopt an AI plan or strategy.*
* **🎯 Why Chosen:** Explicity designed NOT to make decisions, but to shatter premature consensus through pre-mortems, assumption probing, and cognitive-bias scans.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ tech-leads-club Catalog | 🛡️ *Dialectical counterargument and pre-mortem methodology*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Managers, Founders, Strategists, Analysts
* **Problem Solved:** Acts as a deliberate devil's advocate that probes hidden assumptions, dialectical counterarguments, and failure modes to shatter premature consensus.
* **Install / Setup:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`Sycophancy Challenger (mohitagw15856/pm-claude-skills)`](https://github.com/mohitagw15856/pm-claude-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Iterative debate: Enforces anti-appeasement rules whenever you feel the AI is being too agreeable.*
* **🎯 Why Chosen:** Directly cures the pervasive AI sycophancy flaw. Enforces strict anti-appeasement rules: forbids the agent from retreating from a critique merely because the user pushes back.
* **📊 Maturity & Trust:** `Production Active` | ⭐ pm-claude-skills Suite | 🛡️ *Procedural anti-appeasement rules verified in iterative workflows*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Decision Makers, Product Managers, Founders
* **Problem Solved:** Flips the assistant into adversarial mode, forbidding it from softening critiques unless the user provides fresh, dispositive evidence.
* **Install / Setup:**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`Council Review (ngmeyer/council-review)`](https://github.com/ngmeyer/council-review)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *High-stakes crossroads: Use when evaluating major technical, business, or product architecture proposals.*
* **🎯 Why Chosen:** Breaks single-agent tunnel vision. Implements a Diverse Multi-Agent Debate (DMAD) protocol with mandatory Devil's Advocate rounds to prevent groupthink.
* **📊 Maturity & Trust:** `Production Release` | ⭐ Council Review Project | 🛡️ *Diverse Multi-Agent Debate convergence detection*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Product Managers, Software Architects, Strategists
* **Problem Solved:** Implements a Diverse Multi-Agent Debate protocol combining Inversion, Decomposition, and Devil's Advocate passes to shatter single-agent groupthink.
* **Install / Setup:**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Pre-mortem check: Run when user needs a ruthless sparring partner to identify blind spots.*
* **🎯 Why Chosen:** Transforms the agent into an adversarial sparring partner that explicitly attacks user assumptions and exposes sycophancy in AI-generated proposals.
* **📊 Maturity & Trust:** `Production Active` | ⭐ orange2ai Catalog | 🛡️ *Adversarial assumption testing protocol*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Decision Makers, Product Managers, Policy Analysts
* **Problem Solved:** Transforms the agent into an adversarial sparring partner that explicitly attacks user assumptions and identifies blind spots.
* **Install / Setup:**
  ```bash
  git clone https://github.com/orange2ai/devils-advocate-skill.git .agents/skills/devils-advocate
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Stress testing: Spawns an adversarial sub-agent to stress-test proposals across 8 failure modes.*
* **🎯 Why Chosen:** Offers systematic failure-mode testing across eight distinct vectors, preventing users from walking into predictable operational traps.
* **📊 Maturity & Trust:** `Active Framework` | ⭐ mad-skills Ecosystem | 🛡️ *8-dimensional operational failure mode analysis*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Strategists, Writers, System Architects
* **Problem Solved:** Spawns a critical sub-agent to stress-test plans and drafts across 8 distinct failure modes before proposals are committed.
* **Install / Setup:**
  ```bash
  git clone https://github.com/jihlenburg/mad-skills.git && cp -R mad-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Godfly Opposing Counsel (CassioRoos/godfly-skills)`](https://github.com/CassioRoos/godfly-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Irreversible decisions: Generates an Opposing Brief attacking load-bearing assumptions for high-stakes commitments.*
* **🎯 Why Chosen:** Avoids performative contrarianism. Produces a formal Opposing Brief that explicitly names the irreversible costs of the chosen path and outlines how the alternative strategy would fundamentally win.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ Godfly Skills Standard | 🛡️ *Structured adversarial brief protocol for high-stakes decisions*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Executives, Team Leads, System Planners, Legal Counsel
* **Problem Solved:** Generates a structured Opposing Brief for high-stakes decisions by attacking load-bearing assumptions and quantifying irreversible costs.
* **Install / Setup:**
  ```bash
  git clone https://github.com/CassioRoos/godfly-skills.git && cp -R godfly-skills/skills/devils-advocate .agents/skills/godfly-counsel
  ```

#### [`Devil's Advocate Reviewer Agent (Imbad0202)`](https://github.com/Imbad0202/academic-research-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Academic defense: Stress-tests research methodologies and theoretical foundations before journal submission.*
* **🎯 Why Chosen:** Employs strict procedural ladders to prevent the AI from conceding critiques merely due to sustained user argumentation, exposing foundational theoretical flaws.
* **📊 Maturity & Trust:** `Research Release` | ⭐ Academic Research Skills | 🛡️ *Rigorous anti-accommodation ladders for peer critique*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Researchers, PhD Candidates, Academic Authors
* **Problem Solved:** Assumes an adversarial posture to locate logical gaps in research papers, featuring strict rules that prevent conceding critiques to user pressure.
* **Install / Setup:**
  ```bash
  git clone https://github.com/Imbad0202/academic-research-skills.git && cp -R academic-research-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Multi-Perspective Red-Team Review (mohitagw15856)`](https://github.com/mohitagw15856/pm-claude-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Pre-commitment review: Stress-tests proposals through conflicting stakeholder lenses (finance, legal, competitor).*
* **🎯 Why Chosen:** Forces plans through conflicting adversarial personas, ranking blind spots by likelihood × impact and conducting an objective pre-mortem before converting proposals into real commitments.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ pm-claude-skills Suite | 🛡️ *Multi-persona critique with ranked blind spot scoring matrix*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Product Managers, Editors, Team Leads, Strategists
* **Problem Solved:** Stress-tests proposals through multiple deliberately conflicting stakeholder lenses, ranking blind spots by likelihood × impact and running pre-mortems.
* **Install / Setup:**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/red-team-review .agents/skills/red-team-review
  ```

#### [`Devil's Advocate Anti-Sycophancy (molly-diversifiedfun)`](https://github.com/molly-diversifiedfun/claude-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Thinking partner: Engaged when drafting critical essays, strategic plans, or executive briefings.*
* **🎯 Why Chosen:** Encodes an uncompromising anti-sycophancy contract: forbids opening compliments, forbids diluting critiques to appease the user, and enforces mandatory 'Fatal Flaw' identification.
* **📊 Maturity & Trust:** `Commit Pinned` | ⭐ Claude Skills Catalog | 🛡️ *Zero-appeasement anti-sycophancy contract with fatal-flaw requirements*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Executives, Strategists, Authors, Researchers
* **Problem Solved:** Adversarial thinking partner built around pre-mortems and Socratic inquiry, enforcing an explicit anti-sycophancy contract that forbids conversational appeasement.
* **Install / Setup:**
  ```bash
  git clone https://github.com/molly-diversifiedfun/claude-skills.git && cp -R claude-skills/devils-advocate .agents/skills/devils-advocate
  ```

---

### 4. Can the output be published directly?
*Ensuring third-party verifiability, provenance tracking, and explicit publication gates.*

#### [`AI Provenance (noheton/f-ai2-r)`](https://github.com/noheton/f-ai2-r)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Deliverable handoff: Run before submitting reports, articles, or code PRs to colleagues or clients.*
* **🎯 Why Chosen:** Transforms vague disclosures into tamper-evident audits. Records model hashes, verification states, and prompt trails, reserving final validation for human verification.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ f-ai2-r Provenance Framework | 🛡️ *Cryptographic hash tracking and human-confirmed verification ladder*
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Researchers, Journalists, Authors, Developers
* **Problem Solved:** Maintains an immutable provenance record of AI-assisted work (model versions, prompt hashes, verification states) and derives human-readable AI-use disclosures.
* **Install / Setup:**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Publish authorization: Hard stop before any draft or campaign goes live to the public.*
* **🎯 Why Chosen:** Enforces physical separation between generative AI and publishing pipelines. Strips the writing agent of publishing rights, demanding a human PASS/FIX/BLOCK sign-off receipt.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Newsroom & Publishing Teams | 🛡️ *Strict fail-closed gate with human sign-off requirement*
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Editors, Content Teams, Media Creators
* **Problem Solved:** Enforces a strict PASS/FIX/BLOCK gate over drafts. Crucially, the writing agent is forbidden from publishing directly; human authorization is required.
* **Install / Setup:**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)`](https://github.com/harlan-zw/harlan-agent-kit)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Git commit / PR stage: Triggered automatically before pushing pull requests or release notes.*
* **🎯 Why Chosen:** Automates developer integrity. Embeds mandatory AI-assistance disclosure directly into PR bodies, and strictly refuses git submission if the disclosure is altered or bypassed.
* **📊 Maturity & Trust:** `Production Standard` | ⭐ harlan-agent-kit Ecosystem | 🛡️ *Machine-gated PR generation with mandatory transparency clauses*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Open Source Maintainers, Software Engineers, Technical Writers
* **Problem Solved:** Enforces a visible AI-writing disclosure whenever drafting PRs or release notes, refusing to submit if the mandated transparency disclosure is missing.
* **Install / Setup:**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git && cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`awesome-copilot/gdpr-compliant`](https://github.com/awesome-copilot/skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 🧹 Post-Session — *Audit logging: Retains session provenance records for IP and privacy compliance review.*
* **🎯 Why Chosen:** Provides clear intellectual property provenance. Ensures developers and companies can demonstrate exact human vs machine contributions under copyright and GDPR standards.
* **📊 Maturity & Trust:** `Active Production` | ⭐ awesome-copilot Standard | 🛡️ *Audit-ready logging conforming to European data protection standards*
* **Clients:** GitHub Copilot, Claude Code
* **Target Persona:** Software Engineers, Compliance Officers, Legal Auditors
* **Problem Solved:** Enforces audit logging and data provenance records so developers can demonstrate compliance with IP and privacy standards.
* **Install / Setup:**
  ```bash
  git clone https://github.com/awesome-copilot/skills.git && cp -R skills/skills/gdpr-compliant .agents/skills/
  ```

#### [`Publish Prep Review (45ck/content-machine)`](https://github.com/45ck/content-machine)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Pre-upload gate: Blocks public release unless final artifacts, script citations, and rights metadata pass check.*
* **🎯 Why Chosen:** Implements an explicit 'fail-closed' gate. Fails publication readiness whenever source rights evidence is absent or AI-generated assets lack verifiable workflow and model hashes.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ content-machine Harness | 🛡️ *Fail-closed public readiness check with asset-level provenance ledger*
* **Clients:** Claude Code, Antigravity, Codex CLI
* **Target Persona:** Content Creators, Editors, Media Production Teams
* **Problem Solved:** Gates finalized content before human upload review, verifying final artifacts, scripts, publishing metadata, and asset provenance against a fail-closed policy.
* **Install / Setup:**
  ```bash
  git clone https://github.com/45ck/content-machine.git && cp -R content-machine/skills/publish-prep-review .agents/skills/
  ```

#### [`AI Attribution Framework (ismet55555)`](https://github.com/ismet55555/ai-attribution)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Attribution ledger: Updates local AI_ATTRIBUTION.md whenever substantive logic or text is produced.*
* **🎯 Why Chosen:** Replaces crude all-or-nothing disclaimers with a standardized 6-level creative control spectrum, enabling third parties to understand exactly what the human did vs what the AI suggested.
* **📊 Maturity & Trust:** `Active Open Specification` | ⭐ AI Attribution Standard | 🛡️ *Standardized 6-level human-AI contribution spectrum ledger*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Software Engineers, Authors, Technical Writers
* **Problem Solved:** Establishes a six-level creative control spectrum stored in a local AI_ATTRIBUTION.md file, precisely logging whether AI dictated architecture or merely assisted.
* **Install / Setup:**
  ```bash
  curl -sL https://raw.githubusercontent.com/ismet55555/ai-attribution/main/AI_ATTRIBUTION.md -o AI_ATTRIBUTION.md
  ```

#### [`AI Disclosure Convention SPDX-style (ggfevans)`](https://github.com/ggfevans/ai-disclosure)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Header tagging: Injects machine-readable SPDX-style tags directly into code comments or document frontmatter.*
* **🎯 Why Chosen:** Survives git rebases and file refactors. Injects lightweight, machine-readable W3C AI Content Disclosure tags directly into file headers, making attribution permanent and verifiable.
* **📊 Maturity & Trust:** `Active Specification` | ⭐ W3C-aligned Convention | 🛡️ *Language-agnostic file-level attribution convention based on W3C vocabularies*
* **Clients:** Cursor, Antigravity, Claude Code, Copilot
* **Target Persona:** Developers, Authors, Compliance Officers
* **Problem Solved:** Embeds lightweight, machine-readable AI Content Disclosure tags into file header comments, ensuring provenance data survives git rebases.
* **Install / Setup:**
  ```bash
  git clone https://github.com/ggfevans/ai-disclosure.git .agents/skills/ai-disclosure
  ```

#### [`Skill Provenance Tracker (snapsynapse)`](https://github.com/snapsynapse/skill-provenance)
* **Type:** `SKILL.md`
* **Workflow Timing:** 🧹 Post-Session — *Session logging: Tracks exact skill versions, tool calls, and model seeds across multi-turn sessions.*
* **🎯 Why Chosen:** Provides cryptographic traceability for complex agent executions, producing verifiable execution receipts that prove which skills touched what data.
* **📊 Maturity & Trust:** `Production Active` | ⭐ snapsynapse Framework | 🛡️ *Cryptographic execution and invocation ledger*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Auditors, Enterprise Researchers, System Architects
* **Problem Solved:** Tracks skill versions, invocation contexts, and data flow across agent sessions, generating tamper-evident execution receipts for compliance review.
* **Install / Setup:**
  ```bash
  git clone https://github.com/snapsynapse/skill-provenance.git .agents/skills/skill-provenance
  ```

#### [`Claude Code Session Audit Protocol (lghupan)`](https://gist.github.com/lghupan/46d65f4035481ef6058d0e895bdeb73a)
* **Type:** `SKILL.md`
* **Workflow Timing:** 🧹 Post-Session — *Session cleanup & export: Extracts structured interaction transcripts and creates human-auditable session logs.*
* **🎯 Why Chosen:** Allows everyday users to retain verifiable session prompt records without saving gigabytes of raw tokens, generating concise audit summaries ready for peer review.
* **📊 Maturity & Trust:** `Verified Protocol Gist` | ⭐ Claude Code Community | 🛡️ *Public GitHub Gist tested on macOS/Linux session transcript extraction*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Researchers, Knowledge Workers, Professional Writers
* **Problem Solved:** Extracts structured session transcripts and prompt history from agent storage, creating human-auditable session receipts for verifiable publication.
* **Install / Setup:**
  ```bash
  curl -sL https://gist.githubusercontent.com/lghupan/46d65f4035481ef6058d0e895bdeb73a/raw -o .agents/skills/session-audit/SKILL.md
  ```

---

## 🛑 Non-Delegable Red Lines

Under no circumstances should the following decisions be blindly delegated to AI:
* **Medical diagnosis & prescription decisions** without qualified practitioner review.
* **Legal compliance sign-offs** and binding contractual agreements.
* **Final personnel evaluations**, hiring rejections, and disciplinary actions.
* **Sole-source reporting**: Publishing journalistic claims based solely on an LLM response without primary source verification.

---

## 🤝 Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.

## 📄 License

[MIT](LICENSE) © 2026 Responsible AI Use Contributors
