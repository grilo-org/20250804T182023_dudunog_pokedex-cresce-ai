export class AccountDoesNotExistException extends Error {
  constructor() {
    super("Account doesn't exist.");
    this.name = "AccountDoesNotExist";
  }
}
