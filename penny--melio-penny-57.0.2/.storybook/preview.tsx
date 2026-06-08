import { Preview, StoryFn } from '@storybook/react-vite';
import { IntlProvider } from 'react-intl';

import { mockDateDecorator, syncSourceCodeDecorator } from './decorators';
import { DSDocsContainer, DSDocsPage } from './docs';
import { preloadAllDynamicThemes } from './services/themeCache';
import { PartnerThemeProvider } from './themes/PartnerThemeProvider';
import { themeSwitcher, viewports } from './toolbar';
import { shouldUseS3Themes } from './toolbar/theme-switcher/themes';
import { padStoryChromaticDecorator } from './utils';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error',
      config: {
        rules: [
          {
            /** @see .storybook/a11y-floating-ui-exclusion.md */
            id: 'aria-hidden-focus',
            selector: '[data-floating-ui-focus-guard=""]',
            enabled: false,
          },
          {
            /** @see .storybook/a11y-floating-ui-exclusion.md */
            id: 'aria-hidden-focus',
            selector: '[data-floating-ui-inert=""]',
            enabled: false,
          },
        ],
      },
    },
    viewMode: 'docs',
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Changelog',
          'Design Tokens',
          'Responsiveness',
          'Theme',
          'Composition & Customization',
          'Testkits',
          'Foundations',
          [
            'Foundations Overview',
            'Colors',
            'Typography',
            'Shadows',
            'Border Radius',
            'Borders',
            'Spaces',
            'Breakpoints',
            'Logo',
            'Icon',
            'Illustration',
            'Loader',
            'Status Icon Solid',
            'Status Icon Outlined',
            'Transitions',
          ],
          'Containers',
          [
            'Containers Overview',
            'Cards',
            ['Card', 'Interactive Card [pattern]', '*'],
            'Collapsible',
            'Accordion',
            'Container',
            'Drawer',
            'Floating',
            'Group',
            'Loading Container',
            'Menus',
            ['Using Menus', 'Bottom Sheet Menu', 'Flat Menu', 'Floating Menu', 'Menu', '*'],
            '*',
          ],
          'Layouts',
          ['Layouts Overview', '*'],
          'Action Components',
          ['Action Overview', '*'],
          'Navigation Components',
          ['Navigation Overview', '*'],
          'Data Display Components',
          ['Data Display Overview', '*', 'Virtual Card', ['Virtual Card', 'Base Virtual Card', 'Details']],
          'Media Components',
          ['Media Overview', '*'],
          'Feedback Components',
          ['Feedback Overview', '*'],
          'Selection & Inputs Components',
          [
            'Selection & Inputs Overview',
            '*',
            [
              'Segmented Control',
              'Segment',
              'Single Select [pattern]',
              'Tags',
              'Tag [new]',
              'Interactive Tag [new]',
              '*',
            ],
          ],
          'Form',
          [
            'Form Overview',
            'How to Use',
            'useMelioForm',
            'useFormSubmissionController',
            'Migrating to FormField',
            'Form',
            'Form Field',
            'Form Line Items',
            '*',
          ],
          'Table',
          ['Table Overview', 'Table', '*'],
          'Penny Utils',
          ['Getting Started', '*', 'Hooks'],
          'Internal Components',
          ['Internal Overview', '*'],
          'Chromatic',
          'Storybook Utils Components',
          'Penny Assets',
          ['Overview', 'Icons', 'Brands', 'Brand Symbols', 'Illustrations', 'Flags', '*'],
        ],
        method: 'alphabetical',
      },
    },
    controls: {
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      options: viewports,
    },
    docs: {
      hidePrimaryInStories: false,
      container: DSDocsContainer,
      page: DSDocsPage,

      toc: {
        headingSelector: 'h2, h3',
        title: 'Table of Contents',
      },

      codePanel: true,
    },
  },

  decorators: [
    mockDateDecorator,
    padStoryChromaticDecorator,
    (StoryComponent: StoryFn, { globals: { theme } }) => (
      <IntlProvider locale="en" timeZone="UTC">
        <PartnerThemeProvider theme={theme as string}>
          <StoryComponent />
        </PartnerThemeProvider>
      </IntlProvider>
    ),
    syncSourceCodeDecorator,
  ],
  globalTypes: {
    theme: themeSwitcher,
  },

  tags: ['autodocs'],
};

if (shouldUseS3Themes()) {
  void preloadAllDynamicThemes();
}

export default preview;
