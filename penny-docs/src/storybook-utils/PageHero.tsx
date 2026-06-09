import React from 'react';

interface PageHeroProps {
  category: string;
  title: string;
  description: string;
  badge?: string;
  /** Classification pill shown next to the title, e.g. "Pattern". Distinct from the status `badge`. */
  type?: string;
  figmaUrl?: string;
}

const badge_colors: Record<string, { bg: string; text: string }> = {
  Done:         { bg: '#DCFCE7', text: '#15803D' },
  Healthy:      { bg: '#DCFCE7', text: '#15803D' },
  Beta:         { bg: '#FEF9C3', text: '#A16207' },
  Deprecated:   { bg: '#FEE2E2', text: '#B91C1C' },
  Experimental: { bg: '#F3E8FF', text: '#7C3AED' },
};

export const PageHero: React.FC<PageHeroProps> = ({ category, title, description, badge, type }) => {
  const badgeStyle = badge ? (badge_colors[badge] ?? { bg: '#F1F5F9', text: '#475569' }) : null;

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Breadcrumb */}
      <div style={{
        fontSize: '13px',
        fontWeight: 500,
        color: '#F97316',
        marginBottom: '10px',
        letterSpacing: '0.01em',
      }}>
        🗂️ {category}
      </div>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <h1 style={{
          fontSize: '40px',
          fontWeight: 800,
          lineHeight: 1.15,
          color: '#111827',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>
        {type && (
          <span style={{
            backgroundColor: '#F1F5F9',
            color: '#64748B',
            fontSize: '13px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
          }}>
            {type}
          </span>
        )}
        {badge && badgeStyle && (
          <span style={{
            backgroundColor: badgeStyle.bg,
            color: badgeStyle.text,
            fontSize: '13px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
          }}>
            {badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '20px',
        lineHeight: 1.55,
        color: '#475569',
        margin: 0,
        maxWidth: '680px',
      }}>
        {description}
      </p>
    </div>
  );
};
