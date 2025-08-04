import { FailedToFetchUserException } from "@contexts/user/usecases/_ports/errors/failed-to-fetch-user.exception";
import { UserRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/user-repository.inmemory";
import { IUserRepository } from "@contexts/user/usecases/_ports/repositories/user-repository.struct";
import { IGetUserUseCase } from "@contexts/user/usecases/_ports/get-user-usecase.struct";
import { GetUserUseCase } from "@contexts/user/usecases/get-user.usecase";

interface ISutTypes {
  sut: IGetUserUseCase;
  userRepository: IUserRepository;
}

const makeSut = (): ISutTypes => {
  const userRepository = new UserRepositoryInMemory();
  const sut = new GetUserUseCase(userRepository);

  return {
    sut,
    userRepository,
  };
};

const makeFakeCreateUserRequest = () => {
  return {
    id: "any_id",
    email: "any_email",
    name: "any_name",
    document: "any_document",
    birthDate: new Date("2000-01-31T00:00:00"),
  };
};

const makeFakeGetUserRequest = () => {
  return {
    id: "any_id",
  };
};

describe("CreateUserUsecase", () => {
  it("should throw error if user not exists", async () => {
    const { sut, userRepository } = makeSut();

    await userRepository.findById(makeFakeGetUserRequest().id);
    const result = await sut.execute(makeFakeGetUserRequest());

    expect(result.error).toEqual(new FailedToFetchUserException());
  });
  it("should return user if sucess", async () => {
    const { sut, userRepository } = makeSut();

    await userRepository.create(makeFakeCreateUserRequest());
    const result = await sut.execute(makeFakeGetUserRequest());

    expect(result.getValue()).toEqual({
      id: expect.anything(),
      ...makeFakeCreateUserRequest(),
    });
  });
});
