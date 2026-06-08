import React from 'react';

/**
 * VariantGrid — a consolidated alternative to `VariantCards`.
 *
 * Use it when variants are self-explanatory and don't each need a paragraph of side text. Instead
 * of stacking two-column cards, it spreads the previews evenly across the grid (items are not
 * individually boxed), each with a small label underneath — the same shape as the IconButton
 * "Sizes" row. Reach for `VariantCards` when each variant needs its own rationale; reach for
 * `VariantGrid` when you just want to show them all at a glance.
 *
 * **Surface**: by default the grid draws *no* surface of its own — it inherits whatever contains
 * it. In a docs page the `<Canvas>` already provides the white preview surface, so a self-drawn
 * box would double-wrap. Pass `surface` to draw a white card when using the grid standalone (e.g.
 * inline in MDX). Pass `dark` for a set of `*-inverse` variants — that always draws a dark surface
 * (inverse variants need a dark backdrop to read) and lightens the labels.
 *
 * @example
 * // In a Canvas-rendered story — no surface, the Canvas is the white container:
 * <VariantGrid>
 *   <VariantGridItem label="Primary"><IconButton icon="add" variant="primary" aria-label="Add" /></VariantGridItem>
 * </VariantGrid>
 *
 * // Standalone (inline MDX) — draw the white card; inverse set on a dark card:
 * <VariantGrid surface>…</VariantGrid>
 * <VariantGrid dark>…</VariantGrid>
 */

interface VariantGridItemProps {
  /** The label shown beneath the preview. */
  label: string;
  /** Injected by `VariantGrid` from its `dark` prop — lightens the label on a dark surface. */
  dark?: boolean;
  /** The live component preview. */
  children: React.ReactNode;
}

export const VariantGridItem: React.FC<VariantGridItemProps> = ({ label, dark = false, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    {children}
    <span
      style={{
        fontSize: '11px',
        fontWeight: 600,
        color: dark ? '#CBD5E1' : '#6B7280',
        textAlign: 'center',
        lineHeight: 1.3,
      }}
    >
      {label}
    </span>
  </div>
);

interface VariantGridProps {
  children: React.ReactNode;
  /** Draw a white card surface around the grid. Use when standalone (e.g. inline MDX); omit inside a `<Canvas>`, which already provides the surface. @default false */
  surface?: boolean;
  /** Draw a dark surface around the grid — for a set of `*-inverse` variants. Implies a surface. @default false */
  dark?: boolean;
  /** Minimum width (px) of each item before the grid wraps to a new row. @default 120 */
  minItemWidth?: number;
}

export const VariantGrid: React.FC<VariantGridProps> = ({
  children,
  surface = false,
  dark = false,
  minItemWidth = 120,
}) => {
  const grid = (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
        gap: '20px',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      {/* Propagate the grid's `dark` to each item so labels stay legible on the dark surface. */}
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<VariantGridItemProps>, { dark }) : child
      )}
    </div>
  );

  // No own surface by default — inherit the container (e.g. the Canvas's white preview surface).
  // A dark grid always needs its own dark backdrop; a standalone grid opts in via `surface`.
  if (!surface && !dark) return grid;

  return (
    <div
      style={{
        background: dark ? '#0F0728' : '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        padding: '28px 24px',
      }}
    >
      {grid}
    </div>
  );
};
