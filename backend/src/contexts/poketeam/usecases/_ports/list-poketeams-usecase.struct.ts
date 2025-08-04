import { PoketeamModel } from "@contexts/poketeam/domain/models/poketeam-model.struct";
import { UseCase } from "@shared/protocols";
import { CreationModel } from "@shared/protocols/creation-model";

export interface IListPoketeamsUseCaseDTO {
  userId: string
}

export type IListPoketeamsUseCase = UseCase<
IListPoketeamsUseCaseDTO,
Omit<CreationModel<PoketeamModel[]>, "userId">
>;
