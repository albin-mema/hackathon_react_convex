import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { compare } from "bcryptjs";
import { log } from "console";

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, password } = args;
    console.log(args);
    const manager = await ctx.db
      .query("managers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!manager) {
      return { success: false, message: "Email not found" };
    }

    const isValid = (password == manager.passwordHash);

    if (!isValid) {
      return { success: false, message: "Incorrect password" };
    }

    const { passwordHash, ...safeUser } = manager;

    return { success: true, user: safeUser };
  },
});
