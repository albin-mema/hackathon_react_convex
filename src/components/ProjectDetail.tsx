// src/components/ProjectDetail.tsx
import { ArrowLeft, AlertCircle, Calendar, Users, DollarSign, GitCommit, CheckSquare } from 'lucide-react';

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
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    totalCommits: 342,
    totalJiraTickets: 48,
    totalJiraTicketsClosed: 35,
    recentCommits: [
      { commitHash: 'a3f2b1c', message: 'Add ML model training pipeline', author: 'Marco Rossi', timestamp: Date.now() - 3600000 },
      { commitHash: 'b8e4d2f', message: 'Update data preprocessing', author: 'Sofia Greco', timestamp: Date.now() - 7200000 },
      { commitHash: 'c9f1a3e', message: 'Fix API endpoint response', author: 'Elena Ferri', timestamp: Date.now() - 14400000 },
      { commitHash: 'd4a8b9c', message: 'Implement caching layer', author: 'Anna Bianchi', timestamp: Date.now() - 21600000 },
      { commitHash: 'e7c2f1d', message: 'Add unit tests for API', author: 'Paolo Conti', timestamp: Date.now() - 28800000 },
    ],
    recentJiraTickets: [
      { ticketId: 'TS-AI-123', title: 'Implement model evaluation metrics', status: 'In Progress', assignee: 'Marco Rossi', updatedAt: Date.now() - 3600000 },
      { ticketId: 'TS-AI-122', title: 'Setup AWS infrastructure', status: 'Done', assignee: 'Sofia Greco', updatedAt: Date.now() - 86400000 },
      { ticketId: 'TS-AI-121', title: 'Data pipeline optimization', status: 'In Review', assignee: 'Elena Ferri', updatedAt: Date.now() - 7200000 },
      { ticketId: 'TS-AI-120', title: 'Design system architecture', status: 'Done', assignee: 'Luigi Ferrari', updatedAt: Date.now() - 172800000 },
      { ticketId: 'TS-AI-119', title: 'Configure CI/CD pipeline', status: 'Done', assignee: 'Anna Bianchi', updatedAt: Date.now() - 259200000 },
      { ticketId: 'TS-AI-118', title: 'Write integration tests', status: 'In Progress', assignee: 'Paolo Conti', updatedAt: Date.now() - 14400000 },
    ]
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded text-sm font-mono">
              {project.code}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{project.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Deadline</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{project.deadline}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Budget Used</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {((project.budget.spent / project.budget.total) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Team Size</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {project.team.members.length}/{project.team.members.length + project.team.missing.length}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Team</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Team Members */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Members ({project.team.members.length})</h3>
            <div className="space-y-2">
              {project.team.members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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

          {/* Open Positions */}
          {project.team.missing.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Open Positions ({project.team.missing.length})</h3>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                {project.team.missing.map((missing, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="font-semibold text-gray-900">{missing.role}</h4>
                      <button 
                        onClick={() => onFindMatch(project.id, missing.role)}
                        className="px-4 py-1.5 bg-[#0066CC] text-white rounded-lg text-xs font-medium hover:bg-[#0052A3] transition-colors whitespace-nowrap"
                      >
                        Find Match
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {missing.skills.map((skill, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 bg-white text-gray-700 rounded text-xs border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Activity Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Activity Overview</h2>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <GitCommit className="w-6 h-6 text-[#0066CC]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{project.totalCommits}</div>
              <p className="text-sm text-gray-600">Total commits</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckSquare className="w-6 h-6 text-[#0066CC]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {project.totalJiraTicketsClosed}/{project.totalJiraTickets}
              </div>
              <p className="text-sm text-gray-600">Tasks completed</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Commits */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <GitCommit className="w-4 h-4" />
              Recent Commits
            </h3>
            <div className="space-y-2">
              {project.recentCommits.map((commit, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#0066CC]">{commit.commitHash}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{formatTimeAgo(commit.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">{commit.message}</p>
                  <p className="text-xs text-gray-600">{commit.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jira Tickets */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Recent Tasks
            </h3>
            <div className="space-y-2">
              {project.recentJiraTickets.map((ticket, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#0066CC]">{ticket.ticketId}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{formatTimeAgo(ticket.updatedAt)}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{ticket.title}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      ticket.status === 'Done' ? 'bg-white text-gray-700 border border-gray-200' :
                      ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      ticket.status === 'In Review' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      'bg-white text-gray-600 border border-gray-200'
                    }`}>
                      {ticket.status}
                    </span>
                    {ticket.assignee && (
                      <span className="text-xs text-gray-600">{ticket.assignee}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}