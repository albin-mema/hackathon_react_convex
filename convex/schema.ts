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
    status: v.string(), // "planning", "active", "on_hold", "completed", "cancelled"
    priority: v.string(), // "low", "medium", "high", "critical"
    startDate: v.string(),
    endDate: v.optional(v.string()),
    estimatedDuration: v.number(),
    
    // Budget tracking
    budget: v.optional(v.object({
      total: v.number(),
      allocated: v.number(),
      spent: v.number(),
      currency: v.string(),
    })),
    
    // Team capacity tracking
    teamCapacity: v.object({
      requiredSize: v.number(),
      currentSize: v.number(),
      missingRoles: v.array(v.object({
        role: v.string(),
        count: v.number(),
        skills: v.array(v.string()),
        priority: v.string(),
      })),
    }),
    
    teamSize: v.number(),
    teamLead: v.optional(v.string()),
    teamMembers: v.array(v.string()),
    
    // Required skills for the project
    requiredSkills: v.array(v.object({
      name: v.string(),
      category: v.string(),
      minimumProficiency: v.string(),
      isMandatory: v.boolean(),
    })),
    
    technologies: v.array(v.string()),
    domain: v.string(),
    projectType: v.string(),
    location: v.string(),
    
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