/**
 * Asset detail page — shows price chart + key stats for a single asset.
 * The asset ID comes from the URL parameter (:id).
 *
 * We also need the asset's metadata (name, symbol, logo) — rather than adding
 * another API call, we read it from the already-cached markets query via
 * React Query's queryClient.getQueryData. This is a deliberate optimisation:
 * the markets data is always fetched first, so the detail page is instant.
 */

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useAssetHistory } from '@/hooks/useAssetHistory'
import { PriceChart } from '@/features/asset-detail/PriceChart'
import { RangeSelector } from '@/features/asset-detail/RangeSelector'
import { StatCard } from '@/features/asset-detail/StatCard'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Skeleton } from '@/components/Skeleton'
import { StarButton } from '@/components/StarButton'
import { PriceChange } from '@/components/PriceChange'
import { useWatchlistStore } from '@/store/watchlistStore'
import { formatPrice, formatMarketCap, formatPercent } from '@/lib/formatters'
import type { Asset, TimeRange } from '@/types'

export function AssetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [range, setRange] = useState<TimeRange>('7')
  const { isInWatchlist, toggleWatchlist } = useWatchlistStore()

  // Read the asset metadata from the already-cached markets list
  const queryClient = useQueryClient()
  const markets = queryClient.getQueryData<Asset[]>(['markets'])
  const asset = markets?.find((a) => a.id === id)

  const { data: history, isLoading, error, refetch } = useAssetHistory(id ?? '', range)

  const isPositive = (asset?.priceChangePercent24h ?? 0) >= 0

  // Compute % change over the chart range from the fetched history
  const chartChangePercent = (() => {
    if (!history || history.prices.length < 2) return null
    const first = history.prices[0][1]
    const last = history.prices[history.prices.length - 1][1]
    return ((last - first) / first) * 100
  })()

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6">
      {/* Back navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
                   hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Markets
      </Link>

      {/* Asset header */}
      <div className="flex items-start gap-4 mb-8">
        {asset ? (
          <>
            <img
              src={asset.imageUrl}
              alt={`${asset.name} logo`}
              className="w-14 h-14 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {asset.name}
                </h1>
                <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">
                  {asset.symbol}
                </span>
                <StarButton
                  isStarred={isInWatchlist(asset.id)}
                  onToggle={() => toggleWatchlist(asset.id)}
                  assetName={asset.name}
                />
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
                  {formatPrice(asset.currentPrice)}
                </span>
                <PriceChange value={asset.priceChangePercent24h} className="text-base" />
              </div>
            </div>
          </>
        ) : (
          // Skeleton while asset metadata loads
          <div className="flex items-center gap-4 w-full">
            <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        )}
      </div>

      {/* Chart card */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price History</p>
            {chartChangePercent !== null && (
              <PriceChange value={chartChangePercent} className="text-sm mt-0.5" />
            )}
          </div>
          <RangeSelector selected={range} onChange={setRange} />
        </div>

        {error ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : isLoading ? (
          <Skeleton className="h-72 w-full rounded-lg" />
        ) : history ? (
          <PriceChart prices={history.prices} range={range} isPositive={isPositive} />
        ) : null}
      </div>

      {/* Key stats grid */}
      {asset && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Market Cap" value={formatMarketCap(asset.marketCap)} />
          <StatCard label="24h Volume" value={formatMarketCap(asset.volume24h)} />
          <StatCard label="Market Cap Rank" value={`#${asset.rank}`} />
          <StatCard label="24h Change" value={formatPercent(asset.priceChangePercent24h)}>
            <PriceChange value={asset.priceChangePercent24h} className="text-sm" />
          </StatCard>
        </div>
      )}
    </main>
  )
}
