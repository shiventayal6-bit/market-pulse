/**
 * CoinGecko REST client — handles HTTP, error parsing, and rate-limit detection.
 *
 * Rate limiting: CoinGecko's free tier allows ~30 requests/minute. We rely on
 * React Query's staleTime to avoid redundant requests. If we do hit the limit,
 * the API returns HTTP 429, which we surface as a typed RateLimitError so the
 * UI can show a friendly message rather than a generic crash.
 */

const BASE_URL = 'https://api.coingecko.com/api/v3'

/** Thrown when CoinGecko returns HTTP 429 Too Many Requests */
export class RateLimitError extends Error {
  constructor() {
    super('Rate limit exceeded — please wait a moment and try again.')
    this.name = 'RateLimitError'
  }
}

/** Thrown for any non-OK, non-429 HTTP response */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Typed fetch wrapper. Throws RateLimitError or ApiError on failure.
 * Returns the parsed JSON body on success.
 */
export async function coinGeckoFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)

  // Append query params using URLSearchParams for safe encoding
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))

  const response = await fetch(url.toString())

  if (response.status === 429) {
    throw new RateLimitError()
  }

  if (!response.ok) {
    throw new ApiError(response.status, `CoinGecko API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
