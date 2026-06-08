import { Box, forwardRef } from '@chakra-ui/react';
import { useId } from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes, useLayoutEffect } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { useBasePopoverContext } from '../BasePopoverContext';

export type BasePopoverBodyProps = HTMLAttributes<HTMLDivElement> & TestIdProp;

export const BasePopoverBody = forwardRef<BasePopoverBodyProps, 'div'>(
  ({ 'data-testid': dataTestId = 'base-popover-body', ...props }, ref) => {
    const { setDescriptionId } = useBasePopoverContext();
    const id = useId();

    // Only sets `aria-describedby` on the `BasePopoverTrigger` element, to associate the description with the trigger.
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setDescriptionId(id);

      return () => setDescriptionId(undefined);
    }, [id, setDescriptionId]);

    const styles = useMultiStyleConfig('BasePopover', {});

    return <Box data-testid={dataTestId} {...props} __css={styles['body']} ref={ref} id={id} />;
  }
);

BasePopoverBody.displayName = 'BasePopoverBody';
