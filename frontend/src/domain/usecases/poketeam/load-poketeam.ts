import { type PoketeamDetailsModel } from "@/domain/models"

export interface LoadPoketeam {
  load: (poketeamId: string) => Promise<LoadPoketeam.Model | undefined>
}

export namespace LoadPoketeam {
  export type Model = PoketeamDetailsModel
}
