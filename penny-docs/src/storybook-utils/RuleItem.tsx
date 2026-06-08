import React from 'react';

// ─── Penny icons (inline SVG, fill="currentColor") ───────────────────────────

const CheckCircleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0, marginTop: '2px' }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7809 9.62473C17.1259 9.19347 17.056 8.56418 16.6247 8.21917C16.1934 7.87416 15.5641 7.94408 15.2191 8.37534L11.0948 13.5307L8.68394 11.2705C8.28103 10.8928 7.6482 10.9132 7.27047 11.3161C6.89274 11.719 6.91315 12.3518 7.31606 12.7296L10.5161 15.7296C10.7195 15.9203 10.9933 16.0174 11.2714 15.9975C11.5495 15.9776 11.8067 15.8425 11.9809 15.6247L16.7809 9.62473Z"
      fill="currentColor"
    />
  </svg>
);

const CancelCircleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0, marginTop: '2px' }}
  >
    <path
      d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM15.71 14.29C16.1 14.68 16.1 15.31 15.71 15.7C15.51 15.9 15.26 15.99 15 15.99C14.74 15.99 14.49 15.89 14.29 15.7L12 13.41L9.71 15.7C9.51 15.9 9.26 15.99 9 15.99C8.74 15.99 8.49 15.89 8.29 15.7C7.9 15.31 7.9 14.68 8.29 14.29L10.58 12L8.29 9.71C7.9 9.32 7.9 8.69 8.29 8.3C8.68 7.91 9.31 7.91 9.7 8.3L11.99 10.59L14.28 8.3C14.67 7.91 15.3 7.91 15.69 8.3C16.08 8.69 16.08 9.32 15.69 9.71L13.4 12L15.69 14.29H15.71Z"
      fill="currentColor"
    />
  </svg>
);

// ─── Rule item components ─────────────────────────────────────────────────────

/** Inline "Do" rule — Melio success green with checked-circle icon */
export const Do: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '0 0 6px', fontSize: '14px', lineHeight: 1.6, color: '#1A202C' }}>
    <span style={{ color: '#028838', display: 'flex' }}>
      <CheckCircleIcon />
    </span>
    <span>
      <strong style={{ color: '#028838' }}>Do</strong>{' '}— {children}
    </span>
  </p>
);

/** Inline "Don't" rule — Melio critical red with cancel-circle icon */
export const Dont: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '0 0 6px', fontSize: '14px', lineHeight: 1.6, color: '#1A202C' }}>
    <span style={{ color: '#D80E25', display: 'flex' }}>
      <CancelCircleIcon />
    </span>
    <span>
      <strong style={{ color: '#D80E25' }}>Don't</strong>{' '}— {children}
    </span>
  </p>
);
