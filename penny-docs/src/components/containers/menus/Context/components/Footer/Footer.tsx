import { forwardRef, type HTMLAttributes } from 'react';

import { Container } from '../../../../Container';

export const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <Container data-component="Footer" paddingY="s" paddingX="s" {...props} ref={ref} />
));

Footer.displayName = 'Footer';
