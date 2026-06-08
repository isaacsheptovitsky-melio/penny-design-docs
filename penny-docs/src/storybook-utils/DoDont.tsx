import React from 'react';

interface DoDontItemProps {
  type: 'do' | 'dont';
  title: string;
  description?: string;
  preview: React.ReactNode;
  imagePreview?: boolean;
}

export interface DoDontProps {
  items: [DoDontItemProps, DoDontItemProps];
  /**
   * Background of the preview area. Defaults to the subtle grey `#F8F9FA`; use
   * `'white'` when the component rendered inside needs a white backdrop.
   */
  previewBg?: 'subtle' | 'white';
}

const BORDER = '1px solid #E2E8F0';

export const DoDont: React.FC<DoDontProps> = ({ items, previewBg = 'subtle' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto 1fr', gap: '0 16px' }}>
    {/* Row 1: headers — same grid row guarantees equal height */}
    {items.map((item, i) => (
      <div key={`h-${i}`} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '12px 16px',
        background: '#FFFFFF',
        border: BORDER,
        borderRadius: '8px 8px 0 0',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '3px 10px',
          borderRadius: '20px',
          background: item.type === 'do' ? '#DCFCE7' : '#FEE2E2',
          color: item.type === 'do' ? '#16A34A' : '#DC2626',
          fontSize: '13px',
          fontWeight: 600,
          flexShrink: 0,
          marginTop: '1px',
        }}>
          {item.type === 'do' ? '✓' : '✗'}&nbsp;{item.type === 'do' ? 'Do' : "Don't"}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>
            {item.title}
          </p>
          {item.description && (
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>
              {item.description}
            </p>
          )}
        </div>
      </div>
    ))}

    {/* Row 2: previews */}
    {items.map((item, i) => (
      item.imagePreview ? (
        <div key={`p-${i}`} style={{ border: BORDER, borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
          {item.preview}
        </div>
      ) : (
        <div key={`p-${i}`} style={{
          background: previewBg === 'white' ? '#FFFFFF' : '#F8F9FA',
          border: BORDER,
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '40px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '160px',
        }}>
          {item.preview}
        </div>
      )
    ))}
  </div>
);
