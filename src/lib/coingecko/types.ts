/**
 * Raw CoinGecko API response shapes.
 * Kept separate from our domain types so the mapping is explicit and testable.
 */

export interface CoinGeckoMarketItem {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  sparkline_in_7d: {
    price: number[]
  } | null
}

/** CoinGecko market_chart endpoint response */
export interface CoinGeckoMarketChart {
  /** Array of [timestamp_ms, price] tuples */
  prices: [number, number][]
}
