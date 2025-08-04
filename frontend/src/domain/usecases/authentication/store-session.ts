import { type PokemonDetailsModel } from "@/domain/models"

export interface StoreSession {
  store: (payload: any) => Promise<void>
  error: (error: any) => Promise<void>
}

export namespace StoreSession {
  export type Model = PokemonDetailsModel
}
