import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';

import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Chromatic/Popover',
  component: Popover,
  args: {
    children: 'Hover me!',
    description: 'Hello! 👋',
    actionRenderer: ({ onClose, ...props }) => (
      <Button {...props} onClick={onClose} size="small" variant="secondary-inverse" label="Got it" />
    ),
    title: undefined,
    icon: undefined,
    hideCloseButton: false,
    isOpen: undefined,
    triggerEvent: 'hover',
    defaultIsOpen: true,
    onOpenChange: undefined,
  },
};
export default meta;

export const BackButton: StoryObj<typeof Popover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" paddingBottom="100px">
      <Popover
        {...args}
        aria-label="popover label"
        backButtonRenderer={(props) => (
          <Button {...props} size="small" variant="secondary-inverse" onClick={() => {}} label="Back" />
        )}
      />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
};

// A regression visual test for ME-53466
export const LongDescription: StoryObj<typeof Popover> = {
  render: (args) => (
    <Storybook.Container display="flex" alignItems="center" justifyContent="center" paddingBottom="130px">
      <Popover
        {...args}
        aria-label="popover label"
        description="We expect a long text such as an email to break to a new line veryveryverylongemailaddress@melio.com"
      />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: { delay: 1000 },
  },
};
