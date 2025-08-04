import { ILoadAccountByTokenUseCase } from "@contexts/user/usecases/_ports/load-account-by-token-struct";
import { AccessDeniedError } from "@shared/errors/access-denied-error";
import {
  forbidden,
  serverError,
  badRequest,
} from "@shared/helpers/http-helper";
import { HttpRequest, HttpResponse } from "@shared/protocols";
import { Middleware } from "@shared/protocols/middleware";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByTokenUseCase,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = request.headers["x-access-token"];

      if (!accessToken) {
        return forbidden(new AccessDeniedError());
      }

      const account = await this.loadAccountByToken.execute({
        accessToken,
      });

      if (account.isFailure) {
        return badRequest(account.error);
      }

      request.account = account.getValue();
    } catch (error) {
      return serverError(error);
    }
  }
}
