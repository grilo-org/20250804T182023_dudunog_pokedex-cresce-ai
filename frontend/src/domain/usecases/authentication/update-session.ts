import { type PokemonDetailsModel } from "@/domain/models"

export interface UpdateSession {
  update: (sessionToken: string, refreshToken: string, user: any) => Promise<void>
}

export namespace UpdateSession {
  export type Model = PokemonDetailsModel
}
