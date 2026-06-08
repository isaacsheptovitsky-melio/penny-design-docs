import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { ActionsDropdownMenu } from '@/components/containers/menus/ActionsDropdownMenu';
import { Layout } from '@/components/layouts/Layout';
import { getUnionTypeSummary, setChromaticViewports } from '@/test-utils/storybook.utils';
import { getThemeColorKeys } from '@/theme/foundations/colors/utils';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { Text } from '../../dataDisplay';
import { Button } from '../Button';
import { NakedButton } from '../NakedButton';
import { ActionBar } from './ActionBar';

const summaryItemsType = `{
  label: string;
  value: string;
  tooltip?: {
    content: ReactNode;
    shouldAddTriggerFocus?: boolean;
    triggerAriaLabel?: string;
  };
  testId?: string;
}[]`;

const actionsType = `{
  component: typeof Button | typeof IconButton | typeof NakedButton | typeof ActionsDropdownMenu;
  props: ButtonProps | IconButtonProps | NakedButtonProps | ActionsDropdownMenuProps;
  testId?: string;
}[]`;

const maxWidthOptions = ['full', '1600px', '1200px', '800px', '600px', '480px'];

const meta: Meta<typeof ActionBar> = {
  title: 'Action Components/Action Bar [pattern]',
  component: ActionBar,
  parameters: {
    docs: {
      description: {
        component:
          'This component is meant to be placed at the bottom of its container. In order to do that, its container should have `position: relative` set to it.',
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      type: { name: 'string' },
      options: [...maxWidthOptions, 200],
      table: {
        category: 'props',
        type: { summary: `${getUnionTypeSummary(maxWidthOptions)} | number (custom)` },
      },
      description: "The action bar's max width - should be aligned with the Layout.",
    },
    isOpen: {
      control: false,
      description: 'Determines if the component is visible or not.',
      table: { category: 'props', type: { summary: 'boolean' } },
    },
    isLoading: {
      description: 'Determines if the action bar is loading',
      control: false,
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    loadingText: {
      control: false,
      description: 'The actions bar loading text.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    summaryItems: {
      control: false,
      description: 'Items placed at the left side of the component.',
      table: { category: 'props', type: { summary: 'SummaryItem[]', detail: summaryItemsType } },
    },
    actions: {
      control: false,
      description: 'Actions placed at the right side of the component.',
      table: { category: 'props', type: { summary: 'Action[]', detail: actionsType } },
    },
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
  },
};
export default meta;

export const Main: StoryObj<typeof ActionBar> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useBoolean(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isExtraSmallScreen } = useBreakpoint();

    return (
      <Layout>
        <Group variant="vertical" spacing="xl">
          <Group justifyContent="space-between" spacing="m">
            <Text as="h2" textStyle="heading1Semi">
              Screen heading
            </Text>
            <Button label="Toggle Action Bar" onClick={setIsOpen.toggle} />
          </Group>
          <Storybook.ContentPlaceholder label="Screen content" height="700px" />
        </Group>
        <ActionBar
          {...args}
          isOpen={isOpen}
          summaryItems={[
            { label: 'Total amount', value: '$100.00' },
            { label: 'Bills', value: '3', tooltip: { content: 'Bills selected' } },
          ]}
          actions={[
            {
              component: ActionsDropdownMenu,
              props: {
                variant: 'inverse',
                label: 'Actions',
                isOpen: isMenuOpen,
                onOpenChange: setIsMenuOpen,
                items: [
                  { label: 'Edit', onClick: () => setIsMenuOpen(false) },
                  { label: 'Do it', onClick: () => setIsMenuOpen(false) },
                ],
              },
            },
            { component: Button, props: { label: 'Primary', variant: 'primary-inverse' } },
          ]}
        />
        {isExtraSmallScreen && <Storybook.ContentPlaceholder label="Bottom Bar" />}
      </Layout>
    );
  },
};

// On these viewport sizes the action bar's items change their layout.
setChromaticViewports([Main], ['s', 'm']);

export const WithNakedButtonAction: StoryObj<typeof ActionBar> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useBoolean(true);
    const { isExtraSmallScreen } = useBreakpoint();

    return (
      <Layout>
        <Group variant="vertical" spacing="xl">
          <Group justifyContent="space-between" spacing="m">
            <Text as="h2" textStyle="heading1Semi">
              Screen heading
            </Text>
            <Button label="Toggle Action Bar" onClick={setIsOpen.toggle} />
          </Group>
          <Storybook.ContentPlaceholder label="Screen content" height="700px" />
        </Group>
        <ActionBar
          {...args}
          isOpen={isOpen}
          summaryItems={[
            { label: 'Selected bills', value: '1' },
            { label: 'All bills', value: '20' },
            { label: 'Total amount', value: '$2,200.00' },
          ]}
          actions={[
            {
              component: NakedButton,
              props: {
                variant: 'invert',
                label: 'Cancel',
              },
            },
            { component: Button, props: { label: 'Review & Pay', variant: 'primary-inverse' } },
          ]}
        />
        {isExtraSmallScreen && <Storybook.ContentPlaceholder label="Bottom Bar" />}
      </Layout>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Loading: StoryObj<typeof ActionBar> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useBoolean(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isExtraSmallScreen } = useBreakpoint();

    return (
      <Layout>
        <Group variant="vertical" spacing="xl">
          <Group justifyContent="space-between" spacing="m">
            <Text as="h2" textStyle="heading1Semi">
              Screen heading
            </Text>
            <Button label="Toggle Action Bar Loading State" onClick={setIsLoading.toggle} />
          </Group>
          <Storybook.ContentPlaceholder label="Screen content" height="700px" />
        </Group>
        <ActionBar
          {...args}
          isOpen
          isLoading={isLoading}
          loadingText="Loading..."
          summaryItems={[
            { label: 'Total amount', value: '$100.00' },
            { label: 'Bills', value: '3', tooltip: { content: 'Bills selected' } },
          ]}
          actions={[
            {
              component: ActionsDropdownMenu,
              props: {
                variant: 'inverse',
                label: 'Actions',
                isOpen: isMenuOpen,
                onOpenChange: setIsMenuOpen,
                items: [
                  { label: 'Edit', onClick: () => setIsMenuOpen(false) },
                  { label: 'Do it', onClick: () => setIsMenuOpen(false) },
                ],
              },
            },
            { component: Button, props: { label: 'Primary', variant: 'primary-inverse' } },
          ]}
        />
        {isExtraSmallScreen && <Storybook.ContentPlaceholder label="Bottom Bar" />}
      </Layout>
    );
  },
};

export const BackgroundColor: StoryObj<typeof ActionBar> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useBoolean(true);
    const { isExtraSmallScreen } = useBreakpoint();

    return (
      <Layout>
        <Group variant="vertical" spacing="xl">
          <Group justifyContent="space-between" spacing="m">
            <Text as="h2" textStyle="heading1Semi">
              Screen heading
            </Text>
            <Button label="Toggle Action Bar" onClick={setIsOpen.toggle} />
          </Group>
          <Storybook.ContentPlaceholder label="Screen content" height="700px" />
        </Group>
        <ActionBar
          {...args}
          backgroundColor="global.brand.700"
          isOpen={isOpen}
          summaryItems={[
            { label: 'Total amount', value: '$100.00' },
            { label: 'Bills', value: '3', tooltip: { content: 'Bills selected' } },
          ]}
          actions={[
            { component: Button, props: { label: 'Secondary', variant: 'secondary-inverse' } },

            { component: Button, props: { label: 'Primary', variant: 'primary-inverse' } },
          ]}
        />
        {isExtraSmallScreen && <Storybook.ContentPlaceholder label="Bottom Bar" />}
      </Layout>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
