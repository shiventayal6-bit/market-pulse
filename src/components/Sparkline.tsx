/**
 * Miniature line chart used in the ticker table.
 * Uses Recharts ResponsiveContainer so it fills its parent cell width.
 */

import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface SparklineProps {
  data: number[]
  /** Whether the overall trend is positive (determines line colour) */
  positive: boolean
}

export function Sparkline({ data, positive }: SparklineProps) {
  if (data.length === 0) {
    return <div className="h-8 w-24 text-xs text-gray-400 flex items-center">No data</div>
  }

  // Recharts needs an array of objects, not raw numbers
  const chartData = data.map((price, i) => ({ i, price }))

  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={positive ? '#10b981' : '#ef4444'} // emerald-500 / red-500
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false} // disable animation in table for performance
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
