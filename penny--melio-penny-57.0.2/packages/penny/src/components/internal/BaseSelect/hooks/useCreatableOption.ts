import { useCallback, useEffect, useState } from 'react';

import { type BaseProps, type Option, type OptionWithSection } from '../BaseSelect.types';

type UseCreatableOptionOptions<T> = Pick<BaseProps<T>, 'creatableOption'> & {
  query?: string | null;
  options: Option<T>[] | OptionWithSection<T>[];
};

type UseCreatableOptionReturn<T> = {
  shouldShowCreatableOption: boolean;
  setShouldShowCreatableOption: (shouldShowCreatableOption: boolean) => void;
  newOption: Option<T> | null;
};

export const useCreatableOption = <T>({
  query,
  options,
  creatableOption,
}: UseCreatableOptionOptions<T>): UseCreatableOptionReturn<T> => {
  const [shouldShowCreatableOption, setShouldShowCreatableOption] = useState(false);
  const [newOption, setNewOption] = useState<Option<T> | null>(null);

  const hasCreatableOption = Boolean(creatableOption);
  const defaultShouldDisplayCreatableOption = useCallback(
    (inputValue: string) =>
      Boolean(inputValue && !options.find((option) => inputValue.toLocaleLowerCase() === option.label.toLowerCase())),
    [options]
  );
  const shouldDisplayCreatableOption = creatableOption?.shouldDisplay ?? defaultShouldDisplayCreatableOption;

  // Show/hide the creatable option.
  useEffect(() => {
    if (hasCreatableOption && shouldDisplayCreatableOption(query ?? '')) {
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldShowCreatableOption(true);
      // We can pass an empty string here because the user may want to create an option without relying on the new option.
      setNewOption({
        value: (query ?? '').toLocaleLowerCase() as T,
        label: query ?? '',
      });
    } else {
      setShouldShowCreatableOption(false);
      setNewOption(null);
    }
  }, [hasCreatableOption, query, shouldDisplayCreatableOption]);

  return {
    shouldShowCreatableOption,
    setShouldShowCreatableOption,
    newOption,
  };
};
