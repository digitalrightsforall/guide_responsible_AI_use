# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated collection of 26 production-ready `SKILL.md` packages and verified prompt protocols designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.

**English** | [中文版](README_CN.md)

---

## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)

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
* **🎯 Why Chosen:** A zero-configuration, battle-tested tool for cross-document PII scrubbing that automatically detects personal data patterns without needing enterprise gateway setup.
* **📊 Maturity & Trust:** `Active Open Source` | ⭐ GitHub Community | 🛡️ *Verified cross-platform document parsing logic*
* **Clients:** Claude Code, Antigravity, Open Agent standard
* **Target Persona:** Legal & Financial Analysts, Knowledge Workers
* **Problem Solved:** Automatically detects personal identifiable information (names, emails, phones, SSNs) across files (.txt, .md, .pdf, .docx) before agent processing, replacing them with synthetic placeholders and restoring them locally.
* **Install / Setup:**
  ```bash
  git clone https://github.com/gregmos/PII-Shield .claude/skills/pii-shield
  ```

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Real-time prompt drafting: Protects credentials and contact strings during conversational tasks.*
* **🎯 Why Chosen:** Maintains an ephemeral, memory-safe de-identification lookup table on local disk so sensitive user entities never travel into the cloud provider's training corpus.
* **📊 Maturity & Trust:** `Stable Module` | ⭐ Mode.io Skill Registry | 🛡️ *Standardized AgentSkills metadata structure*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Customer Support Teams, Product Operations
* **Problem Solved:** Identifies sensitive business credentials and customer contact details in prompt context, maintaining an ephemeral de-identification lookup table on local storage.
* **Install / Setup:**
  ```bash
  # Place privacy-protector/SKILL.md inside your agent skills directory
  ```

#### [`Anonymize Documents with Presidio`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **Type:** `SKILL.md`
* **Workflow Timing:** ⏳ Pre-Input — *Pre-upload pipeline: Process interview recordings and qualitative research before passing text to cloud APIs.*
* **🎯 Why Chosen:** Builds upon Microsoft Presidio's industrial-grade NLP entity recognition engine, delivering deterministic anonymization without sending raw texts to any external server.
* **📊 Maturity & Trust:** `Production Tooling` | ⭐ 100+ GitHub Stars | 🛡️ *Backed by Microsoft Presidio NLP core*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Qualitative Researchers, Medical Administrators, HR
* **Problem Solved:** Leverages Microsoft Presidio locally to scrub participant names, locations, and organizations before feeding transcripts to cloud LLMs.
* **Install / Setup:**
  ```bash
  git clone https://github.com/schneidermichael/anonymize-documents-with-presidio .agents/skills/presidio
  ```

#### `Pre-Input PII Sanitizer Prompt`
* **Type:** `Prompt`
* **Workflow Timing:** ⏳ Pre-Input — *Zero-tool fallback: Use directly in web chats (ChatGPT/Claude.ai) before pasting confidential drafts.*
* **🎯 Why Chosen:** Designed for everyday non-technical users without CLI agents. Employs a strict two-stage masking workflow so subsequent analytical turns only see pseudonymized entities.
* **📊 Maturity & Trust:** `Battle-tested Template` | ⭐ Universal Web UI | 🛡️ *Practitioner community consensus prompt*
* **Clients:** Universal Web Chat, ChatGPT, Claude.ai, Gemini, Open WebUI
* **Target Persona:** Everyday Web Chat Users, Non-technical Professionals
* **Problem Solved:** A two-stage prompting technique that forces the model to redact private entities first before performing substantive analysis.
* **Prompt Template:**
  ```text
  You are an expert privacy officer and data sanitization assistant.
  I am going to provide a raw draft text.
  Your ONLY task is to return a sanitized version of the text where:
  1. All human names are replaced with brackets like [Person A], [Person B].
  2. All specific organizational names, emails, phone numbers, and physical addresses are replaced with [Organization X], [Email redacted], [Location Y].
  3. All monetary figures and specific account numbers are replaced with [Amount A], [Account Z].
  
  Do NOT summarize, analyze, or interpret the text yet. Return ONLY the sanitized version and a private mapping table so I can verify.
  ```

---

### 2. Which answers can I trust?
*Guarding against blind faith in hallucinated citations, fabricated data points, and unverified factual assertions.*

#### [`Post-Generation Fact-Check (jwynia/agent-skills)`](https://github.com/jwynia/agent-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Immediately after draft generation: Must run as a distinct second pass before taking the response as fact.*
* **🎯 Why Chosen:** Directly attacks epistemic complacency. Mandates a separate audit pass that extracts factual claims and queries external web evidence, explicitly banning reliance on model memory.
* **📊 Maturity & Trust:** `Stable Skill` | ⭐ AgentSkills Standard | 🛡️ *Peer-reviewed procedural verification methodology*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Journalists, Researchers
* **Problem Solved:** Forces verification into a separate pass after generation: extracts every checkable claim, queries external sources, and marks statements as confirmed, contradicted, or unverified.
* **Install / Setup:**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git && cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)`](https://github.com/CanXiangCC/aminer-open-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Reference validation pass: Run when an AI generates claims supported by external citations.*
* **🎯 Why Chosen:** Solves the insidious problem of 'hallucinated attribution'—where a real paper exists, but its text does not actually support the AI's assertion.
* **📊 Maturity & Trust:** `Production v1.1` | ⭐ AMiner Academic Suite | 🛡️ *Maintained by AMiner open academic ecosystem*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Academic Researchers, Peer Reviewers, Journalists
* **Problem Solved:** Goes beyond checking if a source exists: fetches cited papers and verifies whether the cited text actually supports the claim attributed to it (SUPPORTED, NOT_IN_SOURCE, etc.).
* **Install / Setup:**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git && cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`BibRef Verify (yzhao062/agent-config)`](https://github.com/yzhao062/agent-config)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Draft bibliography audit: Run against .bib or reference files before finalizing academic text.*
* **🎯 Why Chosen:** Prevents catastrophic academic embarrassment. Cross-checks bibtex entries with CrossRef and Semantic Scholar to catch fake authors and phantom DOIs.
* **📊 Maturity & Trust:** `Active Release` | ⭐ Research Lab Utility | 🛡️ *Directly integrated with Semantic Scholar & CrossRef APIs*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Grant Writers, Paper Authors
* **Problem Solved:** Audits an existing .bib bibliography for fabricated references and stale metadata using web search and Semantic Scholar, outputting a structured REFERENCE-CHECK.md audit report.
* **Install / Setup:**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`Citation-Check-Skill (open-agent-skills)`](https://github.com/open-agent-skills/citation-check-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Desktop research review: Use while generating reports that cite external publications.*
* **🎯 Why Chosen:** A lightweight, modular skill following the Open Agent standard to ensure every citation has a live DOI before writing it into persistent research notes.
* **📊 Maturity & Trust:** `Community Standard` | ⭐ Open Agent Skills Org | 🛡️ *Standardized cross-client skill layout*
* **Clients:** Claude Code, Antigravity, Open Agent standard
* **Target Persona:** Researchers, Academics, Policy Analysts
* **Problem Solved:** Parses citations and references in generated text, queries cross-reference APIs (Crossref, Semantic Scholar) to verify existence, and flags non-existent DOIs.
* **Install / Setup:**
  ```bash
  cp -r citation-check-skill ~/.claude/skills/
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Scientific manuscript preparation: Validates citations within LaTeX, Org-mode, or Markdown.*
* **🎯 Why Chosen:** Authored by an active computational scientist (Prof. John Kitchin) for real publishing workflows, actively filtering retracted papers and dead references.
* **📊 Maturity & Trust:** `Active Tooling` | ⭐ jkitchin Scientific Ecosystem | 🛡️ *Developed by university faculty for reproducible research*
* **Clients:** Claude Code, Emacs, Antigravity
* **Target Persona:** Scientists, Academic Writers (LaTeX, Markdown)
* **Problem Solved:** Automatically validates bibliography items against Crossref and PubMed records, alerting users to phantom papers or retracted literature.
* **Install / Setup:**
  ```bash
  # Place citation-verifier inside .claude/skills/ or run via skillz
  ```

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Journalistic refinement: Deconstructs article drafts into verifiable claim units.*
* **🎯 Why Chosen:** Forces hedging on unverified claims rather than letting the AI present unproven hypotheses with confident journalistic prose.
* **📊 Maturity & Trust:** `Production Pipeline` | ⭐ AIDD Refine System | 🛡️ *Designed specifically for professional publishing workflows*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Journalists, Fact-Checkers, Content Creators
* **Problem Solved:** Decomposes draft text into discrete factual claims, forces multi-source web verification, and rewrites unverified statements with epistemic hedging.
* **Install / Setup:**
  ```bash
  # Install via aidd-refine skill bundle
  ```

#### `Editorial Fact-Check & Quote Drift Protocol`
* **Type:** `Prompt`
* **Workflow Timing:** 💬 During-Chat — *Copy-edit review: Apply after generating feature articles or investigative texts.*
* **🎯 Why Chosen:** Unpacks subtle journalistic hallucination types (Quote Drift and Authority Masks) that automated tools often miss, giving humans a practical auditing checklist.
* **📊 Maturity & Trust:** `Editorial Gist Standard` | ⭐ Newsroom Practice | 🛡️ *Sourced from investigative journalistic editing standards*
* **Clients:** Universal Web Chat, ChatGPT, Claude.ai, Gemini
* **Target Persona:** Journalists, Editors, Copywriters
* **Problem Solved:** A two-pass journalistic editorial review designed to catch advanced hallucinations such as Quote Drift (altering quoted words) and Authority Masks.
* **Prompt Template:**
  ```text
  Perform a two-pass editorial fact-check on the provided text.
  Pass A: Claim Verification
  For every quote, statistic, or cited fact, output a structured table with: Location (line/paragraph), Claim Type, The Exact Claim, and a Status (CRITICAL, SUPPORTED, or PASSING).
  Pass B: Editorial Flags (Apply only after Pass A)
  Analyze the text for the following advanced errors:
  * Ghost Citation: The source cannot be found.
  * Citation Identity Drift: The underlying source exists, but the identifiers are mismatched.
  * Quote Drift: The quoted language does not match the source exactly, altering meaning.
  * Paraphrase Inflation: The draft makes a stronger claim than the original source supports.
  * Authority Mask: The prestige of the cited source is doing the rhetorical work, but the citation adds no empirical evidence.
  ```

#### `Epistemic Humility & Evidence Tagging Prompt`
* **Type:** `Prompt`
* **Workflow Timing:** 💬 During-Chat — *Prompt prefix: Prepend to research inquiries in any standard chat window.*
* **🎯 Why Chosen:** A zero-tool cognitive intervention that forces the model to label every claim as [VERIFIED], [INFERENCE], or [UNVERIFIED], instantly dampening overconfidence.
* **📊 Maturity & Trust:** `Universal Method` | ⭐ Widely Cited Community Pattern | 🛡️ *Philosophical & epistemic prompting standard*
* **Clients:** Universal Web Chat, ChatGPT, Claude.ai, Gemini
* **Target Persona:** Desktop Researchers, Students, Knowledge Workers
* **Problem Solved:** Forces the model to tag every assertion as [VERIFIED], [INFERENCE], or [UNVERIFIED], suppressing hallucinated certainty.
* **Prompt Template:**
  ```text
  Please answer my inquiry with strict epistemic humility and evidentiary tagging.
  Adhere to these rules:
  1. For every assertion, append one of three tags:
     - [VERIFIED: Source name / link] - If you have high confidence based on established consensus or verifiable documentation.
     - [INFERENCE] - If the statement is a logical deduction rather than an empirical fact.
     - [UNVERIFIED / HYPOTHESIS] - If the assertion lacks authoritative grounding or is subject to ongoing debate.
  2. If any piece of information cannot be verified, state "I do not have verified evidence for this point" rather than guessing.
  ```

---

### 3. When should I NOT listen to AI?
*Guarding against automation bias, sycophancy, and delegating non-delegable ethical or professional judgments.*

#### [`The Fool (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Decision checkpoint: Invoke right before committing to an AI-assisted plan or strategic choice.*
* **🎯 Why Chosen:** Explicitly refuses to make decisions or offer false comfort. Designed solely to challenge assumptions, execute pre-mortems, and shatter premature consensus.
* **📊 Maturity & Trust:** `Production v2.0` | ⭐ Tech Leads Club Catalog | 🛡️ *Comprehensive behavioral rules with cognitive-bias scan*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Managers, Researchers, Founders, Strategic Planners
* **Problem Solved:** A dedicated decision challenger that explicitly refuses to make decisions. Executes assumption probing, dialectical counterarguments, pre-mortems, and cognitive-bias scans to shatter premature consensus.
* **Install / Setup:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`Sycophancy Challenger (mohitagw15856/pm-claude-skills)`](https://github.com/mohitagw15856/pm-claude-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Brainstorming & argument evaluation: Use when an AI seems too agreeable with your hypotheses.*
* **🎯 Why Chosen:** Addresses persistent AI sycophancy. Enforces anti-appeasement rules that forbid the agent from softening critiques merely because the user expresses displeasure or pushback.
* **📊 Maturity & Trust:** `Active Stable` | ⭐ PM Skills Repository | 🛡️ *Verified anti-accommodation procedural ladders*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Decision Makers, Product Managers, Founders
* **Problem Solved:** Flips the agent from agreement to adversarial critique. Enforces anti-sycophancy rules: forbids retreating from a critique unless the user provides fresh, dispositive evidence.
* **Install / Setup:**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`Council Review (ngmeyer/council-review)`](https://github.com/ngmeyer/council-review)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Major architectural or policy review: Use to simulate multi-stakeholder debate before finalizing proposals.*
* **🎯 Why Chosen:** Implements empirical Diverse Multi-Agent Debate (DMAD) using Inversion and Analogy to break single-agent groupthink, proven to increase failure detection.
* **📊 Maturity & Trust:** `Open Source Release` | ⭐ Council Review Org | 🛡️ *Based on empirical multi-agent debate research*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Product Managers, Strategists, Software Architects
* **Problem Solved:** Implements a Diverse Multi-Agent Debate (DMAD) protocol combining Inversion, Decomposition, Analogy, and a mandatory Devil's Advocate pass to shatter single-agent groupthink.
* **Install / Setup:**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Post-proposal generation: Instantly trigger an adversarial pass on your draft.*
* **🎯 Why Chosen:** A zero-flattery critical sparring partner that challenges baseline premises without fabricating artificial doubt, keeping users grounded.
* **📊 Maturity & Trust:** `Community Skill` | ⭐ orange2ai Collection | 🛡️ *Clean unsparing critic behavioral contract*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Decision Makers, Policy Analysts, Product Leads
* **Problem Solved:** Transforms the agent into an unsparing critic that attacks user assumptions, identifies hidden blind spots, and counteracts AI sycophancy.
* **Install / Setup:**
  ```bash
  git clone https://github.com/orange2ai/devils-advocate-skill .claude/skills/devils-advocate
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 💬 During-Chat — *Pre-commitment stress test: Subagent audit across 8 distinct failure modes.*
* **🎯 Why Chosen:** Isolates the devil's advocate role into a dedicated subagent so that the primary conversation's collaborative context is not polluted by debate noise.
* **📊 Maturity & Trust:** `Active Repository` | ⭐ mad-skills Toolkit | 🛡️ *Subagent isolation architecture*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Strategists, Writers, Project Leads
* **Problem Solved:** Spawns an adversarial sub-agent to stress-test plans and drafts across 8 distinct failure modes before finalization.
* **Install / Setup:**
  ```bash
  # Place devils-advocate inside .claude/skills/ from mad-skills
  ```

#### `The Over-Reliance Interrogator Prompt`
* **Type:** `Prompt`
* **Workflow Timing:** 💬 During-Chat — *Sanity check: Prompt the model immediately after receiving an overly polished recommendation.*
* **🎯 Why Chosen:** Forces the model to step outside its advisor persona and delineate the exact legal, ethical, and situational boundaries that humans must never offload.
* **📊 Maturity & Trust:** `Universal Pattern` | ⭐ Widely Used Prompt Template | 🛡️ *Derived from cognitive automation-bias mitigation research*
* **Clients:** Universal Web Chat, ChatGPT, Claude.ai, Gemini
* **Target Persona:** Professionals evaluating high-stakes advice
* **Problem Solved:** Demands the AI to step out of the advisor role and interrogate its own proposal for hidden assumptions and non-delegable responsibilities.
* **Prompt Template:**
  ```text
  You just provided the recommendation above. Now, step out of the advisor role and act as an independent, skeptical auditor.
  Answer these three questions honestly:
  1. Under what specific conditions or edge cases will this advice completely fail?
  2. What hidden assumptions have you made that I, as the human, must personally verify before acting?
  3. What ethical, legal, or contextual responsibilities cannot be delegated to an AI in this decision?
  ```

---

### 4. Can the output be published directly?
*Ensuring third-party verifiability, provenance tracking, and explicit publication gates.*

#### [`AI Provenance (noheton/f-ai2-r)`](https://github.com/noheton/f-ai2-r)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Artifact handoff & verification packaging: Generates audit trails and verifiable receipts for third parties.*
* **🎯 Why Chosen:** Directly serves third-party verifiability. Automatically logs model hashes, prompt history, and tool actions into an immutable ledger, giving recipients the exact keys to verify results.
* **📊 Maturity & Trust:** `Production Core` | ⭐ f-ai2-r Project | 🛡️ *Deterministic cryptographic hashing & local provenance logging*
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Researchers, Journalists, Authors, Developers
* **Problem Solved:** Maintains an immutable provenance record of AI-assisted work (model versions, prompt hashes, verification states) and derives human-readable AI-use disclosures.
* **Install / Setup:**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Release gate: Physical permission separation before any content is published externally.*
* **🎯 Why Chosen:** Solves the fatal flaw of autonomous publication. The drafting agent is physically prohibited from publishing; an external human verification receipt is mandatory.
* **📊 Maturity & Trust:** `Production Workflow v0.7.1` | ⭐ Editorial Team Standard | 🛡️ *Strict separation of drafting vs. publishing authorization*
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Editors, Publishing Teams, Newsrooms
* **Problem Solved:** Enforces a strict PASS/FIX/BLOCK gate over drafts. Crucially, the writing/QA agent is forbidden from publishing directly; separate human authorization is required.
* **Install / Setup:**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)`](https://github.com/harlan-zw/harlan-agent-kit)
* **Type:** `SKILL.md`
* **Workflow Timing:** 📤 Pre-Handoff — *Code & documentation submission: Ensures pull requests explicitly declare AI contribution.*
* **🎯 Why Chosen:** Transforms ethical disclosure into an automated CI/CD-style condition: if the required disclosure section is removed or disguised, the tool refuses to submit.
* **📊 Maturity & Trust:** `Production Kit` | ⭐ harlan-agent-kit Suite | 🛡️ *Enforced via GitHub CLI / git pre-push contracts*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Open Source Maintainers, Technical Writers, Developers
* **Problem Solved:** Enforces a visible AI-writing disclosure whenever drafting release notes or PRs. The agent strictly refuses to submit or publish if the mandated disclosure is missing or altered.
* **Install / Setup:**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git && cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`awesome-copilot/gdpr-compliant`](https://github.com/awesome-copilot/skills)
* **Type:** `SKILL.md`
* **Workflow Timing:** 🧹 Post-Session — *Session wrap-up & compliance audit: Run to archive prompts and verify IP cleanliness.*
* **🎯 Why Chosen:** Maintains persistent audit logs of code generation provenance, allowing teams and individuals to prove clean IP lineage during external reviews.
* **📊 Maturity & Trust:** `Community Collection` | ⭐ Awesome Copilot Skills | 🛡️ *Verified data retention & attribution audit templates*
* **Clients:** GitHub Copilot, Claude Code
* **Target Persona:** Software Developers, Compliance Officers
* **Problem Solved:** Enforces audit logging and data provenance records so developers can demonstrate compliance with IP and data retention rules.
* **Install / Setup:**
  ```bash
  # Install via awesome-copilot skills collection
  ```

#### `Third-Party Verifiability & Disclosure Generator`
* **Type:** `Prompt`
* **Workflow Timing:** 📤 Pre-Handoff — *Deliverable packaging: Use right before sending an AI-assisted report, article, or thesis to clients/readers.*
* **🎯 Why Chosen:** Moves beyond ritualistic disclaimers to true verifiability. Generates a clear audit brief detailing which data points were human-verified and where the recipient can check primary sources.
* **📊 Maturity & Trust:** `Production Prompt Standard` | ⭐ Universal Practice | 🛡️ *Synthesizes third-party verifiability and human attestation best practices*
* **Clients:** Universal Web Chat, ChatGPT, Claude.ai, Gemini
* **Target Persona:** Academics, Researchers, Corporate Writers, Students
* **Problem Solved:** Interactive questionnaire that formulates a transparent, verifiable AI Disclosure Brief for third-party auditing.
* **Prompt Template:**
  ```text
  I have used AI assistance while preparing my document. Generate an honest, professional AI Disclosure Statement suitable for inclusion in an academic appendix, corporate report, or article footnote.
  
  Please ask me the following questions one by one, then formulate the statement:
  1. Which AI tool and model version were used? (e.g., Claude 3.7 Sonnet, ChatGPT-4o)
  2. For which specific tasks was AI employed? (e.g., brainstorming, proofreading, code generation, translation, literature scanning)
  3. What substantive portions were written entirely by humans?
  4. What human verification steps were performed on the AI output?
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
