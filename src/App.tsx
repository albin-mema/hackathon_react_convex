import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import ProjectMatchingView from "./components/features/ProjectMatchingView";
import EmployeeMatchingView from "./components/features/EmployeeMatchingView";
import FeaturesRepositoryView from "./components/features/FeaturesRepositoryView";
import { useAuthContext } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";

type ViewType = "login" | "project-matching" | "employee-matching" | "features-repo";

function AppContent() {
  const { user } = useAuthContext();
  const [currentView, setCurrentView] = useState<ViewType>("login");

  // When user logs in → navigate to default view
  useEffect(() => {
    if (user && currentView === "login") {
      setCurrentView("project-matching");
    }
  }, [user]);

  // If not logged in → force login view
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <LoginForm />
      </div>
    );
  }

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
      {/* Only show Navigation when logged in */}
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="container mx-auto px-4 py-8">{renderView()}</main>
    </div>
  );
}

export default AppContent;
