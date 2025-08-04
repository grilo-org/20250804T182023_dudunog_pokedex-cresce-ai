import { AccountModel, AccountModelWithUserData } from "@contexts/user/domain/models/account-model.struct";
import { ICreateAccountUseCaseDTO } from "@contexts/user/usecases/_ports/create-account-usecase.struct";
import { generateRandomText } from "../generateRandomText";

export function makeFakeAccount(): ICreateAccountUseCaseDTO;
export function makeFakeAccount(complete: false): ICreateAccountUseCaseDTO;
export function makeFakeAccount(complete: true): AccountModelWithUserData;
export function makeFakeAccount(
  complete = false,
): ICreateAccountUseCaseDTO | AccountModel {
  return {
    ...(complete && {
      id: generateRandomText(),
      createdAt: new Date(),
      updatedAt: new Date(),
      password: "OQ<vsdmh87297#7",
    }),
    userId: generateRandomText(),
    email: "any_email",
  };
}
