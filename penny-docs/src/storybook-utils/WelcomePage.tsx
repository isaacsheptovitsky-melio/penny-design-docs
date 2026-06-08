import React from 'react';

// ─── Token-like constants ─────────────────────────────────────────────────────
const brand   = '#7849FF';
const brandDark = '#0F0728';
const brandLight = '#EDE9FE';
const gray50  = '#F8F9FA';
const gray200 = '#E2E8F0';
const gray600 = '#4A5568';
const gray900 = '#111827';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroIllustration = () => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
    {/* Background shapes */}
    <rect width="320" height="220" fill={brandDark} />
    {/* Wavy abstract shapes evoking Penny's fluid brand style */}
    <ellipse cx="80" cy="60" rx="90" ry="90" fill={brand} opacity="0.35" />
    <ellipse cx="260" cy="170" rx="80" ry="80" fill={brand} opacity="0.2" />
    <ellipse cx="170" cy="110" rx="110" ry="70" fill="#4A1FBF" opacity="0.45" />
    {/* Light "P" lettermark */}
    <rect x="116" y="64" width="28" height="94" rx="4" fill="white" opacity="0.9" />
    <rect x="116" y="64" width="68" height="28" rx="4" fill="white" opacity="0.9" />
    <rect x="116" y="106" width="56" height="28" rx="4" fill="white" opacity="0.9" />
    {/* Highlight arc */}
    <circle cx="50" cy="190" r="60" stroke="white" strokeWidth="1.5" opacity="0.12" fill="none" />
    <circle cx="280" cy="30" r="40" stroke={brand} strokeWidth="1" opacity="0.4" fill="none" />
  </svg>
);

export const WelcomeHero: React.FC = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '40px',
    minHeight: '220px',
    border: `1px solid ${gray200}`,
  }}>
    {/* Left — dark brand panel */}
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '220px' }}>
      <HeroIllustration />
    </div>

    {/* Right — light lavender panel */}
    <div style={{
      background: brandLight,
      display: 'flex',
      alignItems: 'center',
      padding: '40px 48px',
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 800,
        lineHeight: 1.2,
        color: gray900,
        margin: 0,
        letterSpacing: '-0.02em',
      }}>
        Welcome to Penny,<br />
        Melio's Design System
      </h1>
    </div>
  </div>
);

// ─── Intro ────────────────────────────────────────────────────────────────────

export const WelcomeIntro: React.FC = () => (
  <p style={{
    fontSize: '16px',
    lineHeight: 1.75,
    color: gray600,
    maxWidth: '720px',
    margin: '0 0 48px',
  }}>
    Here you can find our design guidelines, component documentation, and resources for
    creating cohesive experiences with Penny. As a white-label design system, Penny offers
    partners the flexibility to customize and adapt it to their unique branding needs.
  </p>
);

// ─── Get started cards ────────────────────────────────────────────────────────

interface GetStartedCardProps {
  title: string;
  href: string;
  artBg?: string;
  artContent: React.ReactNode;
}

const GetStartedCard: React.FC<GetStartedCardProps> = ({ title, href, artBg = brandLight, artContent }) => (
  <a
    href={href}
    style={{
      display: 'block',
      border: `1px solid ${gray200}`,
      borderRadius: '8px',
      overflow: 'hidden',
      textDecoration: 'none',
      color: gray900,
      background: '#fff',
      transition: 'box-shadow 0.15s',
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(120,73,255,0.12)'; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
  >
    <div style={{
      background: artBg,
      height: '140px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {artContent}
    </div>
    <div style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 600 }}>
      {title}
    </div>
  </a>
);

// Mini inline SVG art for each card
const ArtFoundations = () => (
  <svg viewBox="0 0 120 80" fill="none" width="120" height="80">
    <circle cx="30" cy="40" r="28" stroke={brand} strokeWidth="3" fill="none" />
    <circle cx="70" cy="24" r="20" fill={brand} opacity="0.25" />
    <path d="M55 56 Q80 32 100 52" stroke={brand} strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="100" cy="52" r="7" fill={brand} opacity="0.6" />
  </svg>
);

const ArtAccessibility = () => (
  <svg viewBox="0 0 120 80" fill="none" width="120" height="80">
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3].map((col) => {
        const x = 16 + col * 24;
        const y = 12 + row * 16;
        const isCheck = (row + col) % 2 === 0;
        return isCheck ? (
          <path key={`${row}-${col}`} d={`M${x} ${y + 6}l4 4 7-8`}
            stroke={gray900} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <g key={`${row}-${col}`}>
            <line x1={x + 1} y1={y + 1} x2={x + 9} y2={y + 11} stroke={brand} strokeWidth="2.5" strokeLinecap="round" />
            <line x1={x + 9} y1={y + 1} x2={x + 1} y2={y + 11} stroke={brand} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
      })
    )}
  </svg>
);

const ArtComponents = () => (
  <svg viewBox="0 0 120 80" fill="none" width="120" height="80">
    <rect x="10" y="30" width="36" height="36" rx="5" fill={brand} />
    <rect x="52" y="10" width="26" height="26" rx="5" fill={brand} opacity="0.55" />
    <rect x="52" y="42" width="26" height="26" rx="5" fill="#4A1FBF" />
    <rect x="84" y="22" width="24" height="24" rx="5" fill={brand} opacity="0.3" />
    <rect x="84" y="52" width="24" height="18" rx="5" fill={brand} opacity="0.7" />
  </svg>
);

interface GetStartedSectionProps {
  storybookRoot?: string;
}

export const GetStartedSection: React.FC<GetStartedSectionProps> = ({ storybookRoot = '.' }) => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: gray900, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
      Get started
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <GetStartedCard
        title="Values & principles"
        href={`${storybookRoot}/?path=/docs/foundation-values--docs`}
        artBg={brandLight}
        artContent={<ArtFoundations />}
      />
      <GetStartedCard
        title="Accessibility"
        href={`${storybookRoot}/?path=/docs/foundation-accessibility--docs`}
        artBg={gray50}
        artContent={<ArtAccessibility />}
      />
      <GetStartedCard
        title="Components"
        href={`${storybookRoot}/?path=/docs/components-action-button--docs`}
        artBg={brandLight}
        artContent={<ArtComponents />}
      />
    </div>
  </div>
);

// ─── Our libraries tiles ──────────────────────────────────────────────────────

interface LibraryTileProps {
  label: string;
  url: string;
}

const LibraryTile: React.FC<LibraryTileProps> = ({ label, url }) => (
  <a
    href={url}
    target={url.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '18px 24px',
      border: `1px solid ${gray200}`,
      borderRadius: '8px',
      background: '#fff',
      fontSize: '15px',
      fontWeight: 500,
      color: gray900,
      textDecoration: 'none',
      transition: 'border-color 0.15s',
    }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = brand; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = gray200; }}
  >
    {label}
  </a>
);

export const LibrariesSection: React.FC = () => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: gray900, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
      Our libraries
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
      <LibraryTile label="Figma Foundations" url="https://www.figma.com/design/X7oG85653Gwwg7eDTrDUYW" />
      <LibraryTile label="Figma Components" url="https://www.figma.com/design/X7oG85653Gwwg7eDTrDUYW" />
      <LibraryTile label="Storybook" url="https://penny.melio.com/" />
    </div>
  </div>
);

// ─── Stay updated ─────────────────────────────────────────────────────────────

const slackLinks = [
  { label: 'Penny Support', url: '#' },
  { label: 'Penny Figma Support', url: '#' },
  { label: 'Penny Design Announcements', url: '#' },
  { label: 'Penny Announcements', url: '#' },
  { label: 'Guides and processes', url: '#' },
];

export const StayUpdatedSection: React.FC = () => (
  <div style={{ marginBottom: '48px' }}>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: gray900, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
      Stay Updated
    </h2>
    <p style={{ fontSize: '15px', color: gray600, margin: '0 0 16px', lineHeight: 1.6 }}>
      Stay updated with the latest design system changes by joining our dedicated Slack channel
      for real-time discussions and announcements:
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {slackLinks.map(({ label, url }) => (
        <a key={label} href={url} style={{
          color: brand,
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
        >
          {label}
        </a>
      ))}
    </div>
  </div>
);

// ─── Feedback ─────────────────────────────────────────────────────────────────

export const FeedbackSection: React.FC = () => (
  <div style={{
    paddingTop: '32px',
    borderTop: `1px solid ${gray200}`,
  }}>
    <h2 style={{ fontSize: '22px', fontWeight: 700, color: gray900, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
      Feedback and support
    </h2>
    <p style={{ fontSize: '15px', color: gray600, margin: '0 0 16px', lineHeight: 1.6 }}>
      Your feedback is invaluable to us. If you have suggestions or encounter any issues,
      please reach out through the{' '}
      <a href="#" style={{ color: brand }}>Penny Figma Support</a>{' '}
      workflow.
    </p>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        color: gray600,
        border: `1px solid ${gray200}`,
        borderRadius: '8px',
        padding: '8px 16px',
      }}>
        Help us improve
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 2px' }}>👍</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 2px' }}>👎</button>
      </div>
    </div>
    <p style={{ fontSize: '12px', color: gray600, marginTop: '24px', borderTop: `1px solid ${gray200}`, paddingTop: '16px' }}>
      Help us improve this pattern by providing feedback, asking questions, and leaving any
      other comments on this form.{' '}
      <a href="#" style={{ color: brand }}>Feedback form</a>
    </p>
  </div>
);
