import { Meta, StoryObj } from '@storybook/react-vite';

import { Storybook } from '../../..';
import { Icon } from './Icon';
import { IconKey, icons } from './icons';

const iconOptions = Object.keys(icons);
const colors = ['brand', 'black', 'light'] as const;

/**
 * <b>Oh no! 😱 This is not the component you're looking for!</b>
 *
 * This `Icon` component is used only for visual purposes in Penny's documentation. <br />
 * If you need to use an icon in your application, please use the [Icon](/docs/foundations-icon--docs) component.
 */
const meta: Meta<typeof Icon> = {
  title: 'Storybook Utils Components/Icon',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  component: Icon,
  argTypes: {
    type: {
      control: 'select',
      options: iconOptions,
      table: { type: { summary: iconOptions.join(' | ') }, category: 'props' },
    },
    color: { table: { type: { summary: colors.join(' | ') }, category: 'props' } },
  },
  args: {
    type: 'info',
  },
};
export default meta;

export const Main: StoryObj<typeof Icon> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Types: StoryObj<typeof Icon> = {
  render: () => (
    <Storybook.Container display="flex" gap="8px">
      {iconOptions.map((type) => (
        <Storybook.Icon key={type} type={type as IconKey} />
      ))}
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
