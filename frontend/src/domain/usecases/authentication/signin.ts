import { type AuthenticationError } from "@/domain/errors/authentication-error"
import {
  type HttpErrorResponse,
  type SigninHttpSuccessResponse
} from "@/domain/models"

export interface Signin {
  signin: (email: string, password: string) => Promise<SigninHttpSuccessResponse | AuthenticationError | undefined>
}

export namespace Signin {
  export type Model = SigninHttpSuccessResponse | HttpErrorResponse
}
