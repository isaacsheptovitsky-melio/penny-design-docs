import { forwardRef, type ReactNode } from 'react';

import { Divider as _Divider } from '@/components/dataDisplay/Divider';

import { Container } from '../../../../Container';

export const MenuDivider = forwardRef<HTMLDivElement, { children?: ReactNode }>(({ ...props }, ref) => (
  <Container
    as={_Divider}
    data-component="MenuDivider"
    role="separator"
    aria-hidden
    overflow="initial"
    paddingY="xxs"
    {...props}
    ref={ref}
  />
));

MenuDivider.displayName = 'MenuDivider';
