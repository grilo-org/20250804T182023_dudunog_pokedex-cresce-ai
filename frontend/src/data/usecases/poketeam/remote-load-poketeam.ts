import { type PokemonDetailsModel, type PoketeamModel, type PoketeamDetailsModel } from "@/domain/models"
import {
  type LoadPoketeam,
  type FetchPoketeam,
  type FetchPokemon,
  type StorePoketeam
} from "@/domain/usecases"

export class RemoteLoadPoketeam implements LoadPoketeam {
  constructor (
    private readonly fetchPoketeam: FetchPoketeam,
    private readonly fetchPokemon: FetchPokemon,
    private readonly storePoketeam: StorePoketeam
  ) {}

  async load (poketeamId: string): Promise<LoadPoketeam.Model | undefined> {
    try {
      await this.storePoketeam.startLoading()
      const poketeam = (await this.fetchPoketeam.fetch(`/${poketeamId}`)) as PoketeamModel

      const pokemons: PokemonDetailsModel[] = await Promise.all(poketeam?.pokemons.map(async (pokemon) => {
        const fetchedPokemon = await this.fetchPokemon.fetch(`/pokemon/${pokemon}`)
        return fetchedPokemon as PokemonDetailsModel
      }))

      const fullPoketeam: PoketeamDetailsModel = {
        ...poketeam,
        pokemons
      }

      await this.storePoketeam.store(fullPoketeam)

      return fullPoketeam
    } catch (error) {
      await this.storePoketeam.error(error)
    }
  }
}
