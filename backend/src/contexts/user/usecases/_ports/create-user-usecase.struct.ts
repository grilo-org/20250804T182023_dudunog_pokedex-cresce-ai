import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import { CreationModel } from "@shared/protocols/creation-model";
import { UseCase } from "@shared/protocols/usecase";

export type ICreateUserUseCaseDTO = CreationModel<UserModel>;

export type ICreateUserUseCase = UseCase<ICreateUserUseCaseDTO, UserModel>;
