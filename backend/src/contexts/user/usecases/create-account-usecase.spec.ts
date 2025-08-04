import { makeFakeAccount } from "@shared/utils/tests/make-fake-account";
import { Hasher } from "@shared/protocols";
import { AccountRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/account-repository.inmemory";
import { AccountAlreadyExistException } from "@contexts/user/usecases/_ports/errors/account-already-exists.exception";
import { CreateAccountUseCase } from "@contexts/user/usecases/create-account.usecase";
import { ICreateAccountUseCase } from "@contexts/user/usecases/_ports/create-account-usecase.struct";
import { IAccountRepository } from "@contexts/user/usecases/_ports/repositories/account-repository.struct";

const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return value;
    }
  }

  return new HasherStub();
};

type SutType = {
  sut: ICreateAccountUseCase;
  accountRepository: IAccountRepository;
  hasher: Hasher;
};

const makeSut = (): SutType => {
  const accountRepository = new AccountRepositoryInMemory();
  const hasher = makeHasherStub();
  const sut = new CreateAccountUseCase(accountRepository, hasher);

  return {
    sut,
    accountRepository,
    hasher,
  };
};

describe("CreateAccountUseCase", () => {
  it("should call AccountRepository.findOne", async () => {
    const { sut, accountRepository } = makeSut();

    const accountRepositoryFindOneSpy = jest.spyOn(
      accountRepository,
      "findOne",
    );

    const fakeAccount = makeFakeAccount();

    await sut.execute(fakeAccount);

    expect(accountRepositoryFindOneSpy).toHaveBeenCalledWith({
      userId: fakeAccount.userId,
    });
  });

  it("should call AccountRepository.create", async () => {
    const { sut, accountRepository } = makeSut();

    const spy = jest.spyOn(accountRepository, "create");

    const fakeAccount = makeFakeAccount();

    await sut.execute(fakeAccount);

    expect(spy).toHaveBeenCalledWith({
      userId: fakeAccount.userId,
      token: fakeAccount.password,
    });
  });

  it("should fail if account already exist", async () => {
    const { sut, accountRepository } = makeSut();

    const spy = jest.spyOn(accountRepository, "findOne");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(makeFakeAccount(true));
      }),
    );

    const result = await sut.execute(makeFakeAccount());

    expect(result.isFailure).toBe(true);
    expect(result.error).toEqual(new AccountAlreadyExistException());
  });

  it("should return an account if success", async () => {
    const { sut } = makeSut();

    const fakeAccount = makeFakeAccount();

    const result = await sut.execute(fakeAccount);

    const { email, password, ...expectedAccount } = makeFakeAccount(true);

    expect(result.isFailure).toBe(false);
    expect(result.getValue()).toEqual({
      ...expectedAccount,
      id: expect.anything(),
      userId: expect.anything(),
      updatedAt: expect.anything(),
      createdAt: expect.anything(),
    });
  });
});
