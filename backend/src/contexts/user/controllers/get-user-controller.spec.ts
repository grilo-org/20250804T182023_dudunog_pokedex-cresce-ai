import { Controller, Result } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { makeFakeUser } from "@shared/utils/tests/make-fake-user";
import { MissingParamError } from "@shared/errors/missing-param-error";
import { GetUserUseCase } from "../usecases/get-user.usecase";
import { IGetUserUseCase } from "../usecases/_ports/get-user-usecase.struct";
import { GetUserController } from "./get-user.controller";
import { UserRepositoryInMemory } from "../usecases/_ports/repositories/inMemory/user-repository.inmemory";

const makeFakeRequest = () => ({
  account: {
    id: "",
    userId: "",
    password: "",
    needsPasswordReset: false,
    user: {
      id: "any_userid",
      name: "",
      birthDate: new Date(),
      email: "",
      document: "",
    },
  },
});

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate() {
      return null;
    }
  }

  return new ValidationStub();
};

type SutType = {
  sut: Controller;
  getUserUseCase: IGetUserUseCase;
  validation: IValidation;
};

const makeSut = (): SutType => {
  const userRepository = new UserRepositoryInMemory();
  const getUserUseCase = new GetUserUseCase(userRepository);
  const validation = makeValidationStub();
  const sut = new GetUserController(getUserUseCase, validation);

  return {
    sut,
    getUserUseCase,
    validation,
  };
};

describe("GetUserController", () => {
  it("should call GetUserUseCase", async () => {
    const { sut, getUserUseCase } = makeSut();

    const spy = jest.spyOn(getUserUseCase, "execute");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });
  it("should call validator", async () => {
    const { sut, validation } = makeSut();

    const spy = jest.spyOn(validation, "validate");

    await sut.handle(makeFakeRequest());

    expect(spy).toHaveBeenCalled();
  });
  it("should return badRequest if a param is missing", async () => {
    const { sut, validation } = makeSut();

    const spy = jest.spyOn(validation, "validate");
    spy.mockReturnValue(new MissingParamError("id"));

    const result = await sut.handle({});

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new MissingParamError("id"));
  });

  it("should return badRequest if the get user fails", async () => {
    const { sut, getUserUseCase } = makeSut();

    const spy = jest.spyOn(getUserUseCase, "execute");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(Result.fail(new Error()));
      }),
    );

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(new Error());
  });

  it("should return serverError if an unexpected error occurs", async () => {
    const { sut, getUserUseCase } = makeSut();

    const spy = jest.spyOn(getUserUseCase, "execute");
    spy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.handle({});

    expect(result.statusCode).toBe(500);
  });

  it("should return ok if the success", async () => {
    const { sut, getUserUseCase } = makeSut();

    const fakeUser = makeFakeUser(true);

    const spy = jest.spyOn(getUserUseCase, "execute");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(Result.ok(fakeUser));
      }),
    );

    const result = await sut.handle(makeFakeRequest());

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(fakeUser);
  });
});
