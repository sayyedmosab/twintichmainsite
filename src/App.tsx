import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import LandingPage from './pages/landing/LandingPage';
import TwinStudioPage from './pages/TwinStudioPage';
import ThreeDAnimationPage from './pages/ThreeDAnimationPage';
// Import Architect app from workspace package
import ArchitectLessonsPage from './pages/ArchitectLessonsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import JosoorVisionPage from './pages/josoor/JosoorVisionPage';
import RoadmapPage from './pages/RoadmapPage';
//import ArchitectsForumPage from './pages/ArchitectsForumPage';
import SimpleTestPage from './pages/SimpleTestPage';
// Import Cosmic Components
import { TwinSciencePage } from './pages/TwinSciencePageNew';
import TwinFactoryPage from './pages/TwinFactoryPage';

// Simple test component to verify routing
const TestRoute = () => {
  return (
    <div style={{ padding: '20px', background: 'yellow', minHeight: '100vh' }}>
      <h1>TEST ROUTE WORKING!</h1>
      <p>If you can see this, routing is working correctly.</p>
      <p>The /test route is loading this component instead of SimpleTestPage.</p>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isTwinSciencePage = location.pathname === '/twinscience';
  
  return (
    <div className="grid grid-rows-[auto,1fr,auto] h-screen text-white" style={{ backgroundColor: '#f0f8ff' }}>
      <Header />
      <main className="overflow-y-auto min-h-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            {/* Main Navigation Routes */}
            <Route path="/twinstudio" element={<TwinStudioPage />} />
            <Route path="/twinscience" element={<TwinSciencePage />} />
            <Route path="/twinfactory" element={<TwinFactoryPage />} />
            <Route path="/about" element={<JosoorVisionPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
{/*            <Route path="/forum" element={<ArchitectsForumPage />} />*/}
            <Route path="/test" element={<SimpleTestPage />} />
            <Route path="/architect" element={<ArchitectLessonsPage />} />
            <Route path="/3danimation" element={<ThreeDAnimationPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
