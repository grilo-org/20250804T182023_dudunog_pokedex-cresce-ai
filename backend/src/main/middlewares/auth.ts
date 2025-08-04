import { makeAuthMiddleware } from "@contexts/user/external/factories/middlewares/authentication-middleware.factory";
import { Environment } from "@main/config/environment";
import { HttpRequest, HttpResponse } from "@shared/protocols";

export const auth = async (request: HttpRequest): Promise<HttpResponse> => {
  const authMiddleware = makeAuthMiddleware(Environment.secrets.jwt);
  return authMiddleware.handle(request);
};
