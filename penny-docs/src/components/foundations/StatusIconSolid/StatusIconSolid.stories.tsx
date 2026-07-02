import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pill } from '@/components/dataDisplay/Pill';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantGrid, VariantGridItem } from '@/storybook-utils/VariantGrid';

import { StatusIconSolid, type StatusIconSolidVariant } from './StatusIconSolid';

const variants: readonly StatusIconSolidVariant[] = [
  'success',
  'informative',
  'scheduled',
  'help',
  'processing',
  'issues',
  'warning',
  'pending',
  'alert',
  'decline',
  'cancel',
];

const meta: Meta<typeof StatusIconSolid> = {
  title: 'Foundations/Status Icon Solid',
  component: StatusIconSolid,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Sets the icon glyph and its semantic color.',
      table: { type: { summary: variants.join(' | ') }, category: 'props' },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large', 'extra-large'],
      description: 'The icon size.',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large' | 'extra-large'" },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Visually indicates the status is not currently relevant, and makes it non-interactive.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the icon as read-only, preventing interaction.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isInverse: {
      control: 'boolean',
      description: 'Renders for use on a dark/inverse surface.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    variant: 'success',
    size: 'large',
    isDisabled: false,
    isReadOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof StatusIconSolid>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { include: ['variant', 'size', 'isDisabled', 'isReadOnly', 'isInverse'] } },
  render: (args) => (
    <div style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StatusIconSolid {...args} />
    </div>
  ),
};

// ─── Status variants ─────────────────────────────────────────────────────────

const VARIANT_LABEL: Record<StatusIconSolidVariant, string> = {
  success: 'Success',
  informative: 'Informative',
  scheduled: 'Scheduled',
  help: 'Help',
  processing: 'Processing',
  issues: 'Issues',
  warning: 'Warning',
  pending: 'Pending',
  alert: 'Alert',
  decline: 'Decline',
  cancel: 'Cancel',
};

/**
 * The `variant` prop sets the icon's glyph and semantic color.
 */
export const Variants: Story = {
  render: () => (
    <VariantGrid minItemWidth={96}>
      {variants.map((variant) => (
        <VariantGridItem key={variant} label={VARIANT_LABEL[variant]}>
          <StatusIconSolid variant={variant} size="large" />
        </VariantGridItem>
      ))}
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

/**
 * Four sizes — `small` (16), `medium` (24), `large` (32), and `extra-large` (40).
 */
export const Sizes: Story = {
  render: () => (
    <VariantGrid minItemWidth={96}>
      <VariantGridItem label="Small (16)">
        <StatusIconSolid variant="success" size="small" />
      </VariantGridItem>
      <VariantGridItem label="Medium (24)">
        <StatusIconSolid variant="success" size="medium" />
      </VariantGridItem>
      <VariantGridItem label="Large (32)">
        <StatusIconSolid variant="success" size="large" />
      </VariantGridItem>
      <VariantGridItem label="Extra-large (40)">
        <StatusIconSolid variant="success" size="extra-large" />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── States ────────────────────────────────────────────────────────────────────

/**
 * Read-only prevents interaction; disabled additionally indicates the status is not currently
 * relevant or active.
 */
export const States: Story = {
  render: () => (
    <VariantGrid minItemWidth={110}>
      <VariantGridItem label="Default">
        <StatusIconSolid variant="success" size="large" />
      </VariantGridItem>
      <VariantGridItem label="Read-only">
        <StatusIconSolid variant="success" size="large" isReadOnly />
      </VariantGridItem>
      <VariantGridItem label="Disabled">
        <StatusIconSolid variant="success" size="large" isDisabled />
      </VariantGridItem>
    </VariantGrid>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Related components ────────────────────────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Color Tokens"
        url="/?path=/docs/foundations-color-tokens--docs"
        preview={<StatusIconSolid variant="informative" size="large" />}
      />
      <RelatedComponent
        name="Pill"
        url="/?path=/docs/components-data-display-pill--docs"
        preview={<Pill status="success" label="Paid" />}
      />
    </RelatedComponents>
  ),
};
