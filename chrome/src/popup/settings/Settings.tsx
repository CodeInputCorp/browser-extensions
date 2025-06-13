import React, { useState } from "react";
import {
  Button,
  Grid,
  Column,
  Stack,
  Heading,
  Toggle,
  RadioButtonGroup,
  RadioButton,
  Select,
  SelectItem,
  Tile,
  Slider,
} from "@carbon/react";
import { ArrowLeft, Save } from "@carbon/icons-react";
import styles from "./Settings.module.scss";

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    theme: "system",
    notifications: true,
    autoSync: true,
    language: "en",
    fontSize: 14,
    showLineNumbers: true,
    enableShortcuts: true,
  });

  const handleToggleChange = (field: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: string, value: number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
  };

  const handleReset = () => {
    setSettings({
      theme: "system",
      notifications: true,
      autoSync: true,
      language: "en",
      fontSize: 14,
      showLineNumbers: true,
      enableShortcuts: true,
    });
  };

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <div className={styles?.settings || ""}>
          <div className={styles?.header || ""}>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={ArrowLeft}
              onClick={onBack}
              className={styles?.backButton || ""}
            >
              Back
            </Button>
            <Heading size="lg">Settings</Heading>
            <p className={styles?.subtitle || ""}>
              Customize your Code Input experience.
            </p>
          </div>

          <div className={styles?.content || ""}>
            <Tile className={styles?.settingsTile || ""}>
              <Heading size="md">Appearance</Heading>
              <Stack gap={4}>
                <div className={styles?.settingItem || ""}>
                  <label className={styles?.settingLabel || ""}>Theme</label>
                  <RadioButtonGroup
                    name="theme"
                    valueSelected={settings.theme}
                    onChange={(value) => handleSelectChange("theme", value)}
                  >
                    <RadioButton labelText="Light" value="light" />
                    <RadioButton labelText="Dark" value="dark" />
                    <RadioButton labelText="System" value="system" />
                  </RadioButtonGroup>
                </div>

                <div className={styles?.settingItem || ""}>
                  <label className={styles?.settingLabel || ""}>Font Size</label>
                  <Slider
                    labelText=""
                    min={10}
                    max={20}
                    step={1}
                    value={settings.fontSize}
                    onChange={({ value }) => handleSliderChange("fontSize", value)}
                  />
                  <span className={styles?.fontSizeValue || ""}>{settings.fontSize}px</span>
                </div>
              </Stack>
            </Tile>

            <Tile className={styles?.settingsTile || ""}>
              <Heading size="md">Editor</Heading>
              <Stack gap={4}>
                <Toggle
                  id="showLineNumbers"
                  labelText="Show line numbers"
                  toggled={settings.showLineNumbers}
                  onToggle={(value) => handleToggleChange("showLineNumbers", value)}
                />

                <Toggle
                  id="enableShortcuts"
                  labelText="Enable keyboard shortcuts"
                  toggled={settings.enableShortcuts}
                  onToggle={(value) => handleToggleChange("enableShortcuts", value)}
                />
              </Stack>
            </Tile>

            <Tile className={styles?.settingsTile || ""}>
              <Heading size="md">General</Heading>
              <Stack gap={4}>
                <Toggle
                  id="notifications"
                  labelText="Enable notifications"
                  toggled={settings.notifications}
                  onToggle={(value) => handleToggleChange("notifications", value)}
                />

                <Toggle
                  id="autoSync"
                  labelText="Auto-sync settings"
                  toggled={settings.autoSync}
                  onToggle={(value) => handleToggleChange("autoSync", value)}
                />

                <div className={styles?.settingItem || ""}>
                  <Select
                    id="language"
                    labelText="Language"
                    value={settings.language}
                    onChange={(e) => handleSelectChange("language", e.target.value)}
                  >
                    <SelectItem value="en" text="English" />
                    <SelectItem value="es" text="Español" />
                    <SelectItem value="fr" text="Français" />
                    <SelectItem value="de" text="Deutsch" />
                    <SelectItem value="ja" text="日本語" />
                  </Select>
                </div>
              </Stack>
            </Tile>

            <div className={styles?.actions || ""}>
              <Button
                kind="primary"
                size="md"
                renderIcon={Save}
                onClick={handleSave}
              >
                Save Settings
              </Button>
              <Button
                kind="secondary"
                size="md"
                onClick={handleReset}
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </Column>
    </Grid>
  );
};

export default Settings;