import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { ICreateSessionUseCaseDTO } from "@contexts/user/usecases/_ports/create-session-usecase.struct";
import { generateRandomText } from "../generateRandomText";

export function makeFakeSession(): ICreateSessionUseCaseDTO;
export function makeFakeSession(complete: false): ICreateSessionUseCaseDTO;
export function makeFakeSession(complete: true): SessionModel;
export function makeFakeSession(
  complete = false,
): ICreateSessionUseCaseDTO | SessionModel {
  return {
    ...(complete && {
      id: generateRandomText(),
      refreshToken: "almost-heaven",
      sessionToken: "whest-virginia",
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    accountId: generateRandomText(),
  };
}
