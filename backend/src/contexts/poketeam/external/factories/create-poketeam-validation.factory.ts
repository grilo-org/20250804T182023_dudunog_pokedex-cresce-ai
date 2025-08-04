import { IValidation } from "@shared/protocols/validation";
import { Validator } from "@shared/validations";
import { ArrayValidation } from "@shared/validations/array-fields-validation";

export const makeCreatePoketeamValidationFactory = (): IValidation => {
  return new Validator({
    required: ["name", "pokemons"],
    string: ["name"],
    custom: [(input: any) => ArrayValidation(input.pokemons, "pokemons")]
  });
};
