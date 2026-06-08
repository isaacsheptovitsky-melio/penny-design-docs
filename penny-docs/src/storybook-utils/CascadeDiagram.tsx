import React from 'react';

/**
 * CascadeDiagram
 *
 * A horizontal sequence of cards that visualises a multi-level resolution
 * chain — each card represents one level of abstraction, and the connectors
 * between them show the direction of resolution.
 *
 * Originally designed for Penny's three-level token hierarchy
 * (Component → Semantic → Global), but applicable to any system where
 * a concept resolves through ordered levels.
 *
 * ── When to use ─────────────────────────────────────────────────────────
 *
 *   USE when:
 *   • Explaining a multi-level hierarchy where each level builds on the
 *     previous one (token system, theming layers, CSS specificity, etc.).
 *   • The reader needs to understand both WHAT each level is and HOW the
 *     levels relate to each other in a single glance.
 *   • 2–5 levels are involved. More than 5 cards wrap awkwardly on narrow
 *     viewports; use a vertical list instead.
 *
 *   DON'T use when:
 *   • The levels are independent (no resolution chain) — use separate
 *     VariantCards instead.
 *   • You only need to show the end result — use a simple code block or
 *     SemanticTokenTable instead.
 *
 * ── Visual spec ─────────────────────────────────────────────────────────
 *
 *   Canvas bg    #EDF2F7 — one step darker than the card visual panels so
 *                the cards lift off the tray.
 *
 *   Card         border: 1px solid #E2E8F0
 *                border-radius: 8px
 *                box-shadow: rgba(0,0,0,0.1) 0px 1px 3px 0px  (same as
 *                  component canvas)
 *                overflow: hidden
 *
 *   Visual panel (top half of card)
 *                background: #F8F9FA
 *                height: 120px (fixed — keeps all headings on the same
 *                  horizontal baseline)
 *                border-bottom: 1px solid #E2E8F0
 *                padding: 24px 20px
 *                Content centred (align-items + justify-content: center)
 *                Use PartCallout to annotate a specific part of a live
 *                  element, or a static illustration.
 *
 *   Text panel (bottom half of card)
 *                background: #fff
 *                padding: 20px 24px
 *                Level name:  h2, 18px, weight 700, #111827
 *                Sublabel:    11px, #9CA3AF, margin-bottom 8px
 *                Description: 13px, #4A5568, line-height 1.65
 *                All text left-aligned, justified to flex-start so
 *                  headings stay on the same row across cards.
 *
 *   Connector    Positioned between cards (not inside them), centred
 *                vertically.
 *                Arrow: → 20px, #9CA3AF
 *                Label: 10px italic, #9CA3AF, below arrow
 *                Default label: "resolves to"
 *
 *   Trace bar    Optional. Sits below the cards with margin-top 32px.
 *                background: #fff, border-radius: 8px, no border.
 *                Each token rendered as a pill:
 *                  bg #F6F2FD, border 1px solid #E4DBFF,
 *                  border-radius 4px, padding 2px 6px,
 *                  font: 11px SFMono-Regular, color #7849ff
 *                Final resolved value rendered as a neutral pill:
 *                  bg #F7FAFC, border 1px solid #E2E8F0,
 *                  includes inline colour swatch (10×10px, border-radius 2px)
 *                Arrows between pills: 12px →, #9CA3AF, gap 20px
 *
 * ── Fonts ────────────────────────────────────────────────────────────────
 *
 *   All text uses Nunito Sans (set on the outermost container).
 *   Token paths and hex values use SFMono-Regular, Consolas, monospace.
 *   Never set Poppins on any element — Chakra's ThemeProvider injects it
 *   globally; Nunito Sans must be set explicitly to override it.
 *
 * ── Usage ────────────────────────────────────────────────────────────────
 *
 *   import { CascadeDiagram } from '@/storybook-utils/CascadeDiagram';
 *   import { PartCallout }    from '@/storybook-utils/PartCallout';
 *
 *   <CascadeDiagram
 *     connectorLabel="resolves to"
 *     levels={[
 *       {
 *         label: 'Component',
 *         sublabel: 'Part-level token',
 *         description: 'Ties a semantic token to a specific part…',
 *         visual: (
 *           <PartCallout label="button.primary.bg">
 *             <MyButton />
 *           </PartCallout>
 *         ),
 *       },
 *       // … more levels
 *     ]}
 *     trace={{
 *       tokens: [
 *         'component.button.primary.bg',
 *         'semantic.action.primary.rest',
 *         'global.brand.700',
 *       ],
 *       resolvedHex: '#7849ff',
 *     }}
 *   />
 */

const MONO = '"SFMono-Regular", Consolas, monospace';
const NUNITO = "'Nunito Sans', sans-serif";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CascadeDiagramLevel {
  /** Short heading rendered as h2 (18px/700). */
  label: string;
  /** One-line descriptor shown below the heading in grey. */
  sublabel?: string;
  /** Explanatory prose (13px). Keep to 2–3 sentences. */
  description: string;
  /**
   * Visual content for the top panel (#F8F9FA tray).
   * Prefer PartCallout for annotated component previews, or a simple
   * illustration built from plain divs.
   */
  visual: React.ReactNode;
}

export interface CascadeDiagramTrace {
  /**
   * Token paths listed in resolution order (first = most specific,
   * last = most primitive). Each is rendered as a branded purple pill.
   */
  tokens: string[];
  /**
   * The final resolved hex value shown at the end of the trace.
   * Renders as a neutral pill with an inline colour swatch.
   */
  resolvedHex?: string;
}

export interface CascadeDiagramProps {
  levels: CascadeDiagramLevel[];
  /** Label on the connector arrows. Default: "resolves to". */
  connectorLabel?: string;
  /** Optional resolution trace bar rendered below the cards. */
  trace?: CascadeDiagramTrace;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const TokenPill: React.FC<{ text: string }> = ({ text }) => (
  <span style={{
    fontFamily: MONO,
    fontSize: '11px',
    color: '#7849ff',
    background: '#F6F2FD',
    border: '1px solid #E4DBFF',
    borderRadius: '4px',
    padding: '2px 6px',
    whiteSpace: 'nowrap' as const,
  }}>
    {text}
  </span>
);

const HexPill: React.FC<{ hex: string }> = ({ hex }) => (
  <span style={{
    fontFamily: MONO,
    fontSize: '11px',
    color: '#374151',
    background: '#F7FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '4px',
    padding: '2px 6px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    whiteSpace: 'nowrap' as const,
  }}>
    <span style={{
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '2px',
      background: hex,
      border: '1px solid rgba(0,0,0,0.12)',
      flexShrink: 0,
    }} />
    {hex}
  </span>
);

const TraceArrow: React.FC = () => (
  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>→</span>
);

// ─── CascadeDiagram ───────────────────────────────────────────────────────────

export const CascadeDiagram: React.FC<CascadeDiagramProps> = ({
  levels,
  connectorLabel = 'resolves to',
  trace,
}) => (
  <div style={{ padding: '24px 32px', fontFamily: NUNITO, overflow: 'hidden' }}>

    {/* ── Cards row ── */}
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
      {levels.map((level, i) => (
        <React.Fragment key={level.label}>

          {/* Card */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px',
          }}>

            {/* Visual panel */}
            <div style={{
              background: '#F8F9FA',
              borderBottom: '1px solid #E2E8F0',
              padding: '24px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '120px',
            }}>
              {level.visual}
            </div>

            {/* Text panel */}
            <div style={{
              background: '#fff',
              padding: '20px 24px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '4px',
            }}>
              <h2 style={{
                margin: '0 0 2px',
                fontSize: '18px',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.2,
                fontFamily: NUNITO,
                borderBottom: 'none',
                paddingBottom: 0,
              }}>
                {level.label}
              </h2>
              {level.sublabel && (
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '8px', fontFamily: NUNITO }}>
                  {level.sublabel}
                </div>
              )}
              <p style={{ margin: 0, fontSize: '13px', color: '#4A5568', lineHeight: 1.65, fontFamily: NUNITO }}>
                {level.description}
              </p>
            </div>

          </div>

          {/* Connector */}
          {i < levels.length - 1 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 12px',
              gap: '2px',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '20px', color: '#9CA3AF', lineHeight: 1 }}>→</span>
              <span style={{ fontSize: '10px', color: '#9CA3AF', fontStyle: 'italic' as const, fontFamily: NUNITO }}>
                {connectorLabel}
              </span>
            </div>
          )}

        </React.Fragment>
      ))}
    </div>

    {/* ── Trace bar ── */}
    {trace && (
      <div style={{
        marginTop: '32px',
        background: '#fff',
        borderRadius: '8px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap' as const,
        fontFamily: NUNITO,
      }}>
        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
          Resolution trace:
        </span>
        {trace.tokens.map((token, i) => (
          <React.Fragment key={token}>
            <TokenPill text={token} />
            {(i < trace.tokens.length - 1 || trace.resolvedHex) && <TraceArrow />}
          </React.Fragment>
        ))}
        {trace.resolvedHex && <HexPill hex={trace.resolvedHex} />}
      </div>
    )}

  </div>
);
