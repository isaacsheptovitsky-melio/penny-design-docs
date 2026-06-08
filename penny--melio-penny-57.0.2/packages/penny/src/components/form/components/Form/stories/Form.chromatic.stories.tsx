import { type Meta, type StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { Form } from '../Form';
import { DynamicRequiredFields as DynamicRequiredFieldsStory } from './Form.stories';

const meta: Meta<typeof Form> = {
  title: 'Chromatic/Form',
  component: Form,
  parameters: {
    chromatic: { delay: 2000 },
  },
};
export default meta;

export const DynamicRequiredFields: StoryObj<typeof Form> = {
  ...DynamicRequiredFieldsStory,
  play: async ({ canvasElement }) => {
    const selectTrigger = within(canvasElement).getByTestId('form-field-render-field-trigger-input');
    await userEvent.click(selectTrigger);
    await userEvent.click(within(canvasElement.ownerDocument.body).getByRole('option', { name: 'United States' }));

    const stateInputText = within(canvasElement).getByTestId('form-input-state').textContent;
    if (!stateInputText?.endsWith('*')) {
      throw new Error('State label does not end with asterisk');
    }
  },
};
