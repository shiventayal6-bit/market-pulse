/** Renders a percentage change value in green (positive) or red (negative). */

import { formatPercent } from '@/lib/formatters'

interface PriceChangeProps {
  value: number
  className?: string
}

export function PriceChange({ value, className = '' }: PriceChangeProps) {
  const isPositive = value >= 0

  return (
    <span
      className={`font-medium tabular-nums ${
        isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
      } ${className}`}
    >
      {formatPercent(value)}
    </span>
  )
}
