/**
 * Unit tests for the filterAssets function.
 * The function is a pure filter — no React needed.
 */

import { describe, it, expect } from 'vitest'
import { filterAssets } from '@/features/ticker-table/filterAssets'
import type { Asset } from '@/types'

// Minimal asset stubs — only the fields filterAssets uses
function makeAsset(id: string, name: string, symbol: string): Asset {
  return {
    id,
    name,
    symbol,
    currentPrice: 100,
    priceChangePercent24h: 1,
    marketCap: 1_000_000,
    volume24h: 50_000,
    imageUrl: '',
    sparkline: [],
    rank: 1,
  }
}

const assets: Asset[] = [
  makeAsset('bitcoin', 'Bitcoin', 'BTC'),
  makeAsset('ethereum', 'Ethereum', 'ETH'),
  makeAsset('solana', 'Solana', 'SOL'),
  makeAsset('dogecoin', 'Dogecoin', 'DOGE'),
]

describe('filterAssets', () => {
  it('returns all assets for an empty query', () => {
    expect(filterAssets(assets, '')).toHaveLength(4)
  })

  it('returns all assets for a whitespace-only query', () => {
    expect(filterAssets(assets, '   ')).toHaveLength(4)
  })

  it('filters by name (case-insensitive)', () => {
    const result = filterAssets(assets, 'bit')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('bitcoin')
  })

  it('filters by symbol (case-insensitive)', () => {
    const result = filterAssets(assets, 'eth')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('ethereum')
  })

  it('returns empty array when no match', () => {
    expect(filterAssets(assets, 'xyz')).toHaveLength(0)
  })

  it('handles uppercase query', () => {
    const result = filterAssets(assets, 'SOL')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('solana')
  })
})
