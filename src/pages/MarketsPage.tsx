/**
 * Main markets page — hosts the search bar, watchlist section, and ticker table.
 * All data fetching goes through useMarkets(); this component wires together
 * filtering, sorting, and watchlist state.
 */

import { useState } from 'react'
import { useMarkets } from '@/hooks/useMarkets'
import { useDebounce } from '@/hooks/useDebounce'
import { TickerTable } from '@/features/ticker-table/TickerTable'
import { WatchlistSection } from '@/features/watchlist/WatchlistSection'
import { filterAssets } from '@/features/ticker-table/filterAssets'
import { sortAssets } from '@/features/ticker-table/sortAssets'
import type { SortKey, SortState } from '@/types'

export function MarketsPage() {
  const { data: assets = [], isLoading, error, refetch } = useMarkets()

  // Search state: the raw input value is debounced to avoid filtering on every keystroke
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 250)

  // Sort state: default to market cap rank ascending
  const [sort, setSort] = useState<SortState>({ key: 'rank', direction: 'asc' })

  /** Toggle sort direction if the same column is clicked; otherwise sort new column desc */
  function handleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: key === 'name' ? 'asc' : 'desc' }
    )
  }

  const filtered = filterAssets(assets, debouncedSearch)
  const sorted = sortAssets(filtered, sort.key, sort.direction)

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Markets</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Top 50 assets by market cap · Prices update every 60s
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or symbol…"
          aria-label="Search assets"
          className="w-full sm:max-w-xs rounded-xl border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-800 pl-9 pr-4 py-2.5 text-sm
                     text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      {/* Watchlist pinned section (only shown when starred assets exist) */}
      {!isLoading && assets.length > 0 && <WatchlistSection assets={assets} />}

      {/* Ticker table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
        <TickerTable
          assets={sorted}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          sort={sort}
          onSort={handleSort}
        />
      </div>
    </main>
  )
}
