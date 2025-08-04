import { PoketeamModel } from "@contexts/poketeam/domain/models/poketeam-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface IGetPoketeamUseCaseRequest {
  id: string;
}

export type IGetPoketeamUseCase = UseCase<IGetPoketeamUseCaseRequest, PoketeamModel>;
