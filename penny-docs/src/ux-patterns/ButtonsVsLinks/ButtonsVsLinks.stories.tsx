import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Lottie from 'lottie-react';

import { Button } from '@/components/action/Button';
import { Link } from '@/components/navigation/Link';
import { DoDont } from '@/storybook-utils/DoDont';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';
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
      color: '#7849ff',
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
            title: 'Button-styled link as the only CTA',
            description: 'When a navigation link is the singular, primary focus of a page or empty state, button styling is acceptable — there are no functional buttons for it to compete with.',
            imagePreview: true,
            preview: (
              <div style={{ background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', minHeight: '160px' }}>
                <div style={{ background: '#fff', border: '1px solid #e4e7ec', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: '#028838' }}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7809 9.62473C17.1259 9.19347 17.056 8.56418 16.6247 8.21917C16.1934 7.87416 15.5641 7.94408 15.2191 8.37534L11.0948 13.5307L8.68394 11.2705C8.28103 10.8928 7.6482 10.9132 7.27047 11.3161C6.89274 11.719 6.91315 12.3518 7.31606 12.7296L10.5161 15.7296C10.7195 15.9203 10.9933 16.0174 11.2714 15.9975C11.5495 15.9776 11.8067 15.8425 11.9809 15.6247L16.7809 9.62473Z" fill="currentColor" />
                  </svg>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#18191b' }}>Payment scheduled</p>
                  {/* A navigation link, styled as a primary button because it is the sole CTA */}
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '40px', padding: '0 20px', borderRadius: '8px', background: '#7849ff', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', fontFamily: 'Poppins, sans-serif' }}>Back to dashboard</a>
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
            title: 'Button for a navigation link',
            description: '"View roles" simply loads a new page without changing data. Rendering it as a button confuses the user\'s expectation of "submitting" something — use a Link.',
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
            title: 'Link styled as a button, competing with a real one',
            description: 'Styling "View plans" (navigation) as a button makes it compete with "Upgrade" (the real action) and clutters the visual hierarchy. Keep "View plans" a link.',
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

// ─── Implementation stories — live component + code (As a button / As a link) ─

/** Centered preview wrapper so the Canvas renders a clean, isolated element. */
const ImplPreview: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '36px 32px', display: 'flex', justifyContent: 'center', fontFamily: 'Poppins, sans-serif' }}>
    {children}
  </div>
);

export const AsButtonExample: Story = {
  name: 'As a button',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'tsx',
        code: '// Renders a native <button> — screen readers announce "button"\n<Button label="Add vendor" onClick={handleAddVendor} />',
      },
    },
  },
  render: () => (
    <ImplPreview>
      <Button label="Add vendor" variant="primary" size="medium" onClick={() => {}} />
    </ImplPreview>
  ),
};

export const AsLinkExample: Story = {
  name: 'As a link',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: 'tsx',
        code: '// Renders an <a> with button styling — screen readers announce "link"\n<Button label="Back to dashboard" link={{ href: \'/dashboard\' }} />',
      },
    },
  },
  render: () => (
    <ImplPreview>
      <Button label="Back to dashboard" variant="primary" size="medium" link={{ href: '#' }} />
    </ImplPreview>
  ),
};

// ─── Related patterns ─────────────────────────────────────────────────────────

export const RelatedPatternsBlock: Story = {
  name: 'Related patterns',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <RelatedComponents>
      <RelatedComponent
        name="Button"
        url="/?path=/docs/components-action-button--docs"
        preview={<Button label="Confirm payment" variant="primary" size="medium" />}
      />
      <RelatedComponent
        name="Link"
        url="/?path=/docs/components-navigation-link--docs"
        preview={<Link href="#" label="View roles" variant="inline" color="default" />}
      />
      <RelatedComponent
        name="Feedback"
        url="/?path=/docs/ux-patterns-feedback--docs"
        preview={
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#7F1D1D', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 700 }}>!</span> Something went wrong
          </div>
        }
      />
    </RelatedComponents>
  ),
};
