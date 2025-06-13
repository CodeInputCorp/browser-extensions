import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@carbon/react';
import LoginForm from './login/LoginForm';
import Dashboard from './dashboard/Dashboard';
import '@carbon/styles/css/styles.css';
import './popup.scss';

const LoginPopup: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  };

  if (isLoggedIn) {
    return (
      <Theme theme={theme}>
        <div className="popup-container">
          <Dashboard onLogout={handleLogout} />
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