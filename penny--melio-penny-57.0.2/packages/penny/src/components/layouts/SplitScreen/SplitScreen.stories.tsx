import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { getUnionTypeSummary, setChromaticViewports } from '@/test-utils';

import { SplitScreen } from './SplitScreen';

const panelAType = `
{
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  padding?: ThemeSpaceKey;
  isLoading?: boolean;
  minWidth?: number;
  maxWidth?: number;
  tabIndex?: number;
}
`;

const panelBType = `
{
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  padding?: ThemeSpaceKey;
  tabIndex?: number;
}
`;

const variantOptions = ['1:2', '2:1', '1:1'];
/**
 * A layout with two panels, optionally supporting resizing using a vertical bar.<br />
 * In small screens the panels are changed to be on top of each other (panel A is on top of panel B), and the resizing ability is not available.
 */
const meta: Meta<typeof SplitScreen> = {
  title: 'Layouts/Split Screen',
  component: SplitScreen,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
      description:
        'The ratio variant of between the panels.<br/>**Due to an issue, the control is not updating in real-time.**',
      table: {
        defaultValue: { summary: '1:2' },
        type: { summary: getUnionTypeSummary(variantOptions) },
        category: 'props',
      },
    },
    panelA: {
      control: 'object',
      type: { required: true, name: 'string' },
      description:
        "The information related to panel A.<br />In large devices this is the left panel, and in small ones it's the top panel<br/>Only panel A can have minimum and maximum definitions, and they must be numbers that represent the percentage width (e.g `50`).",
      table: {
        type: { summary: 'Object', detail: panelAType },
        category: 'props',
      },
    },
    panelB: {
      control: 'object',
      type: { required: true, name: 'string' },
      description:
        "The information related to panel B.<br />In large devices this is the right panel, and in small ones it's the bottom panel.",
      table: {
        type: { summary: 'Object', detail: panelBType },
        category: 'props',
      },
    },
    header: {
      control: false,
      description: 'Use this to add a header for the whole layout. It will be shown above the 2 panels.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    footer: {
      control: false,
      description: 'Use this to add a footer for the whole layout. It will be shown below the 2 panels.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'split-screen' }, type: { summary: 'string' }, category: 'tests' },
    },
  },
  args: {
    variant: '1:2',
    panelA: {
      content: <Storybook.ContentPlaceholder label="Panel A" height="100%" />,
      minWidth: 12.5,
      maxWidth: 66.67,
    },
    panelB: {
      content: <Storybook.ContentPlaceholder label="Panel B" height="100%" />,
    },
    'data-testid': 'split-screen',
  },
};
export default meta;

export const Main: StoryObj<typeof SplitScreen> = {
  render: (args) => (
    <Storybook.Container height="100vh">
      <SplitScreen {...args} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * The variants of the layout is based on the default size of each panel.<br />
 * In small screens this doesn't have any effect, as the panels are stacked one on top of another and are not resizable.
 */
export const Variants: StoryObj<typeof SplitScreen> = {
  render: (args) => (
    <Group variant="vertical" hasDivider>
      <Group variant="vertical">
        <Text textStyle="heading2Semi">2:1 Ratio</Text>
        <Storybook.Container height="400px" width="100%">
          <SplitScreen {...args} variant="2:1" />
        </Storybook.Container>
      </Group>
      <Group variant="vertical">
        <Text textStyle="heading2Semi">1:2 Ratio</Text>
        <Storybook.Container height="400px" width="100%">
          <SplitScreen {...args} variant="1:2" />
        </Storybook.Container>
      </Group>
      <Group variant="vertical">
        <Text textStyle="heading2Semi">1:1 Ratio</Text>
        <Storybook.Container height="400px" width="100%">
          <SplitScreen {...args} variant="1:1" />
        </Storybook.Container>
      </Group>
    </Group>
  ),
};

/**
 * You can define the minimum and maximum width of `panel A`.`panel B` will always get the rest of the screen width.<br />
 * In small screens this doesn't have any effect, as the panels are not resizable.<br />
 * In this example - panel A has min width of `40%` and max width of `60%`.
 */
export const MinMaxWidth: StoryObj<typeof SplitScreen> = {
  render: (args) => (
    <Storybook.Container height={{ l: '400px', xs: '100vh' }}>
      <SplitScreen {...args} panelA={{ content: args.panelA?.content, minWidth: 40, maxWidth: 60 }} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * A loading state for the whole page.
 */
export const LoadingState: StoryObj<typeof SplitScreen> = {
  render: (args) => (
    <Storybook.Container height={{ l: '400px', xs: '100vh' }}>
      <SplitScreen {...args} />
    </Storybook.Container>
  ),
  args: {
    isLoading: true,
  },
};

/**
 * Loading state can be defined separately for each panel.<br />
 * In small screens this is changed into a single loader in case any of the panels is loading.
 */
export const PanelsLoadingState: StoryObj<typeof SplitScreen> = {
  render: (args) => (
    <Storybook.Container height={{ l: '400px', xs: '100vh' }}>
      <SplitScreen
        {...args}
        panelA={{ content: args.panelA?.content, isLoading: true }}
        panelB={{ content: args.panelB?.content, isLoading: true }}
      />
    </Storybook.Container>
  ),
};

/**
 * In case you don't want the default padding coming with each panel, you can customize it per panel using `panelA/panelB.padding = <space-token>`.<br />
 * Note that you will now be responsible of adding the padding needed for the content over all breakpoints.
 */
export const WithCustomPanelPadding: StoryObj<typeof SplitScreen> = {
  render: (args) => (
    <Storybook.Container height={{ l: '400px', xs: '100vh' }}>
      <SplitScreen
        {...args}
        panelA={{ content: args.panelA?.content, padding: 'none' }}
        panelB={{ content: args.panelB?.content, padding: 'none' }}
      />
    </Storybook.Container>
  ),
};

/**
 * A sticky header and a sticky footer can be defined separately for each panel.<br />
 * In small screens, where the panels are one on top of the other, it does not make a lot of sense to use the header/footer per panel.<br />
 * Instead, use the sticky layout header and footer to cover the whole layout, and have the scrolling work for both panels together.
 */
export const WithStickyHeaderAndFooter: StoryObj<typeof SplitScreen> = {
  render: () => (
    <Storybook.Container height={{ l: '400px', xs: '100vh' }}>
      <SplitScreen
        panelA={{
          content: (
            <Storybook.ContentPlaceholder
              label="Panel A"
              backgroundColor="semantic.background.brand.secondary"
              height={{ l: '100%', xs: '200px' }}
            />
          ),
          header: <Storybook.ContentPlaceholder label="Panel A Header" height="50px" />,
          footer: <Storybook.ContentPlaceholder label="Panel A Footer" height="50px" />,
        }}
        panelB={{
          content: (
            <Storybook.ContentPlaceholder
              label="Panel B"
              backgroundColor="semantic.background.brand.secondary"
              height="400px"
            />
          ),
          header: <Storybook.ContentPlaceholder label="Panel B Header" height="50px" />,
          footer: <Storybook.ContentPlaceholder label="Panel B Footer" height="50px" />,
          tabIndex: 0,
        }}
      />
    </Storybook.Container>
  ),
};

/**
 * A sticky header and a sticky footer for the entire layout.<br />
 * In small screens use this header and footer to have the desired layout, instead of header/footer per panel.<br />
 * This is mostly because in small screens the panels are on top of other, and the scrolling will work well only when the header/footer cover the whole layout.
 */
export const WithStickyLayoutHeaderAndFooter: StoryObj<typeof SplitScreen> = {
  render: () => (
    <Storybook.Container height={{ l: '400px', xs: '100vh' }}>
      <SplitScreen
        header={<Storybook.ContentPlaceholder label="Layout Header" height="50px" />}
        footer={<Storybook.ContentPlaceholder label="Layout Footer" height="50px" />}
        panelA={{
          content: (
            <Storybook.ContentPlaceholder
              label="Panel A"
              backgroundColor="semantic.background.brand.secondary"
              height={{ l: '100%', xs: '200px' }}
            />
          ),
        }}
        panelB={{
          content: (
            <Storybook.ContentPlaceholder
              label="Panel B"
              backgroundColor="semantic.background.brand.secondary"
              height="400px"
            />
          ),
          tabIndex: 0,
        }}
      />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

setChromaticViewports([WithStickyHeaderAndFooter, WithStickyLayoutHeaderAndFooter, Variants], ['xl']);
