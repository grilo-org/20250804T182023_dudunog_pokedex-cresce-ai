import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IGetUserUseCase } from "../usecases/_ports/get-user-usecase.struct";

export class GetUserController implements Controller {
  constructor(
    private getUserUseCase: IGetUserUseCase,
    private validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const userResult = await this.getUserUseCase.execute({
        id: request.account.user.id,
      });

      if (userResult.isFailure) {
        return badRequest(userResult.error);
      }

      return ok(userResult.getValue());
    } catch (error) {
      return serverError(error);
    }
  }
}
