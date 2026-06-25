/**
 * Skeleton loading placeholder — renders a shimmering grey block.
 * Used everywhere instead of spinners to maintain layout stability (CLS).
 */

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`
        rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
        bg-[length:200%_100%] animate-shimmer
        ${className}
      `}
      aria-hidden="true"
    />
  )
}

/** A full table-row skeleton — mimics the ticker row layout. */
export function RowSkeleton() {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="py-3 px-4"><Skeleton className="h-4 w-6" /></td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-right"><Skeleton className="h-4 w-20 ml-auto" /></td>
      <td className="py-3 px-4 text-right"><Skeleton className="h-4 w-16 ml-auto" /></td>
      <td className="py-3 px-4 text-right hidden md:table-cell"><Skeleton className="h-4 w-24 ml-auto" /></td>
      <td className="py-3 px-4 hidden lg:table-cell"><Skeleton className="h-8 w-24 ml-auto" /></td>
    </tr>
  )
}
