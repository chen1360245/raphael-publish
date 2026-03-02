import React from 'react'
import { markdownToHtml } from '@/lib/markdown'
import { Theme } from '@/lib/themes'

interface PreviewProps {
  content: string
  theme: Theme
  viewMode: 'mobile' | 'tablet' | 'desktop'
}

const Preview: React.FC<PreviewProps> = ({ content, theme, viewMode }) => {
  // 将 Markdown 转换为 HTML
  const html = markdownToHtml(content)

  // 根据视图模式设置宽度
  const getWidth = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-[480px]'
      case 'tablet':
        return 'max-w-[768px]'
      default:
        return 'max-w-full'
    }
  }

  // 构建 CSS 变量和主题样式
  const themeStyles: React.CSSProperties = {
    // 基础变量
    '--color-bg': theme.colors.background,
    '--color-text': theme.colors.text,
    '--color-heading': theme.colors.heading,
    '--color-link': theme.colors.link,
    '--color-code': theme.colors.code,
    '--color-code-bg': theme.colors.codeBackground,
    '--color-blockquote': theme.colors.blockquote,
    '--color-blockquote-border': theme.colors.blockquoteBorder,
    '--font-body': theme.fonts.body,
    '--font-heading': theme.fonts.heading,
    '--font-code': theme.fonts.code,
    // 直接应用基础样式
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
  } as React.CSSProperties

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-sm text-gray-500 flex items-center justify-between">
        <span>预览</span>
        <span className="text-xs text-gray-400">
          {viewMode === 'mobile' ? '手机视图 (480px)' : viewMode === 'tablet' ? '平板视图 (768px)' : '桌面视图'}
        </span>
      </div>
      <div
        className="flex-1 overflow-auto p-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div
          className={`markdown-body mx-auto ${getWidth()}`}
          style={themeStyles}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export default Preview
