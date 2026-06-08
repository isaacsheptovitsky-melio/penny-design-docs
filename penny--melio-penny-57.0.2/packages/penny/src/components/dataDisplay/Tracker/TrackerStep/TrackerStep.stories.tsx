import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';

import { BrandSymbol, Text } from '../..';
import { Avatar } from '../../Avatar';
import { Tooltip } from '../../Tooltip';
import { Tracker, TrackerStep, TrackerStepDescription, TrackerStepTitle } from '..';

/**
 * The `TrackerStep` component is used to represent a step in the `Tracker` component.
 *
 * It can be used to show the active step, a completed step, or an incomplete step if none of the previous conditions are met.
 */
const meta: Meta<typeof TrackerStep> = {
  title: 'Data Display Components/Tracker/TrackerStep',
  component: TrackerStep,
  argTypes: {
    isActive: {
      control: 'boolean',
      description: 'Determines if the step is active.',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    isCompleted: {
      control: 'boolean',
      description: 'Determines if the step is completed.',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    indicator: {
      control: false,
      description: 'A custom indicator to display in the step.',
      table: {
        category: 'props',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'tracker-step' }, category: 'tests' },
    },
  },
  args: {
    isActive: false,
    isCompleted: false,
  },
};
export default meta;

export const Main: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <Tracker>
      <TrackerStep {...args} data-testid="tracker-step">
        <Storybook.ContentPlaceholder label="Step 1" />
      </TrackerStep>
    </Tracker>
  ),
};

export const ActiveStep: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <Tracker>
      <TrackerStep {...args} data-testid="tracker-step" isActive>
        <Storybook.ContentPlaceholder label="Step 1" />
      </TrackerStep>
    </Tracker>
  ),
};

export const CompletedStep: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <Tracker>
      <TrackerStep {...args} data-testid="tracker-step" isCompleted>
        <Storybook.ContentPlaceholder label="Step 1" />
      </TrackerStep>
    </Tracker>
  ),
};

/**
 * Here's an example how to manage the step’s invalid state,
 *
 * render an `StatusIconSolid` component or another indicator component inside a `Tooltip` component to indicate the invalid state.
 */
export const Invalid: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <Tracker>
      <TrackerStep {...args} data-testid="tracker-step">
        <Storybook.ContentPlaceholder label="Step 1" />
        <Tooltip content="Invalid step">
          <StatusIconSolid variant="warning" size="small" />
        </Tooltip>
      </TrackerStep>
    </Tracker>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Use the `TrackerStepTitle` and `TrackerStepDescription` components to customize the content of each step.
 *
 * These components are advantageous because they come pre-styled to align with the tracker's step state.
 */
export const StepsAtoms: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <Tracker>
      <TrackerStep {...args} data-testid="tracker-step">
        <TrackerStepTitle label="Step 1" />
        <TrackerStepDescription label="Description text" />
      </TrackerStep>
    </Tracker>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can utilize the indicator prop to display a custom indicator in each step.
 *
 * To adjust the indicator state based on the step’s status, you can manage it manually using a conditional statement. For instance, you can set it to disabled for incomplete steps.
 */
export const CustomIndicator: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <SimpleGrid columns={4} textAlign="center" rowGap="s">
      <Text>Type</Text>
      <Text>InComplete</Text>
      <Text>Active</Text>
      <Text>Complete</Text>
      <Text>Text</Text>
      <Tracker>
        <TrackerStep {...args} data-testid="tracker-step" indicator="1" />
      </Tracker>
      <Tracker>
        <TrackerStep {...args} data-testid="tracker-step" indicator="1" isActive />
      </Tracker>
      <Tracker>
        <TrackerStep {...args} data-testid="tracker-step" indicator="1" isCompleted />
      </Tracker>
      <Text>Avatar</Text>
      <Tracker>
        <TrackerStep
          {...args}
          data-testid="tracker-step"
          indicator={<Avatar name="Robin the Dog" src="/assets/Robin.jpeg" size="small" isDisabled />}
        />
      </Tracker>
      <Tracker>
        <TrackerStep
          {...args}
          data-testid="tracker-step"
          indicator={<Avatar name="Robin the Dog" src="/assets/Robin.jpeg" size="small" />}
          isActive
        />
      </Tracker>
      <Tracker>
        <TrackerStep
          {...args}
          data-testid="tracker-step"
          indicator={<Avatar name="Robin the Dog" src="/assets/Robin.jpeg" size="small" />}
          isCompleted
        />
      </Tracker>
      <Text>Brand Symbol</Text>
      <Tracker>
        <TrackerStep
          {...args}
          data-testid="tracker-step"
          indicator={<BrandSymbol type="amazon" size="small" variant="inverse" />}
        />
      </Tracker>
      <Tracker>
        <TrackerStep
          {...args}
          data-testid="tracker-step"
          indicator={<BrandSymbol type="amazon" size="small" variant="inverse" />}
          isActive
        />
      </Tracker>
      <Tracker>
        <TrackerStep
          {...args}
          data-testid="tracker-step"
          indicator={<BrandSymbol type="amazon" size="small" variant="inverse" />}
          isCompleted
        />
      </Tracker>
    </SimpleGrid>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Variants: StoryObj<typeof TrackerStep> = {
  render: (args) => (
    <SimpleGrid columns={2} gridTemplateColumns="100px 1fr" justifyContent="flex-start" rowGap="l">
      <Text>Horizontal</Text>
      <Tracker>
        <TrackerStep {...args} data-testid="tracker-step">
          <TrackerStepTitle label="Step 1" />
          <TrackerStepDescription label="Description text" />
        </TrackerStep>
      </Tracker>
      <Text>Vertical</Text>
      <Tracker variant="vertical">
        <TrackerStep {...args} data-testid="tracker-step">
          <TrackerStepTitle label="Step 1" />
          <TrackerStepDescription label="Description text" />
        </TrackerStep>
      </Tracker>
    </SimpleGrid>
  ),
};
