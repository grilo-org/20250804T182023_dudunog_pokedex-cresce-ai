export function generateRandomText(length = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-";

  let generatedId = "";

  for (let i = 0; i <= length; i += 1) {
    const randomCharacterIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomCharacterIndex];
    generatedId += randomCharacter;
  }

  return generatedId;
}
