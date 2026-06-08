import React from 'react';

export interface StatesGridColumn {
  label: string;
  tooltip?: string;
}

export interface StatesGridCellProps {
  dark?: boolean;
  forceState?: 'hover' | 'active';
  children?: React.ReactNode;
}

export interface StatesGridRowProps {
  label: string;
  children: React.ReactNode;
}

export interface StatesGridProps {
  columns?: Array<string | StatesGridColumn>;
  children: React.ReactNode;
}

const LABEL_COL = '130px';

const TooltipHeader: React.FC<{ label: string; tooltip?: string }> = ({ label, tooltip }) => {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const ref = React.useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      style={{ cursor: tooltip ? 'help' : 'default', display: 'inline-block' }}
      onMouseEnter={() => {
        if (tooltip && ref.current) setRect(ref.current.getBoundingClientRect());
      }}
      onMouseLeave={() => setRect(null)}
    >
      {label}
      {tooltip && rect && (
        <span
          style={{
            position: 'fixed',
            top: rect.top - 8,
            left: rect.left + rect.width / 2,
            transform: 'translate(-50%, -100%)',
            background: '#1A202C',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'none',
            letterSpacing: 'normal',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {tooltip}
        </span>
      )}
    </span>
  );
};

export const StatesGridCell: React.FC<StatesGridCellProps> = ({ dark = false, forceState, children }) => {
  const stateAttr =
    forceState === 'hover'
      ? { 'data-hover': '' }
      : forceState === 'active'
        ? { 'data-active': '' }
        : {};

  return (
    <div
      {...stateAttr}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? '#1a0a3c' : '#ffffff',
        padding: '12px 8px',
        minHeight: '64px',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

export const StatesGridRow: React.FC<StatesGridRowProps> = ({ label, children }) => {
  const cells = React.Children.toArray(children);
  return (
    <tr>
      <td
        style={{
          padding: '0 16px',
          fontSize: '13px',
          fontWeight: 600,
          color: '#374151',
          whiteSpace: 'nowrap',
          borderRight: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
          background: '#F7FAFC',
          verticalAlign: 'middle',
          minWidth: LABEL_COL,
        }}
      >
        {label}
      </td>
      {cells.map((cell, i) => (
        <td
          key={i}
          style={{
            padding: 0,
            borderRight: i < cells.length - 1 ? '1px solid #E2E8F0' : 'none',
            borderBottom: '1px solid #E2E8F0',
            minWidth: '100px',
          }}
        >
          {cell}
        </td>
      ))}
    </tr>
  );
};

const DEFAULT_COLUMNS: StatesGridColumn[] = [
  { label: 'Rest', tooltip: 'The default appearance' },
  { label: 'Hover', tooltip: 'When the user points at the button with the cursor' },
  { label: 'Pressed', tooltip: 'The moment the button is clicked or tapped' },
  { label: 'Loading', tooltip: 'While the system processes the action' },
  { label: 'Disabled', tooltip: 'When the action is unavailable' },
];

export const StatesGrid: React.FC<StatesGridProps> = ({
  columns = DEFAULT_COLUMNS,
  children,
}) => {
  const normalised = columns.map((c) => (typeof c === 'string' ? { label: c } : c));

  return (
    <div
      style={{
        overflowX: 'auto',
        border: '1px solid #E2E8F0',
        borderRadius: '8px',
      }}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontFamily: 'inherit',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: '10px 16px',
                borderRight: '1px solid #E2E8F0',
                background: '#EDF2F7',
                minWidth: LABEL_COL,
              }}
            />
            {normalised.map((col) => (
              <th
                key={col.label}
                style={{
                  padding: '10px 16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.07em',
                  color: '#6B7280',
                  textAlign: 'center' as const,
                  borderRight: '1px solid #E2E8F0',
                  background: '#EDF2F7',
                  minWidth: '100px',
                }}
              >
                <TooltipHeader label={col.label} tooltip={col.tooltip} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
