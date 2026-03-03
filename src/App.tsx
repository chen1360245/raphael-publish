import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Editor, { EditorRef } from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import ThemeSelector from './components/ThemeSelector'
import ViewSwitcher from './components/ViewSwitcher'
import ExportButton from './components/ExportButton'
import CopyButton from './components/CopyButton'
import { themes } from './lib/themes'

const defaultContent = `# Raphael Publish - 公众号排版大师

欢迎使用 **Raphael Publish**！这是一个专为微信公众号打造的现代 Markdown 排版引擎。

## 功能特性

### 🎨 魔法粘贴

从飞书、Notion、Word 或任意网页复制富文本，粘贴瞬间自动转为 Markdown。

### 🎭 30 套高定主题

告别同质化白底模板，提供 30 套精心打磨的视觉主题。

### 📱 多端预览

支持手机、平板、桌面三种视图切换。

### 📋 一键复制到公众号

图片自动转 Base64，样式精准还原。

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Raphael Publish!');
}
\`\`\`

## 表格示例

| 功能 | 状态 |
|------|------|
| Markdown 编辑 | ✅ |
| 主题切换 | ✅ |
| 导出 PDF | ✅ |

> 开始你的创作之旅吧！
`

type ViewMode = 'mobile' | 'tablet' | 'desktop'

const DEBOUNCE_DELAY = 300 // 防抖延迟 300ms

const App: React.FC = () => {
  const [content, setContent] = useState(defaultContent)
  const [debouncedContent, setDebouncedContent] = useState(defaultContent)
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const previewRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<EditorRef>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent)

    // 清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // 设置新的防抖定时器
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedContent(newContent)
    }, DEBOUNCE_DELAY)
  }, [])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const handleThemeChange = useCallback((theme: typeof themes[0]) => {
    setCurrentTheme(theme)
  }, [])

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode)
  }, [])

  // 在光标位置插入内容的辅助函数
  const insertAtCursor = useCallback((text: string) => {
    editorRef.current?.insertAtCursor(text)
  }, [])

  // 在光标位置插入内容（带换行）
  const insertAtCursorWithNewline = useCallback((text: string) => {
    const editor = editorRef.current
    if (!editor) return

    const selection = editor.getSelection()
    const beforeContent = content.substring(0, selection.start)

    // 如果光标不在行首，添加换行
    const needsNewline = beforeContent.length > 0 && !beforeContent.endsWith('\n')
    const prefix = needsNewline ? '\n' : ''

    // 如果内容不以换行结尾，添加换行
    const suffix = text.endsWith('\n') ? '' : '\n'

    editor.insertAtCursor(prefix + text + suffix)
  }, [content])

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">Raphael Publish</h1>
          <span className="text-sm text-gray-500">公众号排版大师</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
          />
          <ViewSwitcher
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor */}
        <div className="w-1/2 border-r border-gray-200 bg-white flex flex-col">
          <Toolbar
            onBold={() => insertAtCursor('**粗体**')}
            onItalic={() => insertAtCursor('*斜体*')}
            onLink={() => insertAtCursor('[链接文字](url)')}
            onCode={() => insertAtCursor('`代码`')}
            onQuote={() => insertAtCursorWithNewline('> 引用')}
            onImage={() => insertAtCursor('![图片描述](url)')}
            onHeading={(level) => insertAtCursorWithNewline('#'.repeat(level) + ' 标题')}
          />
          <Editor
            ref={editorRef}
            value={content}
            onChange={handleContentChange}
          />
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 bg-gray-50 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-200 bg-white flex items-center justify-between">
            <span className="text-sm text-gray-500">实时预览</span>
            <div className="flex gap-2">
              <CopyButton previewRef={previewRef} />
              <ExportButton previewRef={previewRef} content={content} />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 flex justify-center" ref={previewRef}>
            <Preview
              content={debouncedContent}
              theme={currentTheme}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
