// The theme is located at the `container` section of Form.theme
// Due to how chakra implements this internally
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/form.ts#L24-L28

import { FormControl as ChakraFormControl, type FormControlProps as ChakraFormControlProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useEffect, useRef } from 'react';

import { type TypographyLabelProps } from '../../dataDisplay';
import { useFormContext } from '../_Form';

export type FormControlProps = Omit<ChakraFormControlProps, 'label'> & {
  isViewMode?: boolean;
  isHidden?: boolean;
  labelProps?: TypographyLabelProps;
  'data-testid'?: string;
};

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (
    { 'data-testid': dataTestId, isHidden, isViewMode, labelProps, isInvalid, gridColumn, children, ...props },
    propRef
  ) => {
    const formControlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // This was the only way to remove the role attribute from `ChakraFormControl` since Chakra doesn't allow overriding it.
      formControlRef.current?.removeAttribute('role');
    }, []);

    const ref = useMergeRefs([propRef, formControlRef]);
    const sharedProps = {
      ref,
      children,
      'data-testid': dataTestId,
      'data-hidden': isHidden || null,
      gridColumn,
    };

    const formContext = useFormContext();

    // Check if the whole form is in view mode to determine if the field should be an <li/> or a <FormControl/>
    // An <li/> can't be a <FormControl/> because Chakra adds a role="group" by default, which is not allowed in a <li/>
    return formContext.isViewMode ? (
      <Box
        as="li"
        listStyleType="none"
        display="flex"
        flexDirection="column"
        rowGap="8px"
        minWidth={0}
        data-view-mode={formContext.isViewMode ?? isViewMode}
        {...sharedProps}
      />
    ) : (
      <ChakraFormControl
        data-component="FormControl"
        {...props}
        {...sharedProps}
        label={labelProps?.label}
        isInvalid={isInvalid}
      />
    );
  }
);
FormControl.displayName = 'FormControl';
