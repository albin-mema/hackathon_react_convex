// src/components/EmployeeDetail.tsx
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { ArrowLeft, MapPin, GitCommit, CheckSquare, Mail, Briefcase, Sparkles } from 'lucide-react';

interface EmployeeDetailProps {
  employeeId: Id<'employees'> | null;
  onBack: () => void;
}

export default function EmployeeDetail({ employeeId, onBack }: EmployeeDetailProps) {
  const employee = useQuery(api.employees.getById, employeeId ? { id: employeeId } : 'skip');

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

  const initials = `${employee?.firstName?.[0] ?? ''}${employee?.lastName?.[0] ?? ''}`.toUpperCase();
  const name = `${employee?.firstName ?? ''} ${employee?.lastName ?? ''}`.trim();

  const joinedYear = typeof employee?.yearsInTeamSystem === 'number'
    ? new Date().getFullYear() - employee.yearsInTeamSystem
    : null;

  return (
    <div className="space-y-5">
      {/* Compact Profile Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors self-start">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-[#0066CC] rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900">{name || 'Employee'}</h1>
                {employee?.role && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{employee.role}</span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{employee?.location ?? '-'}</span>
                </span>
              </div>
              {/* Inline stats */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                <div className="rounded-lg border border-gray-100 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Commits</div>
                  <div className="text-lg font-semibold text-gray-900">{employee?.totalCommits ?? 0}</div>
                </div>
                <div className="rounded-lg border border-gray-100 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Tasks Closed</div>
                  <div className="text-lg font-semibold text-gray-900">{employee?.totalJiraTasksClosed ?? 0}</div>
                </div>
                <div className="rounded-lg border border-gray-100 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Experience</div>
                  <div className="text-lg font-semibold text-gray-900">{employee?.yearsOfExperience ?? 0} yrs</div>
                </div>
                <div className="rounded-lg border border-gray-100 p-3">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Joined</div>
                  <div className="text-sm font-medium text-gray-900">
                    {joinedYear ? `Since ${joinedYear}` : '-'}
                    {typeof employee?.yearsInTeamSystem === 'number' && (
                      <span className="text-xs text-gray-500 ml-1">({employee.yearsInTeamSystem}y)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact buttons */}
          <div className="flex items-start gap-2 ml-auto">
            <a
              href={employee?.email ? `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(employee.email)}` : '#'}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${employee?.email ? 'text-purple-700 border-purple-200 hover:bg-purple-50' : 'text-gray-400 border-gray-200 cursor-not-allowed'}`}
              aria-disabled={!employee?.email}
            >
              {/* Microsoft Teams Icon (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4" aria-hidden>
                <path fill="#6264A7" d="M23 12h11a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H23a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z"/>
                <path fill="#464EB8" d="M28 10a4 4 0 0 1 4-4h2a4 4 0 0 1 0 8h-2a4 4 0 0 1-4-4z"/>
                <path fill="#7B83EB" d="M12 18a3 3 0 0 1 3-3h10v18H15a3 3 0 0 1-3-3V18z"/>
                <path fill="#fff" d="M17 20h8v2h-3v8h-2v-8h-3v-2z"/>
              </svg>
              Teams
            </a>
            <a
              href={employee?.email ? `mailto:${employee.email}` : '#'}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${employee?.email ? 'text-[#0A66C2] border-[#B3D7F2] hover:bg-[#E6F2FB]' : 'text-gray-400 border-gray-200 cursor-not-allowed'}`}
              aria-disabled={!employee?.email}
            >
              {/* Microsoft Outlook Icon (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4" aria-hidden>
                <path fill="#0A66C2" d="M28 8h10a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H28V8z"/>
                <path fill="#0078D4" d="M6 14h22v20H6a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2z"/>
                <path fill="#fff" d="M10 20h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm0 0 6 4 6-4"/>
              </svg>
              Outlook
            </a>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email
            </div>
            <div className="text-gray-900 text-sm break-all">{employee?.email ?? '-'}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> Business Unit / Department
            </div>
            <div className="text-gray-900 text-sm">
              <span className="font-medium">{employee?.businessUnitName ?? employee?.businessUnitId ?? '-'}</span>
              {employee?.department && <span className="text-gray-500"> • {employee.department}</span>}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Languages
            </div>
            <div className="flex flex-wrap gap-2">
              {(employee?.languages ?? []).map((lang, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded text-xs border border-gray-200">{lang}</span>
              ))}
              {(employee?.languages ?? []).length === 0 && (
                <span className="text-sm text-gray-500">-</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {(employee?.skills ?? []).map((s, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200">
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      {(employee?.softSkills?.length ?? 0) > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Soft Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(employee?.softSkills ?? []).map((s, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm border border-gray-200">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {(employee?.interests?.length ?? 0) > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {(employee?.interests ?? []).map((i, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      {(employee?.activities?.length ?? 0) > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(employee?.activities ?? []).map((a, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC] inline-block" />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Current</h3>
            <div className="flex flex-wrap gap-2">
              {(employee?.currentProjects ?? []).map((p, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-100 font-medium">
                  {p}
                </span>
              ))}
              {(employee?.currentProjects ?? []).length === 0 && (
                <span className="text-sm text-gray-500">-</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Past</h3>
            <div className="flex flex-wrap gap-2">
              {(employee?.pastProjects ?? []).map((p, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded text-xs border border-gray-200">
                  {p}
                </span>
              ))}
              {(employee?.pastProjects ?? []).length === 0 && (
                <span className="text-sm text-gray-500">-</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Activity</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Commits */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <GitCommit className="w-4 h-4" />
              Recent Commits
            </h3>
            <div className="space-y-2">
              {(employee?.recentCommits ?? []).map((c, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#0066CC]">{c.commitHash}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{typeof c.timestamp === 'number' ? formatTimeAgo(c.timestamp) : '-'}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">{c.message}</p>
                  <p className="text-xs text-gray-600">Repo: {c.repository}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jira Tasks */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Recent Jira Tasks
            </h3>
            <div className="space-y-2">
              {((employee?.recentJiraTasks ?? []).length === 0) && (
                <div className="text-sm text-gray-500">No recent Jira tasks.</div>
              )}
              {(employee?.recentJiraTasks ?? []).map((t: any, idx: number) => {
                const ts = typeof t.closedAt === 'number' ? t.closedAt : (typeof t.timestamp === 'number' ? t.timestamp : undefined);
                return (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs text-[#0066CC]">{t.taskId}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{typeof ts === 'number' ? formatTimeAgo(ts) : '-'}</span>
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{t.title}</p>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      t.status === 'Closed' ? 'bg-white text-gray-700 border border-gray-200' :
                      t.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-white text-gray-600 border border-gray-200'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
