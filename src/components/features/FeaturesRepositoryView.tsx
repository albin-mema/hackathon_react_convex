// src/components/features/FeaturesRepositoryView.tsx
import { useState } from 'react';
import { Search, Star, Download, GitBranch, CheckCircle, AlertCircle, TrendingUp, Code } from 'lucide-react';

export default function FeaturesRepositoryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Features', count: 89 },
    { id: 'ui', label: 'UI Components', count: 24 },
    { id: 'api', label: 'API Services', count: 18 },
    { id: 'auth', label: 'Authentication', count: 12 },
    { id: 'ai', label: 'AI/ML', count: 15 },
    { id: 'data', label: 'Data Processing', count: 20 },
  ];

  const mockFeatures = [
    {
      id: '1',
      name: 'Smart Authentication Module',
      shortDescription: 'Complete OAuth2/OIDC authentication with MFA support',
      category: 'Authentication',
      icon: '🔐',
      status: 'Stable',
      version: '2.4.1',
      technologies: ['Node.js', 'JWT', 'Redis', 'OAuth2'],
      downloads: 45,
      rating: 4.8,
      reviews: 12,
      branches: ['Milan', 'Tirana', 'Rome'],
      author: 'Marco Rossi',
      lastUpdated: '2 days ago',
      quality: {
        testCoverage: 94,
        documentation: 'Excellent',
        maintenance: 'Active'
      },
      tags: ['Security', 'OAuth', 'MFA', 'SSO'],
      timeSaved: '40 hours'
    },
    {
      id: '2',
      name: 'AI Content Analyzer',
      shortDescription: 'ML-powered content analysis and classification service',
      category: 'AI/ML',
      icon: '🤖',
      status: 'Production',
      version: '1.8.0',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
      downloads: 28,
      rating: 4.6,
      reviews: 8,
      branches: ['Milan', 'Pesaro'],
      author: 'Sofia Greco',
      lastUpdated: '1 week ago',
      quality: {
        testCoverage: 87,
        documentation: 'Good',
        maintenance: 'Active'
      },
      tags: ['AI', 'NLP', 'Classification', 'API'],
      timeSaved: '60 hours'
    },
    {
      id: '3',
      name: 'Data Pipeline Framework',
      shortDescription: 'Scalable ETL framework for data processing workflows',
      category: 'Data Processing',
      icon: '⚡',
      status: 'Stable',
      version: '3.2.0',
      technologies: ['Python', 'Apache Spark', 'Airflow', 'PostgreSQL'],
      downloads: 52,
      rating: 4.9,
      reviews: 18,
      branches: ['Milan', 'Tirana', 'Rome', 'Pesaro'],
      author: 'Elena Ferri',
      lastUpdated: '3 days ago',
      quality: {
        testCoverage: 91,
        documentation: 'Excellent',
        maintenance: 'Active'
      },
      tags: ['ETL', 'Big Data', 'Pipeline', 'Automation'],
      timeSaved: '80 hours'
    },
    {
      id: '4',
      name: 'React Design System',
      shortDescription: 'Comprehensive UI component library with theme support',
      category: 'UI Components',
      icon: '🎨',
      status: 'Production',
      version: '4.1.2',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
      downloads: 67,
      rating: 4.7,
      reviews: 22,
      branches: ['All Branches'],
      author: 'Luigi Ferrari',
      lastUpdated: '5 days ago',
      quality: {
        testCoverage: 88,
        documentation: 'Excellent',
        maintenance: 'Active'
      },
      tags: ['UI', 'Components', 'Design', 'Accessibility'],
      timeSaved: '100 hours'
    },
  ];

  const trendingFeatures = [
    { name: 'Smart Authentication Module', growth: '+45%' },
    { name: 'React Design System', growth: '+38%' },
    { name: 'Data Pipeline Framework', growth: '+32%' },
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search features by name, technology, or tag..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Available Features</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              + Submit Feature
            </button>
          </div>

          {mockFeatures.map((feature) => (
            <div key={feature.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{feature.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        feature.status === 'Stable' ? 'bg-green-100 text-green-700' :
                        feature.status === 'Production' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {feature.status}
                      </span>
                      <span className="text-sm text-gray-500">v{feature.version}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{feature.shortDescription}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {feature.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{feature.downloads} uses</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{feature.rating} ({feature.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-4 h-4" />
                        <span>{feature.branches.length} branches</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{feature.quality.testCoverage}% Tests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{feature.quality.documentation} Docs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700">{feature.quality.maintenance}</span>
                      </div>
                    </div>

                    {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-semibold text-green-800">
                        ⏱️ Estimated time saved: <span className="text-green-900">{feature.timeSaved}</span>
                      </p>
                    </div> */}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        By {feature.author} • Updated {feature.lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 border-2 border-orange-600 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-all">
                  Clone & Use
                </button>
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all">
                  <Star className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Features */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-900">Trending This Week</h3>
            </div>
            <div className="space-y-3">
              {trendingFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{feature.name}</p>
                  </div>
                  <span className="text-green-600 font-semibold text-sm">{feature.growth}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
            <h3 className="font-bold text-xl mb-3">Have a Reusable Feature?</h3>
            <p className="text-orange-100 mb-4 text-sm">
              Share your work and help other teams save time!
            </p>
            <button className="w-full px-4 py-3 bg-white text-orange-600 rounded-lg font-medium hover:shadow-lg transition-all">
              Submit Your Feature
            </button>
          </div>

          {/* Top Contributors */}
          {/* <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 mb-4">Top Contributors</h3>
            <div className="space-y-3">
              {['Marco Rossi', 'Sofia Greco', 'Elena Ferri'].map((name, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{[5, 3, 4][idx]} features</p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}