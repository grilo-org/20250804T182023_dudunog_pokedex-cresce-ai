import { type UserModel, type HttpErrorResponse } from "@/domain/models"

export interface AuthenticationState {
  isLoading: boolean
  isAuthenticated: boolean
  isInitialized: boolean
  user: UserModel | null
  error: HttpErrorResponse | null
};
