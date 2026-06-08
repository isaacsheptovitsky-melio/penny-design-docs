import type { BoxProps } from '@chakra-ui/react';
import { type Placement } from '@floating-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ReactNode, useEffect, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Illustration } from '@/components/foundations/Illustration';
import { Layout } from '@/components/layouts/Layout';
import { type TabItem, Tabs } from '@/components/navigation/Tabs';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Text } from '../Text';
import { Typography } from '../typography';
import { Tourtip } from './Tourtip';
import type { CallbackStepData, TourtipSteps } from './Tourtip.types';

const topPlacements: Placement[] = ['top-start', 'top', 'top-end'];
const leftPlacements: Placement[] = ['left-start', 'left', 'left-end'];
const rightPlacements: Placement[] = ['right-start', 'right', 'right-end'];
const bottomPlacements: Placement[] = ['bottom-start', 'bottom', 'bottom-end'];
const placementOptions: Placement[] = [...topPlacements, ...leftPlacements, ...rightPlacements, ...bottomPlacements];

const placementsTypes = getUnionTypeSummary(placementOptions);

const tourtipStepProps = `{
  title: string;
  description: string;
  target: string;
  icon?: IconProps['type'];
  placement?: ${placementsTypes};
  beaconOffset?: [number, number];
  beaconAriaLabel?: string;
}`;

const callbackStepData = `{
  currentIndex: number;
  action?: 'ready' | 'start' | 'next' | 'prev';
  newIndex?: number;
}`;

const defaultLabels = `{
  nextButtonLabel: string;
  prevButtonLabel: string;
  progressLabel?: string;
  progressSeparator?: string; // eg: 'of' => 1 of 3 OR '/' => 1 / 3
}`;

const meta: Meta<typeof Tourtip> = {
  title: 'Data Display Components/Tourtip',
  component: Tourtip,
  parameters: {
    docs: { source: { type: 'code' }, hidePrimaryInStories: true },
    layout: 'fullscreen',
  },
  argTypes: {
    run: {
      control: 'boolean',
      description: 'Determines if tour is running.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    steps: {
      control: 'object',
      description: 'An array of the steps to the tour.',
      type: { required: true, name: 'string' },
      table: {
        category: 'props',
        type: {
          summary: 'TourtipStep[]',
          detail: tourtipStepProps,
        },
      },
    },
    stepIndex: {
      control: 'number',
      description: 'Set the current step index. **controlled mode**',
      table: {
        category: 'props',
        type: {
          summary: 'number',
        },
      },
    },
    defaultStepIndex: {
      control: 'number',
      description: 'Set a default step index to start the tour from.',
      table: {
        category: 'props',
        defaultValue: { summary: '0' },
        type: {
          summary: 'number',
        },
      },
    },
    enableMinimize: {
      control: 'boolean',
      description: 'Determines if tour can be minimized.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    defaultIsMinimize: {
      control: 'boolean',
      if: { arg: 'enableMinimize', truthy: true },
      description:
        'Set a default value for the tour minimize state. .<br />**Either this or `enableMinimize` are required.**',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    defaultLabels: {
      control: false,
      type: { required: true, name: 'string' },
      description: "Set the default labels for the Tourtip's text areas",
      table: {
        type: { summary: 'defaultLabels', detail: defaultLabels },
        category: 'props',
      },
    },
    onTourStart: {
      control: false,
      description:
        'Called when the tour starts and show the first step on mount. <br />**Triggers when `enableMinimize` and `defaultIsMinimize` is falsy **',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onBeaconClick: {
      control: false,
      if: { arg: 'enableMinimize', truthy: true },
      description: 'Called when the user clicked on the beacon. <br />**Triggers when `hideTourtipOnMount` is truthy**',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onNextClick: {
      control: false,
      description: 'Called when next button clicked, <br />** Required on controlled mode **',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onPrevClick: {
      control: false,
      description: 'Called when prev button clicked, <br />** Required on controlled mode **',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onTargetNotFound: {
      control: false,
      description: 'Called when the target element is not found. <br />** Required on controlled mode **',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onStepChange: {
      control: false,
      description: 'Called when the step changes. <br />** Triggers only on uncontrolled mode**',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onTourComplete: {
      control: false,
      description: 'Called when the tour is completed.',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onTourDismiss: {
      control: false,
      description: 'Called when the tour is dismissed. (when the user clicks the close button)',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    onTourMinimize: {
      control: false,
      if: { arg: 'enableMinimize', truthy: true },
      description:
        'Called when the tour is minimized. (when the user clicks outside the tourtip) <br />** Triggers only when `enableMinimize` is true **',
      table: {
        type: { summary: '(data: CallbackStepData) => void', detail: callbackStepData },
        category: 'events',
      },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'If set, the focus will be trapped within the popover.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'tourtip' },
        category: 'tests',
      },
    },
  },
  args: {
    run: true,
    steps: [
      {
        title: `Tourtip title`,
        icon: 'info',
        description: `This is a tourtip step example`,
        target: `#top-start`,
        nextButtonLabel: 'Next',
      },
    ],
    defaultLabels: {
      nextButtonLabel: 'Next',
      prevButtonLabel: 'Previous',
    },
    enableMinimize: false,
    defaultIsMinimize: false,
    stepIndex: undefined,
    defaultStepIndex: 0,
    'data-testid': 'tourtip',
  },
};
export default meta;

export const Main: StoryObj<typeof Tourtip> = {
  render: ({ onStepChange, defaultIsMinimize, ...args }) => {
    const [resetStory, setResetStory] = useState(true);
    const [isRunning, setIsRunning] = useState(args.run);

    useEffect(() => {
      setIsRunning(args.run);
    }, [args.run]);

    const stopTour = () => {
      setIsRunning(false);
    };

    useEffect(() => {
      if (!args.enableMinimize) {
        setIsRunning(true);
      }
    }, [args.enableMinimize]);

    const toggleTour = () => {
      setIsRunning(!isRunning);
      // resets the story's state
      setResetStory(!isRunning);
      setTimeout(() => setResetStory(!resetStory));
    };

    const containerProps = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: '100px',
      width: '100px',
      bgColor: 'semantic.surface.warning',
      padding: 's',
    };

    const steps = placementOptions.map((placement, index) => ({
      title: `Tourtip placement: ${placement}`,
      description: `This is a tourtip step example for ${placement}'s placement.`,
      target: `#${placement}`,
      nextButtonLabel: index === placementOptions.length - 1 ? 'Done' : 'Next',
      placement,
    })) as TourtipSteps;

    return (
      <Storybook.Container alignItems="center" justifyContent="center">
        {resetStory && (
          <Tourtip
            {...args}
            run={isRunning}
            steps={steps}
            onTourComplete={stopTour}
            onTourDismiss={stopTour}
            defaultLabels={{
              ...args.defaultLabels,
              progressSeparator: 'of',
            }}
          />
        )}
        <Group variant="vertical" alignItems="center" width="full" spacing="xxxl">
          <Storybook.Container paddingY="xxl">
            <Button label={`${isRunning ? 'Stop tour' : 'Start Tour'}`} onClick={toggleTour} isFullWidth />
          </Storybook.Container>
          <Storybook.Container
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            minWidth="850px"
            height="480px"
          >
            <Storybook.Container width="550px">
              <Group justifyContent="center" spacing="xxl">
                {['top-start', 'top', 'top-end'].map((placement, index) => (
                  <Storybook.Container key={`${placement}-${index}`} {...(containerProps as BoxProps)} id={placement}>
                    {placement}
                  </Storybook.Container>
                ))}
              </Group>
              <br />
              <Group justifyContent="space-between">
                <Group variant="vertical" spacing="l">
                  {['left-start', 'left', 'left-end'].map((placement, index) => (
                    <Storybook.Container key={`${placement}-${index}`} {...(containerProps as BoxProps)} id={placement}>
                      {placement}
                    </Storybook.Container>
                  ))}
                </Group>
                <Group variant="vertical" spacing="l">
                  {['right-start', 'right', 'right-end'].map((placement, index) => (
                    <Storybook.Container key={`${placement}-${index}`} {...(containerProps as BoxProps)} id={placement}>
                      {placement}
                    </Storybook.Container>
                  ))}
                </Group>
              </Group>
              <br />
              <Group justifyContent="center" spacing="xxl">
                {['bottom-start', 'bottom', 'bottom-end'].map((placement, index) => (
                  <Storybook.Container key={`${placement}-${index}`} {...(containerProps as BoxProps)} id={placement}>
                    {placement}
                  </Storybook.Container>
                ))}
              </Group>
            </Storybook.Container>
          </Storybook.Container>
        </Group>
      </Storybook.Container>
    );
  },
  decorators: [(Story) => <Storybook.Container height="900px">{Story()}</Storybook.Container>],
};

const tabs: TabItem[] = [
  {
    name: 'vendors',
    label: 'Vendors',
    pills: [
      { status: 'critical', label: 'Critical' },
      { status: 'warning', label: 'Warning' },
    ] as TabItem['pills'],
  },
  {
    name: 'bills',
    label: 'Bills',
    pills: [
      { status: 'success', label: 'Success' },
      { status: 'warning', label: 'Warning' },
    ] as TabItem['pills'],
  },
  {
    name: 'approvals',
    label: 'Approvals',
    pills: [
      { status: 'warning', label: 'Warning' },
      { status: 'success', label: 'Success' },
    ] as TabItem['pills'],
  },
];

const tabsContent = {
  vendors: (
    <Container justifyContent="center" alignItems="center">
      <Storybook.Container width="400px" margin="auto">
        <Group variant="vertical" justifyContent="center" alignItems="center" textAlign="center">
          <>
            <Illustration type="no-items" />
            <Typography.MainLabel label="Add any vendor or biller" />
            <Typography.Description label="Connect with verified vendors and billers from our network, or add your own to start making payments." />
            <Button aria-label="Add a vendor" label="Add a vendor" />
          </>
        </Group>
      </Storybook.Container>
    </Container>
  ),
  bills: (
    <Group variant="vertical" spacing="xxl">
      <Storybook.ContentPlaceholder height="1200px" label="bills Section" />
      <Button aria-label="Bills very bottom button" label="Bills very bottom button" />
    </Group>
  ),
  approvals: <Storybook.ContentPlaceholder height="200px" label="approvals Section" />,
} as { [key: string]: ReactNode };

export const NewPaymentTourControlled: StoryObj<typeof Tourtip> = {
  render: ({ onStepChange, defaultIsMinimize, run, ...args }) => {
    const steps: TourtipSteps = [
      {
        title: 'All your vendors in one place',
        description: 'Pay an open balance or make a new payment to any vendor or biller.',
        target: '#tab-vendors',
      },
      {
        title: 'Stay ahead of bills',
        description: "Find new bills to pay, see what's due soon, and easily schedule payments for what's due later.",
        target: '#tab-bills',
      },
      {
        title: 'Add a new bill',
        description: 'Add a new bill to start making payments. You can also add a new bill when you make a payment.',
        target: '[aria-label="Bills very bottom button"]',
        placement: 'top',
      },
      {
        title: 'Approve or decline payments',
        description: 'Payments that need your approval will show up here for you to review.',
        target: '#tab-approvals',
        nextButtonLabel: 'Got it',
        placement: 'right-end',
        beaconOffset: [0, 150],
      },
    ];

    const [isRunning, setIsRunning] = useState(false);
    const [selectedTab, setSelectedTab] = useState<string>('bills');
    const [stepIndex, setStepIndex] = useState<number>(args.stepIndex ?? 0);
    const isLastStep = stepIndex === steps.length - 1;
    const [resetStory, setResetStory] = useState(isRunning);

    const stopTour = () => {
      setIsRunning(false);
    };

    const resetTour = () => {
      stopTour();
      setStepIndex(0);
    };

    const nextStep = () => {
      setStepIndex(stepIndex + 1);
    };

    const prevStep = () => {
      setStepIndex(stepIndex - 1);
    };

    const onTargetNotFound = ({ action }: CallbackStepData) => {
      if (stepIndex >= 0 && action !== 'prev') {
        if (!isLastStep) {
          nextStep();
        }
      } else {
        prevStep();
      }
    };

    const onMinimize = () => {
      if (args.enableMinimize) {
        stopTour();
      }
    };

    const toggleTour = () => {
      setIsRunning(!isRunning);
      // resets the story's state
      setResetStory(!isRunning);
      setTimeout(() => {
        setResetStory(!resetStory);
        if (resetStory) {
          setStepIndex(0);
        }
      });
    };

    return (
      <Storybook.Container alignItems="center" justifyContent="center">
        <Group variant="vertical" alignItems="center" width="full">
          <Storybook.Container paddingY="xxl">
            <Button label={`${isRunning ? 'Stop tour' : 'Start Tour'}`} onClick={toggleTour} />
          </Storybook.Container>
          {resetStory && (
            <Tourtip
              {...args}
              run={isRunning}
              steps={steps}
              stepIndex={stepIndex}
              onTourDismiss={resetTour}
              onTourComplete={resetTour}
              onTargetNotFound={onTargetNotFound}
              onNextClick={nextStep}
              onPrevClick={prevStep}
              onTourMinimize={onMinimize}
              onBeaconClick={() => {
                if (args.enableMinimize) setIsRunning(true);
              }}
              enableMinimize={args.enableMinimize}
              defaultLabels={{
                ...args.defaultLabels,
                progressLabel: `${stepIndex + 1} / ${steps.length}`,
              }}
            />
          )}
          <Layout>
            <Group variant="vertical" spacing="xl">
              <Text as="h2" textStyle="heading1Semi">
                Screen heading
              </Text>
              <Tabs activeTab={selectedTab} onChange={setSelectedTab} tabs={tabs} />
              <Container paddingTop="m">{tabsContent[selectedTab]}</Container>
            </Group>
          </Layout>
        </Group>
      </Storybook.Container>
    );
  },
  decorators: [
    (Story) => (
      <Storybook.Container width="full" height="1800px">
        {Story()}
      </Storybook.Container>
    ),
  ],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
