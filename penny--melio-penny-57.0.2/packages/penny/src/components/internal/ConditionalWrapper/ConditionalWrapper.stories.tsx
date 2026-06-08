import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';

import { ConditionalWrapper } from './ConditionalWrapper';

/**
 * The `ConditionalWrapper` component is a utility that conditionally wraps its children with a given wrapper based on a condition.
 *
 * <b>When to Use</b>:
 *
 * Use `ConditionalWrapper` when you need to conditionally apply a wrapper to children without duplicating conditional checks in the main component.<br />
 *
 * <b>Use cases:</b>
 * - <b>Dynamic Layouts:</b> Use ConditionalWrapper to conditionally change the layout or apply extra styling based on specific user actions, device type, or screen size.
 * - <b>Optional Features:</b> Apply optional functionality (e.g. tooltips, badges, buttons, links) only when needed without cluttering the main JSX with conditionals.
 * - <b>Reducing Repetition:</b> Simplify repetitive conditional rendering by centralizing the logic into one reusable component, keeping your UI clean and easy to maintain.
 * */

const meta: Meta<typeof ConditionalWrapper> = {
  title: 'Internal Components/Conditional Wrapper',
  component: ConditionalWrapper,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    condition: {
      control: 'boolean',
      description: 'The condition to be met in order to render the wrapper component.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    wrapper: {
      control: false,
      description:
        'A function that renders the wrapper component with the children.<br/> since we pass the children (which is a React default prop), we can use it as an argument in the function.',
      table: { type: { summary: 'FC<ReactNode>' }, category: 'props' },
    },
    children: {
      control: false,
      description: 'The children to be wrapped by the wrapper component.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
  },
  args: {
    condition: true,
    children: <Storybook.ContentPlaceholder />,
    wrapper: (children: ReactNode) => <>{children}</>,
  },
};
export default meta;

export const Main: StoryObj<typeof ConditionalWrapper> = {
  render: ({ condition, ...args }) => {
    const [showWrapper, setShowWrapper] = useState(condition);

    useEffect(() => {
      setShowWrapper(condition);
    }, [condition]);

    return (
      <Group variant="vertical">
        <Button
          label={`${showWrapper ? 'Remove' : 'Add'} wrapper`}
          onClick={() => {
            setShowWrapper(!showWrapper);
          }}
        />
        <ConditionalWrapper
          {...args}
          condition={showWrapper}
          wrapper={(children) => (
            <Storybook.Container border="basic.critical" borderRadius="global.200">
              {children}
            </Storybook.Container>
          )}
        >
          <Storybook.ContentPlaceholder
            height="200px"
            label={`I'm using a ContentPlaceholder ${showWrapper ? 'wrapped with Container with red border' : 'without wrapper'}`}
          />
        </ConditionalWrapper>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
