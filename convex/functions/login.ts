import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { compare } from "bcryptjs";

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, password } = args;

    const employee = await ctx.db
      .query("employees")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!employee) {
      return { success: false, message: "Email not found" };
    }

    const isValid = (password == employee.passwordHash);

    if (!isValid) {
      return { success: false, message: "Incorrect password" };
    }

    const { passwordHash, ...safeUser } = employee;

    return { success: true, user: safeUser };
  },
});
