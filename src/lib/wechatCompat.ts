/**
 * 微信公众号兼容性处理模块
 * 处理图片转 Base64、样式内联化、白名单过滤等
 */

/**
 * 微信支持的 CSS 属性白名单
 * 参考：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
 */
const WECHAT_STYLE_WHITELIST = new Set([
  // 盒模型
  'width', 'height', 'max-width', 'min-width', 'max-height', 'min-height',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'box-sizing',

  // 边框
  'border', 'border-width', 'border-style', 'border-color',
  'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-radius', 'border-top-left-radius', 'border-top-right-radius',
  'border-bottom-left-radius', 'border-bottom-right-radius',

  // 背景（仅支持颜色）
  'background-color',

  // 文本
  'color', 'font-size', 'font-weight', 'font-style', 'font-family',
  'line-height', 'text-align', 'text-decoration', 'text-indent',
  'letter-spacing', 'word-spacing', 'white-space', 'word-break', 'word-wrap',

  // 显示与布局
  'display', 'visibility', 'overflow',
  'vertical-align',

  // 表格
  'border-collapse', 'border-spacing', 'empty-cells', 'table-layout',

  // 列表
  'list-style', 'list-style-type', 'list-style-position',

  // 定位（有限支持）
  'position', 'top', 'right', 'bottom', 'left', 'z-index',
  'float', 'clear',
])

/**
 * 需要内联化的 CSS 属性（微信不支持外部样式表中的某些属性）
 */
const INLINE_STYLE_MAP: Record<string, string> = {
  // 间距映射
  'gap': 'margin',
  'row-gap': 'margin-bottom',
  'column-gap': 'margin-right',
}

/**
 * 将图片 URL 转换为 Base64
 */
async function imageUrlToBase64(url: string): Promise<string> {
  try {
    // 如果已经是 Base64 或 data URL，直接返回
    if (url.startsWith('data:')) {
      return url
    }

    // 处理相对路径
    const absoluteUrl = new URL(url, window.location.origin).href

    const response = await fetch(absoluteUrl)
    if (!response.ok) {
      console.warn(`Failed to fetch image: ${url}`)
      return url
    }

    const blob = await response.blob()

    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        resolve(result)
      }
      reader.onerror = () => {
        console.warn(`Failed to convert image to base64: ${url}`)
        resolve(url) // 失败时返回原始 URL
      }
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.warn(`Error converting image to base64: ${url}`, error)
    return url
  }
}

/**
 * 过滤并转换 CSS 样式，仅保留微信支持的属性
 */
function filterStyles(cssText: string): string {
  const styles = cssText.split(';').filter(Boolean)
  const filteredStyles: string[] = []

  for (const style of styles) {
    const [property, value] = style.split(':').map(s => s.trim())
    if (!property || !value) continue

    const normalizedProperty = property.toLowerCase()

    // 检查是否在白名单中
    if (WECHAT_STYLE_WHITELIST.has(normalizedProperty)) {
      filteredStyles.push(`${property}: ${value}`)
    }
    // 检查是否需要映射
    else if (INLINE_STYLE_MAP[normalizedProperty]) {
      // 简单映射处理（实际可能需要更复杂的转换）
      const mappedProperty = INLINE_STYLE_MAP[normalizedProperty]
      filteredStyles.push(`${mappedProperty}: ${value}`)
    }
  }

  return filteredStyles.join('; ')
}

/**
 * 处理元素的内联样式
 */
function processInlineStyles(element: HTMLElement): void {
  if (element.style.cssText) {
    element.style.cssText = filterStyles(element.style.cssText)
  }
}

/**
 * 将样式规则内联到元素
 */
function inlineStylesToElement(element: HTMLElement, cssRules: CSSStyleRule[]): void {
  for (const rule of cssRules) {
    try {
      if (element.matches(rule.selectorText)) {
        const filteredStyle = filterStyles(rule.style.cssText)
        if (filteredStyle) {
          // 合并现有样式和新样式
          const existingStyle = element.getAttribute('style') || ''
          element.setAttribute('style', existingStyle + ';' + filteredStyle)
        }
      }
    } catch {
      // 忽略无效选择器
    }
  }
}

/**
 * 递归处理 DOM 树
 */
async function processElement(
  element: HTMLElement,
  cssRules: CSSStyleRule[]
): Promise<void> {
  // 处理图片
  if (element.tagName === 'IMG') {
    const img = element as HTMLImageElement
    if (img.src && !img.src.startsWith('data:')) {
      img.src = await imageUrlToBase64(img.src)
    }
  }

  // 内联样式规则
  inlineStylesToElement(element, cssRules)

  // 过滤内联样式
  processInlineStyles(element)

  // 递归处理子元素
  const children = Array.from(element.children) as HTMLElement[]
  await Promise.all(children.map(child => processElement(child, cssRules)))
}

/**
 * 从文档中提取所有 CSS 规则
 */
function extractCssRules(): CSSStyleRule[] {
  const rules: CSSStyleRule[] = []

  for (const stylesheet of document.styleSheets) {
    try {
      const cssRules = stylesheet.cssRules || stylesheet.rules
      for (const rule of cssRules) {
        if (rule instanceof CSSStyleRule) {
          rules.push(rule)
        }
      }
    } catch {
      // 跨域样式表可能无法访问
    }
  }

  return rules
}

/**
 * 为微信准备 HTML 内容
 * @param html 原始 HTML 字符串
 * @returns 处理后的 HTML，图片已转 Base64，样式已内联化
 */
export async function prepareForWeChat(html: string): Promise<string> {
  // 创建临时容器
  const container = document.createElement('div')
  container.innerHTML = html
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  document.body.appendChild(container)

  try {
    // 提取当前页面的 CSS 规则
    const cssRules = extractCssRules()

    // 处理所有元素
    await processElement(container, cssRules)

    // 移除不支持的自定义元素和属性
    const allElements = container.querySelectorAll('*')
    allElements.forEach(el => {
      // 移除 class 属性（微信会忽略）
      el.removeAttribute('class')

      // 移除 data-* 属性
      Array.from(el.attributes)
        .filter(attr => attr.name.startsWith('data-'))
        .forEach(attr => el.removeAttribute(attr.name))
    })

    return container.innerHTML
  } finally {
    document.body.removeChild(container)
  }
}

/**
 * 将处理后的 HTML 复制到剪贴板
 * @param html HTML 内容
 */
export async function copyHtmlToClipboard(html: string): Promise<boolean> {
  try {
    // 准备微信兼容的 HTML
    const wechatHtml = await prepareForWeChat(html)

    // 创建 Blob 对象
    const htmlBlob = new Blob([wechatHtml], { type: 'text/html' })
    const textBlob = new Blob([wechatHtml.replace(/<[^>]*>/g, '')], { type: 'text/plain' })

    // 使用现代 Clipboard API
    const clipboardItem = new ClipboardItem({
      'text/html': htmlBlob,
      'text/plain': textBlob,
    })

    await navigator.clipboard.write([clipboardItem])
    return true
  } catch (error) {
    console.error('Clipboard write failed:', error)

    // 降级方案：使用 execCommand
    try {
      const container = document.createElement('div')
      container.innerHTML = await prepareForWeChat(html)
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      document.body.appendChild(container)

      const range = document.createRange()
      range.selectNodeContents(container)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('copy')
        selection.removeAllRanges()
      }

      document.body.removeChild(container)
      return true
    } catch (fallbackError) {
      console.error('Fallback copy also failed:', fallbackError)
      return false
    }
  }
}
