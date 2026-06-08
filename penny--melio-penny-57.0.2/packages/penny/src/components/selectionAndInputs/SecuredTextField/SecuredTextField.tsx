import { Box } from '@chakra-ui/react';
import { useBoolean, useTestId } from '@melio/penny-utils';
import type { FocusEvent } from 'react';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { TextField } from '../TextField';
import type { SecuredTextFieldProps } from './SecuredTextField.types';

/**
 * The Secured Text Field component is designed to mask sensitive information such as passwords and account numbers.
 * It provides an optional toggle to reveal or hide the entered text.
 */
export const SecuredTextField = forwardRef<HTMLInputElement, SecuredTextFieldProps>(
  (
    {
      type = 'text',
      disableToggle = false,
      isTextVisible = false,
      isReadOnly,
      isViewMode,
      isDisabled,
      autoFocus = false,
      getToggleVisibilityAriaLabel,
      value,
      onFocus,
      onBlur,
      'data-testid': dataTestId = 'secured-text-field',
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);
    const [textVisible, setTextVisible] = useState(isTextVisible);
    const hideToggleButton = disableToggle || isReadOnly || isViewMode;

    useEffect(() => {
      setTextVisible(isTextVisible);
    }, [isTextVisible]);

    const styles = useMultiStyleConfig('SecuredTextField', { textVisible });

    const ariaLabel = getToggleVisibilityAriaLabel?.(textVisible) ?? `Toggle visibility ${textVisible ? 'off' : 'on'}`;

    const toggleTextVisibility = useCallback(() => {
      if (isReadOnly || isViewMode) return;
      setTextVisible(!textVisible);
    }, [isReadOnly, isViewMode, textVisible]);

    const rightElement = !hideToggleButton ? (
      <Box __css={styles['inputRightIcon']}>
        <IconButton
          size="extra-small"
          icon={textVisible ? 'hide' : 'show'}
          variant="naked"
          onClick={toggleTextVisibility}
          isDisabled={!value || isDisabled}
          aria-label={ariaLabel}
          {...getTestId('input-visibility-icon-button')}
        />
      </Box>
    ) : undefined;

    const [isFocused, toggleFocus] = useBoolean(false);

    /**
     * securedTextFieldType - Type manipulation to manage the field type based on the visibility state:
     * - Sets to 'text' when `textVisible` is true to prevent the value from being masked if `type` is set to 'password'.
     * - Sets to 'password' when `textVisible` is false and `isFocused` is false, to prevent the screen reader from announcing the secured value.
     */
    const securedTextFieldType = useMemo(
      () => (textVisible ? 'text' : !isFocused ? 'password' : type),
      [isFocused, textVisible, type]
    );

    return (
      <TextField
        {...getTestId()}
        type={securedTextFieldType}
        ref={ref}
        autoFocus={autoFocus}
        data-component="SecuredTextField"
        data-private // To mask sensitive data in Fullstory sessions [ME-72120]
        isViewMode={isViewMode}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        {...props}
        onFocus={(e: FocusEvent<HTMLInputElement>) => {
          toggleFocus.on();
          onFocus?.(e);
        }}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          toggleFocus.off();
          onBlur?.(e);
        }}
        value={
          isViewMode && !textVisible
            ? Array.from(value?.toString() ?? '')
                .map(() => '•')
                .join('')
            : value
        }
        sx={styles['container']}
        rightElement={rightElement}
      />
    );
  }
);

SecuredTextField.displayName = 'SecuredTextField';
