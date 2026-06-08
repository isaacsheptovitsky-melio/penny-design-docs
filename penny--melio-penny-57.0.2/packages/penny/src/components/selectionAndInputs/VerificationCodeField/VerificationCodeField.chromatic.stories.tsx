import { type Meta, type StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { VerificationCodeField } from './VerificationCodeField';

const meta: Meta<typeof VerificationCodeField> = {
  title: 'Chromatic/Verification Code Field',
  component: VerificationCodeField,
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
  },
};
export default meta;

export const PartialFilled: StoryObj<typeof VerificationCodeField> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = await canvas.findAllByRole('textbox');

    for (const [i, input] of inputs.splice(0, 2).entries()) {
      await userEvent.type(input, `${i + 1}`);
    }
  },
};

export const IsLoading: StoryObj<typeof VerificationCodeField> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = await canvas.findAllByRole('textbox');

    for (const [i, input] of inputs.entries()) {
      await userEvent.type(input, `${i + 1}`);
    }
  },
};

export const InvalidPartialFilled: StoryObj<typeof VerificationCodeField> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = await canvas.findAllByRole('textbox');

    for (const [i, input] of inputs.splice(0, 2).entries()) {
      await userEvent.type(input, `${i + 1}`);
    }

    await userEvent.type(inputs[1] as HTMLElement, '{enter}');
  },
};
