import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";

export const makeGetUserValidation = (): IValidation => {
  return new Validator({});
};
