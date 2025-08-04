export interface SigninHttpSuccessResponse {
  sessionToken: string
  refreshToken: string
  userInfo: {
    userId: string
    email: string
  }
  success: boolean
}
