import { useDebounceCallback } from '@melio/penny-utils';
import { type ChangeEvent, type InputHTMLAttributes, type KeyboardEvent, useRef, useState } from 'react';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { SearchBar } from './SearchBar';
import { type SearchBarProps } from './SearchBar.types';

export const UsingDebounceExample = (args: SearchBarProps) => {
  const [value, setValue] = useState(args.value);
  const handleInputChange = useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, 500);

  return (
    <Group variant="vertical">
      <SearchBar {...args} onChange={handleInputChange} value={value} />
      <Text textStyle="body2"> value: {value}</Text>
    </Group>
  );
};

export const WithEventsExample = (args: SearchBarProps) => {
  const [value, setValue] = useState('Use Enter and Esc to Blur');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setShowSearchResults(false);
  };

  const onClear = () => {
    setShowSearchResults(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      // Enter or Escape key was pressed
      inputRef.current?.blur();

      if (e.key === 'Enter') {
        // simulate searching behavior when the user press Enter
        setShowSearchResults(value !== '');
      }
    }
  };

  return (
    <Group variant="vertical" spacing="xl">
      <SearchBar
        {...args}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={handleKeyDown}
        value={value}
        ref={inputRef}
      />
      {showSearchResults && `Show search results for: ${value}`}
    </Group>
  );
};

export const OnSearchExample = (args: SearchBarProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setShowSearchResults(false);
  };

  const onClear = () => {
    setShowSearchResults(false);
  };

  const onSearch = (value: InputHTMLAttributes<HTMLInputElement>['value']) => {
    setShowSearchResults(value !== '');

    if (value) {
      setTimeout(() => {
        inputRef.current?.blur();
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      // Escape key was pressed
      inputRef.current?.blur();
    }
  };

  return (
    <Group variant="vertical" spacing="xl">
      <SearchBar
        {...args}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={handleKeyDown}
        value={value}
        ref={inputRef}
        onSearch={onSearch}
      />
      {showSearchResults && `Show search results for: ${value}`}
    </Group>
  );
};
