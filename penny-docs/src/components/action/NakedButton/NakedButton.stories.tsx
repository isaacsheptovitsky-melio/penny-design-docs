import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { StatesGrid, StatesGridCell, StatesGridRow } from '@/storybook-utils/StatesGrid';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import { NakedButton } from './NakedButton';

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

const meta: Meta<typeof NakedButton> = {
  title: 'Components/Action/Naked Button',
  component: NakedButton,
  argTypes: {
    label: {
      control: 'text',
      description: 'The visible text label of the button.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'invert', 'critical'],
      description: 'Visual style of the button. Choose based on intent — not colour.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'invert' | 'critical'" },
        category: 'props',
      },
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: 'The size of the button.',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'medium' | 'large'" },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents user interaction and applies the disabled visual style.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    shouldSupportEllipsis: {
      control: 'boolean',
      description: 'Truncates the label with an ellipsis when it overflows the button width.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    leftElement: {
      control: false,
      description: 'ReactNode placed to the left of the label — typically an icon.',
      table: { category: 'props', type: { summary: 'ReactNode' } },
    },
    rightElement: {
      control: false,
      description: 'ReactNode placed to the right of the label — typically an icon or chevron.',
      table: { category: 'props', type: { summary: 'ReactNode' } },
    },
    link: {
      control: 'object',
      description:
        'When provided, renders the button as an `<a>` element. Use this whenever the action navigates the user.',
      table: { type: { summary: 'object', detail: linkProps }, category: 'props' },
    },
    'aria-label': {
      control: 'text',
      description: 'Overrides the accessible name. Only needed when the visible label is insufficient.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler.',
      table: { type: { summary: 'MouseEventHandler<HTMLButtonElement>' }, category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: '`data-testid` attribute for test selectors.',
      table: {
        defaultValue: { summary: 'naked-button' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    label: 'Naked button',
    variant: 'primary',
    size: 'medium',
    isDisabled: false,
    shouldSupportEllipsis: false,
  },
};

export default meta;
type Story = StoryObj<typeof NakedButton>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['label', 'variant', 'size', 'isDisabled', 'shouldSupportEllipsis', 'leftElement', 'rightElement', 'link'],
    },
  },
  render: (args) => {
    const isInverse = args.variant === 'invert';
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '30px 24px',
          background: isInverse ? '#1a0a3c' : 'transparent',
          transition: 'background 0.2s ease',
        }}
      >
        <NakedButton {...args} />
      </div>
    );
  },
};

// ─── Variant hierarchy cards ──────────────────────────────────────────────────

export const VariantHierarchy: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={<NakedButton label="Naked primary" variant="primary" />}
        title="Primary"
      >
        Low-emphasis action that still aligns with the brand intent. Use for non-critical actions that
        support the primary flow.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — secondary or tertiary actions that need brand colour</li>
          <li><strong>Examples</strong> — Learn more, Edit details, View invoice</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<NakedButton label="Naked secondary" variant="secondary" />}
        title="Secondary"
      >
        A more neutral, subdued action. Use when the action is supplementary and shouldn't compete
        with nearby primary or secondary buttons.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — low-priority utility actions</li>
          <li><strong>Examples</strong> — Cancel, Go back, Skip</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<NakedButton label="Naked critical" variant="critical" />}
        title="Critical"
      >
        Irreversible or high-stakes inline actions. Use sparingly — follow the two-step
        confirmation pattern for destructive flows.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — danger signal without a full button footprint</li>
          <li><strong>Examples</strong> — Remove, Delete, Unlink</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<NakedButton label="Naked invert" variant="invert" />}
        title="Invert"
        dark
      >
        Use as a low-emphasis action on dark or brand-coloured backgrounds.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — maintains legibility on dark surfaces</li>
          <li><strong>Examples</strong> — Actions inside hero banners or dark panels</li>
        </ul>
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

const NAKED_BUTTON_STATE_COLUMNS = [
  { label: 'Rest', tooltip: 'The default appearance' },
  { label: 'Hover', tooltip: 'When the user points at the button with the cursor' },
  { label: 'Pressed', tooltip: 'The moment the button is clicked or tapped' },
  { label: 'Disabled', tooltip: 'When the action is unavailable' },
];

// ─── States grid ─────────────────────────────────────────────────────────────

export const NakedButtonStates: Story = {
  render: () => (
    <StatesGrid columns={NAKED_BUTTON_STATE_COLUMNS}>
      <StatesGridRow label="Primary">
        <StatesGridCell><NakedButton label="Button" variant="primary" /></StatesGridCell>
        <StatesGridCell forceState="hover"><NakedButton label="Button" variant="primary" /></StatesGridCell>
        <StatesGridCell forceState="active"><NakedButton label="Button" variant="primary" /></StatesGridCell>
        <StatesGridCell><NakedButton label="Button" variant="primary" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Secondary">
        <StatesGridCell><NakedButton label="Button" variant="secondary" /></StatesGridCell>
        <StatesGridCell forceState="hover"><NakedButton label="Button" variant="secondary" /></StatesGridCell>
        <StatesGridCell forceState="active"><NakedButton label="Button" variant="secondary" /></StatesGridCell>
        <StatesGridCell><NakedButton label="Button" variant="secondary" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Critical">
        <StatesGridCell><NakedButton label="Button" variant="critical" /></StatesGridCell>
        <StatesGridCell forceState="hover"><NakedButton label="Button" variant="critical" /></StatesGridCell>
        <StatesGridCell forceState="active"><NakedButton label="Button" variant="critical" /></StatesGridCell>
        <StatesGridCell><NakedButton label="Button" variant="critical" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Invert">
        <StatesGridCell dark><NakedButton label="Button" variant="invert" /></StatesGridCell>
        <StatesGridCell dark forceState="hover"><NakedButton label="Button" variant="invert" /></StatesGridCell>
        <StatesGridCell dark forceState="active"><NakedButton label="Button" variant="invert" /></StatesGridCell>
        <StatesGridCell dark><NakedButton label="Button" variant="invert" isDisabled /></StatesGridCell>
      </StatesGridRow>
    </StatesGrid>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: (args) => (
    <Group alignItems="center" spacing="s">
      <NakedButton {...args} label="Medium" size="medium" />
      <NakedButton {...args} label="Large" size="large" />
    </Group>
  ),
  parameters: { controls: { exclude: ['size'] } },
};

// ─── With elements ────────────────────────────────────────────────────────────

export const ElementsGuide: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={
          <NakedButton
            label="New vendor"
            leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
          />
        }
        title="Left element"
      >
        Visually reinforces the button's meaning — e.g. a <strong>+</strong> before <em>New vendor</em>.
      </VariantCard>

      <VariantCard
        preview={
          <NakedButton
            label="Filter"
            rightElement={<Icon type="caret-down" size="small" color="inherit" aria-hidden />}
          />
        }
        title="Right element"
      >
        Signals what happens after the click — e.g. a chevron for a dropdown.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Naked button as link ─────────────────────────────────────────────────────

export const NakedButtonAsLink: Story = {
  render: (args) => (
    <NakedButton
      {...args}
      label="View invoice"
      link={{ href: 'https://example.com', target: '_blank' }}
    />
  ),
};
