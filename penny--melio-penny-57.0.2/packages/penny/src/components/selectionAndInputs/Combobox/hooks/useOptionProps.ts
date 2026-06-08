import { type GetTestId, isEqual } from '@melio/penny-utils';

import { type ComboboxOption, type ComboboxProps, type SelectedOption } from '../Combobox.types';
import { type OptionProps } from '../components';

type UseOptionPropsOptions<V, O extends ComboboxOption<V>> = {
  selectedOption: SelectedOption<V, O>;
  onSelect: (option: O) => void;
  getTestId: GetTestId;
} & Pick<ComboboxProps<V, O>, 'optionRenderer'>;

export type GetOptionProps<V, O extends ComboboxOption<V>> = (param: { option: O; index: number }) => OptionProps;

type UseOptionPropsReturn<V, O extends ComboboxOption<V>> = GetOptionProps<V, O>;

export const useOptionProps =
  <V, O extends ComboboxOption<V>>({
    selectedOption,
    onSelect,
    optionRenderer,
    getTestId,
  }: UseOptionPropsOptions<V, O>): UseOptionPropsReturn<V, O> =>
  ({ option, index }) => {
    const isSelected = isEqual(option, selectedOption);
    const { label, disabled, testId, tooltipProps } = option;

    return {
      index,
      isSelected,
      id: `combobox-option-${index}`,
      label,
      disabled,
      tooltipProps,
      children: optionRenderer?.(option, isSelected) ?? label,
      onClick: () => onSelect(option),
      ...getTestId('option', testId || index),
      // We don't want to use `tabIndex` because the focus is managed differently in a combobox.
      // See https://floating-ui.com/docs/uselistnavigation#using-with-floatingfocusmanager for more details.
      tabIndex: undefined,
    };
  };
