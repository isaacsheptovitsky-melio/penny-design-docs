import { Box } from '@chakra-ui/react';
import { convertCurrencyToNumber, removeNonDigitsFromCurrency, useIntl } from '@melio/penny-utils';
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MaskedInput from 'react-text-mask';

import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Typography } from '@/components/dataDisplay/typography';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { createNumberMask } from '@/utils/create-number-mask-utils';

import type { AmountInputProps } from './AmountInput.types';

/**
 * The Amount Input component allows users to enter or edit the amount to be paid.
 * It supports different currencies, and enforces a limit to prevent users from entering an amount exceeding the bill’s total
 */
export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      onChange,
      onBlur,
      onFocus,
      value,
      currency = 'USD',
      currencySign = '$',
      helperText,
      editButtonTooltip,
      integerLimitMask,
      errorMessage,
      allowNegativeValue = true,
      descriptionAlignment = 'center',
      autoComplete,
      ...rest
    },
    ref
  ) => {
    const { formatCurrency } = useIntl();

    const [inputValue, setInputValue] = useState<string>(formatCurrency(value, currency) ?? '');
    const [placeholder, setPlaceholder] = useState<string>(formatCurrency(value, currency));
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const inputWidthInChars = inputValue.length > 0 ? inputValue.length : placeholder.length;

    const styles = useMultiStyleConfig('AmountInput', { inputWidthInChars, descriptionAlignment });

    const inputRef = useRef<MaskedInput>(null);

    useImperativeHandle(ref, () => inputRef.current?.inputElement as HTMLInputElement);

    const currencyMask = createNumberMask({
      currencySign,
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: ',',
      allowDecimal: true,
      decimalSymbol: '.',
      integerLimit: integerLimitMask ?? value.toFixed(0).length,
      allowNegative: allowNegativeValue,
      allowLeadingZeroes: true,
    });

    useEffect(() => {
      if (errorMessage) {
        setIsEditMode(true);
      }
    }, [errorMessage]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '') return;
      setInputValue(event.target.value);
      setPlaceholder(event.target.value);

      const formattedValue = removeNonDigitsFromCurrency(event.target.value);
      onChange?.({ target: { value: formattedValue } } as ChangeEvent<HTMLInputElement>);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;

      const valueAsNumber = convertCurrencyToNumber(value.length ? value : placeholder);
      const formattedValue = formatCurrency(valueAsNumber, currency);

      setInputValue(formattedValue);
      setPlaceholder(formattedValue);
      if (!errorMessage) {
        setIsFocus(false);
        setIsEditMode(false);
      }

      onBlur?.(e);
    };

    const handleEditMode = () => {
      setIsFocus(true);
      setIsEditMode(true);
      setInputValue('');

      inputRef.current?.inputElement.focus();
    };

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          inputRef.current?.inputElement.blur();
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [inputValue]
    );

    const editButton = (
      <IconButton
        aria-label="amount-edit-button"
        data-testid="amount-edit-button"
        icon="edit"
        variant="tertiary"
        onClick={handleEditMode}
      />
    );

    const showHelperText = !errorMessage && helperText && !isEditMode;

    return (
      <Group
        variant="vertical"
        justifyContent="center"
        spacing="xs"
        width="fit-content"
        data-component="AmountInput"
        {...rest}
      >
        <Box __css={styles['field']}>
          {isEditMode || errorMessage ? (
            <Box
              // ts-ignore is used due to `type` issues with `<Box/>`.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              type="text"
              value={inputValue}
              guide={false}
              aria-label="amount input"
              data-testid="amount-input"
              placeholder={placeholder}
              onChange={handleChange}
              sx={styles['inputElement']}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
              ref={inputRef as any}
              as={MaskedInput}
              mask={currencyMask}
              onBlur={handleBlur}
              onFocus={(e: FocusEvent<HTMLInputElement>) => {
                setIsFocus(true);
                onFocus?.(e);
              }}
              onKeyDown={handleKeyDown}
              data-view-mode={(!isEditMode && !errorMessage) || null}
              autoFocus={isFocus}
              autoComplete={autoComplete}
            />
          ) : (
            <Box as="span" sx={styles['inputDisplay']} data-testid="amount-input-display">
              {inputValue}
            </Box>
          )}
          {!isEditMode && !errorMessage && (
            <ConditionalWrapper
              condition={Boolean(editButtonTooltip)}
              wrapper={(children) => <Tooltip content={editButtonTooltip as string}>{children}</Tooltip>}
            >
              {editButton}
            </ConditionalWrapper>
          )}
        </Box>
        {(errorMessage || showHelperText) && (
          <Box sx={styles['description']}>
            {errorMessage && (
              <Typography.Description label={errorMessage} isInvalid data-testid="amount-input-error-message" />
            )}
            {showHelperText && <Typography.Description label={helperText} data-testid="amount-input-helper-text" />}
          </Box>
        )}
      </Group>
    );
  }
);

AmountInput.displayName = 'AmountInput';
