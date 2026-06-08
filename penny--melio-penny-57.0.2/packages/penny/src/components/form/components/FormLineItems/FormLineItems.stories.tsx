import { range } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';
import { useFieldArray } from 'react-hook-form';
import type { InputType } from 'storybook/internal/csf';
import { Storybook } from 'storybook-utils';

import { IconButton } from '@/components/action/IconButton';
import { Typography } from '@/components/dataDisplay/typography';
import { FormField } from '@/components/form/components/FormField';
import { useMelioForm } from '@/components/form/hooks';
import { AmountField } from '@/components/selectionAndInputs/AmountField';
import { SelectNew } from '@/components/selectionAndInputs/SelectNew';
import { TextField } from '@/components/selectionAndInputs/TextField';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import type { ColSize } from './FormLineItems.types';
import {
  FormLineItems,
  FormLineItemsBody,
  FormLineItemsCell,
  FormLineItemsHeaderCell,
  FormLineItemsHeaderRow,
  FormLineItemsMobileList,
  FormLineItemsMobileListItem,
  FormLineItemsRow,
} from './index';

type CustomArgs = {
  headerCellSize: ColSize;
  headerCellIsSticky: boolean;
  headerCellChildren: ReactNode;
  headerCellTestId: string;
  bodyIsLoading: boolean;
  bodyTestId: string;
  rowIsLoading: boolean;
  rowTestId: string;
  cellSize: ColSize;
  cellIsSticky: boolean;
  cellChildren: ReactNode;
  cellTestId: string;
  mobileListChildren: ReactNode;
  mobileListTestId: string;
  mobileListItemChildren: ReactNode;
  mobileListItemTestId: string;
  index: number;
};

type FormLineItemsPropsAndCustomArgs = ComponentProps<typeof FormLineItems> & CustomArgs;

const getTestIdArgType = (category: string, defaultValue: string): InputType => ({
  name: 'data-testid',
  control: 'text',
  description: 'The `data-testid` attribute for testing purposes.',
  table: {
    type: { summary: 'string' },
    category,
    defaultValue: { summary: `'${defaultValue}'` },
  },
});

const cellSizeControlOptions = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

/**
 * A `FormLineItems` is a structured set of rows and columns. <br/>
 * It's a skeleton where you can place any component in it. <br/>
 * Its header cells will usually consist of labels.
 * Its body cells will usually consist of form fields.  <br/>
 * Following components are part of the `FormLineItems` structure:
 * - `<FormLineItems />`
 * - `<FormLineItemsHeaderRow />`
 * - `<FormLineItemsHeaderCell />`
 * - `<FormLineItemsBody />`
 * - `<FormLineItemsRow />`
 * - `<FormLineItemsCell />`
 *
 * For mobile, `FormLineItems` has a different set of components (change the viewport to xs to see how it looks on mobile):
 * - `<FormLineItemsMobileList />`
 * - `<FormLineItemsMobileListItem />`
 */

const meta: Meta<FormLineItemsPropsAndCustomArgs> = {
  title: 'Form/Form Line Items',
  component: FormLineItems,
  argTypes: {
    'data-testid': getTestIdArgType('Form Line Items', 'form-line-items'),
    headerCellSize: {
      name: 'size',
      type: { name: 'string', required: true },
      control: 'select',
      options: cellSizeControlOptions,
      table: {
        type: { summary: 'ColSize', detail: "'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | number" },
        category: 'Header Cell',
      },
    },
    headerCellIsSticky: {
      name: 'isSticky',
      control: false,
      table: {
        category: 'Header Cell',
        type: { summary: 'boolean' },
      },
    },
    headerCellChildren: {
      name: 'children',
      control: false,
      table: {
        type: {
          summary: 'ReactNode',
          detail: 'any element, when string - will be a body4semi text style with ellipsis support',
        },
        category: 'Header Cell',
      },
    },
    headerCellTestId: getTestIdArgType('Header Cell', 'form-line-items-header-cell'),
    bodyTestId: getTestIdArgType('Body', 'form-line-items-body'),
    bodyIsLoading: {
      name: 'isLoading',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'Body',
      },
    },
    rowIsLoading: {
      name: 'isLoading',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'Row',
      },
    },
    rowTestId: getTestIdArgType('Row', 'form-line-items-row'),
    cellSize: {
      name: 'size',
      control: 'select',
      options: cellSizeControlOptions,
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'ColSize', detail: "'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | number" },
        category: 'Cell',
      },
    },
    cellIsSticky: {
      name: 'isSticky',
      control: false,
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        category: 'Cell',
      },
    },
    cellChildren: {
      name: 'children',
      control: false,
      table: {
        type: {
          summary: 'ReactNode',
        },
        category: 'Cell',
      },
    },
    cellTestId: getTestIdArgType('Cell', 'form-line-items-cell'),
    mobileListChildren: {
      name: 'children',
      control: false,
      table: {
        type: {
          summary: 'ReactNode',
        },
        category: 'Mobile List',
      },
    },
    mobileListTestId: getTestIdArgType('Mobile List', 'form-line-items-mobile-list'),
    mobileListItemChildren: {
      name: 'children',
      control: false,
      table: {
        type: {
          summary: 'ReactNode',
        },
        category: 'Mobile List Item',
      },
    },
    mobileListItemTestId: getTestIdArgType('Mobile List Item', 'form-line-items-mobile-list-item'),
    index: {
      control: false,
      type: { name: 'number', required: true },
      table: {
        category: 'Mobile List Item',
        type: { summary: 'number' },
      },
    },
  },
};
export default meta;

export const Main: StoryObj<FormLineItemsPropsAndCustomArgs> = {
  args: {
    'data-testid': 'form-line-items',
    headerCellSize: 'm',
    headerCellTestId: 'form-line-items-header-cell',
    bodyIsLoading: false,
    bodyTestId: 'form-line-items-body',
    cellSize: 'm',
    cellTestId: 'form-line-items-cell',
    rowIsLoading: false,
    rowTestId: 'form-line-items-row',
    mobileListTestId: 'form-line-items-mobile-list',
    mobileListItemTestId: 'form-line-items-mobile-list-item',
  },
  render: (args) => {
    const { isExtraSmallScreen } = useBreakpoint();
    return isExtraSmallScreen ? (
      <FormLineItemsMobileList data-testid={args.mobileListTestId}>
        {range(4).map((index) => (
          <FormLineItemsMobileListItem key={index} index={index}>
            <Storybook.ContentPlaceholder />
          </FormLineItemsMobileListItem>
        ))}
      </FormLineItemsMobileList>
    ) : (
      <FormLineItems>
        <FormLineItemsHeaderRow>
          {range(4).map((index) => (
            <FormLineItemsHeaderCell size={args.headerCellSize} key={index}>
              <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
            </FormLineItemsHeaderCell>
          ))}
        </FormLineItemsHeaderRow>
        <FormLineItemsBody isLoading={args.bodyIsLoading}>
          {range(4).map((index) => (
            <FormLineItemsRow key={index} isLoading={index === 3 ? args.rowIsLoading : false}>
              {range(4).map((index) => (
                <FormLineItemsCell size={args.cellSize} key={index}>
                  <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
                </FormLineItemsCell>
              ))}
            </FormLineItemsRow>
          ))}
        </FormLineItemsBody>
      </FormLineItems>
    );
  },
  parameters: {
    a11y: {
      // demonstration
      test: 'off',
    },
  },
};

/**
 * A `FormLineItems` is built to place form array fields in a table like structure. <br/>
 * In order to connect `FormLineItems` to a form - use [useFieldArray](https://react-hook-form.com/docs/usefieldarray) to manage an array field.
 *
 * Use [FormField](?path=/docs/form-form-field--docs) inside `FormLineItemsCell` for best behavior and look. <br/>
 *
 * > **Note:** you should register the `FormField` component and not the actual field component.
 *
 */
export const UsingFormFields: StoryObj<FormLineItemsPropsAndCustomArgs> = {
  render: () => {
    const { registerField, control, formProps } = useMelioForm({
      onSubmit: () => null,
      defaultValues: {
        lineItems: [
          {
            description: 'Purchase of office stationery',
            category: 'office_supplies',
            class: 'administration',
            amount: 1000,
          },
        ],
      },
    });
    const { fields, remove } = useFieldArray({ control, name: 'lineItems' });

    return (
      <form {...formProps}>
        <FormLineItems>
          <FormLineItemsHeaderRow>
            <FormLineItemsHeaderCell size="xs" />
            <FormLineItemsHeaderCell size="m">
              <Typography.Label label="Description" description="*" />
            </FormLineItemsHeaderCell>
            <FormLineItemsHeaderCell size="m">
              <Typography.Label label="Category" description="(Optional)" />
            </FormLineItemsHeaderCell>
            <FormLineItemsHeaderCell size="m">
              <Typography.Label label="Class" description="(Optional)" />
            </FormLineItemsHeaderCell>
            <FormLineItemsHeaderCell size="m">
              <Typography.Label label="Amount" />
            </FormLineItemsHeaderCell>
            <FormLineItemsHeaderCell size="xs" />
          </FormLineItemsHeaderRow>
          <FormLineItemsBody>
            {fields.map((field, index) => (
              <FormLineItemsRow key={field.id}>
                <FormLineItemsCell size="xs">
                  <FormField labelProps={{ label: 'line number', isHidden: true }} render={() => <>{index + 1}</>} />
                </FormLineItemsCell>
                <FormLineItemsCell size="m">
                  <FormField
                    labelProps={{ label: 'description', isHidden: true }}
                    {...registerField(`lineItems.${index}.description`)}
                    render={(props) => <TextField {...props} size="small" aria-label="description" />}
                    isRequired
                  />
                </FormLineItemsCell>
                <FormLineItemsCell size="m">
                  <FormField
                    labelProps={{ label: 'category', isHidden: true }}
                    {...registerField(`lineItems.${index}.category`)}
                    render={(props) => (
                      <SelectNew
                        options={[{ label: 'Office Supplies', value: 'office_supplies' }]}
                        emptyState=""
                        {...props}
                        id={`lineItems-${index}-category`}
                        size="small"
                        aria-label="category"
                      />
                    )}
                  />
                </FormLineItemsCell>
                <FormLineItemsCell size="m">
                  <FormField
                    labelProps={{ label: 'class', isHidden: true }}
                    {...registerField(`lineItems.${index}.class`)}
                    render={(props) => (
                      <SelectNew
                        options={[{ label: 'Administration', value: 'administration' }]}
                        emptyState=""
                        aria-label="class"
                        {...props}
                        id={`lineItems-${index}-class`}
                        size="small"
                      />
                    )}
                  />
                </FormLineItemsCell>
                <FormLineItemsCell size="m">
                  <FormField
                    labelProps={{ label: 'amount', isHidden: true }}
                    {...registerField(`lineItems.${index}.amount`)}
                    render={(props) => (
                      <AmountField {...props} size="small" currency="USD" currencySign="$" locale="en-US" />
                    )}
                  />
                </FormLineItemsCell>
                <FormLineItemsCell size="xs">
                  <FormField
                    labelProps={{ label: 'delete', isHidden: true }}
                    render={() => (
                      <IconButton
                        icon="delete"
                        aria-label="delete"
                        variant="naked"
                        size="small"
                        onClick={() => remove(index)}
                      />
                    )}
                  />
                </FormLineItemsCell>
              </FormLineItemsRow>
            ))}
          </FormLineItemsBody>
        </FormLineItems>
      </form>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 `FormLineItems` columns width is determined using the `size` prop of:
 1. `<FormLineItemsHeaderCell />`
 2. `<FormLineItemsCell />`

Those are the different size properties:

 | Size | Factor* | min-width | Fixed width |
 | --- | --- | --- | --- |
 | **xs** | - | 36px | V |
 | **s** | 1 | 80px | X |
 | **m** | 2 | 160px | X |
 | **l** | 3 | 240px | X |
 | **xl** | 4 | 320px | X |
 | **xxl** | 5 | 400px | X |
 | **number** (width in px) | - | - | V |

 \* **Factor** <br>
 sets a fixed proportion between the different cell sizes. For example, when **s** width is 100px: **m** width = 300px, **l** width: 240px. <br>
 It is similar to flex grow and helps keeping the same column sizes ratio in any scenario (any container width, any column size settings).
 */
export const ColumnSizes: StoryObj<FormLineItemsPropsAndCustomArgs> = {
  render: () => (
    <FormLineItems>
      <FormLineItemsHeaderRow>
        <FormLineItemsHeaderCell size="s">
          <Typography.Label label="Bill description" description="*" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="m">
          <Typography.Label label="Price" description="*" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="l">
          <Typography.Label label="Comments" description="(Optional)" />
        </FormLineItemsHeaderCell>
      </FormLineItemsHeaderRow>
      <FormLineItemsBody>
        <FormLineItemsRow>
          <FormLineItemsCell size="s">
            <FormField
              isRequired
              labelProps={{ label: 'Bill description', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Bill description" size="small" />}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="m">
            <FormField
              isRequired
              labelProps={{ label: 'Price', isHidden: true }}
              render={(props) => (
                <AmountField
                  {...props}
                  placeholder="0.00"
                  size="small"
                  currency="USD"
                  currencySign="$"
                  locale="en-US"
                />
              )}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="l">
            <FormField
              labelProps={{ label: 'Comments', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Comments" size="small" />}
            />
          </FormLineItemsCell>
        </FormLineItemsRow>
        <FormLineItemsRow>
          <FormLineItemsCell size="s">
            <FormField
              isRequired
              labelProps={{ label: 'Bill description', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Bill description" size="small" />}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="m">
            <FormField
              isRequired
              labelProps={{ label: 'Price', isHidden: true }}
              render={(props) => (
                <AmountField
                  {...props}
                  placeholder="0.00"
                  size="small"
                  currency="USD"
                  currencySign="$"
                  locale="en-US"
                />
              )}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="l">
            <FormField
              labelProps={{ label: 'Comments', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Comments" size="small" />}
            />
          </FormLineItemsCell>
        </FormLineItemsRow>
      </FormLineItemsBody>
    </FormLineItems>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * You can set the most right column to be sticky using `isSticky` prop of the column's cell components: `FormLineItemsHeaderCell` and `FormLineItemsCell`.
 */
export const Sticky: StoryObj<FormLineItemsPropsAndCustomArgs> = {
  render: () => (
    <FormLineItems>
      <FormLineItemsHeaderRow>
        <FormLineItemsHeaderCell size="xl">
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="xl">
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="xl">
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="xl">
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="xl">
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="xl" isSticky>
          <Storybook.ContentPlaceholder label="" borderRadius="global.none" backgroundColor="global.brand.700" />
        </FormLineItemsHeaderCell>
      </FormLineItemsHeaderRow>
      <FormLineItemsBody>
        {range(4).map((index) => (
          <FormLineItemsRow key={index}>
            <FormLineItemsCell size="xl">
              <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
            </FormLineItemsCell>
            <FormLineItemsCell size="xl">
              <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
            </FormLineItemsCell>
            <FormLineItemsCell size="xl">
              <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
            </FormLineItemsCell>
            <FormLineItemsCell size="xl">
              <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
            </FormLineItemsCell>
            <FormLineItemsCell size="xl">
              <Storybook.ContentPlaceholder label="" height="100px" borderRadius="global.none" />
            </FormLineItemsCell>
            <FormLineItemsCell size="xl" isSticky>
              <Storybook.ContentPlaceholder
                label=""
                height="100px"
                borderRadius="global.none"
                backgroundColor="global.brand.600"
              />
            </FormLineItemsCell>
          </FormLineItemsRow>
        ))}
      </FormLineItemsBody>
    </FormLineItems>
  ),
  parameters: {
    a11y: {
      // demonstration
      test: 'off',
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LoadingBody: StoryObj<FormLineItemsPropsAndCustomArgs> = {
  render: () => (
    <FormLineItems>
      <FormLineItemsHeaderRow>
        <FormLineItemsHeaderCell size="m">
          <Typography.Label label="Bill description" description="*" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="s">
          <Typography.Label label="Price" description="*" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="l">
          <Typography.Label label="Comments" description="(Optional)" />
        </FormLineItemsHeaderCell>
      </FormLineItemsHeaderRow>
      <FormLineItemsBody isLoading>
        <FormLineItemsRow>
          <FormLineItemsCell size="s" />
        </FormLineItemsRow>
      </FormLineItemsBody>
    </FormLineItems>
  ),
};

export const LoadingRow: StoryObj<FormLineItemsPropsAndCustomArgs> = {
  render: () => (
    <FormLineItems>
      <FormLineItemsHeaderRow>
        <FormLineItemsHeaderCell size="m">
          <Typography.Label label="Bill description" description="*" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="s">
          <Typography.Label label="Price" description="*" />
        </FormLineItemsHeaderCell>
        <FormLineItemsHeaderCell size="l">
          <Typography.Label label="Comments" description="(Optional)" />
        </FormLineItemsHeaderCell>
      </FormLineItemsHeaderRow>
      <FormLineItemsBody>
        <FormLineItemsRow>
          <FormLineItemsCell size="m">
            <FormField
              isRequired
              labelProps={{ label: 'Bill description', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Bill description" size="small" />}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="s">
            <FormField
              isRequired
              labelProps={{ label: 'Price', isHidden: true }}
              render={(props) => (
                <AmountField
                  {...props}
                  placeholder="0.00"
                  size="small"
                  currency="USD"
                  currencySign="$"
                  locale="en-US"
                />
              )}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="l">
            <FormField
              labelProps={{ label: 'Comments', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Comments" size="small" />}
            />
          </FormLineItemsCell>
        </FormLineItemsRow>
        <FormLineItemsRow isLoading>
          <FormLineItemsCell size="m">
            <FormField
              isRequired
              labelProps={{ label: 'Bill description', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Bill description" size="small" />}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="s">
            <FormField
              isRequired
              labelProps={{ label: 'Price', isHidden: true }}
              render={(props) => (
                <AmountField
                  {...props}
                  placeholder="0.00"
                  size="small"
                  currency="USD"
                  currencySign="$"
                  locale="en-US"
                />
              )}
            />
          </FormLineItemsCell>
          <FormLineItemsCell size="l">
            <FormField
              labelProps={{ label: 'Comments', isHidden: true }}
              render={(props) => <TextField {...props} placeholder="Comments" size="small" />}
            />
          </FormLineItemsCell>
        </FormLineItemsRow>
      </FormLineItemsBody>
    </FormLineItems>
  ),
};
