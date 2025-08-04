import { Controller } from "@shared/protocols";
import { UpdateSessionUseCase } from "@contexts/user/usecases/update-session.usecase";
import { GetSessionUseCase } from "@contexts/user/usecases/get-session.usecase";
import { BcryptAdapter } from "@main/adapters/bcrypter-adapter";
import { AccessAccountController } from "@contexts/user/controllers/access-account.controller";
import { AccessAccountAccountUseCase } from "@contexts/user/usecases/access-account.usecase";
import { salt } from "@main/constants/salt";
import { CreateSessionUseCase } from "@contexts/user/usecases/create-session.usecase";
import { JwtAdapter } from "@main/adapters/jwt-adapter";
import { Environment } from "@main/config/environment";
import { AccountRepository } from "../repositories/account.repository";
import { UserRepository } from "../repositories/user-repository";
import { makeAccessAccountValidation } from "./access-account-validation.factory";
import { SessionRepository } from "../repositories/session.repository";

export const makeAccessAccount = (): Controller => {
  const accountRepository = new AccountRepository();
  const sessionRepository = new SessionRepository();
  const userRepository = new UserRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(Environment.secrets.jwt);

  const accessAccountAccountUseCase = new AccessAccountAccountUseCase(
    accountRepository,
    userRepository,
    bcryptAdapter,
  );
  const createSessionUseCase = new CreateSessionUseCase(
    sessionRepository,
    jwtAdapter,
  );
  const updateSessionUseCase = new UpdateSessionUseCase(
    sessionRepository,
    jwtAdapter,
  );
  const getSessionUseCase = new GetSessionUseCase(sessionRepository);

  const validation = makeAccessAccountValidation();
  const createFirstAccessController = new AccessAccountController(
    accessAccountAccountUseCase,
    createSessionUseCase,
    updateSessionUseCase,
    getSessionUseCase,
    validation,
  );

  return createFirstAccessController;
};
