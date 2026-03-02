import React, { useCallback } from 'react'
import { handlePaste, PasteResult } from '@/lib/pasteHandler'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder = '在这里输入 Markdown，或粘贴富文本...' }) => {
  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }, [onChange])

  const handlePasteEvent = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // 检查是否有富文本内容
    const clipboardData = e.nativeEvent.clipboardData
    if (!clipboardData) return

    const hasHtml = clipboardData.types.includes('text/html')
    const hasImage = Array.from(clipboardData.items).some(item => item.type.startsWith('image/'))

    // 如果有 HTML 或图片，阻止默认行为并使用自定义处理
    if (hasHtml || hasImage) {
      e.preventDefault()

      try {
        const result: PasteResult = await handlePaste(e.nativeEvent)

        // 在当前光标位置插入内容
        const textarea = e.currentTarget
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        let newValue: string
        if (result.type === 'image') {
          // 图片插入到新行
          const beforeCursor = value.substring(0, start)
          const afterCursor = value.substring(end)
          const needsNewline = beforeCursor.length > 0 && !beforeCursor.endsWith('\n')
          newValue = beforeCursor + (needsNewline ? '\n' : '') + result.content + '\n' + afterCursor
        } else {
          // 文本/Markdown 直接插入
          newValue = value.substring(0, start) + result.content + value.substring(end)
        }

        onChange(newValue)

        // 恢复光标位置
        setTimeout(() => {
          const newCursorPos = start + result.content.length
          textarea.setSelectionRange(newCursorPos, newCursorPos)
          textarea.focus()
        }, 0)
      } catch (error) {
        console.error('Paste handling error:', error)
      }
    }
    // 否则让浏览器默认处理纯文本粘贴
  }, [value, onChange])

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-sm text-gray-500">
        Markdown 编辑器
      </div>
      <textarea
        className="flex-1 w-full p-4 resize-none border-none outline-none font-mono text-sm leading-relaxed bg-white"
        value={value}
        onChange={handleTextareaChange}
        onPaste={handlePasteEvent}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  )
}

export default Editor
