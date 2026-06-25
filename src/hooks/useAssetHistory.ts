/**
 * Hook that fetches price history for a single asset.
 *
 * The query key includes both id and range so React Query automatically
 * refetches when the user changes the time range selector.
 */

import { useQuery } from '@tanstack/react-query'
import { coinGeckoProvider } from '@/lib/coingecko/adapter'
import type { AssetHistory, TimeRange } from '@/types'

export function useAssetHistory(id: string, range: TimeRange) {
  return useQuery<AssetHistory, Error>({
    queryKey: ['assetHistory', id, range] as const,
    queryFn: () => coinGeckoProvider.fetchAssetHistory(id, range),
    staleTime: 60_000,
    enabled: id.length > 0, // don't fetch if id is empty
    retry: (failureCount, error) => {
      if (error.name === 'RateLimitError') return false
      return failureCount < 2
    },
  })
}
