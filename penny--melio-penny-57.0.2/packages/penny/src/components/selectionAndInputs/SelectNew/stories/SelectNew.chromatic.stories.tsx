import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen } from '@testing-library/dom';
import { userEvent } from 'storybook/test';

import { SelectNew } from '..';
import { ControlledMenu as ControlledMenuStory } from './SelectNew.stories';

const meta: Meta<typeof SelectNew> = {
  title: 'Chromatic/Select New',
  component: SelectNew,
  parameters: {
    chromatic: { delay: 2000 },
  },
};
export default meta;

export const ControlledMenu: StoryObj<typeof SelectNew> = {
  ...ControlledMenuStory,
  play: async () => {
    const trigger = screen.getByTestId('select-trigger-input');
    await userEvent.click(trigger);

    const createButton = screen.getByText('Create new');
    await userEvent.click(createButton);
  },
};
