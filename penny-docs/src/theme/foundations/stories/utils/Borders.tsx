import { useDebounceCallback } from '@melio/penny-utils';
import { flatten } from 'flat';
import { type ChangeEvent, type FC, useMemo, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Chip } from '@/components/selectionAndInputs/Chip';
import { SearchBar } from '@/components/selectionAndInputs/SearchBar';

import { useTheme } from '../../../hooks';
import { TokenLevel } from './types';

type BorderProps = {
  name: string;
  border: string;
  label: string;
};

const BorderCard: FC<BorderProps> = ({ name, border, label }) => (
  <Container backgroundColor="light" paddingX="s" paddingY="s" border="regular">
    <Group spacing="s" justifyContent="space-between" width="full" alignItems="center">
      <Text
        textStyle="body3Semi"
        color="semantic.text.primary"
        shouldSupportEllipsis
        style={{ flexShrink: 0, width: '250px' }}
      >
        {label}
      </Text>
      <Text
        textStyle="body3"
        color="semantic.text.primary"
        style={{ flexShrink: 0, width: '100px', textAlign: 'right' }}
      >
        {border}
      </Text>
      <Storybook.TokenPreview border={border} copyText={name} borderColor="semantic.border.neutral" />
    </Group>
  </Container>
);

export const Borders = () => {
  const { borders } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<TokenLevel>(TokenLevel.All);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  }, 300);

  const getLevelBorders = (level: TokenLevel): Record<string, string> => {
    if (level === TokenLevel.All) {
      return Object.entries(borders).reduce(
        (acc, [levelKey, value]) => {
          const flattened: Record<string, string> = flatten(value);
          Object.entries(flattened).forEach(([key, val]) => {
            if (typeof val === 'string') {
              acc[`${levelKey}.${key}`] = val;
            }
          });
          return acc;
        },
        {} as Record<string, string>
      );
    }

    const levelTokens = borders[level];

    // Determine if it's already flat or needs flattening
    const flattened: Record<string, string> = flatten(levelTokens);
    return Object.entries(flattened).reduce(
      (acc, [key, val]) => {
        if (typeof val === 'string') {
          acc[`${level}.${key}`] = val;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  };

  const levelborders = getLevelBorders(selectedLevel);

  const filteredBorders = useMemo(
    () =>
      Object.entries(levelborders).filter(
        ([tokenName, value]) =>
          searchValue === '' ||
          tokenName.toLowerCase().includes(searchValue) ||
          (typeof value === 'string' && value.toLowerCase().includes(searchValue))
      ),
    [levelborders, searchValue]
  );

  return (
    <Group spacing="s-m" variant="vertical">
      <Group spacing="xs" justifyContent="space-between">
        <Group spacing="xs">
          {Object.values(TokenLevel).map((level) => (
            <Chip
              key={level}
              label={level}
              onClick={() => setSelectedLevel(level)}
              selected={selectedLevel === level}
            />
          ))}
        </Group>
        <SearchBar onChange={handleInputChange} value={searchValue} placeholder="Search border token" />
      </Group>

      <Container paddingX="s" paddingY="s" border="regular">
        <Group variant="vertical">
          {filteredBorders.map(([tokenName, border]) => (
            <BorderCard key={tokenName} label={tokenName} name={tokenName} border={border} />
          ))}
        </Group>
      </Container>
    </Group>
  );
};
