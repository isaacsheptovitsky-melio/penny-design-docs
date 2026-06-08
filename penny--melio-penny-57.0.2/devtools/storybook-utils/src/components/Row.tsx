import { Box, BoxProps, Text } from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';

import { ContainerProps } from './Container';

type Item = { component: ReactElement; label?: ReactNode };

type RowProps = Pick<ContainerProps, 'alignItems' | 'justifyContent' | 'gap'> & {
  items: Item[];
  alignCompLabel?: 'horizontal' | 'vertical';
  flexBasis?: BoxProps['flexBasis'];
};

export const Row = ({
  items,
  alignCompLabel = 'horizontal',
  alignItems = 'center',
  justifyContent = 'center',
  flexBasis = 'auto',
  gap = '16px',
  ...props
}: RowProps) => {
  const sharedStyle = { display: 'flex', justifyContent: 'space-evenly', alignItems, gap, flexWrap: 'wrap' };

  return (
    <Box {...props} data-component="Storybook.Row" __css={{ ...sharedStyle, width: '100%' }}>
      {items.map((item, index) => (
        <Box
          key={index}
          __css={{
            ...sharedStyle,
            flexDirection: alignCompLabel === 'vertical' ? 'column' : 'row',
            alignItems,
            justifyContent,
            flexGrow: 1,
            flexBasis,
            gap: '16px',
          }}
        >
          {item.label && <Text>{item.label}</Text>}
          {item.component}
        </Box>
      ))}
    </Box>
  );
};

Row.displayName = 'Storybook.Row';
