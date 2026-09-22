# Design Specification: Responsible AI Use Skills & Project Website

**Date:** 2026-09-07  
**Project:** `skill-4-responsible-AI-use` (Awesome Responsible AI Skills)  
**Status:** Approved for Implementation

---

## 1. Problem Definition & Core Positioning

### 1.1 The Crucial Distinction
Traditional **Responsible AI** is developer-centric, system-centric, and policy-centric. It focuses on: *"How do organizations build and deploy safe AI systems?"*

In contrast, **Responsible AI Use** is user-centric and practice-centric. It focuses on:
> **"When AI has already become a daily tool for everyday people, how can an individual use it safely, properly, and responsibly?"**

| Dimension | Traditional Responsible AI | Responsible AI Use (Our Project) |
| :--- | :--- | :--- |
| **Core Subject** | Developers, deployment institutions, governments | **Everyday users, knowledge workers, professionals** |
| **Core Object** | AI system / deployment | **Human–AI interaction / daily practice** |
| **Typical Questions** | Is the model fair? Is it interpretable? Who to audit? | **What can I feed to AI? Which answers can I trust? When should I NOT listen to AI? Can output be published directly?** |
| **Governance Means** | Policies, standards, audits, impact assessments | **Standardized Open-Source Skills (`SKILL.md`), workflow gates, boundary checklists** |
| **Direction of Responsibility** | "Do not build/deploy harmful AI" | **"Do not use AI in an irresponsible way"** |
| **Risk Bearer** | Society, end-users, decision subjects | **Self + people impacted by one's own AI usage** |

---

## 2. Four Core Practical Categories (The 4 Questions)

1. **What can I feed to AI? (我能把什么给 AI？)**
   - Focus: Input boundary defense, PII redaction, anonymization, data hygiene.
   - Guarding against: Unintended leaks of private identity, internal documents, proprietary data.

2. **Which answers can I trust? (哪些回答能信？)**
   - Focus: Process integrity, claim fact-checking, citation validation, hallucination detection.
   - Guarding against: Blindly accepting fabricated data, fake citations, fake research claims.

3. **When should I NOT listen to AI? (什么时候不能听 AI？)**
   - Focus: High-risk red lines, over-reliance warnings, critical decision checkpoints.
   - Guarding against: Automation bias, epistemic complacency, delegating accountability to algorithms.

4. **Can the output be published directly? (输出能不能直接发布？)**
   - Focus: Output accountability, AI disclosure statements, prompt provenance, editorial review.
   - Guarding against: Academic misconduct, undisclosed AI ghostwriting, deceptive presentation.

---

## 3. Item Schema Specification (条目收录与展示最小字段规范)

Each item in the repository and website MUST conform to the following schema:

```markdown
### [Item Name](Direct Link to GitHub / Source)
- **ID**: `unique-kebab-id` (e.g. `skillguard`, `the-judge`)
- **Question Category**: One of `feed-to-ai` | `answers-to-trust` | `when-not-to-listen` | `can-publish-directly`
- **Format**: Strictly `SKILL.md` (Standardized agent skills with YAML frontmatter)
- **Supported Clients**: e.g., Claude Code, Antigravity, Cursor
- **Target Persona**: General Knowledge Workers (with tags for Researchers, Writers, Analysts where applicable)
- **Core Utility (1-2 sentences)**: Plain-language explanation of what problem it solves.
- **Actionable Artifact**: Direct link to repository file, installation command or placement path (`.agents/skills/` / `.claude/skills/`).
```

---

## 4. Repository & Website Architecture

```text
skill-4-responsible-AI-use/
├── README.md                  # Comprehensive English documentation (40 curated skills)
├── README_CN.md               # Complete Chinese documentation
├── CONTRIBUTING.md            # Guidelines, 100% SKILL.md criteria, schema specs
├── scripts/                   # Verification, build, serve, and remote health checks
└── site/                      # Production-ready static website
    ├── index.html             # Interactive catalog with filters, search, modal
    ├── about.html             # Digital Rights for All (putongren.org) story & philosophy
    ├── css/style.css          # Design system matching DESIGN.md
    ├── js/app.js              # State management, deep-linking, i18n, search, modal
    ├── js/about.js            # i18n & interactive features for about page
    ├── data/items.json        # Structured dataset of all 40 curated skills
    ├── robots.txt             # Search engine crawler policy
    └── sitemap.xml            # SEO sitemap
```

---

## 5. Interactive Website Features

1. **Category Filter Tabs**: One-click filtering across the 4 practical questions with live badge counters.
2. **Workflow Timing Filter**: Filter by `pre-input`, `during-chat`, `pre-handoff`, and `post-session`.
3. **Keyword & Client Search**: Instant search by title, tags, client, description, or id.
4. **Rich Detail Modal**: Complete breakdown of why everyday people should care, why chosen, how to use, maturity & trust signals, and direct install commands.
5. **URL Hash Deep-Linking**: Shareable `#skill=<id>` URLs that directly open the modal for any skill.
6. **1-Click Copy**: Copy install commands or clone scripts with instant tooltip visual feedback.
7. **Bilingual Support (ZH / EN)**: Default Chinese interface with seamless toggle to English across all pages.
8. **Digital Rights for All (putongren.org)**: Fully integrated About page explaining the civic digital rights mission and principles.
9. **Accessibility & Responsiveness**: WCAG 2.1 compliant focus indicators, ARIA dialog roles, and mobile sub-navigation.
10. **Zero-Friction Deployment**: Standard static files ready for GitHub Pages or static host deployment.
