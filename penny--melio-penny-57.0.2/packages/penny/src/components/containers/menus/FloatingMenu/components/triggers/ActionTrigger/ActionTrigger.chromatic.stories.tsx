import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ActionItem } from '../../../../ActionsDropdownMenu/ActionItem';
import { FloatingMenu, FloatingMenuActionTrigger, FloatingMenuDropdownList } from '../../..';

const actionItemProps = { label: 'Item', index: 0, onClick: noop };

const meta: Meta<typeof FloatingMenuActionTrigger> = {
  title: 'Chromatic/Action Trigger',
  component: FloatingMenuActionTrigger,
  argTypes: {},
  args: {
    label: 'Click me',
    variant: 'default',
    size: 'medium',
    icon: undefined,
    isFullWidth: true,
  },
};
export default meta;

export const FullWidth: StoryObj<typeof FloatingMenuActionTrigger> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
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
    );
  },
};
