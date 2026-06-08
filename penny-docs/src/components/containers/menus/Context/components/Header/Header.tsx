import { forwardRef, type HTMLAttributes } from 'react';

import { Container } from '../../../../Container';

export const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <Container data-component="Header" paddingY="s" paddingX="s" {...props} ref={ref} />
));

Header.displayName = 'Header';
