import { Result } from "@shared/protocols";
import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { SessionDoesntExistException } from "@contexts/user/usecases/_ports/errors/session-doesnt-exist.exception";
import {
  IGetSessionUseCase,
  IGetSessionUseCaseDTO,
} from "@contexts/user/usecases/_ports/get-session-usecase.struct";
import { ISessionRepository } from "@contexts/user/usecases/_ports/repositories/session-repository.struct";

export class GetSessionUseCase implements IGetSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute({
    accountId,
  }: IGetSessionUseCaseDTO): Promise<Result<SessionModel>> {
    const session = await this.sessionRepository.findOne({ accountId });

    if (!session) {
      return Result.fail(new SessionDoesntExistException());
    }

    return Result.ok(session);
  }
}
