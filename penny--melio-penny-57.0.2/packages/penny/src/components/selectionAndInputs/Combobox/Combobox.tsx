import { forwardRef, type NamedExoticComponent, type Ref } from 'react';

import { FloatingMenu, FloatingMenuDropdownList } from '@/components/containers/menus/FloatingMenu';

import { type ComboboxOption, type ComboboxProps } from './Combobox.types';
import { checkHasSections, getFlatIndex } from './Combobox.utils';
import { EmptyState, LoadingState, MobileView, Option, Section, Trigger } from './components';
import { useCombobox } from './hooks';

/**
 * The combobox is a versatile component that combines the functionality of a dropdown and an input field.
 * It allows users to select an option from a predefined list or enter a custom value.
 */
const ComboboxComponent = <V, O extends ComboboxOption<V>>(props: ComboboxProps<V, O>, ref: Ref<HTMLInputElement>) => {
  const {
    triggerProps,
    menuProps,
    dropdownListProps,
    isLoadingOptions,
    options,
    getOptionProps,
    loadingStateProps,
    emptyStateProps,
    mobileViewProps,
    getTestId,
    isMobile,
  } = useCombobox(props);

  const optionsToRender = checkHasSections(options)
    ? options.map((section, sectionIndex) => (
        <Section
          key={`section-${sectionIndex}`}
          {...getTestId('section', section.testId || sectionIndex)}
          label={section.label}
          shouldRenderDivider={sectionIndex !== options.length - 1}
        >
          {section.options.map((option, optionIndex) => (
            <Option
              key={`${option.label}-${optionIndex}`}
              {...getOptionProps({ option, index: getFlatIndex(options, sectionIndex, optionIndex) })}
            />
          ))}
        </Section>
      ))
    : options.map((option, index) => (
        <Option key={`${option.label}-${index}`} {...getOptionProps({ option, index })} />
      ));

  const content = isLoadingOptions ? (
    <LoadingState {...loadingStateProps} />
  ) : options.length ? (
    optionsToRender
  ) : (
    <EmptyState {...emptyStateProps} />
  );

  return isMobile ? (
    <MobileView {...mobileViewProps} ref={ref}>
      {content}
    </MobileView>
  ) : (
    <FloatingMenu
      {...menuProps}
      ref={ref}
      trigger={<Trigger {...triggerProps} />}
      content={
        <FloatingMenuDropdownList {...dropdownListProps} paddingY="xs">
          {content}
        </FloatingMenuDropdownList>
      }
    />
  );
};

export const Combobox = forwardRef(ComboboxComponent) as <V, O extends ComboboxOption<V>>(
  props: ComboboxProps<V, O> & { ref?: Ref<HTMLInputElement> }
) => ReturnType<typeof ComboboxComponent>;

(Combobox as NamedExoticComponent).displayName = 'Combobox';
