import { useEffect } from 'react';

export enum ModalEvents {
  OPENED = 'MODAL_OPENED',
}

function dispatchModalOpenedEvent() {
  document.dispatchEvent(new Event(ModalEvents.OPENED));
}

export const useDispatchState = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      dispatchModalOpenedEvent();
    }
  }, [isOpen]);
};
