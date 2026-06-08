/* eslint-disable max-lines */
import { Box } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import {
  type ClipboardEvent,
  createRef,
  type FormEvent,
  forwardRef,
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Typography } from '@/components/dataDisplay/typography';
import { _Form as Form, ConditionalWrapper } from '@/components/internal';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useLiveRegionActivation } from '@/utils';
import { useControlled } from '@/utils/useControlled';

import { TextField } from '../TextField';
import { checkIfAllValid, checkIsNumeric, getResizedValues } from './verification-code-field.utils';
import { type VerificationCodeFieldProps } from './VerificationCodeField.types';

const DEFAULT_LENGTH = 4;
export const DEFAULT_INVALID_MESSAGE = 'The code does not match the latest code or the latest code is invalid';
export const DEFAULT_EMPTY_FIELD_INVALID_MESSAGE = 'All fields are required';

// TODO: Add local hooks: https://meliorisk.atlassian.net/browse/ME-23974
/**
 * The Verification Code Field is a component designed for entering short numeric codes, such as one-time passwords (OTPs).
 */
export const VerificationCodeField = forwardRef<HTMLFormElement, VerificationCodeFieldProps>(
  (
    {
      onComplete,
      length = DEFAULT_LENGTH,
      invalidErrorMessages,
      requiredFieldsErrorMessages,
      fieldAriaLabel = 'Verification code field',
      autoFocus = false,
      disabled = false,
      readOnly = false,
      value,
      onChange,
      defaultValue = Array(length).fill(''),
      'data-testid': dataTestId = 'verification-code-field',
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('VerificationCodeField', { length });
    const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useControlled<string[], []>(value, onChange, defaultValue);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isInvalid, setIsInvalid] = useState<boolean>();

    const getTestId = useTestId(dataTestId);
    const emptyFieldsInvalid = !values.every((value) => value);
    const invalid = isInvalid || (isSubmitted && emptyFieldsInvalid);

    const errorMessage = emptyFieldsInvalid
      ? (requiredFieldsErrorMessages ?? DEFAULT_EMPTY_FIELD_INVALID_MESSAGE)
      : (invalidErrorMessages ?? DEFAULT_INVALID_MESSAGE);

    const {
      handleOnKeyDown: handleOnKeyDownForLiveRegion,
      setIsFocusedWithin,
      isAriaRegionActive,
      announceKey,
    } = useLiveRegionActivation(invalid ? errorMessage : undefined);

    // resets `isLoading` state and focuses the first input.
    useEffect(() => {
      if (isInvalid) {
        setIsLoading(false);
        const firstInput = refs[0]?.current;
        if (firstInput) setInputFocus(firstInput);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInvalid]);

    // prevent of showing `invalidErrorMessages` while the user fills the code.
    useEffect(() => {
      if (!emptyFieldsInvalid) {
        setIsInvalid(false);
      }
    }, [emptyFieldsInvalid]);

    useEffect(() => {
      setRefs(
        Array(length)
          .fill('')
          .map(() => createRef<HTMLInputElement>())
      );

      // Resize the values array to match the new length.
      setValues(getResizedValues(values, length));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length]);

    const getInputByIndex = useCallback((siblingIndex: number) => refs[siblingIndex]?.current, [refs]);

    const setInputFocus = useCallback((input: HTMLInputElement) => {
      input.focus();
      if (input.value)
        setTimeout(() => {
          input.select();
        });
    }, []);

    const handleOnComplete = useCallback(
      async (code: string) => {
        // resets `isInvalid` & `isLoading`.
        setIsInvalid(false);
        setIsLoading(true);

        const isValid = await onComplete(code);
        // sets `isInvalid` to `true` in case the `onComplete` returns `false`.
        if (!isValid) {
          setIsInvalid(!isValid);
        }
      },
      [onComplete]
    );

    const handleInput = useCallback(
      async (index: number, isLast: boolean) => {
        if (!refs[index]) return;

        const input = refs[index]?.current;

        if (input?.value && !checkIsNumeric(input.value)) return;

        const nextInput = getInputByIndex(index + 1);
        const currentValues = values.map((v, i) => (i === index ? (input?.value ?? '') : v));
        const isComplete = isLast && checkIfAllValid(refs);
        setValues(currentValues);

        if (!input?.value) return;

        if (!isComplete && nextInput) {
          setInputFocus(nextInput);
        } else if (isComplete) {
          input.blur();
          await handleOnComplete(currentValues.join(''));
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onComplete, values]
    );

    const handleBackspace = useCallback(
      (index: number) => {
        if (!refs[index]) return;
        const input = refs[index]?.current;

        // in case the input has value, set input state to empty string.
        if (input?.value) {
          const currentValues = values.map((v, i) => (i === index ? '' : v));
          setValues(currentValues);
          return;
        }

        const prevInput = getInputByIndex(index - 1);
        if (prevInput) setInputFocus(prevInput);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [values, getInputByIndex, setInputFocus]
    );

    const handleArrowKeyDown = useCallback(
      (focusableIndex: number) => {
        const focusableInput = getInputByIndex(focusableIndex);
        if (focusableInput) setInputFocus(focusableInput);
      },
      [getInputByIndex, setInputFocus]
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        handleOnKeyDownForLiveRegion(e);

        switch (e.code) {
          case 'Backspace':
            handleBackspace(index);
            break;
          case 'ArrowLeft': {
            const focusableIndex = index === 0 ? 0 : index - 1;
            handleArrowKeyDown(focusableIndex);
            break;
          }
          case 'ArrowRight': {
            const lastIndex = values.length - 1;
            const focusableIndex = index === lastIndex ? lastIndex : index + 1;
            handleArrowKeyDown(focusableIndex);
            break;
          }
          case 'KeyZ':
          case 'KeyY': {
            // prevent the user to use undo/redo to avoid bugs in react input behavior.
            e.preventDefault();
            return;
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleBackspace, handleArrowKeyDown]
    );

    const onSubmit = useCallback(
      async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (checkIfAllValid(refs)) {
          await handleOnComplete(values.join(''));
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleOnComplete, values]
    );

    const handlePaste = useCallback(
      async (e: ClipboardEvent<HTMLInputElement>, index: number) => {
        // paste should occur on the first input only.
        if (index > 0) return;
        e.preventDefault();

        const paste = e.clipboardData.getData('text');

        if (!checkIsNumeric(paste)) return;

        const updatedValues = values.map((value, i) => paste[i] ?? value);
        setValues(updatedValues);

        const updatedValuesAreValid = updatedValues.every((value) => value);
        if (updatedValuesAreValid) {
          setIsLoading(true);
          await handleOnComplete(updatedValues.join(''));
        } else {
          // after paste focuses the next input.
          const nextInput = getInputByIndex(paste.length);
          if (nextInput) setInputFocus(nextInput);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [values]
    );

    const handleFocus = useCallback(
      (index: number) => {
        setIsFocusedWithin(true);
        if (!refs[index]) return;
        const input = refs[index]?.current;
        if (input) setInputFocus(input);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setInputFocus]
    );
    const errorMessageId = useMemo(() => uniqueId('error-message-'), []);

    return (
      <Box __css={styles['container']}>
        <Form
          isLoading={isLoading}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={onSubmit}
          ref={ref}
          data-component="VerificationCodeField"
          {...getTestId()}
          aria-describedby={invalid ? errorMessageId : undefined}
          {...props}
          sx={styles['form']}
        >
          {values.map((value, i) => (
            <TextField
              onFocus={() => {
                handleFocus(i);
              }}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onInput={async () => {
                const isLast = i === values.length - 1;
                await handleInput(i, isLast);
              }}
              onBlur={() => {
                setIsFocusedWithin(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onPaste={async (e) => await handlePaste(e, i)}
              key={`verification-code-field-input-${i}`}
              data-testid={`verification-code-field-input-${i}`}
              ref={refs[i]}
              isDisabled={isLoading || disabled}
              isReadOnly={readOnly}
              isInvalid={invalid}
              type="text"
              maxChars={1}
              value={value}
              size="large"
              sx={styles['input']}
              aria-label={`${fieldAriaLabel} ${i + 1}`}
              autoFocus={i === 0 && autoFocus}
              role="textbox"
              inputMode="numeric"
            />
          ))}
        </Form>

        <ConditionalWrapper
          condition={isAriaRegionActive}
          wrapper={(children) => (
            <Box display="inline-flex" key={`${errorMessageId}-error-${announceKey}`} role="alert">
              {children}
            </Box>
          )}
        >
          {invalid && (
            <Typography.Description
              id={errorMessageId}
              isInvalid={invalid}
              label={errorMessage}
              {...getTestId('error-message')}
            />
          )}
        </ConditionalWrapper>
      </Box>
    );
  }
);

VerificationCodeField.displayName = 'VerificationCodeField';
