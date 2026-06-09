import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/action/Button';
import { IconButton } from '@/components/action/IconButton';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';
import {
  SectionBannerRoot,
  SectionBannerIcon,
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerCloseButton,
} from '@/components/dataDisplay/SectionBanner';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
import deleteFromResourceGif from '@/assets/delete-from-resource.gif';
import deleteFromResourceDetailsGif from '@/assets/delete-from-resource-details.gif';

// ─── Placeholder component (pattern page — no single component) ──────────────
const DeletePattern: React.FC = () => null;

const meta: Meta<typeof DeletePattern> = {
  title: 'UX Patterns/Delete',
  component: DeletePattern,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DeletePattern>;

// ─── Vendor avatar (initials tile) ───────────────────────────────────────────
const VendorAvatar: React.FC<{ initials: string; bg?: string; color?: string; size?: number }> = ({
  initials,
  bg = '#EDE9FF',
  color = '#5C3EC5',
  size = 36,
}) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '8px',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontSize: `${Math.round(size * 0.33)}px`,
      fontWeight: 700,
      color,
      flexShrink: 0,
      letterSpacing: '0.02em',
    }}
  >
    {initials}
  </div>
);

// ─── Shared mock styles ───────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E2E8F0',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const MODAL: React.CSSProperties = {
  ...CARD,
  width: '480px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
  overflow: 'hidden',
};

const OVERLAY: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(24,25,27,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  padding: '50px',
};

const STAGE: React.CSSProperties = {
  border: '1px solid #E2E8F0',
  borderRadius: '12px',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

// ─── Story: ConfirmationModal ─────────────────────────────────────────────────

export const ConfirmationModal: Story = {
  name: 'Confirmation modal',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const [step, setStep] = useState<'idle' | 'menu' | 'confirm' | 'deleted'>('idle');

    return (
      <div
        style={{
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Centered column — label + card move as a unit */}
        <div style={{ width: '100%', maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* Step label */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: '#8B95A9',
              marginBottom: '4px',
            }}
          >
            {step === 'idle' && 'Step 1 — Trigger'}
            {step === 'menu' && 'Step 2 — Row action menu'}
            {step === 'confirm' && 'Step 3 — Confirmation modal'}
            {step === 'deleted' && 'Result'}
          </div>

        {/* ── Result state: toast banner ── */}
        {step === 'deleted' ? (
          <div
            style={{
              ...STAGE,
              background: '#F3F4F6',
              height: '380px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              padding: '20px',
              gap: '0',
            }}
          >
            {/* Success feedback — real Penny Section Banner (compact) */}
            <SectionBannerRoot variant="success" isCompact>
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerDescription>
                  <strong>Acme Corp</strong> vendor deleted
                </SectionBannerDescription>
              </SectionBannerContent>
              <SectionBannerCloseButton onClick={() => setStep('idle')} />
            </SectionBannerRoot>

            {/* Restart button — centred in the remaining space */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button label="Restart demo" variant="tertiary" size="medium" onClick={() => setStep('idle')} />
            </div>
          </div>

        ) : (
          /* ── Steps 1–3: stage with vendor row + optional menu/modal overlay ── */
          <div
            style={{
              ...STAGE,
              overflow: 'visible',  // let dropdown + modal escape the frame
              background: '#F3F4F6',
              position: 'relative',
              width: '100%',
              height: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
            }}
          >
            {/* Vendor row — dimmed when modal is open */}
            <div
              style={{
                ...CARD,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: 'fit-content',
                opacity: step === 'confirm' ? 0.35 : 1,
                transition: 'opacity 0.2s',
                position: 'relative',
              }}
            >
              <VendorAvatar initials="AC" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#18191b' }}>Acme Corp</div>
                <div style={{ fontSize: '12px', color: '#8B95A9', marginTop: '2px', whiteSpace: 'nowrap' }}>
                  3 active bills · Last paid Jan 12, 2026
                </div>
              </div>

              {/* Kebab menu trigger — naked IconButton */}
              <IconButton
                icon="more-vertical"
                variant="naked"
                size="small"
                aria-label="Vendor actions"
                onClick={() => setStep(step === 'menu' ? 'idle' : 'menu')}
              />

              {/* Dropdown menu */}
              {step === 'menu' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    right: '0',
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    minWidth: '160px',
                    zIndex: 20,
                    overflow: 'hidden',
                  }}
                >
                  {['View vendor', 'Create a bill', 'Edit vendor'].map((item) => (
                    <div
                      key={item}
                      style={{ padding: '10px 16px', fontSize: '14px', color: '#18191b', cursor: 'default' }}
                    >
                      {item}
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #E2E8F0' }}>
                    <div
                      onClick={() => setStep('confirm')}
                      style={{
                        padding: '10px 16px',
                        fontSize: '14px',
                        color: '#D80E25',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      Delete vendor
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation modal overlay */}
            {step === 'confirm' && (
              <div style={OVERLAY}>
                <div style={MODAL}>
                  {/* Modal header: icon + title + X */}
                  <div
                    style={{
                      padding: '24px 24px 16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                      <StatusIconSolid variant="alert" size="large" />
                      <h2
                        style={{
                          margin: 0,
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#18191b',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.3,
                        }}
                      >
                        Delete Acme Corp?
                      </h2>
                    </div>
                    <IconButton icon="close" variant="naked" size="small" aria-label="Close" onClick={() => setStep('idle')} />
                  </div>

                  {/* Modal body */}
                  <div style={{ padding: '0 24px 20px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#646f87', lineHeight: 1.6 }}>
                      Payment and bill history for this vendor will be deleted and can't be restored.
                    </p>
                  </div>

                  {/* Modal footer — Cancel left, Delete right */}
                  <div
                    style={{
                      padding: '0 24px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button label="Cancel" variant="tertiary" size="medium" onClick={() => setStep('idle')} />
                    <Button label="Delete vendor" variant="critical" size="medium" onClick={() => setStep('deleted')} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        </div>{/* end centered column */}
      </div>
    );
  },
};

// ─── Story: RowDeleteTrigger ──────────────────────────────────────────────────

export const RowDeleteTrigger: Story = {
  name: 'Row trigger placement',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          color: '#8B95A9',
          alignSelf: 'flex-start',
        }}
      >
        List view — delete as a row action
      </div>
      <img
        src={deleteFromResourceGif}
        alt="Deleting a vendor from a resource list — opening the row overflow menu and selecting Delete vendor"
        style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0' }}
      />
    </div>
  ),
};

// ─── Story: DrawerDeleteTrigger ───────────────────────────────────────────────

export const DrawerDeleteTrigger: Story = {
  name: 'Drawer footer trigger placement',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', gap: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          color: '#8B95A9',
          alignSelf: 'flex-start',
        }}
      >
        Detail view (drawer) — delete in footer
      </div>
      <img
        src={deleteFromResourceDetailsGif}
        alt="Deleting a vendor from a resource detail view — clicking Delete vendor in the drawer footer"
        style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0' }}
      />
    </div>
  ),
};

// ─── Story: ModalAnatomy ─────────────────────────────────────────────────────

export const ModalAnatomy: Story = {
  name: 'Modal anatomy',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    // Fixed section heights — keep modal sections and label positions in sync
    const HEADER_H = 72;
    const BODY_H   = 80;
    const FOOTER_H = 64;
    const MODAL_W  = 400;
    const GAP_W    = 52;
    const LABEL_W  = 200;

    // Vertical centre of each section (drives SVG line y + label top)
    const headerMid = HEADER_H / 2;                         // 36
    const bodyMid   = HEADER_H + BODY_H / 2;               // 112
    const footerMid = HEADER_H + BODY_H + FOOTER_H / 2;    // 184
    const totalH    = HEADER_H + BODY_H + FOOTER_H;        // 216

    const annotations = [
      { mid: headerMid, n: 1, title: 'Entity name in title' },
      { mid: bodyMid,   n: 2, title: 'Body copy'            },
      { mid: footerMid, n: 3, title: 'Two explicit actions' },
    ];

    const PILL_COLOR = '#18191b';

    const PILL: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      background: PILL_COLOR,
      color: '#fff',
      borderRadius: '100px',
      padding: '5px 12px',
      fontSize: '12px',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      lineHeight: 1.3,
    };

    return (
      <div
        style={{
          padding: '44px 40px',
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* ── Modal ────────────────────────────────────────────── */}
          <div
            style={{
              width: MODAL_W,
              flexShrink: 0,
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                height: HEADER_H,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StatusIconSolid variant="alert" size="large" />
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#18191b', letterSpacing: '-0.01em' }}>
                  Delete Acme Corp?
                </h2>
              </div>
              <IconButton icon="close" variant="naked" size="small" aria-label="Close" onClick={() => {}} />
            </div>

            {/* Body */}
            <div
              style={{
                height: BODY_H,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              <p style={{ margin: 0, fontSize: '14px', color: '#646f87', lineHeight: 1.6 }}>
                Payment and bill history for this vendor will be deleted and can't be restored.
              </p>
            </div>

            {/* Footer */}
            <div
              style={{
                height: FOOTER_H,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
              }}
            >
              <Button label="Cancel" variant="tertiary" size="medium" onClick={() => {}} />
              <Button label="Delete vendor" variant="critical" size="medium" onClick={() => {}} />
            </div>
          </div>

          {/* ── SVG connector ────────────────────────────────────── */}
          <svg
            width={GAP_W}
            height={totalH}
            style={{ flexShrink: 0, display: 'block', overflow: 'visible' }}
          >
            {annotations.map((a) => (
              <g key={a.n}>
                {/* Tick at modal right edge */}
                <line
                  x1={1} y1={a.mid - 5}
                  x2={1} y2={a.mid + 5}
                  stroke={PILL_COLOR} strokeWidth="1.5" strokeLinecap="round"
                />
                {/* Dashed connector — same colour as pill, runs flush to label edge */}
                <line
                  x1={3} y1={a.mid}
                  x2={GAP_W} y2={a.mid}
                  stroke={PILL_COLOR} strokeWidth="1"
                  strokeDasharray="3 4"
                />
              </g>
            ))}
          </svg>

          {/* ── Label column ─────────────────────────────────────── */}
          <div style={{ position: 'relative', height: totalH, width: LABEL_W }}>
            {annotations.map((a) => (
              <div
                key={a.n}
                style={{
                  position: 'absolute',
                  top: a.mid,
                  left: 0,
                  transform: 'translateY(-50%)',
                }}
              >
                <div style={PILL}>{a.title}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  },
};

// ─── Story: RelatedPatterns ───────────────────────────────────────────────────

export const RelatedPatternsBlock: Story = {
  name: 'Related patterns',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Error messages"
        url="/?path=/docs/ux-patterns-feedback--docs"
        preview={
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <SectionBannerRoot variant="critical" isCompact>
              <SectionBannerIcon />
              <SectionBannerContent>
                <SectionBannerDescription>1 of 15 vendors couldn&rsquo;t be imported</SectionBannerDescription>
              </SectionBannerContent>
            </SectionBannerRoot>
          </div>
        }
      />
    </RelatedComponents>
  ),
};
