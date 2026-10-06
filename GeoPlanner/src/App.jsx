import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-default');
  }, []);

  return (
    <div className="w-full min-h-screen">
      {currentPage === 'landing' ? (
        <LandingPage 
          onLaunchDashboard={() => setCurrentPage('dashboard')} 
        />
      ) : (
        <DashboardPage 
          onBackToHome={() => setCurrentPage('landing')} 
        />
      )}
    </div>
  );
}

export default App;
