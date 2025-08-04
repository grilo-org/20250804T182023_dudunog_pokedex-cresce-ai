
import { badRequest, ok, serverError } from "@shared/helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@shared/protocols";
import { IValidation } from "@shared/protocols/validation";
import { IAccessAccountUseCase } from "../usecases/_ports/access-account-usecase.struct";
import { ICreateSessionUseCase } from "../usecases/_ports/create-session-usecase.struct";
import { IGetSessionUseCase } from "../usecases/_ports/get-session-usecase.struct";
import { IUpdateSessionUseCase } from "../usecases/_ports/update-session-usecase.struct";

export class AccessAccountController implements Controller {
  constructor(
    private accessAccountUseCase: IAccessAccountUseCase,
    private createSessionUseCase: ICreateSessionUseCase,
    private updateSessionUseCase: IUpdateSessionUseCase,
    private getSessionUseCase: IGetSessionUseCase,
    private validation: IValidation,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { password, email } = request.body ?? {};

      const accountWithUserData = await this.accessAccountUseCase.execute({
        password,
        email,
      });

      if (accountWithUserData.isFailure) {
        return badRequest(accountWithUserData.error);
      }

      const {
        id: accountId,
        email: emailFromAccountUserData,
        userId
      } = accountWithUserData.getValue();

      const session = await this.getSessionUseCase.execute({ accountId });

      if (session.isFailure) {
        const insertedSession = await this.createSessionUseCase.execute({
          accountId,
        });

        const { refreshToken, sessionToken } = insertedSession.getValue();

        return ok({
          accountId,
          sessionToken,
          refreshToken,
        });
      }

      const { id } = session.getValue();
      const updatedSession = await this.updateSessionUseCase.execute({
        accountId,
        id,
      });
      const { refreshToken, sessionToken } = updatedSession.getValue();

      return ok({
        accountId,
        sessionToken,
        refreshToken,
        userInfo: {
          userId,
          email: emailFromAccountUserData,
        },
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
