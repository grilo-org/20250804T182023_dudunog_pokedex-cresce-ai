import { type PokemonFiltersState } from "@/data/protocols/state-manager"
import { type PokemonDetailsModel } from "@/domain/models"

export interface LoadPokemonList {
  loadAll: (filters: PokemonFiltersState) => Promise<LoadPokemonList.Model[] | undefined>
}

export namespace LoadPokemonList {
  export type Model = PokemonDetailsModel
}
