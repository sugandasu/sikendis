import { User } from "../entities/User";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/myContext";

export const isOperator: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }
  const user = await User.findOne({ id: context.req.session.userId });
  if (user && user.role === "operator") {
    return next();
  }
  throw new Error("Not authorized");
};
