import React from 'react';

interface StateItemProps {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}

const StateItem: React.FC<StateItemProps> = ({ label, children, dark = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? '#0F0728' : '#F8F9FA',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '20px 24px',
      minWidth: '120px',
      minHeight: '72px',
    }}>
      {children}
    </div>
    <span style={{
      fontSize: '12px',
      fontWeight: 500,
      color: '#6B7280',
      letterSpacing: '0.01em',
    }}>
      {label}
    </span>
  </div>
);

interface StateRowProps {
  label: string;
  children: React.ReactNode;
}

export const StateRow: React.FC<StateRowProps> = ({ label, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <p style={{
      fontSize: '13px',
      fontWeight: 600,
      color: '#374151',
      margin: '0 0 12px',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    }}>
      {label}
    </p>
    <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    }}>
      {children}
    </div>
  </div>
);

export const StateCell = StateItem;
