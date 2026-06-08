import { useMergeRefs } from '@floating-ui/react';
import { isMobileDevice, useTestId } from '@melio/penny-utils';
import { type ChangeEventHandler, forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { TextField } from '../../TextField';
import { DateFieldMobileTrigger } from './DateFieldMobileTrigger';
import { type DateFieldInputProps } from './types';

export const DateFieldInput = forwardRef<HTMLInputElement, DateFieldInputProps>(
  (
    {
      rightElement,
      onClick,
      onInputBlur,
      value,
      isTypable,
      isEnabled,
      inputRef,
      setInputValue,
      isFocused,
      setIsFocused,
      isOpen,
      setIsOpen,
      setActiveElement,
      displayTypableMode,
      containerRef,
      placeholder,
      isViewMode,
      isReadOnly,
      isDisabled,
      isLoading,
      onDateValidationError,
      size,
      'data-testid': dataTestId = 'date-field',
      ...otherProps
    },
    ref
  ) => {
    const isMobile = isMobileDevice();
    const styles = useMultiStyleConfig('DateField', { isTypable });
    const fieldRef = useMergeRefs([ref, inputRef]);
    const getTestId = useTestId(dataTestId);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (!isTypable) return;

      setInputValue(event.target.value);
    };

    // By passing `maskProps` we make the input typable on focus, even if `isTypable` is `false`.
    const maskProps = displayTypableMode
      ? { mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] }
      : undefined;

    // Render a button trigger on mobile when not typable, to prevent the native keyboard from opening.
    // In all other cases, render the full input.
    if (!isTypable && isMobile) {
      const { viewModePlaceholder, ...withoutUnexpectedDateFieldProps } = otherProps;

      const mobileTriggerProps = {
        size,
        isViewMode,
        isLoading,
        isReadOnly,
        isDisabled,
        isOpen,
        isFocused,
        value,
        placeholder,
        rightElement,
        onClick,
        ...withoutUnexpectedDateFieldProps,
      };

      return <DateFieldMobileTrigger {...mobileTriggerProps} />;
    }

    return (
      <TextField
        data-component="DateField"
        ref={fieldRef}
        sx={styles['input']}
        value={value}
        onChange={handleOnChange}
        onBlur={onInputBlur}
        onClick={onClick}
        containerRef={containerRef}
        placeholder={placeholder}
        size={size}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isViewMode={isViewMode}
        rightElement={rightElement}
        {...getTestId()}
        {...otherProps}
        maskProps={maskProps}
        data-focus={isOpen || isFocused || null}
      />
    );
  }
);

DateFieldInput.displayName = 'DateFieldInput';
