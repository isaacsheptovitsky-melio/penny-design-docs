import { createCheckboxTestKit } from '@melio/penny-testkit-rtl';
import * as pennyUtils from '@melio/penny-utils';
import { act, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { type CheckboxProps } from '../..';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  const testKit = createCheckboxTestKit();

  validateComponent<CheckboxProps>(Checkbox, 'Checkbox', {
    props: { isChecked: true, onChange: vi.fn(), label: 'Checkbox label' },
    defaultDataTestId: 'checkbox',
    componentParts: ['input'],
    skipDataTestId: { skipOverrideTestId: true },
  });

  testReadOnly({ Comp: Checkbox, options: { customTestIdToGet: 'checkbox-input', attributeToGet: 'aria-readonly' } });

  it('is checked when isChecked is true', () => {
    renderComponent(<Checkbox isChecked onChange={vi.fn()} />);

    expect(testKit.getIsChecked()).toBe(true);
    expect(testKit.getInputElement()).toHaveAttribute('aria-checked', 'true');
  });

  it('is unchecked when isChecked is false', () => {
    renderComponent(<Checkbox isChecked={false} onChange={vi.fn()} />);

    expect(testKit.getIsChecked()).toBe(false);
    expect(testKit.getInputElement()).not.toHaveAttribute('aria-checked', null);
  });

  it('is indeterminate when isIndeterminate is true even if isChecked is also true', () => {
    renderComponent(<Checkbox isIndeterminate isChecked onChange={vi.fn()} />);

    expect(testKit.getIsIndeterminate()).toBe(true);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('is indeterminate when isIndeterminate is true even if isChecked is false', () => {
    renderComponent(<Checkbox isIndeterminate isChecked={false} onChange={vi.fn()} />);

    expect(testKit.getIsIndeterminate()).toBe(true);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('click on the checkbox will activate the onChange function', async () => {
    const onChange = vi.fn();
    renderComponent(<Checkbox isChecked={false} onChange={onChange} />);

    await testKit.click();

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('click on the label will activate the onChange function', async () => {
    const onChange = vi.fn();
    const { user } = renderComponent(<Checkbox isChecked={false} onChange={onChange} label="Checkbox label" />);

    await act(async () => user.click(screen.getByTestId('checkbox-label')));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('click on the checkbox will not activate the onChange function, on disabled state', async () => {
    const onChange = vi.fn();
    renderComponent(<Checkbox isChecked={false} onChange={onChange} isDisabled />);

    await testKit.click();

    expect(onChange).not.toHaveBeenCalled();
    expect(testKit.getIsDisabled()).toBe(true);
  });

  it('does not propagate the click event', async () => {
    const handleClick = vi.fn();
    renderComponent(
      <div onClick={handleClick}>
        <Checkbox />
      </div>
    );

    await testKit.click();

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('mark as aria-required when required', () => {
    renderComponent(<Checkbox aria-required="true" />);

    expect(testKit.getIsRequired()).toBe(true);
  });

  it('on Android devices, dont mark as aria-required when required, add the Required as visually hidden element', () => {
    vi.spyOn(pennyUtils, 'isMobileAndroid').mockReturnValue(true);
    renderComponent(<Checkbox aria-required="true" />);

    expect(testKit.getIsRequired()).toBe(false);
    expect(testKit.getElement()).toHaveTextContent('Required');

    vi.clearAllMocks();
  });

  it('hovering the checkbox triggers a tooltip', async () => {
    const { user } = renderComponent(<Checkbox tooltipProps={{ content: 'Hello!' }} />);

    await act(async () => user.hover(testKit.getInputElement()));

    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it("hovering the disabled checkbox with tooltip doesn't trigger a tooltip", async () => {
    const { user, getByRole } = renderComponent(<Checkbox isDisabled tooltipProps={{ content: 'Hello!' }} />);

    await act(async () => user.hover(getByRole('checkbox', { name: /checkbox/i })));

    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
  });

  it('is invalid when isInvalid is true', () => {
    renderComponent(<Checkbox isInvalid />);

    expect(testKit.getIsInvalid()).toBe(true);
  });

  it('is read-only when isReadOnly is true', () => {
    renderComponent(<Checkbox isReadOnly />);

    expect(testKit.getIsReadOnly()).toBe(true);
  });

  it('gets label text correctly', () => {
    renderComponent(<Checkbox label="Accept terms" />);

    expect(testKit.getLabelText()).toBe('Accept terms');
  });

  it('toggle method checks the checkbox when not checked', async () => {
    const onChange = vi.fn();
    renderComponent(<Checkbox isChecked={false} onChange={onChange} />);

    await testKit.toggle(true);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('toggle method unchecks the checkbox when checked', async () => {
    const onChange = vi.fn();
    renderComponent(<Checkbox isChecked onChange={onChange} />);

    await testKit.toggle(false);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('toggle method does nothing when checkbox is already in desired state', async () => {
    const onChange = vi.fn();
    renderComponent(<Checkbox isChecked onChange={onChange} />);

    await testKit.toggle(true);

    expect(onChange).not.toHaveBeenCalled();
  });

  testAutoFocus(Checkbox, {}, 'checkbox-input');
});
