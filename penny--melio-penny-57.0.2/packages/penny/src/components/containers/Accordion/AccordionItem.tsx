import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode, useId, useMemo } from 'react';

import { DataTestIdContext, type DataTestIdContextValue, useDataTestIdContext } from '@/utils/dataTestIdContext';

import {
  AccordionItemContext,
  type AccordionItemContextValue,
  useAccordionContext,
  useStyles,
} from './Accordion.context';

export type AccordionItemProps = {
  /**
   * The value of the accordion item.
   */
  value?: string;

  /**
   * `ReactNode | ((props: AccordionItemContextValue) => ReactNode)`
   */
  children: ReactNode | ((props: AccordionItemContextValue) => ReactNode);
} & TestIdProp;

export const AccordionItem = forwardRef<AccordionItemProps, 'div'>(
  ({ value: valueProp, 'data-testid': dataTestIdProp, children, ...restProps }: AccordionItemProps, ref) => {
    const styles = useStyles();
    const { value: accordionValue } = useAccordionContext();
    const getTestId = useDataTestIdContext();
    const panelId = useId();
    const triggerId = useId();
    const fallbackValue = useId();
    const value = valueProp || fallbackValue;
    const dataTestId = dataTestIdProp || getTestId('item', value)['data-testid'];

    const contextValue: AccordionItemContextValue = useMemo(
      () => ({
        value,
        isExpanded: accordionValue.includes(value),
        panelId,
        triggerId,
      }),
      [value, accordionValue, panelId, triggerId]
    );

    const dataTestIdContextValue: DataTestIdContextValue = useMemo(
      () => ({ rootDataTestId: dataTestId as string }),
      [dataTestId]
    );

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <DataTestIdContext.Provider value={dataTestIdContextValue}>
          <chakra.div
            data-component="AccordionItem"
            __css={styles['item']}
            ref={ref}
            data-testid={dataTestId}
            {...restProps}
          >
            {typeof children === 'function' ? children(contextValue) : children}
          </chakra.div>
        </DataTestIdContext.Provider>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
