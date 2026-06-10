import React from 'react';
import { addons } from 'storybook/manager-api';

/**
 * Sidebar "approved / done" indicator.
 *
 * Shows a small green dot next to the component name for each page we've approved as done.
 * Add the page's sidebar group id (see `/index.json`) to APPROVED as more pages are signed off.
 */
const APPROVED = new Set<string>([
  'foundations-color-tokens', // Color Tokens
  'foundations-status-icon-solid', // Status Icon Solid
  'ux-patterns-buttons-vs-links', // Buttons vs. Links
  'ux-patterns-delete', // Delete
  'ux-patterns-feedback', // Feedback
  // Action
  'components-action-button', // Button
  'components-action-icon-button', // Icon Button
  'components-action-naked-button', // Naked Button
  'components-action-actionbar', // Action Bar
  'components-action-button-group', // Button Group
  // Navigation
  'components-navigation-link', // Link
  'components-navigation-navigation-item', // Navigation Item
  'components-navigation-pagination', // Pagination
  'components-navigation-tabs', // Tabs
]);

const DOT_COLOR = '#028838'; // Melio success green

addons.setConfig({
  sidebar: {
    renderLabel: (item: { id: string; name: string }) => {
      if (!APPROVED.has(item.id)) return item.name;
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {item.name}
          <span
            aria-label="Approved"
            title="Approved"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: DOT_COLOR,
              flexShrink: 0,
            }}
          />
        </span>
      );
    },
  },
});

// Keep Storybook's built-in right-side status indicator (the default "New" sparkle) hidden.
const style = document.createElement('style');
style.setAttribute('data-penny-sidebar-status', '');
style.textContent = `#storybook-explorer-tree .sidebar-item button[aria-label^="Change status"] { display: none !important; }`;
document.head.appendChild(style);
