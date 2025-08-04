export class InvalidPasswordError extends Error {
  constructor(error: string) {
    super(`Invalid password: ${error}`);
    this.name = "InvalidPasswordError";
  }
}
