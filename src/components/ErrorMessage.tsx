/**
 * Typed error display component.
 * Handles the RateLimitError case specially so users get actionable advice.
 */

import { RateLimitError } from '@/lib/coingecko/client'

interface ErrorMessageProps {
  error: Error
  onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const isRateLimit = error instanceof RateLimitError

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8
                 dark:border-red-900 dark:bg-red-950/30 text-center"
    >
      <span className="text-3xl" aria-hidden="true">
        {isRateLimit ? '⏱️' : '⚠️'}
      </span>

      <div>
        <p className="font-semibold text-red-700 dark:text-red-400">
          {isRateLimit ? 'Rate limit reached' : 'Something went wrong'}
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error.message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white
                     hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
                     dark:bg-red-700 dark:hover:bg-red-600"
        >
          Try again
        </button>
      )}
    </div>
  )
}
