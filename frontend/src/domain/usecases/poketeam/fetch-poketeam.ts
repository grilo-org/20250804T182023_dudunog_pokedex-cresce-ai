import { type PoketeamModel } from "@/domain/models"

export interface FetchPoketeam {
  fetch: (poketeamId: string) => Promise<FetchPoketeam.Model | null>
}

export namespace FetchPoketeam {
  export type Model = PoketeamModel
}
