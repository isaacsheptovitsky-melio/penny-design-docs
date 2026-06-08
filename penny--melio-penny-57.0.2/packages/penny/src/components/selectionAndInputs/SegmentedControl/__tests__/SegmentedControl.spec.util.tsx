import { createSegmentedControlTestKit } from '@melio/penny-testkit-rtl';
import { type ChangeEventHandler } from 'react';
import { expect } from 'vitest';

import { type renderComponent } from '@/test-utils/render.utils';

import type { SegmentOption } from '../SegmentedControl.types';

export const defaultValue = '1';
export const defaultSegments: SegmentOption[] = [
  { label: 'label', value: '1', id: '1' },
  { label: 'label', value: '2', id: '2' },
];
export const defaultOnChangeMock = vi.fn<ChangeEventHandler<HTMLInputElement>>();

export type RenderProps = { value?: string; segments?: SegmentOption[]; onChange?: ChangeEventHandler };
export type MultiRenderProps = { values?: string[] } & RenderProps;
type RenderReturn = ReturnType<typeof renderComponent>;

const testKit = createSegmentedControlTestKit();

export function testSegmentedControl(renderComponent: (props?: RenderProps) => RenderReturn) {
  const segment1 = testKit.getSegment('segmented-control.segment-1');
  const segment2 = testKit.getSegment('segmented-control.segment-2');

  it('checked when selected value', () => {
    renderComponent({ value: '2' });
    expect(segment2.getIsChecked()).toBe(true);
  });

  it('checked when not selected value', () => {
    renderComponent();
    expect(segment2.getIsChecked()).toBe(false);
  });

  it('onChange fire with value on click on segment', async () => {
    const onChangeMock = vi.fn<ChangeEventHandler<HTMLInputElement>>();
    renderComponent({ onChange: onChangeMock });
    await segment2.click();
    expect(onChangeMock.mock.lastCall?.[0].target.value).toBe('2');
  });

  it('selects a segment', async () => {
    const onChangeMock = vi.fn<ChangeEventHandler<HTMLInputElement>>();
    renderComponent({ onChange: onChangeMock });
    await testKit.select('segmented-control.segment-2');
    expect(onChangeMock.mock.lastCall?.[0].target.value).toBe('2');
  });

  it('returns the selected segment', () => {
    renderComponent({ value: '2' });
    const selectedSegment = testKit.getSelectedSegment();
    expect(selectedSegment?.getValue()).toBe('2');
  });

  it('renders the segment with ids', () => {
    renderComponent();
    expect(segment1.getInputElement()).toHaveAttribute('id', '1');
    expect(segment2.getInputElement()).toHaveAttribute('id', '2');
  });

  it('segment input and label connected when has ids', () => {
    renderComponent();

    expect(segment1.getInputElement()).toHaveAttribute('id', '1');
    expect(segment2.getInputElement()).toHaveAttribute('id', '2');
    expect(segment1.getLabelElement()).toHaveAttribute('for', '1');
    expect(segment2.getLabelElement()).toHaveAttribute('for', '2');
  });

  it('segment input and label connected when has no ids', () => {
    renderComponent({
      value: '2',
      segments: defaultSegments.map((segment) => ({
        ...segment,
        id: undefined,
      })),
    });

    const firstSegmentId = segment1.getInputElement().getAttribute('id');
    expect(segment1.getLabelElement()).toHaveAttribute('for', firstSegmentId);
    const secondSegmentId = segment2.getInputElement().getAttribute('id');
    expect(segment2.getLabelElement()).toHaveAttribute('for', secondSegmentId);
  });
}

export function testMultiOptionSegmentedControl(renderComponent: (props?: MultiRenderProps) => RenderReturn) {
  const segment1 = testKit.getSegment('segmented-control.segment-1');
  const segment2 = testKit.getSegment('segmented-control.segment-2');

  it('checked when selected values', () => {
    renderComponent({ values: ['1', '2'] });
    expect(segment1.getIsChecked()).toBe(true);
    expect(segment2.getIsChecked()).toBe(true);
  });

  it('onChange fire with value on click on selected segment', async () => {
    const onChangeMock = vi.fn<ChangeEventHandler<HTMLInputElement>>();
    renderComponent({ onChange: onChangeMock });
    await segment1.click();
    expect(onChangeMock.mock.lastCall?.[0].target.value).toBe('1');
  });
}
