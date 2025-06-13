import React from 'react';
import { 
  Button,
  Tile,
  Stack,
  Heading
} from '@carbon/react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <Tile className="success-tile">
      <Stack gap={4}>
        <Heading size="lg">Welcome!</Heading>
        <p>You are successfully logged in.</p>
        <Button kind="secondary" onClick={onLogout}>
          Logout
        </Button>
      </Stack>
    </Tile>
  );
};

export default Dashboard;