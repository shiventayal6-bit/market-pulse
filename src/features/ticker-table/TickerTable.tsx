/**
 * Main ticker table: sortable columns, loading skeletons, error state.
 * Receives the filtered+sorted asset list as a prop to keep this component
 * focused on presentation; sorting/filtering logic lives in the parent page.
 */

import type { Asset, SortKey, SortState } from '@/types'
import { TickerRow } from './TickerRow'
import { RowSkeleton } from '@/components/Skeleton'
import { ErrorMessage } from '@/components/ErrorMessage'

interface TickerTableProps {
  assets: Asset[]
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  sort: SortState
  onSort: (key: SortKey) => void
}

interface HeaderCellProps {
  label: string
  sortKey: SortKey
  currentSort: SortState
  onSort: (key: SortKey) => void
  className?: string
}

function HeaderCell({ label, sortKey, currentSort, onSort, className = '' }: HeaderCellProps) {
  const isActive = currentSort.key === sortKey
  const arrow = isActive ? (currentSort.direction === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <th
      scope="col"
      className={`py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
      aria-sort={isActive ? (currentSort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      {label}
      <span aria-hidden="true">{arrow}</span>
    </th>
  )
}

export function TickerTable({ assets, isLoading, error, onRetry, sort, onSort }: TickerTableProps) {
  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} onRetry={onRetry} />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" aria-label="Market ticker table">
        <thead className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-10">
          <tr>
            <th scope="col" className="py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-right w-10">
              #
            </th>
            <th scope="col" className="w-8 py-3 px-2">
              <span className="sr-only">Watchlist</span>
            </th>
            <HeaderCell label="Asset" sortKey="name" currentSort={sort} onSort={onSort} />
            <HeaderCell label="Price" sortKey="currentPrice" currentSort={sort} onSort={onSort} className="text-right" />
            <HeaderCell label="24h %" sortKey="priceChangePercent24h" currentSort={sort} onSort={onSort} className="text-right" />
            <HeaderCell label="Market Cap" sortKey="marketCap" currentSort={sort} onSort={onSort} className="text-right hidden md:table-cell" />
            <th scope="col" className="py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-right hidden lg:table-cell">
              7D Chart
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }, (_, i) => <RowSkeleton key={i} />)
            : assets.map((asset) => <TickerRow key={asset.id} asset={asset} />)}
        </tbody>
      </table>

      {!isLoading && assets.length === 0 && (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No assets match your search.
        </div>
      )}
    </div>
  )
}
