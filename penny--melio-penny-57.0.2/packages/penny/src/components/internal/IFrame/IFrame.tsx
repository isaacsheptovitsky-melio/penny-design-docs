import { Box, type BoxProps, type SystemStyleObject } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, type HTMLProps } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils';

type HTMLIframeProps = Pick<HTMLProps<HTMLIFrameElement>, 'scrolling' | 'frameBorder'>;
export type IFrameProps = Omit<BoxProps, 'width' | 'height'> &
  HTMLIframeProps & {
    title: string;
    src: string;
    width?: SystemStyleObject['width'];
    height?: SystemStyleObject['height'];
    inert?: boolean;
  } & TestIdProp;

export const IFrame = forwardRef<HTMLDivElement, IFrameProps>(
  (
    { title, width, height, inert = false, 'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.IFRAME, ...props },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);

    return (
      <Box
        data-component="IFrame"
        {...props}
        // This is a workaround since the emotion and chakra types are a bit different.
        width={width as BoxProps['w']}
        height={height as BoxProps['h']}
        ref={ref}
        as="iframe"
        aria-label={title}
        // Workaround: `inert` is only typed in React 19+ JSX.
        // https://stackoverflow.com/questions/72720469/error-when-using-inert-attribute-with-typescript
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inert={inert ? '' : undefined}
        {...getTestId()}
      />
    );
  }
);
IFrame.displayName = 'IFrame';
