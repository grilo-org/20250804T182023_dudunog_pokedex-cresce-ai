import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeAccessAccountValidation = (): IValidation => {
  return new Validator({
    string: ["email", "password"],
    required: ["email", "password"]
  });
};
