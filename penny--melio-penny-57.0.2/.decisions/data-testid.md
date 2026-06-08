1. Each component should have the following structure in their type:

```tsx
import { TestIdProp } from '@melio/penny-utils';

export type ComponentProps = {} & TestIdProp;
```

2. Each component should have a `data-testid` prop with the component name as default value:

```tsx
export const Component = forwardRef<HTMLDivElement, ComponentProps>(
    (
        {
            'data-testid': dataTestId = 'component',
            ...props
        },
        ref
    ) => {
        <Box data-component="Component" data-testid={dataTestId} {...props}>
            /* ... */
        </Box>
    });
```

3. For components that hide internal components from the consumer, we’ll drill down the `data-testid` prop to ensure they remain testable, make sure to use `useTestId` hook to add context:
```tsx
import { useTestId } from '@melio/penny-utils';

export const BaseModal = forwardRef<HTMLDivElement, BaseModalProps>(
    (
        {
            children,
            'data-testid': dataTestId = 'base-modal',
            ...props
        },
        ref
    ) => {
        const getTestId = useTestId(dataTestId);

        return (
            <Box data-component="BaseModal" {...getTestId()} {...props}>   //data-testid="base-modal"
                <BaseModalCloseIcon {...getTestId('close-icon')} />        //data-testid="base-modal-close-icon"
                {children}
            </Box>
        );
    });
```

4. For components whose parts are composed by the consumer, we won't drill down the `data-testid` prop.
Instead, each part will have its own `data-testid`, with the component name used as the default value. 
Consumers can override it if needed:

```tsx
//Penny

export const BaseModal = forwardRef<HTMLDivElement, BaseModalProps>(
    (
        {
            children,
            'data-testid': dataTestId = 'base-modal',
            ...props
        },
        ref
    ) => {
        return (
            <Box data-component="BaseModal" data-testid={dataTestId} {...props}>
                {children}
            </Box>
        );
    });

export const BaseModalHeader = forwardRef<HTMLDivElement, BaseModalHeaderProps>(
    (
        {
            children,
            'data-testid': dataTestId = 'base-modal-header',
            ...props
        },
        ref
    ) => {
        return (
            <Box data-component="BaseModalHeader" data-testid={dataTestId} {...props} >
                {children}
            </Box>
        );
    });

export const BaseModalBody = forwardRef<HTMLDivElement, BaseModalBodyProps>(
    (
        {
            children,
            'data-testid': dataTestId = 'base-modal-body',
            ...props
        },
        ref
    ) => {
        return (
            <Box data-component="BaseModalBody" data-testid={dataTestId} {...props} >
                {children}
            </Box>
        );
    });

export const BaseModalFooter = forwardRef<HTMLDivElement, BaseModalFooterProps>(
    (
        {
            children,
            'data-testid': dataTestId = 'base-modal-footer',
            ...props
        },
        ref
    ) => {
        return (
            <Box data-component="BaseModalFooter" data-testid={dataTestId} {...props} >
                {children}
            </Box>
        );
    });
```

```tsx
//Consumer 
import { BaseModal } from '@melio/penny';

export const RolesPermissionsModal =({}: RolesPermissionsModalProps) => {
        return (
            <BaseModal data-testid="roles-permissions-modal">
                <BaseModalHeader dataTestId="roles-permissions-modal-header">/* ... */</BaseModalHeader>
                <BaseModalBody dataTestId="roles-permissions-modal-body">/* ... */</BaseModalBody>
                <BaseModalFooter dataTestId="roles-permissions-modal-footer">/* ... */</BaseModalFooter>
            </BaseModal>
        );
    };
```