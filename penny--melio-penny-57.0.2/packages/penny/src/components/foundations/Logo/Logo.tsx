import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { useLogos } from '@/theme/hooks/useLogos';

import type { LogoProps } from './Logo.types';

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ size = 'large', type, 'data-testid': dataTestId = 'logo', ...props }, ref) => {
    const logos = useLogos();
    const styles = useStyleConfig('Logo', { size });
    const getTestId = useTestId(dataTestId);
    const isURLLogo = typeof logos[type] === 'string';

    return (
      <Box data-component="Logo" ref={ref} {...props} {...getTestId()} __css={styles}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {isURLLogo ? <img src={logos[type]} alt={logos[type]} /> : <Box as={logos[type]} />}
      </Box>
    );
  }
);

Logo.displayName = 'Logo';
