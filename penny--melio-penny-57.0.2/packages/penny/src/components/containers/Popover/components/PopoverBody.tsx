import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, type PropsWithChildren } from 'react';

import { BasePopoverBody } from '@/components/containers/BasePopover';

export type PopoverBodyProps = PropsWithChildren<TestIdProp>;

export const PopoverBody = forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ children, 'data-testid': dataTestId = 'popover-body', ...props }, ref) => {
    const getTestId = useTestId(dataTestId);

    return (
      <BasePopoverBody data-component="PopoverBody" {...getTestId()} {...props} as="p" ref={ref}>
        {children}
      </BasePopoverBody>
    );
  }
);

PopoverBody.displayName = 'PopoverBody';
