import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { HiddenOptionInput } from '@/components/selectionAndInputs/HiddenOptionInput/HiddenOptionInput';

import { Chip } from '../../Chip';

const options = ['Filter 1', 'Filter 2', 'Filter 3'];

export const SingleSelectionExample = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOnClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Storybook.Container width="fit-content">
      <Group role="radiogroup" spacing="s">
        {options.map((option) => (
          <HiddenOptionInput key={option} selected={selectedOption === option} onChange={() => handleOnClick(option)}>
            <Chip as="div" selected={selectedOption === option} label={option} onClick={() => handleOnClick(option)} />
          </HiddenOptionInput>
        ))}
      </Group>
    </Storybook.Container>
  );
};

export const MultipleSelectionExample = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOnClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prev) => prev.filter((item) => item !== option));
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  return (
    <Storybook.Container width="fit-content">
      <Group role="group" spacing="s">
        {options.map((option) => (
          <HiddenOptionInput
            key={option}
            type="checkbox"
            selected={selectedOptions.includes(option)}
            onChange={() => handleOnClick(option)}
          >
            <Chip
              as="div"
              selected={selectedOptions.includes(option)}
              label={option}
              onClick={() => handleOnClick(option)}
            />
          </HiddenOptionInput>
        ))}
      </Group>
    </Storybook.Container>
  );
};
