import { Box } from '@chakra-ui/react';
import { createContext, type ForwardedRef, forwardRef, useCallback, useContext } from 'react';

import { useMultiStyleConfig } from '../../../theme/hooks/use-style-config';
import {
  SectionBannerContent,
  SectionBannerDescription,
  SectionBannerIcon,
  SectionBannerRoot,
  SectionBannerTitle,
} from '../../dataDisplay/SectionBanner';
import { Loader } from '../../foundations/Loader';
import { type _FormProps, type FormContextData } from './_Form.types';

const FormContext = createContext<FormContextData>({ columns: 1 });
export const useFormContext = () => useContext(FormContext);

/**
 * @private Please use `Form` from `@melio/penny`.
 */
export const _Form = forwardRef<HTMLFormElement, _FormProps>(
  (
    {
      children,
      inputRef,
      isDisabled,
      isReadOnly,
      isViewMode,
      isLoading,
      columns = 1,
      error,
      as,
      size = 'large',
      errorState,
      ...props
    },
    ref
  ) => {
    const style = useMultiStyleConfig('Form', { size, columns });

    // We focus the form error when it appears so SR would read it.
    const onFormError = useCallback((bannerRef: HTMLDivElement | null): void => {
      if (!bannerRef) return;

      bannerRef.scrollIntoView({ behavior: 'smooth' });
      bannerRef.focus();
    }, []);

    return (
      <Box __css={style['formContainer']}>
        <FormContext.Provider value={{ size, columns, isDisabled, isReadOnly, isViewMode, isLoading }}>
          {error && (
            <SectionBannerRoot variant="critical" ref={onFormError} data-testid="form-general-error" tabIndex={-1}>
              <SectionBannerIcon />
              <SectionBannerContent>
                {error.title && <SectionBannerTitle>{error.title}</SectionBannerTitle>}
                {error.description && <SectionBannerDescription>{error.description}</SectionBannerDescription>}
              </SectionBannerContent>
            </SectionBannerRoot>
          )}
          <Box
            data-component="_Form"
            {...props}
            // If the form is in view mode, we render a <ul> and the form fields are <li>
            as={as ?? (isViewMode ? 'ul' : 'form')}
            data-readonly={isReadOnly}
            data-view-mode={isViewMode}
            __css={style['form']}
            aria-disabled={isDisabled}
            ref={ref as ForwardedRef<HTMLDivElement>}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            noValidate
          >
            {children}
            <input ref={inputRef} type="submit" hidden />
            {isLoading && (
              <Box __css={style['loader']}>
                <Loader data-testid="form-loader" />
              </Box>
            )}
          </Box>
        </FormContext.Provider>
      </Box>
    );
  }
);

_Form.displayName = '_Form';
