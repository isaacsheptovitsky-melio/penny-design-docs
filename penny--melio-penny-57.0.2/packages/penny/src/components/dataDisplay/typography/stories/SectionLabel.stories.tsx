import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { Container } from '@/components/containers/Container';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Typography } from '..';
import { asOptions } from '../_SectionLabel/_SectionLabel.types';

const tooltipPropsType = `{
  content: ReactNode;
}`;

const meta: Meta<typeof Typography.SectionLabel> = {
  title: 'Data Display Components/Typography/Section Label [pattern]',
  component: Typography.SectionLabel,
  decorators: [
    (Story: StoryFn) => (
      <Container paddingX="xxl" paddingY="xxl">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text of the label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    as: {
      control: 'select',
      options: asOptions,
      description: 'Determines which type of element the component should be rendered as.',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: getUnionTypeSummary([...asOptions]) },
        category: 'props',
      },
    },
    tooltipProps: {
      control: 'object',
      if: { arg: 'isVerified', truthy: false },
      description:
        'An icon with tooltip to assert more information.<br />**Either this or `isVerified` are allowed at a time.**',
      table: {
        type: { summary: "Pick<TooltipProps, 'content'>", detail: tooltipPropsType },
        category: 'props',
      },
    },
    isVerified: {
      control: 'boolean',
      if: { arg: 'tooltip', truthy: false },
      description:
        'Adds a "verfied" icon next to the label.<br />**Either this or `tooltipProps` are allowed at a time.**',
      table: { type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    label: 'Title',
    tooltipProps: undefined,
    isVerified: false,
    as: 'div',
  },
};
export default meta;

export const Main: StoryObj<typeof Typography.SectionLabel> = {
  render: (args) => <Typography.SectionLabel {...args} />,
};

export const WithTooltip: StoryObj<typeof Typography.SectionLabel> = {
  render: (args) => (
    <Typography.SectionLabel
      {...args}
      isVerified={undefined}
      tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }}
    />
  ),
  play: async () => userEvent.hover(screen.getByTestId('icon-indicator')),
};

export const Verified: StoryObj<typeof Typography.SectionLabel> = {
  render: (args) => <Typography.SectionLabel {...args} tooltipProps={undefined} isVerified />,
};
