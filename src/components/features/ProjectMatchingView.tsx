// src/components/ProjectMatchingView.tsx
import { useState } from 'react';
import { ArrowLeft, TrendingUp, CheckCircle, AlertTriangle, Users, Code, MapPin, Calendar, Sparkles, MessageCircle } from 'lucide-react';

interface ProjectMatchingViewProps {
  projectId: string | null;
}

export default function ProjectMatchingView({ projectId }: ProjectMatchingViewProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  // Mock project data
  const project = {
    id: '1',
    name: 'AI Analytics Platform',
    projectCode: 'TS-AI-2024',
    description: 'Building ML-powered analytics dashboard with real-time insights',
    requiredSkills: [
      { name: 'Python', proficiency: 'Advanced', mandatory: true },
      { name: 'TensorFlow', proficiency: 'Intermediate', mandatory: true },
      { name: 'React', proficiency: 'Advanced', mandatory: true },
      { name: 'PostgreSQL', proficiency: 'Intermediate', mandatory: false },
    ],
    team: {
      required: 8,
      current: 6,
      missing: [
        { role: 'Backend Developer', count: 2, skills: ['Node.js', 'PostgreSQL'] }
      ]
    },
    startDate: '2024-12-01',
    deadline: '2024-12-15',
  };

  // Mock matching results
  const matches = [
    {
      id: '1',
      employee: {
        name: 'Marco Rossi',
        employeeCode: 'TS-2024-001',
        avatar: 'MR',
        role: 'Senior Full-Stack Developer',
        location: 'Tirana, Albania',
        yearsOfExperience: 8,
        availability: 'Available from Dec 1',
        currentProjects: ['Customer Portal'],
      },
      matchScore: 95,
      matchDetails: {
        skillMatch: 98,
        availabilityMatch: 100,
        experienceMatch: 92,
        locationMatch: 85,
      },
      matchedSkills: [
        { name: 'React', required: 'Advanced', has: 'Expert', match: 'perfect' },
        { name: 'Node.js', required: 'Advanced', has: 'Advanced', match: 'perfect' },
        { name: 'TypeScript', required: 'Advanced', has: 'Expert', match: 'perfect' },
        { name: 'PostgreSQL', required: 'Intermediate', has: 'Advanced', match: 'exceeds' },
      ],
      missingSkills: [
        { name: 'TensorFlow', required: 'Intermediate', gap: 'Not proficient' },
      ],
      strengths: [
        'Perfect match for required React and backend skills',
        'Available immediately with full capacity',
        'Strong track record with similar projects',
        'Located in same office for easy collaboration'
      ],
      challenges: [
        { issue: 'Limited ML/TensorFlow experience', severity: 'medium', mitigation: 'Can learn on the job or pair with ML specialist' }
      ],
      recommendation: {
        isRecommended: true,
        confidence: 95,
        reasoning: 'Excellent match with core skills and immediate availability. Minor ML skill gap can be addressed through training.',
      }
    },
    {
      id: '2',
      employee: {
        name: 'Elena Ferri',
        employeeCode: 'TS-2023-089',
        avatar: 'EF',
        role: 'Data Engineer',
        location: 'Tirana, Albania',
        yearsOfExperience: 6,
        availability: 'Partially available (20h/week)',
        currentProjects: ['Data Pipeline Framework'],
      },
      matchScore: 88,
      matchDetails: {
        skillMatch: 90,
        availabilityMatch: 60,
        experienceMatch: 85,
        locationMatch: 85,
      },
      matchedSkills: [
        { name: 'Python', required: 'Advanced', has: 'Advanced', match: 'perfect' },
        { name: 'TensorFlow', required: 'Intermediate', has: 'Intermediate', match: 'perfect' },
        { name: 'SQL', required: 'Intermediate', has: 'Expert', match: 'exceeds' },
      ],
      missingSkills: [
        { name: 'React', required: 'Advanced', gap: 'No experience' },
      ],
      strengths: [
        'Strong Python and ML/AI skills',
        'Experience with data analytics',
        'Same location for collaboration',
      ],
      challenges: [
        { issue: 'Limited availability (20h/week only)', severity: 'high', mitigation: 'Could work on ML components part-time' },
        { issue: 'No frontend experience', severity: 'high', mitigation: 'Focus on backend/ML work only' }
      ],
      recommendation: {
        isRecommended: true,
        confidence: 75,
        reasoning: 'Good fit for ML/data components but limited by part-time availability and lack of frontend skills.',
      }
    },
    {
      id: '3',
      employee: {
        name: 'Luigi Ferrari',
        employeeCode: 'TS-2021-023',
        avatar: 'LF',
        role: 'UI/UX Designer & Frontend Developer',
        location: 'Rome, Italy',
        yearsOfExperience: 7,
        availability: 'Available immediately',
        currentProjects: [],
      },
      matchScore: 82,
      matchDetails: {
        skillMatch: 75,
        availabilityMatch: 100,
        experienceMatch: 88,
        locationMatch: 70,
      },
      matchedSkills: [
        { name: 'React', required: 'Advanced', has: 'Advanced', match: 'perfect' },
        { name: 'TypeScript', required: 'Advanced', has: 'Advanced', match: 'perfect' },
        { name: 'UI/UX Design', required: 'Intermediate', has: 'Expert', match: 'exceeds' },
      ],
      missingSkills: [
        { name: 'Python', required: 'Advanced', gap: 'Limited experience' },
        { name: 'TensorFlow', required: 'Intermediate', gap: 'No experience' },
        { name: 'PostgreSQL', required: 'Intermediate', gap: 'Basic only' },
      ],
      strengths: [
        'Excellent frontend and React skills',
        'Strong UI/UX design capabilities',
        'Available immediately with full capacity',
        'Can own the entire frontend of the platform'
      ],
      challenges: [
        { issue: 'Limited backend experience', severity: 'medium', mitigation: 'Pair with backend developers' },
        { issue: 'Different location (Rome)', severity: 'low', mitigation: 'Remote work is possible' },
        { issue: 'No ML experience', severity: 'low', mitigation: 'Focus on frontend only' }
      ],
      recommendation: {
        isRecommended: true,
        confidence: 82,
        reasoning: 'Perfect for frontend development. Would need to work with backend/ML specialists.',
      }
    },
    {
      id: '4',
      employee: {
        name: 'Anna Bianchi',
        employeeCode: 'TS-2023-112',
        avatar: 'AB',
        role: 'DevOps Engineer',
        location: 'Milan, Italy',
        yearsOfExperience: 5,
        availability: 'Available from Dec 10',
        currentProjects: ['Infrastructure Automation'],
      },
      matchScore: 65,
      matchDetails: {
        skillMatch: 45,
        availabilityMatch: 90,
        experienceMatch: 70,
        locationMatch: 75,
      },
      matchedSkills: [
        { name: 'Docker', required: 'Basic', has: 'Expert', match: 'exceeds' },
        { name: 'Azure', required: 'Intermediate', has: 'Advanced', match: 'exceeds' },
      ],
      missingSkills: [
        { name: 'Python', required: 'Advanced', gap: 'Basic only' },
        { name: 'React', required: 'Advanced', gap: 'Limited experience' },
        { name: 'TensorFlow', required: 'Intermediate', gap: 'No experience' },
      ],
      strengths: [
        'Strong DevOps and infrastructure skills',
        'Can handle deployment and CI/CD',
        'Cloud platform expertise'
      ],
      challenges: [
        { issue: 'Limited development skills', severity: 'high', mitigation: 'Focus on infrastructure/deployment only' },
        { issue: 'No ML/AI experience', severity: 'high', mitigation: 'Not suitable for core development' }
      ],
      recommendation: {
        isRecommended: false,
        confidence: 45,
        reasoning: 'Skills mismatch. Better suited for infrastructure/DevOps role rather than core development.',
      }
    },
  ];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getMatchQualityBadge = (match: string) => {
    switch (match) {
      case 'perfect': return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">Perfect Match</span>;
      case 'exceeds': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Exceeds</span>;
      case 'adequate': return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">Adequate</span>;
      default: return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">Below Required</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Smart Team Matching</h1>
          <p className="text-gray-600 mt-1">AI-powered recommendations for: {project.name}</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
              <span className="px-2 py-1 bg-white text-gray-700 rounded text-xs font-mono">
                {project.projectCode}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{project.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-600">Team Capacity</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-gray-900">{project.team.current}/{project.team.required} members</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Start Date</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-gray-900">{project.startDate}</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Deadline</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-gray-900">{project.deadline}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-6 text-center bg-white rounded-lg p-4 shadow-md">
            <div className="text-orange-600 font-bold text-lg mb-1">Missing</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {project.team.required - project.team.current}
            </div>
            <div className="text-sm text-gray-600">team members</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Code className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold text-gray-700">Required Skills:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills.map((skill, idx) => (
              <span 
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  skill.mandatory 
                    ? 'bg-red-100 text-red-700 border border-red-300' 
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {skill.name} ({skill.proficiency})
                {skill.mandatory && ' *'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Top Candidates ({matches.length})</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Sorted by match score</span>
          </div>
        </div>

        <div className="space-y-4">
          {matches.map((match) => (
            <div 
              key={match.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all cursor-pointer ${
                selectedEmployee === match.id 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedEmployee(selectedEmployee === match.id ? null : match.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                    {match.employee.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{match.employee.name}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                        {match.employee.employeeCode}
                      </span>
                      {match.recommendation.isRecommended && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Recommended</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium mb-1">{match.employee.role}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{match.employee.location}</span>
                      </span>
                      <span>{match.employee.yearsOfExperience} years exp</span>
                      <span className="text-green-600 font-medium">{match.employee.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-6 text-center">
                  <div className={`w-20 h-20 ${getMatchScoreBg(match.matchScore)} rounded-xl flex items-center justify-center mb-2`}>
                    <span className={`text-3xl font-bold ${getMatchScoreColor(match.matchScore)}`}>
                      {match.matchScore}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Match Score</span>
                </div>
              </div>

              {/* Match Breakdown */}
              <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Skills</div>
                  <div className="flex items-center space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${match.matchDetails.skillMatch}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{match.matchDetails.skillMatch}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Availability</div>
                  <div className="flex items-center space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${match.matchDetails.availabilityMatch}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{match.matchDetails.availabilityMatch}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Experience</div>
                  <div className="flex items-center space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${match.matchDetails.experienceMatch}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{match.matchDetails.experienceMatch}%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Location</div>
                  <div className="flex items-center space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${match.matchDetails.locationMatch}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{match.matchDetails.locationMatch}%</span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedEmployee === match.id && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Matched Skills */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Matched Skills</span>
                    </h4>
                    <div className="space-y-2">
                      {match.matchedSkills.map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            {getMatchQualityBadge(skill.match)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Required: <span className="font-medium">{skill.required}</span> • 
                            Has: <span className="font-medium text-green-700">{skill.has}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {match.missingSkills.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span>Skill Gaps</span>
                      </h4>
                      <div className="space-y-2">
                        {match.missingSkills.map((skill, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <div className="text-sm text-orange-700">
                              Required: <span className="font-medium">{skill.required}</span> • 
                              Gap: <span className="font-medium">{skill.gap}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strengths */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>Key Strengths</span>
                    </h4>
                    <ul className="space-y-2">
                      {match.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-700">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  {match.challenges.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span>Potential Challenges</span>
                      </h4>
                      <div className="space-y-3">
                        {match.challenges.map((challenge, idx) => (
                          <div key={idx} className="bg-orange-50 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-medium text-gray-900">{challenge.issue}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                challenge.severity === 'high' ? 'bg-red-100 text-red-700' :
                                challenge.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {challenge.severity.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Mitigation:</span> {challenge.mitigation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Recommendation */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900">AI Recommendation</h4>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                            {match.recommendation.confidence}% confidence
                          </span>
                        </div>
                        <p className="text-gray-700">{match.recommendation.reasoning}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Assign to Project</span>
                    </button>
                    <button className="flex-1 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Contact Employee</span>
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Full Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Summary when Collapsed */}
              {selectedEmployee !== match.id && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Quick Summary:</span> {match.recommendation.reasoning.slice(0, 120)}...
                  </p>
                  <p className="text-xs text-blue-600 mt-2 font-medium">Click to see detailed analysis →</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}