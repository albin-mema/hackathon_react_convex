// src/components/features/ProjectMatchingView.tsx
import { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Briefcase,
} from "lucide-react";

export default function ProjectMatchingView() {
  const [searchMode, setSearchMode] = useState<string>("find-projects");

  const mockEmployees = [
    {
      id: "1",
      name: "Marco Rossi",
      role: "Senior Full-Stack Developer",
      location: "Tirana, Albania",
      avatar: "MR",
      matchScore: 95,
      skills: ["React", "Node.js", "TypeScript", "Azure"],
      experience: "8 years",
      availability: "Available",
      currentProject: "Customer Portal",
      strengths: [
        "Perfect skill match",
        "High availability",
        "Relevant experience",
      ],
    },
    {
      id: "2",
      name: "Anna Bianchi",
      role: "Data Engineer",
      location: "Milan, Italy",
      avatar: "AB",
      matchScore: 88,
      skills: ["Python", "SQL", "Azure", "Spark"],
      experience: "6 years",
      availability: "Available in 2 weeks",
      currentProject: "Analytics Platform",
      strengths: ["Strong data skills", "Cloud expertise", "Team player"],
    },
    {
      id: "3",
      name: "Luigi Ferrari",
      role: "UI/UX Designer",
      location: "Rome, Italy",
      avatar: "LF",
      matchScore: 82,
      skills: ["Figma", "React", "Design Systems", "Accessibility"],
      experience: "5 years",
      availability: "Available",
      currentProject: "Mobile App Redesign",
      strengths: ["Design expertise", "Front-end skills", "User-focused"],
    },
  ];

  const mockProjects = [
    {
      id: "1",
      name: "AI-Powered Analytics Dashboard",
      description:
        "Build an intelligent analytics dashboard with ML predictions",
      matchScore: 92,
      branch: "Milan",
      duration: "6 months",
      teamSize: 8,
      requiredSkills: ["Python", "React", "TensorFlow", "PostgreSQL"],
      startDate: "Dec 2024",
      priority: "High",
    },
    {
      id: "2",
      name: "Cloud Migration Project",
      description: "Migrate legacy systems to Azure cloud infrastructure",
      matchScore: 87,
      branch: "Tirana",
      duration: "4 months",
      teamSize: 6,
      requiredSkills: ["Azure", "DevOps", "Docker", "Kubernetes"],
      startDate: "Jan 2025",
      priority: "Critical",
    },
    {
      id: "3",
      name: "Mobile Banking App",
      description: "Develop a secure mobile banking application",
      matchScore: 79,
      branch: "Rome",
      duration: "8 months",
      teamSize: 10,
      requiredSkills: ["React Native", "Node.js", "Security", "FinTech"],
      startDate: "Feb 2025",
      priority: "Medium",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                searchMode === "find-employees"
                  ? "Search by skills, role, location..."
                  : "Search by project name, technologies..."
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {searchMode === "find-employees"
              ? "Top Matching Employees"
              : "Recommended Projects"}
          </h2>
          <span className="text-gray-600">
            {searchMode === "find-employees"
              ? mockEmployees.length
              : mockProjects.length}{" "}
            results
          </span>
        </div>

        <div className="space-y-4">
          {searchMode === "find-employees"
            ? mockEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        {employee.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {employee.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              employee.availability === "Available"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {employee.availability}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{employee.role}</p>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{employee.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{employee.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{employee.currentProject}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {employee.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-700">
                            Key Strengths:
                          </p>
                          {employee.strengths.map((strength, idx) => (
                            <p key={idx} className="text-sm text-gray-600">
                              • {strength}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 text-center">
                      <div className="mb-2">
                        <div className="text-4xl font-bold text-green-600">
                          {employee.matchScore}
                        </div>
                        <div className="text-sm text-gray-500">Match Score</div>
                      </div>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all mb-2">
                        View Profile
                      </button>
                      <button className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all">
                        Request Connection
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : mockProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {project.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.priority === "Critical"
                              ? "bg-red-100 text-red-700"
                              : project.priority === "High"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {project.priority} Priority
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{project.branch}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{project.teamSize} members</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Required Skills:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.requiredSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 text-center">
                      <div className="mb-2">
                        <div className="text-4xl font-bold text-green-600">
                          {project.matchScore}
                        </div>
                        <div className="text-sm text-gray-500">Match Score</div>
                      </div>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all mb-2">
                        View Details
                      </button>
                      <button className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-all">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
