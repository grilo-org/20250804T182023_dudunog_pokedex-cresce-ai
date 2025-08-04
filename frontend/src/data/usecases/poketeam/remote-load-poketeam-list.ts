import {
  type LoadPoketeamList,
  type FetchPoketeamList,
  type StorePoketeamList
} from "@/domain/usecases"

export class RemoteLoadPoketeamList implements LoadPoketeamList {
  constructor (
    private readonly fetchPoketeamList: FetchPoketeamList,
    private readonly storePoketeamList: StorePoketeamList
  ) {}

  async loadAll (): Promise<LoadPoketeamList.Model[] | undefined> {
    try {
      await this.storePoketeamList.startLoading()
      const poketeams = await this.fetchPoketeamList.fetchAll()

      await this.storePoketeamList.store(poketeams)

      return poketeams
    } catch (error) {
      await this.storePoketeamList.error(error)
    }
  }
}
