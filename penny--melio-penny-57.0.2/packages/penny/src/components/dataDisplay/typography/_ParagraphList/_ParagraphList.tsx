import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';
import { Icon } from '../../../foundations/Icon';
import { _Paragraph } from '../_Paragraph';
import { type _ParagraphListProps, type _UnorderedParagraphProps } from './_ParagraphList.types';
import { PARAGRAPH_LIST_DEFAULT_DATA_TEST_ID } from './_ParagraphList.utils';

/**
 * @private
 */
export const _ParagraphList = forwardRef<HTMLDivElement, _ParagraphListProps>(
  ({ list, size = 'small', type, 'data-testid': dataTestId = PARAGRAPH_LIST_DEFAULT_DATA_TEST_ID, ...props }, ref) => {
    const isListWithIcons = list.every((paragraph) => 'icon' in paragraph);
    const styles = useMultiStyleConfig('_ParagraphList', { size, icon: isListWithIcons, type });
    const getTestId = useTestId(dataTestId);

    const getUnorderedListItem = (paragraph: _UnorderedParagraphProps) =>
      paragraph.icon ? (
        <Icon
          type={paragraph.icon}
          /* Is used for accessibility reasons to prevent an element from being read by a screen reader. */
          aria-hidden="true"
          color="inherit"
        />
      ) : (
        <Box __css={styles['bulletWrapper']} />
      );

    return (
      <Box
        as={type === 'ordered' ? 'ol' : 'ul'}
        ref={ref}
        data-component="_ParagraphList"
        {...getTestId()}
        __css={styles['container']}
        {...props}
      >
        {list.map((paragraph, index) => {
          const itemNumber = index + 1;

          return (
            <Box as="li" key={itemNumber} {...getTestId(`item-${itemNumber}`)} __css={styles['listItem']}>
              {type === 'unordered' ? (
                getUnorderedListItem(paragraph)
              ) : (
                <Box __css={styles['number']}>{itemNumber}.</Box>
              )}
              <_Paragraph {...paragraph} size={size} />
            </Box>
          );
        })}
      </Box>
    );
  }
);

_ParagraphList.displayName = '_ParagraphList';
