import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export type IUpdateSessionUseCaseDTO = Pick<SessionModel, "accountId" | "id">;

export type IUpdateSessionUseCase = UseCase<
  IUpdateSessionUseCaseDTO,
  SessionModel
>;
