import { Box, type BoxProps } from '@chakra-ui/react';
import { render, renderHook, waitFor } from '@testing-library/react';
import { createRef, forwardRef, type Ref } from 'react';
import { expect } from 'vitest';

import { useMelioForm } from '../../../hooks';
import { type FormTextFieldProps } from '..';
import { createFormFieldInput } from '../inputs/utils';

type Props = BoxProps & FormTextFieldProps;
const MyComp = forwardRef<typeof Box, Props>(
  ({ isDisabled, isReadOnly, isViewMode, isInvalid, ...props }: Props, ref) => (
    <Box {...props} ref={ref as Ref<HTMLDivElement>} />
  )
);

const MyFormField = createFormFieldInput(MyComp);

describe('createFormFieldInput', () => {
  it('forwards the ref', async () => {
    const {
      result: {
        current: { registerField },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null }));

    const ref = createRef();

    render(<MyFormField {...registerField('myFormField')} ref={ref as Ref<typeof Box>} aria-label="test" />);

    await waitFor(() => expect(ref.current).toBeTruthy());
  });

  it("renders the field's autocomplete attribute with a default value of 'off'", () => {
    const {
      result: {
        current: { registerField },
      },
    } = renderHook(() => useMelioForm({ onSubmit: () => null }));

    const { getByTestId } = render(<MyFormField {...registerField('myFormField')} aria-label="test" />);

    expect(getByTestId('form-input-myFormField')).toHaveAttribute('autocomplete', 'off');
  });
});
