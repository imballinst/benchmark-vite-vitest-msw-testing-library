import { useState } from 'react'
import { Card, Button } from 'antd'
import { PokemonDetailModal } from './PokemonDetailModal'
import type { PokemonListItem } from '@/types/pokemon'

interface PokemonCardProps {
  pokemon: PokemonListItem
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Extract ID from URL
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop()

  return (
    <>
      <Card
        title={<span style={{ textTransform: 'capitalize' }}>{pokemon.name}</span>}
        actions={[
          <Button key="view" type="primary" onClick={() => setIsModalOpen(true)}>
            View
          </Button>
        ]}
      >
        <p style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>ID: {pokemonId}</p>
      </Card>
      
      <PokemonDetailModal
        pokemonId={pokemonId || ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
