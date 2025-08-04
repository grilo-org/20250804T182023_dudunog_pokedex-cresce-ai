import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { ICreatePoketeamUseCase } from "../usecases/_ports/create-poketeam-usecase.struct";

export class CreatePoketeamController implements Controller {
  constructor(
    private readonly createPoketeamUseCase: ICreatePoketeamUseCase,
    private readonly validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { name, pokemons } = request.body

      const result = await this.createPoketeamUseCase.execute({
        name,
        pokemons,
        userId: request.account.userId
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
