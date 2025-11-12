import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PokemonList } from '@/components/PokemonList'

describe('PokemonList', () => {
  it('renders loading state initially', () => {
    render(<PokemonList />)
    expect(screen.getByText('Loading Pokemon...')).toBeInTheDocument()
  })

  it('renders Pokemon list after loading', async () => {
    render(<PokemonList />)
    
    // Wait for the Pokemon list to appear
    await waitFor(() => {
      expect(screen.getByText('Pokemon List')).toBeInTheDocument()
    })
    
    // Check that Pokemon cards are rendered
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('venusaur')).toBeInTheDocument()
  })

  it('displays View buttons for each Pokemon', async () => {
    render(<PokemonList />)
    
    await waitFor(() => {
      expect(screen.getByText('Pokemon List')).toBeInTheDocument()
    })
    
    const viewButtons = screen.getAllByText('View')
    expect(viewButtons).toHaveLength(3)
  })

  it('opens modal with Pokemon details when View button is clicked', async () => {
    const user = userEvent.setup()
    render(<PokemonList />)
    
    // Wait for the list to load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
    
    // Click the first View button (for bulbasaur)
    const viewButtons = screen.getAllByText('View')
    await user.click(viewButtons[0])
    
    // Wait for modal to open and details to load
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Check that Pokemon details are displayed
    await waitFor(() => {
      expect(screen.getByText('Pokemon Details')).toBeInTheDocument()
      // Check for bulbasaur-specific details
      expect(screen.getByText('7')).toBeInTheDocument() // height
      expect(screen.getByText('69')).toBeInTheDocument() // weight
    })
    
    // Check for types
    expect(screen.getByText('grass')).toBeInTheDocument()
    expect(screen.getByText('poison')).toBeInTheDocument()
    
    // Check for abilities
    expect(screen.getByText('overgrow')).toBeInTheDocument()
    expect(screen.getByText('chlorophyll')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<PokemonList />)
    
    // Wait for the list to load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
    
    // Open modal
    const viewButtons = screen.getAllByText('View')
    await user.click(viewButtons[0])
    
    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)
    
    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('can open different Pokemon details', async () => {
    const user = userEvent.setup()
    render(<PokemonList />)
    
    // Wait for the list to load
    await waitFor(() => {
      expect(screen.getByText('ivysaur')).toBeInTheDocument()
    })
    
    // Click the second View button (for ivysaur)
    const viewButtons = screen.getAllByText('View')
    await user.click(viewButtons[1])
    
    // Wait for modal to open and details to load
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
    
    // Check that ivysaur details are displayed
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument() // height
      expect(screen.getByText('130')).toBeInTheDocument() // weight
    })
  })
})
