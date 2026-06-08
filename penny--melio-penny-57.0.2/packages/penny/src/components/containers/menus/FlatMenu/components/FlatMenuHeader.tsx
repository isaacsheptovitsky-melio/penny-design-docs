import { forwardRef, type ReactNode } from 'react';

import { Header as _Header } from '../../Context/components';
export const FlatMenuHeader = forwardRef<HTMLDivElement, { children?: ReactNode }>((props, ref) => (
  <_Header data-component="FlatMenuHeader" {...props} ref={ref} />
));

FlatMenuHeader.displayName = 'FlatMenuHeader';
