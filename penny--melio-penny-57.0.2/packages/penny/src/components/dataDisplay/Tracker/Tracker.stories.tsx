import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';

import { RadioGroup } from '../../selectionAndInputs/RadioGroup';
import { Avatar } from '../Avatar';
import { BrandSymbol } from '../BrandSymbol';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import type { TrackerStepDescriptionProps, TrackerStepTitleProps } from '.';
import { Tracker, TrackerStep, TrackerStepDescription, TrackerStepTitle } from '.';

const invalidSteps: {
  title: TrackerStepTitleProps;
  description: TrackerStepDescriptionProps;
  isInvalid?: boolean;
}[] = [
  { title: { label: 'Step 1' }, description: { label: 'Description text' } },
  { title: { label: 'Step 2' }, description: { label: 'Description text' } },
  {
    title: { label: 'Step 3' },
    description: { label: 'Description text' },
    isInvalid: true,
  },
];

const steps: {
  title: TrackerStepTitleProps;
  description: TrackerStepDescriptionProps;
  indicator?: ReactNode;
}[] = [
  { title: { label: 'Step 1' }, description: { label: 'Description text' }, indicator: '1' },
  {
    title: { label: 'Step 2' },
    description: { label: 'Description text' },
    indicator: <Avatar name="Robin the Dog" src="/assets/Robin.jpeg" size="small" />,
  },
  {
    title: { label: 'Step 3' },
    description: { label: 'Description text' },
    indicator: <BrandSymbol type="amazon" size="small" variant="inverse" />,
  },
];

/**
 * The `Tracker` component displays a series of steps in a process. It wraps [TrackerStep](?path=/docs/data-display-components-tracker-step--docs) components.
 *
 * [`TrackerStep`](?path=/docs/data-display-components-tracker-step--docs) component represents a step in the process, and can be customized to show the active step and completed steps.
 */
const meta: Meta<typeof Tracker> = {
  title: 'Data Display Components/Tracker/Tracker',
  component: Tracker,
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The variant of tracker.',
      table: {
        category: 'props',
        type: {
          summary: 'horizontal | vertical',
        },
        defaultValue: { summary: 'horizontal' },
      },
    },
    status: {
      control: 'select',
      options: ['neutral', 'warning', 'critical', 'brand', 'success'],
      description: 'The status color of the tracker.',
      table: {
        category: 'props',
        type: {
          summary: 'neutral | warning | critical | brand | success',
        },
      },
    },
    children: {
      control: false,
      description: 'The children of the tracker, use the `TrackerStep` component',
      table: {
        category: 'props',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    width: {
      control: 'select',
      options: ['full', 'fit-content'],
      description: 'The width of the tracker.',
      table: {
        category: 'props',
        type: {
          summary: 'full | fit-content',
        },
        defaultValue: { summary: 'full' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Dedicated label for screen-readers (used for accessibility).',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'tracker' }, category: 'tests' },
    },
  },
  args: {
    variant: 'horizontal',
    width: 'full',
    status: 'success',
  },
};
export default meta;

export const Main: StoryObj<typeof Tracker> = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState<string | undefined>(undefined);

    const isActive = (index: number) => (currentStep ? index === Number(currentStep) : false);

    const isCompleted = (index: number) => (currentStep ? index < Number(currentStep) : false);

    return (
      <Group variant="vertical" hasDivider spacing="m">
        <Storybook.Container alignSelf="center">
          <RadioGroup
            variant="horizontal"
            options={[
              { label: 'None', ariaLabel: '', value: 'none' },
              { label: 'Step 1', ariaLabel: '', value: '0' },
              { label: 'Step 2', ariaLabel: '', value: '1' },
              { label: 'Step 3', ariaLabel: '', value: '2' },
              { label: 'Completed', ariaLabel: '', value: '3' },
            ]}
            value={currentStep ?? 'none'}
            onChange={(e) => (e.target.value === 'none' ? setCurrentStep(undefined) : setCurrentStep(e.target.value))}
          />
        </Storybook.Container>
        <Tracker {...args}>
          {steps.map((step, index) => (
            <TrackerStep key={`tracker-step-${index}`} isActive={isActive(index)} isCompleted={isCompleted(index)}>
              <Storybook.ContentPlaceholder label={step.title.label} />
            </TrackerStep>
          ))}
        </Tracker>
      </Group>
    );
  },
};

/**
 * To manage the active step:
 * - set the `isActive` prop to `true` for the expected active step.
 * - set the `isCompleted` prop to `true` for all steps that are before the active step.
 */
export const ActiveStep: StoryObj<typeof Tracker> = {
  render: (args) => (
    <Tracker {...args}>
      {steps.map((step, index) => (
        <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
          <Storybook.ContentPlaceholder label={step.title.label} />
        </TrackerStep>
      ))}
    </Tracker>
  ),
};

/**
 * To make the steps appear as complete, set the `isCompleted` to `true` for all 3 steps.
 */
export const Complete: StoryObj<typeof Tracker> = {
  render: (args) => (
    <Tracker {...args}>
      {steps.map((step, index) => (
        <TrackerStep key={`tracker-step-${index}`} isCompleted={index < 3}>
          <Storybook.ContentPlaceholder label={step.title.label} />
        </TrackerStep>
      ))}
    </Tracker>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Statuses: StoryObj<typeof TrackerStep> = {
  render: () => (
    <SimpleGrid templateColumns="100px 1fr">
      <Text>Success</Text>
      <Storybook.Container width="full">
        <Tracker>
          {steps.map((step, index) => (
            <TrackerStep
              key={`tracker-step-${step.title.label}`}
              data-testid="tracker-step"
              isCompleted={index < 1}
              isActive={index === 1}
            />
          ))}
        </Tracker>
      </Storybook.Container>
      <Text>Critical</Text>
      <Tracker status="critical">
        {steps.map((step, index) => (
          <TrackerStep
            key={`tracker-step-${step.title.label}`}
            data-testid="tracker-step"
            isCompleted={index < 1}
            isActive={index === 1}
          />
        ))}
      </Tracker>
      <Text>Warning</Text>
      <Tracker status="warning">
        {steps.map((step, index) => (
          <TrackerStep
            key={`tracker-step-${step.title.label}`}
            data-testid="tracker-step"
            isCompleted={index < 1}
            isActive={index === 1}
          />
        ))}
      </Tracker>
      <Text>Neutral</Text>
      <Tracker status="neutral">
        {steps.map((step, index) => (
          <TrackerStep
            key={`tracker-step-${step.title.label}`}
            data-testid="tracker-step"
            isCompleted={index < 1}
            isActive={index === 1}
          />
        ))}
      </Tracker>
      <Text>Brand</Text>
      <Tracker status="brand">
        {steps.map((step, index) => (
          <TrackerStep
            key={`tracker-step-${step.title.label}`}
            data-testid="tracker-step"
            isCompleted={index < 1}
            isActive={index === 1}
          />
        ))}
      </Tracker>
    </SimpleGrid>
  ),
};

export const Width: StoryObj<typeof Tracker> = {
  render: () => (
    <SimpleGrid columns={2} gridTemplateColumns="100px 1fr" justifyContent="flex-start" rowGap="l">
      <Text>Full width</Text>
      <Tracker>
        {steps.map((step, index) => (
          <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
            <TrackerStepTitle {...step.title} />
            <TrackerStepDescription {...step.description} />
          </TrackerStep>
        ))}
      </Tracker>
      <Text>Fit content</Text>
      <Tracker width="fit-content">
        {steps.map((step, index) => (
          <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
            <TrackerStepTitle {...step.title} />
            <TrackerStepDescription {...step.description} />
          </TrackerStep>
        ))}
      </Tracker>
    </SimpleGrid>
  ),
};

export const Variants: StoryObj<typeof Tracker> = {
  render: () => (
    <SimpleGrid columns={2} gridTemplateColumns="100px 1fr" justifyContent="flex-start" rowGap="l">
      <Text>Horizontal</Text>
      <Tracker>
        {steps.map((step, index) => (
          <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
            <TrackerStepTitle {...step.title} />
            <TrackerStepDescription {...step.description} />
          </TrackerStep>
        ))}
      </Tracker>
      <Text>Vertical</Text>
      <Tracker variant="vertical">
        {steps.map((step, index) => (
          <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
            <TrackerStepTitle {...step.title} />
            <TrackerStepDescription {...step.description} />
          </TrackerStep>
        ))}
      </Tracker>
    </SimpleGrid>
  ),
};

/**
 * Use the `TrackerStepTitle` and `TrackerStepDescription` components to customize the content of the steps.</ br>
 * The benefit of using these components is that they are already styled to match the tracker's step state.
 */
export const StepsAtoms: StoryObj<typeof Tracker> = {
  render: (args) => (
    <Tracker {...args}>
      {invalidSteps.map((step, index) => (
        <TrackerStep key={`tracker-step-${step.title.label}`} isActive={index === 1} isCompleted={index < 1}>
          <TrackerStepTitle {...step.title} />
          <TrackerStepDescription {...step.description} />
        </TrackerStep>
      ))}
    </Tracker>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * Here's an example how to manage the step’s invalid state,
 *
 * Use a `StatusIconSolid` component or another indicator component inside a `Tooltip` component to indicate the invalid state.
 */
export const InvalidStep: StoryObj<typeof Tracker> = {
  render: (args) => (
    <Tracker {...args}>
      {invalidSteps.map((step, index) => (
        <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
          <Storybook.ContentPlaceholder label={step.title.label} />
          {step.isInvalid && (
            <Tooltip content="Invalid step">
              <StatusIconSolid variant="warning" size="small" />
            </Tooltip>
          )}
        </TrackerStep>
      ))}
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
export const CustomIndicator: StoryObj<typeof Tracker> = {
  render: (args) => (
    <Tracker {...args}>
      {steps.map((step, index) => (
        <TrackerStep
          key={`tracker-step-${step.title.label}`}
          data-testid={`tracker-step-${step.title.label}`}
          isActive={index === 1}
          isCompleted={index < 1}
          indicator={step.indicator}
        >
          <TrackerStepTitle {...step.title} />
          <TrackerStepDescription {...step.description} />
        </TrackerStep>
      ))}
    </Tracker>
  ),
};

const fullParagraph = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
const paragraph = `Lorem Ipsum is simply dummy text of the printing.`;
/**
 * Here's an example of a tracker with long text in each step. related to the width of the tracker.
 */
export const LongTextEachStep: StoryObj<typeof Tracker> = {
  render: (args) => {
    const stepsWithLongText: {
      title: TrackerStepTitleProps;
      description: TrackerStepDescriptionProps;
    }[] = [
      { title: { label: 'Step 1 - With Long title' }, description: { label: paragraph } },
      { title: { label: 'Step 2' }, description: { label: fullParagraph } },
      {
        title: { label: 'Step 3' },
        description: { label: 'Description text' },
      },
    ];
    return (
      <Group variant="vertical" width="full">
        <Text>Full width</Text>
        <Tracker {...args}>
          {stepsWithLongText.map((step, index) => (
            <TrackerStep key={`tracker-step-${index}`} isActive={index === 1} isCompleted={index < 1}>
              <TrackerStepTitle {...step.title} />
              <TrackerStepDescription {...step.description} />
            </TrackerStep>
          ))}
        </Tracker>
        <Text>Fit content width</Text>
        <Tracker {...args} width="fit-content">
          {stepsWithLongText.map((step, index) => (
            <TrackerStep key={`tracker-step-${index}`} isActive={index === 0} isCompleted={index < 0}>
              <TrackerStepTitle {...step.title} />
              <TrackerStepDescription {...step.description} />
            </TrackerStep>
          ))}
        </Tracker>
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
