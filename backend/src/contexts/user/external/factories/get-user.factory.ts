import { Controller } from "@shared/protocols";
import { GetUserController } from "@contexts/user/controllers/get-user.controller";
import { GetUserUseCase } from "@contexts/user/usecases/get-user.usecase";
import { UserRepository } from "../repositories/user-repository";
import { makeGetUserValidation } from "./get-user-validation.factory";

export const makeGetUser = (): Controller => {
  const userRepository = new UserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);
  const validation = makeGetUserValidation();
  const createAccountController = new GetUserController(
    getUserUseCase,
    validation,
  );

  return createAccountController;
};
