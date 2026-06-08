import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { BackgroundColorOptions, BorderOptions, type ContainerProps } from './Container.types';

/**
 * The Container is used to wrap content and control spacing, alignment, and layout boundaries.
 * It's highly flexible and helps maintain consistency across the interface by providing structure and padding.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      border = BorderOptions.None,
      backgroundColor = BackgroundColorOptions.Default,
      paddingX = 'none',
      paddingY = 'none',
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      isSticky,
      alignItems,
      justifyContent,
      textAlign,
      width = 'full',
      height = 'auto',
      overflow = 'hidden',
      position = 'initial',
      maxWidth = 'none',
      top = 'initial',
      'data-testid': dataTestId = 'container',
      ...props
    },
    ref
  ) => {
    const styles = useStyleConfig('Container', {
      ...props,
      border,
      backgroundColor,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      isSticky,
      alignItems,
      justifyContent,
      textAlign,
      width,
      height,
      overflow,
      position,
      maxWidth,
      top,
    });
    const getTestId = useTestId(dataTestId);

    return <Box data-component="Container" {...props} {...getTestId()} ref={ref} __css={styles} />;
  }
);

Container.displayName = 'Container';
