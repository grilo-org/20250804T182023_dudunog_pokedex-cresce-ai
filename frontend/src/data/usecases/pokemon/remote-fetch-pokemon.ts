import { type HttpClient, HttpStatusCode } from "@/data/protocols/http"
import { UnexpectedError } from "@/domain/errors"
import { type FetchPokemon } from "@/domain/usecases"

export class RemoteFetchPokemon implements FetchPokemon {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<FetchPokemon.Model>
  ) {}

  async fetch (name: string): Promise<FetchPokemon.Model | null | undefined> {
    const httpResponse = await this.httpClient.request({
      url: this.url + name,
      method: "get"
    })

    const pokemon = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return pokemon
      case HttpStatusCode.noContent:
        return null
      default:
        throw new UnexpectedError()
    }
  }
}
