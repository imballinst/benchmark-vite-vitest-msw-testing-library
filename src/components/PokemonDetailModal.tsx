import { useEffect, useState } from 'react'
import { Modal, Spin, Alert, Tag, Space, Descriptions } from 'antd'
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
    <Modal
      title={
        <span style={{ textTransform: 'capitalize' }}>
          {pokemon?.name || 'Loading...'}
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {loading && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <Spin />
          <div style={{ marginTop: 8 }}>Loading...</div>
        </div>
      )}
      
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      {pokemon && !loading && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: 128, height: 128 }}
            />
          </div>
          
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{pokemon.id}</Descriptions.Item>
            <Descriptions.Item label="Height">{pokemon.height}</Descriptions.Item>
            <Descriptions.Item label="Weight">{pokemon.weight}</Descriptions.Item>
            <Descriptions.Item label="Types">
              <Space size={[0, 8]} wrap>
                {pokemon.types.map((type) => (
                  <Tag key={type.slot} color="blue" style={{ textTransform: 'capitalize' }}>
                    {type.type.name}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Abilities">
              <Space size={[0, 8]} wrap>
                {pokemon.abilities.map((ability, index) => (
                  <Tag key={index} color="green" style={{ textTransform: 'capitalize' }}>
                    {ability.ability.name}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
          
          <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(0, 0, 0, 0.45)' }}>
            Pokemon Details
          </p>
        </div>
      )}
    </Modal>
  )
}
