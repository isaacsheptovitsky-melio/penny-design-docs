import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';
import { Chip } from '@/components/selectionAndInputs/Chip';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { GroupVariants } from './Group.utils';
import { Group, GroupItem } from './index';

const dividerProps = `{
  role?: AriaRole;
  as?: ElementType;
}`;

const meta: Meta<typeof Group> = {
  title: 'Containers/Group',
  component: Group,
  argTypes: {
    children: {
      control: false,
      description: 'The content of the group to be arranged.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    spacing: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: 'Determines the spacing between the elements.',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(Object.keys(themeSpaceKeys)) },
        defaultValue: { summary: 's' },
      },
    },
    variant: {
      control: 'select',
      options: Object.keys(GroupVariants),
      description: 'Determines the variant of the group (to which direction it will flow).',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(Object.keys(GroupVariants)) },
        defaultValue: { summary: 'horizontal' },
      },
    },
    hasDivider: {
      control: 'boolean',
      description: 'Determines if to add a divider between elements.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    allowOverflowX: {
      control: 'boolean',
      description: 'Should the group allow the content to overflow in the X axis.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
      description: 'Align the items on the secondary axis.',
      table: {
        category: 'props',
        type: { summary: "CSSProperties['alignItems']" },
        defaultValue: { summary: 'stretch' },
      },
    },
    justifyContent: {
      control: 'select',
      options: [
        'stretch',
        'center',
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
        'baseline',
      ],
      description: 'Align the items on the primary axis.',
      table: {
        category: 'props',
        type: { summary: "CSSProperties['justifyContent']" },
        defaultValue: { summary: 'stretch' },
      },
    },
    textAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'justify'],
      description: 'Align the text in the items.',
      table: {
        category: 'props',
        type: { summary: "CSSProperties['textAlign']" },
        defaultValue: { summary: 'start' },
      },
    },
    width: {
      description: 'The width of the container.',
      control: 'select',
      options: ['full', 'fit-content', 'auto'],
      table: {
        defaultValue: { summary: 'auto' },
        type: { summary: 'full | fit-content | auto' },
        category: 'props',
      },
    },
    height: {
      description: 'The height of the container.',
      control: 'select',
      options: ['full', 'fit-content', 'auto'],
      table: {
        defaultValue: { summary: 'auto' },
        type: {
          summary: 'full | fit-content | auto',
        },
        category: 'props',
      },
    },
    dividerProps: {
      description: 'The dividers a11y props',
      control: 'object',
      table: {
        type: { summary: 'AriaRole & ElementType', detail: dividerProps },
        category: 'props',
      },
    },
    role: {
      control: 'text',
      description: 'The semantic meaning of the element.',
      table: {
        type: { summary: 'AriaRole' },
        category: 'accessibility',
      },
    },
    as: {
      control: 'text',
      description: 'Determines which type of element the component should be rendered as.',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'ElementType' },
        category: 'props',
      },
    },
  },
  args: {
    children: ['Element 1', 'Element 2', 'Element 3'].map((label) => (
      <Storybook.ContentPlaceholder key={label} width="120px" height="120px" label={label} />
    )),
    spacing: 's',
    variant: 'horizontal',
    hasDivider: false,
    alignItems: 'stretch',
    justifyContent: 'stretch',
    textAlign: 'start',
    width: 'auto',
    height: 'auto',
    allowOverflowX: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Group> = {};

export const Variants: StoryObj<typeof Group> = {
  render: (args) => (
    <Group variant="vertical" alignItems="flex-start">
      <Text textStyle="heading3">Horizontal</Text>
      <Group {...args} variant="horizontal" />
      <Text textStyle="heading3">Vertical</Text>
      <Group {...args} variant="vertical" />
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithDividers: StoryObj<typeof Group> = {
  render: (args) => <Group {...args} variant="horizontal" hasDivider />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export const Width: StoryObj<typeof Group> = {
  render: (args) => (
    <Group variant="vertical" alignItems="center">
      I am only as wide as my content!
      <Group {...args} justifyContent="space-between" hasDivider width="fit-content" />
      I am using 100% of the available width!
      <Group {...args} justifyContent="space-between" hasDivider width="full" />
    </Group>
  ),
};

export const Height: StoryObj<typeof Group> = {
  render: (args) => (
    <Storybook.Container height="600px">
      <Group justifyContent="space-around" height="full">
        <Group variant="vertical" alignItems="center">
          I am only as high as my content!
          <Group {...args} variant="vertical" justifyContent="space-between" hasDivider height="fit-content" />
        </Group>
        <Group variant="vertical" alignItems="center">
          I am using 100% of the available height!
          <Group {...args} variant="vertical" justifyContent="space-between" hasDivider height="full" />
        </Group>
      </Group>
    </Storybook.Container>
  ),
};

/**
 * Example of a `Group` component with the `allowOverflowX` property.<br/>
 * When `allowOverflowX` is enabled, the `Group` has positive padding and negative margins to prevent clipping of the focus indicator.<br/>
 *
 * **Note:**
 * Avoid rendering two `Group`s with the `allowOverflowX` property next to each other, as this can cause margin collapse and affect the layout height.
 * To prevent this, wrap each `Group` with a `div`.
 */
export const WithOverflowX: StoryObj<typeof Group> = {
  render: (args) => (
    <Group justifyContent="space-around" height="full">
      <Group variant="vertical" alignItems="center">
        I overflow on the X axis!
        <Storybook.Container width="350px">
          <Group {...args} allowOverflowX>
            <Chip label="This is me" />
            <Chip label="In progress" />
            <Chip label="Woot woot" />
            <Chip label="Chiki chiki chaka" />
          </Group>
        </Storybook.Container>
      </Group>
    </Group>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const GroupItemExamples: StoryObj<typeof Group> = {
  render: () => (
    <Group variant="vertical">
      Basis
      <Group width="full">
        <GroupItem basis="50%">
          <Storybook.ContentPlaceholder key="1" height="120px" label="basis: 50%" />
        </GroupItem>
        <GroupItem basis="50%">
          <Storybook.ContentPlaceholder key="2" height="120px" label="basis: 50%" />
        </GroupItem>
      </Group>
      Grow
      <Group>
        <GroupItem>
          <Storybook.ContentPlaceholder key="1" height="120px" label="" />
        </GroupItem>
        <GroupItem grow={1}>
          <Storybook.ContentPlaceholder key="2" height="120px" label="grow: 1" />
        </GroupItem>
      </Group>
      Order
      <Group>
        <GroupItem order={0}>
          <Storybook.ContentPlaceholder key="1" height="120px" label="order: 0" />
        </GroupItem>
        <GroupItem order={2}>
          <Storybook.ContentPlaceholder key="2" height="120px" label="order: 2" />
        </GroupItem>
        <GroupItem order={1}>
          <Storybook.ContentPlaceholder key="3" height="120px" label="order: 1" />
        </GroupItem>
        <GroupItem>
          <Storybook.ContentPlaceholder key="4" height="120px" label="" />
        </GroupItem>
        <GroupItem order={-1}>
          <Storybook.ContentPlaceholder key="6" height="120px" label="order: -1" />
        </GroupItem>
      </Group>
      Shrink
      <Group>
        <GroupItem basis="100%">
          <Storybook.ContentPlaceholder key="1" height="120px" label="" />
        </GroupItem>
        <GroupItem basis="400px" shrink={0}>
          <Storybook.ContentPlaceholder key="2" height="120px" label="shrink: 0" />
        </GroupItem>
      </Group>
      Align Self
      <Group width="full">
        <GroupItem>
          <Storybook.ContentPlaceholder key="1" height="200px" label="" />
        </GroupItem>
        <GroupItem alignSelf="end">
          <Storybook.ContentPlaceholder key="2" height="120px" label="alignSelf: end" />
        </GroupItem>
        <GroupItem alignSelf="center">
          <Storybook.ContentPlaceholder key="3" height="120px" label="alignSelf: center" />
        </GroupItem>
      </Group>
    </Group>
  ),
};
