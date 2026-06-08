import { Box, InputGroup } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { type GetTestId } from '@melio/penny-utils';
import { forwardRef, type MouseEvent, type NamedExoticComponent, type ReactNode, type Ref, useRef } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Typography } from '@/components/dataDisplay/typography';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';
import { getAriaProps } from '@/utils/getAriaProps';

import { type ComboboxOption, type ComboboxProps } from '../../Combobox.types';
import {
  TriggerInput,
  type TriggerInputProps,
  TriggerLeftElement,
  TriggerRightElement,
  TriggerValue,
  type TriggerValueProps,
} from './components';
import { useTriggerStyles } from './hooks';

export type TriggerProps<V, O extends ComboboxOption<V>> = {
  isFormContext: boolean;
  id: string;
  containerId: string;
  getTestId: GetTestId;
  inputLeftElement?: ReactNode;
} & TriggerInputProps<V, O> &
  TriggerValueProps<V, O> &
  Pick<
    ComboboxProps<V, O>,
    | 'viewModePlaceholder'
    | 'size'
    | 'isViewMode'
    | 'isInvalid'
    | 'isLoading'
    | 'aria-required'
    | 'aria-describedby'
    | 'aria-labelledby'
    | 'onClear'
    | 'clearButtonAriaLabel'
  >;

const TriggerComponent = <V, O extends ComboboxOption<V>>(
  {
    selectedOption,
    placeholder = 'Search',
    viewModePlaceholder,
    size = 'large',
    isFormContext,
    isDisabled,
    isReadOnly,
    isViewMode,
    isInvalid,
    isLoading,
    isRequired,
    'aria-required': ariaRequired,
    'aria-describedby': ariaDescribedByProp,
    'aria-labelledby': ariaLabelledByProp,
    id,
    containerId,
    getTestId,
    clearButtonAriaLabel = 'Clear selected option',
    onClear,
    valueRenderer,
    inputValue,
    showInputCaret,
    isMobileTrigger,
    inputLeftElement,
    ...otherProps
  }: TriggerProps<V, O>,
  ref: Ref<HTMLInputElement>
) => {
  const placeholderValue = isViewMode && viewModePlaceholder ? viewModePlaceholder : placeholder;
  const isInteractive = !(isDisabled || isLoading || isReadOnly);
  const showClearButton = !inputValue && Boolean(selectedOption) && isInteractive && !isMobileTrigger;
  const showRightElement = isLoading || showClearButton;
  const showLeftElement = inputLeftElement !== null;

  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRefs = useMergeRefs([ref, inputRef]);

  const { refs, styleProps } = useTriggerStyles({
    hasCustomValue: Boolean(valueRenderer),
    showRightElement,
    showLeftElement,
    size,
  });

  const sharedProps = {
    isMobileTrigger,
    inputValue,
    showInputCaret: showInputCaret && isInteractive && !isMobileTrigger,
    isDisabled,
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClear?.();
    inputRef.current?.focus();
  };

  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const isMobileView = isMobile && !isMobileTrigger;
  const ariaDescribedBy =
    isMobileView && ariaDescribedByProp ? `mobile-view-${ariaDescribedByProp}` : ariaDescribedByProp;
  const ariaLabelledBy = isMobileView && ariaLabelledByProp ? `mobile-view-${ariaLabelledByProp}` : ariaLabelledByProp;
  // The value and placeholder are announced by the `aria-label` attribute when the combobox is not in form context.
  const valueId = isFormContext ? `${id}-value` : undefined;
  const loadingId = isLoading ? `${id}-loading` : undefined;
  const readOnlyId = isReadOnly ? `${id}-readOnly` : undefined;
  const a11yProps = {
    ...getAriaProps('aria-describedby', [valueId, loadingId, readOnlyId, ariaDescribedBy]),
    // We pass `aria-labelledby` to associate the combobox to its label when in form context.
    ...getAriaProps('aria-labelledby', [ariaLabelledBy]),
    // We pass `aria-label` so the combobox has a label when NOT in form context.
    ...getAriaProps('aria-label', [!ariaLabelledBy && (selectedOption?.label || placeholderValue)]),
  };

  if (isViewMode) {
    return (
      <Typography.MainLabel
        ref={ref}
        data-component="Combobox"
        {...getTestId('trigger')}
        data-view-mode
        label={selectedOption?.label ?? ''}
        placeholder={placeholderValue}
      />
    );
  }

  return (
    <InputGroup id={isMobileTrigger ? undefined : containerId} data-component="Combobox" {...getTestId()}>
      {showLeftElement && (
        <TriggerLeftElement
          ref={refs.leftElement}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly || isLoading}
          leftElement={inputLeftElement}
        />
      )}
      <Box
        data-component="Combobox"
        {...getTestId('trigger')}
        data-readonly={isReadOnly || isLoading || undefined}
        data-disabled={isDisabled || undefined}
        data-loading={isLoading || undefined}
        data-invalid={isInvalid || undefined}
        {...styleProps}
      >
        <TriggerValue
          selectedOption={selectedOption}
          valueRenderer={valueRenderer}
          placeholder={placeholderValue}
          id={valueId}
          {...getTestId('trigger-value')}
          {...sharedProps}
        />
        <TriggerInput
          ref={mergedRefs}
          id={id}
          isReadOnly={isReadOnly}
          isLoading={isLoading}
          isRequired={isRequired || Boolean(ariaRequired)}
          {...getTestId('trigger-input')}
          {...sharedProps}
          {...a11yProps}
          {...otherProps}
        />
        {/* This is needed to announce read-only state */}
        {isReadOnly && (
          <VisuallyHidden aria-live="polite" id={readOnlyId}>
            read only
          </VisuallyHidden>
        )}
      </Box>
      {showRightElement && (
        <TriggerRightElement
          // TODO:https://meliorisk.atlassian.net/browse/ME-110373
          // eslint-disable-next-line react-hooks/refs
          ref={refs.rightElement}
          aria-label={clearButtonAriaLabel}
          onClick={handleClear}
          isLoading={isLoading}
          loadingId={loadingId}
          {...getTestId('clear-button')}
        />
      )}
    </InputGroup>
  );
};

export const Trigger = forwardRef(TriggerComponent) as <V, O extends ComboboxOption<V>>(
  props: TriggerProps<V, O> & { ref?: Ref<HTMLInputElement> }
) => ReturnType<typeof TriggerComponent>;

(Trigger as NamedExoticComponent).displayName = 'Combobox.Trigger';
