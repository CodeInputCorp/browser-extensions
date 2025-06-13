import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@carbon/react';
import LoginForm from './login/LoginForm';
import Dashboard from './dashboard/Dashboard';
import Account from './account/Account';
import Settings from './settings/Settings';
import About from './about/About';
import '@carbon/styles/css/styles.css';
import './popup.scss';

type Page = 'dashboard' | 'account' | 'settings' | 'about';

const LoginPopup: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [theme, setTheme] = useState<'white' | 'g10' | 'g90' | 'g100'>('white');

  useEffect(() => {
    const updateTheme = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'g100' : 'white');
    };

    updateTheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  const handleEmailLogin = (email: string, password: string) => {
    console.log('Email login:', email);
    setIsLoggedIn(true);
  };

  const handleGitHubLogin = () => {
    console.log('GitHub login');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'account':
        return <Account onBack={handleBackToDashboard} />;
      case 'settings':
        return <Settings onBack={handleBackToDashboard} />;
      case 'about':
        return <About onBack={handleBackToDashboard} />;
      default:
        return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
    }
  };

  if (isLoggedIn) {
    return (
      <Theme theme={theme}>
        <div className="popup-container">
          {renderCurrentPage()}
        </div>
      </Theme>
    );
  }

  return (
    <Theme theme={theme}>
      <div className="popup-container">
        <LoginForm
          onEmailLogin={handleEmailLogin}
          onGitHubLogin={handleGitHubLogin}
        />
      </div>
    </Theme>
  );
};

// Mount React app
const container = document.getElementById('popup-root');
if (container) {
  const root = createRoot(container);
  root.render(<LoginPopup />);
}