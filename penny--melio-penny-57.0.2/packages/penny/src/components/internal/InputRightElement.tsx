import {
  type InputElementProps as ChakraInputElementProps,
  InputRightElement as ChakraInputRightElement,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type InputRightElementProps = ChakraInputElementProps;

export const InputRightElement = forwardRef<HTMLDivElement, InputRightElementProps>((props, ref) => (
  <ChakraInputRightElement ref={ref} {...props} />
));
