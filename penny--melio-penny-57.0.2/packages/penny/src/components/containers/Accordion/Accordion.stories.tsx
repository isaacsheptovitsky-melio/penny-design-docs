import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Checkbox } from '@/components/selectionAndInputs/Checkbox';
import { RadioGroup } from '@/components/selectionAndInputs/RadioGroup';
import { Switch } from '@/components/selectionAndInputs/Switch';

import { AccordionItem } from './AccordionItem';
import { AccordionItemHeader } from './AccordionItemHeader';
import { AccordionItemPanel } from './AccordionItemPanel';
import { AccordionItemTrigger } from './AccordionItemTrigger';
import { AccordionItemTriggerIndicator } from './AccordionItemTriggerIndicator';
import { AccordionRoot } from './AccordionRoot';

const childrenPropType = `
type AccordionContextValue = {
  value: string | string[];
  setValue: (value: string | string[]) => void;
  accordionItemsRef: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  isMultiple: boolean;
  keepMounted: boolean;
};`;

const meta: Meta<typeof AccordionRoot> = {
  title: 'Containers/Accordion [composable]',
  component: AccordionRoot,
  subcomponents: {
    AccordionItem,
    AccordionItemHeader,
    AccordionItemTrigger,
    AccordionItemTriggerIndicator,
    AccordionItemPanel,
  },
  argTypes: {
    children: {
      table: {
        type: {
          summary: `ReactNode | ((props: AccordionContextValue) => ReactNode)`,
          detail: childrenPropType,
        },
      },
    },
  },
  args: {
    defaultValue: undefined,
    value: undefined,
    onValueChange: undefined,
    keepMounted: false,
    isMultiple: false,
  },
};
export default meta;

export const Main: StoryObj<typeof AccordionRoot> = {
  render: (args) => (
    <AccordionRoot {...args} defaultValue={['1']}>
      <AccordionItem value="1">
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            Section title 1
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>

        <AccordionItemPanel>
          <Storybook.ContentPlaceholder label="Section content 1" />
        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem value="2">
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            Section title 2
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>

        <AccordionItemPanel>
          <Storybook.ContentPlaceholder label="Section content 2" />
        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem value="3">
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            Section title 3
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>

        <AccordionItemPanel>
          <Storybook.ContentPlaceholder label="Section content 3" />
        </AccordionItemPanel>
      </AccordionItem>
    </AccordionRoot>
  ),
};

export const Multiple: StoryObj<typeof AccordionRoot> = {
  render: () => (
    <AccordionRoot isMultiple>
      <AccordionItem>
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            Section title 1
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>

        <AccordionItemPanel>
          <Storybook.ContentPlaceholder label="Section content 1" />
        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            Section title 2
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>

        <AccordionItemPanel>
          <Storybook.ContentPlaceholder label="Section content 2" />
        </AccordionItemPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionItemHeader as="h2">
          <AccordionItemTrigger>
            Section title 3
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
        </AccordionItemHeader>

        <AccordionItemPanel>
          <Storybook.ContentPlaceholder label="Section content 3" />
        </AccordionItemPanel>
      </AccordionItem>
    </AccordionRoot>
  ),
};

export const Controlled: StoryObj<typeof AccordionRoot> = {
  render: () => {
    const [radioValue, setRadioValue] = useState<string[]>([]);
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
    const [isMultiple, setIsMultiple] = useState(false);

    const options = [
      { value: '1', label: 'option Section 1' },
      { value: '2', label: 'option Section 2' },
      { value: '3', label: 'option Section 3' },
    ];

    return (
      <>
        <Switch
          label="Multiple"
          value={isMultiple}
          onChange={(value) => {
            setIsMultiple(value);
            setCheckboxValue([]);
            setRadioValue([]);
          }}
        />
        <Storybook.Row
          justifyContent="flex-start"
          items={
            isMultiple
              ? [
                  {
                    label: 'Expanded Section:',
                    component: (
                      <Group>
                        {options.map(({ value, label }) => (
                          <Checkbox
                            key={value}
                            isChecked={checkboxValue.includes(value)}
                            onChange={(v) => {
                              if (v) {
                                setCheckboxValue([...checkboxValue, value]);
                              } else {
                                setCheckboxValue(checkboxValue.filter((val) => val !== value));
                              }
                            }}
                            label={label}
                          />
                        ))}
                      </Group>
                    ),
                  },
                ]
              : [
                  {
                    label: 'Expanded Section:',
                    component: (
                      <RadioGroup
                        options={options.map(({ value, label }) => ({
                          mainLabelProps: {
                            label,
                          },
                          value,
                        }))}
                        value={radioValue[0]}
                        onChange={(event) => setRadioValue([event.target.value])}
                      />
                    ),
                  },
                ]
          }
        />
        <br />
        <AccordionRoot
          value={isMultiple ? checkboxValue : radioValue}
          onValueChange={(value) => (isMultiple ? setCheckboxValue(value) : setRadioValue(value))}
          isMultiple={isMultiple}
        >
          <AccordionItem value="1">
            <AccordionItemHeader as="h2">
              <AccordionItemTrigger>
                Section title 1
                <AccordionItemTriggerIndicator />
              </AccordionItemTrigger>
            </AccordionItemHeader>

            <AccordionItemPanel>
              <Storybook.ContentPlaceholder label="Section content 1" />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionItemHeader as="h2">
              <AccordionItemTrigger>
                Section title 2
                <AccordionItemTriggerIndicator />
              </AccordionItemTrigger>
            </AccordionItemHeader>

            <AccordionItemPanel>
              <Storybook.ContentPlaceholder label="Section content 2" />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem value="3">
            <AccordionItemHeader as="h2">
              <AccordionItemTrigger>
                Section title 3
                <AccordionItemTriggerIndicator />
              </AccordionItemTrigger>
            </AccordionItemHeader>

            <AccordionItemPanel>
              <Storybook.ContentPlaceholder label="Section content 3" />
            </AccordionItemPanel>
          </AccordionItem>
        </AccordionRoot>
      </>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
