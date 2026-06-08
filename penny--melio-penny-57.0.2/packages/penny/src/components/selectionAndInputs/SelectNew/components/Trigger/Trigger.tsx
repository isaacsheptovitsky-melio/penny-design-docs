import { Box, InputGroup } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { isEmpty, uniqueId, useTestId } from '@melio/penny-utils';
import { type ForwardedRef, forwardRef, type NamedExoticComponent, useMemo, useRef } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Typography } from '@/components/dataDisplay/typography';
import { useFormControlContext } from '@/components/internal';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';

import { type SelectedOption, type SelectNewOption, type SelectNewProps } from '../../SelectNew.types';
import { ClearButton, TriggerInput, TriggerRightElement, TriggerValue } from './components';
import { useElementWidth, useTriggerFocus } from './hooks';

export type TriggerProps<V, O extends SelectNewOption<V>> = {
  selectedOption: SelectedOption<V, O>;
  isOpen: boolean;
  containerId: string;
  isButton: boolean;
} & Pick<
  SelectNewProps<V, O>,
  | 'id'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isRequired'
  | 'isViewMode'
  | 'isInvalid'
  | 'isLoading'
  | 'onClick'
  | 'onBlur'
  | 'onFocus'
  | 'onClear'
  | 'size'
  | 'placeholder'
  | 'viewModePlaceholder'
  | 'shouldHideClearButton'
  | 'clearButtonAriaLabel'
  | 'valueRenderer'
  | 'data-testid'
  | 'aria-required'
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'autoFocus'
>;

const TriggerComponent = <V, O extends SelectNewOption<V>>(
  {
    selectedOption,
    placeholder = 'Select',
    viewModePlaceholder,
    size = 'large',
    isDisabled,
    isReadOnly,
    isViewMode,
    isInvalid,
    isLoading,
    isRequired: isRequiredProp,
    'aria-required': ariaRequired,
    isOpen,
    autoFocus = false,
    shouldHideClearButton = false,
    clearButtonAriaLabel = 'Clear selected option',
    'data-testid': dataTestId = 'select',
    onClear,
    onFocus,
    onBlur,
    valueRenderer,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledByProp,
    id,
    containerId,
    isButton,
    ...otherProps
  }: TriggerProps<V, O>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const getTestId = useTestId(dataTestId);
  const isFormContext = !isEmpty(useFormControlContext());
  const formFieldPlaceholder = viewModePlaceholder ?? placeholder;
  const standalonePlaceholder = isViewMode && viewModePlaceholder ? viewModePlaceholder : placeholder;
  const placeholderValue = isFormContext ? formFieldPlaceholder : standalonePlaceholder;
  const enabled = !(isDisabled || isLoading || isViewMode || isReadOnly);
  const isFocusable = !isDisabled && !isViewMode;
  const showClearButton = !shouldHideClearButton && Boolean(selectedOption) && enabled;
  const showRightElement = !isViewMode || isLoading;

  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRefs = useMergeRefs([ref, inputRef]);

  const triggerLabel = selectedOption?.label;

  const valueId = useMemo(() => uniqueId(id ? `${id}-value-` : 'value-'), [id]);
  const loadingId = useMemo(
    () => (isLoading ? uniqueId(id ? `${id}-loading-` : 'loading-') : undefined),
    [id, isLoading]
  );
  const readOnlyId = useMemo(
    () => (isReadOnly ? uniqueId(id ? `${id}-readOnly-` : 'readOnly-') : undefined),
    [id, isReadOnly]
  );
  const isRequired = Boolean(isRequiredProp || ariaRequired);
  const shouldRenderRequiredMessage = isRequired && isButton;
  const requiredId = useMemo(
    () => (shouldRenderRequiredMessage ? uniqueId(id ? `${id}-required-` : 'required-') : undefined),
    [id, shouldRenderRequiredMessage]
  );
  const ariaLabelledBy = ariaLabelledByProp ?? ((isFormContext || id) && `${id}-label`);
  const a11yProps = {
    // We pass `aria-describedby` to associate the combobox to its value container and also the loading and read-only messages.
    ...getAriaProps('aria-describedby', [valueId, loadingId, readOnlyId, ariaDescribedBy, requiredId]),
    // We pass `aria-labelledby` to associate the combobox to its label when in form context.
    ...getAriaProps('aria-labelledby', [ariaLabelledBy]),
    // We pass `aria-label` so the combobox has a label when NOT in form context.
    ...getAriaProps('aria-label', [!(isFormContext || id) && !ariaLabelledBy && (triggerLabel || placeholderValue)]),
  };

  const { isFocused, ...focusProps } = useTriggerFocus({ autoFocus, isOpen, isFocusable, inputRef, onFocus, onBlur });
  const { elementRef: rightElementRef, elementWidth: rightElementWidth } = useElementWidth({ isLoading });
  const { elementRef: clearButtonRef, elementWidth: clearButtonWidth } = useElementWidth({ isLoading });
  const styles = useMultiStyleConfig('SelectNew', {
    hasCustomValue: Boolean(valueRenderer),
    showClearButton,
    rightElementWidth,
    clearButtonWidth,
  });

  if (isViewMode)
    return (
      <Typography.MainLabel
        ref={ref}
        data-component="SelectNew"
        data-view-mode
        {...getTestId('trigger')}
        label={triggerLabel}
        placeholder={placeholderValue}
        data-value={selectedOption ? String(selectedOption.value) : undefined}
      />
    );

  return (
    <InputGroup data-component="SelectNew" {...getTestId()} id={containerId}>
      <Box
        data-component="SelectNew.Trigger"
        sx={styles['trigger']}
        className={size}
        {...getTestId('trigger')}
        data-readonly={isReadOnly || isLoading || undefined}
        data-disabled={isDisabled || undefined}
        data-loading={isLoading || undefined}
        data-invalid={isInvalid || undefined}
        data-focus={isFocused || undefined}
      >
        <TriggerValue
          selectedOption={selectedOption}
          valueRenderer={valueRenderer}
          isDisabled={isDisabled}
          placeholder={placeholderValue}
          id={valueId}
          {...getTestId('trigger-value')}
        />
        <TriggerInput
          ref={mergedRefs}
          {...getTestId('trigger-input')}
          {...a11yProps}
          {...otherProps}
          {...focusProps}
          id={id}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isLoading={isLoading}
          isRequired={isRequired}
          isButton={isButton}
        />
        {/* This is needed to announce read-only state */}
        {isReadOnly && (
          <VisuallyHidden aria-live="polite" id={readOnlyId}>
            read only
          </VisuallyHidden>
        )}
        {/* This is needed to announce the field as required when we use a button as a trigger */}
        {shouldRenderRequiredMessage && (
          <VisuallyHidden aria-live="polite" id={requiredId}>
            , required
          </VisuallyHidden>
        )}
      </Box>
      {showRightElement && (
        <TriggerRightElement
          isOpen={isOpen}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isReadOnly={isReadOnly}
          loadingId={loadingId}
          refCallback={rightElementRef}
        />
      )}
      {showClearButton && (
        <ClearButton
          ref={clearButtonRef}
          aria-label={clearButtonAriaLabel}
          {...getTestId('clear-button')}
          onClick={(event) => {
            event.stopPropagation();
            onClear?.();
            inputRef.current?.focus();
          }}
        />
      )}
    </InputGroup>
  );
};

export const Trigger = forwardRef(TriggerComponent) as <V, O extends SelectNewOption<V>>(
  props: TriggerProps<V, O> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof TriggerComponent>;

(Trigger as NamedExoticComponent).displayName = 'SelectNew.Trigger';
