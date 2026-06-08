import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatesGrid, StatesGridCell, StatesGridRow } from '@/storybook-utils/StatesGrid';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import { IconButton } from './IconButton';
import { iconButtonVariants, type IconButtonSizes } from './IconButton.types';
import { DEFAULT_DATA_TEST_ID } from './IconButton.utils';

const sizes: IconButtonSizes[] = ['extra-small', 'small', 'medium', 'large'];

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

const INVERSE_VARIANTS = new Set(['primary-inverse', 'secondary-inverse', 'naked-inverse']);

const meta: Meta<typeof IconButton> = {
  title: 'Components/Action/Icon Button',
  component: IconButton,
  argTypes: {
    icon: {
      control: 'select',
      options: ['chevron-left', 'chevron-right', 'close', 'edit', 'delete', 'info', 'search', 'checked', 'warning', 'add', 'filter'],
      description: 'The icon rendered inside the button. Always pair with `aria-label` — there is no visible text.',
      type: { name: 'string', required: true },
      table: { category: 'props', type: { summary: 'IconKey' } },
    },
    variant: {
      control: 'select',
      options: iconButtonVariants,
      description: 'Visual hierarchy of the button. Choose based on the action\'s prominence.',
      table: {
        defaultValue: { summary: 'tertiary' },
        type: { summary: (iconButtonVariants as readonly string[]).join(' | ') },
        category: 'props',
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the button. `medium` is the default.',
      table: { defaultValue: { summary: 'medium' }, type: { summary: "'extra-small' | 'small' | 'medium' | 'large'" }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents interaction and applies the disabled visual style.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner. The button becomes non-interactive.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    link: {
      control: 'object',
      description: 'When provided, renders the button as an `<a>` element. Use for navigation actions.',
      table: { type: { summary: 'object', detail: linkProps }, category: 'props' },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: '**Required.** Describes the button\'s action for screen readers — there is no visible label.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler.',
      table: { type: { summary: 'MouseEventHandler' }, category: 'events' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing.',
      table: {
        defaultValue: { summary: DEFAULT_DATA_TEST_ID },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    icon: 'add',
    variant: 'primary',
    size: 'medium',
    isDisabled: false,
    isLoading: false,
    'aria-label': 'Add',
    link: undefined,
    'data-testid': undefined,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['icon', 'variant', 'size', 'isDisabled', 'isLoading', 'link'],
    },
  },
  render: (args: typeof meta['args'] & { variant?: string }) => {
    const isInverse = INVERSE_VARIANTS.has(args.variant ?? '');
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '30px 24px',
          background: isInverse ? '#0F0728' : 'transparent',
          transition: 'background 0.2s ease',
        }}
      >
        <IconButton {...args} />
      </div>
    );
  },
};

export const VariantHierarchy: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <VariantCards>
      <VariantCard preview={<IconButton icon="add" variant="primary" aria-label="Add" />} title="Primary">
        The highest-emphasis action in a given context.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — the most important action on the screen</li>
          <li><strong>Constraints</strong> — use sparingly; mirrors the Button hierarchy</li>
          <li><strong>Examples</strong> — Add item, Confirm, Submit</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="secondary" aria-label="Add" />} title="Secondary">
        Supporting actions that extend or complement a primary.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — reinforces the primary without competing with it</li>
          <li><strong>Constraints</strong> — best paired alongside a primary action</li>
          <li><strong>Examples</strong> — Edit, Duplicate, Share</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="tertiary" aria-label="Add" />} title="Tertiary">
        Neutral, independent utility actions.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — low-stakes or supplementary actions</li>
          <li><strong>Constraints</strong> — can appear alone or alongside a primary</li>
          <li><strong>Examples</strong> — Filter, Search, Download</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="naked" aria-label="Add" />} title="Naked">
        Invisible until hovered — minimal footprint in dense UIs.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — de-emphasised actions that shouldn't draw attention at rest</li>
          <li><strong>Constraints</strong> — use in toolbars, table rows, or card actions</li>
          <li><strong>Examples</strong> — More options, Inline edit, Row actions</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="critical" aria-label="Add" />} title="Critical">
        Irreversible, high-stakes actions. Signals danger.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — communicates that the action cannot be undone</li>
          <li><strong>Constraints</strong> — follow the two-step confirmation pattern</li>
          <li><strong>Examples</strong> — Delete, Remove, Discard</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="critical-secondary" aria-label="Add" />} title="Critical Secondary">
        A softer entry point to a destructive flow.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — signals a destructive action without the full urgency of critical</li>
          <li><strong>Constraints</strong> — typically the trigger before a critical confirmation</li>
          <li><strong>Examples</strong> — Delete vendor (before modal confirmation)</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="primary-inverse" aria-label="Add" />} title="Primary Inverse" dark>
        Primary action on a dark or brand-coloured background.
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="secondary-inverse" aria-label="Add" />} title="Secondary Inverse" dark>
        Supporting action on a dark or brand-coloured background.
      </VariantCard>

      <VariantCard preview={<IconButton icon="add" variant="naked-inverse" aria-label="Add" />} title="Naked Inverse" dark>
        Minimal-footprint action on a dark or brand-coloured background.
      </VariantCard>
    </VariantCards>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', padding: '24px' }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <IconButton icon="add" variant="primary" size={size} aria-label={`${size} icon button`} />
          <span style={{ fontSize: '11px', color: '#6B7280' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const IconButtonStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <StatesGrid>
      <StatesGridRow label="Primary">
        <StatesGridCell><IconButton icon="add" variant="primary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="hover"><IconButton icon="add" variant="primary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="active"><IconButton icon="add" variant="primary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="primary" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="primary" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Secondary">
        <StatesGridCell><IconButton icon="add" variant="secondary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="hover"><IconButton icon="add" variant="secondary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="active"><IconButton icon="add" variant="secondary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="secondary" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="secondary" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Tertiary">
        <StatesGridCell><IconButton icon="add" variant="tertiary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="hover"><IconButton icon="add" variant="tertiary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="active"><IconButton icon="add" variant="tertiary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="tertiary" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="tertiary" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Naked">
        <StatesGridCell><IconButton icon="add" variant="naked" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="hover"><IconButton icon="add" variant="naked" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="active"><IconButton icon="add" variant="naked" aria-label="Add" /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="naked" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="naked" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Critical">
        <StatesGridCell><IconButton icon="add" variant="critical" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="hover"><IconButton icon="add" variant="critical" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="active"><IconButton icon="add" variant="critical" aria-label="Add" /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="critical" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="critical" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Critical secondary">
        <StatesGridCell><IconButton icon="add" variant="critical-secondary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="hover"><IconButton icon="add" variant="critical-secondary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell forceState="active"><IconButton icon="add" variant="critical-secondary" aria-label="Add" /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="critical-secondary" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell><IconButton icon="add" variant="critical-secondary" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Primary inverse">
        <StatesGridCell dark><IconButton icon="add" variant="primary-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark forceState="hover"><IconButton icon="add" variant="primary-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark forceState="active"><IconButton icon="add" variant="primary-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark><IconButton icon="add" variant="primary-inverse" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell dark><IconButton icon="add" variant="primary-inverse" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Secondary inverse">
        <StatesGridCell dark><IconButton icon="add" variant="secondary-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark forceState="hover"><IconButton icon="add" variant="secondary-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark forceState="active"><IconButton icon="add" variant="secondary-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark><IconButton icon="add" variant="secondary-inverse" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell dark><IconButton icon="add" variant="secondary-inverse" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
      <StatesGridRow label="Naked inverse">
        <StatesGridCell dark><IconButton icon="add" variant="naked-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark forceState="hover"><IconButton icon="add" variant="naked-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark forceState="active"><IconButton icon="add" variant="naked-inverse" aria-label="Add" /></StatesGridCell>
        <StatesGridCell dark><IconButton icon="add" variant="naked-inverse" aria-label="Add" isLoading /></StatesGridCell>
        <StatesGridCell dark><IconButton icon="add" variant="naked-inverse" aria-label="Add" isDisabled /></StatesGridCell>
      </StatesGridRow>
    </StatesGrid>
  ),
};

export const WithTooltipDemo: Story = {
  name: 'With tooltip',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <IconButton icon="info" variant="naked" aria-label="More information" />
        <span style={{ fontSize: '11px', color: '#6B7280' }}>enabled</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <IconButton icon="info" variant="naked" aria-label="More information" isDisabled />
        <span style={{ fontSize: '11px', color: '#6B7280' }}>disabled</span>
      </div>
    </div>
  ),
};

export const IconButtonAsLink: Story = {
  name: 'Icon button as link',
  args: {
    link: { href: 'https://www.google.com', target: '_blank' },
    icon: 'chevron-right',
    variant: 'tertiary',
    'aria-label': 'Open link',
  },
  parameters: {
    docs: { canvas: { sourceState: 'none' } },
  },
};
