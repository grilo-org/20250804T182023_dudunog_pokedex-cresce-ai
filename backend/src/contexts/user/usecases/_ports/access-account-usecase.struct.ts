import {
  AccountModel,
  AccountModelWithUserData,
} from "@contexts/user/domain/models/account-model.struct";
import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export type IAccessAccountUseCaseDTO = Pick<AccountModel, "password"> &
  Pick<UserModel, "email">;

export type IAccessAccountUseCase = UseCase<
  IAccessAccountUseCaseDTO,
  Omit<AccountModelWithUserData, "password">
>;
