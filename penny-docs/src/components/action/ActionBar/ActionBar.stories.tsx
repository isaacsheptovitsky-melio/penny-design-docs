import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { ButtonGroup } from '@/components/action/ButtonGroup';

import { Button } from '@/components/action/Button';
import { NakedButton } from '@/components/action/NakedButton';

import { ActionBar } from './ActionBar';

const maxWidthOptions = ['full', '1600px', '1200px', '800px', '600px', '480px'];

const summaryItemsType = `{
  label: string;
  value: string;
  testId?: string;
}[]`;

const actionsType = `{
  component: typeof Button | typeof IconButton | typeof NakedButton;
  props: ButtonProps | IconButtonProps | NakedButtonProps;
  testId?: string;
}[]`;

/**
 * The ActionBar renders inside a `position: relative` container and anchors to its bottom
 * (per the component's own contract). This wrapper provides that positioning context so the
 * bar has somewhere to sit — it is not part of the component.
 */
// The ActionBar's Panel is positioned absolutely at the bottom of its container, so the wrapper
// must be `position: relative` with an explicit height for the bar to anchor to (an absolute
// element adds no height to its parent). The CSS centers the bar (in-app a centered Layout column
// does this) and pins it to the bottom; `paddingBottom` gives it a little breathing room so the
// height tracks the bar instead of leaving a tall empty canvas.
const STAGE_HEIGHT = 96;
const Stage = ({ children }: { children: React.ReactNode }) => (
  <div
    className="ab-stage"
    style={{ position: 'relative', height: `${STAGE_HEIGHT}px`, borderRadius: '8px' }}
  >
    <style>{`.ab-stage [data-component="ActionBar"] { left: 0; right: 0; margin-inline: auto; }`}</style>
    {children}
  </div>
);

const summaryItems = [
  { label: 'Selected bills', value: '3' },
  { label: 'Total amount', value: '$2,200.00' },
];

const meta: Meta<typeof ActionBar> = {
  title: 'Components/Action/ActionBar',
  component: ActionBar,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        'Whether the action bar is visible. Driven externally by selection state — show when ≥ 1 item is selected, hide when all are deselected.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Shows the Loader and `loadingText` in place of summary items and actions — use while waiting for an async response after the user submits a bulk action.',
      table: { category: 'props', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loadingText: {
      control: 'text',
      description: 'The text shown beside the Loader when `isLoading` is true.',
      table: { category: 'props', type: { summary: 'string' } },
    },
    maxWidth: {
      control: 'select',
      options: maxWidthOptions,
      description: "The action bar's max width — should be aligned with the Layout.",
      table: {
        category: 'props',
        type: { summary: `${maxWidthOptions.map((o) => `'${o}'`).join(' | ')} | number` },
        defaultValue: { summary: '1600px' },
      },
    },
    backgroundColor: {
      control: false,
      description:
        'The background color of the sticky panel. Any Penny color token. Defaults to `semantic.surface.inverse`.',
      table: { category: 'props', type: { summary: 'ThemeColorKey' }, defaultValue: { summary: 'semantic.surface.inverse' } },
    },
    summaryItems: {
      control: false,
      description: 'Items placed on the left side of the component — typically a selection count and running total.',
      table: { category: 'props', type: { summary: 'SummaryItem[]', detail: summaryItemsType } },
    },
    actions: {
      control: false,
      description: 'Actions placed on the right side of the component. Accepts Button, IconButton, and NakedButton.',
      table: { category: 'props', type: { summary: 'Action[]', detail: actionsType } },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ActionBar>;

export const Playground: Story = {
  name: 'Playground',
  args: {
    isOpen: true,
    isLoading: false,
    loadingText: 'Scheduling payments...',
    maxWidth: '1200px',
    summaryItems,
    actions: [
      { component: NakedButton, props: { variant: 'invert', label: 'Cancel' } },
      { component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } },
    ],
  },
  parameters: {
    controls: { include: ['isOpen', 'isLoading', 'loadingText', 'maxWidth'] },
  },
  render: (args) => (
    <Stage>
      <ActionBar {...args} />
    </Stage>
  ),
};

export const LoadingState: Story = {
  name: 'Loading state',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <Stage>
      <ActionBar
        isOpen
        isLoading
        loadingText="Loading..."
        maxWidth="1200px"
        summaryItems={summaryItems}
        actions={[
          { component: NakedButton, props: { variant: 'invert', label: 'Cancel' } },
          { component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } },
        ]}
      />
    </Stage>
  ),
};

export const BackgroundColor: Story = {
  name: 'Background color',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#8B95A9',
            marginBottom: '8px',
          }}
        >
          Default — semantic.surface.inverse
        </div>
        <Stage>
          <ActionBar
            isOpen
            maxWidth="1200px"
            summaryItems={summaryItems}
            actions={[
              { component: NakedButton, props: { variant: 'invert', label: 'Cancel' } },
              { component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } },
            ]}
          />
        </Stage>
      </div>
      <div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#8B95A9',
            marginBottom: '8px',
          }}
        >
          Brand — global.brand.700
        </div>
        <Stage>
          <ActionBar
            isOpen
            backgroundColor="global.brand.700"
            maxWidth="1200px"
            summaryItems={summaryItems}
            actions={[
              { component: NakedButton, props: { variant: 'invert', label: 'Cancel' } },
              { component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } },
            ]}
          />
        </Stage>
      </div>
    </div>
  ),
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: '#8B95A9',
      marginBottom: '8px',
    }}
  >
    {children}
  </div>
);

export const MaxWidth: Story = {
  name: 'Max width',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <SectionLabel>maxWidth="480px"</SectionLabel>
        <Stage>
          <ActionBar
            isOpen
            maxWidth="480px"
            summaryItems={summaryItems}
            actions={[{ component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } }]}
          />
        </Stage>
      </div>
      <div>
        <SectionLabel>maxWidth="800px"</SectionLabel>
        <Stage>
          <ActionBar
            isOpen
            maxWidth="800px"
            summaryItems={summaryItems}
            actions={[
              { component: NakedButton, props: { variant: 'invert', label: 'Cancel' } },
              { component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } },
            ]}
          />
        </Stage>
      </div>
      <div>
        <SectionLabel>maxWidth="full"</SectionLabel>
        <Stage>
          <ActionBar
            isOpen
            maxWidth="full"
            summaryItems={summaryItems}
            actions={[
              { component: NakedButton, props: { variant: 'invert', label: 'Cancel' } },
              { component: Button, props: { variant: 'primary-inverse', label: 'Review & Pay' } },
            ]}
          />
        </Stage>
      </div>
    </div>
  ),
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
        name="Button Group"
        url="/?path=/docs/components-action-button-group--docs"
        preview={<ButtonGroup><Button label="Copy" /><Button label="Paste" /></ButtonGroup>}
      />
    </RelatedComponents>
  ),
};
