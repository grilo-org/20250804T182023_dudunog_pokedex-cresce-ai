import { type PoketeamState } from "@/data/protocols/state-manager"
import {
  type PoketeamDetailsModel,
  type PoketeamModel
} from "@/domain/models"
import { type AddPoketeam } from "@/domain/usecases"
import { type PayloadAction } from "@reduxjs/toolkit"

export const poketeamReducers = {
  startLoading (state: PoketeamState) {
    state.isLoading = true
  },

  hasError (state: PoketeamState, action: PayloadAction<object>) {
    state.isLoading = false
    state.error = action.payload
  },

  getPoketeamsSuccess (
    state: PoketeamState,
    action: PayloadAction<PoketeamModel[]>
  ) {
    state.isLoading = false
    state.poketeams = action.payload
    state.size = action.payload.length
  },

  getPoketeamSuccess (state: PoketeamState, action: PayloadAction<PoketeamDetailsModel>) {
    state.isLoading = false
    state.poketeam = action.payload
  },

  storeNewPoketeam (state: PoketeamState, action: PayloadAction<AddPoketeam.Params | null>) {
    state.newPoketeam = action.payload
  },

  cleanPoketeam (state: PoketeamState) {
    state.poketeam = null
  }
}
