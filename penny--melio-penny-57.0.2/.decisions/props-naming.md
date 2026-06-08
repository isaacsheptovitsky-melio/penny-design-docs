1. Prop names should use camelCase, the first word is lowercase:
```tsx
❌ Incorrect:

BackgroundColor
on_click
```

```tsx
✅ Correct:

backgroundColor
onClick
```

2. Name explicitly
```tsx
❌ Incorrect:

loadingTxt
leftEl
bgColor
```

```tsx
✅ Correct:

loadingText
leftElement
backgroundColor
```

3. Don't use `is` prefix for HTML attributes: 
```tsx
❌ Incorrect:

isDisabled
isReadonly
isHidden
isRequired
```

```tsx
✅ Correct:

disabled
readonly
hidden
required
```


5. Event Handlers Should Use `on` Prefix: 
```tsx
❌ Incorrect:

click
close
submit
change
clickHandler
closeHandler
submitHandler
changeHandler
```

```tsx
✅ Correct:

onClick
onClose
onSubmit
onChange
```
