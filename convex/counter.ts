import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logAction = mutation({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("counter_events", {
      type: args.type,
      timestamp: Date.now(),
    });
  },
});

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("counter_events").order("desc").collect();
  },
});