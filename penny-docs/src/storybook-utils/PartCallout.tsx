import React from 'react';

/**
 * PartCallout
 *
 * A vertical annotation connecting a rendered element to its token path or
 * part name.
 *
 * placement="below" (default):          placement="above":
 *   [component]                           label ← floats above component
 *        ● ← dot on bottom edge             │
 *        │                                  ● ← dot on component's top edge
 *   label                              [ component — back layer ]
 *
 * "above" uses absolute positioning so the annotation overlays the component:
 * the component fills the background, the dot/line/label are the top layer.
 * paddingTop on the wrapper creates space for the label + line above the
 * component without displacing it.
 *
 * "below" (default) uses a simple flex column — suitable for constrained
 * card panels (e.g. CascadeDiagram visual panels).
 *
 * ── Usage ───────────────────────────────────────────────────────────────
 *
 *   // Annotation overlaid on top of component
 *   <PartCallout label="button.primary.bg" placement="above">
 *     <Button label="Button" variant="primary" />
 *   </PartCallout>
 *
 *   // Annotation below (default)
 *   <PartCallout label="button.primary.bg">
 *     <MyElement />
 *   </PartCallout>
 */

export interface PartCalloutProps {
  /** Token path or part name shown as the label. */
  label: string;
  /** Height of the connecting line in px. Default: 16. */
  lineHeight?: number;
  /**
   * Background colour of the panel the callout sits on.
   * Used for the dot's halo border so it reads cleanly against any bg.
   * Default: '#F8F9FA'.
   */
  panelBg?: string;
  /**
   * 'below' (default) — annotation stacked below the component (flex column).
   * 'above' — annotation overlaid on top; component is the back layer.
   */
  placement?: 'below' | 'above';
  children: React.ReactNode;
}

const MONO = '"SFMono-Regular", Consolas, monospace';
const LABEL_HEIGHT = 14; // 10px font + 4px gap to line

export const PartCallout: React.FC<PartCalloutProps> = ({
  label,
  lineHeight = 16,
  panelBg = '#F8F9FA',
  placement = 'below',
  children,
}) => {
  if (placement === 'above') {
    const annotationHeight = LABEL_HEIGHT + lineHeight;

    return (
      <div style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: `${annotationHeight}px`,
      }}>
        {/* Component — back layer */}
        {children}

        {/* Label — top of annotation overlay */}
        <span style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: MONO,
          fontSize: '10px',
          color: '#6B7280',
          whiteSpace: 'nowrap' as const,
          textAlign: 'center' as const,
          zIndex: 1,
          pointerEvents: 'none' as const,
        }}>
          {label}
        </span>

        {/* Line — connects label to dot */}
        <div style={{
          position: 'absolute',
          top: `${LABEL_HEIGHT}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: `${lineHeight}px`,
          background: '#D1D5DB',
          zIndex: 1,
          pointerEvents: 'none' as const,
        }} />

        {/* Dot — sits on the component's top edge */}
        <div style={{
          position: 'absolute',
          top: `${annotationHeight - 2}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: '#9CA3AF',
          border: `1px solid ${panelBg}`,
          zIndex: 2,
          pointerEvents: 'none' as const,
        }} />
      </div>
    );
  }

  // placement="below" — original flex column layout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}

      <div style={{
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#9CA3AF',
        border: `1px solid ${panelBg}`,
        marginTop: '-2px',
        flexShrink: 0,
      }} />

      <div style={{ width: '1px', height: `${lineHeight}px`, background: '#D1D5DB' }} />

      <span style={{
        fontFamily: MONO,
        fontSize: '10px',
        color: '#6B7280',
        marginTop: '4px',
        textAlign: 'center' as const,
      }}>
        {label}
      </span>
    </div>
  );
};
