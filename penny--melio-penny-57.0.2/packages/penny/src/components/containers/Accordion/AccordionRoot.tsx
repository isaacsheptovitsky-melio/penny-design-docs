import { chakra, forwardRef } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type ReactNode, useMemo, useRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { DataTestIdContext, type DataTestIdContextValue } from '@/utils/dataTestIdContext';
import { useControlled } from '@/utils/useControlled';

import { AccordionContext, type AccordionContextValue, StylesProvider } from './Accordion.context';

export type AccordionRootProps = {
  /**
   * The initial value of the expanded accordion items. Use when you don't need to control the value of the accordion.
   */
  defaultValue?: string[];

  /**
   * The controlled value of the expanded accordion items.
   */
  value?: string[];

  /**
   * The callback fired when the state of expanded/collapsed accordion items changes.
   */
  onValueChange?: (value: string[]) => void;

  /**
   * Whether to keep the element in the DOM while the panel is closed.
   * @default false
   */
  keepMounted?: boolean;

  /**
   * Whether multiple items can be open at the same time.
   * @default false
   */
  isMultiple?: boolean;

  children: ReactNode | ((props: AccordionContextValue) => ReactNode);
} & TestIdProp;

/**
 * For composition and customization options, see the <a href="?path=/docs/composition-customization--docs" target="_self">composition & customization documentation</a>.
 */
export const AccordionRoot = forwardRef<AccordionRootProps, 'div'>(
  (
    {
      isMultiple = false,
      defaultValue,
      value: valueProp,
      onValueChange,
      keepMounted = false,
      children,
      'data-testid': dataTestId = 'accordion',
      ...restProps
    }: AccordionRootProps,
    ref
  ) => {
    const [value, setValue] = useControlled(valueProp, onValueChange, defaultValue || []);
    const styles = useMultiStyleConfig('Accordion', {});
    const accordionItemsRef = useRef<Record<string, HTMLButtonElement | null>>({});

    const contextValue: AccordionContextValue = useMemo(
      () => ({
        value,
        setValue,
        accordionItemsRef,
        isMultiple,
        keepMounted,
      }),
      [value, setValue, isMultiple, keepMounted]
    );

    const dataTestIdContextValue: DataTestIdContextValue = useMemo(
      () => ({ rootDataTestId: dataTestId }),
      [dataTestId]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <StylesProvider value={styles}>
          <DataTestIdContext.Provider value={dataTestIdContextValue}>
            <chakra.div data-component="AccordionRoot" data-testid={dataTestId} ref={ref} {...restProps}>
              {/* eslint-disable-next-line react-hooks/refs */}
              {typeof children === 'function' ? children(contextValue) : children}
            </chakra.div>
          </DataTestIdContext.Provider>
        </StylesProvider>
      </AccordionContext.Provider>
    );
  }
);

AccordionRoot.displayName = 'AccordionRoot';
