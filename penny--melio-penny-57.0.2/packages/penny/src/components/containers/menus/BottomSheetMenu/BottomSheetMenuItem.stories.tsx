import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { FlagIcon } from '@/components/dataDisplay/FlagIcon';
import { Pill } from '@/components/dataDisplay/Pill';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Icon } from '@/components/foundations/Icon';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Container } from '../../Container';
import { Group } from '../../Group';
import { BottomSheetMenu, BottomSheetMenuDropdownList, BottomSheetMenuFooter, BottomSheetMenuItem } from '.';

const meta: Meta<typeof BottomSheetMenuItem> = {
  title: 'Containers/Menus/Bottom Sheet Menu/Item',
  component: BottomSheetMenuItem,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [fullScreenChromaticDecorator],
  argTypes: {
    children: {
      control: false,
      description: 'The content of the item.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    disabled: {
      control: 'object',
      description: 'sets the item as disabled with a message dispalys in tooltip.',
      table: {
        type: { summary: '{ isDisabled: boolean; message?: string }' },
        category: 'props',
      },
    },
    isSelected: {
      control: 'boolean',
      description: 'Determines if the item is selected.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    index: {
      control: 'number',
      description: 'The index of the item',
      table: { category: 'props', type: { summary: 'number' } },
    },
    label: {
      control: 'text',
      description: 'The label of the item',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    onClick: {
      control: false,
      description: 'Handles the click event of the item.',
      table: {
        type: { summary: '(e: MouseEvent<HTMLElement>, triggerEvent?: OpenChangeTriggerEvent) => void' },
        category: 'events',
      },
    },
  },
  args: {
    children: <Storybook.ContentPlaceholder label="Item" />,
    isSelected: false,
    disabled: undefined,
    index: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof BottomSheetMenuItem> = {
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const footer = (
      <BottomSheetMenuFooter>
        <Storybook.ContentPlaceholder label="Footer (optional)" />
      </BottomSheetMenuFooter>
    );
    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0} {...args} />
        <BottomSheetMenuItem key={1} {...args} />
        <BottomSheetMenuItem key={2} {...args} />
        <BottomSheetMenuItem key={3} {...args} />
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
        footer={footer}
      />
    );
  },
};

export const Disabled: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0}>Item #1</BottomSheetMenuItem>
        <BottomSheetMenuItem key={1} disabled>
          Item #2
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={2}>Item #3</BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const Selected: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0}>Item #1</BottomSheetMenuItem>
        <BottomSheetMenuItem key={1} isSelected>
          Item #2
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={2}>Item #3</BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const WithBrandSymbolPrefix: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0}>
          <Group spacing="xs-s" alignItems="center">
            <BrandSymbol type="google" size="medium" />
            Item #1
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={1}>
          <Group spacing="xs-s" alignItems="center">
            <BrandSymbol type="quickbooks" size="medium" />
            Item #2
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={2}>
          <Group spacing="xs-s" alignItems="center">
            <BrandSymbol type="amex" size="medium" />
            Item #3
          </Group>
        </BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const WithIconPrefix: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0}>
          <Group spacing="xs-s" alignItems="center">
            <Icon type="send" size="large" />
            Item #1
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={1}>
          <Group spacing="xs-s" alignItems="center">
            <Icon type="add" size="large" />
            Item #2
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={2}>
          <Group spacing="xs-s" alignItems="center">
            <Icon type="warning" size="large" />
            Item #3
          </Group>
        </BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const WithFlagPrefix: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0}>
          <Group spacing="xs-s" alignItems="center">
            <FlagIcon countryCode="IL" size="medium" />
            Item #1
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={1}>
          <Group spacing="xs-s" alignItems="center">
            <FlagIcon countryCode="AD" size="medium" />
            Item #2
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={2}>
          <Group spacing="xs-s" alignItems="center">
            <FlagIcon countryCode="CD" size="medium" />
            Item #3
          </Group>
        </BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const WithAvatarPrefix: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <BottomSheetMenuItem key={0}>
          <Group spacing="xs-s" alignItems="center">
            <Avatar name="Amir Tugi" size="medium" />
            Item #2
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={1}>
          <Group spacing="xs-s" alignItems="center">
            <Avatar name="Robin the Dog" size="medium" />
            Item #2
          </Group>
        </BottomSheetMenuItem>
        <BottomSheetMenuItem key={2}>
          <Group spacing="xs-s" alignItems="center">
            <Avatar name="Mel the Melio" size="medium" badge={<BrandSymbol type="quickbooks" size="small" />} />
            Item #3
          </Group>
        </BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
};

export const WithItemSuffix: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    return (
      <BottomSheetMenu
        trigger={<Button label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <BottomSheetMenuDropdownList paddingY="xs">
            <BottomSheetMenuItem>
              <Group spacing="xxs" alignItems="center">
                Item #1
                <Icon type="verified" color="brand" size="small" />
              </Group>
            </BottomSheetMenuItem>
            <BottomSheetMenuItem>
              <Group spacing="xxs" alignItems="center">
                Item #2
                <Icon type="verified" color="brand" size="small" />
                <Pill label="Neutral" status="neutral" />
              </Group>
            </BottomSheetMenuItem>
            <BottomSheetMenuItem>
              <Group spacing="xxs" alignItems="center">
                Item #3
                <Pill label="Neutral" status="neutral" />
              </Group>
            </BottomSheetMenuItem>
            <BottomSheetMenuItem>Item #4</BottomSheetMenuItem>
            <BottomSheetMenuItem>
              <Group spacing="xxs" alignItems="center">
                Item #5
                <Tooltip content="You can add a tooltip">
                  <Icon type="info" size="small" />
                </Tooltip>
              </Group>
            </BottomSheetMenuItem>
          </BottomSheetMenuDropdownList>
        }
      />
    );
  },
};

export const WithItemDescription: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const MaxWidthMenuItem = ({ name, email }: { name: string; email: string }) => (
      <BottomSheetMenuItem>
        <Group alignItems="center" spacing="xs-s">
          <Icon type="send" size="small" />
          <Group variant="vertical" spacing="xxxs">
            {name}
            <Text textStyle="inline" color="semantic.text.secondary">
              {email}
            </Text>
          </Group>
        </Group>
      </BottomSheetMenuItem>
    );

    return (
      <BottomSheetMenu
        trigger={<Button label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <BottomSheetMenuDropdownList paddingY="xs">
            <MaxWidthMenuItem name="Global Pharmaceuticals, Inc." email="mbesant@jalbumasdd.net" />
            <MaxWidthMenuItem name="Wise Consumer Products" email="sgiova@scientificamerican.com" />
            <MaxWidthMenuItem name="Lupin Pharmaceuticals, Inc." email="tmingw@parallels.com" />
            <MaxWidthMenuItem name="Clinical Solutions Wholesale" email="ckrys@webeden.co.uk" />
          </BottomSheetMenuDropdownList>
        }
      />
    );
  },
};

export const WithNestedItems: StoryObj<typeof BottomSheetMenuItem> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(isUsingVisualTesting());

    const NestedMenuItem = ({ level = 0 }: { level?: number }) => (
      <BottomSheetMenuItem>
        <Container paddingLeft={level === 2 ? 'm' : 'none'}>
          <Group alignItems="center" spacing="xs-s">
            {level > 0 && <Icon type="sub-arrow" color="inherit" size="small" />}
            <Group variant="vertical" spacing="xxxs">
              Title
              <Text textStyle="inline" color="semantic.text.secondary">
                Menu item description
              </Text>
            </Group>
          </Group>
        </Container>
      </BottomSheetMenuItem>
    );

    return (
      <BottomSheetMenu
        trigger={<Button label="Click me" />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        content={
          <BottomSheetMenuDropdownList paddingY="xs">
            <NestedMenuItem />
            <NestedMenuItem level={1} />
            <NestedMenuItem level={2} />
            <NestedMenuItem level={2} />
          </BottomSheetMenuDropdownList>
        }
      />
    );
  },
};

export const WithTooltip: StoryObj<typeof BottomSheetMenuItem> = {
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isUsingVisualTesting());

    const content = (
      <BottomSheetMenuDropdownList paddingY="xs">
        <Tooltip key={0} content="Tooltip content">
          <BottomSheetMenuItem {...args} disabled>
            Item 1
          </BottomSheetMenuItem>
        </Tooltip>

        <Tooltip key={1} content="Tooltip content">
          <BottomSheetMenuItem {...args}>Item 2</BottomSheetMenuItem>
        </Tooltip>

        <BottomSheetMenuItem key={2} {...args} disabled>
          Item 3
        </BottomSheetMenuItem>

        <BottomSheetMenuItem key={3} {...args}>
          Item 4
        </BottomSheetMenuItem>
      </BottomSheetMenuDropdownList>
    );

    return (
      <BottomSheetMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        content={content}
        trigger={<Button label="Click me" />}
      />
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
