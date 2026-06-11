import React from 'react';
import { addons } from 'storybook/manager-api';

/**
 * Sidebar status dots.
 *
 * A green dot marks pages approved as done; an orange dot marks pages awaiting review.
 * Add a page's sidebar group id (see `/index.json`) to the relevant set as its status changes.
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

// Pages built but not yet signed off — awaiting review.
const NEEDS_REVIEW = new Set<string>([
  // Containers
  'components-containers-group',
  'components-containers-container',
  'components-containers-panel',
  // Data display
  'components-data-display-section-banner',
  'components-data-display-divider',
  'components-data-display-counter',
  'components-data-display-pill',
  'components-data-display-tooltip',
  'components-data-display-currency',
  'components-data-display-status-indicator',
  'components-data-display-badge',
  // Foundations
  'foundations-typography',
  'foundations-spaces',
  'foundations-shadows',
  'foundations-breakpoints',
  'foundations-border-radius',
  'foundations-borders',
  'foundations-spinner',
  'foundations-loader',
  'foundations-icons',
  'foundations-illustrations',
  // Selection & Inputs
  'components-selection-inputs-tag',
]);

const APPROVED_COLOR = '#028838'; // Melio success green
const REVIEW_COLOR = '#f97316'; // orange

addons.setConfig({
  sidebar: {
    renderLabel: (item: { id: string; name: string }) => {
      const status = APPROVED.has(item.id) ? 'approved' : NEEDS_REVIEW.has(item.id) ? 'review' : null;
      if (!status) return item.name;
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {item.name}
          <span
            aria-label={status === 'approved' ? 'Approved' : 'Needs review'}
            title={status === 'approved' ? 'Approved' : 'Needs review'}
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: status === 'approved' ? APPROVED_COLOR : REVIEW_COLOR,
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
