import React from 'react';

interface LabelProps {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children }) => (
  <div
    style={{
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      color: '#6B7280',
      marginBottom: '8px',
    }}
  >
    {children}
  </div>
);
