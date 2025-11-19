import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  counter_events: defineTable({
    type: v.string(),
    timestamp: v.number(),
  }),
});