import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

// 配置 markdown-it
const md: MarkdownIt = new MarkdownIt({
  html: false, // 禁止 HTML 标签（安全考虑）
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    // 代码高亮
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch {
        // 忽略错误
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

// DOMPurify 允许的标签白名单
const ALLOWED_TAGS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins',
  'a', 'img',
  'code', 'pre', 'kbd', 'samp',
  'blockquote', 'q',
  'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr', 'br',
  'div', 'span',
]

// DOMPurify 允许的属性白名单
const ALLOWED_ATTR = ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel']

/**
 * 将 Markdown 转换为安全的 HTML
 * Content Pipeline: input → render → sanitize
 */
export function markdownToHtml(markdown: string): string {
  // 1. 渲染 Markdown
  const rawHtml = md.render(markdown)

  // 2. DOMPurify 清洗
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })

  return cleanHtml
}

/**
 * 获取纯文本摘要
 */
export function getPlainText(markdown: string, maxLength: number = 200): string {
  const html = md.render(markdown)
  const div = document.createElement('div')
  div.innerHTML = html
  const text = div.textContent || div.innerText || ''
  return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
}

export { md }
