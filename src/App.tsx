// src/App.tsx
import { useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Navigation from "./components/Navigation";
import ProjectMatchingView from "./components/features/ProjectMatchingView";
import EmployeeMatchingView from "./components/features/EmployeeMatchingView";
import FeaturesRepositoryView from "./components/features/FeaturesRepositoryView";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

type ViewType = "project-matching" | "employee-matching" | "features-repo";

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>("project-matching");

  const renderView = () => {
    switch (currentView) {
      case "project-matching":
        return <ProjectMatchingView />;
      case "employee-matching":
        return <EmployeeMatchingView />;
      case "features-repo":
        return <FeaturesRepositoryView />;
      default:
        return <ProjectMatchingView />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="container mx-auto px-4 py-8">{renderView()}</main>
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
