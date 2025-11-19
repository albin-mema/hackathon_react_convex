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
    location: v.string(),
    repositoryUrl: v.optional(v.string()),
    jiraProjectKey: v.optional(v.string()),
    totalCommits: v.number(),
    totalJiraTickets: v.number(),
    totalJiraTicketsClosed: v.number(),
    recentCommits: v.optional(
      v.array(
        v.object({
          commitHash: v.string(),
          message: v.string(),
          author: v.string(),
          timestamp: v.number(),
        })
      )
    ),
    recentJiraTickets: v.optional(
      v.array(
        v.object({
          ticketId: v.string(),
          title: v.string(),
          status: v.string(),
          assignee: v.optional(v.string()),
          updatedAt: v.number(),
        })
      )
    ),

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
