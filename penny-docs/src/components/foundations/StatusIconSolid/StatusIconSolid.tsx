import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Solid status icon — a filled, semantically-colored circle with a white glyph.
 *
 * This is a self-contained docs reimplementation of Penny's `StatusIconSolid`. It keeps
 * the same public API (`variant`, `size`) but renders inline SVG rather than going through
 * the library's `_BaseIcon` / icon-loading machinery (which depends on `react-inlinesvg`,
 * not installed here) — mirroring how this project already reimplements `Icon`.
 */
export type StatusIconSolidVariant =
  | 'alert'
  | 'success'
  | 'warning'
  | 'informative'
  | 'help'
  | 'pending'
  | 'scheduled'
  | 'processing'
  | 'issues'
  | 'cancel'
  | 'decline';

export type StatusIconSolidSize = 'small' | 'medium' | 'large' | 'extra-large';

export type StatusIconSolidProps = {
  variant: StatusIconSolidVariant;
  size?: StatusIconSolidSize;
  isInverse?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

const SIZE_PX: Record<StatusIconSolidSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  'extra-large': 32,
};

// Resolved semantic.icon.* token values
const COLOR: Record<StatusIconSolidVariant, string> = {
  alert: '#d80e25',
  cancel: '#d80e25',
  decline: '#d80e25',
  success: '#028838',
  warning: '#fdb702',
  pending: '#fdb702',
  informative: '#306af7',
  scheduled: '#306af7',
  help: '#18191b',
  processing: '#18191b',
  issues: '#18191b',
};

const BANG: ReactNode = (
  <>
    <rect x="11" y="6" width="2" height="7" rx="1" fill="#fff" />
    <circle cx="12" cy="16.6" r="1.25" fill="#fff" />
  </>
);

const GLYPH: Record<StatusIconSolidVariant, ReactNode> = {
  alert: BANG,
  cancel: BANG,
  decline: BANG,
  warning: BANG,
  pending: BANG,
  success: (
    <path
      d="M7.7 12.3l2.8 2.8 5.8-6.1"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  informative: (
    <>
      <circle cx="12" cy="7.6" r="1.3" fill="#fff" />
      <rect x="11" y="10.4" width="2" height="6.6" rx="1" fill="#fff" />
    </>
  ),
  scheduled: (
    <>
      <circle cx="12" cy="7.6" r="1.3" fill="#fff" />
      <rect x="11" y="10.4" width="2" height="6.6" rx="1" fill="#fff" />
    </>
  ),
  processing: (
    <>
      <circle cx="12" cy="7.6" r="1.3" fill="#fff" />
      <rect x="11" y="10.4" width="2" height="6.6" rx="1" fill="#fff" />
    </>
  ),
  issues: (
    <>
      <circle cx="12" cy="7.6" r="1.3" fill="#fff" />
      <rect x="11" y="10.4" width="2" height="6.6" rx="1" fill="#fff" />
    </>
  ),
  help: (
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="13"
      fontWeight="700"
      fill="#fff"
      fontFamily="'Nunito Sans', sans-serif"
    >
      ?
    </text>
  ),
};

export const StatusIconSolid = forwardRef<HTMLSpanElement, StatusIconSolidProps>(
  ({ variant, size = 'medium', isInverse, isDisabled, isReadOnly, style, ...rest }, ref) => {
    const px = SIZE_PX[size] ?? SIZE_PX.medium;
    const wrapperStyle: CSSProperties = { display: 'inline-flex', flexShrink: 0, lineHeight: 0, ...style };

    return (
      <span ref={ref} data-component="StatusIconSolid" style={wrapperStyle} {...rest}>
        <svg width={px} height={px} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="12" fill={COLOR[variant]} />
          {GLYPH[variant]}
        </svg>
      </span>
    );
  }
);

StatusIconSolid.displayName = 'StatusIconSolid';
