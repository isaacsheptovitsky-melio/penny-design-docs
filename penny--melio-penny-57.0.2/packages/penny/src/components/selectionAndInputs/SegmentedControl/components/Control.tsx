import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type ControlProps } from './Control.types';

export const Control = forwardRef<HTMLDivElement, ControlProps>(
  ({ isFullWidth, children, onChange, ...props }, ref) => {
    const style = useMultiStyleConfig('SegmentedControl', {});

    return (
      <Box
        __css={style['control']}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={onChange}
        data-is-full-width={isFullWidth}
        {...props}
        ref={ref}
      >
        {children}
      </Box>
    );
  }
);

Control.displayName = 'Control';
