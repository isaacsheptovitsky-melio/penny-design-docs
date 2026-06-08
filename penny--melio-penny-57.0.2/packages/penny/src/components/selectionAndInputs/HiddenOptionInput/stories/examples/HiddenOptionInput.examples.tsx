import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';

import { HiddenOptionInput } from '../..';

const options = ['Option 1', 'Option 2', 'Option 3'];

export const SingleSelectionExample = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Group role="radiogroup" spacing="l">
      {options.map((option) => (
        <HiddenOptionInput key={option} selected={selectedOption === option} onChange={() => handleChange(option)}>
          <Storybook.InteractiveContentPlaceholder selected={selectedOption === option} label={option} />
        </HiddenOptionInput>
      ))}
    </Group>
  );
};

export const MultiSelectionExample = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prev) => prev.filter((item) => item !== option));
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  return (
    <Group role="group" spacing="l">
      {options.map((option) => (
        <HiddenOptionInput
          key={option}
          type="checkbox"
          selected={selectedOptions.includes(option)}
          onChange={() => handleChange(option)}
        >
          <Storybook.InteractiveContentPlaceholder selected={selectedOptions.includes(option)} label={option} />
        </HiddenOptionInput>
      ))}
    </Group>
  );
};
