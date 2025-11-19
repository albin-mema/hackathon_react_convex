// src/components/ManagerDashboard.tsx
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Briefcase, DollarSign, Calendar } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function ManagerDashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { 
      label: 'Active Projects', 
      value: '12', 
      change: '+2 this month',
      trend: 'up',
      icon: Briefcase, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Team Members', 
      value: '45', 
      change: '38 available',
      trend: 'neutral',
      icon: Users, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Projects at Risk', 
      value: '3', 
      change: 'Need attention',
      trend: 'down',
      icon: AlertTriangle, 
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    },
    { 
      label: 'Budget Utilization', 
      value: '72%', 
      change: 'On track',
      trend: 'up',
      icon: DollarSign, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  const criticalProjects = [
    {
      name: 'AI Analytics Platform',
      status: 'at_risk',
      issue: 'Missing 2 backend developers',
      deadline: '2024-12-15',
      budget: { used: 85, total: 100 },
      team: { current: 6, required: 8 }
    },
    {
      name: 'Cloud Migration',
      status: 'critical',
      issue: 'Budget overrun by 15%',
      deadline: '2024-12-01',
      budget: { used: 115, total: 100 },
      team: { current: 5, required: 5 }
    },
    {
      name: 'Mobile Banking App',
      status: 'at_risk',
      issue: 'Behind schedule by 2 weeks',
      deadline: '2025-01-30',
      budget: { used: 65, total: 100 },
      team: { current: 8, required: 10 }
    },
  ];

  const upcomingDeadlines = [
    { project: 'Cloud Migration', milestone: 'Phase 1 Complete', dueDate: '2024-12-01', daysLeft: 12 },
    { project: 'AI Analytics Platform', milestone: 'MVP Release', dueDate: '2024-12-15', daysLeft: 26 },
    { project: 'Customer Portal', milestone: 'Design Review', dueDate: '2024-12-05', daysLeft: 16 },
  ];

  const recentActivity = [
    { type: 'match', message: 'Marco Rossi matched to AI Analytics Platform', time: '2 hours ago', score: 95 },
    { type: 'update', message: 'Cloud Migration budget updated', time: '4 hours ago' },
    { type: 'team', message: 'Sofia Greco joined Mobile Banking App', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of all projects and team capacity</p>
        </div>
        <button 
          onClick={() => onNavigate('matching')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Smart Matching
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                {stat.trend === 'down' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Projects Needing Attention</h2>
            <button 
              onClick={() => onNavigate('projects')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {criticalProjects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {project.status === 'critical' ? 'Critical' : 'At Risk'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project.issue}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Team Capacity */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Team Capacity</span>
                          <span className="font-medium text-gray-900">
                            {project.team.current}/{project.team.required}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              project.team.current >= project.team.required ? 'bg-green-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${(project.team.current / project.team.required) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Budget</span>
                          <span className="font-medium text-gray-900">
                            {project.budget.used}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              project.budget.used <= 90 ? 'bg-green-500' : 
                              project.budget.used <= 100 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(project.budget.used, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.deadline}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Find Team Members
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>Upcoming Deadlines</span>
            </h3>
            <div className="space-y-3">
              {upcomingDeadlines.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-3 py-2">
                  <p className="font-medium text-gray-900 text-sm">{item.milestone}</p>
                  <p className="text-xs text-gray-600 mb-1">{item.project}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.dueDate}</span>
                    <span className={`text-xs font-semibold ${
                      item.daysLeft <= 14 ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {item.daysLeft} days left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'match' ? 'bg-green-100' :
                    activity.type === 'update' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'match' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {activity.type === 'update' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'team' && <Users className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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