import { ListPoketeamsController } from "@contexts/poketeam/controllers/list-poketeams.controller";
import { ListPoketeamsUseCase } from "@contexts/poketeam/usecases/list-poketeams.usecase";
import { Controller } from "@shared/protocols";
import { PoketeamRepository } from "../repositories/poketeam.repository";
import { makeListPoketeamsValidationFactory } from "./list-poketeams-validation.factory";

export const makeListPoketeamsFactory = (): Controller => {
  const poketeamRepository = new PoketeamRepository();

  const listPoketeamsUseCase = new ListPoketeamsUseCase(poketeamRepository);
  const validation = makeListPoketeamsValidationFactory();

  const listPoketeamsController = new ListPoketeamsController(
    listPoketeamsUseCase,
    validation,
  );

  return listPoketeamsController;
};
