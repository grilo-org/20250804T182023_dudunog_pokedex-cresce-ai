import {
  type PokemonListHttpResponse,
  type PokemonModel
} from "@/domain/models"

export interface FetchPokemonList {
  fetchAll: (query: string) => Promise<PokemonListHttpResponse<FetchPokemonList.Model[]> | null>
}

export namespace FetchPokemonList {
  export type Model = PokemonModel
}
