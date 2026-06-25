/**
 * Pure filter function — extracted so it can be unit-tested without React.
 * Matches assets whose name OR symbol contains the query (case-insensitive).
 */

import type { Asset } from '@/types'

export function filterAssets(assets: Asset[], query: string): Asset[] {
  const q = query.trim().toLowerCase()
  if (q === '') return assets
  return assets.filter(
    (a) => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q)
  )
}
