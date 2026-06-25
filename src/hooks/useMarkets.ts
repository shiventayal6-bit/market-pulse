/**
 * Hook that fetches the top 50 assets from the market data provider.
 *
 * staleTime of 60 seconds balances freshness with CoinGecko's rate limit
 * (~30 req/min on the free tier). During stale time, the cached data is
 * returned instantly with no network request.
 */

import { useQuery } from '@tanstack/react-query'
import { coinGeckoProvider } from '@/lib/coingecko/adapter'
import type { Asset } from '@/types'

const MARKETS_QUERY_KEY = ['markets'] as const

export function useMarkets() {
  return useQuery<Asset[], Error>({
    queryKey: MARKETS_QUERY_KEY,
    queryFn: () => coinGeckoProvider.fetchTopAssets(50),
    staleTime: 60_000, // 1 minute — aggressive caching to respect rate limits
    retry: (failureCount, error) => {
      // Don't retry rate-limit errors — waiting is the right behaviour
      if (error.name === 'RateLimitError') return false
      return failureCount < 2
    },
  })
}
