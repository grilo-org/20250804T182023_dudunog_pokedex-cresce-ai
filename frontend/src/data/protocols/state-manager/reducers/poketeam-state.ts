import {
  type PoketeamDetailsModel,
  type PoketeamModel
} from "@/domain/models"
import { type AddPoketeam } from "@/domain/usecases"

export interface PoketeamState {
  isLoading: boolean
  poketeams: PoketeamModel[]
  poketeam: PoketeamDetailsModel | null
  newPoketeam: AddPoketeam.Params | null
  size: number
  error: object | null
  sortBy: string | null
};
