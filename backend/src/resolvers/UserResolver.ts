import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types/myContext";
import { LoginInput } from "./inputs/LoginInput";
import { UserInput } from "./inputs/UserInput";
import { UserResponse } from "./responses/UserResponse";
import { registerValidation } from "./validations/registerValidations";

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("payload") payload: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = await registerValidation(payload);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(payload.password);
    const user = await User.create({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    }).save();
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("payload") { usernameOrEmail, password }: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Username atau email tidak ditemukan",
          },
        ],
      };
    }

    if (user) {
      const validPassword = await argon2.verify(user.password, password);
      if (validPassword) {
        req.session.userId = user.id;

        console.log(req.session.userId);

        return { user };
      }
    }

    return {
      errors: [
        {
          field: "password",
          message: "Password tidak valid",
        },
      ],
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(process.env.COOKIE_NAME);
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
