import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaRole, type ReactNode } from 'react';

import { type ThemeSpaceKey } from '@/theme/foundations/spaces';

export type DropdownListProps = {
  children: ReactNode;
  as?: BoxProps['as'];
  paddingY?: ThemeSpaceKey;
  gap?: ThemeSpaceKey;
  role?: AriaRole;
} & TestIdProp;
