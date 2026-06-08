import { useDebounceCallback, useUpdateEffect } from '@melio/penny-utils';
import { useEffect, useState } from 'react';

import { cities, type City, type Region } from '../__fixtures__/mock-data';
import { checkHasSections } from '../Combobox.utils';

type UseControlledComboboxOptions = {
  defaultOptions?: City[] | Region[];
  presetOptions?: City[] | Region[];
};

const DEBOUNCE_TIME = 1200;

const filterOptions = (searchTerm: string, options: City[]) =>
  options.filter((city) => city.label.toLowerCase().includes(searchTerm.toLowerCase()));

const getFilteredOptions = (searchTerm: string, options: City[] | Region[]) =>
  checkHasSections(options)
    ? options
        .map((region) => ({ ...region, options: filterOptions(searchTerm, region.options) }))
        .filter((r) => r.options.length)
    : filterOptions(searchTerm, options);

type UseFetchOptionsOptions = {
  searchTerm: string;
  defaultOptions?: City[] | Region[];
  presetOptions?: City[] | Region[];
  debounceTime?: number;
};

type UseFetchOptionsReturn = {
  options: City[] | Region[];
  isFetching: boolean;
};

export const useFetchOptions = ({
  searchTerm,
  defaultOptions = cities,
  presetOptions = [],
}: UseFetchOptionsOptions): UseFetchOptionsReturn => {
  const [options, setOptions] = useState(presetOptions);
  const [isFetching, setIsFetching] = useState(false);

  useUpdateEffect(() => {
    setIsFetching(true);

    if (searchTerm) {
      setOptions(getFilteredOptions(searchTerm, [...(presetOptions as City[]), ...(defaultOptions as City[])]));
    } else {
      setOptions(presetOptions);
    }

    setTimeout(() => setIsFetching(false), DEBOUNCE_TIME);
    // Passing `presetOptions` causes infinite loop.
  }, [defaultOptions, searchTerm]);

  return { options, isFetching };
};

export const useControlledCombobox = ({ defaultOptions, presetOptions }: UseControlledComboboxOptions = {}) => {
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { options, isFetching } = useFetchOptions({ searchTerm: inputValue, defaultOptions, presetOptions });

  const debouncedSetInputValue = useDebounceCallback(setInputValue, 250);

  useEffect(() => {
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(inputValue.length > 0);
  }, [inputValue.length]);

  return {
    options,
    onInputChange: debouncedSetInputValue,
    isLoadingOptions: isFetching,
    isMenuOpen,
  };
};

export type { UseControlledComboboxOptions };
