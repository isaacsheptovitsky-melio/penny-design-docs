import { type ForwardedRef, forwardRef, type NamedExoticComponent } from 'react';

import { FloatingMenu, FloatingMenuDropdownList } from '@/components/containers/menus/FloatingMenu';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';

import { EmptyState, Option, Section, Trigger } from './components';
import { useMultiSelect } from './hooks';
import { type MultiSelectOption, type MultiSelectProps } from './MultiSelect.types';
import { checkHasSections, getFlatIndex } from './MultiSelect.utils';

/**
 * The Multi Select component allows users to select multiple options from a predefined list.
 * Selected options appear within the component, providing a clear overview of the user’s choices.
 */
const MultiSelectComponent = <V, O extends MultiSelectOption<V>>(
  props: MultiSelectProps<V, O>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { options, triggerProps, menuProps, dropdownListProps, getSectionProps, getOptionProps, emptyStateProps } =
    useMultiSelect(props);

  return (
    <FloatingMenu
      {...menuProps}
      ref={ref}
      trigger={<Trigger {...triggerProps} />}
      content={
        <FloatingMenuDropdownList {...dropdownListProps}>
          {options.length ? (
            checkHasSections(options) ? (
              options.map((section, sectionIndex) => (
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
                        {...getOptionProps({ option, index: getFlatIndex(options, sectionIndex, optionIndex) })}
                      />
                    </ConditionalWrapper>
                  ))}
                </Section>
              ))
            ) : (
              options.map((option, index) => (
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
              ))
            )
          ) : (
            <EmptyState {...emptyStateProps} />
          )}
        </FloatingMenuDropdownList>
      }
    />
  );
};

export const MultiSelect = forwardRef(MultiSelectComponent) as <V, O extends MultiSelectOption<V>>(
  props: MultiSelectProps<V, O> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof MultiSelectComponent>;

(MultiSelect as NamedExoticComponent).displayName = 'MultiSelect';
