import { AppDataSource } from "@main/config/database/data-source";
import {
  IPoketeamRepository,
} from "@contexts/poketeam/usecases/_ports/repositories/poketeam-repository.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { PoketeamModel } from "@contexts/poketeam/domain/models/poketeam-model.struct";
import { PoketeamEntity } from "../entities/poketeam-entity";

export class PoketeamRepository implements IPoketeamRepository {
  constructor(
    private poketeamCollection = AppDataSource.getRepository(PoketeamEntity),
  ) {}

  async create(data: CreationModel<PoketeamModel>): Promise<PoketeamModel> {
    const insertedInvoice = this.poketeamCollection.create(data);
    return await this.poketeamCollection.save(insertedInvoice);
  }

  async findById(id: string): Promise<PoketeamModel> {
    return await this.poketeamCollection.findOne({
      where: {
        id,
      },
    });
  }

  async listByUserId(userId: string): Promise<PoketeamModel[]> {
    return this.poketeamCollection.find({
      where: {
        userId
      }
    })
  }

  async update(data: PoketeamModel): Promise<PoketeamModel> {
    return await this.poketeamCollection.save({
      ...data,
    });
  }

  async delete(data: PoketeamModel): Promise<void> {
    await this.poketeamCollection.delete(data.id);
  }
}
