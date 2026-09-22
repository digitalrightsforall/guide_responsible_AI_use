# Contributing to Awesome Responsible AI Skills

Thank you for your interest in contributing! This project is dedicated to **Responsible AI Use**—empowering everyday users, researchers, writers, and knowledge workers to interact with AI safely, factually, and accountably.

---

## 1. Core Philosophy: Responsible and Safe AI Use

Before submitting, please ensure your contribution aligns with the **Responsible and Safe AI Use** philosophy—empowering everyday knowledge workers, researchers, and professionals to use existing AI tools safely and accountably:

* **Curator, Not Creator**: We do not invent new tools; we curate, evaluate, and structure existing, proven open-source packages and prompt protocols.
* **Two Dynamic Practice Pillars (动态演进框架)**:
  1. **Inward: Self-Defense & Boundaries (对内·自我防护与边界)**: Guard against commercial AI over-harvesting user data into training corpora, and guard against blind faith in confident hallucinations.
  2. **Outward: Third-Party Verifiability (对外·成果第三方可核验)**: Ensure colleagues, readers, and clients can easily audit the evidence trail and rationale behind AI-assisted work, moving beyond empty disclaimers.
* Note: This practical framework is dynamic and evolving alongside AI capabilities, rather than a rigid or dogmatic doctrine.

All submissions must map directly to one of the **Four Practical Questions**:
1. **What can I feed to AI? (我能把什么给 AI？)** — Input privacy, data masking, PII protection, local-first boundary.
2. **Which answers can I trust? (哪些回答能信？)** — Claim verification, citation faithfulness, bib auditing, anti-hallucination.
3. **When should I NOT listen to AI? (什么时候不能听 AI？)** — Anti-sycophancy, devil's advocate, decision pre-mortems, red lines.
4. **Can the output be published directly? (输出能不能直接发布？)** — Third-party verifiability, provenance tracking, publish gates.

---

## 2. Inclusion Criteria (收录标准)

To maintain high practical value, we enforce strict inclusion rules:

| Format | Status | Criteria |
| :--- | :--- | :--- |
| **`SKILL.md`** | **Primary (首选)** | A standardized skill package (folder containing `SKILL.md` with YAML frontmatter) compatible with Claude Code, Antigravity, Codex, or modern agent environments. |
| **Structured Prompt** | **Fallback (备选/补充)** | Allowed **only** when no mature `SKILL.md` exists for that specific use case. Must be tested, structured, and ready to copy-paste. |
| **MCP Servers** | *Excluded for now* | Do not submit raw MCP servers unless packaged as an agent skill. |
| **Browser Extensions** | *Excluded for now* | Kept out of scope to focus on agent skills and prompts. |
| **IDE Rule Files** | *Excluded* | No `.cursorrules` or editor-specific configs. |

---

## 3. Item Schema Specification (最小字段规范)

Every submitted item (whether for the README or the website dataset) must provide the following fields:

### Schema Fields Table

| Field Name | Type | Description | Allowed Values / Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique kebab-case identifier | `pii-shield`, `citation-checker` |
| `name` | `string` | Display name of the skill or prompt | `PII Shield` |
| `url` | `string` | Direct link to repository, file, or gist | `https://github.com/...` |
| `category` | `enum` | Which of the 4 questions it answers | `feed-to-ai`<br>`answers-to-trust`<br>`when-not-to-listen`<br>`can-publish-directly` |
| `timing` | `enum` | When to use in workflow | `pre-input`<br>`during-chat`<br>`pre-handoff`<br>`post-session` |
| `timing_desc` | `string` | Specific touchpoint description | "Before ingestion: run before passing text to agent" |
| `why_chosen` | `string` | Why chosen (threat/purpose) | Specific problem and threat addressed |
| `status` | `object` | Maturity & Trust Signals | `{ "stage": "...", "adoption": "...", "trust_source": "..." }` |
| `type` | `enum` | Technical format | `SKILL.md` or `Prompt` |
| `clients` | `array` | Supported AI platforms/clients | `["Claude Code", "Antigravity", "ChatGPT", "Universal"]` |
| `target_persona` | `string` | Primary user group | `General Knowledge Workers`, `Researchers`, `Writers` |
| `summary` | `string` | 1-2 sentence plain-language description | Explains what risk it prevents or what task it accomplishes. |
| `artifact` | `object` | Actionable installation or prompt content | See templates below. |

---

## 4. Submission Templates

### Template A: Submitting a `SKILL.md` Package

```markdown
### [Skill Name](https://github.com/owner/repo)
- **ID**: `skill-unique-name`
- **Category**: [What can I feed to AI? / Which answers can I trust? / When should I NOT listen to AI? / Can output be published directly?]
- **Format**: `SKILL.md`
- **Workflow Timing**: [Pre-Input / During-Chat / Pre-Handoff / Post-Session] - (Description of when to trigger)
- **Why Chosen**: Concrete practical purpose and threat addressed
- **Maturity & Trust**: Stage: Production Stable | Adoption: X stars / standard | Source: Audited source
- **Supported Clients**: Claude Code, Antigravity, Cursor
- **Target Persona**: General Knowledge Workers
- **What it does**: Briefly describe what problem it solves in 1-2 sentences.
- **Install / Placement**:
  ```bash
  # Example command or placement path
  # Place in .claude/skills/skill-name/SKILL.md or clone repo
  ```
```

### Template B: Submitting a Structured Prompt (Fallback)

```markdown
### [Prompt Name](Optional link to source / original author)
- **ID**: `prompt-unique-name`
- **Category**: [What can I feed to AI? / Which answers can I trust? / When should I NOT listen to AI? / Can output be published directly?]
- **Format**: `Prompt`
- **Workflow Timing**: [Pre-Input / During-Chat / Pre-Handoff / Post-Session] - (Description of when to trigger)
- **Why Chosen**: Concrete practical purpose and threat addressed
- **Maturity & Trust**: Stage: Verified Prompt | Adoption: Community Tested | Source: Editorial / verification team
- **Supported Clients**: Universal Web Chat (ChatGPT, Claude, Gemini, Open WebUI)
- **Target Persona**: General Knowledge Workers
- **What it does**: Briefly describe what problem it solves in 1-2 sentences.
- **Prompt Content**:
  ```text
  [Paste your exact structured prompt template here]
  ```
```

---

## 5. Contribution Workflow

1. **Fork** the repository.
2. Add your item to `README.md`, `README_CN.md`, and `site/data/items.json` following the Item Schema.
3. Run `npm test` or `node scripts/verify-data.js` to ensure the schema validator passes.
4. Submit a Pull Request with a clear description of why this skill/prompt promotes responsible AI use.
