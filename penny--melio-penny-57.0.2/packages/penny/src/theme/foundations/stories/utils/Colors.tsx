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

type ColorCardProps = {
  name: string;
  hex: string;
  label: string;
};

const ColorCard: FC<ColorCardProps> = ({ name, hex, label }) => (
  <Container backgroundColor="light" paddingX="s" paddingY="s" border="regular">
    <Group spacing="s" justifyContent="space-between" width="full" alignItems="center">
      <Text textStyle="body3Semi" color="semantic.text.primary" style={{ width: '300px' }}>
        {label}
      </Text>
      <Text textStyle="body3" color="semantic.text.primary" style={{ width: '100px', textAlign: 'left' }}>
        {hex}
      </Text>
      <Storybook.TokenPreview backgroundColor={hex} copyText={name} />
    </Group>
  </Container>
);

export const Colors = () => {
  const { colors } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<TokenLevel>(TokenLevel.All);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = useDebounceCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  }, 300);

  const getLevelColors = (level: TokenLevel) => {
    if (level === TokenLevel.All) {
      return Object.entries(colors).reduce(
        (acc, [levelKey, value]) => {
          Object.entries(value).forEach(([groupKey, groupValue]) => {
            const key = `${levelKey}.${groupKey}`;
            acc[key] = flatten(groupValue as Record<string, string>);
          });
          return acc;
        },
        {} as Record<string, Record<string, string>>
      );
    }
    return Object.entries(colors[level]).reduce(
      (acc, [groupKey, groupValue]) => {
        const key = `${level}.${groupKey}`;
        acc[key] = flatten(groupValue as Record<string, string>);
        return acc;
      },
      {} as Record<string, Record<string, string>>
    );
  };

  const levelColors = getLevelColors(selectedLevel);

  const filteredColorGroups = useMemo(
    () =>
      Object.entries(levelColors)
        .map(([groupName, tokens]) => {
          const filteredTokens = Object.entries(tokens).filter(
            ([tokenName, hex]) =>
              searchValue === '' ||
              `${selectedLevel}.${groupName}.${tokenName}`.toLowerCase().includes(searchValue) ||
              (typeof hex === 'string' && hex.toLowerCase().includes(searchValue))
          );
          return filteredTokens.length > 0 ? { groupName, tokens: filteredTokens } : null;
        })
        .filter(Boolean) as { groupName: string; tokens: [string, string][] }[],
    [levelColors, searchValue, selectedLevel]
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
        <SearchBar onChange={handleInputChange} value={searchValue} placeholder="Search color token" />
      </Group>

      <Container paddingX="s" paddingY="s" border="regular">
        <Group variant="vertical" hasDivider spacing="xxl">
          {filteredColorGroups.map(({ groupName, tokens }) => (
            <Group key={groupName} variant="vertical">
              <Text textStyle="body1Semi" color="semantic.text.primary">
                {groupName}
              </Text>
              <Group variant="vertical">
                {tokens.map(([tokenName, hex]) => (
                  <ColorCard
                    key={tokenName}
                    label={`${groupName}.${tokenName}`}
                    name={`${groupName}.${tokenName}`}
                    hex={hex}
                  />
                ))}
              </Group>
            </Group>
          ))}
        </Group>
      </Container>
    </Group>
  );
};
