# Awesome Responsible AI Skills [![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Vetted Skills](https://img.shields.io/badge/Vetted%20Skills-43%20Curated-8a2be2.svg)](https://putongren.org/ai-skills/library.html) [![Format: SKILL.md](https://img.shields.io/badge/Format-SKILL.md-success.svg)](https://agentskills.io) [![Remote Health](https://img.shields.io/badge/URLs%20Health-43%2F43%20Live-brightgreen.svg)](#-operational-status--verified-evidence-methodology) [![Community](https://img.shields.io/badge/Community-putongren.org-orange.svg)](https://putongren.org)

> A curated collection of 43 production-ready `SKILL.md` packages designed to help everyday knowledge workers, researchers, writers, and professionals practice **Responsible and Safe AI Use**—guarding inward against data harvesting and blind trust, and delivering outward with third-party verifiability.

**English** | [中文版](README_CN.md) | 📖 [Practical Field Guide](https://putongren.org/ai-skills/) | 🛡️ [Interactive Skill Library](https://putongren.org/ai-skills/library.html)

---

## 🌟 Project Ecosystem: Dual-Engine Architecture

This project is designed as an interactive, dual-engine platform for everyone using modern LLMs and agentic IDEs:

* 📖 **[The Practical Field Guide (实务长篇指南)](https://putongren.org/ai-skills/)** (*Web Homepage / `site/index.html`*):
  A comprehensive, narrative-driven walkthrough that deconstructs the silent risks of the algorithmic era, explains why abstract ethics fail at the desktop, and orchestrates all 43 skills across **5 daily workflow scenarios** with 112 clickable inline skill pills and persona playbooks.

* 🛡️ **[The Interactive Skill Library (实务技能库)](https://putongren.org/ai-skills/library.html)** (*Web Catalog / `site/library.html`*):
  A responsive, searchable web application with instant category and timing filters, live keyword search, detailed evaluation modals, verified third-party media reviews, and one-click copyable CLI installation commands.

* 💻 **[The Open-Source GitHub Repository](https://github.com)** (*This Repo*):
  The canonical source of truth containing standardized data schemas (`site/data/items.json`), automated quality gate scripts, and developer tooling.

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

## 🧭 The Four Practical Questions

Rather than debating abstract ethics, this project anchors responsible and safe AI use in **four urgent desktop questions**. All 43 production-ready skills are curated in our interactive web application:

| Practical Question | Threat Addressed & Core Connotation | Skills Count | Web Explorer |
| :--- | :--- | :---: | :--- |
| **1. What can I feed to AI?** | Prevent commercial LLMs from harvesting proprietary drafts, sensitive cases, and PII into training corpora | **10 Skills** | [👉 Explore in Skill Library](https://putongren.org/ai-skills/library.html#feed-to-ai) |
| **2. Which answers can I trust?** | Pierce confident hallucinations, phantom DOI citations, fabricated numbers, and plausible falsehoods | **10 Skills** | [👉 Explore in Skill Library](https://putongren.org/ai-skills/library.html#answers-to-trust) |
| **3. When should I NOT listen to AI?** | Break algorithmic sycophancy and automation bias to defend human critical scrutiny and judgment | **10 Skills** | [👉 Explore in Skill Library](https://putongren.org/ai-skills/library.html#when-not-to-listen) |
| **4. Can the output be published directly?** | Enforce advertising substantiation, SPDX license hygiene, secret scanning, and accessibility gates | **13 Skills** | [👉 Explore in Skill Library](https://putongren.org/ai-skills/library.html#can-publish-directly) |

> 🌟 **Explore the Full Interactive Platform**:
> - 📖 **[Read the Practical Field Guide](https://putongren.org/ai-skills/)**: Deep narrative walking through 5 real-world workflow scenarios with 112 clickable inline skill pills.
> - 🛡️ **[Explore the Interactive Skill Library](https://putongren.org/ai-skills/library.html)**: Instant search and filtering across all 43 skills, complete with international standards, third-party reviews, and one-click install commands.

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
> **Copy the entire skill directory**: Many advanced skills bundle executable Python/Bash validation scripts, threat pattern databases, and reference templates. Never copy only `SKILL.md` in isolation—always copy the entire skill directory as specified in the [Skill Library](https://putongren.org/ai-skills/library.html).

---

## 🔬 Operational Status & Verified Evidence Methodology

To ensure absolute transparency and banish obscure technical jargon, each skill is rated with plain-language, verifiable indicators:

* **🟢 Ready to Use (Verified):** Pure prompt/rules engineering conforming to the `SKILL.md` specification with zero local binary dependencies. Effective immediately upon placement into the client skill directory. All workflow steps have passed local syntax and logic testing.
* **🟡 Requires Setup (Ready):** Requires a local environment dependency (e.g. Python 3.10+, SpaCy NER model, Gitleaks scanner) or a dedicated API token. Clear prerequisites are documented in the skill details.
* **100% Remote Verification:** All 43 repositories are verified live via `npm run test:remote` (43/43 HTTP 200). We enforce zero placeholders and zero synthetic prompts.

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
