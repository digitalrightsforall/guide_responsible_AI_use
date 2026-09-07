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

## 🧭 The Four Practical Questions

* [1. What can I feed to AI? (我能把什么给 AI？)](#1-what-can-i-feed-to-ai)
* [2. Which answers can I trust? (哪些回答能信？)](#2-which-answers-can-i-trust)
* [3. When should I NOT listen to AI? (什么时候不能听 AI？)](#3-when-should-i-not-listen-to-ai)
* [4. Can the output be published directly? (输出能不能直接发布？)](#4-can-the-output-be-published-directly)
* [⚡ The 30-Second Pre-flight Checklist](#-the-30-second-pre-flight-checklist)

---

### 1. What can I feed to AI?
*Guarding against unintentional leaks of personal identity (PII), confidential client data, and proprietary drafts.*

#### [`PII-Shield`](https://github.com/gregmos/PII-Shield)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Open Agent standard
* **Target Persona:** General Knowledge Workers, Legal & Financial Analysts
* **Problem Solved:** Automatically scans documents (.txt, .md, .pdf, .docx) before agent processing, replaces personal identifiable information (names, emails, phones, SSNs) with synthetic placeholders, and restores them locally upon task completion.
* **Usage:**
  ```bash
  # Clone or place into your skills directory
  git clone https://github.com/gregmos/PII-Shield .claude/skills/pii-shield
  ```

#### [`mode-io/privacy-protector`](https://github.com/mode-io/mode-io-skills)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers handling customer support or user feedback
* **Problem Solved:** Identifies sensitive business credentials and customer contact details in prompt context, maintaining an ephemeral de-identification lookup table on local storage.
* **Usage:** Place `privacy-protector/SKILL.md` inside your agent's skills directory.

#### [`anonymize-documents-with-presidio`](https://github.com/schneidermichael/anonymize-documents-with-presidio)
* **Type:** `SKILL.md` (with local script)
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

#### [`citation-check-skill`](https://github.com/open-agent-skills/citation-check-skill)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity, Open Agent standard
* **Target Persona:** Researchers, Academics, Policy Analysts
* **Problem Solved:** Parses citations and references in generated text, queries cross-reference APIs (Crossref, Semantic Scholar) to verify existence, and flags non-existent DOIs or mismatched authors.
* **Usage:**
  ```bash
  # Place in agent skills folder
  cp -r citation-check-skill ~/.claude/skills/
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Emacs, Antigravity
* **Target Persona:** Scientists, Academic Writers (LaTeX, Markdown, Org-mode)
* **Problem Solved:** Automatically validates bibliography items against Crossref and PubMed records, alerting users to phantom papers or retracted literature.

#### [`aidd-refine/05-fact-check`](https://github.com/aidd-refine/aidd-refine)
* **Type:** `SKILL.md`
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Journalists, Content Creators, Fact-Checkers
* **Problem Solved:** Decomposes an article draft into discrete verifiable factual propositions (Claims), forces independent search grounding, and rewrites unverified statements with explicit epistemic hedging.

#### `[Prompt Fallback] Epistemic Humility & Claim Tagging`
* **Type:** `Prompt`
* **Clients:** Universal Web Chat (ChatGPT, Claude.ai, Gemini)
* **Target Persona:** General Knowledge Workers performing desktop research
* **Problem Solved:** Prevents overconfident AI responses by forcing epistemic tagging on every factual assertion.
* **Prompt:**
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
*Guarding against automation bias, sycophancy, and delegating non-delegable ethical judgments.*

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
* **Prompt:**
  ```text
  You just provided the recommendation above. Now, step out of the advisor role and act as an independent, skeptical auditor.
  Answer these three questions honestly:
  1. Under what specific conditions or edge cases will this advice completely fail?
  2. What hidden assumptions have you made that I, as the human, must personally verify before acting?
  3. What ethical, legal, or contextual responsibilities cannot be delegated to an AI in this decision?
  ```

#### 🛑 Non-Delegable Red Lines (When NOT to listen to AI)
* **Medical diagnosis & prescription decisions** without qualified practitioner review.
* **Legal compliance sign-offs** and binding contractual agreements.
* **Final personnel evaluations**, hiring rejections, and disciplinary actions.
* **Sole-source reporting**: Publishing journalistic claims based solely on an LLM response without primary source verification.

---

### 4. Can the output be published directly?
*Guarding against undisclosed AI ghostwriting, copyright hazards, and academic/professional dishonesty.*

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
* **Prompt:**
  ```text
  I have used AI assistance while preparing my document. Generate an honest, professional AI Disclosure Statement suitable for inclusion in an academic appendix, corporate report, or article footnote.
  
  Please ask me the following questions one by one, then formulate the statement:
  1. Which AI tool and model version were used? (e.g., Claude 3.7 Sonnet, ChatGPT-4o)
  2. For which specific tasks was AI employed? (e.g., brainstorming, proofreading, code generation, translation, literature scanning)
  3. What substantive portions were written entirely by humans?
  4. What human verification steps were performed on the AI output?
  ```

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
