import { Box, forwardRef } from '@chakra-ui/react';
import { useId } from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes, useLayoutEffect } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useBasePopoverContext } from '../BasePopoverContext';

export type BasePopoverHeaderProps = HTMLAttributes<HTMLDivElement> & TestIdProp;

export const BasePopoverHeader = forwardRef<BasePopoverHeaderProps, 'div'>(
  ({ 'data-testid': dataTestId = 'base-popover-header', ...props }, ref) => {
    const styles = useMultiStyleConfig('BasePopover', {});
    const { setTitleId } = useBasePopoverContext();
    const id = useId();

    // Only sets `aria-labelledby` on the `BasePopoverTrigger` element, to associate the title with the trigger.
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setTitleId(id);

      return () => setTitleId(undefined);
    }, [id, setTitleId]);

    return <Box {...props} data-testid={dataTestId} ref={ref} id={id} __css={styles['header']} />;
  }
);

BasePopoverHeader.displayName = 'BasePopoverHeader';
