// src/components/TopBar.tsx
import { Briefcase, Users } from 'lucide-react';

type View = 'projects' | 'employees' | 'project-detail' | 'matching';

interface TopBarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export default function TopBar({ currentView, onNavigate }: TopBarProps) {
  const isProjectsActive = currentView === 'projects' || currentView === 'project-detail' || currentView === 'matching';
  const isEmployeesActive = currentView === 'employees';

  return (
    <div className="bg-[#0066CC] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-white">ConnectHub</div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onNavigate('projects')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
                isProjectsActive
                  ? 'bg-white text-[#0066CC]'
                  : 'text-white hover:bg-[#0052A3]'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => onNavigate('employees')}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
                isEmployeesActive
                  ? 'bg-white text-[#0066CC]'
                  : 'text-white hover:bg-[#0052A3]'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Employees</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}