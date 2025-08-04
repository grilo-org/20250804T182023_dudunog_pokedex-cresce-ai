export class UserDoesNotExistError extends Error {
  constructor () {
    super("Esse usuário não existe.")
    this.name = "UserDoesNotExist"
  }
}
