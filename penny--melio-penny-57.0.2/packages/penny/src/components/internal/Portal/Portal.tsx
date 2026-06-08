import { FloatingPortal } from '@floating-ui/react';
import { type FC, type ReactNode } from 'react';

import { MelioWrapper } from '../../../theme/MelioWrapper';

export type PortalProps = {
  children?: ReactNode;
  id?: string;
  root?: HTMLElement | null;
  isAlwaysVisible?: boolean;
};

export const Portal: FC<PortalProps> = ({ children, isAlwaysVisible, ...props }) => (
  <FloatingPortal {...props}>
    <MelioWrapper background="transparent" isAlwaysVisible={isAlwaysVisible}>
      {children}
    </MelioWrapper>
  </FloatingPortal>
);

Portal.displayName = 'Portal';
