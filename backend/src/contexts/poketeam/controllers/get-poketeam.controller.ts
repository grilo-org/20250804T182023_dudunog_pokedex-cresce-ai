import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IGetPoketeamUseCase } from "../usecases/_ports/get-poketeam-usecase.struct";

export class GetPoketeamController implements Controller {
  constructor(
    private getPoketeamUseCase: IGetPoketeamUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params ?? {};

      const userResult = await this.getPoketeamUseCase.execute({
        id,
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
