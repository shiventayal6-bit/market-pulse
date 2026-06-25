/**
 * Pinned watchlist section shown above the main ticker table.
 * Only rendered when at least one asset is starred.
 * Uses the live market data (already fetched) — no extra API calls.
 */

import type { Asset } from '@/types'
import { useWatchlistStore } from '@/store/watchlistStore'
import { TickerRow } from '@/features/ticker-table/TickerRow'

interface WatchlistSectionProps {
  assets: Asset[] // the full market list, used to look up watchlisted assets
}

export function WatchlistSection({ assets }: WatchlistSectionProps) {
  const { watchlist } = useWatchlistStore()

  if (watchlist.size === 0) return null

  const watchedAssets = assets.filter((a) => watchlist.has(a.id))
  if (watchedAssets.length === 0) return null

  return (
    <section aria-label="Watchlist" className="mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-yellow-600 dark:text-yellow-400 px-3 pb-2 flex items-center gap-2">
        <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Watchlist
      </h2>
      <div className="rounded-xl border border-yellow-200 dark:border-yellow-900/50 bg-yellow-50/50 dark:bg-yellow-950/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left" aria-label="Watchlist table">
            <tbody>
              {watchedAssets.map((asset) => (
                <TickerRow key={asset.id} asset={asset} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
