import { isEqual } from '@melio/penny-utils';
import { type ChangeEvent, useEffect, useMemo, useState } from 'react';

import { type MultiSelectOption, type MultiSelectProps } from '../MultiSelect.types';

type UseMultiSelectionProps<V, O extends MultiSelectOption<V>> = Pick<MultiSelectProps<V, O>, 'value' | 'onChange'> & {
  options: O[];
};

type UseMultiSelectReturn<V, O extends MultiSelectOption<V>> = {
  selectedOptions: O[];
  onSelect: (option: O) => void;
};

export const useMultiSelection = <V, O extends MultiSelectOption<V>>({
  value,
  onChange,
  options,
}: UseMultiSelectionProps<V, O>): UseMultiSelectReturn<V, O> => {
  const isUncontrolled = value && !onChange;

  useEffect(() => {
    if (isUncontrolled) {
      // eslint-disable-next-line no-console -- We need to log a warning if `value` is provided without `onChange`.
      console.error(
        'Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. Please set either `onChange` or `isReadOnly`.'
      );
    }
  }, [isUncontrolled]);

  const defaultValue = useMemo(
    () => value?.map((v) => options.find((option) => isEqual(option.value, v))).filter(Boolean) ?? [],
    [options, value]
  ) as O[];
  const [selectedOptions, setSelectedOptions] = useState<O[]>(defaultValue);

  // This effect is used to update the selected options from the outside.
  useEffect(() => {
    if (isUncontrolled) return;

    setSelectedOptions(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when `value` changes because we don't want to lose the selected options while the options are being fetched in the background.
  }, [isUncontrolled, value]);

  const onSelect = (updatedOption: O) => {
    if (isUncontrolled) return;

    const alreadySelected = selectedOptions.find((option) => isEqual(option.value, updatedOption.value));
    const newSelectedOptions = alreadySelected
      ? selectedOptions.filter((option) => !isEqual(option.value, updatedOption.value))
      : [...selectedOptions, updatedOption];

    setSelectedOptions(newSelectedOptions);

    const value = newSelectedOptions.map((option) => option.value);

    onChange?.({ target: { value } } as unknown as ChangeEvent<HTMLInputElement>);
  };

  return { selectedOptions, onSelect };
};
