import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { getBaseIconColors } from '@/theme/icons/utils';

import { Loader } from './Loader';

const themeColors = getBaseIconColors();

/**
 * The Loader component is used to indicate that a page or component is loading.
 *
 * From an accessibility perspective:<br />
 * - It should have a text visible to screen readers only, defaulting to ‘Loading…’, which can be overridden using the loadingText prop.<br />
 * - To associate the loader with other elements on the page, use the `id` prop to set the loader’s ID and `aria-labelledby` to reference this ID. <br />
 * - To prevent rendering the loading text, set `hideLoadingText` to true, the loading component uses the aria-busy attribute. However, this causes a violation with other elements that require specific aria-children roles, such as the table in its loading state.
 */
const meta: Meta<typeof Loader> = {
  title: 'Foundations/Loader',
  component: Loader,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    color: {
      control: 'select',
      description: 'The color of the icon.',
      options: Object.keys(themeColors),
      table: {
        defaultValue: { summary: 'global.brand.700' },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(Object.keys(themeColors)),
        },
      },
    },
    id: {
      control: 'text',
      description:
        'The id of the loader. Used for [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) to associating the loader to other elements on the page to define an accessible name.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    loadingText: {
      control: 'text',
      description:
        'For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.',
      table: {
        category: 'props',
        defaultValue: { summary: 'Loading...' },
        type: { summary: 'string' },
      },
    },
    hideLoadingText: {
      control: 'boolean',
      description:
        'To prevent rendering the loading text, set `hideLoadingText` to true, the loading component uses the aria-busy attribute. However, this causes a violation with other elements that require specific aria-children roles, such as the table in its loading state.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    color: 'global.brand.700',
    loadingText: 'Loading...',
    hideLoadingText: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Loader> = {
  render: (args) => (
    <Storybook.Container
      padding="s"
      backgroundColor={
        args.color?.includes(themeColors['semantic.surface.primary.rest'] ?? '#FFF')
          ? 'global.brand.700'
          : 'semantic.surface.primary.rest'
      }
      borderRadius="global.200"
    >
      <Loader {...args} />
    </Storybook.Container>
  ),
};

export const Colors: StoryObj<typeof Loader> = {
  render: (args) => {
    const items = [
      {
        component: (
          <Storybook.Container padding="s" borderRadius="global.200">
            <Loader {...args} />
          </Storybook.Container>
        ),
        label: 'Default brand color',
      },
      {
        component: (
          <Storybook.Container padding="s" backgroundColor="global.brand.700" borderRadius="global.200">
            <Loader {...args} color="semantic.icon.inverse" />
          </Storybook.Container>
        ),
        label: 'Light color',
      },
      {
        component: (
          <Storybook.Container padding="s" borderRadius="global.200">
            <Loader {...args} color="semantic.icon.primary" />
          </Storybook.Container>
        ),
        label: 'Dark color',
      },
      {
        component: (
          <Storybook.Container padding="s" borderRadius="global.200">
            <Loader {...args} color="semantic.icon.critical" />
          </Storybook.Container>
        ),
        label: 'Custom color',
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

/**
 * Here’s an example of how to associate the loader with other elements and announce the loading state on the page:<br />
 * - Set the reference element’s `aria-labelledby` attribute to the loader’s `id`.<br />
 * - Set the loader’s `id`.
 * - `loadingText` can be use to override the default value.<br />
 *
 * Use a screen reader to verify that the loader is announced when the reference is clicked and associated.<br />
 */
export const AssociateAndAnnouncement: StoryObj<typeof Loader> = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false);
    const onClick = () => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };
    return (
      <Storybook.Container
        as="button"
        backgroundColor={
          args.color?.includes(themeColors['semantic.surface.primary.rest'] ?? '#FFF')
            ? 'global.brand.700'
            : 'semantic.surface.primary.rest'
        }
        borderRadius="global.200"
        padding="s"
        aria-labelledby="loader"
        onClick={onClick}
        style={{ border: '1px solid black' }}
        display="flex"
        gap="s"
        alignItems="center"
        justifyItems="center"
        tabIndex={0}
        width="300px"
        height="50px"
      >
        Click to show loader
        {isLoading && <Loader {...args} id="loader" loadingText="Processing..." />}
      </Storybook.Container>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
