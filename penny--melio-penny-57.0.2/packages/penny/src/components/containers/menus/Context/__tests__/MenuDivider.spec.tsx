import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { MenuDivider } from '../components';

describe('MenuDivider', () => {
  validateComponent(MenuDivider, 'MenuDivider');

  describe('Accessibility', () => {
    it('should render the divider with the correct HTML attributes', () => {
      const { getByTestId } = renderComponent(<MenuDivider data-testid="divider" />);

      expect(getByTestId('divider')).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
