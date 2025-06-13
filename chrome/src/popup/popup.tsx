import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Button, 
  TextInput, 
  PasswordInput,
  Tile,
  Stack,
  Heading,
  Theme
} from '@carbon/react';
import { LogoGithub } from '@carbon/icons-react';
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
    // Placeholder: simulate successful login
    setLoginState(prev => ({ ...prev, isLoggedIn: true }));
  };

  const handleGitHubLogin = () => {
    // Placeholder: simulate successful login
    setLoginState(prev => ({ ...prev, isLoggedIn: true }));
  };

  const handleLogout = () => {
    setLoginState({ email: '', password: '', isLoggedIn: false });
  };

  if (loginState.isLoggedIn) {
    return (
      <Theme theme={theme}>
        <div className="popup-container">
          <Tile className="success-tile">
            <Stack gap={4}>
              <Heading size="lg">Welcome!</Heading>
              <p>You are successfully logged in.</p>
              <Button kind="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          </Tile>
        </div>
      </Theme>
    );
  }

  return (
    <Theme theme={theme}>
      <div className="popup-container">
        <Tile className="login-tile">
          <Stack gap={6}>
            <Heading size="lg">Code Input</Heading>
            
            <Button
              kind="primary"
              renderIcon={LogoGithub}
              onClick={handleGitHubLogin}
              size="lg"
            >
              Continue with GitHub
            </Button>

            <div className="divider">
              <span>or</span>
            </div>

            <Stack gap={4}>
              <TextInput
                id="email"
                labelText="Email"
                placeholder="Enter your email"
                value={loginState.email}
                onChange={handleEmailChange}
              />
              
              <PasswordInput
                id="password"
                labelText="Password"
                placeholder="Enter your password"
                value={loginState.password}
                onChange={handlePasswordChange}
              />
              
              <Button
                kind="secondary"
                onClick={handleEmailLogin}
                disabled={!loginState.email || !loginState.password}
                size="lg"
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Tile>
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