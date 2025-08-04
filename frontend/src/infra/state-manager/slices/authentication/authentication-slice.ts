import { type ISlice, type AuthenticationState } from "@/data/protocols/state-manager"
import { authenticationReducers } from "@/infra/state-manager/reducers"
import { type CaseReducerActions, createSlice, type Slice } from "@reduxjs/toolkit"

const initialState: AuthenticationState = {
  isLoading: false,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null
}

export class AuthneticationSlice implements ISlice<AuthenticationState, typeof authenticationReducers, "authentication"> {
  private readonly authenticationSlice: Slice

  constructor () {
    const authenticationSlice = createSlice({
      name: "authentication",
      initialState,
      reducers: authenticationReducers
    })

    this.authenticationSlice = authenticationSlice
  }

  getSlice (): Slice {
    return this.authenticationSlice
  }

  getActions (): CaseReducerActions<typeof authenticationReducers, "authentication"> {
    return this.authenticationSlice.actions as
      CaseReducerActions<typeof authenticationReducers, "authentication">
  }
}

const authenticationSlice = new AuthneticationSlice()

export default authenticationSlice.getSlice().reducer

export const authenticationSlices = authenticationSlice.getActions()
export type AuthenticationSlicesType = typeof authenticationSlices
