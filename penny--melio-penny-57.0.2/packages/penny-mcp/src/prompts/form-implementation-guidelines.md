# Form Implementation Guidance

The following instructions condense Penny’s form documentation so the LLM can implement form-heavy flows accurately while staying aligned with the design system and recommended state patterns. Reference material: [Form Overview](https://penny.melio.com/?path=/docs/form-how-to-use--docs) and [`useMelioForm`](https://penny.melio.com/?path=/docs/form-usemelioform--docs).

## Layout & Structure

Forms are usually follow a grid pattern .
Combining `Form` and `FormField` components will enable you implement the form layout. See example:
```tsx
import { AmountField, DateField, Form, FormField, Select, TextField } from '@melio/penny';

export const MyForm = () => (
    <Form columns={2}>
      <FormField
        colSpan={2}
        labelProps={{ label: "Vendor's business name" }}
        placeholder="Search or add a vendor"
        isRequired
        render={props => <Select options={vendorOptions} {...props} />}
      />
      <FormField
        colSpan={2}
        labelProps={{ label: "Bill amount" }}
        placeholder="$0.00"
        isRequired
        render={props => <AmountField {...props} />}
      />
      <FormField
        labelProps={{ label: "Invoice #" }}
        helperText="Add an invoice number to help your vendor reconcile payments"
        render={props => <TextField {...props} />}
      />
      <FormField labelProps={{ label: "Due date" }} isRequired render={props => <DateField {...props} />} />
      <FormField colSpan={2} labelProps={{ label: "Note to self" }} render={props => <TextField {...props} />} />
    </Form>
);
```
This form layout has 2 columns, meaning each row will have 2 fields in it. Some of the rows have a single field, we're using `colSpan` to do it. 

## State Management with `useMelioForm`

The `useMelioForm` hook is a one-stop-shop hook to create all the logic of the form.

The hook receives a generic that tells the structure of the form data.
```tsx
import { useMelioForm } from '@melio/penny';

type MyFormFields = {
  vendorId: string;
  billAmount: string;
  billNumber: string;
  dueDate: Date;
  note: string;
};

export const MyForm = () => {
  const { registerField, formProps } = useMelioForm<MyFormFields>({ /* ... */ });

  return (
    <Form {...formProps}>
      <FormField
        {...registerField('vendorId')}
        isRequired
        labelProps={{ label: "Vendor's business name" }}
        render={(props) => <SelectNew {...props} placeholder="Search or add a vendor" options={vendorOption}/>}
      />
      ...
    </Form>
  );
}
```

## Splitting Form Fields On The Page
There are some cases where you might need to split the form into several groups throughout the page:
- Add as=<tag-name> to the Form components you have to change the default form tag that is used with them.
- Wrap the whole section containing -all- fields with a form tag (then give it the formProps you get from the `useMelioForm`).
- Add a hidden submission input and put it anywhere inside the form tag.
- Extract the inputRef from the formProps you get from the `useMelioForm` and pass it to the hidden input.

```tsx
export const MyForm = () => {
  const [ formValues, setFormValues ] = useState<FieldValues>();
  const {
    registerField,
    formProps: {
      inputRef,
      ...formProps
    },
    submitButtonProps
  } = useMelioForm({
    onSubmit: data => setFormValues(data)
  });
  
  return (
    <form {...formProps}>
      <Group variant="vertical">
        <Text textStyle="heading3Semi">Fields Group 1</Text>
        <Form {...args}>
          <FormField {...registerField('field-1')} labelProps={{
            label: 'Field 1'
          }} helperText="helper text" render={props => <TextField {...props} placeholder="Field 1"/>}/>
          <FormField {...registerField('field-2')} labelProps={{
            label: 'Field 2'
          }} helperText="helper text" render={props => <TextField {...props} placeholder="Field 2"/>}/>
        </Form>
        <Text textStyle="heading3Semi">Fields Group 2</Text>
        <Form as="div">
          <FormField {...registerField('field-3')} labelProps={{
            label: 'Field 3'
          }} helperText="helper text" render={props => <TextField {...props} placeholder="Field 3"/>}/>
          <FormField {...registerField('field-4')} labelProps={{
            label: 'Field 4'
          }} helperText="helper text" render={props => <TextField {...props} placeholder="Field 4"/>}/>
        </Form>
        {/* Note that you need to add this hidden submit input to make the submit button send the form */}
        <input ref={inputRef} type="submit" hidden/>
        <Button {...submitButtonProps} label="Submit"/>
        <Text>Submitted values:</Text>
        <pre>{JSON.stringify(formValues, null, 2)}</pre>
      </Group>
    </form>
  );
}
```