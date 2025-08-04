import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export type ICreateSessionUseCaseDTO = Pick<SessionModel, "accountId">;

export type ICreateSessionUseCase = UseCase<
  ICreateSessionUseCaseDTO,
  SessionModel
>;
