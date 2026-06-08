import { type ReactNode } from 'react';

import type { _MenuFooterProps } from './_MenuFooter/_MenuFooter.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _MenuTriggerProps = {
  'data-testid'?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _MobileMenuDropdownProps = {
  size?: 'small' | 'large' | 'fit-content';
  footer?: _MenuFooterProps;
  title?: string;
  children?: ReactNode;
};
