import { type PokemonDetailsModel } from "@/domain/models"

export interface LoadSession {
  load: () => Promise<void>
}

export namespace LoadSession {
  export type Model = PokemonDetailsModel
}
