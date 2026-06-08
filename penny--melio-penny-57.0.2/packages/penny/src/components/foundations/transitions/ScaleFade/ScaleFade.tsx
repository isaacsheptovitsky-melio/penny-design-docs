import { ScaleFade as ChakraScaleFade, type ScaleFadeProps as ChakraScaleFadeProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type ScaleFadeProps = ChakraScaleFadeProps;

export const ScaleFade = forwardRef<HTMLDivElement, ScaleFadeProps>((props, ref) => (
  <ChakraScaleFade data-component="ScaleFade" ref={ref} {...props} />
));
ScaleFade.displayName = 'ScaleFade';
