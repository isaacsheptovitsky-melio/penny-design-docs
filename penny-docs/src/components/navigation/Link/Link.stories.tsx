import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { NavigationItem } from '@/components/navigation/NavigationItem';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import { Link } from './Link';

const colors = ['default', 'secondary', 'inverse', 'inherit'] as const;
const variants = ['inline', 'standalone'] as const;
const sizes = ['large', 'medium'] as const;

const meta: Meta<typeof Link> = {
  title: 'Components/Navigation/Link',
  component: Link,
  argTypes: {
    label: {
      control: 'text',
      description: 'The visible text of the link.',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    href: {
      control: 'text',
      description: 'The URL the link navigates to.',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description:
        '**standalone** — stands on its own (navigation menu, primary CTA). **inline** — embedded in a sentence.',
      table: {
        category: 'props',
        defaultValue: { summary: 'inline' },
        type: { summary: "'inline' | 'standalone'" },
      },
    },
    color: {
      control: 'select',
      options: colors,
      description:
        'Color variant. **default** — standard link color. **secondary** — brand accent. **inverse** — for dark backgrounds. **inherit** — matches parent text color.',
      table: {
        category: 'props',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'secondary' | 'inverse' | 'inherit'" },
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Text size — applies to standalone variant only. large uses Body2 (16px), medium uses Body3 (14px).',
      table: {
        category: 'props',
        defaultValue: { summary: 'large' },
        type: { summary: "'large' | 'medium'" },
      },
    },
    isBold: {
      control: 'boolean',
      description: 'Renders the link in bold weight — standalone variant only.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents interaction and grays out the link.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    newTab: {
      control: 'boolean',
      description: 'Opens the URL in a new browser tab when true.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    shouldSupportEllipsis: {
      control: 'boolean',
      description: 'Truncates overflowing text with an ellipsis and shows the full label in a tooltip on hover.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers — use when the visible label needs disambiguation.',
      table: {
        category: 'accessibility',
        type: { summary: 'string' },
      },
    },
    onClick: {
      description: 'Click event handler.',
      table: {
        category: 'events',
        type: { summary: 'MouseEventHandler<HTMLLinkElement>' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Test ID for automated testing.',
      table: {
        category: 'tests',
        defaultValue: { summary: 'link' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    href: '#',
    label: 'View details',
    variant: 'standalone',
    color: 'default',
    size: 'large',
    isBold: false,
    isDisabled: false,
    newTab: false,
    shouldSupportEllipsis: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    controls: {
      include: ['label', 'href', 'variant', 'color', 'size', 'isBold', 'isDisabled', 'newTab', 'shouldSupportEllipsis'],
    },
  },
  render: (args: React.ComponentProps<typeof Link>) => (
    <div
      style={{
        padding: '30px 24px',
        background: args.color === 'inverse' ? '#18191b' : 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {args.variant === 'inline' ? (
        <p style={{ margin: 0, fontSize: '14px', fontFamily: 'Poppins, sans-serif', color: args.color === 'inverse' ? '#ffffff' : '#18191b' }}>
          Please review our{' '}
          <Link {...args} />{' '}
          before proceeding.
        </p>
      ) : (
        <Link {...args} />
      )}
    </div>
  ),
};

// ─── Variant types (standalone vs inline) ─────────────────────────────────────

export const VariantTypes: Story = {
  name: 'Variant types',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9' }}>
          Standalone
        </p>
        <Link href="#" label="View all payables" variant="standalone" size="medium" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9' }}>
          Inline
        </p>
        <p style={{ margin: 0, fontSize: '14px', fontFamily: 'Poppins, sans-serif', color: '#18191b' }}>
          Please review the <Link href="#" label="Terms of Service" variant="inline" /> before proceeding.
        </p>
      </div>
    </div>
  ),
};

// ─── Colors ────────────────────────────────────────────────────────────────────

export const Colors: Story = {
  name: 'Colors',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <VariantCards>
      <VariantCard
        preview={<Link href="#" label="View invoice" variant="standalone" color="default" />}
        title="Default"
      >
        The standard link color for most use cases.
      </VariantCard>
      <VariantCard
        preview={<Link href="#" label="View invoice" variant="standalone" color="secondary" />}
        title="Secondary"
      >
        The brand color for more prominent links.
      </VariantCard>
      <VariantCard
        dark
        preview={<Link href="#" label="View invoice" variant="standalone" color="inverse" />}
        title="Inverse"
      >
        For use on dark backgrounds to ensure high contrast.
      </VariantCard>
      <VariantCard
        preview={
          <span style={{ color: '#646F87', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
            <Link href="#" label="View invoice" variant="standalone" color="inherit" />
          </span>
        }
        title="Inherit"
      >
        The link will inherit the color of its parent text element.
      </VariantCard>
    </VariantCards>
  ),
};

// ─── Related components ───────────────────────────────────────────────────────

export const RelatedComponentsBlock: Story = {
  name: 'Related components',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Button"
        url="/?path=/docs/components-action-button--docs"
        preview={<Button label="Label" variant="primary" />}
      />
      <RelatedComponent
        name="Naked Button"
        url="/?path=/docs/components-action-naked-button--docs"
        preview={<NakedButton label="Label" variant="primary" />}
      />
      <RelatedComponent
        name="Navigation Item"
        url="/?path=/docs/components-navigation-navigation-item--docs"
        preview={
          <NavigationItem isSelected>
            <Group variant="horizontal" spacing="xs-s" alignItems="center">
              <Icon size="small" type="info" color="inherit" aria-hidden />
              <Text textStyle="inline">Nav item label</Text>
            </Group>
          </NavigationItem>
        }
      />
    </RelatedComponents>
  ),
};

// ─── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9' }}>
          Large (Body2)
        </p>
        <Link href="#" label="View all payables" variant="standalone" size="large" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9' }}>
          Medium (Body3) — default
        </p>
        <Link href="#" label="View all payables" variant="standalone" size="medium" />
      </div>
    </div>
  ),
};

// ─── Bold ──────────────────────────────────────────────────────────────────────

export const BoldLinks: Story = {
  name: 'Bold',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif', display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9' }}>Regular</p>
        <Link href="#" label="View details" variant="standalone" size="medium" isBold={false} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9' }}>Bold</p>
        <Link href="#" label="View details" variant="standalone" size="medium" isBold />
      </div>
    </div>
  ),
};

// ─── Disabled ──────────────────────────────────────────────────────────────────

export const DisabledLinks: Story = {
  name: 'Disabled',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const LABEL: React.CSSProperties = {
      margin: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B95A9',
    };
    return (
      <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif', display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          <p style={LABEL}>Default</p>
          <Link href="#" label="View invoice" variant="standalone" color="default" isDisabled />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          <p style={LABEL}>Secondary</p>
          <Link href="#" label="View invoice" variant="standalone" color="secondary" isDisabled />
        </div>
      </div>
    );
  },
};
