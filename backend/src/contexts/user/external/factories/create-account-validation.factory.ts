import { invalidPasswordValidation } from "@shared/validations";
import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeCreateAccountValidation = (): IValidation => {
  return new Validator({
    string: ["name", "email", "password"],
    required: ["name", "email", "password"],
    custom: [
      (input: any) => invalidPasswordValidation(input.password),
    ],
  });
};
