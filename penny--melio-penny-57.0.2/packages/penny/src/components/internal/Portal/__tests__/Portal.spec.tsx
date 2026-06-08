import { expect } from 'vitest';

import { renderComponent } from '../../../../test-utils';
import { Portal } from '../Portal';

describe('Portal', () => {
  it('renders content properly', () => {
    const { getByText } = renderComponent(<Portal>Hello World!</Portal>);
    expect(getByText(/hello world/i)).toBeInTheDocument();
  });
});
