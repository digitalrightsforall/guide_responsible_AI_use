# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated collection of production-ready `SKILL.md` packages and structured prompts designed to help everyday knowledge workers, researchers, writers, and professionals interact with AI safely, factually, and accountably.

---

## 💡 Why "Responsible AI Use" != "Traditional Responsible AI"

Most "Responsible AI" resources are written for **model developers and enterprise policy teams**: they discuss algorithmic fairness, model weights, red-teaming benchmarks, and compliance audits.

However, once AI becomes an everyday utility on your desktop, a different set of practical questions arises:

| Dimension | Traditional Responsible AI | Responsible AI Use (This Project) |
| :--- | :--- | :--- |
| **Core Subject** | Model developers, deployment institutions, regulators | **Everyday users, knowledge workers, professionals** |
| **Core Object** | AI system architecture & model weights | **Human–AI interaction & daily practice** |
| **Typical Questions** | Is the model fair? How to audit the company? | **What can I feed to AI? Which answers can I trust? When should I NOT listen to AI? Can output be published directly?** |
| **Governance Means** | Corporate policies, ISO standards, algorithmic audits | **Skills (`SKILL.md`), sensible defaults, checklists, verification prompts** |
| **Responsibility Direction** | "Do not build or deploy harmful AI" | **"Do not use AI in an irresponsible or reckless manner"** |
| **Risk Bearer** | Society at large, generic end-users | **Yourself + the people impacted by your own AI-assisted work** |

---

## 📦 Client Installation Standard (Where do Skills live?)

According to the open Agent Skills specification:
* **Cursor / Google Antigravity:** `.agents/skills/<skill-name>/SKILL.md`
* **Claude Code:** `.claude/skills/<skill-name>/SKILL.md`

Always copy the **entire skill directory** (including bundled scripts and references) rather than merely copying `SKILL.md`.

---

## 🧭 The Four Practical Questions

* [1. What can I feed to AI? (我能把什么给 AI？)](#1-what-can-i-feed-to-ai)
* [2. Which answers can I trust? (哪些回答能信？)](#2-which-answers-can-i-trust)
* [3. When should I NOT listen to AI? (什么时候不能听 AI？)](#3-when-should-i-not-listen-to-ai)
* [4. Can the output be published directly? (输出能不能直接发布？)](#4-can-the-output-be-published-directly)
* [⚡ The 30-Second Pre-flight Checklist](#-the-30-second-pre-flight-checklist)

---

### 1. What can I feed to AI?
*Guarding against unintentional leaks of personal identity (PII), confidential client data, and proprietary drafts.*

#### [`pii-safe-documents`](https://github.com/danyuchn/pii-guard)
* **Type:** `SKILL.md`
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** General Knowledge Workers, Researchers, Journalists, Analysts
* **Problem Solved:** Creates a reversible, locally redacted working copy while treating the main cloud-connected agent as untrusted for raw data. It prohibits the main agent from opening, searching, or uploading original private documents.
* **Install:**
  ```bash
  git clone https://github.com/danyuchn/pii-guard.git
  cp -R pii-guard/.agents/skills/pii-safe-documents .agents/skills/
  ```

#### [`scholar-safety`](https://github.com/joshzyj/open-scholar-skill)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Qualitative Researchers, IRB/HIPAA Data Custodians
* **Problem Solved:** Runs a local pre-ingestion sensitivity scan before files are read into model context. Gates IRB/HIPAA-protected data and offers local-only Bash analysis without transmitting raw data upstream.
* **Install:**
  ```bash
  git clone https://github.com/joshzyj/open-scholar-skill.git
  cp -R open-scholar-skill/.claude/skills/scholar-safety ~/.claude/skills/
  ```

#### [`skill-sanitizer`](https://github.com/cyberxuan-XBX/skill-sanitizer)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Software Engineers, System Administrators
* **Problem Solved:** Acts as a local meta-security scanner that intercepts incoming third-party `SKILL.md` files and inspects them for hidden prompt injections, suspicious bash operations, and exfiltration payloads before execution.
* **Install:**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII-Shield`](https://github.com/gregmos/PII-Shield)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Open Agent standard
* **Target Persona:** General Knowledge Workers, Legal & Financial Analysts
* **Problem Solved:** Automatically scans documents (.txt, .md, .pdf, .docx) before agent processing, replaces personal identifiable information (names, emails, phones, SSNs) with synthetic placeholders, and restores them locally upon task completion.

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers handling customer support or user feedback
* **Problem Solved:** Identifies sensitive business credentials and customer contact details in prompt context, maintaining an ephemeral de-identification lookup table on local storage.

#### [`anonymize-documents-with-presidio`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Researchers handling interview transcripts and qualitative surveys
* **Problem Solved:** Leverages Microsoft Presidio locally to scrub participant names, locations, and organizations before feeding transcripts to cloud LLMs.

#### `[Prompt Fallback] Pre-Input PII Sanitizer`
* **Type:** `Prompt`
* **Clients:** Universal Web Chat (ChatGPT, Claude.ai, Gemini, Open WebUI)
* **Target Persona:** Users without agent/CLI installations
* **Problem Solved:** Guides the LLM to assist in sanitizing raw text in a two-stage local draft without sending private entities in the subsequent analytical prompt.
* **Prompt:**
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
*Guarding against hallucinated citations, fabricated data points, and fictitious claims.*

#### [`post-generation-fact-check`](https://github.com/jwynia/agent-skills)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Writers, Journalists, Researchers
* **Problem Solved:** Forces verification into an independent pass after generation: extracts every checkable claim, queries external sources, and marks statements as confirmed, contradicted, or unverified. Crucially, model memory is never accepted as evidence.
* **Install:**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git
  cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`citation-faithfulness`](https://github.com/CanXiangCC/aminer-open-skill)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Academic Researchers, Peer Reviewers, Evidence-focused Journalists
* **Problem Solved:** Goes beyond checking whether a citation exists; fetches the cited paper and verifies whether the cited source's body actually supports the claim attributed to it, assigning structured verdicts (`SUPPORTED`, `PARTIALLY_SUPPORTED`, `NOT_IN_SOURCE`).
* **Install:**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git
  cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`bibref-verify`](https://github.com/yzhao062/agent-config)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Grant Writers, Paper Authors
* **Problem Solved:** Audits an existing `.bib` bibliography for hallucinated references and stale metadata without modifying the original file, generating an actionable `REFERENCE-CHECK.md` audit report.
* **Install:**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git
  cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`citation-check-skill`](https://github.com/open-agent-skills/citation-check-skill)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Open Agent standard
* **Target Persona:** Researchers, Academics, Policy Analysts
* **Problem Solved:** Parses citations and references in generated text, queries cross-reference APIs (Crossref, Semantic Scholar) to verify existence, and flags non-existent DOIs.

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Emacs, Antigravity
* **Target Persona:** Scientists, Academic Writers (LaTeX, Markdown)
* **Problem Solved:** Automatically validates bibliography items against Crossref and PubMed records, alerting users to phantom papers or retracted literature.

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Journalists, Content Creators, Fact-Checkers
* **Problem Solved:** Decomposes an article draft into discrete verifiable factual propositions, forces independent search grounding, and rewrites unverified statements with explicit epistemic hedging.

#### `[Prompt Fallback] Editorial Fact-Check & Quote Drift Protocol`
* **Type:** `Prompt`
* **Clients:** Universal Web Chat (ChatGPT, Claude, Gemini)
* **Target Persona:** Journalists, Editors, Copywriters
* **Problem Solved:** A two-pass editorial fact-check designed to catch subtle hallucinations like "Quote Drift" (altering quoted words) and "Authority Masks" (substituting prestige for evidence).
* **Prompt:**
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

#### `[Prompt Fallback] Epistemic Humility & Claim Tagging`
* **Type:** `Prompt`
* **Clients:** Universal Web Chat
* **Target Persona:** General Knowledge Workers performing desktop research
* **Problem Solved:** Prevents overconfident AI responses by forcing epistemic tagging on every factual assertion.

---

### 3. When should I NOT listen to AI?
*Guarding against automation bias, sycophancy, and delegating non-delegable ethical judgments.*

#### [`the-fool`](https://github.com/tech-leads-club/agent-skills)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Managers, Researchers, Analysts, Founders, Knowledge Workers
* **Problem Solved:** Exists specifically to challenge rather than make decisions. It steelmans the proposal and then runs assumption probing, dialectical counterarguments, pre-mortems, and cognitive-bias scans to shatter premature consensus.
* **Install:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git
  cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`sycophancy-challenger`](https://github.com/mohitagw15856/pm-claude-skills)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Decision Makers, Managers, Founders, Researchers
* **Problem Solved:** Flips the assistant from agreement to adversarial critique. Enforces strict anti-appeasement rules: forbids retreating from a critique unless the user provides fresh, dispositive evidence.
* **Install:**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git
  cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`council-review-dmad`](https://github.com/ngmeyer/council-review)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Product Managers, Strategists, Software Architects
* **Problem Solved:** Implements a Diverse Multi-Agent Debate (DMAD) protocol combining Inversion, Decomposition, Analogy, and a mandatory Devil's Advocate pass to shatter single-agent groupthink.
* **Install:**
  ```bash
  curl -L https://raw.githubusercontent.com/ngmeyer/council-review/main/SKILL.md -o .claude/skills/council-review.md
  ```

#### [`orange2ai/devils-advocate-skill`](https://github.com/orange2ai/devils-advocate-skill)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Decision Makers, Product Managers, Policy Analysts
* **Problem Solved:** Transforms the agent into an adversarial sparring partner that explicitly attacks user assumptions, identifies hidden blind spots, and counteracts AI sycophancy.

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Strategists and Writers
* **Problem Solved:** Spawns a critical sub-agent to stress-test plans and drafts across 8 distinct failure modes before any proposal is finalized.

#### `[Prompt Fallback] The Over-Reliance Interrogator`
* **Type:** `Prompt`
* **Clients:** Universal Web Chat
* **Target Persona:** Professionals evaluating AI-suggested decisions
* **Problem Solved:** Forces the AI to identify why its own proposal might fail and what human judgment cannot be offloaded.

#### 🛑 Non-Delegable Red Lines (When NOT to listen to AI)
* **Medical diagnosis & prescription decisions** without qualified practitioner review.
* **Legal compliance sign-offs** and binding contractual agreements.
* **Final personnel evaluations**, hiring rejections, and disciplinary actions.
* **Sole-source reporting**: Publishing journalistic claims based solely on an LLM response without primary source verification.

---

### 4. Can the output be published directly?
*Guarding against undisclosed AI ghostwriting, copyright hazards, and academic/professional dishonesty.*

#### [`ai-provenance`](https://github.com/noheton/f-ai2-r)
* **Type:** `SKILL.md`
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Researchers, Journalists, Authors, Developers
* **Problem Solved:** Maintains an immutable provenance record of AI-assisted work (model versions, prompt hashes, verification states) and derives human-readable AI-use disclosures.
* **Install:**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`vertu-seo-publish-gate`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **Type:** `SKILL.md`
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Editors, Publishing Teams, Newsrooms
* **Problem Solved:** Enforces a strict `PASS/FIX/BLOCK` gate over drafts. Crucially, the writing/QA agent is forbidden from publishing directly; separate human authorization is required.
* **Install:**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git
  cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`visible-ai-disclosure-pr-gate`](https://github.com/harlan-zw/harlan-agent-kit)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Open Source Maintainers, Technical Writers, Developers
* **Problem Solved:** Enforces a visible AI-writing disclosure whenever drafting release notes or PRs. The agent strictly refuses to submit or publish if the mandated disclosure is missing or altered.
* **Install:**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git
  cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`awesome-copilot/gdpr-compliant`](https://github.com/awesome-copilot/skills)
* **Type:** `SKILL.md`
* **Clients:** Copilot, Claude Code
* **Target Persona:** Software Engineers, Compliance Officers
* **Problem Solved:** Enforces audit logging and data provenance records so developers can demonstrate compliance with IP and privacy standards.

#### `[Prompt Fallback] AID/CRediT AI Disclosure Generator`
* **Type:** `Prompt`
* **Clients:** Universal Web Chat
* **Target Persona:** Researchers, Academics, Corporate Writers, Students
* **Problem Solved:** Generates an accurate, standards-compliant AI Disclosure Statement specifying which model version was used, for what specific tasks, and the human oversight applied.

---

## ⚡ The 30-Second Pre-flight Checklist

Print or pin this checklist to your workspace before interacting with any AI tool:

| Stage | Question to Ask Yourself | Responsible Action |
| :--- | :--- | :--- |
| **Before Input** | *"Would I be comfortable seeing this text published on the front page of a newspaper tomorrow?"* | If NO: Scrub names, emails, internal numbers, and confidential notes before sending. |
| **During Interaction** | *"Did the AI cite a specific paper, statistic, or law?"* | Verify the DOI/link in an independent tab. Never assume cited URLs or quotes are authentic. |
| **During Decision** | *"Am I agreeing just because the AI's tone is confident and polite?"* | Ask for counter-arguments or potential failure modes before committing. |
| **Before Output** | *"Can I explain to my boss, reader, or editor exactly how AI contributed to this deliverable?"* | Attach an honest AI disclosure statement and retain the session prompt log. |

---

## 🤝 Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.

## 📄 License

[MIT](LICENSE) © 2026 Responsible AI Use Contributors
