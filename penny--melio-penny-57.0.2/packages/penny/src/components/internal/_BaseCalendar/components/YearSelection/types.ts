import { type BoxProps } from '@chakra-ui/react';
import { type RefObject } from 'react';

import { type MonthType, type YearSelectionType } from '../../hooks';

export type YearSelectionHeaderTriggerProps = {
  activeMonth: MonthType;
  toggleYearSelection: (open?: boolean) => void;
} & Pick<BoxProps, 'onKeyDown'>;

export type YearSelectionListProps = {
  activeMonth: MonthType;
  closeYearSelection: (date?: Date) => void;
  onBlurYearList: () => void;
};

export type YearSelectionListItemProps = {
  yearItem: YearSelectionType;
  onToggleYear: (year: number, ref?: RefObject<HTMLDivElement>) => void;
  scrollToElement: (ref: RefObject<HTMLDivElement>) => void;
  goToYear: (date: Date) => void;
  isOpen?: boolean;
  focusedYear?: number;
  onFocusYearChange: (year?: number, ref?: RefObject<HTMLDivElement>) => void;
  onBlurYear: () => void;
  isActiveYear: boolean;
  shouldTriggerScrollToElement: boolean;
  handleEscape: () => void;
} & Pick<YearSelectionListProps, 'activeMonth'>;
