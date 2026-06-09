import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import { Button } from '@/components/action/Button';
import React from 'react';
import {
  SectionBannerRoot,
  SectionBannerIcon,
  SectionBannerContent,
  SectionBannerTitle,
  SectionBannerDescription,
  SectionBannerCloseButton,
} from '@/components/dataDisplay/SectionBanner';
import flowImg from '@/assets/feedback-feedback-flow.png';
import validationImg from '@/assets/feedback-validation-example.png';
import validationExample1Img from '@/assets/feedback-validation-example-1.png';

const meta: Meta = {
  title: 'UX Patterns/Feedback',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// ── Shared styles ─────────────────────────────────────────────────────────────

const SECTION_LABEL: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  color: '#8B95A9',
  alignSelf: 'flex-start',
};

const IMG_CONTAINER: React.CSSProperties = {
  width: '100%',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  overflow: 'hidden',
  display: 'block',
};

const IMG: React.CSSProperties = {
  width: '100%',
  display: 'block',
};

const CAPTION: React.CSSProperties = {
  fontSize: '12px',
  color: '#8B95A9',
  textAlign: 'center',
  marginTop: '8px',
  fontStyle: 'italic',
};

// ── Mock-page primitives (plain HTML scaffolding around the real banner) ───────

const PAGE: React.CSSProperties = {
  width: '100%',
  maxWidth: '720px',
  background: '#fff',
  border: '1px solid #E2E8F0',
  borderRadius: '12px',
  overflow: 'hidden',
  fontFamily: 'Poppins, sans-serif',
};

const TOPBAR: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '12px 16px',
  background: '#F8FAFC',
  borderBottom: '1px solid #E2E8F0',
};

const Dot: React.FC<{ c: string }> = ({ c }) => (
  <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, display: 'inline-block' }} />
);

const SkeletonLine: React.FC<{ w: string }> = ({ w }) => (
  <div style={{ height: '10px', width: w, borderRadius: '4px', background: '#EDF0F4' }} />
);

const PageHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#18191b', letterSpacing: '-0.01em' }}>{children}</p>
);

// ── Stories ───────────────────────────────────────────────────────────────────

export const FeedbackOverview: Story = {
  name: 'Overview',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Feedback flow — overview</div>
      <div style={IMG_CONTAINER}>
        <img src={flowImg} alt="Feedback flow overview diagram" style={IMG} />
      </div>
    </div>
  ),
};

export const SectionBannerCompact: Story = {
  name: 'Section Banner Compact',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Section Banner — Compact variant</div>
      <div style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SectionBannerRoot variant="critical" isCompact>
          <SectionBannerIcon />
          <SectionBannerContent>
            <SectionBannerDescription>Something went wrong, please try again.</SectionBannerDescription>
          </SectionBannerContent>
        </SectionBannerRoot>

        <SectionBannerRoot variant="success" isCompact>
          <SectionBannerIcon />
          <SectionBannerContent>
            <SectionBannerDescription>
              <strong>Jean Luc Picard&rsquo;s</strong> details were updated
            </SectionBannerDescription>
          </SectionBannerContent>
          <SectionBannerCloseButton onClick={() => {}} />
        </SectionBannerRoot>
      </div>
      <p style={CAPTION}>Use Section Banner&rsquo;s Compact variant to surface errors and validation summaries.</p>
    </div>
  ),
};

export const GlobalFeedbackPlacement: Story = {
  name: 'Global feedback placement',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Global placement — banner at the top of the screen</div>
      <div style={PAGE}>
        <div style={TOPBAR}>
          <Dot c="#F87171" /><Dot c="#FBBF24" /><Dot c="#34D399" />
          <span style={{ marginLeft: '8px', fontSize: '12px', color: '#8B95A9' }}>Vendors · Import</span>
        </div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Global banner pinned at the top of the page content */}
          <SectionBannerRoot variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>1 of 15 vendors couldn&rsquo;t be imported</SectionBannerTitle>
              <SectionBannerDescription>Resolve the indicated issues, then import the file again.</SectionBannerDescription>
            </SectionBannerContent>
          </SectionBannerRoot>

          <PageHeading>Import vendors</PageHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SkeletonLine w="70%" />
            <SkeletonLine w="90%" />
            <SkeletonLine w="55%" />
            <SkeletonLine w="80%" />
          </div>
        </div>
      </div>
      <p style={CAPTION}>For issues affecting the whole screen, place the Section Banner at the very top, above all content.</p>
    </div>
  ),
};

export const LocalFeedbackPlacement: Story = {
  name: 'Local feedback placement',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Local placement — banner above the affected section</div>
      <div style={PAGE}>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <PageHeading>Payment details</PageHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SkeletonLine w="40%" />
            <SkeletonLine w="85%" />
          </div>

          {/* Section divider with a label, then the localized banner above its section */}
          <div style={{ height: '1px', background: '#EDF0F4' }} />
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#475467' }}>Bank account</p>
          <SectionBannerRoot variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>This account could not be verified</SectionBannerTitle>
              <SectionBannerDescription>Re-enter the routing and account numbers for this section.</SectionBannerDescription>
            </SectionBannerContent>
          </SectionBannerRoot>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <SkeletonLine w="60%" />
            <SkeletonLine w="75%" />
          </div>
        </div>
      </div>
      <p style={CAPTION}>When an issue is isolated to one section, place the banner directly above that section.</p>
    </div>
  ),
};

export const FormValidationOverview: Story = {
  name: 'Form validation overview',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Validation flow — client-side then server-side</div>
      <div style={IMG_CONTAINER}>
        <img src={validationImg} alt="Form validation flow showing client-side then server-side validation steps" style={IMG} />
      </div>
      <p style={CAPTION}>Once submitted, forms are validated first on input format (client-side), then on data quality (server-side).</p>
    </div>
  ),
};

export const ClientSideValidation: Story = {
  name: 'Client-side validation',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Client-side — critical state on Form Field</div>
      <div style={IMG_CONTAINER}>
        <img src={validationExample1Img} alt="Client-side validation showing critical state on form fields with empty required fields flagged" style={IMG} />
      </div>
      <p style={CAPTION}>Required but empty fields are flagged using the Form Field&rsquo;s critical state immediately on submission.</p>
    </div>
  ),
};

export const ServerSideValidation: Story = {
  name: 'Server-side validation',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div style={SECTION_LABEL}>Server-side — Section Banner above the form heading</div>
      <div style={PAGE}>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Consolidated server-side errors, summarized in one banner above the form heading */}
          <SectionBannerRoot variant="critical">
            <SectionBannerIcon />
            <SectionBannerContent>
              <SectionBannerTitle>We couldn&rsquo;t schedule this payment</SectionBannerTitle>
              <SectionBannerDescription>
                This vendor already exists, and the amount exceeds your daily limit. Fix both and resubmit.
              </SectionBannerDescription>
            </SectionBannerContent>
          </SectionBannerRoot>

          <PageHeading>Schedule payment</PageHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SkeletonLine w="50%" />
            <SkeletonLine w="85%" />
            <SkeletonLine w="70%" />
          </div>
        </div>
      </div>
      <p style={CAPTION}>Consolidate multiple server-side issues into a single Section Banner above the form heading.</p>
    </div>
  ),
};

// ─── Related patterns ───────────────────────────────────────

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related patterns',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Delete"
        url="/?path=/docs/ux-patterns-delete--docs"
        preview={<Button label="Delete vendor" variant="critical" />}
      />
      <RelatedComponent
        name="Buttons vs. Links"
        url="/?path=/docs/ux-patterns-buttons-vs-links--docs"
        preview={<Button label="Confirm payment" variant="primary" />}
      />
    </RelatedComponents>
  ),
};
