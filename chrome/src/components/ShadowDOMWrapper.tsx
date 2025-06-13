import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import CodeownersIcon from './CodeownersIcon';

// Minimal CSS for our component - avoiding full Carbon import
const shadowCSS = `
  /* Reset styles for shadow DOM */
  * {
    box-sizing: border-box;
  }
  
  /* Custom tooltip container */
  .codeinput-tooltip-container {
    position: relative;
    display: inline-flex;
  }
  
  /* Wrapper to match GitHub header layout */
  .codeinput-codeowners-wrapper {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    height: 100%;
  }

  .codeinput-codeowners-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background: transparent;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: #656d76;
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  .codeinput-codeowners-icon:hover {
    color: #24292f;
    background-color: rgba(31, 35, 40, 0.05);
  }

  .codeinput-codeowners-icon:active {
    background-color: rgba(31, 35, 40, 0.1);
  }

  .codeinput-codeowners-icon svg {
    display: block;
  }

  .codeinput-codeowners-tooltip {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 9000;
    background: #161616;
    color: #f4f4f4;
    padding: 12px;
    font-size: 12px;
    line-height: 1.4;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    max-width: 280px;
    min-width: 220px;
    word-wrap: break-word;
    border: 1px solid #393939;
  }
  
  .codeinput-tooltip-header {
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .codeinput-tooltip-content div {
    margin-bottom: 4px;
  }
  
  .codeinput-tooltip-content div:last-child {
    margin-bottom: 0;
  }

  /* Tooltip arrow */
  .codeinput-codeowners-tooltip::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 12px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #161616;
  }
`;

interface ShadowDOMWrapperProps {
  fileName?: string;
}

const ShadowDOMWrapper: React.FC<ShadowDOMWrapperProps> = ({ fileName }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const reactRootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    // Create shadow DOM
    const shadowRoot = hostRef.current.attachShadow({ mode: 'closed' });
    shadowRootRef.current = shadowRoot;

    // Create container for React app inside shadow DOM
    const shadowContainer = document.createElement('div');
    shadowContainer.className = 'codeinput-shadow-container';
    
    // Create style element with our shadow CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = shadowCSS;
    
    // Append styles and container to shadow root
    shadowRoot.appendChild(styleElement);
    shadowRoot.appendChild(shadowContainer);

    // Minimal event handling - only stop propagation for our specific elements
    shadowRoot.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (target && target.closest('.codeinput-codeowners-icon')) {
        e.stopPropagation();
      }
    });

    // Create React root inside shadow DOM
    const reactRoot = createRoot(shadowContainer);
    reactRootRef.current = reactRoot;

    // Render our component inside shadow DOM
    reactRoot.render(<CodeownersIcon fileName={fileName} />);

    // Cleanup function
    return () => {
      if (reactRootRef.current) {
        reactRootRef.current.unmount();
      }
    };
  }, [fileName]);

  return <div ref={hostRef} className="codeinput-shadow-host" />;
};

export default ShadowDOMWrapper;