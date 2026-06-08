import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import {
  type ForwardedRef,
  forwardRef,
  type KeyboardEventHandler,
  type NamedExoticComponent,
  type ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { type CommonInputProps } from '@/components/form/components/Form';
import { TextField } from '@/components/selectionAndInputs/TextField';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type BaseProps, type BaseTriggerProps, type Option, type OptionWithSection } from '../BaseSelect.types';

type InputProps<T> = Pick<BaseProps<T>, 'valueRightElement' | 'isLoading' | 'viewModePlaceholder'> &
  BaseTriggerProps<T> & {
    selectValue?: string;
    value?: string;
    selectedOption: Option<T> | OptionWithSection<T> | null | undefined;
    hasSections: boolean;
    leftElement?: ReactElement;
    rightElement?: ReactElement;
    'data-testid'?: string;
    role?: string;
    onKeyDown?: KeyboardEventHandler;
  } & CommonInputProps;

const InputComponent = <T,>(
  {
    selectValue,
    valueRightElement,
    onFocus,
    onBlur,
    size,
    isDisabled,
    isReadOnly,
    isViewMode,
    selectedOption,
    hasSections,
    leftElement,
    rightElement,
    value,
    autoFocus = false,
    ...props
  }: InputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const getTestId = useTestId('base-select');

  const [valueRightElementWidth, setValueRightElementWidth] = useState(0);

  const valueRightElementRef = useCallback((el: HTMLElement | null) => {
    if (!el) return;

    setValueRightElementWidth(el.offsetWidth);
  }, []);

  const [isFocused, setIsFocused] = useState(false);
  const [showInputOverlay, setShowInputOverlay] = useState(false);

  const styles = useMultiStyleConfig('BaseSelect', {
    hasLeftElement: Boolean(leftElement),
    isViewMode,
    // Passing `valueRightElementWidth` only when overlay is visible so that we can type until the end of the input.
    valueRightElementWidth: showInputOverlay ? valueRightElementWidth : 0,
  });

  useEffect(() => {
    const hasValue = Boolean(selectedOption) || Boolean(selectValue);
    const hasRightElement = hasSections || Boolean(selectedOption?.avatarProps?.badge) || Boolean(valueRightElement);

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowInputOverlay(hasRightElement && hasValue && !isFocused);
  }, [hasSections, selectedOption, valueRightElement, selectValue, isFocused]);

  const inputOverlayValue = selectedOption?.label ?? selectValue;

  if (isViewMode) {
    return (
      <Box
        ref={ref}
        __css={styles['triggerOverlay']}
        data-disabled={isDisabled || null}
        data-readonly={isReadOnly || null}
        data-view-mode={isViewMode || null}
        data-testid={props['data-testid']}
      >
        <Text
          textStyle="inline"
          color={inputOverlayValue ? 'inherit' : 'semantic.text.secondary'}
          shouldSupportEllipsis
        >
          {value?.length ? value : (props.viewModePlaceholder ?? props.placeholder)}
        </Text>
        {valueRightElement && (
          <Box ref={valueRightElementRef} __css={styles['valueRightElement']}>
            {valueRightElement}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <>
      <TextField
        data-component="BaseSelect.Input"
        ref={ref}
        sx={styles['trigger']}
        {...getTestId('input')}
        {...props}
        onFocus={(e) => {
          setTimeout(() => {
            setIsFocused(true);
            onFocus?.(e);
          });
        }}
        onBlur={(e) => {
          setTimeout(() => {
            setIsFocused(false);
            onBlur?.(e);
          });
        }}
        size={size}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isViewMode={isViewMode}
        leftElement={leftElement}
        rightElement={rightElement}
        value={value}
        autoFocus={autoFocus}
      />
      {showInputOverlay && (
        <Box
          __css={styles['triggerOverlay']}
          data-disabled={isDisabled || null}
          data-readonly={isReadOnly || null}
          data-view-mode={isViewMode || null}
          {...getTestId('input', 'overlay')}
        >
          {inputOverlayValue && (
            <Text textStyle="inline" color="inherit" shouldSupportEllipsis>
              {inputOverlayValue}
            </Text>
          )}
          {valueRightElement && (
            <Box ref={valueRightElementRef} __css={styles['valueRightElement']}>
              {valueRightElement}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export const Input = forwardRef(InputComponent) as <T>(
  props: InputProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof InputComponent>;

(Input as NamedExoticComponent).displayName = 'BaseSelect.Input';
