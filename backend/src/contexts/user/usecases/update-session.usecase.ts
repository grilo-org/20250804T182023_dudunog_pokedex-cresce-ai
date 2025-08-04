import { TOKEN_EXPIRATION_TIME } from "@main/constants/times";
import { Encrypter, Result } from "@shared/protocols";
import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { ISessionRepository } from "@contexts/user/usecases/_ports/repositories/session-repository.struct";
import {
  IUpdateSessionUseCase,
  IUpdateSessionUseCaseDTO,
} from "@contexts/user/usecases/_ports/update-session-usecase.struct";

export class UpdateSessionUseCase implements IUpdateSessionUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    accountId,
    id,
  }: IUpdateSessionUseCaseDTO): Promise<Result<SessionModel>> {
    const [refreshToken, sessionToken] = await Promise.all([
      await this.encrypter.encrypt(accountId),
      await this.encrypter.encrypt(accountId, `${TOKEN_EXPIRATION_TIME}ms`),
    ]);

    const now = new Date();
    const result = await this.sessionRepository.update({
      id,
      accountId,
      refreshToken,
      sessionToken,
      expiresAt: new Date(now.getTime() + TOKEN_EXPIRATION_TIME),
    });

    return Result.ok(result);
  }
}
