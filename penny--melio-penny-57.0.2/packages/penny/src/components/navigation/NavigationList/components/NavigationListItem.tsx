import { CompositeItem } from '@floating-ui/react';
import { forwardRef } from 'react';

import type { NavigationListItemProps } from './types';

/**
 * @private For internal use only.
 */
export const NavigationListItem = forwardRef<HTMLDivElement, NavigationListItemProps>(
  ({ render, children, ...props }, ref) => {
    if (render) return <CompositeItem ref={ref} render={render} {...props} />;

    return (
      <CompositeItem ref={ref} {...props}>
        {children}
      </CompositeItem>
    );
  }
);

NavigationListItem.displayName = 'NavigationListItem';
