import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type ContainerProps = BoxProps;

export const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => (
  <Box {...props} ref={ref} data-component="Storybook.Container" />
));

Container.displayName = 'Storybook.Container';
