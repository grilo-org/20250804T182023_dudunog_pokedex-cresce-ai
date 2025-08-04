import { AccountModel } from "@contexts/user/domain/models/account-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export type ILoadAccountByTokenRequest = {
  accessToken: string;
};

export type ILoadAccountByTokenUseCase = UseCase<
  ILoadAccountByTokenRequest,
  AccountModel
>;
