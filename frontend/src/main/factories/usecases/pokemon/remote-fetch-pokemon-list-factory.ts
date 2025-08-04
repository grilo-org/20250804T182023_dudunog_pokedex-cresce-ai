import { type FetchPokemonList } from "@/domain/usecases"
import { RemoteFetchPokemonList } from "@/data/usecases"
import { makePokeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"

export const makeRemoteFetchPokemonList = (): FetchPokemonList =>
  new RemoteFetchPokemonList(makePokeApiUrl("/pokemon"), makeHttpClientDecorator())
