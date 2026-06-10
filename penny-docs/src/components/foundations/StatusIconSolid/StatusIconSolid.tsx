import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Solid status icon — a filled, semantically-colored icon that frames the status of a piece of
 * content (typically a modal header).
 *
 * This is a self-contained docs reimplementation of Penny's `StatusIconSolid`. The real component
 * renders through `_BaseIcon` → the CDN icon loader (`react-inlinesvg`, not installed here), so —
 * like `Icon` — this version inlines the real icon SVG paths and tints them with the variant's
 * resolved `semantic.icon.*` color (`StatusIconSolid.theme.utils` `ColorStyle`). Each variant maps
 * to the same Penny icon the real component uses (`statusIconSolidType`).
 */
export type StatusIconSolidVariant =
  | 'pending'
  | 'warning'
  | 'success'
  | 'informative'
  | 'scheduled'
  | 'processing'
  | 'help'
  | 'issues'
  | 'cancel'
  | 'decline'
  | 'alert';

export type StatusIconSolidSize = 'small' | 'medium' | 'large' | 'extra-large';

export type StatusIconSolidProps = {
  variant: StatusIconSolidVariant;
  size?: StatusIconSolidSize;
  isInverse?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

// theme/icons iconSizeMapping (small/medium/large/extra-large)
const SIZE_PX: Record<StatusIconSolidSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
  'extra-large': 40,
};

// Resolved semantic.icon.* token values per StatusIconSolid.theme.utils ColorStyle
const ICON_WARNING = '#fdb702';
const ICON_SUCCESS = '#028838';
const ICON_INFORMATIVE = '#306af7';
const ICON_PRIMARY = '#18191b';
const ICON_CRITICAL = '#d80e25';

const COLOR: Record<StatusIconSolidVariant, string> = {
  pending: ICON_WARNING,
  warning: ICON_WARNING,
  success: ICON_SUCCESS,
  informative: ICON_INFORMATIVE,
  scheduled: ICON_INFORMATIVE,
  processing: ICON_PRIMARY,
  help: ICON_PRIMARY,
  issues: ICON_PRIMARY,
  cancel: ICON_CRITICAL,
  decline: ICON_CRITICAL,
  alert: ICON_CRITICAL,
};

// Real Penny icon SVGs (currentColor); warning/pending are 40×40 with a literal-black glyph,
// the rest are 24×24 single-color knockout glyphs.
const ICON: Record<StatusIconSolidVariant, { viewBox: string; body: ReactNode }> = {
  warning: {
    viewBox: '0 0 40 40',
    body: (
      <>
        <path
          d="M20.2225 3.3335H19.8094C19.4086 3.33276 19.0143 3.45715 18.6639 3.69486C18.3135 3.93256 18.0187 4.27569 17.8075 4.69166L3.6988 32.2623C3.4608 32.7207 3.3341 33.2522 3.33337 33.795C3.33335 34.1754 3.3952 34.552 3.51536 34.903C3.63551 35.2539 3.81156 35.5722 4.03329 35.8394C4.25502 36.1065 4.51801 36.3172 4.80698 36.4592C5.09595 36.6012 5.40514 36.6717 5.7166 36.6666H34.3153C34.9389 36.6666 35.537 36.364 35.978 35.8255C36.419 35.287 36.6667 34.5566 36.6667 33.795C36.666 33.2522 36.5393 32.7207 36.3013 32.2623L22.2244 4.69166C22.0132 4.27569 21.7184 3.93256 21.368 3.69486C21.0176 3.45715 20.6233 3.33276 20.2225 3.3335Z"
          fill="currentColor"
        />
        <path
          d="M18.3334 23.3335C18.3334 24.254 19.0796 25.0002 20 25.0002C20.9205 25.0002 21.6667 24.254 21.6667 23.3335V15.0002C21.6667 14.0797 20.9205 13.3335 20 13.3335C19.0796 13.3335 18.3334 14.0797 18.3334 15.0002V23.3335Z"
          fill="black"
        />
        <path
          d="M18.3334 28.3335C18.3334 27.413 19.0796 26.6668 20 26.6668C20.9205 26.6668 21.6667 27.413 21.6667 28.3335C21.6667 29.254 20.9205 30.0002 20 30.0002C19.0796 30.0002 18.3334 29.254 18.3334 28.3335Z"
          fill="black"
        />
      </>
    ),
  },
  pending: {
    viewBox: '0 0 40 40',
    body: (
      <>
        <circle cx="20" cy="19.9998" r="18.3333" fill="currentColor" />
        <path
          d="M17.5 13.3332C17.5 12.4127 16.7538 11.6665 15.8333 11.6665C14.9128 11.6665 14.1666 12.4127 14.1666 13.3332V26.6665C14.1666 27.587 14.9128 28.3332 15.8333 28.3332C16.7538 28.3332 17.5 27.587 17.5 26.6665L17.5 13.3332Z"
          fill="black"
        />
        <path
          d="M25.8333 13.3332C25.8333 12.4127 25.0871 11.6665 24.1666 11.6665C23.2462 11.6665 22.5 12.4127 22.5 13.3332L22.5 26.6665C22.5 27.587 23.2462 28.3332 24.1666 28.3332C25.0871 28.3332 25.8333 27.587 25.8333 26.6665L25.8333 13.3332Z"
          fill="black"
        />
      </>
    ),
  },
  success: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7809 9.62473C17.1259 9.19347 17.056 8.56418 16.6247 8.21917C16.1934 7.87416 15.5641 7.94408 15.2191 8.37534L11.0948 13.5307L8.68394 11.2705C8.28103 10.8928 7.6482 10.9132 7.27047 11.3161C6.89274 11.719 6.91315 12.3518 7.31606 12.7296L10.5161 15.7296C10.7195 15.9203 10.9933 16.0174 11.2714 15.9975C11.5495 15.9776 11.8067 15.8425 11.9809 15.6247L16.7809 9.62473Z"
        fill="currentColor"
      />
    ),
  },
  informative: {
    viewBox: '0 0 24 24',
    body: (
      <path
        d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11V16ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z"
        fill="currentColor"
      />
    ),
  },
  scheduled: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path
          d="M7.52797 1C6.97225 1 6.52175 1.44999 6.52175 2.00508C6.52175 2.56017 6.97225 3.01016 7.52797 3.01016H16.4721C17.0278 3.01016 17.4783 2.56017 17.4783 2.00508C17.4783 1.44999 17.0278 1 16.4721 1H7.52797Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23C16.9706 23 21 18.9751 21 14.0102C21 9.04521 16.9706 5.02032 12 5.02032C7.02944 5.02032 3 9.04521 3 14.0102C3 18.9751 7.02944 23 12 23ZM11.9999 8.81685C12.5556 8.81685 13.0061 9.26684 13.0061 9.82193V13.0048H15.354C15.9097 13.0048 16.3602 13.4548 16.3602 14.0098C16.3602 14.5649 15.9097 15.0149 15.354 15.0149H11.9999C11.4442 15.0149 10.9937 14.5649 10.9937 14.0098V9.82193C10.9937 9.26684 11.4442 8.81685 11.9999 8.81685Z"
          fill="currentColor"
        />
      </>
    ),
  },
  processing: {
    viewBox: '0 0 24 24',
    body: (
      <path
        d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM5 13C4.45 13 4 12.55 4 12C4 11.45 4.45 11 5 11C5.55 11 6 11.45 6 12C6 12.55 5.55 13 5 13ZM9 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H9C9.55 11 10 11.45 10 12C10 12.55 9.55 13 9 13ZM19.71 12.71L16.71 15.71C16.51 15.91 16.26 16 16 16C15.74 16 15.49 15.9 15.29 15.71C14.9 15.32 14.9 14.69 15.29 14.3L16.58 13.01H11.99C11.44 13.01 10.99 12.56 10.99 12.01C10.99 11.46 11.44 11.01 11.99 11.01H16.58L15.29 9.72C14.9 9.33 14.9 8.7 15.29 8.31C15.68 7.92 16.31 7.92 16.7 8.31L19.7 11.31C19.79 11.4 19.87 11.51 19.92 11.64C20.02 11.88 20.02 12.16 19.92 12.4C19.87 12.52 19.8 12.63 19.7 12.73L19.71 12.71Z"
        fill="currentColor"
      />
    ),
  },
  help: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM14.06 7.74C13.49 7.25 12.75 7 12 7C11.25 7 10.51 7.25 9.94 7.74C9.49 8.12 9.24 8.56 9.11 9C9 9.39 9 9.75 9 9.97V10.01C9 10.56 9.44 11.01 9.99 11.02C10.54 11.02 10.99 10.58 11 10.03C11 9.78 11 9.67 11.04 9.56C11.06 9.49 11.1 9.4 11.24 9.27C11.42 9.12 11.69 9.01 12 9.01C12.31 9.01 12.58 9.12 12.76 9.27C12.93 9.42 13 9.59 13 9.72V9.87C13 10.01 12.94 10.18 12.76 10.33L11.94 11.04C11.66 11.28 11.42 11.58 11.26 11.92C11.1 12.26 11.01 12.63 11.01 13.01C11.01 13.56 11.46 14.01 12.01 14.01C12.56 14.01 13.01 13.56 13.01 13.01C13.01 12.94 13.03 12.87 13.06 12.79C13.1 12.71 13.16 12.63 13.24 12.56L14.07 11.85C14.64 11.36 15 10.65 15 9.88V9.72C15 8.94 14.63 8.24 14.06 7.75V7.74ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
        fill="currentColor"
      />
    ),
  },
  issues: {
    viewBox: '0 0 24 24',
    body: (
      <path
        d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM10.33 7.29C8.34 7.99 7 9.89 7 12C7 13.16 7.4 14.25 8.1 15.12L8.04 14.49C7.99 13.94 8.39 13.45 8.94 13.4C9.49 13.35 9.98 13.75 10.03 14.3L10.32 17.29C10.32 17.29 10.32 17.33 10.32 17.35C10.32 17.43 10.32 17.5 10.3 17.58C10.29 17.64 10.28 17.7 10.25 17.75C10.24 17.77 10.25 17.8 10.23 17.83C10.2 17.88 10.17 17.92 10.14 17.96C10.12 17.99 10.11 18.01 10.09 18.04C10.02 18.12 9.94 18.19 9.84 18.24C9.8 18.26 9.76 18.27 9.72 18.29C9.65 18.32 9.59 18.34 9.52 18.35C9.49 18.35 9.46 18.37 9.43 18.38L6.44 18.67C6.44 18.67 6.37 18.67 6.34 18.67C5.83 18.67 5.4 18.28 5.35 17.77C5.3 17.22 5.7 16.73 6.25 16.68L6.77 16.63C5.66 15.38 5.02 13.75 5.02 12C5.02 9.04 6.9 6.38 9.69 5.4C10.21 5.22 10.78 5.49 10.97 6.01C11.15 6.53 10.88 7.1 10.36 7.29H10.33ZM14.33 18.6C14.22 18.64 14.11 18.66 14 18.66C13.59 18.66 13.2 18.4 13.06 17.99C12.88 17.47 13.15 16.9 13.67 16.71C15.66 16.01 17 14.11 17 12C17 10.84 16.6 9.75 15.9 8.88L15.96 9.51C16.01 10.06 15.61 10.55 15.06 10.6C15.03 10.6 14.99 10.6 14.96 10.6C14.45 10.6 14.02 10.21 13.97 9.7L13.68 6.71C13.68 6.71 13.68 6.67 13.68 6.65C13.68 6.57 13.68 6.5 13.7 6.42C13.71 6.36 13.72 6.3 13.75 6.25C13.76 6.23 13.75 6.2 13.77 6.17C13.79 6.14 13.82 6.12 13.84 6.08C13.88 6.02 13.92 5.96 13.97 5.91C14.01 5.87 14.05 5.84 14.09 5.81C14.15 5.76 14.22 5.73 14.29 5.7C14.34 5.68 14.38 5.67 14.43 5.66C14.48 5.65 14.52 5.62 14.57 5.62L17.56 5.33C18.11 5.28 18.6 5.68 18.65 6.23C18.7 6.78 18.3 7.27 17.75 7.32L17.23 7.37C18.34 8.62 18.98 10.25 18.98 12C18.98 14.96 17.1 17.62 14.31 18.6H14.33Z"
        fill="currentColor"
      />
    ),
  },
  decline: {
    viewBox: '0 0 24 24',
    body: (
      <path
        d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
        fill="currentColor"
      />
    ),
  },
  cancel: {
    viewBox: '0 0 24 24',
    body: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7071 7.29289C16.3166 6.90237 15.6834 6.90237 15.2929 7.29289L12 10.5858L8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L10.5858 12L7.29289 15.2929C6.90237 15.6834 6.90237 16.3166 7.29289 16.7071C7.68342 17.0976 8.31658 17.0976 8.70711 16.7071L12 13.4142L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L13.4142 12L16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289Z"
        fill="currentColor"
      />
    ),
  },
  alert: {
    viewBox: '0 0 24 24',
    body: (
      <path
        d="M12 23C5.93 23 1 18.07 1 12C1 5.93 5.93 1 12 1C18.07 1 23 5.93 23 12C23 18.07 18.07 23 12 23ZM13 8C13 7.45 12.55 7 12 7C11.45 7 11 7.45 11 8V13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13V8ZM12 15C11.45 15 11 15.45 11 16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16C13 15.45 12.55 15 12 15Z"
        fill="currentColor"
      />
    ),
  },
};

export const StatusIconSolid = forwardRef<HTMLSpanElement, StatusIconSolidProps>(
  ({ variant, size = 'medium', isInverse, isDisabled, isReadOnly, style, ...rest }, ref) => {
    const px = SIZE_PX[size] ?? SIZE_PX.medium;
    const { viewBox, body } = ICON[variant];

    const wrapperStyle: CSSProperties = {
      display: 'inline-flex',
      flexShrink: 0,
      lineHeight: 0,
      color: COLOR[variant],
      ...(isDisabled ? { filter: 'grayscale(1)', opacity: 0.4 } : null),
      ...(isReadOnly && !isDisabled ? { opacity: 0.6 } : null),
      ...style,
    };

    return (
      <span ref={ref} data-component="StatusIconSolid" style={wrapperStyle} {...rest}>
        <svg width={px} height={px} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          {body}
        </svg>
      </span>
    );
  }
);

StatusIconSolid.displayName = 'StatusIconSolid';
