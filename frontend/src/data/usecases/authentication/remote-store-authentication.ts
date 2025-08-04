import { type StoreAuthentication } from "@/domain/usecases"
import { type AppDispatch } from "@/main/providers/redux-store-provider"
import { type AuthenticationSlicesType } from "@/infra/state-manager/slices"

export class RemoteStoreAuthentication implements StoreAuthentication {
  constructor (
    private readonly dispatch: AppDispatch,
    private readonly authenticationSlices: AuthenticationSlicesType
  ) {}

  async startLoading (): Promise<void> {
    this.dispatch(this.authenticationSlices.startLoading())
  }

  async initialize (payload: any): Promise<void> {
    this.dispatch(this.authenticationSlices.initialize(payload))
  }

  async login (payload: any): Promise<void> {
    this.dispatch(this.authenticationSlices.login(payload))
  }

  async logout (): Promise<void> {
    this.dispatch(this.authenticationSlices.logout())
  }

  async error (error: any): Promise<void> {
    this.dispatch(this.authenticationSlices.hasError(error))
  }
}
