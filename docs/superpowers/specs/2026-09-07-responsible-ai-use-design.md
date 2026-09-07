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
| **Governance Means** | Policies, standards, audits, impact assessments | **Skills (`SKILL.md`), defaults, checklists, workflow, warnings, prompts** |
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
- **ID**: `unique-kebab-id` (e.g. `pii-shield`, `citation-checker`)
- **Question Category**: One of `feed-to-ai` | `answers-to-trust` | `when-not-to-listen` | `can-publish-directly`
- **Format**: `SKILL.md` (Primary) | `Prompt` (Fallback when no SKILL.md exists)
- **Supported Clients**: e.g., Claude Code, Antigravity, Cursor, Web Chat UI (ChatGPT/Claude/Gemini)
- **Target Persona**: General Knowledge Workers (with tags for Researchers, Writers, Analysts where applicable)
- **Core Utility (1-2 sentences)**: Plain-language explanation of what problem it solves.
- **Actionable Artifact**:
  - For `SKILL.md`: Direct link to repository file, installation command or placement path (`.claude/skills/` etc.).
  - For `Prompt`: Ready-to-copy structured prompt block with instructions.
```

---

## 4. Repository & Website Architecture

```text
skill-4-responsible-AI-use/
├── .gitignore
├── README.md                      # Canonical English Awesome List
├── README_CN.md                   # Full Chinese Version
├── CONTRIBUTING.md                # Submission Guidelines & Item Template
├── docs/
│   └── superpowers/specs/         # Design & Architecture Specs
│       └── 2026-09-07-responsible-ai-use-design.md
└── site/                          # Project Interactive Website
    ├── index.html                 # Modern, responsive single-page portal
    ├── css/style.css              # Clean, modern aesthetics (Tailwind / Custom CSS)
    ├── js/app.js                  # Search, filter by 4 questions, 1-click copy, interactive checklist
    ├── data/items.json            # Structured dataset of all curated items
    └── package.json               # Local preview / build scripts
```

---

## 5. Interactive Website Features

1. **Category Filter Tabs**: One-click filtering across the 4 practical questions.
2. **Type Filter**: Filter by `SKILL.md` vs `Prompt`.
3. **Keyword Search**: Instant search by tags, title, or client.
4. **1-Click Copy**: Copy prompt templates or skill installation paths with instant feedback.
5. **Interactive 30-Second Pre-flight Checklist**:
   - Step 1: Input Check (Sanitized?)
   - Step 2: Verification Check (Claims verified?)
   - Step 3: Red Line Check (Not delegating human accountability?)
   - Step 4: Disclosure Check (Properly attributed?)
6. **Bilingual Support (EN / CN)**: Toggle seamlessly between English and Chinese content.
7. **Zero-Friction Deployment**: Standard static files ready for GitHub Pages or local preview.
