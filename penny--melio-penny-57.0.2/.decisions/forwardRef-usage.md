- Use **Chakra UI’s `forwardRef`** when your component needs the `as` prop (polymorphic behavior).

```tsx
import { forwardRef, Box } from '@chakra-ui/react';

const Component = forwardRef<Props, 'button'>(
  ({ as = 'button', ...props }, ref) => (
    <Box as={as} ref={ref} {...props} />
  )
);
```

- Use **React’s native `forwardRef`** when you don’t need the `as` prop.

```tsx
import { forwardRef, Box } from 'react';

const Component = forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Box ref={ref} {...props} />
));
```

💬 Note: This decision applies to React 18 and will remain relevant until we migrate to React 19. In React 19, `ref` will behave like any other prop, and `forwardRef` will no longer be required.