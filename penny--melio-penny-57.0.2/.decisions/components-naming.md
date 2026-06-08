1.Don't use dot notation for component names:
```tsx
❌ Incorrect:

    <BaseModal>
        <BaseModal.Header>/* ... */</BaseModal.Header>
        <BaseModal.Body>/* ... */</BaseModal.Body>
        <BaseModal.Footer>/* ... */</BaseModal.Footer>
    </BaseModal>
```

```tsx
✅ Correct:

    <BaseModal>
        <BaseModalHeader>/* ... */</BaseModalHeader>
        <BaseModalBody>/* ... */</BaseModalBody>
        <BaseModalFooter>/* ... */</BaseModalFooter>
    </BaseModal>
```

2. Use consistent prefixes for related components and parts under the same parent:
```tsx
✅ Correct:

BaseModal
BaseModalHeader
BaseModalBody
BaseModalFooter
```

3. Component names should be PascalCase, each word capitalized, no separators:
```tsx
❌ Incorrect:

baseModal
dropdown_menu_item
tooltip-trigger
```

```tsx
✅ Correct:

BaseModal
DropdownMenuItem
TooltipTrigger
```