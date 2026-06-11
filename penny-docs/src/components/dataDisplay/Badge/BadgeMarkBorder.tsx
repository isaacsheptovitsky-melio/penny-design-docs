import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, type PropsWithChildren } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

export const BadgeMarkBorder = forwardRef<HTMLDivElement, PropsWithChildren<TestIdProp>>(
  ({ children, 'data-testid': dataTestId = 'badge.markBorder', ...props }, ref) => {
    const styles = useMultiStyleConfig('Badge', {});
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        data-component="Badge.MarkBorder"
        {...props}
        tabIndex={undefined}
        {...getTestId()}
        __css={styles['markBorder']}
        ref={ref}
      >
        {children}
      </Box>
    );
  }
);

BadgeMarkBorder.displayName = 'MarkBorder';
