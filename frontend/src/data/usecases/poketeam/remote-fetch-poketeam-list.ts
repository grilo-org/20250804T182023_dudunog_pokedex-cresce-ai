import { type HttpClient, HttpStatusCode } from "@/data/protocols/http"
import { type FetchPoketeamList } from "@/domain/usecases"
import { UnexpectedError } from "@/domain/errors"

export class RemoteFetchPoketeamList implements FetchPoketeamList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<FetchPoketeamList.Model[]>
  ) {}

  async fetchAll (): Promise<FetchPoketeamList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "get"
    })

    const poketeams = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return poketeams
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}
