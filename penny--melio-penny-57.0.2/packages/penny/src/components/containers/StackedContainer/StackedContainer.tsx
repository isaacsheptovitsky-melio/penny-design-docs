import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { BorderOptions } from '../Container/Container.types';
import { StackedContainerItems } from './components/StackedContainerItems';
import { type StackedContainerProps } from './StackedContainer.types';

/**
 * A container component that creates a stacked appearance with background layers.
 */
export const StackedContainer = forwardRef<HTMLDivElement, StackedContainerProps>(
  (
    {
      border = BorderOptions.Regular,
      paddingX = 'none',
      paddingY = 'none',
      children,
      stacksToDisplay,
      'data-testid': dataTestId = 'stacked-container',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('StackedContainer', { stacksToDisplay, paddingX, paddingY, border });
    const getTestId = useTestId(dataTestId);

    return (
      <Box data-component="StackedContainer" __css={styles['wrapper']} ref={ref} {...getTestId()} {...props}>
        <Box __css={styles['container']} {...getTestId('content')}>
          {children}
        </Box>
        {stacksToDisplay > 0 && (
          <StackedContainerItems
            stacksToDisplay={stacksToDisplay}
            paddingX={paddingX}
            paddingY={paddingY}
            border={border}
            {...props}
          />
        )}
      </Box>
    );
  }
);

StackedContainer.displayName = 'StackedContainer';
