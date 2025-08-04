import { AccountModel } from "@contexts/user/domain/models/account-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";

export type IAccountSearchCriteria = Partial<
  Pick<Record<keyof AccountModel, string>, "id" | "userId">
>;

export interface IAccountRepository {
  create(data: CreationModel<AccountModel>): Promise<AccountModel>;
  update(data: AccountModel): Promise<AccountModel>;
  findOne(criteria: IAccountSearchCriteria): Promise<AccountModel>;
}
