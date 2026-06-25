/**
 * Component render test for PriceChange.
 * Verifies correct text content and CSS colour class application.
 */

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { PriceChange } from '@/components/PriceChange'

describe('PriceChange', () => {
  it('renders positive percentage with green colour class', () => {
    const { container } = render(<PriceChange value={5.25} />)
    const el = container.firstElementChild as HTMLElement
    expect(el.textContent).toContain('+5.25%')
    expect(el.className).toContain('text-emerald')
  })

  it('renders negative percentage with red colour class', () => {
    const { container } = render(<PriceChange value={-2.1} />)
    const el = container.firstElementChild as HTMLElement
    expect(el.textContent).toContain('-2.10%')
    expect(el.className).toContain('text-red')
  })

  it('renders zero as positive (green)', () => {
    render(<PriceChange value={0} />)
    expect(screen.getByText('+0.00%')).toBeInTheDocument()
  })
})
