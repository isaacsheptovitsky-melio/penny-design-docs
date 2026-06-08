import { chakra, forwardRef, mergeRefs } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type KeyboardEvent, type ReactNode, useCallback } from 'react';

import { useDataTestIdContext } from '@/utils/dataTestIdContext';

import { useAccordionContext, useAccordionItemContext, useStyles } from './Accordion.context';

export type AccordionItemTriggerProps = {
  children: ReactNode;
} & TestIdProp;

const SUPPORTED_KEYS = ['ArrowUp', 'ArrowDown', 'Home', 'End'];

export const AccordionItemTrigger = forwardRef<AccordionItemTriggerProps, 'button'>(
  ({ children, ...restProps }: AccordionItemTriggerProps, forwardRef) => {
    const styles = useStyles();
    const { setValue: setAccordionValue, accordionItemsRef, isMultiple, value: accordionValue } = useAccordionContext();
    const { value, isExpanded, panelId, triggerId } = useAccordionItemContext();
    const getTestId = useDataTestIdContext();

    const setRef = useCallback(
      (node: HTMLButtonElement | null) => {
        if (node) {
          accordionItemsRef.current[value] = node;
        } else {
          delete accordionItemsRef.current[value];
        }
      },
      [value, accordionItemsRef]
    );

    const handleClick = () => {
      if (!isMultiple) {
        setAccordionValue(isExpanded ? [] : [value]);
        return;
      }

      if (isExpanded) {
        setAccordionValue(accordionValue.filter((item) => item !== value));
      } else {
        setAccordionValue([...accordionValue, value]);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (!SUPPORTED_KEYS.includes(event.key)) {
        return;
      }

      const keys = Object.keys(accordionItemsRef.current);
      const currentIndex = keys.indexOf(value);

      if (currentIndex === -1) {
        return;
      }

      event.preventDefault();
      let nextIndex: number | null = null;

      const findNextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
        const length = keys.length;
        let index = startIndex;

        for (let i = 0; i < length; i++) {
          index = (index + direction + length) % length;
          const key = keys[index] as string;

          const item = accordionItemsRef.current[key];

          if (!item?.disabled) {
            return index;
          }
        }

        return null;
      };

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = findNextEnabledIndex(currentIndex, 1);
          break;

        case 'ArrowUp':
          nextIndex = findNextEnabledIndex(currentIndex, -1);
          break;

        case 'Home':
          nextIndex = findNextEnabledIndex(-1, 1);
          break;

        case 'End':
          nextIndex = findNextEnabledIndex(keys.length, -1);
          break;

        default:
          return;
      }

      if (nextIndex !== null) {
        const nextKey = keys[nextIndex];

        if (nextKey) {
          const nextEl = accordionItemsRef.current[nextKey];
          nextEl?.focus();
        }
      }
    };

    const ref = mergeRefs(setRef, forwardRef);

    return (
      <chakra.button
        data-component="AccordionItemTrigger"
        __css={styles['itemTrigger']}
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        id={triggerId}
        type="button"
        {...getTestId('trigger')}
        {...restProps}
      >
        {children}
      </chakra.button>
    );
  }
);

AccordionItemTrigger.displayName = 'AccordionItemTrigger';
