// src/App.tsx
import { useState } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import TopBar from './components/TopBar';
import ProjectsList from './components/ProjectsList';
import EmployeesList from './components/EmployeesList';
import ProjectDetail from './components/ProjectDetail';
import MatchingResults from './components/MatchingResults';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

type View = 'projects' | 'employees' | 'project-detail' | 'matching';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [missingRole, setMissingRole] = useState<string | null>(null);

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleFindMatch = (projectId: string, role: string) => {
    setSelectedProjectId(projectId);
    setMissingRole(role);
    setCurrentView('matching');
  };

  const handleBack = () => {
    if (currentView === 'matching') {
      setCurrentView('project-detail');
    } else {
      setCurrentView('projects');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar currentView={currentView} onNavigate={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentView === 'projects' && <ProjectsList onViewProject={handleViewProject} />}
        {currentView === 'employees' && <EmployeesList />}
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