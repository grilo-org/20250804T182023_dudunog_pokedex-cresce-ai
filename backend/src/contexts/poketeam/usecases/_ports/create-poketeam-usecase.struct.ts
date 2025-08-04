import { PoketeamModel } from "@contexts/poketeam/domain/models/poketeam-model.struct";
import { UseCase } from "@shared/protocols";

export interface ICreatePoketeamUseCaseDTO {
  name: string
  pokemons: string[]
  userId: string
}

export type ICreatePoketeamUseCase = UseCase<
ICreatePoketeamUseCaseDTO,
  PoketeamModel
>;
