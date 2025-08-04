import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export type IGetSessionUseCaseDTO = Pick<SessionModel, "accountId">;

export type IGetSessionUseCase = UseCase<IGetSessionUseCaseDTO, SessionModel>;
