import { act } from '@testing-library/react';
import { expect } from 'vitest';

import { renderComponent } from '@/test-utils';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { VirtualCard, type VirtualCardProps } from '../VirtualCard';

const props: VirtualCardProps = {
  variant: 'white',
  showDetails: true,
  amount: 1500,
  brandSymbolProps: { type: 'mastercard' },
  brandType: 'jp-morgan',
  cardNumberProps: { cardNumber: '1234567890123456' },
  expirationDateProps: { month: '02', year: '27' },
  cvvNumberProps: { cvv: '123' },
};

validateComponent<VirtualCardProps>(VirtualCard, 'VirtualCard', {
  props,
  defaultDataTestId: 'virtual-card',
  componentParts: ['card-number', 'expiration-date', 'cvv-number'],
});

describe('VirtualCard', () => {
  it('copies the text to clipboard when clicked on the copy button / mainLabel and matches the prop value', async () => {
    const onCopyCardNumber = vi.fn();
    const onCopyCvvNumber = vi.fn();
    const onCopyExpirationDate = vi.fn();

    const { getByTestId, user } = renderComponent(
      <VirtualCard
        {...props}
        cardNumberProps={{ ...props.cardNumberProps, onCopy: onCopyCardNumber }}
        cvvNumberProps={{ ...props.cvvNumberProps, onCopy: onCopyCvvNumber }}
        expirationDateProps={{ ...props.expirationDateProps, onCopy: onCopyExpirationDate }}
      />
    );
    await act(async () => user.click(getByTestId('virtual-card-card-number-copy-button')));

    expect(await navigator.clipboard.readText()).toBe(
      props.cardNumberProps.cardNumber?.toString().replace(/(.{4})/g, '$1 ')
    );
    expect(onCopyCardNumber).toHaveBeenCalled();

    await act(async () => user.click(getByTestId('virtual-card-cvv-number-copy-button')));

    expect(await navigator.clipboard.readText()).toBe(props.cvvNumberProps.cvv);
    expect(onCopyCvvNumber).toHaveBeenCalled();

    await act(async () => user.click(getByTestId('virtual-card-expiration-date-copy-button')));

    expect(await navigator.clipboard.readText()).toBe(
      `${props.expirationDateProps.month}/${props.expirationDateProps.year}`
    );
    expect(onCopyExpirationDate).toHaveBeenCalled();
  });
  it('when showDetails is falsy should not show the copy button when hovering the card details', async () => {
    const { queryByTestId, getByTestId, user } = renderComponent(<VirtualCard {...props} showDetails={false} />);

    await act(async () => user.hover(getByTestId('virtual-card-card-number-main-label')));

    expect(queryByTestId('virtual-card-card-number-copy-button')).not.toBeInTheDocument();
    expect(queryByTestId('virtual-card-card-number-main-label')).toHaveTextContent('•••• •••• •••• 3456');

    await act(async () => {
      await user.unhover(getByTestId('virtual-card-card-number-main-label'));
      await user.hover(getByTestId('virtual-card-cvv-number-main-label'));
    });

    expect(queryByTestId('virtual-card-cvv-number-copy-button')).not.toBeInTheDocument();
    expect(queryByTestId('virtual-card-cvv-number-main-label')).toHaveTextContent('•••');

    await act(async () => {
      await user.unhover(getByTestId('virtual-card-cvv-number-main-label'));
      await user.hover(getByTestId('virtual-card-expiration-date-main-label'));
    });

    expect(queryByTestId('virtual-card-expiration-date-copy-button')).not.toBeInTheDocument();
    expect(queryByTestId('virtual-card-expiration-date-main-label')).toHaveTextContent('••/••');
  });
  it("card's details has default labels", () => {
    const defaultDetailsLabel = {
      cardNumber: 'Card Number',
      expirationDate: 'Expiry date',
      cvvNumber: 'CVV',
    };

    const { getByTestId } = renderComponent(<VirtualCard {...props} />);
    expect(getByTestId('virtual-card-card-number-label')).toHaveTextContent(defaultDetailsLabel.cardNumber);
    expect(getByTestId('virtual-card-expiration-date-label')).toHaveTextContent(defaultDetailsLabel.expirationDate);
    expect(getByTestId('virtual-card-cvv-number-label')).toHaveTextContent(defaultDetailsLabel.cvvNumber);
  });
  it("card's details has custom labels", () => {
    const customDetailsLabel = {
      cardNumber: 'Custom Card Number',
      expirationDate: 'Custom Expiry date',
      cvvNumber: 'Custom CVV',
    };

    const { getByTestId } = renderComponent(
      <VirtualCard
        {...props}
        cardNumberProps={{ ...props.cardNumberProps, label: customDetailsLabel.cardNumber }}
        expirationDateProps={{ ...props.expirationDateProps, label: customDetailsLabel.expirationDate }}
        cvvNumberProps={{ ...props.cvvNumberProps, label: customDetailsLabel.cvvNumber }}
      />
    );
    expect(getByTestId('virtual-card-card-number-label')).toHaveTextContent(customDetailsLabel.cardNumber);
    expect(getByTestId('virtual-card-expiration-date-label')).toHaveTextContent(customDetailsLabel.expirationDate);
    expect(getByTestId('virtual-card-cvv-number-label')).toHaveTextContent(customDetailsLabel.cvvNumber);
  });
});
