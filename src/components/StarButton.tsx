/** Accessible star/unstar toggle button for the watchlist. */

interface StarButtonProps {
  isStarred: boolean
  onToggle: () => void
  assetName: string
}

export function StarButton({ isStarred, onToggle, assetName }: StarButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault() // prevent row navigation if inside a link
        e.stopPropagation()
        onToggle()
      }}
      aria-label={isStarred ? `Remove ${assetName} from watchlist` : `Add ${assetName} to watchlist`}
      aria-pressed={isStarred}
      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <svg
        className={`w-4 h-4 transition-colors ${
          isStarred
            ? 'fill-yellow-400 stroke-yellow-400'
            : 'fill-none stroke-gray-400 dark:stroke-gray-600 hover:stroke-yellow-400'
        }`}
        viewBox="0 0 24 24"
        strokeWidth={2}
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  )
}
