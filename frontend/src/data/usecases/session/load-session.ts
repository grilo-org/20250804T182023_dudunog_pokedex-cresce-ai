import { type UserModel } from "@/domain/models"
import { UnexpectedError } from "@/domain/errors"
import {
  type StoreAuthentication,
  type UpdateSession,
  type LoadSession,
  type LoadUser
} from "@/domain/usecases"

export class RemoteLoadSession implements LoadSession {
  constructor (
    private readonly updateSession: UpdateSession,
    private readonly loadUser: LoadUser,
    private readonly storeAuthentication: StoreAuthentication
  ) {}

  async load (): Promise<void> {
    try {
      const userStorage = JSON.parse(window.localStorage
        .getItem("pokedex:user") as string) as UserModel
      const sessionToken = window.localStorage.getItem("pokedex:sessionToken")
      const refreshToken = window.localStorage.getItem("pokedex:sessionToken")

      if (sessionToken) {
        this.updateSession.update(sessionToken, String(refreshToken), userStorage)

        const user = await this.loadUser.load(userStorage?.id)

        if (user) {
          await this.storeAuthentication.initialize({
            isInitialized: true,
            isAuthenticated: true,
            user
          })
        } else {
          await this.storeAuthentication.initialize({
            isInitialized: true,
            isAuthenticated: false,
            user: undefined
          })
          throw new UnexpectedError()
        }
      } else {
        await this.storeAuthentication.initialize({
          isInitialized: true,
          isAuthenticated: false,
          user: undefined
        })
      }
    } catch (error) {
      // await this.storeAuthentication.error(error)
      await this.storeAuthentication.initialize({
        isInitialized: true,
        isAuthenticated: false,
        user: undefined
      })
    }
  }
}
