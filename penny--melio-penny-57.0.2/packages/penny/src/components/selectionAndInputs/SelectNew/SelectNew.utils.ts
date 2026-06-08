import { type SelectNewOption, type SelectNewProps, type SelectNewSection } from './SelectNew.types';

export const checkHasSections = <V, O extends SelectNewOption<V>>(
  options: SelectNewProps<V, O>['options']
): options is SelectNewSection<V, O>[] => options.some((option) => 'options' in option);

export const getFlatOptions = <V, O extends SelectNewOption<V>>(options: SelectNewProps<V, O>['options']): O[] => {
  const hasSections = checkHasSections(options);
  const flatOptions = hasSections ? options.flatMap((section) => section.options) : options;

  return flatOptions;
};

export const getFlatIndex = <V, O extends SelectNewOption<V>>(
  options: SelectNewSection<V, O>[],
  sectionIndex: number,
  optionIndex: number
): number =>
  options
    // Take all sections up to the specified section
    .slice(0, sectionIndex)
    // Sum up all options in those sections
    .reduce((acc, section) => acc + section.options.length, 0) +
  // Add the index within the specified section
  optionIndex;
