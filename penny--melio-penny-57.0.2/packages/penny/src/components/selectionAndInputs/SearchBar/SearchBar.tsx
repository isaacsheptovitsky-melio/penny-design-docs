import { Box, InputGroup } from '@chakra-ui/react';
import { isMobileDevice, useTestId } from '@melio/penny-utils';
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Divider } from '@/components/dataDisplay/Divider';
import { Icon } from '@/components/foundations/Icon';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { SearchBarProps } from './SearchBar.types';

/**
 * A search bar component with expand/collapse functionality and search capabilities.
 * Provides integrated search and clear buttons with accessibility support.
 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      onChange,
      onBlur,
      onFocus,
      value,
      placeholder,
      isDisabled = false,
      autoFocus,
      onClear,
      onKeyDown,
      onKeyUp,
      'aria-label': ariaLabel = 'Search',
      isFullWidth = false,
      label,
      instructionsText: customInstructionsText,
      valueClearedMessage = 'Value cleared',
      onSearch,
      searchButtonAriaLabel = 'Search',
      clearButtonAriaLabel = 'clear search',
      inputProps,
      'data-testid': dataTestId = 'search-bar',
      ...props
    },
    forwardRef
  ) => {
    const getTestId = useTestId(dataTestId);
    const [localValue, setLocalValue] = useState(value ?? '');
    const [isInputFocus, setInputFocus] = useState<boolean>(false);
    const [isCleared, setIsCleared] = useState<boolean>(false);
    const [searchButtonIsFocused, setSearchButtonIsFocused] = useState<boolean>(false);

    const isExpanded = isInputFocus || Boolean(localValue) || searchButtonIsFocused;

    const style = useMultiStyleConfig('SearchBar', { isFullWidth, isExpanded });
    const inputRef = createRef<HTMLInputElement>();
    const clearButtonRef = useRef<HTMLButtonElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(forwardRef, () => inputRef.current);

    const resetClearState = useCallback(() => {
      setIsCleared(false);
    }, []);

    const handleOnChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        setLocalValue(e.target.value);
        resetClearState();
      },
      [onChange, resetClearState]
    );

    const handleOnClear = useCallback(() => {
      onClear?.();
      handleOnChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
      setIsCleared(true);
      setInputFocus(true);
    }, [handleOnChange, onClear]);

    const handleOnBlur = useCallback(
      (e: FocusEvent<HTMLInputElement, Element>) => {
        if (isInputFocus) {
          onBlur?.(e);
        }
        setInputFocus(false);
        resetClearState();
      },
      [onBlur, isInputFocus, resetClearState]
    );

    const handleOnFocus = useCallback(
      (e: FocusEvent<HTMLInputElement, Element>) => {
        if (!isInputFocus) {
          onFocus?.(e);
        }
        setInputFocus(true);
      },
      [onFocus, isInputFocus]
    );

    useEffect(() => {
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalValue(value ?? '');
    }, [value]);

    const handleOnSearch = useCallback(() => {
      onSearch?.(localValue);
    }, [onSearch, localValue]);

    const handleOnKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(e);
        if (e.key === 'Enter') {
          handleOnSearch();
        }
      },
      [onKeyDown, handleOnSearch]
    );

    const instructionsText = useMemo(
      () =>
        customInstructionsText ??
        (onSearch ? `${isMobileDevice() ? 'Tap' : 'Press'} the search icon to search` : 'Type to search'),

      [customInstructionsText, onSearch]
    );

    return (
      <>
        <VisuallyHidden
          id="search-instructions"
          aria-hidden={isMobileDevice() ? !isInputFocus && !isCleared : true}
          aria-live="polite"
        >
          {isCleared ? `${valueClearedMessage} ${instructionsText}` : instructionsText}
        </VisuallyHidden>
        <InputGroup
          data-component="SearchBar"
          __css={style['container']}
          aria-disabled={isDisabled || undefined}
          data-focus={(!isDisabled && isInputFocus) || undefined}
          onClick={() => inputRef.current?.focus()}
          {...getTestId()}
          {...props}
        >
          <Group alignItems="center" spacing="xxs" width="full">
            {label && (
              <>
                <Box __css={style['label']} data-disabled={isDisabled || undefined} {...getTestId('label')}>
                  {label}
                </Box>
                <Box __css={style['divider']}>
                  <Divider variant="vertical" />
                </Box>
              </>
            )}
            {!onSearch && <Icon type="search" color="inherit" size="small" aria-hidden {...getTestId('search-icon')} />}
            <Box
              as="input"
              // ts-ignore is used due to `type` issues with `<Box/>`.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              type="text"
              aria-label={ariaLabel}
              aria-describedby="search-instructions"
              {...getTestId('input')}
              placeholder={placeholder}
              value={localValue}
              disabled={isDisabled}
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => onKeyUp?.(e)}
              onKeyDown={handleOnKeyDown}
              data-focus={(!isDisabled && isInputFocus) || undefined}
              sx={style['field']}
              autoFocus={autoFocus}
              ref={inputRef}
              {...inputProps}
            />
            {Boolean(localValue) && (
              <IconButton
                icon="close"
                aria-label={clearButtonAriaLabel}
                variant="naked"
                size="extra-small"
                {...getTestId('clear-button')}
                tabIndex={localValue ? 0 : -1}
                onClick={handleOnClear}
                isDisabled={isDisabled}
                ref={clearButtonRef}
              />
            )}
            {onSearch && (
              <IconButton
                icon="search"
                color="inherit"
                size="extra-small"
                variant="naked"
                ref={searchButtonRef}
                aria-label={searchButtonAriaLabel}
                onFocus={() => setSearchButtonIsFocused(true)}
                onBlur={() => setSearchButtonIsFocused(false)}
                onClick={handleOnSearch}
                {...getTestId('search-button')}
              />
            )}
          </Group>
        </InputGroup>
      </>
    );
  }
);

SearchBar.displayName = 'SearchBar';
