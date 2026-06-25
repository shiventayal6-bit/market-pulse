/**
 * Pure sort function for the ticker table.
 * Returns a new sorted array — never mutates the input.
 */

import type { Asset, SortKey, SortDirection } from '@/types'

export function sortAssets(assets: Asset[], key: SortKey, direction: SortDirection): Asset[] {
  return [...assets].sort((a, b) => {
    let comparison: number

    if (key === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else {
      comparison = a[key] - b[key]
    }

    return direction === 'asc' ? comparison : -comparison
  })
}
