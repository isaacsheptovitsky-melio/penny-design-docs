// Using 'off' for `autoComplete` doesn't work 🤦
// Instead we must do the following:
// - Tweak the `name` attribute to not match 'email', 'name', 'companyName' etc. (https://stackoverflow.com/a/54565946)
// - Make sure the `name` attribute is different on every page load (apparently the browser keeps user-filled inputs in 'inputName: suggestion' pairs)
// In case we do want to enable autocomplete - the name attribute should remain unchanged.
export const getAutoCompleteProps = ({ name, autoComplete = 'off' }: { name?: string; autoComplete?: string }) => {
  const isAutoCompleteOff = autoComplete === 'off';
  return {
    autoComplete,
    // We must use a valid value for a11y reasons
    ...(name && { name: isAutoCompleteOff ? `${name}-${Math.random().toString(36).substring(2, 7)}` : name }),
  };
};
