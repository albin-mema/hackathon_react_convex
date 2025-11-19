// src/components/ProjectDetail.tsx
import { useState } from 'react';
import { ArrowLeft, AlertCircle, Calendar, Users, DollarSign, GitCommit, CheckSquare } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

interface ProjectDetailProps {
  projectId: Id<'projects'> | null;
  onBack: () => void;
  onFindMatch: (projectId: Id<'projects'>, role: string) => void;
}

export default function ProjectDetail({ projectId, onBack, onFindMatch }: ProjectDetailProps) {
  const project = useQuery(api.projects.getById, projectId ? { id: projectId } : 'skip');
  const employeesData = useQuery(api.employees.list);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [desiredRole, setDesiredRole] = useState('');
  const [isLoadingMatch, setIsLoadingMatch] = useState(false);
  const [showFullLoading, setShowFullLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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
            <h1 className="text-3xl font-bold text-gray-900">{project?.name ?? 'Project'}</h1>
            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded text-sm font-mono">
              {project?.projectCode}
            </span>
          </div>
          <p className="text-gray-600 mt-2">{project?.description}</p>
        </div>
      </div>

      {/* Match Role Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => !isLoadingMatch && setShowMatchModal(false)} />
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md p-5 mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Find a Team Match</h3>

            {!isLoadingMatch ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role to search</label>
                  <input
                    type="text"
                    value={desiredRole}
                    onChange={(e) => setDesiredRole(e.target.value)}
                    placeholder="e.g. Frontend Developer, React, Backend, DevOps"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  />
                </div>

                {(project?.teamCapacity?.missingRoles?.length ?? 0) > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-gray-600 mb-2">Suggestions</div>
                    <div className="flex flex-wrap gap-2">
                      {(project?.teamCapacity?.missingRoles ?? []).slice(0,6).map((mr, idx) => (
                        <button
                          key={idx}
                          onClick={() => setDesiredRole(mr.role)}
                          className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-xs text-gray-800"
                        >
                          {mr.role}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowMatchModal(false)}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    disabled={isLoadingMatch}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!projectId) return;
                      const role = desiredRole.trim() || project?.teamCapacity?.missingRoles?.[0]?.role || 'Member';
                      // Close modal and show full page loading
                      setShowMatchModal(false);
                      setIsLoadingMatch(false);
                      setProgress(0);
                      setShowFullLoading(true);
                      // Fake progress animation
                      const start = Date.now();
                      const tick = setInterval(() => {
                        const elapsed = Date.now() - start;
                        const pct = Math.min(95, Math.floor((elapsed / 1200) * 95));
                        setProgress(pct);
                      }, 100);
                      setTimeout(() => {
                        clearInterval(tick);
                        setProgress(100);
                        setShowFullLoading(false);
                        onFindMatch(projectId, role);
                      }, 1200);
                    }}
                    className="px-4 py-2 bg-[#0066CC] text-white rounded-lg text-sm font-medium hover:bg-[#0052A3] transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin" />
                <div className="text-sm text-gray-600">Finding best matches…</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full-page loading overlay */}
      {showFullLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
          <div className="w-full max-w-md px-6">
            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-gray-900">We are finding the best match…</div>
              <div className="text-sm text-gray-600">Analyzing team needs and available candidates</div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-[#0066CC] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Deadline</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{project?.endDate ?? project?.startDate ?? '-'}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Budget Used</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {project?.budget ? (((project.budget.spent / project.budget.total) * 100).toFixed(0) + '%') : '-'}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Team Size</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(project?.teamCapacity?.currentSize ?? project?.teamMembers?.length ?? project?.teamSize ?? 0)}/
            {(project?.teamCapacity?.requiredSize ?? project?.teamSize ?? 0)}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Team</h2>
          <button
            onClick={() => setShowMatchModal(true)}
            className="px-4 py-2 bg-[#0066CC] text-white rounded-lg text-sm font-medium hover:bg-[#0052A3] transition-colors disabled:opacity-50"
          >
            Find Team Match
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Team Members (grouped by role) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Members ({project?.teamMembers?.length ?? 0})</h3>
            <div className="space-y-4">
              {(() => {
                const byEmail = new Map((employeesData ?? []).map((e: any) => [e.email, e]));
                const members = (project?.teamMembers ?? []).map((email) => {
                  const emp = byEmail.get(email);
                  const name = emp ? `${emp.firstName ?? ''} ${emp.lastName ?? ''}`.trim() : email;
                  const role = emp?.role ?? 'Member';
                  const initials = emp ? `${emp.firstName?.[0] ?? ''}${emp.lastName?.[0] ?? ''}`.toUpperCase() : email?.slice(0,2)?.toUpperCase();
                  return { email, name, role, initials };
                });
                const grouped: Record<string, { email: string; name: string; role: string; initials: string }[]> = {};
                for (const m of members) {
                  const key = m.role || 'Member';
                  (grouped[key] ??= []).push(m);
                }
                const roles = Object.keys(grouped).sort();
                return roles.map((role) => (
                  <div key={role} className="">
                    <div className="text-xs font-semibold text-gray-600 mb-2">{role} ({grouped[role].length})</div>
                    <div className="space-y-2">
                      {grouped[role].map((m) => (
                        <div key={m.email} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {m.initials}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{m.name}</div>
                            <div className="text-xs text-gray-600">{m.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Open Positions */}
          {(project?.teamCapacity?.missingRoles?.length ?? 0) > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Open Positions ({project?.teamCapacity?.missingRoles?.length})</h3>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                {(project?.teamCapacity?.missingRoles ?? []).map((missing, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="font-semibold text-gray-900">{missing.role}</h4>
                      <button 
                        onClick={() => projectId && onFindMatch(projectId, missing.role)}
                        className="px-4 py-1.5 bg-[#0066CC] text-white rounded-lg text-xs font-medium hover:bg-[#0052A3] transition-colors whitespace-nowrap"
                      >
                        Find Match
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(missing.skills ?? []).map((skill, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 bg-white text-gray-700 rounded text-xs border border-gray-200">{skill}</span>
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
          {(project?.technologies ?? []).map((tech, idx) => (
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
              <div className="text-2xl font-bold text-gray-900">{project?.totalCommits ?? 0}</div>
              <p className="text-sm text-gray-600">Total commits</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckSquare className="w-6 h-6 text-[#0066CC]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {project?.totalJiraTicketsClosed ?? 0}/{project?.totalJiraTickets ?? 0}
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
              {(project?.recentCommits ?? []).map((commit, idx) => (
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
              {(project?.recentJiraTickets ?? []).map((ticket, idx) => (
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