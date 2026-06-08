import { Meta, StoryObj } from '@storybook/react-vite';

import { Storybook } from '../../..';
import { Tooltip } from './Tooltip';

/**
 * <b>Oh no! 😱 This is not the component you're looking for!</b>
 *
 * This `Tooltip` component is used only for visual purposes in Penny's documentation. <br />
 * If you need to use a tooltip in your application, please use the [Tooltip](/docs/data-display-components-tooltip--docs) component.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Storybook Utils Components/Tooltip',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  component: Tooltip,
  argTypes: {
    children: { control: false },
  },
  args: {
    label: "Tooltip's label",
    children: <Storybook.Icon type="info" />,
  },
};
export default meta;

export const Main: StoryObj<typeof Tooltip> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Placements: StoryObj<typeof Tooltip> = {
  render: () => (
    <Storybook.Container display="flex" justifyContent="space-between">
      <Storybook.Tooltip label="Top" placement="top">
        <Storybook.ContentPlaceholder label="Top" />
      </Storybook.Tooltip>
      <Storybook.Tooltip label="Right" placement="right">
        <Storybook.ContentPlaceholder label="Right" />
      </Storybook.Tooltip>
      <Storybook.Tooltip label="Bottom" placement="bottom">
        <Storybook.ContentPlaceholder label="Bottom" />
      </Storybook.Tooltip>
      <Storybook.Tooltip label="Left" placement="left">
        <Storybook.ContentPlaceholder label="Left" />
      </Storybook.Tooltip>
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
