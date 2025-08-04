import { makeFakeAccount } from "@shared/utils/tests/make-fake-account";
import { HashComparer } from "@shared/protocols";
import { makeFakeUser } from "@shared/utils/tests/make-fake-user";
import { AccountRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/account-repository.inmemory";
import { IAccountRepository } from "@contexts/user/usecases/_ports/repositories/account-repository.struct";
import { AccessAccountAccountUseCase } from "@contexts/user/usecases/access-account.usecase";
import { UserRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/user-repository.inmemory";
import { IUserRepository } from "@contexts/user/usecases/_ports/repositories/user-repository.struct";

const makeHashCompareStub = (): HashComparer => {
  class HasherStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return true;
    }
  }

  return new HasherStub();
};

type SutType = {
  sut: AccessAccountAccountUseCase;
  userRepository: IUserRepository;
  accountRepository: IAccountRepository;
  compare: HashComparer;
};

const makeSut = (): SutType => {
  const accountRepository = new AccountRepositoryInMemory();
  const userRepository = new UserRepositoryInMemory();
  const compare = makeHashCompareStub();
  const sut = new AccessAccountAccountUseCase(
    accountRepository,
    userRepository,
    compare,
  );

  return {
    sut,
    accountRepository,
    userRepository,
    compare,
  };
};

describe("CreateAccountUseCase", () => {
  it("should call UserRepository.findByEmail", async () => {
    const { sut, accountRepository, userRepository } = makeSut();

    const userRepositoryFindOneSpy = jest.spyOn(userRepository, "findByEmail");

    const fakeAccount = makeFakeAccount();
    const fakeUser = makeFakeUser(true);

    await sut.execute({
      email: fakeUser.email,
      password: fakeAccount.password,
    });

    expect(userRepositoryFindOneSpy).toHaveBeenCalledWith(fakeUser.email);
  });

  it("should call AccountRepository.findOne", async () => {
    const { sut, accountRepository, userRepository } = makeSut();

    const fakeUser = {
      ...makeFakeUser(true),
      accountId: "any_account",
    };

    jest.spyOn(userRepository, "findByEmail").mockReturnValueOnce(
      new Promise(resolve => {
        resolve(fakeUser);
      }),
    );

    const spy = jest.spyOn(accountRepository, "findOne");

    const fakeAccount = makeFakeAccount();

    await sut.execute({
      email: fakeUser.email,
      password: fakeAccount.password,
    });

    expect(spy).toHaveBeenCalledWith({
      userId: fakeUser.id,
    });
  });

  it("should return an id's and needs password reset boolean if success", async () => {
    const { sut, userRepository, accountRepository } = makeSut();

    const fakeAccount = makeFakeAccount(true);
    const fakeUser = {
      ...makeFakeUser(true),
      accountId: "any_account",
    };

    jest.spyOn(userRepository, "findByEmail").mockReturnValueOnce(
      new Promise(resolve => {
        resolve(fakeUser);
      }),
    );

    jest.spyOn(accountRepository, "findOne").mockReturnValueOnce(
      new Promise(resolve => {
        resolve(fakeAccount);
      }),
    );

    const result = await sut.execute({
      email: fakeUser.email,
      password: fakeAccount.password,
    });

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual({
      id: fakeAccount.id,
      userId: fakeAccount.userId,
      email: "any_email"
    });
  });
});
