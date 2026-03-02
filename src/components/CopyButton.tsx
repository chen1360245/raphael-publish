import React, { useState, useCallback } from 'react'
import { copyHtmlToClipboard } from '@/lib/wechatCompat'

interface CopyButtonProps {
  previewRef: React.RefObject<HTMLDivElement>
}

type CopyState = 'idle' | 'copying' | 'success' | 'error'

const CopyButton: React.FC<CopyButtonProps> = ({ previewRef }) => {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const copyToWeChat = useCallback(async () => {
    const previewElement = previewRef.current?.querySelector('.markdown-body') as HTMLElement
    if (!previewElement) {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2000)
      return
    }

    setCopyState('copying')

    try {
      const success = await copyHtmlToClipboard(previewElement.innerHTML)

      if (success) {
        setCopyState('success')
        setTimeout(() => setCopyState('idle'), 2000)
      } else {
        setCopyState('error')
        setTimeout(() => setCopyState('idle'), 2000)
      }
    } catch (error) {
      console.error('Copy error:', error)
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2000)
    }
  }, [previewRef])

  const getButtonStyle = () => {
    switch (copyState) {
      case 'copying':
        return 'bg-blue-500 cursor-wait'
      case 'success':
        return 'bg-green-600'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-green-600 hover:bg-green-700'
    }
  }

  const getButtonText = () => {
    switch (copyState) {
      case 'copying':
        return '处理中...'
      case 'success':
        return '已复制!'
      case 'error':
        return '复制失败'
      default:
        return '复制到公众号'
    }
  }

  return (
    <button
      type="button"
      onClick={copyToWeChat}
      disabled={copyState === 'copying'}
      className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-70 ${getButtonStyle()}`}
    >
      {getButtonText()}
    </button>
  )
}

export default CopyButton
