import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type DropdownListProps } from './DropdownList.types';

export const DropdownList = forwardRef<HTMLDivElement, DropdownListProps>(
  ({ paddingY = 'none', as = 'ul', gap = 'none', ...props }, ref) => {
    const style = useStyleConfig('DropdownList', { paddingY, gap });

    return <Box __css={style} data-component="DropdownList" as={as} {...props} ref={ref} />;
  }
);

DropdownList.displayName = 'DropdownList';
