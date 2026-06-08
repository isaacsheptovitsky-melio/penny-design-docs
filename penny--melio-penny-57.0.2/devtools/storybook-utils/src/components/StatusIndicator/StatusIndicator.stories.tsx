import { Meta, StoryObj } from '@storybook/react-vite';

import { Storybook } from '../../..';
import { StatusIndicator } from './StatusIndicator';

const statuses = ['primary', 'informative', 'success', 'warning', 'error'] as const;

/**
 * <b>Oh no! 😱 This is not the component you're looking for!</b>
 *
 * This `StatusIndicator` component is used only for visual purposes in Penny's documentation. <br />
 * If you need to use a status indicator in your application, please use the [StatusIndicator](/docs/data-display-components-status-indicator--docs) component.
 */
const meta: Meta<typeof StatusIndicator> = {
  title: 'Storybook Utils Components/Status Indicator',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  component: StatusIndicator,
  argTypes: {
    status: { table: { type: { summary: statuses.join(' | ') }, category: 'props' } },
  },
  args: {
    status: 'primary',
  },
};
export default meta;

export const Main: StoryObj<typeof StatusIndicator> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Statuses: StoryObj<typeof StatusIndicator> = {
  render: () => (
    <Storybook.Container display="flex" gap="8px">
      {statuses.map((status) => (
        <Storybook.StatusIndicator key={status} status={status} />
      ))}
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
