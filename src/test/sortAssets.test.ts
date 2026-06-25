/**
 * Unit tests for the sortAssets function.
 */

import { describe, it, expect } from 'vitest'
import { sortAssets } from '@/features/ticker-table/sortAssets'
import type { Asset } from '@/types'

function makeAsset(id: string, overrides: Partial<Asset> = {}): Asset {
  return {
    id,
    name: id,
    symbol: id.toUpperCase(),
    currentPrice: 100,
    priceChangePercent24h: 0,
    marketCap: 1_000_000,
    volume24h: 50_000,
    imageUrl: '',
    sparkline: [],
    rank: 1,
    ...overrides,
  }
}

const assets: Asset[] = [
  makeAsset('b', { currentPrice: 200, rank: 2, priceChangePercent24h: -5 }),
  makeAsset('a', { currentPrice: 50, rank: 1, priceChangePercent24h: 10 }),
  makeAsset('c', { currentPrice: 300, rank: 3, priceChangePercent24h: 2 }),
]

describe('sortAssets', () => {
  it('sorts by price ascending', () => {
    const result = sortAssets(assets, 'currentPrice', 'asc')
    expect(result.map((a) => a.id)).toEqual(['a', 'b', 'c'])
  })

  it('sorts by price descending', () => {
    const result = sortAssets(assets, 'currentPrice', 'desc')
    expect(result.map((a) => a.id)).toEqual(['c', 'b', 'a'])
  })

  it('sorts by name ascending (alphabetical)', () => {
    const result = sortAssets(assets, 'name', 'asc')
    expect(result.map((a) => a.id)).toEqual(['a', 'b', 'c'])
  })

  it('sorts by 24h change descending', () => {
    const result = sortAssets(assets, 'priceChangePercent24h', 'desc')
    expect(result[0].id).toBe('a') // 10% is highest
    expect(result[2].id).toBe('b') // -5% is lowest
  })

  it('does not mutate the original array', () => {
    const original = [...assets]
    sortAssets(assets, 'rank', 'desc')
    expect(assets).toEqual(original)
  })
})
