import { Hasher, Result } from "@shared/protocols";
import { AccountAlreadyExistException } from "@contexts/user/usecases/_ports/errors/account-already-exists.exception";
import { AccountModel } from "@contexts/user/domain/models/account-model.struct";
import {
  ICreateAccountUseCase,
  ICreateAccountUseCaseDTO,
} from "@contexts/user/usecases/_ports/create-account-usecase.struct";
import { IAccountRepository } from "@contexts/user/usecases/_ports/repositories/account-repository.struct";

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    private accountRepository: IAccountRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    userId,
    password,
  }: ICreateAccountUseCaseDTO): Promise<
    Result<Omit<AccountModel, "password">>
  > {
    const existingAccount = await this.accountRepository.findOne({ userId });

    if (existingAccount) {
      return Result.fail(new AccountAlreadyExistException());
    }

    const encryptedPassword = await this.hasher.hash(password);

    const { password: _, ...createdAccount } =
      await this.accountRepository.create({
        userId,
        password: encryptedPassword
      });

    return Result.ok(createdAccount);
  }
}
