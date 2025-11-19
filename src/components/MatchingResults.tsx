// src/components/MatchingResults.tsx
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

interface MatchingResultsProps {
  projectId: Id<'projects'> | null;
  missingRole: string | null;
  onBack: () => void;
}

export default function MatchingResults({ projectId: _projectId, missingRole, onBack }: MatchingResultsProps) {
  const employeesData = useQuery(api.employees.list);
  const employees = (employeesData ?? []).map((e) => ({
    id: String(e._id),
    name: `${e.firstName} ${e.lastName}`,
    avatar: `${e.firstName?.[0] ?? ''}${e.lastName?.[0] ?? ''}`.toUpperCase(),
    role: e.role,
    location: e.location,
    experience: `${e.yearsOfExperience ?? 0} years`,
    skillsList: (e.skills ?? []).map((s: any) => s.name?.toLowerCase?.()),
  }));

  const target = (missingRole ?? '').toLowerCase();
  const matches = employees
    .map((e) => {
      const roleMatch = target ? e.role?.toLowerCase?.().includes(target) : true;
      const skills = (e.skillsList ?? []).slice(0, 3);
      const matchScore = Math.min(100, (roleMatch ? 80 : 50) + (skills.length * 5));
      return {
        id: e.id,
        name: e.name,
        avatar: e.avatar,
        role: e.role,
        location: e.location,
        experience: e.experience,
        matchScore,
        skills: skills.map((name) => ({ name, match: true })),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

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
          <h1 className="text-3xl font-bold text-gray-900">Matching Candidates</h1>
          <p className="text-gray-600 mt-1">
            Position: <span className="font-semibold">{missingRole}</span> • {matches.length} candidates found
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {matches.map((match) => (
          <div 
            key={match.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#0066CC] transition-all duration-200"
          >
            <div className="flex items-start gap-5">
              {/* Avatar and Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-[#0066CC] rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {match.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{match.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{match.role}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{match.location}</span>
                    </span>
                    <span>•</span>
                    <span>{match.experience}</span>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {match.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className={`px-2.5 py-1 rounded text-xs font-medium border ${
                            skill.match 
                              ? 'bg-blue-50 text-blue-700 border-blue-200' 
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          {skill.match && <CheckCircle className="w-3 h-3 inline mr-1" />}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Score */}
              <div className="text-center flex-shrink-0">
                <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center mb-2 border-2 border-blue-200">
                  <div>
                    <div className="text-3xl font-bold text-[#0066CC]">{match.matchScore}</div>
                    <div className="text-xs text-gray-600">%</div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium">Match Score</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-5 border-t border-gray-100 flex justify-end">
              <button className="px-4 py-2 text-[#0066CC] text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors">
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}