import React, { useState } from "react";
import { Rule } from "@carbon/icons-react";

interface CodeownersIconProps {
  fileName?: string;
}

const CodeownersIcon: React.FC<CodeownersIconProps> = ({
  fileName = "current file",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Placeholder for future functionality
    console.log("Codeowners icon clicked");
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="codeinput-codeowners-wrapper">
      <div className="codeinput-tooltip-container">
        <button
          className="codeinput-codeowners-icon"
          onClick={handleIconClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="View codeowners information"
        >
          <Rule size={16} />
        </button>
        {showTooltip && (
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
        )}
      </div>
    </div>
  );
};

export default CodeownersIcon;
