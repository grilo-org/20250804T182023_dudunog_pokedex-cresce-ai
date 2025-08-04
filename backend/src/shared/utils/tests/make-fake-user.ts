import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import { UserModelExtended } from "@contexts/user/usecases/_ports/repositories/user-repository.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { generateRandomText } from "../generateRandomText";

export function makeFakeUser(complete: true): UserModelExtended;
export function makeFakeUser(complete: false): CreationModel<UserModel>;
export function makeFakeUser(): CreationModel<UserModel>;
export function makeFakeUser(complete = false): UserModelExtended {
  return {
    ...(complete && {
      id: generateRandomText(),
      createdAt: new Date(),
      updatedAt: new Date(),
      accountId: generateRandomText(),
    }),
    name: "any_name",
    email: "any_email"
  };
}
