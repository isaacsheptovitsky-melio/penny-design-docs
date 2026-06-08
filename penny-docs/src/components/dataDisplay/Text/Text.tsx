import { Box } from '@chakra-ui/react';
import { useHasOverflow, useTestId } from '@melio/penny-utils';
import { forwardRef, useRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { mergeRefs } from '@/utils/merge-refs';

import type { TextProps } from './Text.types';

/**
 * `Text` component provides flexible typography rendering, integrates with the design system's typography scale and color tokens.
 */
export const Text = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      color = 'semantic.text.primary',
      textStyle = 'body2',
      as = 'span',
      children,
      shouldSupportEllipsis = false,
      'data-testid': dataTestId = 'text',
      ...props
    },
    propRef
  ) => {
    const textRef = useRef(null);
    const ref = mergeRefs([textRef, propRef]);
    const styles = useStyleConfig('Text', { color, textStyle, shouldSupportEllipsis });
    const getTestId = useTestId(dataTestId);
    const { hasOverflowX } = useHasOverflow(textRef);

    const showTooltip = shouldSupportEllipsis && hasOverflowX && typeof children === 'string';

    return (
      <Box
        data-component="Text"
        as={as}
        {...props}
        {...getTestId()}
        ref={ref}
        __css={styles}
        title={showTooltip ? children : undefined}
      >
        {children}
      </Box>
    );
  }
);

Text.displayName = 'Text';
