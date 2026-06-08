import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode } from 'react';

import { Collapse } from '@/components/foundations/transitions/Collapse';
import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useAccordionContext, useAccordionItemContext, useStyles } from './Accordion.context';

export type AccordionItemPanelProps = {
  children: ReactNode;
} & TestIdProp;

export const AccordionItemPanel = forwardRef<AccordionItemPanelProps, 'div'>(
  ({ children, ...restProps }: AccordionItemPanelProps, ref) => {
    const styles = useStyles();
    const { keepMounted } = useAccordionContext();
    const { panelId, triggerId, isExpanded } = useAccordionItemContext();
    const getTestId = useDataTestIdContext();

    return (
      <Collapse in={isExpanded} unmountOnExit={!keepMounted} animateOpacity>
        <chakra.div
          data-component="AccordionItemPanel"
          __css={styles['itemPanel']}
          ref={ref}
          role="region"
          id={panelId}
          aria-labelledby={triggerId}
          {...getTestId('panel')}
          {...restProps}
        >
          {children}
        </chakra.div>
      </Collapse>
    );
  }
);

AccordionItemPanel.displayName = 'AccordionItemPanel';
