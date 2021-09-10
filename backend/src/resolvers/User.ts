import argon2 from "argon2";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types/myContext";
import { IsEmailExists } from "../utils/IsEmailExists";
import { IsUsernameExists } from "../utils/IsUsernameExists";

@InputType()
class UserInput {
  @Field()
  @MinLength(6, { message: "Username minimal 6 karakter" })
  @MaxLength(20, { message: "Username maksimal 20 karakter" })
  @IsUsernameExists({ message: "Username telah terdaftar" })
  username: string;

  @Field()
  @IsEmail({}, { message: "Email tidak valid" })
  @IsEmailExists({ message: "Email telah terdaftar" })
  email: string;

  @Field()
  @MinLength(5, { message: "Password minimal 5 karakter" })
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("payload") { username, email, password }: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    password = hashedPassword;
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();
    req.session.userId = user.id;
    return user;
  }
}
