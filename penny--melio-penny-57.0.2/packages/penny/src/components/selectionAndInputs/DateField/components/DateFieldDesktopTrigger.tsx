import { Box, forwardRef } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { useTestId } from '@melio/penny-utils';

import { Text } from '@/components/dataDisplay';
import { useMultiStyleConfig } from '@/theme/hooks';
import { getAriaProps } from '@/utils';

import { type DateFieldDesktopTriggerProps } from './types';

export const DateFieldDesktopTrigger = forwardRef<DateFieldDesktopTriggerProps, 'div'>(
  (
    {
      value,
      placeholder,
      size,
      isOpen,
      isFocused,
      isLoading,
      isDisabled,
      isInvalid,
      isRequired,
      loaderId,
      inputRef,
      id,
      onInputBlur,
      setInputValue,
      setIsFocused,
      setIsOpen,
      setActiveElement,
      isEnabled,
      isTypable,
      displayTypableMode,
      isViewMode,
      isReadOnly,
      onDateValidationError,
      'data-testid': dataTestId = 'date-field',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('DateField', { isTypable: false });
    const mergedRef = useMergeRefs([ref, inputRef]);
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        data-component="DateFieldDesktopTrigger"
        role="combobox"
        ref={mergedRef}
        id={id}
        __css={styles['trigger']}
        className={size}
        tabIndex={isDisabled ? -1 : 0}
        onBlur={onInputBlur}
        data-focus={isOpen || isFocused || null}
        data-loading={isLoading}
        {...getTestId()}
        aria-expanded={isOpen}
        aria-required={isRequired}
        aria-disabled={isDisabled}
        aria-invalid={isInvalid}
        aria-readonly={isReadOnly || isLoading}
        {...props}
        {...getAriaProps('aria-labelledby', [id ? `${id}-label` : undefined, props['aria-labelledby']])}
        {...getAriaProps('aria-describedby', [props['aria-describedby'], isLoading ? loaderId : undefined])}
      >
        {value ? (
          <Text {...getTestId('value')} textStyle="inline" color="inherit" shouldSupportEllipsis>
            {value}
          </Text>
        ) : (
          <Text
            {...getTestId('placeholder')}
            textStyle="inline"
            color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'}
            shouldSupportEllipsis
          >
            {placeholder}
          </Text>
        )}
      </Box>
    );
  }
);

DateFieldDesktopTrigger.displayName = 'DateFieldDesktopTrigger';
