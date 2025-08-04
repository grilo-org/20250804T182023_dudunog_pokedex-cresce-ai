import {
  type UpdateSession,
  type StoreAuthentication,
  type Logout
} from "@/domain/usecases"
import { makeSigninErrorMessage } from "@/main/factories/information"

export class RemoteLogout implements Logout {
  constructor (
    private readonly storeAuthentication: StoreAuthentication,
    private readonly updateSession: UpdateSession
  ) { }

  async logout (): Promise<void> {
    this.storeAuthentication.logout()
    this.updateSession.update("", "", null)

    await this.storeAuthentication.error({ error: makeSigninErrorMessage("LogoutException"), type: "LogoutException" })
  }
}
