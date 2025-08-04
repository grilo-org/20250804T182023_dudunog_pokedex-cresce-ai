import { AuthMiddleware } from "@contexts/user/middlewares/authentication.middleware";
import { LoadAccountByTokenUsecase } from "@contexts/user/usecases/load-account-by-token.usecase";
import { JwtAdapter } from "@main/adapters/jwt-adapter";
import { Middleware } from "@shared/protocols/middleware";
import { AccountRepository } from "../../repositories/account.repository";

export const makeAuthMiddleware = (secret: string): Middleware => {
  const accountRepository = new AccountRepository();
  const jwtAdapter = new JwtAdapter(secret);
  const loadAccountByToken = new LoadAccountByTokenUsecase(
    accountRepository,
    jwtAdapter,
  );
  return new AuthMiddleware(loadAccountByToken);
};
