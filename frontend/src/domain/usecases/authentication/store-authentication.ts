import { type PokemonDetailsModel } from "@/domain/models"

export interface StoreAuthentication {
  startLoading: () => Promise<void>
  initialize: (payload: any) => Promise<void>
  login: (payload: any) => Promise<void>
  logout: () => Promise<void>
  error: (error: any) => Promise<void>
}

export namespace StoreAuthentication {
  export type Model = PokemonDetailsModel
}
