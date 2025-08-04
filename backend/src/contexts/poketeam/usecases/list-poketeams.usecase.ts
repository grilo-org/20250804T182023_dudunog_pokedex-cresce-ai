import { Result } from "@shared/protocols";
import { CreationModel } from "@shared/protocols/creation-model";
import { PoketeamModel } from "../domain/models/poketeam-model.struct";
import { IListPoketeamsUseCase, IListPoketeamsUseCaseDTO } from "./_ports/list-poketeams-usecase.struct";
import { IPoketeamRepository } from "./_ports/repositories/poketeam-repository.struct";

export class ListPoketeamsUseCase implements IListPoketeamsUseCase {
  constructor(private readonly poketeamRepository: IPoketeamRepository) {}

  async execute({
    userId
  }: IListPoketeamsUseCaseDTO): Promise<Result<Omit<CreationModel<PoketeamModel[]>, "userId">>> {
    const poketeams = await this.poketeamRepository.listByUserId(userId);

    return Result.ok(poketeams);
  }
}
