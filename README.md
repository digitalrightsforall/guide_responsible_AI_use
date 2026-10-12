# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Vetted Skills](https://img.shields.io/badge/Vetted%20Skills-44%20Curated-8a2be2.svg)](https://putongren.org/guide_responsible_AI_use/library.html) [![Format: SKILL.md](https://img.shields.io/badge/Format-SKILL.md-success.svg)](https://agentskills.io) [![Remote Health](https://img.shields.io/badge/URLs%20Health-44%2F44%20Live-brightgreen.svg)](#-operational-status--verified-evidence-methodology) [![Community](https://img.shields.io/badge/Community-putongren.org-orange.svg)](https://putongren.org)

> A curated collection of 44 production-ready `SKILL.md` packages designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—protecting personal data against unintended ingestion and ensuring deliverables are verifiable by third parties.

**English** | [中文版](README_CN.md) | 📖 [Practical Field Guide](https://putongren.org/guide_responsible_AI_use/) | 🛡️ [Interactive Skill Library](https://putongren.org/guide_responsible_AI_use/library.html)

---

## 🌟 Project Ecosystem: Dual-Engine Architecture

This project is designed as an interactive, dual-engine platform for everyone using modern LLMs and agentic IDEs:

* 📖 **[The Practical Field Guide (实务长篇指南)](https://putongren.org/guide_responsible_AI_use/)** (*Web Homepage / `site/index.html`*):
  A comprehensive, narrative-driven walkthrough that deconstructs the silent risks of the algorithmic era, explains why abstract ethics fail at the desktop, and orchestrates all 44 skills across **6 daily workflow scenarios** (including platform baseline hardening and Agent sandbox execution) with clickable inline skill pills and persona playbooks.

* 🛡️ **[The Interactive Skill Library (实务技能库)](https://putongren.org/guide_responsible_AI_use/library.html)** (*Web Catalog / `site/library.html`*):
  A responsive, searchable web application with instant category and timing filters, live keyword search, detailed evaluation modals, verified third-party media reviews, and one-click copyable CLI installation commands.

* 💻 **[The Open-Source GitHub Repository](https://github.com/digitalrightsforall/guide_responsible_AI_use)** (*This Repo*):
  The canonical source of truth containing standardized data schemas (`site/data/items.json`), automated quality gate scripts, and developer tooling.

---

## 💡 Core Philosophy: Responsible and Safe AI Use (Dynamic Framework)

This project is initiated as a public-interest practical toolkit by [**Digital Rights for All (普通人的数字权利 - putongren.org)**](https://putongren.org), dedicated to helping everyone protect their rights, privacy, and agency in the algorithmic era.

In this project, we curate **existing, proven open-source skills** (curated from vetted open-source projects). The practical connotation of responsible and safe AI use is unpacked into two dynamic pillars:

1. **🛡️ Inward: Self-Defense & Boundaries (对内·自我防护与边界)**:
   - **Prevent Data Over-Harvesting**: Guard against commercial LLM vendors silently turning your draft proposals, interview transcripts, and private source code into their next-generation training corpora.
   - **Verify Confident Hallucinations & Sycophancy**: Guard against models fabricating citations with high conviction or flattering your flawed premises, preserving human critical judgment.

2. **📐 Outward: Third-Party Verifiability (对外·成果第三方可核验)**:
   - **Auditable Evidence Chains**: Ensure that when you deliver an AI-assisted report, code change, or paper, colleagues, clients, and readers can readily audit the source evidence, reasoning logs, and data anchors.
   - **Concrete Publication Gates**: Replace hollow, bureaucratic disclaimer footers with hard pre-release verification gates (advertising claims verification, SPDX license compliance, secret scanning, WCAG accessibility).

> [!NOTE]
> This dual framework is **dynamic and evolving** alongside AI capabilities and human practices, rather than a rigid doctrine.

---

## 🧭 The Four Practical Questions

Rather than debating abstract ethics, this project anchors responsible and safe AI use in **four urgent desktop questions**. All 44 production-ready skills are curated in our interactive web application:

| Practical Question | Threat Addressed & Core Connotation | Skills Count | Web Explorer |
| :--- | :--- | :---: | :--- |
| **1. What can I feed to AI?** | Prevent commercial LLMs from harvesting proprietary drafts, sensitive cases, and PII into training corpora | **11 Skills** | [👉 Explore in Skill Library](https://putongren.org/guide_responsible_AI_use/library.html#feed-to-ai) |
| **2. Which answers can I trust?** | Verify confident hallucinations, fake DOI citations, fabricated numbers, and plausible falsehoods | **10 Skills** | [👉 Explore in Skill Library](https://putongren.org/guide_responsible_AI_use/library.html#answers-to-trust) |
| **3. When should I NOT listen to AI?** | Break algorithmic sycophancy and automation bias to defend human critical scrutiny and judgment | **10 Skills** | [👉 Explore in Skill Library](https://putongren.org/guide_responsible_AI_use/library.html#when-not-to-listen) |
| **4. Can the output be published directly?** | Enforce advertising substantiation, SPDX license hygiene, secret scanning, and accessibility gates | **13 Skills** | [👉 Explore in Skill Library](https://putongren.org/guide_responsible_AI_use/library.html#can-publish-directly) |

> 🌟 **Explore the Full Interactive Platform**:
> - 📖 **[Read the Practical Field Guide](https://putongren.org/guide_responsible_AI_use/)**: Deep narrative walking through 6 real-world workflow scenarios with clickable inline skill pills.
> - 🛡️ **[Explore the Interactive Skill Library](https://putongren.org/guide_responsible_AI_use/library.html)**: Instant search and filtering across all 44 skills, complete with international standards, third-party reviews, and one-click install commands.

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
> **Copy the entire skill directory**: Many advanced skills bundle executable Python/Bash validation scripts, threat pattern databases, and reference templates. Never copy only `SKILL.md` in isolation—always copy the entire skill directory as specified in the [Skill Library](https://putongren.org/guide_responsible_AI_use/library.html).

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
├── site/                       # Static Web Application
│   ├── index.html              # 📖 Practical Field Guide (实务长篇指南)
│   ├── library.html            # 🛡️ Interactive Skill Library (实务技能库)
│   ├── css/style.css           # Styling, typography & theme system
│   ├── js/
│   │   ├── guide.js            # Guide logic, scrollspy & inline modals
│   │   └── library.js          # Library search, filter & detail modals
│   ├── data/
│   │   └── items.json          # Master database of all 44 vetted skills
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

# 2. Test live HTTP 200 reachability for all 44 remote GitHub repositories
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
