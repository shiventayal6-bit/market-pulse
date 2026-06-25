/**
 * Unit tests for the Zustand watchlist store.
 *
 * We reset the store between tests using the store's internal setState
 * so tests don't bleed into each other.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock localStorage before importing the store (persist middleware reads it)
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: () => { store = {} },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

// Import AFTER mocking localStorage
const { useWatchlistStore } = await import('@/store/watchlistStore')

describe('watchlistStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useWatchlistStore.setState({ watchlist: new Set() })
    localStorageMock.clear()
  })

  it('starts with an empty watchlist', () => {
    expect(useWatchlistStore.getState().watchlist.size).toBe(0)
  })

  it('adds an asset to the watchlist', () => {
    useWatchlistStore.getState().addToWatchlist('bitcoin')
    expect(useWatchlistStore.getState().watchlist.has('bitcoin')).toBe(true)
  })

  it('removes an asset from the watchlist', () => {
    useWatchlistStore.getState().addToWatchlist('bitcoin')
    useWatchlistStore.getState().removeFromWatchlist('bitcoin')
    expect(useWatchlistStore.getState().watchlist.has('bitcoin')).toBe(false)
  })

  it('toggles: adds if not present', () => {
    useWatchlistStore.getState().toggleWatchlist('ethereum')
    expect(useWatchlistStore.getState().isInWatchlist('ethereum')).toBe(true)
  })

  it('toggles: removes if already present', () => {
    useWatchlistStore.getState().addToWatchlist('ethereum')
    useWatchlistStore.getState().toggleWatchlist('ethereum')
    expect(useWatchlistStore.getState().isInWatchlist('ethereum')).toBe(false)
  })

  it('supports multiple items', () => {
    useWatchlistStore.getState().addToWatchlist('bitcoin')
    useWatchlistStore.getState().addToWatchlist('ethereum')
    useWatchlistStore.getState().addToWatchlist('solana')
    expect(useWatchlistStore.getState().watchlist.size).toBe(3)
  })
})
