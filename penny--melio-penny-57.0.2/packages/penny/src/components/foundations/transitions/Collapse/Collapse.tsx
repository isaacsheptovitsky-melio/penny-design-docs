import { Collapse as ChakraCollapse, type CollapseProps as ChakraCollapseProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type CollapseProps = ChakraCollapseProps;

export const Collapse = forwardRef<HTMLButtonElement, CollapseProps>((props, ref) => (
  <ChakraCollapse
    data-component="Collapse"
    type="button"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- Used due to `ref` issues when using chakra's `type` prop.
    ref={ref}
    {...props}
  />
));
Collapse.displayName = 'Collapse';
