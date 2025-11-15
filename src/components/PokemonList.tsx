import { useEffect, useState } from 'react'
import { Spin, Alert, Row, Col } from 'antd'
import { PokemonCard } from './PokemonCard'
import type { PokemonListResponse } from '@/types/pokemon'

export function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon')
        
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon list')
        }
        
        const data: PokemonListResponse = await response.json()
        setPokemonList(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <div style={{ fontSize: 20, marginTop: 16 }}>Loading Pokemon...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ fontSize: 20 }}
        />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 }}>
        Pokemon List
      </h1>
      
      <Row gutter={[24, 24]}>
        {pokemonList?.results.map((pokemon) => (
          <Col key={pokemon.name} xs={24} sm={12} lg={8}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
