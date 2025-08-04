export class SessionDoesntExistException extends Error {
  constructor() {
    super(`Session doesn't exist.`);
    this.name = "SessionAlreadyExists";
  }
}
