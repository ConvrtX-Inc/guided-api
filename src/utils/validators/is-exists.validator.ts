import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];
    const searchValue =
      pathToProperty && value?.[pathToProperty]
        ? value?.[pathToProperty]
        : value;
    const entity: unknown = await getRepository(repository).findOne({
      [pathToProperty ? pathToProperty : validationArguments.property]:
        searchValue,
    });

    return Boolean(entity);
  }
}
