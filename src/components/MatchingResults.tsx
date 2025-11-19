// src/components/MatchingResults.tsx
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';

interface MatchingResultsProps {
  projectId: string | null;
  missingRole: string | null;
  onBack: () => void;
}

export default function MatchingResults({ projectId, missingRole, onBack }: MatchingResultsProps) {
  const matches = [
    {
      id: '1',
      name: 'Marco Rossi',
      avatar: 'MR',
      role: 'Senior Full-Stack Developer',
      location: 'Tirana',
      experience: '8 years',
      availability: 'Available Dec 1',
      matchScore: 95,
      skills: [
        { name: 'React', match: true },
        { name: 'TypeScript', match: true },
        { name: 'Tailwind CSS', match: true },
      ]
    },
    {
      id: '2',
      name: 'Luigi Ferrari',
      avatar: 'LF',
      role: 'Frontend Developer',
      location: 'Rome',
      experience: '7 years',
      availability: 'Available Now',
      matchScore: 92,
      skills: [
        { name: 'React', match: true },
        { name: 'TypeScript', match: true },
        { name: 'Tailwind CSS', match: true },
      ]
    },
    {
      id: '3',
      name: 'Giulia Mancini',
      avatar: 'GM',
      role: 'Frontend Developer',
      location: 'Milan',
      experience: '4 years',
      availability: 'Available Dec 15',
      matchScore: 85,
      skills: [
        { name: 'React', match: true },
        { name: 'TypeScript', match: true },
        { name: 'CSS', match: false },
      ]
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matching Candidates</h1>
          <p className="text-gray-600">For: <span className="font-semibold">{missingRole}</span></p>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {matches.map((match) => (
          <div 
            key={match.id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-14 h-14 bg-[#0066CC] rounded-lg flex items-center justify-center text-white text-lg font-bold">
                  {match.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{match.name}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      {match.availability}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{match.role}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{match.location}</span>
                    </span>
                    <span>{match.experience}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          skill.match 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {skill.match && <CheckCircle className="w-3 h-3 inline mr-1" />}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ml-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-green-700">{match.matchScore}</span>
                </div>
                <span className="text-xs text-gray-600">Match</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
              <button className="flex-1 px-4 py-2 bg-[#0066CC] text-white rounded-lg font-medium hover:bg-[#0052A3] transition-colors">
                Assign to Project
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}