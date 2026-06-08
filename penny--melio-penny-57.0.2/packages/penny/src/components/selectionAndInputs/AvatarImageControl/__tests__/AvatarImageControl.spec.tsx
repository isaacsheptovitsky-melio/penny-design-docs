import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { COMPONENTS_DEFAULT_TEST_IDS, renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { AvatarImageControl } from '../AvatarImageControl';

validateComponent(AvatarImageControl, 'AvatarImageControl', {
  defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.AVATAR_IMAGE_CONTROL,
});

describe('Component - Avatar Image Control', () => {
  const props = {
    viewModePlaceholder: 'some placeholder',
    deleteButtonText: 'delete photo',
  };

  it('does not show loader in read-only state', () => {
    const { queryByTestId } = renderComponent(<AvatarImageControl {...props} isLoading isViewMode />);
    expect(queryByTestId('avatar-image-control-loader')).not.toBeInTheDocument();
  });

  it('invokes `onChange` when selecting an image file', async () => {
    const handleChange = vi.fn();
    const mockCreateObjectURL = faker.datatype.string();
    window.URL.createObjectURL = () => mockCreateObjectURL;

    const file = new File([''], 'filename', { type: 'image/png' });

    const { getByTestId, user } = renderComponent(<AvatarImageControl {...props} onChange={handleChange} />);

    await user.upload(getByTestId('avatar-image-control-input'), file);

    expect(handleChange).toHaveBeenCalledWith(file);
  });

  it('invokes `onChange` with null when deleting a file', async () => {
    const handleChange = vi.fn();
    const placeholder = 'file upload placeholder';
    const fileUrl = faker.datatype.string();

    const { getByTestId, user } = renderComponent(
      <AvatarImageControl {...props} viewModePlaceholder={placeholder} onChange={handleChange} value={fileUrl} />
    );

    await user.click(getByTestId(`avatar-image-control-delete-button`));

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('does not invoke onChange when value changes', () => {
    const handleChange = vi.fn();

    const fileUrl1 = faker.datatype.string();
    const fileUrl2 = faker.datatype.string();

    const { rerender } = renderComponent(<AvatarImageControl {...props} onChange={handleChange} value={fileUrl1} />);

    expect(handleChange).not.toHaveBeenCalled();
    // this is necessary in order to assert the value change does not invoke onChange within useUpdateEffect
    rerender(<AvatarImageControl {...props} onChange={handleChange} value={fileUrl2} />);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('triggers file picker when Enter key is pressed', async () => {
    const { getByTestId, user } = renderComponent(<AvatarImageControl {...props} />);
    const avatar = getByTestId('avatar-image-control-add-button');
    expect(avatar).toBeInTheDocument();

    const input = getByTestId('avatar-image-control-input');
    const clickSpy = vi.spyOn(input, 'click');

    avatar.focus();
    await user.keyboard('{Enter}');

    expect(clickSpy).toHaveBeenCalled();
  });

  it('triggers file picker when Space key is pressed', async () => {
    const { getByTestId, user } = renderComponent(<AvatarImageControl {...props} />);
    const avatar = getByTestId('avatar-image-control-add-button');
    const input = getByTestId('avatar-image-control-input');
    const clickSpy = vi.spyOn(input, 'click');

    avatar.focus();
    await user.keyboard(' ');

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should be focusable', async () => {
    const { getByTestId } = renderComponent(<AvatarImageControl {...props} />);
    const avatar = getByTestId('avatar-image-control-add-button');

    await userEvent.tab();

    expect(avatar).toHaveFocus();
  });

  describe('when in view mode', () => {
    it('should not be focusable', async () => {
      const { getByTestId } = renderComponent(<AvatarImageControl {...props} isViewMode />);
      const avatar = getByTestId('avatar-image-control-add-button');

      await userEvent.tab();

      expect(avatar).not.toHaveFocus();
    });

    it('should not have aria-label', () => {
      const { getByTestId } = renderComponent(<AvatarImageControl {...props} isViewMode />);
      const avatar = getByTestId('avatar-image-control-add-button');

      expect(avatar).not.toHaveAccessibleName();
    });

    it('does not trigger file picker when in view mode', async () => {
      const { getByTestId, user } = renderComponent(<AvatarImageControl {...props} isViewMode />);
      const input = getByTestId('avatar-image-control-input') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      input.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('when loading', () => {
    it('should not be focusable', async () => {
      const { getByTestId } = renderComponent(<AvatarImageControl {...props} isLoading />);
      const avatar = getByTestId('avatar-image-control-add-button');

      await userEvent.tab();

      expect(avatar).not.toHaveFocus();
    });

    it('should not have aria-label', () => {
      const { getByTestId } = renderComponent(<AvatarImageControl {...props} isLoading />);
      const avatar = getByTestId('avatar-image-control-add-button');

      expect(avatar).not.toHaveAccessibleName();
    });

    it('does not trigger file picker when loading', async () => {
      const { getByTestId, user } = renderComponent(<AvatarImageControl {...props} isLoading />);
      const input = getByTestId('avatar-image-control-input') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      input.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});
