import { SimpleGrid } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Text } from '@/components/dataDisplay/Text';
import { RadioGroup } from '@/components/selectionAndInputs/RadioGroup';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { defaultDesignTokens, getThemeColorKeys, themeSpaceKeys } from '@/theme/foundations';

import { Group } from '../Group';
import { Panel } from './Panel';
import { type PanelProps } from './Panel.types';

const themeSpaceKeysOptions = Object.keys(themeSpaceKeys);
const borderRadiusTokensKeys = Object.keys(defaultDesignTokens.borderRadii.global).map((token) => `global.${token}`);

/**
 * The `Panel` is a container that can stick to the top, bottom, left, or right of its container.
 *
 * <b>Features:</b>
 * - The Panel's position is set to sticky by default and leaves a gap to avoid overlap with the layout’s content. For an overlay effect, set the `position` prop to fixed or absolute. see [Position](#position)'s story.<br />
 * - The Panel is placed at the bottom of its container by default. To change the `placement`, use the placement prop. see [Placements](#placements)' story.<br />
 * - Customize the background color of the Panel using the `backgroundColor` prop. see [Background Color](#background-color)'s story.<br />
 * - Enable a transition slide effect by setting the `transitionConfig` prop and control the visibility of the Panel by setting the `in` prop to true or false. see [Transition Config](#transition-config)'s story.<br />
 */
const meta: Meta<typeof Panel> = {
  title: 'Containers/Panel',
  component: Panel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: [...Object.keys(getThemeColorKeys()), 'inherit'],
      table: {
        category: 'props',
        type: { summary: [...Object.keys(getThemeColorKeys()), 'inherit'].join(' | ') },
        defaultValue: { summary: 'semantic.surface.inverse' },
      },
      description: 'The background color of the sticky panel.',
    },
    placement: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: 'The placement of the sticky panel.',
      table: {
        category: 'props',
        type: { summary: 'bottom | top | left | right' },
        defaultValue: { summary: 'bottom' },
      },
    },
    position: {
      control: 'select',
      options: ['sticky', 'fixed', 'absolute'],
      description: 'Sets the sticky panel position.',
      table: {
        type: { summary: 'sticky | fixed | absolute' },
        category: 'props',
        defaultValue: { summary: 'sticky' },
      },
    },
    transitionConfig: {
      control: 'object',
      description:
        'The transition configuration for the panel. If provided, the panel will slide to the specified placement. `in` determines if the panel should be visible or not.',
      table: {
        type: { summary: '{ in: boolean }' },
        category: 'props',
        defaultValue: { summary: 'undefined' },
      },
    },
    paddingX: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The panel's x-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        defaultValue: { summary: `'${themeSpaceKeys.m}'` },
        category: 'props',
      },
    },
    paddingY: {
      control: 'select',
      options: themeSpaceKeysOptions,
      description: "The panel's y-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(themeSpaceKeysOptions) },
        defaultValue: { summary: `'${themeSpaceKeys.s}'` },
        category: 'props',
      },
    },
    width: {
      control: 'text',
      description: 'The width of the panel.',
      table: {
        type: { summary: `string | ResponsiveValue<BorderKey>` },
        defaultValue: { summary: '100%' },
        category: 'props',
      },
    },
    maxWidth: {
      control: 'text',
      description: 'The max-width of the panel.',
      table: {
        type: { summary: `string | ResponsiveValue<BorderKey>` },
        defaultValue: { summary: '100%' },
        category: 'props',
      },
    },
    borderRadius: {
      control: 'select',
      description: 'The border radius of the panel.',
      options: [undefined, ...borderRadiusTokensKeys],
      table: {
        type: {
          summary: getUnionTypeSummary(borderRadiusTokensKeys),
        },
        category: 'props',
      },
    },
  },
  args: {
    position: 'sticky',
    backgroundColor: 'semantic.surface.inverse',
    placement: 'bottom',
  },
};
export default meta;

export const Main: StoryObj<typeof Panel> = {
  render: (args) => {
    // determine if the layout of the container is vertical or horizontal.
    const isVerticalLayout = !args.placement || args.placement === 'top' || args.placement === 'bottom';

    // determine if the panel should be rendered first according to the provided placement.
    const stickyShouldBeFirst = args.placement === 'top' || args.placement === 'left';

    // determine the group variant according to the layout of the container.
    const groupVariant = isVerticalLayout ? 'vertical' : 'horizontal';

    const contentPlaceholder = (
      <Storybook.ContentPlaceholder
        label="Content Section"
        height={isVerticalLayout ? '1000px' : '500px'}
        width={isVerticalLayout ? '100%' : '1500px'}
      />
    );

    const panel = (
      <Panel {...args}>
        <Storybook.ContentPlaceholder
          label="panel content"
          height={isVerticalLayout ? '50px' : '100%'}
          width={isVerticalLayout ? '100%' : '100px'}
        />
      </Panel>
    );
    return (
      <Group variant={groupVariant} spacing="l">
        {stickyShouldBeFirst && panel}
        {contentPlaceholder}
        {!stickyShouldBeFirst && panel}
      </Group>
    );
  },
  decorators: [
    (Story) => (
      <Storybook.Container height="500px" tabIndex={0} overflow="auto">
        {Story()}
      </Storybook.Container>
    ),
  ],
};

/**
 * The Panel can be positioned in three different ways:<br />
 * - `sticky`: Initially positioned relative to its parent until it reaches a specified offset position within the viewport, after which it “sticks” in place (similar to position: fixed).<br />
 * - `fixed`: Positioned relative to the viewport, meaning it remains in the same location even when the page is scrolled.<br />
 * - `absolute`: Positioned relative to its nearest positioned ancestor (instead of being positioned relative to the viewport like fixed). This allows it to move within its container’s flow but can overlap other elements.<br />
 * <b>Note</b>: Elements with absolute and fixed positioning are taken out of the normal document flow, which can lead to overlapping with other elements.
 */
export const Positions: StoryObj<typeof Panel> = {
  render: (args) => {
    const [position, setPosition] = useState<PanelProps['position']>(args.position ?? 'sticky');
    return (
      <Storybook.Container height="500px" width="100%">
        <Group variant="vertical">
          <Storybook.Container alignSelf="center" paddingTop="s">
            <RadioGroup
              variant="horizontal"
              options={[
                { label: 'Sticky', ariaLabel: '', value: 'sticky' },
                { label: 'Fixed', ariaLabel: '', value: 'fixed' },
                { label: 'Absolute', ariaLabel: '', value: 'absolute' },
              ]}
              value={position}
              onChange={(e) => e.target.value && setPosition(e.target.value as PanelProps['position'])}
            />
          </Storybook.Container>
          <Group variant="vertical" spacing="l">
            <Storybook.ContentPlaceholder label="Content Section" height="1000px" />
            <Panel {...args} position={position}>
              <Storybook.ContentPlaceholder label={`Panel's position is ${position}`} height="50px" />
            </Panel>
          </Group>
        </Group>
      </Storybook.Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  decorators: [
    (Story) => (
      <Storybook.Container height="500px" position="relative">
        {Story()}
      </Storybook.Container>
    ),
  ],
};

export const BackgroundColor: StoryObj<typeof Panel> = {
  args: {
    ...Main.args,
    backgroundColor: 'global.brand.700',
  },
  render: (args) => (
    <Group variant="vertical">
      <Storybook.ContentPlaceholder label="Content Section" height="1000px" />
      <Panel {...args}>
        <Storybook.ContentPlaceholder label="Panel content" height="50px" />
      </Panel>
    </Group>
  ),
  decorators: [
    (Story) => (
      <Storybook.Container height="500px" overflow="auto" tabIndex={0}>
        {Story()}
      </Storybook.Container>
    ),
  ],
};

/**
 * The Panel can be positioned at the top, bottom, left, or right of its container.<br />
 * <b>Note</b>: When using sticky positioning, the panel adheres to the container’s layout. To ensure correct functionality, if the panel is intended to stick to the top or left of the container, it should be rendered first.
 */
export const Placements: StoryObj<typeof Panel> = {
  render: (args) => (
    <SimpleGrid column={2} gridTemplateColumns="1fr 1fr" spacing="m">
      <Storybook.Container height="500px" overflow="auto" tabIndex={0}>
        <Group variant="vertical" spacing="l">
          <Storybook.ContentPlaceholder label="Content Section with Panel at Bottom" height="1000px" />
          <Panel {...args} placement="bottom">
            <Storybook.ContentPlaceholder label="I'm a panel at the Bottom of the container" height="50px" />
          </Panel>
        </Group>
      </Storybook.Container>
      <Storybook.Container height="500px" overflow="auto" tabIndex={0}>
        <Group variant="vertical" spacing="l">
          <Panel {...args} placement="top">
            <Storybook.ContentPlaceholder label="I'm a panel at the Top of the container" height="50px" />
          </Panel>
          <Storybook.ContentPlaceholder label="Content Section with Panel at Top" height="1000px" />
        </Group>
      </Storybook.Container>
      <Storybook.Container height="500px" overflow="auto" tabIndex={0}>
        <Group width="full" height="full" spacing="l">
          <Panel {...args} placement="left">
            <Storybook.ContentPlaceholder
              label="I'm a panel at the Left of the container"
              height="100%"
              width="100px"
            />
          </Panel>
          <Storybook.ContentPlaceholder label="Content Section with Panel at Left" height="100%" />
        </Group>
      </Storybook.Container>
      <Storybook.Container height="500px" overflow="auto" tabIndex={0}>
        <Group width="full" height="full" spacing="l">
          <Storybook.ContentPlaceholder label="Content Section with Panel at Right" height="100%" />
          <Panel {...args} placement="right">
            <Storybook.ContentPlaceholder
              label="I'm a panel at the Right of the container"
              height="100%"
              width="100px"
            />
          </Panel>
        </Group>
      </Storybook.Container>
    </SimpleGrid>
  ),
};

/**
 * The Panel have a transition slide effect when the `transitionConfig` provided, the panel will slide to the specified placement.
 * The `in` prop determines if the panel should be visible or not.
 */
export const TransitionConfig: StoryObj<typeof Panel> = {
  args: {
    ...Main.args,
    transitionConfig: { in: true },
  },
  render: (args) => {
    const [isShown, setIsShown] = useBoolean(args.transitionConfig?.in ?? false);

    return (
      <Group variant="vertical" spacing="m" width="full">
        <Storybook.Container padding="s" width="full">
          <Group justifyContent="space-between">
            <Text as="h2" textStyle="heading1Semi">
              Panel is {isShown ? 'displayed' : 'hidden'}
            </Text>
            <Button label="Toggle Panel" onClick={setIsShown.toggle} />
          </Group>
        </Storybook.Container>
        <Group variant="vertical" spacing="l">
          <Storybook.ContentPlaceholder label="Content Section" height="1000px" width="100%" />
          <Panel {...args} transitionConfig={{ in: isShown }}>
            <Storybook.ContentPlaceholder label="Panel content" height="50px" />
          </Panel>
        </Group>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  decorators: [
    (Story) => (
      <Storybook.Container height="500px" overflow="auto" tabIndex={0}>
        {Story()}
      </Storybook.Container>
    ),
  ],
};
