import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { User } from "../entities/User";

@ValidatorConstraint({ async: true })
export class IsUsernameExistsConstraint
  implements ValidatorConstraintInterface
{
  async validate(username: string, args: ValidationArguments) {
    const user = await User.findOne({ username });
    console.log("args: ", args);
    if (user) return false;
    return true;
  }
}

export function IsUsernameExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameExistsConstraint,
    });
  };
}
