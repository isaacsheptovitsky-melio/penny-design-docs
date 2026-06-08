import { type HTMLProps } from 'react';

export type DrawerContentProps = {
  onOverlayClick?: VoidFunction;
  onEsc?: VoidFunction;
} & HTMLProps<HTMLElement>;
