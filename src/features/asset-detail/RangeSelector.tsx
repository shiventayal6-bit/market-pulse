/** Time range pill buttons for the price chart. */

import type { TimeRange } from '@/types'
import { TIME_RANGE_LABELS } from '@/types'

interface RangeSelectorProps {
  selected: TimeRange
  onChange: (range: TimeRange) => void
}

const RANGES: TimeRange[] = ['1', '7', '30']

export function RangeSelector({ selected, onChange }: RangeSelectorProps) {
  return (
    <div className="flex gap-1" role="group" aria-label="Select time range">
      {RANGES.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          aria-pressed={selected === range}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            selected === range
              ? 'bg-blue-600 text-white dark:bg-blue-500'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {TIME_RANGE_LABELS[range]}
        </button>
      ))}
    </div>
  )
}
