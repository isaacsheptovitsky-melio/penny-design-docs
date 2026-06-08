import { type ResponsiveValue } from '@chakra-ui/react';

export const sizes = {
  full: '100%',
};

export type SizeKey<T> = keyof typeof sizes | ResponsiveValue<T>;
