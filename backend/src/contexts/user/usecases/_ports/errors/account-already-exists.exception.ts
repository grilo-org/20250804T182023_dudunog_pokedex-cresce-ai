export class AccountAlreadyExistException extends Error {
  constructor() {
    super("Account already exist.");
    this.name = "AccountAlreadyExist";
  }
}
