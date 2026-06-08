// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, type BoxProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const MelioWrapper = forwardRef<HTMLDivElement, BoxProps & { isAlwaysVisible?: boolean }>(
  ({ isAlwaysVisible, ...props }, ref) => (
    <melio-wrapper data-always-visible={isAlwaysVisible}>
      <Box data-component="Box" className="melio-sdk-container" {...props} ref={ref} />
    </melio-wrapper>
  )
);
