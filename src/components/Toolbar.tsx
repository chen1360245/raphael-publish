import React from 'react'

interface ToolbarProps {
  onBold: () => void
  onItalic: () => void
  onLink: () => void
  onCode: () => void
  onQuote: () => void
  onImage: () => void
  onHeading: (level: number) => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBold,
  onItalic,
  onLink,
  onCode,
  onQuote,
  onImage,
  onHeading,
}) => {
  const Button: React.FC<{
    onClick: () => void
    title: string
    children: React.ReactNode
  }> = ({ onClick, title, children }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
    >
      {children}
    </button>
  )

  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-gray-200">
      {/* 标题 */}
      <div className="flex items-center gap-1 mr-2">
        <Button onClick={() => onHeading(1)} title="一级标题">H1</Button>
        <Button onClick={() => onHeading(2)} title="二级标题">H2</Button>
        <Button onClick={() => onHeading(3)} title="三级标题">H3</Button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* 格式化 */}
      <div className="flex items-center gap-1">
        <Button onClick={onBold} title="加粗 (Ctrl+B)">
          <strong>B</strong>
        </Button>
        <Button onClick={onItalic} title="斜体 (Ctrl+I)">
          <em>I</em>
        </Button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* 插入 */}
      <div className="flex items-center gap-1">
        <Button onClick={onLink} title="链接">链接</Button>
        <Button onClick={onImage} title="图片">图片</Button>
        <Button onClick={onCode} title="代码">代码</Button>
        <Button onClick={onQuote} title="引用">引用</Button>
      </div>
    </div>
  )
}

export default Toolbar
