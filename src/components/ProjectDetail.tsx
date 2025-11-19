// src/components/ProjectDetail.tsx
import { ArrowLeft, AlertCircle, Calendar, Users, DollarSign } from 'lucide-react';

interface ProjectDetailProps {
  projectId: string | null;
  onBack: () => void;
  onFindMatch: (projectId: string, role: string) => void;
}

export default function ProjectDetail({ projectId, onBack, onFindMatch }: ProjectDetailProps) {
  const project = {
    id: '1',
    name: 'AI Analytics Platform',
    code: 'TS-AI-2024',
    description: 'Building ML-powered analytics dashboard with real-time insights',
    location: 'Milan',
    deadline: '2024-12-15',
    budget: { spent: 127500, total: 150000 },
    team: {
      members: [
        { name: 'Marco Rossi', role: 'Team Lead', avatar: 'MR' },
        { name: 'Sofia Greco', role: 'Backend Dev', avatar: 'SG' },
        { name: 'Elena Ferri', role: 'Data Engineer', avatar: 'EF' },
        { name: 'Luigi Ferrari', role: 'UI/UX', avatar: 'LF' },
        { name: 'Anna Bianchi', role: 'DevOps', avatar: 'AB' },
        { name: 'Paolo Conti', role: 'QA', avatar: 'PC' },
      ],
      missing: [
        { role: 'Frontend Developer', skills: ['React', 'TypeScript', 'Tailwind'] },
        { role: 'Backend Developer', skills: ['Node.js', 'PostgreSQL'] },
      ]
    },
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL', 'Docker']
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
              {project.code}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{project.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Deadline</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{project.deadline}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm">Budget</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {((project.budget.spent / project.budget.total) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm">Team</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            {project.team.members.length}/{project.team.members.length + project.team.missing.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missing Team */}
        {project.team.missing.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h2 className="font-bold text-gray-900">Missing Team Members</h2>
            </div>
            <div className="space-y-3">
              {project.team.missing.map((missing, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{missing.role}</h3>
                      <div className="flex flex-wrap gap-1">
                        {missing.skills.map((skill, sidx) => (
                          <span key={sidx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => onFindMatch(project.id, missing.role)}
                      className="ml-4 px-4 py-2 bg-[#0066CC] text-white rounded-lg text-sm font-medium hover:bg-[#0052A3] transition-colors whitespace-nowrap"
                    >
                      Find Match
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Team */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="font-bold text-gray-900 mb-4">Current Team</h2>
          <div className="space-y-2">
            {project.team.members.map((member, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {member.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                  <div className="text-xs text-gray-600">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="font-bold text-gray-900 mb-3">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}