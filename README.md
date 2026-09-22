# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated collection of 40 production-ready `SKILL.md` packages designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.

**English** | [中文版](README_CN.md)

---

## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)

This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyone protect their rights and agency in the algorithmic era.

In this project, we curate **existing, proven open-source skills** (we strictly curate, not invent). The practical connotation of responsible and safe AI use is unpacked into two dynamic pillars:

1. **🛡️ Inward: Self-Defense & Boundaries (对内·自我防护与边界)**: Guard against commercial AI over-harvesting your personal and confidential data into training corpora, and guard against blind faith in confident hallucinations or sycophantic appeasement.
2. **📐 Outward: Third-Party Verifiability (对外·成果第三方可核验)**: Ensure colleagues, clients, and readers can readily audit the evidence chain and reasoning behind AI-assisted work, moving beyond hollow bureaucratic disclaimers.

> [!NOTE]
> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid doctrine.

---

## 📦 Client Installation Guide

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

---

### 1. What can I feed to AI?
*Guarding against commercial AI over-harvesting personal identity (PII), confidential client data, and proprietary drafts.*

#### [`PII Safe Documents (danyuchn/pii-guard)`](https://github.com/danyuchn/pii-guard)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Before ingestion: Run before passing any private document, interview transcript, or draft to the agent.*
* **💡 Why Everyday People Should Care:** When feeding resumes or draft contracts to AI, personal identities are uploaded to cloud servers. This skill locally redacts sensitive data and restores it afterwards, keeping private text safe.
* **🎯 Why Chosen:** Directly tackles commercial AI data harvesting. Unlike passive warnings, it treats the cloud LLM as untrusted by default, creating an isolated local redacted working copy and prohibiting raw access.
* **🛠️ How to Use:** Copy the command to clone into your client skills directory. The agent automatically creates an isolated local redacted working copy before reading files.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ AgentSkills Standard | 🛡️ *Audited local-first isolation pipeline with automatic purge*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** General Knowledge Workers, Researchers, Journalists
* **Install Command:**
  ```bash
  git clone https://github.com/danyuchn/pii-guard.git && cp -R pii-guard/.agents/skills/pii-safe-documents .agents/skills/
  ```

#### [`Scholar Safety (joshzyj/open-scholar-skill)`](https://github.com/joshzyj/open-scholar-skill)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Pre-read scan: Triggered automatically before Claude or an agent executes a file Read command.*
* **💡 Why Everyday People Should Care:** Uploading restricted research transcripts or IRB-governed survey data to commercial LLMs violates ethics policies. This skill forces local-only analysis without cloud data transmission.
* **🎯 Why Chosen:** Brings institutional research ethics (IRB, HIPAA, NDAs) down to everyday desktop use, allowing users to run local Bash statistics without streaming restricted texts upstream.
* **🛠️ How to Use:** Install into Claude Code. When issuing data analysis instructions, the agent intercepts restricted files and processes them via local scripts.
* **📊 Maturity & Trust:** `Active Release` | ⭐ Open Scholar Suite | 🛡️ *Designed for university & clinical research data custodians*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Qualitative Analysts, IRB Custodians
* **Install Command:**
  ```bash
  git clone https://github.com/joshzyj/open-scholar-skill.git && cp -R open-scholar-skill/.claude/skills/scholar-safety ~/.claude/skills/
  ```

#### [`Skill Sanitizer (cyberxuan-XBX/skill-sanitizer)`](https://github.com/cyberxuan-XBX/skill-sanitizer)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Installation checkpoint: Use before loading or approving any third-party SKILL.md into your workspace.*
* **💡 Why Everyday People Should Care:** Third-party agent skills downloaded online can hide prompt injections or malicious telemetry. This scanner inspects incoming skills like an antivirus before execution.
* **🎯 Why Chosen:** Provides supply-chain defense for AI users. Over 99% of community skills contain unvetted instructions; this tool scans for hidden prompt injections and malicious bash telemetry.
* **🛠️ How to Use:** Run this skill before adding new skills to your agent. It scans instruction files for command injection and suspicious telemetry.
* **📊 Maturity & Trust:** `Production v2.1` | ⭐ Open Source Community | 🛡️ *Zero cloud dependencies, 7-layer semantic detection*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Developers, Power Users, Knowledge Workers
* **Install Command:**
  ```bash
  git clone https://github.com/cyberxuan-XBX/skill-sanitizer.git .agents/skills/skill-sanitizer
  ```

#### [`PII Detection Pipeline (mukul975/Privacy-Data-Protection-Skills)`](https://github.com/mukul975/Privacy-Data-Protection-Skills)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Pre-Ingestion Gateway: Runs automatic regex and NER classification on prompt text and attached documents before dispatching to LLMs.*
* **💡 Why Everyday People Should Care:** Manually sanitizing hours of meeting notes or transcripts is tedious. This standardized pipeline classifies and masks 20 privacy categories automatically.
* **🎯 Why Chosen:** Follows the agentskills.io standard for automated PII masking across 20 privacy categories, guaranteeing raw sensitive data is not exfiltrated to model providers.
* **🛠️ How to Use:** Clone to your skills directory and invoke during document ingestion to batch-mask personal identifiers using standard NER pipelines.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ agentskills.io Verified | 🛡️ *Audited open-source privacy framework with 282+ skills*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Support Teams, Account Managers, Operations
* **Install Command:**
  ```bash
  git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/pii-detection-pipeline ~/.claude/skills/
  ```

#### [`OpenMed Clinical Document Ingestion (maziyarpanahi)`](https://github.com/maziyarpanahi/openmed)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Intake gate: Triggered before analyzing clinical case notes, patient reports, or medical research data.*
* **💡 Why Everyday People Should Care:** Patients frequently paste diagnostic scans into AI for second opinions. This skill strips patient medical record numbers and names locally before consulting models.
* **🎯 Why Chosen:** Addresses high-consequence medical data risks by detecting protected health information (PHI) and clinical terminology, preventing HIPAA/ethics breaches on the desktop.
* **🛠️ How to Use:** Activate before analyzing clinical lab reports or medical history to guarantee that personal health records remain unlinked to your online identity.
* **📊 Maturity & Trust:** `Active Research Release` | ⭐ OpenMed Suite | 🛡️ *Clinical NLP benchmarked for HIPAA PHI safety*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Clinical Researchers, Healthcare Analysts, Medical Writers
* **Install Command:**
  ```bash
  git clone https://github.com/maziyarpanahi/openmed.git && cp -R openmed/skills/deidentifying-clinical-text .agents/skills/
  ```

#### [`AREX Presidio Anonymize Text (VectorSpaceLab)`](https://github.com/VectorSpaceLab/AREX-Skill)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Pre-read filter: Invoked before agent ingests enterprise documents or user communications.*
* **💡 Why Everyday People Should Care:** Designed for quick chat snippets and emails. It replaces person names and company entities with generic aliases in seconds before ingestion.
* **🎯 Why Chosen:** Standardized AgentSkills packaging of Presidio NER engine for autonomous agent repositories, with zero-effort integration into Cursor and Antigravity.
* **🛠️ How to Use:** Install into Cursor or Claude. Use it when summarizing email threads to replace actual colleagues and companies with safe aliases.
* **📊 Maturity & Trust:** `Production Standard` | ⭐ AREX-Skill Repo | 🛡️ *Enterprise repository standard with deterministic NER masking*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Knowledge Workers, Enterprise Staff, Developers
* **Install Command:**
  ```bash
  git clone https://github.com/VectorSpaceLab/AREX-Skill.git && cp -R AREX-Skill/skills/repositories/repo-skills/presidio/sub-skills/anonymize-text .agents/skills/presidio-anonymize
  ```

#### [`SkillGuard (LLMSecurity/skillguard)`](https://github.com/LLMSecurity/skillguard)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Before installation: Audit skill files and tools for OWASP Agentic risks and data exfiltration vectors.*
* **💡 Why Everyday People Should Care:** When users install third-party skills or extensions for AI assistants, they risk malicious code injection or credential leaks. SkillGuard acts as the first line of defense.
* **🎯 Why Chosen:** Directly addresses malicious skill injection and credential harvesting. Maps findings to OWASP Agentic Top 10 and MITRE ATLAS to ensure tools do not covertly steal user data.
* **🛠️ How to Use:** Audit target SKILL.md or GitHub repo URL via agent command to receive a structured security risk report with remediation advice.
* **📊 Maturity & Trust:** `Active Community Standard` | ⭐ OWASP Agentic Top 10 Mapping | 🛡️ *LLMSecurity open-source agent audit framework*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** All AI Users, Developers, Security Conscious Citizens
* **Install Command:**
  ```bash
  git clone https://github.com/LLMSecurity/skillguard.git && cp -R skillguard/skills/skillguard .agents/skills/
  ```

#### [`Skill Sentinel (EvolutionUnleashed/skill-sentinel)`](https://github.com/EvolutionUnleashed/skill-sentinel)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Pre-workspace import: Scan markdown skill instructions for hidden prompt injections and unauthorized egress.*
* **💡 Why Everyday People Should Care:** Many malicious skills conceal instructions to silently exfiltrate conversation data. This tool lets non-technical users detect covert leakage vectors before use.
* **🎯 Why Chosen:** Specialized heuristic threat scanner for markdown-based skills, detecting covert instructions that command LLMs to exfiltrate private conversation data.
* **🛠️ How to Use:** Ask the agent: "Scan this SKILL.md for data exfiltration and prompt injection risks" to receive automated threat levels.
* **📊 Maturity & Trust:** `Active Release` | ⭐ Evolution Unleashed Framework | 🛡️ *Open-source heuristic skill scanner*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Content Creators, Developers
* **Install Command:**
  ```bash
  git clone https://github.com/EvolutionUnleashed/skill-sentinel.git && cp -R skill-sentinel/skills/skill-sentinel .agents/skills/
  ```

#### [`Nova Proximity (Nova-Hunting/nova-proximity)`](https://github.com/Nova-Hunting/nova-proximity)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Before system access: Validate MCP servers and agent skills for unauthorized local file access and command execution.*
* **💡 Why Everyday People Should Care:** As AI agents gain MCP-based local file and terminal access, unauthorized traversal and credential leakage pose major privacy hazards.
* **🎯 Why Chosen:** Pioneers unified MCP and agent skill dynamic security probing, preventing excessive local file reads and credential leakage across desktop agents.
* **🛠️ How to Use:** Point the scanner to your MCP config or skill directory to inspect flagged permissions and hazardous tool calls.
* **📊 Maturity & Trust:** `Production Stable (300+ ★)` | ⭐ Nova Security Scanner Ecosystem | 🛡️ *Nova-Hunting Open Security Project*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** All Agent Users, Small Business Owners, Power Users
* **Install Command:**
  ```bash
  git clone https://github.com/Nova-Hunting/nova-proximity.git && cp -R nova-proximity/.agents/skills/nova-proximity .agents/skills/
  ```

#### [`Security Threat Model (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model)
* **Workflow Timing:** ⏳ Pre-Input (Privacy & Anti-Harvesting) — *Pre-upload scoping: Map trust boundaries and confidential assets before feeding repositories or enterprise drafts to AI.*
* **💡 Why Everyday People Should Care:** Users often inadvertently expose architecture diagrams and tokens to AI. Threat modeling explicitly marks what sensitive assets must never be shared.
* **🎯 Why Chosen:** Curated by tech-leads-club (6.6k★) and OpenAI skill designs. Replaces vague warnings with repository-grounded asset boundary mapping.
* **🛠️ How to Use:** Prompt the agent to run security threat modeling on the workspace to receive a boundary matrix and forbidden data checklist.
* **📊 Maturity & Trust:** `Production Battle-Tested (6.6k ★)` | ⭐ Tech-Leads-Club Standard | 🛡️ *Curated from OpenAI and professional tech leads consortium*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Developers, Tech Leads, Enterprise Knowledge Workers
* **Install Command:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\(security\)/security-threat-model .agents/skills/
  ```

---

### 2. Which answers can I trust?
*Guarding against blind faith in hallucinated citations, fabricated data points, and unverified factual assertions.*

#### [`Post-Generation Fact-Check (jwynia/agent-skills)`](https://github.com/jwynia/agent-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Post-generation pass: Runs immediately after an initial draft is produced, before any claims are acted on.*
* **💡 Why Everyday People Should Care:** LLMs sound supremely confident even when completely wrong. This skill puts AI into detective mode after drafting, verifying claims against external sources.
* **🎯 Why Chosen:** Solves the fundamental flaw of models confirming their own hallucinations. Enforces an independent verification pass that queries external ground truth and strictly forbids model memory as evidence.
* **🛠️ How to Use:** Invoke after generating draft articles. It isolates factual assertions and audits them against live web sources.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Agent Skills Library | 🛡️ *Verified multi-step claim extraction and external evidence retrieval*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Writers, Journalists, Researchers
* **Install Command:**
  ```bash
  git clone https://github.com/jwynia/agent-skills.git && cp -R agent-skills/skills/general/research/verification/fact-check .agents/skills/fact-check
  ```

#### [`Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)`](https://github.com/CanXiangCC/aminer-open-skill)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Source auditing: Run when reviewing literature reviews, whitepapers, or academic drafts.*
* **💡 Why Everyday People Should Care:** AI frequently makes subtle errors in volume numbers and author lists. This checker queries academic registries to verify exact citation accuracy.
* **🎯 Why Chosen:** Tackles paper-level hallucination. While normal checkers only verify if a paper exists, this skill downloads the actual body and proves whether the paper actually supports the attributed claim.
* **🛠️ How to Use:** Trigger after writing research sections. It verifies that every in-text citation correctly matches real indexing data.
* **📊 Maturity & Trust:** `Production Active` | ⭐ Aminer Open Skill Ecosystem | 🛡️ *Deep claim-to-passage alignment evaluation*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Academic Researchers, Peer Reviewers, Fact-Checkers
* **Install Command:**
  ```bash
  git clone https://github.com/CanXiangCC/aminer-open-skill.git && cp -R aminer-open-skill/skills/citation-faithfulness ~/.claude/skills/citation-faithfulness
  ```

#### [`BibRef Verify (yzhao062/agent-config)`](https://github.com/yzhao062/agent-config)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Pre-submission audit: Run on existing .bib files before finalizing academic publications.*
* **💡 Why Everyday People Should Care:** Fabricated references can get academic papers instantly rejected. BibRef automatically resolves DOIs to guarantee every entry is genuine.
* **🎯 Why Chosen:** Protects academic reputation. Batch checks .bib bibliography files for phantom citations and fabricated DOIs without modifying the original source file, generating a clean audit report.
* **🛠️ How to Use:** Feed reference lists to the skill to receive a line-by-line verification table highlighting any unresolvable citations.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Academic AgentConfig | 🛡️ *Batch Crossref & Semantic Scholar verification harness*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Academic Researchers, Grant Writers, Authors
* **Install Command:**
  ```bash
  git clone https://github.com/yzhao062/agent-config.git && cp -R agent-config/skills/bibref-verify ~/.claude/skills/bibref-verify
  ```

#### [`Citation Integrity Auditor (scdenney/open-science-skills)`](https://github.com/scdenney/open-science-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Draft Verification: Audits every in-text citation against real bibliographic databases (Crossref, OpenAlex, DataCite) to eliminate ghost references.*
* **💡 Why Everyday People Should Care:** Students and writers risk severe credibility hits when using fabricated citations. This auditor queries Crossref/OpenAlex and refuses to guess.
* **🎯 Why Chosen:** Solves the catastrophic "Phantom Citation" problem where LLMs fabricate convincing but nonexistent papers, journal DOIs, and author lists.
* **🛠️ How to Use:** Invoke during drafting to generate an audit receipt with exact DOI resolution states and database citations.
* **📊 Maturity & Trust:** `Active Release` | ⭐ Open Science Skills Suite | 🛡️ *Empirical research workflow maintained by scdenney*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Researchers, Policy Analysts, Fact-Checkers
* **Install Command:**
  ```bash
  git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/citation-check ~/.claude/skills/
  ```

#### [`jkitchin/skillz (citation-verifier)`](https://github.com/jkitchin/skillz)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Manuscript writing: Active during LaTeX and Markdown drafting sessions.*
* **💡 Why Everyday People Should Care:** Created by academic practitioners, this skill not only confirms paper existence but fetches real publication abstracts for human review.
* **🎯 Why Chosen:** Created by an active academic scientist (Prof. John Kitchin), specifically catching retracted papers and hallucinated DOIs in scientific literature.
* **🛠️ How to Use:** Install into your agent workspace to audit citations across Markdown or LaTeX manuscripts.
* **📊 Maturity & Trust:** `Mature Academic Tool` | ⭐ Scientific Research Community | 🛡️ *Built by academic faculty for LaTeX/Markdown scientific publishing*
* **Clients:** Claude Code, Emacs, Antigravity
* **Target Persona:** Scientists, Academic Writers, LaTeX/Markdown Users
* **Install Command:**
  ```bash
  git clone https://github.com/jkitchin/skillz.git && cp -R skillz/skills/citation-verifier .agents/skills/
  ```

#### [`Claim–Source Fact Checker (scdenney/open-science-skills)`](https://github.com/scdenney/open-science-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Claim Validation: Audits whether the source cited by the AI actually supports the claims made in the sentence, stopping citation padding.*
* **💡 Why Everyday People Should Care:** An AI might cite a real study while inverting its conclusions. This skill compares claims against actual source text to stop misattribution.
* **🎯 Why Chosen:** Addresses the insidious "Citation Padding" failure mode: even when a real paper exists, the LLM frequently misquotes or inverts its actual scientific findings.
* **🛠️ How to Use:** Run on AI summaries to audit whether cited documents actually prove the claims asserted in your draft.
* **📊 Maturity & Trust:** `Active Release` | ⭐ Open Science Skills Suite | 🛡️ *Claim-source consistency auditor for empirical science*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Journalists, Long-form Writers, Editors
* **Install Command:**
  ```bash
  git clone https://github.com/scdenney/open-science-skills.git && cp -R open-science-skills/codex/fact-check ~/.claude/skills/
  ```

#### [`Hallucination Risk Reviewer (Notysoty/openagentskills)`](https://github.com/Notysoty/openagentskills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Risk triage: Executes a structured claim-level triage before users act on or publish AI output.*
* **💡 Why Everyday People Should Care:** AI prose always looks fluent and plausible. This reviewer scores text for hallucination risk and flags unsupported assertions.
* **🎯 Why Chosen:** Provides an explicit risk-scoring rubric that targets version-specific claims, obscure dates, and exact URLs, preventing propagation of confident falsehoods.
* **🛠️ How to Use:** Call the reviewer after drafting to get an annotated copy highlighting statements with high hallucination likelihood.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ Open Agent Skills Catalog | 🛡️ *Commit-pinned risk rubric with structured output contract*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Knowledge Workers, Editors, Content Teams, Researchers
* **Install Command:**
  ```bash
  git clone https://github.com/Notysoty/openagentskills.git && cp -R openagentskills/skills/hallucination-risk-reviewer .agents/skills/
  ```

#### [`Vectara Hallucination Corrector HHEM (vectara)`](https://github.com/vectara/agent-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Automated verification: Evaluates factual consistency against source documents and algorithmically strips ungrounded claims.*
* **💡 Why Everyday People Should Care:** Utilizes Vectara’s proven HHEM evaluation model to mathematically score and correct factual drift against reference materials.
* **🎯 Why Chosen:** Utilizes Vectara's industry-standard HHEM (Hughes Hallucination Evaluation Model). It never invents missing facts—it strictly removes or hedges unsupported claims.
* **🛠️ How to Use:** Install into agent client. Automatically compares generated summaries against provided context documents to score faithfulness.
* **📊 Maturity & Trust:** `Production API Integration` | ⭐ Vectara Agent Skills | 🛡️ *Backed by Vectara Hughes Hallucination Evaluation Model*
* **Clients:** Claude Code, Antigravity, Python Agents
* **Target Persona:** Enterprise Analysts, RAG Operators, Researchers
* **Install Command:**
  ```bash
  git clone https://github.com/vectara/agent-skills.git && cp -R agent-skills/skills/hallucination-corrector .agents/skills/
  ```

#### [`K-Dense Scientific Peer Review (K-Dense-AI)`](https://github.com/K-Dense-AI/scientific-agent-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Reasoning audit: Run on scientific proposals, experimental methodology, and statistical inferences.*
* **💡 Why Everyday People Should Care:** Brings scientific peer review rigor to everyday documents, exposing pseudo-scientific claims and methodological flaws.
* **🎯 Why Chosen:** Brings academic peer-review scrutiny to complex analytical reasoning, testing whether mathematical derivations and empirical conclusions legitimately follow from stated premises.
* **🛠️ How to Use:** Invoke on research proposals to receive structured peer-review feedback identifying weak evidence and logical gaps.
* **📊 Maturity & Trust:** `Active Research Release` | ⭐ Scientific Agent Skills | 🛡️ *Multi-perspective derivation and statistical validation harness*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Scientists, Peer Reviewers, Quantitative Analysts
* **Install Command:**
  ```bash
  git clone https://github.com/K-Dense-AI/scientific-agent-skills.git && cp -R scientific-agent-skills/skills/peer-review .agents/skills/
  ```

#### [`The Judge (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Post-draft adjudication: Enforces "Evidence or silence" before any technical or factual recommendation is accepted.*
* **💡 Why Everyday People Should Care:** The most dangerous AI trap is confident hallucination. The Judge enforces the courtroom rule: silence without hard evidence; every claim must cite verifiable sources.
* **🎯 Why Chosen:** Enforces the non-negotiable rule "Evidence or silence": every internal claim requires file:line proof; every external claim requires an official live URL.
* **🛠️ How to Use:** Direct the agent to review output using The Judge protocol; all claims without verifiable official proof are pruned automatically.
* **📊 Maturity & Trust:** `Production Standard (6.6k ★)` | ⭐ Tech-Leads-Club Quality Suite | 🛡️ *Evidence-first engineering review protocol*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Knowledge Workers, Students, Researchers, Engineers
* **Install Command:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\(quality\)/the-judge .agents/skills/
  ```

---

### 3. When should I NOT listen to AI?
*Guarding against automation bias, sycophancy, and delegating non-delegable ethical or professional judgments.*

#### [`The Fool (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Decision challenge: Triggered whenever the user is tempted to quickly adopt an AI plan or strategy.*
* **💡 Why Everyday People Should Care:** LLMs are chronic people-pleasers that validate bad ideas. "The Fool" breaks sycophancy by bluntly exposing your blind spots.
* **🎯 Why Chosen:** Explicity designed NOT to make decisions, but to shatter premature consensus through pre-mortems, assumption probing, and cognitive-bias scans.
* **🛠️ How to Use:** Activate during strategic brainstorming. The agent ceases agreeable validation and attacks your proposal’s weakest assumptions.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ tech-leads-club Catalog | 🛡️ *Dialectical counterargument and pre-mortem methodology*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Managers, Founders, Strategists, Analysts
* **Install Command:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R "agent-skills/packages/skills-catalog/skills/(decision-making)/the-fool" ~/.claude/skills/the-fool
  ```

#### [`Sycophancy Challenger (mohitagw15856/pm-claude-skills)`](https://github.com/mohitagw15856/pm-claude-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Iterative debate: Enforces anti-appeasement rules whenever you feel the AI is being too agreeable.*
* **💡 Why Everyday People Should Care:** Users mistake AI agreement for objective validation. This challenger forces the model to construct contrary arguments.
* **🎯 Why Chosen:** Directly cures the pervasive AI sycophancy flaw. Enforces strict anti-appeasement rules: forbids the agent from retreating from a critique merely because the user pushes back.
* **🛠️ How to Use:** Install into your workspace. Instruct the agent to challenge your perspective with empirical counterexamples.
* **📊 Maturity & Trust:** `Production Active` | ⭐ pm-claude-skills Suite | 🛡️ *Procedural anti-appeasement rules verified in iterative workflows*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Decision Makers, Product Managers, Founders
* **Install Command:**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/sycophancy-challenger .agents/skills/sycophancy-challenger
  ```

#### [`jihlenburg/mad-skills (devils-advocate)`](https://github.com/jihlenburg/mad-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Stress testing: Spawns an adversarial sub-agent to stress-test proposals across 8 failure modes.*
* **💡 Why Everyday People Should Care:** Overcomes automation bias in programming and writing by performing a pre-mortem on proposed solutions.
* **🎯 Why Chosen:** Offers systematic failure-mode testing across eight distinct vectors, preventing users from walking into predictable operational traps.
* **🛠️ How to Use:** Run before accepting architectural designs to simulate catastrophic edge cases and concurrency bugs.
* **📊 Maturity & Trust:** `Active Framework` | ⭐ mad-skills Ecosystem | 🛡️ *8-dimensional operational failure mode analysis*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Strategists, Writers, System Architects
* **Install Command:**
  ```bash
  git clone https://github.com/jihlenburg/mad-skills.git && cp -R mad-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Godfly Opposing Counsel (CassioRoos/godfly-skills)`](https://github.com/CassioRoos/godfly-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Irreversible decisions: Generates an Opposing Brief attacking load-bearing assumptions for high-stakes commitments.*
* **💡 Why Everyday People Should Care:** When drafting grievances or negotiation points, users have blind spots. This skill acts as opposing counsel to poke holes in your claims.
* **🎯 Why Chosen:** Avoids performative contrarianism. Produces a formal Opposing Brief that explicitly names the irreversible costs of the chosen path and outlines how the alternative strategy would fundamentally win.
* **🛠️ How to Use:** Run against negotiation drafts. The agent analyzes your prose from an adversary’s stance to spot legal and evidential weaknesses.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ Godfly Skills Standard | 🛡️ *Structured adversarial brief protocol for high-stakes decisions*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Executives, Team Leads, System Planners, Legal Counsel
* **Install Command:**
  ```bash
  git clone https://github.com/CassioRoos/godfly-skills.git && cp -R godfly-skills/skills/devils-advocate .agents/skills/godfly-counsel
  ```

#### [`Devil's Advocate Reviewer Agent (Imbad0202)`](https://github.com/Imbad0202/academic-research-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Academic defense: Stress-tests research methodologies and theoretical foundations before journal submission.*
* **💡 Why Everyday People Should Care:** The ultimate rehearsal tool before presentation. It simulates a skeptical boss or thesis committee finding gaps in your narrative.
* **🎯 Why Chosen:** Employs strict procedural ladders to prevent the AI from conceding critiques merely due to sustained user argumentation, exposing foundational theoretical flaws.
* **🛠️ How to Use:** Activate on finished slide outlines or draft papers to generate defensive Q&A pairs for tough reviewers.
* **📊 Maturity & Trust:** `Research Release` | ⭐ Academic Research Skills | 🛡️ *Rigorous anti-accommodation ladders for peer critique*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Researchers, PhD Candidates, Academic Authors
* **Install Command:**
  ```bash
  git clone https://github.com/Imbad0202/academic-research-skills.git && cp -R academic-research-skills/skills/devils-advocate .agents/skills/
  ```

#### [`Multi-Perspective Red-Team Review (mohitagw15856)`](https://github.com/mohitagw15856/pm-claude-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Pre-commitment review: Stress-tests proposals through conflicting stakeholder lenses (finance, legal, competitor).*
* **💡 Why Everyday People Should Care:** Democratizes cybersecurity red-teaming for everyday decisions, subjecting strategic proposals to adversarial stress testing.
* **🎯 Why Chosen:** Forces plans through conflicting adversarial personas, ranking blind spots by likelihood × impact and conducting an objective pre-mortem before converting proposals into real commitments.
* **🛠️ How to Use:** Apply to operational plans to audit how bad actors could exploit policy ambiguities or technical flaws.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ pm-claude-skills Suite | 🛡️ *Multi-persona critique with ranked blind spot scoring matrix*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Product Managers, Editors, Team Leads, Strategists
* **Install Command:**
  ```bash
  git clone https://github.com/mohitagw15856/pm-claude-skills.git && cp -R pm-claude-skills/skills/red-team-review .agents/skills/red-team-review
  ```

#### [`Devil's Advocate Anti-Sycophancy (molly-diversifiedfun)`](https://github.com/molly-diversifiedfun/claude-skills)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Thinking partner: Engaged when drafting critical essays, strategic plans, or executive briefings.*
* **💡 Why Everyday People Should Care:** Injects persistent guardrails that forbid pleasant falsehoods, demanding honest evaluation of feasibility and budget.
* **🎯 Why Chosen:** Encodes an uncompromising anti-sycophancy contract: forbids opening compliments, forbids diluting critiques to appease the user, and enforces mandatory 'Fatal Flaw' identification.
* **🛠️ How to Use:** Add to agent instructions or load the skill to force rigorous feasibility checks before any affirmative conclusions.
* **📊 Maturity & Trust:** `Commit Pinned` | ⭐ Claude Skills Catalog | 🛡️ *Zero-appeasement anti-sycophancy contract with fatal-flaw requirements*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Executives, Strategists, Authors, Researchers
* **Install Command:**
  ```bash
  git clone https://github.com/molly-diversifiedfun/claude-skills.git && cp -R claude-skills/devils-advocate .agents/skills/devils-advocate
  ```

#### [`The Jury (tech-leads-club/agent-skills)`](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Critical decision point: Spawns independent subagent jurors to debate anonymously and prevent sycophancy or anchoring.*
* **💡 Why Everyday People Should Care:** A single LLM tends to sycophantically agree with flawed user biases. The Jury protocol uses blind voting and a mandatory dissenter to smash cognitive echo chambers.
* **🎯 Why Chosen:** Translates 2025-2026 multi-agent research into practice: blind opinion formation, forced dissenting roles, and anonymous deliberation to defeat AI sycophancy.
* **🛠️ How to Use:** Prompt "Convene a jury to deliberate on this plan" to trigger multi-perspective blind evaluation and committed verdict generation.
* **📊 Maturity & Trust:** `Production Standard (6.6k ★)` | ⭐ Multi-Agent Anti-Sycophancy Protocol | 🛡️ *Tech-Leads-Club Decision-Making Suite*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Decision Makers, Researchers, Product Managers, General Users
* **Install Command:**
  ```bash
  git clone https://github.com/tech-leads-club/agent-skills.git && cp -R agent-skills/packages/skills-catalog/skills/\(decision-making\)/the-jury .agents/skills/
  ```

#### [`Discernment Nudge (anthropics/skills)`](https://github.com/anthropics/skills/tree/main/skills/discernment-nudge)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Before final action: Automatically appends targeted reflection questions to probe high-stakes advice or plans.*
* **💡 Why Everyday People Should Care:** People often take fluent AI answers at face value. Anthropic's official discernment nudge injects gentle friction to prompt real-world validation.
* **🎯 Why Chosen:** Official Anthropic skill (177k★) that models AI Fluency critical discernment habits: fact-checking prompts, questioning reasoning steps, and highlighting missing context.
* **🛠️ How to Use:** Install into Claude Code or agent environment; it appends 2-3 tailored reflection questions to challenge critical assumptions.
* **📊 Maturity & Trust:** `Official Core Skill (177k ★)` | ⭐ Anthropic Official Skills Repository | 🛡️ *Anthropic AI Fluency Framework*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Students, Patients, Consumers, Everyone using AI for advice
* **Install Command:**
  ```bash
  git clone https://github.com/anthropics/skills.git && cp -R skills/skills/discernment-nudge .agents/skills/
  ```

#### [`Review Reception & Anti-Compliance (obra/superpowers)`](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review)
* **Workflow Timing:** 💬 During-Chat (Fact-Checking & Anti-Sycophancy) — *Feedback receipt: Intercepts suggestions before implementation to prevent performative agreement or blind compliance.*
* **💡 Why Everyday People Should Care:** When presented with authoritative-sounding suggestions, users and agents often agree performatively. This skill mandates technical verification over social compliance before applying changes.
* **🎯 Why Chosen:** Tackles the widespread trap of AI social compliance. Enforces "Technical correctness over social compliance" — demanding verification before implementing questionable advice.
* **🛠️ How to Use:** Activate as an agent guardrail: when receiving critique or suggestions, the agent must verify validity with evidence before applying changes.
* **📊 Maturity & Trust:** `Battle-Tested Standard (290k ★)` | ⭐ Superpowers Framework | 🛡️ *Jesse Vincent / Superpowers non-compliance protocol*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Knowledge Workers, Engineers, Researchers, Critical Thinkers
* **Install Command:**
  ```bash
  git clone https://github.com/obra/superpowers.git && cp -R superpowers/skills/receiving-code-review .agents/skills/
  ```

---

### 4. Can the output be published directly?
*Ensuring third-party verifiability, provenance tracking, and explicit publication gates.*

#### [`AI Provenance (noheton/f-ai2-r)`](https://github.com/noheton/f-ai2-r)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Deliverable handoff: Run before submitting reports, articles, or code PRs to colleagues or clients.*
* **💡 Why Everyday People Should Care:** When accused of AI cheating, vague denials fail. This skill records model hashes and human editing timestamps to prove genuine authorship.
* **🎯 Why Chosen:** Transforms vague disclosures into tamper-evident audits. Records model hashes, verification states, and prompt trails, reserving final validation for human verification.
* **🛠️ How to Use:** Run during drafting to generate an immutable provenance receipt detailing human inputs vs AI assistance.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ f-ai2-r Provenance Framework | 🛡️ *Cryptographic hash tracking and human-confirmed verification ladder*
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Researchers, Journalists, Authors, Developers
* **Install Command:**
  ```bash
  git clone https://github.com/noheton/f-ai2-r.git .agents/skills/ai-provenance
  ```

#### [`Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)`](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Publish authorization: Hard stop before any draft or campaign goes live to the public.*
* **💡 Why Everyday People Should Care:** Search engines aggressively penalize low-quality AI spam. This gate checks readability, factual density, and eliminates robotic filler.
* **🎯 Why Chosen:** Enforces physical separation between generative AI and publishing pipelines. Strips the writing agent of publishing rights, demanding a human PASS/FIX/BLOCK sign-off receipt.
* **🛠️ How to Use:** Run prior to publishing to audit human value-add, readability grade, and robotic phrase elimination.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ Newsroom & Publishing Teams | 🛡️ *Strict fail-closed gate with human sign-off requirement*
* **Clients:** Antigravity, Cursor, Claude Code
* **Target Persona:** Editors, Content Teams, Media Creators
* **Install Command:**
  ```bash
  git clone https://github.com/StiflerMaxwell/vertu-english-publishing-workflow.git && cp -R vertu-english-publishing-workflow/skills/vertu-seo-publish-gate .agents/skills/
  ```

#### [`PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)`](https://github.com/harlan-zw/harlan-agent-kit)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Git commit / PR stage: Triggered automatically before pushing pull requests or release notes.*
* **💡 Why Everyday People Should Care:** Submitting unvetted AI code to open-source projects causes resentment. This skill generates transparent disclosures of AI contributions.
* **🎯 Why Chosen:** Automates developer integrity. Embeds mandatory AI-assistance disclosure directly into PR bodies, and strictly refuses git submission if the disclosure is altered or bypassed.
* **🛠️ How to Use:** Integrate with Git hooks to automatically attach an auditable AI disclosure table to your pull request.
* **📊 Maturity & Trust:** `Production Standard` | ⭐ harlan-agent-kit Ecosystem | 🛡️ *Machine-gated PR generation with mandatory transparency clauses*
* **Clients:** Claude Code, Antigravity, Cursor
* **Target Persona:** Open Source Maintainers, Software Engineers, Technical Writers
* **Install Command:**
  ```bash
  git clone https://github.com/harlan-zw/harlan-agent-kit.git && cp -R harlan-agent-kit/skills/pr .agents/skills/pr
  ```

#### [`GDPR Compliance Audit (mukul975/Privacy-Data-Protection-Skills)`](https://github.com/mukul975/Privacy-Data-Protection-Skills)
* **Workflow Timing:** 🧹 Post-Session (Privacy Cleanup & Logs) — *Pre-Publication Gate: Audits AI deliverables and data flows against GDPR Articles 5, 6, 12-23 before external release.*
* **💡 Why Everyday People Should Care:** Releasing tools or surveys with privacy flaws creates liability. This skill audits your deliverable against GDPR rules before launch.
* **🎯 Why Chosen:** Provides an automated pre-flight checklist for publications and web applications to prevent accidental privacy violations and legal penalties.
* **🛠️ How to Use:** Run prior to project handoff to perform a complete compliance review and generate remediation recommendations.
* **📊 Maturity & Trust:** `Production Stable` | ⭐ agentskills.io Standard | 🛡️ *Comprehensive open-source privacy audit procedures*
* **Clients:** GitHub Copilot, Claude Code
* **Target Persona:** Software Engineers, Compliance Officers, Legal Auditors
* **Install Command:**
  ```bash
  git clone https://github.com/mukul975/Privacy-Data-Protection-Skills.git && cp -R Privacy-Data-Protection-Skills/skills/privacy/gdpr-compliance-audit ~/.claude/skills/
  ```

#### [`Publish Prep Review (45ck/content-machine)`](https://github.com/45ck/content-machine)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Pre-upload gate: Blocks public release unless final artifacts, script citations, and rights metadata pass check.*
* **💡 Why Everyday People Should Care:** Final checkpoint for writers: verifies external links, image rights, and sensitive topics before publishing to public channels.
* **🎯 Why Chosen:** Implements an explicit 'fail-closed' gate. Fails publication readiness whenever source rights evidence is absent or AI-generated assets lack verifiable workflow and model hashes.
* **🛠️ How to Use:** Trigger on final drafts to catch dead URLs, missing asset credits, and high-risk regulatory terms.
* **📊 Maturity & Trust:** `Production Pinned` | ⭐ content-machine Harness | 🛡️ *Fail-closed public readiness check with asset-level provenance ledger*
* **Clients:** Claude Code, Antigravity, Codex CLI
* **Target Persona:** Content Creators, Editors, Media Production Teams
* **Install Command:**
  ```bash
  git clone https://github.com/45ck/content-machine.git && cp -R content-machine/skills/publish-prep-review .agents/skills/
  ```

#### [`AI Attribution Framework (ismet55555)`](https://github.com/ismet55555/ai-attribution)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Attribution ledger: Updates local AI_ATTRIBUTION.md whenever substantive logic or text is produced.*
* **💡 Why Everyday People Should Care:** Generates standard AI usage disclosures complying with academic publisher guidelines (Nature, Elsevier, CRediT taxonomy).
* **🎯 Why Chosen:** Replaces crude all-or-nothing disclaimers with a standardized 6-level creative control spectrum, enabling third parties to understand exactly what the human did vs what the AI suggested.
* **🛠️ How to Use:** Answer guided questions about AI involvement to produce publisher-compliant disclosure paragraphs.
* **📊 Maturity & Trust:** `Active Open Specification` | ⭐ AI Attribution Standard | 🛡️ *Standardized 6-level human-AI contribution spectrum ledger*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Software Engineers, Authors, Technical Writers
* **Install Command:**
  ```bash
  curl -sL https://raw.githubusercontent.com/ismet55555/ai-attribution/main/AI_ATTRIBUTION.md -o AI_ATTRIBUTION.md
  ```

#### [`AI Disclosure Convention SPDX-style (ggfevans)`](https://github.com/ggfevans/ai-disclosure)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Header tagging: Injects machine-readable SPDX-style tags directly into code comments or document frontmatter.*
* **💡 Why Everyday People Should Care:** SPDX-style machine-readable metadata format declaring AI tools used, licensing, and human validation status.
* **🎯 Why Chosen:** Survives git rebases and file refactors. Injects lightweight, machine-readable W3C AI Content Disclosure tags directly into file headers, making attribution permanent and verifiable.
* **🛠️ How to Use:** Run the generator to create an `AI-DISCLOSURE.md` manifest in your repository root.
* **📊 Maturity & Trust:** `Active Specification` | ⭐ W3C-aligned Convention | 🛡️ *Language-agnostic file-level attribution convention based on W3C vocabularies*
* **Clients:** Cursor, Antigravity, Claude Code, Copilot
* **Target Persona:** Developers, Authors, Compliance Officers
* **Install Command:**
  ```bash
  git clone https://github.com/ggfevans/ai-disclosure.git .agents/skills/ai-disclosure
  ```

#### [`Skill Provenance Tracker (snapsynapse)`](https://github.com/snapsynapse/skill-provenance)
* **Workflow Timing:** 🧹 Post-Session (Privacy Cleanup & Logs) — *Session logging: Tracks exact skill versions, tool calls, and model seeds across multi-turn sessions.*
* **💡 Why Everyday People Should Care:** Logs all tool invocations and skills executed during a session, creating an immutable audit trail of automated actions.
* **🎯 Why Chosen:** Provides cryptographic traceability for complex agent executions, producing verifiable execution receipts that prove which skills touched what data.
* **🛠️ How to Use:** Enable alongside your agent to generate a session receipt documenting every tool executed.
* **📊 Maturity & Trust:** `Production Active` | ⭐ snapsynapse Framework | 🛡️ *Cryptographic execution and invocation ledger*
* **Clients:** Claude Code, Antigravity
* **Target Persona:** Auditors, Enterprise Researchers, System Architects
* **Install Command:**
  ```bash
  git clone https://github.com/snapsynapse/skill-provenance.git .agents/skills/skill-provenance
  ```

#### [`Verification Before Completion (obra/superpowers)`](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Prior to completion claim: Enforces "The Iron Law" — no completion claims without fresh verification command evidence.*
* **💡 Why Everyday People Should Care:** AI frequently hallucinates that a task is finished and tested without actually running tests. This skill enforces hard evidence before any completion claim.
* **🎯 Why Chosen:** The legendary "Iron Law" of superpowers (290k★). Prohibits premature "done" claims by requiring actual command outputs and test passes before handing work to users.
* **🛠️ How to Use:** Functions as an uncompromising agent guardrail that halts completion claims unless verified command outputs are produced.
* **📊 Maturity & Trust:** `Battle-Tested Standard (290k ★)` | ⭐ Superpowers Agent Framework | 🛡️ *Authored by Jesse Vincent (obra) & widespread agent community*
* **Clients:** Cursor, Antigravity, Claude Code
* **Target Persona:** Developers, Editors, Writers, Operations Specialists
* **Install Command:**
  ```bash
  git clone https://github.com/obra/superpowers.git && cp -R superpowers/skills/verification-before-completion .agents/skills/
  ```

#### [`Humanizer (blader/humanizer)`](https://github.com/blader/humanizer)
* **Workflow Timing:** 📤 Pre-Handoff (Audit & Verification Gates) — *Pre-broadcast polish: Removes AI prose tells, robotic clichés, and inflated triads based on Wikipedia guidelines.*
* **💡 Why Everyday People Should Care:** AI writing often carries unmistakable, hollow clichés that alienate readers and trigger platform downranking. Humanizer restores authentic human tone.
* **🎯 Why Chosen:** Grounded in Wikipedia's editorial standards for identifying AI writing. 51k+ stars on GitHub, providing indispensable polish to keep text credible and authentic.
* **🛠️ How to Use:** Prompt the agent: "Apply humanizer to remove AI tells and retain authentic voice" before final publication.
* **📊 Maturity & Trust:** `Production Hit (51k ★)` | ⭐ Widely used in publishing and content workflows | 🛡️ *Blader open-source project based on Wikipedia standards*
* **Clients:** Claude Code, Cursor, Antigravity
* **Target Persona:** Writers, Marketers, Journalists, Students, Anyone publishing text
* **Install Command:**
  ```bash
  git clone https://github.com/blader/humanizer.git && cp -R humanizer/.agents/skills/humanizer .agents/skills/
  ```

---

## 🤝 Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.

## 📄 License

[MIT](LICENSE) © 2026 Digital Rights for All & Responsible AI Use Contributors
