import { Encrypter } from "@shared/protocols";
import { makeFakeSession } from "@shared/utils/tests/make-fake-session";
import { ICreateSessionUseCase } from "@contexts/user/usecases/_ports/create-session-usecase.struct";
import { ISessionRepository } from "@contexts/user/usecases/_ports/repositories/session-repository.struct";
import { CreateSessionUseCase } from "@contexts/user/usecases/create-session.usecase";
import { SessionRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/session-repository.inmemory";
import { SessionAlreadyExistsException } from "@contexts/user/usecases/_ports/errors/session-already-exists.exception";

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(data: string, expiresIn = "1d"): Promise<string> {
      return "awesome_encrypted_string_hash_token_abeca";
    }
  }

  return new EncrypterStub();
};

type SutType = {
  sut: ICreateSessionUseCase;
  sessionRepository: ISessionRepository;
  encrypter: Encrypter;
};

const makeSut = (): SutType => {
  const sessionRepository = new SessionRepositoryInMemory();
  const encrypter = makeEncrypterStub();
  const sut = new CreateSessionUseCase(sessionRepository, encrypter);

  return {
    sut,
    sessionRepository,
    encrypter,
  };
};

describe("SessionAccountUseCase", () => {
  it("should call SessionRepository.findOne", async () => {
    const { sut, sessionRepository } = makeSut();

    const sessionRepositoryFindOneSpy = jest.spyOn(
      sessionRepository,
      "findOne",
    );

    const fakeSession = makeFakeSession();

    await sut.execute(fakeSession);

    expect(sessionRepositoryFindOneSpy).toHaveBeenCalledWith({
      accountId: fakeSession.accountId,
    });
  });

  it("should fail if session already exist", async () => {
    const { sut, sessionRepository } = makeSut();

    const spy = jest.spyOn(sessionRepository, "findOne");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(makeFakeSession(true));
      }),
    );

    const result = await sut.execute(makeFakeSession());

    expect(result.isFailure).toBe(true);
    expect(result.error).toEqual(new SessionAlreadyExistsException());
  });

  it("should generate a session", async () => {
    const { sut, sessionRepository } = makeSut();

    const fakeSession = makeFakeSession(true);

    jest.spyOn(sessionRepository, "findOne").mockReturnValueOnce(
      new Promise(resolve => {
        resolve(undefined);
      }),
    );
    const result = await sut.execute({
      accountId: fakeSession.accountId,
    });

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual({
      accountId: fakeSession.accountId,
      sessionToken: expect.any(String),
      id: expect.any(String),
      refreshToken: expect.any(String),
      expiresAt: expect.any(Date),
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });
});
