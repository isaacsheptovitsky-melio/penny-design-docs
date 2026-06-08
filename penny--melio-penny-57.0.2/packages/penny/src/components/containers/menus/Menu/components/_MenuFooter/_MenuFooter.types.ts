import { type ReactNode } from 'react';

/**
 * @private For internal use only.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _MenuFooterProps = {
  label: string;
  children: ReactNode;
  isDisabled?: boolean;
  onClick: VoidFunction;
  dataTestId?: string;
};
