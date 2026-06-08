import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Lottie from 'lottie-react';

import { Button } from '@/components/action/Button';
import { Link } from '@/components/navigation/Link';
import { DoDont } from '@/storybook-utils/DoDont';
import createInvoiceAnimation from '@/assets/create-invoice.json';

// ─── Placeholder component (pattern page — no single component) ───────────────
const ButtonsVsLinksPattern: React.FC = () => null;

const meta: Meta<typeof ButtonsVsLinksPattern> = {
  title: 'UX Patterns/Buttons vs. Links',
  component: ButtonsVsLinksPattern,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonsVsLinksPattern>;

// ─── Shared styles ────────────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E2E8F0',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  display: 'flex',
  flexDirection: 'column',
};

// Two-column grid that fills the full available width with equal columns
const GRID2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  width: '100%',
};

const STAGE_LABEL: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  color: '#8B95A9',
  marginBottom: '8px',
};

const SECTION_TITLE: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#18191b',
  margin: '0 0 4px',
};

const SECTION_BODY: React.CSSProperties = {
  fontSize: '13px',
  color: '#646F87',
  margin: 0,
  lineHeight: 1.5,
};

// ─── Inline link mock ─────────────────────────────────────────────────────────

const MockLink: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    style={{
      color: '#5C3EC5',
      textDecoration: 'underline',
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      cursor: 'pointer',
    }}
  >
    {children}
  </a>
);

// ─── Story: CorePrinciple ─────────────────────────────────────────────────────

export const CorePrinciple: Story = {
  name: 'Core principle — side by side',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div
      style={{
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Poppins, sans-serif',
        gap: '16px',
      }}
    >
      <div style={STAGE_LABEL}>Button vs. Link — at a glance</div>

      {/* Side-by-side cards */}
      <div style={GRID2}>
        {/* Button card — text on top, live empty-state visual below */}
        <div style={{ ...CARD, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px' }}>
            <p style={SECTION_TITLE}>Button</p>
            <p style={SECTION_BODY}>
              Triggers an <strong>action</strong> — submitting a form, confirming a decision, or
              launching a flow. The result changes application state.
            </p>
          </div>
          {/* Live empty-state built from Penny components */}
          <div
            style={{
              borderTop: '1px solid #e4e7ec',
              background: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 24px',
              gap: '12px',
              flex: 1,
            }}
          >
            <Lottie
              animationData={createInvoiceAnimation}
              loop
              style={{ width: '120px', height: '120px' }}
            />
            {/* body2Semi: 16px / 24px / 600 — neutral.1000 */}
            <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '24px', color: '#18191b', textAlign: 'center' }}>
              Create your first invoice
            </p>
            {/* body3: 14px / 20px / 400 — neutral.700 */}
            <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#646F87', textAlign: 'center' }}>
              Create and send your first digital invoice to start accepting payments.
            </p>
            <Button label="Create an invoice" variant="primary" size="medium" onClick={() => {}} />
          </div>
        </div>

        {/* Link card — text on top, image below */}
        <div style={{ ...CARD, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px' }}>
            <p style={SECTION_TITLE}>Link</p>
            <p style={SECTION_BODY}>
              Takes the user to a <strong>new location</strong> — a different page, section, or
              external URL. The result is navigation, not a state change.
            </p>
          </div>
          {/* Live component: inline link in a settings section */}
          <div style={{
            flex: 1,
            borderTop: '1px solid #e4e7ec',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 28px',
          }}>
            <div style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* heading2Semi: 24px / 32px / 600 — neutral.1000 */}
              <p style={{
                margin: 0, fontFamily: 'Poppins, sans-serif',
                fontSize: '24px', fontWeight: 600, lineHeight: '32px', color: '#18191b',
              }}>
                Roles and permissions
              </p>
              {/* body3: 14px / 20px / 400 — neutral.700, with inline Link */}
              <p style={{
                margin: 0, fontFamily: 'Poppins, sans-serif',
                fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#646F87',
              }}>
                Review and compare each user role and their associated permissions.{' '}
                <Link href="#" label="View roles" variant="inline" color="default" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decision callout — darker grey, same width as grid */}
      <div
        style={{
          background: '#EAECF0',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#18191b',
        }}
      >
        <strong>Quick test:</strong> Ask &ldquo;does clicking this change data or navigate?&rdquo; — if it
        changes data, use a Button. If it navigates, use a Link.
      </div>
    </div>
  ),
};

// ─── Story: DecisionTable ─────────────────────────────────────────────────────

export const DecisionTable: Story = {
  name: 'Decision table',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const rows: Array<{
      scenario: string;
      verdict: 'Button' | 'Link';
      reason: string;
    }> = [
      {
        scenario: 'Submit a payment',
        verdict: 'Button',
        reason: 'Triggers a state change — money moves',
      },
      {
        scenario: 'Go to vendor details',
        verdict: 'Link',
        reason: 'Opens another page — navigation only',
      },
      {
        scenario: 'Confirm deletion in a modal',
        verdict: 'Button',
        reason: 'Destructive action — irreversible state change',
      },
      {
        scenario: '"Learn more" next to a field label',
        verdict: 'Link',
        reason: 'Opens help content or external docs',
      },
      {
        scenario: 'Create a new bill',
        verdict: 'Button',
        reason: 'Starts a creation flow — changes application state',
      },
      {
        scenario: '"View roles" in a settings description',
        verdict: 'Link',
        reason: 'Navigates to a reference page',
      },
      {
        scenario: 'Cancel and return to previous screen',
        verdict: 'Button',
        reason: 'Closes/discards a flow — use tertiary variant',
      },
      {
        scenario: 'Open Melio\'s terms of service',
        verdict: 'Link',
        reason: 'External URL — always a link, opens in new tab',
      },
    ];

    const VERDICT_STYLES: Record<'Button' | 'Link', React.CSSProperties> = {
      Button: {
        background: '#EDE9FF',
        color: '#5B21B6',
        padding: '3px 10px',
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      },
      Link: {
        background: '#DCFCE7',
        color: '#166534',
        padding: '3px 10px',
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      },
    };

    return (
      <div
        style={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <div style={{ ...STAGE_LABEL, alignSelf: 'flex-start' }}>
          Scenario → component decision
        </div>

        <div
          style={{
            width: '100%',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 100px 1fr',
              background: '#F8FAFC',
              borderBottom: '2px solid #E2E8F0',
              padding: '10px 20px',
              gap: '16px',
            }}
          >
            {['Scenario', 'Use', 'Reason'].map((h) => (
              <span
                key={h}
                style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748B' }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 1fr',
                padding: '12px 20px',
                gap: '16px',
                alignItems: 'center',
                borderBottom: i < rows.length - 1 ? '1px solid #F1F5F9' : 'none',
                background: i % 2 === 0 ? '#fff' : '#FAFBFC',
              }}
            >
              <span style={{ fontSize: '13px', color: '#18191b' }}>{row.scenario}</span>
              <span style={VERDICT_STYLES[row.verdict]}>{row.verdict}</span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>{row.reason}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ─── Story: DoExamples ────────────────────────────────────────────────────────

export const DoExamples: Story = {
  name: 'Do — correct usage',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ ...STAGE_LABEL }}>Correct usage</div>
      <DoDont
        items={[
          {
            type: 'do',
            title: 'Button for "Confirm payment"',
            description: 'Commits a financial transaction and changes application state — always a Button.',
            imagePreview: true,
            preview: (
              <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', minHeight: '160px' }}>
                <div style={{ background: '#fff', border: '1px solid #e4e7ec', borderRadius: '12px', padding: '20px 24px', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#18191b' }}>Payment summary</p>
                  <div style={{ borderTop: '1px solid #e4e7ec', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#646F87' }}>
                      <span>Acme Corp</span>
                      <span style={{ fontWeight: 600, color: '#18191b' }}>$1,250.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                      <span>Checking ···4521</span>
                      <span>Today</span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #e4e7ec', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button label="Confirm payment" variant="primary" size="small" onClick={() => {}} />
                  </div>
                </div>
              </div>
            ),
          },
          {
            type: 'do',
            title: 'Button for "Activate Get paid"',
            description: 'Starts a multi-step activation flow that modifies account settings — not navigation.',
            imagePreview: true,
            preview: (
              <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', minHeight: '160px' }}>
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px', width: '100%', maxWidth: '320px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <circle cx="12" cy="12" r="11" fill="#3B82F6" />
                    <rect x="11" y="7" width="2" height="6" rx="1" fill="white" />
                    <circle cx="12" cy="16.5" r="1.25" fill="white" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#1e3a8a' }}>Enable full plan capabilities</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#1d4ed8', lineHeight: 1.5 }}>Activation of Get paid is required to send invoices.</p>
                    <div>
                      <Button label="Activate Get paid" variant="tertiary" size="small" onClick={() => {}} />
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};

// ─── Story: DontExamples ──────────────────────────────────────────────────────

export const DontExamples: Story = {
  name: "Don't — incorrect usage",
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ ...STAGE_LABEL }}>Incorrect usage</div>
      <DoDont
        items={[
          {
            type: 'dont',
            title: 'Button for "View roles"',
            description: '"View roles" navigates to a page — use a Link so users can right-click, middle-click, and screen readers announce "link" not "button".',
            imagePreview: true,
            preview: (
              <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', minHeight: '160px' }}>
                <div style={{ background: '#fff', border: '1px solid #e4e7ec', borderRadius: '12px', width: '100%', maxWidth: '320px', overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e4e7ec' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#18191b' }}>Team settings</p>
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#18191b' }}>Roles &amp; permissions</p>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#646F87' }}>Manage team access</p>
                    </div>
                    <Button label="View roles" variant="primary" size="small" onClick={() => {}} />
                  </div>
                </div>
              </div>
            ),
          },
          {
            type: 'dont',
            title: 'Two Buttons when one navigates',
            description: '"View plans" is navigation — rendering it as a Button competes with "Upgrade" and collapses the action hierarchy.',
            imagePreview: true,
            preview: (
              <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', minHeight: '160px' }}>
                <div style={{ background: '#fff', border: '1px solid #e4e7ec', borderRadius: '12px', padding: '16px 20px', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#18191b' }}>Upgrade to unlock invoicing</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#646F87' }}>Collect payments faster with digital invoices.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button label="View plans" variant="secondary" size="small" onClick={() => {}} />
                    <Button label="Upgrade" variant="primary" size="small" onClick={() => {}} />
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};

// ─── Story: LiveComparison ────────────────────────────────────────────────────

export const LiveComparison: Story = {
  name: 'Live comparison',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div
      style={{
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Poppins, sans-serif',
        gap: '24px',
      }}
    >
      <div style={{ ...STAGE_LABEL }}>
        Live component comparison
      </div>

      <div style={GRID2}>
        {/* Button examples */}
        <div style={{ ...CARD, padding: '24px', gap: '16px' }}>
          <div>
            <p style={{ ...SECTION_TITLE, marginBottom: '4px' }}>Buttons — actions</p>
            <p style={{ ...SECTION_BODY, marginBottom: '16px' }}>
              Each triggers a state change. The element is a <code>&lt;button&gt;</code>.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
            <Button label="Confirm payment" variant="primary" size="medium" onClick={() => {}} />
            <Button label="Activate Get paid" variant="secondary" size="medium" onClick={() => {}} />
            <Button label="Delete vendor" variant="critical" size="medium" onClick={() => {}} />
            <Button label="Cancel" variant="tertiary" size="medium" onClick={() => {}} />
          </div>
        </div>

        {/* Link examples */}
        <div style={{ ...CARD, padding: '24px', gap: '16px' }}>
          <div>
            <p style={{ ...SECTION_TITLE, marginBottom: '4px' }}>Links — navigation</p>
            <p style={{ ...SECTION_BODY, marginBottom: '16px' }}>
              Each leads to a destination. The element is an <code>&lt;a&gt;</code>.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
            {[
              'View roles',
              'View plans',
              'Learn more about payment methods',
              'Read our Terms of Service',
            ].map((label) => (
              <MockLink key={label}>{label}</MockLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mixed-context example */}
      <div style={{ ...CARD, padding: '20px', width: '100%' }}>
        <p style={{ ...SECTION_TITLE, marginBottom: '8px' }}>Mixed context — both in one UI</p>
        <div
          style={{
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
            <circle cx="12" cy="12" r="11" fill="#3B82F6" />
            <rect x="11" y="7" width="2" height="6" rx="1" fill="white" />
            <circle cx="12" cy="16.5" r="1.25" fill="white" />
          </svg>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#1e3a8a' }}>
              Enable full plan capabilities
            </p>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#1d4ed8', lineHeight: 1.5 }}>
              Activation of Get paid is required to send invoices.{' '}
              <MockLink>Learn more about plans</MockLink>
            </p>
            <Button label="Activate Get paid" variant="tertiary" size="small" onClick={() => {}} />
          </div>
        </div>
        <p style={{ ...SECTION_BODY, marginTop: '10px' }}>
          The <strong>Button</strong> activates a feature (action). The <strong>link</strong> opens
          documentation (navigation). Both coexist correctly.
        </p>
      </div>
    </div>
  ),
};
