// src/components/features/EmployeeMatchingView.tsx
import { useState } from 'react';
import { Search, Filter, Heart, MessageCircle, Users, Sparkles, Coffee, Dumbbell, Book, Code } from 'lucide-react';

export default function EmployeeMatchingView() {
  const [matchPurpose, setMatchPurpose] = useState<string>('collaboration');

  const purposes = [
    { id: 'collaboration', label: 'Collaboration', icon: Users },
    { id: 'mentorship', label: 'Mentorship', icon: Sparkles },
    { id: 'social', label: 'Social', icon: Coffee },
    { id: 'skill-exchange', label: 'Skill Exchange', icon: Code },
  ];

  const mockMatches = [
    {
      id: '1',
      name: 'Sofia Greco',
      role: 'Senior Backend Developer',
      location: 'Milan, Italy',
      avatar: 'SG',
      matchScore: 94,
      matchReason: 'Complementary Skills & Shared Interests',
      sharedSkills: ['Python', 'Microservices'],
      complementarySkills: ['Your: Frontend', 'Theirs: Backend'],
      personality: 'Collaborative, Analytical, Creative',
      interests: ['Hiking', 'Tech Podcasts', 'Board Games'],
      activities: ['Book Club', 'Coding Challenges'],
      availability: 'Open to connect',
      synergies: [
        'Perfect full-stack collaboration potential',
        'Both interested in system architecture',
        'Compatible work styles (collaborative)'
      ]
    },
    {
      id: '2',
      name: 'Alessio Romano',
      role: 'UX Designer',
      location: 'Rome, Italy',
      avatar: 'AR',
      matchScore: 89,
      matchReason: 'Perfect for Cross-Functional Collaboration',
      sharedSkills: ['Figma', 'User Research'],
      complementarySkills: ['Your: Development', 'Theirs: Design'],
      personality: 'Creative, Empathetic, Detail-oriented',
      interests: ['Photography', 'Art Museums', 'Coffee'],
      activities: ['Design Workshops', 'Lunch & Learn'],
      availability: 'Available for mentoring',
      synergies: [
        'Bridge design and development gap',
        'Shared passion for user experience',
        'Mentorship opportunity available'
      ]
    },
    {
      id: '3',
      name: 'Elena Ferri',
      role: 'Data Scientist',
      location: 'Tirana, Albania',
      avatar: 'EF',
      matchScore: 85,
      matchReason: 'Shared Learning Goals & Activities',
      sharedSkills: ['Machine Learning', 'Statistics'],
      complementarySkills: ['Your: Engineering', 'Theirs: ML/AI'],
      personality: 'Curious, Analytical, Team-player',
      interests: ['Running', 'Data Viz', 'Cooking'],
      activities: ['Fitness Group', 'Hackathons', 'AI Study Group'],
      availability: 'Looking for project partners',
      synergies: [
        'Combine data science with engineering',
        'Both love hackathons and innovation',
        'Same location - easy to meet'
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect with Colleagues</h1>
            <p className="text-gray-600">Find teammates with complementary skills and shared interests</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Purpose Selection */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">I'm looking for:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {purposes.map((purpose) => {
              const Icon = purpose.icon;
              return (
                <button
                  key={purpose.id}
                  onClick={() => setMatchPurpose(purpose.id)}
                  className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                    matchPurpose === purpose.id
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{purpose.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by skills, interests, location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            Find Matches
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Top Matches</h2>
          <span className="text-gray-600">{mockMatches.length} people</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mockMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {match.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{match.name}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {match.availability}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{match.role}</p>
                    <p className="text-gray-500 text-sm">{match.location}</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">{match.matchScore}</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>

              {/* <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-900">{match.matchReason}</span>
                </div>
                <div className="space-y-2">
                  {match.synergies.map((synergy, idx) => (
                    <p key={idx} className="text-sm text-purple-800">• {synergy}</p>
                  ))}
                </div>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Shared Skills */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Code className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Shared Skills</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.sharedSkills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <h4 className="font-semibold text-gray-900">Shared Interests</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.interests.map((interest, idx) => (
                      <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Complementary Skills */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Complementary Skills</h4>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {match.complementarySkills.map((skill, idx) => (
                      <p key={idx}>• {skill}</p>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Coffee className="w-5 h-5 text-orange-600" />
                    <h4 className="font-semibold text-gray-900">Activities</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {match.activities.map((activity, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personality */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Personality Traits</h4>
                <p className="text-gray-600 text-sm">{match.personality}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-all">
                  <Coffee className="w-5 h-5" />
                  <span>Suggest Coffee Chat</span>
                </button>
                <button className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Activities */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Suggested Group Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Coffee className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Coffee & Code</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Weekly casual meetup to discuss tech trends</p>
            <p className="text-xs text-gray-500">8 interested • Fridays 3PM</p>
          </div>

          <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Fitness Group</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Morning runs and gym sessions</p>
            <p className="text-xs text-gray-500">12 interested • Mon/Wed/Fri 7AM</p>
          </div>

          <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Book Club</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Monthly tech book discussions</p>
            <p className="text-xs text-gray-500">15 interested • Last Friday of month</p>
          </div>
        </div>
      </div>
    </div>
  );
}