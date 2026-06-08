import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { getUnionTypeSummary, setChromaticViewports } from '@/test-utils/storybook.utils';

import { Layout } from './Layout';

const sectionProps = `{
  content: ReactElement;
  isSticky?: boolean;
}`;

const maxWidthOptions = ['full', '1600px', '1200px', '900px', '800px', '600px', '480px'];
const backgroundColors = ['default', 'white', 'lightest'];

const meta: Meta<typeof Layout> = {
  title: 'Layouts/Layout',
  component: Layout,
  decorators: [(Story) => <Storybook.Container height="100vh">{Story()}</Storybook.Container>],
  argTypes: {
    maxWidth: {
      control: 'select',
      type: { name: 'string' },
      options: [...maxWidthOptions, 200],
      table: {
        category: 'props',
        type: { summary: `${getUnionTypeSummary(maxWidthOptions)} | number (custom)` },
      },
      description: "The layout's max width.",
    },
    backgroundColor: {
      control: 'select',
      options: backgroundColors,
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(backgroundColors) },
        defaultValue: { summary: 'default' },
      },
      description: "The layout's background color.",
    },
    paddingContent: {
      control: 'text',
      table: {
        category: 'props',
        type: { summary: 'SpacingValue', detail: 'A string build from SpaceKey tokens' },
      },
      description: "Overrides the content's default padding.",
    },
    header: {
      control: 'object',
      table: {
        category: 'props',
        type: { summary: sectionProps },
      },
      description: "The layout's header.",
    },
    footer: {
      control: 'object',
      table: {
        category: 'props',
        type: { summary: sectionProps },
      },
      description: "The layout's footer.",
    },
    children: {
      control: false,
      type: { required: true, name: 'symbol' },
      table: {
        category: 'props',
        type: { summary: 'ReactElement' },
      },
      description: "The layout's content.",
    },
    isLoading: {
      control: 'boolean',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: 'Determines if the layout is in loading state.',
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
      table: { defaultValue: { summary: 'layout' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    maxWidth: 'full',
    backgroundColor: 'default',
    isLoading: false,
    children: <Storybook.ContentPlaceholder height="1000px" label="Content Section" />,
    header: {
      isSticky: false,
      content: <Storybook.ContentPlaceholder height="100px" label="Header section" />,
    },
    footer: {
      isSticky: false,
      content: <Storybook.ContentPlaceholder height="100px" label="Footer section" />,
    },
    tabIndex: undefined,
    'data-testid': 'layout',
  },
};
export default meta;

export const LayoutFull: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="full" tabIndex={0} />,
};
export const Layout1600: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="1600px" tabIndex={0} />,
};

export const Layout1200: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="1200px" tabIndex={0} />,
};

export const Layout900: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="900px" tabIndex={0} />,
};

export const Layout800: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="800px" tabIndex={0} />,
};

export const Layout600: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="600px" tabIndex={0} />,
};

export const Layout480: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth="480px" tabIndex={0} />,
};

export const LayoutCustom: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} maxWidth={300} tabIndex={0} />,
};

export const isLoading: StoryObj<typeof Layout> = {
  render: (args) => <Layout {...args} isLoading tabIndex={0} />,
};

export const VerticallyCenteredContent: StoryObj<typeof Layout> = {
  render: (args) => (
    <Layout {...args}>
      <Container height="full" alignItems="center">
        <Storybook.ContentPlaceholder height="50px" label="Content Section" />
      </Container>
    </Layout>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const StickyHeaderAndFooter: StoryObj<typeof Layout> = {
  render: () => (
    <Layout
      header={{
        isSticky: true,
        content: <Storybook.ContentPlaceholder height="100px" label="Header section" />,
      }}
      footer={{
        isSticky: true,
        content: <Storybook.ContentPlaceholder height="100px" label="Footer section" />,
      }}
      tabIndex={0}
    >
      <Storybook.ContentPlaceholder height="1000px" label="Content Section" />
    </Layout>
  ),
};

export const UsingLayoutInsideLayoutContent: StoryObj<typeof Layout> = {
  render: () => (
    <Layout
      header={{
        isSticky: true,
        content: <Storybook.ContentPlaceholder height="100px" label="Header section" />,
      }}
      footer={{
        isSticky: true,
        content: <Storybook.ContentPlaceholder height="100px" label="Footer section" />,
      }}
      tabIndex={0}
    >
      <Group variant="vertical">
        <Storybook.ContentPlaceholder height="1000px" label="Content Section" />
        <Layout maxWidth="600px" paddingContent="none">
          <Storybook.ContentPlaceholder height="200px" label="Empty State" />
        </Layout>
      </Group>
    </Layout>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

setChromaticViewports(
  [LayoutFull, Layout1600, Layout1200, Layout800, Layout600, Layout480, LayoutCustom],
  ['xs', 's', 'm', 'l', 'xl']
);
