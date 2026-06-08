import React from 'react';
import pennySymbol from '@/assets/penny-symbol-black.png';

interface ShortcutTileProps {
  label: string;
  url: string;
}

interface ShortcutTilesProps {
  children: React.ReactNode;
}

// Penny brand mark — shown for internal Storybook links (relative URLs)
const PennyIcon = () => (
  <img src={pennySymbol} width={20} height={20} alt="" style={{ display: 'block' }} />
);

export const ShortcutTile: React.FC<ShortcutTileProps> = ({ label, url }) => {
  const isInternal = url.startsWith('/') || url.startsWith('#');

  let faviconSrc: string | null = null;
  if (!isInternal) {
    try {
      const domain = new URL(url).hostname;
      faviconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      // unparseable URL — no icon
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        background: '#FFFFFF',
        color: '#1A202C',
        fontSize: '14px',
        fontWeight: 500,
        textDecoration: 'none',
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
      {isInternal && <PennyIcon />}
      {!isInternal && faviconSrc && <img src={faviconSrc} width={20} height={20} alt="" style={{ display: 'block', borderRadius: '4px' }} />}
      {label}
    </a>
  );
};

export const ShortcutTiles: React.FC<ShortcutTilesProps> = ({ children }) => (
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {children}
  </div>
);
