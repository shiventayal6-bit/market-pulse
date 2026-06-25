/**
 * CoinGecko implementation of the MarketDataProvider interface.
 *
 * All mapping from CoinGecko types → domain types lives here.
 * If we swap providers, only this file changes.
 */

import type { MarketDataProvider } from '../MarketDataProvider'
import type { Asset, AssetHistory, TimeRange } from '@/types'
import { coinGeckoFetch } from './client'
import type { CoinGeckoMarketItem, CoinGeckoMarketChart } from './types'

export class CoinGeckoProvider implements MarketDataProvider {
  async fetchTopAssets(perPage: number): Promise<Asset[]> {
    const items = await coinGeckoFetch<CoinGeckoMarketItem[]>('/coins/markets', {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: String(perPage),
      page: '1',
      sparkline: 'true', // request 7-day sparkline data in the same call
      price_change_percentage: '24h',
    })

    return items.map(mapMarketItem)
  }

  async fetchAssetHistory(id: string, range: TimeRange): Promise<AssetHistory> {
    const data = await coinGeckoFetch<CoinGeckoMarketChart>(`/coins/${id}/market_chart`, {
      vs_currency: 'usd',
      days: range,
      // interval auto-selects the right granularity (hourly for ≤90 days)
    })

    return {
      id,
      range,
      prices: data.prices,
    }
  }
}

/** Map a single CoinGecko market item to our domain Asset type. */
function mapMarketItem(item: CoinGeckoMarketItem): Asset {
  return {
    id: item.id,
    name: item.name,
    symbol: item.symbol.toUpperCase(),
    currentPrice: item.current_price,
    priceChangePercent24h: item.price_change_percentage_24h ?? 0,
    marketCap: item.market_cap,
    volume24h: item.total_volume,
    imageUrl: item.image,
    // Sparkline may be null if the asset has insufficient history
    sparkline: item.sparkline_in_7d?.price ?? [],
    rank: item.market_cap_rank,
  }
}

/** Singleton instance — imported by hooks */
export const coinGeckoProvider = new CoinGeckoProvider()
