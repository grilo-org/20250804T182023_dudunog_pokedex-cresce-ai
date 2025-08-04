import { type PoketeamModel } from "@/domain/models"
import { type AddPoketeam } from "./add-poketeam"

export interface StorePoketeamList {
  startLoading: () => Promise<void>
  store: (payload: any) => Promise<void>
  storeNewPoketeam: (payload: AddPoketeam.Params | null) => Promise<void>
  error: (error: any) => Promise<void>
}

export namespace StorePoketeamList {
  export type Model = PoketeamModel
}
