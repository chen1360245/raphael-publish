# Raphael Publish - 技术方案

> **版本**: v1.1（Codex 审核修正版）
> **日期**: 2026-03-02
> **制定者**: coder agent
> **审核者**: Codex

---

## 一、架构设计

### 1.1 整体架构

```
┌─────────────────────────────────────────────────┐
│                   App.tsx                        │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐ │
│  │   Toolbar   │  │ ThemeSelect │  │ViewSwitch│ │
│  └─────────────┘  └─────────────┘  └──────────┘ │
│  ┌─────────────────────────────────────────────┐│
│  │              Main Content                    ││
│  │  ┌──────────────┐  ┌──────────────────────┐ ││
│  │  │    Editor    │  │       Preview        │ ││
│  │  │  (Markdown)  │  │    (Rendered HTML)   │ ││
│  │  └──────────────┘  └──────────────────────┘ ││
│  └─────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────┐│
│  │  [Copy to WeChat]  [Export PDF]  [Export HTML]│
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

### 1.2 数据流

```
用户输入 Markdown
    ↓
onChange 事件
    ↓
更新 content state
    ↓
markdown-it 解析
    ↓
highlight.js 高亮
    ↓
渲染到 Preview
    ↓
应用主题 CSS 变量
```

---

## 二、核心模块设计

### 2.1 魔法粘贴模块

```typescript
// src/lib/pasteHandler.ts

interface PasteResult {
  type: 'markdown' | 'image' | 'text';
  content: string;
}

export async function handlePaste(event: ClipboardEvent): Promise<PasteResult> {
  const clipboardData = event.clipboardData;
  
  // 1. 检查是否有图片
  const items = clipboardData?.items;
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      const base64 = await fileToBase64(file);
      return { type: 'image', content: `![](${base64})` };
    }
  }
  
  // 2. 检查是否有 HTML
  const html = clipboardData?.getData('text/html');
  if (html) {
    const markdown = turndown(html);
    return { type: 'markdown', content: markdown };
  }
  
  // 3. 纯文本
  const text = clipboardData?.getData('text/plain');
  return { type: 'text', content: text };
}
```

### 2.2 主题系统

```typescript
// src/lib/themes.ts

export interface Theme {
  id: string;
  name: string;
  category: 'classic' | 'trendy' | 'more';
  colors: {
    background: string;
    text: string;
    heading: string;
    link: string;
    code: string;
    codeBackground: string;
    blockquote: string;
    blockquoteBorder: string;
  };
  fonts: {
    body: string;
    heading: string;
    code: string;
  };
}

// 30 套主题配置
export const themes: Theme[] = [
  {
    id: 'mac-white',
    name: 'Mac 纯净白',
    category: 'classic',
    colors: {
      background: '#ffffff',
      text: '#333333',
      heading: '#000000',
      link: '#0066cc',
      code: '#d63384',
      codeBackground: '#f8f9fa',
      blockquote: '#666666',
      blockquoteBorder: '#007bff',
    },
    fonts: {
      body: '-apple-system, sans-serif',
      heading: '-apple-system, sans-serif',
      code: 'SF Mono, monospace',
    },
  },
  // ... 其他 29 套主题
];
```

### 2.3 微信兼容模块

```typescript
// src/lib/wechatCompat.ts

export async function prepareForWeChat(html: string): Promise<string> {
  // 1. 图片转 Base64
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const images = doc.querySelectorAll('img');
  for (const img of images) {
    if (img.src.startsWith('http')) {
      const base64 = await imageToBase64(img.src);
      img.src = base64;
    }
  }
  
  // 2. DOM 重塑（列表、表格）
  // 微信不支持某些 CSS，需要内联样式
  
  // 3. 移除不支持的样式
  const elements = doc.querySelectorAll('*');
  elements.forEach(el => {
    // 移除 flexbox、grid 等微信不支持的布局
    el.removeAttribute('class');
    // 添加内联样式
  });
  
  return doc.body.innerHTML;
}
```

---

## 三、文件结构

```
raphael-publish/
├── src/
│   ├── components/
│   │   ├── Editor.tsx           # Markdown 编辑器
│   │   ├── Preview.tsx          # 实时预览
│   │   ├── Toolbar.tsx          # 工具栏
│   │   ├── ThemeSelector.tsx    # 主题选择器
│   │   ├── ViewSwitcher.tsx     # 视图切换
│   │   ├── ExportButton.tsx     # 导出按钮
│   │   └── CopyButton.tsx       # 复制按钮
│   ├── lib/
│   │   ├── markdown.ts          # Markdown 解析
│   │   ├── pasteHandler.ts      # 魔法粘贴
│   │   ├── wechatCompat.ts      # 微信兼容
│   │   ├── themes.ts            # 主题配置
│   │   └── export.ts            # 导出功能
│   ├── styles/
│   │   └── themes.css           # 主题 CSS 变量
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 四、开发计划

### Phase 1：项目初始化（30分钟）
- 创建 Vite + React + TypeScript 项目
- 配置 Tailwind CSS
- 配置路径别名
- 安装依赖

### Phase 2：基础组件（1小时）
- Editor 组件（textarea + 状态管理）
- Preview 组件（markdown-it 渲染）
- Toolbar 组件（基础按钮）

### Phase 3：魔法粘贴（30分钟）
- pasteHandler.ts 实现
- 集成到 Editor 组件

### Phase 4：主题系统（1小时）
- themes.ts 配置
- 10 套核心主题
- ThemeSelector 组件

### Phase 5：微信兼容（1小时）
- wechatCompat.ts 实现
- 图片转 Base64
- CopyButton 组件

### Phase 6：完善功能（1小时）
- 扩展到 30 套主题
- ViewSwitcher 组件
- ExportButton 组件
- 多端预览

### Phase 7：测试与优化（30分钟）
- 功能测试
- 样式微调
- 性能优化

---

## 五、技术难点与解决方案

| 难点 | 解决方案 |
|------|---------|
| 跨域图片转 Base64 | 提示用户手动上传，或使用代理服务 |
| 微信 CSS 兼容性 | 内联样式 + **白名单映射机制** |
| 大文档性能 | 虚拟滚动 + 防抖渲染 |
| 主题切换闪烁 | CSS 变量 + transition |
| **XSS 安全** | **DOMPurify 清洗 + Markdown 白名单策略** |
| **剪贴板注入** | **粘贴 HTML 清洗** |
| **PDF 导出** | **使用 html2canvas + jsPDF（轻量方案）** |

---

## 六、安全三件套（Codex 要求）

### 6.1 DOMPurify 清洗

```typescript
import DOMPurify from 'dompurify';

// 渲染前清洗 HTML
const cleanHtml = DOMPurify.sanitize(markdownHtml, {
  ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'code', 'pre', 'blockquote', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id'],
});
```

### 6.2 Markdown 白名单

```typescript
// markdown-it 配置白名单
const md = markdownit({
  html: false,  // 禁止 HTML 标签
  linkify: true,
  typographer: true,
});
```

### 6.3 粘贴清洗

```typescript
// turndown 配置 + DOMPurify 清洗
function sanitizePasteHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'strong', 'em', 'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'table', 'tr', 'td', 'th'],
  });
}
```

---

## 七、Content Pipeline（Codex 建议）

```
用户输入/粘贴
    ↓
┌─────────────────┐
│ 1. Input        │ ← 接收内容
└─────────────────┘
    ↓
┌─────────────────┐
│ 2. Normalize    │ ← 统一格式（HTML→Markdown）
└─────────────────┘
    ↓
┌─────────────────┐
│ 3. Sanitize     │ ← DOMPurify 清洗
└─────────────────┘
    ↓
┌─────────────────┐
│ 4. Render       │ ← markdown-it 渲染 + highlight.js
└─────────────────┘
    ↓
┌─────────────────┐
│ 5. Postprocess  │ ← wechatCompat / export
└─────────────────┘
```

---

## 八、修正后的开发计划

### Phase 1：项目初始化 + 安全基础（1小时）
- 创建 Vite + React + TypeScript 项目
- 配置 Tailwind CSS
- **安装 DOMPurify**
- 配置路径别名

### Phase 2：Content Pipeline（1.5小时）
- 实现 input → normalize → sanitize → render 流程
- 魔法粘贴功能
- 安全清洗

### Phase 3：核心组件（1.5小时）
- Editor 组件
- Preview 组件
- Toolbar 组件

### Phase 4：主题系统（2小时）
- 10 套核心主题
- CSS 变量 + Tailwind 分层
- ThemeSelector 组件

### Phase 5：微信兼容（1.5小时）
- wechatCompat 策略模块（白名单映射）
- 图片转 Base64
- CopyButton 组件

### Phase 6：导出功能（1小时）
- html2canvas + jsPDF 导出 PDF
- HTML 导出

### Phase 7：完善与测试（1.5小时）
- 扩展到 30 套主题
- 多端预览
- 功能测试

**总计：约 10 小时**（原计划 5 小时，Codex 指出偏乐观）

---

## 六、待 Codex 审核

1. 技术栈选择是否合理？
2. 架构设计是否清晰？
3. 是否有潜在风险？
4. 模块划分是否合理？
5. 开发计划是否可行？

---

> **文档版本**: v1.0
> **创建时间**: 2026-03-02
