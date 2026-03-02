import React from 'react'

interface ViewSwitcherProps {
  viewMode: 'mobile' | 'tablet' | 'desktop'
  onViewModeChange: (mode: 'mobile' | 'tablet' | 'desktop') => void
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ viewMode, onViewModeChange }) => {
  const modes = [
    { key: 'mobile' as const, label: '手机', icon: '📱' },
    { key: 'tablet' as const, label: '平板', icon: '📟' },
    { key: 'desktop' as const, label: '桌面', icon: '🖥️' },
  ]

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {modes.map(mode => (
        <button
          key={mode.key}
          type="button"
          onClick={() => onViewModeChange(mode.key)}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            viewMode === mode.key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="mr-1">{mode.icon}</span>
          {mode.label}
        </button>
      ))}
    </div>
  )
}

export default ViewSwitcher
