import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { ConditionalWrapper } from '../../internal';
import type { BadgeProps } from './Badge.types';
import { BadgeMarkBorder } from './BadgeMarkBorder';

/**
 * The `Badge` component allows you to place and position any element on top of another element.
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      placement = 'bottom-right',
      customPositions,
      mark,
      hasBorder,
      children,
      'data-testid': dataTestId = 'badge',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('Badge', { placement, customPositions });
    const getTestId = useTestId(dataTestId);

    return (
      <Box data-component="Badge" {...props} tabIndex={undefined} {...getTestId()} __css={styles['wrapper']} ref={ref}>
        {children}
        <Box __css={styles['mark']} {...getTestId('mark')}>
          <ConditionalWrapper
            condition={!!hasBorder}
            wrapper={(markChildren) => <BadgeMarkBorder>{markChildren}</BadgeMarkBorder>}
          >
            {mark}
          </ConditionalWrapper>
        </Box>
      </Box>
    );
  }
);

Badge.displayName = 'Badge';
