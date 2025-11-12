import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import type { PokemonDetail } from '@/types/pokemon'

interface PokemonDetailModalProps {
  pokemonId: string
  isOpen: boolean
  onClose: () => void
}

export function PokemonDetailModal({ pokemonId, isOpen, onClose }: PokemonDetailModalProps) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !pokemonId) {
      setPokemon(null)
      setError(null)
      return
    }

    const fetchPokemonDetail = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon details')
        }
        
        const data: PokemonDetail = await response.json()
        setPokemon(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetail()
  }, [pokemonId, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            {pokemon?.name || 'Loading...'}
          </DialogTitle>
          <DialogDescription>Pokemon Details</DialogDescription>
        </DialogHeader>
        
        {loading && <div className="py-4 text-center">Loading...</div>}
        
        {error && (
          <div className="py-4 text-center text-red-500">Error: {error}</div>
        )}
        
        {pokemon && !loading && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">ID:</span>
                <span>{pokemon.id}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold">Height:</span>
                <span>{pokemon.height}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-semibold">Weight:</span>
                <span>{pokemon.weight}</span>
              </div>
              
              <div>
                <span className="font-semibold">Types:</span>
                <div className="flex gap-2 mt-1">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.slot}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-semibold">Abilities:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {pokemon.abilities.map((ability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
