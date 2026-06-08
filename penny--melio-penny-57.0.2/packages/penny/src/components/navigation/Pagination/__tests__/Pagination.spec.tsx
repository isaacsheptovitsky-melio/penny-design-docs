import { screen } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Pagination, type PaginationProps } from '../Pagination';

describe('Pagination', () => {
  validateComponent<PaginationProps>(Pagination, 'Pagination', {
    props: { currentPage: 1, totalItems: 143, pageSize: 50, onPageChange: vi.fn() },
  });

  const handleOnPageChange = vi.fn();
  const totalItems = 143;
  const pageSize = 50;

  describe('arrow icons behavior', () => {
    it('on 1st page Prev arrow is disabled', () => {
      renderComponent(
        <Pagination currentPage={1} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('chevron-left')).toBeDisabled();
    });

    it('on 1st page Next arrow is enabled', () => {
      renderComponent(
        <Pagination currentPage={1} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('chevron-right')).toBeEnabled();
    });

    it('on middle page Prev arrow is enabled', () => {
      renderComponent(
        <Pagination currentPage={2} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('chevron-left')).toBeEnabled();
    });

    it('on middle page Next arrow is enabled', () => {
      renderComponent(
        <Pagination currentPage={2} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('chevron-right')).toBeEnabled();
    });

    it('on last page Prev arrow is enabled', () => {
      renderComponent(
        <Pagination currentPage={3} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('chevron-left')).toBeEnabled();
    });

    it('on last page Next arrow is disabled', () => {
      renderComponent(
        <Pagination currentPage={3} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('chevron-right')).toBeDisabled();
    });
  });

  describe('index range', () => {
    it('index range on 1st page', () => {
      renderComponent(
        <Pagination currentPage={1} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('pagination-text')).toHaveTextContent('1-50 of 143');
    });

    it('index range on middle page', () => {
      renderComponent(
        <Pagination currentPage={2} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('pagination-text')).toHaveTextContent('51-100 of 143');
    });

    it('index range on last page', () => {
      renderComponent(
        <Pagination currentPage={3} onPageChange={handleOnPageChange} totalItems={totalItems} pageSize={pageSize} />
      );

      expect(screen.getByTestId('pagination-text')).toHaveTextContent('101-143 of 143');
    });
  });

  describe('onPageChange invokation', () => {
    it('invokes the onPageChange handler when clicking next with next page number', async () => {
      const handleOnPageChange = vi.fn();
      const { user } = renderComponent(
        <Pagination currentPage={1} onPageChange={handleOnPageChange} totalItems={143} pageSize={50} />
      );

      await user.click(screen.getByTestId('chevron-right'));

      expect(handleOnPageChange).toHaveBeenCalledWith(2);
    });

    it('invokes the onPageChange handler when clicking prev with prev page number', async () => {
      const handleOnPageChange = vi.fn();
      const { user } = renderComponent(
        <Pagination currentPage={2} onPageChange={handleOnPageChange} totalItems={143} pageSize={50} />
      );

      await user.click(screen.getByTestId('chevron-left'));

      expect(handleOnPageChange).toHaveBeenCalledWith(1);
    });

    it('change aria labels on chevron buttons', () => {
      const handleOnPageChange = vi.fn();
      const { getByLabelText } = renderComponent(
        <Pagination
          currentPage={2}
          onPageChange={handleOnPageChange}
          totalItems={143}
          pageSize={50}
          ariaLabels={{ chevronLeftLabel: 'left-label', chevronRightLabel: 'right-label' }}
        />
      );

      expect(getByLabelText('left-label')).toBeInTheDocument();
      expect(getByLabelText('right-label')).toBeInTheDocument();
    });
  });
});
