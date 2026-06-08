import { Box } from '@chakra-ui/react';
import { FloatingFocusManager } from '@floating-ui/react';
import { forwardRef, type CSSProperties } from 'react';

import { zIndices } from '../../../theme/foundations';
import { Portal } from '../Portal';
import { type FloaterProps } from './Floater.types';

/**
 * @private For internal use only
 */
export const Floater = forwardRef<HTMLDivElement, FloaterProps>(
  ({ focusManagerProps, isOpen, overlay, styles, ...props }, ref) => {
    // Split styles: floating-ui positioning props go via style={} (bypasses Chakra transform
    // mangling); theme visual props go via __css={} so Chakra resolves semantic tokens.
    const {
      position,
      top,
      left,
      right,
      bottom,
      transform,
      transformOrigin,
      willChange,
      visibility,
      ...visualStyles
    } = styles ?? ({} as CSSProperties);
    const positionStyles = { position, top, left, right, bottom, transform, transformOrigin, willChange, visibility };

    return (
      <>
        {isOpen && (
          <Portal>
            {overlay}
            <FloatingFocusManager {...focusManagerProps}>
              <Box
                data-component="Floater"
                ref={ref}
                onClick={(e) => e.stopPropagation()}
                style={positionStyles}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                __css={visualStyles as any}
                zIndex={zIndices.modal}
                {...props}
              />
            </FloatingFocusManager>
          </Portal>
        )}
      </>
    );
  }
);
Floater.displayName = 'Floater';
