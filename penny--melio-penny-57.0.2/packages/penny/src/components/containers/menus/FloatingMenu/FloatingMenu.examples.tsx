import { type ChangeEventHandler, useEffect, useMemo, useState } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { SearchBar } from '@/components/selectionAndInputs/SearchBar';

import { Container } from '../../Container';
import {
  FloatingMenu,
  FloatingMenuActionTrigger,
  FloatingMenuDropdownList,
  FloatingMenuHeader,
  FloatingMenuSelectionItem,
  useMenuItem,
} from '.';
import { type FloatingMenuProps } from './FloatingMenu.types';

const SearchHeader = ({ onChange }: { onChange: ChangeEventHandler<HTMLInputElement> }) => {
  const { ref } = useMenuItem();

  return (
    <FloatingMenuHeader>
      <SearchBar isFullWidth ref={ref} onChange={onChange} />
    </FloatingMenuHeader>
  );
};

export const WithSearchBarExample = (props: FloatingMenuProps) => {
  const items = useMemo(
    () => [{ label: 'Buenos Aires' }, { label: 'Chicago' }, { label: 'New-York' }, { label: 'San Diego' }],
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ label: string } | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleItemClick = (item: { label: string }) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchValue('');
  }, [isOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredItems(items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue, items]);

  const trigger = <FloatingMenuActionTrigger label="Click me" />;
  const emptyState = (
    <Container paddingY="s" paddingX="s" justifyContent="center" textAlign="center">
      <Text textStyle="body3" color="semantic.text.secondary">
        No results for &quot;{searchValue}&quot;
      </Text>
    </Container>
  );

  return (
    <FloatingMenu
      {...props}
      disableTypeahead
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      header={<SearchHeader onChange={(event) => setSearchValue(event.target.value)} />}
      content={
        <FloatingMenuDropdownList paddingY="xs">
          {filteredItems.length > 0
            ? filteredItems.map((item, index) => (
                <FloatingMenuSelectionItem
                  key={index}
                  onClick={() => handleItemClick(item)}
                  isSelected={item.label === selectedItem?.label}
                >
                  {item.label}
                </FloatingMenuSelectionItem>
              ))
            : emptyState}
        </FloatingMenuDropdownList>
      }
    />
  );
};
