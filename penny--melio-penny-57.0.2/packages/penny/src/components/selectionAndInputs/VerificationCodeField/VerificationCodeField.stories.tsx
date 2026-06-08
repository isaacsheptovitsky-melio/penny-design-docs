import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Divider } from '@/components/dataDisplay/Divider';
import {
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerIcon,
  SectionBannerRoot,
} from '@/components/dataDisplay/SectionBanner';

import {
  DEFAULT_EMPTY_FIELD_INVALID_MESSAGE,
  DEFAULT_INVALID_MESSAGE,
  VerificationCodeField,
} from './VerificationCodeField';

const meta: Meta<typeof VerificationCodeField> = {
  title: 'Selection & Inputs Components/Verification Code Field',
  component: VerificationCodeField,
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [
    (Story) => (
      <Group variant="vertical" alignItems="center" spacing="xl" width="full">
        {Story()}
      </Group>
    ),
  ],
  argTypes: {
    onComplete: {
      control: false,
      description: 'An event shot after the final digit is inserted, returns a flag of valid/invalid.',
      table: {
        category: 'events',
        type: { summary: '(code: string) => Promise<boolean>' },
      },
    },
    length: {
      control: 'select',
      options: [4, 5, 6],
      description: 'Set the verification code length.',
      table: {
        category: 'props',
        type: { summary: '4 | 5 | 6' },
        defaultValue: { summary: '4' },
      },
    },
    invalidErrorMessages: {
      control: 'text',
      description: 'Set error message to show for invalid code.',
      table: {
        category: 'props',
        type: { summary: 'string' },
        defaultValue: { summary: DEFAULT_INVALID_MESSAGE },
      },
    },
    requiredFieldsErrorMessages: {
      control: 'text',
      description: 'Set error message to show for required fields.',
      table: {
        category: 'props',
        type: { summary: 'string' },
        defaultValue: { summary: DEFAULT_EMPTY_FIELD_INVALID_MESSAGE },
      },
    },
    fieldAriaLabel: {
      control: 'text',
      description: 'Set aria-label for each field. each field will have a suffix of the field number.',
      table: {
        category: 'accessibility',
        defaultValue: { summary: 'Verification code field' },
        type: { summary: 'string' },
      },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Set the first field to be focused on mount.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the field is read-only.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    length: 4,
    onComplete: async (code: string) =>
      new Promise<boolean>((resolve) =>
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log('onComplete code', code);
          return resolve(true);
        }, 1000)
      ),
    fieldAriaLabel: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof VerificationCodeField> = {
  render: (args) => {
    const [reset, setReset] = useState(true);

    const resetStory = () => {
      // toggle reset state to rerender the `VerificationCodeField` code
      setReset(false);
      setTimeout(() => setReset(true));
    };

    return (
      <>
        {reset && <VerificationCodeField {...args} />}
        <Divider />
        <Button onClick={resetStory} label="Reset Story" />
      </>
    );
  },
};

export const VerificationCodeLength: StoryObj<typeof VerificationCodeField> = {
  render: (args) => <VerificationCodeField {...args} length={6} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const SuccessOnComplete: StoryObj<typeof VerificationCodeField> = {
  render: (args) => {
    const [verifiedSuccess, setVerifiedSuccess] = useState(false);

    const onComplete = async () =>
      new Promise<boolean>((resolve) =>
        setTimeout(() => {
          setVerifiedSuccess(true);
          return resolve(true);
        }, 1000)
      );

    return verifiedSuccess ? (
      <SectionBannerRoot variant="success">
        <SectionBannerIcon />
        <SectionBannerContent>
          <SectionBannerDescription>Thank You</SectionBannerDescription>
        </SectionBannerContent>
      </SectionBannerRoot>
    ) : (
      <VerificationCodeField {...args} onComplete={onComplete} />
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const InvalidOnComplete: StoryObj<typeof VerificationCodeField> = {
  render: (args) => {
    const onComplete = async () => new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1000));

    return <VerificationCodeField {...args} onComplete={onComplete} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof VerificationCodeField> = {
  render: (args) => <VerificationCodeField {...args} disabled value={['1', '2', '3', '4']} />,
};

export const ReadOnly: StoryObj<typeof VerificationCodeField> = {
  render: (args) => <VerificationCodeField {...args} readOnly value={['1', '2', '3', '4']} />,
};
