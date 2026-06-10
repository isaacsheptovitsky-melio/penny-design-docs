import React from 'react';

interface VariantCardProps {
  preview: React.ReactNode;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
  /**
   * Stack the preview on top of the text (a single boxed card) instead of the default
   * side-by-side two-column layout. Injected automatically by `<VariantCards vertical>`.
   * The vertical preview surface is white.
   */
  vertical?: boolean;
  /**
   * Use a white preview surface instead of the default light-grey (`#F8F9FA`). Useful when the
   * previewed component already carries its own background (e.g. a Section Banner) and the grey
   * stage would muddy it.
   */
  whitePreview?: boolean;
  /** Minimum width (px) of the preview/component cell in the horizontal layout. @default 150 */
  previewMinWidth?: number;
}

const titleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: '14px',
  fontWeight: 700,
  color: '#111827',
  letterSpacing: '-0.01em',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.65,
  color: '#4A5568',
};

export const VariantCard: React.FC<VariantCardProps> = ({
  preview,
  title,
  children,
  dark = false,
  vertical = false,
  whitePreview = false,
  previewMinWidth = 150,
}) => {
  const previewBg = dark ? '#0F0728' : whitePreview ? '#ffffff' : '#F8F9FA';
  if (vertical) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <div
          style={{
            background: dark ? '#0F0728' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 20px',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          {preview}
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={titleStyle}>{title}</p>
          <div style={bodyStyle}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        background: previewBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 16px',
        minHeight: '100px',
        minWidth: `${previewMinWidth}px`,
        border: '1px solid #E2E8F0',
        borderRight: 'none',
        borderRadius: '8px 0 0 8px',
      }}>
        {preview}
      </div>
      <div style={{
        padding: '20px 24px',
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderLeft: '1px solid #E2E8F0',
        borderRadius: '0 8px 8px 0',
      }}>
        <p style={titleStyle}>
          {title}
        </p>
        <div style={bodyStyle}>
          {children}
        </div>
      </div>
    </>
  );
};

interface VariantCardsProps {
  children: React.ReactNode;
  /**
   * Render the children as vertical cards (preview stacked above text, white background) laid out
   * in a responsive grid, instead of the default stacked two-column rows. Propagates `vertical`
   * to each `VariantCard`.
   */
  vertical?: boolean;
  /** Minimum width (px) of each card before the grid wraps, in `vertical` mode. @default 240 */
  minItemWidth?: number;
}

export const VariantCards: React.FC<VariantCardsProps> = ({ children, vertical = false, minItemWidth = 240 }) => {
  if (vertical) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
          gap: '12px',
          marginBottom: '8px',
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<VariantCardProps>, { vertical: true })
            : child
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', rowGap: '12px', marginBottom: '8px' }}>
      {children}
    </div>
  );
};
