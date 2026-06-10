import type { Preview } from '@storybook/react-vite';
import type { StoryFn } from '@storybook/react-vite';
import React from 'react';

import { defaultDesignTokens } from '../src/theme/foundations/tokens/defaultDesignTokens';
import { BreakpointProvider } from '../src/theme/providers/BreakpointProvider';
import { TokensProvider } from '../src/theme/providers/TokensProvider';
import { Blockquote, Code, H2, H3, HR, P, Table, TD, TH } from './docs/DocComponents';

const withPennyTheme = (Story: StoryFn) => (
  <TokensProvider {...defaultDesignTokens} cssVarsRoot=":root">
    <BreakpointProvider>
      <Story />
    </BreakpointProvider>
  </TokensProvider>
);

const preview: Preview = {
  decorators: [withPennyTheme],
  parameters: {
    options: {
      // Sort the category/group/component hierarchy alphabetically, but keep the intro pages and
      // category order pinned at the top level, and preserve each page's authored story order.
      // NOTE: Storybook statically extracts this function, so it must be inline and self-contained
      // (no references to module-scope variables).
      storySort: (a, b) => {
        const TOP_LEVEL_ORDER = ['✦ Design Guidelines', 'Welcome', 'Foundations', 'UX Patterns', 'Components'];
        const rank = (segment) => {
          const index = TOP_LEVEL_ORDER.indexOf(segment);
          return index === -1 ? TOP_LEVEL_ORDER.length : index;
        };
        const aTitle = a.title ?? '';
        const bTitle = b.title ?? '';
        // Same page (component) — preserve the authored story order (Docs, Playground, sections…).
        if (aTitle === bTitle) return 0;
        const aSegments = aTitle.split('/');
        const bSegments = bTitle.split('/');
        for (let i = 0; i < Math.max(aSegments.length, bSegments.length); i += 1) {
          const aSeg = aSegments[i] ?? '';
          const bSeg = bSegments[i] ?? '';
          if (aSeg === bSeg) continue;
          if (i === 0) {
            const rankDiff = rank(aSeg) - rank(bSeg);
            if (rankDiff !== 0) return rankDiff;
          }
          return aSeg.localeCompare(bSeg, undefined, { numeric: true, sensitivity: 'base' });
        }
        return 0;
      },
    },
    controls: {
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        headingSelector: 'h2, h3',
        title: 'On this page',
      },
      components: {
        h2: H2,
        h3: H3,
        p: P,
        blockquote: Blockquote,
        hr: HR,
        table: Table,
        th: TH,
        td: TD,
        code: Code,
      },
    },
    viewMode: 'docs',
  },
  tags: ['autodocs'],
};

export default preview;
