import {
  type PokemonDetailsModel
} from "@/domain/models"

export interface PokemonFiltersState {
  limit: number
  offset: number
}

export interface PokemonState {
  isLoading: boolean
  pokemons: PokemonDetailsModel[]
  pokemon: PokemonDetailsModel | null
  size: number
  error: object | null
  sortBy: string | null
  filters: PokemonFiltersState
};
