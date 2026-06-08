import { type GetTestId, isEqual } from '@melio/penny-utils';

import { type OptionProps, type SectionProps } from '../components';
import { type MultiSelectOption, type MultiSelectProps, type MultiSelectSection } from '../MultiSelect.types';

type GetSectionPropsHelperOptions<V, O extends MultiSelectOption<V>> = {
  getTestId: GetTestId;
} & Pick<MultiSelectProps<V, O>, 'options'>;

export type GetSectionProps<V, O extends MultiSelectOption<V>> = (param: {
  section: Pick<MultiSelectSection<V, O>, 'label' | 'testId'>;
  index: number;
}) => SectionProps;

type GetSectionPropsHelperReturn<V, O extends MultiSelectOption<V>> = GetSectionProps<V, O>;

export const getSectionPropsHelper =
  <V, O extends MultiSelectOption<V>>({
    options,
    getTestId,
  }: GetSectionPropsHelperOptions<V, O>): GetSectionPropsHelperReturn<V, O> =>
  ({ section, index }) => ({
    label: section.label,
    shouldRenderDivider: index !== options.length - 1,
    ...getTestId('section', section.testId || index),
  });

type GetOptionPropsHelperOptions<V, O extends MultiSelectOption<V>> = {
  selectedOptions: O[];
  onSelect: (option: O) => void;
  getTestId: GetTestId;
  setActiveOptionId: (id: string) => void;
} & Pick<MultiSelectProps<V, O>, 'optionRenderer'>;

export type GetOptionProps<V, O extends MultiSelectOption<V>> = (param: { option: O; index: number }) => OptionProps;

type GetOptionPropsHelperReturn<V, O extends MultiSelectOption<V>> = GetOptionProps<V, O>;

export const getOptionPropsHelper =
  <V, O extends MultiSelectOption<V>>({
    selectedOptions,
    onSelect,
    optionRenderer,
    getTestId,
    setActiveOptionId,
  }: GetOptionPropsHelperOptions<V, O>): GetOptionPropsHelperReturn<V, O> =>
  ({ option, index }) => {
    const isSelected = Boolean(selectedOptions.find((selected) => isEqual(selected.value, option.value)));
    const id = `multi-select-option-${index}`;
    const { label, disabled, testId } = option;

    return {
      isSelected,
      id,
      label,
      disabled: Boolean(disabled),
      children: optionRenderer?.(option, isSelected) ?? label,
      onClick: () => onSelect(option),
      onKeyDown: (event) => {
        if (!['Enter', 'Space'].includes(event.code) || disabled) return;

        event.preventDefault();
        onSelect(option);
      },
      onFocus: () => setActiveOptionId(id),
      onBlur: () => setActiveOptionId(''),
      ...getTestId('option', testId || index),
    };
  };
