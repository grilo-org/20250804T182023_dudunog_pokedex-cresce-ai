import { type PokemonDetailsModel, type PoketeamModel } from "@/domain/models"

export interface AddPoketeam {
  add: (params: Omit<PoketeamModel, "id" | "userId">) => Promise<AddPoketeam.Model | undefined>
}

export namespace AddPoketeam {
  export type Params = {
    name: string
    pokemons: PokemonDetailsModel[]
  }

  export type Model = PoketeamModel
}
