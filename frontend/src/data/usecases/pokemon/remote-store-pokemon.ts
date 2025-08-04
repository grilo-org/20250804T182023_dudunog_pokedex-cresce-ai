import { type StorePokemon } from "@/domain/usecases"
import { type AppDispatch } from "@/main/providers/redux-store-provider"
import { type PokemonSlicesType } from "@/infra/state-manager/slices"

export class RemoteStorePokemon implements StorePokemon {
  constructor (
    private readonly dispatch: AppDispatch,
    private readonly pokemonSlices: PokemonSlicesType
  ) {}

  async startLoading (): Promise<void> {
    this.dispatch(this.pokemonSlices.startLoading())
  }

  async store (payload: any): Promise<void> {
    this.dispatch(this.pokemonSlices.getPokemonSuccess(payload))
  }

  async error (error: any): Promise<void> {
    this.dispatch(this.pokemonSlices.hasError(error))
  }
}
