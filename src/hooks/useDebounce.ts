/**
 * Debounce hook — delays updating the output value until the input has been
 * stable for `delay` milliseconds. Used by the search box to avoid firing a
 * filter on every keystroke.
 */

import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // Cleanup: if value changes before delay expires, cancel the previous timer
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
