import { type RefObject, useEffect, useState } from 'react';

// Since the cell's focus is lost when the table is rerendered,
// add an event listener to monitor focus changes and update the focused cell ID in the context.
export const useTableFocus = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const [focusedCellId, setFocusedCellId] = useState<string>();

  useEffect(() => {
    const currentTableRef = ref.current;

    const handleFocusChange = () => {
      setFocusedCellId(document.activeElement?.getAttribute('id') || undefined);
    };

    // Add event listener to listen for focus change
    currentTableRef?.addEventListener('focusin', handleFocusChange);

    return () => {
      currentTableRef?.removeEventListener('focusin', handleFocusChange);
    };
  }, [ref]);

  return focusedCellId;
};
