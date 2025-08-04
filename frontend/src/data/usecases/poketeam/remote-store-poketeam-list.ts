import { type AddPoketeam, type StorePoketeamList } from "@/domain/usecases"
import { type AppDispatch } from "@/main/providers/redux-store-provider"
import { type PoketeamSlicesType } from "@/infra/state-manager/slices"

export class RemoteStorePoketeamList implements StorePoketeamList {
  constructor (
    private readonly dispatch: AppDispatch,
    private readonly poketeamSlices: PoketeamSlicesType
  ) {}

  async startLoading (): Promise<void> {
    this.dispatch(this.poketeamSlices.startLoading())
  }

  async store (payload: any): Promise<void> {
    this.dispatch(this.poketeamSlices.getPoketeamsSuccess(payload))
  }

  async storeNewPoketeam (payload: AddPoketeam.Params | null): Promise<void> {
    this.dispatch(this.poketeamSlices.storeNewPoketeam(payload))
  }

  async error (error: any): Promise<void> {
    this.dispatch(this.poketeamSlices.hasError(error))
  }
}
