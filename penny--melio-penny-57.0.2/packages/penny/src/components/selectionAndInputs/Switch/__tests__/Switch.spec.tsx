import { createSwitchTestKit } from '@melio/penny-testkit-rtl';
import { beforeEach, expect } from 'vitest';

import { testAutoFocus, testReadOnly } from '@/components/form/test/utils/form.test.utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';

import { Switch } from '../Switch';
import type { SwitchProps } from '../Switch.types';
import { renderSwitchComponent } from './Switch.driver';

describe('Switch', () => {
  validateComponent<SwitchProps>(Switch, 'Switch', {
    props: { label: 'Label' },
    defaultDataTestId: COMPONENTS_DEFAULT_TEST_IDS.SWITCH,
  });

  testReadOnly<SwitchProps>({ Comp: Switch, options: { customTestIdToGet: 'switch-input' } });

  let switchTestKit: ReturnType<typeof createSwitchTestKit>;

  beforeEach(() => {
    switchTestKit = createSwitchTestKit();
  });

  it('change the switch state unactive/active clicking on it', async () => {
    renderSwitchComponent({ size: 'small' });

    await switchTestKit.toggle();
    expect(switchTestKit.getIsChecked()).toBeTruthy();

    await switchTestKit.toggle();
    expect(switchTestKit.getIsChecked()).toBeFalsy();
  });

  it('change the switch state unactive/active clicking on it with the use of default checked value', async () => {
    const { user } = renderSwitchComponent({ size: 'small', defaultIsChecked: true });

    await user.click(switchTestKit.getInputElement());
    expect(switchTestKit.getIsChecked()).toBeFalsy();

    await user.click(switchTestKit.getInputElement());
    expect(switchTestKit.getIsChecked()).toBeTruthy();
  });

  it("doesn't change the switch state when disabled", async () => {
    renderSwitchComponent({ size: 'small', isDisabled: true });

    expect(switchTestKit.getIsDisabled()).toBeTruthy();
    await switchTestKit.toggle(true);
    expect(switchTestKit.getIsChecked()).toBeFalsy();
  });

  it("doesn't change the switch state when disabled with the use of default checked value", async () => {
    renderSwitchComponent({ size: 'small', defaultIsChecked: true, isDisabled: true });

    expect(switchTestKit.getIsDisabled()).toBeTruthy();
    await switchTestKit.toggle();
    expect(switchTestKit.getIsChecked()).toBeTruthy();
  });

  it("doesn't change the switch state when read-only", async () => {
    const onChange = vi.fn();
    renderSwitchComponent({
      size: 'small',
      defaultIsChecked: true,
      isReadOnly: true,
      onChange,
    });

    await switchTestKit.toggle(false);
    expect(switchTestKit.getIsChecked()).toBeTruthy();
    expect(onChange).not.toBeCalled();
  });

  // Accessibility tests
  it('gets a default aria-label, when aria-label is not provided', () => {
    renderSwitchComponent({ defaultIsChecked: true });
    expect(switchTestKit.getInputElement()).toHaveAccessibleName('Switch');
  });

  it('gets the label as default aria-label, when aria-label is not provided', () => {
    renderSwitchComponent({ defaultIsChecked: true, label: "I'm a accessible switch" });
    expect(switchTestKit.getInputElement()).toHaveAccessibleName("I'm a accessible switch");
  });

  it('gets a custom aria-label', () => {
    renderSwitchComponent({
      defaultIsChecked: true,
      label: "I'm a accessible switch",
      'aria-label': "I'm a accessible switch with custom label",
    });
    expect(switchTestKit.getInputElement()).toHaveAccessibleName("I'm a accessible switch with custom label");
  });

  it('gets a custom aria-describedby', () => {
    renderSwitchComponent({ defaultIsChecked: true, label: "I'm a accessible switch", 'aria-describedby': 'test-id' });
    expect(switchTestKit.getInputElement()).toHaveAttribute('aria-describedby', 'test-id');
  });

  it('gets a custom aria-labelledby', () => {
    renderSwitchComponent({ defaultIsChecked: true, label: "I'm a accessible switch", 'aria-labelledby': 'test-id' });
    expect(switchTestKit.getInputElement()).toHaveAttribute('aria-labelledby', 'test-id');
  });

  it('gets a custom aria-required', () => {
    renderSwitchComponent({ defaultIsChecked: true, label: "I'm a accessible switch", 'aria-required': 'true' });
    expect(switchTestKit.getIsRequired()).toBeTruthy();
  });

  it('gets the attribute aria-readonly, when the switch is in read-only mode', () => {
    renderSwitchComponent({ defaultIsChecked: true, isReadOnly: true });
    expect(switchTestKit.getIsReadOnly()).toBeTruthy();
  });

  testAutoFocus(Switch, {} as SwitchProps, 'switch-input');

  it('should change the controlled switch state when clicked', async () => {
    renderSwitchComponent({ isControlled: true });

    await switchTestKit.toggle();
    expect(switchTestKit.getIsChecked()).toBeTruthy();
    await switchTestKit.toggle();
    expect(switchTestKit.getIsChecked()).toBeFalsy();
  });
});
