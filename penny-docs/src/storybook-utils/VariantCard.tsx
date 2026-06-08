import React from 'react';

interface VariantCardProps {
  preview: React.ReactNode;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}

export const VariantCard: React.FC<VariantCardProps> = ({ preview, title, children, dark = false }) => (
  <>
    <div style={{
      background: dark ? '#0F0728' : '#F8F9FA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '28px 16px',
      minHeight: '100px',
      minWidth: '150px',
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
      <p style={{
        margin: '0 0 8px',
        fontSize: '14px',
        fontWeight: 700,
        color: '#111827',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </p>
      <div style={{
        fontSize: '13px',
        lineHeight: 1.65,
        color: '#4A5568',
      }}>
        {children}
      </div>
    </div>
  </>
);

interface VariantCardsProps {
  children: React.ReactNode;
}

export const VariantCards: React.FC<VariantCardsProps> = ({ children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', rowGap: '12px', marginBottom: '8px' }}>
    {children}
  </div>
);
