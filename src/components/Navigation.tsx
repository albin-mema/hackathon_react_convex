// src/components/Navigation.tsx
import { Compass, Users, Briefcase, Package } from 'lucide-react';

type ViewType = 'dashboard' | 'project-matching' | 'employee-matching' | 'features-repo';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (item: string) => void;
}

export default function Navigation({ currentView, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'project-matching', label: 'Project Matching', icon: Briefcase },
    { id: 'employee-matching', label: 'Connect People', icon: Users },
    { id: 'features-repo', label: 'Features Library', icon: Package },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ConnectHub</h1>
              <p className="text-xs text-gray-500">Compass Tirana 2025</p>
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
                  onClick={() => onNavigate(item.id as string)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-pink-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">MR</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}