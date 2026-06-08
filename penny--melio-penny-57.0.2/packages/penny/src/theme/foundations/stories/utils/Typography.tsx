import { Box } from '@chakra-ui/react';
import { type FC } from 'react';
import { Storybook, tableBorderStyles, tableHeaderStyles, tableRowBackgroundStyles } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';

import { useTheme } from '../../../hooks';

const propNameMap: Record<string, string> = {
  fontWeight: 'Font Weight',
  fontSize: 'Font Size',
  lineHeight: 'Line Height',
  textTransform: 'Text Transform',
  letterSpacing: 'Letter Spacing',
  fontFamily: 'Font Family',
};

export const Typography: FC = () => {
  const { textStyles, fonts } = useTheme();

  return (
    <table style={{ width: '100%', ...tableBorderStyles }}>
      <thead style={tableHeaderStyles}>
        <tr>
          <th></th>
          <th style={{ textAlign: 'start' }}>Typography Name</th>
          <th style={{ textAlign: 'start', width: '60%' }}>Definitions</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(textStyles).map(([typographyKey, typographyUnit]) => (
          <tr key={typographyKey} style={{ height: '75px', ...tableRowBackgroundStyles }}>
            <td>
              <Box as="span" style={{ fontFamily: fonts.primary }} textStyle={typographyKey}>
                Aa
              </Box>
            </td>
            <td>
              <Storybook.Code label={typographyKey} />
            </td>
            <td>
              <Group variant="vertical" spacing="xs">
                {Object.entries(typographyUnit).map(([propKey, propValue]) => (
                  <Group key={propKey} spacing="xxs">
                    <Text textStyle="body4">{propNameMap[propKey] ?? [propKey]}:</Text>
                    <Text textStyle="body4">
                      <Storybook.Code
                        label={typeof propValue === 'object' ? JSON.stringify(propValue) : propValue.toString()}
                      />
                    </Text>
                  </Group>
                ))}
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
