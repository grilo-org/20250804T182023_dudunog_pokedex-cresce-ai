import { type FetchPokemon } from "@/domain/usecases"
import { RemoteFetchPokemon } from "@/data/usecases"
import { makePokeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"

export const makeRemoteFetchPokemon = (): FetchPokemon =>
  new RemoteFetchPokemon(makePokeApiUrl(""), makeHttpClientDecorator())
