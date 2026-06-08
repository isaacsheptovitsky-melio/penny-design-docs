import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { AccordionItem } from './AccordionItem';
import { AccordionItemHeader } from './AccordionItemHeader';
import { AccordionItemPanel } from './AccordionItemPanel';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemTriggerIndicator } from './AccordionItemTriggerIndicator';
import { AccordionRoot } from './AccordionRoot';

const items = [
  {
    value: '1',
    title: 'Section title 1',
    content: <Storybook.ContentPlaceholder label="Section content 1" />,
  },
  {
    value: '2',
    title: 'Section title 2',
    content: <Storybook.ContentPlaceholder label="Section content 2" />,
  },
  {
    value: '3',
    title: 'Section title 3',
    content: <Storybook.ContentPlaceholder label="Section content 3" />,
  },
];
const meta: Meta<typeof AccordionRoot> = {
  title: 'Chromatic/Accordion',
  component: AccordionRoot,
};
export default meta;

export const LongTitle: StoryObj<typeof AccordionRoot> = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    const textualItems = items.map((item) => ({
      ...item,
      title: `${item.title} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat`,
    }));

    return (
      <AccordionRoot value={value} onValueChange={setValue}>
        {textualItems.map(({ value, title, content }) => (
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
  },
};

export const ExpandedItem: StoryObj<typeof AccordionRoot> = {
  render: () => {
    const [value, setValue] = useState<string[]>(['1']);

    const textualItems = items.map((item) => ({
      ...item,
      content: (
        <Storybook.ContentPlaceholder
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat"
        />
      ),
    }));

    return (
      <AccordionRoot value={value} onValueChange={setValue}>
        {textualItems.map(({ value, title, content }) => (
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
  },
};
