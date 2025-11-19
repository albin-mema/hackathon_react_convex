// src/components/Navigation.tsx
import { LayoutDashboard, Briefcase, Users, GitBranch } from 'lucide-react';

import { useAuthContext } from "../context/AuthContext";


type View = 'projects' | 'employees' | 'project-detail' | 'matching' |'login';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
   const {  logout } = useAuthContext();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'employees', label: 'Team', icon: Users },
  ];

    const handleLogout = () => {
    logout();
    onNavigate("login"); // redirect to login view
  };


  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ConnectHub Manager</h1>
              <p className="text-xs text-gray-500">Project Allocation System</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as View)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Manager Name</p>
              <p className="text-xs text-gray-500">Team Lead</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">MN</span>
            </div>
             <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm text-gray-600 hover:text-white hover:bg-red-500 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}