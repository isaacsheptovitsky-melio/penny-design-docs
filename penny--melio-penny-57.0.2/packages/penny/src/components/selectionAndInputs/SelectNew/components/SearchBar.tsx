import { SearchBar as _SearchBar, type SearchBarProps as _SearchBarProps } from '../../SearchBar';

type SearchBarProps = Omit<_SearchBarProps, 'isFullWidth' | 'onSearch' | 'searchButtonAriaLabel'>;

export const SearchBar = (props: SearchBarProps) => (
  <_SearchBar {...props} data-component="SelectNew.SearchBar" isFullWidth />
);

SearchBar.displayName = 'SelectNew.SearchBar';
