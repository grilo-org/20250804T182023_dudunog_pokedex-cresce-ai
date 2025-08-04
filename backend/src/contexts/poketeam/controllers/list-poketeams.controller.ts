import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IListPoketeamsUseCase } from "../usecases/_ports/list-poketeams-usecase.struct";

export class ListPoketeamsController implements Controller {
  constructor(
    private readonly listPoketeamsUseCase: IListPoketeamsUseCase,
    private readonly validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);

      if (error) {
        return badRequest(error);
      }

      const result = await this.listPoketeamsUseCase.execute({
        userId: request.account.user.id
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
