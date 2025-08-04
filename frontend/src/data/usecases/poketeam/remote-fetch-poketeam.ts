import { type HttpClient, HttpStatusCode } from "@/data/protocols/http"
import { type FetchPoketeam } from "@/domain/usecases"
import { type PoketeamModel } from "@/domain/models"
import { UnexpectedError } from "@/domain/errors"

export class RemoteFetchPoketeam implements FetchPoketeam {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<FetchPoketeam.Model>
  ) {}

  async fetch (poketeamId: string): Promise<FetchPoketeam.Model | null> {
    const httpResponse = await this.httpClient.request({
      url: this.url + poketeamId,
      method: "get"
    })

    const poketeam = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return poketeam as PoketeamModel
      case HttpStatusCode.noContent:
        return null
      default:
        throw new UnexpectedError()
    }
  }
}
