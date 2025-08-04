import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { generateRandomText } from "@shared/utils/generateRandomText";
import {
  ISessionRepository,
  SearchSessionCriteria,
} from "../session-repository.struct";

export class SessionRepositoryInMemory implements ISessionRepository {
  private sessions: SessionModel[] = [];

  create(data: CreationModel<SessionModel>): Promise<SessionModel> {
    const newSession = {
      ...data,
      id: generateRandomText(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sessions.push(newSession);

    return new Promise(resolve => {
      resolve(newSession);
    });
  }

  findOne(criteria: SearchSessionCriteria): Promise<SessionModel> {
    const session = this.sessions.find(session => {
      return Object.keys(criteria).every(c => session[c] === criteria[c]);
    });

    return new Promise(resolve => {
      resolve(session);
    });
  }

  update(data: SessionModel): Promise<SessionModel> {
    const sessionIndex = this.sessions.findIndex(
      session => session.id === data.id,
    );

    this.sessions[sessionIndex] = {
      ...data,
      updatedAt: new Date(),
    };

    return new Promise(resolve => {
      resolve(this.sessions[sessionIndex]);
    });
  }
}
