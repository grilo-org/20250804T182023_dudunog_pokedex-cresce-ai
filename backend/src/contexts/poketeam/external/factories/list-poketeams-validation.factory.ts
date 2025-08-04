import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeListPoketeamsValidationFactory = (): IValidation => {
  return new Validator({
    required: ["account.user.id"]
  });
};
