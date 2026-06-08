import { isEqual, uniqueId, useTestId } from '@melio/penny-utils';
import { type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useMemo, useRef, useState } from 'react';

import { type MenuContextProps } from '@/components/containers/menus/Context';
import { type DropdownListProps } from '@/components/containers/menus/Context/components/DropdownList';
import { useControlled } from '@/utils/useControlled';

import {
  type EmptyStateProps,
  type OptionProps,
  type SearchBar,
  type SectionProps,
  type TriggerProps,
} from '../components';
import {
  type SelectedOption,
  type SelectNewOption,
  type SelectNewProps,
  type SelectNewSection,
} from '../SelectNew.types';
import { checkHasSections, getFlatOptions } from '../SelectNew.utils';
import { getContainerId, useA11yStatusMessage } from './useA11yStatusMessage';

type UseSelectProps<V, O extends SelectNewOption<V>> = SelectNewProps<V, O>;

type GetSectionProps<V, O extends SelectNewOption<V>> = (param: {
  section: Pick<SelectNewSection<V, O>, 'label' | 'testId'>;
  index: number;
}) => SectionProps;

type GetOptionProps<V, O extends SelectNewOption<V>> = (param: { option: O; index: number }) => OptionProps<V, O>;

type MenuA11yProps = Pick<MenuContextProps, 'aria-labelledby' | 'role'>;

type UseSelectReturn<V, O extends SelectNewOption<V>> = Pick<SelectNewProps<V, O>, 'options'> & {
  triggerProps: TriggerProps<V, O>;
  menuProps: Pick<
    MenuContextProps,
    | 'aria-orientation'
    | 'data-testid'
    | 'disableMenuShift'
    | 'disableTypeahead'
    | 'footer'
    | 'hasItems'
    | 'isOpen'
    | 'isReadOnly'
    | 'maxHeight'
    | 'onOpenChange'
    | 'width'
    | 'maxWidth'
    | 'focusItemOnHover'
    | 'focusItemOnOpen'
    | 'isTypingRef'
  > &
    MenuA11yProps;
  dropdownListProps: Pick<DropdownListProps, 'as' | 'data-testid' | 'paddingY' | 'role'>;
  searchBarProps?: ComponentPropsWithoutRef<typeof SearchBar>;
  getSectionProps: GetSectionProps<V, O>;
  getOptionProps: GetOptionProps<V, O>;
  emptyStateProps: EmptyStateProps<V, O>;
};

export const useSelect = <V, O extends SelectNewOption<V>>({
  options,
  searchBarProps,
  value,
  size,
  autoFocus,
  isLoading,
  isReadOnly,
  isViewMode,
  emptyState,
  footer,
  'data-testid': dataTestId = 'select',
  onChange,
  onClear,
  optionRenderer,
  id,
  onMenuOpen,
  onMenuClose,
  menuWidth = 'match-trigger',
  menuMaxWidth,
  menuAriaLabel,
  menuEmptyStateMessage = 'No options',
  isOpen: isOpenProp,
  onOpenChange: onOpenChangeProp,
  ...otherProps
}: UseSelectProps<V, O>): UseSelectReturn<V, O> => {
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
    () => getFlatOptions(options).find((option) => isEqual(option.value, value)) ?? null,
    [options, value]
  );
  const [selectedOption, setSelectedOption] = useState<SelectedOption<V, O>>(defaultValue);

  useEffect(() => {
    if (isUncontrolled) return;

    setSelectedOption(defaultValue);
  }, [isUncontrolled, defaultValue]);

  const [selectedOptionLabel, setSelectedOptionLabel] = useState<string>();

  const handleChange = (newSelectedOption: SelectedOption<V, O>) => {
    const isSameOption = isEqual(newSelectedOption, selectedOption);
    if (isUncontrolled || isSameOption) return;

    setSelectedOption(newSelectedOption);
    setSelectedOptionLabel(newSelectedOption?.label);
    onChange?.({ target: { value: newSelectedOption?.value ?? null } } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const [isOpen, setIsOpen] = useControlled(isOpenProp, onOpenChangeProp, false);

  const onOpenChange = (open: boolean) => {
    if (isReadOnly || isLoading) return;

    setIsOpen(open);

    if (open) {
      onMenuOpen?.();
    } else {
      onMenuClose?.();
    }
  };

  const { options: searchBarOptions, inputProps: searchBarInputProps, ...otherSearchBarProps } = searchBarProps ?? {};
  const flatSearchBarOptions = searchBarOptions && getFlatOptions(searchBarOptions);
  const idPrefix = useMemo(() => uniqueId(id ? `${id}-` : 'select-'), [id]);

  useA11yStatusMessage({
    selectedOptionLabel,
    isOpen,
    optionsCount: flatSearchBarOptions?.length ?? options.length,
    emptyMessage: menuEmptyStateMessage,
    idPrefix,
  });

  const getTestId = useTestId(dataTestId);

  const getSectionProps: GetSectionProps<V, O> = ({ section, index }) => ({
    label: section.label,
    shouldRenderDivider: index !== options.length - 1,
    ...getTestId('section', section.testId || index),
  });

  const [activeOptionId, setActiveOptionId] = useState('');
  const isTypingRef = useRef<boolean>(false);

  const getOptionProps: GetOptionProps<V, O> = ({ option, index }) => ({
    ...getTestId('option', option.testId || index),
    option,
    optionRenderer,
    onClick: () => {
      handleChange(option);
      onOpenChange(false);
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (option.disabled) return;

      if (event.code === 'Space') {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        handleChange(option);
        onOpenChange(false);
      }

      if (event.key === ' ' && !isTypingRef.current) {
        event.preventDefault();
        handleChange(option);
        onOpenChange(false);
      }
    },
    isSelected: isEqual(option, selectedOption),
    id: `select-option-${index}`,
    setActiveOptionId,
  });

  useEffect(() => {
    if (isOpen) return;

    searchBarProps?.onChange?.({ target: { value: '' } } as unknown as ChangeEvent<HTMLInputElement>);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when the menu is closed.
  }, [isOpen]);

  const optionsToRender = searchBarOptions ?? options;
  const hasItems = useMemo(() => Boolean(getFlatOptions(optionsToRender).length), [optionsToRender]);
  const hasSearchBar = Boolean(searchBarProps);
  const isDialog = Boolean(footer) || hasSearchBar;
  const menuAriaLabelledBy = { 'aria-labelledby': id && `${id}-label` };
  const listboxProps: MenuA11yProps = {
    role: hasItems ? 'listbox' : undefined,
    // We need to associate the form-field label with the listbox for a11y if `menuAriaLabel` is not provided.
    ...(menuAriaLabel ? { 'aria-label': menuAriaLabel } : menuAriaLabelledBy),
  };
  const dialogProps: MenuA11yProps = {
    role: 'dialog',
    ...menuAriaLabelledBy,
  };
  const listboxId = id ? `${id}-listbox` : 'select-listbox';
  const ariaActivedescendantProp = { 'aria-activedescendant': isOpen ? activeOptionId : '' };

  return {
    options: optionsToRender,
    triggerProps: {
      onClear: () => {
        handleChange(null);
        onClear?.();
      },
      isOpen,
      isLoading,
      isReadOnly,
      isViewMode,
      size,
      selectedOption,
      autoFocus,
      id,
      containerId: getContainerId(idPrefix),
      isButton: hasSearchBar && !(isReadOnly || isLoading),
      ...(!hasSearchBar && ariaActivedescendantProp),
      ...getTestId(),
      ...otherProps,
    },
    menuProps: {
      isTypingRef,
      width: menuWidth,
      maxWidth: menuMaxWidth,
      maxHeight: '300px',
      footer,
      isReadOnly: isReadOnly || isLoading || isViewMode,
      isOpen,
      onOpenChange,
      disableMenuShift: true,
      // We disable the typeahead feature if `searchBarProps` is provided because it handles the filtering.
      disableTypeahead: hasSearchBar,
      hasItems,
      // This is to avoid legs when many options. This behavior is not required a11y wise
      focusItemOnHover: false,
      // We need to focus the search-bar when the menu is opened to improve a11y.
      focusItemOnOpen: !searchBarProps,
      ...(isDialog ? dialogProps : { ...listboxProps, role: 'listbox' }),
      // We need to reset the orientation because the menu is vertical by default.
      'aria-orientation': undefined,
      ...getTestId('menu'),
    },
    dropdownListProps: {
      as: !hasItems || checkHasSections(options) ? 'div' : 'ul',
      paddingY: 'xs',
      ...(isDialog && { ...listboxProps, id: listboxId }),
      ...getTestId('content'),
    },
    searchBarProps: searchBarProps && {
      instructionsText: 'Type to filter options',
      inputProps: {
        'aria-label': 'Search options',
        ...searchBarInputProps,
        ...ariaActivedescendantProp,
        role: 'combobox',
        autoComplete: 'off',
        'aria-controls': listboxId,
        'aria-expanded': isOpen,
      },
      ...otherSearchBarProps,
      ...getTestId('search-bar'),
    },
    getSectionProps,
    getOptionProps,
    emptyStateProps: {
      emptyState: emptyState || menuEmptyStateMessage,
      ...getTestId('empty-state'),
    },
  };
};
