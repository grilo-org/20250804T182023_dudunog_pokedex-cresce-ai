import { FailedToFetchUserException } from "@contexts/user/usecases/_ports/errors/failed-to-fetch-user.exception";
import { SessionRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/session-repository.inmemory";
import { ISessionRepository } from "@contexts/user/usecases/_ports/repositories/session-repository.struct";
import { IGetSessionUseCase } from "@contexts/user/usecases/_ports/get-session-usecase.struct";
import { GetSessionUseCase } from "@contexts/user/usecases/get-session.usecase";
import { SessionDoesntExistException } from "./_ports/errors/session-doesnt-exist.exception";
import { makeFakeSession } from "@shared/utils/tests";
import { TOKEN_EXPIRATION_TIME } from "@main/constants/times";

interface ISutTypes {
  sut: IGetSessionUseCase;
  sessionRepository: ISessionRepository;
}

const makeSut = (): ISutTypes => {
  const sessionRepository = new SessionRepositoryInMemory();
  const sut = new GetSessionUseCase(sessionRepository);

  return {
    sut,
    sessionRepository,
  };
};

const makeFakeCreateSessionRequest = () => {
  return {
    id: "any_id",
    email: "any_email",
    accountId: "any_account_id",
    sessionToken: "any_session_token",
    refreshToken: "any_refresh_token",
    expiresAt: new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const makeFakeGetSessionRequest = () => {
  return {
    accountId: "any_id",
  };
};

describe("GetSessionUseCase", () => {
  it("should throw error if session not exists", async () => {
    const { sut, sessionRepository } = makeSut();

    await sessionRepository.findOne({
      accountId: makeFakeGetSessionRequest().accountId
    });
    const result = await sut.execute(makeFakeGetSessionRequest());

    expect(result.error).toEqual(new SessionDoesntExistException());
  });

  it("should return session if sucess", async () => {
    const { sut, sessionRepository } = makeSut();

    const fakeSession = makeFakeSession(true)
    await sessionRepository.create(fakeSession);

    const result = await sut.execute({
      accountId: fakeSession.accountId
    });

    expect(result.getValue()).toEqual({
      ...(fakeSession),
      id: expect.anything(),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
    });
  });
});
