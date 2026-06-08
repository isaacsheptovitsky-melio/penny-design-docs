import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { _FormField as FormField, type _FormFieldProps as FormFieldProps } from '../_FormField';

validateComponent<FormFieldProps>(FormField, '_FormField', { props: { labelProps: { label: 'Label' } } });

describe('_FormField', () => {
  it("renders the field's label as a label element by default", () => {
    const { getByText } = renderComponent(<FormField labelProps={{ label: 'Test Label' }} />);

    const labelText = getByText('Test Label');
    // Find the closest label element
    expect(labelText.closest('label')).toBeInTheDocument();
  });

  it("does not render the field's label as label element if the field is in view mode", () => {
    const { getByText } = renderComponent(<FormField labelProps={{ label: 'Test Label' }} isViewMode />);

    const labelText = getByText('Test Label');
    expect(labelText).toHaveAttribute('data-view-mode', 'true');
    expect(labelText.closest('label')).not.toBeInTheDocument();
  });
});
