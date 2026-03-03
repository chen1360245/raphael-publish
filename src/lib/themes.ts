export type CodeHighlightTheme = 'light' | 'dark' | 'monokai' | 'github' | 'dracula' | 'nord' | 'solarized' | 'cyberpunk' | 'high-contrast'

export interface ThemeColors {
  background: string
  text: string
  heading: string
  link: string
  code: string
  codeBackground: string
  blockquote: string
  blockquoteBorder: string
}

export interface ThemeFonts {
  body: string
  heading: string
  code: string
}

export interface Theme {
  id: string
  name: string
  category: 'classic' | 'trendy' | 'more'
  colors: ThemeColors
  fonts: ThemeFonts
  codeHighlightTheme: CodeHighlightTheme
}

// 30 套主题配置
export const themes: Theme[] = [
  // ===== 经典主题 (10套) =====
  {
    id: 'mac-white',
    name: 'Mac 纯净白',
    category: 'classic',
    codeHighlightTheme: 'light',
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
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      code: '"SF Mono", Monaco, "Inconsolata", "Fira Mono", monospace',
    },
  },
  {
    id: 'claude-oat',
    name: 'Claude 燕麦色',
    category: 'classic',
    codeHighlightTheme: 'light',
    colors: {
      background: '#f5f3ef',
      text: '#4a4a4a',
      heading: '#2d2d2d',
      link: '#8b7355',
      code: '#c7254e',
      codeBackground: '#ebe8e3',
      blockquote: '#6b6b6b',
      blockquoteBorder: '#d4c4a8',
    },
    fonts: {
      body: 'Georgia, "Times New Roman", serif',
      heading: 'Georgia, "Times New Roman", serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'wechat-native',
    name: '微信原生',
    category: 'classic',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#3e3e3e',
      heading: '#000000',
      link: '#576b95',
      code: '#c7254e',
      codeBackground: '#f7f7f7',
      blockquote: '#888888',
      blockquoteBorder: '#07c160',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif',
      code: 'Menlo, Monaco, Consolas, monospace',
    },
  },
  {
    id: 'nyt',
    name: 'NYT',
    category: 'classic',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#333333',
      heading: '#121212',
      link: '#326891',
      code: '#666666',
      codeBackground: '#f3f3f3',
      blockquote: '#666666',
      blockquoteBorder: '#e2e2e2',
    },
    fonts: {
      body: '"Times New Roman", Times, serif',
      heading: '"Times New Roman", Times, serif',
      code: 'Menlo, Monaco, monospace',
    },
  },
  {
    id: 'medium',
    name: 'Medium',
    category: 'classic',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#292929',
      heading: '#292929',
      link: '#1a8917',
      code: '#292929',
      codeBackground: '#f3f3f3',
      blockquote: '#6b6b6b',
      blockquoteBorder: '#6b6b6b',
    },
    fonts: {
      body: 'medium-content-serif-font, Georgia, "Times New Roman", serif',
      heading: 'medium-content-serif-font, Georgia, serif',
      code: 'Menlo, Monaco, monospace',
    },
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'classic',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#32325d',
      heading: '#32325d',
      link: '#6772e5',
      code: '#d63384',
      codeBackground: '#f6f9fc',
      blockquote: '#525f7f',
      blockquoteBorder: '#6772e5',
    },
    fonts: {
      body: '"Open Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      heading: '"Open Sans", sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'feishu-blue',
    name: '飞书蓝',
    category: 'classic',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#1f2329',
      heading: '#1f2329',
      link: '#3380ff',
      code: '#d63384',
      codeBackground: '#f7f8fa',
      blockquote: '#646a73',
      blockquoteBorder: '#3380ff',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'linear-dark',
    name: 'Linear 暗夜',
    category: 'classic',
    codeHighlightTheme: 'dark',
    colors: {
      background: '#0a0a0a',
      text: '#e2e8f0',
      heading: '#f8fafc',
      link: '#60a5fa',
      code: '#f472b6',
      codeBackground: '#1e293b',
      blockquote: '#94a3b8',
      blockquoteBorder: '#60a5fa',
    },
    fonts: {
      body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      heading: 'Inter, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'retro',
    name: 'Retro 复古',
    category: 'classic',
    codeHighlightTheme: 'solarized',
    colors: {
      background: '#f5e6c8',
      text: '#4a3f35',
      heading: '#2d2418',
      link: '#8b4513',
      code: '#8b4513',
      codeBackground: '#ede0c8',
      blockquote: '#6b5b4f',
      blockquoteBorder: '#8b4513',
    },
    fonts: {
      body: 'Georgia, "Times New Roman", serif',
      heading: 'Georgia, serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg 终端',
    category: 'classic',
    codeHighlightTheme: 'high-contrast',
    colors: {
      background: '#000000',
      text: '#00ff00',
      heading: '#ffff00',
      link: '#00ffff',
      code: '#ff00ff',
      codeBackground: '#1a1a1a',
      blockquote: '#808080',
      blockquoteBorder: '#00ff00',
    },
    fonts: {
      body: '"Courier New", Courier, monospace',
      heading: '"Courier New", Courier, monospace',
      code: '"Courier New", Courier, monospace',
    },
  },

  // ===== 潮流主题 (10套) =====
  {
    id: 'notion',
    name: 'Notion',
    category: 'trendy',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#37352f',
      heading: '#37352f',
      link: '#37352f',
      code: '#eb5757',
      codeBackground: 'rgba(135, 131, 120, 0.15)',
      blockquote: '#37352f',
      blockquoteBorder: '#37352f',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, sans-serif',
      code: '"SFMono-Regular", Menlo, Monaco, monospace',
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'trendy',
    codeHighlightTheme: 'github',
    colors: {
      background: '#ffffff',
      text: '#24292f',
      heading: '#24292f',
      link: '#0969da',
      code: '#cf222e',
      codeBackground: '#f6f8fa',
      blockquote: '#57606a',
      blockquoteBorder: '#d0d7de',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'sspai',
    name: '少数派',
    category: 'trendy',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#333333',
      heading: '#333333',
      link: '#d04a33',
      code: '#d04a33',
      codeBackground: '#f8f8f8',
      blockquote: '#666666',
      blockquoteBorder: '#d04a33',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif',
      code: 'Menlo, Monaco, monospace',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    category: 'trendy',
    codeHighlightTheme: 'dracula',
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      heading: '#bd93f9',
      link: '#8be9fd',
      code: '#ff79c6',
      codeBackground: '#44475a',
      blockquote: '#6272a4',
      blockquoteBorder: '#bd93f9',
    },
    fonts: {
      body: 'Inter, -apple-system, sans-serif',
      heading: 'Inter, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    category: 'trendy',
    codeHighlightTheme: 'nord',
    colors: {
      background: '#2e3440',
      text: '#d8dee9',
      heading: '#eceff4',
      link: '#88c0d0',
      code: '#a3be8c',
      codeBackground: '#3b4252',
      blockquote: '#81a1c1',
      blockquoteBorder: '#5e81ac',
    },
    fonts: {
      body: 'Inter, -apple-system, sans-serif',
      heading: 'Inter, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'sakura',
    name: '樱花',
    category: 'trendy',
    codeHighlightTheme: 'light',
    colors: {
      background: '#fef6f8',
      text: '#5c4d4d',
      heading: '#4a3f3f',
      link: '#d4828a',
      code: '#c7254e',
      codeBackground: '#fce4e8',
      blockquote: '#8b7b7b',
      blockquoteBorder: '#f4b4ba',
    },
    fonts: {
      body: '"Noto Serif SC", Georgia, serif',
      heading: '"Noto Serif SC", serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'ocean',
    name: '深海',
    category: 'trendy',
    codeHighlightTheme: 'dark',
    colors: {
      background: '#0f111a',
      text: '#c5c8e6',
      heading: '#82aaff',
      link: '#89ddff',
      code: '#c792ea',
      codeBackground: '#1a1c25',
      blockquote: '#676e95',
      blockquoteBorder: '#82aaff',
    },
    fonts: {
      body: 'Inter, -apple-system, sans-serif',
      heading: 'Inter, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'mint',
    name: '薄荷',
    category: 'trendy',
    codeHighlightTheme: 'light',
    colors: {
      background: '#f0fff4',
      text: '#276749',
      heading: '#22543d',
      link: '#38a169',
      code: '#276749',
      codeBackground: '#c6f6d5',
      blockquote: '#48bb78',
      blockquoteBorder: '#38a169',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, sans-serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'sunset',
    name: '日落',
    category: 'trendy',
    codeHighlightTheme: 'light',
    colors: {
      background: '#fff5eb',
      text: '#5a3e36',
      heading: '#3d251c',
      link: '#dd6b20',
      code: '#c53030',
      codeBackground: '#feebc8',
      blockquote: '#9c4221',
      blockquoteBorder: '#ed8936',
    },
    fonts: {
      body: 'Georgia, serif',
      heading: 'Georgia, serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    category: 'trendy',
    codeHighlightTheme: 'monokai',
    colors: {
      background: '#272822',
      text: '#f8f8f2',
      heading: '#a6e22e',
      link: '#66d9ef',
      code: '#f92672',
      codeBackground: '#3e3d32',
      blockquote: '#75715e',
      blockquoteBorder: '#a6e22e',
    },
    fonts: {
      body: 'Inter, -apple-system, sans-serif',
      heading: 'Inter, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },

  // ===== 更多风格 (10套) =====
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    category: 'more',
    codeHighlightTheme: 'solarized',
    colors: {
      background: '#fdf6e3',
      text: '#657b83',
      heading: '#073642',
      link: '#268bd2',
      code: '#d33682',
      codeBackground: '#eee8d5',
      blockquote: '#93a1a1',
      blockquoteBorder: '#cb4b16',
    },
    fonts: {
      body: '"Source Sans Pro", -apple-system, sans-serif',
      heading: '"Source Sans Pro", sans-serif',
      code: '"Source Code Pro", Monaco, monospace',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'more',
    codeHighlightTheme: 'cyberpunk',
    colors: {
      background: '#0d0d0d',
      text: '#f0e6ff',
      heading: '#ff00ff',
      link: '#00ffff',
      code: '#ffff00',
      codeBackground: '#1a1a2e',
      blockquote: '#9d4edd',
      blockquoteBorder: '#ff00ff',
    },
    fonts: {
      body: 'Orbitron, -apple-system, sans-serif',
      heading: 'Orbitron, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'ink-wash',
    name: '水墨',
    category: 'more',
    codeHighlightTheme: 'light',
    colors: {
      background: '#faf9f7',
      text: '#333333',
      heading: '#000000',
      link: '#4a4a4a',
      code: '#8b4513',
      codeBackground: '#f0ede8',
      blockquote: '#666666',
      blockquoteBorder: '#333333',
    },
    fonts: {
      body: '"Noto Serif SC", "Source Han Serif SC", serif',
      heading: '"Noto Serif SC", serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'lavender',
    name: '薰衣草',
    category: 'more',
    codeHighlightTheme: 'light',
    colors: {
      background: '#f8f6fc',
      text: '#4a4458',
      heading: '#3a3050',
      link: '#7c3aed',
      code: '#a855f7',
      codeBackground: '#ede9fe',
      blockquote: '#6b5b7a',
      blockquoteBorder: '#8b5cf6',
    },
    fonts: {
      body: 'Georgia, serif',
      heading: 'Georgia, serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'forest',
    name: '密林',
    category: 'more',
    codeHighlightTheme: 'dark',
    colors: {
      background: '#1a1f16',
      text: '#c8d5bb',
      heading: '#e8f0df',
      link: '#8bc34a',
      code: '#cddc39',
      codeBackground: '#2d3a26',
      blockquote: '#7d9a68',
      blockquoteBorder: '#4caf50',
    },
    fonts: {
      body: 'Inter, -apple-system, sans-serif',
      heading: 'Inter, sans-serif',
      code: '"Fira Code", Monaco, monospace',
    },
  },
  {
    id: 'glacier',
    name: '冰川',
    category: 'more',
    codeHighlightTheme: 'light',
    colors: {
      background: '#f0f8ff',
      text: '#2c4a6e',
      heading: '#1a365d',
      link: '#3182ce',
      code: '#2b6cb0',
      codeBackground: '#e2eefb',
      blockquote: '#4a5568',
      blockquoteBorder: '#63b3ed',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, sans-serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'coffee',
    name: '咖啡',
    category: 'more',
    codeHighlightTheme: 'solarized',
    colors: {
      background: '#f5f0e8',
      text: '#4a3c2e',
      heading: '#2d2116',
      link: '#8b5a2b',
      code: '#6f4e37',
      codeBackground: '#e8dcc8',
      blockquote: '#6b5544',
      blockquoteBorder: '#a0522d',
    },
    fonts: {
      body: 'Georgia, serif',
      heading: 'Georgia, serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    category: 'more',
    codeHighlightTheme: 'light',
    colors: {
      background: '#ffffff',
      text: '#000000',
      heading: '#000000',
      link: '#e53935',
      code: '#000000',
      codeBackground: '#f5f5f5',
      blockquote: '#424242',
      blockquoteBorder: '#e53935',
    },
    fonts: {
      body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      heading: '"Helvetica Neue", Helvetica, sans-serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'copper',
    name: '赤铜',
    category: 'more',
    codeHighlightTheme: 'dark',
    colors: {
      background: '#1c1410',
      text: '#d4a574',
      heading: '#e8c4a0',
      link: '#cd7f32',
      code: '#daa520',
      codeBackground: '#2a1f18',
      blockquote: '#8b6914',
      blockquoteBorder: '#b87333',
    },
    fonts: {
      body: 'Georgia, serif',
      heading: 'Georgia, serif',
      code: 'Monaco, monospace',
    },
  },
  {
    id: 'rainbow',
    name: '彩虹糖',
    category: 'more',
    codeHighlightTheme: 'light',
    colors: {
      background: '#fefce8',
      text: '#1f2937',
      heading: '#dc2626',
      link: '#2563eb',
      code: '#9333ea',
      codeBackground: '#fef3c7',
      blockquote: '#059669',
      blockquoteBorder: '#f59e0b',
    },
    fonts: {
      body: '-apple-system, BlinkMacSystemFont, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, sans-serif',
      code: 'Monaco, monospace',
    },
  },
]

// 获取默认主题
export function getDefaultTheme(): Theme {
  return themes[0]
}

// 根据 ID 获取主题
export function getThemeById(id: string): Theme | undefined {
  return themes.find(t => t.id === id)
}

// 应用主题到 CSS 变量
export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.style.setProperty('--color-bg', theme.colors.background)
  root.style.setProperty('--color-text', theme.colors.text)
  root.style.setProperty('--color-heading', theme.colors.heading)
  root.style.setProperty('--color-link', theme.colors.link)
  root.style.setProperty('--color-code', theme.colors.code)
  root.style.setProperty('--color-code-bg', theme.colors.codeBackground)
  root.style.setProperty('--color-blockquote', theme.colors.blockquote)
  root.style.setProperty('--color-blockquote-border', theme.colors.blockquoteBorder)
  root.style.setProperty('--font-body', theme.fonts.body)
  root.style.setProperty('--font-heading', theme.fonts.heading)
  root.style.setProperty('--font-code', theme.fonts.code)

  // 应用代码高亮主题
  root.setAttribute('data-code-theme', theme.codeHighlightTheme)
}
