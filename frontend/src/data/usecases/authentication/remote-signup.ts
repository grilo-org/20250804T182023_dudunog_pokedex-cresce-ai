import { HttpStatusCode, type HttpClient } from "@/data/protocols/http"
import { AuthenticationError } from "@/domain/errors/authentication-error"
import { type SignupHttpSuccessResponse, type HttpErrorResponse } from "@/domain/models"
import { type StoreAuthentication, type Signup } from "@/domain/usecases"
import { makeSignupErrorMessage } from "@/main/factories/information"

export class RemoteSignup implements Signup {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<Signup.Model>,
    private readonly storeAuthentication: StoreAuthentication
  ) { }

  async signup (name: string, email: string, password: string): Promise<SignupHttpSuccessResponse | AuthenticationError | undefined> {
    try {
      const httpResponse = await this.httpClient.request({
        url: this.url,
        method: "post",
        body: {
          name,
          email,
          password
        }
      })

      const signupResponse = httpResponse.body as unknown as SignupHttpSuccessResponse

      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok:
          signupResponse.success = true

          return signupResponse
        case HttpStatusCode.noContent:
          signupResponse.success = false
          return
        default:
          signupResponse.success = false
          // eslint-disable-next-line no-case-declarations
          const signupErrorResponse = signupResponse as unknown as HttpErrorResponse
          signupErrorResponse.error = makeSignupErrorMessage(signupErrorResponse.type)
          await this.storeAuthentication.error(signupErrorResponse)
          return new AuthenticationError(signupErrorResponse.type, signupErrorResponse.type)
      }
    } catch (error) {
    }
  }
}
