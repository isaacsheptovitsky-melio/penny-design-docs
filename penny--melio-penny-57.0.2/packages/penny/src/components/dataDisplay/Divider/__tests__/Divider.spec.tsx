import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Divider } from '../Divider';
import type { DividerProps } from '../Divider.types';

validateComponent<DividerProps>(Divider, 'Divider');

describe('Divider', () => {
  it('render divider as dividerProps is set', () => {
    const { getByRole } = renderComponent(<Divider as="li" role="listitem" data-testid="divider-test" />);

    expect(getByRole('listitem').tagName).toBe('LI');
    expect(getByRole('listitem')).toBeInTheDocument();
  });
});
