import React from 'react';
import { createRoot } from 'react-dom/client';
import ShadowDOMWrapper from './components/ShadowDOMWrapper';

console.log("Content script loaded");

// GitHub URL pattern for repository file views
const isGitHubRepoFile = () => {
  return window.location.hostname === 'github.com' && 
         window.location.pathname.includes('/blob/');
};

// Extract filename from GitHub URL
const getFileName = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[pathParts.length - 1] || 'unknown';
};

// Inject codeowners icon into GitHub file view
const injectCodeownersIcon = () => {
  if (!isGitHubRepoFile()) return;

  const targetElement = document.querySelector('.react-code-size-details-in-header');
  if (!targetElement) return;

  // Check if already injected (multiple selectors for safety)
  if (targetElement.querySelector('.codeinput-codeowners-wrapper') ||
      targetElement.querySelector('.codeinput-icon-container') ||
      targetElement.querySelector('.codeinput-shadow-host')) {
    return;
  }

  // Create container for React component
  const iconContainer = document.createElement('div');
  iconContainer.className = 'codeinput-icon-container';
  
  // Add data attribute to help identify our injected content
  iconContainer.setAttribute('data-codeinput-injected', 'true');
  
  // Append as last child (will appear on the right)
  targetElement.appendChild(iconContainer);

  // Render React component with Shadow DOM wrapper
  const root = createRoot(iconContainer);
  root.render(React.createElement(ShadowDOMWrapper, { fileName: getFileName() }));
};

// Debounce function to prevent excessive calls
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Track if we're already processing to prevent loops
let isProcessing = false;

// Debounced injection function
const debouncedInject = debounce(() => {
  if (isProcessing) return;
  isProcessing = true;
  
  try {
    injectCodeownersIcon();
  } catch (error) {
    console.error('Codeinput: Error injecting icon:', error);
  } finally {
    isProcessing = false;
  }
}, 300);

// Handle GitHub's SPA navigation
const setupObserver = () => {
  // Initial injection
  setTimeout(() => injectCodeownersIcon(), 100);

  // Watch for URL changes only
  let currentUrl = window.location.href;
  
  const urlObserver = new MutationObserver((mutations) => {
    // Only process if URL actually changed
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      debouncedInject();
    }
  });

  // More targeted observation - only watch for major DOM changes
  urlObserver.observe(document.body, {
    childList: true,
    subtree: false, // Don't watch deep changes to prevent loops
  });

  // Also listen for popstate events (back/forward navigation)
  window.addEventListener('popstate', debouncedInject);
  
  // Listen for GitHub's custom navigation events if available
  window.addEventListener('pjax:end', debouncedInject);
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupObserver);
} else {
  setupObserver();
}
