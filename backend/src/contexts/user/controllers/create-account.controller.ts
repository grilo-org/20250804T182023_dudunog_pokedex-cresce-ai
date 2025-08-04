import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { ICreateAccountUseCase } from "../usecases/_ports/create-account-usecase.struct";
import { ICreateUserUseCase } from "../usecases/_ports/create-user-usecase.struct";

export class CreateAccountController implements Controller {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private createAccountUseCase: ICreateAccountUseCase,
    private validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { password, name, email } = request.body ?? {};

      const userResult = await this.createUserUseCase.execute({
        email,
        name
      });

      if (userResult.isFailure) {
        return badRequest(userResult.error);
      }

      const result = await this.createAccountUseCase.execute({
        password,
        userId: userResult.getValue().id,
      });

      if (result.isFailure) {
        return badRequest(result.error);
      }

      return ok(result.getValue());
    } catch (error) {
      return serverError(error);
    }
  }
}
