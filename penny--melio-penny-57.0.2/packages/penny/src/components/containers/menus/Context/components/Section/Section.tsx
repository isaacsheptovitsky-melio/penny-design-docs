import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';

import { Container } from '../../../../Container';
import { Group } from '../../../../Group';
import { type SectionProps } from './Section.types';

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, label, 'data-testid': dataTestId = 'section', ...props }, ref) => {
    const sectionId = uniqueId('section-');
    const getTestId = useTestId(dataTestId);

    return (
      <Group
        variant="vertical"
        alignItems="center"
        spacing="none"
        role="group"
        as="ul"
        aria-labelledby={sectionId}
        ref={ref}
        {...getTestId()}
        {...props}
      >
        <Container paddingX="s" paddingY="xs-s" as="li" role="presentation" id={sectionId} {...getTestId('title')}>
          <ConditionalWrapper
            condition={typeof label === 'string'}
            wrapper={(children) => (
              <Text textStyle="body4Semi" color="semantic.text.secondary">
                {children}
              </Text>
            )}
          >
            {label}
          </ConditionalWrapper>
        </Container>
        {children}
      </Group>
    );
  }
);
