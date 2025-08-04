export class FailedToFetchPoketeamException extends Error {
  constructor() {
    super(`Failed to fetch poketam.`);
    this.name = "FailedToFetchPoketeam";
  }
}
