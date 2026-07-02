import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { Button } from '@/components/action/Button';
import { Counter } from '@/components/dataDisplay/Counter';
import { Pill } from '@/components/dataDisplay/Pill';
import { Group } from '@/components/containers/Group';
import { Illustration } from '@/components/foundations/Illustration';
import { Link } from '@/components/navigation/Link';
import { DoDont } from '@/storybook-utils/DoDont';
import sectionBannerDoImg from '@/assets/section-banner-do-01.png';
import sectionBannerDontImg from '@/assets/section-banner-dont-01.png';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { VariantCard, VariantCards } from '@/storybook-utils/VariantCard';

import {
  SectionBannerCloseButton,
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerIcon,
  SectionBannerRoot,
  type SectionBannerRootProps,
  SectionBannerTitle,
} from './index';
import type { SectionBannerVariant } from './SectionBanner.types';

const variants: readonly SectionBannerVariant[] = [
  'secondary',
  'neutral',
  'informative',
  'warning',
  'critical',
  'success',
  'brand',
];

/**
 * Section banners are fill-container by default (476px). Every story renders inside a
 * fixed-width stage so the banner reads at a realistic width — the stage is not part of
 * the component.
 */
const Stage = ({ children, width = 520 }: { children: React.ReactNode; width?: number }) => (
  <div style={{ width: `${width}px`, maxWidth: '100%', fontFamily: 'Poppins, sans-serif' }}>{children}</div>
);

type PlaygroundArgs = Pick<SectionBannerRootProps, 'variant' | 'isCompact'> & {
  title: string;
  description: string;
  showIcon: boolean;
  showAction: boolean;
  showClose: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Data Display/Section Banner',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description:
        'Sets the background color, border, and default icon. Choose by intent: `secondary` (outline), `neutral`, `informative`, `warning`, `critical`, `success`, `brand`.',
      table: {
        defaultValue: { summary: 'informative' },
        type: { summary: variants.join(' | ') },
        category: 'props',
      },
    },
    isCompact: {
      control: 'boolean',
      description: 'Reduces spacing and padding for a more compact banner — use for brief, non-intrusive notifications.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    title: {
      control: 'text',
      description: 'Demo only — text rendered inside `SectionBannerTitle`.',
      table: { category: 'content', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: 'Demo only — text rendered inside `SectionBannerDescription`.',
      table: { category: 'content', type: { summary: 'string' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Demo only — renders the variant’s `SectionBannerIcon`.',
      table: { category: 'content', type: { summary: 'boolean' } },
    },
    showAction: {
      control: 'boolean',
      description: 'Demo only — renders a tertiary action button below the description.',
      table: { category: 'content', type: { summary: 'boolean' } },
    },
    showClose: {
      control: 'boolean',
      description: 'Demo only — renders the `SectionBannerCloseButton` (dismiss affordance).',
      table: { category: 'content', type: { summary: 'boolean' } },
    },
  },
  args: {
    variant: 'informative',
    isCompact: false,
    title: 'Your payment is being processed',
    description: 'This usually takes a few minutes. We’ll let you know as soon as it’s complete.',
    showIcon: true,
    showAction: false,
    showClose: false,
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

// ─── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    controls: {
      include: ['variant', 'isCompact', 'title', 'description', 'showIcon', 'showAction', 'showClose'],
    },
  },
  render: ({ variant, isCompact, title, description, showIcon, showAction, showClose }) => (
    <Stage>
      <SectionBannerRoot variant={variant} isCompact={isCompact}>
        {showIcon ? <SectionBannerIcon /> : null}
        <SectionBannerContent>
          <SectionBannerTitle>{title}</SectionBannerTitle>
          {description ? <SectionBannerDescription>{description}</SectionBannerDescription> : null}
          {showAction ? (
            <div style={{ paddingTop: '4px' }}>
              <Button label="Take action" variant="tertiary" size="small" />
            </div>
          ) : null}
        </SectionBannerContent>
        {showClose ? <SectionBannerCloseButton /> : null}
      </SectionBannerRoot>
    </Stage>
  ),
};

// ─── Variants ────────────────────────────────────────────────────────────────

const VARIANT_COPY: Record<SectionBannerVariant, { title: string; body: string; role: string }> = {
  secondary: {
    title: 'Outline',
    body: 'This section is set apart with a subtle outline, so it stands out without pulling attention away from the surrounding content.',
    role: 'For subtle visual separation or emphasis without a strong color association.',
  },
  neutral: {
    title: 'Neutral',
    body: 'Here’s some extra context for this section. It’s helpful to know, but nothing here needs your immediate attention.',
    role: 'For standard, contextual information. Its subtle design informs the user without demanding immediate focus.',
  },
  informative: {
    title: 'Informative',
    body: 'Your next payment is scheduled for May 2. Review the details to make sure everything looks right before it sends.',
    role: 'For highlighting key information. Its prominent design actively draws the user’s attention to important details.',
  },
  warning: {
    title: 'Warning',
    body: 'Some vendor details are still missing. Add them before you continue so this payment isn’t delayed.',
    role: 'Alerts users to potential issues or cautionary information requiring attention.',
  },
  critical: {
    title: 'Critical',
    body: 'We couldn’t process your payment. Update your payment method and try again to keep it on schedule.',
    role: 'Indicates severe problems or errors that demand immediate user action.',
  },
  success: {
    title: 'Success',
    body: 'Your payment was scheduled successfully. We’ll let you know as soon as it’s on its way.',
    role: 'Confirms successful completion of actions or positive outcomes.',
  },
  brand: {
    title: 'Brand',
    body: 'You’re invited to try the new Melio rewards program and earn cashback on every eligible payment.',
    role: 'Uses brand colors to give a branded feel to general information, or promotions.',
  },
};

/**
 * Seven variants map background, border, and the default Status Icon to a semantic intent.
 * Each row shows the full banner — with its `SectionBannerIcon` (a `StatusIconSolid`) — in a
 * neutral stage on the left, paired with guidance on when to reach for it. Pick based on the
 * meaning of the message, not the color.
 */
export const Variants: Story = {
  render: () => (
    <VariantCards>
      {variants.map((variant) => (
        <VariantCard
          key={variant}
          title={VARIANT_COPY[variant].title}
          whitePreview
          previewMinWidth={400}
          preview={
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <SectionBannerRoot variant={variant}>
                <SectionBannerIcon />
                <SectionBannerContent>
                  <SectionBannerTitle>{VARIANT_COPY[variant].title}</SectionBannerTitle>
                  <SectionBannerDescription>{VARIANT_COPY[variant].body}</SectionBannerDescription>
                </SectionBannerContent>
              </SectionBannerRoot>
            </div>
          }
        >
          {VARIANT_COPY[variant].role}
        </VariantCard>
      ))}
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

/**
 * Two sizes: Large (default) for detailed instructions, warnings, and urgent updates;
 * Compact for brief feedback, minor updates, and toast-style confirmations.
 */
export const Sizes: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        title="Large (default)"
        whitePreview
        previewMinWidth={400}
        preview={
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <SectionBannerRoot variant="success">
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerTitle>Payment scheduled</SectionBannerTitle>
                <SectionBannerDescription>
                  Your payment to Acme Corp is scheduled for May 2. We’ll let you know once it’s sent.
                </SectionBannerDescription>
              </SectionBannerContent>
            </SectionBannerRoot>
          </div>
        }
      >
        For critical information, detailed instructions, warnings, and urgent updates.
      </VariantCard>

      <VariantCard
        title="Compact"
        whitePreview
        previewMinWidth={400}
        preview={
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <SectionBannerRoot variant="success" isCompact>
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerTitle>Payment scheduled for May 2</SectionBannerTitle>
              </SectionBannerContent>
            </SectionBannerRoot>
          </div>
        }
      >
        For brief feedback, minor updates, and toast-style confirmations.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Banner asset ────────────────────────────────────────────────────────────────

/** ~32px envelope illustration stand-in for the Banner illustration asset. */
const BrandSymbol = () => (
  <span style={{ display: 'inline-flex', flexShrink: 0, lineHeight: 0 }}>
    <img
      src="https://www.google.com/s2/favicons?domain=google.com&sz=64"
      width={20}
      height={20}
      alt=""
      style={{ display: 'block', borderRadius: '4px' }}
    />
  </span>
);

const FlagSymbol = () => (
  <span aria-hidden style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>
    🇨🇦
  </span>
);

const BANNER_ASSETS: { key: string; label: string; asset: ReactNode; role: string }[] = [
  {
    key: 'icon',
    label: 'Icon asset',
    asset: <SectionBannerIcon />,
    role: 'A status icon from Penny’s icon set, tinted to match the banner’s intent.',
  },
  {
    key: 'brand',
    label: 'Brand symbol asset',
    asset: <BrandSymbol />,
    role: 'A partner or product brand symbol, such as a provider logo.',
  },
  {
    key: 'flag',
    label: 'Flag icon asset',
    asset: <FlagSymbol />,
    role: 'A country flag — useful for region- or currency-specific messages.',
  },
];

/**
 * The leading banner asset can be a Penny status icon, a brand symbol, or a flag icon.
 */
export const BannerAssets: Story = {
  render: () => (
    <VariantCards>
      {BANNER_ASSETS.map((a) => (
        <VariantCard key={a.key} title={a.label} whitePreview previewMinWidth={400} preview={
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <SectionBannerRoot variant="neutral">
              {a.asset}
              <SectionBannerContent>
                <SectionBannerTitle>Heads up</SectionBannerTitle>
                <SectionBannerDescription>
                  A short supporting message that gives the banner some context.
                </SectionBannerDescription>
              </SectionBannerContent>
            </SectionBannerRoot>
          </div>
        }>
          {a.role}
        </VariantCard>
      ))}
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

/**
 * Illustration asset — use it only on the outline (`secondary`) variant, where its colors
 * stand out; never place it on a colored background.
 */
export const IllustrationAsset: Story = {
  render: () => {
    const banner = (variant: SectionBannerVariant) => (
      <div style={{ width: '100%', maxWidth: '340px' }}>
        <SectionBannerRoot variant={variant}>
          <Illustration type="new-email" size="small" />
          <SectionBannerContent>
            <SectionBannerTitle>New message</SectionBannerTitle>
            <SectionBannerDescription>You have a new update waiting in your inbox.</SectionBannerDescription>
          </SectionBannerContent>
        </SectionBannerRoot>
      </div>
    );
    return (
      <DoDont
        previewBg="white"
        items={[
          {
            type: 'do',
            title: 'Outline variant',
            description: 'Use the illustration only on the outline variant, letting its colors stand out.',
            preview: banner('secondary'),
          },
          {
            type: 'dont',
            title: 'Colored background',
            description: 'Don’t place the illustration on colored backgrounds — the colors clash.',
            preview: banner('warning'),
          },
        ]}
      />
    );
  },
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

/**
 * When to use an icon — include one when it adds clarity that the surrounding context doesn’t;
 * skip it when the message already reads clearly on its own.
 */
export const IconUsage: Story = {
  render: () => (
    <DoDont
      items={[
        {
          type: 'do',
          title: 'Adds clarity',
          description: 'Use an icon when the section banner icon is not directly tied to the primary purpose of the context.',
          imagePreview: true,
          preview: (
            <img
              src={sectionBannerDoImg}
              alt="A switch-plan modal with a section banner showing a system-failure message, where the icon adds clarity"
              style={{ width: '100%', display: 'block' }}
            />
          ),
        },
        {
          type: 'dont',
          title: 'Redundant icon',
          description: 'Skip the icon when the message is already clear and easy to understand — a redundant icon adds visual noise.',
          imagePreview: true,
          preview: (
            <img
              src={sectionBannerDontImg}
              alt="A confirm-updated-dates modal where the banner icon repeats the modal's intent and is redundant"
              style={{ width: '100%', display: 'block' }}
            />
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

// ─── Action ────────────────────────────────────────────────────────────────────

/**
 * Include an action when the user must resolve an issue or follow a contextual shortcut.
 * Use a tertiary button for visible actions, or a link for low-importance ones.
 */
export const WithAction: Story = {
  render: () => (
    <VariantCards>
      <VariantCard
        title="Tertiary button"
        whitePreview
        previewMinWidth={400}
        preview={
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <SectionBannerRoot variant="warning">
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerTitle>Additional details needed</SectionBannerTitle>
                <SectionBannerDescription>
                  Add the vendor’s tax information before you can schedule this payment.
                </SectionBannerDescription>
                <div style={{ paddingTop: '4px' }}>
                  <Button label="Add details" variant="tertiary" size="small" />
                </div>
              </SectionBannerContent>
            </SectionBannerRoot>
          </div>
        }
      >
        For visible actions that resolve the banner’s issue — more prominent than a link, less than a primary action.
      </VariantCard>

      <VariantCard
        title="Link"
        whitePreview
        previewMinWidth={400}
        preview={
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <SectionBannerRoot variant="informative">
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerTitle>New statement available</SectionBannerTitle>
                <SectionBannerDescription>
                  Your March statement is ready to view. <Link variant="inline" href="#" label="View statement" />
                </SectionBannerDescription>
              </SectionBannerContent>
            </SectionBannerRoot>
          </div>
        }
      >
        For low-importance actions, to minimize visual weight.
      </VariantCard>
    </VariantCards>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Dismiss ─────────────────────────────────────────────────────────────────

/**
 * Allow dismissing when the message is not critical and no action is required.
 */
export const Dismissible: Story = {
  render: () => (
    <Stage width={560}>
      <SectionBannerRoot variant="success">
        <SectionBannerIcon />
        <SectionBannerContent>
          <SectionBannerTitle>Vendor added</SectionBannerTitle>
          <SectionBannerDescription>Acme Corp was added to your vendors.</SectionBannerDescription>
        </SectionBannerContent>
        <SectionBannerCloseButton />
      </SectionBannerRoot>
    </Stage>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Stacking ────────────────────────────────────────────────────────────────

/**
 * When stacking banners, keep a 12px gap and place the newest alert on top.
 */
export const Stacking: Story = {
  render: () => (
    <Stage width={560}>
      <Group variant="vertical" spacing="s" alignItems="stretch">
        <SectionBannerRoot variant="success" isCompact>
          <SectionBannerIcon />
          <SectionBannerContent>
            <SectionBannerTitle>Payment scheduled</SectionBannerTitle>
          </SectionBannerContent>
          <SectionBannerCloseButton />
        </SectionBannerRoot>
        <SectionBannerRoot variant="informative" isCompact>
          <SectionBannerIcon />
          <SectionBannerContent>
            <SectionBannerTitle>Vendor details updated</SectionBannerTitle>
          </SectionBannerContent>
          <SectionBannerCloseButton />
        </SectionBannerRoot>
      </Group>
    </Stage>
  ),
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
};

// ─── Related components ────────────────────────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Pill"
        url="/?path=/docs/components-data-display-pill--docs"
        preview={<Pill status="success" label="Active" />}
      />
      <RelatedComponent
        name="Counter"
        url="/?path=/docs/components-data-display-counter--docs"
        preview={<Counter status="informative" number={3} />}
      />
    </RelatedComponents>
  ),
};
