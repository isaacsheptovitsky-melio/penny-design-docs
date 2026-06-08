import { expect } from 'vitest';

import { renderComponent } from '../../../../test-utils';
import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { _Form, _Form as Form } from '../_Form';

validateComponent(Form, '_Form');

describe('Form', () => {
  it('has readonly attribute when in read-only mode', () => {
    const { getByTestId } = renderComponent(<_Form data-testid="form" isReadOnly />);

    expect(getByTestId('form')).toHaveAttribute('data-readonly', 'true');
  });

  it('does not have readonly attribute when in edit mode', () => {
    const { getByTestId } = renderComponent(<_Form data-testid="form" />);

    expect(getByTestId('form')).not.toHaveAttribute('data-readonly');
  });
});
