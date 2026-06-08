import React from 'react';

// ZeroHeight-aligned MDX element overrides for Storybook docs.
// Registered globally via preview.tsx → docs.components.

const brand = '#7849ff';
const borderColor = '#E2E8F0';
const textPrimary = '#1A202C';
const textSecondary = '#4A5568';

export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => (
  <h2
    {...props}
    style={{
      fontSize: '24px',
      fontWeight: 700,
      color: textPrimary,
      margin: '48px 0 12px',
      lineHeight: 1.3,
    }}
  >
    {children}
  </h2>
);

export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => (
  <h3
    {...props}
    style={{
      fontSize: '17px',
      fontWeight: 700,
      color: textPrimary,
      margin: '28px 0 8px',
      lineHeight: 1.4,
    }}
  >
    {children}
  </h3>
);

export const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, ...props }) => (
  <p
    {...props}
    style={{
      fontSize: '14px',
      lineHeight: 1.5,
      color: textPrimary,
      margin: '0 0 3px',
    }}
  >
    {children}
  </p>
);

// Default blockquote → a subtle branded note box (replaces plain left-border quote)
export const Blockquote: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <aside
    style={{
      backgroundColor: '#F5F3FF',
      borderLeft: `3px solid ${brand}`,
      borderRadius: '0 8px 8px 0',
      padding: '10px 14px',
      margin: '12px 0',
      fontSize: '13px',
      color: textSecondary,
      lineHeight: 1.6,
    }}
  >
    {children}
  </aside>
);

export const HR: React.FC<React.HTMLAttributes<HTMLHRElement>> = (props) => (
  <hr
    {...props}
    style={{
      border: 'none',
      borderTop: `1px solid ${borderColor}`,
      margin: '32px 0',
    }}
  />
);

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ children, ...props }) => (
  <div style={{ overflowX: 'auto', margin: '16px 0' }}>
    <table
      {...props}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
        lineHeight: 1.5,
      }}
    >
      {children}
    </table>
  </div>
);

export const TH: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => (
  <th
    {...props}
    style={{
      textAlign: 'left',
      padding: '8px 12px',
      fontSize: '12px',
      fontWeight: 600,
      color: textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </th>
);

export const TD: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => (
  <td
    {...props}
    style={{
      padding: '8px 12px',
      borderBottom: `1px solid ${borderColor}`,
      verticalAlign: 'top',
      color: textPrimary,
    }}
  >
    {children}
  </td>
);

export const Code: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => (
  <code
    {...props}
    style={{
      backgroundColor: '#F1F0FF',
      color: brand,
      borderRadius: '8px',
      padding: '1px 5px',
      fontSize: '0.875em',
    }}
  >
    {children}
  </code>
);
