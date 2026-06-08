import { type MultiSelectOption, type MultiSelectProps, type MultiSelectSection } from './MultiSelect.types';

export const checkHasSections = <V, O extends MultiSelectOption<V>>(
  options: MultiSelectProps<V, O>['options']
): options is MultiSelectSection<V, O>[] => options.some((option) => 'options' in option);

export const getFlatOptions = <V, O extends MultiSelectOption<V>>(options: MultiSelectProps<V, O>['options']): O[] => {
  const hasSections = checkHasSections(options);
  const flatOptions = hasSections ? options.flatMap((section) => section.options) : options;

  return flatOptions;
};

export const getFlatIndex = <V, O extends MultiSelectOption<V>>(
  options: MultiSelectSection<V, O>[],
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
