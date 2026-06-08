import { useState } from 'react';
import { type Mock } from 'vitest';

import { AccordionItem } from '../AccordionItem';
import { AccordionItemHeader } from '../AccordionItemHeader';
import { AccordionItemPanel } from '../AccordionItemPanel';
import { AccordionItemTrigger } from '../AccordionItemTrigger';
import { AccordionItemTriggerIndicator } from '../AccordionItemTriggerIndicator';
import { AccordionRoot, type AccordionRootProps } from '../AccordionRoot';

export const ACCORDION_TEST_ITEMS = [
  { value: '1', title: 'Section title 1', content: 'Section content 1' },
  { value: '2', title: 'Section title 2', content: 'Section content 2' },
  { value: '3', title: 'Section title 3', content: 'Section content 3' },
] as const;

export type ExplicitValueUncontrolledAccordionProps = Omit<AccordionRootProps, 'children' | 'value' | 'onValueChange'>;

export const ExplicitValueUncontrolledAccordion = (props: ExplicitValueUncontrolledAccordionProps) => (
  <AccordionRoot {...props}>
    {ACCORDION_TEST_ITEMS.map(({ value, title, content }) => (
      <AccordionItem key={value} value={value}>
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            {title}
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>
        <AccordionItemPanel>{content}</AccordionItemPanel>
      </AccordionItem>
    ))}
  </AccordionRoot>
);

export const ImplicitValueUncontrolledAccordion = () => (
  <AccordionRoot>
    {ACCORDION_TEST_ITEMS.map(({ value, title, content }) => (
      <AccordionItem key={value}>
        {({ isExpanded }) => (
          <>
            <AccordionItemHeader as="h2">
              <AccordionItemTrigger>
                {title}
                <AccordionItemTriggerIndicator
                  data-testid={`item-${value}-trigger-indicator-${isExpanded ? 'expanded' : 'collapsed'}`}
                />
              </AccordionItemTrigger>
            </AccordionItemHeader>
            <AccordionItemPanel>{content}</AccordionItemPanel>
          </>
        )}
      </AccordionItem>
    ))}
  </AccordionRoot>
);

type ControlledAccordionHarnessProps = Omit<AccordionRootProps, 'children' | 'value' | 'onValueChange'> & {
  onValueChange: Mock<(value: string[]) => void>;
};

export const ControlledAccordionHarness = ({
  onValueChange,
  defaultValue,
  ...restProps
}: ControlledAccordionHarnessProps) => {
  const [value, setValue] = useState<string[]>(defaultValue ?? []);
  onValueChange.mockImplementation((next: string[]) => setValue(next));

  return (
    <AccordionRoot value={value} onValueChange={onValueChange} {...restProps}>
      {ACCORDION_TEST_ITEMS.map(({ value: itemValue, title, content }) => (
        <AccordionItem key={itemValue} value={itemValue}>
          <AccordionItemHeader as="h2">
            <AccordionItemTrigger>
              {title}
              <AccordionItemTriggerIndicator />
            </AccordionItemTrigger>
          </AccordionItemHeader>
          <AccordionItemPanel>{content}</AccordionItemPanel>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
