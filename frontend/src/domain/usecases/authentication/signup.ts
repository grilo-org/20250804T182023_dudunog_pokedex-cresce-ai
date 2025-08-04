import { type AuthenticationError } from "@/domain/errors/authentication-error"
import {
  type SignupHttpSuccessResponse,
  type HttpErrorResponse
} from "@/domain/models"

export interface Signup {
  signup: (name: string, email: string, password: string)
  => Promise<SignupHttpSuccessResponse | AuthenticationError | undefined>
}

export namespace Signup {
  export type Model = SignupHttpSuccessResponse | HttpErrorResponse
}
