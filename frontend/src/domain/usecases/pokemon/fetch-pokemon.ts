import { type PokemonDetailsModel } from "@/domain/models"

export interface FetchPokemon {
  fetch: (name: string) => Promise<FetchPokemon.Model | null | undefined>
}

export namespace FetchPokemon {
  export type Model = PokemonDetailsModel
}
