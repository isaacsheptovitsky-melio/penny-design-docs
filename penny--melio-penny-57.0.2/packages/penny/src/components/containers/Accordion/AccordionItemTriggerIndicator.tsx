import { forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { Icon } from '@/components/foundations/Icon';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useAccordionItemContext } from './Accordion.context';

export type AccordionItemTriggerIndicatorProps = TestIdProp;

export const AccordionItemTriggerIndicator = forwardRef<AccordionItemTriggerIndicatorProps, 'div'>(
  (props: AccordionItemTriggerIndicatorProps, ref) => {
    const { isExpanded } = useAccordionItemContext();
    const getTestId = useDataTestIdContext();

    return (
      <Icon
        data-component="AccordionItemTriggerIndicator"
        ref={ref}
        size="small"
        type={isExpanded ? 'remove' : 'add'}
        color="inherit"
        {...getTestId('trigger-indicator', isExpanded ? 'expanded' : 'collapsed')}
        {...props}
      />
    );
  }
);

AccordionItemTriggerIndicator.displayName = 'AccordionItemTriggerIndicator';
