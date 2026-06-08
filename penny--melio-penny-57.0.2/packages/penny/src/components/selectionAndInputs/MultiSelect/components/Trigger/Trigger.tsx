import { Box, InputGroup } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { type GetTestId, isEmpty, uniqueId } from '@melio/penny-utils';
import {
  type ForwardedRef,
  forwardRef,
  type MouseEvent,
  type NamedExoticComponent,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { useMenuContext } from '@/components/containers/menus/Context';
import { Typography } from '@/components/dataDisplay/typography';
import { useFormControlContext } from '@/components/internal';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';

import { type MultiSelectOption, type MultiSelectProps } from '../../MultiSelect.types';
import { TriggerInput, TriggerRightElement, TriggerValue } from './components';
import { useRightElementWidth, useTriggerFocus } from './hooks';

export type TriggerProps<V, O extends MultiSelectOption<V>> = {
  selectedOptions: O[];
  isOpen: boolean;
  containerId: string;
  getTestId: GetTestId;
} & Pick<
  MultiSelectProps<V, O>,
  | 'id'
  | 'isDisabled'
  | 'isReadOnly'
  | 'isViewMode'
  | 'isInvalid'
  | 'isLoading'
  | 'onClick'
  | 'onBlur'
  | 'onFocus'
  | 'size'
  | 'placeholder'
  | 'viewModePlaceholder'
  | 'valueRenderer'
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'autoFocus'
>;

const TriggerComponent = <V, O extends MultiSelectOption<V>>(
  {
    selectedOptions,
    placeholder = 'Select',
    viewModePlaceholder,
    size = 'large',
    isDisabled,
    isReadOnly,
    isViewMode,
    isInvalid,
    isLoading,
    isOpen,
    autoFocus = false,
    getTestId,
    onClick,
    onFocus,
    onBlur,
    valueRenderer,
    'aria-describedby': ariaDescribedBy,
    'aria-labelledby': ariaLabelledByProp,
    id,
    containerId,
    ...otherProps
  }: TriggerProps<V, O>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const isFormContext = !isEmpty(useFormControlContext());
  const formFieldPlaceholder = viewModePlaceholder ?? placeholder;
  const standalonePlaceholder = isViewMode && viewModePlaceholder ? viewModePlaceholder : placeholder;
  const placeholderValue = isFormContext ? formFieldPlaceholder : standalonePlaceholder;
  const disableClick = Boolean(isDisabled || isLoading || isViewMode || isReadOnly);
  const isFocusable = !isDisabled && !isViewMode;

  const inputRef = useRef<HTMLInputElement>(null);
  const mergedRefs = useMergeRefs([ref, inputRef]);
  const { setActiveIndex } = useMenuContext();

  const toggleMenu = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (disableClick) return;

      onClick?.(event);

      if (!isOpen) {
        inputRef.current?.focus();
        setActiveIndex(0);
      }
    },
    [disableClick, isOpen, onClick, setActiveIndex]
  );

  const triggerLabel = selectedOptions.map(({ label }) => label).join(', ');

  const valueId = useMemo(() => uniqueId(id ? `${id}-value-` : 'value-'), [id]);
  const loadingId = useMemo(
    () => (isLoading ? uniqueId(id ? `${id}-loading-` : 'loading-') : undefined),
    [id, isLoading]
  );
  const readOnlyId = useMemo(
    () => (isReadOnly ? uniqueId(id ? `${id}-readOnly-` : 'readOnly-') : undefined),
    [id, isReadOnly]
  );
  const ariaLabelledBy = ariaLabelledByProp ?? ((isFormContext || id) && `${id}-label`);
  const a11yProps = {
    ...getAriaProps('aria-describedby', [valueId, loadingId, readOnlyId, ariaDescribedBy]),
    // We pass `aria-labelledby` to associate the combobox to its label when in form context.
    ...getAriaProps('aria-labelledby', [ariaLabelledBy]),
    // We pass `aria-label` so the combobox has a label when NOT in form context.
    ...getAriaProps('aria-label', [
      !(isFormContext || id) && !ariaLabelledBy && (triggerLabel.length ? triggerLabel : placeholderValue),
    ]),
  };

  const { isFocused, ...focusProps } = useTriggerFocus({ autoFocus, isOpen, isFocusable, inputRef, onFocus, onBlur });
  const { rightElementWidth, rightElementRef } = useRightElementWidth({ isLoading });
  const styles = useMultiStyleConfig('MultiSelect', { hasCustomValue: Boolean(valueRenderer), rightElementWidth });

  if (isViewMode)
    return (
      <Typography.MainLabel
        ref={ref}
        data-component="MultiSelect"
        data-view-mode
        {...getTestId('trigger')}
        label={triggerLabel}
        placeholder={placeholderValue}
      />
    );

  return (
    <InputGroup data-component="MultiSelect" {...getTestId()} id={containerId}>
      <Box
        data-component="MultiSelect.Trigger"
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
          selectedOptions={selectedOptions}
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
          onClick={toggleMenu}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isLoading={isLoading}
        />
        {/* This is needed to announce read-only state */}
        {isReadOnly && (
          <VisuallyHidden aria-live="polite" id={readOnlyId}>
            read only
          </VisuallyHidden>
        )}
      </Box>
      <TriggerRightElement
        isOpen={isOpen}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isReadOnly={isReadOnly}
        loadingId={loadingId}
        refCallback={rightElementRef}
      />
    </InputGroup>
  );
};

export const Trigger = forwardRef(TriggerComponent) as <V, O extends MultiSelectOption<V>>(
  props: TriggerProps<V, O> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof TriggerComponent>;

(Trigger as NamedExoticComponent).displayName = 'MultiSelect.Trigger';
