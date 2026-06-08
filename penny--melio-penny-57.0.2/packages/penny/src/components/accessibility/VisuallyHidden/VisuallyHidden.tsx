// eslint-disable-next-line no-restricted-imports
import { VisuallyHidden as ChakraVisuallyHidden } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';

import { type VisuallyHiddenProps } from './VisuallyHidden.types';

/**
 * The `VisuallyHidden` component hides content visually while keeping it accessible to screen readers and other assistive technologies.
 */
export const VisuallyHidden = ({ 'data-testid': dataTestId = 'visually-hidden', ...props }: VisuallyHiddenProps) => {
  const getTestId = useTestId(dataTestId);

  return <ChakraVisuallyHidden data-component="VisuallyHidden" {...getTestId()} {...props} />;
};

VisuallyHidden.displayName = 'VisuallyHidden';
