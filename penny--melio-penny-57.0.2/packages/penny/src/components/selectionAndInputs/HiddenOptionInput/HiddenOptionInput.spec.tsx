import { describe } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { HIDDEN_OPTION_INPUT_DEFAULT_TEST_ID, HiddenOptionInput } from './HiddenOptionInput';
import { type HiddenOptionInputProps } from './HiddenOptionInput.types';

describe('HiddenOptionInput', () => {
  validateComponent<HiddenOptionInputProps>(HiddenOptionInput, 'HiddenOptionInput', {
    defaultDataTestId: HIDDEN_OPTION_INPUT_DEFAULT_TEST_ID,
    componentParts: ['input', 'label'],
    props: {
      children: <div>Child Component</div>,
      selected: false,
    },
  });
});
