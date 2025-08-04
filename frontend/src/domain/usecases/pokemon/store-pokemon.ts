import { type PokemonDetailsModel } from "@/domain/models"

export interface StorePokemon {
  startLoading: () => Promise<void>
  store: (payload: any) => Promise<void>
  error: (error: any) => Promise<void>
}

export namespace StorePokemon {
  export type Model = PokemonDetailsModel
}
