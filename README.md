# Templates

个人常用模板合集，涵盖 LaTeX 课程作业排版与 LLM 辅助开发的 Prompt Engineering 工作流模板。

A personal collection of templates for LaTeX coursework typesetting and Prompt Engineering workflows for LLM-assisted development.

---

## 目录结构 / Repository Structure

```
Templates/
├── latex/
│   ├── hw_theoretical.tex          # 理论课程作业模板
│   ├── hw_theoretical.pdf          # 编译示例
│   └── imgs/                       # 图片资源
│       └── DOGE.jpg
├── prompt_engineering/
│   ├── prompt_template.md          # 完整版 System Prompt 模板（中文）
│   ├── prompt_template_en.md       # 完整版 System Prompt 模板（英文）
│   ├── prompt_simplified_en.md     # 精简版 System Prompt 模板（英文）
│   ├── idea_description.md         # 项目构思引导 Prompt（中文）
│   ├── idea_description_en.md      # 项目构思引导 Prompt（英文）
│   ├── PRD_template_en.md          # 产品需求文档模板（英文）
│   ├── dev_log_template.md         # 开发日志模板（中文）
│   └── dev_log_template_en.md      # 开发日志模板（英文）
├── .gitattributes
└── .gitignore
```

---

## LaTeX 模板 / LaTeX Templates

### hw_theoretical.tex — 理论作业模板 / Theoretical Homework Template

**内置功能 / Built-in Features:**

- 页眉自动显示课程名、作业编号与学期信息（基于 `fancyhdr`）
- 数学公式排版：`amsmath` + `amsthm` + `amssymb`，含 `theorem` / `lemma` / `claim` 环境
- 算法伪代码：`algorithm` + `algpseudocode`
- 图片插入、表格排版、超链接、有序/无序列表等常用元素的示例
- Page headers with course name, homework number, and semester (via `fancyhdr`)
- Math typesetting: `amsmath` + `amsthm` + `amssymb`, with `theorem` / `lemma` / `claim` environments
- Algorithm pseudocode: `algorithm` + `algpseudocode`
- Working examples for figures, tables, hyperlinks, and lists

---

## Prompt Engineering 模板 / Prompt Engineering Templates

一套 LLM 辅助开发的工作流模板，覆盖从项目构思到持续迭代的完整流程。所有模板均提供中英双语版本。

A workflow template set for LLM-assisted development, covering the full cycle from ideation to iterative development. All templates are available in both Chinese and English.

### 工作流 / Workflow

```
idea_description → PRD_template → prompt_template → dev_log_template(AI generated)
   项目构思            需求文档        System Prompt       开发日志(AI生成)
   Ideation            PRD             System Prompt       Dev Log
```

### 模板说明 / Template Descriptions

**prompt_template** — 完整版 System Prompt 模板 / Full System Prompt Template

用于为 LLM 编码助手定义角色、技术栈、输出格式、代码风格、约束条件与优先级的结构化模板。包含正反代码示例（good / bad implementation），适用于 Claude Code 的 `CLAUDE.md` 或其他 LLM 的 System Prompt 配置。

A structured template for defining the role, tech stack, output format, code style, constraints, and priorities of an LLM coding assistant. Includes good/bad code examples. Suitable for `CLAUDE.md` in Claude Code or system prompts for other LLMs.

**prompt_simplified_en** — 精简版 System Prompt 模板 / Simplified System Prompt Template

完整版的轻量替代，保留核心结构（角色、技术栈、约束、输出格式），去除详细的代码风格与示例部分，适合快速启动小型项目。

A lightweight alternative that retains the core structure (role, tech stack, constraints, output format) while omitting detailed code style and examples. Ideal for bootstrapping smaller projects.

**idea_description** — 项目构思引导 Prompt / Ideation Prompt

引导 LLM 以角色扮演方式参与项目构思：先提问澄清需求，再输出项目方案，最终基于 PRD 模板生成需求文档。对话阶段不生成任何代码。

Guides an LLM through project ideation via role-play: ask clarifying questions first, then present the concept, and finally generate a PRD based on the provided template. No code is generated during this phase.

**PRD_template_en** — 产品需求文档模板 / PRD Template

分阶段的产品需求文档模板，包含项目概览（愿景、目标用户）与功能规划（MVP / Phase 2），用于承接构思阶段的输出。

A phased Product Requirements Document template with project overview (vision, target users) and feature planning (MVP / Phase 2). Designed to receive output from the ideation phase.

**dev_log_template** — 开发日志模板 / Development Log Template

用于记录项目迭代状态的结构化日志，包含四个核心字段：上一阶段、当前阶段、变更内容、用户指令摘要。适合在 LLM 对话中维护 Artifact 的版本上下文。

A structured log for tracking project iteration state with four core fields: previous stage, current stage, changes, and user instructions summary. Useful for maintaining Artifact version context across LLM conversations.

---

## 使用 / How to use:
打开网页即可勾选下载
Open this url to select & Download
> https://youngz2357.github.io/Templates/

## 计划 / Roadmap

- [ ] 扩展 LaTeX 模板：适配 paper-style 项目报告（ML 课程等）
- [ ] 补充更多任务型 Prompt 模板（翻译、摘要、代码审查等）

---

## License

本仓库供个人使用与参考。欢迎 Fork 并根据自身需求修改。

For personal use and reference. Feel free to fork and adapt.
