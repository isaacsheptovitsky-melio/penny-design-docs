import type { SlideProps as ChakraSlideProps } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

/**
 * Props for the Slide transition component.
 *
 * Extends ChakraSlideProps and TestIdProp.
 */
export type SlideProps = {
  /**
   * If true, renders an alternative slide animation.
   */
  shouldRenderAlternativeSlide?: boolean;

  /**
   * Callback fired when the Escape key is pressed.
   */
  onEsc?: VoidFunction;
} & ChakraSlideProps &
  TestIdProp & {
    /**
     * The content of the slide.
     */
    children?: ReactNode;
  };
