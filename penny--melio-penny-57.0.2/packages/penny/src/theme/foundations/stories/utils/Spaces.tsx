import { Box } from '@chakra-ui/react';
import { type FC } from 'react';
import { Storybook, tableBorderStyles, tableHeaderStyles, tableRowBackgroundStyles } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { themeSpaces } from '../../spaces';

const Ball = () => (
  <Box __css={{ height: '15px', width: '15px', backgroundColor: 'global.brand.600', borderRadius: 'global.full' }} />
);

const Spacer: FC<{ space: string }> = ({ space }) => (
  <Box __css={{ height: '40px', width: space, backgroundColor: 'global.brand.200', borderRadius: 'global.100' }} />
);

export const Spaces: FC = () => (
  <table style={{ width: '100%', ...tableBorderStyles }}>
    <thead style={tableHeaderStyles}>
      <tr>
        <th style={{ width: '10%' }}></th>
        <th style={{ textAlign: 'start' }}>Name</th>
        <th style={{ textAlign: 'start', width: '80%' }}>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(themeSpaces).map(([spaceKey, spaceUnit]) => (
        <tr key={spaceKey} style={tableRowBackgroundStyles}>
          <td>
            <Group spacing="none" alignItems="center">
              <Ball />
              <Spacer space={spaceUnit} />
              <Ball />
            </Group>
          </td>
          <td>
            <Storybook.Code label={spaceKey} />
          </td>
          <td>
            <Storybook.Code label={spaceUnit} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
