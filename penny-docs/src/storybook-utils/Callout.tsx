import React from 'react';

type CalloutVariant = 'tip' | 'note' | 'success' | 'warning' | 'critical' | 'caution';

interface CalloutProps {
  variant?: CalloutVariant;
  children: React.ReactNode;
}

// ── Penny semantic colors (semantic.icon.* / semantic.fill.*.secondary) ──────
const ICON_COLOR = {
  tip:      '#306af7',   // semantic.icon.informative
  note:     '#306af7',   // semantic.icon.informative
  success:  '#028838',   // semantic.icon.success
  warning:  '#fdb702',   // semantic.icon.warning
  critical: '#d80e25',   // semantic.icon.critical
};

// ── Penny product icons (24 × 24, filled, #18191B) ───────────────────────────

const TipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.116 2.81995C15.2638 1.29995 12.8209 0.689946 10.4281 1.14995C7.26434 1.76995 4.74135 4.30995 4.15065 7.47995C3.66006 10.1499 4.46101 12.7599 6.35326 14.6499C6.77376 15.0799 7.01405 15.5899 7.01405 16.0999V16.9999C7.01405 17.5499 7.46458 17.9999 8.01524 17.9999H11.0188V12.4099L9.30677 10.6999C8.91631 10.3099 8.91631 9.67995 9.30677 9.28995C9.69723 8.89995 10.328 8.89995 10.7184 9.28995L12.01 10.5799L13.3015 9.28995C13.692 8.89995 14.3227 8.89995 14.7132 9.28995C15.1037 9.67995 15.1037 10.3099 14.7132 10.6999L13.0012 12.4099V17.9999H16.0047C16.5554 17.9999 17.0059 17.5499 17.0059 16.9999V16.0999C17.0059 15.5899 17.2362 15.0799 17.6467 14.6699C19.1685 13.1599 20.0095 11.1399 20.0095 8.99995C20.0095 6.59995 18.9482 4.34995 17.096 2.81995H17.116Z" fill={ICON_COLOR.tip}/>
    <path d="M8.01524 19.9999V20.9999C8.01524 22.0999 8.91631 22.9999 10.0176 22.9999H14.0224C15.1237 22.9999 16.0247 22.0999 16.0247 20.9999V19.9999H8.01524Z" fill={ICON_COLOR.tip}/>
  </svg>
);

const NoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11V16ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z" fill={ICON_COLOR.note}/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM16.77 9.64L11.77 15.64C11.59 15.86 11.33 15.99 11.05 16C11.04 16 11.02 16 11.01 16C10.75 16 10.49 15.9 10.3 15.71L7.3 12.71C6.91 12.32 6.91 11.69 7.3 11.3C7.69 10.91 8.32 10.91 8.71 11.3L10.94 13.53L15.24 8.37C15.59 7.95 16.22 7.89 16.65 8.24C17.07 8.59 17.13 9.22 16.78 9.65L16.77 9.64Z" fill={ICON_COLOR.success}/>
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.6592 18.25L14.9392 2.81C14.3792 1.69 13.2592 1 11.9992 1C10.7392 1 9.61924 1.7 9.05924 2.81L1.34924 18.25C0.839237 19.28 0.889237 20.47 1.48924 21.44C2.08924 22.41 3.13924 23 4.27924 23H19.7192C20.8692 23 21.9092 22.42 22.5092 21.44C23.1092 20.46 23.1692 19.27 22.6492 18.25H22.6592ZM11.9992 19C11.4492 19 10.9992 18.55 10.9992 18C10.9992 17.45 11.4492 17 11.9992 17C12.5492 17 12.9992 17.45 12.9992 18C12.9992 18.55 12.5492 19 11.9992 19ZM12.9992 14C12.9992 14.55 12.5492 15 11.9992 15C11.4492 15 10.9992 14.55 10.9992 14V9C10.9992 8.45 11.4492 8 11.9992 8C12.5492 8 12.9992 8.45 12.9992 9V14Z" fill={ICON_COLOR.warning}/>
  </svg>
);

const CriticalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1C5.93 1 1 5.93 1 12C1 18.07 5.93 23 12 23C18.07 23 23 18.07 23 12C23 5.93 18.07 1 12 1ZM12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17ZM13 13C13 13.55 12.55 14 12 14C11.45 14 11 13.55 11 13V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V13Z" fill={ICON_COLOR.critical}/>
  </svg>
);

// ── Config ───────────────────────────────────────────────────────────────────

const config: Record<CalloutVariant, { bg: string; icon: React.ReactNode }> = {
  tip:      { bg: '#e6f0fe', icon: <TipIcon /> },       // semantic.fill.informative.secondary
  note:     { bg: '#e6f0fe', icon: <NoteIcon /> },      // semantic.fill.informative.secondary
  success:  { bg: '#dff5e7', icon: <SuccessIcon /> },   // semantic.fill.success.secondary
  warning:  { bg: '#fff8e6', icon: <WarningIcon /> },   // semantic.fill.warning.secondary
  critical: { bg: '#fde7e9', icon: <CriticalIcon /> },  // semantic.fill.critical.secondary
  caution:  { bg: '#fff8e6', icon: <WarningIcon /> },   // alias for warning
};

export const Callout: React.FC<CalloutProps> = ({ variant = 'note', children }) => {
  const { bg, icon } = config[variant];
  return (
    <div
      style={{
        backgroundColor: bg,
        borderRadius: '8px',
        padding: '12px 16px',
        margin: '16px 0',
        fontSize: '14px',
        lineHeight: 1.6,
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: '2px', display: 'flex' }}>{icon}</span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};
