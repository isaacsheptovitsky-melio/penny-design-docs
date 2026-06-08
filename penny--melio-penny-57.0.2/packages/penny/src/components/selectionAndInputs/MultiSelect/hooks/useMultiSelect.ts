import { uniqueId, useTestId } from '@melio/penny-utils';
import { useMemo, useState } from 'react';

import { type MenuContextProps } from '@/components/containers/menus/Context';
import { type DropdownListProps } from '@/components/containers/menus/Context/components/DropdownList';

import { type EmptyStateProps, type TriggerProps } from '../components';
import { type MultiSelectOption, type MultiSelectProps } from '../MultiSelect.types';
import { checkHasSections, getFlatOptions } from '../MultiSelect.utils';
import { getContainerId, useA11yStatusMessage } from './useA11yStatusMessage';
import {
  type GetOptionProps,
  getOptionPropsHelper,
  type GetSectionProps,
  getSectionPropsHelper,
} from './useMultiSelect.utils';
import { useMultiSelection } from './useMultiSelection';

type UseMultiSelectProps<V, O extends MultiSelectOption<V>> = MultiSelectProps<V, O>;

type MenuA11yProps = Pick<MenuContextProps, 'aria-labelledby' | 'aria-multiselectable' | 'role'>;

type UseMultiSelectReturn<V, O extends MultiSelectOption<V>> = Pick<MultiSelectProps<V, O>, 'options'> & {
  triggerProps: TriggerProps<V, O>;
  menuProps: Pick<
    MenuContextProps,
    | 'aria-orientation'
    | 'data-testid'
    | 'disableMenuShift'
    | 'footer'
    | 'hasItems'
    | 'isOpen'
    | 'isReadOnly'
    | 'maxHeight'
    | 'onOpenChange'
    | 'width'
    | 'maxWidth'
  > &
    MenuA11yProps;
  dropdownListProps: Pick<DropdownListProps, 'as' | 'data-testid' | 'paddingY' | 'role'>;
  getSectionProps: GetSectionProps<V, O>;
  getOptionProps: GetOptionProps<V, O>;
  emptyStateProps: EmptyStateProps<V, O>;
};

export const useMultiSelect = <V, O extends MultiSelectOption<V>>({
  options,
  value,
  size,
  autoFocus,
  isDisabled,
  isLoading,
  isReadOnly,
  isViewMode,
  emptyState,
  footer,
  'data-testid': dataTestId = 'multi-select',
  onClick,
  onChange,
  optionRenderer,
  id,
  menuWidth = 'match-trigger',
  menuMaxWidth,
  menuAriaLabel,
  menuEmptyStateMessage = 'No options',
  ...otherProps
}: UseMultiSelectProps<V, O>): UseMultiSelectReturn<V, O> => {
  const flatOptions = useMemo(() => getFlatOptions(options), [options]);
  const { selectedOptions, onSelect } = useMultiSelection({ value, onChange, options: flatOptions });

  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    if (isDisabled || isReadOnly || isLoading) return;

    setIsOpen(open);
  };

  const idPrefix = useMemo(() => uniqueId(id ? `${id}-` : 'multi-select-'), [id]);

  useA11yStatusMessage({
    isOpen,
    optionsCount: flatOptions.length,
    emptyMessage: menuEmptyStateMessage,
    idPrefix,
  });

  const getTestId = useTestId(dataTestId);
  const getSectionProps = getSectionPropsHelper({ options, getTestId });

  const [activeOptionId, setActiveOptionId] = useState('');

  const getOptionProps = getOptionPropsHelper({
    selectedOptions,
    onSelect,
    getTestId,
    setActiveOptionId,
    optionRenderer,
  });

  const hasItems = useMemo(() => Boolean(flatOptions.length), [flatOptions]);
  const isDialog = Boolean(footer);
  const listboxProps: MenuA11yProps = {
    role: hasItems ? 'listbox' : undefined,
    // This informs assistive technology users that they may select more than one option.
    'aria-multiselectable': hasItems || undefined,
    // We need to associate the form-field label with the listbox for a11y if `menuAriaLabel` is not provided.
    ...(menuAriaLabel ? { 'aria-label': menuAriaLabel } : { 'aria-labelledby': id && `${id}-label` }),
  };
  const dialogProps: MenuA11yProps = {
    role: 'dialog',
    'aria-labelledby': id && `${id}-label`,
  };

  return {
    options,
    triggerProps: {
      onClick: (event) => {
        onOpenChange(!isOpen);
        onClick?.(event);
      },
      isOpen,
      isDisabled,
      isLoading,
      isReadOnly,
      isViewMode,
      size,
      selectedOptions,
      autoFocus,
      'aria-activedescendant': isOpen ? activeOptionId : '',
      id,
      containerId: getContainerId(idPrefix),
      getTestId,
      ...otherProps,
    },
    menuProps: {
      width: menuWidth,
      maxWidth: menuMaxWidth,
      maxHeight: '300px',
      footer,
      isReadOnly: isReadOnly || isLoading || isViewMode,
      isOpen,
      onOpenChange,
      disableMenuShift: true,
      hasItems,
      ...(isDialog ? dialogProps : { ...listboxProps, role: 'listbox' }),
      // We need to reset the orientation because the menu is vertical by default.
      'aria-orientation': undefined,
      ...getTestId('menu'),
    },
    dropdownListProps: {
      as: !hasItems || checkHasSections(options) ? 'div' : 'ul',
      paddingY: 'xs',
      ...(isDialog && listboxProps),
      ...getTestId('content'),
    },
    getSectionProps,
    getOptionProps,
    emptyStateProps: {
      emptyState: emptyState || menuEmptyStateMessage,
      ...getTestId('empty-state'),
    },
  };
};
