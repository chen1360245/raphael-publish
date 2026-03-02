# Raphael Publish - 需求文档

> **项目名称**: Raphael Publish（公众号排版大师）
> **项目类型**: Web 应用（React + TypeScript）
> **目标用户**: 微信公众号运营者、内容创作者
> **参考仓库**: https://github.com/liuxiaopai-ai/raphael-publish

---

## 一、项目概述

### 1.1 背景

微信公众号文章排版一直是内容创作者的痛点：
- 微信后台编辑器功能简陋
- 第三方排版工具同质化严重（都是白底模板）
- 从其他平台（飞书、Notion、Word）复制内容格式丢失
- 外链图片在公众号中显示"来自第三方"报错

### 1.2 解决方案

Raphael Publish 是一个**现代 Markdown 排版引擎**，提供：
- 魔法粘贴：富文本自动转 Markdown
- 30 套高定视觉主题
- 一键复制到公众号（图片转 Base64）
- 多端预览（手机/平板/PC）
- 导出 PDF/HTML

---

## 二、核心功能

### 2.1 魔法粘贴（核心差异化功能）

| 功能点 | 说明 | 优先级 |
|--------|------|--------|
| 富文本转 Markdown | 从飞书、Notion、Word、网页复制内容，粘贴自动转 Markdown | P0 |
| 图片粘贴 | Ctrl/Cmd + V 直接粘贴截图，自动插入 Markdown 图片语法 | P0 |
| 剪贴板监听 | 监听 paste 事件，解析剪贴板数据 | P0 |

**技术实现**：
- 使用 `turndown` 库将 HTML 转 Markdown
- 监听 `paste` 事件，读取 `clipboardData`
- 处理 `text/html` 和 `image/*` 类型

### 2.2 Markdown 编辑器

| 功能点 | 说明 | 优先级 |
|--------|------|--------|
| 实时预览 | 左侧编辑，右侧实时渲染 | P0 |
| 语法高亮 | 代码块语法高亮 | P0 |
| 工具栏 | 加粗、斜体、链接、图片、代码等快捷按钮 | P1 |

### 2.3 主题系统（30套）

**经典（10套）**：Mac纯净白、Claude燕麦色、微信原生、NYT、Medium、Stripe、飞书蓝、Linear暗夜、Retro复古、Bloomberg终端

**潮流（10套）**：Notion、GitHub、少数派、Dracula、Nord、樱花、深海、薄荷、日落、Monokai

**更多风格（10套）**：Solarized、Cyberpunk、水墨、薰衣草、密林、冰川、咖啡、Bauhaus、赤铜、彩虹糖

### 2.4 一键复制到公众号

- 图片转 Base64（避免"此图片来自第三方"报错）
- DOM 重塑（列表、表格在微信中不塌陷）
- wechatCompat 引擎

### 2.5 多端预览

- 手机视图（480px）
- 平板视图（768px）
- 桌面视图（PC）

### 2.6 导出功能

- 导出 PDF
- 导出 HTML

---

## 三、技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| TypeScript | 5.6.2 | 类型安全 |
| Vite | 5.4.10 | 构建 |
| Tailwind CSS | 3.4.14 | 样式 |
| markdown-it | 14.1.0 | Markdown 解析 |
| highlight.js | 11.10.0 | 代码高亮 |
| turndown | 7.2.2 | HTML→Markdown |
| html2pdf.js | 0.14.0 | PDF 导出 |
| framer-motion | 11.11.11 | 动画 |

---

## 四、验收标准

1. **魔法粘贴**：从飞书/Notion/Word 复制，粘贴后自动转 Markdown
2. **30套主题**：全部可用，切换流畅
3. **复制到公众号**：样式正确，图片无报错
4. **性能**：首屏 < 2s，渲染 < 100ms

---

## 五、下一步

请确认需求后，我将：
1. 调用 **Codex** 审核技术方案
2. 调用 **Claude Code** 开始开发

---

> **创建时间**: 2026-03-02
> **创建者**: coder agent
