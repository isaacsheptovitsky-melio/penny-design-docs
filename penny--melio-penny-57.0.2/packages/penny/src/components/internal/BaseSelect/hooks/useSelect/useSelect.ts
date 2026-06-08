import { isEqual, isNil, useTestId } from '@melio/penny-utils';
import { useCombobox, type UseComboboxReturnValue, type UseComboboxState } from 'downshift';
import { type ChangeEvent, useEffect, useState } from 'react';

import { type BaseProps, type Option } from '../../BaseSelect.types';
import { defaultFormatSelectedValue } from '../../BaseSelect.utils';
import { type BaseUseSelectOptions, type GetOptionProps } from '../types';
import { useCreatableOption } from '../useCreatableOption';
import { useDropdownMenuProps, type UseDropdownMenuPropsReturn } from '../useDropdownMenuProps';
import { useInputProps, type UseInputPropsReturn } from '../useInputProps';
import { useOptions } from '../useOptions';
import { getOptionPropsHelper, useGetStatusMessage } from '../utils';
import { useStateReducer } from './useStateReducer';

type UseSelectOptions<T> = BaseUseSelectOptions<T> &
  Pick<
    BaseProps<T>,
    | 'filterOptions'
    | 'shouldShowPresetOptions'
    | 'creatableOption'
    | 'emptyState'
    | 'formatSelectedValue'
    | 'onInputChange'
    | 'onSearchTermReset'
  > & {
    disableInputClick?: boolean;
  };

type UseSelectReturn<T> = Pick<UseComboboxReturnValue<Option<T>>, 'getToggleButtonProps' | 'inputValue' | 'isOpen'> &
  UseDropdownMenuPropsReturn<T> & {
    getOptionProps: GetOptionProps<T>;
    hasSections: boolean;
    inputProps: UseInputPropsReturn;
    selectedOption?: UseComboboxState<Option<T>>['selectedItem'];
    filteredOptions: Option<T>[];
  };

export const useSelect = <T>({
  ref,
  value,
  formatSelectedValue = defaultFormatSelectedValue,
  options: optionsList,
  filterOptions,
  shouldShowPresetOptions = false,
  creatableOption,
  emptyState,
  disableInputClick,
  onClick,
  onChange,
  onInputChange,
  onKeyDown,
  onSearchTermReset,
}: UseSelectOptions<T>): UseSelectReturn<T> => {
  const [query, setQuery] = useState<string | null>();

  const { hasSections, options, filteredOptions } = useOptions({
    options: optionsList,
    filterOptions,
    query,
    shouldShowPresetOptions,
  });

  const [selectedOption, setSelectedOption] = useState<Option<T> | null | undefined>(null);

  useEffect(() => {
    // Update the selected option only if there's nothing selected and we have a value to set.
    if (selectedOption || isNil(value)) return;

    if (!options.length) return;

    const defaultSelectionOption = null;
    const optionThatMatchesValue = options.find((option) => isEqual(option.value, value));

    // A default option to use in case we don't have any matching option to use.
    setSelectedOption(optionThatMatchesValue || defaultSelectionOption);
  }, [options, selectedOption, value]);

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
    clearSelectedOption,
    setQuery,
    onInputChange: handleInputChange,
  });

  // manage the focusedIndex state to handle keyboard navigation.
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const resetFocusedIndex = () => setFocusedIndex(-1);

  const getStatusMessage = useGetStatusMessage({
    optionsCount: filteredOptions.length,
    emptyStateLabel: emptyState?.label,
  });

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getToggleButtonProps,
    highlightedIndex,
    inputValue,
    setInputValue,
    closeMenu,
    selectItem,
  } = useCombobox({
    getA11yStatusMessage: ({ isOpen }) => getStatusMessage(isOpen),
    defaultHighlightedIndex: 0,
    // Make sure the new creatable option is available for keyboard navigation.
    items: [...filteredOptions, ...(shouldShowCreatableOption && newOption ? [newOption] : [])],
    itemToString: (option) => (option ? formatSelectedValue(option) : ''),
    selectedItem: selectedOption,
    onSelectedItemChange: ({ selectedItem: newSelectedOption }) => {
      setSelectedOption(newSelectedOption);
      setQuery(null);

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
          // reset the focusedIndex when the user uses other types of events that change the highlightedIndex.
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

  // Clears the select if `value` is falsy.
  useEffect(() => {
    if (value) return;

    setInputValue('');
    selectItem(null);
    setQuery(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We can skip adding anything coming from `useCombobox` to the dependency list.
  }, [value]);

  useEffect(() => {
    if (query === null) {
      onSearchTermReset?.();
    }
  }, [query, onSearchTermReset]);

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
    disableClick: disableInputClick,
    closeMenu,
  });

  return {
    anchorRef,
    dropdownMenuProps,
    inputProps,
    isOpen,
    hasSections,
    getToggleButtonProps,
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
