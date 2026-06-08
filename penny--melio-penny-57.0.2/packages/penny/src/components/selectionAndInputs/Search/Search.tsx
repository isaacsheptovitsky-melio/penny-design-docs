import { useMergeRefs } from '@floating-ui/react';
import { isEqual, useDebounceCallback } from '@melio/penny-utils';
import { forwardRef, useEffect, useRef } from 'react';

import { BaseSelect, type BaseSelectBaseProps, useSearch } from '@/components/internal/BaseSelect';
import { getOptionKey } from '@/components/internal/BaseSelect/hooks/utils';

import { type SearchProps, type SearchValue } from './Search.types';
import { useClickOutside } from './useClickOutside';

/**
 * @deprecated Please use `Combobox` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      onInputChange,
      debounce = 250,
      options,
      children,
      size = 'large',
      valueRightElement,
      emptyState,
      creatableOption,
      placeholder,
      isDisabled = false,
      isReadOnly = false,
      isViewMode = false,
      isLoading = false,
      isLoadingField = false,
      autoFocus = false,
      shouldShowPresetOptions = false,
      onChange,
      value,
      filterOptions: externalFilterOptions,
      formatSelectedValue,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onSearchTermReset,
      onClear,
      clearButtonAriaLabel = 'Clear search input',
      id,
      statusMessageParentSelector,
      ...props
    },
    ref
  ) => {
    const handleInputChange = useDebounceCallback((inputValue: string) => {
      onInputChange?.(inputValue);
    }, debounce);

    const filterOptions: BaseSelectBaseProps<SearchValue>['filterOptions'] = (options, searchTerm) =>
      searchTerm ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = useMergeRefs([ref, inputRef]);
    const clearButtonRef = useRef<HTMLButtonElement>(null);

    const {
      anchorRef,
      hasSections,
      openMenu,
      closeMenu,
      inputValue,
      inputProps,
      dropdownMenuProps,
      getOptionProps,
      selectedOption,
      filteredOptions,
      clearSelect,
    } = useSearch({
      ref: mergedRef,
      clearButtonRef,
      value,
      formatSelectedValue,
      options,
      filterOptions: externalFilterOptions ?? filterOptions,
      creatableOption,
      emptyState,
      disableInputClick: isDisabled || isLoading || isReadOnly || !shouldShowPresetOptions,
      isLoading,
      shouldShowPresetOptions,
      onClick,
      onChange,
      onInputChange: handleInputChange,
      onKeyDown,
      onBlur,
      onSearchTermReset,
      onClear,
      id,
      statusMessageParentSelector,
    });

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownMergedRef = useMergeRefs([dropdownRef, dropdownMenuProps.ref]);
    const containerRef = useRef<HTMLDivElement>(null);
    const anchorElement = useMergeRefs([anchorRef, containerRef]);

    const dropdownLabelProp = props['aria-label']
      ? // 'aria-labelledby': undefined will reset the default value from downshift
        { 'aria-label': props['aria-label'], 'aria-labelledby': undefined }
      : { 'aria-labelledby': `${id}-label` };

    const isEnabled = !isDisabled && !isReadOnly && !isViewMode;

    useEffect(() => {
      if (isEnabled && isLoading) openMenu();
    }, [isLoading, openMenu, isEnabled]);

    useClickOutside(dropdownRef as unknown as never, inputRef as unknown as never, closeMenu);

    const getCreatableOptionComponent = () => {
      if (typeof creatableOption === 'object') {
        const props = getOptionProps({
          option: { value: inputValue.toLocaleLowerCase(), label: inputValue },
          index: filteredOptions.length,
          isCreatableOption: true,
        });

        return (
          <BaseSelect.CreatableOption
            message={
              typeof creatableOption.label === 'string' ? creatableOption.label : creatableOption.label(inputValue)
            }
            {...props}
            key={getOptionKey(inputValue, filteredOptions.length)}
          />
        );
      }
      return;
    };

    const leftElement = (
      <BaseSelect.TriggerLeftIcon
        type="search"
        size={size}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isViewMode={isViewMode}
        aria-hidden
      />
    );

    const rightElement =
      isEnabled && inputValue ? (
        <BaseSelect.TriggerRightIcon
          ref={clearButtonRef}
          data-testid="clear-search-input"
          aria-label={clearButtonAriaLabel}
          icon="close"
          onClick={() => {
            clearSelect();
            inputRef.current?.focus();
          }}
        />
      ) : undefined;

    return (
      <BaseSelect
        ref={anchorElement}
        trigger={
          <BaseSelect.Input
            data-component="Search"
            {...inputProps}
            {...props}
            role={isReadOnly ? undefined : inputProps.role}
            aria-expanded={isReadOnly ? undefined : inputProps['aria-expanded']}
            aria-controls={isReadOnly ? undefined : inputProps['aria-controls']}
            onFocus={onFocus}
            placeholder={placeholder}
            size={size}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isViewMode={isViewMode}
            isLoading={isLoadingField}
            selectValue={value as string}
            selectedOption={selectedOption}
            hasSections={hasSections}
            valueRightElement={valueRightElement}
            leftElement={leftElement}
            rightElement={rightElement}
            autoFocus={autoFocus}
          />
        }
        dropdownMenu={
          <BaseSelect.DropdownMenu
            {...dropdownMenuProps}
            {...dropdownLabelProp}
            ref={dropdownMergedRef as unknown as never}
            isLoading={isLoading}
            // TODO:https://meliorisk.atlassian.net/browse/ME-110373
            // eslint-disable-next-line react-hooks/refs
            ignoreElement={containerRef.current}
            loadingStateComponent={<BaseSelect.LoadingState />}
            creatableOptionComponent={getCreatableOptionComponent()}
            renderOption={(option, index) => {
              const optionProps = getOptionProps({ option, index });
              return (
                <BaseSelect.Option {...optionProps} key={getOptionKey(option.label, index)}>
                  <BaseSelect.OptionContent {...option} isSelected={isEqual(option.value, selectedOption?.value)} />
                </BaseSelect.Option>
              );
            }}
          />
        }
      />
    );
  }
);

// eslint-disable-next-line @typescript-eslint/no-deprecated
Search.displayName = 'Search';
