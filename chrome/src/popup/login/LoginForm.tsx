import React, { useState } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Tile,
  Stack,
  Heading,
  Form,
  FormGroup,
  Grid,
  Column,
} from "@carbon/react";
import { LogoGithub } from "@carbon/icons-react";

interface LoginFormProps {
  onEmailLogin: (email: string, password: string) => void;
  onGitHubLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onEmailLogin,
  onGitHubLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      onEmailLogin(email, password);
    }
  };

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
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

          <Form onSubmit={handleFormSubmit}>
            <FormGroup legendText="">
              <Stack gap={4}>
                <TextInput
                  id="email"
                  labelText="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  required
                />

                <PasswordInput
                  id="password"
                  labelText="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />

                <Button
                  kind="secondary"
                  type="submit"
                  disabled={!email || !password}
                  size="lg"
                >
                  Sign In
                </Button>
              </Stack>
            </FormGroup>
          </Form>
        </Stack>
      </Column>
    </Grid>
  );
};

export default LoginForm;
