import { type Meta, type StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { setChromaticViewports } from '@/test-utils/storybook.utils';

import { ExternalLayout } from './ExternalLayout';

const content = <Storybook.ContentPlaceholder height="550px" label="Content" />;
const footer = <Storybook.ContentPlaceholder height="110px" label="footer" />;

const meta: Meta<typeof ExternalLayout> = {
  title: 'Chromatic/External Layout',
  component: ExternalLayout,
  decorators: [
    (Story) => (
      <Storybook.Container transform="scale(1)" height="100vh">
        {Story()}
      </Storybook.Container>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  argTypes: {},
  args: {},
};
export default meta;

export const NoHeader: StoryObj<typeof ExternalLayout> = {
  render: () => <ExternalLayout content={content} footer={footer} tabIndex={0} />,
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
};

export const WithOverflow: StoryObj<typeof ExternalLayout> = {
  render: () => (
    <ExternalLayout
      content={<Storybook.ContentPlaceholder height="1550px" label="Content" />}
      footer={footer}
      tabIndex={0}
    />
  ),
  play: async () => {
    await userEvent.tab();
  },
};

setChromaticViewports([NoHeader], ['xs', 'xl']);
