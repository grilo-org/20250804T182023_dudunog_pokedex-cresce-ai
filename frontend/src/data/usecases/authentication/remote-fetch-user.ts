import { HttpStatusCode, type HttpClient } from "@/data/protocols/http"
import { UnexpectedError } from "@/domain/errors"
import { type HttpErrorResponse } from "@/domain/models"
import {
  type FetchUser,
  type StoreAuthentication
} from "@/domain/usecases"
import { makeSigninErrorMessage } from "@/main/factories/information"

export class RemoteFetchUser implements FetchUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<any>,
    private readonly storeAuthentication: StoreAuthentication
  ) {}

  async fetch (userId: string): Promise<FetchUser.Model | null | undefined> {
    try {
      const httpResponse = await this.httpClient.request({
        url: this.url,
        method: "get",
        body: {
          userId
        }
      })

      const user = httpResponse.body

      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok:
          return user
        case HttpStatusCode.noContent:
          return null
        default:
          // eslint-disable-next-line no-case-declarations
          const errorResponse = user as unknown as HttpErrorResponse
          errorResponse.error = makeSigninErrorMessage(errorResponse.type)
          await this.storeAuthentication.error(errorResponse)
          throw new UnexpectedError()
      }
    } catch (error) { }
  }
}
