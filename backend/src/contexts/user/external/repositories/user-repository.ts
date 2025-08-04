import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import {
  IUserRepository,
  UserModelExtended,
} from "@contexts/user/usecases/_ports/repositories/user-repository.struct";
import { AppDataSource } from "@main/config/database/data-source";
import { UserEntity } from "../entities/user-entity";

export class UserRepository implements IUserRepository {
  constructor(
    private userCollection = AppDataSource.getRepository(UserEntity),
  ) {}

  async create(data: Omit<UserModel, "id">): Promise<UserModel> {
    const insertedUser = this.userCollection.create(data);
    return await this.userCollection.save(insertedUser);
  }

  async findById(id: string): Promise<UserModel> {
    return await this.userCollection.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModelExtended> {
    const userFinded = await this.userCollection.query(`
      SELECT us.*, account.id AS "accountId"
      FROM users AS us
      INNER JOIN accounts AS account
      ON account."userId" = us.id
      WHERE us.email = '${email}'`);

    return userFinded[0];
  }
}
