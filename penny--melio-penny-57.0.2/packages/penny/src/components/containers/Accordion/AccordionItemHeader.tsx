import { forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

export type AccordionItemHeaderProps = {
  /**
   * Defines which semantic heading element to render (`h1`–`h6`).
   */
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  children: ReactNode;
} & TestIdProp;

export const AccordionItemHeader = forwardRef<AccordionItemHeaderProps, 'h3'>(
  ({ children, ...restProps }: AccordionItemHeaderProps, ref) => {
    const getTestId = useDataTestIdContext();

    return (
      <Text textStyle="body2" data-component="AccordionItemHeader" ref={ref} {...getTestId('header')} {...restProps}>
        {children}
      </Text>
    );
  }
);

AccordionItemHeader.displayName = 'AccordionItemHeader';
