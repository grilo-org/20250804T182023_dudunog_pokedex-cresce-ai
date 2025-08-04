import { type UserModel } from "@/domain/models"

export interface LoadUser {
  load: (userId: string) => Promise<LoadUser.Model | undefined>
}

export namespace LoadUser {
  export type Model = UserModel
}
