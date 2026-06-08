import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { setChromaticViewports } from '@/test-utils/storybook.utils';

import { ExternalLayout } from './ExternalLayout';

const header = <Storybook.ContentPlaceholder label="header" width="fit-content" />;
const content = <Storybook.ContentPlaceholder height="550px" label="Content" />;
const footer = <Storybook.ContentPlaceholder height="110px" label="footer" />;

const meta: Meta<typeof ExternalLayout> = {
  title: 'Layouts/External Layout',
  component: ExternalLayout,
  decorators: [
    (Story) => (
      <Storybook.Container transform="scale(1)" height="100vh">
        {Story()}
      </Storybook.Container>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Determines if the layout is in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    logo: {
      control: false,
      description: 'The element that overrides the logo.',
      table: { type: { summary: 'ReactElement' }, category: 'props' },
    },
    header: {
      control: false,
      description: 'The right side of the header.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactElement',
        },
      },
    },
    content: {
      control: false,
      type: { required: true, name: 'string' },
      description: 'The content of the screen.',
      table: {
        category: 'props',
        type: { summary: 'ReactElement' },
      },
    },
    footer: {
      control: false,
      type: { name: 'string' },
      description: 'The footer below the content.',
      table: {
        category: 'props',
        type: { summary: 'ReactElement' },
      },
    },
    tabIndex: {
      control: 'number',
      type: { name: 'number' },
      description: 'Sets the tab index of the layout, needed for accessibility when the content is scrollable.',
      table: {
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'external-layout' }, category: 'tests' },
    },
  },
  args: {
    header,
    content,
    footer,
    isLoading: false,
    logo: undefined,
    tabIndex: undefined,
    'data-testid': 'external-layout',
  },
};
export default meta;

export const Main: StoryObj<typeof ExternalLayout> = {
  args: { tabIndex: 0 },
};

export const Loading: StoryObj<typeof ExternalLayout> = {
  render: (args) => <ExternalLayout {...args} isLoading />,
};

export const HideLogo: StoryObj<typeof ExternalLayout> = {
  args: { tabIndex: 0 },
  render: (args) => <ExternalLayout {...args} logo={<></>} />,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const OverrideLogo: StoryObj<typeof ExternalLayout> = {
  args: { tabIndex: 0 },
  render: (args) => <ExternalLayout {...args} logo={<Storybook.ContentPlaceholder label="Logo" width="auto" />} />,
};

setChromaticViewports([Main, OverrideLogo], ['xs', 'xl']);
