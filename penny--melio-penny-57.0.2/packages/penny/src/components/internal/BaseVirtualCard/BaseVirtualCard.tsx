import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../theme/hooks/use-style-config';
import { type BaseVirtualCardProps } from './BaseVirtualCard.types';

export const BaseVirtualCard = forwardRef<HTMLDivElement, BaseVirtualCardProps>(
  (
    { variant = 'white', backgroundImageSrc, children, 'data-testid': dataTestId = 'base-virtual-card', ...props },
    ref
  ) => {
    const styles = useMultiStyleConfig('BaseVirtualCard', { variant, backgroundImageSrc, ...props });
    const getTestId = useTestId(dataTestId);

    return (
      <Box ref={ref} data-component="BaseVirtualCard" {...getTestId()} {...props} __css={styles['container']}>
        <>
          {backgroundImageSrc && <Box __css={styles['image']} />}
          <Box __css={styles['content']}>{children}</Box>
        </>
      </Box>
    );
  }
);

BaseVirtualCard.displayName = 'BaseVirtualCard';
