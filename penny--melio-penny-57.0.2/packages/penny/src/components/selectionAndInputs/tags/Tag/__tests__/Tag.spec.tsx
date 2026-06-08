import { expect } from 'vitest';

import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { renderComponent } from '@/test-utils/render.utils';

import { Tag } from '../Tag';
import { type TagProps } from '../Tag.types';

describe('Tag', () => {
  validateComponent<TagProps>(Tag, 'Tag', {
    props: { children: 'tag label', removeButtonProps: { onClick: vi.fn() } },
    defaultDataTestId: 'tag',
    componentParts: ['content', 'remove-button'],
  });

  it('when onClick is not provided, the tag renders as div by default', () => {
    const { getByTestId } = renderComponent(<Tag>Label</Tag>);
    expect(getByTestId('tag').tagName).toBe('DIV');
  });

  it('when onClick provided, the tag renders as button', () => {
    const { getByTestId } = renderComponent(<Tag onClick={vi.fn()}>Label</Tag>);
    expect(getByTestId('tag').tagName).toBe('BUTTON');
  });

  it('clickable tag triggers onClick event and has accessible name', async () => {
    const onClick = vi.fn();
    const { getByRole, user } = renderComponent(<Tag onClick={onClick}>Label</Tag>);
    expect(getByRole('button', { name: 'Label' })).toHaveAccessibleName('Label');
    await user.click(getByRole('button', { name: 'Label' }));
    expect(onClick).toBeCalled();
  });

  it('clickable tag triggers onClick when pressing Enter', async () => {
    const onClick = vi.fn();
    const { getByRole, user } = renderComponent(<Tag onClick={onClick}>Label</Tag>);
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(getByRole('button', { name: 'Label' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toBeCalled();
  });

  it('clickable tag triggers onClick when pressing Space', async () => {
    const onClick = vi.fn();
    const { getByRole, user } = renderComponent(<Tag onClick={onClick}>Label</Tag>);
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(getByRole('button', { name: 'Label' })).toHaveFocus();
    await user.keyboard('[Space]');
    expect(onClick).toBeCalled();
  });

  it('disabled clickable does not trigger onClick event', async () => {
    const onClick = vi.fn();
    const { getByRole, user } = renderComponent(
      <Tag onClick={onClick} disabled>
        Label
      </Tag>
    );
    await user.click(getByRole('button', { name: 'Label' }));
    expect(onClick).not.toBeCalled();
  });

  it('disabled clickable does not get focus', async () => {
    const onClick = vi.fn();
    const { getByRole, user } = renderComponent(
      <Tag onClick={onClick} disabled>
        Label
      </Tag>
    );
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(getByRole('button', { name: 'Label' })).not.toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).not.toBeCalled();
  });

  it("removable tag triggers remove's button onClick event, and remove button has accessible name", async () => {
    const remove = vi.fn();
    const { getByRole, user } = renderComponent(<Tag removeButtonProps={{ onClick: remove }}>Label</Tag>);
    expect(getByRole('button', { name: 'Remove Label tag' })).toHaveAccessibleName('Remove Label tag');
    await user.click(getByRole('button', { name: 'Remove Label tag' }));
    expect(remove).toBeCalled();
  });

  it("removable tag triggers remove's button onClick event when pressing Enter", async () => {
    const remove = vi.fn();
    const { getByRole, user } = renderComponent(<Tag removeButtonProps={{ onClick: remove }}>Label</Tag>);
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(getByRole('button', { name: 'Remove Label tag' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(remove).toBeCalled();
  });

  it("removable tag triggers remove's button onClick event when pressing Space", async () => {
    const remove = vi.fn();
    const { getByRole, user } = renderComponent(<Tag removeButtonProps={{ onClick: remove }}>Label</Tag>);
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(getByRole('button', { name: 'Remove Label tag' })).toHaveFocus();
    await user.keyboard('[Space]');
    expect(remove).toBeCalled();
  });

  it("disabled removable tag does not trigger remove's button onClick event", async () => {
    const remove = vi.fn();
    const { getByRole, user } = renderComponent(
      <Tag removeButtonProps={{ onClick: remove }} disabled>
        Label
      </Tag>
    );
    await user.click(getByRole('button', { name: 'Remove Label tag' }));
    expect(remove).not.toBeCalled();
  });

  it("disabled removable tag's button does not get focus", async () => {
    const remove = vi.fn();
    const { getByRole, user } = renderComponent(
      <Tag removeButtonProps={{ onClick: remove }} disabled>
        Label
      </Tag>
    );
    expect(document.activeElement).toBe(document.body);
    await user.tab();
    expect(getByRole('button', { name: 'Remove Label tag' })).not.toHaveFocus();
    await user.keyboard('{Enter}');
    expect(remove).not.toBeCalled();
  });
});
