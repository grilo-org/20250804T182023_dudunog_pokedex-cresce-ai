export class FailedToFetchUserException extends Error {
  constructor() {
    super(`Failed to fetch user.`);
    this.name = "FailedToFetchUser";
  }
}
