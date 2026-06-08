import { createRadioTestKit } from '@melio/penny-testkit-rtl';
import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { RadioGroup } from '../../RadioGroup';
import { Radio, type RadioProps } from '..';

describe('Radio', () => {
  validateComponent<RadioProps>(Radio, 'Radio', { props: { mainLabelProps: { label: 'my label' }, value: 'value' } });

  it('has aria-label when mainLabelProps prop', () => {
    const label = 'some label';
    const testKit = createRadioTestKit({ dataTestId: 'label-1' });
    renderComponent(<Radio value="1" mainLabelProps={{ label }} data-testid="label-1" />);

    expect(testKit.getInputElement()).toHaveAttribute('aria-label', label);
  });

  it('has aria-label when label prop', () => {
    const label = 'some label';
    const testKit = createRadioTestKit({ dataTestId: 'label-1' });
    renderComponent(<Radio value="1" label={label} ariaLabel={label} data-testid="label-1" />);

    expect(testKit.getInputElement()).toHaveAttribute('aria-label', label);
  });

  describe('when disabled', () => {
    it('has aria-disabled', () => {
      const label = 'some label';
      const testKit = createRadioTestKit({ dataTestId: 'label-1' });
      renderComponent(<Radio value="1" label={label} ariaLabel={label} data-testid="label-1" disabled />);

      expect(testKit.getIsDisabled()).toBe(true);
    });
  });

  it('has aria-disabled when disabled prop', () => {
    const disabledOptionLabel = 'Disabled main label';
    const { getByRole } = renderComponent(
      <RadioGroup
        options={[
          {
            mainLabelProps: { label: disabledOptionLabel },
            value: 'disabled',
            disabled: true,
          },
        ]}
      />
    );

    expect(getByRole('radio', { name: /disabled main label/i })).toHaveAttribute('aria-disabled', 'true');
  });
});
