import { createFileUploadTestKit } from '@melio/penny-testkit-rtl';
import { act, renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { useMelioForm } from '@/components/form/hooks';
import { renderComponent } from '@/test-utils/render.utils';

import { Form } from '../..';

describe('FileUpload', () => {
  it('doesn\'t submit the form when hitting "Replace"', async () => {
    const handleSubmit = vi.fn();
    const file = new File([''], 'filename', { type: 'image/png' });
    const testKit = createFileUploadTestKit({ dataTestId: 'form-field-field1' });

    const {
      result: {
        current: { registerField },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null }));

    renderComponent(
      <Form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Form.FileUpload {...registerField('field1')} value={file} aria-label="test" />
      </Form>
    );

    await act(async () => testKit.clickReplaceButton());
    expect(handleSubmit).not.toBeCalled();
  });
});
