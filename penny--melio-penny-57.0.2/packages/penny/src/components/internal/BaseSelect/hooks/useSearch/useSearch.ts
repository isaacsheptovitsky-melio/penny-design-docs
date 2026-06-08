import { isEqual, isMobileDevice, isNil, useTestId, useUpdateEffect } from '@melio/penny-utils';
import { useCombobox, type UseComboboxReturnValue, type UseComboboxState } from 'downshift';
import { type ChangeEvent, type FocusEvent, useEffect, useState } from 'react';

import { type BaseProps, type Option } from '../../BaseSelect.types';
import { defaultFormatSelectedValue } from '../../BaseSelect.utils';
import { type BaseUseSelectOptions, type GetOptionProps } from '../types';
import { useCreatableOption } from '../useCreatableOption';
import { useDropdownMenuProps, type UseDropdownMenuPropsReturn } from '../useDropdownMenuProps';
import { useInputProps, type UseInputPropsReturn } from '../useInputProps';
import { useOptions } from '../useOptions';
import { getOptionPropsHelper } from '../utils';
import { useSearchA11yStatusMessage } from './useSearchA11yStatusMessage';
import { useStateReducer } from './useStateReducer';

type UseSearchOptions<T> = BaseUseSelectOptions<T> &
  Pick<
    BaseProps<T>,
    | 'filterOptions'
    | 'shouldShowPresetOptions'
    | 'creatableOption'
    | 'emptyState'
    | 'formatSelectedValue'
    | 'onInputChange'
    | 'isLoading'
    | 'onSearchTermReset'
  > & {
    id?: string;
    disableInputClick?: boolean;
    onClear?: VoidFunction;
    statusMessageParentSelector?: string;
  };

type UseSearchReturn<T> = Pick<UseComboboxReturnValue<Option<T>>, 'inputValue' | 'openMenu' | 'closeMenu'> &
  UseDropdownMenuPropsReturn<T> & {
    getOptionProps: GetOptionProps<T>;
    hasSections: boolean;
    inputProps: UseInputPropsReturn;
    selectedOption?: UseComboboxState<Option<T>>['selectedItem'];
    filteredOptions: Option<T>[];
    clearSelect: VoidFunction;
  };

export const useSearch = <T>({
  ref,
  clearButtonRef,
  value,
  formatSelectedValue = defaultFormatSelectedValue,
  options: optionsList,
  filterOptions,
  shouldShowPresetOptions = false,
  creatableOption,
  emptyState,
  disableInputClick,
  isLoading,
  onClick,
  onChange,
  onInputChange,
  onKeyDown,
  onBlur,
  onSearchTermReset,
  onClear,
  id,
  statusMessageParentSelector,
}: UseSearchOptions<T>): UseSearchReturn<T> => {
  const [query, setQuery] = useState<string | null>();

  const { hasSections, options, filteredOptions, clearOptions } = useOptions({
    options: optionsList,
    filterOptions,
    query,
    shouldShowPresetOptions,
  });

  const [selectedOption, setSelectedOption] = useState<Option<T> | null | undefined>(null);

  useEffect(() => {
    // Update the selected option only if there's nothing selected, we have a value to set and the component is not loading options.
    if (selectedOption || isNil(value) || isLoading) return;

    const defaultSelectionOption = { label: value as string, value };
    const optionThatMatchesValue = options.find((option) => isEqual(option.value, value));

    // A default option to use in case we don't have any matching option to use.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedOption(optionThatMatchesValue || defaultSelectionOption);
  }, [isLoading, options, selectedOption, value]);

  const handleChange = (value: null | T) => {
    onChange?.({ target: { value } } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const clearSelectedOption = () => {
    setSelectedOption(null);
    handleChange(null);
  };

  const handleInputChange = (inputChangeValue: string) => {
    onInputChange?.(inputChangeValue);
    setQuery(inputChangeValue);
  };

  const { shouldShowCreatableOption, setShouldShowCreatableOption, newOption } = useCreatableOption({
    query,
    options,
    creatableOption,
  });

  const stateReducer = useStateReducer({
    formatSelectedValue,
    hasFilteredOptions: Boolean(filteredOptions.length),
    hasEmptyState: Boolean(emptyState),
    hasCreatableOption: shouldShowCreatableOption,
    shouldOpenMenuOnClick: !value && Boolean(options.length),
    shouldShowPresetOptions,
    clearSelectedOption,
    setQuery,
    onInputChange: handleInputChange,
    isLoading,
  });

  // manage the focusedIndex state to handle keyboard navigation.
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const resetFocusedIndex = () => setFocusedIndex(-1);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    inputValue,
    setInputValue,
    openMenu,
    closeMenu,
    selectItem,
  } = useCombobox({
    defaultHighlightedIndex: 0,
    inputId: id,
    // Make sure the new creatable option is available for keyboard navigation.
    items: [...filteredOptions, ...(shouldShowCreatableOption && newOption ? [newOption] : [])],
    itemToString: (option) => (option ? formatSelectedValue(option) : ''),
    selectedItem: selectedOption,
    onSelectedItemChange: ({ selectedItem: newSelectedOption }) => {
      setSelectedOption(newSelectedOption);

      if (newOption && newSelectedOption === newOption) {
        setShouldShowCreatableOption(false);
        creatableOption?.onClick?.(query ?? '');
      }

      if (newSelectedOption && newSelectedOption !== newOption) handleChange(newSelectedOption.value);
    },
    onHighlightedIndexChange: ({ type, highlightedIndex = -1 }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
        case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
          // set default focusedIndex to highlighted when input value changes or the user navigates the options with the keyboard.
          setFocusedIndex(highlightedIndex);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
          // when pressing the arrow down key, set the focusedIndex to the highlightedIndex or 0 if there's no focusedIndex.
          setFocusedIndex(focusedIndex < 0 ? 0 : highlightedIndex);
          break;
        default:
          // resets the focusedIndex when the user uses other types of events that change the highlightedIndex.
          resetFocusedIndex();
          break;
      }
    },
    onIsOpenChange: ({ isOpen, highlightedIndex = -1 }) => {
      if (isOpen) {
        // set the focusedIndex to the highlightedIndex when the menu is opened.
        setFocusedIndex(highlightedIndex);
      }
    },
    stateReducer,
  });

  useSearchA11yStatusMessage({
    selectedOptionLabel: isMobileDevice() ? selectedOption?.label : '',
    isOpen,
    isLoading,
    optionsCount: filteredOptions.length,
    emptyStateLabel: emptyState?.label,
    statusMessageParentSelector,
  });

  useUpdateEffect(() => {
    if (!value || isLoading) return;

    const updatedSelectedOption = options.find((option) => isEqual(option.value, value));

    if (!updatedSelectedOption) return;

    setInputValue(formatSelectedValue(updatedSelectedOption));
    selectItem(updatedSelectedOption);
  }, [value]);

  // Clears the select if `value` is falsy.
  useUpdateEffect(() => {
    if (value) return;

    setInputValue('');
    selectItem(null);
    setQuery(null);
  }, [value]);

  useEffect(() => {
    if (query === null) {
      onSearchTermReset?.();
    }
  }, [query, onSearchTermReset]);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const clearButtonClick = clearButtonRef?.current && event.relatedTarget === clearButtonRef?.current;
    const { value } = event.target as HTMLInputElement;
    if (!clearButtonClick) {
      if (!value) {
        setQuery(null);
      }

      if (!value) {
        clearSelectedOption();
      }
    }
    onBlur?.(event);
  };

  const clearSelect = () => {
    selectItem(null);
    setSelectedOption(null);
    handleChange(null);
    setQuery(null);
    clearOptions();
    onClear?.();
  };

  const { dropdownMenuProps, anchorRef } = useDropdownMenuProps({
    isOpen,
    shouldShowCreatableOption,
    getMenuProps,
    hasSections,
    options: filteredOptions,
    emptyState,
    closeMenu,
  });

  const inputProps = useInputProps({
    ref,
    getInputProps,
    onClick,
    onKeyDown,
    onBlur: handleBlur,
    disableClick: disableInputClick,
    closeMenu,
    isLoading,
  });

  return {
    anchorRef,
    dropdownMenuProps,
    inputProps,
    hasSections,
    openMenu,
    closeMenu,
    clearSelect,
    getOptionProps: getOptionPropsHelper({
      getItemProps,
      highlightedIndex,
      focusedIndex,
      getTestId: useTestId('base-select'),
      // resets the focusedIndex when the leave the focused item (covers an use case when the user uses the mouse and the keyboard to navigate the options)
      resetFocusedIndex,
      selectedOption,
    }),
    inputValue,
    selectedOption,
    filteredOptions,
  };
};
