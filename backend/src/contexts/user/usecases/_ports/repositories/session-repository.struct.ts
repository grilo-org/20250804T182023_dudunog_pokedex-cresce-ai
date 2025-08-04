import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";

export type SearchSessionCriteria = Partial<
  Pick<Record<keyof SessionModel, string>, "id" | "accountId">
>;

export interface ISessionRepository {
  create(data: CreationModel<SessionModel>): Promise<SessionModel>;
  update(data: SessionModel): Promise<SessionModel>;
  findOne(criteria: SearchSessionCriteria): Promise<SessionModel>;
}
