export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
  types: PokemonType[]
  abilities: PokemonAbility[]
}
