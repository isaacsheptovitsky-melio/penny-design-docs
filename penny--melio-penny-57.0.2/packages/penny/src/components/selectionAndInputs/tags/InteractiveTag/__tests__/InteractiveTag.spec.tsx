import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { InteractiveTag, type InteractiveTagProps } from '..';

describe('InteractiveTag', () => {
  validateComponent<InteractiveTagProps>(InteractiveTag, 'InteractiveTag', {
    props: { children: 'label', removeButtonProps: { onClick: vi.fn() } },
    defaultDataTestId: 'interactive-tag',
    componentParts: ['content', 'remove-button'],
  });

  it('when onClick is not provided, the tag renders as div by default', () => {
    const { getByTestId } = renderComponent(<InteractiveTag>Label</InteractiveTag>);
    expect(getByTestId('interactive-tag').tagName).toBe('DIV');
  });

  it('when onClick provided, the tag renders as button', () => {
    const { getByTestId } = renderComponent(<InteractiveTag onClick={vi.fn()}>Label</InteractiveTag>);
    expect(getByTestId('interactive-tag').tagName).toBe('BUTTON');
  });

  describe('clickable and removable behavior', () => {
    it('renders as div and includes two buttons inside', () => {
      const { getAllByRole, getByTestId } = renderComponent(
        <InteractiveTag onClick={vi.fn()} removeButtonProps={{ onClick: vi.fn() }}>
          Label
        </InteractiveTag>
      );
      expect(getAllByRole('button')).toHaveLength(2);
      expect(getByTestId('interactive-tag-action-area')).toHaveAccessibleName('Label');
      expect(getByTestId('interactive-tag-remove-button')).toHaveAccessibleName('Remove Label tag');
    });

    it('ensures the first focusable element is the action area and the second is the remove button', async () => {
      const { getByTestId, getByRole, user } = renderComponent(
        <InteractiveTag onClick={vi.fn()} removeButtonProps={{ onClick: vi.fn() }}>
          Label
        </InteractiveTag>
      );
      expect(document.activeElement).toBe(document.body);
      await user.tab();

      expect(getByTestId('interactive-tag-inner-content')).toHaveAttribute('data-focus-visible', 'true');
      expect(getByRole('button', { name: 'Label' })).toHaveFocus();
      expect(getByRole('button', { name: 'Remove Label tag' })).not.toHaveFocus();
      await user.tab();
      expect(getByTestId('interactive-tag-inner-content')).not.toHaveAttribute('data-focus-visible');
      expect(getByRole('button', { name: 'Label' })).not.toHaveFocus();
      expect(getByRole('button', { name: 'Remove Label tag' })).toHaveFocus();
      await user.tab();
      expect(document.activeElement).toBe(document.body);
    });

    it('calls onClick when clicking each interactive element', async () => {
      const tagClick = vi.fn();
      const removeClick = vi.fn();
      const { getByRole, user } = renderComponent(
        <InteractiveTag onClick={tagClick} removeButtonProps={{ onClick: removeClick }}>
          Label
        </InteractiveTag>
      );
      await user.click(getByRole('button', { name: 'Label' }));
      await user.click(getByRole('button', { name: 'Remove Label tag' }));
      expect(tagClick).toHaveBeenCalledOnce();
      expect(removeClick).toHaveBeenCalledOnce();
    });

    it('calls onClick when pressing Enter on each interactive element', async () => {
      const tagClick = vi.fn();
      const removeClick = vi.fn();
      const { user } = renderComponent(
        <InteractiveTag onClick={tagClick} removeButtonProps={{ onClick: removeClick }}>
          Label
        </InteractiveTag>
      );
      await user.tab();
      await user.keyboard('{Enter}');
      await user.tab();
      await user.keyboard('{Enter}');
      expect(tagClick).toHaveBeenCalledOnce();
      expect(removeClick).toHaveBeenCalledOnce();
    });

    it('calls onClick when pressing Space on each interactive element', async () => {
      const tagClick = vi.fn();
      const removeClick = vi.fn();
      const { user } = renderComponent(
        <InteractiveTag onClick={tagClick} removeButtonProps={{ onClick: removeClick }}>
          Label
        </InteractiveTag>
      );
      await user.tab();
      await user.keyboard('[Space]');
      await user.tab();
      await user.keyboard('[Space]');
      expect(tagClick).toHaveBeenCalledOnce();
      expect(removeClick).toHaveBeenCalledOnce();
    });

    describe('disabled state', () => {
      it('does not trigger onClick when clicking each interactive element', async () => {
        const tagClick = vi.fn();
        const removeClick = vi.fn();
        const { getByRole, user } = renderComponent(
          <InteractiveTag onClick={tagClick} removeButtonProps={{ onClick: removeClick }} disabled>
            Label
          </InteractiveTag>
        );
        await user.click(getByRole('button', { name: 'Label' }));
        await user.click(getByRole('button', { name: 'Remove Label tag' }));
        expect(tagClick).not.toBeCalled();
        expect(removeClick).not.toBeCalled();
      });

      it('does not trigger onClick when pressing Enter on each interactive element', async () => {
        const tagClick = vi.fn();
        const removeClick = vi.fn();
        const { getByRole, user } = renderComponent(
          <InteractiveTag onClick={tagClick} removeButtonProps={{ onClick: removeClick }} disabled>
            Label
          </InteractiveTag>
        );
        await user.tab();
        expect(getByRole('button', { name: 'Label' })).not.toHaveFocus();
        await user.keyboard('{Enter}');
        await user.tab();
        expect(getByRole('button', { name: 'Remove Label tag' })).not.toHaveFocus();
        await user.keyboard('{Enter}');
        expect(tagClick).not.toBeCalled();
        expect(removeClick).not.toBeCalled();
      });

      it('does not trigger onClick when pressing Space on each interactive element', async () => {
        const tagClick = vi.fn();
        const removeClick = vi.fn();
        const { getByRole, user } = renderComponent(
          <InteractiveTag onClick={tagClick} removeButtonProps={{ onClick: removeClick }} disabled>
            Label
          </InteractiveTag>
        );
        await user.tab();
        expect(getByRole('button', { name: 'Label' })).not.toHaveFocus();
        await user.keyboard('[Space]');
        await user.keyboard(' ');
        expect(getByRole('button', { name: 'Remove Label tag' })).not.toHaveFocus();
        await user.keyboard('[Space]');
        expect(tagClick).not.toBeCalled();
        expect(removeClick).not.toBeCalled();
      });
    });
  });
});
