import React from 'react';

interface TooltipProps {
  content?: React.ReactNode;
  isEnabled?: boolean;
  /** Accepted for API parity with the real Tooltip; ignored by this pass-through stub. */
  dontDescribeChild?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right' | (string & {});
  children: React.ReactElement;
}

/**
 * Stub Tooltip — passes children through unchanged.
 * Full Tooltip docs TBD.
 */
export const Tooltip: React.FC<TooltipProps> = ({ children }) => <>{children}</>;
