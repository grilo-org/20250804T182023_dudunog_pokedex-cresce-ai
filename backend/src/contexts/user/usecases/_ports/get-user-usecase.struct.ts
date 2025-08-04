import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import { UseCase } from "@shared/protocols/usecase";

export interface IGetUserUseCaseRequest {
  id: string;
}

export type IGetUserUseCase = UseCase<IGetUserUseCaseRequest, UserModel>;
