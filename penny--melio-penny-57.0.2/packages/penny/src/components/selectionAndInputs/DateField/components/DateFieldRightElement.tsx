import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { DateFieldRightElementProps } from './types';

export const DateFieldRightElement = forwardRef<HTMLButtonElement, DateFieldRightElementProps>(
  (
    {
      trigger,
      isEnabled,
      inputValue,
      hideClear,
      isDisabled,
      isTypable,
      isReadOnly,
      inputRef,
      onClear,
      clearDateAriaLabel,
      setActiveElement,
      'data-testid': dataTestId = 'date-field-toggle',
      ...props
    },
    ref
  ) => {
    const showClear = isEnabled && Boolean(inputValue) && !hideClear;
    const styles = useMultiStyleConfig('DateField', { isTypable });

    const getTestId = useTestId(dataTestId);

    return (
      <Box
        __css={styles['rightElement']}
        data-disabled={isDisabled || null}
        data-readonly={isReadOnly || null}
        onClick={isDisabled ? undefined : () => inputRef.current?.focus()}
        ref={ref as ForwardedRef<HTMLDivElement>}
        {...props}
      >
        {showClear && (
          <IconButton
            icon="close"
            variant="naked"
            size="extra-small"
            onClick={onClear}
            aria-label={clearDateAriaLabel}
            {...getTestId('clear')}
          />
        )}
        {trigger}
      </Box>
    );
  }
);

DateFieldRightElement.displayName = 'DateFieldRightElement';
