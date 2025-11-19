// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    projectCode: v.string(),
    name: v.string(),
    description: v.string(),
    businessUnitId: v.string(),
    businessUnitName: v.string(),
    status: v.string(),
    priority: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    estimatedDuration: v.number(),
    teamSize: v.number(),
    teamLead: v.optional(v.string()),
    teamMembers: v.array(v.string()),
    technologies: v.array(v.string()),
    domain: v.string(),
    projectType: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_businessUnit", ["businessUnitId"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["businessUnitId", "status"],
    }),
});
