import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contributors: defineTable({
    name: v.string(),
    email: v.string(),
    firstSeen: v.number(),
    lastSeen: v.number(),
  }).index("by_email", ["email"]),

  features: defineTable({
    title: v.string(),
    description: v.string(),
    hash: v.string(),
    timestamp: v.number(),
    contributorId: v.id("contributors"),
  }).index("by_contributor", ["contributorId"]),

  feature_files: defineTable({
    featureId: v.id("features"),
    filePath: v.string(),
    linesAdded: v.number(),
    linesDeleted: v.number(),
  }).index("by_feature", ["featureId"])
    .index("by_file", ["filePath"]),

  counter_events: defineTable({
    type: v.string(),
    timestamp: v.number(),
  }),
});