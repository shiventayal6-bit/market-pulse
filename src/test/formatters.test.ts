/**
 * Unit tests for the formatter utilities.
 * These are pure functions so they're trivially testable.
 */

import { describe, it, expect } from 'vitest'
import { formatPrice, formatMarketCap, formatPercent, formatTimestamp } from '@/lib/formatters'

describe('formatPrice', () => {
  it('formats large prices with 2 decimal places', () => {
    expect(formatPrice(45000.12)).toBe('$45,000.12')
  })

  it('formats sub-cent prices with 6 decimal places', () => {
    // Prices like SHIB are < $0.01 — we need more precision
    expect(formatPrice(0.00001234)).toBe('$0.000012')
  })

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })
})

describe('formatMarketCap', () => {
  it('formats trillions with T suffix', () => {
    expect(formatMarketCap(1_200_000_000_000)).toMatch(/\$1\.2T/)
  })

  it('formats billions with B suffix', () => {
    expect(formatMarketCap(500_000_000)).toMatch(/\$500M/)
  })
})

describe('formatPercent', () => {
  it('shows + sign for positive values', () => {
    expect(formatPercent(3.5)).toBe('+3.50%')
  })

  it('shows - sign for negative values', () => {
    expect(formatPercent(-1.23)).toBe('-1.23%')
  })

  it('shows + sign for zero', () => {
    expect(formatPercent(0)).toBe('+0.00%')
  })
})

describe('formatTimestamp', () => {
  it('returns time-only format for 1-day range', () => {
    // Pick a known UTC epoch to avoid timezone flakiness
    const ts = new Date('2024-01-15T14:30:00Z').getTime()
    const result = formatTimestamp(ts, '1')
    // Should include hours and minutes — exact format is locale-dependent
    expect(result).toMatch(/\d{1,2}:\d{2}/)
  })

  it('returns date format for multi-day range', () => {
    const ts = new Date('2024-01-15T12:00:00Z').getTime()
    const result = formatTimestamp(ts, '7')
    // Should include a month abbreviation and day number
    expect(result).toMatch(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/)
  })
})
