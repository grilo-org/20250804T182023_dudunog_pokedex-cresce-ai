import { type StoreSession } from "@/domain/usecases"
import { type AppDispatch } from "@/main/providers/redux-store-provider"
import { type AuthenticationSlicesType } from "@/infra/state-manager/slices"

export class RemoteStoreSession implements StoreSession {
  constructor (
    private readonly dispatch: AppDispatch,
    private readonly authenticationSlices: AuthenticationSlicesType
  ) {}

  async store (payload: any): Promise<void> {
    this.dispatch(this.authenticationSlices.initialize(payload))
  }

  async error (error: any): Promise<void> {
    this.dispatch(this.authenticationSlices.hasError(error))
  }
}
