/**
 * Full-size price chart for the asset detail page.
 * Uses Recharts AreaChart with a gradient fill for a professional look.
 */

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import type { Payload } from 'recharts/types/component/DefaultTooltipContent'
import type { PricePoint, TimeRange } from '@/types'
import { formatPrice, formatTimestamp } from '@/lib/formatters'

interface PriceChartProps {
  prices: PricePoint[]
  range: TimeRange
  isPositive: boolean
}

/**
 * Custom tooltip typed precisely to match what Recharts passes at runtime.
 * We use Recharts' own Payload type and mark every field as T | undefined to
 * satisfy exactOptionalPropertyTypes in strict mode.
 */
interface TooltipArgs {
  active?: boolean | undefined
  payload?: ReadonlyArray<Payload<number, string>> | undefined
  label?: number | undefined
}

function ChartTooltip({ active, payload, label, range }: TooltipArgs & { range: TimeRange }) {
  if (!active || !payload || payload.length === 0 || label === undefined) return null

  const value = payload[0]?.value
  if (value === undefined) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(label, range)}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(value)}</p>
    </div>
  )
}

export function PriceChart({ prices, range, isPositive }: PriceChartProps) {
  // Recharts needs plain objects — map [timestamp, price] tuples
  const data = prices.map(([ts, price]) => ({ ts, price }))

  const strokeColor = isPositive ? '#10b981' : '#ef4444'
  const gradientId = `gradient-${isPositive ? 'positive' : 'negative'}`

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 8 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />

          <XAxis
            dataKey="ts"
            tickFormatter={(ts: number) => formatTimestamp(ts, range)}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />

          <YAxis
            tickFormatter={(v: number) => formatPrice(v)}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            width={90}
            domain={['auto', 'auto']}
          />

          {/*
           * Cast through unknown: Recharts' content prop type is complex and
           * incompatible with exactOptionalPropertyTypes. At runtime, Recharts
           * passes exactly the fields in TooltipArgs — every field is guarded
           * inside ChartTooltip before use.
           */}
          <Tooltip
            content={(props: unknown) => {
              const p = props as TooltipArgs
              return <ChartTooltip {...p} range={range} />
            }}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
