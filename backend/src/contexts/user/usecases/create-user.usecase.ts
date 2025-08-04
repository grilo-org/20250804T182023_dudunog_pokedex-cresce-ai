import { UserModel } from "@contexts/user/domain/models/user-model.struct";
import { Result } from "@shared/protocols";
import { UserAlreadyExistsException } from "./_ports/errors/user-already-exists.exception";
import { IUserRepository } from "@contexts/user/usecases/_ports/repositories/user-repository.struct";
import {
  ICreateUserUseCase,
  ICreateUserUseCaseDTO,
} from "@contexts/user/usecases/_ports/create-user-usecase.struct";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    ...data
  }: ICreateUserUseCaseDTO): Promise<Result<UserModel>> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return Result.fail(new UserAlreadyExistsException());
    }

    const createdUser = await this.userRepository.create({ email, ...data });
    return Result.ok(createdUser);
  }
}
