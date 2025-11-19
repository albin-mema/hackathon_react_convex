// src/components/ProjectsView.tsx
import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

interface ProjectsViewProps {
  onSelectProject: (projectId: string) => void;
}

export default function ProjectsView({ onSelectProject }: ProjectsViewProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("priority");

  const statusOptions = [
    { value: "all", label: "All Projects", count: 12 },
    { value: "active", label: "Active", count: 8 },
    { value: "planning", label: "Planning", count: 2 },
    { value: "at_risk", label: "At Risk", count: 3 },
    { value: "on_hold", label: "On Hold", count: 1 },
  ];

  const mockProjects = [
    {
      id: "1",
      name: "AI Analytics Platform",
      projectCode: "TS-AI-2024",
      description:
        "Building ML-powered analytics dashboard with real-time insights",
      businessUnit: "Milan",
      status: "active",
      priority: "high",
      health: "at_risk",
      startDate: "2024-09-01",
      endDate: "2024-12-15",
      daysLeft: 26,
      budget: {
        total: 150000,
        allocated: 127500,
        spent: 127500,
        currency: "EUR",
        percentage: 85,
      },
      team: {
        required: 8,
        current: 6,
        teamLead: "Marco Rossi",
        missing: [
          {
            role: "Backend Developer",
            count: 2,
            skills: ["Node.js", "PostgreSQL"],
          },
        ],
      },
      requiredSkills: [
        { name: "Python", proficiency: "Advanced", mandatory: true },
        { name: "TensorFlow", proficiency: "Intermediate", mandatory: true },
        { name: "React", proficiency: "Advanced", mandatory: true },
      ],
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "Docker"],
      progress: 65,
      commits: 342,
      jiraTickets: { total: 89, closed: 58 },
    },
    {
      id: "2",
      name: "Cloud Migration Project",
      projectCode: "TS-CLOUD-2024",
      description: "Migrate legacy infrastructure to Azure cloud",
      businessUnit: "Tirana",
      status: "active",
      priority: "critical",
      health: "critical",
      startDate: "2024-08-15",
      endDate: "2024-12-01",
      daysLeft: 12,
      budget: {
        total: 200000,
        allocated: 230000,
        spent: 230000,
        currency: "EUR",
        percentage: 115,
      },
      team: {
        required: 5,
        current: 5,
        teamLead: "Sofia Greco",
        missing: [],
      },
      requiredSkills: [
        { name: "Azure", proficiency: "Expert", mandatory: true },
        { name: "DevOps", proficiency: "Advanced", mandatory: true },
        { name: "Kubernetes", proficiency: "Advanced", mandatory: true },
      ],
      technologies: ["Azure", "Kubernetes", "Docker", "Terraform", "Jenkins"],
      progress: 78,
      commits: 521,
      jiraTickets: { total: 124, closed: 97 },
    },
    {
      id: "3",
      name: "Mobile Banking App",
      projectCode: "TS-MOBILE-2025",
      description: "Secure mobile banking application for iOS and Android",
      businessUnit: "Rome",
      status: "planning",
      priority: "medium",
      health: "healthy",
      startDate: "2025-01-10",
      endDate: "2025-08-30",
      daysLeft: 52,
      budget: {
        total: 300000,
        allocated: 195000,
        spent: 0,
        currency: "EUR",
        percentage: 0,
      },
      team: {
        required: 10,
        current: 4,
        teamLead: "Elena Ferri",
        missing: [
          {
            role: "Mobile Developer",
            count: 4,
            skills: ["React Native", "iOS"],
          },
          {
            role: "Security Engineer",
            count: 1,
            skills: ["Security", "Encryption"],
          },
          { role: "QA Engineer", count: 1, skills: ["Testing", "Automation"] },
        ],
      },
      requiredSkills: [
        { name: "React Native", proficiency: "Advanced", mandatory: true },
        { name: "Node.js", proficiency: "Advanced", mandatory: true },
        { name: "Security", proficiency: "Expert", mandatory: true },
      ],
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
      progress: 15,
      commits: 45,
      jiraTickets: { total: 32, closed: 5 },
    },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600 bg-green-100";
      case "at_risk":
        return "text-orange-600 bg-orange-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600 bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "medium":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Projects Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor project health, budget, and team capacity
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          + New Project
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name, code, or technology..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="priority">Sort by Priority</option>
            <option value="deadline">Sort by Deadline</option>
            <option value="health">Sort by Health</option>
            <option value="budget">Sort by Budget</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
            <span className="font-medium">More Filters</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === option.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.name}
                  </h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                    {project.projectCode}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(project.priority)}`}
                  >
                    {project.priority.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getHealthColor(project.health)}`}
                  >
                    {project.health === "healthy" && (
                      <>
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        Healthy
                      </>
                    )}
                    {project.health === "at_risk" && (
                      <>
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        At Risk
                      </>
                    )}
                    {project.health === "critical" && (
                      <>
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        Critical
                      </>
                    )}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{project.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>📍 {project.businessUnit}</span>
                  <span>👤 Lead: {project.team.teamLead}</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {project.startDate} → {project.endDate}
                    </span>
                  </span>
                  {project.daysLeft <= 30 && (
                    <span className="flex items-center space-x-1 text-orange-600 font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{project.daysLeft} days left</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Team Capacity */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Team</span>
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      project.team.current >= project.team.required
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {project.team.current}/{project.team.required}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      project.team.current >= project.team.required
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                    style={{
                      width: `${(project.team.current / project.team.required) * 100}%`,
                    }}
                  />
                </div>
                {project.team.missing.length > 0 && (
                  <p className="text-xs text-orange-600 font-medium">
                    Missing:{" "}
                    {project.team.missing
                      .map((m) => `${m.count} ${m.role}`)
                      .join(", ")}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Budget</span>
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      project.budget.percentage <= 90
                        ? "text-green-600"
                        : project.budget.percentage <= 100
                          ? "text-orange-600"
                          : "text-red-600"
                    }`}
                  >
                    {project.budget.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      project.budget.percentage <= 90
                        ? "bg-green-500"
                        : project.budget.percentage <= 100
                          ? "bg-orange-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(project.budget.percentage, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  {project.budget.spent.toLocaleString()} /{" "}
                  {project.budget.total.toLocaleString()}{" "}
                  {project.budget.currency}
                </p>
              </div>

              {/* Progress */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Progress</span>
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  {project.jiraTickets.closed}/{project.jiraTickets.total} tasks
                  completed
                </p>
              </div>

              {/* Activity */}
              <div className="bg-gray-50 rounded-lg p-4">
                <span className="text-sm text-gray-600 block mb-2">
                  Recent Activity
                </span>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">
                    📝 {project.commits} commits
                  </p>
                  <p className="text-xs text-gray-600">
                    ✅ {project.jiraTickets.closed} tickets closed
                  </p>
                  <p className="text-xs text-gray-600">
                    👥 {project.team.current} active members
                  </p>
                </div>
              </div>
            </div>

            {/* Technologies & Required Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Technologies:
                </span>
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-gray-700">
                  Required Skills:
                </span>
                {project.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      skill.mandatory
                        ? "bg-red-50 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {skill.name} ({skill.proficiency}){skill.mandatory && " *"}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => onSelectProject(project.id)}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Find Team Members
              </button>
              <button className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Edit Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
