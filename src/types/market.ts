/**
 * Shared TypeScript interfaces for market data.
 *
 * These are deliberately decoupled from the CoinGecko API shape — they
 * represent what *our application* needs. The CoinGecko adapter maps raw
 * responses into these types, so swapping providers only requires a new adapter.
 */

/** A single asset as shown in the ticker table. */
export interface Asset {
  id: string
  name: string
  symbol: string
  /** Current price in USD */
  currentPrice: number
  /** Price change percentage over the last 24 hours */
  priceChangePercent24h: number
  /** Total market capitalisation in USD */
  marketCap: number
  /** 24-hour trading volume in USD */
  volume24h: number
  /** URL to the asset's logo */
  imageUrl: string
  /** Last 7 days of closing prices — used for sparklines */
  sparkline: number[]
  /** Market cap rank */
  rank: number
}

/** A single [timestamp, price] data point for the price chart. */
export type PricePoint = [timestamp: number, price: number]

/** Price history returned for a specific asset and time range. */
export interface AssetHistory {
  id: string
  range: TimeRange
  prices: PricePoint[]
}

/** The selectable time ranges for the detail chart. */
export type TimeRange = '1' | '7' | '30'

/** Human-readable labels for each time range. */
export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  '1': '24H',
  '7': '7D',
  '30': '30D',
}

/** Columns that the ticker table can be sorted by. */
export type SortKey = 'rank' | 'name' | 'currentPrice' | 'priceChangePercent24h' | 'marketCap'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  key: SortKey
  direction: SortDirection
}
