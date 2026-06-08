import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import { FC } from 'react';

import { ThemeLoaderProps } from '../../../../packages/penny/src/theme/foundations/loader';

export const Spinner: FC<ThemeLoaderProps> = ({ color }) => (
  <ChakraSpinner color={color} width="16px" height="16px" thickness="3px" speed="1.3s" />
);
