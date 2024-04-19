import { RefObject, useEffect } from 'react';
import { IndexedObject } from 'types/common';

const useOutsideClick = (openerRef: RefObject<any>, ref: RefObject<any>, func: Function) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: IndexedObject) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !openerRef.current.contains(event.target)
      ) {
        func();
      }
    }
    // Bind the event listener
    window.addEventListener('click', handleClickOutside, true);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, func]);
};

export default useOutsideClick;
