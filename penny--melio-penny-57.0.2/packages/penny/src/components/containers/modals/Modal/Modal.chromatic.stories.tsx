import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { waitFor } from '@testing-library/react';
import { expect, screen } from 'storybook/test';

import { TextField } from '@/components/selectionAndInputs/TextField';
import { resizeScreenByBreakpointKey } from '@/test-utils/resize-screen';
import { fullScreenChromaticDecorator, setChromaticViewports } from '@/test-utils/storybook.utils';

import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Chromatic/Modal',
  component: Modal,
  decorators: [fullScreenChromaticDecorator],
  args: {
    isOpen: true,
  },
};
export default meta;

export const OnlyPrimaryButton: StoryObj<typeof Modal> = {
  args: {
    header: 'Modal title',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene',
    primaryButton: {
      label: 'primary',
      variant: 'primary',
    },
  },
};

export const OnlySecondaryButton: StoryObj<typeof Modal> = {
  args: {
    header: 'Modal title',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene',
    secondaryButton: { label: 'tertiary', variant: 'tertiary' },
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const WithLongTitle: StoryObj<typeof Modal> = {
  args: {
    header: 'Testing the new modal with a very veryyy long header',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim vene',
    primaryButton: {
      label: 'primary',
      variant: 'primary',
    },
  },
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const FocusReserveToMobile: StoryObj<typeof Modal> = {
  render: () => (
    <Modal
      aria-label="modal example focus reserve to mobile"
      header="modal header"
      isOpen
      onClose={noop}
      primaryButton={{
        label: 'Submit',
        variant: 'primary',
      }}
    >
      <TextField placeholder="Field 1" data-testid="input" />
    </Modal>
  ),
  play: async () => {
    screen.getByTestId('input').focus();
    resizeScreenByBreakpointKey('xs');
    await waitFor(async () => expect(screen.getByTestId('input')).toHaveFocus());
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const FocusReserveToDesktop: StoryObj<typeof Modal> = {
  render: () => (
    <Modal
      aria-label="modal example focus reserve to desktop"
      header="modal header"
      onClose={noop}
      isOpen
      primaryButton={{
        label: 'Submit',
        variant: 'primary',
      }}
    >
      <TextField placeholder="Field 1" data-testid="input" />
    </Modal>
  ),
  play: async () => {
    resizeScreenByBreakpointKey('xs');
    screen.getByTestId('input').focus();
    resizeScreenByBreakpointKey('xl');
    await waitFor(async () => expect(screen.getByTestId('input')).toHaveFocus());
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

setChromaticViewports([OnlyPrimaryButton, OnlySecondaryButton, WithLongTitle], ['xs', 'xl']);
