/* eslint-disable no-promise-executor-return */
import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import { randomUUID } from "crypto";
import { IUserRepository } from "../user-repository.struct";

export class UserRepositoryInMemory implements IUserRepository {
  private users: UserModel[] = [] as UserModel[];

  create(data: Omit<UserModel, "id">): Promise<UserModel> {
    const user = {
      id: randomUUID(),
      ...data,
    };
    this.users.push(user);
    return new Promise(resolve => {
      resolve(user);
    });
  }

  findById(id: string): Promise<UserModel> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return new Promise(resolve => {
        resolve(null);
      });
    }

    return new Promise(resolve => resolve(user));
  }

  findByEmail(email: string): Promise<UserModel> {
    const user = this.users.find(user => user.email === email);
    if (!user) {
      return new Promise(resolve => {
        resolve(null);
      });
    }

    return new Promise(resolve => resolve(user));
  }
}
