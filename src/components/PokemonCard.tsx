import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="capitalize">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">ID: {pokemonId}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsModalOpen(true)}>View</Button>
        </CardFooter>
      </Card>
      
      <PokemonDetailModal
        pokemonId={pokemonId || ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
