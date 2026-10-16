# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Vetted Skills](https://img.shields.io/badge/Vetted%20Skills-44%20Curated-8a2be2.svg)](https://rai.putongren.org/library.html) [![Case Law & Incidents](https://img.shields.io/badge/Judicial%20Cases-31%20Verified-rose.svg)](https://rai.putongren.org/incidents.html) [![Format: SKILL.md](https://img.shields.io/badge/Format-SKILL.md-success.svg)](https://agentskills.io) [![Remote Health](https://img.shields.io/badge/URLs%20Health-44%2F44%20Live-brightgreen.svg)](#-operational-status--verified-evidence-methodology) [![Community](https://img.shields.io/badge/Community-putongren.org-orange.svg)](https://putongren.org)

> A curated collection of **44 production-ready `SKILL.md` packages** and **31 authentic judicial & regulatory cases**, empowering everyday knowledge workers, researchers, developers, writers, and administrative staff to practice **Responsible and Safe AI Use**—protecting private data from silent harvesting, guarding against hallucinations and algorithmic sycophancy, and ensuring deliverables are verifiable by third parties.

**English** | [中文版](README_CN.md) | 📖 [Practical Field Guide](https://rai.putongren.org/) | 🛡️ [Interactive Skill Library](https://rai.putongren.org/library.html) | ⚖️ [Incident & Case Law Database](https://rai.putongren.org/incidents.html)

---

## 🌟 Project Ecosystem: Tri-Pillar Architecture

Rather than staying as an abstract ethical manifesto, this project is built as an interactive, **three-in-one practical toolkit** for anyone using commercial LLMs and modern AI Agent IDEs:

* 📖 **[The Practical Field Guide (实务长篇指南)](https://rai.putongren.org/)** (*Homepage / `site/index.html`*):
  A comprehensive, narrative-driven walkthrough that deconstructs the silent risks of the algorithmic era, sets platform anti-retention baselines, provides a 30-second safety cheat sheet, orchestrates all 44 skills across **6 daily workflow scenarios**, and provides 5 persona battle playbooks with interactive inline skill cards.

* 🛡️ **[The Interactive Skill Library (实务技能库)](https://rai.putongren.org/library.html)** (*Web Catalog / `site/library.html`*):
  A responsive, searchable web catalog of **44 vetted open-source skills**. Filterable by the 4 Practical Questions and 4 workflow timings, with genuine client harness tags, transparent maturity indicators, and copyable installation commands.

* ⚖️ **[The Real-World Incident & Case Law Database (真实判例与案例库)](https://rai.putongren.org/incidents.html)** (*Case Library / `site/incidents.html`*):
  A curated repository of **31 authentic judicial judgments, regulatory penalties, and official security advisories** (including landmark AI voice infringement rulings, court reprimands for fabricated AI citations, AMR administrative fines for AI false advertising, and employee discipline for uploading confidential drafts). Each incident links directly to official case numbers, authentic source documents, and matching defensive skills.

* 💻 **[The Open-Source GitHub Repository](https://github.com/digitalrightsforall/guide_responsible_AI_use)** (*This Repo*):
  The canonical source of truth containing standardized data schemas (`site/data/items.json`, `site/data/incidents.json`), automated quality gate scripts, and local developer tooling.

---

## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)

This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyday people protect their rights, privacy, and agency in the algorithmic era.

Abstract ethical principles ("fairness", "transparency", "beneficence") often fail at the desktop because they don't tell users what to do when pasting sensitive data into a prompt or reviewing an AI-generated draft. In this project, we curate **existing, proven open-source skills** and anchor responsible AI practice into two dynamic pillars:

1. **🛡️ Inward: Self-Defense & Boundary Enforcement (对内·自我防护与边界)**:
   - **Prevent Data Over-Harvesting & Mosaic Profiling**: Guard against commercial LLM vendors silently turning your draft proposals, interview transcripts, and private source code into their next-generation training corpora. Redact PII and quasi-identifiers locally before ingestion.
   - **Verify Confident Hallucinations & Break Sycophancy**: Guard against models fabricating citations with high conviction or flattering your flawed premises, preserving human critical judgment.
   - **Agent Execution Sandbox**: Confine autonomous AI Agents with microVM sandboxes and permission gates to prevent destructive host file deletions or credential theft.

2. **📐 Outward: Third-Party Verifiability & Legal Compliance (对外·成果第三方可核验)**:
   - **Auditable Evidence Chains**: Ensure that when you deliver an AI-assisted report, code change, or paper, colleagues, clients, and readers can readily audit the source evidence, reasoning logs, and data anchors.
   - **Concrete Publication Gates**: Replace hollow disclaimer footers with hard pre-release verification gates (advertising claims verification, SPDX license compliance, secret scanning, WCAG accessibility).

> [!NOTE]
> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid doctrine.

---

## 🧭 The Four Practical Questions

Rather than debating abstract ethics, this project anchors responsible and safe AI use in **four urgent desktop questions**. All 44 production-ready skills are organized around these questions:

| Practical Question | Threat Addressed & Core Connotation | Skills Count | Web Explorer |
| :--- | :--- | :---: | :--- |
| **1. What can I feed to AI?** | Prevent commercial LLMs from harvesting proprietary drafts, sensitive cases, and PII into training corpora; intercept prompt injections | **11 Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#feed-to-ai) |
| **2. Which answers can I trust?** | Verify confident hallucinations, fake DOI citations, fabricated numbers, and plausible falsehoods | **10 Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#answers-to-trust) |
| **3. When should I NOT listen to AI?** | Break algorithmic sycophancy and automation bias to defend human critical scrutiny and judgment | **10 Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#when-not-to-listen) |
| **4. Can the output be published directly?** | Enforce advertising substantiation, SPDX license hygiene, secret scanning, and accessibility gates | **13 Skills** | [👉 Explore in Skill Library](https://rai.putongren.org/library.html#can-publish-directly) |

> 🌟 **Explore the Full Interactive Platform**:
> - 📖 **[Read the Practical Field Guide](https://rai.putongren.org/)**: Deep narrative walking through 6 real-world workflow scenarios with clickable inline skill pills.
> - 🛡️ **[Explore the Interactive Skill Library](https://rai.putongren.org/library.html)**: Instant search and filtering across all 44 skills, with genuine client harness tags and one-click install commands.
> - ⚖️ **[Browse the Incident Database](https://rai.putongren.org/incidents.html)**: Review 31 authentic judicial rulings, administrative penalty notices, and official security advisories.

---

## 📦 Client Installation Guide

All skills in this repository strictly adhere to the open **Agent Skills specification** (`SKILL.md`). To load skills into your environment:

### Directory Layout by Platform

* **Claude Code:**
  ```bash
  # Project-level skill (recommended, shared with repo)
  mkdir -p .claude/skills/<skill-name>/
  # User-global skill (accessible across all sessions)
  mkdir -p ~/.claude/skills/<skill-name>/
  ```

* **Agent IDEs Supporting `.agents/skills/` (Cursor, Google Antigravity, Trae):**
  ```bash
  mkdir -p .agents/skills/<skill-name>/
  ```

* **Web Chat / General LLMs (Claude Web, ChatGPT, Kimi, Doubao):**
  No local tooling required. Simply copy the core verification prompts and rules from `SKILL.md` into your Custom Instructions or chat context.

> [!IMPORTANT]
> **Copy the entire skill directory**: Many advanced skills bundle executable Python/Bash validation scripts, threat pattern databases, and reference templates. Never copy only `SKILL.md` in isolation—always copy the entire skill directory as specified in the [Skill Library](https://rai.putongren.org/library.html).

---

## 🔬 Operational Status & Verified Evidence Methodology

To ensure absolute transparency and banish obscure technical jargon, each skill is rated with plain-language, tiered indicators:

* **🟢 Ready to Use (Verified):** Pure prompt/rules engineering conforming to the `SKILL.md` specification with zero local binary dependencies. Effective immediately upon placement into the client skill directory. All workflow steps have passed local syntax and structural verification.
* **🟡 Requires Setup (Ready):** Requires a local environment dependency (e.g. Python 3.10+, SpaCy NER model, Gitleaks scanner) or a dedicated API token. Clear prerequisites are documented in the skill details.
* **🌐 Repository Reachability:** All 44 repositories are verified reachable live via automated health checks (44/44 HTTP 2xx/3xx).
* **⚠️ Standards Alignment Disclaimer:** Mappings to ISO/IEC, SPDX, and PIPL standards reflect **curators' technical alignment analyses rather than formal third-party accreditations**.

> [!TIP]
> **First time here? Try the Beginner 5 Starter Skills (No Local Setup Required)**:
> 1. `pii-safe-documents` (Personal Data & PII Sanitizer)
> 2. `citation-verifier` (Citation & DOI Authenticity Verifier)
> 3. `devils-advocate` (Anti-Sycophancy Critical Challenger)
> 4. `visible-ai-disclosure-pr-gate` (AI Disclosure & PR Compliance Gate)
> 5. `repo-security-review` (Credential & Secret Leak Prevention)

---

## 🗂️ Repository Structure

```text
.
├── site/                       # Static Web Application (Production: https://rai.putongren.org)
│   ├── index.html              # 📖 Practical Field Guide (实务长篇指南)
│   ├── library.html            # 🛡️ Interactive Skill Library (实务技能库)
│   ├── incidents.html          # ⚖️ Incident & Case Law Database (真实判例与案例库)
│   ├── css/
│   │   ├── style.css           # Custom styling, typography & dark mode system
│   │   └── tailwind.css        # Compiled Tailwind CSS bundle
│   ├── js/
│   │   ├── layout.js           # Unified site header, mobile navigation & footer component
│   │   ├── guide.js            # Guide narrative logic, scrollspy & inline modals
│   │   ├── library.js          # Skill library search, filter & detail modals
│   │   └── incidents.js        # Incident library category filter & case study modals
│   ├── data/
│   │   ├── items.json          # Master database of all 44 vetted skills
│   │   └── incidents.json      # Master database of all 31 verified legal & regulatory cases
│   └── sitemap.xml             # Search engine optimization index
├── scripts/                    # Automation & Quality Gate Tooling
│   ├── verify-data.js          # Skill schema & integrity test gate (npm test)
│   ├── validate-incidents.js   # Incident data integrity & source URL check gate
│   ├── verify-remote.js        # Live HTTP reachability check (npm run test:remote)
│   ├── generate-readmes.js     # Auto-regenerate README.md & README_CN.md (npm run build)
│   ├── sync-layout.js          # Synchronize unified header & footer templates
│   └── serve.js                # Local preview server (npm run serve)
├── ref/                        # In-depth empirical research reports & legal forensic documents
├── CONTRIBUTING.md             # Standards, schema & submission guide
├── README.md                   # English Master Documentation
├── README_CN.md                # Chinese Master Documentation
└── package.json
```

---

## 🧪 Local Development & Quality Gates

This repository maintains strict engineering and verification standards:

```bash
# 1. Validate skill schema and SKILL.md format constraints
npm test

# 2. Validate incident database integrity and case citations
node scripts/validate-incidents.js

# 3. Test live HTTP reachability for all 44 remote GitHub repositories
npm run test:remote

# 4. Regenerate English & Chinese READMEs and synchronize site layout templates
npm run build

# 5. Compile and minify Tailwind CSS
npm run build:css

# 6. Launch local preview server
npm run serve
# Open http://localhost:3000 (Field Guide), /library.html, or /incidents.html
```

---

## 🤝 Contributing

Contributions are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for our **Item Schema** and submission requirements.

## 📄 License

[MIT](LICENSE) © 2026 Digital Rights for All (putongren.org) & Responsible AI Use Contributors
