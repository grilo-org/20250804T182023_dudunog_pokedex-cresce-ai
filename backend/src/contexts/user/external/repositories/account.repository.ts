import { AccountModel } from "@contexts/user/domain/models/account-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { IAccountRepository } from "@contexts/user/usecases/_ports/repositories/account-repository.struct";
import { AppDataSource } from "@main/config/database/data-source";
import { AccountEntity } from "../entities/account-entity";

export class AccountRepository implements IAccountRepository {
  private accountCollection = AppDataSource.getRepository(AccountEntity);

  async create(data: CreationModel<AccountModel>): Promise<AccountModel> {
    const insertedAccount = this.accountCollection.create(data);
    return this.accountCollection.save(insertedAccount);
  }

  async update(data: AccountModel): Promise<AccountModel> {
    const accountToUpdate = await this.accountCollection.findOne({
      where: { id: data.id },
    });

    return this.accountCollection.save({
      ...accountToUpdate,
      ...data,
    });
  }

  async findOne(
    criteria: Partial<Record<keyof AccountModel, any>>,
  ): Promise<AccountModel> {
    return this.accountCollection.findOne({
      where: criteria,
      relations: ["user"],
    });
  }
}
