// src/components/MatchingResults.tsx
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

interface MatchingResultsProps {
  projectId: Id<'projects'> | null;
  missingRole: string | null;
  keywords?: string | null;
  onBack: () => void;
  onViewEmployee: (employeeId: Id<'employees'>) => void;
}

export default function MatchingResults({ projectId, missingRole, keywords, onBack, onViewEmployee }: MatchingResultsProps) {
  const employeesData = useQuery(api.employees.list);
  const project = useQuery(api.projects.getById, projectId ? { id: projectId } : 'skip');

  if (!employeesData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Matching Candidates</h1>
        </div>
        <div className="py-16 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin" />
          <div className="text-sm text-gray-600">Loading candidates…</div>
        </div>
      </div>
    );
  }

  const normalize = (s: string) => {
    const x = String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (x === 'reactjs' || x === 'react') return 'react';
    if (x === 'nodejs' || x === 'node') return 'node';
    if (x === 'csharp' || x === 'cs' || x === 'c') return 'csharp';
    if (x === 'cplusplus' || x === 'cpp') return 'cpp';
    if (x === 'dotnet' || x === 'net' || x === 'netcore' || x === 'aspnet' || x === 'aspnetcore') return 'dotnet';
    if (x === 'k8s' || x === 'kubernetes') return 'kubernetes';
    if (x === 'golang' || x === 'go') return 'go';
    if (x === 'typescript') return 'typescript';
    if (x === 'javascript') return 'javascript';
    return x;
  };

  const employees = (employeesData ?? []).map((e: any) => {
    const skills: string[] = (e.skills ?? []).map((s: any) => (s?.name ?? '').toLowerCase());
    const skillsNorm: string[] = (e.skills ?? []).map((s: any) => normalize(s?.name ?? ''));
    const currentProjects: string[] = (e.currentProjects ?? []).map((p: any) => String(p).toLowerCase());
    const pastProjects: string[] = (e.pastProjects ?? []).map((p: any) => String(p).toLowerCase());
    const interests: string[] = (e.interests ?? []).map((i: any) => String(i).toLowerCase());
    const languages: string[] = (e.languages ?? []).map((l: any) => String(l).toLowerCase());
    return {
      raw: e,
      id: String(e._id),
      name: `${e.firstName} ${e.lastName}`,
      avatar: `${e.firstName?.[0] ?? ''}${e.lastName?.[0] ?? ''}`.toUpperCase(),
      role: e.role,
      location: e.location,
      yearsOfExperience: e.yearsOfExperience ?? 0,
      experience: `${e.yearsOfExperience ?? 0} years`,
      skills,
      skillsNorm,
      currentProjects,
      pastProjects,
      interests,
      languages,
    };
  });

  const roleTarget = (missingRole ?? '').toLowerCase().trim();
  const inputTokens = String(keywords ?? missingRole ?? '')
    .toLowerCase()
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const projectTokensNorm = ((project?.technologies ?? []) as string[]).map((t) => normalize(String(t)));
  const projectNames = [project?.name, project?.projectCode]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());
  // Primary tech strict filter: use first keyword as the primary technology if provided
  const primaryToken = inputTokens[0] || '';
  const primaryTokenNorm = normalize(primaryToken);

  // If a primary tech is provided, filter out employees who don't have it in their skills
  const eligibleEmployees = (primaryToken
    ? employees.filter((e) => e.skillsNorm.some((s: string) => s === primaryTokenNorm))
    : employees);

  const matches = eligibleEmployees
    .map((e) => {
      const roleMatch = roleTarget ? (e.role?.toLowerCase?.().includes(roleTarget) ?? false) : true;
      const tokens = [...inputTokens];

      // Count token matches against skills and interests/languages
      let tokenHits = 0;
      const matchedTokenSet = new Set<string>();
      const tokensNorm = tokens.map((t) => normalize(t));
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        const tn = tokensNorm[i];
        if (!t) continue;
        const hit = e.skillsNorm.some((s: string) => s === tn) || e.interests.some((i: string) => i.includes(t)) || e.languages.some((l: string) => l.includes(t));
        if (hit) {
          matchedTokenSet.add(tn);
          tokenHits += 1;
        }
      }

      // Project affinity: if employee projects include project name/code
      const projectAffinity = [...e.currentProjects, ...e.pastProjects].some((p) => projectNames.some((pn) => p.includes(pn)));

      // Secondary weight for project technologies overlapping with skills (normalized)
      // Give extra credit for secondary project techs in addition to the primary token
      const secondaryProjectTokensNorm = projectTokensNorm.filter((t) => !primaryTokenNorm || t !== primaryTokenNorm);
      const techHits = projectTokensNorm.filter((t) => e.skillsNorm.some((s: string) => s === t)).length;
      const secondaryTechHits = secondaryProjectTokensNorm.filter((t) => e.skillsNorm.some((s: string) => s === t)).length;

      // Score composition
      // Strong priority to primary tech, then other project techs, then role/exp; reduce token matches effect
      const primaryWeight = primaryToken ? (e.skillsNorm.some((s: string) => s === primaryTokenNorm) ? 50 : 0) : 0;
      const techWeight = Math.min(25, techHits * 5);
      const secondaryTechWeight = Math.min(20, secondaryTechHits * 10);
      const roleWeight = roleMatch ? 10 : 0;
      const tokenWeight = Math.min(10, tokenHits * 5);
      const projectWeight = projectAffinity ? 15 : 0;
      const expWeight = Math.min(10, Math.floor((e.yearsOfExperience || 0) / 2));
      const matchScore = Math.min(100, primaryWeight + secondaryTechWeight + techWeight + roleWeight + tokenWeight + projectWeight + expWeight);

      // Show all skills, prioritizing matched tokens; use original skill names for display
      const topMatchedSkills = (e.raw?.skills ?? [])
        .map((s: any) => {
          const name: string = String(s?.name ?? '');
          const lname = name.toLowerCase();
          const nname = normalize(lname);
          const tokensNormLocal = tokens.map((t) => normalize(t));
          return {
            name,
            match: tokensNormLocal.some((t) => nname === t) || projectTokensNorm.some((t) => nname === t),
          };
        })
        .sort((a: { name: string; match: boolean }, b: { name: string; match: boolean }) => Number(b.match) - Number(a.match));

      return {
        employeeId: e.raw?._id as Id<'employees'>,
        id: e.id,
        name: e.name,
        avatar: e.avatar,
        role: e.role,
        location: e.location,
        experience: e.experience,
        matchScore,
        skills: topMatchedSkills,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

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
                      {match.skills.map((skill: { name: string; match: boolean }, idx: number) => (
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
              <button
                onClick={() => onViewEmployee(match.employeeId)}
                className="px-4 py-2 text-[#0066CC] text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                View Profile →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}