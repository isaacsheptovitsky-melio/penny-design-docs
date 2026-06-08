import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../theme/hooks/use-style-config';
import { type _CustomInputContainerProps } from './_CustomInputContainer.types';

/**
 * @private Please use `Form.<component-name>` from `@melio/penny`.
 */
export const _CustomInputContainer = forwardRef<HTMLDivElement, _CustomInputContainerProps>(
  ({ children, size = 'large', ...props }, ref) => {
    const styles = useMultiStyleConfig('CustomInputContainer', { size });

    return (
      <Box
        role="textbox"
        data-component="_CustomInputContainer"
        __css={styles['field']}
        className={size}
        {...props}
        ref={ref}
      >
        {children}
      </Box>
    );
  }
);

_CustomInputContainer.displayName = '_CustomInputContainer';
