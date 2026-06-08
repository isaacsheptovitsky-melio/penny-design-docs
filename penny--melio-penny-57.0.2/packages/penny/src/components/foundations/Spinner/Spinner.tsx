import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { createElement } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useSpinner } from '@/theme/hooks/useSpinner';

import { type SpinnerSize, type SpinnerVariant } from './Spinner.types';

export type SpinnerProps = {
  /**
   * The variant of the spinner.
   * @default neutral
   */
  variant?: SpinnerVariant;

  /**
   * Sets the width and height of the spinner.
   * @default medium
   */
  size?: SpinnerSize;

  /**
   * Determines if the spinner is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Visually hidden label for assistive tech.
   * @default Loading
   */
  screenReaderText?: string | null;
} & TestIdProp;

/**
 * A visual loading indicator intended for use within other components. It is not meant to be used on its own and should be combined with a live region to properly announce loading or processing to assistive technologies.
 */
export const Spinner = forwardRef<SpinnerProps, 'span'>(
  (
    {
      variant = 'neutral',
      size = 'medium',
      screenReaderText = 'Loading',
      'data-testid': dataTestId = 'spinner',
      disabled = false,
      ...restProps
    }: SpinnerProps,
    ref
  ) => {
    const styles = useMultiStyleConfig('Spinner', { variant, size });
    const getTestId = useTestId(dataTestId);
    const spinnerOverride = useSpinner();
    const isCustomSize = typeof size === 'number';

    if (spinnerOverride) {
      return createElement(spinnerOverride, {
        variant,
        size,
        screenReaderText,
        'data-testid': dataTestId,
        disabled,
        ...restProps,
      });
    }

    return (
      <chakra.span ref={ref}>
        <chakra.svg
          viewBox="0 0 200 200"
          __css={styles['container']}
          {...getTestId()}
          aria-hidden
          {...restProps}
          height={isCustomSize ? size : undefined}
          width={isCustomSize ? size : undefined}
        >
          <chakra.circle
            cx="100"
            cy="100"
            r="90"
            __css={styles['track']}
            data-disabled={disabled || undefined}
            {...getTestId('track')}
          />

          <chakra.circle
            cx="100"
            cy="100"
            r="90"
            __css={styles['indicator']}
            data-disabled={disabled || undefined}
            {...getTestId('indicator')}
          />
        </chakra.svg>

        {screenReaderText && <VisuallyHidden>{screenReaderText}</VisuallyHidden>}
      </chakra.span>
    );
  }
);
