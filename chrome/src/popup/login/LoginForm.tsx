import React from 'react';
import { 
  Button, 
  TextInput, 
  PasswordInput,
  Tile,
  Stack,
  Heading
} from '@carbon/react';
import { LogoGithub } from '@carbon/icons-react';

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailLogin: () => void;
  onGitHubLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onEmailLogin,
  onGitHubLogin
}) => {
  return (
    <Tile className="login-tile">
      <Stack gap={6}>
        <Heading size="lg">Code Input</Heading>
        
        <Button
          kind="primary"
          renderIcon={LogoGithub}
          onClick={onGitHubLogin}
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
            value={email}
            onChange={onEmailChange}
          />
          
          <PasswordInput
            id="password"
            labelText="Password"
            placeholder="Enter your password"
            value={password}
            onChange={onPasswordChange}
          />
          
          <Button
            kind="secondary"
            onClick={onEmailLogin}
            disabled={!email || !password}
            size="lg"
          >
            Sign In
          </Button>
        </Stack>
      </Stack>
    </Tile>
  );
};

export default LoginForm;