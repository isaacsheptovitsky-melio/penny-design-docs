import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import flowImg from '@/assets/feedback-feedback-flow.png';
import sectionBannerCompactImg from '@/assets/feedback-feedback-section-banner-compact.png';
import globalPlacementImg from '@/assets/feedback-error-messages-global-placement.png';
import resourceImg from '@/assets/feedback-feedback-resource.png';
import jobImg from '@/assets/feedback-feedback-job.png';
import drawerImg from '@/assets/feedback-feedback-drawer.png';
import localFlowImg from '@/assets/feedback-feedback-local-placement-flow.png';
import localFlow1Img from '@/assets/feedback-feedback-local-placement-flow-1.png';
import validationImg from '@/assets/feedback-validation-example.png';
import validationExample1Img from '@/assets/feedback-validation-example-1.png';
import modalImg from '@/assets/feedback-feedback-modal.png';

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
      <div style={IMG_CONTAINER}>
        <img src={sectionBannerCompactImg} alt="Section Banner compact variant used for feedback" style={IMG} />
      </div>
      <p style={CAPTION}>Use Section Banner's Compact variant to surface errors and validation summaries.</p>
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
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '24px' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={SECTION_LABEL}>Global placement — banner at top of screen</div>
        <div style={IMG_CONTAINER}>
          <img src={globalPlacementImg} alt="Global feedback placement diagram showing banner at the top of the screen" style={IMG} />
        </div>
      </div>

      <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={SECTION_LABEL}>Resource: Details view</div>
          <div style={IMG_CONTAINER}>
            <img src={resourceImg} alt="Global feedback in a resource details view" style={IMG} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={SECTION_LABEL}>Job layout</div>
          <div style={IMG_CONTAINER}>
            <img src={jobImg} alt="Global feedback in a job layout" style={IMG} />
          </div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={SECTION_LABEL}>Drawer</div>
        <div style={IMG_CONTAINER}>
          <img src={drawerImg} alt="Global feedback in a drawer" style={IMG} />
        </div>
      </div>
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
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '24px' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={SECTION_LABEL}>Local placement — banner above affected section</div>
        <div style={IMG_CONTAINER}>
          <img src={localFlowImg} alt="Local feedback placement showing banner above the affected section" style={IMG} />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={SECTION_LABEL}>Local placement — animated flow</div>
        <div style={IMG_CONTAINER}>
          <img src={localFlow1Img} alt="Local feedback placement animated flow example" style={IMG} />
        </div>
      </div>
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
      <p style={CAPTION}>Required but empty fields are flagged using the Form Field's critical state immediately on submission.</p>
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
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '24px' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={SECTION_LABEL}>Server-side — Section Banner above form</div>
        <div style={IMG_CONTAINER}>
          <img src={modalImg} alt="Server-side validation error shown in a Section Banner above the modal form" style={IMG} />
        </div>
        <p style={CAPTION}>Server-side errors appear in a Section Banner placed directly above the form heading.</p>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={SECTION_LABEL}>Server-side — error in a job layout</div>
        <div style={IMG_CONTAINER}>
          <img src={jobImg} alt="Server-side validation error shown in a job layout using Section Banner" style={IMG} />
        </div>
      </div>
    </div>
  ),
};
