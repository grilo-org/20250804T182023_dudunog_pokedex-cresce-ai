import { type PoketeamModel } from "@/domain/models"

export interface FetchPoketeamList {
  fetchAll: () => Promise<FetchPoketeamList.Model[]>
}

export namespace FetchPoketeamList {
  export type Model = PoketeamModel
}
