import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Tooltip } from './Tooltip';

/**
 * The local `Tooltip` is a pass-through stub (it renders its children without the floating
 * bubble). The visuals below are static design mocks that show the intended appearance until
 * the real component is vendored. `TooltipBubble` is a story-only mock, not part of the API.
 */
const TooltipBubble = ({
  children,
  caret = 'bottom',
}: {
  children: React.ReactNode;
  caret?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const caretStyle: Record<string, React.CSSProperties> = {
    bottom: { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    top: { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  };
  return (
    <div
      style={{
        position: 'relative',
        background: '#18191b',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '12px',
        lineHeight: 1.4,
        padding: '8px 12px',
        borderRadius: '8px',
        maxWidth: '296px',
      }}
    >
      {children}
      <div style={{ position: 'absolute', width: '8px', height: '8px', background: '#18191b', ...caretStyle[caret] }} />
    </div>
  );
};

const Trigger = () => <IconButton icon="info" variant="naked" size="small" aria-label="More information" />;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Data Display/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: 'text',
      description: 'The helper text shown in the tooltip.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    placement: {
      control: 'inline-radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side of the trigger the tooltip appears on.',
      table: { defaultValue: { summary: 'top' }, type: { summary: "'top' | 'bottom' | 'left' | 'right'" }, category: 'props' },
    },
    isEnabled: {
      control: 'boolean',
      description: 'Whether the tooltip is enabled.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    content: 'Scheduled to send on May 2',
    placement: 'top',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { include: ['content', 'placement', 'isEnabled'] } },
  render: (args) => (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <TooltipBubble>{args.content}</TooltipBubble>
      <Trigger />
    </div>
  ),
};

// ─── With title ────────────────────────────────────────────────────────────────

/**
 * A tooltip can pair a bold title with a short supporting line.
 */
export const WithTitle: Story = {
  render: () => (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <TooltipBubble>
        <strong style={{ display: 'block', marginBottom: '2px' }}>Scheduled payment</strong>
        Sends automatically on May 2.
      </TooltipBubble>
      <Trigger />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Label with line break ───────────────────────────────────────────────────────

/**
 * There's no character limit, but the tooltip's max width is 296px — long text wraps.
 */
export const LabelWithLineBreak: Story = {
  render: () => (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <TooltipBubble>
        Only admins can edit roles. Ask a workspace admin to change permissions for this member.
      </TooltipBubble>
      <Trigger />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Placement ─────────────────────────────────────────────────────────────────

/**
 * The tooltip can sit on any side of its trigger.
 */
export const Placement: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        padding: '32px',
        justifyItems: 'center',
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <div key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <TooltipBubble caret="bottom">{p}</TooltipBubble>
          <Trigger />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Label with icon ─────────────────────────────────────────────────────────────

/**
 * Pair the helper text with a small icon for extra context.
 */
export const LabelWithIcon: Story = {
  render: () => (
    <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <TooltipBubble>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Icon type="info" size="small" color="inherit" aria-hidden />
          Verified business account
        </span>
      </TooltipBubble>
      <Trigger />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Current behavior (stub) ─────────────────────────────────────────────────────

/**
 * The current local `Tooltip` renders its children unchanged — no floating bubble yet.
 */
export const CurrentBehavior: Story = {
  render: () => (
    <div style={{ padding: '32px' }}>
      <Tooltip content="Scheduled to send on May 2">
        <Trigger />
      </Tooltip>
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

// ─── Related components ────────────────────────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related components',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Section Banner"
        url="/?path=/docs/components-data-display-section-banner--docs"
        preview={
          <Group spacing="xs" alignItems="center">
            <Icon type="info" size="small" color="inherit" aria-hidden />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#475569' }}>Inline guidance</span>
          </Group>
        }
      />
    </RelatedComponents>
  ),
};
