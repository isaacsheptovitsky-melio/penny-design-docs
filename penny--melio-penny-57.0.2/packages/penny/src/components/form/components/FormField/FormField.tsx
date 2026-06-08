import { Box } from '@chakra-ui/react';
import { isNil, useTestId } from '@melio/penny-utils';
import { forwardRef, useRef, useState } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Text } from '@/components/dataDisplay/Text';
import { Typography } from '@/components/dataDisplay/typography';
import { useFormLineItemsContext } from '@/components/form/components/FormLineItems';
import { getAriaDescribedByProps } from '@/components/form/utils/getAriaDescribedByProps';
import { useFormContext } from '@/components/internal/_Form';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useDebounceState } from '@/utils/useDebounceState';
import { useLiveRegionActivation } from '@/utils/useLiveRegionActivation';

import { FormFieldControlRender, MaxCharsCounter } from './components';
import { type FormFieldProps } from './FormField.types';

/**
 * The FormField component acts as a wrapper that standardizes state management and visual presentation for form field components.
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      error,
      labelProps,
      helperText,
      maxChars,
      isDisabled,
      isReadOnly,
      isViewMode,
      isLoading,
      size,
      isRequired,
      showOptionalIndicator,
      children,
      render,
      'data-testid': dataTestId = 'form-field',
      id,
      colSpan = 1,
      name,
      control,
      shouldReserveSpaceForHelperText: _shouldReserveSpaceForErrorText,
      align = 'start',
      ...props
    },
    ref
  ) => {
    const isInvalid = !!error;
    const { isHidden: isHiddenLabel, ...otherLabelProps } = labelProps ?? {};
    const [localValue, setLocalValue] = useState('');
    const [charLimitMessage, setDebouncedCharLimitMessage, setCharLimitMessage] = useDebounceState('', 1000);

    // This value is exposed to screen readers via a VisuallyHidden element referenced in aria-describedby.
    // It's updated only on blur to prevent NVDA from re-announcing all descriptions on every keystroke.
    // Live character count is shown visually, but screen readers get this stable version instead.
    const [charCountForSR, setCharCountForSR] = useState(localValue?.length);

    const getTestId = useTestId(dataTestId);
    const formContext = useFormContext();
    const isFieldDisabled = isDisabled ?? formContext.isDisabled;
    const isFieldReadOnly = isReadOnly ?? (formContext.isReadOnly || formContext.isLoading);
    const isFieldInViewMode = isViewMode ?? formContext.isViewMode;
    const fieldSize = size ?? formContext.size ?? 'large';
    const styles = useMultiStyleConfig('FormField', {
      size: fieldSize,
      error,
      helperText,
      isViewMode: isFieldInViewMode,
      align,
    });

    const { helperTextId, errorMessageId, maxCharsId, ...fieldAriaDescribedby } = getAriaDescribedByProps({
      id,
      error,
      helperText,
      maxChars,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const getLabelId = () => {
      if (!labelProps || isHiddenLabel) {
        return undefined;
      }

      if (!isNil(labelProps?.id)) {
        return labelProps.id;
      }

      if (id) {
        return `${id}-label`;
      }

      return undefined;
    };

    const labelId = getLabelId();

    const renderFieldProps = {
      ref: inputRef,
      size: fieldSize,
      isDisabled: isFieldDisabled,
      isReadOnly: isFieldReadOnly,
      isViewMode: isFieldInViewMode,
      isLoading,
      isInvalid,
      ...getTestId('render-field'),
      id,
      ...fieldAriaDescribedby,
      'aria-labelledby': labelId,
      'aria-required': !isFieldInViewMode && isRequired,
      ...(maxChars && { maxChars }),
    };

    const formLineItemsContext = useFormLineItemsContext();
    // Reserve the helper/error text space when in FormLineItems or when explicitly asked for
    const shouldReserveSpaceForHelperText = _shouldReserveSpaceForErrorText ?? formLineItemsContext;
    // Condition to render the space for the helper/error text. Either when reserving the space, or there's an actual content to display.
    const shouldRenderHelperTextSpace = shouldReserveSpaceForHelperText || helperText || error || maxChars;
    const { handleOnKeyDown, setIsFocusedWithin, isAriaRegionActive, announceKey } = useLiveRegionActivation(
      error?.message
    );
    const shouldShowCharCount = !isFieldInViewMode && control && name && maxChars && typeof localValue === 'string';

    const handleOnBlur = () => {
      setIsFocusedWithin(false);

      if (shouldShowCharCount) {
        setCharCountForSR(localValue.length);
      }
    };

    const handleLocalValueChanged = (value: string) => {
      setLocalValue(value);

      if (value.length === maxChars) {
        setDebouncedCharLimitMessage(`${maxChars} max characters reached`);
      } else {
        setCharLimitMessage('');
      }
    };

    const fieldContext = {
      error,
      labelProps,
      helperText,
      showOptionalIndicator,
    };

    return (
      <Box
        __css={styles['container']}
        {...getTestId()}
        data-component="FormField"
        //<li> is relevant only if the form itself is in view-mode, to ensure the <li> would be inside <ul>.
        as={formContext.isViewMode ? 'li' : 'div'}
        gridColumn={{ xs: '1 / 1', s: `span ${colSpan} / span 1` }}
        {...props}
        ref={ref}
        onFocus={() => setIsFocusedWithin(true)}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      >
        {labelProps?.label && (
          <Box
            __css={styles['label']}
            {...getTestId('label-container')}
            justifyContent={align}
            data-hidden={isHiddenLabel}
          >
            <Typography.Label
              {...getTestId('label')}
              as={isFieldInViewMode ? 'div' : 'label'}
              isInvalid={isInvalid}
              isReadOnly={isFieldReadOnly || isLoading}
              isViewMode={isFieldInViewMode}
              isDisabled={isFieldDisabled}
              description={
                isFieldInViewMode ? undefined : isRequired ? '*' : showOptionalIndicator ? '(optional)' : undefined
              }
              {...otherLabelProps}
              label={labelProps.label}
              id={labelId}
              // Manually focus the field when the label is clicked in case it's a non-semantic form element.
              onClick={() => inputRef.current?.focus()}
            />
          </Box>
        )}

        <Box __css={styles['fieldGroup']}>
          <Box __css={styles['field']}>
            {control && name ? (
              <FormFieldControlRender
                control={control}
                name={name}
                render={render}
                setLocalValue={handleLocalValueChanged}
                fieldContext={fieldContext}
                {...renderFieldProps}
              />
            ) : (
              // TODO:https://meliorisk.atlassian.net/browse/ME-110373
              // eslint-disable-next-line react-hooks/refs
              render(renderFieldProps, fieldContext)
            )}
          </Box>

          {shouldRenderHelperTextSpace && (
            <Box
              __css={styles['helperText']}
              aria-disabled={isFieldDisabled}
              data-invalid={isInvalid || null}
              data-readonly={isFieldReadOnly || isLoading || null}
              {...getTestId('helper-text-space')}
            >
              <ConditionalWrapper
                condition={isAriaRegionActive}
                wrapper={(children) => (
                  <Box display="inline-flex" key={`${errorMessageId}-error-${announceKey}`} role="alert">
                    {children}
                  </Box>
                )}
              >
                {error?.message && (
                  <Text color="inherit" textStyle="inline" id={errorMessageId} {...getTestId('error-message')}>
                    {error.message}
                  </Text>
                )}
              </ConditionalWrapper>

              {!error?.message && helperText && !isFieldInViewMode && (
                <Text color="inherit" textStyle="inline" id={helperTextId} {...getTestId('helper-text')}>
                  {helperText}
                </Text>
              )}

              {shouldShowCharCount && (
                <>
                  <VisuallyHidden id={maxCharsId} {...getTestId('chars-counter-for-sr')}>
                    {charCountForSR}/{maxChars}
                  </VisuallyHidden>

                  {localValue.length === maxChars && (
                    <VisuallyHidden aria-live="polite">{charLimitMessage}</VisuallyHidden>
                  )}

                  <MaxCharsCounter
                    maxChars={maxChars}
                    valueLength={localValue.length}
                    {...getTestId('chars-counter')}
                  />
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);

FormField.displayName = 'FormField';
