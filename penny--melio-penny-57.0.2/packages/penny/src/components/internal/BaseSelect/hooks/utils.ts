import { isEqual } from '@melio/penny-utils';

import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import {
  type GetOptionProps,
  type GetOptionPropsHelperOptions,
  type GetStatusMessage,
  type UseGetStatusMessageOptions,
} from './types';

export const getOptionPropsHelper =
  <T>({
    getItemProps,
    highlightedIndex,
    focusedIndex,
    getTestId,
    resetFocusedIndex,
    selectedOption,
  }: GetOptionPropsHelperOptions<T>): GetOptionProps<T> =>
  ({ option, index, isCreatableOption }) => ({
    ...getItemProps({ item: option, index }),
    isHighlighted: highlightedIndex === index,
    isFocused: focusedIndex === index,
    onMouseLeave: () => {
      if (focusedIndex === index) {
        resetFocusedIndex?.();
      }
    },
    ...(!isCreatableOption && {
      isSelected: isEqual(option.value, selectedOption?.value),
      'data-testid': option.testId || getTestId('option', index)['data-testid'],
    }),
  });

export const getOptionKey = (label: string, index: number) => `${label}-${index}`;

export const useGetStatusMessage = ({
  isLoading,
  optionsCount,
  emptyStateLabel,
}: UseGetStatusMessageOptions): GetStatusMessage => {
  const { isExtraSmallScreen } = useBreakpoint();
  let message = '';

  if (isLoading) {
    message = 'Loading options.';
  } else if (optionsCount) {
    message = `${optionsCount} ${optionsCount > 1 ? 'results' : 'result'} available.${isExtraSmallScreen ? '' : ' Use up and down arrow keys to navigate. Press Enter key to select.'}`;
  } else {
    message = emptyStateLabel ?? 'No results available.';
  }

  // Using a function that checks `isOpen` ensures that SR announces the empty state when no options are passed at all,
  // otherwise it only announces the result count by filtering passed options.
  return (isOpen) => (isOpen ? message : '');
};
