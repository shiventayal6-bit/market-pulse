/**
 * Display formatting helpers.
 * Pure functions — no side effects, easy to unit test.
 */

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // Adaptive fraction digits: show more precision for small prices
  maximumFractionDigits: 6,
  minimumFractionDigits: 2,
})

const compactUsdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'always', // always show + or -
})

/**
 * Format a USD price with adaptive precision.
 * Prices < $0.01 get 6 decimal places; larger prices get 2.
 */
export function formatPrice(value: number): string {
  // Zero is a valid price (e.g. during data loading); don't apply sub-cent logic to it
  if (value > 0 && value < 0.01) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    }).format(value)
  }
  return usdFormatter.format(value)
}

/**
 * Format a large USD number in compact notation (e.g. $1.23T, $456.7B).
 * Used for market cap and volume columns.
 */
export function formatMarketCap(value: number): string {
  return compactUsdFormatter.format(value)
}

/**
 * Format a percentage change with sign and 2 decimal places.
 * Input is a raw percentage (e.g. 3.5 → "+3.50%").
 */
export function formatPercent(value: number): string {
  // Intl percent formatter treats 1.0 as 100%, so divide by 100
  return percentFormatter.format(value / 100)
}

/**
 * Format a Unix millisecond timestamp as a short date/time string.
 * Used for chart tooltips.
 */
export function formatTimestamp(ms: number, range: '1' | '7' | '30'): string {
  const date = new Date(ms)

  if (range === '1') {
    // Hourly chart: show time only
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // Multi-day: show abbreviated month + day
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
