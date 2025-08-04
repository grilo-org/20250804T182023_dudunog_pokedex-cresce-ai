import { UnexpectedError } from "@/domain/errors"
import {
  type FetchUser,
  type LoadUser,
  type StoreAuthentication
} from "@/domain/usecases"

export class RemoteLoadUser implements LoadUser {
  constructor (
    private readonly fetchUser: FetchUser,
    private readonly storeAuthentication: StoreAuthentication
  ) {}

  async load (userId: string): Promise<LoadUser.Model | undefined> {
    try {
      await this.storeAuthentication.startLoading()

      const user = await this.fetchUser.fetch(userId)

      if (user) {
        return user
      } else {
        throw new UnexpectedError()
      }
    } catch (error) { }
  }
}
