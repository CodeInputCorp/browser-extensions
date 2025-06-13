import React from "react";
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
  onGitHubLogin,
}) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      onEmailLogin();
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
                  onChange={onEmailChange}
                  type="email"
                  required
                />

                <PasswordInput
                  id="password"
                  labelText="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onPasswordChange}
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
