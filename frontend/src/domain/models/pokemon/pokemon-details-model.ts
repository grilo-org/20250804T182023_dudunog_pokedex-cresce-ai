type PokemonTypes = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type PokemonSprites = {
  other: {
    "official-artwork": {
      front_default: string
    }
  }
}

type PokemonAbility = {
  ability: {
    name: string
    url: string
  }
}

export interface PokemonDetailsModel {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonTypes[]
  sprites: PokemonSprites
  abilities: PokemonAbility[]
}
