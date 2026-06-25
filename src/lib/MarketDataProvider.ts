/**
 * MarketDataProvider — the core abstraction of the data layer.
 *
 * WHY THIS EXISTS:
 * The app currently uses CoinGecko (free, keyless). In a real fintech context
 * you'd swap to Bloomberg, Polygon.io, or an internal pricing service. By
 * defining a TypeScript interface here, every consumer (hooks, tests) depends
 * on the *shape*, not the implementation. Swapping providers means writing a
 * new class that satisfies this interface — zero changes to components or hooks.
 *
 * This is the Dependency Inversion Principle (SOLID) applied at the data layer.
 */

import type { Asset, AssetHistory, TimeRange } from '@/types'

export interface MarketDataProvider {
  /**
   * Fetch the top N assets by market cap.
   * @param perPage Number of assets to return (max 250 for CoinGecko free tier)
   */
  fetchTopAssets(perPage: number): Promise<Asset[]>

  /**
   * Fetch OHLC price history for a single asset.
   * @param id       Provider-specific asset identifier
   * @param range    Days of history: '1' | '7' | '30'
   */
  fetchAssetHistory(id: string, range: TimeRange): Promise<AssetHistory>
}
