import { type StorePokemonList } from "@/domain/usecases"
import { type AppDispatch } from "@/main/providers/redux-store-provider"
import { type PokemonSlicesType } from "@/infra/state-manager/slices"
import {
  type PokemonFiltersState,
  type PokemonState
} from "@/data/protocols/state-manager"

export class RemoteStorePokemonList implements StorePokemonList {
  constructor (
    private readonly dispatch: AppDispatch,
    private readonly pokemonSlices: PokemonSlicesType,
    private readonly pokemonState: PokemonState
  ) {}

  async startLoading (): Promise<void> {
    this.dispatch(this.pokemonSlices.startLoading())
  }

  async store (payload: any): Promise<void> {
    this.dispatch(this.pokemonSlices.getPokemonsSuccess(payload))
  }

  async getFilters (): Promise<PokemonFiltersState> {
    return this.pokemonState.filters
  }

  async filterPokemons (payload: any): Promise<void> {
    this.dispatch(this.pokemonSlices.filterPokemons(payload))
  }

  async error (error: any): Promise<void> {
    this.dispatch(this.pokemonSlices.hasError(error))
  }
}
