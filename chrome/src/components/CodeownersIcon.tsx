import React from "react";
import { Rule } from "@carbon/icons-react";
import { Tooltip } from "@carbon/react";

interface CodeownersIconProps {
  fileName?: string;
}

const CodeownersIcon: React.FC<CodeownersIconProps> = ({
  fileName = "current file",
}) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Placeholder for future functionality
    console.log("Codeowners icon clicked");
  };

  const tooltipContent = (
    <div className="codeinput-codeowners-tooltip">
      <div className="codeinput-tooltip-header">
        <strong>Codeowners Information</strong>
      </div>
      <div className="codeinput-tooltip-content">
        <div>File: {fileName}</div>
        <div>Owners: @team/frontend, @john-doe</div>
        <div>Review Required: Yes</div>
        <div>Last Updated: 2 days ago</div>
      </div>
    </div>
  );

  return (
    <div className="codeinput-codeowners-wrapper">
      <Tooltip label={tooltipContent} align="bottom-left">
        <button
          className="codeinput-codeowners-icon"
          onClick={handleIconClick}
          aria-label="View codeowners information"
        >
          <Rule size={16} />
        </button>
      </Tooltip>
    </div>
  );
};

export default CodeownersIcon;
