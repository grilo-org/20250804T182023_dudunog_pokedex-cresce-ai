import { Controller, Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { JwtAdapter } from "@main/adapters/jwt-adapter";
import { MissingParamError } from "@shared/errors/missing-param-error";
import { BcryptAdapter } from "@main/adapters/bcrypter-adapter";
import { salt } from "@main/constants/salt";
import { makeFakeAccount, makeFakeSession, makeFakeUser, promisify } from "@shared/utils/tests";
import { UserRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/user-repository.inmemory";
import { AccountRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/account-repository.inmemory";
import { SessionRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/session-repository.inmemory";
import { AccessAccountAccountUseCase } from "../usecases/access-account.usecase";
import { AccessAccountController } from "./access-account.controller";
import { CreateSessionUseCase } from "../usecases/create-session.usecase";
import { UpdateSessionUseCase } from "../usecases/update-session.usecase";
import { GetSessionUseCase } from "../usecases/get-session.usecase";
import { SessionDoesntExistException } from "../usecases/_ports/errors/session-doesnt-exist.exception";
import { ISessionRepository } from "../usecases/_ports/repositories/session-repository.struct";
import { IUserRepository } from "../usecases/_ports/repositories/user-repository.struct";

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate() {
      return null;
    }
  }

  return new ValidationStub();
};

const makeRequestData = () => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: "doajosdnaoi@",
  },
});

type SutType = {
  sut: Controller;
  accessAccountUseCase: AccessAccountAccountUseCase;
  createSessionUseCase: CreateSessionUseCase;
  updateSessionUseCase: UpdateSessionUseCase;
  getSessionUseCase: GetSessionUseCase;
  validation: IValidation;
  sessionRepository: ISessionRepository;
};

const makeSut = (): SutType => {
  const userRepository = new UserRepositoryInMemory();
  const accountRepository = new AccountRepositoryInMemory();
  const sessionRepository = new SessionRepositoryInMemory();

  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter("secret");

  const accessAccountUseCase = new AccessAccountAccountUseCase(
    accountRepository,
    userRepository,
    bcryptAdapter,
  );
  const createSessionUseCase = new CreateSessionUseCase(
    sessionRepository,
    jwtAdapter,
  );
  const updateSessionUseCase = new UpdateSessionUseCase(
    sessionRepository,
    jwtAdapter,
  );
  const getSessionUseCase = new GetSessionUseCase(sessionRepository);

  const validation = makeValidationStub();
  const sut = new AccessAccountController(
    accessAccountUseCase,
    createSessionUseCase,
    updateSessionUseCase,
    getSessionUseCase,
    validation,
  );

  return {
    sut,
    accessAccountUseCase,
    createSessionUseCase,
    updateSessionUseCase,
    getSessionUseCase,
    validation,
    sessionRepository
  };
};

describe("CreateAccountController", () => {
  it("should call AccessAccountUseCase", async () => {
    const { sut, accessAccountUseCase } = makeSut();

    const spy = jest.spyOn(accessAccountUseCase, "execute");

    await sut.handle({});

    expect(spy).toHaveBeenCalled();
  });

  it("should return badRequest if a param is missing", async () => {
    const { sut, validation } = makeSut();

    const spy = jest.spyOn(validation, "validate");
    spy.mockReturnValue(new MissingParamError("email"));

    const result = await sut.handle({});

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissingParamError("email"));
  });

  it("should return ok if the session was not created", async () => {
    const { sut, accessAccountUseCase } = makeSut();

    const fakeAccount = makeFakeAccount(true);

    const spy = jest.spyOn(accessAccountUseCase, "execute");
    spy.mockReturnValue(promisify(Result.ok(fakeAccount)));

    const result = await sut.handle({});
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      accountId: fakeAccount.id,
      refreshToken: expect.any(String),
      sessionToken: expect.any(String),
    });
  });

  it("should return serverError if an unexpected error occurs", async () => {
    const { sut, accessAccountUseCase } = makeSut();

    const spy = jest.spyOn(accessAccountUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle({});

    expect(result.statusCode).toBe(500);
  });

  it("should return ok if the session has already been created", async () => {
    const {
      sut,
      accessAccountUseCase,
      getSessionUseCase,
      updateSessionUseCase,
      sessionRepository
    } = makeSut();

    const fakeAccount = makeFakeAccount(true);

    const accessAccountUseCaseSpy = jest.spyOn(accessAccountUseCase, "execute");
    accessAccountUseCaseSpy.mockReturnValue(promisify(Result.ok(fakeAccount)));

    const fakeSession = makeFakeSession(true);
    const getSessionUseCaseSpy = jest.spyOn(getSessionUseCase, "execute");
    getSessionUseCaseSpy.mockReturnValue(promisify(Result.ok(fakeSession)));

    sessionRepository.create(fakeSession);
    const updateSessionUseCaseSpy = jest.spyOn(updateSessionUseCase, "execute");
    updateSessionUseCaseSpy.mockReturnValue(promisify(Result.ok(fakeSession)));

    const requestData = makeRequestData()
    const result = await sut.handle(requestData);
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      accountId: fakeAccount.id,
      refreshToken: expect.any(String),
      sessionToken: expect.any(String),
      userInfo: {
        email: expect.anything(),
        userId: expect.anything(),
      }
    });
  });
});
