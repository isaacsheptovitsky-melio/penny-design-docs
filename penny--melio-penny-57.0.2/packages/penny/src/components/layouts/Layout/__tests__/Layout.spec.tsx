import { Storybook } from 'storybook-utils';

import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Layout } from '../Layout';
import { type LayoutProps } from '../Layout.types';

const props: LayoutProps = {
  header: { content: <Storybook.ContentPlaceholder label="Header" /> },
  children: <Storybook.ContentPlaceholder label="Default content" />,
  footer: { content: <Storybook.ContentPlaceholder label="Footer" /> },
};

describe('Layout', () => {
  validateComponent(Layout, 'Layout', {
    props,
    defaultDataTestId: 'layout',
    componentParts: ['header', 'content', 'footer'],
  });
});
