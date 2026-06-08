import { useCombobox, type UseComboboxState, type UseComboboxStateChangeOptions, type UseSelectState } from 'downshift';

import { type BaseProps, type Option } from '../../BaseSelect.types';

type UseStateReducerOptions<T> = Required<
  Pick<BaseProps<T>, 'shouldShowPresetOptions' | 'formatSelectedValue' | 'onInputChange'>
> & {
  hasFilteredOptions: boolean;
  hasEmptyState: boolean;
  hasCreatableOption: boolean;
  shouldOpenMenuOnClick: boolean;
  clearSelectedOption: VoidFunction;
  setQuery: (query?: string | null) => void;
  isLoading?: boolean;
};

export type UseStateReducerReturn<T> = (
  state: UseSelectState<Option<T>>,
  actionAndChanges: UseComboboxStateChangeOptions<Option<T>>
) => UseComboboxState<Option<T>>;

export const useStateReducer = <T>({
  formatSelectedValue,
  hasFilteredOptions,
  hasEmptyState,
  hasCreatableOption,
  shouldOpenMenuOnClick,
  shouldShowPresetOptions,
  clearSelectedOption,
  setQuery,
  onInputChange,
  isLoading,
}: UseStateReducerOptions<T>): UseStateReducerReturn<T> => {
  const stateReducer = (
    state: UseSelectState<Option<T>>,
    actionAndChanges: UseComboboxStateChangeOptions<Option<T>>
  ): UseComboboxState<Option<T>> => {
    const { type: changeType, changes } = actionAndChanges;
    const {
      ControlledPropUpdatedSelectedItem,
      ItemClick,
      FunctionOpenMenu,
      InputClick,
      InputChange,
      InputKeyDownArrowDown,
      InputKeyDownArrowUp,
      InputBlur,
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
      case ItemClick:
        setQuery(null);

        if (!hasInputValue) {
          clearSelectedOption();
        }

        return {
          ...otherChanges,
          inputValue: hasInputValue && changes.selectedItem ? formatSelectedValue(changes.selectedItem) : '',
        };
      case FunctionOpenMenu:
        return {
          ...otherChanges,
          highlightedIndex: 0,
        };
      case InputClick:
        return {
          ...otherChanges,
          isOpen:
            shouldShowPresetOptions &&
            (hasFilteredOptions || hasEmptyState || hasCreatableOption || shouldOpenMenuOnClick),
        };
      // Using this and not `onInputValueChange` will trigger input changes only if the user typed in the input and not if the input value is changed due to selection.
      case InputChange: {
        onInputChange(changes.inputValue ?? '');

        return {
          ...otherChanges,
          isOpen: isLoading || shouldShowPresetOptions || hasFilteredOptions,
        };
      }
      case InputKeyDownArrowDown:
      case InputKeyDownArrowUp: {
        return {
          ...otherChanges,
          isOpen: hasFilteredOptions || hasEmptyState || hasCreatableOption,
        };
      }
      case InputBlur: {
        return {
          ...state,
        };
      }
      default:
        return otherChanges;
    }
  };

  return stateReducer;
};
