import { PoketeamModel } from "@contexts/poketeam/domain/models/poketeam-model.struct";
import { Result } from "@shared/protocols";
import { FailedToFetchPoketeamException } from "./_ports/errors/failed-to-fetch-poketeam.exception";
import { IPoketeamRepository } from "./_ports/repositories/poketeam-repository.struct";
import {
  IGetPoketeamUseCase,
  IGetPoketeamUseCaseRequest
} from "./_ports/get-poketeam-usecase.struct";

export class GetPoketeamUseCase implements IGetPoketeamUseCase {
  constructor(private poketeamRepository: IPoketeamRepository) {}

  async execute({ id }: IGetPoketeamUseCaseRequest): Promise<Result<PoketeamModel>> {
    const poketeam = await this.poketeamRepository.findById(id);

    if (!poketeam) {
      return Result.fail(new FailedToFetchPoketeamException());
    }

    return Result.ok(poketeam);
  }
}
