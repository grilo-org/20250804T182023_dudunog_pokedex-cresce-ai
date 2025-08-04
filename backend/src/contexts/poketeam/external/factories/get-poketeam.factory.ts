import { Controller } from "@shared/protocols";
import { GetPoketeamUseCase } from "@contexts/poketeam/usecases/get-poketeam.usecase";
import { PoketeamRepository } from "@contexts/poketeam/external/repositories/poketeam.repository";
import { GetPoketeamController } from "@contexts/poketeam/controllers/get-poketeam.controller";

export const makeGetPoketeam = (): Controller => {
  const poketeamRepository = new PoketeamRepository();
  const getPoketeamUseCase = new GetPoketeamUseCase(poketeamRepository);
  const getPoketeamController = new GetPoketeamController(
    getPoketeamUseCase
  );

  return getPoketeamController;
};
