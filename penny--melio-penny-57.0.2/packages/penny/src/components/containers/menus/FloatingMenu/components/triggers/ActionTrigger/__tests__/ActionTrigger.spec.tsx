import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { FloatingMenuActionTrigger } from '../../../FloatingMenuActionTrigger';
import { type ActionTriggerProps } from '../ActionTrigger.types';

describe('FloatingMenuActionTrigger', () => {
  validateComponent<ActionTriggerProps>(FloatingMenuActionTrigger, 'FloatingMenuActionTrigger');

  it('has aria-haspopup attribute', () => {
    const { getByRole } = renderComponent(<FloatingMenuActionTrigger />);
    expect(getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
  });
});
