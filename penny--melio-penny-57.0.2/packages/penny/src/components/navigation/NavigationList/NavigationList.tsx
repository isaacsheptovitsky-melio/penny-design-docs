import { Composite } from '@floating-ui/react';
import { forwardRef } from 'react';

import type { NavigationListProps } from './types';

/**
 * @private For internal use only.
 */
export const NavigationList = forwardRef<HTMLDivElement, NavigationListProps>(({ children, render, ...props }, ref) => (
  <Composite data-component="NavigationList" ref={ref} {...props} render={render}>
    {children}
  </Composite>
));

NavigationList.displayName = 'NavigationList';
