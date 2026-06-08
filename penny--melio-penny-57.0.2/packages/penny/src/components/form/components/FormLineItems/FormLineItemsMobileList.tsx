import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Group } from '@/components/containers/Group';

import { type MobileListProps } from './FormLineItems.types';

/**
 * Defines a mobile-optimized list container for FormLineItems.
 */
export const FormLineItemsMobileList = forwardRef<HTMLDivElement, MobileListProps>(
  ({ children, 'data-testid': dataTestId = 'form-line-items-mobile-list', ...props }, ref) => {
    const getTestId = useTestId(dataTestId);

    return (
      <Group
        variant="vertical"
        spacing="s"
        ref={ref}
        data-component="FormLineItemsMobileList"
        {...getTestId()}
        {...props}
      >
        {children}
      </Group>
    );
  }
);

FormLineItemsMobileList.displayName = 'FormLineItemsMobileList';
