import { Box, Input, InputGroup } from '@chakra-ui/react';
import { isEmpty, useBoolean, useTestId } from '@melio/penny-utils';
import { type UseSelectGetToggleButtonReturnValue } from 'downshift';
import {
  type FocusEvent,
  type ForwardedRef,
  forwardRef,
  type MouseEvent,
  type NamedExoticComponent,
  useCallback,
  useState,
} from 'react';

import { themeSpaces } from '../../../../theme/foundations';
import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';
import { Text } from '../../../dataDisplay';
import { Loader } from '../../../foundations/Loader';
import { useFormControlContext } from '../../FormControl';
import { InputRightElement } from '../../InputRightElement';
import { type BaseTriggerProps, type Option } from '../BaseSelect.types';
import { TriggerRightIcon } from './TriggerRightIcon';

type ToggleButtonProps<T> = {
  selectValue?: null | Option<T> | Option<T>[];
} & BaseTriggerProps<T> &
  UseSelectGetToggleButtonReturnValue;

const ToggleButtonComponent = <T,>(
  {
    selectValue,
    placeholder = 'Select',
    viewModePlaceholder,
    size,
    isDisabled,
    isReadOnly,
    isViewMode,
    isInvalid,
    isLoading,
    'aria-expanded': ariaExpanded,
    id,
    onClick,
    onFocus,
    onBlur,
    ...props
  }: ToggleButtonProps<T>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const getTestId = useTestId('base-select');

  const [rightElementWidth, setRightElementWidth] = useState<number | null>(null);

  const rightElementRef = useCallback((ref: HTMLElement | null) => {
    if (!ref) return;

    setRightElementWidth(ref.clientWidth);
  }, []);

  const value = Array.isArray(selectValue) ? selectValue.map(({ label }) => label).join(', ') : selectValue?.label;

  const isFormContext = !isEmpty(useFormControlContext());
  const formFieldPlaceholder = viewModePlaceholder ?? placeholder;
  const standalonePlaceholder = isViewMode && viewModePlaceholder ? viewModePlaceholder : placeholder;
  const placeholderValue = isFormContext ? formFieldPlaceholder : standalonePlaceholder;
  const disableClick = isDisabled || isLoading || isReadOnly || isViewMode;
  const isFocusable = !isDisabled && !isViewMode;

  const styles = useMultiStyleConfig('BaseSelect', { isViewMode, placeholderValue });

  const sharedProps = {
    'aria-disabled': isDisabled || undefined,
    'data-readonly': isReadOnly || isLoading || isViewMode || undefined,
    'data-loading': isLoading || undefined,
    'data-view-mode': isViewMode || undefined,
    'data-invalid': isInvalid || undefined,
  };

  const toggleTrigger = useCallback(
    (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (disableClick) return;

      event.stopPropagation();

      onClick?.(event);
    },
    [onClick, disableClick]
  );

  const [triggerIsFocused, setTriggerIsFocused] = useBoolean(false);
  const [isHovered, setIsHovered] = useBoolean(false);

  return (
    // Using chakra's `Input` so we can inherit the styles for the button from `form.utils.ts`.
    <InputGroup>
      {/* Used as hidden input for accessibility reasons make the screen reader announce the select elements properly */}
      <Input
        data-component="BaseSelect.ToggleButton"
        ref={ref as never}
        sx={styles['triggerInput']}
        className={size}
        {...getTestId('trigger-input')}
        {...props}
        id={id}
        // using `onMouseDown` to prevent the menu from opening when the user clicking label in form context.
        onMouseDown={toggleTrigger}
        aria-expanded={ariaExpanded}
        placeholder={placeholderValue}
        tabIndex={isFocusable ? 0 : -1}
        {...sharedProps}
        onFocus={(e: FocusEvent<HTMLInputElement, Element>) => {
          setTriggerIsFocused.on();

          if (disableClick) return;

          onFocus?.(e);
        }}
        onBlur={(e) => {
          setTriggerIsFocused.off();

          if (disableClick) return;

          onBlur?.(e);
        }}
        onMouseOver={setIsHovered.on}
        onMouseOut={setIsHovered.off}
      />
      {/* trigger UI is used to display the selected option or the placeholder */}
      <Input
        as="div"
        sx={styles['trigger']}
        className={size}
        {...getTestId('trigger-value')}
        id={`select-trigger-ui${id ? `-${id}` : ''}`}
        {...sharedProps}
        paddingRight={rightElementWidth ? `calc(${rightElementWidth}px + ${themeSpaces.xs})` : 'none'}
        data-focus={triggerIsFocused || undefined}
        data-hover={(!triggerIsFocused && isHovered) || undefined}
        // tabIndex is set to -1 to prevent the trigger from being focused when the user presses the tab key
        tabIndex={-1}
        aria-hidden
        data-ui-only
      >
        {value ? (
          <Text textStyle="inline" color="inherit" shouldSupportEllipsis aria-hidden>
            {value}
          </Text>
        ) : (
          <Box
            __css={styles['placeholder']}
            data-disabled={isDisabled || undefined}
            data-readonly={isReadOnly || undefined}
            aria-hidden
          />
        )}
      </Input>
      <InputRightElement ref={rightElementRef} sx={styles['toggleButtonRightElement']}>
        {isLoading ? (
          <Box as={Loader} __css={styles['loader']} />
        ) : (
          <TriggerRightIcon
            aria-label="Toggle select dropdown menu"
            icon={ariaExpanded ? 'caret-up' : 'caret-down'}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isViewMode={isViewMode}
            onClick={toggleTrigger}
          />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export const ToggleButton = forwardRef(ToggleButtonComponent) as <T>(
  props: ToggleButtonProps<T> & { ref?: ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof ToggleButtonComponent>;

(ToggleButton as NamedExoticComponent).displayName = 'BaseSelect.ToggleButton';
