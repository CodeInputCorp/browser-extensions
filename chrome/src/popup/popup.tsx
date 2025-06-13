import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@carbon/react';
import LoginForm from './login/LoginForm';
import Dashboard from './dashboard/Dashboard';
import '@carbon/styles/css/styles.css';
import './popup.scss';

interface LoginState {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

const LoginPopup: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
    isLoggedIn: false
  });

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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState(prev => ({ ...prev, email: event.target.value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState(prev => ({ ...prev, password: event.target.value }));
  };

  const handleEmailLogin = () => {
    setLoginState(prev => ({ ...prev, isLoggedIn: true }));
  };

  const handleGitHubLogin = () => {
    setLoginState(prev => ({ ...prev, isLoggedIn: true }));
  };

  const handleLogout = () => {
    setLoginState({ email: '', password: '', isLoggedIn: false });
  };

  if (loginState.isLoggedIn) {
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
          email={loginState.email}
          password={loginState.password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
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