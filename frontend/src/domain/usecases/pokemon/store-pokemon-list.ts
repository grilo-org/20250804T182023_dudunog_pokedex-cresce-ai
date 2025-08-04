import { type PokemonFiltersState } from "@/data/protocols/state-manager"
import { type PokemonModel } from "@/domain/models"

export interface StorePokemonList {
  startLoading: () => Promise<void>
  store: (payload: any) => Promise<void>
  getFilters: () => Promise<PokemonFiltersState>
  filterPokemons: (payload: any) => Promise<void>
  error: (error: any) => Promise<void>
}

export namespace StorePokemonList {
  export type Model = PokemonModel
}
