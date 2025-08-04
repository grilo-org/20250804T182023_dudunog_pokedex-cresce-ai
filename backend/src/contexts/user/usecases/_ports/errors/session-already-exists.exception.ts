export class SessionAlreadyExistsException extends Error {
  constructor() {
    super(`Session already exists.`);
    this.name = "SessionAlreadyExists";
  }
}
