import { type PokemonDetailsModel } from "@/domain/models"
import {
  type FetchPokemon,
  type LoadPokemon,
  type StorePokemon
} from "@/domain/usecases"

export class RemoteLoadPokemon implements LoadPokemon {
  constructor (
    private readonly fetchPokemon: FetchPokemon,
    private readonly storePokemon: StorePokemon
  ) {}

  async load (name: string): Promise<LoadPokemon.Model | undefined> {
    try {
      await this.storePokemon.startLoading()
      const pokemon = await this.fetchPokemon.fetch(`/pokemon/${name}`)

      await this.storePokemon.store(pokemon)

      return pokemon as PokemonDetailsModel
    } catch (error) {
      await this.storePokemon.error(error)
    }
  }
}
