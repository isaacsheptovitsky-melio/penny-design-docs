import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Lottie from 'lottie-react';

import { Button } from '@/components/action/Button/Button';
import { PartCallout } from '@/storybook-utils/PartCallout';
import { MeasuredGap } from '@/storybook-utils/MeasuredGap';

// ─── Illustrations — loaded via Vite glob ────────────────────────────────────
const _animationModules = import.meta.glob<object>(
  './assets/illustrations/*.json',
  { eager: true, import: 'default' }
);

const ILLUSTRATIONS = Object.entries(_animationModules)
  .map(([path, animationData]) => {
    const filename = (path.split('/').pop() ?? '').replace(/\.json$/, '');
    const name = filename
      .split(/[-\s]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { name, filename, animationData };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

import pennyBlackSymbol from '@/assets/penny-symbol-black.png';
import pennyLylacSymbol from '@/assets/penny-symbol-lylac.png';
import pennyWhiteSymbol from '@/assets/penny-symbol-white.png';
import pennyBlackHorizontal from '@/assets/penny-logo-black-horizontal.png';
import pennyBlackVertical from '@/assets/penny-logo-black-vertical.png';
import pennyLylacHorizontal from '@/assets/penny-logo-lylac-horizontal.png';
import pennyLylacVertical from '@/assets/penny-logo-lylac-vertical.png';
import pennyWhiteHorizontal from '@/assets/penny-logo-white-horizontal.png';
import pennyWhiteVertical from '@/assets/penny-logo-white-vertical.png';
import melioFullLogoBlack from '@/assets/melio-full-logo-black.png';
import melioFullLogoPurple from '@/assets/melio-full-logo-purple.png';
import melioFullLogoWhite from '@/assets/melio-full-logo-white.png';
import melioAppSymbolBlack from '@/assets/melio-app-symbol-black.png';
import melioAppSymbolPurple from '@/assets/melio-app-symbol-purple.png';
import melioAppSymbolWhite from '@/assets/melio-app-symbol-white.png';

const PlaceholderDoc: React.FC = () => null;

const meta: Meta = {
  title: '✦ Doc Blocks',
  component: PlaceholderDoc,
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Logos story ─────────────────────────────────────────────────────────────

export const LogosShowcase: Story = {
  name: 'Logos showcase',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const LABEL: React.CSSProperties = {
      fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.07em', color: '#8B95A9', marginBottom: '12px',
    };
    const SUBLABEL: React.CSSProperties = {
      fontSize: '11px', color: '#6B7280', margin: 0, textAlign: 'center' as const,
    };
    const SUBLABEL_DARK: React.CSSProperties = { ...SUBLABEL, color: '#9CA3AF' };
    // Wraps one card + its label below it
    const ITEM: React.CSSProperties = {
      display: 'flex', flexDirection: 'column', gap: '8px',
    };
    const CELL_LIGHT: React.CSSProperties = {
      border: '1px solid #E2E8F0', borderRadius: '8px', background: '#ffffff',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px', gap: '0',
    };
    const CELL_GREY: React.CSSProperties = {
      ...CELL_LIGHT, background: '#F7FAFC',
    };
    const CELL_DARK: React.CSSProperties = {
      border: '1px solid #E2E8F0', borderRadius: '8px', background: '#18191b',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px', gap: '0',
    };

    return (
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '40px', fontFamily: 'Poppins, sans-serif' }}>

        {/* ── Penny symbol variants ── */}
        <div>
          <div style={LABEL}>Penny — Symbol</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={ITEM}>
              <div style={CELL_LIGHT}><img src={pennyBlackSymbol} width={40} height={40} alt="Penny black symbol" /></div>
              <p style={SUBLABEL}>Black · on white/light</p>
            </div>
            <div style={ITEM}>
              <div style={CELL_GREY}><img src={pennyLylacSymbol} width={40} height={40} alt="Penny lylac symbol" /></div>
              <p style={SUBLABEL}>Lylac · on light grey</p>
            </div>
            <div style={ITEM}>
              <div style={CELL_DARK}><img src={pennyWhiteSymbol} width={40} height={40} alt="Penny white symbol" /></div>
              <p style={SUBLABEL_DARK}>White · on dark/brand</p>
            </div>
          </div>
        </div>

        {/* ── Penny horizontal logo+tagline ── */}
        <div>
          <div style={LABEL}>Penny — Horizontal logo</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={ITEM}>
              <div style={CELL_LIGHT}><img src={pennyBlackHorizontal} style={{ maxHeight: '40px', maxWidth: '100%', objectFit: 'contain' }} alt="Penny black horizontal logo" /></div>
              <p style={SUBLABEL}>Black · on white/light</p>
            </div>
            <div style={ITEM}>
              <div style={CELL_GREY}><img src={pennyLylacHorizontal} style={{ maxHeight: '40px', maxWidth: '100%', objectFit: 'contain' }} alt="Penny lylac horizontal logo" /></div>
              <p style={SUBLABEL}>Lylac · on light grey</p>
            </div>
            <div style={ITEM}>
              <div style={CELL_DARK}><img src={pennyWhiteHorizontal} style={{ maxHeight: '40px', maxWidth: '100%', objectFit: 'contain' }} alt="Penny white horizontal logo" /></div>
              <p style={SUBLABEL_DARK}>White · on dark/brand</p>
            </div>
          </div>
        </div>

        {/* ── Penny vertical logo+tagline ── */}
        <div>
          <div style={LABEL}>Penny — Vertical logo</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={ITEM}>
              <div style={{ ...CELL_LIGHT, minHeight: '120px' }}><img src={pennyBlackVertical} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} alt="Penny black vertical logo" /></div>
              <p style={SUBLABEL}>Black · on white/light</p>
            </div>
            <div style={ITEM}>
              <div style={{ ...CELL_GREY, minHeight: '120px' }}><img src={pennyLylacVertical} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} alt="Penny lylac vertical logo" /></div>
              <p style={SUBLABEL}>Lylac · on light grey</p>
            </div>
            <div style={ITEM}>
              <div style={{ ...CELL_DARK, minHeight: '120px' }}><img src={pennyWhiteVertical} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} alt="Penny white vertical logo" /></div>
              <p style={SUBLABEL_DARK}>White · on dark/brand</p>
            </div>
          </div>
        </div>

        {/* ── Melio full logo (wordmark) ── */}
        <div>
          <div style={LABEL}>Melio — Full Logo</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={ITEM}>
              <div style={{ ...CELL_LIGHT, minHeight: '100px' }}><img src={melioFullLogoBlack} style={{ maxHeight: '48px', maxWidth: '100%', objectFit: 'contain' }} alt="Melio full logo black" /></div>
              <p style={SUBLABEL}>Black · on white/light</p>
            </div>
            <div style={ITEM}>
              <div style={{ ...CELL_GREY, minHeight: '100px' }}><img src={melioFullLogoPurple} style={{ maxHeight: '48px', maxWidth: '100%', objectFit: 'contain' }} alt="Melio full logo purple" /></div>
              <p style={SUBLABEL}>Purple · on light grey</p>
            </div>
            <div style={ITEM}>
              <div style={{ ...CELL_DARK, minHeight: '100px' }}><img src={melioFullLogoWhite} style={{ maxHeight: '48px', maxWidth: '100%', objectFit: 'contain' }} alt="Melio full logo white" /></div>
              <p style={SUBLABEL_DARK}>White · on dark/brand</p>
            </div>
          </div>
        </div>

        {/* ── Melio app symbol ── */}
        <div>
          <div style={LABEL}>Melio — App Symbol</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={ITEM}>
              <div style={CELL_LIGHT}><img src={melioAppSymbolBlack} width={48} height={48} style={{ objectFit: 'contain' }} alt="Melio app symbol black" /></div>
              <p style={SUBLABEL}>Black · on white/light</p>
            </div>
            <div style={ITEM}>
              <div style={CELL_GREY}><img src={melioAppSymbolPurple} width={48} height={48} style={{ objectFit: 'contain' }} alt="Melio app symbol purple" /></div>
              <p style={SUBLABEL}>Purple · on light grey</p>
            </div>
            <div style={ITEM}>
              <div style={CELL_DARK}><img src={melioAppSymbolWhite} width={48} height={48} style={{ objectFit: 'contain' }} alt="Melio app symbol white" /></div>
              <p style={SUBLABEL_DARK}>White · on dark/brand</p>
            </div>
          </div>
        </div>

      </div>
    );
  },
};

export const PartCalloutExample: Story = {
  name: 'PartCallout example',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px', background: '#F8F9FA' }}>
      <PartCallout label="button.primary.bg" placement="above">
        <Button label="Button" variant="primary" />
      </PartCallout>
    </div>
  ),
};

// ─── Overlay Annotation Example ───────────────────────────────────────────────

export const OverlayAnnotationExample: Story = {
  name: 'Overlay annotation example',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => {
    const CARD: React.CSSProperties = {
      background: '#fff',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    };
    const DOT: React.CSSProperties = {
      width: '3px', height: '3px', borderRadius: '50%',
      background: '#9CA3AF', border: '1px solid white', flexShrink: 0,
    };
    const LINE: React.CSSProperties = {
      width: '32px', height: '1px', background: '#D1D5DB', flexShrink: 0,
    };
    const MONO_LABEL: React.CSSProperties = {
      fontFamily: '"SFMono-Regular", Consolas, monospace',
      fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap',
    };
    const SECTION_LABEL: React.CSSProperties = {
      fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.07em', color: '#8B95A9', marginBottom: '8px',
    };

    return (
      <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'center', background: '#F8F9FA' }}>

        {/* ── Right-side: dot in right padding strip ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={SECTION_LABEL}>Right-side — dot in right padding</div>
          <div style={{ position: 'relative' }}>
            <div style={{ ...CARD, width: '400px', overflow: 'hidden' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', background: '#EDF2F7', padding: '10px 20px', borderBottom: '1px solid #E2E8F0' }}>
                {['Item', 'Actions'].map(h => (
                  <span key={h} style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6B7280' }}>{h}</span>
                ))}
              </div>
              {/* Rows */}
              {[
                { name: 'Default row',  critical: false },
                { name: 'Selected row', critical: true },
              ].map(row => (
                <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #E2E8F0', background: row.critical ? '#fff8f8' : '#fff' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#18191b' }}>{row.name}</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Button label="Edit" variant="tertiary" size="small" onClick={() => {}} />
                    <Button label="Delete" variant={row.critical ? 'critical' : 'tertiary'} size="small" onClick={() => {}} />
                  </div>
                </div>
              ))}
            </div>
            {/* Annotations — dot in right padding (20px): left: calc(100% - 10px) */}
            {/* header ≈ 36px | row = 12+32+12+1 = 57px | btn centre = 12+16 = 28px from row top */}
            {[
              { label: 'variant="tertiary"', top: 36 + 28 },
              { label: 'variant="critical"', top: 36 + 57 + 28 },
            ].map(({ label, top }) => (
              <div key={label} style={{ position: 'absolute', top: `${top}px`, left: 'calc(100% - 10px)', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'none' }}>
                <div style={DOT} />
                <div style={LINE} />
                <span style={MONO_LABEL}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Left-side: dot in left padding strip ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={SECTION_LABEL}>Left-side — dot in left padding</div>
          <div style={{ position: 'relative' }}>
            <div style={{ ...CARD, width: '340px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA' }}>
                <Button label="Delete item" variant="critical" size="medium" onClick={() => {}} />
                <Button label="Save changes" variant="primary" size="medium" onClick={() => {}} />
              </div>
            </div>
            {/* Annotation — dot in left padding (24px): right: calc(100% - 14px) */}
            {/* card height: 16+40+16=72px | btn centre: 16+20=36px from card top */}
            {/* DOM order: [label][line][dot] — dot is rightmost, label flows left outside card */}
            <div style={{ position: 'absolute', top: '36px', right: 'calc(100% - 14px)', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'none' }}>
              <span style={MONO_LABEL}>left-aligned — opposite primary</span>
              <div style={LINE} />
              <div style={DOT} />
            </div>
          </div>
        </div>

      </div>
    );
  },
};

// ─── Measured-gap (spacing annotation) example ────────────────────────────────

export const MeasuredGapExample: Story = {
  name: 'Measured gap example',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => {
    const SECTION_LABEL: React.CSSProperties = {
      fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.07em', color: '#8B95A9', marginBottom: '8px',
    };
    const BOX: React.CSSProperties = {
      width: '220px', height: '40px', borderRadius: '8px',
      background: '#EEF2F7', border: '1px solid #E2E8F0',
    };
    const TILE: React.CSSProperties = {
      padding: '10px 16px', borderRadius: '8px', background: '#EEF2F7',
      border: '1px solid #E2E8F0', fontFamily: 'Poppins, sans-serif',
      fontSize: '13px', fontWeight: 600, color: '#475569',
    };
    return (
      <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'flex-start', background: '#F8F9FA', fontFamily: "'Nunito Sans', sans-serif" }}>
        {/* Vertical — bracket spans the gap in a left gutter (give the container left padding) */}
        <div>
          <div style={SECTION_LABEL}>Vertical — measure a gap between stacked elements</div>
          <div style={{ paddingLeft: '64px' }}>
            <div style={BOX} />
            <MeasuredGap size={16} />
            <div style={BOX} />
          </div>
        </div>

        {/* Horizontal — bracket drops below an inline gap */}
        <div>
          <div style={SECTION_LABEL}>Horizontal — measure a gap between inline elements</div>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={TILE}>One</span>
            <MeasuredGap size={8} orientation="horizontal" />
            <span style={TILE}>Two</span>
          </div>
        </div>
      </div>
    );
  },
};

// ─── Illustrations story ──────────────────────────────────────────────────────

export const IllustrationsShowcase: Story = {
  name: 'Illustrations',
  parameters: {
    controls: { disable: true },
    docs: { canvas: { sourceState: 'none' } },
  },
  render: () => (
    <div style={{ padding: '32px', fontFamily: 'Poppins, sans-serif' }}>
      <p style={{
        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.07em', color: '#8B95A9', margin: '0 0 24px',
      }}>
        {ILLUSTRATIONS.length} illustrations
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
        gap: '12px',
      }}>
        {ILLUSTRATIONS.map(({ name, filename, animationData }) => (
          <div
            key={filename}
            style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px 12px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Lottie
              animationData={animationData}
              loop
              style={{ width: '80px', height: '80px', flexShrink: 0 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', width: '100%' }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.3 }}>
                {name}
              </p>
              <p style={{ margin: 0, fontSize: '10px', color: '#9CA3AF', textAlign: 'center', fontFamily: '"SFMono-Regular", Consolas, monospace' }}>
                {filename}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
