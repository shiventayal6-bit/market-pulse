/**
 * Watchlist store — persists starred asset IDs to localStorage.
 *
 * Zustand is chosen over Redux/Context because:
 * 1. The watchlist is a small, isolated slice of state.
 * 2. No boilerplate (no actions, reducers, selectors pattern needed).
 * 3. The `persist` middleware handles localStorage serialisation automatically.
 *
 * The store only holds asset IDs (strings), not full Asset objects —
 * this avoids stale price data in persisted state.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WatchlistState {
  /** Set of asset IDs currently starred */
  watchlist: Set<string>
  /** Add an asset to the watchlist */
  addToWatchlist: (id: string) => void
  /** Remove an asset from the watchlist */
  removeFromWatchlist: (id: string) => void
  /** Toggle starred state */
  toggleWatchlist: (id: string) => void
  /** Check if an asset is in the watchlist */
  isInWatchlist: (id: string) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: new Set<string>(),

      addToWatchlist: (id) =>
        set((state) => ({ watchlist: new Set([...state.watchlist, id]) })),

      removeFromWatchlist: (id) =>
        set((state) => {
          const next = new Set(state.watchlist)
          next.delete(id)
          return { watchlist: next }
        }),

      toggleWatchlist: (id) => {
        const { isInWatchlist, addToWatchlist, removeFromWatchlist } = get()
        isInWatchlist(id) ? removeFromWatchlist(id) : addToWatchlist(id)
      },

      isInWatchlist: (id) => get().watchlist.has(id),
    }),
    {
      name: 'market-pulse-watchlist',
      // Zustand persist cannot natively serialise Set, so we convert to array
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name)
          if (!raw) return null
          const parsed = JSON.parse(raw) as { state: { watchlist: string[] } }
          return {
            state: {
              watchlist: new Set(parsed.state.watchlist),
            },
          }
        },
        setItem: (name, value) => {
          const serialisable = {
            state: {
              watchlist: [...value.state.watchlist],
            },
          }
          localStorage.setItem(name, JSON.stringify(serialisable))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
