import { type PoketeamModel } from "@/domain/models"

export interface LoadPoketeamList {
  loadAll: () => Promise<LoadPoketeamList.Model[] | undefined>
}

export namespace LoadPoketeamList {
  export type Model = PoketeamModel
}
