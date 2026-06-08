import React, { useState } from 'react';
import ReactSVG from 'react-inlinesvg';
import { Storybook } from 'storybook-utils';

export const EmptyState = ({ assetType, directory }: { assetType: string; directory: string }) => (
  <Storybook.Container>
    <Storybook.ContentPlaceholder label={`No ${assetType} Found`} height="200px" backgroundColor="global.neutral.100" />
    <div style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>
      <p>
        Add SVG files to <code>{directory}</code> and run <code>npm run codegen</code>
      </p>
    </div>
  </Storybook.Container>
);

export const AssetCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ textAlign: 'center', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
    {children}
  </div>
);

AssetCard.ImageContainer = ({
  children,
  height = '60px',
  backgroundColor = 'transparent',
}: {
  children: React.ReactNode;
  height?: string;
  backgroundColor?: 'transparent' | 'dark';
}) => (
  <div
    style={{
      marginBottom: '12px',
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor === 'dark' ? '#1a1a1a' : 'transparent',
      borderRadius: '4px',
      padding: '8px',
    }}
  >
    {children}
  </div>
);

AssetCard.Image = ({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) => (
  <img
    src={src}
    alt={alt}
    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...style }}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.style.display = 'none';
      const parent = target.parentElement;
      if (parent) {
        parent.innerHTML = '<div style="color: #999; font-size: 12px;">Missing Image</div>';
      }
    }}
  />
);

const IllustrationImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div style={{ color: '#999', fontSize: '12px' }}>Missing Image</div>;
  }

  return (
    <ReactSVG src={src} style={{ maxWidth: '100%', maxHeight: '100%' }} onError={() => setHasError(true)} title={alt} />
  );
};

AssetCard.IllustrationImage = IllustrationImage;

AssetCard.Label = ({ children }: { children: React.ReactNode }) => <Storybook.Code label={children as string} />;
