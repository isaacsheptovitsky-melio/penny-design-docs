import React from 'react';

const RULE = '#D80E25';

const LABEL: React.CSSProperties = {
  fontFamily: '"SFMono-Regular", Consolas, monospace',
  fontSize: '10px',
  color: RULE,
  whiteSpace: 'nowrap',
  lineHeight: 1,
};

export interface MeasuredGapProps {
  /** Gap size in px. */
  size: number;
  /** Direction of the gap. @default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * A spacer of exactly `size`px that renders a dimension bracket measuring the gap, with the px
 * value beside it — for "spacing in context" examples.
 *
 * - **vertical** — place between stacked elements. The bracket sits in a left gutter, so give the
 *   surrounding example container left padding (~64px) so the label stays inside the box.
 * - **horizontal** — place between inline elements. The bracket drops below the gap.
 */
export const MeasuredGap: React.FC<MeasuredGapProps> = ({ size, orientation = 'vertical' }) => {
  if (orientation === 'horizontal') {
    return (
      <span style={{ position: 'relative', display: 'inline-block', width: `${size}px`, alignSelf: 'stretch' }}>
        <span
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            pointerEvents: 'none',
          }}
        >
          <span style={{ position: 'relative', display: 'block', width: `${size}px`, height: '5px' }}>
            <span style={{ position: 'absolute', top: '2px', left: 0, right: 0, height: '1px', background: RULE }} />
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: RULE }} />
            <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', background: RULE }} />
          </span>
          <span style={LABEL}>{size}px</span>
        </span>
      </span>
    );
  }

  return (
    <div style={{ position: 'relative', height: `${size}px` }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 'calc(100% + 10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
        }}
      >
        <span style={LABEL}>{size}px</span>
        {/* dimension bracket: vertical line spanning the gap + a tick at each end */}
        <div style={{ position: 'relative', width: '5px', alignSelf: 'stretch' }}>
          <div style={{ position: 'absolute', left: '2px', top: 0, bottom: 0, width: '1px', background: RULE }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '1px', background: RULE }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '1px', background: RULE }} />
        </div>
      </div>
    </div>
  );
};
