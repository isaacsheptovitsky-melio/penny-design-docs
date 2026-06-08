import { act } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Blanket } from '../Blanket';

validateComponent(Blanket, 'Blanket', { props: { isOpen: true } });

describe('blanket', () => {
  describe('not full screen', () => {
    it("shouldn't call on click callback function when clicked", () => {
      const onClick = vi.fn();
      const { getByTestId } = renderComponent(<Blanket isOpen data-testid="blanket" onClick={onClick} />);
      const blanket = getByTestId('blanket');

      act(() => blanket.click());

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('full screen', () => {
    it('should call on click callback function when clicked', () => {
      const onClick = vi.fn();
      const { getByTestId } = renderComponent(<Blanket isOpen data-testid="blanket" isFullScreen onClick={onClick} />);
      const blanket = getByTestId('blanket');

      act(() => blanket.click());

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
