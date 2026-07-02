import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { useState } from 'react';

import { Button } from '@/components/action/Button';
import { buttonVariants } from '@/components/action/Button/Button.types';
import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Menu, MenuItem } from '@/components/containers/menus';
import { Icon } from '@/components/foundations/Icon';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Action/Button Group',
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants as readonly string[],
      description: 'The variant applied to every button in the group.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: (buttonVariants as readonly string[]).join(' | ') },
        category: 'props',
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size applied to every button in the group.',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large'" },
        category: 'props',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether all the buttons in the group are loading.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether all the buttons in the group are disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'button-group' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    isLoading: false,
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const INVERSE_VARIANTS = new Set(['primary-inverse', 'secondary-inverse']);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['variant', 'size', 'isLoading', 'isDisabled'],
    },
  },
  render: (args) => {
    const isInverse = INVERSE_VARIANTS.has(args.variant as string);
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '30px 24px',
        background: isInverse ? '#0F0728' : 'transparent',
        transition: 'background 0.2s ease',
      }}>
        <ButtonGroup {...args}>
          <Button label="Copy" />
          <Button label="Paste" />
          <Button label="Delete" />
        </ButtonGroup>
      </div>
    );
  },
};

// ─── Variants ───────────────────────────────────────────────────────────────

const GroupPreview = ({ variant }: { variant: 'primary' | 'secondary' | 'tertiary' | 'critical' }) => (
  <div style={{ display: 'inline-flex' }}>
    <ButtonGroup variant={variant}>
      <Button label="Copy" />
      <Button label="Paste" />
      <Button label="Delete" />
    </ButtonGroup>
  </div>
);

/**
 * The `variant` prop is applied uniformly to every button in the group.
 * Constrain group usage to the regular, positive variants — `primary` and `tertiary`.
 */
export const Variants: Story = {
  render: () => (
    <VariantCards>
      <VariantCard preview={<GroupPreview variant="primary" />} title="Primary — recommended">
        The default for a group that drives the page's main action.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — highest-emphasis grouping</li>
          <li><strong>Use for</strong> — Split Buttons anchoring a core flow (e.g. <em>Save</em>)</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<GroupPreview variant="tertiary" />} title="Tertiary — recommended">
        Neutral, low-emphasis groupings that shouldn't pull focus from a primary CTA.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — utility actions with related options</li>
          <li><strong>Use for</strong> — Export, Download, Share</li>
        </ul>
      </VariantCard>

      <VariantCard preview={<GroupPreview variant="secondary" />} title="Secondary — use with care">
        Available, but reserve for groups that genuinely support a nearby primary action.
      </VariantCard>

      <VariantCard preview={<GroupPreview variant="critical" />} title="Critical — you better have a good reason">
        Possible, but hiding destructive actions in a group makes them easy to trigger by accident.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

/**
 * Three sizes are available — `medium` is the default. The `size` prop sizes
 * every button in the group together.
 */
export const Sizes: Story = {
  render: () => (
    <Group variant="vertical" spacing="m" alignItems="flex-start">
      <ButtonGroup size="small">
        <Button label="Copy" />
        <Button label="Paste" />
        <Button label="Delete" />
      </ButtonGroup>
      <ButtonGroup size="medium">
        <Button label="Copy" />
        <Button label="Paste" />
        <Button label="Delete" />
      </ButtonGroup>
      <ButtonGroup size="large">
        <Button label="Copy" />
        <Button label="Paste" />
        <Button label="Delete" />
      </ButtonGroup>
    </Group>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Icon buttons ──────────────────────────────────────────────────────────────

/**
 * A group can hold `IconButton`s instead of text buttons — the seams between
 * cells are merged exactly the same way.
 */
export const IconButtons: Story = {
  render: () => (
    <ButtonGroup variant="tertiary">
      <IconButton aria-label="Edit" icon="edit" />
      <IconButton aria-label="Filter" icon="filter" />
      <IconButton aria-label="Delete" icon="delete" />
    </ButtonGroup>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Shared / loading / disabled state ──────────────────────────────────────────

/**
 * `isLoading` and `isDisabled` are applied to the whole group at once — every
 * button inherits the state from the container.
 */
export const SharedState: Story = {
  render: () => (
    <Group variant="vertical" spacing="m" alignItems="flex-start">
      <ButtonGroup variant="primary" isDisabled>
        <Button label="Copy" />
        <Button label="Paste" />
        <Button label="Delete" />
      </ButtonGroup>
      <ButtonGroup variant="primary" isLoading>
        <Button label="Copy" />
        <Button label="Paste" />
        <Button label="Delete" />
      </ButtonGroup>
    </Group>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── As a split button ───────────────────────────────────────────────────────

type SplitOption = { key: string; label: string; icon: 'edit' | 'checked' | 'add' };

const SAVE_OPTIONS: SplitOption[] = [
  { key: 'save-draft', label: 'Save draft', icon: 'edit' },
  { key: 'save-and-publish', label: 'Save and publish', icon: 'checked' },
  { key: 'save-as-template', label: 'Save as template', icon: 'add' },
];

const CREATE_OPTIONS: SplitOption[] = [
  { key: 'import-spreadsheet', label: 'Import from spreadsheet', icon: 'add' },
  { key: 'add-from-gmail', label: 'Add from Gmail', icon: 'edit' },
];

function SplitButton({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: SplitOption[];
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonGroup variant="primary">
      <Button label={label} onClick={() => onSelect(label)} />
      <Menu
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={<IconButton aria-label="More actions" icon="caret-down" />}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.key}
            label={opt.label}
            aria-label={opt.label}
            leftElement={<Icon type={opt.icon} size="small" aria-hidden />}
            onClick={() => {
              onSelect(opt.label);
              setIsOpen(false);
            }}
          />
        ))}
      </Menu>
    </ButtonGroup>
  );
}

/**
 * Create a split button by combining a `Button` (the default action) with a
 * `Menu` of secondary, related actions — both under one `ButtonGroup`. The
 * `Menu`'s `trigger` is an `IconButton`, so it merges into the group seam.
 * Open either menu to see the related options.
 */
export const AsSplitButton: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div style={{ fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <SplitButton label="Save" options={SAVE_OPTIONS} onSelect={setSelected} />
        <SplitButton label="Create bill" options={CREATE_OPTIONS} onSelect={setSelected} />

        {selected && (
          <span style={{ fontSize: '13px', color: '#6B7280' }}>
            Triggered: <strong style={{ color: '#18191b' }}>{selected}</strong>
          </span>
        )}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Variant hierarchy (split button) ───────────────────────────────────────────

export const SplitButtonGuide: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={
          <div style={{ display: 'inline-flex' }}>
            <ButtonGroup variant="primary">
              <Button label="Save" />
              <IconButton aria-label="More actions" icon="caret-down" />
            </ButtonGroup>
          </div>
        }
        title="Primary — recommended"
      >
        Use for the page's main action when a closely-related option exists.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Default action</strong> — predictable and self-explanatory (e.g. <em>Save</em>)</li>
          <li><strong>Menu</strong> — holds the related variants (e.g. <em>Save as template</em>)</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={
          <div style={{ display: 'inline-flex' }}>
            <ButtonGroup variant="tertiary">
              <Button label="Export" />
              <IconButton aria-label="More actions" icon="caret-down" />
            </ButtonGroup>
          </div>
        }
        title="Tertiary — recommended"
      >
        Use for neutral, utility split actions that shouldn't pull focus from the primary CTA.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — a low-emphasis action with related options</li>
          <li><strong>Examples</strong> — Export, Download, Share</li>
        </ul>
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Related components ──────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Button"
        url="/?path=/docs/components-action-button--docs"
        preview={<Button label="Label" variant="primary" />}
      />
      <RelatedComponent
        name="Icon Button"
        url="/?path=/docs/components-action-icon-button--docs"
        preview={<IconButton icon="edit" variant="primary" aria-label="Edit" />}
      />
    </RelatedComponents>
  ),
};
