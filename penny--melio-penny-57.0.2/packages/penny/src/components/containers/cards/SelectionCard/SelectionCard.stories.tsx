import { noop, useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { Icon } from '@/components/foundations/Icon';
import { Image } from '@/components/media/Image';

import { Group } from '../../Group';
import CardStory from '../Card/Card.stories';
import { SelectionCard } from './SelectionCard';

const labelPropsType = `{
  label: string;
  tooltipProps?: { content: ReactNode };
  description?: string;
}`;

const descriptionPropsType = `{
  label: string;
} & OneOrNone<{
  link: { label: string; href: string };
  action: { label: string; onClick: MouseEventHandler };
}>`;

const mainLabelPropsType = `{
  label: string;
  secondaryLabel?: string;
  pillProps?: {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  } | {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  }[]];
  tooltipProps?: {
    content: ReactNode;
    triggerStatus?: 'informative' | 'warning' | 'alert';
  };
};`;

const menuActionsType = `{
  items: {
    label: string;
    onClick: VoidFunction;
    variant?: 'default' | 'critical';
  }[];
  triggerAriaLabel?: string;
}`;

const meta: Meta<typeof SelectionCard> = {
  title: 'Containers/Cards/Selection Card [pattern]',
  component: SelectionCard,
  argTypes: {
    variant: CardStory.argTypes?.variant,
    labelProps: {
      control: 'object',
      description: 'The properties passed to the label.',
      table: {
        type: { summary: 'TypographyLabelProps', detail: labelPropsType },
        category: 'props',
      },
    },
    mainLabelProps: {
      control: 'object',
      type: { required: true, value: 'object', name: 'other' },
      description: 'The properties passed to the main label.',
      table: {
        type: { summary: 'TypographyMainLabelProps', detail: mainLabelPropsType },
        category: 'props',
      },
    },
    descriptionProps: {
      control: 'object',
      description: 'The properties passed to the description.',
      table: {
        type: { summary: 'TypographyDescriptionProps', detail: descriptionPropsType },
        category: 'props',
      },
    },
    action: {
      control: 'object',
      description:
        'An action that accompanies the description text.<br />**Either this or `menuActions` are allowed.**',
      table: {
        type: { summary: '{ label: string; onClick: MouseEventHandler }' },
        category: 'props',
      },
    },
    menuActions: {
      control: false,
      if: { arg: 'action', truthy: false },
      description:
        'If passed, a menu is rendered. The items are the actions that are presented in the dropdown, and the `triggerAriaLabel` overrides the default aria-label of the trigger.<br />**Either this or `action` are allowed.**',
      table: {
        category: 'props',
        type: { summary: 'ActionsDropdownMenuItemProps[]', detail: menuActionsType },
      },
    },
    leftElement: {
      control: false,
      description:
        'Element displayed on the left side of the card. Commonly used to render an icon / brand-symbol / image.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled for selection or not.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'props',
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the card is readonly for selection or not.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'props',
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is selected or not.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Handles the click event of the card.',
      table: { category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'selection-card' }, category: 'tests' },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label for the component.',
      table: {
        defaultValue: { summary: undefined },
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
  },
  args: {
    variant: 'default',
    labelProps: { label: 'Label' },
    mainLabelProps: { label: 'Main Label' },
    descriptionProps: { label: 'Description' },
    action: undefined,
    menuActions: undefined,
    leftElement: undefined,
    disabled: false,
    readOnly: false,
    selected: false,
  },
};
export default meta;

export const Main: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);

    return <SelectionCard {...args} selected={selected} onClick={setSelected.toggle} />;
  },
};

/**
 * Example showing how to use `SelectionCard` with a label,
 * and how to customize its `aria-label` for accessibility.
 */
export const WithLabel: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);

    return (
      <SelectionCard
        {...args}
        leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} />}
        labelProps={{ label: 'Label' }}
        descriptionProps={undefined}
        selected={selected}
        onClick={setSelected.toggle}
        aria-label="SelectionCard with label and custom aria label"
      />
    );
  },
};

export const WithOnlyMainLabelAndIcon: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);
    return (
      <SelectionCard
        {...args}
        leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} />}
        labelProps={undefined}
        descriptionProps={undefined}
        selected={selected}
        onClick={setSelected.toggle}
      />
    );
  },
};
export const WithDescription: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);
    return (
      <SelectionCard
        {...args}
        leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} aria-hidden />}
        labelProps={undefined}
        descriptionProps={{ label: 'Description' }}
        selected={selected}
        onClick={setSelected.toggle}
      />
    );
  },
};

/**
 * Example showing how to use `SelectionCard` with actions.
 * The first card demonstrates a selection card with a custom `aria-label`.
 */
export const WithActions: StoryObj<typeof SelectionCard> = {
  render: ({ selected, ...args }) => {
    const [isFirstSelected, setFirstSelection] = useBoolean(selected);
    const [isSecondSelected, setSecondSelection] = useBoolean(selected);
    return (
      <Group variant="vertical">
        <SelectionCard
          {...args}
          leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} aria-hidden />}
          selected={isFirstSelected}
          onClick={setFirstSelection.toggle}
          menuActions={undefined}
          action={{ label: 'CTA', onClick: noop }}
          aria-label="SelectionCard with a CTA and custom aria label"
        />
        <SelectionCard
          {...args}
          leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} aria-hidden />}
          selected={isSecondSelected}
          onClick={setSecondSelection.toggle}
          action={undefined}
          menuActions={{
            items: [
              {
                label: 'Action #1',
                onClick: noop,
              },
              {
                label: 'Action #2',
                onClick: noop,
              },
              {
                label: 'Action #3',
                onClick: noop,
                variant: 'critical',
              },
            ],
          }}
        />
      </Group>
    );
  },
};

/**
 * Renders a `SelectionCard` with icon.
 *
 * Accessibility:
 * - If the icon is purely decorative or redundant (e.g., the icon is already conveyed via text), use `aria-hidden`.
 * - If the icon conveys meaningful description provide accessible context using `role="img"` and `aria-label="..."`.
 */
export const WithIcon: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);
    return (
      <SelectionCard
        {...args}
        leftElement={<Icon type="credit-card" isDisabled={args.disabled} isReadOnly={args.readOnly} aria-hidden />}
        selected={selected}
        onClick={setSelected.toggle}
      />
    );
  },
};

/**
 * Renders a `SelectionCard` with image.
 *
 * Accessibility:
 * - If the image is purely decorative or redundant (e.g., the icon is already conveyed via text), use `aria-hidden`.
 * - If the image conveys meaningful description provide accessible context using `role="img"` and `aria-label="..."`.
 */
export const WithImage: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);
    return (
      <SelectionCard
        {...args}
        leftElement={
          <Image
            src="/assets/ChaseMini.svg"
            alt="Chase bank"
            isDisabled={args.disabled}
            isReadOnly={args.readOnly}
            aria-hidden
          />
        }
        selected={selected}
        onClick={setSelected.toggle}
      />
    );
  },
};

/**
 * Renders a `SelectionCard` with image / fallbackImage.
 *
 * Accessibility:
 * - If the image is purely decorative or redundant (e.g., the icon is already conveyed via text), use `aria-hidden`.
 * - If the image conveys meaningful description provide accessible context using `role="img"` and `aria-label="..."`.
 */
export const FallbackImage: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);

    return (
      <SelectionCard
        {...args}
        leftElement={
          <Image
            src="data:image/svg+xml;utf8;base64,brokenimage"
            alt="Chase bank"
            isDisabled={args.disabled}
            isReadOnly={args.readOnly}
            aria-hidden
            fallbackIcon={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} aria-hidden />}
          />
        }
        selected={selected}
        onClick={setSelected.toggle}
      />
    );
  },
};

export const WithTooltipAndBadge: StoryObj<typeof SelectionCard> = {
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);
    return (
      <SelectionCard
        {...args}
        leftElement={
          <Image src="/assets/ChaseMini.svg" alt="Chase bank" isDisabled={args.disabled} isReadOnly={args.readOnly} />
        }
        selected={selected}
        onClick={setSelected.toggle}
        mainLabelProps={{
          label: 'Main Label',
          pillProps: { label: 'Neutral', status: 'neutral' },
          tooltipProps: { content: "Hi! I'm a tooltip!" },
        }}
      />
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('line-item-tooltip-trigger')),
};

export const Selected: StoryObj<typeof SelectionCard> = {
  args: {
    selected: true,
  },
  render: (args) => {
    const [selected, setSelected] = useBoolean(args.selected);
    return (
      <SelectionCard
        {...args}
        leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={args.readOnly} aria-hidden />}
        selected={selected}
        onClick={setSelected.toggle}
      />
    );
  },
};

export const Disabled: StoryObj<typeof SelectionCard> = {
  args: {
    disabled: true,
    onClick: noop,
  },
  render: ({ disabled, ...args }) => (
    <Group variant="vertical">
      <SelectionCard
        {...args}
        disabled={disabled}
        leftElement={<Icon type="bank" isDisabled={disabled} isReadOnly={args.readOnly} aria-hidden />}
      />
      <SelectionCard
        {...args}
        disabled={disabled}
        leftElement={
          <Image
            src="/assets/ChaseMini.svg"
            alt="Chase bank"
            isDisabled={disabled}
            isReadOnly={args.readOnly}
            aria-hidden
          />
        }
      />
    </Group>
  ),
};

export const ReadOnly: StoryObj<typeof SelectionCard> = {
  args: {
    readOnly: true,
    onClick: noop,
  },
  render: ({ readOnly, ...args }) => (
    <Group variant="vertical">
      <SelectionCard
        {...args}
        readOnly={readOnly}
        leftElement={<Icon type="bank" isDisabled={args.disabled} isReadOnly={readOnly} aria-hidden />}
      />
      <SelectionCard
        {...args}
        readOnly={readOnly}
        leftElement={
          <Image
            src="/assets/ChaseMini.svg"
            alt="Chase bank"
            isDisabled={args.disabled}
            isReadOnly={readOnly}
            aria-hidden
          />
        }
      />
    </Group>
  ),
};
