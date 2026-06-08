import { forwardRef, type ReactNode } from 'react';

import { Header as _Header } from '../../Context/components';
export const FloatingMenuHeader = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
  <_Header data-component="FloatingMenuHeader" {...props} ref={ref} />
));

FloatingMenuHeader.displayName = 'FloatingMenuHeader';
