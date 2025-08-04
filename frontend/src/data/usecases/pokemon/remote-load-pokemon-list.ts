import {
  type PokemonListHttpResponse,
  type PokemonModel,
  type PokemonDetailsModel
} from "@/domain/models"
import {
  type FetchPokemon,
  type LoadPokemonList,
  type StorePokemonList,
  type FetchPokemonList
} from "@/domain/usecases"
import { type PokemonFiltersState } from "@/data/protocols/state-manager"
import { makeApiQuery } from "@/main/factories/http"

export class RemoteLoadPokemonList implements LoadPokemonList {
  constructor (
    private readonly fetchPokemonList: FetchPokemonList,
    private readonly fetchPokemon: FetchPokemon,
    private readonly storePokemonList: StorePokemonList
  ) {}

  async loadAll (filters: PokemonFiltersState): Promise<LoadPokemonList.Model[] | undefined> {
    try {
      await this.storePokemonList.startLoading()
      const pokemonsResponse = (await this.fetchPokemonList.fetchAll(makeApiQuery(filters))) as PokemonListHttpResponse<PokemonModel[]>

      const fullPokemons: PokemonDetailsModel[] =
        await Promise.all(pokemonsResponse.results.map(async (pokemon) => {
          const fetchedPokemon = await this.fetchPokemon.fetch(`/pokemon/${pokemon.name}`)

          return {
            ...(fetchedPokemon as PokemonDetailsModel),
            name: pokemon.name
          }
        }))

      await this.storePokemonList.store({
        count: pokemonsResponse.count,
        next: pokemonsResponse.next,
        previous: pokemonsResponse.previous,
        results: fullPokemons
      })

      return fullPokemons
    } catch (error) {
      await this.storePokemonList.error(error)
    }
  }
}
