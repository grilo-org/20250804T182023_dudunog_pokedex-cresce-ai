import { type AuthenticationState } from "@/data/protocols/state-manager"
import { type HttpErrorResponse } from "@/domain/models"
import { type PayloadAction } from "@reduxjs/toolkit"

export const authenticationReducers = {
  startLoading (state: AuthenticationState) {
    state.isLoading = true
  },

  hasError (state: AuthenticationState, action: PayloadAction<HttpErrorResponse>) {
    state.isLoading = false
    state.error = action.payload
  },

  initialize (state: AuthenticationState, action: PayloadAction<any>) {
    state.isLoading = false
    state.isInitialized = true
    state.isAuthenticated = action.payload.isAuthenticated
    state.user = action.payload.user
  },

  login (state: AuthenticationState, action: PayloadAction<any>) {
    state.isLoading = false
    state.isAuthenticated = true
    state.isInitialized = action.payload.isInitialized
    state.user = action.payload.user
  },

  logout (state: AuthenticationState) {
    state.isAuthenticated = false
    state.user = null
  }
}
