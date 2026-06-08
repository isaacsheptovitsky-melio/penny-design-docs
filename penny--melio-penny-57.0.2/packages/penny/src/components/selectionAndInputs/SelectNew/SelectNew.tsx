import { type ForwardedRef, forwardRef, type NamedExoticComponent, useMemo } from 'react';

import { FloatingMenu, FloatingMenuDropdownList, FloatingMenuHeader } from '@/components/containers/menus/FloatingMenu';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';

import { EmptyState, Option, SearchBar, Section, Trigger } from './components';
import { useSelect } from './hooks';
import { type SelectNewOption, type SelectNewProps, type SelectNewSection } from './SelectNew.types';
import { checkHasSections, getFlatIndex } from './SelectNew.utils';

/**
 * The select component allows users to choose a single option from a predefined list.
 * It is commonly used in forms where a dropdown selection is required.
 */
const SelectNewComponent = <V, O extends SelectNewOption<V>>(
  props: SelectNewProps<V, O>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const {
    options,
    triggerProps,
    menuProps,
    dropdownListProps,
    searchBarProps,
    getSectionProps,
    getOptionProps,
    emptyStateProps,
  } = useSelect(props);

  const hasSections = useMemo(() => checkHasSections(options), [options]);
  function getOptions() {
    if (hasSections) {
      return (options as SelectNewSection<V, O>[]).map((section, sectionIndex) => (
        <Section key={`section-${sectionIndex}`} {...getSectionProps({ section, index: sectionIndex })}>
          {section.options.map((option, optionIndex) => (
            <ConditionalWrapper
              key={`${option.label}-${optionIndex}`}
              condition={!!option.tooltipProps?.content}
              wrapper={(children) => (
                <Tooltip {...(option.tooltipProps || {})} content={option.tooltipProps?.content || ''}>
                  {children}
                </Tooltip>
              )}
            >
              <Option
                {...getOptionProps({
                  option,
                  index: getFlatIndex(options as SelectNewSection<V, O>[], sectionIndex, optionIndex),
                })}
              />
            </ConditionalWrapper>
          ))}
        </Section>
      ));
    }
    return (options as O[]).map((option, index) => (
      <ConditionalWrapper
        key={`${option.label}-${index}`}
        condition={!!option.tooltipProps?.content}
        wrapper={(children) => (
          <Tooltip {...(option.tooltipProps || {})} content={option.tooltipProps?.content || ''}>
            {children}
          </Tooltip>
        )}
      >
        <Option {...getOptionProps({ option, index })} />
      </ConditionalWrapper>
    ));
  }

  return (
    <FloatingMenu
      {...menuProps}
      ref={ref}
      trigger={<Trigger {...triggerProps} />}
      header={
        searchBarProps && (
          <FloatingMenuHeader>
            <SearchBar {...searchBarProps} />
          </FloatingMenuHeader>
        )
      }
      content={
        <FloatingMenuDropdownList {...dropdownListProps}>
          {options.length ? getOptions() : <EmptyState {...emptyStateProps} />}
        </FloatingMenuDropdownList>
      }
    />
  );
};

export const SelectNew = forwardRef(SelectNewComponent) as <V, O extends SelectNewOption<V>>(
  props: SelectNewProps<V, O> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof SelectNewComponent>;

(SelectNew as NamedExoticComponent).displayName = 'SelectNew';
