import { CreatePoketeamController } from "@contexts/poketeam/controllers/create-poketeam.controller";
import { CreatePoketeamUseCase } from "@contexts/poketeam/usecases/create-poketeam.usecase";
import { Controller } from "@shared/protocols";
import { PoketeamRepository } from "../repositories/poketeam.repository";
import { makeCreatePoketeamValidationFactory } from "./create-poketeam-validation.factory";

export const makeCreatePoketeamFactory = (): Controller => {
  const poketeamRepository = new PoketeamRepository();

  const createPoketeamUseCase = new CreatePoketeamUseCase(poketeamRepository);
  const validation = makeCreatePoketeamValidationFactory();

  const createPoketeamController = new CreatePoketeamController(
    createPoketeamUseCase,
    validation,
  );

  return createPoketeamController;
};
