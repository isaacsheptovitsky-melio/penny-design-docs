import { Box } from '@chakra-ui/react';
import { type FC } from 'react';
import { Storybook, tableBorderStyles, tableHeaderStyles, tableRowBackgroundStyles } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { shadows } from '../../shadows';

const Container: FC<{ shadow: string }> = ({ shadow }) => (
  <Box
    __css={{
      height: '100px',
      width: '100px',
      backgroundColor: 'global.neutral.300',
      borderRadius: 'global.100',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      __css={{
        height: '50px',
        width: '50px',
        backgroundColor: 'semantic.surface.primary.rest',
        borderRadius: 'global.100',
        boxShadow: shadow,
      }}
    />
  </Box>
);

export const Shadows: FC = () => (
  <table style={{ width: '100%', ...tableBorderStyles }}>
    <thead style={tableHeaderStyles}>
      <tr>
        <th style={{ width: '10%' }}></th>
        <th style={{ textAlign: 'start' }}>Name</th>
        <th style={{ textAlign: 'start', width: '80%' }}>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(shadows).map(([shadowKey, shadowUnit]) => (
        <tr key={shadowKey} style={tableRowBackgroundStyles}>
          <td>
            <Group spacing="none" alignItems="center">
              <Container shadow={shadowKey} />
            </Group>
          </td>
          <td>
            <Storybook.Code label={shadowKey} />
          </td>
          <td>
            <Storybook.Code label={shadowUnit.toString()} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
