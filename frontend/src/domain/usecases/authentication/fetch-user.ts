import { type UserModel } from "@/domain/models"

export interface FetchUser {
  fetch: (userId: string) => Promise<FetchUser.Model | null | undefined>
}

export namespace FetchUser {
  export type Model = UserModel
}
