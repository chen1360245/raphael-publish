import React from 'react'
import { themes, Theme } from '@/lib/themes'

interface ThemeSelectorProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const categories = [
    { key: 'classic', label: '经典' },
    { key: 'trendy', label: '潮流' },
    { key: 'more', label: '更多' },
  ] as const

  return (
    <div className="relative">
      <select
        value={currentTheme.id}
        onChange={(e) => {
          const theme = themes.find(t => t.id === e.target.value)
          if (theme) onThemeChange(theme)
        }}
        className="appearance-none px-4 py-2 pr-8 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {categories.map(category => (
          <optgroup key={category.key} label={category.label}>
            {themes
              .filter(t => t.category === category.key)
              .map(theme => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default ThemeSelector
