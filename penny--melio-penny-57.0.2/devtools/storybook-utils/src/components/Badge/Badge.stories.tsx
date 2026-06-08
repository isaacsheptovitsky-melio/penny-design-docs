import { Meta, StoryObj } from '@storybook/react-vite';

import { Storybook } from '../../..';
import { Badge } from './Badge';

const badgeTypes = ['pattern', 'deprecated', 'new'] as const;

/**
 * <b>Oh no! 😱 This is not the component you're looking for!</b>
 *
 * This `Badge` component is used only for visual purposes in Penny's documentation. <br />
 * If you need to use a badge in your application, please use the [Badge](/docs/data-display-components-badge--docs) component.
 */
const meta: Meta<typeof Badge> = {
  title: 'Storybook Utils Components/Badge',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  component: Badge,
  argTypes: {
    type: { table: { type: { summary: badgeTypes.join(' | ') }, category: 'props' } },
  },
  args: {
    type: 'pattern',
  },
};
export default meta;

export const Main: StoryObj<typeof Badge> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Types: StoryObj<typeof Badge> = {
  render: () => (
    <Storybook.Container display="flex" gap="8px">
      {badgeTypes.map((type) => (
        <Storybook.Badge key={type} type={type} />
      ))}
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
