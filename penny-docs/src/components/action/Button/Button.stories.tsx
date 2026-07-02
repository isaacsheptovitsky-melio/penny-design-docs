import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { IconButton } from '@/components/action/IconButton';
import { NakedButton } from '@/components/action/NakedButton';
import { ButtonGroup } from '@/components/action/ButtonGroup';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { DoDont } from '@/storybook-utils/DoDont';
import { StatesGrid, StatesGridCell, StatesGridRow } from '@/storybook-utils/StatesGrid';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import { Button } from './Button';
import { type ButtonVariants, buttonVariants } from './Button.types';
import { DEFAULT_DATA_TEST_ID } from './button.utils';

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

const meta: Meta<typeof Button> = {
  title: 'Components/Action/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants as readonly ButtonVariants[],
      description: 'Visual style of the button. Use semantic variants — choose based on intent, not appearance.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: (buttonVariants as readonly string[]).join(' | ') },
        category: 'props',
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button.',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large'" },
        category: 'props',
      },
    },
    label: {
      control: 'text',
      description: 'The visible text label of the button.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents user interaction and applies the disabled visual style.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading indicator in place of the label. The button becomes non-interactive.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Stretches the button to fill its container.',
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
    loadingText: {
      control: 'text',
      description: 'Screen-reader-only text read while `isLoading` is true.',
      table: {
        category: 'accessibility',
        defaultValue: { summary: 'Loading...' },
        type: { summary: 'string' },
      },
    },
    hideLoadingText: {
      control: 'boolean',
      description:
        'Hides the visually-hidden loading text. Use only when the parent context already conveys the loading state to assistive technologies.',
      table: { category: 'accessibility', type: { summary: 'boolean' } },
    },
    'aria-label': {
      control: 'text',
      description:
        'Overrides the accessible name. Only set when the visual label alone is insufficient (e.g., icon-only buttons).',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'aria-labelledby': {
      control: 'text',
      description:
        'Space-separated list of element IDs that label this button. Useful for composite descriptions.',
      table: { category: 'accessibility', type: { summary: 'string' } },
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
        defaultValue: { summary: DEFAULT_DATA_TEST_ID },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'medium',
    isDisabled: false,
    isLoading: false,
    isFullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground ───────────────────────────────────────────────────────────────

const INVERSE_VARIANTS = new Set(['primary-inverse', 'secondary-inverse']);

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['label', 'variant', 'size', 'isDisabled', 'isLoading', 'isFullWidth', 'leftElement', 'rightElement', 'link'],
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
        <Button {...args} />
      </div>
    );
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

/**
 * Penny provides eight button variants, each mapped to a semantic intent.
 * Avoid picking a variant based on colour — choose based on what the action means.
 */
export const Variants: Story = {
  render: (args) => (
    <Group variant="vertical" spacing="s" alignItems="flex-start">
      <Button {...args} label="Primary" variant="primary" />
      <Box bg="global.brand.700" borderRadius="md" p={4} display="inline-flex">
        <Button {...args} label="Primary Inverse" variant="primary-inverse" />
      </Box>
      <Button {...args} label="Secondary" variant="secondary" />
      <Box bg="global.brand.700" borderRadius="md" p={4} display="inline-flex">
        <Button {...args} label="Secondary Inverse" variant="secondary-inverse" />
      </Box>
      <Button {...args} label="Tertiary" variant="tertiary" />
      <Button {...args} label="Success" variant="success" />
      <Button {...args} label="Critical" variant="critical" />
      <Button {...args} label="Critical Secondary" variant="critical-secondary" />
    </Group>
  ),
  parameters: { controls: { exclude: ['variant'] } },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

/**
 * Three sizes are available. Use `medium` (default) in most contexts.
 * `small` is for dense UIs; `large` for high-emphasis CTAs.
 */
export const Sizes: Story = {
  render: (args) => (
    <Group alignItems="center" spacing="s">
      <Button {...args} label="Small" size="small" />
      <Button {...args} label="Medium" size="medium" />
      <Button {...args} label="Large" size="large" />
    </Group>
  ),
  parameters: { controls: { exclude: ['size'] } },
};

// ─── Loading state ────────────────────────────────────────────────────────────

/**
 * Set `isLoading` to replace the label with a spinner. The button becomes non-interactive.
 * Always pair with a `loadingText` for screen readers.
 */
export const LoadingState: Story = {
  render: (args) => (
    <Group variant="vertical" spacing="s" alignItems="flex-start">
      <Button {...args} label="Primary" variant="primary" isLoading loadingText="Saving…" />
      <Box bg="global.brand.700" borderRadius="md" p={4} display="inline-flex">
        <Button {...args} label="Primary Inverse" variant="primary-inverse" isLoading loadingText="Saving…" />
      </Box>
      <Button {...args} label="Secondary" variant="secondary" isLoading loadingText="Saving…" />
      <Button {...args} label="Tertiary" variant="tertiary" isLoading loadingText="Saving…" />
      <Button {...args} label="Critical" variant="critical" isLoading loadingText="Deleting…" />
    </Group>
  ),
  parameters: { controls: { exclude: ['isLoading', 'loadingText'] } },
};

// ─── Disabled state ───────────────────────────────────────────────────────────

/**
 * Use `isDisabled` to block interaction while making the unavailability clear.
 * Always explain *why* a button is disabled — either through surrounding context or a tooltip.
 */
export const Disabled: Story = {
  render: (args) => (
    <Group variant="vertical" spacing="s" alignItems="flex-start">
      <Button {...args} label="Primary" variant="primary" isDisabled />
      <Box bg="global.brand.700" borderRadius="md" p={4} display="inline-flex">
        <Button {...args} label="Primary Inverse" variant="primary-inverse" isDisabled />
      </Box>
      <Button {...args} label="Secondary" variant="secondary" isDisabled />
      <Button {...args} label="Tertiary" variant="tertiary" isDisabled />
      <Button {...args} label="Success" variant="success" isDisabled />
      <Button {...args} label="Critical" variant="critical" isDisabled />
      <Button {...args} label="Critical Secondary" variant="critical-secondary" isDisabled />
    </Group>
  ),
  parameters: { controls: { exclude: ['isDisabled'] } },
};

// ─── Full width ───────────────────────────────────────────────────────────────

/**
 * `isFullWidth` stretches the button to fill its container.
 * Typically used for mobile layouts or when the button anchors a card/panel.
 */
export const FullWidth: Story = {
  render: (args) => (
    <Box maxW="400px">
      <Button {...args} label="Full width button" isFullWidth />
    </Box>
  ),
  parameters: { controls: { exclude: ['isFullWidth'] } },
};

// ─── As a link ────────────────────────────────────────────────────────────────

/**
 * Pass a `link` prop to render the button as an `<a>` element.
 * Use this whenever the action navigates the user — even if it looks like a button.
 */
export const ButtonAsLink: Story = {
  render: (args) => (
    <Button
      {...args}
      label="Open Google"
      link={{ href: 'https://www.google.com', target: '_blank' }}
    />
  ),
};

// ─── With icons ───────────────────────────────────────────────────────────────

/**
 * Pass any ReactNode to `leftElement` or `rightElement` to place it beside the label.
 * The most common case is an icon. Keep icons `aria-hidden` — the label is the accessible name.
 */
export const WithElements: Story = {
  render: (args) => (
    <Group spacing="s" alignItems="center">
      <Button
        {...args}
        label="Add item"
        leftElement={
          <Box as="span" aria-hidden style={{ lineHeight: 1 }}>
            +
          </Box>
        }
      />
      <Button
        {...args}
        label="More options"
        rightElement={
          <Box as="span" aria-hidden style={{ lineHeight: 1 }}>
            ▾
          </Box>
        }
      />
    </Group>
  ),
};

// ─── Left / right element guide ──────────────────────────────────────────────

export const ElementsGuide: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={
          <Button
            label="New payment"
            leftElement={<Icon type="add" size="small" color="inherit" aria-hidden />}
          />
        }
        title="Left element"
      >
        Used to visually reinforce the button's meaning — e.g. a <strong>+</strong> before <em>New payment</em>. Also used for brand symbols on auth flows (e.g. "Continue with Google").
      </VariantCard>

      <VariantCard
        preview={
          <Button
            label="New payment"
            variant="tertiary"
            rightElement={<Icon type="caret-down" size="small" color="inherit" aria-hidden />}
          />
        }
        title="Right element"
      >
        Signals what happens after the click — e.g. a chevron for a dropdown, or an external-link icon for off-site navigation.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

export const ElementsBothSlots: Story = {
  render: () => (
    <DoDont
      items={[
        {
          type: 'do',
          title: 'Use sparingly',
          description: 'Both slots work well for a single global action, like a filter button.',
          preview: (
            <Button
              label="Filter"
              variant="tertiary"
              leftElement={<Icon type="filter" size="small" color="inherit" aria-hidden />}
              rightElement={<Icon type="caret-down" size="small" color="inherit" aria-hidden />}
            />
          ),
        },
        {
          type: 'dont',
          title: 'Repeat the same icon',
          description: "Using the same icon across similar actions reduces its differentiating effect and clutters the UI.",
          preview: (
            <Group spacing="s" alignItems="center">
              <Button
                label="Filter type"
                variant="tertiary"
                leftElement={<Icon type="filter" size="small" color="inherit" aria-hidden />}
                rightElement={<Icon type="caret-down" size="small" color="inherit" aria-hidden />}
              />
              <Button
                label="Filter date"
                variant="tertiary"
                leftElement={<Icon type="filter" size="small" color="inherit" aria-hidden />}
                rightElement={<Icon type="caret-down" size="small" color="inherit" aria-hidden />}
              />
            </Group>
          ),
        },
      ]}
    />
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

export const ElementsAdditionalUseCases: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={
          <div style={{ display: 'inline-flex' }}>
            <Button
              label="Connect with Google"
              variant="tertiary"
              leftElement={
                <img
                  src="https://www.google.com/s2/favicons?domain=google.com&sz=32"
                  width={18}
                  height={18}
                  alt=""
                  style={{ display: 'block' }}
                />
              }
            />
          </div>
        }
        title="Custom element"
      >
        Another common use of the left element is to display a brand symbol, such as in "Connect with Google" login buttons.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Variant hierarchy cards ──────────────────────────────────────────────────

export const VariantHierarchy: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={<Button label="Primary" variant="primary" />}
        title="Primary — The Revenue Generator"
      >
        The essential, business-driving action that moves the user forward into a core job.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — the most important action on the screen</li>
          <li><strong>Constraints</strong> — use one per screen; never repeat it</li>
          <li><strong>Examples</strong> — Pay, Create invoice, Approve</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<Button label="Secondary" variant="secondary" />}
        title="Secondary"
      >
        Positive, workflow-extending actions that support a primary CTA.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — complements and reinforces the primary action</li>
          <li><strong>Constraints</strong> — must be paired with a primary; never in isolation; not for Cancel, Delete, or Copy</li>
          <li><strong>Examples</strong> — Save draft alongside Publish</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<Button label="Tertiary" variant="tertiary" />}
        title="Tertiary"
      >
        Independent, neutral, or supplementary actions.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — utility or navigation actions with no high-stakes consequence</li>
          <li><strong>Constraints</strong> — can appear alone or alongside a primary</li>
          <li><strong>Examples</strong> — Cancel, Edit details, Copy link, Learn more</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<Button label="Critical" variant="critical" />}
        title="Critical — The Point of No Return"
      >
        High-stakes, irreversible actions. Signals danger and asks for a deliberate pause.
        <ul style={{ margin: '8px 0 0', paddingLeft: '16px' }}>
          <li><strong>Logic</strong> — communicates that the action cannot be undone</li>
          <li><strong>Constraints</strong> — never used for Cancel or Go Back</li>
          <li><strong>Examples</strong> — Delete bill, Delete account, Remove user</li>
        </ul>
      </VariantCard>

      <VariantCard
        preview={<Button label="Primary Inverse" variant="primary-inverse" />}
        title="Primary Inverse"
        dark
      >
        Use as the primary action on top of dark or brand-colored backgrounds.
      </VariantCard>

      <VariantCard
        preview={<Button label="Secondary Inverse" variant="secondary-inverse" />}
        title="Secondary Inverse"
        dark
      >
        Supporting action on a dark or brand-colored background.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Inverse variants ─────────────────────────────────────────────────────────

export const InverseVariants: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        preview={<Button label="Primary Inverse" variant="primary-inverse" />}
        title="Primary Inverse"
        dark
      >
        Use as the primary action on top of dark or brand-colored backgrounds.
      </VariantCard>

      <VariantCard
        preview={<Button label="Secondary Inverse" variant="secondary-inverse" />}
        title="Secondary Inverse"
        dark
      >
        Supporting action on a dark or brand-colored background.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Button states grid ───────────────────────────────────────────────────────

export const ButtonStates: Story = {
  render: () => (
    <StatesGrid>
      <StatesGridRow label="Primary">
        <StatesGridCell><Button label="Button" variant="primary" /></StatesGridCell>
        <StatesGridCell forceState="hover"><Button label="Button" variant="primary" /></StatesGridCell>
        <StatesGridCell forceState="active"><Button label="Button" variant="primary" /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="primary" isLoading /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="primary" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Secondary">
        <StatesGridCell><Button label="Button" variant="secondary" /></StatesGridCell>
        <StatesGridCell forceState="hover"><Button label="Button" variant="secondary" /></StatesGridCell>
        <StatesGridCell forceState="active"><Button label="Button" variant="secondary" /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="secondary" isLoading /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="secondary" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Tertiary">
        <StatesGridCell><Button label="Button" variant="tertiary" /></StatesGridCell>
        <StatesGridCell forceState="hover"><Button label="Button" variant="tertiary" /></StatesGridCell>
        <StatesGridCell forceState="active"><Button label="Button" variant="tertiary" /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="tertiary" isLoading /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="tertiary" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Critical">
        <StatesGridCell><Button label="Button" variant="critical" /></StatesGridCell>
        <StatesGridCell forceState="hover"><Button label="Button" variant="critical" /></StatesGridCell>
        <StatesGridCell forceState="active"><Button label="Button" variant="critical" /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="critical" isLoading /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="critical" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Critical Secondary">
        <StatesGridCell><Button label="Button" variant="critical-secondary" /></StatesGridCell>
        <StatesGridCell forceState="hover"><Button label="Button" variant="critical-secondary" /></StatesGridCell>
        <StatesGridCell forceState="active"><Button label="Button" variant="critical-secondary" /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="critical-secondary" isLoading /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="critical-secondary" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Success">
        <StatesGridCell><Button label="Button" variant="success" /></StatesGridCell>
        <StatesGridCell forceState="hover"><Button label="Button" variant="success" /></StatesGridCell>
        <StatesGridCell forceState="active"><Button label="Button" variant="success" /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="success" isLoading /></StatesGridCell>
        <StatesGridCell><Button label="Button" variant="success" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Primary Inverse">
        <StatesGridCell dark><Button label="Button" variant="primary-inverse" /></StatesGridCell>
        <StatesGridCell dark forceState="hover"><Button label="Button" variant="primary-inverse" /></StatesGridCell>
        <StatesGridCell dark forceState="active"><Button label="Button" variant="primary-inverse" /></StatesGridCell>
        <StatesGridCell dark><Button label="Button" variant="primary-inverse" isLoading /></StatesGridCell>
        <StatesGridCell dark><Button label="Button" variant="primary-inverse" isDisabled /></StatesGridCell>
      </StatesGridRow>

      <StatesGridRow label="Secondary Inverse">
        <StatesGridCell dark><Button label="Button" variant="secondary-inverse" /></StatesGridCell>
        <StatesGridCell dark forceState="hover"><Button label="Button" variant="secondary-inverse" /></StatesGridCell>
        <StatesGridCell dark forceState="active"><Button label="Button" variant="secondary-inverse" /></StatesGridCell>
        <StatesGridCell dark><Button label="Button" variant="secondary-inverse" isLoading /></StatesGridCell>
        <StatesGridCell dark><Button label="Button" variant="secondary-inverse" isDisabled /></StatesGridCell>
      </StatesGridRow>
    </StatesGrid>
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
        name="Icon Button"
        url="/?path=/docs/components-action-icon-button--docs"
        preview={<IconButton icon="edit" variant="primary" aria-label="Edit" />}
      />
      <RelatedComponent
        name="Naked Button"
        url="/?path=/docs/components-action-naked-button--docs"
        preview={<NakedButton label="Label" variant="primary" />}
      />
      <RelatedComponent
        name="Button Group"
        url="/?path=/docs/components-action-button-group--docs"
        preview={<ButtonGroup><Button label="Copy" /><Button label="Paste" /></ButtonGroup>}
      />
      <RelatedComponent
        name="Buttons vs. Links"
        url="/?path=/docs/ux-patterns-buttons-vs-links--docs"
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <Button label="Pay now" variant="primary" size="small" />
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#7849ff', textDecoration: 'underline', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>View history</a>
          </div>
        }
      />
    </RelatedComponents>
  ),
};
