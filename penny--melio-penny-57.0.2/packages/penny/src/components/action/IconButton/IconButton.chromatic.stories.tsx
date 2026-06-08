import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Chromatic/Icon Button',
  component: IconButton,
};
export default meta;

export const WithFocus: StoryObj<typeof IconButton> = {
  render: () => {
    const items = [
      {
        label: 'Tertiary',
        component: (
          <IconButton icon="file-move" aria-label="icon-button-tertiary-prev" variant="tertiary" id="tertiary" />
        ),
      },
      {
        label: 'Naked',
        component: <IconButton icon="file-move" aria-label="icon-button-prev" variant="naked" id="naked" />,
      },
    ];
    return <Storybook.Row items={items} />;
  },
  parameters: {
    pseudo: { focusVisible: ['#tertiary', '#naked'] },
  },
};
