import { Storybook } from 'storybook-utils';

import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { SplitScreen } from '../SplitScreen';

validateComponent(SplitScreen, 'SplitScreen', {
  props: {
    panelA: { content: <Storybook.ContentPlaceholder label="Panel A" /> },
    panelB: { content: <Storybook.ContentPlaceholder label="Panel B" /> },
  },
  defaultDataTestId: 'split-screen',
  componentParts: ['panel-a', 'panel-b'],
});
