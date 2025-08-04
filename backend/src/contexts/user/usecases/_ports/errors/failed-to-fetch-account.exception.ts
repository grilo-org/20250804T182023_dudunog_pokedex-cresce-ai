export class FailedToFetchAccountException extends Error {
  constructor() {
    super(`Failed to fetch account.`);
    this.name = "FailedToFetchAccountException";
  }
}
