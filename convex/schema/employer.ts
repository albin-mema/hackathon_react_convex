// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  employees: defineTable({
    employeeCode: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    businessUnitId: v.string(),
    businessUnitName: v.string(),
    department: v.string(),
    role: v.string(),
    skills: v.array(
      v.object({
        name: v.string(),
        category: v.string(),
        proficiencyLevel: v.string(),
        yearsOfExperience: v.number(),
      })
    ),
    softSkills: v.optional(
      v.array(
        v.object({
          name: v.string(),
          category: v.string(),
          level: v.string(),
        })
      )
    ),
    interests: v.optional(v.array(v.string())),
    activities: v.optional(v.array(v.string())),
    yearsOfExperience: v.number(),
    yearsInTeamSystem: v.number(),
    currentProjects: v.array(v.string()),
    pastProjects: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_businessUnit", ["businessUnitId"])
    .index("by_department", ["department"])
    .index("by_role", ["role"]),
});
