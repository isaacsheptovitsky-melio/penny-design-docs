import { Box, forwardRef } from '@chakra-ui/react';
import { FloatingArrow } from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { getThemeSpacingAsNumber } from '@/theme/foundations/spaces';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { basePopoverEdgesPlacements } from '../BasePopover.constants';
import { useBasePopoverContext } from '../BasePopoverContext';

export type BasePopoverArrowProps = TestIdProp;

export const BasePopoverArrow = forwardRef<BasePopoverArrowProps, 'div'>(
  ({ 'data-testid': dataTestId = 'base-popover-arrow', ...props }, ref) => {
    const styles = useMultiStyleConfig('BasePopover', {});
    const { context, placement } = useBasePopoverContext();

    return (
      <Box
        data-testid={dataTestId}
        __css={styles['arrow']}
        as={FloatingArrow}
        ref={ref}
        {...props}
        // ts-ignore is used due to `context` issues with `<Box/>`.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        context={context}
        tipRadius={1}
        staticOffset={basePopoverEdgesPlacements.includes(placement) ? getThemeSpacingAsNumber('s') : undefined}
      />
    );
  }
);

BasePopoverArrow.displayName = 'BasePopoverArrow';
