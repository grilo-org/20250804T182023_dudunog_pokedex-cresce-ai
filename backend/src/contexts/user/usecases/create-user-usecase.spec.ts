import { UserAlreadyExistsException } from "@contexts/user/usecases/_ports/errors/user-already-exists.exception";
import { UserRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/user-repository.inmemory";
import { IUserRepository } from "@contexts/user/usecases/_ports/repositories/user-repository.struct";
import { ICreateUserUseCase } from "@contexts/user/usecases/_ports/create-user-usecase.struct";
import { CreateUserUseCase } from "@contexts/user/usecases/create-user.usecase";

interface ISutTypes {
  sut: ICreateUserUseCase;
  userRepository: IUserRepository;
}

const makeSut = (): ISutTypes => {
  const userRepository = new UserRepositoryInMemory();
  const sut = new CreateUserUseCase(userRepository);

  return {
    sut,
    userRepository,
  };
};

const makeFakeUserRequest = () => {
  return {
    email: "any_email",
    name: "any_name",
    document: "any_document",
    birthDate: new Date("2000-01-31T00:00:00"),
  };
};

describe("CreateUserUsecase", () => {
  it("should throw error if user already exists", async () => {
    const { sut, userRepository } = makeSut();

    await userRepository.create(makeFakeUserRequest());
    const result = await sut.execute(makeFakeUserRequest());

    expect(result.error).toEqual(new UserAlreadyExistsException());
  });
  it("should return user if sucess", async () => {
    const { sut } = makeSut();
    const result = await sut.execute(makeFakeUserRequest());

    expect(result.getValue()).toEqual({
      id: expect.anything(),
      ...makeFakeUserRequest(),
    });
  });
});
