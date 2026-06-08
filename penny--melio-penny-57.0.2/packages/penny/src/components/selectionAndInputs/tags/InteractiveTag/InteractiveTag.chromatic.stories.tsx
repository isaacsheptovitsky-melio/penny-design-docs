import { type Meta, type StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { InteractiveTag } from './InteractiveTag';

const meta: Meta<typeof InteractiveTag> = {
  title: 'Chromatic/Interactive Tag',
  component: InteractiveTag,
  argTypes: {
    'data-testid': {
      table: { disable: true, category: 'props' },
    },
  },
};
export default meta;

export const ClickableFocus: StoryObj<typeof InteractiveTag> = {
  render: () => (
    <InteractiveTag
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('InteractiveTag clicked');
      }}
    >
      Focus
    </InteractiveTag>
  ),
  play: () => {
    screen.getByRole('button', { name: 'Focus' }).focus();
  },
};

export const ClickableStates: StoryObj<typeof InteractiveTag> = {
  render: () => {
    const items = [
      {
        component: (
          <InteractiveTag
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('InteractiveTag clicked');
            }}
          >
            Hover
          </InteractiveTag>
        ),
      },
      {
        component: (
          <InteractiveTag
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('InteractiveTag clicked');
            }}
          >
            Pressed
          </InteractiveTag>
        ),
      },
    ];
    return <Storybook.Row items={items} />;
  },
  play: async () => {
    // Manually trigger hover effect - because CSS hover styles not applied in storybook.
    screen.getByRole('button', { name: 'Hover' }).setAttribute('data-hover', 'true');
    // Manually trigger pressed state.
    await userEvent.pointer({ target: screen.getByRole('button', { name: 'Pressed' }), keys: '[MouseLeft>]' });
    // Manually remove focus immediately after press - necessary because CSS hover styles are not applied in Storybook.
    screen.getByRole('button', { name: 'Pressed' }).blur();
  },
};

export const Removable: StoryObj<typeof InteractiveTag> = {
  render: () => (
    <InteractiveTag
      removeButtonProps={{
        onClick: () => {
          // eslint-disable-next-line no-console
          console.log('remove clicked');
        },
      }}
    >
      Removable
    </InteractiveTag>
  ),
  play: () => screen.getByRole('button', { name: 'Remove Removable tag' }).focus(),
};

export const ClickableAndRemovableStates: StoryObj<typeof InteractiveTag> = {
  render: () => {
    const items = [
      {
        component: (
          <InteractiveTag
            data-testid="hover"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('InteractiveTag clicked');
            }}
            removeButtonProps={{
              onClick: () => {
                // eslint-disable-next-line no-console
                console.log('remove clicked');
              },
            }}
          >
            Hover
          </InteractiveTag>
        ),
      },
      {
        component: (
          <InteractiveTag
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('InteractiveTag clicked');
            }}
            removeButtonProps={{
              onClick: () => {
                // eslint-disable-next-line no-console
                console.log('remove clicked');
              },
            }}
          >
            Pressed
          </InteractiveTag>
        ),
      },
    ];
    return <Storybook.Row items={items} />;
  },
  play: async () => {
    // Manually trigger hover effect - because CSS hover styles not applied in storybook.
    screen.getByTestId('hover').setAttribute('data-hover', 'true');
    // Manually trigger pressed state.
    await userEvent.pointer({ target: screen.getByRole('button', { name: 'Pressed' }), keys: '[MouseLeft>]' });
    // Manually remove focus immediately after press - necessary because CSS hover styles are not applied in Storybook.
    screen.getByRole('button', { name: 'Pressed' }).blur();
  },
};
