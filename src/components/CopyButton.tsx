import React, { useState } from 'react'

interface CopyButtonProps {
  previewRef: React.RefObject<HTMLDivElement>
}

const CopyButton: React.FC<CopyButtonProps> = ({ previewRef }) => {
  const [copied, setCopied] = useState(false)

  const copyToWeChat = async () => {
    const previewElement = previewRef.current?.querySelector('.markdown-body') as HTMLElement
    if (!previewElement) {
      alert('预览区域未找到')
      return
    }

    try {
      // 创建一个临时容器用于复制
      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = previewElement.innerHTML
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      document.body.appendChild(tempContainer)

      // 使用 Clipboard API 复制 HTML
      const range = document.createRange()
      range.selectNodeContents(tempContainer)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('copy')
        selection.removeAllRanges()
      }

      document.body.removeChild(tempContainer)

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy error:', error)
      alert('复制失败，请手动选择复制')
    }
  }

  return (
    <button
      type="button"
      onClick={copyToWeChat}
      className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${
        copied
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {copied ? '已复制!' : '复制到公众号'}
    </button>
  )
}

export default CopyButton
