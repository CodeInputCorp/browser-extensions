import React, { useState } from "react";
import {
  Button,
  Grid,
  Column,
  Stack,
  Heading,
  TextInput,
  Select,
  SelectItem,
  Tile,
  Tag,
} from "@carbon/react";
import { ArrowLeft, Save, Edit } from "@carbon/icons-react";
import styles from "./Account.module.scss";

interface AccountProps {
  onBack: () => void;
}

const Account: React.FC<AccountProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    organization: "Acme Corp",
    role: "developer",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving account data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <div className={styles?.account || ""}>
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
            <Heading size="lg">Account Settings</Heading>
            <p className={styles?.subtitle || ""}>
              Manage your Code Input account information.
            </p>
          </div>

          <div className={styles?.content || ""}>
            <Tile className={styles?.profileTile || ""}>
              <div className={styles?.profileHeader || ""}>
                <Heading size="md">Profile Information</Heading>
                {!isEditing && (
                  <Button
                    kind="tertiary"
                    size="sm"
                    renderIcon={Edit}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>

              <Stack gap={4}>
                <TextInput
                  id="name"
                  labelText="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                />

                <TextInput
                  id="email"
                  labelText="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  type="email"
                />

                <TextInput
                  id="organization"
                  labelText="Organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange("organization", e.target.value)}
                  disabled={!isEditing}
                />

                <Select
                  id="role"
                  labelText="Role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  disabled={!isEditing}
                >
                  <SelectItem value="developer" text="Developer" />
                  <SelectItem value="designer" text="Designer" />
                  <SelectItem value="manager" text="Project Manager" />
                  <SelectItem value="other" text="Other" />
                </Select>

                {isEditing && (
                  <div className={styles?.actions || ""}>
                    <Button
                      kind="primary"
                      size="md"
                      renderIcon={Save}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                    <Button
                      kind="secondary"
                      size="md"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </Stack>
            </Tile>

            <Tile className={styles?.statusTile || ""}>
              <Heading size="md">Account Status</Heading>
              <Stack gap={3}>
                <div className={styles?.statusItem || ""}>
                  <span>Plan:</span>
                  <Tag type="green">Free Tier</Tag>
                </div>
                <div className={styles?.statusItem || ""}>
                  <span>Member since:</span>
                  <span>January 2024</span>
                </div>
                <div className={styles?.statusItem || ""}>
                  <span>Last login:</span>
                  <span>Today, 2:30 PM</span>
                </div>
              </Stack>
            </Tile>
          </div>
        </div>
      </Column>
    </Grid>
  );
};

export default Account;