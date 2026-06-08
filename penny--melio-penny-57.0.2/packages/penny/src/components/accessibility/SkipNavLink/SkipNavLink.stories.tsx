import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';

import { SkipNavLink } from '.';

/**
 * The `SkipNavLink` component enables users to bypass repetitive content and navigate directly to the main content of a page.
 * This is particularly useful for accessibility, allowing users to skip over elements like navigation menus when they aren't the first interactive section.
 *
 * ## Key Features & Usage
 * - Renders as an anchor (`<a>`) tag.
 * - Remains hidden until focused through keyboard navigation.
 * - Pressing Enter moves focus to the element with the matching `id`.
 * - <b>Note</b>: Ensure the `id` is assigned to both the `SkipNavLink` and the target main content element.
 */

const meta: Meta<typeof SkipNavLink> = {
  title: 'Accessibility Components/Skip Nav Link',
  component: SkipNavLink,
  argTypes: {
    children: {
      control: false,
      description: 'The content of the link.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    id: {
      control: 'text',
      description: 'The id of the main content element.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
  },
  args: {
    children: 'Press Enter to skip to the main content.',
    id: 'skip-nav',
  },
};
export default meta;

/**
 * * Place your cursor in the browser's address bar.<br/>
 * * Remove any id queries from the url.<br/>
 * * Hit Enter to reload the page, then hit Tab. The `SkipNavLink` will appear in the upper left.<br/>
 * * Hitting Enter on the link will take you to the main content.<br/>
 * * <b>Note:</b> The `target="_self"` attribute is included because the story is rendered within an iframe.
 * Without this, pressing Enter would cause the page to reload.
 * You won't need to add this attribute.
 */
export const Main: StoryObj<typeof SkipNavLink> = {
  render: ({ id, ...args }) => (
    <>
      <SkipNavLink {...args} id={id} target="_self" />
      <Storybook.Container
        tabIndex={0}
        border="1px solid black"
        borderRadius="global.100"
        padding="m"
        overflowY="scroll"
        height="150px"
      >
        <Storybook.Container
          display="flex"
          height="150px"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>Scroll down to the main content ↓</Text>
          <Storybook.ContentPlaceholder id={id} label="Main content!" />
        </Storybook.Container>
      </Storybook.Container>
    </>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
