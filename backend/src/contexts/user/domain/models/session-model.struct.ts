export interface SessionModel {
  id: string;
  accountId: string;
  sessionToken: string;
  refreshToken: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
