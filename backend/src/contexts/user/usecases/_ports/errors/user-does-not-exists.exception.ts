export class UserDoesNotExistException extends Error {
  constructor() {
    super("User doesn't exist.");
    this.name = "UserDoesNotExist";
  }
}
