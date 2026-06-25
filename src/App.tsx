/**
 * App — sets up React Query client and client-side routing.
 *
 * React Query config:
 * - refetchOnWindowFocus: false — avoid hammering CoinGecko when the user tabs back.
 * - Individual hooks set their own staleTime (see useMarkets, useAssetHistory).
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MarketsPage } from './pages/MarketsPage'
import { AssetDetailPage } from './pages/AssetDetailPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic refetch on focus — CoinGecko rate limits are tight
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MarketsPage />} />
            <Route path="/asset/:id" element={<AssetDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
