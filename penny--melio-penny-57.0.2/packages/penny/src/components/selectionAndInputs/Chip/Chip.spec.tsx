import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Chip, DEFAULT_CHIP_TEST_ID } from './Chip';
import { type ChipProps } from './Chip.types';

const props = { label: 'chip label', defaultDataTestId: DEFAULT_CHIP_TEST_ID };

describe('Chip', () => {
  validateComponent<ChipProps>(Chip, 'Chip', { props, defaultDataTestId: DEFAULT_CHIP_TEST_ID });

  it('invokes the onClick handler when clicking the button', async () => {
    const handleClick = vi.fn();
    const { getByTestId, user } = renderComponent(<Chip onClick={handleClick} {...props} />);

    await user.click(getByTestId(DEFAULT_CHIP_TEST_ID));

    expect(handleClick).toHaveBeenCalled();
  });

  it('invokes the onClick handler when focusing the button and pressing Enter', async () => {
    const handleClick = vi.fn();
    const { getByTestId, user } = renderComponent(<Chip onClick={handleClick} {...props} />);

    await user.tab();

    expect(getByTestId(DEFAULT_CHIP_TEST_ID)).toHaveFocus();

    await user.keyboard('[Enter]');

    expect(handleClick).toHaveBeenCalled();
  });

  describe('when rest state', () => {
    it("shouldn't be selected", () => {
      const { getByTestId } = renderComponent(<Chip label="label" />);

      expect(getByTestId(DEFAULT_CHIP_TEST_ID).getAttribute('data-selected')).toBeNull();
    });

    it("shouldn't be hovered", () => {
      const { getByTestId } = renderComponent(<Chip label="label" />);

      expect(getByTestId(DEFAULT_CHIP_TEST_ID).getAttribute('data-hover')).toBeNull();
    });

    it("shouldn't be actived", () => {
      const { getByTestId } = renderComponent(<Chip label="label" />);

      expect(getByTestId(DEFAULT_CHIP_TEST_ID).getAttribute('data-active')).toBeNull();
    });

    it("shouldn't be focused", () => {
      const { getByTestId } = renderComponent(<Chip label="label" />);

      expect(getByTestId(DEFAULT_CHIP_TEST_ID)).not.toHaveFocus();
    });
  });

  describe('when is selected', () => {
    it('should show "data-selected" attribute', () => {
      const { getByTestId } = renderComponent(<Chip label="label" selected />);

      expect(getByTestId(DEFAULT_CHIP_TEST_ID).getAttribute('data-selected')).toBe('true');
    });
  });

  describe('when press tab key', () => {
    it('should be focused', async () => {
      const { getByTestId, user } = renderComponent(<Chip label="label" />);

      await user.tab();

      expect(getByTestId(DEFAULT_CHIP_TEST_ID)).toHaveFocus();
    });
  });
});
