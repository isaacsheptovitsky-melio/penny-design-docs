# Accessibility: Floating-UI aria-hidden-focus Exclusion

## Issue

The `aria-hidden-focus` accessibility rule reports violations for Floating-UI's focus guard elements. This is a **known false positive** from axe-core.

## Why This Happens

The Floating-UI library creates focus guard elements with `aria-hidden="true"` and `tabindex="0"` as part of its focus management system. These elements are intentionally designed for accessibility purposes:

- **Keyboard Navigation**: They trap focus within floating elements (modals, dropdowns, etc.)
- **Screen Reader Support**: They prevent screen readers from accessing content outside the floating element when it's open
- **Focus Management**: They ensure proper focus return when the floating element closes

## Why We Can't "Fix" It

Removing or changing these focus guard elements would cause **actual accessibility violations**:

- Focus would escape floating elements
- Screen readers would announce content outside the modal/dropdown
- Keyboard navigation would break

## References

- [Floating-UI Issue #2462](https://github.com/floating-ui/floating-ui/issues/2462)
- [Floating-UI Issue #3375](https://github.com/floating-ui/floating-ui/issues/3375)
- [Jira Ticket ME-109901](https://meliorisk.atlassian.net/browse/ME-109901)

## Solution

target the `data-floating-ui-focus-guard` and `data-floating-ui-inert` to exclude them.
