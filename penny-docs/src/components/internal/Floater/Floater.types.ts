import { type BoxProps } from '@chakra-ui/react';
import { type FloatingFocusManagerProps } from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type CSSProperties, type HTMLAttributes, type PropsWithChildren, type ReactNode } from 'react';

export type FloaterProps = PropsWithChildren<{
  isOpen: boolean;
  focusManagerProps: Omit<FloatingFocusManagerProps, 'children'>;
  overlay?: ReactNode;
  styles?: CSSProperties;
}> &
  Pick<BoxProps, 'as'> &
  TestIdProp &
  HTMLAttributes<HTMLDivElement>;
