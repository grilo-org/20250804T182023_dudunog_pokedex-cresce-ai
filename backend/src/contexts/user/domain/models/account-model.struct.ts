import { UserModel } from "./user-model.struct";

export interface AccountModel {
  id: string;
  user?: UserModel;
  userId: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccountModelWithUserData extends AccountModel {
  email?: string;
}
