import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Card } from '@/components/containers/cards/Card';
import { Collapsible } from '@/components/containers/Collapsible';
import { Container } from '@/components/containers/Container';

import { type MobileListItemProps } from './FormLineItems.types';

/**
 * Defines a single item in the mobile list representation of FormLineItems.
 */
export const FormLineItemsMobileListItem = forwardRef<HTMLDivElement, MobileListItemProps>(
  ({ index, children, 'data-testid': dataTestId = 'form-line-items-mobile-list-item', ...props }, ref) => {
    const getTestId = useTestId(dataTestId);

    return (
      <Card variant="flat" paddingX="s" paddingY="s" {...getTestId} {...props} ref={ref}>
        <Container width="full">
          <Collapsible label={`#${index + 1}`} labelView="full">
            {children}
          </Collapsible>
        </Container>
      </Card>
    );
  }
);

FormLineItemsMobileListItem.displayName = 'FormLineItemsMobileListItem';
