/* eslint-disable no-promise-executor-return */
import { Decrypter } from "@shared/protocols";
import { makeFakeAccount } from "@shared/utils/tests/make-fake-account";
import { LoadAccountByTokenUsecase } from "@contexts/user/usecases/load-account-by-token.usecase";
import { AccountRepositoryInMemory } from "@contexts/user/usecases/_ports/repositories/inMemory/account-repository.inmemory";
import { InvalidAccessException } from "@contexts/user/usecases/_ports/errors/invalid-access.exception";
import { FailedToFetchAccountException } from "./_ports/errors/failed-to-fetch-account.exception";

const makeHashCompareStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(data: string): Promise<string | Record<string, any>> {
      const account = makeFakeAccount(true);
      return new Promise(resolve => resolve({ id: account.id }));
    }
  }
  return new DecrypterStub();
};

const makeSut = () => {
  const accountRepository = new AccountRepositoryInMemory();
  const decrypter = makeHashCompareStub();
  const sut = new LoadAccountByTokenUsecase(accountRepository, decrypter);

  return {
    accountRepository,
    decrypter,
    sut,
  };
};
describe("LoadAccountByToken", () => {
  it("should call decrypter with success", async () => {
    const { sut, decrypter } = makeSut();

    const decrypterSpy = jest.spyOn(decrypter, "decrypt");

    await sut.execute({
      accessToken: "any_token",
    });

    expect(decrypterSpy).toHaveBeenCalled();
  });

  it("should throw error if decrypter fails", async () => {
    const { sut, decrypter } = makeSut();

    const decrypterSpy = jest.spyOn(decrypter, "decrypt");
    decrypterSpy.mockImplementation(() => {
      throw new Error();
    });

    const result = await sut.execute({
      accessToken: "any_token",
    });

    expect(result.error).toEqual(new InvalidAccessException());
  });

  it("should throw error if account doesn't exists", async () => {
    const { sut, decrypter } = makeSut();

    jest.spyOn(decrypter, "decrypt");

    const result = await sut.execute({
      accessToken: "any_token",
    });

    expect(result.error).toEqual(new FailedToFetchAccountException());
  });

  it("should call loadAccountByToken with success", async () => {
    const { sut, accountRepository } = makeSut();

    const spy = jest.spyOn(accountRepository, "findOne");
    spy.mockReturnValue(
      new Promise(resolve => {
        resolve(makeFakeAccount(true));
      }),
    );

    const result = await sut.execute({
      accessToken: "any_token",
    });

    expect(result.getValue()).toEqual({
      id: expect.anything(),
      userId: expect.anything(),
      email: expect.anything(),
      password: expect.anything(),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
    });
  });
});
