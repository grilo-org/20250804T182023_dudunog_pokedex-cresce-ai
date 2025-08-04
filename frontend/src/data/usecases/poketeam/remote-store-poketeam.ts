import { type StorePoketeam } from "@/domain/usecases"
import { type AppDispatch } from "@/main/providers/redux-store-provider"
import { type PoketeamSlicesType } from "@/infra/state-manager/slices"
import { type PoketeamDetailsModel } from "@/domain/models"

export class RemoteStorePoketeam implements StorePoketeam {
  constructor (
    private readonly dispatch: AppDispatch,
    private readonly poketeamSlices: PoketeamSlicesType
  ) {}

  async startLoading (): Promise<void> {
    this.dispatch(this.poketeamSlices.startLoading())
  }

  async store (payload: PoketeamDetailsModel): Promise<void> {
    this.dispatch(this.poketeamSlices.getPoketeamSuccess(payload))
  }

  async error (error: any): Promise<void> {
    this.dispatch(this.poketeamSlices.hasError(error))
  }
}
