import React from "react";
import { Button, Grid, Column, Stack, Heading } from "@carbon/react";
import { User, Settings, Information, Logout } from "@carbon/icons-react";
import styles from "./Dashboard.module.scss";

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNavigate }) => {
  const handleAccountClick = () => {
    onNavigate("account");
  };

  const handleSettingsClick = () => {
    onNavigate("settings");
  };

  const handleAboutClick = () => {
    onNavigate("about");
  };

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <div className={styles?.dashboard || ""}>
          <div className={styles?.header || ""}>
            <Heading size="lg">Dashboard</Heading>
            <p className={styles?.welcomeText || ""}>
              Welcome back! Manage your Code Input settings.
            </p>
          </div>

          <div className={styles?.menuList || ""}>
            <Stack gap={2}>
              <Button
                kind="ghost"
                size="lg"
                renderIcon={User}
                onClick={handleAccountClick}
                className={styles?.menuItem || ""}
              >
                Account
              </Button>

              <Button
                kind="ghost"
                size="lg"
                renderIcon={Settings}
                onClick={handleSettingsClick}
                className={styles?.menuItem || ""}
              >
                Settings
              </Button>

              <Button
                kind="ghost"
                size="lg"
                renderIcon={Information}
                onClick={handleAboutClick}
                className={styles?.menuItem || ""}
              >
                About
              </Button>

              <Button
                kind="danger--ghost"
                size="lg"
                renderIcon={Logout}
                onClick={onLogout}
                className={`${styles?.menuItem || ""} ${styles?.logoutButton || ""}`}
              >
                Logout
              </Button>
            </Stack>
          </div>

          <div className={styles?.footer || ""}>
            <p className={styles?.version || ""}>Code Input v1.0.0</p>
          </div>
        </div>
      </Column>
    </Grid>
  );
};

export default Dashboard;
