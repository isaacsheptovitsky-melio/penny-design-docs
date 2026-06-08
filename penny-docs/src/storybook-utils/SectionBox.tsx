import React from 'react';

interface SectionBoxProps {
  title: string;
  children: React.ReactNode;
}

export const SectionBox: React.FC<SectionBoxProps> = ({ title, children }) => (
  <div
    style={{
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      marginTop: '16px',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        fontSize: '12px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: '#6B7280',
        padding: '10px 16px',
        borderBottom: '1px solid #E2E8F0',
        background: '#F7FAFC',
      }}
    >
      {title}
    </div>
    {children}
  </div>
);
