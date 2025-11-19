import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  employees: defineTable({
    employeeCode: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    location: v.string(),
    languages: v.array(v.string()),
    businessUnitId: v.string(),
    businessUnitName: v.string(),
    department: v.string(),
    role: v.string(),
    passwordHash: v.string(), // ← REQUIRED FOR LOGIN
    
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

    totalCommits: v.number(),
    totalJiraTasksClosed: v.number(),

    recentCommits: v.optional(
      v.array(
        v.object({
          commitHash: v.string(),
          message: v.string(),
          repository: v.string(),
          timestamp: v.number(),
        })
      )
    ),

    recentJiraTasks: v.optional(
      v.array(
        v.object({
          taskId: v.string(),
          title: v.string(),
          status: v.string(),
          closedAt: v.number(),
        })
      )
    ),

    createdAt: v.number(),
    updatedAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_businessUnit", ["businessUnitId"])
    .index("by_department", ["department"])
    .index("by_role", ["role"]),

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
