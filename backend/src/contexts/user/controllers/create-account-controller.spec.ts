import { Controller, Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { makeFakeAccount } from "@shared/utils/tests/make-fake-account";
import { MissingParamError } from "@shared/errors/missing-param-error";
import { BcryptAdapter } from "@main/adapters/bcrypter-adapter";
import { AccountRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/account-repository.inmemory";
import { CreateAccountUseCase } from "../usecases/create-account.usecase";
import { ICreateAccountUseCase } from "../usecases/_ports/create-account-usecase.struct";
import { CreateAccountController } from "./create-account.controller";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { UserRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/user-repository.inmemory";
import { ICreateUserUseCase } from "../usecases/_ports/create-user-usecase.struct";

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
    name: "Teste",
    email: "email@gmail.com",
    password: "doajosdnaoi@"
  },
});

type SutType = {
  sut: Controller;
  createUserUseCase: ICreateUserUseCase;
  createAccountUseCase: ICreateAccountUseCase;
  validation: IValidation;
};

const makeSut = (): SutType => {
  const userRepository = new UserRepositoryInMemory();
  const accountRepository = new AccountRepositoryInMemory();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const createAccountUseCase = new CreateAccountUseCase(
    accountRepository,
    bcryptAdapter,
  );
  const validation = makeValidationStub();
  const sut = new CreateAccountController(
    createUserUseCase,
    createAccountUseCase,
    validation,
  );

  return {
    sut,
    createUserUseCase,
    createAccountUseCase,
    validation,
  };
};

describe("CreateAccountController", () => {
  it("should call CreateUserUseCase", async () => {
    const { sut, createUserUseCase } = makeSut();

    const spy = jest.spyOn(createUserUseCase, "execute");

    await sut.handle(makeRequestData());

    expect(spy).toHaveBeenCalled();
  });

  it("should call CreateAccountUseCase", async () => {
    const { sut, createAccountUseCase } = makeSut();

    const spy = jest.spyOn(createAccountUseCase, "execute");

    await sut.handle(makeRequestData());

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

  it("should return badRequest if the user creation fails", async () => {
    const { sut, createUserUseCase } = makeSut();

    const spy = jest.spyOn(createUserUseCase, "execute");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(Result.fail(new Error()));
      }),
    );

    const result = await sut.handle(makeRequestData());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return badRequest if the account creation fails", async () => {
    const { sut, createAccountUseCase } = makeSut();

    const spy = jest.spyOn(createAccountUseCase, "execute");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(Result.fail(new Error()));
      }),
    );

    const result = await sut.handle(makeRequestData());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return serverError if an unexpected error occurs", async () => {
    const { sut, createUserUseCase } = makeSut();

    const spy = jest.spyOn(createUserUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle({});

    expect(result.statusCode).toBe(500);
  });

  it("should return ok if the success", async () => {
    const { sut, createAccountUseCase } = makeSut();

    const fakeAccount = makeFakeAccount(true);

    const spy = jest.spyOn(createAccountUseCase, "execute");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(Result.ok(fakeAccount));
      }),
    );

    const result = await sut.handle(makeRequestData());

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(fakeAccount);
  });
});
