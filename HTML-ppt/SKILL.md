---
name: HTML-ppt
description: 用于制作、修复并交付横向翻页的网页演示稿（单文件 HTML）及对应 PPTX。适用于商务汇报、方案介绍、发布分享、网页PPT转PPT文件等场景，默认输出 html + pptx 双文件。
---

# HTML-ppt

## Overview
用于产出可直接演示的单文件 HTML 汇报型演示稿（16:9 横向翻页），并自动转换为 `.pptx`，默认交付两个文件：`html` 与 `pptx`。

## When To Use
- 用户明确要 `HTML` / 网页版 PPT / 横向翻页演示。
- 用户希望“瑞士风 / Swiss Style / 信息感强 / 商务汇报感”。
- 用户需要同时拿到“网页版 + PowerPoint版”。
- 用户反馈“无法翻页/按钮无效/始终第一页”，需要修复。
- 用户要求把现有 HTML deck 转成 PPTX。

## Inputs
最少输入：
- 主题（讲什么）
- 受众（高管/技术/销售）
- 页数目标（建议 8-12 页）

可选输入：
- 既有方案文档（md/docx/pdf）
- 指定风格与配色（IKB 蓝/柠檬黄/柠檬绿/安全橙）

## Workflow
1. 选模板
- 基于 `guizang-ppt-skill` 的 Swiss 模板。
- 默认路径：`~/.codex/skills/guizang-ppt-skill/assets/template-swiss.html`。

2. 生成页面结构
- 必须包含：`<div id="deck">` + 多个 `<section class="slide ...">`。
- 每页写清 `data-layout` 与 `data-animate`。
- 商务汇报建议参考 `references/slide-blueprint.md`。

3. 使用模板内建导航（关键）
- 直接基于 Swiss 模板生成，不要手写或后补导航补丁。
- 确保模板原生的 `#nav` 存在。
- 默认交互依赖模板内建逻辑：
  - 键盘 `← →`
  - 滚轮翻页
  - 触控滑动
  - `ESC` 缩略图
- 如果遇到“只能停留第一页”，优先检查是否误改了模板原生的 `#deck`、`#nav` 或 `go()` 逻辑；不要再通过历史补丁脚本注入箭头按钮。

4. 校验
- 结构校验：
  - `node ~/.codex/skills/guizang-ppt-skill/scripts/validate-swiss-deck.mjs <html-file>`
- 交互校验：
  - 键盘翻页（← →）
  - 滚轮翻页
  - ESC 缩略图

5. HTML 转 PPTX（默认必做）
- 执行：
  - `node scripts/html_to_pptx.js <input.html> [output.pptx]`
- 该脚本会：
  - 打开 HTML；
  - 自动切到静态稳定渲染模式，避免动画导致截图页留白；
  - 按页渲染截图；
  - 按 16:9 全屏图写入 PPTX（高保真）。

6. 交付
- 默认交付两个文件：
  - `xxx.html`
  - `xxx.pptx`
- 若用户额外要求，可附无脚本降级版 HTML（纵向滚动）。

## Quality Bar
- 页面数量与叙事匹配（8-12 页优先）。
- 视觉节奏有变化（封面、信息页、对比页、收束页）。
- 交互可用性优先于炫技动效。
- 不能出现“第一页锁死”问题。
- 最终必须输出 html + pptx 双文件。

## Troubleshooting
- 只显示第一页：优先检查是否误改模板原生的 `#deck`、`#nav`、`go()` 逻辑。
- 导出的 PPT 某些页留白：确认使用当前版本的 `scripts/html_to_pptx.js`，它会在截图前自动切到静态稳定模式。
- 动效库加载失败：保留静态可读性，不阻塞翻页。
- Playwright 启动失败：先安装浏览器 runtime，再重试转换。

## References
- 商务叙事蓝图：`references/slide-blueprint.md`
- 发布前检查：`references/qa-checklist.md`
- 提示词模板：`references/prompt-template.md`

## Scripts
- `scripts/html_to_pptx.js`：将 HTML deck 转换为 PPTX。
