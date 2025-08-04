import { TOKEN_EXPIRATION_TIME } from "@main/constants/times";
import { Encrypter, Result } from "@shared/protocols";
import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import {
  ICreateSessionUseCase,
  ICreateSessionUseCaseDTO,
} from "@contexts/user/usecases/_ports/create-session-usecase.struct";
import { SessionAlreadyExistsException } from "@contexts/user/usecases/_ports/errors/session-already-exists.exception";
import { ISessionRepository } from "@contexts/user/usecases/_ports/repositories/session-repository.struct";

export class CreateSessionUseCase implements ICreateSessionUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    accountId,
  }: ICreateSessionUseCaseDTO): Promise<Result<SessionModel>> {
    const existingSession = await this.sessionRepository.findOne({ accountId });

    if (existingSession) {
      return Result.fail(new SessionAlreadyExistsException());
    }

    const [refreshToken, sessionToken] = await Promise.all([
      await this.encrypter.encrypt(accountId),
      await this.encrypter.encrypt(accountId, `${TOKEN_EXPIRATION_TIME}ms`),
    ]);

    const now = new Date();
    const session = await this.sessionRepository.create({
      accountId,
      refreshToken,
      sessionToken,
      expiresAt: new Date(now.getTime() + TOKEN_EXPIRATION_TIME),
    });

    return Result.ok(session);
  }
}
