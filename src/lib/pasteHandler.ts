import TurndownService from 'turndown'
import DOMPurify from 'dompurify'

// 配置 Turndown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

// DOMPurify 粘贴清洗白名单
const PASTE_ALLOWED_TAGS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins',
  'a', 'img',
  'code', 'pre', 'kbd', 'samp',
  'blockquote', 'q',
  'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'br',
]

export interface PasteResult {
  type: 'markdown' | 'image' | 'text'
  content: string
}

/**
 * 将 File 转换为 Base64
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 清洗粘贴的 HTML
 */
function sanitizePasteHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: PASTE_ALLOWED_TAGS,
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    ALLOW_DATA_ATTR: false,
  })
}

/**
 * 将 HTML 转换为 Markdown
 */
function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html)
}

/**
 * 处理粘贴事件
 * Content Pipeline: input → normalize → sanitize → convert
 */
export async function handlePaste(event: ClipboardEvent): Promise<PasteResult> {
  const clipboardData = event.clipboardData
  if (!clipboardData) {
    return { type: 'text', content: '' }
  }

  // 1. 检查是否有图片
  const items = clipboardData.items
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        try {
          const base64 = await fileToBase64(file)
          return { type: 'image', content: `![image](${base64})` }
        } catch {
          // 图片转换失败，继续处理其他类型
        }
      }
    }
  }

  // 2. 检查是否有 HTML（富文本）
  const html = clipboardData.getData('text/html')
  if (html) {
    // 清洗 HTML
    const cleanHtml = sanitizePasteHtml(html)
    // 转换为 Markdown
    const markdown = htmlToMarkdown(cleanHtml)
    return { type: 'markdown', content: markdown }
  }

  // 3. 纯文本
  const text = clipboardData.getData('text/plain')
  return { type: 'text', content: text }
}

/**
 * 将图片 URL 转换为 Base64（用于跨域图片处理）
 */
export async function imageUrlToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')
        resolve(dataURL)
      } else {
        reject(new Error('Canvas context not available'))
      }
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = url
  })
}
