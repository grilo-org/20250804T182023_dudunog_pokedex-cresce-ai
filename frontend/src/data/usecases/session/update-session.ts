import { type HttpClient } from "@/data/protocols/http"
import {
  type StoreAuthentication,
  type UpdateSession
} from "@/domain/usecases"

export class RemoteUpdateSession implements UpdateSession {
  constructor (
    private readonly storeAuthentication: StoreAuthentication,
    private readonly httpClient: HttpClient<any>
  ) {}

  async update (sessionToken: string, refreshToken: string, user: any): Promise<void> {
    try {
      if (sessionToken) {
        localStorage.setItem("pokedex:sessionToken", sessionToken)
        localStorage.setItem("pokedex:refreshToken", refreshToken)
        localStorage.setItem("pokedex:user", JSON.stringify(user))
        this.httpClient.setHeader("x-access-token", sessionToken)
      } else {
        localStorage.removeItem("pokedex:sessionToken")
        localStorage.removeItem("pokedex:refreshToken")
        this.httpClient.removeHeader("x-access-token")
      }
    } catch (error) {
      await this.storeAuthentication.error(error)
    }
  }
}
