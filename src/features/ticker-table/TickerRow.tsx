/**
 * A single row in the ticker table.
 * Clicking the row navigates to the asset's detail page.
 */

import { Link } from 'react-router-dom'
import type { Asset } from '@/types'
import { formatPrice, formatMarketCap } from '@/lib/formatters'
import { PriceChange } from '@/components/PriceChange'
import { Sparkline } from '@/components/Sparkline'
import { StarButton } from '@/components/StarButton'
import { useWatchlistStore } from '@/store/watchlistStore'

interface TickerRowProps {
  asset: Asset
}

export function TickerRow({ asset }: TickerRowProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlistStore()
  const starred = isInWatchlist(asset.id)
  const isPositive = asset.priceChangePercent24h >= 0

  return (
    <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* Rank */}
      <td className="py-3 px-3 text-sm text-gray-500 dark:text-gray-400 w-10 text-right">
        {asset.rank}
      </td>

      {/* Star */}
      <td className="py-3 px-2 w-8">
        <StarButton
          isStarred={starred}
          onToggle={() => toggleWatchlist(asset.id)}
          assetName={asset.name}
        />
      </td>

      {/* Name + symbol */}
      <td className="py-3 px-3">
        <Link
          to={`/asset/${asset.id}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src={asset.imageUrl}
            alt={`${asset.name} logo`}
            className="w-8 h-8 rounded-full flex-shrink-0"
            loading="lazy"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
              {asset.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{asset.symbol}</p>
          </div>
        </Link>
      </td>

      {/* Price */}
      <td className="py-3 px-3 text-right text-sm font-mono font-medium text-gray-900 dark:text-white tabular-nums">
        {formatPrice(asset.currentPrice)}
      </td>

      {/* 24h change */}
      <td className="py-3 px-3 text-right text-sm">
        <PriceChange value={asset.priceChangePercent24h} />
      </td>

      {/* Market cap — hidden on small screens */}
      <td className="py-3 px-3 text-right text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell tabular-nums">
        {formatMarketCap(asset.marketCap)}
      </td>

      {/* Sparkline — hidden on medium and smaller */}
      <td className="py-3 px-3 hidden lg:table-cell">
        <div className="flex justify-end">
          <Sparkline data={asset.sparkline} positive={isPositive} />
        </div>
      </td>
    </tr>
  )
}
