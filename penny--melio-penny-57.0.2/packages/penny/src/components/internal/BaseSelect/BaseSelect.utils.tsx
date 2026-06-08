import { type Option, type OptionWithSection, type Section, type SectionMeta } from './BaseSelect.types';

export const defaultFormatSelectedValue = <T,>(option: Option<T>) => option.label;

export const checkHasSections = <T,>(options: Option<T>[] | Section<T>[]): options is Section<T>[] =>
  options.some((option) => 'options' in option);

type OptionsBySectionTitle<T> = Record<
  SectionMeta['label'],
  { section?: { icon?: SectionMeta['icon'] }; options: (OptionWithSection<T> & { index: number })[] }
>;

export const getOptionsGroupedBySection = <T,>(options: OptionWithSection<T>[]): OptionsBySectionTitle<T> => {
  const optionsWithIndex = options.map((option, index) => ({ ...option, index }));
  const optionsBySectionTitle = optionsWithIndex.reduce((acc, option) => {
    const {
      section: { label: currentSectionLabel, ...currentSectionMetadata },
    } = option;

    acc[currentSectionLabel] = {
      section: currentSectionMetadata,
      options: optionsWithIndex.filter((option) => option.section.label === currentSectionLabel),
    };

    return acc;
  }, {} as OptionsBySectionTitle<T>);

  return optionsBySectionTitle;
};

export const getOptionsWithSection = <T,>(sections: Section<T>[]): OptionWithSection<T>[] =>
  sections.flatMap((section) => section.options.map((option) => ({ ...option, section: section.metadata })));
