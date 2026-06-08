import React, { Children, isValidElement, useState, useEffect } from 'react';

export interface DocTabProps {
  label: string;
  children: React.ReactNode;
}

export function DocTab({ children }: DocTabProps) {
  return <>{children}</>;
}

export function DocTabs({ children, links }: { children: React.ReactNode; links?: React.ReactNode }) {
  const [active, setActive] = useState(0);

  // After React commits the new tab's headings, tell the preview-head.html
  // TOC rebuilder to re-scan and rewrite .toc-wrapper.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      document.dispatchEvent(new CustomEvent('penny-tab-change'));
    });
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const tabs = Children.toArray(children).filter(
    (child): child is React.ReactElement<DocTabProps> =>
      isValidElement(child) && typeof (child.props as DocTabProps).label === 'string',
  );

  if (tabs.length === 0) return null;

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Tab strip */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid #E2E8F0',
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.props.label}
            onClick={() => setActive(i)}
            style={{
              padding: '10px 24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: active === i ? 700 : 500,
              color: active === i ? '#6B46C1' : '#718096',
              borderBottom: `2px solid ${active === i ? '#6B46C1' : 'transparent'}`,
              marginBottom: '-2px',
              outline: 'none',
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Links bar — Design tab only */}
      {links && active === 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F7FAFC',
            borderRadius: '8px',
            padding: '12px 24px',
            marginTop: '12px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: '#6B7280',
            }}
          >
            Links
          </span>
          {links}
        </div>
      )}

      {/* Tab panels — only the active tab is rendered so its headings are
          the only ones the TOC scanner picks up */}
      <div style={{ marginTop: '24px' }}>
        {tabs[active]}
      </div>
    </div>
  );
}
