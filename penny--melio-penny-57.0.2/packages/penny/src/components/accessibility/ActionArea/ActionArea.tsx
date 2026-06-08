import { Box } from '@chakra-ui/react';
import { type ForwardedRef, forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type ActionAreaProps } from './ActionArea.types';

export const ActionArea = forwardRef<HTMLButtonElement, ActionAreaProps>(
  ({ children, 'data-testid': dataTestId = 'action-area', ...props }, ref: ForwardedRef<HTMLButtonElement>) => {
    const styles = useStyleConfig('ActionArea');

    return (
      <Box
        __css={styles}
        as="button"
        data-testid={dataTestId}
        data-is-empty={!children}
        //ts-ignore is used due to `type` issues with `<Box/>`.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={ref}
        type="button"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

ActionArea.displayName = 'ActionArea';
