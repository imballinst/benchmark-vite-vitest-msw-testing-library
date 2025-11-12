import { http, HttpResponse } from 'msw'

export const handlers = [
  // Get list of Pokemon
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      ],
    })
  }),

  // Get Pokemon details
  http.get('https://pokeapi.co/api/v2/pokemon/:id', ({ params }) => {
    const { id } = params
    
    // Mock data for specific Pokemon
    const pokemonData: Record<string, {
      id: number
      name: string
      height: number
      weight: number
      sprites: { front_default: string }
      types: Array<{ slot: number; type: { name: string } }>
      abilities: Array<{ ability: { name: string } }>
    }> = {
      '1': {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        types: [
          { slot: 1, type: { name: 'grass' } },
          { slot: 2, type: { name: 'poison' } },
        ],
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
      },
      '2': {
        id: 2,
        name: 'ivysaur',
        height: 10,
        weight: 130,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        },
        types: [
          { slot: 1, type: { name: 'grass' } },
          { slot: 2, type: { name: 'poison' } },
        ],
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
      },
      '3': {
        id: 3,
        name: 'venusaur',
        height: 20,
        weight: 1000,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
        },
        types: [
          { slot: 1, type: { name: 'grass' } },
          { slot: 2, type: { name: 'poison' } },
        ],
        abilities: [
          { ability: { name: 'overgrow' } },
          { ability: { name: 'chlorophyll' } },
        ],
      },
    }

    const pokemon = pokemonData[id as string]
    
    if (pokemon) {
      return HttpResponse.json(pokemon)
    }

    return new HttpResponse(null, { status: 404 })
  }),
]
