/* eslint-disable max-lines */
import { usePrevious } from '@chakra-ui/react';
import { type GetTestId, isEqual, uniqueId, useTestId } from '@melio/penny-utils';
import { type ChangeEvent, type FocusEvent, type MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { type MenuContextProps, type OpenChangeTriggerEvent } from '@/components/containers/menus/Context';
import { type DropdownListProps as _DropdownListProps } from '@/components/containers/menus/Context/components/DropdownList';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';
import { useControlled } from '@/utils/useControlled';

import { type ComboboxOption, type ComboboxProps, type SelectedOption } from '../Combobox.types';
import { checkHasSections, getFlatOptions } from '../Combobox.utils';
import { type EmptyStateProps, type LoadingStateProps, type MobileViewProps, type TriggerProps } from '../components';
import { getContainerId, useA11yStatusMessage } from './useA11yStatusMessage';
import { type GetOptionProps, useOptionProps } from './useOptionProps';

type UseComboboxProps<V, O extends ComboboxOption<V>> = ComboboxProps<V, O>;

type MenuA11yProps = Pick<MenuContextProps, 'aria-labelledby' | 'role'>;

type DropdownListProps = Pick<_DropdownListProps, 'as' | 'data-testid' | 'role'> & { tabIndex?: number };

type UseComboboxReturn<V, O extends ComboboxOption<V>> = Pick<ComboboxProps<V, O>, 'options' | 'isLoadingOptions'> & {
  triggerProps: TriggerProps<V, O>;
  menuProps: Pick<
    MenuContextProps,
    | 'aria-label'
    | 'aria-orientation'
    | 'disableTypeahead'
    | 'disableOpenByTriggerClick'
    | 'isVirtualList'
    | 'initialFocus'
    | 'header'
    | 'footer'
    | 'hasItems'
    | 'isOpen'
    | 'isReadOnly'
    | 'isDisabled'
    | 'onOpenChange'
    | 'maxHeight'
    | 'width'
    | 'maxWidth'
    | 'disableMenuShift'
  > &
    MenuA11yProps;
  dropdownListProps: DropdownListProps;
  getOptionProps: GetOptionProps<V, O>;
  loadingStateProps: LoadingStateProps<V, O>;
  emptyStateProps: EmptyStateProps<V, O>;
  mobileViewProps: MobileViewProps<V, O>;
  getTestId: GetTestId;
  isMobile: boolean;
};

export const useCombobox = <V, O extends ComboboxOption<V>>({
  options: optionsList,
  value,
  isLoading,
  isReadOnly,
  isDisabled,
  isMenuOpen,
  isLoadingOptions,
  loadingState,
  emptyState,
  header,
  footer,
  'data-testid': dataTestId = 'combobox',
  onClick,
  onChange,
  onFocus,
  onBlur,
  onClear,
  onMenuClose,
  optionRenderer,
  id: idProp,
  menuWidth = 'match-trigger',
  menuMaxWidth,
  menuAriaLabel,
  menuStatusMessages: { empty = 'No options', loading = 'Loading...' } = {},
  mobileViewProps,
  error,
  labelProps,
  helperText,
  showOptionalIndicator,
  'aria-labelledby': ariaLabelledByProp,
  inputValue: inputValueProp,
  onInputChange,
  defaultInputValue = '',
  ...otherProps
}: UseComboboxProps<V, O>): UseComboboxReturn<V, O> => {
  const isUncontrolled = value && !onChange;

  useEffect(() => {
    if (isUncontrolled) {
      // eslint-disable-next-line no-console -- We need to log a warning if `value` is provided without `onChange`.
      console.error(
        'Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. Please set either `onChange` or `isReadOnly`.'
      );
    }
  }, [isUncontrolled]);

  const [options, setOptions] = useState<UseComboboxProps<V, O>['options']>(optionsList);

  // Makes sure we get the latest options list.
  useEffect(() => {
    if (isLoadingOptions) return;

    setOptions(optionsList);
  }, [isLoadingOptions, optionsList]);

  const flatOptions = useMemo(() => getFlatOptions(options), [options]);
  // The option in the options list that matches the value passed to the component or `null` if not found.
  const foundOption = useMemo(
    () => flatOptions.find((option) => isEqual(option.value, value)) ?? null,
    [flatOptions, value]
  );
  const valueNotFound = value && !foundOption;
  const [selectedOption, setSelectedOption] = useState<SelectedOption<V, O>>(foundOption);
  const [showInputCaret, setShowInputCaret] = useState(false);
  const [updateInputCaret, setUpdateInputCaret] = useState(true);
  const [inputValue, setInputValue] = useControlled(inputValueProp, onInputChange, defaultInputValue);

  const handleInputChange = useCallback(
    (newInputValue: string) => {
      setInputValue(newInputValue);

      if (newInputValue) setShowInputCaret(true);
    },
    [setInputValue]
  );

  // This effect is used to update the selected option from the outside.
  // We skip the update if a value is passed but it's not found in the options list (while filtering or loading) causing it to disappear.
  useEffect(() => {
    if (isUncontrolled || valueNotFound || isEqual(foundOption, selectedOption)) return;

    setSelectedOption(foundOption);
    handleInputChange('');
  }, [foundOption, handleInputChange, isUncontrolled, selectedOption, valueNotFound]);

  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const [isMobileView, setIsMobileView] = useState(false);
  const prevSelectedOption = usePrevious(selectedOption);
  const shouldIgnoreSelectionChange = isEqual(selectedOption, prevSelectedOption) || !foundOption;

  // Closes the mobile view when a new option is selected but NOT on clear.
  useEffect(() => {
    if (isUncontrolled || shouldIgnoreSelectionChange) return;

    if (isMobile) setIsMobileView(false);
  }, [isMobile, isUncontrolled, shouldIgnoreSelectionChange]);

  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = (nextOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => {
    setIsOpen(nextOpen);

    if (nextOpen) setShowInputCaret(true);

    // Resets the input value on outside click or moving focus to the clear button.
    if (triggerEvent === 'outside') handleInputChange('');

    if (!nextOpen) onMenuClose?.();
  };

  // We use `isMenuOpen` to allow the menu state to be controlled from the outside.
  useEffect(() => {
    if (isMenuOpen === undefined) return;

    onOpenChange(isMenuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We don't need to add `onOpenChange` because it's a stable function.
  }, [isMenuOpen]);

  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string>();

  const handleChange = (newSelectedOption: SelectedOption<V, O>) => {
    if (isUncontrolled || newSelectedOption?.disabled) return;

    onOpenChange(false);
    setSelectedOption(newSelectedOption);
    setSelectedOptionLabel(newSelectedOption?.label);
    handleInputChange('');

    // Hides the input caret on selection in desktop view.
    if (newSelectedOption && !isMobileView) {
      setShowInputCaret(false);
      setUpdateInputCaret(false);
    }

    if (isMobile && newSelectedOption) {
      setIsMobileView(false);
    }

    const isNewSelectedOption = !isEqual(newSelectedOption, selectedOption);
    if (isNewSelectedOption)
      onChange?.({ target: { value: newSelectedOption?.value ?? null } } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const id = useMemo(() => idProp ?? uniqueId('combobox-'), [idProp]);
  const idPrefix = useMemo(() => uniqueId(`${id}-`), [id]);

  useA11yStatusMessage({
    selectedOptionLabel,
    isLoadingOptions,
    loadingMessage: loading,
    emptyMessage: empty,
    isOpen,
    optionsCount: flatOptions.length,
    idPrefix,
    isMobileTrigger: isMobile && !isMobileView,
  });

  const getTestId = useTestId(dataTestId);

  const getOptionProps = useOptionProps({
    selectedOption,
    onSelect: handleChange,
    getTestId,
    optionRenderer,
  });

  const ariaLabelledBy = isMobileView && ariaLabelledByProp ? `mobile-view-${ariaLabelledByProp}` : ariaLabelledByProp;

  const hasItems = useMemo(
    () => Boolean(flatOptions.length && !isLoadingOptions),
    [flatOptions.length, isLoadingOptions]
  );

  const isDialog = Boolean(footer);
  const listboxProps: MenuA11yProps = {
    role: hasItems ? 'listbox' : undefined,
    // We need to associate the form-field label with the listbox for a11y if `menuAriaLabel` is not provided.
    ...(menuAriaLabel ? { 'aria-label': menuAriaLabel } : { 'aria-labelledby': ariaLabelledBy }),
  };
  const dialogProps: MenuA11yProps = {
    role: 'dialog',
    'aria-labelledby': ariaLabelledBy,
  };

  const [isFocused, setIsFocused] = useState(false);

  const triggerProps = {
    onClick: (event: MouseEvent<HTMLInputElement>) => {
      setShowInputCaret(true);
      onClick?.(event);
    },
    onSelect: handleChange,
    onFocus: (event: FocusEvent<HTMLInputElement>) => {
      if (updateInputCaret) setShowInputCaret(true);

      if (isFocused) return;

      setIsFocused(true);
      onFocus?.(event);
    },
    onBlur: (event: FocusEvent<HTMLInputElement>) => {
      setShowInputCaret(false);
      setUpdateInputCaret(true);

      if (isOpen) return;

      handleInputChange('');
      setIsFocused(false);
      onBlur?.(event);
    },
    onClear: () => {
      handleChange(null);
      handleInputChange('');
      onClear?.();
    },
    inputValue,
    onInputChange: handleInputChange,
    isFormContext: Boolean(labelProps),
    isOpenWithItems: isOpen && hasItems,
    isLoading,
    isReadOnly,
    isDisabled,
    showInputCaret,
    selectedOption,
    options: flatOptions,
    id,
    containerId: getContainerId(idPrefix),
    getTestId,
    // We pass this explicitly so the input in mobile-view gets the correct attribute.
    'aria-labelledby': ariaLabelledByProp,
    ...otherProps,
  };

  const menuProps = {
    width: menuWidth,
    maxWidth: menuMaxWidth,
    maxHeight: '300px',
    header,
    footer,
    isReadOnly: isReadOnly || isLoading,
    isDisabled,
    isOpen,
    onOpenChange,
    disableMenuShift: true,
    disableTypeahead: true,
    disableOpenByTriggerClick: true,
    isVirtualList: true,
    initialFocus: -1,
    hasItems,
    ...(isDialog ? dialogProps : ({ ...listboxProps, role: 'listbox' } as MenuA11yProps)),
    // We need to reset the orientation because the menu is vertical by default.
    'aria-orientation': undefined,
    ...getTestId('menu'),
  };
  const { width, maxWidth, maxHeight, disableMenuShift, ...mobileMenuProps } = menuProps;

  const dropdownListProps: DropdownListProps = {
    as: !hasItems || checkHasSections(options) ? 'div' : 'ul',
    ...(isDialog && listboxProps),
    ...getTestId('content'),
    // This is to remove the options list from the tab order when the menu is scrollable.
    tabIndex: -1,
  };

  return {
    isLoadingOptions,
    options,
    triggerProps,
    menuProps,
    dropdownListProps,
    getOptionProps,
    loadingStateProps: {
      loadingState: loadingState ?? loading,
      ...getTestId('loading-state'),
    },
    emptyStateProps: {
      emptyState: emptyState ?? empty,
      ...getTestId('empty-state'),
    },
    mobileViewProps: {
      isOpen: isMobileView,
      setIsOpen: setIsMobileView,
      getTestId,
      triggerProps,
      fieldContext: labelProps && { error, labelProps, helperText, showOptionalIndicator },
      ...(mobileViewProps?.['aria-label']
        ? { 'aria-label': mobileViewProps['aria-label'] }
        : // We need to at least associate the form-field label with the dialog for a11y if `aria-label` is not provided.
          { 'aria-labelledby': ariaLabelledBy }),
      mobileMenuProps: {
        ...mobileMenuProps,
        // We need more space between the trigger and the dropdown when there is an error message or helper text.
        triggerDropdownGap: error?.message || helperText ? 36 : 16,
      },
      dropdownListProps,
      ...mobileViewProps,
    },
    getTestId,
    isMobile,
  };
};
