import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button';
import { Container } from '@/components/containers/Container';

import { fullScreenChromaticDecorator, getUnionTypeSummary } from '../../../test-utils';
import { _IconIndicator } from './_IconIndicator';

const popoverProps = `{
  description: string;
  actionRenderer: (props) => ReactNode;
  'aria-label'?: string;
  'data-testid'?: string;
}`;

const tooltipProps = `{
  content: ReactNode;
  shouldAddTriggerFocus?: boolean;
  triggerAriaLabel?: string;
}`;

const options = ['informative', 'warning', 'alert'];

const meta: Meta<typeof _IconIndicator> = {
  title: 'Internal Components/Icon Indicator',
  component: _IconIndicator,
  decorators: [
    fullScreenChromaticDecorator,
    (Story: StoryFn) => (
      <Container paddingX="l" paddingY="l">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    tooltip: {
      control: 'object',
      table: { type: { summary: `Pick<TitleProps, 'label' | 'title'>`, detail: tooltipProps }, category: 'props' },
      description: 'The tooltip to display. <br/> **Cannot be passed along with popover prop.**',
    },
    popover: {
      control: 'object',
      description: 'The popover to display. <br/> **Cannot be passed along with tooltip prop.**',
      table: {
        type: {
          summary: `Pick<PopoverProps, 'description' | 'actionRenderer' | 'data-testid' | 'aria-label'>`,
          detail: popoverProps,
        },
        category: 'props',
      },
    },
    variant: {
      control: 'select',
      options,
      description: 'The variant of the icon.',
      table: {
        type: { summary: getUnionTypeSummary(options) },
        defaultValue: { summary: "'informative'" },
        category: 'props',
      },
    },
  },
  args: {
    variant: 'informative',
  },
};
export default meta;

export const Main: StoryObj<typeof _IconIndicator> = {};

export const WithTooltip: StoryObj<typeof _IconIndicator> = {
  render: () => (
    <_IconIndicator
      data-testid="trigger"
      variant="warning"
      tooltip={{ content: 'Beware! The lord of the land approaches.' }}
    />
  ),
  play: async () => userEvent.hover(screen.getByTestId('trigger')),
};

export const WithPopover: StoryObj<typeof _IconIndicator> = {
  render: () => (
    <_IconIndicator
      data-testid="trigger"
      variant="warning"
      popover={{
        description: 'Vendor is not verified',
        'aria-label': 'Vendor verification status',
        actionRenderer: ({ onClose, ...props }) => (
          <Button {...props} onClick={onClose} size="small" variant="secondary-inverse" label="Verify Vendor" />
        ),
      }}
    />
  ),
  play: async () => userEvent.hover(screen.getByTestId('trigger')),
  parameters: {
    chromatic: {
      delay: 1000,
    },
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109338 (aria-allowed-attr)
      test: 'todo',
    },
  },
};

export const Variants: StoryObj<typeof _IconIndicator> = {
  render: () => {
    const items = [
      { label: 'Informative', component: <_IconIndicator variant="informative" /> },
      { label: 'Warning', component: <_IconIndicator variant="warning" /> },
    ];

    return <Storybook.Row items={items} />;
  },
};
