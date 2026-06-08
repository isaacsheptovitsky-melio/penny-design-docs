import { useCombobox, type UseComboboxState, type UseComboboxStateChangeOptions, type UseSelectState } from 'downshift';

import { type BaseProps, type Option } from '../../BaseSelect.types';

type UseStateReducerOptions<T> = Required<Pick<BaseProps<T>, 'formatSelectedValue' | 'onInputChange'>> & {
  hasFilteredOptions: boolean;
  hasEmptyState: boolean;
  hasCreatableOption: boolean;
  shouldOpenMenuOnClick: boolean;
  clearSelectedOption: VoidFunction;
  setQuery: (query?: string | null) => void;
};

export type UseStateReducerReturn<T> = (
  _state: UseSelectState<Option<T>>,
  actionAndChanges: UseComboboxStateChangeOptions<Option<T>>
) => UseComboboxState<Option<T>>;

export const useStateReducer = <T>({
  formatSelectedValue,
  hasFilteredOptions,
  hasEmptyState,
  hasCreatableOption,
  shouldOpenMenuOnClick,
  clearSelectedOption,
  setQuery,
  onInputChange,
}: UseStateReducerOptions<T>): UseStateReducerReturn<T> => {
  const stateReducer = (
    _state: UseSelectState<Option<T>>,
    actionAndChanges: UseComboboxStateChangeOptions<Option<T>>
  ): UseComboboxState<Option<T>> => {
    const { type: changeType, changes } = actionAndChanges;
    const {
      ControlledPropUpdatedSelectedItem,
      InputBlur,
      InputKeyDownEscape,
      ToggleButtonClick,
      FunctionOpenMenu,
      FunctionCloseMenu,
      InputClick,
      InputChange,
      InputKeyDownArrowDown,
      InputKeyDownArrowUp,
    } = useCombobox.stateChangeTypes;
    const hasInputValue = Boolean(changes.inputValue);
    const otherChanges = changes as UseComboboxState<Option<T>>;

    switch (changeType) {
      case ControlledPropUpdatedSelectedItem:
        return {
          ...otherChanges,
          isOpen: false,
          inputValue: changes.selectedItem ? formatSelectedValue(changes.selectedItem) : '',
        };
      case InputBlur:
      case InputKeyDownEscape:
      case FunctionCloseMenu:
        setQuery(null);

        if (!hasInputValue) {
          clearSelectedOption();
        }

        return {
          ...otherChanges,
          inputValue: hasInputValue && changes.selectedItem ? formatSelectedValue(changes.selectedItem) : '',
        };
      case ToggleButtonClick:
        return {
          ...otherChanges,
          isOpen: Boolean(changes.isOpen) && (hasFilteredOptions || hasEmptyState),
        };
      case FunctionOpenMenu:
        return {
          ...otherChanges,
          highlightedIndex: 0,
        };
      case InputClick:
        return {
          ...otherChanges,
          isOpen: hasFilteredOptions || hasEmptyState || hasCreatableOption || shouldOpenMenuOnClick,
        };
      // Using this and not `onInputValueChange` will trigger input changes only if the user typed in the input and not if the input value is changed due to selection.
      case InputChange: {
        onInputChange(changes.inputValue ?? '');

        return {
          ...otherChanges,
          isOpen: hasInputValue || hasFilteredOptions,
        };
      }
      case InputKeyDownArrowDown:
      case InputKeyDownArrowUp: {
        const showEmptyState = hasEmptyState && !hasCreatableOption;

        return {
          ...otherChanges,
          isOpen: hasFilteredOptions || showEmptyState || hasCreatableOption,
        };
      }
      default:
        return otherChanges;
    }
  };

  return stateReducer;
};
