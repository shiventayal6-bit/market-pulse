/**
 * App shell — sticky header with logo + theme toggle, content area below.
 * Outlet renders the current route's page component.
 */

import { Outlet, Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '@/hooks/useTheme'

export function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Sticky top navigation bar */}
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo / brand */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
          >
            {/* Simple pulse icon */}
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Market Pulse
          </Link>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Page content */}
      <Outlet />
    </div>
  )
}
