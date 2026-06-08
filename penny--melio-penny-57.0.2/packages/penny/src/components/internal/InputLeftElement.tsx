import {
  type InputElementProps as ChakraInputElementProps,
  InputLeftElement as ChakraInputLeftElement,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type InputLeftElementProps = ChakraInputElementProps;

export const InputLeftElement = forwardRef<HTMLDivElement, InputLeftElementProps>((props, ref) => (
  <ChakraInputLeftElement ref={ref} {...props} />
));
