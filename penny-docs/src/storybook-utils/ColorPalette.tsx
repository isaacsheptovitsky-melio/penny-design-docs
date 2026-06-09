import React from 'react';

// ─── Swatch ──────────────────────────────────────────────────────────────────

export interface SwatchData {
  step: string;
  hex: string;
}

const CHECKER_BG = [
  'linear-gradient(45deg, #dee2e6 25%, transparent 25%)',
  'linear-gradient(-45deg, #dee2e6 25%, transparent 25%)',
  'linear-gradient(45deg, transparent 75%, #dee2e6 75%)',
  'linear-gradient(-45deg, transparent 75%, #dee2e6 75%)',
].join(', ');

function isAlpha(hex: string): boolean {
  return hex.startsWith('rgba(');
}

export const ColorSwatch: React.FC<SwatchData> = ({ step, hex }) => {
  const alpha = isAlpha(hex);
  return (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        background: '#fff',
        minWidth: 0,
      }}
    >
      <div
        style={{
          height: '52px',
          background: alpha
            ? CHECKER_BG + `, ${hex}`
            : hex,
          backgroundSize: alpha ? '10px 10px, 10px 10px, 10px 10px, 10px 10px, auto' : 'auto',
          backgroundPosition: alpha
            ? '0 0, 0 5px, 5px -5px, -5px 0, 0 0'
            : 'auto',
          // white swatches get a border so they're visible
          outline: hex.toLowerCase() === '#ffffff' ? '1px solid #E2E8F0' : 'none',
          outlineOffset: '-1px',
        }}
      />
      <div style={{ padding: '6px 8px' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#18191b',
            lineHeight: 1.2,
          }}
        >
          {step}
        </div>
        <div
          style={{
            fontSize: '10px',
            color: '#8B95A9',
            marginTop: '2px',
            lineHeight: 1.3,
            wordBreak: 'break-all' as const,
          }}
        >
          {hex}
        </div>
      </div>
    </div>
  );
};

// ─── Palette group ────────────────────────────────────────────────────────────

export interface PaletteGroupProps {
  name: string;
  swatches: SwatchData[];
  /** Render on a dark background (used for alpha/inverse swatches) */
  dark?: boolean;
}

export const ColorPaletteGroup: React.FC<PaletteGroupProps> = ({
  name,
  swatches,
  dark,
}) => (
  <div style={{ marginBottom: '20px' }}>
    <div
      style={{
        fontSize: '12px',
        fontWeight: 700,
        color: '#6B7280',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.07em',
        marginBottom: '8px',
      }}
    >
      {name}
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '6px',
        background: dark ? '#18191b' : 'transparent',
        padding: dark ? '12px' : '0',
        borderRadius: dark ? '8px' : '0',
      }}
    >
      {swatches.map((s) => (
        <ColorSwatch key={s.step} step={s.step} hex={s.hex} />
      ))}
    </div>
  </div>
);

// ─── Semantic token table ─────────────────────────────────────────────────────

export interface SemanticTokenRow {
  token: string;
  globalRef: string;
  hex: string;
}

export interface SemanticTokenTableProps {
  title: string;
  rows: SemanticTokenRow[];
  dark?: boolean;
}

export const SemanticTokenTable: React.FC<SemanticTokenTableProps> = ({
  title,
  rows,
  dark,
}) => (
  <div style={{ marginBottom: '24px' }}>
    <div
      style={{
        fontSize: '13px',
        fontWeight: 700,
        color: '#374151',
        marginBottom: '8px',
      }}
    >
      {title}
    </div>
    <div
      style={{
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
        overflow: 'hidden',
        background: dark ? '#1a0a3c' : '#fff',
      }}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontFamily: 'inherit',
          fontSize: '12px',
        }}
      >
        <thead>
          <tr style={{ background: dark ? '#0d0520' : '#EDF2F7' }}>
            <th
              style={{
                padding: '8px 14px',
                textAlign: 'left' as const,
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.07em',
                color: dark ? '#b79eff' : '#6B7280',
                borderRight: '1px solid #E2E8F0',
                width: '45%',
              }}
            >
              Token
            </th>
            <th
              style={{
                padding: '8px 14px',
                textAlign: 'left' as const,
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.07em',
                color: dark ? '#b79eff' : '#6B7280',
                borderRight: '1px solid #E2E8F0',
                width: '35%',
              }}
            >
              Global token
            </th>
            <th
              style={{
                padding: '8px 14px',
                textAlign: 'left' as const,
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.07em',
                color: dark ? '#b79eff' : '#6B7280',
              }}
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.token}>
              <td
                style={{
                  padding: '8px 14px',
                  borderRight: '1px solid #E2E8F0',
                  borderBottom:
                    i < rows.length - 1 ? '1px solid #E2E8F0' : 'none',
                  fontFamily: '"SFMono-Regular", Consolas, monospace',
                  color: dark ? '#e4e7ec' : '#18191b',
                  fontSize: '12px',
                }}
              >
                {row.token}
              </td>
              <td
                style={{
                  padding: '8px 14px',
                  borderRight: '1px solid #E2E8F0',
                  borderBottom:
                    i < rows.length - 1 ? '1px solid #E2E8F0' : 'none',
                  fontFamily: '"SFMono-Regular", Consolas, monospace',
                  color: dark ? '#c3cad5' : '#646F87',
                  fontSize: '12px',
                }}
              >
                {row.globalRef}
              </td>
              <td
                style={{
                  padding: '8px 14px',
                  borderBottom:
                    i < rows.length - 1 ? '1px solid #E2E8F0' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      background: row.hex,
                      border: '1px solid rgba(0,0,0,0.1)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"SFMono-Regular", Consolas, monospace',
                      color: dark ? '#c3cad5' : '#646F87',
                      fontSize: '11px',
                    }}
                  >
                    {row.hex}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
