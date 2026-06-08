import { forwardRef } from 'react';

import { ContainerProps } from './Container';
import { ContentPlaceholder } from './ContentPlaceholder';

type InteractiveContentPlaceholderProps = Pick<
  ContainerProps,
  'id' | 'borderRadius' | 'width' | 'height' | 'flexGrow' | 'flexShrink' | 'onClick'
> & {
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  backgroundColor?: string;
  minHeight?: string;
  hover?: boolean;
  active?: boolean;
};

export const InteractiveContentPlaceholder = forwardRef<HTMLDivElement, InteractiveContentPlaceholderProps>(
  ({ label = 'Replace me', disabled, selected, backgroundColor, hover, active, ...props }, ref) => {
    const getBackgroundColor = () => {
      if (selected) {
        return 'global.brand.500';
      }
      if (active) {
        return 'global.brand.400';
      }
      if (hover) {
        return 'global.brand.300';
      }
      return 'global.brand.200';
    };

    return (
      <ContentPlaceholder
        data-component="Storybook.InteractiveContentPlaceholder"
        ref={ref}
        backgroundColor={backgroundColor ?? getBackgroundColor()}
        data-hover={hover}
        data-active={active}
        data-disabled={disabled}
        label={label}
        {...props}
      />
    );
  }
);

InteractiveContentPlaceholder.displayName = 'Storybook.InteractiveContentPlaceholder';
