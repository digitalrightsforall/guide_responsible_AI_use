# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Vetted Skills](https://img.shields.io/badge/Vetted%20Skills-43%20Curated-8a2be2.svg)](#-the-four-practical-questions-skills-catalog) [![Format: SKILL.md](https://img.shields.io/badge/Format-SKILL.md-success.svg)](https://agentskills.io) [![Remote Health](https://img.shields.io/badge/URLs%20Health-43%2F43%20Live-brightgreen.svg)](#-operational-status--verified-evidence-methodology) [![Community](https://img.shields.io/badge/Community-putongren.org-orange.svg)](https://putongren.org)

> A curated collection of 43 production-ready `SKILL.md` packages designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.

**English** | [中文版](README_CN.md) | 📖 [Practical Field Guide](https://putongren.org/ai-skills/) | 🛡️ [Interactive Skill Library](https://putongren.org/ai-skills/library.html)

---

## 🌟 Project Ecosystem: Dual-Engine Architecture

This project operates as a dual-engine resource for everyone using modern LLMs and agentic IDEs:

1. 📖 **[The Practical Field Guide (实务长篇指南)](https://putongren.org/ai-skills/)** (*Web Homepage / `site/index.html`*):
   A comprehensive, narrative-driven walkthrough that deconstructs the silent risks of the algorithmic era, explains why abstract ethics fail at the desktop, and orchestrates all 43 skills across **5 daily workflow scenarios** with 112 clickable inline skill pills and persona playbooks.

2. 🛡️ **[The Interactive Skill Library (实务技能库)](https://putongren.org/ai-skills/library.html)** (*Web Catalog / `site/library.html`*):
   A responsive, searchable web application with instant category and timing filters, live keyword search, detailed evaluation modals, verified third-party media reviews, and one-click copyable CLI installation commands.

3. 💻 **[The Open-Source GitHub Repository](https://github.com)** (*This Repo*):
   The canonical source of truth containing standardized data schemas (`site/data/items.json`), automated quality gate scripts, and documentation.

---

## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)

This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyone protect their rights, privacy, and agency in the algorithmic era.

In this project, we curate **existing, proven open-source skills** (we strictly curate, not invent). The practical connotation of responsible and safe AI use is unpacked into two dynamic pillars:

1. **🛡️ Inward: Self-Defense & Boundaries (对内·自我防护与边界)**:
   - **Prevent Data Over-Harvesting**: Guard against commercial LLM vendors silently turning your draft proposals, interview transcripts, and private source code into their next-generation training corpora.
   - **Pierce Confident Hallucinations & Sycophancy**: Guard against models fabricating citations with high conviction or flattering your flawed premises, preserving human critical judgment.

2. **📐 Outward: Third-Party Verifiability (对外·成果第三方可核验)**:
   - **Auditable Evidence Chains**: Ensure that when you deliver an AI-assisted report, code change, or paper, colleagues, clients, and readers can readily audit the source evidence, reasoning logs, and data anchors.
   - **Concrete Publication Gates**: Replace hollow, bureaucratic disclaimer footers with hard pre-release verification gates (advertising claims verification, SPDX license compliance, secret scanning, WCAG accessibility).

> [!NOTE]
> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid doctrine.

---

## 🧭 Table of Contents

* [🌟 Project Ecosystem: Dual-Engine Architecture](#-project-ecosystem-dual-engine-architecture)
* [💡 Core Philosophy](#-core-philosophy-responsible-and-safe-ai-use-dynamic-framework)
* [📦 Client Installation Guide](#-client-installation-guide)
* [🔬 Operational Status & Verified Evidence Methodology](#-operational-status--verified-evidence-methodology)
* [📂 The Four Practical Questions (Skills Catalog)](#-the-four-practical-questions-skills-catalog)
  * [1. What can I feed to AI?](#1-what-can-i-feed-to-ai)
  * [2. Which answers can I trust?](#2-which-answers-can-i-trust)
  * [3. When should I NOT listen to AI?](#3-when-should-i-not-listen-to-ai)
  * [4. Can the output be published directly?](#4-can-the-output-be-published-directly)
* [🗂️ Repository Structure](#️-repository-structure)
* [🧪 Local Development & Quality Gates](#-local-development--quality-gates)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## 📦 Client Installation Guide

All skills in this repository strictly adhere to the open **Agent Skills specification** (`SKILL.md`). To load skills into your favorite client:

### Directory Layout by Platform

* **Claude Code:**
  ```bash
  # Project-level skill (recommended, shared with repo)
  mkdir -p .claude/skills/<skill-name>/
  # User-global skill (accessible across all sessions)
  mkdir -p ~/.claude/skills/<skill-name>/
  ```

* **Cursor & Google Antigravity:**
  ```bash
  mkdir -p .agents/skills/<skill-name>/
  ```

> [!IMPORTANT]
> **Copy the entire skill directory**: Many advanced skills bundle executable Python/Bash validation scripts, threat pattern databases, and reference templates. Never copy only `SKILL.md` in isolation—always copy the entire skill directory.

---

## 🔬 Operational Status & Verified Evidence Methodology

To ensure absolute transparency and banish obscure technical jargon, each skill is rated with plain-language, verifiable indicators:

* **🟢 Ready to Use (Verified):** Pure prompt/rules engineering conforming to the `SKILL.md` specification with zero local binary dependencies. Effective immediately upon placement into the client skill directory. All workflow steps have passed local syntax and logic testing.
* **🟡 Requires Setup (Ready):** Requires a local environment dependency (e.g. Python 3.10+, SpaCy NER model, Gitleaks scanner) or a dedicated API token. Clear prerequisites are documented in the skill details.
* **100% Remote Verification:** All 43 repositories are verified live via `npm run test:remote` (43/43 HTTP 200). We enforce zero placeholders and zero synthetic prompts.

---

## 📂 The Four Practical Questions (Skills Catalog)

### 1. What can I feed to AI?
*Guarding against commercial AI over-harvesting personal identity (PII), confidential client data, and proprietary drafts.*

| # | Skill Name | Timing | Status | Technical Standard | Core Defense / Summary |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**PII Safe Documents (danyuchn/pii-guard)**](https://github.com/danyuchn/pii-guard) | ⏳ Pre-Input | 🟢 Ready | Microsoft Presidio PII Taxonomy & Local Sandbox De-Identification Standard (Microsoft / Open Source Privacy Standards) | Creates a reversible, locally redacted working copy while treating the cloud LLM as untrusted. Prohibits the agent from opening, searching, or uploading the raw original. |
| 2 | [**Scholar Safety (joshzyj/open-scholar-skill)**](https://github.com/joshzyj/open-scholar-skill) | ⏳ Pre-Input | 🟢 Ready | IRB & HIPAA Institutional Compliance Matrix in Research Workflows (US HHS Office for Human Research Protections (OHRP)) | Executes a pre-ingestion sensitivity scan before files are read into context. Gates IRB/HIPAA/restricted research data and offers local-only Bash analysis without raw-data transmission. |
| 3 | [**Skill Sanitizer (cyberxuan-XBX/skill-sanitizer)**](https://github.com/cyberxuan-XBX/skill-sanitizer) | ⏳ Pre-Input | 🟢 Ready | OWASP Top 10 for LLM Applications: LLM06 Sensitive Information Disclosure (OWASP GenAI Foundation) | A local meta-security scanner that intercepts incoming SKILL.md files and checks for hidden prompt injections, suspicious bash operations, and exfiltration payloads before loading. |
| 4 | [**PII Detection Pipeline (mukul975/Privacy-Data-Protection-Skills)**](https://github.com/mukul975/Privacy-Data-Protection-Skills) | ⏳ Pre-Input | 🟡 Setup | EU GDPR Article 30 Technical Guidance & Data Minimization Principles (European Data Protection Board (EDPB)) | Automated local PII classification pipeline adhering to agentskills.io spec, masking sensitive entities prior to upstream LLM transmission. |
| 5 | [**OpenMed Clinical Document Ingestion (maziyarpanahi)**](https://github.com/maziyarpanahi/openmed) | ⏳ Pre-Input | 🟢 Ready | HHS HIPAA Safe Harbor Method for De-identification (18 PHI Rules) (US Department of Health and Human Services (HHS)) | Specialized clinical ingestion skill that detects and redacts Protected Health Information (PHI) and patient identifiers from medical texts before agent processing. |
| 6 | [**AREX Presidio Anonymize Text (VectorSpaceLab)**](https://github.com/VectorSpaceLab/AREX-Skill) | ⏳ Pre-Input | 🟡 Setup | Microsoft Presidio Anonymizer Engine Architecture & Pseudonymization Standard (Microsoft Open Source Engineering) | AgentSkills-compliant anonymization package that scans text buffers for sensitive entities using Microsoft Presidio and replaces them with anonymized tokens. |
| 7 | [**SkillGuard (LLMSecurity/skillguard)**](https://github.com/LLMSecurity/skillguard) | ⏳ Pre-Input | 🟢 Ready | MITRE ATLAS AML.T0051: Defenses Against LLM Prompt Injections (MITRE Corporation & OWASP) | Audits agent skills and plugins against OWASP Agentic Top 10 and MITRE ATLAS before installation, blocking prompt injections and data leaks. |
| 8 | [**Skill Sentinel (EvolutionUnleashed/skill-sentinel)**](https://github.com/EvolutionUnleashed/skill-sentinel) | ⏳ Pre-Input | 🟢 Ready | CWE-78: OS Command Injection Defenses in Agentic Terminal Tools (MITRE Common Weakness Enumeration) | Heuristic security scanner detecting prompt injection, data exfiltration, and supply chain threats inside SKILL.md instruction files. |
| 9 | [**Nova Proximity (Nova-Hunting/nova-proximity)**](https://github.com/Nova-Hunting/nova-proximity) | ⏳ Pre-Input | 🟢 Ready | Anthropic Model Context Protocol (MCP) Security Architecture & Trust Model (Anthropic & MCP Working Group) | Security scanner for MCP servers and agent skills, detecting privilege escalation, sensitive file access, and credential theft. |
| 10 | [**Security Threat Model (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(security)/security-threat-model) | ⏳ Pre-Input | 🟢 Ready | Microsoft Threat Modeling for AI/ML Systems Guidelines (STRIDE / DREAD) (Microsoft Security Engineering) | Generates evidence-backed threat models to delineate system trust boundaries and explicitly bar confidential assets from LLM ingestion. |

> 💡 **Need full 7-dimension breakdowns and 1-click install commands?**
> Explore the **[Interactive Skill Library](https://putongren.org/ai-skills/library.html#feed-to-ai)** or read the **[Practical Field Guide](https://putongren.org/ai-skills/)** to inspect verified third-party media reviews, standards provenance, and copy terminal install commands with a single click.

---

### 2. Which answers can I trust?
*Guarding against blind faith in hallucinated citations, fabricated data points, and unverified factual assertions.*

| # | Skill Name | Timing | Status | Technical Standard | Core Defense / Summary |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**Post-Generation Fact-Check (jwynia/agent-skills)**](https://github.com/jwynia/agent-skills) | 💬 During-Chat | 🟢 Ready | Self-Refine: Iterative Reasoning and Post-Generation Verification (NeurIPS) (Neural Information Processing Systems (NeurIPS)) | Forces verification into an independent pass after generation: extracts checkable claims, queries external sources, and rejects model memory as evidence. |
| 2 | [**Citation Faithfulness Checker (CanXiangCC/aminer-open-skill)**](https://github.com/CanXiangCC/aminer-open-skill) | 💬 During-Chat | 🟢 Ready | Tsinghua KEG & AMiner: Citation Faithfulness & Provenance Benchmarks (清华大学计算机系知识工程实验室 (KEG) & AMiner) | Fetches cited literature and verifies whether the cited source body actually supports the claim attributed to it, assigning structured verdicts. |
| 3 | [**BibRef Verify (yzhao062/agent-config)**](https://github.com/yzhao062/agent-config) | 💬 During-Chat | 🟡 Setup | CrossRef & DBLP REST API Bibliographic Verification Standards (CrossRef (Publishers International Linking Association)) | Audits an existing .bib bibliography for hallucinated references and stale metadata without modifying original files, generating an actionable audit report. |
| 4 | [**Citation Integrity Auditor (scdenney/open-science-skills)**](https://github.com/scdenney/open-science-skills) | 💬 During-Chat | 🟢 Ready | Center for Open Science (COS): Research Integrity & Citation Reproducibility (Center for Open Science (COS) / Open Science Framework (OSF)) | Audits the citation layer of manuscripts against Crossref and OpenAlex, verifying DOI resolution and flagging AI-invented sources as NOT CHECKED rather than guessing. |
| 5 | [**jkitchin/skillz (citation-verifier)**](https://github.com/jkitchin/skillz) | 💬 During-Chat | 🟢 Ready | Prof. John Kitchin (CMU): Computable Science & Automated Citation Verification (Carnegie Mellon University) | Validates bibliography items against Crossref and PubMed records, alerting users to phantom papers or retracted literature. |
| 6 | [**Claim–Source Fact Checker (scdenney/open-science-skills)**](https://github.com/scdenney/open-science-skills) | 💬 During-Chat | 🟢 Ready | FEVER: International Benchmark for Fact Extraction and VERification (FEVER Academic Consortium) | Verifies claims against local Markdown source files to detect overclaiming, direction inversion, scope creep, and misattribution. |
| 7 | [**Hallucination Risk Reviewer (Notysoty/openagentskills)**](https://github.com/Notysoty/openagentskills) | 💬 During-Chat | 🟢 Ready | Survey of Hallucination in Natural Language Generation (ACM Surveys) (Association for Computing Machinery (ACM)) | Performs claim-level hallucination-risk triage, scrutinizing citations, URLs, quotes, and version-specific assertions against an explicit consequence rubric. |
| 8 | [**Vectara Hallucination Corrector HHEM (vectara)**](https://github.com/vectara/agent-skills) | 💬 During-Chat | 🟡 Setup | Vectara Hughes Hallucination Evaluation Model (HHEM) Leaderboard & Benchmark (Vectara AI Research) | Evaluates factual consistency of generated text against source documents using HHEM, stripping ungrounded claims rather than guessing. |
| 9 | [**K-Dense Scientific Peer Review (K-Dense-AI)**](https://github.com/K-Dense-AI/scientific-agent-skills) | 💬 During-Chat | 🟢 Ready | Nature Machine Intelligence: Ethical Standards in AI-Assisted Peer Review (Nature Portfolio (Springer Nature)) | Performs rigorous academic peer-review verification on scientific drafts, validating logical derivation steps and empirical conclusions. |
| 10 | [**The Judge (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/the-judge) | 💬 During-Chat | 🟢 Ready | Martin Fowler: Evidence-Driven Architecture & Verification Gates (ThoughtWorks / Martin Fowler Architecture Foundation) | Evidence-first adjudication skill enforcing "Evidence or silence" — claims without verified file citations or live official URLs are rejected. |

> 💡 **Need full 7-dimension breakdowns and 1-click install commands?**
> Explore the **[Interactive Skill Library](https://putongren.org/ai-skills/library.html#answers-to-trust)** or read the **[Practical Field Guide](https://putongren.org/ai-skills/)** to inspect verified third-party media reviews, standards provenance, and copy terminal install commands with a single click.

---

### 3. When should I NOT listen to AI?
*Guarding against automation bias, sycophancy, and delegating non-delegable ethical or professional judgments.*

| # | Skill Name | Timing | Status | Technical Standard | Core Defense / Summary |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**The Fool (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills) | 💬 During-Chat | 🟢 Ready | Daniel Kahneman: Dual-Process Cognitive Bias Defense & Socratic Dialectics (Cognitive Science & Decision Making Foundations) | Acts as a deliberate devil's advocate that probes hidden assumptions, dialectical counterarguments, and failure modes to shatter premature consensus. |
| 2 | [**Sycophancy Challenger (mohitagw15856/pm-claude-skills)**](https://github.com/mohitagw15856/pm-claude-skills) | 💬 During-Chat | 🟢 Ready | Anthropic Research: Towards Understanding Sycophancy in Language Models (Anthropic Research) | Flips the assistant into adversarial mode, forbidding it from softening critiques unless the user provides fresh, dispositive evidence. |
| 3 | [**jihlenburg/mad-skills (devils-advocate)**](https://github.com/jihlenburg/mad-skills) | 💬 During-Chat | 🟢 Ready | Encouraging Divergent Thinking in LLMs via Multi-Agent Debate (MAD Research Collective (Liang et al.)) | Spawns a critical sub-agent to stress-test plans and drafts across 8 distinct failure modes before proposals are committed. |
| 4 | [**Godfly Opposing Counsel (CassioRoos/godfly-skills)**](https://github.com/CassioRoos/godfly-skills) | 💬 During-Chat | 🟢 Ready | Adversarial Legal Cross-Examination Protocol & Socratic Gadfly Method (Classical Jurisprudence & Dialectical Philosophy) | Generates a structured Opposing Brief for high-stakes decisions by attacking load-bearing assumptions and quantifying irreversible costs. |
| 5 | [**Devil's Advocate Reviewer Agent (Imbad0202)**](https://github.com/Imbad0202/academic-research-skills) | 💬 During-Chat | 🟢 Ready | Harvard Business Review: Performing a Project Pre-Mortem (Gary Klein) (Harvard Business Publishing) | Assumes an adversarial posture to locate logical gaps in research papers, featuring strict rules that prevent conceding critiques to user pressure. |
| 6 | [**Multi-Perspective Red-Team Review (mohitagw15856)**](https://github.com/mohitagw15856/pm-claude-skills) | 💬 During-Chat | 🟢 Ready | NIST Artificial Intelligence Risk Management Framework (AI 100-1) (National Institute of Standards and Technology (NIST)) | Stress-tests proposals through multiple deliberately conflicting stakeholder lenses, ranking blind spots by likelihood × impact and running pre-mortems. |
| 7 | [**Devil's Advocate Anti-Sycophancy (molly-diversifiedfun)**](https://github.com/molly-diversifiedfun/claude-skills) | 💬 During-Chat | 🟢 Ready | Discovering Language Model Behaviors with Model-Written Evaluations (Perez et al.) (AI Alignment Research Community) | Adversarial thinking partner built around pre-mortems and Socratic inquiry, enforcing an explicit anti-sycophancy contract that forbids conversational appeasement. |
| 8 | [**The Jury (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(decision-making)/the-jury) | 💬 During-Chat | 🟢 Ready | Condorcet's Jury Theorem: Mathematics of Distributed Deliberation (Social Choice Theory & Collective Intelligence) | Multi-agent jury deliberation protocol under anti-anchoring and anti-sycophancy rules with preserved dissenting opinions. |
| 9 | [**Discernment Nudge (anthropics/skills)**](https://github.com/anthropics/skills/tree/main/skills/discernment-nudge) | 💬 During-Chat | 🟢 Ready | Anthropic Research: Cultivating Human Critical Discernment with AI (Anthropic) | Official Anthropic skill appending targeted questions to substantive outputs to prompt verification of assumptions and missing context. |
| 10 | [**Review Reception & Anti-Compliance (obra/superpowers)**](https://github.com/obra/superpowers/tree/main/skills/receiving-code-review) | 💬 During-Chat | 🟢 Ready | Superpowers Framework: Receiving Code Review & Anti-Compliance Principle (Jesse Vincent (obra) / Superpowers Framework) | Enforces technical evaluation over social compliance when receiving feedback — demands verification before implementation and rejects performative agreement. |

> 💡 **Need full 7-dimension breakdowns and 1-click install commands?**
> Explore the **[Interactive Skill Library](https://putongren.org/ai-skills/library.html#when-not-to-listen)** or read the **[Practical Field Guide](https://putongren.org/ai-skills/)** to inspect verified third-party media reviews, standards provenance, and copy terminal install commands with a single click.

---

### 4. Can the output be published directly?
*Ensuring third-party verifiability, provenance tracking, and explicit publication gates.*

| # | Skill Name | Timing | Status | Technical Standard | Core Defense / Summary |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | [**AI Provenance (noheton/f-ai2-r)**](https://github.com/noheton/f-ai2-r) | 📤 Pre-Handoff | 🟢 Ready | W3C PROV-O: The International Provenance Ontology Standard (World Wide Web Consortium (W3C)) | Maintains an immutable provenance record of AI-assisted work (model versions, prompt hashes, verification states) and derives human-readable AI-use disclosures. |
| 2 | [**Publish Gate (StiflerMaxwell/vertu-english-publishing-workflow)**](https://github.com/StiflerMaxwell/vertu-english-publishing-workflow) | 📤 Pre-Handoff | 🟢 Ready | Google Search Central: Guidance on AI-Generated Content and EEAT Quality (Google Search Central) | Enforces a strict PASS/FIX/BLOCK gate over drafts. Crucially, the writing agent is forbidden from publishing directly; human authorization is required. |
| 3 | [**PR AI Disclosure Gate (harlan-zw/harlan-agent-kit)**](https://github.com/harlan-zw/harlan-agent-kit) | 📤 Pre-Handoff | 🟢 Ready | Open Source Initiative (OSI) Policy on AI-Assisted Code Contributions (Open Source Initiative (OSI) & Linux Foundation) | Enforces a visible AI-writing disclosure whenever drafting PRs or release notes, refusing to submit if the mandated transparency disclosure is missing. |
| 4 | [**GDPR Compliance Audit (mukul975/Privacy-Data-Protection-Skills)**](https://github.com/mukul975/Privacy-Data-Protection-Skills) | 🧹 Post-Session | 🟢 Ready | EU GDPR Article 22: Automated Individual Decision-Making Rights (European Union Legal Framework) | Audits deliverables and workflows against GDPR articles, verifying user consent, purpose limitation, and data minimization before launch. |
| 5 | [**Publish Prep Review (45ck/content-machine)**](https://github.com/45ck/content-machine) | 📤 Pre-Handoff | 🟢 Ready | Associated Press: Newsroom Guidelines for Generative AI & Human Oversight (The Associated Press (AP)) | Gates finalized content before human upload review, verifying final artifacts, scripts, publishing metadata, and asset provenance against a fail-closed policy. |
| 6 | [**AI Disclosure Convention SPDX-style (ggfevans)**](https://github.com/ggfevans/ai-disclosure) | 📤 Pre-Handoff | 🟢 Ready | SPDX (Software Package Data Exchange) ISO/IEC 5962:2021 International Standard (Linux Foundation & ISO) | Embeds lightweight, machine-readable AI Content Disclosure tags into file header comments, ensuring provenance data survives git rebases. |
| 7 | [**Skill Provenance Tracker (snapsynapse)**](https://github.com/snapsynapse/skill-provenance) | 🧹 Post-Session | 🟢 Ready | IETF & W3C Verifiable Credentials and Ledger-Backed Execution Manifests (Internet Engineering Task Force (IETF) & W3C) | Tracks skill versions, invocation contexts, and data flow across agent sessions, generating tamper-evident execution receipts for compliance review. |
| 8 | [**Verification Before Completion (obra/superpowers)**](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) | 📤 Pre-Handoff | 🟢 Ready | Superpowers Framework: The Iron Law of Verification (290k★ Stars) (Jesse Vincent (obra) / Superpowers Framework) | Enforces the Iron Law: evidence before assertions always. Requires running actual verification commands before claiming completion or publishing. |
| 9 | [**Humanizer (blader/humanizer)**](https://github.com/blader/humanizer) | 📤 Pre-Handoff | 🟢 Ready | Wikipedia:Signs of AI-generated text (Official Community Guideline) (Wikimedia Foundation / Wikipedia Editors Community) | Rewrites AI-sounding text to remove AI tells, filler, and forced triads based on Wikipedia editorial guidelines before publication. |
| 10 | [**Marketing Claims Review (anthropics/claude-for-legal)**](https://github.com/anthropics/claude-for-legal/tree/main/product-legal/skills/marketing-claims-review) | 📤 Pre-Handoff | 🟢 Ready | FTC Policy Statement on Advertising Substantiation & Endorsement Guides (16 CFR Part 255) (US Federal Trade Commission (FTC)) | Extracts claims from AI copy, categorizes into puffery vs factual/absolute, and enforces regulatory substantiation before publishing. |
| 11 | [**Web Accessibility Gate (tech-leads-club/agent-skills)**](https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(quality)/web-accessibility) | 📤 Pre-Handoff | 🟢 Ready | W3C Web Content Accessibility Guidelines (WCAG 2.1 AA / ISO/IEC 40500:2012) (World Wide Web Consortium (W3C) & ISO) | Audits and remediates AI-generated web interfaces following W3C WCAG 2.1 AA standards for keyboard navigation, contrast, and ARIA labels. |
| 12 | [**Repo Security & Secret Gate (Consensys)**](https://github.com/Consensys/repo-security-review) | 📤 Pre-Handoff | 🟢 Ready | OWASP Top 10 Application Security Risks & Gitleaks Secret Detection Framework (OWASP Foundation & Consensys Security) | Orchestrates multi-phase security review including Gitleaks secret scanning and OWASP vulnerability detection before code is merged or published. |
| 13 | [**License Compliance Audit (apache/magpie)**](https://github.com/apache/magpie/tree/main/plugins/magpie-repo-health/skills/license-compliance-audit) | 📤 Pre-Handoff | 🟢 Ready | SPDX (Software Package Data Exchange) ISO/IEC 5962:2021 & Apache Licensing Policy (Linux Foundation, ISO & Apache Software Foundation) | Performs read-only license hygiene audit, verifying LICENSE existence, NOTICE completeness, and SPDX header consistency across source files. |

> 💡 **Need full 7-dimension breakdowns and 1-click install commands?**
> Explore the **[Interactive Skill Library](https://putongren.org/ai-skills/library.html#can-publish-directly)** or read the **[Practical Field Guide](https://putongren.org/ai-skills/)** to inspect verified third-party media reviews, standards provenance, and copy terminal install commands with a single click.

---

## 🗂️ Repository Structure

```text
.
├── site/                       # Static Web Application
│   ├── index.html              # 📖 Practical Field Guide (实务长篇指南)
│   ├── library.html            # 🛡️ Interactive Skill Library (实务技能库)
│   ├── css/style.css           # Styling, typography & theme system
│   ├── js/
│   │   ├── guide.js            # Guide logic, scrollspy & inline modals
│   │   └── library.js          # Library search, filter & detail modals
│   ├── data/
│   │   └── items.json          # Master database of all 43 vetted skills
│   └── sitemap.xml             # Search engine optimization index
├── scripts/                    # Automation & Quality Gate Tooling
│   ├── verify-data.js          # Schema & integrity test gate (npm test)
│   ├── verify-remote.js        # Live HTTP 200 health check (npm run test:remote)
│   ├── generate-readmes.js     # Auto-regenerate README.md & README_CN.md (npm run build)
│   └── serve.js                # Dual-port static server (npm run serve)
├── CONTRIBUTING.md             # Standards, schema & submission guide
├── README.md                   # English Master Documentation
├── README_CN.md                # Chinese Master Documentation
└── package.json
```

---

## 🧪 Local Development & Quality Gates

This repository maintains strict engineering and verification standards:

```bash
# 1. Validate data schema and 100% SKILL.md format constraint
npm test

# 2. Test live HTTP 200 reachability for all 43 remote GitHub repositories
npm run test:remote

# 3. Regenerate English & Chinese READMEs from site/data/items.json
npm run build

# 4. Launch local preview server
npm run serve
# Open http://localhost:3000 (Field Guide) or http://localhost:3000/library.html (Skill Library)
```

---

## 🤝 Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.

## 📄 License

[MIT](LICENSE) © 2026 Digital Rights for All (putongren.org) & Responsible AI Use Contributors
