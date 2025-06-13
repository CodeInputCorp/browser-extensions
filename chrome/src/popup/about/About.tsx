import React from "react";
import {
  Button,
  Grid,
  Column,
  Stack,
  Heading,
  Tile,
  Link,
  Tag,
} from "@carbon/react";
import { 
  ArrowLeft, 
  Launch, 
  LogoGithub, 
  Email, 
  Information 
} from "@carbon/icons-react";
import styles from "./About.module.scss";

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  const handleLinkClick = (url: string) => {
    chrome.tabs.create({ url });
  };

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <div className={styles?.about || ""}>
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
            <Heading size="lg">About Code Input</Heading>
            <p className={styles?.subtitle || ""}>
              Learn more about this extension and get support.
            </p>
          </div>

          <div className={styles?.content || ""}>
            <Tile className={styles?.infoTile || ""}>
              <div className={styles?.logoSection || ""}>
                <Information size={32} className={styles?.logo || ""} />
                <div>
                  <Heading size="md">Code Input</Heading>
                  <p className={styles?.tagline || ""}>
                    Enhance your GitHub experience with powerful code input tools
                  </p>
                </div>
              </div>
              
              <Stack gap={3}>
                <div className={styles?.infoItem || ""}>
                  <span>Version:</span>
                  <Tag type="blue">1.0.0</Tag>
                </div>
                <div className={styles?.infoItem || ""}>
                  <span>Build:</span>
                  <span>Chrome Extension (Manifest V3)</span>
                </div>
                <div className={styles?.infoItem || ""}>
                  <span>Release Date:</span>
                  <span>January 2024</span>
                </div>
              </Stack>
            </Tile>

            <Tile className={styles?.featuresTile || ""}>
              <Heading size="md">Features</Heading>
              <ul className={styles?.featuresList || ""}>
                <li>Enhanced code input and editing capabilities</li>
                <li>GitHub integration with repository insights</li>
                <li>Codeowners visualization and management</li>
                <li>Customizable themes and appearance</li>
                <li>Keyboard shortcuts for improved productivity</li>
                <li>Cross-platform synchronization</li>
              </ul>
            </Tile>

            <Tile className={styles?.linksTile || ""}>
              <Heading size="md">Resources</Heading>
              <Stack gap={3}>
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={LogoGithub}
                  onClick={() => handleLinkClick("https://github.com/codeinput/browser-extensions")}
                  className={styles?.linkButton || ""}
                >
                  Source Code
                  <Launch size={16} />
                </Button>
                
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={Launch}
                  onClick={() => handleLinkClick("https://codeinput.dev/docs")}
                  className={styles?.linkButton || ""}
                >
                  Documentation
                  <Launch size={16} />
                </Button>
                
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={Email}
                  onClick={() => handleLinkClick("mailto:support@codeinput.dev")}
                  className={styles?.linkButton || ""}
                >
                  Support
                  <Launch size={16} />
                </Button>
                
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={Launch}
                  onClick={() => handleLinkClick("https://codeinput.dev/privacy")}
                  className={styles?.linkButton || ""}
                >
                  Privacy Policy
                  <Launch size={16} />
                </Button>
              </Stack>
            </Tile>

            <Tile className={styles?.licensesTile || ""}>
              <Heading size="md">Licenses</Heading>
              <p className={styles?.licenseText || ""}>
                This extension is built with open-source technologies including:
              </p>
              <ul className={styles?.licensesList || ""}>
                <li>React (MIT License)</li>
                <li>TypeScript (Apache 2.0 License)</li>
                <li>IBM Carbon Design System (Apache 2.0 License)</li>
                <li>Webpack (MIT License)</li>
              </ul>
              <p className={styles?.copyright || ""}>
                © 2024 Code Input. All rights reserved.
              </p>
            </Tile>
          </div>
        </div>
      </Column>
    </Grid>
  );
};

export default About;