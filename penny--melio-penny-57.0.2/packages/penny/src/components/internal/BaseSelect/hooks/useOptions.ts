import { useEffect, useMemo, useState } from 'react';

import { type BaseProps, type Option, type OptionWithSection } from '../BaseSelect.types';
import { checkHasSections, getOptionsWithSection } from '../BaseSelect.utils';
import { type BaseUseSelectOptions } from './types';

type UseOptionsOptions<T> = {
  query?: string | null;
} & Pick<BaseUseSelectOptions<T>, 'options'> &
  Pick<BaseProps<T>, 'filterOptions' | 'shouldShowPresetOptions'>;

type UseOptionsReturn<T> = {
  hasSections: boolean;
  options: Option<T>[] | OptionWithSection<T>[];
  filteredOptions: Option<T>[] | OptionWithSection<T>[];
  clearOptions: VoidFunction;
};

export const useOptions = <T>({
  options: optionsList,
  filterOptions,
  query,
  shouldShowPresetOptions,
}: UseOptionsOptions<T>): UseOptionsReturn<T> => {
  const hasSections = checkHasSections(optionsList);

  const updatedOptions = useMemo(
    () => (hasSections ? getOptionsWithSection(optionsList) : optionsList),
    [hasSections, optionsList]
  );

  const [options, setOptions] = useState<Option<T>[] | OptionWithSection<T>[]>(updatedOptions);
  const [filteredOptions, setFilteredOptions] = useState<Option<T>[] | OptionWithSection<T>[]>(
    filterOptions(options, query)
  );

  useEffect(() => {
    setFilteredOptions(filterOptions(options, query));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `filterOptions` is an external function so we can skip adding it to the dependency list.
  }, [options, query]);

  // Makes sure we get the latest options list.
  useEffect(() => {
    setOptions(updatedOptions);
  }, [updatedOptions]);

  const clearOptions = () => {
    if (shouldShowPresetOptions) return;

    setOptions([]);
  };

  useEffect(() => {
    if (shouldShowPresetOptions && filteredOptions.length === 0 && !query) setFilteredOptions(options);
  }, [options, shouldShowPresetOptions, filteredOptions, query]);

  return {
    hasSections,
    options,
    filteredOptions,
    clearOptions,
  };
};
