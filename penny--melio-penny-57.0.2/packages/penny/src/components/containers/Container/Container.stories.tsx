import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useCallback } from 'react';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { Group } from '../Group';
import { Container } from './Container';
import { BackgroundColorOptions, BorderOptions } from './Container.types';

const themeSpaceKeysOptions = Object.keys(themeSpaceKeys);
const borderOptions = Object.values(BorderOptions);
const backgroundColorOptions = Object.values(BackgroundColorOptions);
const alignItemsOptions = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
const justifyContentOptions = [
  'stretch',
  'center',
  'flex-start',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
  'baseline',
];
const textAlignOptions = ['start', 'center', 'end', 'justify'];

const positionOptions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

const overflowOptions = ['visible', 'hidden', 'clip', 'scroll', 'auto', 'initial', 'inherit'];

const meta: Meta<typeof Container> = {
  title: 'Containers/Container',
  component: Container,
  argTypes: {
    border: {
      control: 'select',
      options: borderOptions,
      description: "Determines the container's border styles.",
      table: {
        type: { summary: getUnionTypeSummary(borderOptions) },
        defaultValue: { summary: `${BorderOptions.None}` },
        category: 'props',
      },
    },
    backgroundColor: {
      control: 'select',
      options: backgroundColorOptions,
      description: "Determines the container's background color.",
      table: {
        type: { summary: getUnionTypeSummary(backgroundColorOptions) },
        defaultValue: { summary: `${BackgroundColorOptions.Default}` },
        category: 'props',
      },
    },
    paddingX: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The container's x-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        defaultValue: { summary: `${themeSpaceKeys.none}` },
        category: 'props',
      },
    },
    paddingY: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The container's y-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        defaultValue: { summary: `${themeSpaceKeys.none}` },
        category: 'props',
      },
    },
    paddingTop: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The container's top padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        category: 'props',
      },
    },
    paddingBottom: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The container's bottom padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        category: 'props',
      },
    },
    paddingLeft: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The container's left padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        category: 'props',
      },
    },
    paddingRight: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The container's right padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        category: 'props',
      },
    },
    width: {
      description: 'The width of the container.',
      control: 'select',
      options: ['full', 'fit-content'],
      table: { defaultValue: { summary: 'full' }, type: { summary: 'full | fit-content' }, category: 'props' },
    },
    maxWidth: {
      description:
        "The max-width of the container.<br />If the width of the container set to fit-content then you shouldn't define a max-width.",
      control: 'text',
      table: {
        type: { summary: "CSSProperties['maxWidth']" },
        defaultValue: { summary: 'none' },
        category: 'props',
      },
    },
    height: {
      description: 'The height of the container.',
      control: 'select',
      options: ['full', 'auto', 'fit-content'],
      table: {
        defaultValue: { summary: 'auto' },
        type: { summary: 'full | auto | fit-content' },
        category: 'props',
      },
    },
    alignItems: {
      control: 'select',
      options: alignItemsOptions,
      description: 'Align the items on the secondary axis.',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(alignItemsOptions) },
        defaultValue: { summary: 'stretch' },
      },
    },
    justifyContent: {
      control: 'select',
      options: justifyContentOptions,
      description: 'Align the items on the primary axis.',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(justifyContentOptions) },
        defaultValue: { summary: 'stretch' },
      },
    },
    textAlign: {
      control: 'select',
      options: textAlignOptions,
      description: 'Align the text in the items.',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(textAlignOptions) },
        defaultValue: { summary: 'start' },
      },
    },
    overflow: {
      control: 'select',
      options: overflowOptions,
      description: 'Determine what should happen if content overflows.',
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(overflowOptions) },
        defaultValue: { summary: 'hidden' },
      },
    },
    tabIndex: {
      control: 'number',
      type: { name: 'number' },
      description: 'Sets the tab index of the container, needed for accessibility when the content is scrollable.',
      table: {
        category: 'props',
      },
    },
    isSticky: {
      control: 'boolean',
      description:
        "Determines if the container is in a sticky position.  When provided, it overrides the 'position' and 'top' properties.",
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'select',
      options: positionOptions,
      description: "Sets the container's position.",
      table: {
        type: { summary: getUnionTypeSummary(positionOptions) },
        category: 'props',
        defaultValue: { summary: 'static' },
      },
    },
    top: {
      control: 'text',
      description:
        'Determine the final top location of positioned container. This prop should be used to override the default top position locations.',
      table: {
        defaultValue: { summary: 'initial' },
        type: { summary: `CSSProperties['top']` },
        category: 'props',
      },
    },
    left: {
      control: 'text',
      description:
        'Determine the final left location of positioned container. This prop should be used to override the default left position locations.',
      table: {
        defaultValue: undefined,
        type: { summary: `CSSProperties['left']` },
        category: 'props',
      },
    },
    bottom: {
      control: 'text',
      description:
        'Determine the final bottom location of positioned container. This prop should be used to override the default bottom position locations.',
      table: {
        defaultValue: undefined,
        type: { summary: `CSSProperties['bottom']` },
        category: 'props',
      },
    },
    right: {
      control: 'text',
      description:
        'Determine the final right location of positioned container. This prop should be used to override the default right position locations.',
      table: {
        defaultValue: undefined,
        type: { summary: `CSSProperties['right']` },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'container' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    border: 'none',
    backgroundColor: 'white',
    paddingX: 'none',
    paddingY: 'none',
    width: 'full',
    height: 'auto',
    overflow: 'hidden',
    isSticky: false,
    'data-testid': 'container',
  },
};
export default meta;

export const Main: StoryObj<typeof Container> = {
  render: ({ ...args }) => (
    <Container {...args}>
      <Storybook.ContentPlaceholder />
    </Container>
  ),
};

export const Backgrounds: StoryObj<typeof Container> = {
  render: (args) => (
    <Storybook.Container padding="xs" backgroundColor="global.brand.100" display="flex" flexDirection="column" gap="xs">
      <Container {...args} paddingX="m" paddingY="m" backgroundColor="default" border="regular">
        <Storybook.ContentPlaceholder label="Transparent" />
      </Container>
      <Container {...args} paddingX="m" paddingY="m" backgroundColor="light" border="regular">
        <Storybook.ContentPlaceholder label="Light" />
      </Container>
      <Container {...args} paddingX="m" paddingY="m" backgroundColor="white" border="regular">
        <Storybook.ContentPlaceholder label="White" />
      </Container>
    </Storybook.Container>
  ),
};

export const WithBorder: StoryObj<typeof Container> = {
  render: (args) => (
    <Group variant="vertical">
      <Container {...args} paddingX="m" paddingY="m" backgroundColor="default" border="regular">
        <Storybook.ContentPlaceholder />
      </Container>
      <Container {...args} paddingX="m" paddingY="m" backgroundColor="light" border="regular">
        <Storybook.ContentPlaceholder />
      </Container>
      <Container {...args} paddingX="m" paddingY="m" backgroundColor="light" border="dashed">
        <Storybook.ContentPlaceholder />
      </Container>
    </Group>
  ),
};

export const Width: StoryObj<typeof Container> = {
  render: (args) => (
    <Group variant="vertical">
      <Container {...args} paddingY="s" paddingX="s" border="regular" backgroundColor="light" width="fit-content">
        <Storybook.ContentPlaceholder label="I am only as wide as my content!" />
      </Container>
      <Container {...args} paddingY="s" paddingX="s" border="regular" backgroundColor="light" width="full">
        <Storybook.ContentPlaceholder label="I am using 100% of the available width!" />
      </Container>
    </Group>
  ),
};

export const Height: StoryObj<typeof Container> = {
  render: (args) => (
    <Group variant="vertical" height="full">
      <Container {...args} paddingY="s" paddingX="s" border="regular" backgroundColor="light" height="auto">
        <Storybook.ContentPlaceholder label="I am only as high as my content!" />
      </Container>
      <Container
        {...args}
        paddingY="s"
        paddingX="s"
        border="regular"
        backgroundColor="light"
        height="full"
        justifyContent="center"
      >
        <Storybook.ContentPlaceholder label="I am using 100% of the available height!" />
      </Container>
    </Group>
  ),
  decorators: [(Story) => <Storybook.Container height="100vh">{Story()}</Storybook.Container>],
};

export const Sticky: StoryObj<typeof Container> = {
  render: (args) => {
    const ref = useCallback((el: HTMLDivElement) => {
      if (isUsingVisualTesting()) {
        el.scrollTop = 500;
      }
    }, []);

    return (
      <Storybook.Container ref={ref} height="100vh" overflow="auto" tabIndex={0}>
        <Group variant="vertical">
          <Text textStyle="heading1Semi">Page Title</Text>
          <Container {...args} paddingY="s" paddingX="s" isSticky>
            <Storybook.ContentPlaceholder label="I am sticky" height="100px" />
          </Container>
          <Storybook.ContentPlaceholder
            height="1200px"
            label="I am using 1200px hight to create a scrollable content"
          />
        </Group>
      </Storybook.Container>
    );
  },
};
