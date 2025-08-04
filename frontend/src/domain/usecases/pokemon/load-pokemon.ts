import { type PokemonDetailsModel } from "@/domain/models"

export interface LoadPokemon {
  load: (name: string) => Promise<LoadPokemon.Model | undefined>
}

export namespace LoadPokemon {
  export type Model = PokemonDetailsModel
}
