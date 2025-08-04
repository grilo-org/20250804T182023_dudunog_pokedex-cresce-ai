
import { CreateAccountUseCase } from "@contexts/user/usecases/create-account.usecase";
import { Controller } from "@shared/protocols";
import { CreateAccountController } from "@contexts/user/controllers/create-account.controller";
import { CreateUserUseCase } from "@contexts/user/usecases/create-user.usecase";
import { BcryptAdapter } from "@main/adapters/bcrypter-adapter";
import { salt } from "@main/constants/salt";
import { AccountRepository } from "../repositories/account.repository";
import { makeCreateAccountValidation } from "./create-account-validation.factory";
import { UserRepository } from "..//repositories/user-repository";

export const makeCreateAccount = (): Controller => {
  const accountRepository = new AccountRepository();
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const bcryptAdapter = new BcryptAdapter(salt);
  const createAccountUseCase = new CreateAccountUseCase(
    accountRepository,
    bcryptAdapter,
  );
  const validation = makeCreateAccountValidation();
  const createAccountController = new CreateAccountController(
    createUserUseCase,
    createAccountUseCase,
    validation,
  );

  return createAccountController;
};
