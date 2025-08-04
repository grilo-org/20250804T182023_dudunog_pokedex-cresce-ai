import { type PokemonDetailsModel } from "../pokemon/pokemon-details-model"

export interface PoketeamDetailsModel {
  id: string
  name: string
  pokemons: PokemonDetailsModel[]
  userId: string
}
