import { describe, expect, it, vi } from 'vitest';

import { renderComponent } from '@/test-utils';

import { FileInput } from '../FileInput';
import { type FileType } from '../helpers/get-input-file-accept';

describe('FileInput', () => {
  it('renders hidden file input', () => {
    const { getByTestId } = renderComponent(<FileInput />);
    const input = getByTestId('upload-file-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('file');
  });

  it('applies aria attributes', () => {
    const { getByTestId } = renderComponent(
      <FileInput aria-label="Custom label" aria-describedby="desc-id" aria-required="true" name="file-input" />
    );
    const input = getByTestId('upload-file-input');
    expect(input).toHaveAttribute('aria-label', 'Custom label');
    expect(input).toHaveAttribute('aria-describedby', 'desc-id');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('name', 'file-input');
  });

  it('sets accept attribute based on acceptTypes', () => {
    const acceptTypes: FileType[] = ['png', 'pdf'];
    const { getByTestId } = renderComponent(<FileInput acceptTypes={acceptTypes} />);
    const input = getByTestId('upload-file-input');
    expect(input).toHaveAttribute('accept', 'image/png, application/pdf');
  });

  it('respects the disabled prop', () => {
    const { getByTestId } = renderComponent(<FileInput isDisabled />);
    const input = getByTestId('upload-file-input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('calls onChange when a file is selected', async () => {
    const onChange = vi.fn();
    const { getByTestId, user } = renderComponent(<FileInput onChange={onChange} />);
    const input = getByTestId('upload-file-input') as HTMLInputElement;

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.files?.[0]).toEqual(file);
  });
});
