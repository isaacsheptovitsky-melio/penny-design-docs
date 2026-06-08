import { createRadioGroupTestKit } from '@melio/penny-testkit-rtl';
import { waitFor } from '@testing-library/react';
import { type ChangeEventHandler } from 'react';
import { expect } from 'vitest';

import { testReadOnly } from '@/components/form/test/utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { type RadioOption } from '../..';
import { RadioGroup } from '../RadioGroup';
import { type RadioGroupProps } from '../RadioGroup.types';

validateComponent<RadioGroupProps>(RadioGroup, 'RadioGroup', {
  props: { options: [{ value: '1', mainLabelProps: { label: 'First' } }], name: 'radio-group' },
});

const options: RadioOption[] = [
  { value: '1', mainLabelProps: { label: 'First' } },
  { value: '2', mainLabelProps: { label: 'Second' } },
];

describe('RadioGroup', () => {
  it('isChecked true when radio with selected value', () => {
    const testKit = createRadioGroupTestKit();
    renderComponent(<RadioGroup value="2" options={options} />);

    expect(testKit.radio('2').getIsChecked()).toBe(true);
    expect(testKit.getSelectedOption()).toBe('2');
  });

  it('onChange fire with value on click on radio', async () => {
    const onChangeMock = vi.fn<ChangeEventHandler<HTMLInputElement>>();
    const testKit = createRadioGroupTestKit();
    renderComponent(<RadioGroup value="1" options={options} onChange={onChangeMock} />);

    await testKit.selectOption('2');

    expect(onChangeMock.mock.lastCall?.[0].target.value).toBe('2');
  });

  it('renders the options with ids', () => {
    const optionsWithIds: RadioOption[] = [
      { value: '1', mainLabelProps: { label: 'First' }, id: 'test 1' },
      { value: '2', mainLabelProps: { label: 'Second' }, id: 'test 2' },
    ];
    const { getByLabelText } = renderComponent(<RadioGroup options={optionsWithIds} />);

    expect(getByLabelText('First')).toHaveAttribute('id', 'test 1');
    expect(getByLabelText('Second')).toHaveAttribute('id', 'test 2');
  });

  it('the aria-describedby matches the provided descriptionProp id property.', () => {
    const { getByLabelText } = renderComponent(
      <RadioGroup
        options={options.map(
          (o) =>
            ({
              ...o,
              descriptionProps: {
                label: `${o.mainLabelProps?.label as string} Description`,
                id: `radio-option-${o.value}`,
              },
            }) as RadioOption
        )}
        value="2"
      />
    );

    expect(getByLabelText('First')).toHaveAccessibleDescription('First Description');
    expect(getByLabelText('Second')).toHaveAccessibleDescription('Second Description');
  });

  it('the radio option has unique aria-describedby when descriptionProp provided without id property.', () => {
    const { getByLabelText } = renderComponent(
      <RadioGroup
        options={options.map(
          (o) =>
            ({
              ...o,
              descriptionProps: { label: `${o.mainLabelProps?.label as string} Description` },
            }) as RadioOption
        )}
        value="2"
      />
    );

    expect(getByLabelText('First')).toHaveAccessibleDescription('First Description');
    expect(getByLabelText('Second')).toHaveAccessibleDescription('Second Description');
  });

  it('the radio option has aria-labelledby when provided.', () => {
    const { getByLabelText } = renderComponent(
      <RadioGroup
        options={options.map(
          (o) =>
            ({
              ...o,
              ariaLabelledby: 'test-aria-labelledby',
            }) as RadioOption
        )}
        value="2"
      />
    );

    expect(getByLabelText('First')).toHaveAttribute('aria-labelledby', expect.stringMatching(/^test-aria-labelledby/));
  });

  describe('AutoFocus', () => {
    it('focus on first radio when autofocus true and no checked radio', async () => {
      const testKit = createRadioGroupTestKit();
      renderComponent(<RadioGroup options={options} autoFocus />);

      await waitFor(() => expect(testKit.radio('1').getInputElement()).toHaveFocus());
    });

    it('not focus when autofocus false', async () => {
      const testKit = createRadioGroupTestKit();
      renderComponent(<RadioGroup options={options} />);

      await waitFor(() => expect(testKit.radio('1').getInputElement()).not.toHaveFocus());
    });

    it('autofocus on first radio when autofocus true and first radio checked', async () => {
      const testKit = createRadioGroupTestKit();
      renderComponent(<RadioGroup options={options} autoFocus value="1" />);

      await waitFor(() => expect(testKit.radio('1').getInputElement()).toHaveFocus());
    });

    it('autofocus on second radio when autofocus true and second radio checked', async () => {
      const testKit = createRadioGroupTestKit();
      renderComponent(<RadioGroup options={options} autoFocus value="2" />);

      await waitFor(() => expect(testKit.radio('2').getInputElement()).toHaveFocus());
    });
  });

  testReadOnly({
    Comp: RadioGroup,
    compProps: { options: [{ value: '1', mainLabelProps: { label: 'First' } }], name: 'radio-group' },
    options: { customTestIdToGet: 'radio-group-1-input', attributeToGet: 'data-readonly' },
  });
});
