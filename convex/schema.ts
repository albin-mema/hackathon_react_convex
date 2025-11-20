// convex/schema.ts - Updated with budget and capacity tracking
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
    // Availability tracking
    availability: v.optional(v.object({
      status: v.string(), // "available", "partially_available", "busy", "on_leave"
      hoursPerWeek: v.number(),
      availableFrom: v.optional(v.string()),
      notes: v.optional(v.string()),
    })),
    totalCommits: v.number(),
    totalJiraTasksClosed: v.number(),
    recentCommits: v.optional(
      v.array(
        v.object({
          commitHash: v.optional(v.string()),
          message: v.optional(v.string()),
          repository: v.optional(v.string()),
          timestamp: v.optional(v.number()),
        })
      )
    ),
    recentJiraTasks: v.optional(
      v.array(
        v.object({
          taskId: v.optional(v.string()),
          title: v.optional(v.string()),
          status: v.optional(v.string()),
          closedAt: v.optional(v.number()),
          task: v.optional(v.string()),
          timestamp: v.optional(v.number()),
        })
      )
    ),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  })
    .index("by_email", ["email"])
    .index("by_businessUnit", ["businessUnitId"])
    .index("by_department", ["department"])
    .index("by_role", ["role"]),

  projects: defineTable({
    projectCode: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    businessUnitId: v.optional(v.string()),
    businessUnitName: v.optional(v.string()),
    status: v.optional(v.string()), // "planning", "active", "on_hold", "completed", "cancelled"
    priority: v.optional(v.string()), // "low", "medium", "high", "critical"
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    estimatedDuration: v.optional(v.number()),
    
    // Budget tracking
    budget: v.optional(v.object({
      total: v.number(),
      allocated: v.number(),
      spent: v.number(),
      currency: v.string(),
    })),
    
    // Team capacity tracking
    teamCapacity: v.optional(v.object({
      requiredSize: v.number(),
      currentSize: v.number(),
      missingRoles: v.array(v.object({
        role: v.string(),
        count: v.number(),
        skills: v.array(v.string()),
        priority: v.string(),
      })),
    })),
    
    teamSize: v.optional(v.number()),
    teamLead: v.optional(v.string()),
    teamMembers: v.optional(v.array(v.string())),
    
    // Required skills for the project
    requiredSkills: v.optional(v.array(v.string())),
    
    technologies: v.optional(v.array(v.string())),
    domain: v.optional(v.string()),
    projectType: v.optional(v.string()),
    location: v.optional(v.string()),
    
    // Health indicators
    health: v.optional(v.object({
      overallStatus: v.string(), // "healthy", "at_risk", "critical"
      budgetHealth: v.string(),
      teamHealth: v.string(),
      scheduleHealth: v.string(),
      lastAssessment: v.number(),
    })),
    
    // Milestones & Deadlines
    milestones: v.optional(v.array(v.object({
      name: v.string(),
      dueDate: v.string(),
      status: v.string(),
      completionPercentage: v.number(),
    }))),
    
    repositoryUrl: v.optional(v.string()),
    jiraProjectKey: v.optional(v.string()),
    totalCommits: v.optional(v.number()),
    totalJiraTickets: v.optional(v.number()),
    totalJiraTicketsClosed: v.optional(v.number()),
    recentCommits: v.optional(
      v.array(
        v.object({
          commitHash: v.optional(v.string()),
          message: v.optional(v.string()),
          author: v.optional(v.string()),
          timestamp: v.optional(v.number()),
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

  // Matching suggestions/history
  projectMatches: defineTable({
    projectId: v.id("projects"),
    employeeId: v.id("employees"),
    matchScore: v.number(),
    matchDetails: v.object({
      skillMatch: v.number(),
      availabilityMatch: v.number(),
      experienceMatch: v.number(),
      locationMatch: v.number(),
    }),
    status: v.string(), // "suggested", "reviewing", "approved", "assigned", "rejected"
    suggestedBy: v.optional(v.string()),
    reviewedBy: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_employee", ["employeeId"])
    .index("by_status", ["status"]),
});