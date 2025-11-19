// src/components/ProjectsList.tsx
import { Search, AlertCircle } from 'lucide-react';

interface ProjectsListProps {
  onViewProject: (projectId: string) => void;
}

export default function ProjectsList({ onViewProject }: ProjectsListProps) {
  const projects = [
    {
      id: '1',
      name: 'AI Analytics Platform',
      code: 'TS-AI-2024',
      location: 'Milan',
      teamSize: '6/8',
      missing: 2,
      deadline: '2024-12-15',
      status: 'at_risk'
    },
    {
      id: '2',
      name: 'Cloud Migration',
      code: 'TS-CLOUD-2024',
      location: 'Tirana',
      teamSize: '5/5',
      missing: 0,
      deadline: '2024-12-01',
      status: 'on_track'
    },
    {
      id: '3',
      name: 'Mobile Banking App',
      code: 'TS-MOBILE-2025',
      location: 'Rome',
      teamSize: '4/10',
      missing: 6,
      deadline: '2025-08-30',
      status: 'needs_team'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                    {project.code}
                  </span>
                  {project.missing > 0 && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{project.missing} missing</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>📍 {project.location}</span>
                  <span>👥 Team: {project.teamSize}</span>
                  <span>📅 {project.deadline}</span>
                </div>
              </div>
              <button 
                onClick={() => onViewProject(project.id)}
                className="px-6 py-2 bg-[#0066CC] text-white rounded-lg font-medium hover:bg-[#0052A3] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}