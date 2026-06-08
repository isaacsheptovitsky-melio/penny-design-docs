import React from 'react';

interface RelatedComponentProps {
  /** The component name shown in the card footer. */
  name: string;
  /** The docs page URL the card links to (relative for internal Storybook docs). */
  url: string;
  /** A live preview of the component, rendered in the card's preview area. */
  preview: React.ReactNode;
  /** Renders the preview area on a dark background (for inverse components). */
  dark?: boolean;
}

interface RelatedComponentsProps {
  children: React.ReactNode;
}

/**
 * A single related-component card: a live preview on top, the component name below,
 * with the whole card linking to that component's docs page.
 */
export const RelatedComponent: React.FC<RelatedComponentProps> = ({ name, url, preview, dark = false }) => {
  const isInternal = url.startsWith('/') || url.startsWith('#');

  return (
    <a
      href={url}
      {...(!isInternal && { target: '_blank', rel: 'noopener noreferrer' })}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#FFFFFF',
        textDecoration: 'none',
        color: '#1A202C',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#7849ff';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px #F5F3FF';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '160px',
          padding: '24px',
          background: dark ? '#0F0728' : '#F8F9FA',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        {preview}
      </div>
      <div
        style={{
          padding: '14px 16px',
          background: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 700,
          color: '#111827',
        }}
      >
        {name}
      </div>
    </a>
  );
};

/**
 * Grid of related-component cards. Use under a `## Related components` heading to
 * link out to sibling components with a live preview of each.
 */
export const RelatedComponents: React.FC<RelatedComponentsProps> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      marginTop: '16px',
    }}
  >
    {children}
  </div>
);
