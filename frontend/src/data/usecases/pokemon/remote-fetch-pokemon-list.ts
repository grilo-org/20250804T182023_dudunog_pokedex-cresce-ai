import { type HttpClient, HttpStatusCode } from "@/data/protocols/http"
import { type PokemonListHttpResponse } from "@/domain/models"
import { UnexpectedError } from "@/domain/errors"
import { type FetchPokemonList } from "@/domain/usecases/pokemon/fetch-pokemon-list"

export class RemoteFetchPokemonList implements FetchPokemonList {
  constructor (
    private readonly url: string,
    private readonly httpClient:
    HttpClient<PokemonListHttpResponse<FetchPokemonList.Model[]>>
  ) {}

  async fetchAll (query: string): Promise<PokemonListHttpResponse<FetchPokemonList.Model[]> | null> {
    const httpResponse = await this.httpClient.request({
      url: this.url + query,
      method: "get"
    })

    const pokemons = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return pokemons as PokemonListHttpResponse<FetchPokemonList.Model[]>
      case HttpStatusCode.noContent:
        return null
      default:
        throw new UnexpectedError()
    }
  }
}
