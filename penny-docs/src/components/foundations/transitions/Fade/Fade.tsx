import { Fade as ChakraFade, type FadeProps as ChakraFadeProps } from '@chakra-ui/react';
import { merge } from '@melio/penny-utils';
import { forwardRef } from 'react';

export type FadeProps = ChakraFadeProps;

// TODO: expose in configuration so support clients override
const defaultProps: FadeProps = {
  transition: {
    enter: { duration: 0.4 },
  },
};

export const Fade = forwardRef<HTMLDivElement, FadeProps>(({ children, ...props }, ref) => (
  <ChakraFade data-component="Fade" {...merge(props, defaultProps)} ref={ref}>
    {children}
  </ChakraFade>
));
Fade.displayName = 'Fade';
