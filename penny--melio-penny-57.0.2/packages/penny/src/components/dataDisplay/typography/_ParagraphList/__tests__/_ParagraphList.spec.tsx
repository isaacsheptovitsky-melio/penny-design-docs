import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { IconProps } from '@/components/foundations/Icon';
import { validateComponent } from '@/test-utils/__tests__/component.validation';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { _ParagraphList } from '../_ParagraphList';
import type { _OrderedParagraphProps, _ParagraphListProps, _UnorderedParagraphProps } from '../_ParagraphList.types';

const paragraph: _OrderedParagraphProps = { content: 'Lorem ipsum dolor sit amet' };
const unorderedParagraph: _UnorderedParagraphProps = { content: 'Lorem ipsum dolor sit amet' };

vi.mock('../../../../../theme/hooks/use-style-config');
vi.mock(' /../../../../foundations/Icon', () => ({
  Icon: vi.fn(({ type, ...props }: IconProps) => <div data-testid="icon" {...props} />),
}));

describe('_ParagraphList', () => {
  const useMultiStyleConfigMock = vi.mocked(useMultiStyleConfig);

  beforeEach(() => {
    useMultiStyleConfigMock.mockReturnValue({
      container: 'container-style',
      listItem: 'listItem-style',
      bulletWrapper: 'bulletWrapper-style',
      number: 'number-style',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  validateComponent(_ParagraphList, '_ParagraphList', {
    props: { list: [paragraph, paragraph, paragraph], type: 'ordered' },
  });

  const defaultProps: _ParagraphListProps = {
    list: [paragraph, paragraph],
    type: 'ordered',
    'data-testid': 'paragraph-list-test',
  };

  it('should render an ordered list', () => {
    render(<_ParagraphList {...defaultProps} />);

    const list = screen.getByTestId('paragraph-list-test');
    expect(list.tagName).toBe('OL');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent(`1.${paragraph.content as string}`);
    expect(items[1]).toHaveTextContent(`2.${paragraph.content as string}`);
  });

  it('should render an unordered list', () => {
    render(
      <_ParagraphList
        {...defaultProps}
        type="unordered"
        list={[unorderedParagraph, unorderedParagraph]}
        data-testid="paragraph-list-test"
      />
    );

    const list = screen.getByTestId('paragraph-list-test');
    expect(list.tagName).toBe('UL');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.queryByText('1.')).not.toBeInTheDocument();
    expect(screen.queryByText('2.')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('should render an unordered list with icons', () => {
    const listWithIcons: _UnorderedParagraphProps[] = [
      { content: 'First item', icon: 'test-icon-1' as IconProps['type'] },
      { content: 'Second item', icon: 'test-icon-2' as IconProps['type'] },
    ];
    render(
      <_ParagraphList {...defaultProps} list={listWithIcons} type="unordered" data-testid="paragraph-list-test" />
    );

    const list = screen.getByTestId('paragraph-list-test');
    expect(list.tagName).toBe('UL');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    const icons = screen.getAllByTestId('icon');
    expect(icons).toHaveLength(2);
  });

  it('should pass data-testid to elements', () => {
    render(<_ParagraphList {...defaultProps} />);

    expect(screen.getByTestId('paragraph-list-test')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-list-test-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('paragraph-list-test-item-2')).toBeInTheDocument();
  });

  it('should render correct number of items', () => {
    const listWithThreeItems = [paragraph, paragraph, paragraph];
    render(<_ParagraphList {...defaultProps} list={listWithThreeItems} />);

    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(3);
  });

  it('should render list items with ReactNode content', () => {
    const listWithReactNodeContent: _OrderedParagraphProps[] = [
      { content: <span data-testid="react-node-content">Rich content</span> },
      { content: 'Plain string content' },
    ];
    render(<_ParagraphList {...defaultProps} list={listWithReactNodeContent} />);

    expect(screen.getByTestId('react-node-content')).toBeInTheDocument();
    expect(screen.getByText('Plain string content')).toBeInTheDocument();
  });

  it('should forward ref to the list container', () => {
    const ref = vi.fn();

    render(<_ParagraphList {...defaultProps} ref={ref} />);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLOListElement));
  });

  it('should use small size by default', () => {
    render(<_ParagraphList {...defaultProps} />);

    expect(useMultiStyleConfigMock).toHaveBeenCalledWith('_ParagraphList', expect.objectContaining({ size: 'small' }));
  });

  it('should pass size to useMultiStyleConfig', () => {
    render(<_ParagraphList {...defaultProps} size="large" />);

    expect(useMultiStyleConfigMock).toHaveBeenCalledWith('_ParagraphList', expect.objectContaining({ size: 'large' }));
  });
});
