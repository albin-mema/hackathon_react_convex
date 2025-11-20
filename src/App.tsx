// src/App.tsx
import { useState } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import TopBar from './components/TopBar';
import ProjectsList from './components/ProjectsList';
import EmployeesList from './components/EmployeesList';
import ProjectDetail from './components/ProjectDetail';
import MatchingResults from './components/MatchingResults';
import EmployeeDetail from './components/EmployeeDetail';
import type { Id } from '../convex/_generated/dataModel';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

type View = 'projects' | 'employees' | 'project-detail' | 'matching' | 'employee-detail';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<Id<'projects'> | null>(null);
  const [missingRole, setMissingRole] = useState<string | null>(null);
  const [searchKeywords, setSearchKeywords] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<Id<'employees'> | null>(null);

  const handleViewProject = (projectId: Id<'projects'>) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleFindMatch = (projectId: Id<'projects'>, role: string, keywords: string) => {
    setSelectedProjectId(projectId);
    setMissingRole(role);
    setSearchKeywords(keywords || null);
    setCurrentView('matching');
  };

  const handleViewEmployee = (employeeId: Id<'employees'>) => {
    setSelectedEmployeeId(employeeId);
    setCurrentView('employee-detail');
  };

  const handleBack = () => {
    if (currentView === 'matching') {
      setCurrentView('project-detail');
    } else if (currentView === 'employee-detail') {
      setCurrentView('employees');
    } else {
      setCurrentView('projects');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar currentView={currentView} onNavigate={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'projects' && <ProjectsList onViewProject={handleViewProject} />}
        {currentView === 'employees' && <EmployeesList onViewEmployee={handleViewEmployee} />}
        {currentView === 'project-detail' && (
          <ProjectDetail 
            projectId={selectedProjectId} 
            onBack={handleBack}
            onFindMatch={handleFindMatch}
          />
        )}
        {currentView === 'matching' && (
          <MatchingResults 
            projectId={selectedProjectId}
            missingRole={missingRole}
            keywords={searchKeywords}
            onBack={handleBack}
            onViewEmployee={handleViewEmployee}
          />
        )}
        {currentView === 'employee-detail' && (
          <EmployeeDetail 
            employeeId={selectedEmployeeId}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ConvexProvider client={convex}>
      <AppContent />
    </ConvexProvider>
  );
}

export default App;