import { AccountModel } from "@contexts/user/domain/models/account-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { generateRandomText } from "@shared/utils/generateRandomText";
import {
  IAccountRepository,
  IAccountSearchCriteria,
} from "../account-repository.struct";

export class AccountRepositoryInMemory implements IAccountRepository {
  private accounts: AccountModel[] = [];

  create(data: CreationModel<AccountModel>): Promise<AccountModel> {
    const newAccount = {
      ...data,
      id: generateRandomText(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.accounts.push(newAccount);

    return new Promise(resolve => {
      resolve(newAccount);
    });
  }

  update(data: AccountModel): Promise<AccountModel> {
    const accountToUpdateIndex = this.accounts.findIndex(
      account => account.id === data.id,
    );
    const accountToUpdate = this.accounts[accountToUpdateIndex];

    const updatedAccount = { ...accountToUpdate, ...data };

    this.accounts[accountToUpdateIndex] = updatedAccount;

    return new Promise(resolve => {
      resolve(updatedAccount);
    });
  }

  findOne(criteria: IAccountSearchCriteria): Promise<AccountModel> {
    const account = this.accounts.find(account => {
      return Object.keys(criteria).every(c => account[c] === criteria[c]);
    });

    return new Promise(resolve => {
      resolve(account);
    });
  }
}
