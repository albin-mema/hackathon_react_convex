// src/components/ProjectsList.tsx
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

interface ProjectsListProps {
  onViewProject: (projectId: Id<'projects'>) => void;
}

export default function ProjectsList({ onViewProject }: ProjectsListProps) {
  const data = useQuery(api.projects.list);
  const projects = (data ?? []).map((p) => ({
    _id: p._id as Id<'projects'>,
    name: p.name,
    code: p.projectCode,
    description: p.description,
    location: p.location,
    status: p.status,
    teamCapacity: {
      requiredSize: p.teamCapacity?.requiredSize ?? p.teamSize ?? 0,
      currentSize: p.teamCapacity?.currentSize ?? p.teamMembers?.length ?? 0,
    },
    deadline: p.endDate ?? p.startDate,
    technologies: p.technologies ?? [],
  }));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">{projects.length} active projects</p>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const missingTeamMembers = project.teamCapacity.requiredSize - project.teamCapacity.currentSize;
          
          return (
            <div 
              key={String(project._id)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#0066CC] transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {project.name}
                    </h2>
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded text-sm font-mono">
                      {project.code}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => onViewProject(project._id)}
                  className="px-5 py-2 bg-[#0066CC] text-white rounded-lg font-medium hover:bg-[#0052A3] transition-colors"
                >
                  View Details
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{project.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {project.teamCapacity.currentSize} / {project.teamCapacity.requiredSize} members
                    {missingTeamMembers > 0 && (
                      <span className="text-gray-400 ml-1">({missingTeamMembers} needed)</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}