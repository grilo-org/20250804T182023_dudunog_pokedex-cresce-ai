export class InvalidAccessException extends Error {
  constructor() {
    super("This access is invalid.");
    this.name = "InvalidAccessException";
  }
}
