import { Box, Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { colorPalettes } from '../shared-styles';

const styles = {
  color: colorPalettes.neutral['1000'],
  textDecoration: 'underline',
  '&:hover': {
    color: colorPalettes.brand['700'],
  },
};

export type LinkProps = Pick<ChakraLinkProps, 'children' | 'color' | 'href' | 'isExternal'> & {
  target?: '_blank' | '_parent' | '_self' | '_top';
  children: ReactNode;
};

export const Link = ({ children, isExternal, target = '_parent', ...props }: LinkProps) => (
  <Box
    data-component="Link"
    as={ChakraLink}
    role="link"
    __css={styles}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target={isExternal ? '_blank' : target}
    {...props}
  >
    {children}
  </Box>
);

Link.displayName = 'Storybook.Link';
