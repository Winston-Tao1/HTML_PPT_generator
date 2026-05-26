# HTML-ppt

> 用于制作、修复并交付横向翻页的网页演示稿（单文件 HTML）及对应 PPTX。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 能力概览

| 能力 | 说明 |
|------|------|
| **Swiss Style 网页 PPT** | 基于 Swiss 模板生成专业商务演示稿，支持 16:9 横向翻页 |
| **HTML → PPTX 高保真导出** | 一键将 HTML 演示稿转换为可归档的 `.pptx` 文件，支持 16:9 全屏截图 |
| **智能翻页交互** | 键盘 `← →`、滚轮翻页、触控滑动、`ESC` 缩略图导航 |
| **动画与静态双模式** | 演示时保留动效，导出 PPTX 时自动切换静态稳定渲染，避免截图留白 |
| **商务叙事蓝图** | 内置 10 页商务汇报标准结构（封面→摘要→痛点→方案→落地→收束） |
| **QA 质量保障** | 提供结构、导航、视觉、交付四维校验清单，确保产出质量 |

## 🚀 快速开始

### 最少输入

只需提供 3 项即可生成完整演示稿：

1. **主题** — 这份 PPT 讲什么
2. **受众** — 给谁看（高管 / 技术 / 销售）
3. **页数目标** — 建议 8-12 页

### 典型工作流

```
业务材料 → HTML 网页 PPT → 导出 PPTX → 交付 html + pptx
```

1. **生成 HTML 演示稿** — 基于 Swiss 模板，指定主题、受众、页数
2. **HTML 转 PPTX** — 运行 `node scripts/html_to_pptx.js <input.html> [output.pptx]`
3. **校验交付** — 检查翻页、缩略图、导出一致性

### 支持的风格与配色

- **风格**: Swiss Style — 专业、克制、现代，强调网格、留白和重点数字
- **配色**: IKB 蓝 / 柠檬黄 / 柠檬绿 / 安全橙
- **品牌定制**: 支持自定义 Logo、配色、字体

## 📂 项目结构

```
HTML-ppt/
├── SKILL.md                        # Skill 定义与完整工作流
├── agents/
│   └── openai.yaml                 # Agent 接口配置
├── assets/                         # 模板资源
├── references/
│   ├── prompt-template.md          # 提示词模板（含可直接使用的商业案例）
│   ├── slide-blueprint.md          # 10 页商务叙事蓝图
│   └── qa-checklist.md             # 发布前 QA 检查清单
├── scripts/
│   └── html_to_pptx.js             # HTML 转 PPTX 脚本
└── demo/
    └── ai-customer-service-upgrade-screenshot-export-fixed.pptx
```

## 📊 内置商务叙事蓝图（10 页）

| 页码 | 内容 | 说明 |
|------|------|------|
| 1 | 封面 | 主题 + 一句话价值主张 |
| 2 | 执行摘要 | 3-4 条结论先行 |
| 3 | 痛点页 | 当前问题与机会窗口 |
| 4 | 公司介绍 | 定位、能力、交付经验 |
| 5 | 能力矩阵 | 技术与治理能力总览 |
| 6 | 套餐方案 | 三档席位 + 差异化扩展 |
| 7 | 计费机制 | 官方价直通 + 缓存计价 |
| 8 | 安全合规 | 身份、权限、审计、留存 |
| 9 | 落地路径 | POC→上线→扩展→运营 |
| 10 | 收束页 | 3 条 takeaway + 下一步动作 |

## 🎨 Demo 案例

### 智能客服平台升级方案汇报

`demo/ai-customer-service-upgrade-screenshot-export-fixed.pptx` 是一份完整的商务汇报演示稿，展示 HTML-ppt 的典型输出效果。

**案例信息**:

| 项目 | 内容 |
|------|------|
| 主题 | 智能客服平台升级方案 |
| 受众 | CEO、COO、客服负责人、技术负责人 |
| 页数 | 8-10 页 |
| 风格 | Swiss Style，深蓝+橘色强调 |
| 场景 | 面向管理层 15 分钟汇报，申请预算启动项目 |

**核心数据**:
- 月均咨询量：82 万
- 重复问题占比：57%
- 单月人力成本：约 138 万元

**页面结构**:
1. 封面 — 主题 + 价值主张
2. 背景与问题 — 数据驱动的痛点分析
3. 方案架构 — AI 意图识别 + 知识库问答 + 工单自动分派
4. 核心能力模块 — 机器人、坐席辅助、智能质检
5. 收益测算 — 量化 ROI 分析
6. 实施计划 — Q1-Q4 分阶段落地路径
7. 风险与治理 — 风险识别与应对策略
8. 收尾页 — Takeaways + 下一步行动

📥 [下载 Demo PPTX](./HTML-ppt/demo/ai-customer-service-upgrade-screenshot-export-fixed.pptx)

## 🔧 命令参考

### HTML 转 PPTX

```bash
node HTML-ppt/scripts/html_to_pptx.js <input.html> [output.pptx]
```

功能说明：
- 自动打开 HTML 并切换到静态稳定渲染模式
- 按页渲染截图（16:9）
- 高保真写入 PPTX

> 依赖 Playwright 浏览器 runtime，首次使用需安装。

## ✅ QA 检查清单

- [x] `#deck` 存在且结构完整
- [x] 模板原生翻页逻辑未被破坏
- [x] 键盘 `← →` 可翻页
- [x] 滚轮可翻页
- [x] `ESC` 可开关缩略图
- [x] 单文件 HTML 可直接打开演示
- [x] 导出 PPTX 无大面积留白
- [x] 封面/正文/收尾风格统一

## 📋 常见问题

| 问题 | 解决方案 |
|------|---------|
| 只显示第一页 | 检查是否误改模板原生 `#deck`、`#nav`、`go()` 逻辑 |
| 导出 PPT 留白 | 使用当前版本 `scripts/html_to_pptx.js`，自动切换静态模式 |
| 动效库加载失败 | 保留静态可读性，不阻塞翻页 |
| Playwright 启动失败 | 先安装浏览器 runtime 再重试 |

## 📄 License

MIT