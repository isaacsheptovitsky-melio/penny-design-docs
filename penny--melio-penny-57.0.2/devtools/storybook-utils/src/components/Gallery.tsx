import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { cloneElement, ReactElement } from 'react';

import { Container, ContainerProps } from './Container';

type GalleryProps = Pick<ContainerProps, 'alignItems'> & {
  asset: ReactElement;
  labels: string[];
  isInverse?: boolean;
  columns?: number;
};

export const Gallery = ({ columns = 4, alignItems, asset, labels, isInverse = false, ...props }: GalleryProps) => (
  <Container display="flex" alignItems="center" gap="l" {...props} data-component="Storybook.Gallery">
    <SimpleGrid templateColumns={`repeat(${columns}, 1fr)`} columnGap="m" rowGap="l" width="100%">
      {labels.map((label) => (
        <Box display="flex" flexDirection="column" alignItems={alignItems} gap="s" key={label}>
          {isInverse ? (
            <Box
              display="flex"
              bgColor="global.brand.700"
              padding="xs"
              borderRadius="global.200"
              overflowX="hidden"
              width="fit-content"
            >
              {cloneElement(asset, { type: label })}
            </Box>
          ) : (
            cloneElement(asset, { type: label })
          )}
          <Text textStyle="body2">{label}</Text>
        </Box>
      ))}
    </SimpleGrid>
  </Container>
);

Gallery.displayName = 'Storybook.Gallery';
