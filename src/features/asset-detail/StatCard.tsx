/** A single key-stat card shown on the asset detail page. */

interface StatCardProps {
  label: string
  value: string
  children?: React.ReactNode
}

export function StatCard({ label, value, children }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">{value}</p>
      {children}
    </div>
  )
}
