import { InvalidPasswordError } from "@shared/errors/invalid-password-error";

export const invalidPasswordValidation = (password: string) => {
  if (!password || !password?.length || password?.length < 6)
    return new InvalidPasswordError("Password must have at least 6 caracters");
  return null;
};
