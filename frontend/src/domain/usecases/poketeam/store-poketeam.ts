import { type PoketeamDetailsModel } from "@/domain/models"

export interface StorePoketeam {
  startLoading: () => Promise<void>
  store: (payload: any) => Promise<void>
  error: (error: any) => Promise<void>
}

export namespace StorePoketeam {
  export type Model = PoketeamDetailsModel
}
