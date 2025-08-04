import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { ISessionRepository } from "@contexts/user/usecases/_ports/repositories/session-repository.struct";
import { AppDataSource } from "@main/config/database/data-source";
import { CreationModel } from "@shared/protocols/creation-model";
import { SessionEntity } from "../entities/session-entity";

export class SessionRepository implements ISessionRepository {
  private sessionCollection = AppDataSource.getRepository(SessionEntity);

  async create(data: CreationModel<SessionModel>): Promise<SessionModel> {
    const insertedSession = this.sessionCollection.create(data);
    return this.sessionCollection.save(insertedSession);
  }

  async findOne(
    criteria: Partial<Record<keyof SessionModel, any>>,
  ): Promise<SessionModel> {
    return this.sessionCollection.findOne({ where: criteria });
  }

  async update(data: CreationModel<SessionModel>): Promise<SessionModel> {
    return this.sessionCollection.save(data);
  }
}
