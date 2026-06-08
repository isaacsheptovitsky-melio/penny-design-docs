import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { getDefaultIconsMap } from '@/theme';

import { Group } from '../../../../../Group';
import { ActionItem } from '../../../../ActionsDropdownMenu/ActionItem';
import { FloatingMenu, FloatingMenuActionTrigger, FloatingMenuDropdownList } from '../../..';

const iconOptions = Object.keys(getDefaultIconsMap(''));

const actionItemProps = { label: 'Item', index: 0, onClick: noop };

const meta: Meta<typeof FloatingMenuActionTrigger> = {
  title: 'Containers/Menus/Floating Menu/Triggers/Action Trigger',
  component: FloatingMenuActionTrigger,
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: "The trigger's label.",
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'inverse'],
      description: 'Determines the variant of the trigger.',
      table: {
        category: 'props',
        defaultValue: { summary: 'default' },
        type: { summary: 'default | inverse' },
      },
    },
    icon: {
      name: 'icon',
      description: 'The type of the icon of the trigger.',
      control: 'select',
      options: [undefined, ...iconOptions],
      table: {
        category: 'props',
        type: { summary: 'IconKey' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Determines the size of the trigger.',
      table: {
        category: 'props',
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Determines if the button should take the full width of its container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    label: 'Click me',
    variant: 'default',
    size: 'medium',
    icon: undefined,
    isFullWidth: false,
  },
};
export default meta;

export const Main: StoryObj<typeof FloatingMenuActionTrigger> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Storybook.Container
        bgColor={args.variant === 'inverse' ? 'semantic.surface.inverse' : undefined}
        padding="xs"
        borderRadius="global.100"
        width="max-content"
      >
        <FloatingMenu
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={<FloatingMenuActionTrigger {...args} />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
      </Storybook.Container>
    );
  },
};

export const Inverse: StoryObj<typeof FloatingMenuActionTrigger> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Storybook.Container
        backgroundColor="semantic.surface.inverse"
        padding="xs"
        borderRadius="global.100"
        width="max-content"
      >
        <FloatingMenu
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={<FloatingMenuActionTrigger {...args} variant="inverse" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
      </Storybook.Container>
    );
  },
};

export const Sizes: StoryObj<typeof FloatingMenuActionTrigger> = {
  render: (args) => {
    const [isOpenSmall, setIsOpenSmall] = useState(false);
    const [isOpenMedium, setIsOpenMedium] = useState(false);
    const [isOpenLarge, setIsOpenLarge] = useState(false);

    return (
      <Group>
        <FloatingMenu
          isOpen={isOpenSmall}
          onOpenChange={setIsOpenSmall}
          trigger={<FloatingMenuActionTrigger {...args} size="small" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
        <FloatingMenu
          isOpen={isOpenMedium}
          onOpenChange={setIsOpenMedium}
          trigger={<FloatingMenuActionTrigger {...args} size="medium" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
        <FloatingMenu
          isOpen={isOpenLarge}
          onOpenChange={setIsOpenLarge}
          trigger={<FloatingMenuActionTrigger {...args} size="large" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
      </Group>
    );
  },
};

export const WithIcon: StoryObj<typeof FloatingMenuActionTrigger> = {
  render: (args) => {
    const [isOpenSmall, setIsOpenSmall] = useState(false);
    const [isOpenMedium, setIsOpenMedium] = useState(false);
    const [isOpenLarge, setIsOpenLarge] = useState(false);

    return (
      <Group>
        <FloatingMenu
          isOpen={isOpenSmall}
          onOpenChange={setIsOpenSmall}
          trigger={<FloatingMenuActionTrigger {...args} size="small" icon="bank" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
        <FloatingMenu
          isOpen={isOpenMedium}
          onOpenChange={setIsOpenMedium}
          trigger={<FloatingMenuActionTrigger {...args} size="medium" icon="bank" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
        <FloatingMenu
          isOpen={isOpenLarge}
          onOpenChange={setIsOpenLarge}
          trigger={<FloatingMenuActionTrigger {...args} size="large" icon="bank" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
      </Group>
    );
  },
};

export const Disabled: StoryObj<typeof FloatingMenuActionTrigger> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Group variant="vertical" width="fit-content">
        <FloatingMenu
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isDisabled
          trigger={<FloatingMenuActionTrigger {...args} icon="bank" />}
          content={
            <FloatingMenuDropdownList paddingY="xs">
              <ActionItem {...actionItemProps} />
            </FloatingMenuDropdownList>
          }
        />
        <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" borderRadius="global.100">
          <FloatingMenu
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            isDisabled
            trigger={<FloatingMenuActionTrigger {...args} variant="inverse" icon="bank" />}
            content={
              <FloatingMenuDropdownList paddingY="xs">
                <ActionItem {...actionItemProps} />
              </FloatingMenuDropdownList>
            }
          />
        </Storybook.Container>
      </Group>
    );
  },
};
