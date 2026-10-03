# 执行阶段四：交互技能库与平台工具生态升级 (Library UX & Taxonomy)

> **目标模块**：`site/library.html`（交互技能库）、`site/js/library.js`、`site/data/items.json`、`scripts/verify-data.js`  
> **前置依赖**：阶段一至阶段三的内容已定稿。无需外部 Deep Research，属于纯数据与前端工程落地。  
> **预计耗时**：1 个执行迭代 (1 Turn)  

---

## 1. 任务背景与核心痛点

当前 `site/library.html` 提供了基于 4 大分类（feed-to-ai, answers-to-trust, when-not-to-listen, can-publish-directly）和 4 大时序的筛选，以及关键词检索。

但对于中国广大读者而言，仍存在以下体验断层：
1. **客户端适配感不强**：读者进入技能库，第一反应是“这个技能在我的 Trae IDE 或 WorkBuddy 里能不能用？”，需要翻看很深才能找到。
2. **实证实操依据未在卡片外露**：当前卡片主要展示星标和开箱即用状态，权威法条对齐（如 `PIPL 第23条`、`TC260-005`、`广告法第9条`）必须点开弹窗才能看到，缺乏视觉冲击力和说服力。

本阶段的目标是：通过扩展 `items.json` 元数据与增强 `library.html` 交互，让读者**一眼看清工具在本土客户端中的适用性及法律标准背书**。

---

## 2. 细化工作计划与功能设计

### 2.1 元数据 Schema 扩展与规整 (`site/data/items.json`)
1. **规整 `clients` 字段**：
   - 统一使用规范化标签：
     - `Trae IDE`
     - `WorkBuddy`
     - `Cursor`
     - `Claude Code`
     - `Web/通用提示词`
2. **新增 `regulatory_badges` 数组字段**：
   - 为每个技能打上 1-2 个直击痛点的法规/标准微徽章，例如：
     - `pii-safe-documents`: `["PIPL 第23条", "TC260-005"]`
     - `bibref-verify`: `["CrossRef 规范", "防虚假诉讼"]`
     - `sycophancy-challenger`: `["破除迎合", "IEEE 偏差控制"]`
     - `marketing-claims-review`: `["广告法第9条", "FTC 合规"]`
     - `web-accessibility`: `["无障碍环境建设法", "WCAG 2.1 AA"]`
     - `license-compliance-audit`: `["SPDX 标准", "防 GPL 传染"]`
     - `agent-sandbox-skill`: `["E2B 沙盒", "宿主机防逃逸"]`

### 2.2 前端交互升级 (`site/library.html` & `site/js/library.js`)
1. **顶部新增“客户端快速筛选条” (Client Filter Pill Bar)**：
   - 提供快速快捷筛选按钮：
     - 🌟 全部 (All)
     - 🇨🇳 Trae IDE
     - 🇨🇳 WorkBuddy
     - 💻 Cursor
     - 🤖 Claude Code
     - 🌐 纯规则/通用
2. **卡片视觉增强**：
   - 在每个技能卡片的标题下方或底部，渲染 `regulatory_badges` 微标签（浅靛蓝背景），一眼展现法理对齐。
3. **详情弹窗增强**：
   - 在弹窗中以表格形式列出支持该技能的客户端安装命令与路径，点击即复制对应命令。

### 2.3 自动化质检脚本对齐 (`scripts/verify-data.js`)
- 在数据验证脚本中增加对 `regulatory_badges` 的数组与非空约束校验，确保未来新增技能时字段不缺失。

---

## 3. 执行步骤 (Step-by-Step Instructions)

1. **更新 `scripts/verify-data.js`**：增加对 `regulatory_badges` 字段的 schema 校验逻辑。
2. **批量更新 `site/data/items.json`**：为全量 44 项技能精准注入客户端与法规徽章数据。
3. **修改 `site/library.html`**：在过滤器区域增加客户端筛选 UI 控件。
4. **修改 `site/js/library.js`**：
   - 增加客户端筛选状态逻辑；
   - 在 `renderCard` 函数中渲染 `regulatory_badges`；
   - 更新中英双语标签字典。
5. **完整自动化测试**：
   ```bash
   npm test               # 验证 items.json 符合新 Schema
   npm run test:remote    # 确保 44 个链接完好
   npm run build          # 重新生成 README
   ```

---

## 4. 阶段四验收标准 (Acceptance Criteria)

- [ ] **Schema 完整性**：全量 44 个条目均包含合规的 `clients` 与 `regulatory_badges`，`npm test` 100% 通过。
- [ ] **客户端筛选可用**：点击 Trae、WorkBuddy、Cursor 等客户端快捷按钮，卡片能够毫秒级无刷新过滤。
- [ ] **视觉质感**：法规徽章排版精致，深色/浅色模式自适应，不造成卡片高度杂乱或溢出。
- [ ] **移动端自适应**：在手机端与小屏幕上，筛选条横向平滑滚动，交互无阻碍。
- [ ] **双语一致性**：中英文切换时，界面标签与筛选状态平滑同步。
