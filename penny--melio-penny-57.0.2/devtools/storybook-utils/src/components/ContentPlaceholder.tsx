import { forwardRef } from 'react';

import { Container, ContainerProps } from './Container';

type ContentPlaceholderProps = Pick<
  ContainerProps,
  'id' | 'borderRadius' | 'width' | 'height' | 'flexGrow' | 'flexShrink'
> & {
  label?: string;
  isDisabled?: boolean;
  backgroundColor?: string;
  minHeight?: string;
};

export const ContentPlaceholder = forwardRef<HTMLDivElement, ContentPlaceholderProps>(
  ({ label = 'Replace me', isDisabled, backgroundColor, height, flexGrow = '0', flexShrink = '0', ...props }, ref) => {
    const style = {
      width: 'full',
      height,
      display: 'flex',
      flexGrow,
      flexShrink,
      alignItems: 'center',
      justifyContent: 'center',
      paddingX: 's',
      paddingY: 'xs',
      borderRadius: 'global.200',
      backgroundColor: backgroundColor ?? 'global.brand.200',
      color: 'semantic.text.primary',
      _disabled: {
        color: 'semantic.text.primary',
        backgroundColor: 'global.neutral.400',
      },
    };
    return (
      <Container
        data-component="Storybook.ContentPlaceholder"
        __css={style}
        ref={ref}
        {...props}
        data-disabled={isDisabled || null}
      >
        {label}
      </Container>
    );
  }
);

ContentPlaceholder.displayName = 'Storybook.ContentPlaceholder';
