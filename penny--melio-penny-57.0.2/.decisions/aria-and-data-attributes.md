1. Prefer `undefined` to omit `aria-*` and `data-*` attributes

React omits attributes when their value is `undefined` or `null`.
While both `null` and `undefined` will work, we standardize on using `undefined` for consistency when you want the attribute removed.
See React docs: [Conditional rendering](https://react.dev/learn/conditional-rendering) and [Common DOM components](https://react.dev/reference/react-dom/components/common).

```tsx
❌ Incorrect (uses null to omit):

    <Box aria-label={null} data-state={condition ? 'open' : null} />
```

```tsx
✅ Correct (uses undefined to omit):

    <Box aria-label={undefined} data-state={condition ? 'open' : undefined} />
```

2. Pass boolean ARIA values explicitly when `false` is meaningful

Some ARIA attributes require an explicit boolean where `false` conveys meaning (e.g., `aria-hidden="false"`). In these cases, do not omit.

```tsx
❌ Incorrect (omits when false is meaningful):

    <button aria-hidden={isHidden ? true : undefined} />
```

```tsx
✅ Correct:

    <button aria-hidden={isHidden} />
```

3. Avoid empty strings for `data-*`/`aria-*` when the intent is omission

```tsx
❌ Incorrect:

    <div data-selected={condition ? 'true' : ''} />
```

```tsx
✅ Correct:

    <div data-selected={condition ? 'true' : undefined} />
```
